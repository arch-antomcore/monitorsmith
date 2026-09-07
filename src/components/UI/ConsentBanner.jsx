import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { applyConsentMode, readConsent, subscribeConsent, writeConsent } from '../../lib/consent';
import { useI18n } from '../../i18n';
import { useToolStore } from '../../store/toolStore';

export function ConsentBanner() {
  const { t } = useI18n();
  const activeMode = useToolStore((state) => state.activeMode);
  const [isVisible, setIsVisible] = useState(false);
  const [detailed, setDetailed] = useState(false);
  const [ads, setAds] = useState(false);
  const [personalization, setPersonalization] = useState(false);

  useEffect(() => {
    const state = readConsent();
    if (state.decided) {
      applyConsentMode(state);
      setAds(state.ads);
      setPersonalization(state.personalization);
      return undefined;
    }
    const timer = setTimeout(() => setIsVisible(!readConsent().decided), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => subscribeConsent((state) => {
    setAds(state.ads);
    setPersonalization(state.personalization);
    setIsVisible(!state.decided);
  }), []);

  useEffect(() => {
    const open = () => {
      const state = readConsent();
      setAds(state.ads);
      setPersonalization(state.personalization);
      setDetailed(true);
      setIsVisible(true);
    };
    window.addEventListener('ms_consent_open', open);
    return () => window.removeEventListener('ms_consent_open', open);
  }, []);

  const decide = useCallback((state) => {
    writeConsent(state);
    setIsVisible(false);
    setDetailed(false);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && activeMode === 'home' && (
        <motion.div
          className="msx-consent"
          data-consent-banner
          role="dialog"
          aria-modal="false"
          aria-label={t('consent.title')}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 210 }}
        >
          <div className="msx-consent__inner">
            <div style={{ flex: '1 1 460px' }}>
              <h2>{t('consent.title')}</h2>
              <p>
                {t('consent.body')}{' '}
                <a href="/privacidade/" style={{ color: 'var(--msx-phos)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>{t('consent.privacyLink')}</a>
              </p>

              {detailed ? (
                <div style={{ marginTop: 16 }}>
                  <div className="msx-consent__row">
                    <span className="msx-kbd" style={{ marginTop: 2 }}>ON</span>
                    <div>
                      <strong>{t('consent.cat.necessary')}</strong>
                      <span>{t('consent.cat.necessaryDesc')} — {t('consent.always')}</span>
                    </div>
                  </div>
                  <label className="msx-consent__row" style={{ cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={ads}
                      onChange={(event) => {
                        setAds(event.target.checked);
                        if (!event.target.checked) setPersonalization(false);
                      }}
                      data-testid="consent-toggle-ads"
                      style={{ marginTop: 4, accentColor: 'var(--msx-phos)' }}
                    />
                    <div>
                      <strong>{t('consent.cat.ads')}</strong>
                      <span>{t('consent.cat.adsDesc')}</span>
                    </div>
                  </label>
                  <label className="msx-consent__row" style={{ cursor: ads ? 'pointer' : 'not-allowed', opacity: ads ? 1 : 0.5 }}>
                    <input
                      type="checkbox"
                      checked={personalization}
                      disabled={!ads}
                      onChange={(event) => setPersonalization(event.target.checked)}
                      data-testid="consent-toggle-personalization"
                      style={{ marginTop: 4, accentColor: 'var(--msx-phos)' }}
                    />
                    <div>
                      <strong>{t('consent.cat.personalization')}</strong>
                      <span>{t('consent.cat.personalizationDesc')}</span>
                    </div>
                  </label>
                </div>
              ) : null}
            </div>

            <div className="msx-consent__actions">
              {detailed ? (
                <>
                  <button type="button" className="msx-btn" onClick={() => setDetailed(false)} data-testid="consent-back">
                    {t('consent.back')}
                  </button>
                  <button type="button" className="msx-btn msx-btn--primary" onClick={() => decide({ ads, personalization })} data-testid="consent-save">
                    {t('consent.save')}
                  </button>
                </>
              ) : (
                <>
                  <button type="button" className="msx-btn msx-btn--ghost" onClick={() => setDetailed(true)} data-testid="consent-manage">
                    {t('consent.manage')}
                  </button>
                  <button type="button" className="msx-btn" onClick={() => decide({ ads: false, personalization: false })} data-testid="consent-reject">
                    {t('consent.reject')}
                  </button>
                  <button type="button" className="msx-btn msx-btn--primary" onClick={() => decide({ ads: true, personalization: true })} data-testid="consent-accept">
                    {t('consent.accept')}
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConsentBanner;
