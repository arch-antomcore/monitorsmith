/**
 * Registro Central e Mestre das Ferramentas da Aplicação Frontend (MonitorSmith).
 * Fonte única de verdade para metadados visuais, atalhos, categorias e exibição.
 * Facilitando a manutenção e a adição de novas ferramentas de forma dinâmica.
 */

export const TOOL_CATEGORIES = Object.freeze([
  'Ver e cuidar',
  'Cor e iluminação',
  'Atalho de cor',
  'Tempo e presença',
]);

export const TOOLS_REGISTRY = Object.freeze([
  {
    id: 'black',
    category: 'Ver e cuidar',
    title: 'Tela preta',
    dockLabel: 'Tela preta',
    heroTitle: 'Tela Preta',
    description: 'Preencha a tela com preto absoluto.',
    heroDesc: 'Preencha a tela com preto absoluto — reduza luz, oculte distrações e proteja painéis OLED.',
    when: 'Para reduzir luz e remover distrações.',
    icon: 'void',
    shortcut: 'B',
    tone: 'void',
    inDock: true,
    inHeroGrid: true,
  },
  {
    id: 'dead-pixel',
    category: 'Ver e cuidar',
    title: 'Teste visual de pixels',
    dockLabel: 'Pixels',
    heroTitle: 'Teste de Pixels',
    description: 'Percorra cores sólidas e encontre pontos suspeitos no painel.',
    heroDesc: 'Percorra 8 cores sólidas e identifique subpixels mortos, presos ou com vazamento no painel.',
    when: 'Para uma inspeção visual rápida.',
    icon: 'pixels',
    shortcut: '—',
    tone: 'pixel',
    inDock: true,
    inHeroGrid: true,
  },
  {
    id: 'cleaner',
    category: 'Ver e cuidar',
    title: 'Inspeção para limpeza',
    dockLabel: 'Inspeção',
    heroTitle: 'Inspeção para Limpeza',
    description: 'Alto contraste para revelar poeira, marcas e manchas.',
    heroDesc: 'Alto contraste para revelar poeira, marcas de dedo e variações de superfície antes da limpeza.',
    when: 'Para preparar o painel antes da limpeza física.',
    icon: 'cleaner',
    shortcut: 'C',
    tone: 'clean',
    inDock: true,
    inHeroGrid: true,
  },
  {
    id: 'calibration',
    category: 'Ver e cuidar',
    title: 'Verificação visual',
    dockLabel: 'Verificação',
    description: 'Padrões de escala, cor, nitidez e gama para inspecionar a imagem.',
    when: 'Para conferir o comportamento do display.',
    icon: 'calibration',
    shortcut: 'G',
    tone: 'calibration',
    inDock: true,
    inHeroGrid: false,
  },
  {
    id: 'white',
    category: 'Cor e iluminação',
    title: 'Luz suave',
    dockLabel: 'Luz suave',
    heroTitle: 'Luz Suave',
    description: 'Uma tela clara com temperatura visual e intensidade ajustáveis.',
    heroDesc: 'Iluminação neutra com temperatura e intensidade ajustáveis para chamadas e gravações.',
    when: 'Para chamadas, gravações e luz de apoio.',
    icon: 'sun',
    shortcut: 'W',
    tone: 'light',
    inDock: true,
    inHeroGrid: true,
  },
  {
    id: 'color',
    category: 'Cor e iluminação',
    title: 'Estúdio de cor',
    dockLabel: 'Estúdio de cor',
    description: 'Preencha a tela com uma cor livre ou um preset.',
    when: 'Para ambientação, prévia visual e cenários.',
    icon: 'color',
    shortcut: 'S',
    tone: 'color',
    inDock: true,
    inHeroGrid: false,
  },
  {
    id: 'green-screen',
    launchMode: 'color',
    color: '#00B140',
    brightness: 100,
    category: 'Atalho de cor',
    title: 'Tela verde',
    description: 'Verde sólido para chroma.',
    when: 'Para composição de vídeo em um painel uniforme.',
    icon: 'color',
    shortcut: '—',
    tone: 'green',
    inDock: false,
    inHeroGrid: false,
  },
  {
    id: 'focus-timer',
    category: 'Tempo e presença',
    title: 'Foco',
    dockLabel: 'Foco',
    heroTitle: 'Timer de Foco',
    description: 'Um timer discreto para ciclos de concentração.',
    heroDesc: 'Cronômetro discreto com ciclos de concentração, presets e alarme sonoro nativo.',
    when: 'Para trabalho profundo e pausas.',
    icon: 'timer',
    shortcut: 'P',
    tone: 'focus',
    inDock: true,
    inHeroGrid: true,
  },
  {
    id: 'clock',
    category: 'Tempo e presença',
    title: 'Relógio',
    dockLabel: 'Relógio',
    heroTitle: 'Relógio de Tela',
    badge: 'Analógico',
    description: 'Hora e data legíveis para uma tela secundária.',
    heroDesc: 'Hora e data legíveis em tempo real para monitor secundário, mesas e estúdios.',
    when: 'Para mesas, estúdios e salas.',
    icon: 'clock',
    shortcut: 'T',
    tone: 'clock',
    inDock: true,
    inHeroGrid: true,
  },
  {
    id: 'message',
    category: 'Tempo e presença',
    title: 'Mensagem em tela',
    dockLabel: 'Mensagem',
    description: 'Exiba um recado em escala de sala.',
    when: 'Para status, recepção e comunicação visual.',
    icon: 'message',
    shortcut: 'M',
    tone: 'message',
    inDock: true,
    inHeroGrid: false,
  },
]);

export const TOOL_LIBRARY = Object.freeze(
  TOOLS_REGISTRY.map((tool) => ({
    id: tool.id,
    category: tool.category,
    title: tool.title,
    description: tool.description,
    when: tool.when,
    icon: tool.icon,
    shortcut: tool.shortcut,
    tone: tool.tone,
    ...(tool.launchMode ? { launchMode: tool.launchMode, color: tool.color, brightness: tool.brightness } : {}),
  }))
);

export const HERO_GRID_TOOLS = Object.freeze(
  TOOLS_REGISTRY
    .filter((tool) => tool.inHeroGrid)
    .map((tool) => ({
      id: tool.id,
      title: tool.heroTitle || tool.title,
      icon: tool.icon,
      shortcut: tool.shortcut,
      desc: tool.heroDesc || tool.description,
      ...(tool.badge ? { badge: tool.badge } : {}),
    }))
);

export const DOCK_TOOLS = Object.freeze(
  TOOLS_REGISTRY.filter((tool) => tool.inDock).map((tool) => tool.id)
);

export const TOOLS_MODE_PRESENTATION = Object.freeze(
  TOOLS_REGISTRY.reduce(
    (acc, tool) => {
      acc[tool.id] = {
        label: tool.dockLabel || tool.title,
        icon: tool.icon,
      };
      return acc;
    },
    { home: { label: 'Ferramentas', icon: 'home' } }
  )
);
