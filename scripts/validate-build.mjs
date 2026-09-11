import { access, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'
import { PWA_SHORTCUTS } from '../src/constants/tools.js'
import { BLOG_DOUBLE_WORD_TARGETS } from './blog-editorial-targets.mjs'

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
const countClassToken = (source, token) => [...source.matchAll(/\bclass=["']([^"']*)["']/gi)]
  .filter((match) => match[1].split(/\s+/u).includes(token)).length

function routeToFile(route) {
  const clean = route.replace(/^https:\/\/monitorsmith\.app/, '').split(/[?#]/)[0]
  if (clean === '/' || clean === '') return path.join(distDir, 'index.html')
  if (/\.[a-z0-9]+$/i.test(clean)) return path.join(distDir, clean.slice(1))
  return path.join(distDir, clean.slice(1), 'index.html')
}

function fileToRoute(file) {
  const relative = path.relative(distDir, file).replaceAll('\\', '/')
  if (relative === 'index.html') return '/'
  return `/${relative.replace(/\/index\.html$/, '')}/`
}

function stripHtml(value) {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|amp|quot|#39|lt|gt);/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const wordCount = (value) => {
  const text = stripHtml(value)
  return text ? text.split(/\s+/u).length : 0
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
const htmlFiles = files.filter((file) => file.endsWith('.html') && !path.basename(file).startsWith('google') && path.basename(file) !== '404.html');
const canonicals = new Map()
const pageTitles = new Map()
const pageDescriptions = new Map()
const inboundLinks = new Map()
const legacyRedirects = []
const articleMetrics = []
const codeAssets = files.filter((file) => /\.(?:css|js)$/.test(file))
const localAssetExtensions = '(?:avif|gif|ico|jpe?g|png|svg|webp|woff2?|mp3|ogg|wav|mp4|webm)'
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

for (const file of codeAssets) {
  const source = await readFile(file, 'utf8')
  const references = [...source.matchAll(new RegExp(`(?:["'\\x60(])(/[^"'\\x60\\s?#)]+\\.${localAssetExtensions})(?=[?"'\\x60\\s)])(?:[?][^"'\\x60\\s)]*)?`, 'gi'))]
    .map((match) => match[1])
  for (const reference of new Set(references)) {
    if (!(await routeExists(reference))) {
      errors.push(`${path.relative(distDir, file)}: recurso local sem arquivo ${reference}`)
    }
  }
}

if (largestScriptGzip > 180 * 1024) errors.push(`performance: maior bundle JS gzip excede 180 KiB (${Math.ceil(largestScriptGzip / 1024)} KiB)`)
if (largestStyleGzip > 48 * 1024) errors.push(`performance: maior CSS gzip excede 48 KiB (${Math.ceil(largestStyleGzip / 1024)} KiB)`)
if (totalCodeGzip > 340 * 1024) errors.push(`performance: JS + CSS gzip excedem 340 KiB (${Math.ceil(totalCodeGzip / 1024)} KiB)`)

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8')
  const relative = path.relative(distDir, file)
  const route = fileToRoute(file)
  const expectedCanonical = `https://monitorsmith.app${route}`
  const isLegacyRedirect = /<html[^>]*\bdata-legacy-redirect\b/i.test(html)
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1]
  const robots = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i)?.[1] || ''
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim()
  const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1]?.trim()
  const openGraphUrl = html.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i)?.[1]

  if (!title || title.length < 8) errors.push(`${relative}: title ausente ou vazio`)
  if (!description || description.length < 40) errors.push(`${relative}: meta description ausente/curta`)
  if (!/<meta\s+name=["']referrer["']\s+content=["']strict-origin-when-cross-origin["']/i.test(html)) errors.push(`${relative}: política de referrer ausente`)
  if (countMatches(html, /<h1(?:\s|>)/gi) !== 1) errors.push(`${relative}: deve conter exatamente um H1`)
  if (!canonical) errors.push(`${relative}: canonical ausente`)
  if (isLegacyRedirect) {
    legacyRedirects.push({ route, canonical, html })
    if (!/noindex\s*,?\s*follow/i.test(robots)) errors.push(`${relative}: migração histórica deve usar noindex,follow`)
    if (!/<meta\s+http-equiv=["']refresh["']/i.test(html) || !/window\.location\.replace\(/.test(html)) {
      errors.push(`${relative}: migração histórica sem encaminhamento de fallback`)
    }
    if (canonical === expectedCanonical) errors.push(`${relative}: redirect histórico não pode ser canonical de si mesmo`)
    if (canonical && !(await routeExists(canonical))) errors.push(`${relative}: destino histórico inexistente ${canonical}`)
  } else if (canonical) {
    if (!/\bindex\b/i.test(robots) || /\bnoindex\b/i.test(robots)) errors.push(`${relative}: página canônica sem index,follow`)
    if (canonical !== expectedCanonical) errors.push(`${relative}: canonical não autorreferente; esperado ${expectedCanonical}`)
    const previous = canonicals.get(canonical)
    if (previous) errors.push(`${relative}: canonical duplicado com ${previous}`)
    canonicals.set(canonical, relative)
    if (openGraphUrl !== canonical) errors.push(`${relative}: og:url não corresponde ao canonical`)
    if (title) {
      const previousTitle = pageTitles.get(title)
      if (previousTitle) errors.push(`${relative}: title duplicado com ${previousTitle}`)
      pageTitles.set(title, relative)
    }
    if (description) {
      const previousDescription = pageDescriptions.get(description)
      if (previousDescription) errors.push(`${relative}: meta description duplicada com ${previousDescription}`)
      pageDescriptions.set(description, relative)
    }
  }

  for (const [, json] of html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(json) } catch { errors.push(`${relative}: JSON-LD inválido`) }
  }

  const assets = [...html.matchAll(/\bsrc=["'](\/[^"']+)["']/gi)].map((match) => match[1])
  for (const asset of assets.filter((asset) => !asset.startsWith('//'))) {
    if (!(await routeExists(asset))) errors.push(`${relative}: recurso local sem arquivo ${asset}`)
  }

  const internalLinks = [...html.matchAll(/<a\b[^>]*\bhref=["'](https:\/\/monitorsmith\.app\/[^"']*|\/[^"']*)["']/gi)]
    .map((match) => match[1])
  for (const href of internalLinks) {
    if (!(await routeExists(href))) errors.push(`${relative}: link interno sem destino ${href}`)
    const parsed = new URL(href, 'https://monitorsmith.app/')
    if (parsed.searchParams.has('tool')) errors.push(`${relative}: link de ferramenta ainda usa parâmetro ?tool= ${href}`)
    if (!path.extname(parsed.pathname) && parsed.pathname !== '/' && !parsed.pathname.endsWith('/')) {
      errors.push(`${relative}: link HTML interno causaria redirect por falta de barra final ${href}`)
    }
    const target = `${parsed.origin}${parsed.pathname}`
    if (!isLegacyRedirect && target !== canonical) inboundLinks.set(target, (inboundLinks.get(target) || 0) + 1)
  }

  const externalLinks = [...html.matchAll(/<a\b[^>]*\bhref=["'](https?:\/\/[^"']+)["']/gi)].map((match) => match[1])
  for (const href of externalLinks) {
    try { new URL(href) } catch { errors.push(`${relative}: URL externa inválida ${href}`) }
    if (/[.,;:!?]$/.test(href)) errors.push(`${relative}: pontuação incorporada à URL externa ${href}`)
  }

  if (/^\/blog\/[^/]+\/$/.test(route)) {
    const articleSlug = route.split('/')[2]
    const wordTarget = BLOG_DOUBLE_WORD_TARGETS[articleSlug]
    const articleBody = html.match(/<article\b[^>]*data-blog-article[^>]*>([\s\S]*?)<\/article>/i)?.[1] || ''
    const words = wordCount(articleBody)
    const sourceLinks = html.match(/<section\b[^>]*data-editorial-sources[^>]*>[\s\S]*?<\/section>/i)?.[0].match(/<a\b/gi)?.length || 0
    const ctas = countClassToken(html, 'cta')
    articleMetrics.push({ route, words, sourceLinks })
    if (!wordTarget) errors.push(`${relative}: meta editorial ausente para ${articleSlug}`)
    else if (words < wordTarget) errors.push(`${relative}: artigo com ${words}/${wordTarget} palavras editoriais`)
    if (sourceLinks < 2) errors.push(`${relative}: artigo com menos de duas fontes visíveis`)
    if (ctas !== 1) errors.push(`${relative}: esperado exatamente um CTA editorial; encontrado ${ctas}`)
    if (!/<meta\s+property=["']article:published_time["']/.test(html) || !/<meta\s+property=["']article:modified_time["']/.test(html)) {
      errors.push(`${relative}: datas editoriais estruturadas ausentes`)
    }
  }
}

const sitemap = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8')
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
if (new Set(sitemapUrls).size !== sitemapUrls.length) errors.push('sitemap: contém URLs duplicadas')
for (const canonical of canonicals.keys()) {
  if (!sitemapUrls.includes(canonical)) errors.push(`sitemap: canonical ausente ${canonical}`)
}
for (const url of sitemapUrls) {
  if (!(await routeExists(url))) errors.push(`sitemap: URL sem arquivo ${url}`)
  if (!url.startsWith('https://monitorsmith.app/') || /[?#]/.test(url)) errors.push(`sitemap: URL não canônica ${url}`)
  if (!canonicals.has(url)) errors.push(`sitemap: URL não corresponde a uma página indexável autorreferente ${url}`)
  if (!inboundLinks.has(url) && url !== 'https://monitorsmith.app/') errors.push(`sitemap: URL órfã sem link HTML ${url}`)
}
for (const { route } of legacyRedirects) {
  const url = `https://monitorsmith.app${route}`
  if (sitemapUrls.includes(url)) errors.push(`sitemap: redirect histórico incluído ${url}`)
}
if (legacyRedirects.length !== 14) errors.push(`migrações históricas: esperado 14, encontrado ${legacyRedirects.length}`)
if (articleMetrics.length !== 33) errors.push(`conteúdo editorial: esperado 33 artigos, encontrado ${articleMetrics.length}`)

const manifest = JSON.parse(await readFile(path.join(distDir, 'manifest.webmanifest'), 'utf8'))
if (manifest.start_url !== '/' || manifest.scope !== '/') errors.push('manifest: start_url e scope devem ser /')
if (JSON.stringify(manifest.shortcuts?.map((shortcut) => shortcut.url)) !== JSON.stringify(PWA_SHORTCUTS.map((shortcut) => shortcut.url))) {
  errors.push('manifest: atalhos não correspondem ao catálogo de ferramentas')
}
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
const notFound = await readFile(path.join(distDir, '404.html'), 'utf8')
if (!/<meta\s+name=["']referrer["']\s+content=["']strict-origin-when-cross-origin["']/i.test(notFound)) errors.push('404.html: política de referrer ausente')
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
