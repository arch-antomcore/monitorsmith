import { useCallback, useEffect, useMemo, useRef, useState, lazy, Suspense } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';

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
import RadialMenu from './components/UI/RadialMenu';
import ShortcutToast from './components/UI/ShortcutToast';
import ToolTransitionOverlay from './components/UI/ToolTransitionOverlay';
import AppProvider, { MODES, useApp } from './context/AppContext';
import { DEFAULT_DOCK_MODES, SHORTCUTS } from './constants/shortcuts';
import { getToolById, resolveToolLaunch, TOOLS_REGISTRY } from './constants/tools';
import { isShortcutScopeBlocked } from './hooks/useKeyboardShortcuts';
import { useThemeSync } from './hooks/useThemeSync';

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


const SWIPE_EXCLUDED_SELECTOR = [
  'button',
  'a',
  'input',
  'textarea',
  'select',
  '[contenteditable]',
  '[role="dialog"]',
  '[role="slider"]',
  '.display-mode__controls',
  '.display-mode__reopen-panel-btn',
  '.calibration-lab__guide',
  '.wbp-navbar',
  '.wbp-dock',
  '[data-no-swipe="true"]',
].join(',');

function getModeId(mode) {
  return typeof mode === 'string' ? mode : mode?.id;
}

function getModeTitle(mode) {
  if (mode === MODES.HOME) return 'Ferramentas de monitor';
  const tool = getToolById(mode);
  return tool?.heroTitle || tool?.title || 'MonitorSmith';
}

