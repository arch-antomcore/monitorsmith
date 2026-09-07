import { useI18n } from '../../i18n';

export default function LanguageSwitcher({ className = '' }) {
  const { locale, setLocale, locales, t } = useI18n();

  return (
    <div className={`msx-lang ${className}`} role="group" aria-label={t('nav.language')}>
      {locales.map((item) => (
        <button
          key={item.code}
          type="button"
          aria-pressed={locale === item.code}
          onClick={() => setLocale(item.code)}
          title={item.label}
          data-testid={`lang-${item.code}`}
        >
          {item.short}
        </button>
      ))}
    </div>
  );
}
