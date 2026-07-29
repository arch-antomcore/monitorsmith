import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Button, { joinClasses } from './Button';
import { acquireModalIsolation } from '../../utils/modalIsolation';

const getFocusableElements = (container) => {
  if (!container) return [];

  return Array.from(
    container.querySelectorAll(
      'a[href], area[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, object, embed, [contenteditable="true"], [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute('hidden') && element.getClientRects().length > 0);
};

/**
 * Modal acessivel com portal, foco contido, fechamento por Escape e bloqueio
 * temporario de rolagem no documento enquanto estiver aberto.
 */
export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  className,
  closeLabel = 'Fechar janela',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  initialFocusRef,
  ariaLabel,
  showCloseButton = true,
}) {
  const dialogRef = useRef(null);
  const previouslyFocusedElement = useRef(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  const descriptionId = useId();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open || typeof document === 'undefined') return undefined;

    previouslyFocusedElement.current = document.activeElement;
    dialogRef.current?.focus({ preventScroll: true });

    const releaseModalIsolation = acquireModalIsolation();

    const focusTimer = window.setTimeout(() => {
      const requestedElement = initialFocusRef?.current;
      const firstFocusableElement = getFocusableElements(dialogRef.current)[0];
      (requestedElement || firstFocusableElement || dialogRef.current)?.focus();
    }, 0);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && closeOnEscape) {
        event.preventDefault();
        event.stopPropagation();
        onCloseRef.current?.();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements(dialogRef.current);
      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        firstElement.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      releaseModalIsolation();

      if (previouslyFocusedElement.current instanceof HTMLElement && document.contains(previouslyFocusedElement.current)) {
        previouslyFocusedElement.current.focus({ preventScroll: true });
      }
    };
  }, [closeOnEscape, initialFocusRef, open]);

  if (typeof document === 'undefined') return null;

  const hasTitle = Boolean(title);
  const hasDescription = Boolean(description);

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="wbp-modal-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
          onPointerDown={(event) => {
            if (closeOnOverlayClick && event.target === event.currentTarget) {
              onCloseRef.current?.();
            }
          }}
        >
          <motion.section
            ref={dialogRef}
            className={joinClasses('wbp-modal', `wbp-modal--${size}`, className)}
            role="dialog"
            aria-modal="true"
            aria-labelledby={hasTitle ? titleId : undefined}
            aria-describedby={hasDescription ? descriptionId : undefined}
            aria-label={!hasTitle ? ariaLabel || 'Janela de configuração' : undefined}
            tabIndex={-1}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onPointerDown={(event) => event.stopPropagation()}
          >
            {hasTitle || hasDescription || showCloseButton ? (
              <header className="wbp-modal__header">
                <div className="wbp-modal__heading">
                  {hasTitle ? <h2 id={titleId}>{title}</h2> : null}
                  {hasDescription ? <p id={descriptionId}>{description}</p> : null}
                </div>
                {showCloseButton ? (
                  <Button
                    className="wbp-modal__close"
                    variant="ghost"
                    size="sm"
                    aria-label={closeLabel}
                    title={closeLabel}
                    onClick={() => onCloseRef.current?.()}
                  >
                    <span className="wbp-modal__close-mark" aria-hidden="true">
                      ×
                    </span>
                  </Button>
                ) : null}
              </header>
            ) : null}

            <div className="wbp-modal__body">{children}</div>

            {footer ? <footer className="wbp-modal__footer">{footer}</footer> : null}
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
