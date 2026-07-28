import { useEffect, useRef } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Button, { joinClasses } from '../UI/Button';
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

function DockAction({ icon, label, active, onClick, disabled = false }) {
  return (
    <Button
      className="wbp-dock__utility"
      variant={active ? 'active' : 'ghost'}
      size="sm"
      icon={<ControlIcon name={icon} size={17} />}
      aria-label={label}
      title={label}
      aria-pressed={typeof active === 'boolean' ? active : undefined}
      onClick={onClick}
      disabled={disabled || !onClick}
    />
  );
}

export default function DockMenu({
  currentMode,
  activeMode,
  onSelectMode,
  onToggleFullscreen,
  onHideUi,
  isFullscreen = false,
  onToggleWakeLock,
  isWakeLockActive = false,
  onOpenHelp,
  availableModes = DEFAULT_DOCK_MODES,
  hidden = false,
  className,
  label = 'Ferramentas do monitor',
}) {
  const modesRef = useRef(null);
  const modeButtonRefs = useRef([]);
  const shouldReduceMotion = useReducedMotion();
  const selectedMode = currentMode ?? activeMode;
  const selectedModeId =
    selectedMode && typeof selectedMode === 'object' ? selectedMode.id : selectedMode;
  const modes = (Array.isArray(availableModes) ? availableModes : DEFAULT_DOCK_MODES).map(normalizeMode);

  const currentIndex = modes.findIndex((m) => m.id === selectedModeId);

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
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
      });
    }
  }, [selectedModeId, shouldReduceMotion]);

  const handleModeKeyDown = (event, index) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? modes.length - 1
        : event.key === 'ArrowRight'
          ? (index + 1) % modes.length
          : (index - 1 + modes.length) % modes.length;
    modeButtonRefs.current[nextIndex]?.focus();
  };

  return (
    <AnimatePresence initial={false}>
      {!hidden ? (
        <motion.nav
          className={joinClasses('wbp-dock', className)}
          aria-label={label}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.985 }}
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
            <CaretLeft size={16} weight="bold" />
          </button>

          <div ref={modesRef} className="wbp-dock__modes" role="toolbar" aria-label="Modos de exibição">
            {modes.map((mode, index) => {
              const isActive = selectedModeId === mode.id;
              const itemLabel = mode.detail ? `${mode.label}. ${mode.detail}` : mode.label;

              return (
                <motion.button
                  ref={(element) => { modeButtonRefs.current[index] = element; }}
                  key={mode.id}
                  className={joinClasses('wbp-dock__mode', isActive && 'is-active')}
                  type="button"
                  aria-label={itemLabel}
                  aria-pressed={isActive}
                  aria-current={isActive ? 'true' : undefined}
                  tabIndex={isActive || (currentIndex === -1 && index === 0) ? 0 : -1}
                  disabled={mode.disabled || !onSelectMode}
                  title={mode.shortcut ? `${itemLabel} (${mode.shortcut})` : itemLabel}
                  onClick={() => onSelectMode?.(mode.id)}
                  onKeyDown={(event) => handleModeKeyDown(event, index)}
                  whileHover={!mode.disabled && !shouldReduceMotion ? { y: -2 } : undefined}
                  whileTap={!mode.disabled && !shouldReduceMotion ? { scale: 0.97 } : undefined}
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
            <CaretRight size={16} weight="bold" />
          </button>

          <span className="wbp-dock__separator" aria-hidden="true" />

          <div className="wbp-dock__utilities" role="toolbar" aria-label="Ações da tela">
            <DockAction
              icon={isFullscreen ? 'minimize' : 'fullscreen'}
              label={isFullscreen ? 'Sair da tela cheia (Esc ou F)' : 'Ocupar 100% da tela (F)'}
              onClick={onToggleFullscreen}
            />
            {onToggleWakeLock ? (
              <DockAction
                icon="wake"
                label={isWakeLockActive ? 'Permitir que a tela apague' : 'Manter a tela ativa'}
                active={isWakeLockActive}
                onClick={onToggleWakeLock}
              />
            ) : null}
            {onHideUi ? (
              <DockAction
                icon="hideUi"
                label="Ocultar barras e interface (Modo imersivo)"
                onClick={onHideUi}
              />
            ) : null}
            <DockAction icon="help" label="Ver atalhos de teclado (?)" onClick={onOpenHelp} />
          </div>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}
