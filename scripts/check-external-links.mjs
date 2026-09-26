import blogInspection from './blog-articles-inspection.mjs'
import blogCalibration from './blog-articles-calibration.mjs'
import blogProductivity from './blog-articles-productivity.mjs'

const articles = [...blogInspection, ...blogCalibration, ...blogProductivity]
const references = new Map()

for (const article of articles) {
  for (const source of article.sources || []) {
    const owners = references.get(source.url) || []
    owners.push(article.slug)
    references.set(source.url, owners)
  }
}

async function request(url, method) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15_000)
  try {
    const response = await fetch(url, {
      method,
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8',
        'User-Agent': 'MonitorSmith-Editorial-Link-Check/1.0 (+https://monitorsmith.app/politica-editorial/)',
        ...(method === 'GET' ? { Range: 'bytes=0-1023' } : {}),
      },
    })
    await response.body?.cancel()
    return { status: response.status, finalUrl: response.url }
  } finally {
    clearTimeout(timeout)
  }
}

async function inspect(url) {
  try {
    const head = await request(url, 'HEAD')
    if (head.status >= 200 && head.status < 400) return { ...head, level: 'ok' }
  } catch {
    // Alguns servidores recusam HEAD; o GET parcial abaixo é a verificação real.
  }

  try {
    const get = await request(url, 'GET')
    if (get.status >= 200 && get.status < 400) return { ...get, level: 'ok' }
    if ([401, 403, 429].includes(get.status)) return { ...get, level: 'warning' }
    return { ...get, level: 'error' }
  } catch (error) {
    return { status: 0, finalUrl: url, level: 'error', detail: error.message }
  }
}

const entries = [...references.entries()]
const results = []
let cursor = 0

async function worker() {
  while (cursor < entries.length) {
    const index = cursor++
    const [url, slugs] = entries[index]
    results[index] = { url, slugs, ...(await inspect(url)) }
  }
}

await Promise.all(Array.from({ length: Math.min(8, entries.length) }, () => worker()))

const warnings = results.filter((result) => result.level === 'warning')
const errors = results.filter((result) => result.level === 'error')

for (const result of warnings) {
  console.warn(`AVISO ${result.status}: ${result.url} (${result.slugs.join(', ')})`)
}
for (const result of errors) {
  console.error(`ERRO ${result.status || 'rede'}: ${result.url} (${result.slugs.join(', ')})${result.detail ? ` — ${result.detail}` : ''}`)
}

console.log(`Fontes externas: ${entries.length} URLs únicas; ${entries.length - warnings.length - errors.length} acessíveis, ${warnings.length} protegidas pelo servidor, ${errors.length} indisponíveis.`)

if (errors.length) process.exitCode = 1
