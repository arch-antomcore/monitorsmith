import { expect, test } from '@playwright/test'

async function createPngTransfer(page, names, { width = 2, height = 2 } = {}) {
  return page.evaluateHandle(async ({ fileNames, imageWidth, imageHeight }) => {
    const canvas = document.createElement('canvas')
    canvas.width = imageWidth
    canvas.height = imageHeight

    const context = canvas.getContext('2d')
    context.fillStyle = '#f59e0b'
    context.fillRect(0, 0, imageWidth, imageHeight)

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (value) => (value ? resolve(value) : reject(new Error('Falha ao gerar PNG de teste'))),
        'image/png',
      )
    })

    const transfer = new DataTransfer()
    fileNames.forEach((name) => {
      transfer.items.add(new File([blob], name, { type: 'image/png' }))
    })
    return transfer
  }, { fileNames: names, imageWidth: width, imageHeight: height })
}

async function dropOnSponsorStage(page, dataTransfer) {
  const stage = page.locator('.sponsor-loop__stage')
  await stage.dispatchEvent('dragenter', { dataTransfer })
  await expect(page.locator('.sponsor-loop__drop-overlay')).toBeVisible()
  await stage.dispatchEvent('dragover', { dataTransfer })
  await stage.dispatchEvent('drop', { dataTransfer })
  await expect(page.locator('.sponsor-loop__drop-overlay')).toHaveCount(0)
}

test.beforeEach(async ({ page }) => {
  await page.goto('/?tool=sponsor-loop')
  await expect(page.locator('.sponsor-loop__stage')).toBeVisible()
})

test('drop com DataTransfer funciona no palco inteiro e HUD respeita o shell', async ({ page }) => {
  const dataTransfer = await createPngTransfer(page, ['marca-a.png', 'marca-b.png'])
  await dropOnSponsorStage(page, dataTransfer)

  await expect(page.locator('.sponsor-loop__thumb')).toHaveCount(2)
  await expect(page.locator('.display-mode__hint[role="status"]')).toContainText('2 imagens importadas')
  await expect(page.locator('.sponsor-loop__counter')).toContainText('1 / 2')

  await page.getByRole('checkbox', { name: /Variar posição/ }).check()
  await expect(page.locator('.sponsor-loop__oled-badge')).toBeVisible()

  const chromeGeometry = await page.evaluate(() => {
    const navbar = document.querySelector('.wbp-navbar').getBoundingClientRect()
    const dock = document.querySelector('.wbp-dock').getBoundingClientRect()
    const counter = document.querySelector('.sponsor-loop__counter').getBoundingClientRect()
    const badge = document.querySelector('.sponsor-loop__oled-badge').getBoundingClientRect()
    return {
      badgeTop: badge.top,
      counterBottom: counter.bottom,
      dockTop: dock.top,
      navbarBottom: navbar.bottom,
    }
  })

  expect(chromeGeometry.counterBottom).toBeLessThanOrEqual(chromeGeometry.dockTop - 4)
  expect(chromeGeometry.badgeTop).toBeGreaterThanOrEqual(chromeGeometry.navbarBottom + 4)

  await page.getByRole('button', { name: 'Ocultar barras e interface (Modo imersivo)' }).click()
  await expect(page.locator('.app-shell')).toHaveClass(/is-ui-idle/)

  const idleOffsets = await page.evaluate(() => ({
    badgeTop: Number.parseFloat(getComputedStyle(document.querySelector('.sponsor-loop__oled-badge')).top),
    counterBottom: Number.parseFloat(getComputedStyle(document.querySelector('.sponsor-loop__counter')).bottom),
  }))
  expect(idleOffsets.badgeTop).toBeGreaterThanOrEqual(14)
  expect(idleOffsets.badgeTop).toBeLessThan(40)
  expect(idleOffsets.counterBottom).toBeGreaterThanOrEqual(14)
  expect(idleOffsets.counterBottom).toBeLessThan(40)

  await dataTransfer.dispose()
})

