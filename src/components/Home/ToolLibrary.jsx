import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import AdSenseUnit from '../UI/AdSenseUnit';
import { FooterSection } from '../UI/FooterSection';
import { HERO_GRID_TOOLS, TOOL_LIBRARY } from '../../constants/tools';
import { FAQ, STANDARDS } from '../../constants/faq';
import { useI18n } from '../../i18n';
import HeroSection from './HeroSection';
import ToolExplorer from './ToolExplorer';
import FeaturedArticlesSection from './FeaturedArticlesSection';

export { HERO_GRID_TOOLS, TOOL_LIBRARY };

function FaqBlock() {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(null);
  const items = FAQ[locale] || FAQ.pt;

  return (
    <section className="msx-section msx-section--alt" id="faq" aria-labelledby="faq-title">
      <div className="msx-inner">
        <div className="msx-head">
          <div>
            <p className="msx-eyebrow">{t('section.faq.eyebrow')}</p>
            <h2 id="faq-title" className="msx-title">{t('section.faq.title')}</h2>
          </div>
        </div>

        <div className="msx-faq">
          {items.map((item, index) => {
            const isOpen = open === item.id;
            return (
              <div className="msx-faq__item" key={item.id}>
                <h3 style={{ margin: 0 }}>
                  <button
                    type="button"
                    className="msx-faq__q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    data-testid={`faq-${item.id}`}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {item.question}
                    <em aria-hidden="true">{isOpen ? '−' : '+'}</em>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      className="msx-faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div>{item.answer}</div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MethodologyBlock() {
  const { t } = useI18n();

  return (
    <section className="msx-section msx-grid-bg" id="metodologia" aria-labelledby="method-title">
      <div className="msx-inner">
        <div className="msx-head">
          <div>
            <p className="msx-eyebrow">{t('section.method.eyebrow')}</p>
            <h2 id="method-title" className="msx-title">{t('section.method.title')}</h2>
          </div>
        </div>

        <div className="msx-prose">
          <p>{t('section.method.p1')}</p>
          <p>{t('section.method.p2')}</p>
          <p>{t('section.method.p3')}</p>
        </div>

        <dl className="msx-specs">
          <div>
            <dt>{t('section.method.standards')}</dt>
            <dd>{STANDARDS.slice(0, 3).join(' · ')}</dd>
          </div>
          <div>
            <dt>VESA / WCAG</dt>
            <dd>{STANDARDS.slice(3).join(' · ')}</dd>
          </div>
          <div>
            <dt>E-E-A-T</dt>
            <dd>
              {t('section.method.byline')}{' '}
              <a href="/sobre/" className="msx-inline-link">Sobre</a>
              {' · '}
              <a href="/contato/" className="msx-inline-link">{t('footer.contact')}</a>
            </dd>
          </div>
        </dl>

        <p className="msx-note" style={{ marginTop: 28 }}>{t('section.method.limits')}</p>
      </div>
    </section>
  );
}

export default function ToolLibrary({ onLaunch, returnFocusRequest = 0, onReturnFocus }) {
  const shouldReduceMotion = useReducedMotion();
  useEffect(() => {
    if (returnFocusRequest > 0) {
      onReturnFocus?.(returnFocusRequest);
    }
  }, [onReturnFocus, returnFocusRequest]);

  const scrollToTools = () => {
    document.getElementById('monitor-tools')?.scrollIntoView({ behavior: shouldReduceMotion ? 'instant' : 'smooth', block: 'start' });
  };

  return (
    <div id="monitor-tools-home" className="ms-library" tabIndex={-1}>
      <HeroSection onScrollToTools={scrollToTools} />

      <ToolExplorer onLaunch={onLaunch} />

      <FeaturedArticlesSection />

      <AdSenseUnit placement="library" format="auto" className="ms-ad-slot--leaderboard" />

      <MethodologyBlock />

      <FaqBlock />

      <FooterSection onLaunch={onLaunch} />
    </div>
  );
}
