import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <div className={`display-mode display-mode--${id || 'tool'} ${className}`}>
      {children}

      <AnimatePresence mode="wait">
        {!isPanelClosed ? (
          <motion.div
            key="tool-panel"
            className="display-mode__controls"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          >
            <div className="display-mode__controls-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                {title ? <h2 className="display-mode__title" style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>{title}</h2> : null}
                {subtitle ? <p className="display-mode__subtitle" style={{ margin: '2px 0 0', fontSize: '0.8rem', opacity: 0.7 }}>{subtitle}</p> : null}
              </div>
              <button
                type="button"
                className="display-mode__icon-button"
                onClick={() => setIsPanelClosed(true)}
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
            key="reopen-btn"
            type="button"
            className="wbp-button wbp-button--ghost"
            onClick={() => setIsPanelClosed(false)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
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
