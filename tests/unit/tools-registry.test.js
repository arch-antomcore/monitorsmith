import { describe, expect, it } from 'vitest'
import {
  DOCK_TOOLS,
  PWA_SHORTCUTS,
  SEO_PAGE_ROUTES,
  TOOL_COUNT,
  TOOLS_REGISTRY,
  resolveToolLaunch,
  validateToolRegistry,
} from '../../src/constants/tools'

describe('catálogo central de ferramentas', () => {
  it('mantém as ferramentas com IDs, slugs e atalhos válidos', () => {
    expect(TOOL_COUNT).toBe(13)
    expect(validateToolRegistry()).toEqual([])
    expect(new Set(TOOLS_REGISTRY.map((tool) => tool.id)).size).toBe(TOOL_COUNT)
    expect(DOCK_TOOLS.every((tool) => tool.id && tool.label && tool.icon)).toBe(true)
  })

  it('resolve aliases junto com o preset necessário', () => {
    expect(resolveToolLaunch('green-screen')).toMatchObject({
      mode: 'color',
      preset: {
        customColor: '#00B140',
        ambientBrightness: 100,
      },
    })
    expect(resolveToolLaunch('chroma')).toMatchObject({ mode: 'color' })
    expect(resolveToolLaunch('not-a-tool')).toBeNull()
  })

  it('mantém rotas SEO e atalhos PWA ligados a ferramentas existentes', () => {
    const ids = new Set(TOOLS_REGISTRY.map((tool) => tool.id))
    expect(SEO_PAGE_ROUTES).toHaveLength(14)
    expect(SEO_PAGE_ROUTES.every((route) => ids.has(route.toolId))).toBe(true)
    expect(PWA_SHORTCUTS.every((shortcut) => ids.has(shortcut.toolId))).toBe(true)
  })

  it('rejeita duplicidade e presets inseguros antes do build', () => {
    const duplicate = {
      ...TOOLS_REGISTRY[0],
      aliases: [],
      launchPreset: { customColor: '#XYZXYZ', ambientBrightness: 140 },
      seoPages: [],
      keyboard: null,
      dock: { visible: false },
    }
    const errors = validateToolRegistry([...TOOLS_REGISTRY, duplicate])

    expect(errors.some((error) => error.includes('ID de ferramenta duplicado'))).toBe(true)
    expect(errors.some((error) => error.includes('Cor inicial inválida'))).toBe(true)
    expect(errors.some((error) => error.includes('Brilho inicial inválido'))).toBe(true)
  })
})
