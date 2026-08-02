import { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import BrandLogo from '../UI/BrandLogo';
import { ControlIcon } from './Navbar';
import { getModePresentation } from '../../constants/shortcuts';
import { cn } from '../../lib/utils';

const MenuIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={className} fill="currentColor">
    <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
  </svg>
);

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    transition: {
      y: { type: "spring", damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: "spring",
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3rem",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const logoVariants = {
  expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
};

const itemVariants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const collapsedIconVariants = {
    expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
    collapsed: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300,
        delay: 0.15,
      }
    },
};

export default function AdaptiveNavbar({
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
}) {
  const mode = getModePresentation(currentMode ?? activeMode);
  const showModeContext = mode.id !== 'home';

  const [isExpanded, setExpanded] = useState(true);
  
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const scrollPositionOnCollapse = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (showModeContext) return; 

    const previous = lastScrollY.current;
    
    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest; 
    } 
    else if (!isExpanded && latest < previous && (scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD)) {
      setExpanded(true);
    }
    
    lastScrollY.current = latest;
  });

  const handleNavClick = (e) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  const wakeLockLabel = isWakeLockActive ? 'Tela sempre ligada (clique para desativar)' : 'Evitar que a tela apague (Manter tela ligada)';
  const fullscreenLabel = isFullscreen ? 'Sair da tela cheia (Esc ou F)' : 'Ocupar 100% da tela / Tela cheia (F)';

  return (
    <div 
      className="fixed z-50 flex justify-center pointer-events-none transition-all duration-300 ease-out"
      style={{ 
        top: 'calc(24px + env(safe-area-inset-top))',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: visible ? 1 : 0,
      }}
    >
      <motion.nav
        initial={false}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.1 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        onClick={handleNavClick}
        aria-hidden={!visible}
        className={cn(
          "wbp-navbar flex items-center overflow-hidden rounded-full h-12 pointer-events-auto glass3d border border-border shadow-sm",
          !isExpanded && "cursor-pointer justify-center"
        )}
      >
        <motion.div
          variants={logoVariants}
          className="flex-shrink-0 flex items-center font-semibold pl-4 pr-2 text-foreground"
        >
          {showModeContext && onBrandClick ? (
            <button 
              onClick={onBrandClick} 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity outline-none"
              title="Voltar às ferramentas (H)"
              aria-label="Voltar às ferramentas"
            >
              <BrandLogo size={10} />
              <span className="hidden sm:inline-block">MonitorSmith</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <BrandLogo size={10} />
              <span className="hidden sm:inline-block">MonitorSmith</span>
            </div>
          )}
        </motion.div>
        
        <motion.div
          className={cn(
            "flex items-center gap-1 sm:gap-4 pr-4",
            !isExpanded && "pointer-events-none"
          )}
        >
          {showModeContext && onBrandClick && (
            <motion.button variants={itemVariants} onClick={onBrandClick} aria-label="Voltar às ferramentas" title="Voltar às ferramentas (H)" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 flex items-center justify-center">
              <ControlIcon name="home" size={20} />
            </motion.button>
          )}

          {onToggleFullscreen && (
            <motion.button variants={itemVariants} onClick={onToggleFullscreen} aria-label={fullscreenLabel} title={fullscreenLabel} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 flex items-center justify-center">
              <ControlIcon name={isFullscreen ? 'minimize' : 'fullscreen'} size={20} />
            </motion.button>
          )}

          {showModeContext && onToggleWakeLock && (
            <motion.button variants={itemVariants} onClick={onToggleWakeLock} aria-label={wakeLockLabel} title={wakeLockLabel} aria-pressed={isWakeLockActive} className={cn("text-sm font-medium transition-colors px-2 py-1 flex items-center justify-center", isWakeLockActive ? "text-amber-500" : "text-muted-foreground hover:text-foreground")}>
              <ControlIcon name="wake" size={20} />
            </motion.button>
          )}

          {showModeContext && onHideUi && (
            <motion.button variants={itemVariants} onClick={onHideUi} aria-label="Ocultar barras e interface (Modo imersivo)" title="Ocultar barras e controles (×)" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 flex items-center justify-center">
              <ControlIcon name="x" size={20} />
            </motion.button>
          )}

          {onOpenHelp && (
            <motion.button variants={itemVariants} onClick={onOpenHelp} aria-label="Abrir atalhos de teclado" title="Atalhos de teclado (? / K)" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 flex items-center justify-center">
              <ControlIcon name="help" size={20} />
            </motion.button>
          )}
        </motion.div>
        
        <div className="!absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            variants={collapsedIconVariants}
            animate={isExpanded ? "expanded" : "collapsed"}
          >
            <MenuIcon className="h-6 w-6 text-foreground" />
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
}
