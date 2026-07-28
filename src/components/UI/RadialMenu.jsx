import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ControlIcon } from '../Controls/Navbar';
import { DEFAULT_DOCK_MODES, getModePresentation } from '../../constants/shortcuts';
import { acquireModalIsolation } from '../../utils/modalIsolation';

const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  'input',
  'select',
  'textarea',
  '[contenteditable]',
  '[role="dialog"]',
].join(',');

const RADIUS = 105;
const EDGE_PADDING = RADIUS + 34;
const MENU_SIZE = EDGE_PADDING * 2;
const COMPACT_HEIGHT = 320;
const COMPACT_WIDTH = MENU_SIZE + 24;

const EMPTY_VIEWPORT = Object.freeze({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  safeTop: 0,
  safeRight: 0,
  safeBottom: 0,
  safeLeft: 0,
});

function clamp(value, min, max) {
  if (max < min) return (min + max) / 2;
  return Math.min(Math.max(value, min), max);
}

function normalizeMode(mode) {
  const id = typeof mode === 'string' ? mode : mode?.id;
  if (!id) return null;
  return { ...getModePresentation(id), ...(typeof mode === 'object' ? mode : {}), id };
}

function readSafeAreaInsets() {
  if (typeof document === 'undefined' || !document.body) {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }

  const probe = document.createElement('div');
  probe.setAttribute('aria-hidden', 'true');
  probe.style.cssText = [
    'position:fixed',
    'inset:0',
    'visibility:hidden',
    'pointer-events:none',
    'padding-top:env(safe-area-inset-top, 0px)',
    'padding-right:env(safe-area-inset-right, 0px)',
    'padding-bottom:env(safe-area-inset-bottom, 0px)',
    'padding-left:env(safe-area-inset-left, 0px)',
  ].join(';');
  document.body.appendChild(probe);
  const style = window.getComputedStyle(probe);
  const insets = {
    top: Number.parseFloat(style.paddingTop) || 0,
    right: Number.parseFloat(style.paddingRight) || 0,
    bottom: Number.parseFloat(style.paddingBottom) || 0,
    left: Number.parseFloat(style.paddingLeft) || 0,
  };
  probe.remove();
  return insets;
}

function getViewportSnapshot({ includeSafeArea = true } = {}) {
  if (typeof window === 'undefined') return EMPTY_VIEWPORT;

  const visualViewport = window.visualViewport;
  const safeArea = includeSafeArea
    ? readSafeAreaInsets()
    : { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    left: visualViewport?.offsetLeft || 0,
    top: visualViewport?.offsetTop || 0,
    width: Math.max(1, visualViewport?.width || window.innerWidth || 1),
    height: Math.max(1, visualViewport?.height || window.innerHeight || 1),
    safeTop: safeArea.top,
    safeRight: safeArea.right,
    safeBottom: safeArea.bottom,
    safeLeft: safeArea.left,
  };
}

