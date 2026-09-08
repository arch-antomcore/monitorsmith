import { useI18n } from '../../i18n';

const FEATURED_ARTICLES = [
  {
    slug: 'ips-glow-vs-backlight-bleed',
    category: { pt: 'Inspeção de painel', en: 'Panel inspection', es: 'Inspección de panel' },
    readTime: '6 min',
    title: {
      pt: 'IPS glow x backlight bleed: como diferenciar',
      en: 'IPS glow vs backlight bleed: telling them apart',
      es: 'IPS glow frente a backlight bleed: cómo diferenciarlos',
    },
    excerpt: {
      pt: 'Compare como o brilho aparente muda com ângulo, distância e exposição e registre o que se repete antes de consultar a garantia.',
      en: 'Compare how apparent glow changes with angle, distance and exposure, and record what repeats before checking the warranty.',
      es: 'Compara cómo cambia el brillo aparente con el ángulo, la distancia y la exposición, y registra lo que se repite antes de consultar la garantía.',
    },
  },
  {
    slug: 'como-testar-monitor-oled',
    category: { pt: 'Tecnologia OLED', en: 'OLED technology', es: 'Tecnología OLED' },
    readTime: '8 min',
    title: {
      pt: 'Guia completo para testar e cuidar de monitores OLED',
      en: 'Complete guide to testing and caring for OLED monitors',
      es: 'Guía completa para probar y cuidar monitores OLED',
    },
    excerpt: {
      pt: 'Como observar uniformidade e retenção sem prometer prevenção ou diagnóstico, seguindo as proteções do fabricante.',
      en: 'How to observe uniformity and retention without promising prevention or diagnosis, while following manufacturer protections.',
      es: 'Cómo observar uniformidad y retención sin prometer prevención ni diagnóstico, siguiendo las protecciones del fabricante.',
    },
  },
  {
    slug: 'calibrar-monitor-fotografia-design',
    category: { pt: 'Calibração e cor', en: 'Calibration and colour', es: 'Calibración y color' },
    readTime: '7 min',
    title: {
      pt: 'Calibração visual de monitores para fotografia e design',
      en: 'Visual monitor calibration for photography and design',
      es: 'Calibración visual de monitores para fotografía y diseño',
    },
    excerpt: {
      pt: 'Espaços de cor, perfis ICC e os limites de uma verificação visual antes da medição instrumental.',
      en: 'Colour spaces, ICC profiles and the limits of visual checks before instrument measurement.',
      es: 'Espacios de color, perfiles ICC y los límites de una revisión visual antes de medir con instrumentos.',
    },
  },
  {
    slug: 'pixel-morto-vs-pixel-preso',
    category: { pt: 'Inspeção de pixels', en: 'Pixel inspection', es: 'Inspección de píxeles' },
    readTime: '5 min',
    title: {
      pt: 'Pontos escuros e coloridos: inspeção e registro',
      en: 'Dark and coloured dots: inspection and recording',
      es: 'Puntos oscuros y de color: inspección y registro',
    },
    excerpt: {
      pt: 'Como comparar fundos sólidos, descartar sujeira e documentar o sintoma para consultar a garantia vigente.',
      en: 'How to compare solid backgrounds, rule out dust and document a symptom against the current warranty.',
      es: 'Cómo comparar fondos sólidos, descartar suciedad y documentar el síntoma para consultar la garantía vigente.',
    },
  },
  {
    slug: 'teste-contraste-gama-monitor',
    category: { pt: 'Padrões visuais', en: 'Test patterns', es: 'Patrones visuales' },
    readTime: '6 min',
    title: {
      pt: 'Teste de contraste e gama: o que as barras revelam',
      en: 'Contrast and gamma test: what the bars reveal',
      es: 'Prueba de contraste y gamma: qué revelan las barras',
    },
    excerpt: {
      pt: 'Como observar a separação de sombras e realces e quais etapas da cadeia também alteram o resultado.',
      en: 'How to observe shadow and highlight separation and which pipeline stages can also change the result.',
      es: 'Cómo observar la separación de sombras y luces y qué etapas de la cadena también cambian el resultado.',
    },
  },
  {
    slug: 'guia-completo-monitorsmith',
    category: { pt: 'Arquitetura e Web APIs', en: 'Architecture and Web APIs', es: 'Arquitectura y Web APIs' },
    readTime: '10 min',
    title: {
      pt: 'Engenharia do MonitorSmith: como as ferramentas funcionam',
      en: 'MonitorSmith engineering: how the tools work',
      es: 'Ingeniería de MonitorSmith: cómo funcionan las herramientas',
    },
    excerpt: {
      pt: 'Padrões em canvas, estimativas temporais, cálculos geométricos e processamento das entradas das ferramentas na própria aba.',
      en: 'Canvas patterns, timing estimates, geometric calculations and in-tab processing of tool inputs.',
      es: 'Patrones en canvas, estimaciones temporales, cálculos geométricos y procesamiento de las entradas en la pestaña.',
    },
  },
];

const COPY = {
  pt: { eyebrow: 'Guias técnicos', title: 'Artigos que explicam o porquê.', lead: 'Conteúdo da equipe de engenharia da EXVORN.TECH, com método prático e limites declarados.', read: 'Ler o artigo', all: 'Ver os 33 artigos do blog', by: 'Por EXVORN.TECH' },
  en: { eyebrow: 'Technical guides', title: 'Articles that explain the why.', lead: 'Content from the EXVORN.TECH engineering team, with practical methods and stated limits.', read: 'Read the article', all: 'See all 33 blog articles', by: 'By EXVORN.TECH' },
  es: { eyebrow: 'Guías técnicas', title: 'Artículos que explican el porqué.', lead: 'Contenido del equipo de ingeniería de EXVORN.TECH, con métodos prácticos y límites declarados.', read: 'Leer el artículo', all: 'Ver los 33 artículos del blog', by: 'Por EXVORN.TECH' },
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
          <p className="msx-lead">{copy.lead}</p>
        </div>

        <div className="msx-grid">
          {FEATURED_ARTICLES.map((article) => (
            <article className="msx-card" key={article.slug} style={{ cursor: 'default' }}>
              <span className="msx-card__corner" aria-hidden="true" />
              <div className="msx-card__top">
                <span className="msx-card__cat msx-card__id">{pick(article.category)}</span>
                <span className="msx-card__top-spacer" />
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
