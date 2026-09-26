import { expect, test } from '@playwright/test';

async function addImage(page, name) {
  await page.locator('input[type="file"]').setInputFiles({
    name,
    mimeType: 'image/png',
    buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64'),
  });
}

test('clear-all cancels decoding imports and does not restore removed images on reload', async ({ page }) => {
  await page.goto('/?tool=sponsor-loop');
  await expect(page.locator('.sponsor-loop__stage')).toBeVisible();
  await addImage(page, 'ready.png');
  await expect(page.locator('.sponsor-loop__thumb')).toHaveCount(1);

  await page.evaluate(() => {
    const decode = window.createImageBitmap.bind(window);
    window.createImageBitmap = (...args) => {
      if (args[0]?.name !== 'pending.png') return decode(...args);
      return new Promise((resolve, reject) => {
        window.releasePendingSponsorImage = () => decode(...args).then(resolve, reject);
      });
    };
  });
  await addImage(page, 'pending.png');
  await expect.poll(() => page.evaluate(() => typeof window.releasePendingSponsorImage)).toBe('function');
  await page.getByRole('button', { name: 'Limpar todas' }).click();
  await expect(page.locator('.sponsor-loop__thumb')).toHaveCount(0);
  await page.evaluate(() => window.releasePendingSponsorImage());
  // A new import is queued after the pending decode; observing it finish is a
  // deterministic boundary for checking that the cancelled file stayed removed.
  await addImage(page, 'after-clear.png');
  await expect(page.getByRole('button', { name: 'Exibir after-clear.png' })).toBeVisible();
  await expect(page.locator('.sponsor-loop__thumb')).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Exibir pending.png' })).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole('button', { name: 'Exibir after-clear.png' })).toBeVisible();
  await expect(page.locator('.sponsor-loop__thumb')).toHaveCount(1);
});

test('a failed storage clear is reported instead of claiming stored images were deleted', async ({ page }) => {
  await page.goto('/?tool=sponsor-loop');
  await expect(page.locator('.sponsor-loop__stage')).toBeVisible();
  await addImage(page, 'retained.png');
  await expect(page.locator('.sponsor-loop__thumb')).toHaveCount(1);
  // Wait for the image write to commit before aborting the following mutation.
  await page.evaluate(() => new Promise((resolve, reject) => {
    const request = indexedDB.open('MonitorSmithSponsorDB', 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction('sponsor_images', 'readonly');
      transaction.objectStore('sponsor_images').getAll();
      transaction.oncomplete = () => { db.close(); resolve(); };
    };
  }));
  await page.evaluate(() => {
    const original = IDBDatabase.prototype.transaction;
    IDBDatabase.prototype.transaction = function (...args) {
      const transaction = original.apply(this, args);
      if (args[1] === 'readwrite') queueMicrotask(() => transaction.abort());
      return transaction;
    };
  });
  await page.getByRole('button', { name: 'Limpar todas' }).click();
  await expect(page.locator('.display-mode__hint[role="status"]')).toContainText('Não foi possível remover');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Exibir retained.png' })).toBeVisible();
});
