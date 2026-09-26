import { describe, expect, it } from 'vitest'

function calculatePpiMetrics(width, height, diagonal) {
  const diagonalPx = Math.sqrt(width * width + height * height)
  const ppi = diagonalPx / diagonal
  const dotPitchMm = 25.4 / ppi
  const angularDistanceCm = Math.round(8732 / ppi)
  const megapixels = (width * height) / 1000000

  return {
    ppi: Number(ppi.toFixed(2)),
    dotPitchMm: Number(dotPitchMm.toFixed(4)),
    angularDistanceCm,
    megapixels: Number(megapixels.toFixed(2)),
  }
}

describe('fórmulas geométricas da calculadora de PPI', () => {
  it('calcula corretamente 24" 1080p (FHD)', () => {
    const res = calculatePpiMetrics(1920, 1080, 24)
    expect(res.ppi).toBeCloseTo(91.79, 1)
    expect(res.dotPitchMm).toBeCloseTo(0.2767, 3)
    expect(res.angularDistanceCm).toBe(95) // ~95cm
    expect(res.megapixels).toBe(2.07)
  })

  it('calcula corretamente 27" 1440p (QHD)', () => {
    const res = calculatePpiMetrics(2560, 1440, 27)
    expect(res.ppi).toBeCloseTo(108.79, 1)
    expect(res.dotPitchMm).toBeCloseTo(0.2335, 3)
    expect(res.angularDistanceCm).toBe(80) // ~80cm
    expect(res.megapixels).toBe(3.69)
  })

  it('calcula corretamente 27" 4K UHD', () => {
    const res = calculatePpiMetrics(3840, 2160, 27)
    expect(res.ppi).toBeCloseTo(163.18, 1)
    expect(res.dotPitchMm).toBeCloseTo(0.1557, 3)
    expect(res.angularDistanceCm).toBe(54) // ~54cm
    expect(res.megapixels).toBe(8.29)
  })

  it('calcula corretamente um painel 14,2" de 3024 × 1964', () => {
    const res = calculatePpiMetrics(3024, 1964, 14.2)
    expect(res.ppi).toBeCloseTo(253.93, 1)
    expect(res.dotPitchMm).toBeCloseTo(0.1000, 3)
    expect(res.angularDistanceCm).toBe(34) // ~34cm
    expect(res.megapixels).toBe(5.94)
  })
})
