/* eslint-disable react-refresh/only-export-components -- provider e hook compartilham o mesmo contexto */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LOCALE, DICTIONARIES, LOCALES } from './dictionaries';

const STORAGE_KEY = 'ms_locale';
const I18nContext = createContext(null);

function detectLocale() {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const fromQuery = new URLSearchParams(window.location.search).get('lang');
  if (fromQuery && DICTIONARIES[fromQuery]) return fromQuery;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && DICTIONARIES[saved]) return saved;
  } catch {
    /* armazenamento indisponível */
  }
  const navigatorLang = (navigator.language || '').slice(0, 2).toLowerCase();
  return DICTIONARIES[navigatorLang] ? navigatorLang : DEFAULT_LOCALE;
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(detectLocale);

  useEffect(() => {
    const meta = LOCALES.find((item) => item.code === locale);
    document.documentElement.lang = meta?.htmlLang || 'pt-BR';
  }, [locale]);

  const setLocale = useCallback((next) => {
    if (!DICTIONARIES[next]) return;
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* preferência não persistida */
    }
  }, []);

  const value = useMemo(() => {
    const dictionary = DICTIONARIES[locale] || DICTIONARIES[DEFAULT_LOCALE];
    const fallback = DICTIONARIES[DEFAULT_LOCALE];
    return {
      locale,
      setLocale,
      locales: LOCALES,
      t: (key) => dictionary[key] ?? fallback[key] ?? key,
      /** Escolhe a variante traduzida de um objeto do catálogo de ferramentas. */
      pick: (entry) => (entry && (entry[locale] || entry[DEFAULT_LOCALE] || entry)) || entry,
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    const fallback = DICTIONARIES[DEFAULT_LOCALE];
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      locales: LOCALES,
      t: (key) => fallback[key] ?? key,
      pick: (entry) => entry,
    };
  }
  return context;
}


