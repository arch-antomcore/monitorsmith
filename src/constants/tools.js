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
  repositoryUrl: 'https://github.com/arch-antomcore/monitorsmith',
  contactUrl: 'https://exvorn.tech/',
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  contentLastModified: '2026-07-27',
});

export const TOOL_CATEGORIES = Object.freeze([
  'Ver e cuidar',
  'Cor e iluminação',
  'Atalho de cor',
  'Tempo e presença',
]);

const seoPage = (key, pt, en) => ({
  key,
  lastModified: SITE_METADATA.contentLastModified,
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
        { slug: 'tela-preta-oled', title: 'Tela Preta OLED em Tela Cheia', h1: 'Tela Preta OLED em Tela Cheia', description: 'Abra uma tela preta em fullscreen para reduzir luz e inspecionar pixels claros, IPS glow e vazamento de luz.' },
        { slug: 'black-screen', title: 'Fullscreen Black Screen for Monitor Inspection', h1: 'Fullscreen Black Screen', description: 'Open a fullscreen black surface to reduce emitted light and visually inspect bright pixels, IPS glow and backlight bleed.' }),
      seoPage('backlight-bleed',
        { slug: 'teste-de-vazamento-de-luz', title: 'Teste Visual de Vazamento de Luz', h1: 'Teste de Vazamento de Luz e IPS Glow', description: 'Use uma tela preta em ambiente escuro para observar backlight bleed e IPS glow no monitor.' },
        { slug: 'backlight-bleed-test', title: 'Backlight Bleed and IPS Glow Visual Test', h1: 'Backlight Bleed and IPS Glow Test', description: 'Use a black screen in a dark room to visually inspect backlight bleed and IPS glow on your monitor.' }),
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
        { slug: 'fullscreen-message', title: 'Online Fullscreen Message', h1: 'Fullscreen Message', description: 'Create a readable fullscreen notice with adjustable text and colors.' }),
      seoPage('online-teleprompter',
        { slug: 'teleprompter-online', title: 'Teleprompter Online Espelhado', h1: 'Teleprompter Online', description: 'Exiba e espelhe texto em tela cheia como apoio simples para gravações.' },
        { slug: 'online-teleprompter', title: 'Online Mirrored Teleprompter', h1: 'Online Teleprompter', description: 'Display and mirror fullscreen text as a simple reading aid for recordings.' }),
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
    preset: { ...(tool.launchPreset || {}) },
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
    ...(tool.launchPreset?.customColor ? { color: tool.launchPreset.customColor } : {}),
    ...(typeof tool.launchPreset?.ambientBrightness === 'number'
      ? { brightness: tool.launchPreset.ambientBrightness }
      : {}),
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
