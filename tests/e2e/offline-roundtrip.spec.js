import { expect, test } from '@playwright/test'

test('reabre offline e carrega ferramentas ainda não visitadas', async ({ page, context }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/#black')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/tela preta/i)
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready
    if (!navigator.serviceWorker.controller) {
      await new Promise((resolve) => navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true }))
    }
  })

  await context.setOffline(true)
  try {
    await page.reload()
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/tela preta/i)
    await page.keyboard.press('Escape')
    await page.locator('#monitor-tool-grid-display-calculators').click()
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Calculadoras de display/i)
    await page.keyboard.press('Escape')
    await page.locator('#monitor-tool-grid-audio-test').click()
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Teste de áudio/i)
    expect(errors).toEqual([])
  } finally {
    await context.setOffline(false)
  }
})
