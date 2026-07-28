import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export default function ShortcutToast({ toast }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          key={toast.id}
          className="ms-shortcut-toast"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
          transition={shouldReduceMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 420, damping: 32 }}
          style={{ x: '-50%' }}
        >
          <kbd className="ms-shortcut-toast__key">{toast.key}</kbd>
          <span>{toast.message}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
