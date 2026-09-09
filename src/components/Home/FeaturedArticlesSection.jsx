import { useI18n } from '../../i18n';

const FEATURED_ARTICLES = [
  {
    slug: 'ips-glow-vs-backlight-bleed',
    category: { pt: 'Inspeção de painel', en: 'Panel inspection', es: 'Inspección de panel' },
    readTime: '4 min',
    title: {
      pt: 'IPS glow e backlight bleed: comparação por ângulo e posição',
      en: 'IPS glow and backlight bleed: comparing angle and position',
      es: 'IPS glow y backlight bleed: comparación por ángulo y posición',
    },
    excerpt: {
      pt: 'Compare brilho aparente em cenas escuras variando ângulo, distância e posição, sem transformar uma observação visual em diagnóstico do painel.',
      en: 'Compare apparent brightness in dark scenes by changing angle, distance and position, without treating visual observation as a panel diagnosis.',
      es: 'Compara el brillo aparente en escenas oscuras variando el ángulo, la distancia y la posición, sin tratar la observación como diagnóstico.',
    },
  },
  {
    slug: 'como-testar-monitor-oled',
    category: { pt: 'Tecnologia OLED', en: 'OLED technology', es: 'Tecnología OLED' },
    readTime: '4 min',
    title: {
      pt: 'Como inspecionar um monitor OLED novo ou usado',
      en: 'How to inspect a new or used OLED monitor',
      es: 'Cómo inspeccionar un monitor OLED nuevo o usado',
    },
    excerpt: {
      pt: 'Confira sinal, superfície, cores, uniformidade aparente, retenção e rotinas de manutenção seguindo os controles previstos pelo fabricante.',
      en: 'Check signal, surface, colours, apparent uniformity, retention and maintenance routines using the controls provided by the manufacturer.',
      es: 'Comprueba señal, superficie, colores, uniformidad aparente, retención y mantenimiento con los controles previstos por el fabricante.',
    },
  },
  {
    slug: 'calibrar-monitor-fotografia-design',
    category: { pt: 'Calibração e cor', en: 'Calibration and colour', es: 'Calibración y color' },
    readTime: '4 min',
    title: {
      pt: 'Calibração de monitor para fotografia e design',
      en: 'Monitor calibration for photography and design',
      es: 'Calibración de monitor para fotografía y diseño',
    },
    excerpt: {
      pt: 'O que padrões visuais conseguem verificar, quando usar um colorímetro e como manter um fluxo de cor documentado.',
      en: 'What visual patterns can check, when to use a colorimeter and how to maintain a documented colour workflow.',
      es: 'Qué pueden comprobar los patrones visuales, cuándo usar un colorímetro y cómo documentar el flujo de color.',
    },
  },
  {
    slug: 'pixel-morto-vs-pixel-preso',
    category: { pt: 'Inspeção de pixels', en: 'Pixel inspection', es: 'Inspección de píxeles' },
    readTime: '4 min',
    title: {
      pt: 'Ponto escuro, claro ou colorido: como registrar a diferença',
      en: 'Dark, bright or coloured dot: how to record the difference',
      es: 'Punto oscuro, claro o de color: cómo registrar la diferencia',
    },
    excerpt: {
      pt: 'Monte um registro comparável de pontos aparentes e evite concluir a causa física apenas pela aparência.',
      en: 'Create a comparable record of apparent dots without inferring their physical cause from appearance alone.',
      es: 'Crea un registro comparable de puntos aparentes sin concluir su causa física solo por la apariencia.',
    },
  },
  {
    slug: 'teste-contraste-gama-monitor',
    category: { pt: 'Padrões visuais', en: 'Test patterns', es: 'Patrones visuales' },
    readTime: '4 min',
    title: {
      pt: 'Contraste e resposta tonal do monitor: teste visual',
      en: 'Monitor contrast and tonal response: a visual check',
      es: 'Contraste y respuesta tonal del monitor: prueba visual',
    },
    excerpt: {
      pt: 'Observe recorte e separação tonal, entenda funções de transferência e registre ajustes sem confundir triagem com medição.',
      en: 'Observe clipping and tonal separation, understand transfer functions and record adjustments without confusing screening with measurement.',
      es: 'Observa recorte y separación tonal, entiende las funciones de transferencia y registra ajustes sin confundir revisión con medición.',
    },
  },
  {
    slug: 'guia-completo-monitorsmith',
    category: { pt: 'Arquitetura e Web APIs', en: 'Architecture and Web APIs', es: 'Arquitectura y Web APIs' },
    readTime: '5 min',
    title: {
      pt: 'Guia do MonitorSmith: como testar uma hipótese no navegador',
      en: 'MonitorSmith guide: testing a hypothesis in the browser',
      es: 'Guía de MonitorSmith: cómo probar una hipótesis en el navegador',
    },
    excerpt: {
      pt: 'Formule uma pergunta, controle variáveis, registre observações e escolha uma verificação seguinte ao usar as 27 ferramentas.',
      en: 'Frame a question, control variables, record observations and choose the next check while using the 27 tools.',
      es: 'Formula una pregunta, controla variables, registra observaciones y elige la siguiente comprobación al usar las 27 herramientas.',
    },
  },
];

