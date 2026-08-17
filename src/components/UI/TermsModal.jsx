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

const sectionStyle = { display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px' };
const titleStyle = { margin: 0, color: 'inherit', fontSize: '0.96rem' };
const paragraphStyle = { margin: '5px 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' };

export default function TermsModal({ label = 'Termos de Uso', className }) {
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
        title="Termos de Uso"
        description="Condições para utilizar as ferramentas do MonitorSmith."
        size="lg"
        closeLabel="Fechar termos de uso"
      >
        <div style={{ display: 'grid', gap: '20px', color: 'var(--text-muted)', lineHeight: 1.65 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BrandLogo size={34} />
            <span style={{ color: '#f59e0b', fontFamily: 'monospace', fontSize: '0.76rem' }}>
              EXVORN.TECH · MONITORSMITH
            </span>
          </div>

          <section style={sectionStyle} aria-labelledby="terms-use-title">
            <div>
              <h3 id="terms-use-title" style={titleStyle}>1. Uso do serviço</h3>
              <p style={paragraphStyle}>
                Você pode usar gratuitamente o site para finalidades pessoais, educacionais
                e profissionais lícitas. Não tente comprometer o serviço, contornar medidas
                de segurança, sobrecarregar a infraestrutura ou usar a marca MonitorSmith de
                forma que sugira vínculo não autorizado com a EXVORN.TECH.
              </p>
            </div>
          </section>

          <section style={sectionStyle} aria-labelledby="terms-diagnostics-title">
            <div>
              <h3 id="terms-diagnostics-title" style={titleStyle}>2. Limites das ferramentas</h3>
              <p style={paragraphStyle}>
                Os padrões oferecem apoio à inspeção humana. Não medem com precisão
                colorimétrica, não identificam a causa de um defeito e não certificam o
                painel. Resultados variam conforme navegador, sistema, GPU, escala, perfil de
                cor, iluminação e equipamento. Procure assistência qualificada quando houver
                risco elétrico, dano físico ou decisão de garantia.
              </p>
            </div>
          </section>

          <section style={sectionStyle} aria-labelledby="terms-safety-title">
            <div>
              <h3 id="terms-safety-title" style={titleStyle}>3. Segurança e conforto</h3>
              <p style={paragraphStyle}>
                Interrompa o uso se perceber desconforto visual, tontura ou mal-estar. Para
                limpeza física, desligue e desconecte o monitor e siga o fabricante. O modo
                de iluminação não controla o brilho elétrico do painel, e pequenos
                deslocamentos de imagem não garantem prevenção de burn-in.
              </p>
            </div>
          </section>

          <section style={sectionStyle} aria-labelledby="terms-availability-title">
            <div>
              <h3 id="terms-availability-title" style={titleStyle}>4. Disponibilidade e terceiros</h3>
              <p style={paragraphStyle}>
                O serviço é fornecido no estado em que se encontra e pode mudar ou ficar
                temporariamente indisponível. Recursos como fontes, hospedagem e publicidade
                podem depender de terceiros sujeitos a termos próprios. Na extensão
                permitida pela lei, a EXVORN.TECH não garante adequação a uma finalidade
                técnica específica.
              </p>
            </div>
          </section>

          <section style={sectionStyle} aria-labelledby="terms-ip-title">
            <div>
              <h3 id="terms-ip-title" style={titleStyle}>5. Propriedade intelectual</h3>
              <p style={paragraphStyle}>
                A marca, a identidade visual e o conteúdo editorial pertencem aos respectivos
                titulares. O acesso ao site não concede licença sobre esses ativos. Quando o
                código-fonte for disponibilizado em um repositório, seu uso e redistribuição
                obedecem à licença declarada naquele repositório.
              </p>
            </div>
          </section>

          <p style={{ margin: 0, paddingTop: '14px', borderTop: '1px solid var(--ms-border, rgba(128,128,128,0.2))', color: 'var(--text-muted)', textAlign: 'center', fontFamily: 'monospace', fontSize: '0.74rem' }}>
            Última atualização: 28 de julho de 2026 · EXVORN.TECH
          </p>
        </div>
      </Modal>
    </>
  );
}
