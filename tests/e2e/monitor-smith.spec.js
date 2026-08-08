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

async function readToolChromeGeometry(page) {
  return page.evaluate(() => {
    const toRect = (selector) => {
      const element = document.querySelector(selector)
      if (!element) return null
      const rect = element.getBoundingClientRect()
      return {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      }
    }

    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      navbar: toRect('.wbp-navbar'),
      panel: toRect('.display-mode__controls'),
      dock: toRect('.wbp-dock'),
      hudCount: document.querySelectorAll('.display-mode__osd-hud').length,
      hasHorizontalOverflow:
        document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    }
  })
}

function expectRectInsideViewport(rect, viewport, label) {
  expect(rect, `${label} deve existir`).not.toBeNull()
  expect(rect.left, `${label} não pode escapar à esquerda`).toBeGreaterThanOrEqual(-1)
  expect(rect.top, `${label} não pode escapar pelo topo`).toBeGreaterThanOrEqual(-1)
  expect(rect.right, `${label} não pode escapar à direita`).toBeLessThanOrEqual(viewport.width + 1)
  expect(rect.bottom, `${label} não pode escapar pela base`).toBeLessThanOrEqual(viewport.height + 1)
}

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
  await expect(page.locator('[id^="monitor-tool-grid-"]')).toHaveCount(TOOL_IDS.length)
  await expect(page.getByRole('button', { name: /Explorar Ferramentas/i })).toBeVisible()
  await expect(page.locator('.ms-ad-container')).toHaveCount(0)
  await expect(page.locator('a[href*="github.com"]')).toHaveCount(0)

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze()

  expect(results.violations).toEqual([])
})

for (const toolId of TOOL_IDS) {
  test(`abre e fecha a ferramenta ${toolId} por interação real`, async ({ page }) => {
    await page.goto('/')
    await page.locator(`#monitor-tool-grid-${toolId}`).click()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('#monitor-tools-home')).toHaveCount(0)
    await expect(page.locator('.app-mode-layer')).toHaveCSS('opacity', '1')

    const controls = page.locator('.display-mode__controls')
    if (await controls.count()) {
      await expect(controls).toHaveCSS('opacity', '1')
    }

    await page.waitForTimeout(600) // Wait for framer-motion spring to settle
    const geometry = await readToolChromeGeometry(page)
    expect(geometry.hudCount).toBe(0)
    expect(geometry.hasHorizontalOverflow).toBe(false)
    expectRectInsideViewport(geometry.navbar, geometry.viewport, 'navbar')
    expectRectInsideViewport(geometry.dock, geometry.viewport, 'dock')
    if (geometry.panel) {
      expectRectInsideViewport(geometry.panel, geometry.viewport, 'painel da ferramenta')
      expect(
        geometry.panel.top,
        'painel deve começar abaixo da navbar',
      ).toBeGreaterThanOrEqual(geometry.navbar.bottom + 6)
      expect(
        geometry.panel.bottom,
        'painel deve terminar acima do dock',
      ).toBeLessThanOrEqual(geometry.dock.top - 6)
    }

    if (!process.env.CI || toolId === 'dead-pixel') {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .exclude('.calibration-lab__grayscale-label[aria-hidden="true"]')
        .analyze()
      expect(results.violations).toEqual([])
    }

    await page.keyboard.press('Escape')
    await expect(page.locator('#monitor-tools-home')).toBeVisible()
  })
}

test('deep link de tela verde aplica o preset chroma', async ({ page }) => {
  await page.goto('/#green-screen')

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Escolher cor do estúdio' })).toHaveValue('#00b140')
  await expect(page.getByRole('slider', { name: 'Intensidade da luz' })).toHaveValue('100')
})

test('menu radial é nomeado e realmente troca a ferramenta', async ({ page }) => {
  await page.goto('/#black')
  await expect(page.getByRole('heading', { level: 1, name: /Tela preta/i })).toBeVisible()

  await page.locator('.app-mode-layer').click({ button: 'right', position: { x: 180, y: 220 } })
  const menu = page.getByRole('menu', { name: 'Troca rápida de ferramenta' })
  await expect(menu).toBeVisible()
  await expect(menu.getByRole('menuitem')).toHaveCount(10)
  await expect(page.locator('#root')).toHaveAttribute('inert', '')
  await expect(page.locator('#root')).toHaveAttribute('aria-hidden', 'true')

  await menu.getByRole('menuitem', { name: /Pixels/i }).click()
  await expect(page.getByRole('heading', { level: 1, name: /Teste de pixels/i })).toBeVisible()
  await expect(page.locator('#root')).not.toHaveAttribute('inert', '')
  await expect(page.locator('#root')).not.toHaveAttribute('aria-hidden', 'true')
})

