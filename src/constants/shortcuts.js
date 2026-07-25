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
});

export const DISPLAY_MODE_IDS = Object.freeze(Object.values(MODE_IDS));

export const DEFAULT_MODE = MODE_IDS.HOME;

export const SHORTCUTS = Object.freeze([
  Object.freeze({
    id: 'tool-library',
    action: 'openLibrary',
    key: 'h',
    code: 'KeyH',
    label: 'H',
    description: 'Abrir ferramentas do MonitorSmith',
  }),
  Object.freeze({
    id: 'toggle-fullscreen',
    action: 'toggleFullscreen',
    key: 'f',
    code: 'KeyF',
    label: 'F',
    description: 'Alternar tela cheia',
  }),
  Object.freeze({
    id: 'black-screen',
    action: 'activateBlackScreen',
    key: 'b',
    code: 'KeyB',
    label: 'B',
    description: 'Ativar tela preta',
  }),
  Object.freeze({
    id: 'white-lighting',
    action: 'activateWhiteLighting',
    key: 'w',
    code: 'KeyW',
    label: 'W',
    description: 'Ativar iluminação branca',
  }),
  Object.freeze({
    id: 'screen-cleaner',
    action: 'activateScreenCleaner',
    key: 'c',
    code: 'KeyC',
    label: 'C',
    description: 'Abrir inspeção para limpeza',
  }),
  Object.freeze({
    id: 'display-calibration',
    action: 'openCalibration',
    key: 'g',
    code: 'KeyG',
    label: 'G',
    description: 'Abrir verificação do display',
  }),
  Object.freeze({
    id: 'color-studio',
    action: 'openColorStudio',
    key: 's',
    code: 'KeyS',
    label: 'S',
    description: 'Abrir estúdio de cor',
  }),
  Object.freeze({
    id: 'focus-timer',
    action: 'openFocusTimer',
    key: 'p',
    code: 'KeyP',
    label: 'P',
    description: 'Abrir temporizador de foco',
  }),
  Object.freeze({
    id: 'fullscreen-clock',
    action: 'openClock',
    key: 't',
    code: 'KeyT',
    label: 'T',
    description: 'Abrir relógio em tela',
  }),
  Object.freeze({
    id: 'message-overlay',
    action: 'openMessageOverlay',
    key: 'm',
    code: 'KeyM',
    label: 'M',
    description: 'Abrir mensagem em tela',
  }),
  Object.freeze({
    id: 'restore-interface',
    action: 'restoreInterface',
    key: 'escape',
    code: 'Escape',
    label: 'Esc',
    description: 'Restaurar a interface',
    allowInEditable: true,
  }),
  Object.freeze({
    id: 'keyboard-help',
    action: 'toggleHelp',
    key: '?',
    code: 'Slash',
    shiftKey: true,
    label: '?',
    description: 'Ver atalhos de teclado',
  }),
]);

export const SHORTCUTS_BY_ACTION = Object.freeze(
  SHORTCUTS.reduce((shortcutsByAction, shortcut) => {
    shortcutsByAction[shortcut.action] = shortcut;
    return shortcutsByAction;
  }, {}),
);

export function isDisplayMode(mode) {
  return DISPLAY_MODE_IDS.includes(mode);
}

export const MODE_PRESENTATION = {
  home: { label: 'Ferramentas', icon: 'home' },
  black: { label: 'Tela preta', icon: 'void' },
  white: { label: 'Luz suave', icon: 'sun' },
  cleaner: { label: 'Inspeção', icon: 'cleaner' },
  'dead-pixel': { label: 'Pixels', icon: 'pixels' },
  calibration: { label: 'Verificação', icon: 'calibration' },
  'focus-timer': { label: 'Foco', icon: 'timer' },
  clock: { label: 'Relógio', icon: 'clock' },
  message: { label: 'Mensagem', icon: 'message' },
  color: { label: 'Estúdio de cor', icon: 'color' },
};

export function getModePresentation(mode) {
  if (mode && typeof mode === 'object') {
    const fallback = MODE_PRESENTATION[mode.id] || {};
    return {
      id: mode.id || 'black',
      label: mode.label || fallback.label || 'Modo de exibição',
      icon: mode.icon || fallback.icon || 'spark',
    };
  }

  const id = mode || 'black';
  const fallback = MODE_PRESENTATION[id] || {};
  return {
    id,
    label: fallback.label || 'Modo de exibição',
    icon: fallback.icon || 'spark',
  };
}

export const DEFAULT_DOCK_MODES = [
  'black',
  'white',
  'cleaner',
  'dead-pixel',
  'calibration',
  'focus-timer',
  'clock',
  'message',
  'color',
];
