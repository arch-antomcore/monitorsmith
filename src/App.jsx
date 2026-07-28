import { useCallback, useEffect, useMemo, useRef, useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import Navbar from './components/Controls/Navbar';
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
import { getToolById, resolveToolLaunch } from './constants/tools';

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

const PRODUCT_DOCUMENT_TITLE = 'MonitorSmith — Ferramentas para Monitor | EXVORN.TECH';

const GREEN_SCREEN_COLOR = '#00B140';
const SWIPE_EXCLUDED_SELECTOR = [
  'button',
  'a',
  'input',
  'textarea',
  'select',
  '[contenteditable]',
  '[role="dialog"]',
  '[role="slider"]',
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

function DisplaySuite() {
  const {
    activeMode,
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
  const shouldReduceMotion = useReducedMotion();
  const isGreenScreen = customColor.toUpperCase() === GREEN_SCREEN_COLOR
    && ambientBrightness === 100;
  const activeToolId = activeMode === MODES.COLOR && isGreenScreen ? 'green-screen' : activeMode;

  const showControls = !shouldHideUi;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const modeTitle = activeMode === MODES.HOME ? null : getModeTitle(activeToolId);
    document.title = modeTitle
      ? `${modeTitle} — MonitorSmith | EXVORN.TECH`
      : PRODUCT_DOCUMENT_TITLE;
  }, [activeMode, activeToolId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const activateUrlTarget = (target) => {
      if (!target) return false;
      if (typeof target === 'string') return activateMode(target);

      if (typeof target.preset?.customColor === 'string') setCustomColor(target.preset.customColor);
      if (typeof target.preset?.ambientBrightness === 'number') {
        setAmbientBrightness(target.preset.ambientBrightness);
      }
      return activateMode(target.mode);
    };

    const handleUrlState = () => {
      // 1. Check URL Hash (#black, #dead-pixel, etc.)
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash) {
        const modeByHash = Object.values(MODES).find((m) => m.toLowerCase() === hash);
        if (modeByHash) {
          activateMode(modeByHash);
          return;
        }
        
        const resolvedTool = resolveToolLaunch(hash);
        if (resolvedTool) {
          activateUrlTarget(resolvedTool);
          return;
        }
      }
      // 2. Check Query Parameter (?tool=black, ?tool=dead-pixel, etc.)
      const params = new URLSearchParams(window.location.search);
      const toolParam = params.get('tool')?.toLowerCase();
      if (toolParam) {
        const modeByParam = Object.values(MODES).find((m) => m.toLowerCase() === toolParam);
        if (modeByParam) {
          activateMode(modeByParam);
          return;
        }
        
        const resolvedTool = resolveToolLaunch(toolParam);
        if (resolvedTool) {
          activateUrlTarget(resolvedTool);
        }
      }
    };
    handleUrlState();
    window.addEventListener('hashchange', handleUrlState);
    window.addEventListener('popstate', handleUrlState);
    return () => {
      window.removeEventListener('hashchange', handleUrlState);
      window.removeEventListener('popstate', handleUrlState);
    };
  }, [activateMode, setCustomColor]);

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
    (mode, homeFocusOriginId) => {
      if (activeMode === MODES.HOME) {
        homeFocusOriginRef.current = homeFocusOriginId || null;
      }

      if (mode !== activeMode && mode !== MODES.HOME) {
        setIsTransitioning(true);
      }

      activateMode(mode);
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

      handleSelectMode(target.launchMode || target.id, homeFocusOriginId);
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

    focusTarget?.focus({ preventScroll: true });
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
              resetIdleTimer();
            }}
            onColorChange={(value) => {
              setCustomColor(value);
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
      onPointerMove={resetIdleTimer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => { touchStartRef.current = null; }}
    >
      <a className="ms-skip-link" href="#main-content">
        Pular para o conteúdo principal
      </a>
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={activeMode}
          id="main-content"
          className={`app-mode-layer ${activeMode === MODES.HOME ? 'app-mode-layer--library' : ''}`}
          tabIndex={-1}
          style={{ minHeight: '100dvh' }}
          initial={shouldReduceMotion ? false : { opacity: 0.001, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeMode !== MODES.HOME ? (
            <h1 className="sr-only">{getModeTitle(activeToolId)}</h1>
          ) : null}
          <Suspense fallback={
            <div style={{ position: 'fixed', inset: 0, background: '#050506', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', zIndex: 99999 }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid rgba(245, 158, 11, 0.2)', borderTopColor: '#F59E0B', animation: shouldReduceMotion ? 'none' : 'spin 0.8s linear infinite' }} />
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', letterSpacing: '0.08em' }}>
                CARREGANDO MÓDULO...
              </div>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          }>
            {renderActiveMode()}
          </Suspense>
        </motion.main>
      </AnimatePresence>

      <Navbar
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

      <DockMenu
        activeMode={activeMode}
        onSelectMode={handleSelectMode}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
        onToggleWakeLock={wakeLock.isSupported ? wakeLock.toggle : undefined}
        isWakeLockActive={wakeLock.isLocked}
        onOpenHelp={openHelp}
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
    <AppProvider>
      <DisplaySuite />
    </AppProvider>
  );
}
