import { useEffect, useState } from 'react';
import { ArrowClockwise, DeviceMobile, HardDrives } from '@phosphor-icons/react';
import BrandLogo from './BrandLogo';
import Button from './Button';
import Modal from './Modal';

const triggerStyle = (hasClassName) => ({
  background: 'none',
  border: 'none',
  color: hasClassName ? undefined : 'rgba(255, 255, 255, 0.7)',
  cursor: 'pointer',
  fontSize: hasClassName ? undefined : '0.75rem',
  textDecoration: hasClassName ? undefined : 'underline',
  textUnderlineOffset: hasClassName ? undefined : '3px',
});

const waitForWaitingWorker = (registration) => new Promise((resolve) => {
  if (registration.waiting) {
    resolve(registration.waiting);
    return;
  }

  const installingWorker = registration.installing;
  if (!installingWorker) {
    resolve(null);
    return;
  }

  let settled = false;
  let timeoutId;
  const finish = (worker) => {
    if (settled) return;
    settled = true;
    window.clearTimeout(timeoutId);
    installingWorker.removeEventListener('statechange', handleStateChange);
    resolve(worker);
  };
  const handleStateChange = () => {
    if (installingWorker.state === 'installed' || installingWorker.state === 'redundant') {
      finish(registration.waiting || null);
    }
  };

  installingWorker.addEventListener('statechange', handleStateChange);
  timeoutId = window.setTimeout(() => finish(registration.waiting || null), 8000);
});

const activateWaitingWorker = (worker) => new Promise((resolve) => {
  let settled = false;
  const finish = () => {
    if (settled) return;
    settled = true;
    navigator.serviceWorker.removeEventListener('controllerchange', finish);
    resolve();
  };

  navigator.serviceWorker.addEventListener('controllerchange', finish);
  worker.postMessage({ type: 'SKIP_WAITING' });
  window.setTimeout(finish, 5000);
});

export default function PwaModal({ label = 'Instalar app e usar offline', className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [swStatus, setSwStatus] = useState('Verificando suporte do navegador…');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return undefined;

    let cancelled = false;
    const displayMode = window.matchMedia('(display-mode: standalone)');

    const updateConnection = () => setIsOnline(navigator.onLine);
    const updateDisplayMode = () => setIsStandalone(displayMode.matches || Boolean(navigator.standalone));

    updateConnection();
    updateDisplayMode();
    window.addEventListener('online', updateConnection);
    window.addEventListener('offline', updateConnection);
    displayMode.addEventListener?.('change', updateDisplayMode);

    const inspectServiceWorker = async () => {
      if (!('serviceWorker' in navigator)) {
        setSwStatus('Este navegador não oferece Service Worker. O site continua utilizável enquanto houver conexão.');
        return;
      }

      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (cancelled) return;
        if (navigator.serviceWorker.controller) {
          setSwStatus('Service worker ativo nesta página. A navegação principal e recursos já armazenados podem funcionar offline.');
        } else if (registration) {
          setSwStatus('Service worker registrado, mas ainda não controla esta página. Recarregue para concluir a ativação.');
        } else {
          setSwStatus('O service worker ainda não foi registrado neste navegador.');
        }
      } catch {
        if (!cancelled) setSwStatus('Não foi possível consultar o armazenamento offline agora.');
      }
    };

    inspectServiceWorker();

    return () => {
      cancelled = true;
      window.removeEventListener('online', updateConnection);
      window.removeEventListener('offline', updateConnection);
      displayMode.removeEventListener?.('change', updateDisplayMode);
    };
  }, [isOpen]);

  const handleReloadCache = async () => {
    setIsUpdating(true);
    try {
      if (!('serviceWorker' in navigator)) {
        setSwStatus('Este navegador não oferece atualização offline por Service Worker.');
        return;
      }

      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) {
        setSwStatus('O service worker ainda não foi registrado. Reabra esta opção após navegar pela aplicação.');
        return;
      }

      await registration.update();
      const waitingWorker = registration.waiting || await waitForWaitingWorker(registration);

      if (!waitingWorker) {
        setSwStatus('Nenhuma atualização pendente foi encontrada. Você já está usando a versão disponível.');
        return;
      }

      setSwStatus('Atualização encontrada. Ativando a nova versão…');
      await activateWaitingWorker(waitingWorker);
      window.location.reload();
    } catch {
      setSwStatus('Não foi possível verificar atualizações agora. Tente novamente quando a conexão estiver estável.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
        style={triggerStyle(Boolean(className))}
        aria-haspopup="dialog"
      >
        {label}
      </button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Instalar MonitorSmith"
        description="A instalação PWA cria um atalho dedicado; o conteúdo offline depende do cache disponível."
        size="lg"
        closeLabel="Fechar instruções de instalação"
      >
        <div style={{ display: 'grid', gap: '18px', color: 'rgba(255,255,255,0.82)', fontSize: '0.88rem', lineHeight: 1.65 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BrandLogo size={34} />
            <span style={{ color: '#f59e0b', fontFamily: 'monospace', fontSize: '0.76rem' }}>
              PWA · {isStandalone ? 'ABERTO COMO APP' : 'ABERTO NO NAVEGADOR'}
            </span>
          </div>

          <section style={{ padding: '16px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', background: 'rgba(255,255,255,0.03)' }} aria-labelledby="pwa-status-title">
            <h3 id="pwa-status-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 8px', color: '#fff', fontSize: '0.94rem' }}>
              <HardDrives aria-hidden="true" size={18} color="#f59e0b" />
              Estado local
            </h3>
            <p role="status" aria-live="polite" style={{ margin: 0, color: 'rgba(255,255,255,0.72)', fontSize: '0.83rem' }}>
              <strong>Conexão:</strong> {isOnline ? 'online' : 'offline'}. {swStatus}
            </p>
          </section>

          <section aria-labelledby="pwa-install-title">
            <h3 id="pwa-install-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 8px', color: '#fff', fontSize: '0.94rem' }}>
              <DeviceMobile aria-hidden="true" size={18} color="#f59e0b" weight="fill" />
              Como instalar
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'rgba(255,255,255,0.72)', fontSize: '0.84rem' }}>
              <li><strong>Chrome, Edge e navegadores compatíveis:</strong> use o ícone de instalação na barra de endereços ou a opção “Instalar aplicativo” do menu.</li>
              <li><strong>iPhone e iPad:</strong> no Safari, abra Compartilhar e escolha “Adicionar à Tela de Início”.</li>
              <li><strong>Android:</strong> abra o menu do navegador e escolha “Instalar aplicativo” ou “Adicionar à tela inicial”.</li>
            </ul>
          </section>

          <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
            Para preparar melhor o uso sem rede, abra online cada ferramenta de que pretende
            precisar. Fontes, anúncios e recursos externos podem não estar disponíveis offline.
          </p>

          <Button
            fullWidth
            icon={<ArrowClockwise size={18} />}
            loading={isUpdating}
            loadingLabel="Verificando atualização"
            onClick={handleReloadCache}
          >
            Verificar atualização
          </Button>
        </div>
      </Modal>
    </>
  );
}
