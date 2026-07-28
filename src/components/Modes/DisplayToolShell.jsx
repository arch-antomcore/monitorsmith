import { useState, useEffect, useRef } from 'react';
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
}) {
  const [isPanelClosed, setIsPanelClosed] = useState(false);
  const [screenSpecs, setScreenSpecs] = useState({ width: 1920, height: 1080, dpr: 1, depth: 24 });
  const closeButtonRef = useRef(null);
  const reopenButtonRef = useRef(null);
  const pendingFocusTarget = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!pendingFocusTarget.current) return;

    const target = pendingFocusTarget.current === 'reopen'
      ? reopenButtonRef.current
      : closeButtonRef.current;

    if (!target) return;
    target.focus({ preventScroll: true });
    pendingFocusTarget.current = null;
  }, [isPanelClosed]);

  const closePanel = () => {
    pendingFocusTarget.current = 'reopen';
    setIsPanelClosed(true);
  };

  const openPanel = () => {
    pendingFocusTarget.current = 'close';
    setIsPanelClosed(false);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateSpecs = () => {
      setScreenSpecs({
        width: window.screen?.width || window.innerWidth,
        height: window.screen?.height || window.innerHeight,
        dpr: window.devicePixelRatio || 1,
        depth: window.screen?.colorDepth || 24,
      });
    };
    updateSpecs();
    window.addEventListener('resize', updateSpecs);
    return () => window.removeEventListener('resize', updateSpecs);
  }, []);

  return (
    <div className={`display-mode display-mode--${id || 'tool'} ${className}`}>
      {children}

      {/* Studio OSD Status Bar (Hardware Diagnostic HUD) */}
      <div
        aria-hidden="true"
        className="display-mode__osd-hud"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 25,
          display: 'inline-flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '6px 14px',
          background: 'rgba(5, 5, 6, 0.88)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          borderRadius: '6px',
          fontFamily: "'JetBrains Mono', Consolas, monospace",
          fontSize: '0.68rem',
          letterSpacing: '0.08em',
          color: 'rgba(255, 255, 255, 0.85)',
          pointerEvents: 'none',
          textTransform: 'uppercase',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)'
        }}
      >
        <span style={{ color: '#F59E0B', fontWeight: 700 }}>[ OSD // EXVORN.TECH ]</span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span>MODO: <strong>{title || id || 'DIAGNÓSTICO'}</strong></span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span style={{ color: '#60A5FA' }}>TELA CSS: <strong>{screenSpecs.width}×{screenSpecs.height}</strong> · DPR {screenSpecs.dpr.toFixed(2)} · {screenSpecs.depth}-BIT REPORTADO</span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span style={{ color: '#10B981' }}>● RENDERIZAÇÃO NO NAVEGADOR</span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span style={{ opacity: 0.65 }}>ATALHOS: [ ESC / ? ]</span>
      </div>

      <AnimatePresence mode="wait">
        {!isPanelClosed ? (
          <motion.div
            key="tool-panel"
            className="display-mode__controls"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 350, damping: 28 }}
          >
            <div className="display-mode__controls-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                {title ? <h2 className="display-mode__title" style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>{title}</h2> : null}
                {subtitle ? <p className="display-mode__subtitle" style={{ margin: '2px 0 0', fontSize: '0.8rem', opacity: 0.7 }}>{subtitle}</p> : null}
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="display-mode__icon-button"
                onClick={closePanel}
                title="Minimizar painel de opções (×)"
                aria-label="Minimizar painel de opções"
                style={{
                  width: '26px',
                  height: '26px',
                  border: 0,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '12px'
                }}
              >
                ×
              </button>
            </div>

            {Array.isArray(instructions) && instructions.length > 0 ? (
              <ul style={{ margin: '8px 0 12px', paddingLeft: '18px', fontSize: '0.78rem', opacity: 0.8, lineHeight: 1.45 }}>
                {instructions.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            ) : typeof instructions === 'string' ? (
              <p style={{ margin: '8px 0 12px', fontSize: '0.78rem', opacity: 0.8, lineHeight: 1.45 }}>
                {instructions}
              </p>
            ) : null}

            {controls}

            {technicalLimit ? (
              <p style={{ margin: '10px 0 0', fontSize: '0.68rem', opacity: 0.5, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
                {technicalLimit}
              </p>
            ) : null}
          </motion.div>
        ) : (
          <motion.button
            ref={reopenButtonRef}
            key="reopen-btn"
            type="button"
            className="wbp-button wbp-button--ghost"
            onClick={openPanel}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.16 }}
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              zIndex: 30,
              backdropFilter: 'blur(16px)',
              background: 'rgba(10, 11, 15, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '9999px',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            {customOptionsLabel || `Opções de ${title || 'ajuste'}`}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DisplayToolShell;
