import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

let database;
let transaction;
let request;
let store;

beforeEach(() => {
  vi.resetModules();
  store = { clear: vi.fn(() => request), put: vi.fn(), getAll: vi.fn(() => request) };
  transaction = { objectStore: () => store, abort: vi.fn(), error: null };
  request = { result: [] };
  database = { transaction: vi.fn(() => transaction), close: vi.fn() };
  const indexedDB = {
    open: vi.fn(() => {
      const openRequest = { result: database };
      queueMicrotask(() => openRequest.onsuccess());
      return openRequest;
    }),
  };
  vi.stubGlobal('window', { indexedDB });
  vi.stubGlobal('indexedDB', indexedDB);
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

async function flushOpen() {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

describe('Sponsor Loop persistence transactions', () => {
  it('stores playlist positions independently of generated image identifiers', async () => {
    const { saveSponsorImages } = await import('../../src/lib/sponsorDB.js');
    const images = [{ id: 'z-first', name: 'first.png' }, { id: 'a-second', name: 'second.png' }];
    const result = saveSponsorImages(images);
    await flushOpen();
    expect(store.put.mock.calls.map(([record]) => [record.id, record.position])).toEqual([
      ['z-first', 0], ['a-second', 1],
    ]);
    transaction.oncomplete();
    await expect(result).resolves.toEqual({ success: true });
  });

  it('restores playlist order instead of IndexedDB key order', async () => {
    const { loadSponsorImages } = await import('../../src/lib/sponsorDB.js');
    const result = loadSponsorImages();
    await flushOpen();
    request.result = [{ id: 'a', position: 1 }, { id: 'z', position: 0 }];
    request.onsuccess();
    transaction.oncomplete?.();
    await expect(result).resolves.toEqual({ success: true, data: [{ id: 'z', position: 0 }, { id: 'a', position: 1 }] });
  });

  it('keeps old stored playlists without positions readable', async () => {
    const { loadSponsorImages } = await import('../../src/lib/sponsorDB.js');
    const result = loadSponsorImages();
    await flushOpen();
    request.result = [{ id: 'old-a' }, { id: 'old-b' }];
    request.onsuccess();
    transaction.oncomplete?.();
    await expect(result).resolves.toEqual({ success: true, data: request.result });
  });

  it('does not acknowledge deletion until the transaction commits', async () => {
    const { clearSponsorImages } = await import('../../src/lib/sponsorDB.js');
    const settled = vi.fn();
    store.clear.mockReturnValue(request);
    const result = clearSponsorImages().then(settled);
    await flushOpen();
    request.onsuccess?.();
    await flushOpen();
    expect(settled).not.toHaveBeenCalled();
    transaction.oncomplete();
    await result;
    expect(settled).toHaveBeenCalledWith({ success: true });
  });

  it.each(['saveSponsorImages', 'clearSponsorImages', 'loadSponsorImages'])('settles aborted %s operations as failures', async (method) => {
    const persistence = await import('../../src/lib/sponsorDB.js');
    const result = persistence[method]([]);
    await flushOpen();
    transaction.error = new Error('transaction aborted');
    expect(transaction.onabort).toBeTypeOf('function');
    transaction.onabort();
    await expect(result).resolves.toMatchObject({ success: false });
  });

  it('retries opening storage after a transient failure', async () => {
    indexedDB.open.mockImplementationOnce(() => {
      const failed = { error: new Error('temporarily unavailable') };
      queueMicrotask(() => failed.onerror());
      return failed;
    });
    const { loadSponsorImages } = await import('../../src/lib/sponsorDB.js');
    await expect(loadSponsorImages()).resolves.toMatchObject({ success: false });
    const retry = loadSponsorImages();
    await flushOpen();
    expect(indexedDB.open).toHaveBeenCalledTimes(2);
    request.onsuccess();
    transaction.oncomplete?.();
    await expect(retry).resolves.toMatchObject({ success: true });
  });
});
