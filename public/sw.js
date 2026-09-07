/* MonitorSmith service worker.
 * The production build injects the app-shell manifest and a content hash.
 */
const CACHE_PREFIX = 'monitorsmith-'
const CACHE_VERSION = 'monitorsmith-dev'
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`
const PRECACHE_URLS = /*__PRECACHE_URLS__*/ [
  '/',
  '/manifest.webmanifest',
  '/logo.png',
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
  // Installation must fail if the shell is incomplete. Keep the previous worker
  // active instead of activating a release that cannot open offline.
  await cache.addAll(PRECACHE_URLS.map((url) => new Request(url, { cache: 'reload' })))
}

self.addEventListener('install', (event) => {
  event.waitUntil(cachePreload())
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys()
    await Promise.all(
      keys
        .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_VERSION && key !== RUNTIME_CACHE)
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
          // Cache failures (for example a full quota) must not hide an online response.
          const copy = response.clone()
          event.waitUntil((async () => {
            const cache = await caches.open(RUNTIME_CACHE)
            await cache.put(event.request, copy)
            await trimCache(cache)
          })().catch(() => undefined))
        }
        return response
      } catch {
        const runtime = await caches.open(RUNTIME_CACHE)
        const shell = await caches.open(CACHE_VERSION)
        return (
          await runtime.match(event.request, { ignoreSearch: true })
          || await shell.match(event.request, { ignoreSearch: true })
          || await shell.match('/')
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
    const shell = await caches.open(CACHE_VERSION)
    const shellAsset = await shell.match(event.request)
    // Hashed assets are immutable for this worker version and never evicted.
    if (shellAsset) return shellAsset
    const cache = await caches.open(RUNTIME_CACHE)
    const cached = await cache.match(event.request)
    const update = fetch(event.request)
      .then(async (response) => {
        if (isCacheableResponse(response)) {
          try {
            await cache.put(event.request, response.clone())
            await trimCache(cache)
          } catch { /* Storage failures do not prevent using the network. */ }
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
