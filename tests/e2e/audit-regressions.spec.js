import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('ms_consent_v2', JSON.stringify({ decided: true, ads: false, personalization: false }));
  });
});

for (const reducedMotion of ['reduce', 'no-preference']) {
  test(`navbar contains every control after opening a tool from the collapsed home (${reducedMotion})`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion });
    await page.goto('/');
    const navbar = page.getByRole('navigation', { name: 'Controles do MonitorSmith' });
    const card = page.locator('#monitor-tool-grid-dead-pixel');
    await card.scrollIntoViewIfNeeded();
    await expect(navbar.getByRole('button', { name: 'Expandir controles do MonitorSmith' })).toBeVisible();
    // Open while the collapse animation can still be in flight.
    await card.click();
    await expect(page).toHaveURL(/#dead-pixel$/);
    await expect(navbar.getByRole('button', { name: 'Compartilhar MonitorSmith' })).toBeVisible();
    await expect.poll(() => navbar.evaluate((nav) => {
      const box = nav.getBoundingClientRect();
      return [...nav.querySelectorAll('button')].filter((button) => {
        const rect = button.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && (
          rect.left < box.left - 1 || rect.right > box.right + 1 ||
          rect.top < box.top - 1 || rect.bottom > box.bottom + 1
        );
      }).length;
    })).toBe(0);
    const bounds = await navbar.boundingBox();
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(page.viewportSize().width + 1);
    await navbar.getByRole('button', { name: 'Abrir atalhos de teclado' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });
}

test('Lenis mantém rolagem suave sincronizada pelo ticker GSAP', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-desktop', 'o delta de wheel é normalizado na emulação móvel');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const runtimeErrors = [];
  page.on('pageerror', (error) => runtimeErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(message.text());
  });

  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.mouse.wheel(0, 700);

  const samples = [];
  for (let index = 0; index < 16; index += 1) {
    await page.waitForTimeout(100);
    samples.push(await page.evaluate(() => ({
      y: Math.round(window.scrollY),
      smooth: document.documentElement.classList.contains('lenis-smooth'),
    })));
  }

  const positions = samples.map(({ y }) => y);
  expect(positions[0]).toBeGreaterThan(0);
  expect(positions[0]).toBeLessThan(650);
  expect(new Set(positions).size).toBeGreaterThanOrEqual(5);
  expect(positions.every((position, index) => index === 0 || position >= positions[index - 1])).toBe(true);
  expect(positions.at(-1)).toBeGreaterThanOrEqual(680);
  expect(samples.some(({ smooth }) => smooth)).toBe(true);
  expect(runtimeErrors).toEqual([]);
});

test('ruler stays bounded and preserves calibrated distances at small and large scales', async ({ page }) => {
  await page.goto('/#screen-ruler');
  const slider = page.getByTestId('ruler-card');
  const strip = page.getByTestId('ruler-strip');
  for (const calibration of [320, 10, 1, 2000]) {
    // Dispatch a native input event so the calibration updates through React.
    await slider.evaluate((input, value) => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
      setter.call(input, String(value));
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }, calibration);
    await expect(slider).toHaveValue(String(calibration));
    for (const [unit, unitMm] of [['cm', 10], ['inch', 25.4]]) {
      await page.getByTestId(`ruler-unit-${unit}`).click();
      const geometry = await strip.evaluate((element) => ({
        width: element.clientWidth,
        marks: element.children.length,
        labels: [...element.querySelectorAll('em')].map((label) => ({
          value: Number(label.textContent),
          left: parseFloat(label.parentElement.style.left),
        })),
      }));
      expect(geometry.marks).toBeGreaterThan(1);
      expect(geometry.marks).toBeLessThanOrEqual(Math.ceil(geometry.width / 3) + 1);
      expect(geometry.labels.length).toBeGreaterThanOrEqual(1);
      for (const label of geometry.labels) {
        expect(label.left).toBeCloseTo(label.value * calibration / 85.6 * unitMm, 2);
      }
      const length = (geometry.width / (calibration / 85.6 * unitMm)).toFixed(1);
      await expect(page.getByText(`Comprimento visível: ${length} ${unit === 'cm' ? 'cm' : 'in'}`, { exact: true })).toBeVisible();
    }
  }
});

test('featured reading times match the expanded articles and blog index', async ({ page, request }) => {
  await page.goto('/');
  const cards = page.locator('#guias article');
  await expect(cards).toHaveCount(6);
  const blogResponse = await request.get('/blog/');
  expect(blogResponse.ok()).toBe(true);
  const blogHtml = await blogResponse.text();
  for (const card of await cards.all()) {
    const href = await card.locator('h3 a').getAttribute('href');
    const response = await request.get(href);
    expect(response.ok(), href).toBe(true);
    const html = await response.text();
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, json]) => JSON.parse(json));
    const article = schemas.find((schema) => schema.wordCount);
    expect(article, href).toBeDefined();
    const expected = `${Math.max(3, Math.ceil(article.wordCount / 200))} min`;
    await expect(card.locator('.msx-card__top')).toContainText(expected);
    expect(html).toContain(`${expected} de leitura`);
    const indexCard = [...blogHtml.matchAll(/<article class="card">([\s\S]*?)<\/article>/g)]
      .find(([, content]) => content.includes(`href="${href}"`));
    expect(indexCard[1]).toContain(`<span>${expected}</span>`);
  }
});
