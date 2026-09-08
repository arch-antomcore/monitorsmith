import React from 'react';
import { Moon as MoonDuotone, Sun as SunDuotone } from 'lucide-react';
import BrandLogo from './BrandLogo';
import PwaModal from './PwaModal';
import LanguageSwitcher from './LanguageSwitcher';
import { resolveToolLaunch } from '../../constants/tools';
import { openConsentPreferences } from '../../lib/consent';
import { useI18n } from '../../i18n';

function LinkedInIcon({ width = 16, height = 16 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={width} height={height} fill="currentColor">
      <path d="M5.4 3.5a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8ZM3.8 9h3.3v11H3.8V9Zm5.5 0h3.2v1.5h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.2 2.3 4.2 5.4v6h-3.3v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20H9.3V9Z" />
    </svg>
  );
}

const TOOL_LINKS = [
  { mode: 'dead-pixel', url: '/teste-de-dead-pixel/', label: { pt: 'Teste de dead pixels', en: 'Dead pixel test', es: 'Prueba de píxeles muertos' } },
  { mode: 'refresh-rate', url: '/teste-de-taxa-de-atualizacao-hz/', label: { pt: 'Medidor de Hz e frame time', en: 'Hz and frame time meter', es: 'Medidor de Hz y frame time' } },
  { mode: 'uniformity', url: '/teste-de-uniformidade-monitor/', label: { pt: 'Uniformidade e vazamento', en: 'Uniformity and bleed', es: 'Uniformidad y fugas' } },
  { mode: 'keyboard-test', url: '/teste-de-teclado-online/', label: { pt: 'Teste de teclado', en: 'Keyboard test', es: 'Prueba de teclado' } },
  { mode: 'mouse-test', url: '/teste-de-mouse-online/', label: { pt: 'Teste de mouse', en: 'Mouse test', es: 'Prueba de ratón' } },
  { mode: 'gamepad-test', url: '/teste-de-controle-online/', label: { pt: 'Teste de controle', en: 'Gamepad test', es: 'Prueba de mando' } },
];

const STUDIO_LINKS = [
  { mode: 'black', url: '/tela-preta-oled/', label: { pt: 'Tela preta e inspeção OLED', en: 'Black screen and OLED check', es: 'Pantalla negra e inspección OLED' } },
  { mode: 'white', url: '/luz-para-videochamada/', label: { pt: 'Luz para videochamadas', en: 'Video call light', es: 'Luz para videollamadas' } },
  { mode: 'green-screen', url: '/tela-verde-chroma/', label: { pt: 'Tela verde para chroma key', en: 'Green screen for chroma key', es: 'Pantalla verde para croma' } },
  { mode: 'display-calculators', url: '/calculadora-de-banda-hdmi-displayport/', label: { pt: 'Calculadoras de display', en: 'Display calculators', es: 'Calculadoras de pantalla' } },
  { mode: 'ppi-calculator', url: '/calculadora-ppi-densidade-monitor/', label: { pt: 'Calculadora de PPI', en: 'PPI calculator', es: 'Calculadora de PPI' } },
  { mode: 'motion-blur', url: '/teste-de-ghosting-monitor/', label: { pt: 'Ghosting e motion blur', en: 'Ghosting and motion blur', es: 'Ghosting y motion blur' } },
];

