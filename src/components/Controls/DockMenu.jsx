import { useEffect, useMemo, useRef, useState } from 'react';
import CaretLeftBold from '../Icons/CaretLeftBold';
import CaretRightBold from '../Icons/CaretRightBold';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ControlIcon } from './Navbar';
import { DEFAULT_DOCK_MODES, getModePresentation } from '../../constants/shortcuts';

function normalizeMode(mode) {
  if (typeof mode === 'string') {
    return { ...getModePresentation(mode), detail: '', shortcut: '' };
  }

  const fallback = getModePresentation(mode);
  return {
    ...fallback,
    ...mode,
    label: mode?.label || fallback.label,
    icon: mode?.icon || fallback.icon,
    detail: mode?.detail || mode?.description || '',
    shortcut: mode?.shortcut || '',
  };
}

export default function DockMenu({
  currentMode,
  activeMode,
  onSelectMode,
  availableModes = DEFAULT_DOCK_MODES,
  hidden = false,
  className,
  label = 'Ferramentas do monitor',
}) {
  const modesRef = useRef(null);
  const modeButtonRefs = useRef([]);
  const selectedMode = currentMode ?? activeMode;
  const selectedModeId =
    selectedMode && typeof selectedMode === 'object' ? selectedMode.id : selectedMode;
  const modes = useMemo(
    () => (Array.isArray(availableModes) ? availableModes : DEFAULT_DOCK_MODES).map(normalizeMode),
    [availableModes],
  );

  const currentIndex = modes.findIndex((m) => m.id === selectedModeId);
  const [focusModeId, setFocusModeId] = useState(selectedModeId ?? null);
  const focusIndex = modes.findIndex((mode) => mode.id === focusModeId);
  const rovingIndex = focusIndex >= 0 ? focusIndex : currentIndex >= 0 ? currentIndex : 0;

  const handlePrevTool = () => {
    if (modes.length === 0 || !onSelectMode) return;
    const prevIndex = currentIndex <= 0 ? modes.length - 1 : currentIndex - 1;
    onSelectMode(modes[prevIndex].id);
  };

  const handleNextTool = () => {
    if (modes.length === 0 || !onSelectMode) return;
    const nextIndex = currentIndex >= modes.length - 1 ? 0 : currentIndex + 1;
    onSelectMode(modes[nextIndex].id);
  };

  useEffect(() => {
    if (!modesRef.current) return;
    const container = modesRef.current;
    const activeEl = container.querySelector('.is-active');
    if (activeEl) {
      const containerWidth = container.clientWidth;
      const elLeft = activeEl.offsetLeft;
      const elWidth = activeEl.clientWidth;
      const targetScrollLeft = elLeft - (containerWidth / 2) + (elWidth / 2);
      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth',
      });
    }
  }, [selectedModeId]);

  useEffect(() => {
    setFocusModeId(selectedModeId ?? modes[0]?.id ?? null);
  }, [selectedModeId, modes]);

  const handleModeKeyDown = (event, index) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    const direction = event.key === 'ArrowLeft' ? -1 : 1;
    let nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? modes.length - 1
        : (index + direction + modes.length) % modes.length;

    for (let attempts = 0; attempts < modes.length; attempts += 1) {
      if (!modeButtonRefs.current[nextIndex]?.disabled) break;
      nextIndex = (nextIndex + direction + modes.length) % modes.length;
    }

    setFocusModeId(modes[nextIndex]?.id ?? null);
    modeButtonRefs.current[nextIndex]?.focus();
  };

  return (
    <AnimatePresence>
      {!hidden ? (
        <motion.nav
          className={cn('wbp-dock', className)}
          aria-label={label}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ x: '-50%' }}
        >
          <button
            type="button"
            className="wbp-dock__arrow-btn wbp-dock__arrow-btn--left"
            onClick={handlePrevTool}
            aria-label="Ferramenta anterior"
            title="Ferramenta anterior (←)"
          >
            <CaretLeftBold width={16} height={16} />
          </button>

          <div ref={modesRef} className="wbp-dock__modes" role="toolbar" aria-label="Modos de exibição">
            {modes.map((mode, index) => {
              const isActive = selectedModeId === mode.id;
              const itemLabel = mode.detail ? `${mode.label}. ${mode.detail}` : mode.label;

              return (
                <motion.button
                  ref={(element) => { modeButtonRefs.current[index] = element; }}
                  key={mode.id}
                  className={cn('wbp-dock__mode', isActive && 'is-active')}
                  type="button"
                  aria-label={itemLabel}
                  aria-pressed={isActive}
                  aria-current={isActive ? 'true' : undefined}
                  tabIndex={index === rovingIndex ? 0 : -1}
                  disabled={mode.disabled || !onSelectMode}
                  title={mode.shortcut ? `${itemLabel} (${mode.shortcut})` : itemLabel}
                  onClick={() => onSelectMode?.(mode.id)}
                  onFocus={() => setFocusModeId(mode.id)}
                  onKeyDown={(event) => handleModeKeyDown(event, index)}
                  whileHover={!mode.disabled ? { y: -2 } : undefined}
                  whileTap={!mode.disabled ? { scale: 0.97 } : undefined}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                >
                  <span className="wbp-dock__mode-icon" aria-hidden="true">
                    <ControlIcon name={mode.icon} size={18} />
                  </span>
                  <span className="wbp-dock__mode-copy">
                    <span className="wbp-dock__mode-label">{mode.label}</span>
                    {mode.detail ? <span className="wbp-dock__mode-detail">{mode.detail}</span> : null}
                  </span>
                  {mode.shortcut ? <kbd className="wbp-dock__shortcut">{mode.shortcut}</kbd> : null}
                </motion.button>
              );
            })}
          </div>

          <button
            type="button"
            className="wbp-dock__arrow-btn wbp-dock__arrow-btn--right"
            onClick={handleNextTool}
            aria-label="Próxima ferramenta"
            title="Próxima ferramenta (→)"
          >
            <CaretRightBold width={16} height={16} />
          </button>

        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}
