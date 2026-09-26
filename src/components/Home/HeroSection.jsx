import { motion } from 'framer-motion';
import { TOOL_LIBRARY } from '../../constants/tools';
import { useI18n } from '../../i18n';
import '../originkit/hero-11.css';

function BackgroundArtwork() {
  return (
    <>
      <div className="ok-h11-background">
        <div className="ok-h11-glow" />
      </div>

      <div
        className="ok-h11-title"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '22%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          fontSize: 'clamp(88px, 13vw, 200px)',
          opacity: 0.1,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        MONITORSMITH
      </div>

      <div className="ok-h11-portrait">
        <img
          src="/originkit/hero-11/hero-portrait.webp"
          alt=""
          className="ok-h11-layerImage"
          width={1122}
          height={1402}
          loading="eager"
          decoding="async"
        />
      </div>
    </>
  );
}

export default function HeroSection({ onScrollToTools }) {
  const { t } = useI18n();

  return (
    <motion.section
      className="ok-h11-hero"
      aria-label="MonitorSmith"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <BackgroundArtwork />

      <div className="ok-h11-copy">
        <motion.div
          className="ok-h11-headingGroup"
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="ok-h11-eyebrow">{t('hero.eyebrow')}</p>
          <h1 className="ok-h11-title">
            {t('hero.title.pre')} <em>{t('hero.title.em')}</em><br />{' '}
            {t('hero.title.post')}
          </h1>
        </motion.div>

        <motion.p
          className="ok-h11-description"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('hero.desc')}
        </motion.p>

        <motion.div
          style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginTop: '28px' }}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <button type="button" className="msx-btn msx-btn--primary" onClick={onScrollToTools} data-testid="hero-explore">
            {t('hero.cta.tools')} <span aria-hidden="true">↓</span>
          </button>
          <a className="msx-btn" href="#monitor-tools" onClick={onScrollToTools} data-testid="hero-secondary">
            {TOOL_LIBRARY.length} {t('hero.stat.tools')}
          </a>
        </motion.div>
      </div>

      <aside className="ok-h11-details" aria-label={t('explorer.eyebrow')}>
        <div>
          <p className="ok-h11-detailTitle">{TOOL_LIBRARY.length}</p>
          <p className="ok-h11-detailLabel">{t('hero.stat.toolsSub')}</p>
        </div>
        <div>
          <p className="ok-h11-detailTitle">{t('hero.stat.offline')}</p>
          <p className="ok-h11-detailLabel">{t('hero.stat.offlineSub')}</p>
        </div>
        <div>
          <p className="ok-h11-detailTitle">{t('hero.stat.local')}</p>
          <p className="ok-h11-detailLabel">{t('hero.stat.localSub')}</p>
        </div>
      </aside>

    </motion.section>
  );
}
