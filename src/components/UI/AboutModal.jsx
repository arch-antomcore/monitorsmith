import { useState } from 'react';
import LinkedinLogoRegular from '../Icons/LinkedinLogoRegular';
import SparkleFill from '../Icons/SparkleFill';
import BrandLogo from './BrandLogo';
import Modal from './Modal';

const triggerStyle = (hasClassName) => ({
  background: 'none',
  border: 'none',
  color: hasClassName ? undefined : 'var(--text-muted)',
  cursor: 'pointer',
  fontSize: hasClassName ? undefined : '0.75rem',
  textDecoration: hasClassName ? undefined : 'underline',
  textUnderlineOffset: hasClassName ? undefined : '3px',
});

const sectionStyle = {
  padding: '18px',
  border: '1px solid var(--ms-border, rgba(128,128,128,0.2))',
  borderRadius: '16px',
  background: 'var(--ms-surface-dim, rgba(128,128,128,0.08))',
};

export default function AboutModal({ label = 'Sobre o MonitorSmith', className }) {
  const [isOpen, setIsOpen] = useState(false);

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
        title="Sobre o MonitorSmith"
        description="Uma suíte de utilidades visuais da EXVORN.TECH."
        size="lg"
        closeLabel="Fechar informações sobre o MonitorSmith"
      >
        <div style={{ display: 'grid', gap: '20px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <BrandLogo size={38} />
            <p style={{ margin: 0, color: '#f59e0b', fontFamily: 'monospace', fontSize: '0.76rem', letterSpacing: '0.06em' }}>
              EXVORN.TECH · DISPLAY UTILITY SUITE
            </p>
          </div>

          <p style={{ margin: 0 }}>
            O <strong>MonitorSmith</strong> reúne ferramentas para iluminação de apoio,
            sinalização, foco e inspeção visual de displays diretamente no navegador.
            Ele foi criado pela <strong>EXVORN.TECH</strong> para ser rápido, claro e útil
            tanto em casa quanto em estúdios e bancadas técnicas.
          </p>

          <section style={sectionStyle} aria-labelledby="about-privacy-title">
            <h3 id="about-privacy-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 8px', color: 'inherit', fontSize: '0.95rem' }}>
              <SparkleFill aria-hidden="true" width={18} height={18} color="#f59e0b" />
              Como a aplicação funciona
            </h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Os padrões, temporizadores, mensagens e imagens importadas são processados
              localmente nesta aba. As fontes são entregues pela própria aplicação; a
              publicidade pode solicitar conteúdo de serviços externos. A instalação PWA melhora o
              acesso offline, mas a disponibilidade de cada ferramenta depende do que já
              foi armazenado pelo navegador.
            </p>
          </section>

          <section aria-labelledby="about-limits-title">
            <h3 id="about-limits-title" style={{ margin: '0 0 8px', color: 'inherit', fontSize: '0.95rem' }}>
              Inspeção visual, não certificação
            </h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              O MonitorSmith ajuda a observar o painel, mas não substitui colorímetro,
              osciloscópio, câmera de alta velocidade, assistência autorizada ou laudo
              técnico. Navegador, escala, perfil de cor, iluminação e o próprio monitor
              influenciam o que você vê.
            </p>
          </section>

          <a
            href="https://www.linkedin.com/in/matheus-peres-da-silva/"
            target="_blank"
            rel="noopener noreferrer"
            className="wbp-button wbp-button--secondary"
            style={{ justifySelf: 'start', display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'inherit', textDecoration: 'none' }}
          >
            <LinkedinLogoRegular aria-hidden="true" width={20} height={20} color="#60a5fa" />
            LinkedIn do responsável pelo projeto
          </a>

          <p style={{ margin: 0, paddingTop: '14px', borderTop: '1px solid var(--ms-border, rgba(128,128,128,0.2))', color: 'var(--text-muted)', textAlign: 'center', fontFamily: 'monospace', fontSize: '0.75rem' }}>
            © 2026 EXVORN.TECH · TODOS OS DIREITOS RESERVADOS
          </p>
        </div>
      </Modal>
    </>
  );
}
