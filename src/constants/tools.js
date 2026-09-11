/**
 * Catálogo autoritativo do MonitorSmith.
 *
 * Identidade, modo de execução, presets, atalhos, navegação, PWA e rotas SEO
 * nascem neste arquivo. Componentes consomem as projeções exportadas no fim;
 * scripts de build importam o mesmo catálogo e interrompem o build se houver
 * IDs, atalhos ou slugs inconsistentes.
 */

export const SITE_METADATA = Object.freeze({
  name: 'MonitorSmith',
  owner: 'EXVORN.TECH',
  baseUrl: 'https://monitorsmith.app',
  contactUrl: 'https://exvorn.tech/',
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  contentLastModified: '2026-09-09',
});

export const TOOL_CATEGORIES = Object.freeze([
  'Ver e cuidar',
  'Medição e desempenho',
  'Cor e iluminação',
  'Atalho de cor',
  'Cálculo e óptica',
  'Periféricos',
  'Tempo e presença',
  'Touch e mobile',
]);

/** Rótulos das categorias em cada idioma da interface. */
export const CATEGORY_I18N = Object.freeze({
  'Ver e cuidar': { en: 'Inspect & care', es: 'Inspección y cuidado' },
  'Medição e desempenho': { en: 'Measurement & performance', es: 'Medición y rendimiento' },
  'Cor e iluminação': { en: 'Color & lighting', es: 'Color e iluminación' },
  'Atalho de cor': { en: 'Color shortcut', es: 'Atajo de color' },
  'Cálculo e óptica': { en: 'Math & optics', es: 'Cálculo y óptica' },
  'Periféricos': { en: 'Peripherals', es: 'Periféricos' },
  'Tempo e presença': { en: 'Time & presence', es: 'Tiempo y presencia' },
  'Touch e mobile': { en: 'Touch & mobile', es: 'Táctil y móvil' },
});

const seoPage = (key, pt, en, lastModified = SITE_METADATA.contentLastModified) => ({
  key,
  lastModified,
  pt,
  en,
});

