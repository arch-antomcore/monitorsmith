import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ControlIcon } from '../Controls/Navbar';
import { getToolById } from '../../constants/tools';

const MODE_ACCENT = {
  black: '#f59e0b',
  'dead-pixel': '#60a5fa',
  cleaner: '#fbbf24',
  calibration: '#a78bfa',
  white: '#f97316',
  color: '#10b981',
  'focus-timer': '#ec4899',
  clock: '#38bdf8',
  message: '#c084fc',
  'sponsor-loop': '#f59e0b',
};

export default function ToolTransitionOverlay({ activeMode, toolId = activeMode, isTransitioning, onTransitionComplete }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isTransitioning && activeMode !== 'home') {
      const timer = setTimeout(() => {
        onTransitionComplete?.();
      }, shouldReduceMotion ? 0 : 350);
      return () => clearTimeout(timer);
    }
  }, [activeMode, isTransitioning, onTransitionComplete, shouldReduceMotion]);

  if (!isTransitioning || activeMode === 'home') return null;

  const tool = getToolById(toolId);
  const meta = {
    title: tool?.title || 'MonitorSmith',
    icon: tool?.icon || 'void',
    hint: tool?.when || tool?.description || 'Preparando ferramenta…',
    color: MODE_ACCENT[activeMode] || '#f59e0b',
  };

  return (
    <AnimatePresence>
      <motion.div
        key={`loader-${activeMode}`}
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(3, 3, 4, 0.88)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          pointerEvents: 'none',
        }}
      >
        <motion.div
          initial={shouldReduceMotion ? false : { scale: 0.88, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { scale: 1.05, opacity: 0, y: -8 }}
          transition={{ type: 'spring', stiffness: 420, damping: 28, duration: shouldReduceMotion ? 0 : undefined }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '32px 40px',
            borderRadius: '24px',
            background: 'rgba(16, 18, 26, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: `0 24px 60px rgba(0, 0, 0, 0.6), 0 0 40px ${meta.color}22`,
            maxWidth: '380px',
            width: '90%',
          }}
        >
          {/* Animated Glowing Ring & Icon */}
          <div style={{ position: 'relative', marginBottom: '18px' }}>
            <motion.div
              animate={shouldReduceMotion ? { scale: 1, opacity: 0.55 } : { scale: [1, 1.25, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={shouldReduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: '-12px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${meta.color}55 0%, transparent 70%)`,
              }}
            />
            <div
              style={{
                position: 'relative',
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: `1px solid ${meta.color}44`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: meta.color,
                boxShadow: `0 0 20px ${meta.color}33`,
              }}
            >
              <ControlIcon name={meta.icon} size={28} />
            </div>
          </div>

          <h3
            style={{
              margin: '0 0 6px 0',
              fontSize: '1.15rem',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            {meta.title}
          </h3>

          <p
            style={{
              margin: '0 0 20px 0',
              fontSize: '0.78rem',
              color: 'rgba(255, 255, 255, 0.58)',
              fontFamily: "'DM Mono', monospace",
              letterSpacing: '0.02em',
            }}
          >
            {meta.hint}
          </p>

          {/* Shimmer Progress Bar */}
          <div
            style={{
              width: '100%',
              height: '3px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <motion.div
              initial={shouldReduceMotion ? false : { x: '-100%' }}
              animate={shouldReduceMotion ? { x: 0 } : { x: '100%' }}
              transition={shouldReduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
              style={{
                width: '60%',
                height: '100%',
                borderRadius: '999px',
                background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)`,
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
