import { LEGACY_REDIRECTS } from './site-migrations.mjs'

const BASE_URL = 'https://monitorsmith.app'
const errors = []

async function fetchText(url, options = {}) {
  const response = await fetch(url, {
    redirect: options.redirect || 'follow',
    signal: AbortSignal.timeout(20_000),
    headers: { 'User-Agent': 'MonitorSmith production verification (+https://monitorsmith.app/)' },
  })
  return { response, text: await response.text() }
}

function canonicalFrom(html) {
  return html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1]
}

function robotsFrom(html) {
  return html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i)?.[1] || ''
}

async function mapConcurrent(items, concurrency, callback) {
  const results = new Array(items.length)
  let cursor = 0
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++
      results[index] = await callback(items[index], index)
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()))
  return results
}

console.log('=== VERIFICAÇÃO INTEGRAL DE PRODUÇÃO ===')

const { response: sitemapResponse, text: sitemap } = await fetchText(`${BASE_URL}/sitemap.xml`)
if (sitemapResponse.status !== 200) errors.push(`sitemap.xml retornou ${sitemapResponse.status}`)
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
if (sitemapUrls.length !== 89) errors.push(`sitemap contém ${sitemapUrls.length} URLs; esperado 89`)
if (new Set(sitemapUrls).size !== sitemapUrls.length) errors.push('sitemap contém URLs duplicadas')

const canonicalResults = await mapConcurrent(sitemapUrls, 8, async (url) => {
  try {
    const { response, text } = await fetchText(url, { redirect: 'manual' })
    const canonical = canonicalFrom(text)
    const robots = robotsFrom(text)
    if (response.status !== 200) errors.push(`${url} retornou ${response.status}`)
    if (canonical !== url) errors.push(`${url} declarou canonical ${canonical || 'ausente'}`)
    if (!/\bindex\b/i.test(robots) || /\bnoindex\b/i.test(robots)) errors.push(`${url} não está indexável`)
    if (/<html[^>]*\bdata-legacy-redirect\b/i.test(text)) errors.push(`${url} é migração mas aparece no sitemap`)
    return response.status === 200 && canonical === url
  } catch (error) {
    errors.push(`${url} falhou: ${error.message}`)
    return false
  }
})

const migrationResults = await mapConcurrent(LEGACY_REDIRECTS, 6, async ([sourcePath, targetPath]) => {
  const url = `${BASE_URL}${sourcePath}`
  try {
    const { response, text } = await fetchText(url, { redirect: 'manual' })
    if (response.status >= 300 && response.status < 400) {
      const location = new URL(response.headers.get('location'), url)
      if (`${location.pathname}${location.search}` !== targetPath) errors.push(`${sourcePath} redireciona para ${location.href}`)
      return true
    }
    const canonical = canonicalFrom(text)
    const robots = robotsFrom(text)
    const expectedCanonical = `${BASE_URL}${targetPath}`
    if (response.status !== 200) errors.push(`${sourcePath} retornou ${response.status}`)
    if (!/<html[^>]*\bdata-legacy-redirect\b/i.test(text)) errors.push(`${sourcePath} não possui marcador de migração`)
    if (canonical !== expectedCanonical) errors.push(`${sourcePath} declarou canonical ${canonical || 'ausente'}`)
    if (!/\bnoindex\b/i.test(robots) || !/\bfollow\b/i.test(robots)) errors.push(`${sourcePath} não usa noindex,follow`)
    if (!/<meta\s+http-equiv=["']refresh["']/i.test(text) || !/window\.location\.replace\(/.test(text)) errors.push(`${sourcePath} não encaminha ao destino`)
    return true
  } catch (error) {
    errors.push(`${sourcePath} falhou: ${error.message}`)
    return false
  }
})

for (const asset of ['/ads.txt', '/robots.txt', '/llms.txt', '/llms-full.txt', '/manifest.webmanifest', '/sw.js']) {
  try {
    const { response, text } = await fetchText(`${BASE_URL}${asset}`)
    if (response.status !== 200 || !text.trim()) errors.push(`${asset} retornou ${response.status} ou vazio`)
    if (asset === '/ads.txt' && !text.includes('pub-5926952327268950')) errors.push('ads.txt não contém o publisher esperado')
    if (asset === '/robots.txt' && !text.includes(`${BASE_URL}/sitemap.xml`)) errors.push('robots.txt não referencia o sitemap canônico')
  } catch (error) {
    errors.push(`${asset} falhou: ${error.message}`)
  }
}

const missingPath = `/auditoria-404-${Date.now()}/`
try {
  const { response, text } = await fetchText(`${BASE_URL}${missingPath}`, { redirect: 'manual' })
  if (response.status !== 404) errors.push(`URL inexistente retornou ${response.status}; esperado 404`)
  if (!/\bnoindex\b/i.test(robotsFrom(text))) errors.push('página 404 não declara noindex')
  if (canonicalFrom(text)) errors.push('página 404 não deve declarar canonical')
  if (/pagead2\.googlesyndication\.com/i.test(text)) errors.push('página 404 contém carregador publicitário')
} catch (error) {
  errors.push(`verificação de 404 falhou: ${error.message}`)
}

for (const variant of ['http://monitorsmith.app/', 'https://www.monitorsmith.app/', 'http://www.monitorsmith.app/']) {
  try {
    const { response } = await fetchText(variant, { redirect: 'manual' })
    const location = response.headers.get('location')
    if (response.status < 300 || response.status >= 400 || !location || new URL(location, variant).href !== `${BASE_URL}/`) {
      errors.push(`${variant} não redireciona diretamente ao host canônico (${response.status}, ${location || 'sem Location'})`)
    }
  } catch (error) {
    errors.push(`${variant} falhou: ${error.message}`)
  }
}

console.log(`Sitemap: ${sitemapUrls.length} URLs; ${canonicalResults.filter(Boolean).length} canônicas disponíveis.`)
console.log(`Migrações: ${migrationResults.filter(Boolean).length}/${LEGACY_REDIRECTS.length} destinos preservados.`)
console.log(`Problemas: ${errors.length}.`)

if (errors.length) {
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log('Produção íntegra: URLs canônicas, migrações, arquivos públicos, 404 e variantes de domínio validados.')
}