export const TOOLS_REGISTRY = Object.freeze([
  {
    id: 'black',
    mode: 'black',
    aliases: ['black-screen', 'oled-black', 'backlight'],
    category: 'Ver e cuidar',
    title: 'Tela preta',
    dockLabel: 'Tela preta',
    heroTitle: 'Tela Preta',
    description: 'Preencha a tela com preto absoluto.',
    heroDesc: 'Reduza a luz emitida, remova distrações e inspecione pixels claros ou vazamentos em ambiente escuro.',
    when: 'Para reduzir luz e observar o painel em cenas escuras.',
    icon: 'void',
    tone: 'void',
    keyboard: { action: 'activateBlackScreen', key: 'b', code: 'KeyB', label: 'B', description: 'Ativar tela preta' },
    dock: { visible: true, order: 1 },
    hero: { visible: true, order: 1 },
    pwa: { visible: true, name: 'Tela Preta', shortName: 'Preto' },
    seoPages: [
      seoPage('black-screen',
        { slug: 'tela-preta-oled', title: 'Tela Preta OLED e Inspeção de Vazamento de Luz', h1: 'Tela Preta OLED e Vazamento de Luz', description: 'Abra uma tela preta em fullscreen para reduzir luz e inspecionar pixels claros, IPS glow e vazamento de luz.' },
        { slug: 'black-screen', title: 'Fullscreen Black Screen for Monitor Inspection', h1: 'Fullscreen Black Screen', description: 'Open a fullscreen black surface to reduce emitted light and visually inspect bright pixels, IPS glow and backlight bleed.' }),
    ],
  },
  {
    id: 'dead-pixel',
    mode: 'dead-pixel',
    aliases: ['pixel', 'dead_pixel', 'deadpixel', 'pixel-test'],
    category: 'Ver e cuidar',
    title: 'Teste visual de pixels',
    dockLabel: 'Pixels',
    heroTitle: 'Teste de Pixels',
    description: 'Percorra cores sólidas e encontre pontos suspeitos no painel.',
    heroDesc: 'Percorra 8 cores sólidas para identificar visualmente pixels apagados, presos ou luminosos.',
    when: 'Para uma inspeção visual rápida de pixels.',
    icon: 'pixels',
    tone: 'pixel',
    keyboard: null,
    dock: { visible: true, order: 2 },
    hero: { visible: true, order: 2 },
    pwa: { visible: true, name: 'Teste de Pixels', shortName: 'Pixels' },
    seoPages: [
      seoPage('dead-pixel-test',
        { slug: 'teste-de-dead-pixel', title: 'Teste de Dead Pixel Online Grátis', h1: 'Teste de Dead Pixel Online', description: 'Alterne cores sólidas em tela cheia para inspecionar visualmente dead pixels, pixels presos e pontos luminosos.' },
        { slug: 'dead-pixel-test', title: 'Free Online Dead Pixel Test', h1: 'Online Dead Pixel Test', description: 'Switch between solid fullscreen colors to visually inspect dead pixels, stuck pixels and bright spots.' }),
    ],
  },
  {
    id: 'cleaner',
    mode: 'cleaner',
    aliases: ['screen-cleaner', 'cleaning'],
    category: 'Ver e cuidar',
    title: 'Inspeção para limpeza',
    dockLabel: 'Inspeção',
    heroTitle: 'Inspeção para Limpeza',
    description: 'Alto contraste para revelar poeira, marcas e manchas.',
    heroDesc: 'Use fundos de contraste para localizar poeira e marcas antes de limpar o painel com segurança.',
    when: 'Para preparar o painel antes da limpeza física.',
    icon: 'cleaner',
    tone: 'clean',
    keyboard: { action: 'activateScreenCleaner', key: 'c', code: 'KeyC', label: 'C', description: 'Abrir inspeção para limpeza' },
    dock: { visible: true, order: 3 },
    hero: { visible: true, order: 3 },
    pwa: { visible: false },
    seoPages: [
      seoPage('screen-cleaner',
        { slug: 'limpeza-de-monitor', title: 'Inspeção e Limpeza Segura de Monitor', h1: 'Guia para Limpeza e Inspeção de Tela', description: 'Evidencie poeira e marcas no monitor e siga orientações prudentes para limpar o painel sem danificá-lo.' },
        { slug: 'screen-cleaner', title: 'Monitor Inspection and Safe Screen Cleaning', h1: 'Screen Cleaning and Inspection Guide', description: 'Reveal dust and marks on your monitor and follow careful guidance for cleaning the panel without damage.' }),
    ],
  },
  {
    id: 'calibration',
    mode: 'calibration',
    aliases: ['monitor-test', 'display-test', 'visual-check'],
    category: 'Ver e cuidar',
    title: 'Verificação visual',
    dockLabel: 'Verificação',
    heroTitle: 'Verificação Visual',
    description: 'Padrões experimentais de escala, cor, nitidez e contraste.',
    when: 'Para observar o comportamento do display sem substituir instrumentos de medição.',
    icon: 'calibration',
    tone: 'calibration',
    keyboard: { action: 'openCalibration', key: 'g', code: 'KeyG', label: 'G', description: 'Abrir verificação visual do display' },
    dock: { visible: true, order: 4 },
    hero: { visible: false, order: 4 },
    pwa: { visible: false },
    seoPages: [
      seoPage('monitor-test',
        { slug: 'teste-de-monitor', title: 'Teste Visual de Monitor Online', h1: 'Teste Visual de Monitor', description: 'Observe gradientes, contraste, escala de cinza e nitidez com padrões visuais no navegador.' },
        { slug: 'monitor-test', title: 'Online Visual Monitor Test', h1: 'Visual Monitor Test', description: 'Observe gradients, contrast, grayscale and sharpness with browser-rendered visual patterns.' }),
      seoPage('display-calibration',
        { slug: 'verificacao-visual', title: 'Padrões para Verificação Visual de Display', h1: 'Verificação Visual de Display', description: 'Use padrões de referência para observar contraste, tons, nitidez e uniformidade sem alegar calibração instrumental.' },
        { slug: 'display-calibration', title: 'Visual Display Check Patterns', h1: 'Visual Display Check', description: 'Use reference patterns to observe contrast, tones, sharpness and uniformity without claiming instrument-grade calibration.' }),
    ],
  },
  {
    id: 'white',
    mode: 'white',
    aliases: ['softbox', 'light', 'webcam-light'],
    category: 'Cor e iluminação',
    title: 'Luz suave',
    dockLabel: 'Luz suave',
    heroTitle: 'Luz Suave',
    description: 'Uma superfície clara com temperatura visual e intensidade ajustáveis.',
    heroDesc: 'Use o monitor como luz de apoio ajustável para chamadas e gravações próximas.',
    when: 'Para chamadas, gravações e luz de apoio.',
    icon: 'sun',
    tone: 'light',
    keyboard: { action: 'activateWhiteLighting', key: 'w', code: 'KeyW', label: 'W', description: 'Ativar luz suave' },
    dock: { visible: true, order: 5 },
    hero: { visible: true, order: 4 },
    pwa: { visible: false },
    seoPages: [
      seoPage('webcam-light',
        { slug: 'luz-para-videochamada', title: 'Luz de Apoio para Videochamada', h1: 'Luz de Apoio para Videochamada', description: 'Use o monitor como fonte próxima de luz ajustável para videochamadas e gravações.' },
        { slug: 'webcam-light', title: 'Adjustable Screen Light for Video Calls', h1: 'Screen Light for Video Calls', description: 'Use your monitor as a nearby adjustable light source for video calls and recordings.' }),
    ],
  },
  {
    id: 'color',
    mode: 'color',
    aliases: ['color-studio', 'mood-light'],
    category: 'Cor e iluminação',
    title: 'Estúdio de cor',
    dockLabel: 'Estúdio de cor',
    heroTitle: 'Estúdio de Cor',
    description: 'Preencha a tela com uma cor livre ou um preset.',
    when: 'Para ambientação, prévia visual e cenários.',
    icon: 'color',
    tone: 'color',
    keyboard: { action: 'openColorStudio', key: 's', code: 'KeyS', label: 'S', description: 'Abrir estúdio de cor' },
    dock: { visible: true, order: 6 },
    hero: { visible: false, order: 5 },
    pwa: { visible: false },
    seoPages: [],
  },
  {
    id: 'green-screen',
    mode: 'color',
    aliases: ['greenscreen', 'chroma', 'chroma-key'],
    launchPreset: { customColor: '#00B140', ambientBrightness: 100 },
    category: 'Atalho de cor',
    title: 'Tela verde',
    heroTitle: 'Tela Verde',
    description: 'Verde sólido #00B140 para composições por chroma key.',
    when: 'Para usar uma tela próxima como fundo uniforme em foto ou vídeo.',
    icon: 'color',
    tone: 'green',
    keyboard: null,
    dock: { visible: false, order: 7 },
    hero: { visible: false, order: 6 },
    pwa: { visible: true, name: 'Tela Verde', shortName: 'Chroma' },
    seoPages: [
      seoPage('green-screen',
        { slug: 'tela-verde-chroma', title: 'Tela Verde Chroma Key Online', h1: 'Tela Verde para Chroma Key', description: 'Preencha o monitor com verde #00B140 para fundos e composições simples de foto ou vídeo.' },
        { slug: 'green-screen', title: 'Online Green Screen for Chroma Key', h1: 'Green Screen for Chroma Key', description: 'Fill your display with #00B140 green for simple photo or video backgrounds and composites.' }),
    ],
  },
  {
    id: 'focus-timer',
    mode: 'focus-timer',
    aliases: ['focus', 'timer', 'pomodoro', 'brown-noise'],
    category: 'Tempo e presença',
    title: 'Foco',
    dockLabel: 'Foco',
    heroTitle: 'Timer de Foco',
    description: 'Um timer discreto para ciclos de concentração.',
    heroDesc: 'Organize ciclos de concentração com presets e sons opcionais gerados localmente.',
    when: 'Para trabalho concentrado e pausas.',
    icon: 'timer',
    tone: 'focus',
    keyboard: { action: 'openFocusTimer', key: 'p', code: 'KeyP', label: 'P', description: 'Abrir temporizador de foco' },
    dock: { visible: true, order: 7 },
    hero: { visible: true, order: 5 },
    pwa: { visible: true, name: 'Timer de Foco', shortName: 'Foco' },
    seoPages: [
      seoPage('focus-timer',
        { slug: 'timer-de-foco', title: 'Timer de Foco com Sons Opcionais', h1: 'Timer de Foco', description: 'Organize ciclos de concentração com timer em tela cheia e sons ambientes opcionais gerados no navegador.' },
        { slug: 'focus-timer', title: 'Focus Timer with Optional Ambient Sounds', h1: 'Focus Timer', description: 'Organize concentration cycles with a fullscreen timer and optional browser-generated ambient sounds.' }),
    ],
  },
  {
    id: 'clock',
    mode: 'clock',
    aliases: ['fullscreen-clock'],
    category: 'Tempo e presença',
    title: 'Relógio',
    dockLabel: 'Relógio',
    heroTitle: 'Relógio de Tela',
    badge: 'Analógico',
    description: 'Hora e data legíveis para uma tela secundária.',
    heroDesc: 'Exiba hora e data em formatos digital ou analógico em uma tela secundária.',
    when: 'Para mesas, estúdios e salas.',
    icon: 'clock',
    tone: 'clock',
    keyboard: { action: 'openClock', key: 't', code: 'KeyT', label: 'T', description: 'Abrir relógio em tela' },
    dock: { visible: true, order: 8 },
    hero: { visible: true, order: 6 },
    pwa: { visible: false },
    seoPages: [
      seoPage('fullscreen-clock',
        { slug: 'relogio-em-tela-cheia', title: 'Relógio em Tela Cheia Online', h1: 'Relógio em Tela Cheia', description: 'Exiba hora e data em formatos digital ou analógico para uma tela secundária.' },
        { slug: 'fullscreen-clock', title: 'Online Fullscreen Clock', h1: 'Fullscreen Clock', description: 'Display time and date in digital or analog formats on a secondary screen.' }),
    ],
  },
  {
    id: 'message',
    mode: 'message',
    aliases: ['teleprompter', 'fullscreen-message', 'signage'],
    category: 'Tempo e presença',
    title: 'Mensagem em tela',
    dockLabel: 'Mensagem',
    heroTitle: 'Mensagem em Tela',
    description: 'Exiba um recado em escala de sala ou texto espelhado.',
    when: 'Para status, recepção e apoio visual em gravações.',
    icon: 'message',
    tone: 'message',
    keyboard: { action: 'openMessageOverlay', key: 'm', code: 'KeyM', label: 'M', description: 'Abrir mensagem em tela' },
    dock: { visible: true, order: 9 },
    hero: { visible: false, order: 7 },
    pwa: { visible: false },
    seoPages: [
      seoPage('fullscreen-message',
        { slug: 'mensagem-em-tela', title: 'Mensagem em Tela Cheia Online', h1: 'Mensagem em Tela Cheia', description: 'Crie um aviso legível em tela cheia com texto e cores ajustáveis.' },
        { slug: 'fullscreen-message', title: 'Online Fullscreen Message', h1: 'Fullscreen Message', description: 'Create a readable fullscreen notice with adjustable text and colors.' },
        '2026-09-11'),
      seoPage('online-teleprompter',
        { slug: 'teleprompter-online', title: 'Teleprompter Online Espelhado', h1: 'Teleprompter Online', description: 'Exiba e espelhe texto em tela cheia como apoio simples para gravações.' },
        { slug: 'online-teleprompter', title: 'Online Mirrored Teleprompter', h1: 'Online Teleprompter', description: 'Display and mirror fullscreen text as a simple reading aid for recordings.' },
        '2026-09-11'),
    ],
  },
  {
    id: 'sponsor-loop',
    mode: 'sponsor-loop',
    aliases: ['sponsor', 'logo-loop', 'patrocinador', 'marcas'],
    category: 'Tempo e presença',
    title: 'Loop de marcas',
    dockLabel: 'Loop',
    heroTitle: 'Loop de Marcas',
    description: 'Apresente imagens e logos locais em rotação automática.',
    heroDesc: 'Organize logos locais em uma sequência de tela cheia com transições e deslocamento discreto.',
    when: 'Para lives, estandes, vitrines e cenários.',
    icon: 'sponsor',
    tone: 'sponsor',
    keyboard: { action: 'openSponsorLoop', key: 'l', code: 'KeyL', label: 'L', description: 'Abrir loop de marcas' },
    dock: { visible: true, order: 10 },
    hero: { visible: true, order: 7 },
    pwa: { visible: false },
    seoPages: [
      seoPage('sponsor-loop',
        { slug: 'loop-de-marcas', title: 'Loop de Marcas e Patrocinadores', h1: 'Loop de Marcas em Tela Cheia', description: 'Apresente logos e imagens locais em rotação automática para eventos, transmissões e vitrines.' },
        { slug: 'sponsor-loop', title: 'Fullscreen Sponsor and Brand Loop', h1: 'Fullscreen Brand Loop', description: 'Present local logos and images in an automatic rotation for events, streams and displays.' }),
    ],
  },
  {
    id: 'ppi-calculator',
    mode: 'ppi-calculator',
    aliases: ['ppi', 'dpi', 'calculadora-ppi', 'retina-calculator', 'pixel-density'],
    category: 'Ver e cuidar',
    title: 'Calculadora de PPI',
    dockLabel: 'PPI',
    heroTitle: 'Calculadora de PPI e Referência Angular',
    description: 'Calcule densidade de pixels, tamanho do ponto e a distância correspondente a um minuto de arco.',
    heroDesc: 'Calcule PPI, tamanho físico estimado do pixel (dot pitch) e distância de referência a partir da resolução e diagonal informadas.',
    when: 'Para comparar densidade, estimar a visibilidade da malha de pixels e escolher um ponto de partida para a escala do sistema.',
    icon: 'ppi',
    tone: 'calibration',
    keyboard: null,
    dock: { visible: true, order: 11 },
    hero: { visible: true, order: 8 },
    pwa: { visible: true, name: 'Calculadora PPI', shortName: 'PPI' },
    seoPages: [
      seoPage('ppi-calculator',
        { slug: 'calculadora-ppi-densidade-monitor', title: 'Calculadora de PPI e Densidade de Monitor', h1: 'Calculadora de PPI e Densidade de Pixels', description: 'Calcule PPI, dot pitch em milímetros e a distância correspondente a um minuto de arco.' },
        { slug: 'ppi-monitor-calculator', title: 'Monitor PPI and Pixel Density Calculator', h1: 'Monitor PPI & Pixel Density Calculator', description: 'Calculate PPI, dot pitch in millimetres and the distance corresponding to one arcminute.' }),
    ],
  },
  {
    id: 'motion-blur',
    mode: 'motion-blur',
    aliases: ['ghosting', 'ufo', 'motion', 'response-time', 'mprt', 'gtg', 'motion-test'],
    category: 'Ver e cuidar',
    title: 'Teste de ghosting & motion blur',
    dockLabel: 'Ghosting',
    heroTitle: 'Teste de Ghosting e Motion Blur',
    badge: 'rAF',
    description: 'Observe rastros, borrão de movimento e overshoot; acompanhe a cadência da animação.',
    heroDesc: 'Observe rastros escuros, bordas claras e borrão em uma animação cuja cadência depende do navegador e do display.',
    when: 'Para comparar visualmente rastros ao ajustar o overdrive e observar a fluidez do movimento.',
    icon: 'motion',
    tone: 'calibration',
    keyboard: null,
    dock: { visible: true, order: 12 },
    hero: { visible: true, order: 9 },
    pwa: { visible: true, name: 'Teste de Ghosting', shortName: 'Ghosting' },
    seoPages: [
      seoPage('motion-blur',
        { slug: 'teste-de-ghosting-monitor', title: 'Teste Visual de Ghosting e Motion Blur Online', h1: 'Teste Visual de Ghosting e Motion Blur', description: 'Observe rastros de movimento e overshoot ao comparar ajustes do monitor, com estimativa da cadência da animação no navegador.' },
        { slug: 'motion-blur-ghosting-test', title: 'Online Visual Monitor Ghosting & Motion Blur Test', h1: 'Visual Ghosting & Motion Blur Test', description: 'Visually inspect motion trails and overdrive overshoot while comparing monitor settings, with an estimate of browser animation cadence.' }),
    ],
  },
  {
    id: 'touch-tester',
    mode: 'touch-tester',
    aliases: ['touch', 'multitouch', 'touchscreen', 'tablet-test', 'mobile-test', 'dead-zone'],
    category: 'Touch e mobile',
    title: 'Teste de touchscreen',
    dockLabel: 'Touch',
    heroTitle: 'Teste de Touchscreen',
    badge: 'Mobile',
    description: 'Registre áreas sem resposta e o multi-toque observado pelo navegador.',
    heroDesc: 'Desenhe na tela para localizar regiões sem eventos de toque e observar quantos contatos simultâneos chegam ao navegador.',
    when: 'Para comparar a resposta ao toque e repetir regiões suspeitas antes de atribuir a causa ao hardware.',
    icon: 'touch',
    tone: 'pixel',
    keyboard: null,
    dock: { visible: true, order: 13 },
    hero: { visible: true, order: 10 },
    pwa: { visible: true, name: 'Teste Touchscreen', shortName: 'Touch' },
    seoPages: [
      seoPage('touch-tester',
        { slug: 'teste-de-touchscreen-celular-tablet', title: 'Teste de Touchscreen e Multi-toque', h1: 'Teste de Touchscreen e Zonas sem Resposta', description: 'Desenhe pela superfície para localizar áreas sem eventos de toque e observar o multi-toque que o navegador recebe.' },
        { slug: 'touchscreen-multitouch-test', title: 'Touchscreen Response & Multitouch Test', h1: 'Touchscreen Response Test', description: 'Draw across the display to locate areas without touch events and observe the multitouch input delivered to the browser.' }),
    ],
  },
  {
    id: 'display-info',
    mode: 'display-info',
    aliases: ['info', 'especificacoes', 'display-specs', 'gpu-info', 'hdr-check'],
    category: 'Medição e desempenho',
    title: 'Ficha técnica do display',
    dockLabel: 'Ficha técnica',
    heroTitle: 'Ficha Técnica do Display',
    badge: 'HDR · P3',
    description: 'Leia resolução lógica, escala e recursos de cor e GPU informados pelo navegador.',
    heroDesc: 'Consulte pixels CSS, estimativa de resolução, devicePixelRatio e os recursos de cor, HDR e GPU expostos pelo navegador.',
    when: 'Para consultar informações do navegador e comparar com as configurações de vídeo do sistema.',
    icon: 'info',
    tone: 'calibration',
    keyboard: { action: 'openDisplayInfo', key: 'i', code: 'KeyI', label: 'I', description: 'Abrir ficha técnica do display' },
    dock: { visible: true, order: 14 },
    hero: { visible: true, order: 11 },
    pwa: { visible: true, name: 'Ficha do Display', shortName: 'Ficha' },
    seoPages: [
      seoPage('display-info',
        { slug: 'informacoes-do-monitor', title: 'Informações do Monitor: Resolução, HDR, Gamut e GPU', h1: 'Informações Técnicas do Seu Monitor', description: 'Consulte resolução lógica, devicePixelRatio e os recursos de cor, HDR e GPU informados pelo navegador, com suas limitações.' },
        { slug: 'monitor-information', title: 'Monitor Information: Resolution, HDR, Gamut and GPU', h1: 'Your Monitor Technical Information', description: 'Read logical resolution, devicePixelRatio and browser-reported color, HDR and GPU capabilities, with their limitations.' }),
    ],
  },
  {
    id: 'refresh-rate',
    mode: 'refresh-rate',
    aliases: ['hz', 'fps', 'refresh', 'taxa-de-atualizacao', 'frame-time', 'vsync'],
    category: 'Medição e desempenho',
    title: 'Medidor de Hz e frame time',
    dockLabel: 'Hz / FPS',
    heroTitle: 'Medidor de Hz e Frame Time',
    badge: 'Tempo real',
    description: 'Estime a cadência da animação, o intervalo entre quadros e oscilações no navegador.',
    heroDesc: 'Acompanhe a frequência dos callbacks de animação, sua variação e intervalos longos durante a amostragem na aba ativa.',
    when: 'Para comparar a cadência do navegador com a taxa configurada no sistema.',
    icon: 'gauge',
    tone: 'calibration',
    keyboard: { action: 'openRefreshRate', key: 'r', code: 'KeyR', label: 'R', description: 'Abrir medidor de Hz e frame time' },
    dock: { visible: true, order: 15 },
    hero: { visible: true, order: 12 },
    pwa: { visible: true, name: 'Medidor de Hz', shortName: 'Hz' },
    seoPages: [
      seoPage('refresh-rate',
        { slug: 'teste-de-taxa-de-atualizacao-hz', title: 'Teste de Taxa de Atualização (Hz) e Frame Time Online', h1: 'Teste de Taxa de Atualização e Frame Time', description: 'Estime a cadência de animação no navegador, o intervalo médio entre quadros, o jitter e possíveis atrasos na aba ativa.' },
        { slug: 'refresh-rate-test', title: 'Online Refresh Rate (Hz) and Frame Time Test', h1: 'Refresh Rate and Frame Time Test', description: 'Estimate browser animation cadence, average frame interval, jitter and possible delays while the tab is active.' }),
    ],
  },
  {
    id: 'reaction-test',
    mode: 'reaction-test',
    aliases: ['reacao', 'reaction', 'input-lag', 'tempo-de-reacao', 'click-speed'],
    category: 'Medição e desempenho',
    title: 'Tempo de reação e clique',
    dockLabel: 'Reação',
    heroTitle: 'Tempo de Reação e Clique',
    description: 'Cinco rodadas cronometradas com média, melhor marca e desvio.',
    heroDesc: 'Clique ou toque quando a superfície acender. O tempo inclui sua reação e a latência de tela, mouse e sistema; a ferramenta não separa esses componentes.',
    when: 'Para comparar setups, testar periféricos novos e treinar reflexo.',
    icon: 'zap',
    tone: 'pixel',
    keyboard: { action: 'openReactionTest', key: 'a', code: 'KeyA', label: 'A', description: 'Abrir teste de tempo de reação' },
    dock: { visible: true, order: 16 },
    hero: { visible: true, order: 13 },
    pwa: { visible: false },
    seoPages: [],
  },
  {
    id: 'uniformity',
    mode: 'uniformity',
    aliases: ['uniformidade', 'backlight-bleed', 'gray-uniformity', 'clouding'],
    category: 'Ver e cuidar',
    title: 'Uniformidade e vazamento',
    dockLabel: 'Uniformidade',
    heroTitle: 'Uniformidade e Vazamento de Luz',
    description: 'Campos de cinza de referência para observar clouding, glow e manchas.',
    heroDesc: 'Percorra degraus digitais de cinza de 0% a 100% em tela cheia, com grade opcional de nove zonas, para comparar regiões aparentes.',
    when: 'Para avaliar um painel novo ou documentar irregularidades antes de consultar a garantia.',
    icon: 'layers',
    tone: 'clean',
    keyboard: { action: 'openUniformity', key: 'u', code: 'KeyU', label: 'U', description: 'Abrir teste de uniformidade' },
    dock: { visible: true, order: 17 },
    hero: { visible: true, order: 14 },
    pwa: { visible: true, name: 'Uniformidade', shortName: 'Uniform.' },
    seoPages: [
      seoPage('uniformity',
        { slug: 'teste-de-uniformidade-monitor', title: 'Teste de Uniformidade e Backlight Bleed do Monitor', h1: 'Teste de Uniformidade de Tela', description: 'Percorra degraus de cinza em tela cheia para revelar clouding, vazamento de luz de fundo, glow de bordas e manchas de retenção.' },
        { slug: 'screen-uniformity-test', title: 'Monitor Uniformity and Backlight Bleed Test', h1: 'Screen Uniformity Test', description: 'Step through fullscreen gray fields to reveal clouding, backlight bleed, edge glow and image retention stains.' }),
    ],
  },
  {
    id: 'gradient-banding',
    mode: 'gradient-banding',
    aliases: ['banding', 'gradiente', 'gradient', 'dithering', '10bit'],
    category: 'Ver e cuidar',
    title: 'Gradiente e banding',
    dockLabel: 'Banding',
    heroTitle: 'Gradiente e Teste de Banding',
    description: 'Rampas suaves para observar degraus de cor e padrões de dithering aparentes.',
    heroDesc: 'Rampas em cinza e nos canais primários ajudam a comparar banding visível entre arquivos, modos e configurações; não medem a profundidade física do painel.',
    when: 'Para observar banding e comparar configurações do caminho de imagem.',
    icon: 'gradient',
    tone: 'calibration',
    keyboard: { action: 'openGradient', key: 'd', code: 'KeyD', label: 'D', description: 'Abrir teste de gradiente e banding' },
    dock: { visible: true, order: 18 },
    hero: { visible: true, order: 15 },
    pwa: { visible: false },
    seoPages: [],
  },
  {
    id: 'pixel-exerciser',
    mode: 'pixel-exerciser',
    aliases: ['stuck-pixel', 'pixel-fixer', 'burn-in', 'retencao', 'exercitador'],
    category: 'Ver e cuidar',
    title: 'Exercitador de pixels',
    dockLabel: 'Exercitador',
    heroTitle: 'Exercitador de Pixels',
    description: 'Ciclo rápido de cores para exercitar uma região sob observação.',
    heroDesc: 'Alterna cores na área escolhida como tentativa experimental, com aviso de flashes e sem promessa de reparar pixels ou retenção.',
    when: 'Para uma tentativa breve e supervisionada após confirmar um ponto suspeito; interrompa se houver desconforto.',
    icon: 'refresh',
    tone: 'pixel',
    keyboard: null,
    dock: { visible: true, order: 19 },
    hero: { visible: false, order: 16 },
    pwa: { visible: false },
    seoPages: [],
  },
  {
    id: 'keyboard-test',
    mode: 'keyboard-test',
    aliases: ['teclado', 'keyboard', 'key-test', 'nkro', 'rollover'],
    category: 'Periféricos',
    title: 'Teste de teclado',
    dockLabel: 'Teclado',
    heroTitle: 'Teste de Teclado e Eventos Simultâneos',
    badge: 'DOM',
    description: 'Mapa visual de teclas, histórico de códigos e teclas simultâneas.',
    heroDesc: 'Um mapa ANSI acende as teclas cujos eventos chegam à página, guarda códigos DOM, mede intervalos de repetição e conta a simultaneidade observada.',
    when: 'Para registrar teclas, repetição automática e a simultaneidade observada pelo navegador.',
    icon: 'keyboard',
    tone: 'focus',
    keyboard: null,
    dock: { visible: true, order: 20 },
    hero: { visible: true, order: 17 },
    pwa: { visible: true, name: 'Teste de Teclado', shortName: 'Teclado' },
    seoPages: [
      seoPage('keyboard-test',
        { slug: 'teste-de-teclado-online', title: 'Teste de Teclado Online: Teclas e Simultaneidade', h1: 'Teste de Teclado Online', description: 'Observe eventos de teclas, repetições, códigos DOM e combinações simultâneas entregues ao navegador.' },
        { slug: 'keyboard-test', title: 'Online Keyboard and Simultaneous Event Test', h1: 'Online Keyboard Test', description: 'Observe key events, repeats, DOM codes and simultaneous combinations delivered to the browser.' }),
    ],
  },
  {
    id: 'mouse-test',
    mode: 'mouse-test',
    aliases: ['mouse', 'polling-rate', 'clique-duplo', 'double-click', 'scroll-test'],
    category: 'Periféricos',
    title: 'Teste de mouse',
    dockLabel: 'Mouse',
    heroTitle: 'Teste de Mouse e Taxa de Eventos',
    badge: 'EVENTOS',
    description: 'Botões, roda, clique duplo indesejado e taxa de eventos entregue pelo navegador.',
    heroDesc: 'Registra botões e roda, estima a taxa de eventos durante o movimento e ajuda a identificar cliques duplos indesejados.',
    when: 'Para investigar mouse com clique duplicado e observar a entrega de eventos no navegador.',
    icon: 'mouse',
    tone: 'focus',
    keyboard: { action: 'openMouseTest', key: 'o', code: 'KeyO', label: 'O', description: 'Abrir teste de mouse' },
    dock: { visible: true, order: 21 },
    hero: { visible: true, order: 18 },
    pwa: { visible: true, name: 'Teste de Mouse', shortName: 'Mouse' },
    seoPages: [
      seoPage('mouse-test',
        { slug: 'teste-de-mouse-online', title: 'Teste de Mouse Online: Botões, Eventos e Clique Duplo', h1: 'Teste de Mouse Online', description: 'Observe botões, roda, taxa de eventos entregue pelo navegador e repetições de clique que merecem nova verificação.' },
        { slug: 'mouse-test', title: 'Online Mouse Test: Buttons, Event Rate and Double Clicks', h1: 'Online Mouse Test', description: 'Observe buttons, wheel input, browser-delivered event rate and repeated clicks that warrant another check.' }),
    ],
  },
  {
    id: 'gamepad-test',
    mode: 'gamepad-test',
    aliases: ['gamepad', 'controle', 'joystick', 'stick-drift', 'deadzone'],
    category: 'Periféricos',
    title: 'Teste de controle',
    dockLabel: 'Controle',
    heroTitle: 'Teste de Controle e Stick Drift',
    description: 'Botões, gatilhos analógicos, drift de analógico e vibração.',
    heroDesc: 'Leia os botões e eixos que a Gamepad API expõe, observe valores em repouso e teste vibração quando o navegador oferecer o recurso.',
    when: 'Para observar desvio, zona morta e resposta antes de um reparo ou compra, considerando o mapeamento do navegador.',
    icon: 'gamepad',
    tone: 'pixel',
    keyboard: null,
    dock: { visible: true, order: 22 },
    hero: { visible: true, order: 19 },
    pwa: { visible: false },
    seoPages: [
      seoPage('gamepad-test',
        { slug: 'teste-de-controle-online', title: 'Teste de Controle Online: Eixos, Botões e Drift', h1: 'Teste de Controle e Stick Drift', description: 'Observe botões, eixos, gatilhos e vibração expostos pela Gamepad API, com limites de compatibilidade.' },
        { slug: 'gamepad-test', title: 'Online Gamepad Test: Axes, Buttons and Drift', h1: 'Gamepad and Stick Drift Test', description: 'Observe buttons, axes, triggers and rumble exposed through the Gamepad API, subject to browser compatibility.' }),
    ],
  },
  {
    id: 'audio-test',
    mode: 'audio-test',
    aliases: ['audio', 'som', 'microfone', 'alto-falante', 'estereo', 'speaker-test'],
    category: 'Periféricos',
    title: 'Teste de áudio e microfone',
    dockLabel: 'Áudio',
    heroTitle: 'Teste de Áudio, Estéreo e Microfone',
    description: 'Canais esquerdo e direito, varredura de frequência e nível do microfone.',
    heroDesc: 'Toque tons em cada canal para conferir o roteamento estéreo, faça uma varredura de 20 Hz a 20 kHz e observe o nível digital relativo do microfone.',
    when: 'Para conferir caixas de som, headset e microfone antes de uma chamada ou gravação.',
    icon: 'audio',
    tone: 'focus',
    keyboard: null,
    dock: { visible: true, order: 23 },
    hero: { visible: true, order: 20 },
    pwa: { visible: false },
    seoPages: [],
  },
  {
    id: 'webcam-test',
    mode: 'webcam-test',
    aliases: ['webcam', 'camera', 'video-test', 'camera-test'],
    category: 'Periféricos',
    title: 'Teste de webcam',
    dockLabel: 'Webcam',
    heroTitle: 'Teste de Webcam',
    description: 'Prévia local com resolução, taxa de quadros e escolha de dispositivo.',
    heroDesc: 'Veja a imagem da câmera com resolução e taxa de quadros negociadas, troque entre dispositivos, espelhe a prévia e capture um quadro — tudo sem sair do navegador.',
    when: 'Para validar a câmera antes de uma reunião ou live.',
    icon: 'camera',
    tone: 'light',
    keyboard: null,
    dock: { visible: true, order: 24 },
    hero: { visible: false, order: 21 },
    pwa: { visible: false },
    seoPages: [],
  },
  {
    id: 'display-calculators',
    mode: 'display-calculators',
    aliases: ['calculadoras', 'bandwidth', 'hdmi', 'displayport', 'fov', 'proporcao'],
    category: 'Cálculo e óptica',
    title: 'Calculadoras de display',
    dockLabel: 'Calculadoras',
    heroTitle: 'Calculadoras de Display',
    badge: '3 em 1',
    description: 'Banda de vídeo, distância de visão com FOV e proporção de tela.',
    heroDesc: 'Três estimativas em um painel: banda bruta por resolução, taxa e profundidade de cor; distância correspondente ao campo de visão; e dimensões por proporção.',
    when: 'Para escolher cabo HDMI ou DisplayPort e planejar a mesa antes de comprar.',
    icon: 'calc',
    tone: 'calibration',
    keyboard: null,
    dock: { visible: true, order: 25 },
    hero: { visible: true, order: 22 },
    pwa: { visible: true, name: 'Calculadoras de Display', shortName: 'Calc' },
    seoPages: [
      seoPage('display-calculators',
        { slug: 'calculadora-de-banda-hdmi-displayport', title: 'Calculadora de Banda HDMI/DisplayPort, FOV e Proporção', h1: 'Calculadoras de Banda, FOV e Proporção', description: 'Estime banda bruta por resolução e taxa, calcule a distância correspondente a um FOV e derive dimensões por proporção.' },
        { slug: 'hdmi-displayport-bandwidth-calculator', title: 'HDMI/DisplayPort Bandwidth, FOV and Aspect Ratio Calculator', h1: 'Bandwidth, FOV and Aspect Ratio Calculators', description: 'Estimate raw bandwidth by resolution and refresh rate, calculate distance for a target FOV, and derive dimensions from aspect ratio.' }),
    ],
  },
  {
    id: 'screen-ruler',
    mode: 'screen-ruler',
    aliases: ['regua', 'ruler', 'medir-tela', 'escala'],
    category: 'Cálculo e óptica',
    title: 'Régua de tela',
    dockLabel: 'Régua',
    heroTitle: 'Régua de Tela Calibrada',
    description: 'Régua em centímetros e polegadas após calibração manual por uma referência conhecida.',
    heroDesc: 'Calibre a escala com um cartão de crédito ou informando a diagonal do painel e passe a medir objetos direto na tela em centímetros, polegadas e pixels.',
    when: 'Para medições rápidas e conferência de escala em impressões e telas.',
    icon: 'ruler',
    tone: 'calibration',
    keyboard: null,
    dock: { visible: true, order: 26 },
    hero: { visible: false, order: 23 },
    pwa: { visible: false },
    seoPages: [],
  },
]);

