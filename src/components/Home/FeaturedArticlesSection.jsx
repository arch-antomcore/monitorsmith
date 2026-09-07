import { useI18n } from '../../i18n';

const FEATURED_ARTICLES = [
  {
    slug: 'ips-glow-vs-backlight-bleed',
    category: { pt: 'Diagnóstico de painel', en: 'Panel diagnosis', es: 'Diagnóstico de panel' },
    readTime: '6 min',
    title: {
      pt: 'IPS glow x backlight bleed: como diferenciar',
      en: 'IPS glow vs backlight bleed: telling them apart',
      es: 'IPS glow frente a backlight bleed: cómo diferenciarlos',
    },
    excerpt: {
      pt: 'O brilho angular do cristal líquido muda quando você mexe a cabeça; o vazamento mecânico fica parado na borda. Aprenda a separar os dois antes de pedir troca.',
      en: 'Angular liquid-crystal glow shifts when you move your head; mechanical bleed stays fixed at the bezel. Learn to separate both before asking for a replacement.',
      es: 'El glow angular del cristal líquido cambia al mover la cabeza; la fuga mecánica queda fija en el borde. Aprende a separarlos antes de pedir un cambio.',
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
      pt: 'Uniformidade de pretos, prevenção de burn-in, retenção temporária de imagem e o que realmente prolonga a vida útil de painéis OLED e QD-OLED.',
      en: 'Black uniformity, burn-in prevention, temporary image retention and what actually extends the life of OLED and QD-OLED panels.',
      es: 'Uniformidad de negros, prevención de burn-in, retención temporal de imagen y lo que realmente alarga la vida de paneles OLED y QD-OLED.',
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
      pt: 'sRGB, DCI-P3 e Adobe RGB na prática, ajuste de gama 2.2 e leitura de escala de cinza em fluxos de trabalho profissionais.',
      en: 'sRGB, DCI-P3 and Adobe RGB in practice, gamma 2.2 adjustment and grayscale reading in professional workflows.',
      es: 'sRGB, DCI-P3 y Adobe RGB en la práctica, ajuste de gamma 2.2 y lectura de escala de grises en flujos profesionales.',
    },
  },
  {
    slug: 'pixel-morto-vs-pixel-preso',
    category: { pt: 'Inspeção de pixels', en: 'Pixel inspection', es: 'Inspección de píxeles' },
    readTime: '5 min',
    title: {
      pt: 'Pixel morto x pixel preso: diagnóstico e garantia',
      en: 'Dead pixel vs stuck pixel: diagnosis and warranty',
      es: 'Píxel muerto frente a píxel atascado: diagnóstico y garantía',
    },
    excerpt: {
      pt: 'A diferença elétrica entre subpixel apagado e travado, os limites da ISO 9241-307 adotados pelos fabricantes e como rodar o ciclo cromático certo.',
      en: 'The electrical difference between a dark and a latched subpixel, the ISO 9241-307 limits manufacturers adopt and how to run the right colour cycle.',
      es: 'La diferencia eléctrica entre subpíxel apagado y bloqueado, los límites de ISO 9241-307 que adoptan los fabricantes y cómo hacer el ciclo cromático correcto.',
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
      pt: 'Como descobrir se o seu display esmaga sombras (black crush) ou queima realces, usando padrões de dezesseis níveis.',
      en: 'How to find out whether your display crushes shadows or clips highlights, using sixteen-step patterns.',
      es: 'Cómo descubrir si tu pantalla aplasta las sombras o quema las luces, con patrones de dieciséis niveles.',
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
      pt: 'Renderização em canvas sincronizada com VSync, cálculo de densidade óptica, acuidade Snellen 20/20 e processamento inteiramente local.',
      en: 'VSync-synchronised canvas rendering, optical density maths, Snellen 20/20 acuity and fully local processing.',
      es: 'Renderizado en canvas sincronizado con VSync, cálculo de densidad óptica, agudeza Snellen 20/20 y procesamiento totalmente local.',
    },
  },
];

const COPY = {
  pt: { eyebrow: 'Guias técnicos', title: 'Artigos que explicam o porquê.', lead: 'Conteúdo escrito pela equipe de engenharia da EXVORN.TECH, com fontes, normas e limites declarados.', read: 'Ler o artigo', all: 'Ver os 33 artigos do blog', by: 'Por EXVORN.TECH' },
  en: { eyebrow: 'Technical guides', title: 'Articles that explain the why.', lead: 'Written by the EXVORN.TECH engineering team, with sources, standards and stated limits.', read: 'Read the article', all: 'See all 33 blog articles', by: 'By EXVORN.TECH' },
  es: { eyebrow: 'Guías técnicas', title: 'Artículos que explican el porqué.', lead: 'Escritos por el equipo de ingeniería de EXVORN.TECH, con fuentes, normas y límites declarados.', read: 'Leer el artículo', all: 'Ver los 33 artículos del blog', by: 'Por EXVORN.TECH' },
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
