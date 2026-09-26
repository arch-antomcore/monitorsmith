import { expect, test } from '@playwright/test';

const SCROLLABLE_TOOLS = [
  'display-info', 'refresh-rate', 'reaction-test', 'keyboard-test', 'mouse-test',
  'gamepad-test', 'audio-test', 'webcam-test', 'display-calculators', 'screen-ruler',
];

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('ms_consent_v2', JSON.stringify({ decided: true, ads: false, personalization: false }));
  });
});

for (const layout of ['default', 'landscape']) {
  test(`scrollable instrument headers clear the floating navbar (${layout})`, async ({ page }) => {
    test.setTimeout(90_000);
    if (layout === 'landscape') await page.setViewportSize({ width: 844, height: 390 });

    for (const tool of SCROLLABLE_TOOLS) {
      await test.step(tool, async () => {
        await page.goto(`/#${tool}`);
        await expect(page.locator(`.display-mode--${tool} .msx-tool-head`)).toBeVisible();
        await expect.poll(() => page.evaluate((toolId) => {
          const nav = document.querySelector('.wbp-navbar');
          const header = document.querySelector(`.display-mode--${toolId} .msx-tool-head`);
          // A hash change can briefly unmount the previous instrument.
          if (!nav || !header) return -1;
          return header.getBoundingClientRect().top - nav.getBoundingClientRect().bottom;
        }, tool), { message: `${tool}: heading and actions must start below the navbar` }).toBeGreaterThanOrEqual(8);

        if (tool === 'keyboard-test') {
          // Visibility alone does not detect a button partially covered by the
          // fixed navbar: verify its full bounds and pointer hit target.
          const reset = page.getByTestId('keyboard-reset');
          const geometry = await reset.evaluate((button) => {
            const rect = button.getBoundingClientRect();
            const nav = document.querySelector('.wbp-navbar').getBoundingClientRect();
            const target = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
            return { top: rect.top, navbarBottom: nav.bottom, receivesPointer: button.contains(target) };
          });
          expect(geometry.top).toBeGreaterThanOrEqual(geometry.navbarBottom + 8);
          expect(geometry.receivesPointer).toBe(true);
        }
      });
    }
  });
}