/**
 * Traduções de interface do catálogo. O português permanece canônico nos
 * campos principais; en e es são projetados em TOOL_LIBRARY.
 */
export const TOOL_I18N = Object.freeze({
  black: {
    en: { title: 'Black screen', description: 'Fill the display with absolute black.' },
    es: { title: 'Pantalla negra', description: 'Llena la pantalla con negro absoluto.' },
  },
  'dead-pixel': {
    en: { title: 'Pixel test', description: 'Cycle solid colors and find suspicious dots on the panel.' },
    es: { title: 'Prueba de píxeles', description: 'Recorre colores sólidos y encuentra puntos sospechosos.' },
  },
  cleaner: {
    en: { title: 'Cleaning inspection', description: 'High contrast fields that reveal dust, smudges and marks.' },
    es: { title: 'Inspección de limpieza', description: 'Alto contraste para revelar polvo, marcas y manchas.' },
  },
  calibration: {
    en: { title: 'Visual check', description: 'Reference patterns for scale, color, sharpness and contrast.' },
    es: { title: 'Verificación visual', description: 'Patrones de escala, color, nitidez y contraste.' },
  },
  white: {
    en: { title: 'Soft light', description: 'A bright surface with adjustable visual temperature and level.' },
    es: { title: 'Luz suave', description: 'Superficie clara con temperatura e intensidad ajustables.' },
  },
  color: {
    en: { title: 'Color studio', description: 'Fill the screen with any color or a stored preset.' },
    es: { title: 'Estudio de color', description: 'Llena la pantalla con un color libre o un preajuste.' },
  },
  'green-screen': {
    en: { title: 'Green screen', description: 'Solid #00B140 green for chroma key compositing.' },
    es: { title: 'Pantalla verde', description: 'Verde sólido #00B140 para composición por croma.' },
  },
  'focus-timer': {
    en: { title: 'Focus timer', description: 'A quiet timer for concentration cycles.' },
    es: { title: 'Temporizador de foco', description: 'Un temporizador discreto para ciclos de concentración.' },
  },
  clock: {
    en: { title: 'Screen clock', description: 'Readable time and date for a secondary display.' },
    es: { title: 'Reloj de pantalla', description: 'Hora y fecha legibles para una pantalla secundaria.' },
  },
  message: {
    en: { title: 'On-screen message', description: 'Show a room-scale notice or mirrored reading text.' },
    es: { title: 'Mensaje en pantalla', description: 'Muestra un aviso a escala de sala o texto espejado.' },
  },
  'sponsor-loop': {
    en: { title: 'Brand loop', description: 'Rotate local images and logos automatically.' },
    es: { title: 'Bucle de marcas', description: 'Rota imágenes y logos locales automáticamente.' },
  },
  'ppi-calculator': {
    en: { title: 'PPI calculator', description: 'Pixel density, dot pitch and a one-arcminute geometric reference.' },
    es: { title: 'Calculadora de PPI', description: 'Densidad de píxeles, dot pitch y una referencia geométrica de un minuto de arco.' },
  },
  'motion-blur': {
    en: { title: 'Ghosting & motion blur test', description: 'Visual motion trails, blur, overshoot and browser animation cadence.' },
    es: { title: 'Prueba de ghosting y motion blur', description: 'Observación de rastros, desenfoque, overshoot y cadencia del navegador.' },
  },
  'touch-tester': {
    en: { title: 'Touchscreen test', description: 'Map areas without touch events and browser-observed multitouch.' },
    es: { title: 'Prueba de pantalla táctil', description: 'Mapea áreas sin eventos y el multitáctil observado por el navegador.' },
  },
  'display-info': {
    en: { title: 'Display fact sheet', description: 'Logical resolution, scale and browser-reported color and GPU capabilities.' },
    es: { title: 'Ficha técnica de la pantalla', description: 'Resolución lógica, escala y funciones de color y GPU declaradas por el navegador.' },
  },
  'refresh-rate': {
    en: { title: 'Hz & frame time meter', description: 'Estimate browser animation cadence, frame intervals and timing variation.' },
    es: { title: 'Medidor de Hz y frame time', description: 'Estima la cadencia del navegador, intervalos de fotogramas y variaciones.' },
  },
  'reaction-test': {
    en: { title: 'Reaction & click time', description: 'Five timed rounds with average, best score and deviation.' },
    es: { title: 'Tiempo de reacción y clic', description: 'Cinco rondas cronometradas con media, récord y desviación.' },
  },
  uniformity: {
    en: { title: 'Uniformity & bleed', description: 'Reference gray fields for inspecting clouding, glow and stains.' },
    es: { title: 'Uniformidad y fugas de luz', description: 'Campos de gris que revelan clouding, glow y manchas.' },
  },
  'gradient-banding': {
    en: { title: 'Gradient & banding', description: 'Smooth ramps for visually comparing color steps and apparent dithering.' },
    es: { title: 'Degradado y banding', description: 'Rampas suaves para comparar escalones de color y dithering aparente.' },
  },
  'pixel-exerciser': {
    en: { title: 'Pixel exerciser', description: 'Experimental color cycling with a flash warning and no repair promise.' },
    es: { title: 'Ejercitador de píxeles', description: 'Ciclo experimental con aviso de destellos y sin promesa de reparación.' },
  },
  'keyboard-test': {
    en: { title: 'Keyboard test', description: 'Visual key map, DOM code history and observed simultaneous keys.' },
    es: { title: 'Prueba de teclado', description: 'Mapa visual, historial de códigos y teclas simultáneas.' },
  },
  'mouse-test': {
    en: { title: 'Mouse test', description: 'Buttons, wheel, unintended double clicks and browser-delivered event rate.' },
    es: { title: 'Prueba de ratón', description: 'Botones, rueda, doble clic no deseado y tasa de eventos entregada por el navegador.' },
  },
  'gamepad-test': {
    en: { title: 'Gamepad test', description: 'Buttons, analog triggers, stick drift and rumble.' },
    es: { title: 'Prueba de mando', description: 'Botones, gatillos analógicos, stick drift y vibración.' },
  },
  'audio-test': {
    en: { title: 'Audio & microphone test', description: 'Left and right channels, frequency sweep and mic level.' },
    es: { title: 'Prueba de audio y micrófono', description: 'Canales izquierdo y derecho, barrido y nivel de micrófono.' },
  },
  'webcam-test': {
    en: { title: 'Webcam test', description: 'Local preview with resolution, frame rate and device picker.' },
    es: { title: 'Prueba de webcam', description: 'Vista local con resolución, FPS y selector de dispositivo.' },
  },
  'display-calculators': {
    en: { title: 'Display calculators', description: 'Video bandwidth, viewing distance with FOV and aspect ratio.' },
    es: { title: 'Calculadoras de pantalla', description: 'Ancho de banda, distancia con FOV y relación de aspecto.' },
  },
  'screen-ruler': {
    en: { title: 'Screen ruler', description: 'Centimetre and inch ruler after manual calibration against a known reference.' },
    es: { title: 'Regla de pantalla', description: 'Regla en centímetros y pulgadas tras calibración manual con una referencia conocida.' },
  },
});

