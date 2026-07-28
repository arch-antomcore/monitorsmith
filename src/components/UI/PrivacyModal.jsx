import { useState, useRef, useEffect } from 'react';
import { X } from '@phosphor-icons/react';
import BrandLogo from './BrandLogo';

export default function PrivacyModal({ label = "Política de Privacidade (Privacy)", className }) {
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
          color: 'rgba(255, 255, 255, 0.45)',
          fontSize: '0.72rem',
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
          aria-labelledby="privacy-dialog-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(0, 0, 0, 0.82)',
            backdropFilter: 'blur(12px)',
            display: 'grid',
            placeItems: 'center',
            padding: '20px',
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              background: '#0c0f16',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
              position: 'relative',
              color: '#ffffff',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Fechar política de privacidade"
              onClick={() => setIsOpen(false)}
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <BrandLogo size={32} />
              <h2 id="privacy-dialog-title" style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600, color: '#ffffff' }}>Política de Privacidade & Termos</h2>
            </div>

            <div style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p>
                <strong>MonitorSmith por EXVORN.TECH</strong> respeita a privacidade de todos os visitantes. Esta política descreve como as informações são tratadas em nosso site <code>monitorsmith.app</code>.
              </p>

              <h3 style={{ margin: '8px 0 4px', fontSize: '0.95rem', color: '#ffffff' }}>1. Coleta de Dados e Cookies</h3>
              <p>
                O MonitorSmith funciona como uma aplicação web nativa no navegador. Não armazenamos informações pessoais identificáveis em nossos servidores. Configurações de preferências são armazenadas localmente no seu dispositivo via <code>localStorage</code>.
              </p>

              <h3 style={{ margin: '8px 0 4px', fontSize: '0.95rem', color: '#ffffff' }}>2. Anúncios de Terceiros e Google AdSense</h3>
              <p>
                Utilizamos fornecedores de terceiros, incluindo o Google, que usam cookies para veicular anúncios com base em visitas anteriores dos usuários a este ou a outros sites. O uso de cookies de publicidade pelo Google permite que ele e seus parceiros veiculem anúncios aos usuários com base na visita a seus sites e/ou a outros sites na Internet.
              </p>

              <h3 style={{ margin: '8px 0 4px', fontSize: '0.95rem', color: '#ffffff' }}>3. Opção de Desativação</h3>
              <p>
                Os usuários podem desativar a publicidade personalizada acessando as <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#f59e0b', textDecoration: 'underline' }}>Configurações de Anúncios do Google</a>.
              </p>

              <h3 style={{ margin: '8px 0 4px', fontSize: '0.95rem', color: '#ffffff' }}>4. Contato</h3>
              <p>
                Dúvidas ou suporte técnico: <strong>suporte@exvorn.tech</strong>.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="wbp-button"
              style={{
                width: '100%',
                marginTop: '24px',
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
              Fechar
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
