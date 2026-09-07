import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { acquireModalIsolation } from '../../utils/modalIsolation';

const SLIDES = [
  {
    id: 'welcome',
    title: 'Bem-vindo ao MonitorSmith',
    desc: 'Ferramentas visuais para o seu monitor.'
  },
  {
    id: 'dock',
    title: 'Use o dock para trocar de ferramenta',
    desc: 'Use o dock na parte inferior para trocar de ferramenta.'
  },
  {
    id: 'radial',
    title: 'Menu rápido com o botão direito',
    desc: 'Botão direito abre o menu radial.'
  },
  {
    id: 'keyboard',
    title: 'Atalhos de teclado',
    desc: 'Pressione ? para ver os atalhos.'
  }
];

export default function OnboardingOverlay({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef(null);

  const handleComplete = useCallback(() => {
    try { localStorage.setItem('ms_onboarding_done', '1'); }
    catch { /* A introdução também pode ser encerrada sem armazenamento. */ }
    if (onComplete) onComplete();
  }, [onComplete]);

  const nextSlide = useCallback(() => {
    if (currentSlide < SLIDES.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    } else {
      handleComplete();
    }
  }, [currentSlide, handleComplete]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const previousFocus = document.activeElement;
    dialogRef.current?.querySelector('button')?.focus({ preventScroll: true });
    const releaseIsolation = acquireModalIsolation();
    return () => {
      releaseIsolation();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.isComposing || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key === 'Tab') {
      const buttons = Array.from(dialogRef.current.querySelectorAll('button:not([disabled])'));
      const first = buttons[0];
      const last = buttons.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
      return;
    }
    const action = { Escape: handleComplete, ArrowRight: nextSlide, ArrowLeft: prevSlide }[event.key];
    if (action) {
      event.preventDefault();
      event.stopPropagation();
      action();
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: shouldReduceMotion ? 0 : direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: shouldReduceMotion ? 0 : direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return createPortal(
    <div 
      ref={dialogRef}
      className="ms-onboarding-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Introdução ao MonitorSmith"
      onKeyDown={handleKeyDown}
      data-lenis-prevent="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div 
        className="ms-onboarding-card glass3d"
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: 'var(--surface, rgba(20, 20, 25, 0.85))',
          borderRadius: 'var(--radius-lg, 1rem)',
          border: '1px solid rgba(255,255,255,0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        <button 
          onClick={handleComplete}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted, #888)',
            cursor: 'pointer',
            fontSize: '0.875rem',
            zIndex: 10
          }}
          aria-label="Pular introdução"
        >
          Pular
        </button>

        <div style={{ padding: '3rem 2rem 2rem', position: 'relative', height: '280px' }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              style={{
                position: 'absolute',
                left: '2rem',
                right: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <h2 style={{ 
                margin: '0 0 0.5rem', 
                fontSize: '1.25rem', 
                fontWeight: 600,
                color: 'var(--text, #fff)' 
              }}>
                {SLIDES[currentSlide].title}
              </h2>
              <p style={{ 
                margin: 0, 
                color: 'var(--text-muted, #aaa)',
                fontSize: '0.95rem',
                lineHeight: 1.5
              }}>
                {SLIDES[currentSlide].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ 
          padding: '1rem 2rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            style={{
              background: 'none',
              border: 'none',
              color: currentSlide === 0 ? 'rgba(255,255,255,0.2)' : 'var(--text, #fff)',
              cursor: currentSlide === 0 ? 'default' : 'pointer',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Slide anterior"
          >
            ←
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentSlide ? 1 : -1);
                  setCurrentSlide(idx);
                }}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  padding: 0,
                  border: 'none',
                  background: `radial-gradient(circle, ${idx === currentSlide ? 'var(--accent, #ffb800)' : 'rgba(255,255,255,0.5)'} 0 4px, transparent 4px)`,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                aria-label={`Ir para slide ${idx + 1}`}
                aria-current={idx === currentSlide ? 'step' : undefined}
              />
            ))}
          </div>

          {currentSlide === SLIDES.length - 1 ? (
            <button
              onClick={handleComplete}
              style={{
                background: 'var(--accent, #ffb800)',
                color: '#000',
                border: 'none',
                borderRadius: '9999px',
                padding: '0.5rem 1rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Começar
            </button>
          ) : (
            <button
              onClick={nextSlide}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text, #fff)',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Próximo slide"
            >
              →
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