test('dock usa tabindex móvel sem selecionar ferramentas ao navegar por setas', async ({ page }) => {
  await page.goto('/#dead-pixel')

  const items = page.locator('.wbp-dock__mode')
  const activeIndex = await items.evaluateAll((buttons) =>
    buttons.findIndex((button) => button.getAttribute('aria-selected') === 'true'),
  )
  expect(activeIndex).toBeGreaterThanOrEqual(0)

  const activeItem = items.nth(activeIndex)
  await activeItem.focus()
  await activeItem.press('ArrowRight')

  const nextIndex = (activeIndex + 1) % await items.count()
  const rovingState = await items.evaluateAll((buttons) => ({
    focusedIndex: buttons.indexOf(document.activeElement),
    zeroIndexes: buttons
      .map((button, index) => button.tabIndex === 0 ? index : -1)
      .filter((index) => index >= 0),
    pressedIndex: buttons.findIndex((button) => button.getAttribute('aria-selected') === 'true'),
  }))
  expect(rovingState.focusedIndex).toBe(nextIndex)
  expect(rovingState.zeroIndexes).toEqual([nextIndex])
  expect(rovingState.pressedIndex).toBe(activeIndex)

  await page.keyboard.press('Tab')
  await expect(page.locator('[role="tablist"]:focus-within')).toHaveCount(0)
})

test('swipe troca o canvas, mas nunca dispara a partir dos controles', async ({ page }) => {
  await page.goto('/#dead-pixel')
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  const dispatchSwipe = async (selector) => page.evaluate((targetSelector) => {
    const target = document.querySelector(targetSelector)
    if (!target) throw new Error(`Alvo de swipe ausente: ${targetSelector}`)
    const createTouch = (clientX) => new Touch({
      identifier: 7,
      target,
      clientX,
      clientY: 220,
      screenX: clientX,
      screenY: 220,
      pageX: clientX,
      pageY: 220,
      radiusX: 2,
      radiusY: 2,
      force: 0.5,
    })
    const start = createTouch(250)
    const end = createTouch(80)
    target.dispatchEvent(new TouchEvent('touchstart', {
      bubbles: true,
      cancelable: true,
      touches: [start],
      targetTouches: [start],
      changedTouches: [start],
    }))
    target.dispatchEvent(new TouchEvent('touchend', {
      bubbles: true,
      cancelable: true,
      touches: [],
      targetTouches: [],
      changedTouches: [end],
    }))
  }, selector)

  await dispatchSwipe('.display-mode__controls')
  await expect(page.getByRole('heading', { level: 1, name: /Teste de pixels/i })).toBeVisible()

  await dispatchSwipe('.display-mode__canvas')
  await expect(page.getByRole('heading', { level: 1, name: /Limpeza/i })).toBeVisible()
})

test('tema claro da landing não vaza para ferramentas e é restaurado ao voltar', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Alternar tema claro e escuro' }).click()
  await expect(page.locator('html')).toHaveClass(/ms-studio-light/)

  await page.locator('#monitor-tool-grid-dead-pixel').click()
  await expect(page.locator('html')).not.toHaveClass(/ms-studio-light/)
  await expect(page.locator('.display-mode__controls--dead-pixel')).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(page.locator('#monitor-tools-home')).toBeVisible()
  await expect(page.locator('html')).toHaveClass(/ms-studio-light/)
})

