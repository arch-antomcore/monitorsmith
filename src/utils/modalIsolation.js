let activeIsolationCount = 0;
let previousBodyOverflow = '';
let previousRootAriaHidden = null;
let rootWasInert = false;

/**
 * Isola o portal modal do restante da aplicação para teclado, leitores de tela
 * e rolagem. O contador torna a operação segura quando camadas modais se
 * sobrepõem; cada aquisição deve liberar exatamente uma vez.
 */
export function acquireModalIsolation() {
  if (typeof document === 'undefined') return () => {};

  if (activeIsolationCount === 0) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const appRoot = document.getElementById('root');
    if (appRoot) {
      previousRootAriaHidden = appRoot.getAttribute('aria-hidden');
      rootWasInert = appRoot.hasAttribute('inert');
      appRoot.setAttribute('aria-hidden', 'true');
      appRoot.setAttribute('inert', '');
    }
  }

  activeIsolationCount += 1;
  let released = false;

  return () => {
    if (released) return;
    released = true;
    activeIsolationCount = Math.max(0, activeIsolationCount - 1);
    if (activeIsolationCount !== 0) return;

    document.body.style.overflow = previousBodyOverflow;
    const appRoot = document.getElementById('root');
    if (!appRoot) return;

    if (previousRootAriaHidden === null) {
      appRoot.removeAttribute('aria-hidden');
    } else {
      appRoot.setAttribute('aria-hidden', previousRootAriaHidden);
    }

    if (!rootWasInert) appRoot.removeAttribute('inert');
  };
}
