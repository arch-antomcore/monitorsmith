import { useState, useRef, useEffect } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import BrandLogo from '../UI/BrandLogo';
import { ControlIcon } from './Navbar';
import { getModePresentation } from '../../constants/shortcuts';
import Button from '../UI/Button';

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
  brandName = 'MONITORSMITH',
  productName = 'EXVORN.TECH',
}) {
  const [expanded, setExpanded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const mode = getModePresentation(currentMode ?? activeMode);
  const showModeContext = mode.id !== 'home';

  // Larguras baseadas no contexto (Home tem menos botões que Tool)
  const COLLAPSED_WIDTH = 180;
  const EXPANDED_WIDTH = showModeContext ? 280 : 160;

  // Spring animations for smooth motion
  const pillWidth = useSpring(COLLAPSED_WIDTH, { stiffness: 220, damping: 25, mass: 1 });

  useEffect(() => {
    if (hovering) {
      setExpanded(true);
      pillWidth.set(EXPANDED_WIDTH);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setExpanded(false);
        pillWidth.set(COLLAPSED_WIDTH);
      }, 400); // Rápido o suficiente para não prender o mouse
    }
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [hovering, pillWidth, EXPANDED_WIDTH, COLLAPSED_WIDTH]);

  if (!visible) return null;

  return (
    <div 
      className="fixed z-50 flex justify-center w-full pointer-events-none transition-all duration-300 ease-out"
      style={{ top: 'calc(18px + env(safe-area-inset-top))' }}
    >
      <motion.nav
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="relative rounded-full pointer-events-auto flex items-center justify-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          width: pillWidth,
          height: '56px',
          // Adaptação Dark Mode Glassmorphism do background original
          background: `
            linear-gradient(135deg, 
              rgba(28, 30, 38, 0.85) 0%, 
              rgba(22, 24, 30, 0.90) 45%, 
              rgba(15, 17, 22, 0.95) 100%
            )
          `,
          backdropFilter: 'blur(24px) saturate(125%)',
          WebkitBackdropFilter: 'blur(24px) saturate(125%)',
          boxShadow: expanded
            ? `
              0 2px 4px rgba(0, 0, 0, 0.3),
              0 12px 24px rgba(0, 0, 0, 0.4),
              0 24px 48px rgba(0, 0, 0, 0.3),
              inset 0 2px 2px rgba(255, 255, 255, 0.1),
              inset 0 -3px 8px rgba(0, 0, 0, 0.4),
              inset 3px 3px 8px rgba(0, 0, 0, 0.3),
              inset -3px 3px 8px rgba(0, 0, 0, 0.3),
              inset 0 -1px 2px rgba(0, 0, 0, 0.5)
            `
            : `
              0 3px 6px rgba(0, 0, 0, 0.4),
              0 8px 16px rgba(0, 0, 0, 0.3),
              0 1px 2px rgba(0, 0, 0, 0.5),
              inset 0 2px 1px rgba(255, 255, 255, 0.08),
              inset 0 -2px 6px rgba(0, 0, 0, 0.3),
              inset 2px 2px 8px rgba(0, 0, 0, 0.2),
              inset -2px 2px 8px rgba(0, 0, 0, 0.2),
              inset 0 0 1px rgba(0, 0, 0, 0.5)
            `,
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease-out',
        }}
      >
        {/* Geometria 3D Original - Cores adaptadas para Dark Mode */}
        <div 
          className="absolute inset-x-0 top-0 rounded-t-full pointer-events-none"
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 5%, rgba(255,255,255,0.4) 15%, rgba(255,255,255,0.4) 85%, rgba(255,255,255,0.3) 95%, rgba(255,255,255,0) 100%)',
            filter: 'blur(0.3px)',
          }}
        />
        <div 
          className="absolute inset-x-0 top-0 rounded-full pointer-events-none"
          style={{
            height: '55%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0) 100%)',
          }}
        />
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 20%, rgba(255,255,255,0) 65%)',
          }}
        />
        <div 
          className="absolute rounded-full pointer-events-none"
          style={{
            left: expanded ? '18%' : '15%',
            top: '16%',
            width: expanded ? '140px' : '60px',
            height: '14px',
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 100%)',
            filter: 'blur(4px)',
            transform: 'rotate(-12deg)',
            transition: 'all 0.3s ease',
          }}
        />
        {expanded && (
          <div 
            className="absolute inset-y-0 left-0 rounded-l-full pointer-events-none"
            style={{
              width: '35%',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 40%, rgba(255,255,255,0) 100%)',
            }}
          />
        )}
        <div 
          className="absolute inset-x-0 bottom-0 rounded-b-full pointer-events-none"
          style={{
            height: '50%',
            background: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 25%, rgba(0,0,0,0) 100%)',
          }}
        />
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)',
          }}
        />

        {/* Navigation items container */}
        <div className="relative z-10 h-full w-full flex items-center justify-center px-4 overflow-hidden">
          
          {/* Collapsed State: Logo + Brand Name */}
          <AnimatePresence mode="wait">
            {!expanded && (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 cursor-default select-none whitespace-nowrap absolute"
              >
                <BrandLogo size={22} />
                <div className="flex flex-col leading-none" style={{ marginTop: '2px' }}>
                  <span className="font-bold text-[0.85rem] tracking-wider text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {showModeContext && mode.title ? mode.title.toUpperCase() : brandName}
                  </span>
                  {!showModeContext && (
                    <span className="text-[0.58rem] font-mono tracking-widest text-amber-500/90 font-medium mt-0.5">
                      {productName}
                    </span>
                  )}
                </div>
              </motion.div>
            )}

            {/* Expanded State: Actions */}
            {expanded && (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="flex items-center justify-evenly w-full absolute px-3"
              >
                {showModeContext && onBrandClick && (
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<ControlIcon name="home" size={18} />}
                    aria-label="Ir para Início"
                    title="Início (H)"
                    onClick={onBrandClick}
                    className="!p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                  />
                )}

                {onToggleFullscreen && (
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<ControlIcon name={isFullscreen ? 'minimize' : 'fullscreen'} size={18} />}
                    aria-label={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
                    title={isFullscreen ? 'Sair (Esc/F)' : 'Tela Cheia (F)'}
                    onClick={onToggleFullscreen}
                    className="!p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                  />
                )}

                {showModeContext && onToggleWakeLock && (
                  <Button
                    variant={isWakeLockActive ? 'active' : 'ghost'}
                    size="sm"
                    icon={<ControlIcon name="wake" size={18} />}
                    aria-label="Manter tela ligada"
                    title="Manter Tela Ligada"
                    onClick={onToggleWakeLock}
                    className={`!p-1.5 rounded-full ${isWakeLockActive ? 'text-amber-400 bg-amber-500/20' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
                  />
                )}

                {showModeContext && onHideUi && (
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<ControlIcon name="x" size={18} />}
                    aria-label="Ocultar barras"
                    title="Ocultar Interface (×)"
                    onClick={onHideUi}
                    className="!p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                  />
                )}

                {onOpenHelp && (
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<ControlIcon name="help" size={18} />}
                    aria-label="Atalhos"
                    title="Atalhos (K)"
                    onClick={onOpenHelp}
                    className="!p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
}
