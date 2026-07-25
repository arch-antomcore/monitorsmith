import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_MODE, MODE_IDS, SHORTCUTS, isDisplayMode } from '../constants/shortcuts';
import { useFullscreen } from '../hooks/useFullscreen';
import { useIdleTimer } from '../hooks/useIdleTimer';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useWakeLock } from '../hooks/useWakeLock';

export const MODES = MODE_IDS;

export const DEFAULT_WHITE_LIGHTING = {
  brightness: 88,
  temperature: 4800,
};

export const DEFAULT_MESSAGE = {
  text: 'Em reunião',
  textColor: '#FFFFFF',
  backgroundColor: '#030304',
  fontScale: 8,
};

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [activeMode, setActiveMode] = useState(DEFAULT_MODE);
  const [isDockOpen, setIsDockOpen] = useState(true);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [whiteLighting, setWhiteLighting] = useState(DEFAULT_WHITE_LIGHTING);
  const [customColor, setCustomColor] = useState('#15151b');
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [isManualUiHidden, setIsManualUiHidden] = useState(false);
  const {
    isFullscreen,
    isSupported: fullscreenSupported,
    enterFullscreen: requestFullscreen,
    exitFullscreen: leaveFullscreen,
    toggleFullscreen: toggleNativeFullscreen,
  } = useFullscreen();

  const manualHideTimestampRef = useRef(0);
  const isDisplayModeActive = activeMode !== MODE_IDS.HOME || isFullscreen;

  const { isIdle: isUiIdle, resetIdleTimer: rawResetIdleTimer } = useIdleTimer({
    enabled: isDisplayModeActive,
    timeout: 2000,
  });

  const {
    isSupported: wakeLockSupported,
    isLocked: isWakeLockActive,
    requestWakeLock,
    releaseWakeLock,
    toggleWakeLock,
  } = useWakeLock();

  const hideUiManually = useCallback(() => {
    manualHideTimestampRef.current = Date.now();
    setIsManualUiHidden(true);
  }, []);

  const resetIdleTimer = useCallback(() => {
    if (Date.now() - manualHideTimestampRef.current < 2000) {
      rawResetIdleTimer?.();
      return;
    }
    setIsManualUiHidden(false);
    rawResetIdleTimer?.();
  }, [rawResetIdleTimer]);

  useEffect(() => {
    if (activeMode === MODE_IDS.HOME) {
      void releaseWakeLock();
    } else {
      void requestWakeLock();
    }
  }, [activeMode, releaseWakeLock, requestWakeLock]);

  const activateMode = useCallback((nextMode) => {
    if (!isDisplayMode(nextMode)) return false;
    setActiveMode(nextMode);
    setIsDockOpen(true);
    resetIdleTimer();
    return true;
  }, [resetIdleTimer]);

  const toggleFullscreen = useCallback(async () => {
    const didToggle = await toggleNativeFullscreen();
    if (didToggle) resetIdleTimer();
    return didToggle;
  }, [resetIdleTimer, toggleNativeFullscreen]);

  const restoreInterface = useCallback(async () => {
    setIsHelpOpen(false);
    setIsDockOpen(true);
    resetIdleTimer();
    await leaveFullscreen();
    if (activeMode !== MODE_IDS.HOME) setActiveMode(MODE_IDS.HOME);
    return true;
  }, [activeMode, leaveFullscreen, resetIdleTimer]);

  const [toast, setToast] = useState(null);

  const showToast = useCallback((key, message) => {
    setToast({ id: Date.now(), key, message });
    setTimeout(() => setToast(null), 1800);
  }, []);

  useKeyboardShortcuts({
    shortcuts: SHORTCUTS,
    handlers: {
      toggleFullscreen: () => { toggleFullscreen(); showToast('F', 'Tela Cheia Alternada'); },
      openLibrary: () => { activateMode(MODE_IDS.HOME); showToast('Home / Esc', 'Biblioteca de Ferramentas'); },
      activateBlackScreen: () => { activateMode(MODE_IDS.BLACK); showToast('B', 'Tela Preta'); },
      activateWhiteLighting: () => { activateMode(MODE_IDS.WHITE); showToast('W', 'Luz Suave'); },
      activateScreenCleaner: () => { activateMode(MODE_IDS.CLEANER); showToast('C', 'Inspeção para Limpeza'); },
      openCalibration: () => { activateMode(MODE_IDS.CALIBRATION); showToast('G', 'Verificação Visual'); },
      openColorStudio: () => { activateMode(MODE_IDS.COLOR); showToast('S', 'Estúdio de Cor'); },
      openFocusTimer: () => { activateMode(MODE_IDS.FOCUS_TIMER); showToast('P', 'Temporizador de Foco'); },
      openClock: () => { activateMode(MODE_IDS.CLOCK); showToast('T', 'Relógio em Tela'); },
      openMessageOverlay: () => { activateMode(MODE_IDS.MESSAGE); showToast('M', 'Mensagem em Tela'); },
      restoreInterface,
      toggleHelp: () => { setIsHelpOpen((prev) => !prev); showToast('?', 'Atalhos de Teclado'); },
    },
  });

  const value = useMemo(
    () => ({
      activeMode,
      activateMode,
      isFullscreen,
      fullscreenSupported,
      toggleFullscreen,
      wakeLock: {
        isSupported: wakeLockSupported,
        isLocked: isWakeLockActive,
        toggle: toggleWakeLock,
      },
      shouldHideUi: isDisplayModeActive && (isUiIdle || isManualUiHidden) && !isHelpOpen,
      hideUiManually,
      resetIdleTimer,
      isDockOpen,
      setIsDockOpen,
      isHelpOpen,
      openHelp: () => { setIsHelpOpen(true); resetIdleTimer(); },
      closeHelp: () => { setIsHelpOpen(false); resetIdleTimer(); },
      restoreInterface,
      toast,
      showToast,
      whiteLighting,
      setWhiteLighting: (patch) => setWhiteLighting((curr) => ({ ...curr, ...patch })),
      customColor,
      setCustomColor,
      message,
      setMessage: (patch) => setMessage((curr) => ({ ...curr, ...patch })),
    }),
    [
      activeMode,
      activateMode,
      customColor,
      fullscreenSupported,
      hideUiManually,
      isDisplayModeActive,
      isDockOpen,
      isFullscreen,
      isHelpOpen,
      isManualUiHidden,
      isUiIdle,
      isWakeLockActive,
      message,
      resetIdleTimer,
      restoreInterface,
      toggleFullscreen,
      toggleWakeLock,
      wakeLockSupported,
      whiteLighting,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp deve ser utilizado dentro de AppProvider.');
  return context;
}

export default AppProvider;
