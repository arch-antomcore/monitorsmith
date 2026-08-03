import { useEffect } from 'react';
import { useToolStore } from '../store/toolStore';
import { useUIStore } from '../store/uiStore';
import { MODE_IDS as MODES, SHORTCUTS } from '../constants/shortcuts';
import { TOOLS_REGISTRY } from '../constants/tools';
import { isShortcutScopeBlocked } from './useKeyboardShortcuts';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';

export function useAppKeyboard(toggleFullscreen, restoreInterface) {
  const { activeMode, activateMode } = useToolStore();
  const { showToast, setIsHelpOpen } = useUIStore();

  useKeyboardShortcuts({
    shortcuts: SHORTCUTS,
    handlers: {
      toggleFullscreen: () => { void toggleFullscreen(); },
      openLibrary: () => { activateMode(MODES.HOME); showToast('Home / Esc', 'Biblioteca de Ferramentas'); },
      activateBlackScreen: () => { activateMode(MODES.BLACK); showToast('B', 'Tela Preta'); },
      activateWhiteLighting: () => { activateMode(MODES.WHITE); showToast('W', 'Luz Suave'); },
      activateScreenCleaner: () => { activateMode(MODES.CLEANER); showToast('C', 'Inspeção para Limpeza'); },
      openCalibration: () => { activateMode(MODES.CALIBRATION); showToast('G', 'Verificação Visual'); },
      openColorStudio: () => { activateMode(MODES.COLOR); showToast('S', 'Estúdio de Cor'); },
      openFocusTimer: () => { activateMode(MODES.FOCUS_TIMER); showToast('P', 'Temporizador de Foco'); },
      openClock: () => { activateMode(MODES.CLOCK); showToast('T', 'Relógio em Tela'); },
      openMessageOverlay: () => { activateMode(MODES.MESSAGE); showToast('M', 'Mensagem em Tela'); },
      openSponsorLoop: () => { activateMode(MODES.SPONSOR_LOOP); showToast('L', 'Loop de Marcas'); },
      restoreInterface,
      toggleHelp: () => { setIsHelpOpen((prev) => !prev); showToast('?', 'Atalhos de Teclado'); },
    },
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleGlobalKeyDown = (e) => {
      const isEditableTarget = e.target instanceof Element && Boolean(e.target.closest('input, textarea, select, [contenteditable="true"]'));

      if (isShortcutScopeBlocked(e.target)) {
        return;
      }

      if (e.key === 'Escape') {
        if (activeMode !== MODES.HOME && !isEditableTarget) {
          e.preventDefault();
          activateMode(MODES.HOME);
        }
        return;
      }

      if (e.key >= '1' && e.key <= '9' && !isEditableTarget) {
        const index = parseInt(e.key, 10) - 1;
        const dockTools = TOOLS_REGISTRY.filter((t) => t.dock?.visible).sort((a, b) => a.dock.order - b.dock.order);
        const targetTool = dockTools[index];
        if (targetTool) {
          e.preventDefault();
          activateMode(targetTool.mode, targetTool.id);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [activeMode, activateMode]);
}
