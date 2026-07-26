const CACHE_VERSION = 'monitorsmith-v5-precision';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  // Force the waiting service worker to become the active service worker immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_VERSION) {
            return caches.delete(key); // Clean up all stale v1 or old caches immediately!
          }
        })
      )
    )
  );
  // Take control of all open client tabs immediately without waiting for page reload
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Ignore ad networks and third-party tracking scripts
  if (
    url.hostname.includes('googlesyndication.com') ||
    url.hostname.includes('doubleclick.net') ||
    url.hostname.includes('googleadservices.com') ||
    url.hostname.includes('google.com')
  ) {
    return;
  }

  // 1. Navigation requests & HTML files: NETWORK-FIRST (prevents stale index.html pointing to deleted JS hashes)
  if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          // Only fall back to cache if network fails (offline mode)
          return caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // 2. Static Assets (JS, CSS, images, fonts): STALE-WHILE-REVALIDATE / CACHE FIRST
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        });
        // IMPORTANT: Never return /index.html fallback for asset requests (.js / .css / .woff2) that 404!
    })
  );
});
