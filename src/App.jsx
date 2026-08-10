import { useCallback, useEffect, useMemo, useRef, useState, lazy, Suspense } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
}

import AdaptiveNavbar from './components/Controls/AdaptiveNavbar';
import DockMenu from './components/Controls/DockMenu';
import KeyboardShortcutsModal from './components/Controls/KeyboardShortcutsModal';
import ToolLibrary from './components/Home/ToolLibrary';
import BlackScreenMode from './components/Modes/BlackScreenMode';
import WhiteLightingMode from './components/Modes/WhiteLightingMode';
import DeadPixelTestMode from './components/Modes/DeadPixelTestMode';

const CalibrationLabMode = lazy(() => import('./components/Modes/CalibrationLabMode'));
const FocusTimerMode = lazy(() => import('./components/Modes/FocusTimerMode'));
const FullScreenClockMode = lazy(() => import('./components/Modes/FullScreenClockMode'));
const MessageOverlayMode = lazy(() => import('./components/Modes/MessageOverlayMode'));
const ScreenCleanerMode = lazy(() => import('./components/Modes/ScreenCleanerMode'));
const SponsorLoopMode = lazy(() => import('./components/Modes/SponsorLoopMode'));

const OnboardingOverlay = lazy(() => import('./components/UI/OnboardingOverlay'));

import RadialMenu from './components/UI/RadialMenu';
import ShortcutToast from './components/UI/ShortcutToast';
import ToolTransitionOverlay from './components/UI/ToolTransitionOverlay';

import { DEFAULT_DOCK_MODES, SHORTCUTS, MODE_IDS as MODES } from './constants/shortcuts';
import { getToolById, resolveToolLaunch } from './constants/tools';

import { useThemeSync } from './hooks/useThemeSync';
import { useFullscreen } from './hooks/useFullscreen';
import { useWakeLock } from './hooks/useWakeLock';
import { useIdleTimer } from './hooks/useIdleTimer';
import { useAppRouting } from './hooks/useAppRouting';
import { useAppKeyboard } from './hooks/useAppKeyboard';
import { useAppSwipe } from './hooks/useAppSwipe';

import { useToolStore } from './store/toolStore';
import { useUIStore } from './store/uiStore';

const DEAD_PIXEL_PALETTE = [
  { id: 'red', label: 'Vermelho', value: '#ff0000' },
  { id: 'green', label: 'Verde', value: '#00ff00' },
  { id: 'blue', label: 'Azul', value: '#0000ff' },
  { id: 'cyan', label: 'Ciano', value: '#00ffff' },
  { id: 'magenta', label: 'Magenta', value: '#ff00ff' },
  { id: 'yellow', label: 'Amarelo', value: '#ffff00' },
  { id: 'white', label: 'Branco', value: '#ffffff' },
  { id: 'black', label: 'Preto', value: '#000000' },
];

function getModeTitle(mode) {
  if (mode === MODES.HOME) return 'Ferramentas de monitor';
  const tool = getToolById(mode);
  return tool?.heroTitle || tool?.title || 'MonitorSmith';
}

