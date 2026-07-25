import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ControlIcon } from '../Controls/Navbar';

const MODE_META = {
  black: { title: 'Tela Preta OLED', icon: 'void', hint: 'Preto absoluto • Reduz emissão de luz', color: '#34d399' },
  'dead-pixel': { title: 'Teste de Pixels', icon: 'pixels', hint: 'Inspeção de subpixels • 8 Cores sólidas', color: '#60a5fa' },
  cleaner: { title: 'Inspeção para Limpeza', icon: 'cleaner', hint: 'Alto contraste • Revela poeira e marcas', color: '#fbbf24' },
  calibration: { title: 'Verificação do Display', icon: 'calibration', hint: 'Padrões gráficos • Nitidez, escala e gama', color: '#a78bfa' },
  white: { title: 'Luz Suave', icon: 'sun', hint: 'Softbox Web • Iluminação para videochamadas', color: '#f97316' },
  color: { title: 'Estúdio de Cor', icon: 'color', hint: 'Chroma Key • Preenchimento de cor uniforme', color: '#10b981' },
  'focus-timer': { title: 'Timer de Foco', icon: 'timer', hint: 'Sintetizador de Ruído Marrom • Pomodoro', color: '#ec4899' },
  clock: { title: 'Relógio em Tela', icon: 'clock', hint: 'Modo secundário • Hora analógica & digital', color: '#38bdf8' },
  message: { title: 'Mensagem em Tela', icon: 'message', hint: 'Recado em escala • Teleprompter espelhado', color: '#c084fc' },
};

export default function ToolTransitionOverlay({ activeMode, isTransitioning, onTransitionComplete }) {
  const [displayedMode, setDisplayedMode] = useState(activeMode);

  useEffect(() => {
    if (isTransitioning && activeMode !== 'home') {
      setDisplayedMode(activeMode);
      const timer = setTimeout(() => {
        onTransitionComplete?.();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [activeMode, isTransitioning, onTransitionComplete]);

  if (!isTransitioning || activeMode === 'home') return null;

  const meta = MODE_META[activeMode] || {
    title: 'MonitorSmith',
    icon: 'void',
    hint: 'Carregando ferramenta...',
    color: '#34d399',
  };

  return (
    <AnimatePresence>
      <motion.div
        key={`loader-${activeMode}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
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
          initial={{ scale: 0.88, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 1.05, opacity: 0, y: -8 }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
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
              animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
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
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
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