test('URL, histórico e identidade da ferramenta permanecem sincronizados', async ({ page }) => {
  page.on('console', msg => console.log(msg.text()))
  await page.goto('/')

  await page.locator('#monitor-tool-grid-dead-pixel').click()
  await expect(page).toHaveURL(/#dead-pixel$/)

  await page.mouse.move(100, 100)
  const inspectionTab = page.getByRole('tab', { name: /^Inspeção/ })
  await inspectionTab.scrollIntoViewIfNeeded()
  await inspectionTab.click({ force: true })
  await expect(page).toHaveURL(/#cleaner$/)

  await page.goBack()
  await expect(page).toHaveURL(/#dead-pixel$/)
  await expect(page.getByRole('heading', { level: 1, name: /Teste de pixels/i })).toBeVisible()

  await page.goForward()
  await expect(page).toHaveURL(/#cleaner$/)
  await expect(page.getByRole('heading', { level: 1, name: /Limpeza/i })).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(page).not.toHaveURL(/#/)
  await expect(page.locator('#monitor-tools-home')).toBeVisible()
})

test('tela verde e estúdio de cor têm identidade explícita, não inferida pela cor', async ({ page }) => {
  await page.goto('/#green-screen')
  await expect(page.getByRole('heading', { level: 1, name: 'Tela Verde' })).toBeVisible()

  await page.locator('.wbp-dock__mode').filter({ hasText: 'Estúdio de cor' }).click()
  await expect(page).toHaveURL(/#color$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Estúdio de Cor' })).toBeVisible()

  const colorInput = page.getByRole('textbox', { name: 'Escolher cor do estúdio' })
  const brightnessInput = page.getByRole('slider', { name: 'Intensidade da luz' })
  await colorInput.evaluate((input) => {
    input.value = '#00b140'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
  })
  await brightnessInput.fill('100')

  await expect(page.getByRole('heading', { level: 1, name: 'Estúdio de Cor' })).toBeVisible()
  await expect(page).toHaveURL(/#color$/)

  await page.goBack()
  await expect(page).toHaveURL(/#green-screen$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Tela Verde' })).toBeVisible()
})

test('painel compartilhado minimiza, respeita o dock e restaura o foco', async ({ page }) => {
  await page.goto('/#dead-pixel')

  const closeButton = page.getByRole('button', { name: 'Minimizar painel de opções' })
  await closeButton.click()

  const reopenButton = page.getByRole('button', { name: 'Opções de Teste de pixels' })
  await expect(reopenButton).toBeVisible()
  await expect(reopenButton).toBeFocused()

  const compactGeometry = await page.evaluate(() => {
    const reopen = document.querySelector('.display-mode__reopen-panel-btn')?.getBoundingClientRect()
    const dock = document.querySelector('.wbp-dock')?.getBoundingClientRect()
    return reopen && dock ? { reopenBottom: reopen.bottom, dockTop: dock.top } : null
  })
  expect(compactGeometry).not.toBeNull()
  expect(compactGeometry.reopenBottom).toBeLessThanOrEqual(compactGeometry.dockTop - 3)

  await reopenButton.click()
  await expect(closeButton).toBeVisible()
  await expect(closeButton).toBeFocused()
})

test('atalhos locais de pixels continuam funcionando após foco nos controles', async ({ page }) => {
  await page.goto('/#dead-pixel')

  const red = page.getByRole('button', { name: 'Usar Vermelho no teste' })
  const green = page.getByRole('button', { name: 'Usar Verde no teste' })
  await red.click()
  await red.press('ArrowRight')
  await expect(green).toHaveAttribute('aria-pressed', 'true')
})

test('ocultação manual restaura a interface no primeiro movimento', async ({ page }) => {
  await page.goto('/#black')

  const navbar = page.locator('.wbp-navbar')
  await page.locator('.wbp-navbar').hover({ force: true })
  await page.waitForTimeout(300)
  await page.getByRole('button', { name: 'Ocultar barras e interface (Modo imersivo)' }).click({ force: true })
  await expect(navbar).toHaveAttribute('aria-hidden', 'true')

  await page.mouse.move(120, 260)
  await expect(navbar).toHaveAttribute('aria-hidden', 'false')
})

test('guia de calibração integra o painel e acompanha o modo imersivo', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 })
  await page.goto('/#calibration')

  const panel = page.locator('.display-mode__controls--calibration')
  const guide = panel.locator('.calibration-lab__guide--inline')
  await expect(panel).toBeVisible()
  await expect(guide).toBeVisible()
  await expect(guide).toContainText('Como inspecionar')

  const geometry = await page.evaluate(() => {
    const panelRect = document.querySelector('.display-mode__controls--calibration')?.getBoundingClientRect()
    const guideRect = document.querySelector('.calibration-lab__guide--inline')?.getBoundingClientRect()
    return panelRect && guideRect
      ? {
          panel: { top: panelRect.top, right: panelRect.right, bottom: panelRect.bottom, left: panelRect.left },
          guide: { top: guideRect.top, right: guideRect.right, bottom: guideRect.bottom, left: guideRect.left },
        }
      : null
  })
  expect(geometry).not.toBeNull()
  expect(geometry.guide.top).toBeGreaterThanOrEqual(geometry.panel.top)
  expect(geometry.guide.right).toBeLessThanOrEqual(geometry.panel.right)
  expect(geometry.guide.bottom).toBeLessThanOrEqual(geometry.panel.bottom)
  expect(geometry.guide.left).toBeGreaterThanOrEqual(geometry.panel.left)

  await page.locator('.wbp-navbar').hover({ force: true })
  await page.waitForTimeout(300)
  await page.getByRole('button', { name: 'Ocultar barras e interface (Modo imersivo)' }).click({ force: true })
  await expect(panel).toBeHidden()
  await expect(page.locator('.calibration-lab__guide')).toHaveCount(0)

  await page.mouse.move(120, 260)
  await expect(panel).toBeVisible()
})

test('padrão RGB da calibração usa canais puros sem vazamento', async ({ page }) => {
  await page.goto('/#calibration')
  await page.click('button:has-text("Cor & Gamma")')
  await page.click('button:has-text("Barras RGB")')

  const bars = page.locator('.calibration-lab__rgb-bar')
  await expect(bars).toHaveCount(3)

  // O estilo inline usa linear-gradient
  await expect(bars.nth(0)).toHaveCSS('background-image', /rgb\(255, 0, 0\)/)
  await expect(bars.nth(1)).toHaveCSS('background-image', /rgb\(0, 255, 0\)/)
  await expect(bars.nth(2)).toHaveCSS('background-image', /rgb\(0, 0, 255\)/)
})

test('padrão gamma calcula blocos cinzas reais e exibe aviso de zoom', async ({ page }) => {
  await page.goto('/#calibration')
  await page.click('button:has-text("Cor & Gamma")')
  await page.getByRole('button', { name: 'Gamma', exact: true }).click()

  await page.mouse.move(120, 260)
  const warning = page.locator('text=/Estimativa visual baseada em mistura espacial/')
  await expect(warning).toBeVisible()

  // 1.8 -> rgb(174, 174, 174)
  // 2.2 -> rgb(186, 186, 186)
  // 2.4 -> rgb(191, 191, 191)
  const blocks = page.locator('div[aria-hidden="true"]').filter({ has: page.locator('xpath=..//span[contains(text(), "1.8") or contains(text(), "2.2") or contains(text(), "2.4")]') })
  await expect(blocks).toHaveCount(3)
  
  await expect(blocks.nth(0)).toHaveCSS('background-color', 'rgb(174, 174, 174)')
  await expect(blocks.nth(1)).toHaveCSS('background-color', 'rgb(186, 186, 186)')
  await expect(blocks.nth(2)).toHaveCSS('background-color', 'rgb(191, 191, 191)')
})

test.describe('quando movimento é permitido pelo sistema', () => {
  test.use({ reducedMotion: 'no-preference' })

  test('entrada pela landing exibe uma transição curta e contextual', async ({ page }) => {
    await page.goto('/')

    await page.locator('#monitor-tool-grid-dead-pixel').click()
    const transition = page.locator('.ms-tool-entry')
    await expect(transition).toBeVisible()
    await expect(transition).toContainText('Abrindo ferramenta')
    await expect(transition).toContainText('Teste de Pixels')
    await expect(transition).toBeHidden({ timeout: 2_000 })
  })
})

test.describe('quando o sistema força uma paleta de alto contraste', () => {
  test.use({ forcedColors: 'active' })

  test('preserva a cor diagnóstica sem impedir a adaptação dos controles', async ({ page }) => {
    await page.goto('/#dead-pixel')
    await page.getByRole('button', { name: 'Vermelho' }).click()

    const canvas = page.locator('.display-mode__canvas')
    const controls = page.locator('.display-mode__controls')
    await expect(canvas).toHaveCSS('background-color', 'rgb(255, 0, 0)')
    await expect(canvas).toHaveCSS('forced-color-adjust', 'none')
    await expect(controls).toHaveCSS('forced-color-adjust', 'auto')
  })
})

test('landing não reserva a largura da scrollbar como rolagem horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 })
  await page.goto('/')
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
    bodyViewport: document.body.clientWidth,
    bodyContent: document.body.scrollWidth,
  }))
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1)
  expect(dimensions.bodyContent).toBeLessThanOrEqual(dimensions.bodyViewport + 1)
})

