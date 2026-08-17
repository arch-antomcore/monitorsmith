import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

import AdSenseUnit from '../UI/AdSenseUnit';
import { FooterSection } from '../UI/FooterSection';
import { FaqAccordion } from '../UI/FaqAccordion';
import { ControlIcon } from '../Controls/Navbar';
import { HERO_GRID_TOOLS, TOOL_LIBRARY } from '../../constants/tools';
import HeroSection from './HeroSection';

const handleCardMouseMove = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  gsap.to(card, {
    rotationY: x * 0.035,
    rotationX: -y * 0.035,
    transformPerspective: 800,
    ease: 'power2.out',
    duration: 0.35,
  });
};

const handleCardMouseLeave = (e) => {
  gsap.to(e.currentTarget, {
    rotationY: 0,
    rotationX: 0,
    ease: 'power3.out',
    duration: 0.5,
  });
};

const FAQ_DATA = [
  {
    id: 1,
    question: "Como testar se o monitor tem dead pixel ou pixel preso?",
    answer: "Abra o teste de pixels em tela cheia e alterne entre as cores. Pixels que não mudam ou permanecem apagados podem estar defeituosos.",
  },
  {
    id: 2,
    question: "Este teste funciona em OLED e LCD?",
    answer: "Sim, funciona em ambos. Em OLED ajuda a observar retenção de imagem, em LCD ajuda com pixels, vazamento de luz e uniformidade.",
  },
  {
    id: 3,
    question: "Como a ferramenta de tela preta reduz o consumo de energia?",
    answer: "Em painéis OLED, conteúdo escuro pode reduzir o consumo de energia. O efeito depende do brilho e do painel.",
  },
  {
    id: 4,
    question: "Preciso instalar algo para usar o MonitorSmith?",
    answer: "Não. Funciona direto no navegador. Se preferir, pode instalar como app para acesso offline.",
  },
  {
    id: 5,
    question: "Como verificar vazamento de luz (backlight bleed)?",
    answer: "Em um ambiente escuro, abra o modo de tela preta absoluta em tela cheia (tecla F). Observe as bordas e os cantos da tela em busca de áreas esbranquiçadas, amareladas ou vazamento excessivo da iluminação traseira.",
  },
];

export { HERO_GRID_TOOLS, TOOL_LIBRARY };


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
    <motion.div
      className={`ms-tool-card ms-tool-card--${tool.tone}`}
      id={`monitor-tool-grid-${tool.id}`}
      onMouseMove={handleCardMouseMove}
      onMouseLeave={handleCardMouseLeave}
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
              <span className="ms-tool-card__badge">{tool.badge}</span>
            ) : null}
          </span>
          <span className="ms-card__meta">
            <span className="ms-card__led" title="Disponível no navegador" />
            <kbd className="ms-card__kbd">{tool.shortcut || '—'}</kbd>
          </span>
        </span>

        {/* Description */}
        <span className="ms-card__desc">{tool.description}</span>

        {/* CTA link — "ABRIR" + bouncing arrow */}
        <button 
          type="button"
          onClick={() => onLaunch(tool.id, `monitor-tool-grid-${tool.id}`)}
          className="ms-card__cta"
          aria-label={`Abrir ${tool.title}. ${tool.description}`}
          style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', padding: 0, cursor: 'pointer', textAlign: 'left' }}
        >
          <span style={{ position: 'absolute', inset: 0, zIndex: 1 }} aria-hidden="true" />
          ABRIR
          <motion.span className="ms-card__cta-arrow" variants={arrowAnimation}>
            →
          </motion.span>
        </button>
        
        {/* SEO Guide link if available */}
        {tool.seoSlug && (
          <a href={`/${tool.seoSlug}/`} onClick={(e) => e.stopPropagation()} className="ms-card__guide-link" style={{ fontSize: '0.8rem', color: '#fbbf24', textDecoration: 'underline', marginTop: '8px', padding: '4px 0', minHeight: '24px', display: 'inline-flex', alignItems: 'center', position: 'relative', zIndex: 10 }}>
            Ler guia completo
          </a>
        )}
      </div>

      {/* Decorative floating icon — large, positioned bottom-right like reference imgSrc */}
      <motion.span
        className="ms-card__decor"
        variants={imageAnimation}
        aria-hidden="true"
      >
        <ControlIcon name={tool.icon} size={72} />
      </motion.span>
    </motion.div>
  );
}

export default function ToolLibrary({ onLaunch, returnFocusRequest = 0, onReturnFocus }) {
  useEffect(() => {
    if (returnFocusRequest > 0) {
      onReturnFocus?.(returnFocusRequest);
    }
  }, [onReturnFocus, returnFocusRequest]);

  const scrollToTools = () => {
    document.getElementById('monitor-tools')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <main id="monitor-tools-home" className="ms-library" tabIndex={-1}>

      <HeroSection onScrollToTools={scrollToTools} />

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



      {/* Seção Sobre */}
      <section className="ms-library__section ms-seo-about" aria-labelledby="about-title">
        <div className="ms-library__section-heading">
          <div>
            <p className="ms-library__eyebrow">SOBRE</p>
            <h2 id="about-title">O que é o MonitorSmith?</h2>
          </div>
        </div>
        <div className="ms-seo-text text-white/80" style={{ maxWidth: '780px', margin: '0 auto', padding: '0 20px', lineHeight: 1.7, fontSize: '0.95rem' }}>
          <p>
            O MonitorSmith reúne ferramentas para inspeção visual de displays, iluminação de apoio e produtividade. Funciona no navegador, sem cadastro.
          </p>
        </div>
      </section>

      {/* FAQ */}
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
          />
        </div>
      </section>

      <FooterSection onLaunch={onLaunch} />
    </main>
  );
}
