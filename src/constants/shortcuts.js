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
    id: 'sponsor-loop',
    action: 'openSponsorLoop',
    key: 'l',
    code: 'KeyL',
    label: 'L',
    description: 'Abrir loop de marcas',
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
  Object.freeze({
    id: 'keyboard-help-k',
    action: 'toggleHelp',
    key: 'k',
    code: 'KeyK',
    label: 'K',
    description: 'Ver atalhos de teclado',
  }),
  Object.freeze({
    id: 'keyboard-help-slash',
    action: 'toggleHelp',
    key: '/',
    code: 'Slash',
    label: '/',
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

import { DOCK_TOOLS, TOOLS_MODE_PRESENTATION } from './tools';

export const MODE_PRESENTATION = TOOLS_MODE_PRESENTATION;

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

export const DEFAULT_DOCK_MODES = DOCK_TOOLS;
