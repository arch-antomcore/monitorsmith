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
            <h3 id="privacy-third-parties-title" style={headingStyle}>2. Fontes locais e Google AdSense</h3>
            <p style={{ margin: 0 }}>
              As fontes Outfit e JetBrains Mono são entregues pela própria aplicação. O
              script de validação e, quando aprovado, os anúncios do Google AdSense podem
              transmitir dados técnicos, como endereço IP, navegador e identificadores
              definidos pelo provedor. Anúncios personalizados também podem usar cookies
              quando permitidos. O tratamento feito pelo Google segue suas próprias políticas
              e os controles de consentimento aplicáveis à sua região.
            </p>
          </section>

          <section aria-labelledby="privacy-controls-title">
            <h3 id="privacy-controls-title" style={headingStyle}>3. Seus controles</h3>
            <p style={{ margin: 0 }}>
              Você pode recusar publicidade personalizada quando essa opção for apresentada,
              bloquear cookies no navegador e ajustar anúncios nas{' '}
              <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                configurações Minha Central de Anúncios do Google
              </a>. Bloqueios podem afetar anúncios, mas não devem impedir o uso das
              ferramentas principais.
            </p>
          </section>

          <section aria-labelledby="privacy-rights-title">
            <h3 id="privacy-rights-title" style={headingStyle}>4. Direitos e contato</h3>
            <p style={{ margin: 0 }}>
              Para dúvidas, solicitações de acesso, correção, oposição ou eliminação de dados
              sob a LGPD, utilize o canal de contato publicado em{' '}
              <a href="https://exvorn.tech/" target="_blank" rel="noopener noreferrer" style={linkStyle}>exvorn.tech</a>.
              Como as ferramentas não criam uma conta, talvez seja necessário informar o
              contexto da solicitação para verificarmos se existe algum dado associado.
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
