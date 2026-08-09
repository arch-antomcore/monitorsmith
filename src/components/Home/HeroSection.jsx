import { motion } from 'framer-motion';
import LiquidHover from './LiquidHover';
import SpinCursor from './SpinCursor';
import FlowButton from '../UI/FlowButton';
import '../originkit/hero-11.css';

function asset(file) {
  return `/originkit/hero-11/${file}`;
}

const PORTRAIT_MASK = asset("portrait-mask.svg");
const BACKGROUND_MASK = asset("background-mask.svg");

const portraitMaskStyle = {
  WebkitMaskImage: `url(${PORTRAIT_MASK})`,
  maskImage: `url(${PORTRAIT_MASK})`,
};

const backgroundMaskStyle = {
  WebkitMaskImage: `url(${BACKGROUND_MASK})`,
  maskImage: `url(${BACKGROUND_MASK})`,
};

function keepLastWordsTogether(text, count = 2) {
  const words = text.trim().split(/\s+/);
  if (words.length <= count) {
    return text;
  }
  return `${words.slice(0, -count).join(" ")} ${words.slice(-count).join("\u00a0")}`;
}

function BackgroundArtwork() {
  return (
    <>
      <div className="ok-h11-background">
        <div className="ok-h11-maskedBackgroundLayer" style={backgroundMaskStyle}>
          <img
            alt=""
            className="ok-h11-layerImage"
            src={asset("background-layer-1.svg")}
          />
        </div>
        <div className="ok-h11-backgroundLayer ok-h11-backgroundLayer2">
          <img
            alt=""
            className="ok-h11-layerImage"
            src={asset("background-layer-2.svg")}
          />
        </div>
        <div className="ok-h11-backgroundLayer ok-h11-backgroundLayer3">
          <img
            alt=""
            className="ok-h11-layerImage"
            src={asset("background-layer-3.svg")}
          />
        </div>
        <div className="ok-h11-backgroundLayer ok-h11-backgroundLayer4">
          <img
            alt=""
            className="ok-h11-layerImage"
            src={asset("background-layer-4.svg")}
          />
        </div>
        <div className="ok-h11-backgroundLayer ok-h11-backgroundLayer5">
          <img
            alt=""
            className="ok-h11-layerImage"
            src={asset("background-layer-5.svg")}
          />
        </div>
        <div className="ok-h11-backgroundLayer ok-h11-backgroundLayer6">
          <img
            alt=""
            className="ok-h11-layerImage"
            src={asset("background-layer-6.svg")}
          />
        </div>
      </div>

      <div className="ok-h11-portrait">
        <LiquidHover imageSrc={asset("hero-portrait.png")} style={{ width: '100%', height: '100%' }} intensity={12} />
      </div>
      <SpinCursor fillColor="#FFFFFF" enableGlow={false} />
    </>
  );
}

function CapsuleButton({ onClick, label }) {
  return (
    <button type="button" className="ok-h11-button" onClick={onClick}>
      <span>{label}</span>
      <span className="ok-h11-buttonIcon">
        <img
          alt=""
          height={23}
          src={asset("arrow-up-right.svg")}
          width={23}
        />
      </span>
    </button>
  );
}

export default function HeroSection({ onScrollToTools }) {
  const eyebrow = "EXVORN.TECH · Inspeção · Iluminação · Foco";
  const title = "Ferramentas para usar melhor seu monitor.";
  const description = "Inspecione pixels, ilumine chamadas, exiba mensagens e organize o foco — direto no navegador.";

  return (
    <motion.section
      className="ok-h11-hero"
      aria-label="MonitorSmith Hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <BackgroundArtwork />


      <div className="ok-h11-copy">
        <motion.div 
          className="ok-h11-headingGroup"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="ok-h11-eyebrow">{keepLastWordsTogether(eyebrow)}</p>
          <h1 className="ok-h11-title">{keepLastWordsTogether(title, 3)}</h1>
        </motion.div>
        
        <motion.p 
          className="ok-h11-description"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {keepLastWordsTogether(description)}
        </motion.p>
        
        <motion.div 
          style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '2rem' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <CapsuleButton onClick={onScrollToTools} label="Explorar Ferramentas" />
          <div className="ms-flow-btn-wrapper" style={{ margin: 0 }}>
            <FlowButton text="Instalar MonitorSmith" />
          </div>
        </motion.div>
      </div>

      <aside className="ok-h11-details" aria-label="Service details">
        <div>
          <p className="ok-h11-detailTitle">11 Ferramentas</p>
          <p className="ok-h11-detailLabel">Grátis no navegador</p>
        </div>
        <div>
          <p className="ok-h11-detailTitle">100% Offline</p>
          <p className="ok-h11-detailLabel">Funciona sem internet</p>
        </div>
      </aside>
    </motion.section>
  );
}