function DisplaySuite() {
  const { activeMode, activeToolId, activePreset, activateMode } = useToolStore();
  const {
    isDockOpen,
    isHelpOpen,
    setIsHelpOpen,
    isManualUiHidden,
    hideUiManually,
    hasPersistentUiFocus,
    setHasPersistentUiFocus,
    toast,
    showToast,
  } = useUIStore();

  const [showOnboarding, setShowOnboarding] = useState(() => typeof window !== 'undefined' && !localStorage.getItem('ms_onboarding_done'));
  const [homeFocusRequest, setHomeFocusRequest] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const previousModeRef = useRef(activeMode);
  const homeFocusOriginRef = useRef(null);
  const handledHomeFocusRequestRef = useRef(0);

  const isGreenScreen = activeToolId === 'green-screen';

  const {
    isFullscreen,
    error: fullscreenError,
    exitFullscreen: leaveFullscreen,
    toggleFullscreen: toggleNativeFullscreen,
  } = useFullscreen();

  const isDisplayModeActive = activeMode !== MODES.HOME;
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
  } = useWakeLock();

  const resetIdleTimer = useCallback(() => {
    useUIStore.getState().setIsManualUiHidden(false);
    rawResetIdleTimer?.();
  }, [rawResetIdleTimer]);

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

  const restoreInterface = useCallback(async () => {
    setIsHelpOpen(false);
    useUIStore.getState().setIsDockOpen(true);
    resetIdleTimer();
    const didLeaveFullscreen = await leaveFullscreen();
    if (activeMode !== MODES.HOME) {
      activateMode(MODES.HOME);
    }
    if (!didLeaveFullscreen) {
      showToast('Esc', 'Interface restaurada; tela cheia permaneceu ativa');
    }
    return didLeaveFullscreen;
  }, [activeMode, leaveFullscreen, resetIdleTimer, showToast, activateMode, setIsHelpOpen]);

  useAppRouting();
  useAppKeyboard(toggleFullscreen, restoreInterface);
  const swipeHandlers = useAppSwipe({ onActivity: resetIdleTimer });

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    const isPersistentUiTarget = (target) => {
      if (!(target instanceof Element) || target.closest('[aria-hidden="true"], [inert]')) {
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
  }, [setHasPersistentUiFocus]);

  useEffect(() => {
    if (activeMode === MODES.HOME) {
      void releaseWakeLock();
    } else {
      void requestWakeLock();
    }
  }, [activeMode, releaseWakeLock, requestWakeLock]);

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

  const showControls = !shouldHideUi;
  const modeTitle = activeMode === MODES.HOME ? null : getModeTitle(activeToolId);
  useThemeSync(activeMode, modeTitle);

  useEffect(() => {
    if (activeMode === MODES.HOME && previousModeRef.current !== MODES.HOME) {
      setHomeFocusRequest((request) => request + 1);
    }
    previousModeRef.current = activeMode;
  }, [activeMode]);

  const handleSelectMode = useCallback(
    (mode, homeFocusOriginId, requestedToolId = mode) => {
      if (activeMode === MODES.HOME) {
        homeFocusOriginRef.current = homeFocusOriginId || null;
      }
      const target = resolveToolLaunch(requestedToolId) || resolveToolLaunch(mode);
      const nextMode = target?.mode || mode;
      const nextToolId = target?.toolId || nextMode;
      setIsTransitioning(activeMode === MODES.HOME && nextMode !== MODES.HOME);
      activateMode(nextMode, nextToolId);
      resetIdleTimer();
    },
    [activeMode, activateMode, resetIdleTimer],
  );

  const handleLaunchTool = useCallback(
    (target, homeFocusOriginId) => {
      if (typeof target === 'string') {
        handleSelectMode(target, homeFocusOriginId);
        return;
      }
      if (!target || typeof target !== 'object') return;
      handleSelectMode(target.launchMode || target.id, homeFocusOriginId, target.id);
    },
    [handleSelectMode],
  );

  const restoreHomeFocus = useCallback((request) => {
    if (!request || request === handledHomeFocusRequestRef.current || typeof document === 'undefined') {
      return;
    }
    handledHomeFocusRequestRef.current = request;
    const originId = homeFocusOriginRef.current;
    homeFocusOriginRef.current = null;
    const focusTarget =
      (originId ? document.getElementById(originId) : null) ||
      document.getElementById('monitor-tools-home');
    if (focusTarget) {
      focusTarget.focus({ preventScroll: true });
      focusTarget.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    }
  }, []);

  const handleExitMode = useCallback(async () => {
    await restoreInterface();
  }, [restoreInterface]);

  const status = useMemo(() => {
    if (activeMode === MODES.HOME) return getModeTitle(MODES.HOME);
    if (fullscreenError) return 'Tela cheia indisponível';
    if (wakeLockError) return 'Wake Lock indisponível';
    if (isWakeLockActive) return 'Tela mantida ativa';
    if (isFullscreen) return 'Modo imersivo';
    return getModeTitle(activeToolId);
  }, [activeMode, activeToolId, fullscreenError, isFullscreen, wakeLockError, isWakeLockActive]);

  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  const commonModeProps = {
    autoFocus: true,
    onExit: handleExitMode,
    showControls,
    ...activePreset,
  };

  const renderActiveMode = () => {
    switch (activeMode) {
      case MODES.HOME:
        return (
          <ToolLibrary
            onLaunch={handleLaunchTool}
            returnFocusRequest={homeFocusRequest}
            onReturnFocus={restoreHomeFocus}
          />
        );
      case MODES.WHITE:
        return (
          <WhiteLightingMode
            {...commonModeProps}
            brightness={activePreset?.ambientBrightness}
          />
        );
      case MODES.CLEANER:
        return (
          <ScreenCleanerMode
            {...commonModeProps}
          />
        );
      case MODES.DEAD_PIXEL:
        return (
          <DeadPixelTestMode
            {...commonModeProps}
            palette={DEAD_PIXEL_PALETTE}
          />
        );
      case MODES.CALIBRATION:
        return (
          <CalibrationLabMode
            {...commonModeProps}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
          />
        );
      case MODES.FOCUS_TIMER:
        return (
          <FocusTimerMode
            {...commonModeProps}
          />
        );
      case MODES.CLOCK:
        return (
          <FullScreenClockMode
            {...commonModeProps}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
          />
        );
      case MODES.MESSAGE:
        return (
          <MessageOverlayMode
            {...commonModeProps}
          />
        );
      case MODES.COLOR:
        return (
          <WhiteLightingMode
            {...commonModeProps}
            variant="color"
            brightness={activePreset?.ambientBrightness}
            ariaLabel={isGreenScreen ? 'Tela verde para chroma' : 'Estúdio de cor'}
            title={isGreenScreen ? 'Tela verde para chroma' : 'Estúdio de cor'}
          />
        );
      case MODES.SPONSOR_LOOP:
        return <SponsorLoopMode {...commonModeProps} />;
      case MODES.BLACK:
      default:
        return <BlackScreenMode {...commonModeProps} showHint={false} />;
    }
  };

  return (
    <div
      className={`app-shell ${activeMode === MODES.HOME ? 'is-library' : ''} ${isFullscreen ? 'is-fullscreen' : ''} ${shouldHideUi ? 'is-ui-idle' : ''}`}
      onPointerMove={shouldHideUi ? resetIdleTimer : undefined}
      onPointerDown={shouldHideUi ? resetIdleTimer : undefined}
      onTouchStart={shouldHideUi ? resetIdleTimer : undefined}
      {...swipeHandlers}
    >
      <a className="ms-skip-link" href="#main-content">
        Pular para o conteúdo principal
      </a>

      <AdaptiveNavbar
        activeMode={activeMode}
        onBrandClick={() => handleSelectMode(MODES.HOME)}
        onToggleFullscreen={toggleFullscreen}
        onHideUi={hideUiManually}
        isFullscreen={isFullscreen}
        onToggleWakeLock={wakeLockSupported ? toggleWakeLockWithFeedback : undefined}
        isWakeLockActive={isWakeLockActive}
        onOpenHelp={() => setIsHelpOpen(true)}
        visible={showControls}
        status={status}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={activeMode}
          id="main-content"
          className={`app-mode-layer ${activeMode === MODES.HOME ? 'app-mode-layer--library' : ''}`}
          tabIndex={-1}
          style={{ minHeight: '100dvh' }}
          initial={{ opacity: 0.001, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeMode !== MODES.HOME ? (
            <h1 className="sr-only">{getModeTitle(activeToolId)}</h1>
          ) : null}
          <Suspense fallback={
            <div className="fixed inset-0 bg-[#050506] flex flex-col items-center justify-center gap-3 z-[99999]">
              <div className="w-8 h-8 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
              <div className="text-white/70 font-mono text-xs tracking-[0.08em] uppercase">
                CARREGANDO MÓDULO...
              </div>
            </div>
          }>
            {renderActiveMode()}
          </Suspense>
        </motion.main>
      </AnimatePresence>

      <DockMenu
        activeMode={activeMode}
        onSelectMode={handleSelectMode}
        availableModes={DEFAULT_DOCK_MODES}
        hidden={activeMode === MODES.HOME || shouldHideUi || !isDockOpen}
      />

      <KeyboardShortcutsModal open={isHelpOpen} onClose={() => setIsHelpOpen(false)} shortcuts={SHORTCUTS} />

      <RadialMenu
        activeMode={activeMode}
        enabled={activeMode !== MODES.HOME}
        onSelectMode={handleSelectMode}
      />
      <ShortcutToast toast={toast} />
      <ToolTransitionOverlay
        activeMode={activeMode}
        toolId={activeToolId}
        isTransitioning={isTransitioning}
        onTransitionComplete={handleTransitionComplete}
      />
      {showOnboarding && activeMode === MODES.HOME && (
        <Suspense fallback={null}>
          <OnboardingOverlay onComplete={() => setShowOnboarding(false)} />
        </Suspense>
      )}
    </div>
  );
}

import { ConsentBanner } from './components/UI/ConsentBanner';

export default function App() {
  useEffect(() => {
    // Rely on GSAP's default lag smoothing (500, 33) to prevent stuttering
    // when the browser drops frames, keeping the UI smooth overall.
  }, []);

  return (
    <MotionConfig reducedMotion="never">
      <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true, wheelMultiplier: 1.0 }}>
        <DisplaySuite />
        <ConsentBanner />
      </ReactLenis>
    </MotionConfig>
  );
}
