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
  await expect(page.locator('article[data-blog-article] h2')).toHaveCount(5)
  await expect(page.locator('[data-editorial-sources] a')).toHaveCount(2)
  await expect(page.locator('a.cta')).toHaveCount(1)
  await expect(page.locator('meta[property="article:published_time"]')).toHaveAttribute('content', '2026-08-10')
  await expect(page.locator('meta[property="article:modified_time"]')).toHaveAttribute('content', '2026-09-09')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://monitorsmith.app/blog/ips-glow-vs-backlight-bleed/')
  expect(advertisingRequests).toEqual([])

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
