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
  margin: '6px 0 4px',
  color: 'inherit',
  fontSize: '0.95rem',
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
            Esta política explica o funcionamento atual do site. Ela não transforma
            ferramentas visuais em serviços de coleta: mensagens, cores, temporizadores e
            imagens importadas são processados no dispositivo e não são enviados à
            EXVORN.TECH por essas ferramentas.
          </p>

          <section aria-labelledby="privacy-local-title">
            <h3 id="privacy-local-title" style={headingStyle}>1. Dados armazenados no dispositivo</h3>
            <p style={{ margin: 0 }}>
              O navegador pode usar <code>localStorage</code>, Cache Storage e service worker
              para guardar tema, preferências de interface, estado de avisos e arquivos
              necessários ao PWA. Imagens do Loop de Marcas permanecem apenas na memória da
              aba e são descartadas ao removê-las ou sair da ferramenta. Você pode apagar os
              dados do site nas configurações do navegador.
            </p>
          </section>

          <section aria-labelledby="privacy-third-parties-title">
            <h3 id="privacy-third-parties-title" style={headingStyle}>2. Fornecedores de terceiros e Google AdSense</h3>
            <p style={{ margin: 0 }}>
              Fornecedores de terceiros, incluindo o <strong>Google AdSense</strong>, usam cookies para veicular anúncios com base em visitas anteriores dos usuários a este site ou a outros sites na internet. O uso de cookies de publicidade pelo Google e por seus parceiros permite veicular anúncios para os usuários com base nas visitas feitas a seus sites e/ou a outros sites na internet.
            </p>
            <p style={{ margin: '8px 0 0' }}>
              Para mais detalhes sobre como o Google coleta e processa dados ao utilizar sites parceiros, consulte a página <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={linkStyle}>Como o Google usa dados quando você usa sites ou aplicativos dos nossos parceiros</a>.
            </p>
          </section>

          <section aria-labelledby="privacy-controls-title">
            <h3 id="privacy-controls-title" style={headingStyle}>3. Seus controles e desativação de anúncios</h3>
            <p style={{ margin: 0 }}>
              Os usuários podem optar por desativar a publicidade personalizada acessando as <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={linkStyle}>Configurações de Anúncios do Google</a>. Alternativamente, você pode desativar o uso de cookies de publicidade personalizada de fornecedores de terceiros acessando <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={linkStyle}>www.aboutads.info</a> ou ajustando a Central de Privacidade da sua região.
            </p>
          </section>

          <section aria-labelledby="privacy-rights-title">
            <h3 id="privacy-rights-title" style={headingStyle}>4. Direitos e contato</h3>
            <p style={{ margin: 0 }}>
              Para dúvidas, solicitações de acesso, correção, oposição ou eliminação de dados sob a LGPD, utilize o canal de contato publicado em{' '}
              <a href="https://exvorn.tech/" target="_blank" rel="noopener noreferrer" style={linkStyle}>exvorn.tech</a>. Como as ferramentas rodam localmente no navegador sem cadastro, nenhuma informação pessoal identificável é armazenada em nossos servidores.
            </p>
          </section>

          <p style={{ margin: '6px 0 0', paddingTop: '12px', borderTop: '1px solid var(--ms-border, rgba(128,128,128,0.2))', color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.74rem' }}>
            Última atualização: 28 de julho de 2026.
          </p>
        </div>
      </Modal>
    </>
  );
}
