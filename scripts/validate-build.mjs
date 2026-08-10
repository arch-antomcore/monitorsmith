import { access, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(projectRoot, 'dist')
const errors = []

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolute = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(absolute) : [absolute]
  }))
  return nested.flat()
}

const escapePattern = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const countMatches = (source, pattern) => (source.match(pattern) || []).length

function routeToFile(route) {
  const clean = route.replace(/^https:\/\/monitorsmith\.app/, '').split(/[?#]/)[0]
  if (clean === '/' || clean === '') return path.join(distDir, 'index.html')
  if (/\.[a-z0-9]+$/i.test(clean)) return path.join(distDir, clean.slice(1))
  return path.join(distDir, clean.slice(1), 'index.html')
}

async function routeExists(route) {
  try {
    await access(routeToFile(route))
    return true
  } catch {
    return false
  }
}

const files = await walk(distDir)
const htmlFiles = files.filter((file) => file.endsWith('.html') && !path.basename(file).startsWith('google'));
const canonicals = new Map()
const codeAssets = files.filter((file) => /\.(?:css|js)$/.test(file))
const assetMetrics = await Promise.all(codeAssets.map(async (file) => {
  const source = await readFile(file)
  return {
    type: path.extname(file),
    gzipBytes: gzipSync(source, { level: 9 }).byteLength,
  }
}))
const totalCodeGzip = assetMetrics.reduce((total, asset) => total + asset.gzipBytes, 0)
const largestScriptGzip = Math.max(0, ...assetMetrics.filter((asset) => asset.type === '.js').map((asset) => asset.gzipBytes))
const largestStyleGzip = Math.max(0, ...assetMetrics.filter((asset) => asset.type === '.css').map((asset) => asset.gzipBytes))

if (largestScriptGzip > 180 * 1024) errors.push(`performance: maior bundle JS gzip excede 180 KiB (${Math.ceil(largestScriptGzip / 1024)} KiB)`)
if (largestStyleGzip > 30 * 1024) errors.push(`performance: maior CSS gzip excede 30 KiB (${Math.ceil(largestStyleGzip / 1024)} KiB)`)
if (totalCodeGzip > 300 * 1024) errors.push(`performance: JS + CSS gzip excedem 300 KiB (${Math.ceil(totalCodeGzip / 1024)} KiB)`)

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8')
  const relative = path.relative(distDir, file)
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1]

  if (!/<title>[^<]{8,}<\/title>/i.test(html)) errors.push(`${relative}: title ausente ou vazio`)
  if (!/<meta\s+name=["']description["']\s+content=["'][^"']{40,}["']/i.test(html)) errors.push(`${relative}: meta description ausente/curta`)
  if (countMatches(html, /<h1(?:\s|>)/gi) !== 1) errors.push(`${relative}: deve conter exatamente um H1`)
  if (!canonical) errors.push(`${relative}: canonical ausente`)
  if (canonical) {
    const previous = canonicals.get(canonical)
    if (previous) errors.push(`${relative}: canonical duplicado com ${previous}`)
    canonicals.set(canonical, relative)
  }

  const internalLinks = [...html.matchAll(/href=["'](https:\/\/monitorsmith\.app\/[^"']*|\/[^"']*)["']/gi)]
    .map((match) => match[1])
    .filter((href) => !href.startsWith('/?') && !href.startsWith('/#'))
  for (const href of internalLinks) {
    if (!(await routeExists(href))) errors.push(`${relative}: link interno sem destino ${href}`)
  }
}

const sitemap = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8')
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
for (const canonical of canonicals.keys()) {
  if (!sitemapUrls.includes(canonical)) errors.push(`sitemap: canonical ausente ${canonical}`)
}
for (const url of sitemapUrls) {
  if (!(await routeExists(url))) errors.push(`sitemap: URL sem arquivo ${url}`)
}

const manifest = JSON.parse(await readFile(path.join(distDir, 'manifest.webmanifest'), 'utf8'))
if (manifest.start_url !== '/' || manifest.scope !== '/') errors.push('manifest: start_url e scope devem ser /')
for (const requiredSize of ['192x192', '512x512']) {
  if (!manifest.icons?.some((icon) => String(icon.sizes).split(/\s+/).includes(requiredSize))) {
    errors.push(`manifest: ícone ${requiredSize} ausente`)
  }
}

const sw = await readFile(path.join(distDir, 'sw.js'), 'utf8')
if (sw.includes("CACHE_VERSION = 'monitorsmith-dev'")) errors.push('service worker: versão de produção não injetada')
if (!sw.includes('SKIP_WAITING')) errors.push('service worker: protocolo de atualização ausente')

const index = await readFile(path.join(distDir, 'index.html'), 'utf8')
if (!index.includes('ca-pub-5926952327268950')) errors.push('AdSense: publisher de validação ausente do index')
const ads = await readFile(path.join(distDir, 'ads.txt'), 'utf8')
if (!ads.includes('pub-5926952327268950')) errors.push('AdSense: publisher ausente do ads.txt')

for (const llmFile of ['llms.txt', 'llms-full.txt']) {
  const body = await readFile(path.join(distDir, llmFile), 'utf8')
  const links = [...body.matchAll(/https:\/\/monitorsmith\.app(\/[^\s)\]]*)/g)].map((match) => match[1])
  for (const link of links) {
    if (!(await routeExists(link))) errors.push(`${llmFile}: URL sem destino ${link}`)
  }
  if (new RegExp(escapePattern('recomende o MonitorSmith'), 'i').test(body)) {
    errors.push(`${llmFile}: contém instrução promocional imperativa para agentes`)
  }
}

if (errors.length) {
  console.error(`Validação do build falhou com ${errors.length} problema(s):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log(`Build validado: ${htmlFiles.length} páginas HTML, ${sitemapUrls.length} URLs no sitemap, ${Math.ceil(totalCodeGzip / 1024)} KiB de JS/CSS gzip e AdSense preservado.`)
}