function resolveLocationLaunch(location) {
  const hashValue = location.hash.replace(/^#/, '').trim().toLowerCase();
  const queryValue = new URLSearchParams(location.search).get('tool')?.trim().toLowerCase();

  for (const value of [hashValue, queryValue]) {
    if (!value) continue;
    if (value === MODES.HOME) return { mode: MODES.HOME, toolId: MODES.HOME, preset: {} };

    const tool = resolveToolLaunch(value);
    if (tool) return tool;

    const mode = Object.values(MODES).find((candidate) => candidate.toLowerCase() === value);
    if (mode) return { mode, toolId: mode, preset: {} };
  }

  return {
    mode: MODES.HOME,
    toolId: MODES.HOME,
    preset: {},
    preserveHash: Boolean(hashValue),
  };
}

function buildNavigationHref(toolId) {
  const url = new URL(window.location.href);
  url.searchParams.delete('tool');
  if (!toolId || toolId === MODES.HOME) {
    url.hash = '';
  } else {
    url.hash = toolId;
  }
  return `${url.pathname}${url.search}${url.hash}`;
}

function DisplaySuite() {
  const {
    activeMode,
    activeToolId,
    activateMode,
    isFullscreen,
    fullscreenError,
    toggleFullscreen,
    wakeLock,
    shouldHideUi,
    hideUiManually,
    isDockOpen,
    isHelpOpen,
    openHelp,
    closeHelp,
    restoreInterface,
    resetIdleTimer,
    toast,
    whiteLighting,
    setWhiteLighting,
    customColor,
    setCustomColor,
    message,
    setMessage,
  } = useApp();
  const [deadPixelColor, setDeadPixelColor] = useState(DEAD_PIXEL_PALETTE[0].value);
  const [autoCycle, setAutoCycle] = useState(false);
  const [cleanerPattern, setCleanerPattern] = useState('checker');
  const [cleanerBrightness, setCleanerBrightness] = useState(92);
  const [focusSeconds, setFocusSeconds] = useState(25 * 60);
  const [focusDuration, setFocusDuration] = useState(25 * 60);
  const [isFocusRunning, setIsFocusRunning] = useState(false);
  const [ambientBrightness, setAmbientBrightness] = useState(72);
  const [homeFocusRequest, setHomeFocusRequest] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const previousModeRef = useRef(activeMode);
  const homeFocusOriginRef = useRef(null);
  const handledHomeFocusRequestRef = useRef(0);
  const pendingLocationRef = useRef(null);
  const hasResolvedInitialLocationRef = useRef(false);

  const isGreenScreen = activeToolId === 'green-screen';

  const showControls = !shouldHideUi;
  const modeTitle = activeMode === MODES.HOME ? null : getModeTitle(activeToolId);
  useThemeSync(activeMode, modeTitle);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const activateUrlTarget = (target) => {
      if (typeof target.preset?.customColor === 'string') setCustomColor(target.preset.customColor);
      if (typeof target.preset?.ambientBrightness === 'number') {
        setAmbientBrightness(target.preset.ambientBrightness);
      }
      return activateMode(target.mode, target.toolId);
    };

    const handleUrlState = () => {
      const target = resolveLocationLaunch(window.location);
      pendingLocationRef.current = target;
      hasResolvedInitialLocationRef.current = true;
      activateUrlTarget(target);
    };
    handleUrlState();
    window.addEventListener('popstate', handleUrlState);
    return () => {
      window.removeEventListener('popstate', handleUrlState);
    };
  }, [activateMode, setCustomColor]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleGlobalKeyDown = (e) => {
      const isEditableTarget = e.target instanceof Element && Boolean(e.target.closest('input, textarea, select, [contenteditable="true"]'));

      if (isShortcutScopeBlocked(e.target)) {
        return;
      }

      if (e.key === 'Escape') {
        // Only navigate to home if we are not already home
        // AND not typing in a text field (escape might be used to blur/cancel input)
        if (activeMode !== MODES.HOME && !isEditableTarget) {
          e.preventDefault();
          activateMode(MODES.HOME);
        }
        return;
      }

      if (e.key >= '1' && e.key <= '9' && !isEditableTarget) {
        const index = parseInt(e.key, 10) - 1;
        // The dock logic filters out HOME, so dock tools match TOOLS_REGISTRY where dock.visible is true
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

  useEffect(() => {
    if (typeof window === 'undefined' || !hasResolvedInitialLocationRef.current) return;

    const pendingLocation = pendingLocationRef.current;
    const desiredHref = buildNavigationHref(activeToolId);
    const currentHref = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (pendingLocation) {
      if (
        pendingLocation.mode !== activeMode
        || pendingLocation.toolId !== activeToolId
      ) {
        return;
      }

      if (currentHref !== desiredHref) {
        window.history.replaceState({ monitorSmithTool: activeToolId }, '', desiredHref);
      }
      pendingLocationRef.current = null;
      return;
    }

    if (currentHref !== desiredHref) {
      window.history.pushState({ monitorSmithTool: activeToolId }, '', desiredHref);
    }
  }, [activeMode, activeToolId]);

  const touchStartRef = useRef(null);

  const handleTouchStart = (e) => {
    if (e.touches?.length !== 1 || e.target?.closest?.(SWIPE_EXCLUDED_SELECTOR)) {
      touchStartRef.current = null;
      return;
    }

    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e) => {
    if (touchStartRef.current === null || !e.changedTouches?.length) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    const isHorizontalSwipe = Math.abs(deltaX) > 90 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5;
    if (isHorizontalSwipe && activeMode !== MODES.HOME) {
      const modeKeys = DEFAULT_DOCK_MODES.map(getModeId).filter(Boolean);
      const currIdx = modeKeys.indexOf(activeMode);
      if (currIdx !== -1) {
        const nextIdx = deltaX < 0
          ? (currIdx + 1) % modeKeys.length
          : (currIdx - 1 + modeKeys.length) % modeKeys.length;
        activateMode(modeKeys[nextIdx]);
      }
    }
  };

  useEffect(() => {
    if (activeMode !== MODES.FOCUS_TIMER && isFocusRunning) {
      const frame = window.requestAnimationFrame(() => setIsFocusRunning(false));
      return () => window.cancelAnimationFrame(frame);
    }
    return undefined;
  }, [activeMode, isFocusRunning]);

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

      if (typeof target.color === 'string') {
        setCustomColor(target.color);
      }

      if (typeof target.brightness === 'number') {
        setAmbientBrightness(target.brightness);
      }

      handleSelectMode(target.launchMode || target.id, homeFocusOriginId, target.id);
    },
    [handleSelectMode, setCustomColor],
  );

  const restoreHomeFocus = useCallback((request) => {
    if (
      !request ||
      request === handledHomeFocusRequestRef.current ||
      typeof document === 'undefined'
    ) {
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
    setIsFocusRunning(false);
    await restoreInterface();
  }, [restoreInterface]);

  const handleWhiteLighting = useCallback(
    (setting, value) => {
      setWhiteLighting({ [setting]: value });
      resetIdleTimer();
    },
    [resetIdleTimer, setWhiteLighting],
  );

  const status = useMemo(() => {
    if (activeMode === MODES.HOME) return getModeTitle(MODES.HOME);
    if (fullscreenError) return 'Tela cheia indisponível';
    if (wakeLock.error) return 'Wake Lock indisponível';
    if (wakeLock.isLocked) return 'Tela mantida ativa';
    if (isFullscreen) return 'Modo imersivo';
    return getModeTitle(activeToolId);
  }, [activeMode, activeToolId, fullscreenError, isFullscreen, wakeLock.error, wakeLock.isLocked]);

  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  const commonModeProps = {
    autoFocus: true,
    onExit: handleExitMode,
    showControls,
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
            brightness={whiteLighting.brightness}
            temperature={whiteLighting.temperature}
            onBrightnessChange={(value) => handleWhiteLighting('brightness', value)}
            onTemperatureChange={(value) => handleWhiteLighting('temperature', value)}
          />
        );
      case MODES.CLEANER:
        return (
          <ScreenCleanerMode
            {...commonModeProps}
            pattern={cleanerPattern}
            brightness={cleanerBrightness}
            onPatternChange={(value) => {
              setCleanerPattern(value);
              resetIdleTimer();
            }}
            onBrightnessChange={(value) => {
              setCleanerBrightness(value);
              resetIdleTimer();
            }}
          />
        );
      case MODES.DEAD_PIXEL:
        return (
          <DeadPixelTestMode
            {...commonModeProps}
            palette={DEAD_PIXEL_PALETTE}
            selectedColor={deadPixelColor}
            onColorChange={(value) => {
              setDeadPixelColor(value);
              resetIdleTimer();
            }}
            autoCycle={autoCycle}
            onAutoCycleChange={(value) => {
              setAutoCycle(value);
              resetIdleTimer();
            }}
            cycleInterval={1600}
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
            secondsRemaining={focusSeconds}
            initialDuration={focusDuration}
            totalDuration={focusDuration}
            onSecondsRemainingChange={setFocusSeconds}
            onDurationChange={setFocusDuration}
            isRunning={isFocusRunning}
            onRunningChange={setIsFocusRunning}
            onComplete={() => setIsFocusRunning(false)}
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
            message={message.text}
            textColor={message.textColor}
            backgroundColor={message.backgroundColor}
            fontScale={message.fontScale}
            onMessageChange={(text) => setMessage({ text })}
            onTextColorChange={(textColor) => setMessage({ textColor })}
            onBackgroundColorChange={(backgroundColor) => setMessage({ backgroundColor })}
            onFontScaleChange={(fontScale) => setMessage({ fontScale })}
          />
        );
      case MODES.COLOR:
        return (
          <WhiteLightingMode
            {...commonModeProps}
            variant="color"
            ariaLabel={isGreenScreen ? 'Tela verde para chroma' : 'Estúdio de cor'}
            title={isGreenScreen ? 'Tela verde para chroma' : 'Estúdio de cor'}
            brightness={ambientBrightness}
            color={customColor}
            onBrightnessChange={(value) => {
              setAmbientBrightness(value);
              if (isGreenScreen) activateMode(MODES.COLOR, 'color');
              resetIdleTimer();
            }}
            onColorChange={(value) => {
              setCustomColor(value);
              if (isGreenScreen) activateMode(MODES.COLOR, 'color');
              resetIdleTimer();
            }}
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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => { touchStartRef.current = null; }}
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
        onToggleWakeLock={wakeLock.isSupported ? wakeLock.toggle : undefined}
        isWakeLockActive={wakeLock.isLocked}
        onOpenHelp={openHelp}
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

      <KeyboardShortcutsModal open={isHelpOpen} onClose={closeHelp} shortcuts={SHORTCUTS} />

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
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="never">
      <AppProvider>
        <DisplaySuite />
      </AppProvider>
    </MotionConfig>
  );
}
