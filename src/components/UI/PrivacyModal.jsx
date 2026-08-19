import { useState } from 'react';
import BrandLogo from './BrandLogo';
import Modal from './Modal';

const triggerStyle = (hasClassName) => ({
  background: 'none',
  border: 'none',
  color: hasClassName ? undefined : 'var(--text-muted)',
  cursor: 'pointer',
  fontSize: hasClassName ? undefined : '0.72rem',
  textDecoration: hasClassName ? undefined : 'underline',
  textUnderlineOffset: hasClassName ? undefined : '3px',
});

const headingStyle = {
  margin: '8px 0 4px',
  color: 'inherit',
  fontSize: '0.95rem',
  fontWeight: 600,
};

const linkStyle = { color: '#fbbf24', textDecoration: 'underline', textUnderlineOffset: '2px' };

export default function PrivacyModal({ label = 'Política de Privacidade', className }) {
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
        title="Política de Privacidade"
        description="Como o MonitorSmith trata preferências locais e serviços externos."
        size="lg"
        closeLabel="Fechar política de privacidade"
      >
        <div style={{ display: 'grid', gap: '14px', color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.65 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BrandLogo size={32} />
            <p style={{ margin: 0 }}>
              <strong>Controlador:</strong> EXVORN.TECH · <code>monitorsmith.app</code>
            </p>
          </div>

          <p style={{ margin: 0 }}>
            Esta política explica o funcionamento do MonitorSmith. As ferramentas visuais executam localmente no navegador: mensagens, textos do teleprompter, cores, temporizadores e imagens importadas são processados no seu dispositivo e não são transmitidos à EXVORN.TECH.
          </p>

          <section aria-labelledby="privacy-local-title">
            <h3 id="privacy-local-title" style={headingStyle}>1. Dados armazenados no dispositivo</h3>
            <p style={{ margin: 0 }}>
              O navegador utiliza <code>localStorage</code>, Cache Storage e Service Worker para salvar tema, preferências de interface e arquivos necessários ao funcionamento offline do PWA. Imagens importadas no Loop de Marcas permanecem exclusivamente na memória da aba aberta e são descartadas ao sair da ferramenta. Você pode limpar esses dados a qualquer momento nas configurações do seu navegador.
            </p>
          </section>

          <section aria-labelledby="privacy-third-parties-title">
            <h3 id="privacy-third-parties-title" style={headingStyle}>2. Fornecedores de terceiros e Google AdSense</h3>
            <p style={{ margin: 0 }}>
              Fornecedores de terceiros, incluindo o <strong>Google</strong>, usam cookies para veicular anúncios com base em visitas anteriores dos usuários a este site ou a outros sites na internet. O uso de cookies de publicidade pelo Google e por seus parceiros permite veicular anúncios para os usuários com base nas visitas feitas a seus sites e/ou a outros sites na internet.
            </p>
            <p style={{ margin: '8px 0 0' }}>
              Para saber mais sobre como o Google coleta e processa dados em sites parceiros, consulte a página oficial <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={linkStyle}>Como o Google usa dados quando você usa sites ou aplicativos dos nossos parceiros</a>.
            </p>
          </section>

          <section aria-labelledby="privacy-controls-title">
            <h3 id="privacy-controls-title" style={headingStyle}>3. Seus controles e desativação de anúncios</h3>
            <p style={{ margin: 0 }}>
              Os usuários podem optar por desativar a publicidade personalizada acessando as <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={linkStyle}>Configurações de Anúncios do Google</a>. Alternativamente, você pode desativar o uso de cookies de publicidade personalizada de terceiros acessando <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={linkStyle}>www.aboutads.info</a> ou ajustando a Central de Privacidade na sua região.
            </p>
          </section>

          <section aria-labelledby="privacy-rights-title">
            <h3 id="privacy-rights-title" style={headingStyle}>4. Direitos sob a LGPD e contato</h3>
            <p style={{ margin: 0 }}>
              Como as ferramentas operam localmente sem necessidade de cadastro ou coleta de identificadores pessoais em servidores próprios, nenhum perfil pessoal é mantido pela EXVORN.TECH. Para solicitações institucionais ou dúvidas sobre dados sob a LGPD, acesse <a href="https://exvorn.tech/" target="_blank" rel="noopener noreferrer" style={linkStyle}>exvorn.tech</a>.
            </p>
          </section>

          <p style={{ margin: '6px 0 0', paddingTop: '12px', borderTop: '1px solid var(--ms-border, rgba(128,128,128,0.2))', color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.74rem' }}>
            Última atualização: 18 de agosto de 2026.
          </p>
        </div>
      </Modal>
    </>
  );
}