/** Ferramentas que dependem de permissão explícita do navegador. */
export const PERMISSION_TOOLS = Object.freeze(['audio-test', 'webcam-test']);

/** Ferramentas adicionadas na revisão mais recente do catálogo. */
export const RECENT_TOOLS = Object.freeze([
  'display-info', 'refresh-rate', 'reaction-test', 'uniformity', 'gradient-banding',
  'pixel-exerciser', 'keyboard-test', 'mouse-test', 'gamepad-test', 'audio-test',
  'webcam-test', 'display-calculators', 'screen-ruler',
]);

const byOrder = (placement) => (left, right) =>
  (left[placement]?.order ?? Number.MAX_SAFE_INTEGER) -
  (right[placement]?.order ?? Number.MAX_SAFE_INTEGER);

export const TOOL_COUNT = TOOLS_REGISTRY.length;
/** Aliases explícitos para testes e integrações semânticas. */
export const TOOL_REGISTRY = TOOLS_REGISTRY;
export const TOOLS = TOOLS_REGISTRY;

export const TOOL_BY_ID = Object.freeze(
  Object.fromEntries(TOOLS_REGISTRY.map((tool) => [tool.id, tool])),
);

export const TOOL_ALIAS_MAP = Object.freeze(
  TOOLS_REGISTRY.reduce((aliases, tool) => {
    [tool.id, ...(tool.aliases || [])].forEach((alias) => {
      aliases[alias.toLowerCase()] = tool.id;
    });
    return aliases;
  }, {}),
);

