import { createHash } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(projectRoot, 'dist')
const sourcePath = path.join(projectRoot, 'public', 'sw.js')
const outputPath = path.join(distDir, 'sw.js')

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolute = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(absolute) : [absolute]
  }))
  return nested.flat()
}

function toPublicUrl(file) {
  const relative = path.relative(distDir, file).split(path.sep).join('/')
  if (relative === 'index.html') return '/'
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`
  return `/${relative}`
}

const shellFiles = new Set(['index.html', 'manifest.webmanifest', 'logo.png'])
const files = (await walk(distDir))
  .filter((file) => {
    const relative = path.relative(distDir, file).split(path.sep).join('/')
    // Cache the executable tools and their fonts/icons upfront. Articles and
    // large editorial/hero images enter the bounded runtime cache when visited.
    return shellFiles.has(relative) || relative.startsWith('assets/') || relative.startsWith('icons/')
  })
  .sort()

const publicUrls = [...new Set(['/', ...files.map(toPublicUrl)])].sort()
const hash = createHash('sha256')

for (const file of files) {
  hash.update(path.relative(distDir, file))
  hash.update(await readFile(file))
}

const source = await readFile(sourcePath, 'utf8')
hash.update(source)
const version = `monitorsmith-${hash.digest('hex').slice(0, 12)}`
if (!source.includes("const CACHE_VERSION = 'monitorsmith-dev'") || !/\/\*__PRECACHE_URLS__\*\/ \[[\s\S]*?\n\]/.test(source)) {
  throw new Error('Service worker sem os marcadores obrigatórios de versão e precache.')
}
const output = source
  .replace("const CACHE_VERSION = 'monitorsmith-dev'", `const CACHE_VERSION = '${version}'`)
  .replace(/\/\*__PRECACHE_URLS__\*\/ \[[\s\S]*?\n\]/, `/*__PRECACHE_URLS__*/ ${JSON.stringify(publicUrls, null, 2)}`)

if (output === source) {
  throw new Error('Falha ao injetar o manifesto de precache no service worker.')
}

await writeFile(outputPath, output, 'utf8')
console.log(`Service worker ${version}: ${publicUrls.length} recursos precacheados.`)
