import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const root = process.cwd()

describe('contratos públicos de segurança e publicação', () => {
  it('preserva a validação do AdSense sem slot manual fictício', async () => {
    const [index, ads, component] = await Promise.all([
      readFile(path.join(root, 'index.html'), 'utf8'),
      readFile(path.join(root, 'public', 'ads.txt'), 'utf8'),
      readFile(path.join(root, 'src', 'components', 'UI', 'AdSenseUnit.jsx'), 'utf8'),
    ])

    expect(index).toContain('ca-pub-5926952327268950')
    expect(ads).toContain('pub-5926952327268950')
    expect(component).not.toContain('0000000000')
  })

  it('não reintroduz o estrobo de 70 ms', async () => {
    const source = await readFile(
      path.join(root, 'src', 'components', 'Modes', 'DeadPixelTestMode.jsx'),
      'utf8',
    )

    expect(source).not.toMatch(/setInterval\([^)]*,\s*70\s*\)/)
    expect(source).not.toContain('Desbloqueador de Pixels Presos')
  })

  it('mantém o protocolo seguro de atualização do service worker', async () => {
    const worker = await readFile(path.join(root, 'public', 'sw.js'), 'utf8')

    expect(worker).toContain("event.data?.type === 'SKIP_WAITING'")
    expect(worker).not.toContain('self.skipWaiting();')
    expect(worker).toContain("url.origin !== self.location.origin")
  })

  it('mantém a experiência pública sem links ou chamadas para o GitHub', async () => {
    const publicFacingSources = await Promise.all([
      readFile(path.join(root, 'index.html'), 'utf8'),
      readFile(path.join(root, 'public', 'llms.txt'), 'utf8'),
      readFile(path.join(root, 'public', 'llms-full.txt'), 'utf8'),
      readFile(path.join(root, 'src', 'components', 'UI', 'FooterSection.jsx'), 'utf8'),
      readFile(path.join(root, 'src', 'constants', 'tools.js'), 'utf8'),
      readFile(path.join(root, 'scripts', 'generate-seo-pages.mjs'), 'utf8'),
    ])

    for (const source of publicFacingSources) {
      expect(source).not.toMatch(/github(?:\.com)?/i)
    }
  })

  it('usa a identidade atual em ícones instaláveis', async () => {
    const [logoStat, manifest] = await Promise.all([
      import('fs').then(m => m.promises.stat(path.join(root, 'public', 'logo-transparent.png')).catch(() => null)),
      readFile(path.join(root, 'public', 'manifest.webmanifest'), 'utf8'),
    ])

    expect(logoStat).toBeTruthy()
    expect(JSON.parse(manifest).icons).toEqual(expect.arrayContaining([
      expect.objectContaining({ src: '/icons/icon-192.png', sizes: '192x192' }),
      expect.objectContaining({ src: '/icons/icon-512.png', sizes: '512x512' }),
    ]))
  })

  it('ativa safe areas reais e mantém o chrome fora de recortes da tela', async () => {
    const [index, generator, styles] = await Promise.all([
      readFile(path.join(root, 'index.html'), 'utf8'),
      readFile(path.join(root, 'scripts', 'generate-seo-pages.mjs'), 'utf8'),
      readFile(path.join(root, 'src', 'styles', 'globals.css'), 'utf8'),
    ])

    expect(index).toContain('viewport-fit=cover')
    expect(generator.match(/viewport-fit=cover/g)?.length).toBeGreaterThanOrEqual(2)
    expect(styles).toContain('env(safe-area-inset-left)')
    expect(styles).toContain('env(safe-area-inset-right)')
    expect(styles).toContain('env(safe-area-inset-bottom)')
  })
})