export function getToolById(id) {
  return typeof id === 'string' ? TOOL_BY_ID[id.toLowerCase()] || null : null;
}

export function getToolByAlias(value) {
  if (typeof value !== 'string') return null;
  return getToolById(TOOL_ALIAS_MAP[value.trim().toLowerCase()]);
}

export function resolveToolLaunch(value) {
  const tool = typeof value === 'string' ? getToolByAlias(value) : value;
  if (!tool) return null;
  return {
    toolId: tool.id,
    mode: tool.mode,
    preset: tool.launchPreset || tool.preset || {},
  };
}

export const SEO_PAGE_ROUTES = Object.freeze(
  TOOLS_REGISTRY.flatMap((tool) =>
    (tool.seoPages || []).map((page) => Object.freeze({
      ...page,
      toolId: tool.id,
      mode: tool.mode,
      launchPreset: Object.freeze({ ...(tool.launchPreset || {}) }),
    })),
  ),
);

export const PWA_SHORTCUTS = Object.freeze(
  TOOLS_REGISTRY
    .filter((tool) => tool.pwa?.visible)
    .map((tool) => ({
      toolId: tool.id,
      name: tool.pwa.name || tool.title,
      short_name: tool.pwa.shortName || tool.title,
      description: tool.description,
      url: `/?tool=${encodeURIComponent(tool.id)}`,
    })),
);

