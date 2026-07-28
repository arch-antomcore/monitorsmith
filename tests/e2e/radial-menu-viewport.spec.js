import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 667, height: 280 } })

test('menu rápido usa grade compacta e permanece dentro do visual viewport baixo', async ({ page }) => {
  await page.goto('/?tool=black')
  await expect(page.getByRole('heading', { level: 1, name: /Tela preta/i })).toBeVisible()

  await page.locator('.app-mode-layer').click({
    button: 'right',
    position: { x: 334, y: 140 },
  })

  const dialog = page.getByRole('dialog', { name: 'Seleção rápida de ferramenta' })
  const menu = page.getByRole('menu', { name: 'Troca rápida de ferramenta' })
  const items = menu.getByRole('menuitem')

  await expect(dialog).toHaveAttribute('data-layout', 'compact')
  await expect(items).toHaveCount(10)

  const geometry = await dialog.evaluate((element) => {
    const rect = element.getBoundingClientRect()
    const visualViewport = window.visualViewport
    const viewportTop = visualViewport?.offsetTop || 0
    const viewportLeft = visualViewport?.offsetLeft || 0
    const viewportWidth = visualViewport?.width || window.innerWidth
    const viewportHeight = visualViewport?.height || window.innerHeight
    return {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      viewportTop,
      viewportRight: viewportLeft + viewportWidth,
      viewportBottom: viewportTop + viewportHeight,
      viewportLeft,
    }
  })

  expect(geometry.top).toBeGreaterThanOrEqual(geometry.viewportTop)
  expect(geometry.left).toBeGreaterThanOrEqual(geometry.viewportLeft)
  expect(geometry.right).toBeLessThanOrEqual(geometry.viewportRight)
  expect(geometry.bottom).toBeLessThanOrEqual(geometry.viewportBottom)

  await page.keyboard.press('ArrowDown')
  await expect(items.nth(5)).toBeFocused()

  await page.setViewportSize({ width: 800, height: 500 })
  await expect(dialog).toHaveAttribute('data-layout', 'radial')
  await page.setViewportSize({ width: 667, height: 280 })
  await expect(dialog).toHaveAttribute('data-layout', 'compact')

  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
})
