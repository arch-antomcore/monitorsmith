import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import Button from '../UI/Button';
import GlassCard from '../UI/GlassCard';
import DotPattern from '../UI/DotPattern';
import FlowButton from '../UI/FlowButton';
import AdSenseUnit from '../UI/AdSenseUnit';
import { ControlIcon } from '../Controls/Navbar';

const TOOL_LIBRARY = [
  {
    id: 'black',
    category: 'Ver e cuidar',
    title: 'Tela preta',
    description: 'Preencha a tela com preto absoluto.',
    when: 'Para reduzir luz e remover distrações.',
    icon: 'void',
    shortcut: 'B',
    tone: 'void',
  },
  {
    id: 'dead-pixel',
    category: 'Ver e cuidar',
    title: 'Teste visual de pixels',
    description: 'Percorra cores sólidas e encontre pontos suspeitos no painel.',
    when: 'Para uma inspeção visual rápida.',
    icon: 'pixels',
    shortcut: '—',
    tone: 'pixel',
  },
  {
    id: 'cleaner',
    category: 'Ver e cuidar',
    title: 'Inspeção para limpeza',
    description: 'Alto contraste para revelar poeira, marcas e manchas.',
    when: 'Para preparar o painel antes da limpeza física.',
    icon: 'cleaner',
    shortcut: 'C',
    tone: 'clean',
  },
  {
    id: 'calibration',
    category: 'Ver e cuidar',
    title: 'Verificação visual',
    description: 'Padrões de escala, cor, nitidez e gama para inspecionar a imagem.',
    when: 'Para conferir o comportamento do display.',
    icon: 'calibration',
    shortcut: 'G',
    tone: 'calibration',
  },
  {
    id: 'white',
    category: 'Cor e iluminação',
    title: 'Luz suave',
    description: 'Uma tela clara com temperatura visual e intensidade ajustáveis.',
    when: 'Para chamadas, gravações e luz de apoio.',
    icon: 'sun',
    shortcut: 'W',
    tone: 'light',
  },
  {
    id: 'color',
    category: 'Cor e iluminação',
    title: 'Estúdio de cor',
    description: 'Preencha a tela com uma cor livre ou um preset.',
    when: 'Para ambientação, prévia visual e cenários.',
    icon: 'color',
    shortcut: 'S',
    tone: 'color',
  },
  {
    id: 'green-screen',
    launchMode: 'color',
    color: '#00B140',
    brightness: 100,
    category: 'Atalho de cor',
    title: 'Tela verde',
    description: 'Verde sólido para chroma.',
    when: 'Para composição de vídeo em um painel uniforme.',
    icon: 'color',
    shortcut: '—',
    tone: 'green',
  },
  {
    id: 'focus-timer',
    category: 'Tempo e presença',
    title: 'Foco',
    description: 'Um timer discreto para ciclos de concentração.',
    when: 'Para trabalho profundo e pausas.',
    icon: 'timer',
    shortcut: 'P',
    tone: 'focus',
  },
  {
    id: 'clock',
    category: 'Tempo e presença',
    title: 'Relógio',
    description: 'Hora e data legíveis para uma tela secundária.',
    when: 'Para mesas, estúdios e salas.',
    icon: 'clock',
    shortcut: 'T',
    tone: 'clock',
  },
  {
    id: 'message',
    category: 'Tempo e presença',
    title: 'Mensagem em tela',
    description: 'Exiba um recado em escala de sala.',
    when: 'Para status, recepção e comunicação visual.',
    icon: 'message',
    shortcut: 'M',
    tone: 'message',
  },
];

function ToolPreview({ tool }) {
  return <ControlIcon name={tool.icon} size={24} />;
}

function ToolCard({ tool, index, onLaunch }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      className={`ms-tool-card ms-tool-card--${tool.tone}`}
      id={`monitor-tool-${tool.id}`}
      onClick={() => onLaunch(tool, `monitor-tool-${tool.id}`)}
      aria-label={`Abrir ${tool.title}. ${tool.description}`}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay: shouldReduceMotion ? 0 : Math.min(index, 8) * 0.04,
      }}
    >
      <span className="ms-tool-card__icon-wrap">
        <ToolPreview tool={tool} />
      </span>
      <strong className="ms-tool-card__title">{tool.title}</strong>
      <span className="ms-tool-card__desc">{tool.description}</span>
    </motion.button>
  );
}

export const HERO_GRID_TOOLS = [
  {
    id: 'black',
    title: 'Tela Preta',
    icon: 'void',
    shortcut: 'B',
    desc: 'Preencha a tela com preto absoluto — reduza luz, oculte distrações e proteja painéis OLED.',
  },
  {
    id: 'dead-pixel',
    title: 'Teste de Pixels',
    icon: 'pixels',
    shortcut: 'G',
    desc: 'Percorra 8 cores sólidas e identifique subpixels mortos, presos ou com vazamento no painel.',
  },
  {
    id: 'cleaner',
    title: 'Inspeção para Limpeza',
    icon: 'cleaner',
    shortcut: 'C',
    desc: 'Alto contraste para revelar poeira, marcas de dedo e variações de superfície antes da limpeza.',
  },
  {
    id: 'white',
    title: 'Luz Suave',
    icon: 'sun',
    shortcut: 'W',
    desc: 'Iluminação neutra com temperatura e intensidade ajustáveis para chamadas e gravações.',
  },
  {
    id: 'focus-timer',
    title: 'Timer de Foco',
    icon: 'timer',
    shortcut: 'P',
    desc: 'Cronômetro discreto com ciclos de concentração, presets e alarme sonoro nativo.',
  },
  {
    id: 'clock',
    title: 'Relógio de Tela',
    icon: 'clock',
    shortcut: 'T',
    badge: 'Analógico',
    desc: 'Hora e data legíveis em tempo real para monitor secundário, mesas e estúdios.',
  },
];

function HeroGridCard({ tool, index, onLaunch, shouldReduceMotion }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 28,
        delay: shouldReduceMotion ? 0 : 0.12 + index * 0.05,
      }}
    >
      <button
        type="button"
        className="ms-hero-grid-card"
        onClick={() => onLaunch(tool.id, `monitor-tool-${tool.id}`)}
        onMouseMove={handleMouseMove}
        aria-label={`Abrir ${tool.title}`}
        style={{
          '--mouse-x': `${mousePos.x}%`,
          '--mouse-y': `${mousePos.y}%`,
        }}
      >
        {/* Spotlight light that follows cursor */}
        <span className="ms-hero-grid-card__spotlight" aria-hidden="true" />

        <span className="ms-hero-grid-card__head">
          <span className="ms-hero-grid-card__icon">
            <ControlIcon name={tool.icon} size={24} />
          </span>
          <span className="ms-hero-grid-card__titles">
            <strong>{tool.title}</strong>
            {tool.badge ? (
              <span className="ms-hero-grid-card__badge">{tool.badge}</span>
            ) : null}
          </span>
          <kbd className="ms-hero-grid-card__kbd">{tool.shortcut}</kbd>
        </span>

        <span className="ms-hero-grid-card__desc">{tool.desc}</span>
      </button>
    </motion.div>
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
        <DotPattern cx={1} cy={1} cr={1} />

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
            Seu monitor é <span className="ms-hero__title-gradient">mais do que uma tela</span>.
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

      <footer className="ms-library__footer">
        <span>MONITORSMITH</span>
        <span>EXVORN.TECH</span>
      </footer>
    </main>
  );
}
