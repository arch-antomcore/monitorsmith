import { useEffect } from 'react';
import { motion } from 'framer-motion';

import AdSenseUnit from '../UI/AdSenseUnit';
import { FooterSection } from '../UI/FooterSection';
import { FaqAccordion } from '../UI/FaqAccordion';
import { ControlIcon } from '../Controls/Navbar';
import { TOOL_LIBRARY } from '../../constants/tools';
import Hero11 from '../originkit/hero-11';

const FAQ_DATA = [
  {
    id: 1,
    question: "Como testar se o monitor tem dead pixel ou pixel preso?",
    answer: "Abra o teste de pixels em tela cheia e alterne entre preto, branco, vermelho, verde e azul. Pixels que não mudam de cor ou permanecem apagados podem estar defeituosos. O MonitorSmith oferece 8 cores sólidas para inspeção completa.",
    icon: "🎯",
    iconPosition: "right",
  },
  {
    id: 2,
    question: "Este teste funciona em OLED e LCD?",
    answer: "Sim. Em OLED, os padrões ajudam a observar sinais visuais compatíveis com retenção de imagem. Em LCD (IPS, VA, TN), auxiliam a inspeção de pixels, vazamento de luz e uniformidade. O resultado é visual e não substitui medição técnica.",
    icon: "🖥️",
    iconPosition: "left",
  },
  {
    id: 3,
    question: "Como a ferramenta de tela preta reduz o consumo de energia?",
    answer: "Em painéis OLED e AMOLED, pixels pretos ficam totalmente desligados, reduzindo o consumo de energia a zero nessas áreas e eliminando a emissão de luz em ambientes escuros.",
    icon: "🌙",
    iconPosition: "right",
  },
  {
    id: 4,
    question: "Preciso instalar algo para usar o MonitorSmith?",
    answer: "Não. Todas as ferramentas rodam 100% no seu navegador sem cadastro ou download. Você também pode instalar o MonitorSmith como PWA para acesso direto pelo sistema operacional e funcionamento offline.",
    icon: "⚡",
    iconPosition: "left",
  },
  {
    id: 5,
    question: "Como verificar vazamento de luz (backlight bleed)?",
    answer: "Em um ambiente escuro, abra o modo de tela preta absoluta em tela cheia (tecla F). Observe as bordas e os cantos da tela em busca de áreas esbranquiçadas, amareladas ou vazamento excessivo da iluminação traseira.",
    icon: "💡",
    iconPosition: "right",
  },
];

export { TOOL_LIBRARY };


function ToolPreview({ tool }) {
  return <ControlIcon name={tool.icon} size={24} />;
}

/* ── Framer Motion Variants ── */

// Small icon area: subtle scale and rotate for organic feel
const iconMotionVariants = {
  initial: { scale: 1, rotate: 0 },
  animate: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 220, damping: 18 } },
  hover: {
    scale: 1.12,
    rotate: -4,
    transition: { type: 'spring', stiffness: 240, damping: 14 },
  },
};