test('fila de importação serializa drops concorrentes e mantém o limite global', async ({ page }) => {
  const firstNames = Array.from({ length: 12 }, (_, index) => `lote-a-${index + 1}.png`)
  const secondNames = Array.from({ length: 12 }, (_, index) => `lote-b-${index + 1}.png`)
  const firstTransfer = await createPngTransfer(page, firstNames)
  const secondTransfer = await createPngTransfer(page, secondNames)
  const stage = page.locator('.sponsor-loop__stage')

  await stage.dispatchEvent('dragenter', { dataTransfer: firstTransfer })
  await stage.dispatchEvent('drop', { dataTransfer: firstTransfer })
  await stage.dispatchEvent('dragenter', { dataTransfer: secondTransfer })
  await stage.dispatchEvent('drop', { dataTransfer: secondTransfer })

  await expect(page.locator('.sponsor-loop__thumb')).toHaveCount(15)
  await expect(page.locator('.display-mode__hint[role="status"]')).toContainText(
    '9 arquivos recusados',
  )

  await firstTransfer.dispose()
  await secondTransfer.dispose()
})

test('remoção individual permanece operável por touch e teclado', async ({ page }) => {
  const dataTransfer = await createPngTransfer(
    page,
    ['toque.png', 'teclado.png', 'restante.png'],
  )
  await dropOnSponsorStage(page, dataTransfer)
  await expect(page.locator('.sponsor-loop__thumb')).toHaveCount(3)

  const isCoarsePointer = await page.evaluate(() => matchMedia('(pointer: coarse)').matches)
  if (isCoarsePointer) {
    const touchRemove = page.getByRole('button', { name: 'Remover toque.png' })
    await expect(touchRemove).toHaveCSS('opacity', '1')
    await expect(touchRemove).toHaveCSS('pointer-events', 'auto')
    const touchTarget = await touchRemove.boundingBox()
    expect(touchTarget.width).toBeGreaterThanOrEqual(44)
    expect(touchTarget.height).toBeGreaterThanOrEqual(44)
    await touchRemove.tap()
    await expect(page.getByRole('button', { name: 'Remover toque.png' })).toHaveCount(0)
  }

  await page.getByRole('button', { name: 'Exibir teclado.png' }).focus()
  await page.keyboard.press('Tab')
  const keyboardRemove = page.getByRole('button', { name: 'Remover teclado.png' })
  await expect(keyboardRemove).toBeFocused()
  await expect(keyboardRemove).toHaveCSS('opacity', '1')
  await page.keyboard.press('Enter')

  await expect(page.getByRole('button', { name: 'Remover teclado.png' })).toHaveCount(0)
  await expect(page.locator('.display-mode__hint[role="status"]')).toContainText('teclado.png removida')
  await dataTransfer.dispose()
})

test('seleção manual reinicia o deadline sem rerenderizar o progresso a cada tick', async ({ page }) => {
  const dataTransfer = await createPngTransfer(page, ['um.png', 'dois.png', 'tres.png'])
  await dropOnSponsorStage(page, dataTransfer)

  await page.getByRole('slider', { name: /Tempo por slide/ }).fill('1')
  await page.getByRole('button', { name: /Iniciar/ }).click()
  await page.waitForTimeout(700)

  const secondThumbnail = page.getByRole('button', { name: 'Exibir dois.png' })
  await secondThumbnail.click()
  await expect(secondThumbnail).toHaveAttribute('aria-pressed', 'true')
  await page.waitForTimeout(550)
  await expect(secondThumbnail).toHaveAttribute('aria-pressed', 'true')

  const progressScale = await page.locator('.sponsor-loop__progress-fill').evaluate((element) => {
    const match = element.style.transform.match(/scaleX\(([^)]+)\)/)
    return match ? Number.parseFloat(match[1]) : 0
  })
  expect(progressScale).toBeGreaterThan(0.25)
  expect(progressScale).toBeLessThan(0.9)

  await dataTransfer.dispose()
})

test('imagem decodificada acima do limite dimensional é rejeitada', async ({ page }) => {
  const dataTransfer = await createPngTransfer(
    page,
    ['larga-demais.png'],
    { width: 8193, height: 1 },
  )
  await dropOnSponsorStage(page, dataTransfer)

  await expect(page.locator('.sponsor-loop__thumb')).toHaveCount(0)
  await expect(page.locator('.display-mode__hint[role="status"]')).toContainText(
    'excede 8192px em um dos lados',
  )
  await expect(page.getByText('Nenhuma imagem carregada')).toBeVisible()

  await dataTransfer.dispose()
})
