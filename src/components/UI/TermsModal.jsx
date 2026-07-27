import { useState, useRef, useEffect } from 'react';
import { X, FileText, Gavel, CheckCircle } from '@phosphor-icons/react';

export default function TermsModal({ label = "Termos de Uso (Terms)", className }) {
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
          aria-labelledby="terms-dialog-title"
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
              border: '1px solid rgba(96, 165, 250, 0.35)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.9), 0 0 30px rgba(96, 165, 250, 0.1)',
              position: 'relative',
              color: '#ffffff',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Fechar janela de Termos"
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
              <div style={{ padding: '10px', borderRadius: '14px', background: 'rgba(96, 165, 250, 0.15)', border: '1px solid rgba(96, 165, 250, 0.3)' }}>
                <FileText size={28} color="#60a5fa" weight="bold" />
              </div>
              <div>
                <h2 id="terms-dialog-title" style={{ margin: 0, fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff' }}>
                  Termos de Serviço & Uso
                </h2>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#60a5fa', fontFamily: 'monospace' }}>
                  EXVORN.TECH — MONITORSMITH SUITE
                </p>
              </div>
            </div>

            <div style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.82)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '0.96rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={18} color="#60a5fa" weight="fill" /> 1. Licença e Uso Gratuito
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                  O MonitorSmith é disponibilizado gratuitamente pela <strong>EXVORN.TECH</strong> para uso pessoal, educacional, comercial e em assistências técnicas. Não é permitida a redistribuição cobrada, engenharia reversa para clonagem comercial não autorizada ou revenda do software.
                </p>
              </div>

              <div>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '0.96rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Gavel size={18} color="#60a5fa" weight="fill" /> 2. Diagnósticos Visuais e Isenção de Garantias
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                  As ferramentas visuais (teste de dead pixels, tela preta OLED, uniformidade e calibração de cor) são fornecidas "como estão" ("as is"), servindo como instrumentos de auxílio técnico e inspeção humana. A acurácia percebida pode variar conforme o painel, placa de vídeo, perfil de cor do sistema operativo e iluminação do ambiente.
                </p>
              </div>

              <div>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '0.96rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={18} color="#60a5fa" weight="fill" /> 3. Operação Local e Segurança PWA
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                  Ao utilizar nossas ferramentas, você concorda que o processamento de imagens, geração de ruídos e temporizadores ocorre de forma 100% isolada e local na memória do seu dispositivo (client-side). O sistema não realiza gravação remota, rastreamento de digitação ou exfiltração de telas.
                </p>
              </div>

              <div>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '0.96rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Gavel size={18} color="#60a5fa" weight="fill" /> 4. Propriedade Intelectual
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                  A marca MonitorSmith, seu design system estrutural (Studio Hardware UI) e arquitetura são de titularidade da <strong>EXVORN.TECH</strong>. O uso contínuo da plataforma implica na aceitação integral e irrestrita destes termos.
                </p>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontFamily: 'monospace' }}>
                ATUALIZADO EM JULHO DE 2026 — EXVORN.TECH
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
