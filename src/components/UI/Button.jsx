import { forwardRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * Botão base do MonitorSmith. Mantém os estados visuais e de acessibilidade
 * centralizados, sem impor uma acao ou iconografia especifica ao consumidor.
 */
const Button = forwardRef(function Button(
  {
    children,
    className,
    variant = 'secondary',
    size = 'md',
    icon,
    iconPosition = 'left',
    loading = false,
    loadingLabel = 'Aguarde',
    fullWidth = false,
    disabled = false,
    motionProps,
    type = 'button',
    ...buttonProps
  },
  ref,
) {

  const isDisabled = disabled || loading;
  const hasOnlyIcon = !children && Boolean(icon);
  const shouldReduceMotion = useReducedMotion();

  const buttonAriaLabel = hasOnlyIcon 
    ? (buttonProps['aria-label'] || 'Botão com ícone')
    : buttonProps['aria-label'];

  return (
    <motion.button
      ref={ref}
      type={type}
      className={cn(
        'wbp-button',
        `wbp-button--${variant}`,
        `wbp-button--${size}`,
        fullWidth && 'wbp-button--full-width',
        hasOnlyIcon && 'wbp-button--icon-only',
        loading && 'is-loading',
        className,
      )}
      data-variant={variant}
      disabled={isDisabled}
      aria-label={buttonAriaLabel}
      aria-busy={loading || undefined}
      whileHover={
        !isDisabled && !shouldReduceMotion
          ? { scale: 1.025 }
          : undefined
      }
      whileTap={!isDisabled && !shouldReduceMotion ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...buttonProps}
      {...motionProps}
    >
      {loading ? <span className="wbp-button__spinner" aria-hidden="true" /> : null}
      {icon && iconPosition === 'left' ? (
        <span className="wbp-button__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children ? <span className="wbp-button__label">{loading ? loadingLabel : children}</span> : null}
      {icon && iconPosition === 'right' ? (
        <span className="wbp-button__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {!children && loading ? <span className="sr-only">{loadingLabel}</span> : null}
    </motion.button>
  );
});

export default Button;
