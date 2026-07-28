import {
  DOCK_TOOLS,
  TOOLS_MODE_PRESENTATION,
  TOOLS_REGISTRY,
} from './tools';

/** Nomes semânticos usados pelos componentes de modo. */
export const MODE_IDS = Object.freeze({
  HOME: 'home',
  BLACK: 'black',
  WHITE: 'white',
  CLEANER: 'cleaner',
  DEAD_PIXEL: 'dead-pixel',
  CALIBRATION: 'calibration',
  FOCUS_TIMER: 'focus-timer',
  CLOCK: 'clock',
  MESSAGE: 'message',
  COLOR: 'color',
  SPONSOR_LOOP: 'sponsor-loop',
});

export const DISPLAY_MODE_IDS = Object.freeze([
  MODE_IDS.HOME,
  ...new Set(TOOLS_REGISTRY.map((tool) => tool.mode)),
]);

export const DEFAULT_MODE = MODE_IDS.HOME;

const SYSTEM_SHORTCUTS = [
  {
    id: 'tool-library',
    action: 'openLibrary',
    key: 'h',
    code: 'KeyH',
    label: 'H',
    description: 'Abrir ferramentas do MonitorSmith',
  },
  {
    id: 'toggle-fullscreen',
    action: 'toggleFullscreen',
    key: 'f',
    code: 'KeyF',
    label: 'F',
    description: 'Alternar tela cheia',
  },
];

const TOOL_SHORTCUTS = TOOLS_REGISTRY
  .filter((tool) => tool.keyboard)
  .map((tool) => ({
    id: tool.id,
    ...tool.keyboard,
  }));

const ACCESSIBILITY_SHORTCUTS = [
  {
    id: 'restore-interface',
    action: 'restoreInterface',
    key: 'escape',
    code: 'Escape',
    label: 'Esc',
    description: 'Restaurar a interface',
    allowInEditable: true,
  },
  {
    id: 'keyboard-help',
    action: 'toggleHelp',
    key: '?',
    code: 'Slash',
    shiftKey: true,
    label: '?',
    description: 'Ver atalhos de teclado',
  },
  {
    id: 'keyboard-help-k',
    action: 'toggleHelp',
    key: 'k',
    code: 'KeyK',
    label: 'K',
    description: 'Ver atalhos de teclado',
  },
  {
    id: 'keyboard-help-slash',
    action: 'toggleHelp',
    key: '/',
    code: 'Slash',
    label: '/',
    description: 'Ver atalhos de teclado',
  },
];

export const SHORTCUTS = Object.freeze(
  [...SYSTEM_SHORTCUTS, ...TOOL_SHORTCUTS, ...ACCESSIBILITY_SHORTCUTS]
    .map((shortcut) => Object.freeze(shortcut)),
);

export const SHORTCUTS_BY_ACTION = Object.freeze(
  SHORTCUTS.reduce((shortcutsByAction, shortcut) => {
    shortcutsByAction[shortcut.action] = shortcut;
    return shortcutsByAction;
  }, {}),
);

export function isDisplayMode(mode) {
  return DISPLAY_MODE_IDS.includes(mode);
}

export const MODE_PRESENTATION = TOOLS_MODE_PRESENTATION;

export function getModePresentation(mode) {
  if (mode && typeof mode === 'object') {
    const fallback = MODE_PRESENTATION[mode.id] || {};
    return {
      id: mode.id || MODE_IDS.BLACK,
      label: mode.label || fallback.label || 'Modo de exibição',
      icon: mode.icon || fallback.icon || 'spark',
    };
  }

  const id = mode || MODE_IDS.BLACK;
  const fallback = MODE_PRESENTATION[id] || {};
  return {
    id,
    label: fallback.label || 'Modo de exibição',
    icon: fallback.icon || 'spark',
  };
}

/**
 * Mantido como export público, agora com objetos completos. Isso atende o
 * contrato usado por DockMenu, swipe e menu radial sem estruturas paralelas.
 */
export const DEFAULT_DOCK_MODES = DOCK_TOOLS;
