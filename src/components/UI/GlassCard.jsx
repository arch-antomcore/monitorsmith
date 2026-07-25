import { forwardRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { joinClasses } from './Button';

/**
 * Superficie elevada para paineis e controles. `interactive` habilita a
 * resposta cinetica e torna um elemento nao-interativo navegavel por teclado.
 */
const GlassCard = forwardRef(function GlassCard(
  {
    as = 'div',
    children,
    className,
    interactive = false,
    selected = false,
    padding = 'md',
    onClick,
    onKeyDown,
    role,
    tabIndex,
    motionProps,
    ...props
  },
  ref,
) {
  const shouldReduceMotion = useReducedMotion();
  const MotionElement = motion[as] || motion.div;
  const isNativeInteractive = as === 'button' || as === 'a' || as === 'input';
  const isInteractive = interactive || Boolean(onClick);

  const handleKeyDown = (event) => {
    onKeyDown?.(event);

    if (
      !event.defaultPrevented &&
      isInteractive &&
      !isNativeInteractive &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      onClick?.(event);
    }
  };

  return (
    <MotionElement
      ref={ref}
      className={joinClasses(
        'wbp-glass-card',
        `wbp-glass-card--padding-${padding}`,
        isInteractive && 'wbp-glass-card--interactive',
        selected && 'is-selected',
        className,
      )}
      data-selected={selected || undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isInteractive && !isNativeInteractive ? role || 'button' : role}
      tabIndex={isInteractive && !isNativeInteractive ? tabIndex ?? 0 : tabIndex}
      whileHover={isInteractive && !shouldReduceMotion ? { y: -2 } : undefined}
      whileTap={isInteractive && !shouldReduceMotion ? { scale: 0.995 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      {...props}
      {...motionProps}
    >
      {children}
    </MotionElement>
  );
});

export default GlassCard;
