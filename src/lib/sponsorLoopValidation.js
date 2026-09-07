const MAX_IMAGE_EDGE = 8192
const MAX_IMAGE_PIXELS = 24_000_000

export function getSponsorImageDimensionError(width, height) {
  if (!width || !height) return 'dimensões inválidas'
  if (width > MAX_IMAGE_EDGE || height > MAX_IMAGE_EDGE) {
    return `excede ${MAX_IMAGE_EDGE}px em um dos lados`
  }
  if (width * height > MAX_IMAGE_PIXELS) return 'excede 24 megapixels'
  return null
}
