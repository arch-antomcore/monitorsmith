import { expect, test } from '@playwright/test';
import { TOOLS_REGISTRY } from '../../src/constants/tools.js';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('ms_consent_v2', JSON.stringify({ decided: true, ads: false, personalization: false }));
  });
});

test('every advertised tool shortcut opens its registered tool', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#monitor-tools-home')).toBeVisible();

  for (const tool of TOOLS_REGISTRY.filter((entry) => entry.keyboard)) {
    await test.step(`${tool.keyboard.label}: ${tool.id}`, async () => {
      // Moving focus away from a tool's textbox is intentional: text entry
      // must remain exempt from shortcuts.
      await page.locator('#main-content').focus();
      await page.keyboard.press(tool.keyboard.key);
      await expect(page).toHaveURL(new RegExp(`#${tool.id}$`));
      await expect(page.locator('#main-content > h1')).toHaveText(tool.heroTitle || tool.title);
      await expect(page.locator('#main-content .display-mode')).toBeVisible();
    });
  }
});

test('new tool shortcuts preserve typed text and wait until help is closed', async ({ page }) => {
  await page.goto('/#message');
  const message = page.locator('#message-content');
  await message.fill('');
  await page.keyboard.type('iraudo');
  await expect(message).toHaveValue('iraudo');
  await expect(page).toHaveURL(/#message$/);

  await page.getByRole('button', { name: 'Abrir atalhos de teclado' }).click();
  const help = page.getByRole('dialog', { name: 'Atalhos de teclado' });
  await expect(help).toBeVisible();
  await page.keyboard.press('i');
  await page.keyboard.press('2');
  await expect(page).toHaveURL(/#message$/);
  await page.keyboard.press('Escape');
  await expect(help).toHaveCount(0);
  await expect(page).toHaveURL(/#message$/);
  await page.locator('#main-content').focus();
  await page.keyboard.press('i');
  await expect(page).toHaveURL(/#display-info$/);
});

test('keyboard test pauses while a dialog is open and Escape only closes the dialog', async ({ page }) => {
  await page.goto('/#keyboard-test');
  await expect(page.getByTestId('keyboard-reset')).toBeVisible();
  await page.getByRole('button', { name: 'Abrir atalhos de teclado' }).click();
  const help = page.getByRole('dialog', { name: 'Atalhos de teclado' });
  await expect(help).toBeVisible();
  await page.keyboard.press('b');
  await page.keyboard.press('Escape');
  await expect(help).toHaveCount(0);
  await expect(page).toHaveURL(/#keyboard-test$/);
  await expect(page.getByTestId('keyboard-reset')).toBeVisible();
  const history = page.locator('.display-mode--keyboard-test li');
  await expect(history.filter({ hasText: 'KeyB' })).toHaveCount(0);

  await page.keyboard.press('b');
  await expect(history.filter({ hasText: 'KeyB' })).toHaveCount(1);
  await expect(page).toHaveURL(/#keyboard-test$/);
  await page.keyboard.press('Escape');
  await expect(page.locator('#monitor-tools-home')).toBeVisible();
});
