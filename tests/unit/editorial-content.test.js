import { describe, expect, it } from 'vitest'
import blogInspection from '../../scripts/blog-articles-inspection.mjs'
import blogCalibration from '../../scripts/blog-articles-calibration.mjs'
import blogProductivity from '../../scripts/blog-articles-productivity.mjs'

const articles = [...blogInspection, ...blogCalibration, ...blogProductivity]

const textOnly = (html) => String(html)
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&(?:nbsp|amp|quot|#39|lt|gt);/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const wordCount = (html) => {
  const text = textOnly(html)
  return text ? text.split(/\s+/u).length : 0
}

describe('qualidade editorial do blog', () => {
  it('mantém 33 pautas distintas com conteúdo substancial e revisado', () => {
    expect(articles).toHaveLength(33)
    expect(new Set(articles.map((article) => article.slug)).size).toBe(33)
    expect(new Set(articles.map((article) => article.title)).size).toBe(33)

    for (const article of articles) {
      expect(article.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      expect(article.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(article.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(article.updatedAt >= article.publishedAt).toBe(true)
      expect(wordCount(article.body), article.slug).toBeGreaterThanOrEqual(500)
      expect(article.body.match(/<h2\b/gi)?.length || 0, article.slug).toBeGreaterThanOrEqual(4)
      expect(article.body, article.slug).not.toMatch(/href=["']\/?\?tool=/i)
      expect(article.body, article.slug).not.toMatch(/class=["'][^"']*\bcta\b/i)
      expect(article.faq?.length, article.slug).toBeGreaterThanOrEqual(3)
      expect(article.relatedSlugs?.length, article.slug).toBeGreaterThanOrEqual(2)
      expect(article.sources?.length, article.slug).toBeGreaterThanOrEqual(2)

      for (const source of article.sources) {
        expect(source.label, article.slug).toBeTruthy()
        expect(source.note, article.slug).toBeTruthy()
        expect(source.url, article.slug).toMatch(/^https:\/\//)
      }
    }
  })

  it('não repete parágrafos substanciais entre pautas', () => {
    const seen = new Map()
    for (const article of articles) {
      const paragraphs = [...article.body.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi)]
      for (const [, paragraph] of paragraphs) {
        const normalized = textOnly(paragraph).toLocaleLowerCase('pt-BR')
        if (normalized.split(/\s+/u).length < 24) continue
        expect(seen.get(normalized), article.slug).toBeUndefined()
        seen.set(normalized, article.slug)
      }
    }
  })
})
