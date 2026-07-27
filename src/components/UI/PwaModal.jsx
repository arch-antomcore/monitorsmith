import { useState, useRef, useEffect } from 'react';
import { X, CloudCheck, HardDrives, ArrowClockwise, DeviceMobile } from '@phosphor-icons/react';

export default function PwaModal({ label = "Instalar App & Offline", className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [swStatus, setSwStatus] = useState('Verificando...');
  const [cacheVersion, setCacheVersion] = useState('v16-sponsor-loop');
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    if ('serviceWorker' in navigator) {
      if (navigator.serviceWorker.controller) {
        setSwStatus('✅ Conectado & 100% Offline Pronto');
      } else {
        setSwStatus('⏳ Ativo (Aguardando próxima navegação para cache total)');
      }
    } else {
      setSwStatus('⚠️ Navegador sem suporte a Service Worker');
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleReloadCache = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  };

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
          aria-labelledby="pwa-dialog-title"
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
              maxWidth: '600px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              background: '#090A0F',
              border: '1px solid rgba(52, 211, 153, 0.35)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.9), 0 0 30px rgba(52, 211, 153, 0.1)',
              position: 'relative',
              color: '#ffffff',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Fechar janela PWA"
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
              <div style={{ padding: '10px', borderRadius: '14px', background: 'rgba(52, 211, 153, 0.15)', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
                <CloudCheck size={28} color="#34d399" weight="bold" />
              </div>
              <div>
                <h2 id="pwa-dialog-title" style={{ margin: 0, fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff' }}>
                  Instalar App & Modo Offline (PWA)
                </h2>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#34d399', fontFamily: 'monospace' }}>
                  HARDWARE STUDIO • OFFLINE ENGINE
                </p>
              </div>
            </div>

            <div style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.82)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontWeight: 600, color: '#fff', fontSize: '0.92rem' }}>
                  <HardDrives size={18} color="#34d399" /> Status do Cache Local
                </div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                  <strong>Motor:</strong> {swStatus}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
                  VERSÃO DO CACHE: {cacheVersion}
                </div>
              </div>

              <div>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '0.96rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <DeviceMobile size={18} color="#34d399" weight="fill" /> Como Instalar no seu Dispositivo
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                  • <strong>Windows / macOS / Linux:</strong> No navegador Chrome ou Edge, clique no ícone de <strong>"Instalar aplicativo (+)"</strong> na extremidade direita da barra de endereços (URL). O MonitorSmith abrirá em uma janela nativa dedicada de estúdio.<br />
                  • <strong>iOS / iPhone / iPad:</strong> No Safari, toque no botão <strong>Compartilhar</strong> (ícone de seta para cima) e selecione <strong>"Adicionar à Tela de Início"</strong>.<br />
                  • <strong>Android:</strong> No Chrome, toque no menu de 3 pontos no topo e escolha <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.
                </p>
              </div>

              <div style={{ marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={handleReloadCache}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'rgba(52, 211, 153, 0.15)',
                    border: '1px solid rgba(52, 211, 153, 0.4)',
                    color: '#34d399',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <ArrowClockwise size={18} />
                  <span>Atualizar Cache & Recarregar Aplicativo</span>
                </button>
              </div>

              <div style={{ marginTop: '12px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontFamily: 'monospace' }}>
                MONITORSMITH PWA — 100% SEGURO & OFFLINE READY
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