test('shell permanece contido nos viewports mínimos portrait e landscape', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-desktop', 'matriz compacta executada uma vez')
  test.setTimeout(60000)

  for (const viewport of [
    { width: 320, height: 568 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(viewport)

    for (const toolId of TOOL_IDS) {
      await page.goto(`/?tool=${toolId}`)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await page.waitForTimeout(600) // Wait for framer-motion spring to settle
      const geometry = await readToolChromeGeometry(page)
      expect(geometry.hudCount).toBe(0)
      expect(geometry.hasHorizontalOverflow).toBe(false)
      expectRectInsideViewport(geometry.navbar, geometry.viewport, `${toolId}: navbar`)
      expectRectInsideViewport(geometry.dock, geometry.viewport, `${toolId}: dock`)
      if (geometry.panel) {
        const navbarHtml = await page.evaluate(() => {
          const el = document.querySelector('.wbp-navbar');
          return el ? el.outerHTML : 'null';
        });
        console.log(`geometry.navbar HTML: `, navbarHtml)
        console.log(`geometry.navbar: `, geometry.navbar)
        console.log(`geometry.panel: `, geometry.panel)
        expectRectInsideViewport(geometry.panel, geometry.viewport, `${toolId}: painel`)
        expect(geometry.panel.top, `${toolId}: painel abaixo da navbar`).toBeGreaterThanOrEqual(
          geometry.navbar.bottom + 4,
        )
        expect(geometry.panel.bottom, `${toolId}: painel acima do dock`).toBeLessThanOrEqual(
          geometry.dock.top - 4,
        )
      }
    }
  }
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
