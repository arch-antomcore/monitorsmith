import { readFile } from 'node:fs/promises'
import vm from 'node:vm'
import { describe, expect, it, vi } from 'vitest'

const ORIGIN = 'https://monitorsmith.app'

async function createWorker() {
  const listeners = new Map()
  const stores = new Map()
  const key = (request) => new URL(typeof request === 'string' ? request : request.url, ORIGIN).href
  const fetch = vi.fn(async () => {
    const response = new Response('network response')
    Object.defineProperty(response, 'type', { value: 'basic' })
    return response
  })
  const caches = {
    keys: async () => [...stores.keys()],
    delete: async (name) => stores.delete(name),
    open: async (name) => {
      if (!stores.has(name)) stores.set(name, new Map())
      const store = stores.get(name)
      return {
        async addAll(requests) {
          const entries = await Promise.all(requests.map(async (request) => {
            const response = await fetch(request)
            if (!response.ok) throw new Error('Precache failed')
            return [key(request), response]
          }))
          entries.forEach(([url, response]) => store.set(url, response))
        },
        async match(request, options = {}) {
          const wanted = key(request)
          for (const [url, response] of store) {
            if (url === wanted || (options.ignoreSearch && url.split('?')[0] === wanted.split('?')[0])) return response.clone()
          }
        },
        put: async (request, response) => { store.set(key(request), response) },
        keys: async () => [...store.keys()].map((url) => new Request(url)),
        delete: async (request) => store.delete(key(request)),
      }
    },
  }
  const context = {
    self: { location: { origin: ORIGIN }, clients: { claim: vi.fn() }, addEventListener: (type, handler) => listeners.set(type, handler) },
    URL, Response,
    Request: class extends Request { constructor(url, options) { super(new URL(url, ORIGIN), options) } },
    caches, fetch,
  }
  vm.runInNewContext(await readFile('public/sw.js', 'utf8'), context)
  async function dispatch(type, request) {
    const pending = []
    let response
    listeners.get(type)({ request, waitUntil: (promise) => pending.push(promise), respondWith: (promise) => { response = promise } })
    const result = await response
    await Promise.all(pending)
    return result
  }
  return { stores, fetch, dispatch }
}

describe('service worker offline lifecycle', () => {
  it('preserves the app shell after the runtime cache exceeds its limit', async () => {
    const worker = await createWorker()
    await worker.dispatch('install')
    for (let index = 0; index < 125; index++) {
      await worker.dispatch('fetch', { method: 'GET', mode: 'navigate', url: `${ORIGIN}/article-${index}/` })
    }
    expect(worker.stores.get('monitorsmith-dev-runtime').size).toBe(120)
    expect(worker.stores.get('monitorsmith-dev').has(`${ORIGIN}/`)).toBe(true)
    worker.fetch.mockRejectedValue(new Error('offline'))
    const result = await worker.dispatch('fetch', { method: 'GET', mode: 'navigate', url: `${ORIGIN}/?tool=black` })
    expect(await result.text()).toBe('network response')
  })

  it('rejects installation when an essential resource is unavailable', async () => {
    const worker = await createWorker()
    worker.fetch.mockResolvedValueOnce(new Response('unavailable', { status: 503 }))
    await expect(worker.dispatch('install')).rejects.toThrow('Precache failed')
  })

  it('keeps both current caches while removing previous releases', async () => {
    const worker = await createWorker()
    for (const name of ['monitorsmith-dev', 'monitorsmith-dev-runtime', 'monitorsmith-old', 'unrelated-app']) worker.stores.set(name, new Map())
    await worker.dispatch('activate')
    expect([...worker.stores.keys()]).toEqual(['monitorsmith-dev', 'monitorsmith-dev-runtime', 'unrelated-app'])
  })

  it('serves precached static assets offline without contacting the network', async () => {
    const worker = await createWorker()
    await worker.dispatch('install')
    worker.fetch.mockClear().mockRejectedValue(new Error('offline'))
    const result = await worker.dispatch('fetch', { method: 'GET', destination: 'image', url: `${ORIGIN}/logo.png` })
    expect(await result.text()).toBe('network response')
    expect(worker.fetch).not.toHaveBeenCalled()
  })

  it('does not intercept third-party requests', async () => {
    const worker = await createWorker()
    expect(await worker.dispatch('fetch', { method: 'GET', destination: 'script', url: 'https://example.com/script.js' })).toBeUndefined()
    expect(worker.fetch).not.toHaveBeenCalled()
  })
})
