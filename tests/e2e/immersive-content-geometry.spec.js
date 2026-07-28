import { expect, test } from '@playwright/test'

const EXTREME_VIEWPORTS = [
  { width: 844, height: 390 },
  { width: 320, height: 568 },
  { width: 1024, height: 280 },
  { width: 320, height: 240 },
]

const MAX_MESSAGE = 'W'.repeat(220)
const MAX_QR_CONTENT = `https://monitorsmith.app/status?payload=${'q'.repeat(981)}`.slice(0, 1024)

const settleLayout = (page) =>
  page.evaluate(
    () => new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    }),
  )

const hideInterface = async (page) => {
  await page.getByRole('button', {
    name: 'Ocultar barras e interface (Modo imersivo)',
  }).click()
  await expect(page.locator('.wbp-navbar')).toHaveAttribute('aria-hidden', 'true')
  await expect(page.locator('.display-mode__controls')).toHaveCount(0)
}

const expectInside = (rect, viewport, label, tolerance = 1) => {
  expect(rect, `${label} deve existir`).not.toBeNull()
  expect(rect.left, `${label} escapou à esquerda`).toBeGreaterThanOrEqual(viewport.left - tolerance)
  expect(rect.top, `${label} escapou pelo topo`).toBeGreaterThanOrEqual(viewport.top - tolerance)
  expect(rect.right, `${label} escapou à direita`).toBeLessThanOrEqual(viewport.right + tolerance)
  expect(rect.bottom, `${label} escapou pela base`).toBeLessThanOrEqual(viewport.bottom + tolerance)
}

