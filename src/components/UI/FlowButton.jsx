import { useEffect, useState } from 'react';
import { ArrowRight, Desktop, CheckCircle, X, Shield } from '@phosphor-icons/react';
import BrandLogo from './BrandLogo';

export default function FlowButton({ text = "Instalar MonitorSmith no Windows", onClick }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [browserType, setBrowserType] = useState('browser');

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (navigator.brave && typeof navigator.brave.isBrave === 'function') {
      setBrowserType('brave');
    } else if (ua.includes('edg/')) {
      setBrowserType('edge');
    } else if (ua.includes('chrome')) {
      setBrowserType('chrome');
    } else if (ua.includes('safari')) {
      setBrowserType('safari');
    }

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowModal(false);
    };

    if (typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async (e) => {
    if (onClick) {
      onClick(e);
      return;
    }

    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') setIsInstalled(true);
        setDeferredPrompt(null);
      } catch {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  if (isInstalled) return null;

  return (
    <>
      <button
        type="button"
        className="ms-flow-btn"
        onClick={handleInstall}
        aria-label={text}
      >
        <span className="ms-flow-btn__arr-2">
          <ArrowRight size={15} weight="bold" />
        </span>

        <span className="ms-flow-btn__text">
          {text}
        </span>

        <span className="ms-flow-btn__circle" aria-hidden="true" />
        <span className="ms-flow-btn__shimmer" aria-hidden="true" />

        <span className="ms-flow-btn__arr-1">
          <ArrowRight size={15} weight="bold" />
        </span>
      </button>

      {showModal ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(0, 0, 0, 0.78)',
            backdropFilter: 'blur(12px)',
            display: 'grid',
            placeItems: 'center',
            padding: '20px',
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              maxWidth: '500px',
              width: '100%',
              background: '#090A0F',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '24px',
              padding: '30px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 30px rgba(245, 158, 11, 0.08)',
              position: 'relative',
              color: '#ffffff',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'grid',
                placeItems: 'center',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <BrandLogo size={36} />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 600 }}>Instalar no Windows / Desktop</h3>
                <span style={{ fontSize: '0.74rem', color: '#f59e0b', opacity: 0.9 }}>Brave, Chrome, Edge e Opera</span>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.76)', lineHeight: 1.55, marginBottom: '20px' }}>
              Caso você já tenha instalado no Windows ou se o pop-up nativo do {browserType === 'brave' ? 'Brave' : 'navegador'} não abriu automaticamente:
            </p>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px', marginBottom: '20px' }}>
              <ol style={{ paddingLeft: '18px', fontSize: '0.84rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.8, margin: 0 }}>
                <li>No Brave / Chrome: Clique nos <strong>3 pontos (⋮)</strong> no canto superior direito.</li>
                <li>Passe o mouse em <strong>"Salvar e compartilhar"</strong>.</li>
                <li>Clique em <strong>"Abrir no app MonitorSmith"</strong> (se já instalado) ou <strong>"Instalar MonitorSmith"</strong>.</li>
              </ol>
            </div>

            <p style={{ fontSize: '0.78rem', color: '#f59e0b', margin: '0 0 20px', lineHeight: 1.4, fontWeight: 500 }}>
              ✨ Como você já instalou o app no seu Windows, o Brave permite abrir direto pelo menu "Salvar e compartilhar"!
            </p>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="wbp-button"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.86rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Entendido!
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