export const TOOL_LIBRARY = Object.freeze(
  TOOLS_REGISTRY.map((tool) => ({
    id: tool.id,
    mode: tool.mode,
    category: tool.category,
    title: tool.heroTitle || tool.title,
    description: tool.description,
    when: tool.when,
    icon: tool.icon,
    shortcut: tool.keyboard?.label || '—',
    tone: tool.tone,
    ...(tool.badge ? { badge: tool.badge } : {}),
    ...(tool.mode !== tool.id ? { launchMode: tool.mode } : {}),
    i18n: TOOL_I18N[tool.id] || null,
    needsPermission: PERMISSION_TOOLS.includes(tool.id),
    isRecent: RECENT_TOOLS.includes(tool.id),
    ...(tool.launchPreset?.customColor ? { color: tool.launchPreset.customColor } : {}),
    ...(typeof tool.launchPreset?.ambientBrightness === 'number'
      ? { brightness: tool.launchPreset.ambientBrightness }
      : {}),
    ...(tool.seoPages && tool.seoPages.length > 0 ? {
      seoSlug: tool.seoPages[0].pt.slug,
      seoSlugEn: tool.seoPages[0].en.slug,
    } : {}),
  })),
);

export const HERO_GRID_TOOLS = Object.freeze(
  TOOLS_REGISTRY
    .filter((tool) => tool.hero?.visible)
    .sort(byOrder('hero'))
    .map((tool) => ({
      id: tool.id,
      title: tool.heroTitle || tool.title,
      icon: tool.icon,
      shortcut: tool.keyboard?.label || '—',
      desc: tool.heroDesc || tool.description,
      ...(tool.badge ? { badge: tool.badge } : {}),
    })),
);

