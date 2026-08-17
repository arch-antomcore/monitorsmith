# Playbook Universal: SEO, GEO e Padronização llms.txt (v2)

Este guia define a arquitetura moderna para otimização de mecanismos de busca tradicionais (SEO no Google, Bing) e sistemas de IA generativa (GEO — Generative Engine Optimization para ChatGPT, Claude, Gemini, Perplexity e agentes autônomos).

---

## 1. Padrão Oficial `llms.txt` (Especificação v2 — llmstxt.org)

O arquivo `/llms.txt` é a convenção padrão para que modelos de linguagem e agentes de IA entendam o propósito, as rotas e os dados do seu site em formato limpo, direto e sem ruído de HTML.

### Estrutura Obrigatória do `llms.txt`:
1. **Título H1 (`# NomeDoProjeto`):** O único bloco estritamente obrigatório.
2. **Blockquote (`> Resumo`):** Resumo conciso de 1 a 2 parágrafos com as principais capacidades e propósito.
3. **Notas de Contexto:** Lista rápida com URL, idioma, PWA e política de processamento de dados.
4. **Seções de Categorias (`## Categoria`):** Seções H2 agrupando ferramentas ou recursos.
5. **File Lists no Formato Canônico:** `- [Nome da Ferramenta](URL): Descrição direta da funcionalidade.`
6. **Seção `## Optional`:** Seção de convenção para links que o agente pode ignorar se tiver contexto curto (Termos, Privacidade, documentação estendida `llms-full.txt`).

### Exemplo de Template Canônico `llms.txt`:

```markdown
# NomeDoProjeto

> NomeDoProjeto é uma suíte web de ferramentas para [propósito principal]. Funciona no navegador, sem cadastro. Desenvolvido por [Empresa/Autor].

- URL: https://seudominio.com
- Idioma principal: pt-BR
- Instalável como PWA para uso offline
- Todas as ferramentas processam dados localmente no dispositivo

## Ferramentas de [Categoria 1]

- [Ferramenta A](https://seudominio.com/rota-a/): Descrição direta do que ela faz, parâmetros e atalhos.
- [Ferramenta B](https://seudominio.com/rota-b/): Descrição técnica do objetivo e aplicação prática.

## Ferramentas de [Categoria 2]

- [Ferramenta C](https://seudominio.com/rota-c/): Descrição focada em utilidade e casos de uso.

## Optional

- [Política de Privacidade](https://seudominio.com/privacidade/): Tratamento de dados, cookies e terceiros.
- [Termos de Serviço](https://seudominio.com/termos/): Condições de uso e responsabilidades.
- [llms-full.txt](https://seudominio.com/llms-full.txt): Documentação técnica estendida e aprofundada.
```

---

## 2. Padrão para `llms-full.txt` (Contexto Profundo para RAG/Agentes)

Enquanto o `llms.txt` é um índice enxuto, o `llms-full.txt` deve conter o **conteúdo real inline**, atalhos de teclado, detalhes de implementação, princípios de engenharia e limites práticos, permitindo que um agente responda a perguntas complexas sem precisar disparar requisições HTTP para cada página individual.

---

## 3. Descoberta Automática de IA via HTML (`rel="describedby"`)

Para que agentes descubram o seu `llms.txt` a partir de qualquer página do site, inclua a tag de descoberta no `<head>` do seu `index.html`:

```html
<link rel="describedby" href="/llms.txt" type="text/markdown" />
```

---

## 4. Grafo Estruturado Schema.org (JSON-LD)

Todo projeto profissional deve fornecer dados semânticos estruturados via JSON-LD em uma única tag `<script type="application/ld+json">`.

### Esquemas Recomendados por Tipo de Página:

1. **Página Inicial (Home):**
   - `@type: "WebSite"` (Nome, URL, busca interna)
   - `@type: "Organization"` (Nome, logo, URL oficial)
   - `@type: "WebApplication"` (Nome, categoria, compatibilidade, gratuito)
   - `@type: "FAQPage"` (Perguntas e respostas reais)

2. **Páginas de Ferramenta / Artigos / Guias:**
   - `@type: "TechArticle"` ou `"Article"` (Título, descrição, data de publicação, data de modificação, autor, publisher)
   - `@type: "BreadcrumbList"` (Navegação hierárquica `Home → Ferramenta`)
   - `@type: "FAQPage"` (Perguntas técnicas frequentes da ferramenta específica)

### Exemplo de JSON-LD Multifunção:

```json
[
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "NomeDoProjeto",
    "url": "https://seudominio.com/",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "publisher": { "@type": "Organization", "name": "Empresa", "url": "https://empresa.com" }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://seudominio.com/" },
      { "@type": "ListItem", "position": 2, "name": "Nome da Ferramenta", "item": "https://seudominio.com/ferramenta/" }
    ]
  }
]
```

---

## 5. Arquitetura Híbrida: SPA + Gerador de Páginas Estáticas (SSG)

Para garantir 100% de indexação em buscadores e aprovação no AdSense:

1. **A Aplicação:** Roda como SPA rica e rápida em React/Vite/Vue com transições instantâneas.
2. **O Build (`scripts/generate-seo-pages.mjs`):** Durante o `npm run build`, um script Node.js gera arquivos `dist/<slug>/index.html` estáticos e pré-renderizados para cada rota do catálogo.
3. **Benefícios:**
   - Crawlers sem JS leem o HTML completo, títulos e metadados instantaneamente.
   - Navegadores humanos carregam a versão estática e hidratam o app interativo.
   - Zero dependência de servidores complexos (SSR/Next.js), podendo hospedar em GitHub Pages, Cloudflare Pages, Vercel ou Netlify estático.

---

## 6. Checklist de Meta Tags Essenciais no `<head>`

```html
<!-- Charset e Viewport -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<meta name="theme-color" content="#030304" />

<!-- SEO Básico -->
<title>Nome do App — Proposta de Valor Clara</title>
<meta name="description" content="Descrição objetiva de até 155 caracteres sem clichês de marketing." />
<meta name="author" content="Nome do Autor ou Empresa" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

<!-- Canonical & Multilíngue (Hreflang) -->
<link rel="canonical" href="https://seudominio.com/pagina/" />
<link rel="alternate" hreflang="pt-BR" href="https://seudominio.com/pagina/" />
<link rel="alternate" hreflang="en" href="https://seudominio.com/en/page/" />
<link rel="alternate" hreflang="x-default" href="https://seudominio.com/pagina/" />

<!-- OpenGraph (Facebook, LinkedIn, Discord) -->
<meta property="og:type" content="website" />
<meta property="og:locale" content="pt_BR" />
<meta property="og:site_name" content="Nome do App" />
<meta property="og:title" content="Nome do App — Proposta de Valor Clara" />
<meta property="og:description" content="Descrição clara do conteúdo." />
<meta property="og:url" content="https://seudominio.com/pagina/" />
<meta property="og:image" content="https://seudominio.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Nome do App — Proposta de Valor Clara" />
<meta name="twitter:description" content="Descrição clara do conteúdo." />
<meta name="twitter:image" content="https://seudominio.com/og-image.jpg" />

<!-- PWA & LLMs -->
<link rel="icon" type="image/png" href="/logo.png" />
<link rel="manifest" href="/manifest.webmanifest" />
<link rel="describedby" href="/llms.txt" type="text/markdown" />
```
