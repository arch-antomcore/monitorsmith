import { useEffect, useMemo, useRef, useState } from 'react';
import { ADSENSE_CLIENT, loadAdSense, readConsent, subscribeConsent } from '../../lib/consent';
import { useI18n } from '../../i18n';

function resolveSlot(explicitSlot, placement) {
  if (explicitSlot) return explicitSlot;
  if (placement === 'hero') return import.meta.env.VITE_ADSENSE_SLOT_HERO || '';
  if (placement === 'library' || placement === 'sidebar') {
    return import.meta.env.VITE_ADSENSE_SLOT_LIBRARY || '';
  }
  if (placement === 'footer') return import.meta.env.VITE_ADSENSE_SLOT_FOOTER || '';
  return '';
}

const isValidClient = (value) => /^ca-pub-\d{10,}$/.test(value);
const isValidSlot = (value) => /^\d{6,}$/.test(value) && !/^0+$/.test(value);

/**
 * Unidade de anúncio que só existe em páginas com conteúdo editorial e apenas
 * depois do consentimento explícito. Nunca é montada sobre as superfícies de
 * teste em tela cheia, conforme a política de anúncios do Google.
 */
export default function AdSenseUnit({
  slot,
  format = 'auto',
  placement,
  responsive = true,
  className = '',
  style = {},
}) {
  const { t } = useI18n();
  const ref = useRef(null);
  const requestedElementRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [allowed, setAllowed] = useState(() => readConsent().ads);

  const resolvedSlot = useMemo(() => resolveSlot(slot, placement), [placement, slot]);
  const isConfigured = isValidClient(ADSENSE_CLIENT) && isValidSlot(resolvedSlot);

  useEffect(() => {
    return subscribeConsent((state) => setAllowed(state.ads));
  }, []);

  useEffect(() => {
    if (!isConfigured || !allowed) return undefined;
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { rootMargin: '320px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, [allowed, isConfigured]);

  useEffect(() => {
    if (!isConfigured || !allowed || !inView) return undefined;
    const element = ref.current?.querySelector('ins.adsbygoogle');
    if (!element || requestedElementRef.current === element) return undefined;
    let cancelled = false;
    loadAdSense(readConsent()).then((ready) => {
      if (!ready || cancelled || !element.isConnected || !readConsent().ads) return;
      try {
        requestedElementRef.current = element;
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        /* a unidade permanece vazia e nada é exibido */
      }
    });
    return () => { cancelled = true; };
  }, [allowed, inView, isConfigured, resolvedSlot]);

  if (!isConfigured || !allowed) return null;

  return (
    <aside
      ref={ref}
      className={`ms-ad-container ${className}`}
      aria-label={t('ad.label')}
      data-testid="adsense-unit"
      style={{ margin: '28px auto', padding: '10px 12px 14px', maxWidth: '920px', width: '100%', textAlign: 'center', boxSizing: 'border-box', ...style }}
    >
      <div
        className="ms-ad-label"
        style={{ marginBottom: 8, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 600 }}
      >
        {t('ad.label')}
      </div>
      <div style={{ position: 'relative', minHeight: 90, width: '100%' }}>
        {inView ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', minHeight: 90, overflow: 'hidden' }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={resolvedSlot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />
        ) : (
          <div style={{ minHeight: 90, width: '100%' }} aria-hidden="true" />
        )}
      </div>
    </aside>
  );
}
