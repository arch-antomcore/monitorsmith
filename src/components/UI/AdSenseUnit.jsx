import { useEffect, useMemo, useRef, useState } from 'react';

const DEFAULT_CLIENT = 'ca-pub-5926952327268950';

function resolveSlot(explicitSlot, placement) {
  if (explicitSlot) return explicitSlot;
  if (placement === 'hero') return import.meta.env.VITE_ADSENSE_SLOT_HERO || '';
  if (placement === 'library' || placement === 'sidebar') {
    return import.meta.env.VITE_ADSENSE_SLOT_LIBRARY || '';
  }
  if (placement === 'footer') return import.meta.env.VITE_ADSENSE_SLOT_FOOTER || '';
  return '';
}

function isValidClient(value) {
  return /^ca-pub-\d{10,}$/.test(value);
}

function isValidSlot(value) {
  return /^\d{6,}$/.test(value) && !/^0+$/.test(value);
}

export default function AdSenseUnit({
  slot,
  format = 'auto',
  placement,
  responsive = true,
  className = '',
  style = {},
}) {
  const ref = useRef(null);
  const hasRequestedAdRef = useRef(false);
  const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === 'undefined');
  const [consentStatus, setConsentStatus] = useState('unknown');

  const resolvedSlot = useMemo(
    () => resolveSlot(slot, placement),
    [placement, slot],
  );
  const isConfigured = isValidClient(DEFAULT_CLIENT) && isValidSlot(resolvedSlot);

  useEffect(() => {
    const checkConsent = () => {
      try {
        const saved = localStorage.getItem('ms_ad_consent');
        if (saved === 'rejected') {
          setConsentStatus('denied');
        } else if (saved === 'granted') {
          setConsentStatus('granted');
        } else {
          setConsentStatus('unknown');
        }
      } catch {
        setConsentStatus('granted');
      }
    };
    checkConsent();
    
    const onUpdate = () => checkConsent();
    window.addEventListener('ms_consent_update', onUpdate);
    return () => window.removeEventListener('ms_consent_update', onUpdate);
  }, []);

  useEffect(() => {
    if (!isConfigured || consentStatus !== 'granted') return undefined;

    const element = ref.current;
    if (!element) return undefined;
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isConfigured, consentStatus]);

  useEffect(() => {
    if (!isConfigured || !isVisible || consentStatus !== 'granted' || hasRequestedAdRef.current) return;

    try {
      hasRequestedAdRef.current = true;
      const ads = window.adsbygoogle || [];
      // Política de anúncios limitados
      if (typeof ads.requestNonPersonalizedAds === 'undefined') {
         ads.requestNonPersonalizedAds = 1;
      }
      ads.push({});
    } catch (error) {
      console.warn('[AdSense Telemetry] Erro ao carregar anúncio:', error);
      // Retain requested state on exception to prevent infinite retry loop
    }
  }, [isConfigured, isVisible, consentStatus]);

  if (!isConfigured || consentStatus !== 'granted') {
    return null;
  }

  return (
    <aside
      ref={ref}
      className={`ms-ad-container ${className}`}
      aria-label="Publicidade"
      style={{
        margin: '24px auto',
        padding: '12px 16px 16px',
        maxWidth: '920px',
        width: '100%',
        borderRadius: '16px',
        background: 'rgba(13, 16, 23, 0.55)',
        border: '1px dashed rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(10px)',
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div
        className="ms-ad-label"
        style={{
          marginBottom: '8px',
          fontSize: '0.64rem',
          color: 'rgba(255, 255, 255, 0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          fontWeight: 600,
          fontFamily: 'monospace',
        }}
      >
        Publicidade
      </div>
      <div style={{ position: 'relative', minHeight: '90px', width: '100%' }}>
        {isVisible ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', minHeight: '90px', borderRadius: '10px', overflow: 'hidden' }}
            data-ad-client={DEFAULT_CLIENT}
            data-ad-slot={resolvedSlot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />
        ) : (
          <div style={{ minHeight: '90px', width: '100%' }} aria-hidden="true" />
        )}
      </div>
    </aside>
  );
}
