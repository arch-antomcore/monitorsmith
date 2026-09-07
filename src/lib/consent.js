/**
 * Consentimento e carregamento do AdSense.
 *
 * Regras aplicadas:
 * - Google Consent Mode v2 com tudo negado por padrão (antes de qualquer tag).
 * - O script do AdSense só é injetado depois do consentimento de publicidade.
 * - Sem consentimento de personalização, pedimos anúncios não personalizados.
 * - A escolha é revogável a qualquer momento pelo rodapé.
 */

export const ADSENSE_CLIENT = 'ca-pub-5926952327268950';
const STORAGE_KEY = 'ms_consent_v2';
export const CONSENT_EVENT = 'ms_consent_update';

const DEFAULT_STATE = Object.freeze({ decided: false, ads: false, personalization: false });
let sessionConsent = null;
let scriptPromise = null;
let cancelPendingLoad = null;

export function normalizeConsent(state) {
  const decided = state?.decided === true;
  const ads = decided && state?.ads === true;
  return { decided, ads, personalization: ads && state?.personalization === true };
}

function gtag(...args) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

export function readConsent() {
  if (sessionConsent) return { ...sessionConsent };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return normalizeConsent(JSON.parse(raw));
    // Migração da chave antiga de uma versão anterior do banner.
    const legacy = localStorage.getItem('ms_ad_consent');
    if (legacy === 'granted') return { decided: true, ads: true, personalization: false };
    if (legacy === 'rejected') return { decided: true, ads: false, personalization: false };
  } catch {
    /* armazenamento bloqueado: tratamos como sem decisão */
  }
  return { ...DEFAULT_STATE };
}

export function applyConsentMode(state) {
  if (typeof window === 'undefined') return;
  state = normalizeConsent(state);
  if (window.adsbygoogle) {
    window.adsbygoogle.requestNonPersonalizedAds = state.personalization ? 0 : 1;
  }
  if (!state.ads) cancelPendingLoad?.();
  const granted = 'granted';
  const denied = 'denied';
  gtag('consent', 'update', {
    ad_storage: state.ads ? granted : denied,
    ad_user_data: state.personalization ? granted : denied,
    ad_personalization: state.personalization ? granted : denied,
    analytics_storage: denied,
  });
}

export function writeConsent(state) {
  const next = normalizeConsent({ ...state, decided: true });
  sessionConsent = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    localStorage.removeItem('ms_ad_consent');
  } catch {
    /* preferência não persistida */
  }
  applyConsentMode(next);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: next }));
  return next;
}

export function loadAdSense(state) {
  state = normalizeConsent(state);
  if (typeof document === 'undefined' || !state.ads || !readConsent().ads) return Promise.resolve(false);
  applyConsentMode(state);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve) => {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.requestNonPersonalizedAds = state.personalization ? 0 : 1;
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    const finish = (ready) => {
      cancelPendingLoad = null;
      script.onload = null;
      script.onerror = null;
      if (!ready) {
        script.remove();
        scriptPromise = null;
      }
      resolve(ready && readConsent().ads);
    };
    cancelPendingLoad = () => finish(false);
    script.onload = () => finish(true);
    script.onerror = () => finish(false);
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export function openConsentPreferences() {
  window.dispatchEvent(new CustomEvent('ms_consent_open'));
}

export function subscribeConsent(listener) {
  const sync = (event) => {
    if (event.type === 'storage') {
      if (event.key !== null && ![STORAGE_KEY, 'ms_ad_consent'].includes(event.key)) return;
      sessionConsent = null;
    }
    const state = readConsent();
    applyConsentMode(state);
    listener(state);
  };
  window.addEventListener(CONSENT_EVENT, sync);
  window.addEventListener('storage', sync);
  return () => {
    window.removeEventListener(CONSENT_EVENT, sync);
    window.removeEventListener('storage', sync);
  };
}
