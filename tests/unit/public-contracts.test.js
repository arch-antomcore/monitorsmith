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
})