test('timer mantém dial e cópia integralmente visíveis com a interface oculta', async ({ page }) => {
  await page.setViewportSize(EXTREME_VIEWPORTS[0])
  await page.goto('/?tool=focus-timer')
  await hideInterface(page)

  for (const viewportSize of EXTREME_VIEWPORTS) {
    await page.setViewportSize(viewportSize)
    await settleLayout(page)

    const geometry = await page.evaluate(() => {
      const toRect = (element) => {
        if (!element || getComputedStyle(element).display === 'none') return null
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

      const visualViewport = window.visualViewport
      const viewport = {
        top: visualViewport?.offsetTop || 0,
        left: visualViewport?.offsetLeft || 0,
        width: visualViewport?.width || window.innerWidth,
        height: visualViewport?.height || window.innerHeight,
      }
      viewport.right = viewport.left + viewport.width
      viewport.bottom = viewport.top + viewport.height

      const timer = document.querySelector('.focus-timer')
      return {
        viewport,
        timer: toRect(timer),
        dial: toRect(document.querySelector('.focus-timer__dial')),
        eyebrow: toRect(document.querySelector('.focus-timer__eyebrow')),
        title: toRect(document.querySelector('.focus-timer__title')),
        caption: toRect(document.querySelector('.focus-timer__caption')),
        timerOverflow: timer ? {
          horizontal: timer.scrollWidth - timer.clientWidth,
          vertical: timer.scrollHeight - timer.clientHeight,
        } : null,
        documentOverflow: {
          horizontal: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          vertical: document.documentElement.scrollHeight - document.documentElement.clientHeight,
        },
      }
    })

    expectInside(geometry.timer, geometry.viewport, 'timer')
    expectInside(geometry.dial, geometry.viewport, 'dial')
    expectInside(geometry.title, geometry.viewport, 'título')
    expectInside(geometry.caption, geometry.viewport, 'legenda')
    if (geometry.eyebrow) expectInside(geometry.eyebrow, geometry.viewport, 'contexto')
    expect(geometry.timerOverflow.horizontal).toBeLessThanOrEqual(1)
    expect(geometry.timerOverflow.vertical).toBeLessThanOrEqual(1)
    expect(geometry.documentOverflow.horizontal).toBeLessThanOrEqual(1)
    expect(geometry.documentOverflow.vertical).toBeLessThanOrEqual(1)
  }
})

test('mensagem máxima e QR fazem auto-fit sem sair do viewport', async ({ page }) => {
  await page.setViewportSize(EXTREME_VIEWPORTS[0])
  await page.goto('/?tool=message')

  await page.getByRole('textbox', { name: /^Mensagem/ }).fill(MAX_MESSAGE)
  await page.getByRole('slider', { name: 'Escala da mensagem' }).evaluate((input) => {
    const valueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
    valueSetter?.call(input, '16')
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
  })
  await expect(page.getByRole('slider', { name: 'Escala da mensagem' })).toHaveValue('16')

  await page.getByRole('checkbox', { name: 'Exibir QR Code' }).check()
  await page.getByRole('textbox', { name: /^Conteúdo do QR/ }).fill(MAX_QR_CONTENT)
  await expect(page.locator('.message-overlay__message')).toHaveText(MAX_MESSAGE)
  await hideInterface(page)

  for (const viewportSize of EXTREME_VIEWPORTS) {
    await page.setViewportSize(viewportSize)
    await settleLayout(page)

    const geometry = await page.evaluate(() => {
      const toRect = (element) => {
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

      const visualViewport = window.visualViewport
      const viewport = {
        top: visualViewport?.offsetTop || 0,
        left: visualViewport?.offsetLeft || 0,
        width: visualViewport?.width || window.innerWidth,
        height: visualViewport?.height || window.innerHeight,
      }
      viewport.right = viewport.left + viewport.width
      viewport.bottom = viewport.top + viewport.height

      const overlay = document.querySelector('.message-overlay')
      const fit = document.querySelector('.message-overlay__fit')
      const message = document.querySelector('.message-overlay__message')
      const preview = document.querySelector('.message-overlay__qr-preview')
      const previewStyle = preview ? getComputedStyle(preview) : null

      return {
        viewport,
        overlay: toRect(overlay),
        fit: toRect(fit),
        message: toRect(message),
        qr: toRect(document.querySelector('.message-overlay__qr')),
        qrCard: toRect(document.querySelector('.message-overlay__qr-card')),
        qrCode: toRect(document.querySelector('.message-overlay__qr-code')),
        preview: toRect(preview),
        messageOverflow: message && fit ? {
          horizontal: message.scrollWidth - fit.clientWidth,
          vertical: Math.max(message.scrollHeight, message.getBoundingClientRect().height) - fit.clientHeight,
        } : null,
        previewLimit: previewStyle ? {
          lineHeight: Number.parseFloat(previewStyle.lineHeight),
          overflow: previewStyle.overflow,
          titleLength: preview.getAttribute('title')?.length || 0,
        } : null,
        fittedFontSize: Number.parseFloat(message?.dataset.fitFontSize || '0'),
        documentOverflow: {
          horizontal: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          vertical: document.documentElement.scrollHeight - document.documentElement.clientHeight,
        },
      }
    })

    expectInside(geometry.overlay, geometry.viewport, 'área da mensagem')
    expectInside(geometry.fit, geometry.viewport, 'área de auto-fit')
    expectInside(geometry.message, geometry.viewport, 'mensagem')
    expectInside(geometry.qr, geometry.viewport, 'bloco de QR')
    expectInside(geometry.qrCard, geometry.viewport, 'cartão de QR')
    expectInside(geometry.qrCode, geometry.viewport, 'QR Code')
    expectInside(geometry.preview, geometry.viewport, 'prévia do QR')
    expect(geometry.messageOverflow.horizontal).toBeLessThanOrEqual(1)
    expect(geometry.messageOverflow.vertical).toBeLessThanOrEqual(1)
    expect(geometry.preview.height).toBeLessThanOrEqual(geometry.previewLimit.lineHeight * 2 + 1)
    expect(geometry.previewLimit.overflow).toBe('hidden')
    expect(geometry.previewLimit.titleLength).toBe(MAX_QR_CONTENT.length)
    expect(geometry.fittedFontSize).toBeGreaterThanOrEqual(8)
    expect(geometry.documentOverflow.horizontal).toBeLessThanOrEqual(1)
    expect(geometry.documentOverflow.vertical).toBeLessThanOrEqual(1)
  }
})
