import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const PAGE_ERRORS = new WeakMap()

const readDigitalClock = (time) =>
  time.evaluate((element) => {
    const normalize = (value) => value.replace(/\s+/g, '')

    return {
      spoken: normalize(element.getAttribute('aria-label') || ''),
      visual: normalize(element.textContent || ''),
    }
  })

test.beforeEach(({ page }) => {
  const errors = []
  PAGE_ERRORS.set(page, errors)
  page.on('pageerror', (error) => errors.push(error.message))
})

test.afterEach(({ page }) => {
  expect(PAGE_ERRORS.get(page), 'erros JavaScript não tratados na página').toEqual([])
})

test('limpeza expõe padrões como seleção exclusiva e bloqueio como modal isolado', async ({ page }) => {
  await page.goto('/?tool=cleaner')

  const patternGroup = page.getByRole('group', { name: 'Padrão de inspeção' })
  const patternButtons = patternGroup.getByRole('button')
  await expect(patternGroup).toBeVisible()
  await expect(patternButtons).toHaveCount(5)

  const gridButton = patternGroup.getByRole('button', { name: 'Grade fina' })
  const checkerButton = patternGroup.getByRole('button', { name: 'Xadrez' })
  await expect(checkerButton).toHaveAttribute('aria-pressed', 'true')
  await expect(gridButton).toHaveAttribute('aria-pressed', 'false')

  await gridButton.click()
  await expect(gridButton).toHaveAttribute('aria-pressed', 'true')
  await expect(checkerButton).toHaveAttribute('aria-pressed', 'false')
  expect(
    await patternButtons.evaluateAll((buttons) =>
      buttons.filter((button) => button.getAttribute('aria-pressed') === 'true').length,
    ),
  ).toBe(1)

  const lockButton = page.getByRole('button', {
    name: 'Ativar bloqueio local por 30 segundos',
  })
  await lockButton.click()

  const dialog = page.getByRole('dialog', { name: 'Bloqueio local ativo' })
  const unlockButton = dialog.getByRole('button', { name: 'Encerrar bloqueio agora (Esc)' })
  await expect(dialog).toBeVisible()
  await expect(page.locator('body > [role="dialog"]')).toHaveCount(1)
  await expect(page.locator('#root [role="dialog"]')).toHaveCount(0)
  await expect(page.locator('#root')).toHaveAttribute('aria-hidden', 'true')
  await expect(page.locator('#root')).toHaveAttribute('inert', '')
  await expect(unlockButton).toBeFocused()

  await page.keyboard.press('Tab')
  await expect(unlockButton).toBeFocused()

  const results = await new AxeBuilder({ page })
    .include('[role="dialog"]')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze()
  expect(results.violations).toEqual([])

  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(page.locator('#root')).not.toHaveAttribute('aria-hidden', 'true')
  await expect(page.locator('#root')).not.toHaveAttribute('inert', '')
  await expect(lockButton).toBeFocused()
  await expect(page.getByRole('heading', { level: 1, name: /Inspeção para limpeza/i })).toBeVisible()
})

test('relógio digital mantém o texto visual e o nome falável sincronizados', async ({ page }) => {
  await page.goto('/?tool=clock')

  const digitalTime = page.locator('time.fullscreen-clock__time')
  await expect(digitalTime).toBeVisible()
  await expect(digitalTime).toHaveAttribute('aria-label', /^\d{2}:\d{2}:\d{2}$/)
  await expect(digitalTime).toHaveAccessibleName(/^\d{2}:\d{2}:\d{2}$/)

  let clock = await readDigitalClock(digitalTime)
  expect(clock.spoken).not.toBe('')
  expect(clock.visual).toBe(clock.spoken)

  await page.getByRole('checkbox', { name: 'Exibir segundos' }).uncheck()
  await expect(digitalTime).toHaveAttribute('aria-label', /^\d{2}:\d{2}$/)
  await expect(digitalTime).toHaveAccessibleName(/^\d{2}:\d{2}$/)

  clock = await readDigitalClock(digitalTime)
  expect(clock.visual).toBe(clock.spoken)

  await page.getByRole('button', { name: '12 horas' }).click()
  await expect(digitalTime).toHaveAttribute('aria-label', /^\d{2}:\d{2}\s(?:AM|PM)$/)

  clock = await readDigitalClock(digitalTime)
  expect(clock.visual).toBe(clock.spoken)
})
