import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert('Para instalar no Windows/Mac:\n1. Clique no ícone de "Instalar App" ou "+" no canto da barra de endereço do navegador.\n2. Escolha "Instalar MonitorSmith".');
    }
  };

  if (isInstalled || isDismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="ms-pwa-banner"
      style={{
        margin: '24px auto 0',
        maxWidth: '840px',
        padding: '16px 20px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(20, 24, 36, 0.92), rgba(12, 14, 22, 0.94))',
        border: '1px solid rgba(52, 211, 153, 0.28)',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 300px' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'rgba(52, 211, 153, 0.12)',
            border: '1px solid rgba(52, 211, 153, 0.3)',
            display: 'grid',
            placeItems: 'center',
            fontSize: '1.2rem',
            flexShrink: 0,
          }}
        >
          💻
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 600, color: '#ffffff' }}>
            Usar o MonitorSmith como App no Windows
          </h3>
          <p style={{ margin: '2px 0 0', fontSize: '0.76rem', color: 'rgba(255,255,255,0.68)', lineHeight: 1.4 }}>
            Funciona 100% offline, em janela própria sem abas do navegador e com performance estúdio.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          type="button"
          onClick={handleInstallClick}
          className="wbp-button wbp-button--active"
          style={{
            padding: '8px 16px',
            fontSize: '0.78rem',
            background: '#059669',
            borderColor: '#34d399',
            color: '#ffffff',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          {deferredPrompt ? '⚡ Instalar App Agora' : '💻 Como Instalar no Windows'}
        </button>
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
            fontSize: '1rem',
            padding: '4px',
          }}
          title="Fechar aviso"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}
