/* MonitorSmith service worker.
 * The production build injects the complete app-shell manifest and a content hash.
 */
const CACHE_PREFIX = 'monitorsmith-'
const CACHE_VERSION = 'monitorsmith-dev'
const PRECACHE_URLS = /*__PRECACHE_URLS__*/ [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
]
const RUNTIME_LIMIT = 120

const isCacheableResponse = (response) => (
  response && response.ok && (response.type === 'basic' || response.type === 'cors')
)

async function trimCache(cache, limit = RUNTIME_LIMIT) {
  const keys = await cache.keys()
  const excess = keys.length - limit
  if (excess > 0) {
    await Promise.all(keys.slice(0, excess).map((request) => cache.delete(request)))
  }
}

async function cachePreload() {
  const cache = await caches.open(CACHE_VERSION)
  await Promise.allSettled(
    PRECACHE_URLS.map(async (url) => {
      const request = new Request(url, { cache: 'reload' })
      const response = await fetch(request)
      if (isCacheableResponse(response)) await cache.put(request, response)
    }),
  )
}

self.addEventListener('install', (event) => {
  event.waitUntil(cachePreload())
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys()
    await Promise.all(
      keys
        .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_VERSION)
        .map((key) => caches.delete(key)),
    )
    await self.clients.claim()
  })())
})

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting()
  if (event.data?.type === 'GET_VERSION') {
    event.source?.postMessage({ type: 'SW_VERSION', version: CACHE_VERSION })
  }
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const url = new URL(event.request.url)
  if (url.origin !== self.location.origin) return

  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(event.request)
        if (isCacheableResponse(response)) {
          const cache = await caches.open(CACHE_VERSION)
          await cache.put(event.request, response.clone())
          event.waitUntil(trimCache(cache))
        }
        return response
      } catch {
        return (
          await caches.match(event.request, { ignoreSearch: true })
          || await caches.match('/index.html')
          || await caches.match('/')
          || Response.error()
        )
      }
    })())
    return
  }

  const destination = event.request.destination
  const isStaticAsset = ['script', 'style', 'image', 'font', 'manifest'].includes(destination)
  if (!isStaticAsset) return

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_VERSION)
    const cached = await cache.match(event.request)
    const update = fetch(event.request)
      .then(async (response) => {
        if (isCacheableResponse(response)) {
          await cache.put(event.request, response.clone())
          await trimCache(cache)
        }
        return response
      })

    if (cached) {
      event.waitUntil(update.catch(() => undefined))
      return cached
    }

    try {
      return await update
    } catch {
      return Response.error()
    }
  })())
})
