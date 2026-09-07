import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('mudanças diretas no hash, presets e histórico conservam a ferramenta correta', async ({ page }) => {
  await page.goto('/#black');
  await expect(page.getByRole('heading', { level: 1, name: /Tela preta/i })).toBeVisible();
  await page.evaluate(() => { location.hash = 'color?color=123456&brightness=42'; });
  const color = page.getByRole('textbox', { name: 'Escolher cor do estúdio' });
  await expect(color).toHaveValue('#123456');
  await expect(page.getByRole('slider', { name: 'Intensidade da luz' })).toHaveValue('42');
  await page.reload();
  await expect(color).toHaveValue('#123456');
  await page.keyboard.press('Escape');
  await expect(page.locator('#monitor-tools-home')).toBeVisible();
  await expect(page).not.toHaveURL(/color=|brightness=/);
  await page.goBack();
  await expect(color).toHaveValue('#123456');
});

test('âncoras editoriais permanecem na URL e há um único landmark principal', async ({ page }) => {
  await page.goto('/#faq');
  await expect(page.locator('#monitor-tools-home')).toBeVisible();
  await expect(page).toHaveURL(/#faq$/);
  await expect(page.getByRole('main')).toHaveCount(1);
});

test('atalhos numéricos respeitam modificadores, composição e repetição', async ({ page }) => {
  await page.goto('/#black');
  await expect(page.getByRole('heading', { level: 1, name: /Tela preta/i })).toBeVisible();
  await page.evaluate(() => {
    for (const options of [{ ctrlKey: true }, { altKey: true }, { metaKey: true }, { isComposing: true }, { repeat: true }]) {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: '2', bubbles: true, ...options }));
    }
  });
  await expect(page).toHaveURL(/#black$/);
});

test('tela verde lançada pelo catálogo aplica cor e brilho do preset', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('open-green-screen').click();
  await expect(page.getByRole('textbox', { name: 'Escolher cor do estúdio' })).toHaveValue('#00b140');
  await expect(page.getByRole('slider', { name: 'Intensidade da luz' })).toHaveValue('100');
});

test('recusar clipboard mostra feedback e não gera erro não tratado', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
      writeText: () => Promise.reject(new DOMException('Not allowed', 'NotAllowedError')),
    } });
  });
  await page.goto('/#black');
  await page.getByRole('button', { name: 'Compartilhar MonitorSmith' }).click();
  await expect(page.getByText('Não foi possível copiar. Copie o endereço da barra do navegador.')).toBeVisible();
  expect(errors).toEqual([]);
});

test.describe('primeiro acesso e armazenamento restrito', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('introdução real contém o foco e fecha por Escape sem lançar atalhos', async ({ page }) => {
    await page.goto('/');
    const intro = page.getByRole('dialog', { name: 'Introdução ao MonitorSmith' });
    await expect(intro).toBeVisible();
    await expect(page.locator('#root')).toHaveAttribute('inert', '');
    for (let index = 0; index < 10; index += 1) {
      await page.keyboard.press('Tab');
      expect(await intro.evaluate((element) => element.contains(document.activeElement))).toBe(true);
    }
    await page.keyboard.press('b');
    await expect(intro).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(intro).toHaveCount(0);
    await expect(page.locator('#root')).not.toHaveAttribute('inert', '');
    await expect(page.locator('#monitor-tools-home')).toBeVisible();
  });

  test('bloquear localStorage não impede dispensar introdução e usar ferramentas', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(() => {
      for (const method of ['getItem', 'setItem', 'removeItem']) {
        Storage.prototype[method] = () => { throw new DOMException('Blocked', 'SecurityError'); };
      }
    });
    await page.goto('/');
    await page.getByRole('button', { name: 'Pular introdução' }).click();
    await page.getByTestId('open-black').click();
    await expect(page.getByRole('heading', { level: 1, name: /Tela preta/i })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#monitor-tools-home')).toBeVisible();
    expect(errors).toEqual([]);
  });
});

for (const theme of ['dark', 'light']) {
  test(`home ${theme} atende verificações automáticas WCAG AA`, async ({ page }) => {
    await page.addInitScript((value) => localStorage.setItem('ms_studio_theme', value), theme);
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(results.violations).toEqual([]);
  });
}
