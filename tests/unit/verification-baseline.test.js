import { access, readFile } from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const root = process.cwd()

describe('contratos estáticos complementares do produto', () => {
  it('mantém removido o componente visual legado', async () => {
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

  it('respeita a preferência de movimento do sistema na composição', async () => {
    const appJsx = await readFile(path.join(root, 'src', 'App.jsx'), 'utf8')
    expect(appJsx).toContain('reducedMotion="user"')
    expect(appJsx).not.toContain('reducedMotion="never"')
  })

  it('mantém as integrações de Lenis e Motion sem a camada GSAP não utilizada', async () => {
    const [gsapVendor, viteConfig, appJsx, toolExplorer] = await Promise.all([
      access(path.join(root, 'src', 'vendor', 'gsap')).then(() => true).catch(() => false),
      readFile(path.join(root, 'vite.config.js'), 'utf8'),
      readFile(path.join(root, 'src', 'App.jsx'), 'utf8'),
      readFile(path.join(root, 'src', 'components', 'Home', 'ToolExplorer.jsx'), 'utf8'),
    ])

    expect(gsapVendor).toBe(false)
    expect(viteConfig).not.toContain('gsap')
    expect(appJsx).not.toContain('gsap')
    expect(appJsx).toContain('<ReactLenis')
    expect(appJsx).toContain('autoRaf')
    // A grade de instrumentos usa entrada escalonada por Motion, sem tilt em GSAP.
    expect(toolExplorer).toContain('whileInView')
    expect(toolExplorer).toContain('viewport={{ once: true')
  })

  it('preserva os contratos técnicos de AdSense, consentimento e páginas legais', async () => {
    const [indexHtml, footerSection, seoScript] = await Promise.all([
      readFile(path.join(root, 'index.html'), 'utf8'),
      readFile(path.join(root, 'src', 'components', 'UI', 'FooterSection.jsx'), 'utf8'),
      readFile(path.join(root, 'scripts', 'generate-seo-pages.mjs'), 'utf8'),
    ])

    // Verificação de propriedade por meta tag, sem carregar anúncios antes do consentimento
    expect(indexHtml).toContain('<meta name="google-adsense-account" content="ca-pub-5926952327268950" />')
    expect(indexHtml).not.toContain('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')

    // Google Consent Mode v2 com todos os sinais negados por padrão
    expect(indexHtml).toContain("gtag('consent', 'default'")
    expect(indexHtml).toContain("ad_storage: 'denied'")
    expect(indexHtml).toContain("ad_personalization: 'denied'")

    // O script de anúncios é injetado apenas após consentimento explícito
    const consentLib = await readFile(path.join(root, 'src', 'lib', 'consent.js'), 'utf8')
    // A autorização assíncrona é exercitada em navigation-privacy.test.js.
    expect(consentLib).toContain('requestNonPersonalizedAds')

    // Prerender com exatamente 1 H1
    const h1Matches = indexHtml.match(/<h1(?:\s|>)/gi) || []
    expect(h1Matches.length).toBe(1)

    // Cláusulas e links obrigatórios de privacidade
    expect(seoScript).toContain('https://www.google.com/settings/ads')
    expect(seoScript).toContain('https://policies.google.com/technologies/partner-sites')

    // Links estáticos descobertos por robôs de busca no Footer
    expect(footerSection).toContain('href="/privacidade/"')
    expect(footerSection).toContain('href="/termos/"')
    expect(footerSection).toContain('href="/cookies/"')
    expect(footerSection).toContain('href="/aviso-legal/"')
    expect(footerSection).toContain('href="/acessibilidade/"')
    expect(footerSection).toContain('href="/politica-editorial/"')
    expect(footerSection).toContain('href="/ferramentas/"')
    expect(footerSection).toContain('openConsentPreferences')

    // Metadados editoriais e schema TechArticle e HowTo nos guias
    expect(seoScript).toContain('TechArticle')
    expect(seoScript).toContain("'@type': 'HowTo'")
    expect(seoScript).toContain('Equipe editorial MonitorSmith')
    expect(seoScript).toContain("if(!document.querySelector('.ms-ad ins.adsbygoogle'))return")
    expect(seoScript).toContain('data-legacy-redirect')
    expect(seoScript).toContain('CONSENT_HEAD_SCRIPT')
  })
})
