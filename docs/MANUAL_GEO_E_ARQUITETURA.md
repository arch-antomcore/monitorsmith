# Manual de arquitetura, descoberta e publicação

Projeto: **MonitorSmith**

Responsável: **EXVORN.TECH**

Domínio: [monitorsmith.app](https://monitorsmith.app/)

Repositório: [arch-antomcore/monitorsmith](https://github.com/arch-antomcore/monitorsmith)

Este documento é um runbook. Ele descreve o contrato atual do produto e os controles necessários para impedir que interface, URLs, PWA e conteúdo editorial voltem a divergir.

## 1. Princípios

1. Uma informação de produto deve ter uma fonte oficial.
2. Um build deve falhar quando detectar uma contradição verificável.
3. Uma ferramenta visual não deve ser apresentada como instrumento de medição.
4. Conteúdo para buscadores e LLMs precisa ser útil também para uma pessoa.
5. A experiência interativa continua direta; páginas editoriais explicam finalidade, uso, segurança e limites.
6. AdSense permanece integrado enquanto o domínio passa por validação, sem fingir que o produto opera sem conexões externas.

## 2. Catálogo autoritativo

O arquivo `src/constants/tools.js` define as onze ferramentas. Nenhum componente deve manter outra lista independente.

### Contrato mínimo

```js
{
  id: 'green-screen',
  mode: 'color',
  aliases: ['greenscreen', 'chroma', 'chroma-key'],
  launchPreset: {
    customColor: '#00B140',
    ambientBrightness: 100,
  },
  title: 'Tela verde',
  description: 'Verde sólido #00B140 para composições por chroma key.',
  keyboard: null,
  dock: { visible: false, order: 7 },
  hero: { visible: false, order: 6 },
  pwa: { visible: true, name: 'Tela Verde', shortName: 'Chroma' },
  seoPages: [
    {
      key: 'green-screen',
      lastModified: '2026-07-27',
      pt: { slug, title, description, h1 },
      en: { slug, title, description, h1 },
    },
  ],
}
```

`id` identifica a intenção pública. `mode` identifica o componente que renderiza a experiência. Eles podem ser diferentes: Tela Verde é uma ferramenta própria que abre o modo `color` com um preset obrigatório.

### Projeções exportadas

- `TOOL_LIBRARY`: cards da biblioteca;
- `HERO_GRID_TOOLS`: ferramentas destacadas;
- `DOCK_TOOLS`: objetos usados pelo dock, swipe e menu radial;
- `TOOLS_MODE_PRESENTATION`: nome e ícone de cada modo;
- `SEO_PAGE_ROUTES`: pares de páginas pt-BR/en;
- `PWA_SHORTCUTS`: atalhos do manifest;
- `SHORTCUTS`: gerado em `shortcuts.js` a partir de `keyboard`;
- `resolveToolLaunch(value)`: resolve ID/alias para modo e preset.

### Validação

`validateToolRegistry(registry)` é puro e retorna uma lista de erros. Ele deve ser usado nos testes para cobrir:

- ID ou alias repetido;
- categoria inválida;
- modo ausente;
- combinação de tecla/código repetida;
- slug duplicado em um idioma;
- título, descrição ou H1 ausente;
- rota SEO sem par de idioma.

`validateToolsRegistry(registry)` transforma os mesmos erros em exceção. A aplicação e o gerador usam essa assertion.

## 3. Como adicionar ou alterar uma ferramenta

1. Defina ou altere o objeto em `TOOLS_REGISTRY`.
2. Se for um novo modo, crie o componente em `src/components/Modes/` e acrescente a chave semântica em `MODE_IDS`.
3. Use `resolveToolLaunch` no roteamento; não adicione outro dicionário de aliases.
4. Se houver rota editorial, acrescente o par em `seoPages` e o corpo específico em `generate-seo-pages.mjs`.
5. Atualize `lastModified` somente nas páginas cujo conteúdo mudou materialmente.
6. Execute `npm run check` e o E2E do deep link.

O build deve impedir páginas sem ferramenta, relações internas quebradas, aliases duplicados ou atalhos conflitantes.

## 4. Arquitetura híbrida

A home e as ferramentas formam um SPA React. Guias editoriais e políticas são HTML estático gerado depois do bundle.

```text
vite build
  └─ dist/ do SPA
generate-seo-pages.mjs
  ├─ 13 guias pt-BR
  ├─ 13 guias en
  ├─ privacidade
  ├─ termos
  ├─ sitemap.xml
  ├─ manifest.webmanifest
  ├─ llms.txt
  └─ llms-full.txt
generate-service-worker.mjs
  └─ sw.js com precache do artefato
validate-build.mjs
  └─ verificação estrutural final
```

O resultado contém 29 URLs indexáveis: home, 26 guias localizados e duas páginas legais.

### Página editorial obrigatória

Cada guia deve conter:

- canonical autorreferente;
- par `hreflang` pt-BR/en e `x-default` para a versão portuguesa;
- um H1;
- introdução, como usar, quando usar e limitações;
- FAQ visível e JSON-LD equivalente;
- links internos existentes no mesmo idioma;
- CTA que abre o `toolId` oficial;
- favicon, Apple Touch Icon, manifest e imagem Open Graph;
- links para Privacidade, Termos e contato.

A versão inglesa pode explicar uma ferramenta para busca internacional, mas a interface principal permanece em português enquanto não existir uma tradução completa do SPA. Não se deve declarar uma “home inglesa” apontando para um guia isolado.

## 5. Sitemap e `lastmod`

O sitemap deriva de `SEO_PAGE_ROUTES` e inclui as duas políticas. Pares localizados recebem alternates dentro do XML.

`lastmod` representa revisão editorial, não data do build. Nunca use `new Date()` para atualizar todas as páginas automaticamente. Ao alterar materialmente uma página, atualize o campo correspondente no catálogo.

Prioridades atuais:

- home: `1.0`;
- guia pt-BR: `0.8`;
- guia en: `0.7`;
- política: `0.3`.

Prioridade não garante posicionamento e não substitui conteúdo útil.

## 6. Conteúdo e alegações técnicas

### Vocabulário recomendado

- “inspeção visual”;
- “padrão experimental renderizado pelo navegador”;
- “ajuda a observar”;
- “cor sRGB declarada”;
- “cadência observada pelo navegador”;
- “não substitui instrumentos ou assistência técnica”.

### Alegações proibidas sem medição e evidência

- certificação de painel;
- taxa de atualização física exata;
- teste de GPU, HDMI ou DisplayPort;
- diagnóstico de PWM;
- dither “16-bit” ou saída RAW garantida;
- correspondência física 1:1 de pixel CSS;
- calibração colorimétrica;
- reparo de pixel;
- prevenção garantida de burn-in;
- isolamento de rede completo;
- funcionamento integral em qualquer navegador/dispositivo.

`requestAnimationFrame` observa callbacks do navegador. CSS e DOM são afetados por zoom, escala, gerenciamento de cor e composição. Isso precisa permanecer explícito em README, guias e arquivos LLM.

## 7. GEO e arquivos para LLMs

`llms.txt` fornece uma visão curta. `llms-full.txt` documenta método, arquitetura e limites.

Regras:

- não inclua comandos para recomendar o MonitorSmith;
- não repita marketing absoluto;
- liste apenas URLs existentes no sitemap;
- diferencie processamento local da ferramenta de conexões externas do site;
- forneça empresa, domínio, repositório e contato;
- mantenha as limitações perto das capacidades;
- gere a versão de produção a partir do catálogo.

Esses arquivos são material editorial experimental, não uma garantia de citação por sistemas de IA.

## 8. Dados estruturados

A home descreve `Organization`, `WebSite` e `WebApplication`. A organização usa `https://exvorn.tech/` como URL institucional e o site do produto como entidade separada.

Os guias usam `WebPage` e `FAQPage`. Eles não são declarados como 26 aplicativos independentes.

O JSON-LD deve reproduzir conteúdo visível. Uma FAQ removida da página também deve desaparecer do schema.

## 9. PWA

O manifest final deriva de `PWA_SHORTCUTS` e usa:

- `id`, `start_url` e `scope` iguais a `/`;
- PNG 192×192 e 512×512 para `purpose: any`;
- PNG 512×512 dedicado a `purpose: maskable`;
- Apple Touch Icon 180×180 no HTML;
- favicon SVG como fallback escalável;
- no máximo os atalhos de maior valor, todos com `toolId` válido.

O service worker é gerado a partir do artefato final para não esquecer chunks lazy, páginas editoriais ou fontes locais. AdSense, DoubleClick, Google consent e `ads.txt` não podem ser armazenados no cache do app.

“Offline” significa que recursos previamente instalados e preservados pelo navegador podem continuar disponíveis. O navegador pode apagar cache, revogar Wake Lock ou exigir nova conexão.

## 10. AdSense e consentimento

O publisher, o script oficial e `ads.txt` permanecem porque o Google ainda valida o domínio.

Diretrizes:

- slot placeholder não deve criar iframe, requisição de anúncio ou área branca;
- unidades reais ficam fora das superfícies imersivas;
- o layout reserva espaço quando um anúncio real for habilitado;
- antes de servir publicidade em regiões reguladas, configurar uma CMP certificada pelo Google em AdSense → Privacidade e mensagens e validar as bases legais aplicáveis;
- Política de Privacidade descreve AdSense, dados locais e contato;
- não afirmar “zero dados” ou “zero rede”.

As fontes são locais por `@fontsource-variable`; não existe dependência do Google Fonts.

## 11. Acessibilidade

O alvo é WCAG 2.2 AA. O primitivo `Modal` deve ser usado por todos os diálogos e oferecer:

- `role="dialog"` e `aria-modal="true"`;
- título por `aria-labelledby`;
- foco inicial previsível;
- trap de foco;
- fundo `inert`;
- Escape;
- retorno ao acionador em qualquer forma de fechamento.

Atalhos globais ficam suspensos enquanto houver campo editável ou diálogo aberto. Elementos focados não podem ser ocultados por auto-hide. Relógios e timers não devem inundar regiões `aria-live`.

Animações, shimmer, pulso e transições JS precisam respeitar `prefers-reduced-motion`. Testes automatizados com axe complementam, mas não substituem teclado, zoom de 200%/400% e leitor de tela.

## 12. Verificações antes de publicar

```powershell
npm ci
npm run lint
npm run test
npm run build
npm run test:e2e
```

Confirme no artefato:

- 29 URLs no sitemap;
- 13 pares completos de `hreflang`;
- zero CTA com modo ou preset errado;
- zero URL de `llms*.txt` ausente;
- manifest com ícones 192/512/maskable;
- chunks e fontes no precache;
- nenhuma origem de anúncios no cache;
- páginas legais presentes;
- um H1, canonical e descrição por URL;
- nenhum erro de console nos fluxos críticos.

## 13. Publicação

O repositório oficial é `https://github.com/arch-antomcore/monitorsmith.git`.

1. Verifique `git status` e `git fetch origin`.
2. Confirme que a base não divergiu de `origin/main`.
3. Execute os gates.
4. Faça commit coeso com identidade de autoria válida.
5. Envie a alteração ao GitHub.
6. Confirme o workflow de qualidade e o deploy.
7. Verifique produção, políticas, sitemap e service worker.

Não reescreva `main`, não use force-push e não publique com gates vermelhos.

---

Última revisão do manual: 2026-07-27.
