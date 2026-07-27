import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import Button from '../UI/Button';
import GlassCard from '../UI/GlassCard';
import DotPattern from '../UI/DotPattern';
import FlowButton from '../UI/FlowButton';
import AdSenseUnit from '../UI/AdSenseUnit';
import { FooterSection } from '../UI/FooterSection';
import { FaqAccordion } from '../UI/FaqAccordion';
import { ControlIcon } from '../Controls/Navbar';
import { HERO_GRID_TOOLS, TOOL_LIBRARY } from '../../constants/tools';

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
    answer: "Sim. Em monitores OLED, ajuda a identificar burn-in e retenção de imagem. Em LCD (IPS, VA, TN), detecta pixels presos, vazamento de luz (backlight bleed) e uniformidade do painel.",
    icon: "🖥️",
    iconPosition: "left",
  },
  {
    id: 3,
    question: "O teste funciona no celular ou tablet?",
    answer: "Sim, desde que o navegador entre em tela cheia corretamente. Funciona em Android e iOS com Chrome, Safari e outros navegadores modernos.",
    icon: "📱",
    iconPosition: "right",
  },
  {
    id: 4,
    question: "O MonitorSmith é gratuito e funciona offline?",
    answer: "100% gratuito, sem cadastro e sem download. Possui suporte a PWA (Progressive Web App) — instale no Windows, macOS, Linux, Android ou iOS para usar totalmente offline.",
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

export { HERO_GRID_TOOLS, TOOL_LIBRARY };


function ToolPreview({ tool }) {
  return <ControlIcon name={tool.icon} size={24} />;
}

/* ── Framer Motion Variants — EXACT values from ServiceCard reference ──
 *
 * CRITICAL: We must use variant LABELS ("initial"/"animate"/"hover") exclusively.
 * Mixing direct initial/animate props with variants BREAKS whileHover propagation
 * to child motion elements. The reference ServiceCard only uses variants + whileHover.
 */

// Decorative floating icon: scale + rotate + translate (enhanced for clear visibility)
const imageAnimation = {
  animate: { scale: 1, rotate: 0, x: 0, transition: { duration: 0.35, ease: 'easeInOut' } },
  hover: {
    scale: 1.15,
    rotate: 6,
    x: 12,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

// Arrow bounce: infinite reverse (identical to reference arrowAnimation)
const arrowAnimation = {
  animate: { x: 0 },
  hover: {
    x: 5,
    transition: { duration: 0.3, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
  },
};

/* ── ToolCard (Library Grid — "Todas as ferramentas") ── */

function ToolCard({ tool, index, onLaunch }) {
  const shouldReduceMotion = useReducedMotion();

  // Card variants with entrance + hover — ALL through the variant system
  const variants = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 26,
        delay: shouldReduceMotion ? 0 : Math.min(index, 10) * 0.055,
      },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.button
      type="button"
      className={`ms-tool-card ms-tool-card--${tool.tone}`}
      id={`monitor-tool-${tool.id}`}
      onClick={() => onLaunch(tool, `monitor-tool-${tool.id}`)}
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
          <span className="ms-card__icon-area">
            <ToolPreview tool={tool} />
          </span>
          <span className="ms-card__titles">
            <strong>{tool.title}</strong>
            {tool.badge ? (
              <span className="ms-hero-grid-card__badge">{tool.badge}</span>
            ) : null}
          </span>
          <span className="ms-card__meta">
            <span className="ms-card__led" title="Hardware Ready" />
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

/* ── HeroGridCard (Hero Section — top 6 featured) ── */

function HeroGridCard({ tool, index, onLaunch, shouldReduceMotion }) {
  const variants = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 26,
        delay: shouldReduceMotion ? 0 : 0.12 + index * 0.055,
      },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.button
      type="button"
      className="ms-hero-grid-card"
      onClick={() => onLaunch(tool.id, `monitor-tool-${tool.id}`)}
      aria-label={`Abrir ${tool.title}`}
      variants={variants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
    >
      {/* Content layer */}
      <div className="ms-card__content">
        <span className="ms-card__head">
          <span className="ms-card__icon-area">
            <ControlIcon name={tool.icon} size={24} />
          </span>
          <span className="ms-card__titles">
            <strong>{tool.title}</strong>
            {tool.badge ? (
              <span className="ms-hero-grid-card__badge">{tool.badge}</span>
            ) : null}
          </span>
          <span className="ms-card__meta">
            <span className="ms-card__led" title="Hardware Ready" />
            <kbd className="ms-card__kbd">{tool.shortcut}</kbd>
          </span>
        </span>

        <span className="ms-card__desc">{tool.desc}</span>

        <span className="ms-card__cta">
          ABRIR
          <motion.span className="ms-card__cta-arrow" variants={arrowAnimation}>
            →
          </motion.span>
        </span>
      </div>

      {/* Decorative floating icon */}
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
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (returnFocusRequest > 0) {
      onReturnFocus?.(returnFocusRequest);
    }
  }, [onReturnFocus, returnFocusRequest]);

  const scrollToTools = () => {
    document.getElementById('monitor-tools')?.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <main id="monitor-tools-home" className="ms-library" tabIndex={-1} aria-labelledby="library-title">
      {/* Desktop Side Skyscraper Ads */}
      <AdSenseUnit format="vertical" className="ms-side-ad-gutter ms-side-ad-gutter--left" style={{ width: '160px', minHeight: '600px' }} />
      <AdSenseUnit format="vertical" className="ms-side-ad-gutter ms-side-ad-gutter--right" style={{ width: '160px', minHeight: '600px' }} />

      <section className="ms-hero" aria-describedby="library-description">
        {/* SVG Dot Pattern Background */}
        <DotPattern
          cy={1}
          cr={1}
          cx={1}
          className="[mask-image:radial-gradient(700px_circle_at_50%_40%,white_20%,transparent_85%)]"
        />

        <motion.div
          className="ms-hero__content"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="ms-hero__eyebrow">
            <span className="ms-hero__brand-tag">EXVORN.TECH</span>
            <span className="ms-hero__dot" aria-hidden="true" />
            <span>O CANIVETE SUÍÇO DEFINITIVO PARA DISPLAYS</span>
          </div>

          <h1 id="library-title" className="ms-hero__title">
            Ferramentas para Testar <span className="ms-hero__title-gradient">Monitor, Pixels e Tela OLED</span>
          </h1>

          <p id="library-description" className="ms-hero__subtitle">
            O canivete suíço em ferramentas para o seu monitor. Alterne para tela preta OLED, diagnostique pixels presos, certifique painéis, use iluminação para chamadas, espelhe teleprompter, gere ruído marrom de foco, entre outras ferramentas.
          </p>
        </motion.div>

        <div className="ms-hero__grid">
          {HERO_GRID_TOOLS.map((tool, index) => (
            <HeroGridCard
              key={tool.id}
              tool={tool}
              index={index}
              onLaunch={onLaunch}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        <div className="ms-flow-btn-wrapper">
          <FlowButton text="Instalar Aplicativo no Windows" />
        </div>

        <AdSenseUnit format="auto" className="ms-ad-slot--hero" style={{ maxWidth: '780px', marginTop: '32px' }} />

        <motion.div
          className="ms-hero__cta"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.5, duration: 0.4 }}
        >
          <button className="ms-hero__scroll-btn" type="button" onClick={scrollToTools}>
            Ver todas as 10 ferramentas <span aria-hidden="true">↓</span>
          </button>
        </motion.div>
      </section>

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

        <AdSenseUnit format="auto" className="ms-ad-slot--leaderboard" style={{ maxWidth: '840px' }} />

        <div className="ms-tool-grid">
          {TOOL_LIBRARY.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} onLaunch={onLaunch} />
          ))}
        </div>
      </section>

      <AdSenseUnit format="auto" className="ms-ad-slot--footer" style={{ maxWidth: '970px', marginBottom: '32px' }} />

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
            O <strong>MonitorSmith</strong> é uma suíte web 100% gratuita de ferramentas para testar monitores, diagnosticar dead pixels, tela preta OLED, vazamento de luz (backlight bleed), burn-in e mais. Desenvolvido pela <strong>EXVORN.TECH</strong>, funciona diretamente no navegador — sem download, sem cadastro e sem instalação.
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
            timestamp="Disponível 24/7 online e offline (PWA)"
          />
        </div>
      </section>

      <FooterSection onLaunch={onLaunch} />
    </main>
  );
}
