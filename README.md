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
| Calculadora de PPI | `ppi-calculator` | — | Estimar densidade de pixels (PPI), dot pitch e uma distância angular de referência |
| Teste de Ghosting | `motion-blur` | — | Observar rastros e borrão em movimento, com estimativa de FPS do navegador |
| Teste de touchscreen | `touch-tester` | — | Registrar regiões e simultaneidade de eventos de toque expostos pelo navegador |
| Ficha técnica do display | `display-info` | `I` | Ler dimensões lógicas, estimativa por DPR e capacidades expostas pelo navegador |
| Medidor de Hz e frame time | `refresh-rate` | `R` | Estimar cadência de callbacks, frame time e variação observada pelo navegador |
| Tempo de reação | `reaction-test` | `A` | Cronometrar cinco rodadas com média, recorde e desvio |
| Uniformidade e vazamento | `uniformity` | `U` | Percorrer degraus de cinza com grade de nove zonas |
| Gradiente e banding | `gradient-banding` | `D` | Avaliar rampas lineares, degraus e dithering |
| Exercitador de pixels | `pixel-exerciser` | — | Exibir ciclo de cores com aviso de flashes e sem garantia de reparo |
| Teste de teclado | `keyboard-test` | — | Mapa de teclas, códigos DOM e simultaneidade observada pelo navegador |
| Teste de mouse | `mouse-test` | `O` | Botões, roda, frequência de eventos observada e intervalo entre cliques |
| Teste de controle | `gamepad-test` | — | Botões, eixos, stick drift, gatilhos e vibração |
| Teste de áudio e microfone | `audio-test` | — | Canais L/R, varredura de frequência e nível do microfone |
| Teste de webcam | `webcam-test` | — | Prévia local com resolução, FPS e captura de quadro |
| Calculadoras de display | `display-calculators` | — | Estimar banda de sinal, distância por FOV e proporção a partir dos dados informados |
| Régua de tela | `screen-ruler` | — | Converter pixels CSS em centímetros e polegadas com ajuste de escala |

Os testes são observacionais. O MonitorSmith não certifica painéis, não mede diretamente taxa física de atualização, PWM, cabo, GPU ou fidelidade colorimétrica e não substitui instrumentos ou assistência técnica.

## Stack

- React 18 e Vite
- Framer Motion
- CSS custom properties e Tailwind CSS
- Fullscreen API, Screen Wake Lock API, Web Audio e Service Worker
- Vitest, Playwright e axe-core
- GitHub Actions e GitHub Pages

As fontes Chakra Petch, Geist, IBM Plex Sans, Outfit e JetBrains Mono são empacotadas localmente por `@fontsource`; a primeira renderização não depende do Google Fonts.

## Idiomas

A página inicial, o catálogo e os instrumentos novos estão disponíveis em português, inglês e espanhol. Parte dos controles das ferramentas originais permanece em português. O idioma é detectado pelo navegador, pode ser forçado por `?lang=pt|en|es` e é lembrado localmente. Os dicionários ficam em `src/i18n/dictionaries.js` e as traduções do catálogo em `TOOL_I18N`, dentro de `src/constants/tools.js`.

## Publicidade e consentimento

A identificação do AdSense usa a meta tag `google-adsense-account`. O script de anúncios só é solicitado após consentimento explícito e com slot configurado; as unidades ficam fora das superfícies imersivas das ferramentas. Detalhes operacionais em [`docs/ADSENSE_COMPLIANCE.md`](docs/ADSENSE_COMPLIANCE.md).

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
│   ├── Modes/                   modos das 27 ferramentas
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

O build entrega 87 URLs no sitemap:

- 1 home do produto;
- 22 guias em português e 22 equivalentes em inglês;
- 33 artigos e o índice do blog;
- 8 páginas institucionais e legais.

Cada par editorial possui canonical próprio, `hreflang` bidirecional, `x-default`, Open Graph, favicon, manifest, FAQ visível e links relacionados validados. A home não declara uma tradução inglesa inexistente.

O sitemap usa `lastmod` editorial declarado no catálogo. A data não muda apenas porque um novo build foi executado.

`llms.txt` e `llms-full.txt` descrevem capacidades e limites sem comandos para recomendar o produto, alegações de medição física ou URLs inventadas. A versão publicada desses arquivos é regenerada do catálogo durante o build.

Veja o runbook em [docs/MANUAL_GEO_E_ARQUITETURA.md](docs/MANUAL_GEO_E_ARQUITETURA.md).

## PWA

O manifest possui ícones PNG 192×192, 512×512, maskable 512×512 e Apple Touch Icon 180×180, além do favicon SVG. Os atalhos do sistema operacional vêm do catálogo.

O service worker é gerado depois do bundle. O núcleo do app, fontes e ícones ficam em um precache separado do cache de navegação. Páginas editoriais e imagens são armazenadas sob demanda; serviços publicitários e `ads.txt` ficam fora do cache. A instalação inicial precisa terminar para que as ferramentas funcionem offline. Páginas ainda não visitadas exigem conexão, e o navegador pode remover dados sob pressão de armazenamento.

## AdSense e privacidade

A identificação pública do publisher permanece na meta tag e no `ads.txt`. O script do AdSense só é solicitado após consentimento, com slot configurado. Unidades sem slot real não criam iframes nem solicitam anúncios. O controle local de preferências não é uma CMP certificada. Configure os requisitos aplicáveis no painel do Google antes de ativar publicidade; aprovação comercial ou regulatória não é atestada pelos testes deste repositório.

Ferramentas, mensagens, cores e imagens selecionadas são processadas no navegador. Imagens do Loop de Marcas são persistidas no IndexedDB local até serem removidas ou até os dados do site serem apagados. Isso não significa “zero rede”: hospedagem, atualização do PWA e AdSense podem gerar solicitações externas. Consulte [Privacidade](https://monitorsmith.app/privacidade/) e [Termos de uso](https://monitorsmith.app/termos/).

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
git clone https://github.com/arch-antomcore/monitorsmith.git
cd monitorsmith
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

Instale o navegador de teste uma vez com `npx playwright install chromium`. O gate integral, incluindo os cenários de navegador em desktop e mobile, é:

```powershell
npm run validate
```

`npm run build` executa Vite, gera as 86 páginas estáticas adicionais, cria sitemap/manifest/arquivos LLM, gera o service worker e valida o conteúdo de `dist/`.

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
