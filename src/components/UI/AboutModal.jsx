import { useState, useRef, useEffect } from 'react';
import { X, Sparkle } from '@phosphor-icons/react';
import { IconBrandLinkedin } from '@tabler/icons-react';
import BrandLogo from './BrandLogo';

export default function AboutModal({ label = "Sobre (About)", className }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
        style={!className ? {
          background: 'none',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.75rem',
          cursor: 'pointer',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
        } : {
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {label}
      </button>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-dialog-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(0, 0, 0, 0.82)',
            backdropFilter: 'blur(12px)',
            display: 'grid',
            placeItems: 'center',
            padding: '20px',
            fontFamily: 'sans-serif',
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              maxWidth: '620px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              background: '#090A0F',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.9), 0 0 30px rgba(245, 158, 11, 0.1)',
              position: 'relative',
              color: '#ffffff',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Fechar janela Sobre"
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'grid',
                placeItems: 'center',
                color: 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <BrandLogo size={36} />
              <div>
                <h2 id="about-dialog-title" style={{ margin: 0, fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff' }}>
                  Sobre o MonitorSmith
                </h2>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#f59e0b', fontFamily: 'monospace' }}>
                  EXVORN.TECH — HARDWARE STUDIO SUITE
                </p>
              </div>
            </div>

            <div style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.82)' }}>
              <p style={{ marginTop: 0, marginBottom: '16px' }}>
                O <strong>MonitorSmith</strong> é uma iniciativa de engenharia visual e diagnóstico de displays desenvolvida pela <strong>EXVORN.TECH</strong>. Nossa missão é oferecer ferramentas de grau de estúdio, totalmente gratuitas e sem barreiras para testar, calibrar e inspecionar telas de qualquer tipo.
              </p>

              <div style={{ padding: '18px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '20px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkle size={18} color="#f59e0b" weight="fill" /> Tecnologia PWA & Privacidade
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                  Diferente de utilitários tradicionais que exigem downloads perigosos, o MonitorSmith roda 100% no motor de renderização do seu navegador (WebGL e Canvas). Ao instalá-lo como PWA, você obtém acesso offline ilimitado, com garantia de zero envio de dados ou gravações da sua tela para servidores na nuvem.
                </p>
              </div>

              <h3 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '12px', marginTop: '24px' }}>
                Conecte-se com a Engenharia EXVORN.TECH
              </h3>
              <p style={{ marginBottom: '16px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>
                Desenvolvido pela <strong>EXVORN.TECH</strong>. Para feedback, parcerias, dúvidas de engenharia ou networking profissional, conecte-se diretamente através do LinkedIn:
              </p>

              <a
                href="https://www.linkedin.com/in/matheus-peres-da-silva/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  padding: '12px 20px',
                  borderRadius: '14px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.2s ease',
                }}
              >
                <IconBrandLinkedin size={20} color="#60a5fa" />
                <span>LinkedIn EXVORN.TECH</span>
              </a>

              <div style={{ marginTop: '28px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontFamily: 'monospace' }}>
                © 2026 EXVORN.TECH — TODOS OS DIREITOS RESERVADOS
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
