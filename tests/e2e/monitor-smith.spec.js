import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const TOOL_IDS = [
  'black',
  'dead-pixel',
  'cleaner',
  'calibration',
  'white',
  'color',
  'green-screen',
  'focus-timer',
  'clock',
  'message',
  'sponsor-loop',
]

const PAGE_ERRORS = new WeakMap()

test.beforeEach(({ page }) => {
  const errors = []
  PAGE_ERRORS.set(page, errors)
  page.on('pageerror', (error) => errors.push(error.message))
})

test.afterEach(({ page }) => {
  expect(PAGE_ERRORS.get(page), 'erros JavaScript não tratados na página').toEqual([])
})

test('home apresenta o catálogo completo sem violações automáticas WCAG A/AA', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('[id^="monitor-tool-"]')).toHaveCount(TOOL_IDS.length)
  await expect(page.getByRole('button', { name: /11 ferramentas/i })).toBeVisible()
  await expect(page.locator('.ms-ad-container')).toHaveCount(0)

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze()

  expect(results.violations).toEqual([])
})

for (const toolId of TOOL_IDS) {
  test(`abre e fecha a ferramenta ${toolId} por interação real`, async ({ page }) => {
    await page.goto('/')
    await page.locator(`#monitor-tool-${toolId}`).click()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('#monitor-tools-home')).toHaveCount(0)
    await expect(page.locator('.app-mode-layer')).toHaveCSS('opacity', '1')

    const controls = page.locator('.display-mode__controls')
    if (await controls.count()) {
      await expect(controls).toHaveCSS('opacity', '1')
    }

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze()
    expect(results.violations).toEqual([])

    await page.keyboard.press('Escape')
    await expect(page.locator('#monitor-tools-home')).toBeVisible()
  })
}

test('deep link de tela verde aplica o preset chroma', async ({ page }) => {
  await page.goto('/?tool=green-screen')

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Escolher cor do estúdio' })).toHaveValue('#00b140')
  await expect(page.getByRole('slider', { name: 'Intensidade da luz' })).toHaveValue('100')
})

test('menu radial é nomeado e realmente troca a ferramenta', async ({ page }) => {
  await page.goto('/?tool=black')
  await expect(page.getByRole('heading', { level: 1, name: /Tela preta/i })).toBeVisible()

  await page.locator('.app-mode-layer').click({ button: 'right', position: { x: 180, y: 220 } })
  const menu = page.getByRole('menu', { name: 'Troca rápida de ferramenta' })
  await expect(menu).toBeVisible()
  await expect(menu.getByRole('menuitem')).toHaveCount(10)

  await menu.getByRole('menuitem', { name: /Pixels/i }).click()
  await expect(page.getByRole('heading', { level: 1, name: /Teste de pixels/i })).toBeVisible()
})

test('layout não cria rolagem horizontal no viewport corrente', async ({ page }) => {
  await page.goto('/')
  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    content: document.documentElement.scrollWidth,
  }))
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1)
})

test('manifest e service worker de produção estão publicados', async ({ page, request }) => {
  await page.goto('/')
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', '/manifest.webmanifest')

  const [manifestResponse, workerResponse] = await Promise.all([
    request.get('/manifest.webmanifest'),
    request.get('/sw.js'),
  ])
  expect(manifestResponse.ok()).toBeTruthy()
  expect(workerResponse.ok()).toBeTruthy()

  const manifest = await manifestResponse.json()
  expect(manifest.icons.some((icon) => String(icon.sizes).includes('192x192'))).toBeTruthy()
  expect(manifest.icons.some((icon) => String(icon.sizes).includes('512x512'))).toBeTruthy()
  expect(await workerResponse.text()).not.toContain("CACHE_VERSION = 'monitorsmith-dev'")
})
