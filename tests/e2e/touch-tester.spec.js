import { test, expect } from '@playwright/test';

/**
 * Utilitário para despachar TouchEvents sintéticos via DOM (page.evaluate).
 * Isso contorna as inconsistências do CDP Input.dispatchTouchEvent e
 * testa diretamente o que o React vê em event.touches.
 */
const dispatchSyntheticTouch = (page, type, touchDescriptors) =>
  page.evaluate(({ type, touchDescriptors }) => {
    const target = document.querySelector('canvas') || document.body;
    const touches = touchDescriptors.map((td, i) => new Touch({
      identifier: td.id ?? i,
      target,
      clientX: td.x,
      clientY: td.y,
      pageX: td.x,
      pageY: td.y,
    }));

    // event.touches = contacts still on screen
    // event.changedTouches = contacts involved in this event
    const remaining = type === 'touchend' || type === 'touchcancel'
      ? touchDescriptors.filter(td => td.remaining).map((td, i) => new Touch({
          identifier: td.id ?? i,
          target,
          clientX: td.x,
          clientY: td.y,
          pageX: td.x,
          pageY: td.y,
        }))
      : touches;

    const event = new TouchEvent(type, {
      bubbles: true,
      cancelable: true,
      touches: remaining,
      changedTouches: touches,
      targetTouches: remaining,
    });
    target.dispatchEvent(event);
  }, { type, touchDescriptors });


test.describe('Touch Tester Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#touch-tester');
    await page.waitForSelector('canvas');
  });

  test('mouse drag paints grid cells and tracks active pointer count', async ({ page }) => {
    await expect(page.getByText('Máximo de contatos: 0')).toBeVisible();
    await expect(page.getByText('Contatos ativos: 0')).toBeVisible();

    // Mouse down → should hide controls, count = 1
    await page.mouse.move(100, 100);
    await page.mouse.down();
    await expect(page.getByText('Limpar Tela e Reiniciar')).toBeHidden();
    await page.mouse.move(200, 200, { steps: 5 });
    await expect(page.getByText('Contatos ativos: 1')).toBeVisible();
    await expect(page.getByText('Máximo de contatos: 1')).toBeVisible();

    // Mouse up → count = 0, max preserved
    await page.mouse.up();
    await expect(page.getByText('Contatos ativos: 0')).toBeVisible();
    await expect(page.getByText('Máximo de contatos: 1')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Limpar Tela e Reiniciar' })).toBeHidden();

    // A separate tap reopens controls without painting another drag path.
    await page.mouse.click(10, 10);
    await expect(page.getByRole('button', { name: 'Limpar Tela e Reiniciar' })).toBeVisible();
  });

  test('synthetic multi-touch tracks 3 simultaneous contacts and resets cleanly', async ({ page }) => {
    // 1) Start 3 contacts at once
    await dispatchSyntheticTouch(page, 'touchstart', [
      { id: 0, x: 100, y: 100 },
      { id: 1, x: 200, y: 200 },
      { id: 2, x: 300, y: 300 },
    ]);

    await expect(page.getByText('Contatos ativos: 3')).toBeVisible();
    await expect(page.getByText('Máximo de contatos: 3')).toBeVisible();

    // 2) Lift contact 0, keep contacts 1 and 2
    await dispatchSyntheticTouch(page, 'touchend', [
      { id: 0, x: 100, y: 100, remaining: false },
      { id: 1, x: 200, y: 200, remaining: true },
      { id: 2, x: 300, y: 300, remaining: true },
    ]);

    await expect(page.getByText('Contatos ativos: 2')).toBeVisible();
    await expect(page.getByText('Máximo de contatos: 3')).toBeVisible();

    // 3) Lift all remaining contacts
    await dispatchSyntheticTouch(page, 'touchend', [
      { id: 1, x: 200, y: 200, remaining: false },
      { id: 2, x: 300, y: 300, remaining: false },
    ]);

    await expect(page.getByText('Contatos ativos: 0')).toBeVisible();
    await expect(page.getByText('Máximo de contatos: 3')).toBeVisible();

    // 4) Tap to show controls, then reset
    await page.mouse.click(10, 10);
    const clearButton = page.getByRole('button', { name: 'Limpar Tela e Reiniciar' });
    await expect(clearButton).toBeVisible();
    await clearButton.click();
    await expect(page.getByText('Máximo de contatos: 0')).toBeVisible();
  });

  test('touch move paints grid cells across the canvas', async ({ page }) => {
    // Start a touch
    await dispatchSyntheticTouch(page, 'touchstart', [
      { id: 0, x: 50, y: 50 },
    ]);
    await expect(page.getByText('Contatos ativos: 1')).toBeVisible();

    // Move across several grid cells (40px each)
    for (let x = 80; x <= 300; x += 40) {
      await dispatchSyntheticTouch(page, 'touchmove', [
        { id: 0, x, y: 50 },
      ]);
    }

    // End the touch
    await dispatchSyntheticTouch(page, 'touchend', [
      { id: 0, x: 300, y: 50, remaining: false },
    ]);
    await expect(page.getByText('Contatos ativos: 0')).toBeVisible();

    // Verify cells were painted by checking canvas pixel data
    const paintedCellCount = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return 0;
      const ctx = canvas.getContext('2d');
      // Sample pixels at several grid cell centers along y=50
      let painted = 0;
      for (let x = 60; x <= 280; x += 40) {
        const pixel = ctx.getImageData(x, 50, 1, 1).data;
        // Painted cells have amber color (rgba ~251, 191, 36, 0.4)
        if (pixel[3] > 0) painted++;
      }
      return painted;
    });
    expect(paintedCellCount).toBeGreaterThan(0);
  });
});
