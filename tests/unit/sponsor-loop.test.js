import { describe, expect, it } from 'vitest'
import { getSponsorImageDimensionError } from '../../src/lib/sponsorLoopValidation'

describe('limites de imagem do Sponsor Loop', () => {
  it('aceita uma imagem comum dentro dos limites', () => {
    expect(getSponsorImageDimensionError(3840, 2160)).toBeNull()
  })

  it('recusa lados acima de 8192px antes de incorporar o arquivo', () => {
    expect(getSponsorImageDimensionError(8193, 1)).toContain('8192px')
  })

  it('recusa imagens acima de 24 megapixels mesmo com lados válidos', () => {
    expect(getSponsorImageDimensionError(6000, 4001)).toBe('excede 24 megapixels')
  })
})
