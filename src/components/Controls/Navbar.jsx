import {
  ArrowLeft,
  Broom,
  ChatTeardropText,
  Clock,
  Compass,
  CornersIn,
  CornersOut,
  EyeSlash,
  GridFour,
  House,
  Lightning,
  Moon,
  Palette,
  Question,
  Sparkle,
  SunDim,
  Timer,
  X,
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import Button, { joinClasses } from '../UI/Button';
import { MODE_PRESENTATION, getModePresentation } from '../../constants/shortcuts';

export function ControlIcon({ name, size = 18, title }) {
  const defaultWeight = 'duotone';

  let IconComponent;
  let weight = defaultWeight;

  switch (name) {
    case 'arrowLeft':
      IconComponent = ArrowLeft;
      weight = 'bold';
      break;
    case 'home':
      IconComponent = House;
      weight = 'duotone';
      break;
    case 'fullscreen':
      IconComponent = CornersOut;
      weight = 'bold';
      break;
    case 'minimize':
      IconComponent = CornersIn;
      weight = 'bold';
      break;
    case 'wake':
      IconComponent = Lightning;
      weight = 'fill';
      break;
    case 'help':
      IconComponent = Question;
      weight = 'duotone';
      break;
    case 'hideUi':
      IconComponent = EyeSlash;
      weight = 'duotone';
      break;
    case 'close':
    case 'x':
      IconComponent = X;
      weight = 'bold';
      break;
    case 'void':
      IconComponent = Moon;
      weight = 'duotone';
      break;
    case 'sun':
      IconComponent = SunDim;
      weight = 'duotone';
      break;
    case 'cleaner':
      IconComponent = Broom;
      weight = 'duotone';
      break;
    case 'pixels':
      IconComponent = GridFour;
      weight = 'duotone';
      break;
    case 'calibration':
      IconComponent = Compass;
      weight = 'duotone';
      break;
    case 'timer':
      IconComponent = Timer;
      weight = 'duotone';
      break;
    case 'clock':
      IconComponent = Clock;
      weight = 'duotone';
      break;
    case 'message':
      IconComponent = ChatTeardropText;
      weight = 'duotone';
      break;
    case 'color':
      IconComponent = Palette;
      weight = 'duotone';
      break;
    case 'spark':
      IconComponent = Sparkle;
      weight = 'duotone';
      break;
    default:
      IconComponent = Sparkle;
      weight = 'duotone';
  }

  return (
    <span className="wbp-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      {title ? <span className="sr-only">{title}</span> : null}
      <IconComponent size={size} weight={weight} aria-hidden={title ? undefined : true} />
    </span>
  );
}

function BrandLogoIcon({ size = 30 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      style={{ display: 'block', flexShrink: 0, borderRadius: '9px', boxShadow: '0 0 14px rgba(201, 247, 255, 0.25)' }}
    >
      <rect width="64" height="64" rx="18" fill="#090a0f" />
      <rect x="8.5" y="8.5" width="47" height="47" rx="13.5" stroke="#FFFFFF" strokeOpacity=".3" />
      <path d="M17 45V20l15 16 15-16v25" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 48h30" stroke="#C9F7FF" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar({
  currentMode,
  activeMode,
  onSelectMode,
  onToggleFullscreen,
  onHideUi,
  isFullscreen = false,
  onToggleWakeLock,
  isWakeLockActive = false,
  onOpenHelp,
  onBrandClick,
  visible = true,
  brandName = 'MonitorSmith',
  productName = 'by EXVORN.TECH',
  brandMark = 'M',
  status,
  className,
}) {
  const mode = getModePresentation(currentMode ?? activeMode);
  const showModeContext = mode.id !== 'home';
  const hiddenTabIndex = visible ? undefined : -1;
  const wakeLockLabel = isWakeLockActive ? 'Tela sempre ligada (clique para desativar)' : 'Evitar que a tela apague (Manter tela ligada)';
  const fullscreenLabel = isFullscreen ? 'Sair da tela cheia (Esc ou F)' : 'Ocupar 100% da tela / Tela cheia (F)';

  return (
    <motion.header
      className={joinClasses('wbp-navbar', !visible && 'is-idle-hidden', className)}
      aria-label={`Barra de controle do ${brandName}, ${productName}`}
      aria-hidden={!visible}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ x: '-50%', pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className="wbp-navbar__identity">
        {showModeContext && onBrandClick ? (
          <button
            className="wbp-navbar__back-btn"
            type="button"
            onClick={onBrandClick}
            tabIndex={hiddenTabIndex}
            aria-label="Voltar às ferramentas (H)"
            title="Voltar às ferramentas (H)"
          >
            <ControlIcon name="arrowLeft" size={17} />
          </button>
        ) : null}

        {onBrandClick ? (
          <button
            className="wbp-navbar__brand wbp-navbar__brand--button"
            type="button"
            onClick={onBrandClick}
            tabIndex={hiddenTabIndex}
            aria-label="Voltar às ferramentas"
          >
            <BrandLogoIcon size={30} />
            <div className="wbp-navbar__title-block">
              <span className="wbp-navbar__brand-name">MONITORSMITH</span>
              <span className="wbp-navbar__brand-tag">EXVORN.TECH</span>
            </div>
          </button>
        ) : (
          <div className="wbp-navbar__brand">
            <BrandLogoIcon size={30} />
            <div className="wbp-navbar__title-block">
              <span className="wbp-navbar__brand-name">MONITORSMITH</span>
              <span className="wbp-navbar__brand-tag">EXVORN.TECH</span>
            </div>
          </div>
        )}

      </div>

      <nav className="wbp-navbar__actions" aria-label="Ações rápidas">
        <Button
          className="wbp-navbar__action"
          variant="ghost"
          size="sm"
          icon={<ControlIcon name={isFullscreen ? 'minimize' : 'fullscreen'} size={16} />}
          aria-label={fullscreenLabel}
          title={fullscreenLabel}
          onClick={onToggleFullscreen}
          disabled={!onToggleFullscreen}
          tabIndex={hiddenTabIndex}
        />
        {onHideUi && showModeContext ? (
          <Button
            className="wbp-navbar__action wbp-navbar__action--close"
            variant="ghost"
            size="sm"
            icon={<ControlIcon name="x" size={16} />}
            aria-label="Ocultar barras e interface (Modo imersivo)"
            title="Ocultar barras e controles (×)"
            onClick={onHideUi}
            tabIndex={hiddenTabIndex}
          />
        ) : null}
        <Button
          className="wbp-navbar__action wbp-navbar__action--shortcuts"
          variant="ghost"
          size="sm"
          icon={<ControlIcon name="help" size={16} />}
          aria-label="Abrir atalhos de teclado"
          title="Atalhos de teclado (? / K)"
          onClick={onOpenHelp}
          disabled={!onOpenHelp}
          tabIndex={hiddenTabIndex}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em' }}>ATALHOS [K]</span>
        </Button>
      </nav>
    </motion.header>
  );
}
