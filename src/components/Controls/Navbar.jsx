import { useEffect, useState } from 'react';
import { TOOL_COUNT } from '../../constants/tools';
import {
  ArrowLeft as ArrowLeftBold,
  BrushCleaning as BroomDuotone,
  MessageCircleMore as ChatTeardropTextDuotone,
  Clock3 as ClockDuotone,
  Compass as CompassDuotone,
  Minimize as CornersInBold,
  Maximize as CornersOutBold,
  Smartphone as DeviceMobileDuotone,
  EyeOff as EyeSlashDuotone,
  Grid2X2 as GridFourDuotone,
  House as HouseDuotone,
  Zap as LightningFill,
  Moon as MoonDuotone,
  Palette as PaletteDuotone,
  CircleHelp as QuestionDuotone,
  Presentation as SlideshowDuotone,
  Sparkles as SparkleDuotone,
  SunDim as SunDimDuotone,
  Timer as TimerDuotone,
  X as XBold,
  Share2 as ShareNetworkDuotone,
  Info as LucideInfo,
  Gauge as LucideGauge,
  Zap as LucideZap,
  Layers as LucideLayers,
  Contrast as LucideContrast,
  RefreshCw as LucideRefresh,
  Keyboard as LucideKeyboard,
  Mouse as LucideMouse,
  Gamepad2 as LucideGamepad,
  AudioLines as LucideAudio,
  Camera as LucideCamera,
  Calculator as LucideCalculator,
  Ruler as LucideRuler,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../UI/Button';
import { cn } from '../../lib/utils';

import { getModePresentation } from '../../constants/shortcuts';

export function ControlIcon({ name, size = 18, title }) {
  let IconComponent;
  switch (name) {
    case 'arrowLeft':
      IconComponent = ArrowLeftBold;
      break;
    case 'home':
      IconComponent = HouseDuotone;
      break;
    case 'fullscreen':
      IconComponent = CornersOutBold;
      break;
    case 'minimize':
      IconComponent = CornersInBold;
      break;
    case 'wake':
      IconComponent = LightningFill;
      break;
    case 'help':
      IconComponent = QuestionDuotone;
      break;
    case 'hideUi':
      IconComponent = EyeSlashDuotone;
      break;
    case 'close':
    case 'x':
      IconComponent = XBold;
      break;
    case 'void':
      IconComponent = MoonDuotone;
      break;
    case 'sun':
      IconComponent = SunDimDuotone;
      break;
    case 'cleaner':
      IconComponent = BroomDuotone;
      break;
    case 'pixels':
      IconComponent = GridFourDuotone;
      break;
    case 'calibration':
      IconComponent = CompassDuotone;
      break;
    case 'timer':
      IconComponent = TimerDuotone;
      break;
    case 'clock':
      IconComponent = ClockDuotone;
      break;
    case 'message':
      IconComponent = ChatTeardropTextDuotone;
      break;
    case 'color':
      IconComponent = PaletteDuotone;
      break;
    case 'spark':
      IconComponent = SparkleDuotone;
      break;
    case 'sponsor':
      IconComponent = SlideshowDuotone;
      break;
    case 'ppi':
    case 'calculator':
      IconComponent = DeviceMobileDuotone;
      break;
    case 'motion':
    case 'motion-blur':
    case 'ghosting':
      IconComponent = SparkleDuotone;
      break;
    case 'share':
      IconComponent = ShareNetworkDuotone;
      break;
    case 'info':
      IconComponent = LucideInfo;
      break;
    case 'gauge':
      IconComponent = LucideGauge;
      break;
    case 'zap':
      IconComponent = LucideZap;
      break;
    case 'layers':
      IconComponent = LucideLayers;
      break;
    case 'gradient':
      IconComponent = LucideContrast;
      break;
    case 'refresh':
      IconComponent = LucideRefresh;
      break;
    case 'keyboard':
      IconComponent = LucideKeyboard;
      break;
    case 'mouse':
      IconComponent = LucideMouse;
      break;
    case 'gamepad':
      IconComponent = LucideGamepad;
      break;
    case 'audio':
      IconComponent = LucideAudio;
      break;
    case 'camera':
      IconComponent = LucideCamera;
      break;
    case 'calc':
      IconComponent = LucideCalculator;
      break;
    case 'ruler':
      IconComponent = LucideRuler;
      break;
    case 'touch':
      IconComponent = DeviceMobileDuotone;
      break;
    default:
      IconComponent = SparkleDuotone;
  }

  return (
    <span className="wbp-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      {title ? <span className="sr-only">{title}</span> : null}
      <IconComponent width={size} height={size} aria-hidden={title ? undefined : true} />
    </span>
  );
}
function useScroll(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}

export function MenuToggleIcon({ open, className = 'w-5 h-5', duration = 300 }) {
  return (
    <div className={cn('relative flex items-center justify-center cursor-pointer', className)}>
      <span
        className={cn(
          'absolute h-0.5 w-5 bg-current transition-all ease-out',
          open ? 'rotate-45' : '-translate-y-1.5'
        )}
        style={{ transitionDuration: `${duration}ms` }}
      />
      <span
        className={cn(
          'absolute h-0.5 w-5 bg-current transition-all ease-out',
          open ? 'opacity-0 scale-50' : 'opacity-100'
        )}
        style={{ transitionDuration: `${duration}ms` }}
      />
      <span
        className={cn(
          'absolute h-0.5 w-5 bg-current transition-all ease-out',
          open ? '-rotate-45' : 'translate-y-1.5'
        )}
        style={{ transitionDuration: `${duration}ms` }}
      />
    </div>
  );
}

export default function Navbar({
  currentMode,
  activeMode,
  onToggleFullscreen,
  onHideUi,
  isFullscreen = false,
  onToggleWakeLock,
  isWakeLockActive = false,
  onOpenHelp,
  onBrandClick,
  visible = true,
  brandName = 'MONITORSMITH',
  productName = 'EXVORN.TECH',
  status,
  className,
}) {
  const [open, setOpen] = useState(false);
  const scrolled = useScroll(10);
  const mode = getModePresentation(currentMode ?? activeMode);
  const showModeContext = mode.id !== 'home';
  const hiddenTabIndex = visible ? undefined : -1;
  const wakeLockLabel = isWakeLockActive ? 'Tela sempre ligada (clique para desativar)' : 'Evitar que a tela apague (Manter tela ligada)';
  const fullscreenLabel = isFullscreen ? 'Sair da tela cheia (Esc ou F)' : 'Ocupar 100% da tela / Tela cheia (F)';

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <motion.header
      className={cn(
        'wbp-navbar z-50 transition-all duration-300 ease-out',
        showModeContext
          ? 'wbp-navbar--tool'
          : cn(
              'sticky top-0 mx-auto w-full max-w-5xl border-b border-transparent md:rounded-2xl md:border wbp-navbar-template',
              scrolled && !open
                ? 'bg-slate-950/85 supports-[backdrop-filter]:bg-slate-950/60 border-white/10 backdrop-blur-xl md:top-4 md:max-w-4xl md:shadow-2xl'
                : 'bg-slate-950/40 backdrop-blur-md border-white/5',
              open && 'bg-slate-950/95'
            ),
        !visible && 'opacity-0 pointer-events-none -translate-y-4 is-idle-hidden',
        className
      )}
      aria-label={`Barra de controle do ${brandName}`}
      aria-hidden={!visible}
      inert={!visible ? "" : undefined}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        pointerEvents: visible ? 'auto' : 'none'
      }}
    >
      <nav
        className={cn(
          'flex w-full items-center justify-between transition-all duration-300 ease-out',
          showModeContext ? 'h-11 px-3 md:h-11' : 'h-14 px-4 md:h-12',
          scrolled && !showModeContext && 'md:px-3'
        )}
      >
        {/* Brand Identity & Back Action */}
        <div className="wbp-navbar__identity flex items-center gap-2 min-w-0 flex-shrink">
          {status ? <span className="sr-only" aria-live="polite">{status}</span> : null}
          {showModeContext && onBrandClick ? (
            <button
              className="wbp-navbar__back-btn flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 cursor-pointer flex-shrink-0"
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
              className="wbp-navbar__brand wbp-navbar__brand--button flex items-center gap-2.5 text-left bg-transparent border-0 cursor-pointer p-1 rounded-xl group min-w-0 flex-shrink"
              type="button"
              onClick={onBrandClick}
              tabIndex={showModeContext ? -1 : hiddenTabIndex}
              aria-label="Voltar às ferramentas"
            >
              <div className={cn("wbp-navbar__title-block flex flex-col leading-none min-w-0 overflow-hidden", showModeContext && "hidden sm:flex")}>
                <span className="wbp-navbar__brand-name font-bold text-[0.88rem] tracking-wider text-white group-hover:text-amber-400 transition-colors truncate">
                  {brandName}
                </span>
                <span className="wbp-navbar__brand-tag text-[0.62rem] font-mono tracking-widest text-amber-500/90 font-medium truncate">
                  {productName}
                </span>
              </div>
            </button>
          ) : (
            <div className="wbp-navbar__brand flex items-center gap-2.5 min-w-0 flex-shrink">
              <div className={cn("wbp-navbar__title-block flex flex-col leading-none min-w-0 overflow-hidden", showModeContext && "hidden sm:flex")}>
                <span className="wbp-navbar__brand-name font-bold text-[0.88rem] tracking-wider text-white truncate">
                  {brandName}
                </span>
                <span className="wbp-navbar__brand-tag text-[0.62rem] font-mono tracking-widest text-amber-500/90 font-medium truncate">
                  {productName}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Editorial & Section Navigation Links (Landing only) */}
        {!showModeContext ? (
          <div className="hidden lg:flex items-center gap-5 text-[0.82rem] font-medium text-white/70">
            <a
              href="#monitor-tools"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('monitor-tools')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors cursor-pointer py-1"
            >
              Ferramentas
            </a>
            <a
              href="/blog/"
              className="hover:text-amber-400 transition-colors py-1"
            >
              Blog & Guias
            </a>
            <a
              href="#about-title"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about-title')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors cursor-pointer py-1"
            >
              Metodologia
            </a>
            <a
              href="/sobre/"
              className="hover:text-amber-400 transition-colors py-1"
            >
              Sobre
            </a>
            <a
              href="/contato/"
              className="hover:text-amber-400 transition-colors py-1"
            >
              Contato
            </a>
          </div>
        ) : null}

        {/* Links & Action Buttons */}
        <div className={cn('items-center gap-2 wbp-navbar__actions min-w-0 flex-shrink-0', showModeContext ? 'flex' : 'hidden md:flex')}>
          {onToggleFullscreen ? (
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
          ) : null}

          {showModeContext && onToggleWakeLock ? (
            <Button
              className="wbp-navbar__action wbp-navbar__action--wake"
              variant={isWakeLockActive ? 'active' : 'ghost'}
              size="sm"
              icon={<ControlIcon name="wake" size={16} />}
              aria-label={wakeLockLabel}
              aria-pressed={isWakeLockActive}
              title={wakeLockLabel}
              onClick={onToggleWakeLock}
              tabIndex={hiddenTabIndex}
            />
          ) : null}

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

          {onOpenHelp ? (
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
              <span className="hidden sm:inline" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em' }}>ATALHOS [K]</span>
            </Button>
          ) : null}
        </div>

        {/* Mobile Toggle Button (Landing Page only) */}
        {!showModeContext ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setOpen(!open)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors p-0 cursor-pointer"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="mobile-menu-drawer"
          >
            <MenuToggleIcon open={open} className="w-5 h-5" duration={300} />
          </Button>
        ) : null}
      </nav>

      {/* Mobile Menu Overlay Drawer */}
      {open ? (
        <div 
          id="mobile-menu-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu móvel"
          className="fixed top-14 right-0 bottom-0 left-0 z-[60] flex flex-col overflow-y-auto border-t border-white/10 bg-slate-950/95 backdrop-blur-2xl md:hidden transition-all"
        >
          {/* Focus Trap Start */}
          <div tabIndex={0} onFocus={(e) => {
            const focusables = e.currentTarget.parentElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const last = focusables[focusables.length - 2]; // -2 because of the focus trap ends
            if (last) last.focus();
          }}></div>
          
          <div className="flex h-full w-full flex-col justify-between gap-y-4 p-6 wbp-drawer-content">
            <div className="grid gap-y-2.5">
              <button
                type="button"
                className="flex w-full items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm text-left hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => {
                  setOpen(false);
                  document.getElementById('monitor-tools')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>{TOOL_COUNT} Ferramentas de Display</span>
                <ControlIcon name="pixels" size={16} />
              </button>

              <a
                href="/blog/"
                className="flex w-full items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm text-left hover:bg-white/10 transition-colors"
                onClick={() => setOpen(false)}
              >
                <span>Blog & Guias Técnicos (33 Artigos)</span>
                <span className="text-amber-400 text-xs font-semibold">Guias</span>
              </a>

              <a
                href="/sobre/"
                className="flex w-full items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm text-left hover:bg-white/10 transition-colors"
                onClick={() => setOpen(false)}
              >
                <span>Sobre & Metodologia EXVORN</span>
                <ControlIcon name="calibration" size={16} />
              </a>

              <button
                type="button"
                className="flex w-full items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm text-left hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => {
                  setOpen(false);
                  const faqEl = document.getElementById('faq-title') || document.querySelector('.ms-seo-faq');
                  if (faqEl) faqEl.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Dúvidas Frequentes (FAQ)</span>
                <ControlIcon name="help" size={16} />
              </button>

              <a
                href="/contato/"
                className="flex w-full items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm text-left hover:bg-white/10 transition-colors"
                onClick={() => setOpen(false)}
              >
                <span>Contato & Suporte Técnico</span>
                <span className="text-white/40 text-xs">Suporte</span>
              </a>

              <a
                href="/privacidade/"
                className="flex w-full items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm text-left hover:bg-white/10 transition-colors"
                onClick={() => setOpen(false)}
              >
                <span>Política de Privacidade & Cookies</span>
                <span className="text-white/40 text-xs">LGPD</span>
              </a>

              <a
                href="/termos/"
                className="flex w-full items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm text-left hover:bg-white/10 transition-colors"
                onClick={() => setOpen(false)}
              >
                <span>Termos de Serviço</span>
                <span className="text-white/40 text-xs">Termos</span>
              </a>

              {onOpenHelp ? (
                <button
                  type="button"
                  className="flex w-full items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-medium text-sm text-left hover:bg-amber-500/20 transition-colors cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                    onOpenHelp();
                  }}
                >
                  <span>Atalhos de Teclado</span>
                  <span className="font-mono text-xs bg-amber-500/20 px-2 py-0.5 rounded">[K]</span>
                </button>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 pb-8">
              {onToggleWakeLock && showModeContext ? (
                <Button
                  className="w-full justify-center"
                  variant={isWakeLockActive ? 'active' : 'outline'}
                  onClick={onToggleWakeLock}
                >
                  <ControlIcon name="wake" size={16} />
                  <span>{isWakeLockActive ? 'Desativar Manter Tela Ligada' : 'Manter Tela Ligada'}</span>
                </Button>
              ) : null}

              {onToggleFullscreen ? (
                <Button
                  className="w-full justify-center"
                  variant="primary"
                  onClick={() => {
                    setOpen(false);
                    onToggleFullscreen();
                  }}
                >
                  <ControlIcon name={isFullscreen ? 'minimize' : 'fullscreen'} size={16} />
                  <span>{isFullscreen ? 'Sair da Tela Cheia' : 'Ocupar 100% da Tela'}</span>
                </Button>
              ) : null}
            </div>
          </div>

          {/* Focus Trap End */}
          <div tabIndex={0} onFocus={(e) => {
            const focusables = e.currentTarget.parentElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const first = focusables[1]; // 1 because 0 is the start focus trap
            if (first) first.focus();
          }}></div>
        </div>
      ) : null}
    </motion.header>
  );
}