export default function RadialMenu({
  activeMode,
  availableModes = DEFAULT_DOCK_MODES,
  enabled = true,
  onSelectMode,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openedForMode, setOpenedForMode] = useState(null);
  const [anchor, setAnchor] = useState({ x: 0, y: 0, centered: true });
  const [viewport, setViewport] = useState(() => getViewportSnapshot({ includeSafeArea: false }));
  const menuRef = useRef(null);
  const closeButtonRef = useRef(null);
  const returnFocusRef = useRef(null);
  const buttonRefs = useRef([]);
  const shouldReduceMotion = useReducedMotion();
  const modes = useMemo(
    () => (Array.isArray(availableModes) ? availableModes : DEFAULT_DOCK_MODES)
      .map(normalizeMode)
      .filter(Boolean),
    [availableModes],
  );

  const closeMenu = useCallback((restoreFocus = true) => {
    setIsOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => returnFocusRef.current?.focus?.({ preventScroll: true }));
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !enabled || !onSelectMode) return undefined;

    const handleContextMenu = (event) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest('.app-mode-layer') || event.target.closest(INTERACTIVE_SELECTOR)) return;

      event.preventDefault();
      returnFocusRef.current = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

      const nextViewport = getViewportSnapshot();
      const hasPointerCoordinates = event.clientX !== 0 || event.clientY !== 0;
      setViewport(nextViewport);
      setAnchor({
        x: event.clientX,
        y: event.clientY,
        centered: !hasPointerCoordinates,
      });
      setOpenedForMode(activeMode);
      setIsOpen(true);
    };

    window.addEventListener('contextmenu', handleContextMenu);
    return () => window.removeEventListener('contextmenu', handleContextMenu);
  }, [activeMode, enabled, onSelectMode]);

  const isVisible = isOpen && enabled && openedForMode === activeMode;
  const availableHeight = Math.max(0, viewport.height - viewport.safeTop - viewport.safeBottom);
  const availableWidth = Math.max(0, viewport.width - viewport.safeLeft - viewport.safeRight);
  const isCompact = availableHeight < COMPACT_HEIGHT || availableWidth < COMPACT_WIDTH;
  const compactColumns = availableWidth >= 520 ? 5 : availableWidth >= 360 ? 4 : 3;
  const compactMaxHeight = Math.max(0, availableHeight - 16);

  const radialPosition = useMemo(() => {
    const requestedX = anchor.centered
      ? viewport.width / 2
      : anchor.x - viewport.left;
    const requestedY = anchor.centered
      ? viewport.height / 2
      : anchor.y - viewport.top;
    return {
      x: clamp(
        requestedX,
        viewport.safeLeft + EDGE_PADDING,
        viewport.width - viewport.safeRight - EDGE_PADDING,
      ),
      y: clamp(
        requestedY,
        viewport.safeTop + EDGE_PADDING,
        viewport.height - viewport.safeBottom - EDGE_PADDING,
      ),
    };
  }, [anchor, viewport]);

  useEffect(() => {
    if (!isVisible) return undefined;

    const handleViewportChange = () => setViewport(getViewportSnapshot());
    const visualViewport = window.visualViewport;
    visualViewport?.addEventListener('resize', handleViewportChange);
    visualViewport?.addEventListener('scroll', handleViewportChange);
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', handleViewportChange);

    return () => {
      visualViewport?.removeEventListener('resize', handleViewportChange);
      visualViewport?.removeEventListener('scroll', handleViewportChange);
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return undefined;

    const activeIndex = Math.max(0, modes.findIndex((mode) => mode.id === activeMode));
    const frame = window.requestAnimationFrame(() => buttonRefs.current[activeIndex]?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [activeMode, isCompact, isVisible, modes]);

  useEffect(() => {
    if (!isVisible) return undefined;
    return acquireModalIsolation();
  }, [isVisible]);

  const handleMenuKeyDown = (event) => {
    const currentItemIndex = buttonRefs.current.indexOf(document.activeElement);

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      closeMenu();
      return;
    }

    if (event.key === 'Tab') {
      const focusableElements = [closeButtonRef.current, ...buttonRefs.current].filter(Boolean);
      const currentFocusableIndex = focusableElements.indexOf(document.activeElement);
      const direction = event.shiftKey ? -1 : 1;
      const nextIndex = (Math.max(0, currentFocusableIndex) + direction + focusableElements.length)
        % focusableElements.length;
      event.preventDefault();
      focusableElements[nextIndex]?.focus();
      return;
    }

    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    let nextIndex;
    if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = modes.length - 1;
    } else {
      const direction = event.key === 'ArrowLeft'
        ? -1
        : event.key === 'ArrowRight'
          ? 1
          : event.key === 'ArrowUp'
            ? (isCompact ? -compactColumns : -1)
            : (isCompact ? compactColumns : 1);
      nextIndex = (Math.max(0, currentItemIndex) + direction + modes.length) % modes.length;
    }
    buttonRefs.current[nextIndex]?.focus();
  };

  const overlayStyle = {
    position: 'fixed',
    left: viewport.left,
    top: viewport.top,
    width: viewport.width,
    height: viewport.height,
    zIndex: 9999,
    pointerEvents: 'auto',
    touchAction: 'none',
    background: isCompact ? 'rgba(3, 3, 4, 0.56)' : 'transparent',
  };

  const dialogStyle = isCompact
    ? {
        position: 'absolute',
        left: Math.max(8, viewport.safeLeft),
        right: Math.max(8, viewport.safeRight),
        bottom: Math.max(8, viewport.safeBottom),
        maxHeight: compactMaxHeight,
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-y',
        boxSizing: 'border-box',
        padding: '10px',
        borderRadius: '18px',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        background: 'rgba(10, 11, 16, 0.98)',
        boxShadow: '0 -16px 48px rgba(0, 0, 0, 0.58)',
        backdropFilter: 'blur(20px)',
      }
    : {
        position: 'absolute',
        left: radialPosition.x,
        top: radialPosition.y,
        width: 0,
        height: 0,
      };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key="radial-menu-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.14 }}
          style={overlayStyle}
          onContextMenu={(event) => event.preventDefault()}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) closeMenu();
          }}
        >
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Seleção rápida de ferramenta"
            data-layout={isCompact ? 'compact' : 'radial'}
            initial={shouldReduceMotion
              ? false
              : isCompact
                ? { scale: 0.98, opacity: 0 }
                : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={shouldReduceMotion
              ? { opacity: 0 }
              : isCompact
                ? { scale: 0.98, opacity: 0 }
                : { scale: 0.85, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
              duration: shouldReduceMotion ? 0 : undefined,
            }}
            onKeyDown={handleMenuKeyDown}
            style={dialogStyle}
          >
            {isCompact ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', minHeight: '44px', marginBottom: '6px' }}>
                <span style={{ color: '#f59e0b', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em' }}>
                  TROCA RÁPIDA
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label="Fechar seleção rápida"
                  onClick={() => closeMenu()}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: '#ffffff',
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ControlIcon name="x" size={16} />
                </button>
              </div>
            ) : (
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(10, 11, 16, 0.96)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(20px)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#f59e0b',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  pointerEvents: 'none',
                }}
              >
                MODO
              </div>
            )}

            <div
              role="menu"
              aria-label="Troca rápida de ferramenta"
              style={isCompact
                ? {
                    display: 'grid',
                    gridTemplateColumns: `repeat(${compactColumns}, minmax(0, 1fr))`,
                    gap: '6px',
                  }
                : {
                    position: 'absolute',
                    left: -EDGE_PADDING,
                    top: -EDGE_PADDING,
                    width: MENU_SIZE,
                    height: MENU_SIZE,
                    pointerEvents: 'none',
                  }}
            >
              {modes.map((mode, index) => {
                const angle = (index * (360 / modes.length) - 90) * (Math.PI / 180);
                const x = Math.cos(angle) * RADIUS;
                const y = Math.sin(angle) * RADIUS;
                const isActive = activeMode === mode.id;

                return (
                  <motion.button
                    ref={(element) => { buttonRefs.current[index] = element; }}
                    key={mode.id}
                    type="button"
                    role="menuitem"
                    aria-current={isActive ? 'true' : undefined}
                    aria-label={`${mode.label}${isActive ? ', ferramenta atual' : ''}`}
                    whileHover={shouldReduceMotion ? undefined : { scale: isCompact ? 1.025 : 1.14 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                    onClick={() => {
                      onSelectMode(mode.id);
                      closeMenu(false);
                    }}
                    style={isCompact
                      ? {
                          minWidth: 0,
                          minHeight: '54px',
                          padding: '6px 4px',
                          borderRadius: '12px',
                          background: isActive ? '#f59e0b' : 'rgba(255, 255, 255, 0.055)',
                          border: isActive ? '1px solid #fde68a' : '1px solid rgba(255, 255, 255, 0.12)',
                          color: isActive ? '#1c1917' : '#ffffff',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '3px',
                          cursor: 'pointer',
                          pointerEvents: 'auto',
                        }
                      : {
                          position: 'absolute',
                          left: EDGE_PADDING + x,
                          top: EDGE_PADDING + y,
                          transform: 'translate(-50%, -50%)',
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: isActive ? '#f59e0b' : 'rgba(18, 20, 28, 0.96)',
                          border: isActive ? '1px solid #fde68a' : '1px solid rgba(255, 255, 255, 0.18)',
                          color: isActive ? '#1c1917' : '#ffffff',
                          display: 'grid',
                          placeItems: 'center',
                          boxShadow: isActive
                            ? '0 0 20px rgba(245, 158, 11, 0.5)'
                            : '0 8px 24px rgba(0,0,0,0.5)',
                          cursor: 'pointer',
                          pointerEvents: 'auto',
                          backdropFilter: 'blur(16px)',
                        }}
                    title={mode.label}
                  >
                    <ControlIcon name={mode.icon} size={isCompact ? 18 : 20} />
                    {isCompact ? (
                      <span style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.62rem', fontWeight: 600 }}>
                        {mode.label}
                      </span>
                    ) : null}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
