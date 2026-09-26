import { expect, test } from '@playwright/test';

const errors = new WeakMap();
test.use({ locale: 'pt-BR' });

test.beforeEach(async ({ page }) => {
  const observed = [];
  errors.set(page, observed);
  page.on('pageerror', (error) => observed.push(error.message));
  await page.addInitScript(() => {
    localStorage.setItem('ms_consent_v2', JSON.stringify({ decided: true, ads: false, personalization: false }));
  });
});

test.afterEach(({ page }) => expect(errors.get(page)).toEqual([]));

for (const tool of ['webcam-test', 'audio-test']) {
  test(`${tool} stops a capture granted after leaving the tool`, async ({ page }) => {
    await page.addInitScript(() => {
      window.captureRequests = 0;
      window.stoppedTracks = 0;
      navigator.mediaDevices.getUserMedia = () => {
        window.captureRequests += 1;
        return new Promise((resolve) => {
          window.finishCapture = () => resolve({
            getTracks: () => [{ stop: () => { window.stoppedTracks += 1; } }],
          });
        });
      };
    });
    await page.goto(`/#${tool}`);
    await page.getByTestId(tool === 'webcam-test' ? 'webcam-toggle' : 'audio-mic-toggle').click();
    await expect.poll(() => page.evaluate(() => window.captureRequests)).toBe(1);
    await page.keyboard.press('Escape');
    await expect(page.locator('#monitor-tools-home')).toBeVisible();
    await page.evaluate(() => window.finishCapture());
    await expect.poll(() => page.evaluate(() => window.stoppedTracks)).toBe(1);
  });
}

test('switching audio channel retains the new playing state', async ({ page }) => {
  await page.goto('/#audio-test');
  await page.getByTestId('audio-left').click();
  await expect(page.getByTestId('audio-left')).toHaveAttribute('aria-pressed', 'true');
  await page.getByTestId('audio-right').click();
  // An ended event from the old oscillator must not clear the new oscillator.
  await page.waitForTimeout(150);
  await expect(page.getByTestId('audio-right')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('audio-left')).toHaveAttribute('aria-pressed', 'false');
  await page.getByTestId('audio-stop').click();
  await expect(page.getByTestId('audio-right')).toHaveAttribute('aria-pressed', 'false');
});

test('keyboard controls remain reachable and activatable with keys', async ({ page }) => {
  await page.goto('/#keyboard-test');
  const reset = page.getByTestId('keyboard-reset');
  await reset.focus();
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('keyboard-back')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#monitor-tools-home')).toBeVisible();
});

test('mouse counts chorded buttons, releases outside, and prevents wheel scrolling', async ({ page }) => {
  await page.goto('/#mouse-test');
  const zone = page.getByTestId('mouse-zone');
  const restingBackground = await page.getByTestId('mouse-btn-left').evaluate((element) => getComputedStyle(element).backgroundColor);
  await zone.hover();
  await page.mouse.down({ button: 'left' });
  await page.mouse.down({ button: 'right' });
  await expect(page.getByTestId('mouse-btn-left')).toContainText(': 1');
  await expect(page.getByTestId('mouse-btn-right')).toContainText(': 1');
  await page.mouse.move(2, 2);
  await page.mouse.up({ button: 'left' });
  await page.mouse.up({ button: 'right' });
  await expect(page.getByTestId('mouse-btn-left')).toHaveCSS('background-color', restingBackground);
  const prevented = await zone.evaluate((element) => {
    const event = new WheelEvent('wheel', { deltaY: 100, bubbles: true, cancelable: true });
    element.dispatchEvent(event);
    return event.defaultPrevented;
  });
  expect(prevented).toBe(true);
});

test('gamepads without standard stick axes do not claim drift or infinite values', async ({ page }) => {
  await page.addInitScript(() => {
    navigator.getGamepads = () => [{ id: 'Button-only controller', index: 0, mapping: '', buttons: [{ pressed: false, value: 0 }], axes: [] }];
  });
  await page.goto('/#gamepad-test');
  await expect(page.locator('.msx-readout__value').filter({ hasText: 'Button-only controller' })).toBeVisible();
  await expect(page.getByTestId('gamepad-rumble')).toBeDisabled();
  await expect(page.locator('.msx-tool-body')).not.toContainText('Infinity');
  await expect(page.locator('.msx-tool-body')).toContainText('Este mapeamento não permite identificar os analógicos.');
});

test('ruler rejects extreme diagonal input and reports actual visible length', async ({ page }) => {
  await page.goto('/#screen-ruler');
  const slider = page.getByTestId('ruler-card');
  const previous = await slider.inputValue();
  await page.getByTestId('ruler-diagonal').fill('9999999999');
  await expect(slider).toHaveValue(previous);
  const expected = await page.getByTestId('ruler-strip').evaluate((element) => (element.clientWidth / (320 / 85.6 * 10)).toFixed(1));
  await expect(page.getByText(`Comprimento visível: ${expected} cm`, { exact: true })).toBeVisible();
});

test('invalid calculator inputs do not produce a cable recommendation', async ({ page }) => {
  await page.goto('/#display-calculators');
  await page.getByTestId('calc-width').fill('-1');
  await expect(page.getByRole('status')).toContainText('Informe valores dentro dos limites');
  await expect(page.getByText('HDMI 1.4', { exact: true })).toHaveCount(0);
});
