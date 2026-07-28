# MonitorSmith

Ferramentas visuais para monitores, por [EXVORN.TECH](https://exvorn.tech/).

O MonitorSmith transforma uma aba do navegador em superfícies de inspeção, cor, iluminação e produtividade. Tela preta é uma das ferramentas — não a identidade inteira do produto.

- Produção: [monitorsmith.app](https://monitorsmith.app/)
- Repositório oficial: [arch-antomcore/monitorsmith](https://github.com/arch-antomcore/monitorsmith)
- Contato institucional: [exvorn.tech](https://exvorn.tech/)

## Escopo do produto

| Ferramenta | Modo | Atalho | Finalidade |
| --- | --- | --- | --- |
| Tela preta | `black` | `B` | Reduzir luz e observar pixels claros ou vazamentos em ambiente escuro |
| Teste de pixels | `dead-pixel` | — | Percorrer oito cores sólidas para inspeção visual |
| Inspeção para limpeza | `cleaner` | `C` | Evidenciar poeira e marcas antes da limpeza física |
| Verificação visual | `calibration` | `G` | Observar contraste, tons, gradientes e nitidez |
| Luz suave | `white` | `W` | Usar o monitor como fonte próxima de luz ajustável |
| Estúdio de cor | `color` | `S` | Exibir uma cor livre ou predefinida |
| Tela verde | `color` + preset | — | Abrir diretamente o preset `#00B140` |
| Timer de foco | `focus-timer` | `P` | Organizar ciclos de concentração e pausas |
| Relógio | `clock` | `T` | Mostrar hora e data em uma tela secundária |
| Mensagem em tela | `message` | `M` | Exibir avisos ou texto espelhado |
| Loop de marcas | `sponsor-loop` | `L` | Apresentar imagens locais em rotação |

Os testes são observacionais. O MonitorSmith não certifica painéis, não mede diretamente taxa física de atualização, PWM, cabo, GPU ou fidelidade colorimétrica e não substitui instrumentos ou assistência técnica.

## Stack

- React 18 e Vite
- Framer Motion
- CSS custom properties e Tailwind CSS
- Fullscreen API, Screen Wake Lock API, Web Audio e Service Worker
- Vitest, Playwright e axe-core
- GitHub Actions e GitHub Pages

As fontes Outfit e JetBrains Mono são empacotadas localmente por `@fontsource-variable`; a primeira renderização não depende do Google Fonts.

## Arquitetura

```text
src/
├── constants/
│   ├── tools.js                 catálogo autoritativo do produto
│   └── shortcuts.js             projeção dos atalhos e modos
├── context/AppContext.jsx       estado e ações globais
├── hooks/                       Web APIs e comportamento reutilizável
├── components/
│   ├── Controls/                navegação, dock e atalhos
│   ├── Home/                    apresentação e descoberta
│   ├── Modes/                   onze ferramentas de display
│   └── UI/                      primitivos e diálogos acessíveis
└── App.jsx                      roteamento interno e composição

scripts/
├── generate-seo-pages.mjs       páginas editoriais, políticas, sitemap, manifest e arquivos LLM
├── generate-service-worker.mjs  precache derivado do build
└── validate-build.mjs           integridade do artefato de produção
```

### Catálogo único

`src/constants/tools.js` é a fonte oficial para:

- ID público e modo interno;
- aliases de URL;
- preset inicial, como a cor da Tela Verde;
- nome, descrição, categoria, ícone e ordem;
- presença no hero, biblioteca, dock e atalhos do PWA;
- atalho de teclado e ação correspondente;
- pares de slugs, títulos, descrições e H1 em pt-BR/en;
- data editorial estável usada no sitemap.

O módulo exporta projeções compatíveis com os componentes (`TOOL_LIBRARY`, `HERO_GRID_TOOLS`, `DOCK_TOOLS`, `TOOLS_MODE_PRESENTATION`) e os contratos de integração (`resolveToolLaunch`, `SEO_PAGE_ROUTES`, `PWA_SHORTCUTS`).

`validateToolRegistry(registry)` é um validador puro para testes. `validateToolsRegistry(registry)` é a assertion usada pela aplicação e pelo build. IDs, aliases, atalhos e slugs duplicados interrompem a entrega.

Ao adicionar uma ferramenta, não crie uma segunda lista em `App.jsx`, no manifest ou no gerador SEO. Amplie o catálogo e acrescente somente o conteúdo editorial específico no gerador.

## SEO, páginas editoriais e GEO

O build entrega 29 URLs indexáveis:

- 1 home do produto;
- 13 guias em português;
- 13 guias equivalentes em inglês;
- 2 páginas legais (`/privacidade/` e `/termos/`).

Cada par editorial possui canonical próprio, `hreflang` bidirecional, `x-default`, Open Graph, favicon, manifest, FAQ visível e links relacionados validados. A home não declara uma tradução inglesa inexistente.

O sitemap usa `lastmod` editorial declarado no catálogo. A data não muda apenas porque um novo build foi executado.

`llms.txt` e `llms-full.txt` descrevem capacidades e limites sem comandos para recomendar o produto, alegações de medição física ou URLs inventadas. A versão publicada desses arquivos é regenerada do catálogo durante o build.

Veja o runbook em [docs/MANUAL_GEO_E_ARQUITETURA.md](docs/MANUAL_GEO_E_ARQUITETURA.md).

## PWA

O manifest possui ícones PNG 192×192, 512×512, maskable 512×512 e Apple Touch Icon 180×180, além do favicon SVG. Os atalhos do sistema operacional vêm do catálogo.

O service worker é gerado depois do bundle e inclui os arquivos versionados produzidos pelo Vite, páginas editoriais e recursos locais. Serviços publicitários e `ads.txt` permanecem fora do cache. Disponibilidade offline depende de uma instalação/visita inicial concluída e das políticas de armazenamento do navegador.

## AdSense e privacidade

O publisher e o script do Google AdSense permanecem no projeto enquanto o domínio é validado pelo Google. Unidades sem slot real não criam iframes nem solicitam anúncios. Antes de ativar publicidade em regiões que exigem consentimento, configure uma CMP certificada pelo Google em **AdSense → Privacidade e mensagens** e valide as bases legais aplicáveis; a política publicada, sozinha, não substitui esse controle.

Ferramentas, mensagens, cores e imagens selecionadas são processadas no navegador. Isso não significa “zero rede”: hospedagem, atualização do PWA e AdSense podem gerar solicitações externas. Consulte [Privacidade](https://monitorsmith.app/privacidade/) e [Termos de uso](https://monitorsmith.app/termos/).

## Acessibilidade e movimento

- Estrutura semântica, skip link e foco visível;
- diálogos pelo primitivo compartilhado, com foco inicial, trap, fundo inerte, Escape e retorno de foco;
- atalhos suspensos durante edição e diálogos;
- nomes acessíveis para botões de ícone e alternativas textuais para conteúdo visual;
- `prefers-reduced-motion`, contraste reforçado e forced colors;
- animações concentradas em `transform` e `opacity`.

O objetivo de conformidade é WCAG 2.2 AA. A validação automatizada ajuda, mas não substitui testes manuais com teclado, zoom e leitor de tela.

## Execução local

Requisitos: Node.js 22.12+ e npm 10+.

```powershell
cd C:\Users\Xgm\Desktop\APPWBP
npm ci
npm run dev
```

O Vite atende somente `localhost` por padrão. A URL habitual é `http://localhost:5173/`.

### Qualidade

```powershell
npm run lint
npm run test
npm run build
npm run test:e2e
```

O gate rápido de código e artefato é:

```powershell
npm run check
```

O gate integral, incluindo os 32 cenários de navegador em desktop e mobile, é:

```powershell
npm run validate
```

`npm run build` executa Vite, gera as 28 páginas estáticas adicionais, cria sitemap/manifest/arquivos LLM, gera o service worker e valida o conteúdo de `dist/`.

## Fluxo de contribuição e publicação

1. Sincronize com `origin/main` sem reescrever histórico.
2. Faça uma mudança coesa e atualize o catálogo quando o contrato de uma ferramenta mudar.
3. Execute `npm run validate`.
4. Faça commit com autoria configurada e mensagem objetiva.
5. Envie ao repositório oficial; a branch `main` publica pelo GitHub Actions após os gates.

Não use force-push em `main`. Segredos não devem entrar no repositório; use o modelo `.env.example`.

## Licença e segurança

Consulte [LICENSE](LICENSE) antes de reutilizar código, conteúdo ou identidade visual. Vulnerabilidades devem seguir [SECURITY.md](SECURITY.md), não issues públicas.

---

MonitorSmith integra o portfólio oficial da **EXVORN.TECH**.
