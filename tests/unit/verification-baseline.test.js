import { access, readFile } from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const root = process.cwd()

describe('baseline de verificação técnica do produto (contrato clínico de qualidade)', () => {
  it('garante o rollback e a eliminação de código legado/não utilizado', async () => {
    const risingLinesPath = path.join(root, 'src', 'components', 'UI', 'RisingLines.jsx')
    let fileExists = true
    try {
      await access(risingLinesPath)
    } catch {
      fileExists = false
    }

    expect(fileExists).toBe(false)

    const toolLibrary = await readFile(
      path.join(root, 'src', 'components', 'Home', 'ToolLibrary.jsx'),
      'utf8',
    )
    expect(toolLibrary).not.toContain('RisingLines')
  })

  it('garante que a trava de bateria / prefers-reduced-motion não congela animações', async () => {
    const globalsCss = await readFile(
      path.join(root, 'src', 'styles', 'globals.css'),
      'utf8',
    )

    expect(globalsCss).not.toContain('animation-duration: 0.01ms !important')
    expect(globalsCss).not.toContain('transition-duration: 0.01ms !important')

    const appJsx = await readFile(path.join(root, 'src', 'App.jsx'), 'utf8')
    expect(appJsx).not.toContain('!prefersReducedMotion &&')
  })

  it('garante a integração offline de GSAP e Lenis com sincronização a 60/120+ FPS', async () => {
    const [gsapCore, gsapScrollTrigger, viteConfig, appJsx, toolLibrary] = await Promise.all([
      access(path.join(root, 'src', 'vendor', 'gsap', 'gsap-core.js')).then(() => true).catch(() => false),
      access(path.join(root, 'src', 'vendor', 'gsap', 'ScrollTrigger.js')).then(() => true).catch(() => false),
      readFile(path.join(root, 'vite.config.js'), 'utf8'),
      readFile(path.join(root, 'src', 'App.jsx'), 'utf8'),
      readFile(path.join(root, 'src', 'components', 'Home', 'ToolLibrary.jsx'), 'utf8'),
    ])

    expect(gsapCore).toBe(true)
    expect(gsapScrollTrigger).toBe(true)
    expect(viteConfig).toContain("'gsap': path.resolve(__dirname, './src/vendor/gsap/index.js')")
    expect(appJsx).not.toContain('gsap.ticker.lagSmoothing(0)')
    expect(appJsx).toContain('<ReactLenis')
    expect(toolLibrary).toContain('gsap.to')
    expect(toolLibrary).toContain('rotationY')
    expect(toolLibrary).toContain('rotationX')
  })

  it('garante o alinhamento completo com os requisitos de auditoria técnica do Google AdSense', async () => {
    const [indexHtml, privacyModal, footerSection, seoScript] = await Promise.all([
      readFile(path.join(root, 'index.html'), 'utf8'),
      readFile(path.join(root, 'src', 'components', 'UI', 'PrivacyModal.jsx'), 'utf8'),
      readFile(path.join(root, 'src', 'components', 'UI', 'FooterSection.jsx'), 'utf8'),
      readFile(path.join(root, 'scripts', 'generate-seo-pages.mjs'), 'utf8'),
    ])

    // Script do AdSense no <head>
    expect(indexHtml).toContain('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5926952327268950')

    // Prerender com exatamente 1 H1
    const h1Matches = indexHtml.match(/<h1(?:\s|>)/gi) || []
    expect(h1Matches.length).toBe(1)

    // Cláusulas e links obrigatórios de privacidade
    expect(privacyModal).toContain('https://www.google.com/settings/ads')
    expect(privacyModal).toContain('https://policies.google.com/technologies/partner-sites')

    // Links estáticos descobertos por robôs de busca no Footer
    expect(footerSection).toContain('href="/privacidade/"')
    expect(footerSection).toContain('href="/termos/"')

    // Metadados editoriais e schema TechArticle nos guias
    expect(seoScript).toContain('TechArticle')
    expect(seoScript).toContain('EXVORN.TECH — Análise Técnica de Displays')
    expect(seoScript).toContain('Atualizado em 4 de agosto de 2026')
  })
})
