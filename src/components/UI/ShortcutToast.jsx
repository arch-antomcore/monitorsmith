import { AnimatePresence, motion } from 'framer-motion';

export default function ShortcutToast({ toast }) {
  if (!toast) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={toast.id}
        initial={{ opacity: 0, y: -20, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
        style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10000,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 16px',
          borderRadius: '999px',
          background: 'rgba(12, 13, 18, 0.88)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          color: '#ffffff',
          fontSize: '0.78rem',
          pointerEvents: 'none',
        }}
      >
        <kbd
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.72rem',
            padding: '2px 7px',
            borderRadius: '5px',
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#f59e0b',
            fontWeight: '600',
          }}
        >
          {toast.key}
        </kbd>
        <span style={{ color: 'rgba(255,255,255,0.92)' }}>{toast.message}</span>
      </motion.div>
    </AnimatePresence>
  );
}
