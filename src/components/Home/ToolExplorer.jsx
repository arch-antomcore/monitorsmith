import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ControlIcon } from '../Controls/Navbar';
import { CATEGORY_I18N, TOOL_CATEGORIES, TOOL_LIBRARY } from '../../constants/tools';
import { useI18n } from '../../i18n';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

function localized(tool, locale) {
  if (locale === 'pt' || !tool.i18n?.[locale]) {
    return { title: tool.title, description: tool.description };
  }
  return tool.i18n[locale];
}

function categoryLabel(category, locale) {
  if (locale === 'pt') return category;
  return CATEGORY_I18N[category]?.[locale] || category;
}

export default function ToolExplorer({ onLaunch }) {
  const { locale, t } = useI18n();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const tools = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return TOOL_LIBRARY.filter((tool) => {
      if (category !== 'all' && tool.category !== category) return false;
      if (!needle) return true;
      const text = localized(tool, locale);
      return [tool.id, tool.title, tool.description, text.title, text.description, tool.shortcut, tool.category]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(needle));
    });
  }, [category, locale, query]);

  return (
    <section className="msx-section" id="monitor-tools" aria-labelledby="tools-title">
      <div className="msx-inner">
        <div className="msx-head">
          <div>
            <p className="msx-eyebrow">{t('explorer.eyebrow')} · {TOOL_LIBRARY.length} {t('explorer.count')}</p>
            <h2 id="tools-title" className="msx-title">{t('explorer.title')}</h2>
          </div>
          <div>
            <div className="msx-head__ticks" aria-hidden="true">
              {Array.from({ length: 28 }, (unused, index) => <span key={index} />)}
            </div>
            <p className="msx-lead">{t('explorer.lead')}</p>
          </div>
        </div>

        <div className="msx-toolbar">
          <div className="msx-toolbar__search">
            <SearchIcon />
            <input
              className="msx-input"
              type="search"
              value={query}
              placeholder={t('explorer.search')}
              aria-label={t('explorer.searchLabel')}
              onChange={(event) => setQuery(event.target.value)}
              data-testid="tool-search"
            />
          </div>
          <div className="msx-toolbar__filters">
            <button type="button" className="msx-chip" aria-pressed={category === 'all'} onClick={() => setCategory('all')} data-testid="filter-all">
              {t('explorer.all')}
            </button>
            {TOOL_CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                className="msx-chip"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                data-testid={`filter-${item}`}
              >
                {categoryLabel(item, locale)}
              </button>
            ))}
          </div>
        </div>

        {tools.length === 0 ? (
          <div className="msx-empty" data-testid="tool-empty">
            <p style={{ margin: '0 0 16px' }}>{t('explorer.empty')}</p>
            <button
              type="button"
              className="msx-btn"
              onClick={() => { setQuery(''); setCategory('all'); }}
              data-testid="tool-clear"
            >
              {t('explorer.clear')}
            </button>
          </div>
        ) : (
          <div className="msx-grid" data-testid="tool-grid">
            {tools.map((tool, index) => {
              const text = localized(tool, locale);
              const guideSlug = locale === 'en' ? tool.seoSlugEn : tool.seoSlug;
              return (
                <motion.div
                  key={tool.id}
                  className="msx-card"
                  id={`monitor-tool-grid-${tool.id}`}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.36, delay: Math.min(index, 8) * 0.035, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(event) => {
                    if (!event.target.closest('a, button')) {
                      onLaunch(tool.id, `monitor-tool-grid-${tool.id}`);
                    }
                  }}
                >
                  <span className="msx-card__corner" aria-hidden="true" />
                  <div className="msx-card__top">
                    <span className="msx-card__id">MS-{String(index + 1).padStart(2, '0')}</span>
                    <span className="msx-card__cat">{categoryLabel(tool.category, locale)}</span>
                    <span className="msx-card__top-spacer" />
                    {tool.isRecent ? <span className="msx-badge">{t('explorer.new')}</span> : null}
                    <span className="msx-led" aria-hidden="true" />
                    {tool.shortcut && tool.shortcut !== '\u2014' ? <kbd className="msx-kbd">{tool.shortcut}</kbd> : null}
                  </div>

                  <span className="msx-card__icon" aria-hidden="true">
                    <ControlIcon name={tool.icon} size={20} />
                  </span>

                  <h3 className="msx-card__name">{text.title}</h3>
                  <p className="msx-card__desc">{text.description}</p>

                  {tool.needsPermission ? (
                    <p className="msx-card__flag">{t('explorer.requires')}</p>
                  ) : null}

                  {guideSlug ? (
                    <a
                      href={`/${guideSlug}/`}
                      className="msx-card__guide"
                      data-testid={`guide-${tool.id}`}
                    >
                      {t('explorer.guide')}
                    </a>
                  ) : null}

                  <button
                    type="button"
                    className="msx-card__foot"
                    onClick={() => onLaunch(tool.id, `monitor-tool-grid-${tool.id}`)}
                    aria-label={`${t('explorer.open')} ${text.title}`}
                    data-testid={`open-${tool.id}`}
                  >
                    <span>{t('explorer.open')}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
