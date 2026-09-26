/**
 * URLs publicadas antes da consolidação da arquitetura. A hospedagem estática
 * atual não oferece redirects HTTP por caminho no artefato, então cada entrada
 * recebe uma página de migração fora do sitemap, com destino canônico.
 */
export const LEGACY_REDIRECTS = Object.freeze([
  ['/en/backlight-bleed-test/', '/black-screen/'],
  ['/en/black-screen/', '/black-screen/'],
  ['/en/dead-pixel-test/', '/dead-pixel-test/'],
  ['/en/display-calibration/', '/display-calibration/'],
  ['/en/focus-timer/', '/focus-timer/'],
  ['/en/fullscreen-clock/', '/fullscreen-clock/'],
  ['/en/fullscreen-message/', '/fullscreen-message/'],
  ['/en/green-screen/', '/green-screen/'],
  ['/en/monitor-test/', '/monitor-test/'],
  ['/en/online-teleprompter/', '/online-teleprompter/'],
  ['/en/screen-cleaner/', '/screen-cleaner/'],
  ['/en/sponsor-loop/', '/sponsor-loop/'],
  ['/en/webcam-light/', '/webcam-light/'],
  ['/teste-de-vazamento-de-luz/', '/tela-preta-oled/'],
])
