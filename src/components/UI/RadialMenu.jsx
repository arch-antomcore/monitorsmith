import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ControlIcon } from '../Controls/Navbar';
import { DEFAULT_DOCK_MODES, getModePresentation } from '../../constants/shortcuts';

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

function clamp(value, min, max) {
  if (max < min) return Math.max(0, max / 2);
  return Math.min(Math.max(value, min), max);
}

function normalizeMode(mode) {
  const id = typeof mode === 'string' ? mode : mode?.id;
  if (!id) return null;
  return { ...getModePresentation(id), ...(typeof mode === 'object' ? mode : {}), id };
}

export default function RadialMenu({
  activeMode,
  availableModes = DEFAULT_DOCK_MODES,
  enabled = true,
  onSelectMode,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openedForMode, setOpenedForMode] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);
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

      const requestedX = event.clientX || window.innerWidth / 2;
      const requestedY = event.clientY || window.innerHeight / 2;
      setPosition({
        x: clamp(requestedX, EDGE_PADDING, window.innerWidth - EDGE_PADDING),
        y: clamp(requestedY, EDGE_PADDING, window.innerHeight - EDGE_PADDING),
      });
      setOpenedForMode(activeMode);
      setIsOpen(true);
    };

    window.addEventListener('contextmenu', handleContextMenu);
    return () => window.removeEventListener('contextmenu', handleContextMenu);
  }, [activeMode, enabled, onSelectMode]);

  const isVisible = isOpen && enabled && openedForMode === activeMode;

  useEffect(() => {
    if (!isVisible) return undefined;

    const activeIndex = Math.max(0, modes.findIndex((mode) => mode.id === activeMode));
    const frame = window.requestAnimationFrame(() => buttonRefs.current[activeIndex]?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [activeMode, isVisible, modes]);

  const handleMenuKeyDown = (event) => {
    const currentIndex = buttonRefs.current.indexOf(document.activeElement);

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      closeMenu();
      return;
    }

    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End', 'Tab'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' || (event.key === 'Tab' && event.shiftKey)
      ? -1
      : 1;
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? modes.length - 1
        : (Math.max(0, currentIndex) + direction + modes.length) % modes.length;
    buttonRefs.current[nextIndex]?.focus();
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key="radial-menu-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.14 }}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'auto' }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeMenu();
          }}
        >
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Seleção rápida de ferramenta"
            initial={shouldReduceMotion ? false : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25, duration: shouldReduceMotion ? 0 : undefined }}
            onKeyDown={handleMenuKeyDown}
            style={{ position: 'absolute', left: position.x, top: position.y, width: 0, height: 0 }}
          >
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

            <div
              role="menu"
              aria-label="Troca rápida de ferramenta"
              style={{
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
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.14 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                    onClick={() => {
                      onSelectMode(mode.id);
                      closeMenu(false);
                    }}
                    style={{
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
                    <ControlIcon name={mode.icon} size={20} />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
