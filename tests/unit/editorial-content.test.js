import { describe, expect, it } from 'vitest'
import blogInspection from '../../scripts/blog-articles-inspection.mjs'
import blogCalibration from '../../scripts/blog-articles-calibration.mjs'
import blogProductivity from '../../scripts/blog-articles-productivity.mjs'
import { BLOG_DOUBLE_WORD_TARGETS } from '../../scripts/blog-editorial-targets.mjs'

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

const shingles = (html, size = 5) => {
  const words = textOnly(html).toLocaleLowerCase('pt-BR').match(/[\p{L}\p{N}]+/gu) || []
  return new Set(words.slice(0, Math.max(0, words.length - size + 1)).map((_, index) => words.slice(index, index + size).join(' ')))
}

const jaccard = (left, right) => {
  let intersection = 0
  for (const item of left) if (right.has(item)) intersection += 1
  return intersection / (left.size + right.size - intersection || 1)
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
      expect(BLOG_DOUBLE_WORD_TARGETS[article.slug], article.slug).toBeTypeOf('number')
      expect(wordCount(article.body), article.slug).toBeGreaterThanOrEqual(BLOG_DOUBLE_WORD_TARGETS[article.slug])
      expect(article.body.match(/<h2\b/gi)?.length || 0, article.slug).toBeGreaterThanOrEqual(4)
      expect(article.body, article.slug).not.toMatch(/href=["']\/?\?tool=/i)
      expect(article.body, article.slug).not.toMatch(/class=["'][^"']*\bcta\b/i)
      expect(article.faq?.length, article.slug).toBeGreaterThanOrEqual(3)
      expect(article.relatedSlugs?.length, article.slug).toBeGreaterThanOrEqual(2)
      expect(article.sources?.length, article.slug).toBeGreaterThanOrEqual(2)
      expect(new Set(article.sources.map((source) => source.url)).size, article.slug).toBe(article.sources.length)

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

    expect(Object.keys(BLOG_DOUBLE_WORD_TARGETS)).toHaveLength(33)
  })

  it('evita bordões editoriais genéricos e sobreposição textual entre pautas', () => {
    const genericPhrases = /(?<![\p{L}\p{M}\p{N}_])(?:vale ressaltar|é importante destacar|no mundo atual|em resumo|vamos explorar|mergulhe nesta|revolucione sua)(?![\p{L}\p{M}\p{N}_])/iu
    expect('É importante destacar esta frase.').toMatch(genericPhrases)
    for (const article of articles) expect(textOnly(article.body), article.slug).not.toMatch(genericPhrases)

    const articleShingles = articles.map((article) => ({ slug: article.slug, values: shingles(article.body) }))
    for (let left = 0; left < articleShingles.length; left += 1) {
      for (let right = left + 1; right < articleShingles.length; right += 1) {
        const similarity = jaccard(articleShingles[left].values, articleShingles[right].values)
        expect(similarity, `${articleShingles[left].slug} × ${articleShingles[right].slug}`).toBeLessThan(0.04)
      }
    }
  })
})
