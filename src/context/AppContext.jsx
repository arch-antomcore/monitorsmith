import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_MODE, MODE_IDS, SHORTCUTS, isDisplayMode } from '../constants/shortcuts';
import { resolveToolLaunch } from '../constants/tools';
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

function clampNumber(value, minimum, maximum, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(maximum, Math.max(minimum, parsed)) : fallback;
}

function normalizeHexColor(value, fallback) {
  if (typeof value !== 'string') return fallback;
  const compact = value.trim().replace('#', '');
  if (/^[\da-f]{3}$/i.test(compact)) {
    return `#${compact.split('').map((c) => `${c}${c}`).join('')}`.toUpperCase();
  }
  return /^[\da-f]{6}$/i.test(compact) ? `#${compact}`.toUpperCase() : fallback;
}

export function AppProvider({ children }) {
  const [activeMode, setActiveMode] = useState(DEFAULT_MODE);
  const [activeToolId, setActiveToolId] = useState(DEFAULT_MODE);
  const [isDockOpen, setIsDockOpen] = useState(true);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [whiteLighting, setWhiteLightingState] = useState(DEFAULT_WHITE_LIGHTING);
  const [customColor, setCustomColorState] = useState('#15151b');
  const [message, setMessageState] = useState(DEFAULT_MESSAGE);
  const [isManualUiHidden, setIsManualUiHidden] = useState(false);
  const [hasPersistentUiFocus, setHasPersistentUiFocus] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);
  const {
    isFullscreen,
    isSupported: fullscreenSupported,
    error: fullscreenError,
    exitFullscreen: leaveFullscreen,
    toggleFullscreen: toggleNativeFullscreen,
    clearError: clearFullscreenError,
  } = useFullscreen();

  const isDisplayModeActive = activeMode !== MODE_IDS.HOME;
  const isImmersiveSession = isDisplayModeActive && isFullscreen;

  const { isIdle: isUiIdle, resetIdleTimer: rawResetIdleTimer } = useIdleTimer({
    enabled: isImmersiveSession && !hasPersistentUiFocus,
    timeout: 3000,
  });

  const {
    isSupported: wakeLockSupported,
    isLocked: isWakeLockActive,
    requestWakeLock,
    releaseWakeLock,
    toggleWakeLock,
    error: wakeLockError,
    clearError: clearWakeLockError,
  } = useWakeLock();

  const showToast = useCallback((key, message) => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }

    setToast({ id: Date.now(), key, message });
    toastTimerRef.current = window.setTimeout(() => {
      toastTimerRef.current = null;
      setToast(null);
    }, 1800);
  }, []);

  useEffect(() => () => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    const isPersistentUiTarget = (target) => {
      if (
        !(target instanceof Element)
        || target.closest('[aria-hidden="true"], [inert]')
      ) {
        return false;
      }

      if (target.closest('[role="dialog"][aria-modal="true"]')) return true;

      const isTextEntry = target.matches(
        'textarea, select, [contenteditable="true"], input:not([type="range"]):not([type="color"]):not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"])',
      );
      const isKeyboardOperatedControl = target.matches(
        'button, a[href], input, [role="button"], [role="menuitem"], [role="slider"]',
      ) && target.matches(':focus-visible');

      return isTextEntry || isKeyboardOperatedControl;
    };
    const syncFocusState = () => setHasPersistentUiFocus(isPersistentUiTarget(document.activeElement));
    const handleFocusIn = (event) => setHasPersistentUiFocus(isPersistentUiTarget(event.target));
    const handleFocusOut = () => window.requestAnimationFrame(syncFocusState);

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    syncFocusState();

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  const hideUiManually = useCallback(() => {
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setIsManualUiHidden(true);
  }, []);

  const resetIdleTimer = useCallback(() => {
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

  const activateMode = useCallback((nextMode, requestedToolId = nextMode) => {
    if (!isDisplayMode(nextMode)) return false;
    const resolvedTool = resolveToolLaunch(requestedToolId);
    const nextToolId = nextMode === MODE_IDS.HOME
      ? MODE_IDS.HOME
      : resolvedTool?.mode === nextMode
        ? resolvedTool.toolId
        : nextMode;
    setIsManualUiHidden(false);
    setActiveMode(nextMode);
    setActiveToolId(nextToolId);
    setIsDockOpen(true);
    resetIdleTimer();
    return true;
  }, [resetIdleTimer]);

  const toggleFullscreen = useCallback(async () => {
    const wasFullscreen = isFullscreen;
    const didToggle = await toggleNativeFullscreen();
    if (didToggle) {
      resetIdleTimer();
      showToast('F', wasFullscreen ? 'Tela cheia encerrada' : 'Tela cheia ativada');
    } else {
      showToast('F', 'Não foi possível alternar a tela cheia');
    }
    return didToggle;
  }, [isFullscreen, resetIdleTimer, showToast, toggleNativeFullscreen]);

  const toggleWakeLockWithFeedback = useCallback(async () => {
    const wasLocked = isWakeLockActive;
    const didToggle = await toggleWakeLock();
    if (didToggle) {
      showToast('Tela', wasLocked ? 'Manter tela ativa desativado' : 'Tela será mantida ativa');
    } else {
      showToast('Tela', 'Não foi possível manter a tela ativa');
    }
    return didToggle;
  }, [isWakeLockActive, showToast, toggleWakeLock]);

  const shouldHideUi =
    isDisplayModeActive
    && (isManualUiHidden || (isImmersiveSession && isUiIdle))
    && !isHelpOpen
    && !hasPersistentUiFocus;

  useEffect(() => {
    if (!shouldHideUi || typeof document === 'undefined') return;

    const activeElement = document.activeElement;
    if (
      activeElement instanceof HTMLElement
      && activeElement.closest('.wbp-navbar, .wbp-dock, .display-mode__controls')
    ) {
      activeElement.blur();
    }
  }, [shouldHideUi]);

  const setWhiteLighting = useCallback((patch) => {
    setWhiteLightingState((current) => ({
      brightness: clampNumber(patch?.brightness, 0, 100, current.brightness),
      temperature: clampNumber(patch?.temperature, 1800, 12000, current.temperature),
    }));
  }, []);

  const setCustomColor = useCallback((value) => {
    setCustomColorState((current) => normalizeHexColor(value, current));
  }, []);

  const setMessage = useCallback((patch) => {
    setMessageState((current) => ({
      text: typeof patch?.text === 'string' ? patch.text.slice(0, 220) : current.text,
      textColor: normalizeHexColor(patch?.textColor, current.textColor),
      backgroundColor: normalizeHexColor(patch?.backgroundColor, current.backgroundColor),
      fontScale: clampNumber(patch?.fontScale, 3, 16, current.fontScale),
    }));
  }, []);

  const restoreInterface = useCallback(async () => {
    setIsHelpOpen(false);
    setIsDockOpen(true);
    resetIdleTimer();
    const didLeaveFullscreen = await leaveFullscreen();
    if (activeMode !== MODE_IDS.HOME) {
      setActiveMode(MODE_IDS.HOME);
      setActiveToolId(MODE_IDS.HOME);
    }
    if (!didLeaveFullscreen) {
      showToast('Esc', 'Interface restaurada; tela cheia permaneceu ativa');
    }
    return didLeaveFullscreen;
  }, [activeMode, leaveFullscreen, resetIdleTimer, showToast]);

  useKeyboardShortcuts({
    shortcuts: SHORTCUTS,
    handlers: {
      toggleFullscreen: () => { void toggleFullscreen(); },
      openLibrary: () => { activateMode(MODE_IDS.HOME); showToast('Home / Esc', 'Biblioteca de Ferramentas'); },
      activateBlackScreen: () => { activateMode(MODE_IDS.BLACK); showToast('B', 'Tela Preta'); },
      activateWhiteLighting: () => { activateMode(MODE_IDS.WHITE); showToast('W', 'Luz Suave'); },
      activateScreenCleaner: () => { activateMode(MODE_IDS.CLEANER); showToast('C', 'Inspeção para Limpeza'); },
      openCalibration: () => { activateMode(MODE_IDS.CALIBRATION); showToast('G', 'Verificação Visual'); },
      openColorStudio: () => { activateMode(MODE_IDS.COLOR); showToast('S', 'Estúdio de Cor'); },
      openFocusTimer: () => { activateMode(MODE_IDS.FOCUS_TIMER); showToast('P', 'Temporizador de Foco'); },
      openClock: () => { activateMode(MODE_IDS.CLOCK); showToast('T', 'Relógio em Tela'); },
      openMessageOverlay: () => { activateMode(MODE_IDS.MESSAGE); showToast('M', 'Mensagem em Tela'); },
      openSponsorLoop: () => { activateMode(MODE_IDS.SPONSOR_LOOP); showToast('L', 'Loop de Marcas'); },
      restoreInterface,
      toggleHelp: () => { setIsHelpOpen((prev) => !prev); showToast('?', 'Atalhos de Teclado'); },
    },
  });

  const openHelp = useCallback(() => {
    setIsHelpOpen(true);
    resetIdleTimer();
  }, [resetIdleTimer]);

  const closeHelp = useCallback(() => {
    setIsHelpOpen(false);
    resetIdleTimer();
  }, [resetIdleTimer]);

  const value = useMemo(
    () => ({
      activeMode,
      activeToolId,
      activateMode,
      isFullscreen,
      fullscreenSupported,
      fullscreenError,
      clearFullscreenError,
      toggleFullscreen,
      wakeLock: {
        isSupported: wakeLockSupported,
        isLocked: isWakeLockActive,
        error: wakeLockError,
        toggle: toggleWakeLockWithFeedback,
        clearError: clearWakeLockError,
      },
      shouldHideUi,
      hideUiManually,
      resetIdleTimer,
      isDockOpen,
      setIsDockOpen,
      isHelpOpen,
      openHelp,
      closeHelp,
      restoreInterface,
      toast,
      showToast,
      whiteLighting,
      setWhiteLighting,
      customColor,
      setCustomColor,
      message,
      setMessage,
    }),
    [
      activeMode,
      activeToolId,
      activateMode,
      closeHelp,
      customColor,
      clearFullscreenError,
      clearWakeLockError,
      fullscreenError,
      fullscreenSupported,
      hideUiManually,
      isDockOpen,
      isFullscreen,
      isHelpOpen,
      isWakeLockActive,
      message,
      openHelp,
      resetIdleTimer,
      restoreInterface,
      showToast,
      shouldHideUi,
      setCustomColor,
      setMessage,
      setWhiteLighting,
      toast,
      toggleFullscreen,
      toggleWakeLockWithFeedback,
      wakeLockError,
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