const COPY = {
  pt: { eyebrow: 'Guias técnicos', title: 'Artigos que explicam o porquê.', lead: 'Conteúdo da equipe editorial MonitorSmith · EXVORN.TECH, com fontes, método prático e limites declarados.', policy: 'Conheça o processo editorial.', read: 'Ler o artigo', all: 'Ver os 33 artigos do blog' },
  en: { eyebrow: 'Technical guides', title: 'Articles that explain the why.', lead: 'Content from the MonitorSmith · EXVORN.TECH editorial team, with sources, practical methods and stated limits.', policy: 'See the editorial process.', read: 'Read in Portuguese', all: 'See all 33 blog articles' },
  es: { eyebrow: 'Guías técnicas', title: 'Artículos que explican el porqué.', lead: 'Contenido del equipo editorial MonitorSmith · EXVORN.TECH, con fuentes, métodos prácticos y límites declarados.', policy: 'Consulta el proceso editorial.', read: 'Leer en portugués', all: 'Ver los 33 artículos del blog' },
};

export default function FeaturedArticlesSection() {
  const { locale } = useI18n();
  const copy = COPY[locale] || COPY.pt;
  const pick = (field) => field[locale] || field.pt;

  return (
    <section className="msx-section msx-section--alt" id="guias" aria-labelledby="featured-articles-title">
      <div className="msx-inner">
        <div className="msx-head">
          <div>
            <p className="msx-eyebrow">{copy.eyebrow}</p>
            <h2 id="featured-articles-title" className="msx-title">{copy.title}</h2>
          </div>
          <p className="msx-lead">
            {copy.lead}{' '}
            <a href="/politica-editorial/" className="msx-inline-link">{copy.policy}</a>
          </p>
        </div>

        <div className="msx-grid">
          {FEATURED_ARTICLES.map((article) => (
            <article className="msx-card" key={article.slug} style={{ cursor: 'default' }}>
              <span className="msx-card__corner" aria-hidden="true" />
              <div className="msx-card__top">
                <span className="msx-card__cat msx-card__id">{pick(article.category)}</span>
                <span className="msx-card__top-spacer" />
                {locale !== 'pt' ? <span lang="pt-BR">PT-BR</span> : null}
                <span>{article.readTime}</span>
              </div>

              <h3 className="msx-card__name" style={{ marginTop: 10 }}>
                <a href={`/blog/${article.slug}/`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {pick(article.title)}
                </a>
              </h3>
              <p className="msx-card__desc">{pick(article.excerpt)}</p>

              <a
                href={`/blog/${article.slug}/`}
                className="msx-card__foot"
                style={{ textDecoration: 'none' }}
                data-testid={`article-${article.slug}`}
              >
                <span>{copy.read}</span>
                <span>→</span>
              </a>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
          <a href="/blog/" className="msx-btn msx-btn--primary" data-testid="blog-cta">
            {copy.all} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
