import { useEffect } from 'react';
import { MODES } from '../context/AppContext';

const PRODUCT_DOCUMENT_TITLE = 'MonitorSmith — Ferramentas visuais para monitores';

export function useThemeSync(activeMode, modeTitle) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.title = modeTitle
      ? `${modeTitle} — MonitorSmith | EXVORN.TECH`
      : PRODUCT_DOCUMENT_TITLE;
  }, [modeTitle]);

  useEffect(() => {
    if (typeof document === 'undefined' || activeMode === MODES.HOME) return;

    // A preferência visual da landing page nunca deve alterar superfícies de
    // inspeção. Mantemos o tema salvo para a próxima visita à biblioteca, mas
    // retiramos suas classes globais enquanto uma ferramenta está aberta.
    document.documentElement.classList.remove(
      'dark',
      'light-mode',
      'ms-studio-dark',
      'ms-studio-light',
    );
  }, [activeMode]);
}