/** Objetos completos: App, Dock e menu radial consomem o mesmo contrato. */
export const DOCK_TOOLS = Object.freeze(
  TOOLS_REGISTRY
    .filter((tool) => tool.dock?.visible)
    .sort(byOrder('dock'))
    .map((tool) => Object.freeze({
      id: tool.mode,
      toolId: tool.id,
      label: tool.dockLabel || tool.title,
      icon: tool.icon,
      detail: tool.description,
      shortcut: tool.keyboard?.label || '',
    })),
);

export const TOOLS_MODE_PRESENTATION = Object.freeze(
  TOOLS_REGISTRY.reduce(
    (presentation, tool) => {
      if (!presentation[tool.mode] || tool.dock?.visible) {
        presentation[tool.mode] = {
          label: tool.dockLabel || tool.title,
          icon: tool.icon,
        };
      }
      return presentation;
    },
    { home: { label: 'Ferramentas', icon: 'home' } },
  ),
);

/**
 * Validador puro: não altera estado nem lança exceção. Útil em Vitest e em
 * ferramentas editoriais que precisam exibir todos os problemas de uma vez.
 */
export function validateToolRegistry(registry = TOOLS_REGISTRY) {
  const errors = [];
  if (!Array.isArray(registry)) return ['O catálogo deve ser um array.'];

  const ids = new Set();
  const aliases = new Set();
  const shortcuts = new Set();
  const ptSlugs = new Set();
  const enSlugs = new Set();
  const routeKeys = new Set();
  const dockModes = new Set();
  const validCategories = new Set(TOOL_CATEGORIES);

  for (const candidate of registry) {
    if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) {
      errors.push('Cada ferramenta deve ser um objeto.');
      continue;
    }
    const tool = candidate;
    const id = typeof tool.id === 'string' ? tool.id.trim().toLowerCase() : '';
    const label = id || '(sem id)';

    if (!id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) errors.push(`ID inválido ou ausente: ${tool.id || '(vazio)'}`);
    if (id && ids.has(id)) errors.push(`ID de ferramenta duplicado: ${id}`);
    if (id) ids.add(id);
    if (typeof tool.mode !== 'string' || !tool.mode.trim()) errors.push(`Ferramenta ${label} não declara mode.`);
    if (!validCategories.has(tool.category)) errors.push(`Categoria inválida em ${label}: ${tool.category}`);
    if (!tool.title || !tool.description || !tool.when || !tool.icon || !tool.tone) {
      errors.push(`Metadados de interface incompletos em ${label}.`);
    }

    if (tool.dock?.visible && tool.mode) {
      if (dockModes.has(tool.mode)) errors.push(`Mais de uma ferramenta visível no dock usa o modo ${tool.mode}.`);
      dockModes.add(tool.mode);
    }

    const toolAliases = Array.isArray(tool.aliases) ? tool.aliases : [];
    for (const alias of [id, ...toolAliases].filter(Boolean)) {
      if (typeof alias !== 'string') {
        errors.push(`Alias inválido em ${label}.`);
        continue;
      }
      const normalized = alias.trim().toLowerCase();
      if (!normalized) {
        errors.push(`Alias vazio em ${label}.`);
        continue;
      }
      if (aliases.has(normalized)) errors.push(`Alias duplicado: ${normalized}`);
      aliases.add(normalized);
    }

    if (tool.keyboard) {
      if (!tool.keyboard.action || !tool.keyboard.key || !tool.keyboard.code || !tool.keyboard.label || !tool.keyboard.description) {
        errors.push(`Atalho incompleto em ${label}.`);
      }
      const signature = `${tool.keyboard.code}:${Boolean(tool.keyboard.shiftKey)}`;
      if (shortcuts.has(signature)) errors.push(`Atalho duplicado: ${signature}`);
      shortcuts.add(signature);
    }

    if (tool.launchPreset?.customColor && !/^#[0-9a-f]{6}$/i.test(tool.launchPreset.customColor)) {
      errors.push(`Cor inicial inválida em ${label}: ${tool.launchPreset.customColor}`);
    }
    if (
      tool.launchPreset?.ambientBrightness !== undefined &&
      (!Number.isFinite(tool.launchPreset.ambientBrightness) || tool.launchPreset.ambientBrightness < 0 || tool.launchPreset.ambientBrightness > 100)
    ) {
      errors.push(`Brilho inicial inválido em ${label}: ${tool.launchPreset.ambientBrightness}`);
    }

    const seoPages = Array.isArray(tool.seoPages) ? tool.seoPages : [];
    for (const page of seoPages) {
      if (!page || typeof page !== 'object') {
        errors.push(`Rota SEO inválida em ${label}.`);
        continue;
      }
      if (!page.key || !page.pt?.slug || !page.en?.slug) errors.push(`Rota SEO incompleta em ${label}.`);
      if (page.key && routeKeys.has(page.key)) errors.push(`Chave de rota SEO duplicada: ${page.key}`);
      if (page.key) routeKeys.add(page.key);
      if (ptSlugs.has(page.pt?.slug)) errors.push(`Slug pt-BR duplicado: ${page.pt?.slug}`);
      if (enSlugs.has(page.en?.slug)) errors.push(`Slug en duplicado: ${page.en?.slug}`);
      if (page.pt?.slug) ptSlugs.add(page.pt.slug);
      if (page.en?.slug) enSlugs.add(page.en.slug);
      for (const locale of ['pt', 'en']) {
        const metadata = page[locale];
        if (!metadata?.title || !metadata?.description || !metadata?.h1) {
          errors.push(`Metadados SEO ${locale} incompletos em ${label}/${page.key || '(sem chave)'}.`);
        }
        if (metadata?.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.slug)) {
          errors.push(`Slug ${locale} inválido em ${label}: ${metadata.slug}`);
        }
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(page.lastModified || '')) {
        errors.push(`lastModified inválido em ${label}/${page.key || '(sem chave)'}.`);
      }
    }
  }

  return errors;
}

/** Assertion usada no carregamento da aplicação e no gerador de produção. */
export function validateToolsRegistry(registry = TOOLS_REGISTRY) {
  const errors = validateToolRegistry(registry);
  if (errors.length > 0) throw new Error(`Catálogo inválido:\n- ${errors.join('\n- ')}`);
  return true;
}

validateToolsRegistry();