export function FooterSection({ onLaunch }) {
  const { locale, t } = useI18n();
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ms_studio_theme');
        if (saved) return saved === 'dark';
      } catch {
        /* preferência indisponível */
      }
    }
    return true;
  });

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark', 'ms-studio-dark');
      root.classList.remove('ms-studio-light', 'light-mode');
      try { localStorage.setItem('ms_studio_theme', 'dark'); } catch { /* não persistido */ }
    } else {
      root.classList.remove('dark', 'ms-studio-dark');
      root.classList.add('ms-studio-light', 'light-mode');
      try { localStorage.setItem('ms_studio_theme', 'light'); } catch { /* não persistido */ }
    }
  }, [isDarkMode]);

  const handleToolClick = (event, modeId) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    if (onLaunch) {
      event.preventDefault();
      if (modeId === 'home') {
        onLaunch('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const resolved = resolveToolLaunch(modeId);
      onLaunch(resolved ? {
        id: resolved.toolId,
        launchMode: resolved.mode,
        color: resolved.preset.customColor,
        brightness: resolved.preset.ambientBrightness,
      } : modeId);
    }
  };

  const renderLinks = (list) => list.map((item) => (
    <li key={item.mode}>
      <a href={item.url} onClick={(event) => handleToolClick(event, item.mode)}>
        {item.label[locale] || item.label.pt}
      </a>
    </li>
  ));

  return (
    <footer className="msx-footer msx-scan" data-testid="site-footer">
      <div className="msx-footer__grid">
        <div>
          <div className="msx-wordmark" style={{ marginBottom: 16 }}>
            <BrandLogo size={44} />
            MONITOR<em>SMITH</em>
          </div>
          <p style={{ margin: '0 0 22px', maxWidth: '38ch', color: 'var(--msx-ink-2)', fontSize: '0.88rem', lineHeight: 1.7 }}>
            {t('footer.tagline')}
          </p>

          <div className="msx-wrap" style={{ alignItems: 'center' }}>
            <LanguageSwitcher />
            <button
              type="button"
              className="msx-btn"
              onClick={() => setIsDarkMode((value) => !value)}
              aria-label={isDarkMode ? t('footer.theme.light') : t('footer.theme.dark')}
              data-testid="theme-toggle"
            >
              {isDarkMode
                ? <MoonDuotone width={16} height={16} />
                : <SunDuotone width={16} height={16} />}
              {isDarkMode ? t('footer.theme.dark') : t('footer.theme.light')}
            </button>
            <a
              href="https://www.linkedin.com/in/matheus-peres-da-silva/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn EXVORN.TECH"
              className="msx-btn"
              style={{ padding: '13px 14px' }}
            >
              <LinkedInIcon width={16} height={16} />
            </a>
          </div>
        </div>

        <div>
          <h3>{t('footer.tools')}</h3>
          <ul>
            <li>
              <a href="#monitor-tools-home" onClick={(event) => handleToolClick(event, 'home')}>
                {t('nav.home')}
              </a>
            </li>
            {renderLinks(TOOL_LINKS)}
          </ul>
        </div>

        <div>
          <h3>{t('footer.guides')}</h3>
          <ul>
            {renderLinks(STUDIO_LINKS)}
            <li><a href="/blog/">{t('footer.blog')}</a></li>
          </ul>
        </div>

        <div>
          <h3>{t('footer.company')}</h3>
          <ul>
            <li><a href="/sobre/">{t('footer.about')}</a></li>
            <li><a href="/contato/">{t('footer.contact')}</a></li>
            <li><a href="/metodologia/">{t('footer.methodology')}</a></li>
            <li><PwaModal label={t('footer.install')} className="msx-linklike" /></li>
          </ul>
        </div>

        <div>
          <h3>{t('footer.legal')}</h3>
          <ul>
            <li><a href="/privacidade/">{t('footer.privacy')}</a></li>
            <li><a href="/termos/">{t('footer.terms')}</a></li>
            <li><a href="/cookies/">{t('footer.cookies')}</a></li>
            <li><a href="/aviso-legal/">{t('footer.disclaimer')}</a></li>
            <li><a href="/acessibilidade/">{t('footer.a11y')}</a></li>
            <li>
              <button type="button" className="msx-linklike" onClick={openConsentPreferences} data-testid="footer-consent">
                {t('footer.consent')}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="msx-footer__bar">
        <span>
          {t('footer.builtBy')}{' '}
          <a href="https://exvorn.tech/" target="_blank" rel="noreferrer" style={{ color: 'var(--msx-phos)' }}>EXVORN.TECH</a>
        </span>
        <span>© {new Date().getFullYear()} MonitorSmith · {t('footer.rights')}</span>
      </div>
    </footer>
  );
}

export default FooterSection;
