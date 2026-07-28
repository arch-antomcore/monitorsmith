import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ControlIcon } from '../Controls/Navbar';
import { DEFAULT_DOCK_MODES } from '../../constants/shortcuts';

export default function RadialMenu({ activeMode, onSelectMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleContextMenu = (e) => {
      if (e.target.closest('input, textarea, select, button, a')) return;
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      setIsOpen(true);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleClickOutside = () => {
      setIsOpen(false);
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  const modes = DEFAULT_DOCK_MODES.slice(0, 8);
  const radius = 105;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          pointerEvents: 'auto',
        }}
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            width: 0,
            height: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(10, 11, 16, 0.92)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.2)',
              backdropFilter: 'blur(20px)',
              display: 'grid',
              placeItems: 'center',
              color: '#f59e0b',
              fontSize: '0.7rem',
              fontWeight: '600',
              pointerEvents: 'none',
            }}
          >
            MODO
          </div>

          {modes.map((mode, index) => {
            const angle = (index * (360 / modes.length) - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isActive = activeMode === mode.id;

            return (
              <motion.button
                key={mode.id}
                type="button"
                whileHover={{ scale: 1.18 }}
                whileTap={{ scale: 0.92 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectMode(mode.id);
                  setIsOpen(false);
                }}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  transform: 'translate(-50%, -50%)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: isActive
                    ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                    : 'rgba(18, 20, 28, 0.92)',
                  border: isActive
                    ? '1px solid #fde68a'
                    : '1px solid rgba(255, 255, 255, 0.14)',
                  color: isActive ? '#1c1917' : '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow: isActive
                    ? '0 0 20px rgba(245, 158, 11, 0.6)'
                    : '0 8px 24px rgba(0,0,0,0.5)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(16px)',
                }}
                title={mode.label}
              >
                <ControlIcon name={mode.icon} size={20} />
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
