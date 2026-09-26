import { useEffect } from 'react';
import { MODE_IDS as MODES } from '../constants/shortcuts';

const PRODUCT_DOCUMENT_TITLE = 'MonitorSmith — Ferramentas visuais para monitores';

export function useThemeSync(activeMode, modeTitle) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const title = modeTitle
      ? `${modeTitle} — MonitorSmith | EXVORN.TECH`
      : PRODUCT_DOCUMENT_TITLE;
      
    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = modeTitle 
      ? `Use a ferramenta ${modeTitle} no MonitorSmith para testar e ajustar seu monitor.`
      : 'O MonitorSmith oferece ferramentas para teste, ajuste e correção visual de monitores.';

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = title;

  }, [modeTitle]);

  useEffect(() => {
    if (typeof document === 'undefined' || activeMode === MODES.HOME) return;

    document.documentElement.classList.remove(
      'dark',
      'light-mode',
      'ms-studio-dark',
      'ms-studio-light',
    );
  }, [activeMode]);
}
