import { useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export function DisplayToolShell({
  id,
  title,
  subtitle,
  instructions,
  technicalLimit,
  controls,
  children,
  className = '',
  customOptionsLabel,
  onKeyDown,
  visible = true,
  style,
  tabIndex,
  'data-mode': dataMode,
  'data-running': dataRunning,
  'data-seconds': dataSeconds,
  'aria-label': ariaLabel,
}) {
  const shouldReduceMotion = useReducedMotion();
  const [isPanelClosed, setIsPanelClosed] = useState(false);
  const closeButtonRef = useRef(null);
  const reopenButtonRef = useRef(null);
  const pendingFocusTarget = useRef(null);
  const panelTitleId = `${id || 'tool'}-controls-title`;

  const focusWhenMounted = useCallback((targetName, node) => {
    if (!node || pendingFocusTarget.current !== targetName) return;

    window.requestAnimationFrame(() => {
      if (!node.isConnected || pendingFocusTarget.current !== targetName) return;
      node.focus({ preventScroll: true });
      pendingFocusTarget.current = null;
    });
  }, []);

  const setCloseButtonRef = useCallback((node) => {
    closeButtonRef.current = node;
    focusWhenMounted('close', node);
  }, [focusWhenMounted]);

  const setReopenButtonRef = useCallback((node) => {
    reopenButtonRef.current = node;
    focusWhenMounted('reopen', node);
  }, [focusWhenMounted]);

  const closePanel = () => {
    pendingFocusTarget.current = 'reopen';
    setIsPanelClosed(true);
  };

  const openPanel = () => {
    pendingFocusTarget.current = 'close';
    setIsPanelClosed(false);
  };

  return (
    <div
      className={`display-mode display-mode--${id || 'tool'} ${className}`}
      onKeyDown={onKeyDown}
      style={style}
      tabIndex={tabIndex}
      data-mode={dataMode}
      data-running={dataRunning}
      data-seconds={dataSeconds}
      aria-label={ariaLabel}
    >
      {children}

      <AnimatePresence mode="wait">
        {visible && !isPanelClosed ? (
          <motion.aside
            key="tool-panel"
            className={`display-mode__controls display-mode__controls--${id || 'tool'}`}
            aria-labelledby={title ? panelTitleId : undefined}
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={shouldReduceMotion ? { duration: 0.001 } : { type: 'spring', stiffness: 350, damping: 28, staggerChildren: 0.05 }}
          >
            <div className="display-mode__panel-header">
              <div>
                <p className="display-mode__eyebrow">Controles</p>
                {title ? <h2 id={panelTitleId} className="display-mode__title">{title}</h2> : null}
                {subtitle ? <p className="display-mode__subtitle">{subtitle}</p> : null}
              </div>
              <motion.button
                ref={setCloseButtonRef}
                type="button"
                className="display-mode__icon-button"
                onClick={closePanel}
                title="Minimizar painel de opções (×)"
                aria-label="Minimizar painel de opções"
                whileHover={!shouldReduceMotion ? { scale: 1.1 } : {}}
                whileTap={!shouldReduceMotion ? { scale: 0.9 } : {}}
              >
                ×
              </motion.button>
            </div>

            {Array.isArray(instructions) && instructions.length > 0 ? (
              <ol className="display-mode__instructions" aria-label="Como usar">
                {instructions.map((step, idx) => (
                  <li key={`${idx}-${step.slice(0, 12)}`}>{step}</li>
                ))}
              </ol>
            ) : typeof instructions === 'string' ? (
              <p className="display-mode__instructions">
                {instructions}
              </p>
            ) : null}

            {controls}

            {technicalLimit ? (
              <p className="display-mode__technical-limit">
                <strong>Limite da ferramenta:</strong> {technicalLimit}
              </p>
            ) : null}
          </motion.aside>
        ) : visible ? (
          <motion.button
            ref={setReopenButtonRef}
            key="reopen-btn"
            type="button"
            className="display-mode__reopen-panel-btn"
            onClick={openPanel}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            whileHover={!shouldReduceMotion ? { scale: 1.02 } : {}}
            whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
            transition={shouldReduceMotion ? { duration: 0.001 } : { type: 'spring', stiffness: 350, damping: 28 }}
          >
            {customOptionsLabel || `Opções de ${title || 'ajuste'}`}
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default DisplayToolShell;
