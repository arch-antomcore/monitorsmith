import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('índices editoriais expõem toda a arquitetura por HTML', async ({ page, request }) => {
  await page.goto('/blog/')
  await expect(page.locator('#ms-consent')).toHaveCount(0)
  await expect(page.getByRole('heading', { level: 1, name: 'Blog' })).toBeVisible()
  await expect(page.locator('article.card')).toHaveCount(33)
  await expect(page.getByRole('heading', { level: 2, name: 'Inspeção e cuidado de painéis' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Leia como pesquisamos/ })).toHaveAttribute('href', '/politica-editorial/')

  const blogA11y = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze()
  expect(blogA11y.violations).toEqual([])

  await page.goto('/ferramentas/')
  await expect(page.getByRole('heading', { level: 1, name: 'Ferramentas e guias de uso' })).toBeVisible()
  await expect(page.locator('article.tool-card')).toHaveCount(22)
  await expect(page.locator('.tool-links a')).toHaveCount(44)

  const toolsA11y = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze()
  expect(toolsA11y.violations).toEqual([])

  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.ok()).toBeTruthy()
  expect((await sitemap.text()).match(/<loc>/g)).toHaveLength(89)
})

test('artigo apresenta autoria, conteúdo, fontes e metadados coerentes', async ({ page }) => {
  const advertisingRequests = []
  page.on('request', (request) => {
    if (/googlesyndication|doubleclick/i.test(request.url())) advertisingRequests.push(request.url())
  })

  await page.addInitScript(() => {
    localStorage.setItem('ms_consent_v2', JSON.stringify({ decided: true, ads: true, personalization: true }))
  })

  await page.goto('/blog/ips-glow-vs-backlight-bleed/')
  await expect(page.locator('#ms-consent')).toHaveCount(0)

  await expect(page.getByRole('heading', { level: 1, name: 'Como comparar IPS glow e backlight bleed' })).toBeVisible()
  expect(await page.locator('article[data-blog-article] h2').count()).toBeGreaterThanOrEqual(10)
  expect(await page.locator('[data-editorial-sources] a').count()).toBeGreaterThanOrEqual(3)
  await expect(page.locator('a.cta')).toHaveCount(1)
  await expect(page.locator('meta[property="article:published_time"]')).toHaveAttribute('content', '2026-08-10')
  await expect(page.locator('meta[property="article:modified_time"]')).toHaveAttribute('content', '2026-09-11')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://monitorsmith.app/blog/ips-glow-vs-backlight-bleed/')
  expect(advertisingRequests).toEqual([])

  const figures = page.locator('article[data-blog-article] figure')
  await expect(figures).toHaveCount(2)
  for (const figure of await figures.all()) {
    await figure.scrollIntoViewIfNeeded()
    await expect(figure.locator('figcaption')).toBeVisible()
    await expect.poll(() => figure.locator('img').evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true)
  }
  await page.evaluate(() => document.fonts.ready)
  expect(await page.locator('body').evaluate((body) => getComputedStyle(body).fontFamily)).toContain('IBM Plex Sans')

  const geometry = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }))
  expect(geometry.content).toBeLessThanOrEqual(geometry.viewport + 1)

  const articleA11y = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze()
  expect(articleA11y.violations).toEqual([])
})

test('todos os artigos entregam duas ilustrações legíveis e sem recursos quebrados', async ({ page, request }) => {
  test.setTimeout(120_000)
  await page.goto('/blog/')
  const articles = await page.locator('article.card h3 a').evaluateAll((links) => links.map((link) => link.getAttribute('href')))
  expect(articles).toHaveLength(33)
  const images = new Set()
  for (const url of articles) {
    const response = await request.get(url)
    expect(response.ok(), url).toBe(true)
    const html = await response.text()
    const figures = [...html.matchAll(/<figure class="blog-figure">([\s\S]*?)<\/figure>/g)]
    expect(figures, url).toHaveLength(2)
    for (const [, figure] of figures) {
      expect(figure).toMatch(/<figcaption>/)
      expect(figure).toMatch(/alt="[^"]+"/)
      const src = figure.match(/<img src="([^"]+)"/)[1]
      images.add(src)
    }
  }
  expect(images.size).toBe(66)
  for (const src of images) {
    const response = await page.goto(src)
    expect(response.ok(), src).toBe(true)
    const defects = await page.evaluate(() => {
      const svg = document.querySelector('svg')
      if (!svg) return ['invalid SVG document']
      const { width, height } = svg.viewBox.baseVal
      return [...svg.querySelectorAll('text')].flatMap((node) => {
        const box = node.getBBox()
        return box.x < 0 || box.y < 0 || box.x + box.width > width || box.y + box.height > height
          ? [node.textContent]
          : []
      })
    })
    expect(defects, src).toEqual([])
  }
})

test('URL histórica encaminha ao guia canônico atual', async ({ page }) => {
  await page.goto('/en/dead-pixel-test/')
  await expect(page).toHaveURL(/\/dead-pixel-test\/$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Online Dead Pixel Test' })).toBeVisible()
})

test('guia em inglês localiza as preferências de privacidade', async ({ page }) => {
  await page.goto('/dead-pixel-test/')
  await page.getByRole('button', { name: 'Privacy preferences' }).click()

  await expect(page.getByRole('heading', { name: 'Privacy, cookies and ads' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Essential only' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Save selection' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Accept all' })).toBeVisible()
})
