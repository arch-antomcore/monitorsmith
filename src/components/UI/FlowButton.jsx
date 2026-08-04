import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ArrowRightBold from '../Icons/ArrowRightBold';
import BrandLogo from './BrandLogo';
import Modal from './Modal';

const detectInstallContext = () => {
  if (typeof navigator === 'undefined') return 'browser';
  const userAgent = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
  if (userAgent.includes('android')) return 'android';
  if (userAgent.includes('edg/')) return 'edge';
  if (userAgent.includes('chrome') || userAgent.includes('crios')) return 'chrome';
  if (userAgent.includes('safari')) return 'safari';
  if (userAgent.includes('firefox')) return 'firefox';
  return 'browser';
};

export default function FlowButton({ text = 'Instalar MonitorSmith', onClick }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(() =>
    typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches || Boolean(navigator.standalone)),
  );
  const [showModal, setShowModal] = useState(false);
  const [installContext] = useState(detectInstallContext);

  useEffect(() => {
    const handleBeforeInstall = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowModal(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    const displayMode = window.matchMedia('(display-mode: standalone)');
    const updateDisplayMode = () => {
      setIsInstalled(displayMode.matches || Boolean(navigator.standalone));
    };
    displayMode.addEventListener?.('change', updateDisplayMode);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
      displayMode.removeEventListener?.('change', updateDisplayMode);
    };
  }, []);

  const instructions = useMemo(() => {
    if (installContext === 'ios') {
      return [
        'Abra o MonitorSmith no Safari.',
        'Toque no botão Compartilhar.',
        'Escolha “Adicionar à Tela de Início” e confirme.',
      ];
    }
    if (installContext === 'android') {
      return [
        'Abra o menu do navegador.',
        'Escolha “Instalar aplicativo” ou “Adicionar à tela inicial”.',
        'Confirme o nome e o atalho.',
      ];
    }
    if (installContext === 'safari') {
      return [
        'No Safari compatível, abra Arquivo e procure “Adicionar ao Dock”.',
        'Se essa opção não existir, mantenha um favorito para acesso rápido.',
      ];
    }
    if (installContext === 'firefox') {
      return [
        'O Firefox desktop pode não oferecer instalação PWA nativa.',
        'Crie um favorito ou abra o site em um navegador com suporte à instalação, como Edge ou Chrome.',
      ];
    }
    return [
      'Procure o ícone de instalação no lado direito da barra de endereços.',
      'Se ele não aparecer, abra o menu do navegador e procure “Instalar aplicativo”.',
      'Confirme para criar uma janela e um atalho dedicados.',
    ];
  }, [installContext]);

  const handleInstall = async (event) => {
    if (onClick) {
      onClick(event);
      return;
    }

    if (!deferredPrompt) {
      setShowModal(true);
      return;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      if (outcome === 'accepted') setIsInstalled(true);
    } catch {
      setShowModal(true);
    }
  };

  if (isInstalled) return null;

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        type="button"
        className="ms-motion-btn group"
        onClick={handleInstall}
        aria-label={text}
        aria-haspopup={deferredPrompt ? undefined : 'dialog'}
      >
        <span className="ms-motion-btn__circle" aria-hidden="true" />
        <div className="ms-motion-btn__icon" aria-hidden="true">
          <ArrowRightBold width={20} height={20} />
        </div>
        <span className="ms-motion-btn__text">{text}</span>
      </motion.button>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Como instalar o MonitorSmith"
        description="O navegador não disponibilizou o prompt automático; siga a opção correspondente ao seu dispositivo."
        size="sm"
        closeLabel="Fechar instruções de instalação"
      >
        <div style={{ display: 'grid', gap: '18px', color: 'rgba(255,255,255,0.8)', fontSize: '0.86rem', lineHeight: 1.6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BrandLogo size={34} />
            <span style={{ color: '#f59e0b', fontFamily: 'monospace', fontSize: '0.74rem', textTransform: 'uppercase' }}>
              {installContext === 'browser' ? 'Instalação manual' : installContext}
            </span>
          </div>

          <ol style={{ margin: 0, paddingLeft: '20px' }}>
            {instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}
          </ol>

          <p style={{ margin: 0, color: 'rgba(255,255,255,0.58)', fontSize: '0.78rem' }}>
            A instalação depende do navegador e do sistema. Se nenhuma opção aparecer, o
            MonitorSmith continua funcionando normalmente como site.
          </p>
        </div>
      </Modal>
    </>
  );
}
