import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { getToolById } from '../../constants/tools';
import BrandLogo from './BrandLogo';

const MODE_ACCENT = {
  black: '#f59e0b',
  'dead-pixel': '#ff665f',
  cleaner: '#fbbf24',
  calibration: '#d5b5ff',
  white: '#ffe0a3',
  color: '#72e0b6',
  'focus-timer': '#f2a6c8',
  clock: '#8fd8f8',
  message: '#d8b4fe',
  'sponsor-loop': '#f59e0b',
};

const TRANSITION_DURATION_MS = 640;

export default function ToolTransitionOverlay({
  activeMode,
  toolId = activeMode,
  isTransitioning,
  onTransitionComplete,
}) {


  const shouldReduceMotion = useReducedMotion();
  const onCompleteRef = useRef(onTransitionComplete);
  useEffect(() => {
    onCompleteRef.current = onTransitionComplete;
  }, [onTransitionComplete]);

  useEffect(() => {
    if (!isTransitioning || activeMode === 'home') return undefined;

    const timer = window.setTimeout(
      () => onCompleteRef.current?.(),
      TRANSITION_DURATION_MS,
    );
    return () => window.clearTimeout(timer);
  }, [activeMode, isTransitioning]);

  const tool = getToolById(toolId);
  const title = tool?.heroTitle || tool?.title || 'MonitorSmith';
  const accent = MODE_ACCENT[activeMode] || '#f59e0b';

  return (
    <AnimatePresence>
      {isTransitioning && activeMode !== 'home' ? (
        <motion.div
          key={`tool-entry-${toolId}`}
          className="ms-tool-entry"
          aria-hidden="true"
          style={{ '--tool-entry-accent': accent }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.16 }}
        >
          <motion.span
            className="ms-tool-entry__aperture"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            className="ms-tool-entry__content"
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -7, scale: 1.015 }}
            transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 360, damping: 30, delay: 0.04 }}
          >
            <div className="ms-tool-entry__mark">
              <BrandLogo size={48} />
            </div>
            <p className="ms-tool-entry__eyebrow">MonitorSmith · EXVORN.TECH</p>
            <p className="ms-tool-entry__action">Abrindo ferramenta</p>
            <h2>{title}</h2>
            <div className="ms-tool-entry__progress">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