// Decorative floating icon: scale + rotate + translate (subtle floating zoom)
const imageAnimation = {
  initial: { scale: 1, rotate: 0, x: 0, y: 0 },
  animate: { scale: 1, rotate: 0, x: 0, y: 0, transition: { duration: 0.35, ease: 'easeInOut' } },
  hover: {
    scale: 1.15,
    rotate: 6,
    x: 10,
    y: 4,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

// Arrow bounce: infinite reverse
const arrowAnimation = {
  initial: { x: 0 },
  animate: { x: 0 },
  hover: {
    x: 5,
    transition: { duration: 0.35, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
  },
};

/* ── ToolCard (Library Grid — "Todas as ferramentas") ── */

function ToolCard({ tool, index, onLaunch }) {
  // Card variants with entrance + hover — smooth scale & elevation
  const variants = {
    initial: { opacity: 0, y: 18 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 26,
        delay: Math.min(index, 10) * 0.055,
      },
    },
    hover: {
      scale: 1.03,
      y: -4,
      transition: { type: 'spring', stiffness: 350, damping: 25 },
    },
  };

  return (
    <motion.button
      type="button"
      className={`ms-tool-card ms-tool-card--${tool.tone}`}
      id={`monitor-tool-grid-${tool.id}`}
      onClick={() => onLaunch(tool.id, `monitor-tool-grid-${tool.id}`)}
      aria-label={`Abrir ${tool.title}. ${tool.description}`}
      variants={variants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
    >
      {/* Content layer — above the decorative icon */}
      <div className="ms-card__content">
        {/* Header — small icon · title · LED · kbd */}
        <span className="ms-card__head">
          <motion.span className="ms-card__icon-area" variants={iconMotionVariants}>
            <ToolPreview tool={tool} />
          </motion.span>
          <span className="ms-card__titles">
            <strong>{tool.title}</strong>
            {tool.badge ? (
              <span className="ms-hero-grid-card__badge">{tool.badge}</span>
            ) : null}
          </span>
          <span className="ms-card__meta">
            <span className="ms-card__led" title="Disponível no navegador" />
            <kbd className="ms-card__kbd">{tool.shortcut || '—'}</kbd>
          </span>
        </span>

        {/* Description */}
        <span className="ms-card__desc">{tool.description}</span>

        {/* CTA link — "ABRIR" + bouncing arrow (like "LEARN MORE" in reference) */}
        <span className="ms-card__cta">
          ABRIR
          <motion.span className="ms-card__cta-arrow" variants={arrowAnimation}>
            →
          </motion.span>
        </span>
      </div>

      {/* Decorative floating icon — large, positioned bottom-right like reference imgSrc */}
      <motion.span
        className="ms-card__decor"
        variants={imageAnimation}
        aria-hidden="true"
      >
        <ControlIcon name={tool.icon} size={72} />
      </motion.span>
    </motion.button>
  );
}

export default function ToolLibrary({ onLaunch, returnFocusRequest = 0, onReturnFocus }) {
  useEffect(() => {
    if (returnFocusRequest > 0) {
      onReturnFocus?.(returnFocusRequest);
    }
  }, [onReturnFocus, returnFocusRequest]);

  return (
    <main id="monitor-tools-home" className="ms-library" tabIndex={-1}>
      {/* Desktop Side Skyscraper Ads */}
      <AdSenseUnit placement="sidebar" format="vertical" className="ms-side-ad-gutter ms-side-ad-gutter--left" style={{ width: '160px', minHeight: '600px' }} />
      <AdSenseUnit placement="sidebar" format="vertical" className="ms-side-ad-gutter ms-side-ad-gutter--right" style={{ width: '160px', minHeight: '600px' }} />

      <Hero11 />

      <section className="ms-library__section" id="monitor-tools" aria-labelledby="tools-title">
        <div className="ms-library__section-heading">
          <div>
            <p className="ms-library__eyebrow">FERRAMENTAS</p>
            <h2 id="tools-title">Escolha o que precisa fazer.</h2>
          </div>
          <p>
            Cada ferramenta ocupa a tela; pressione F quando quiser usar tela cheia.
          </p>
        </div>

        <AdSenseUnit placement="library" format="auto" className="ms-ad-slot--leaderboard" style={{ maxWidth: '840px' }} />

        <div className="ms-tool-grid">
          {TOOL_LIBRARY.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} onLaunch={onLaunch} />
          ))}
        </div>
      </section>

      <AdSenseUnit placement="footer" format="auto" className="ms-ad-slot--footer" style={{ maxWidth: '970px', marginBottom: '32px' }} />

      {/* SEO: Seção "O que é" — texto semântico para Google e LLMs */}
      <section className="ms-library__section ms-seo-about" aria-labelledby="about-title">
        <div className="ms-library__section-heading">
          <div>
            <p className="ms-library__eyebrow">SOBRE</p>
            <h2 id="about-title">O que é o MonitorSmith?</h2>
          </div>
        </div>
        <div className="ms-seo-text text-white/80" style={{ maxWidth: '780px', margin: '0 auto', padding: '0 20px', lineHeight: 1.7, fontSize: '0.95rem' }}>
          <p>
            O <strong>MonitorSmith</strong> é uma suíte web gratuita de padrões e utilitários para inspecionar monitores, observar pixels, uniformidade e vazamento de luz, além de preencher a tela com cores e conteúdos úteis. Desenvolvido pela <strong>EXVORN.TECH</strong>, funciona diretamente no navegador, sem cadastro obrigatório.
          </p>
          <p style={{ marginTop: '12px' }}>
            Ideal para quem comprou um monitor novo, quer testar um usado antes de fechar negócio, precisa de uma luz suave para videochamadas, um teleprompter para gravações, ou simplesmente quer um relógio elegante na tela secundária.
          </p>
        </div>
      </section>

      {/* SEO: FAQ interativo e animado — corresponde às intenções de busca e ajuda LLMs a extrair respostas */}
      <section className="ms-library__section ms-seo-faq" aria-labelledby="faq-title">
        <div className="ms-library__section-heading">
          <div>
            <p className="ms-library__eyebrow">PERGUNTAS FREQUENTES</p>
            <h2 id="faq-title">Dúvidas comuns sobre teste de monitor</h2>
          </div>
        </div>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 12px' }}>
          <FaqAccordion
            data={FAQ_DATA}
            timestamp="Disponível no navegador e instalável como PWA"
          />
        </div>
      </section>

      <FooterSection onLaunch={onLaunch} />
    </main>
  );
}
