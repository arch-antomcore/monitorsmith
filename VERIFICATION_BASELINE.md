# Baseline de verificação — MonitorSmith

**Produto:** MonitorSmith

**Responsável:** EXVORN.TECH

**Repositório oficial:** <https://github.com/arch-antomcore/monitorsmith>

**Revisão desta baseline:** 23 de setembro de 2026

Este documento registra fatos que podem ser conferidos no código e no artefato de produção. Ele não certifica hardware, acessibilidade integral, conformidade jurídica, aprovação comercial do Google AdSense nem funcionamento idêntico em todos os navegadores e dispositivos.

## Escopo publicado

O catálogo autoritativo em `src/constants/tools.js` contém 27 ferramentas. Algumas intenções públicas compartilham um mesmo modo interno, como Tela Verde e Estúdio de Cor; por isso, quantidade de ferramentas e quantidade de componentes não são métricas equivalentes.

O build atual produz:

- 44 guias localizados, formados por 22 pares em português e inglês;
- 33 artigos e um índice de blog;
- 9 páginas institucionais e legais;
- 88 páginas estáticas adicionais à home criada pelo Vite, incluindo o diretório de ferramentas;
- 89 URLs no `sitemap.xml`, incluindo a home;
- 47 recursos no precache do service worker gerado em `dist/sw.js`.

Essas contagens são validadas a partir do catálogo e dos arquivos gerados. O arquivo `public/sw.js` é apenas o template de desenvolvimento; a lista final de precache existe em `dist/sw.js` depois de `npm run build`.

## Auditoria de continuidade — 23 de setembro de 2026

O ponto de partida foi o commit oficial
`1a90351c1eb15890d753e381233cdc44b3a97b02`, conferido após `git fetch origin`.
O checkout local tinha apenas um rascunho: seis handlers de atalhos ainda não
enviados. A revisão confirmou a lacuna e preservou essa correção.

Falhas identificadas e corrigidas:

- Os atalhos I, R, A, U, D e O estavam anunciados no catálogo sem executar
  suas ações. A regressão agora percorre todos os atalhos cadastrados.
- No teste de teclado, Escape dentro da ajuda também encerrava a ferramenta;
  o modal agora recebe as teclas sem alimentar o teste subjacente.
- O Loop de Marcas restaurava a ordem das chaves do banco, podia reintroduzir
  imagens de importações pendentes após limpar tudo e confirmava exclusões
  antes do commit. A ordem passa a ser explícita, restauração e importações
  são coordenadas, operações canceladas são descartadas e abortos são tratados.
- As preferências das páginas estáticas perdiam a decisão com armazenamento
  bloqueado e não acompanhavam mudanças em outra aba. Elas passam a preservar
  a escolha durante a sessão, sincronizar decisões e cancelar cargas
  publicitárias pendentes após revogação. Nenhum slot foi ativado.
- O hash do service worker dependia dos separadores de caminho do sistema.
  Caminhos normalizados tornam o cálculo consistente entre Windows e Linux.
- A reabertura offline falhava quando o servidor variava cabeçalhos entre a
  instalação do cache e a carga dos módulos. Os arquivos fixos do precache
  agora são encontrados nesse caso; o cache de conteúdo visitado continua
  respeitando a variação normal das respostas. A regressão usa navegador real,
  recarrega sem rede e abre ferramentas ainda não visitadas.
- A navbar cobria parte do botão Limpar no teste de teclado e podia sobrepor
  cabeçalhos das ferramentas com conteúdo rolável. O espaçamento superior
  dessas superfícies passa a usar a mesma área reservada aos outros controles.

O design, os textos dos 33 artigos, o catálogo de 27 ferramentas e os ativos
visuais existentes foram preservados. As validações históricas abaixo são
mantidas como histórico e não substituem o gate da revisão atual.

### Evidência da revisão atual

- `npm ci` concluído a partir do lockfile.
- `npm run validate`: lint sem erros/avisos, 61 testes unitários em 11 arquivos,
  build validado e 187 cenários Playwright aprovados em Chromium desktop/mobile.
  Um cenário duplicado da matriz permanece ignorado intencionalmente.
- `npm run audit:site`: 105 arquivos HTML, 89 URLs no sitemap e 14 migrações,
  sem links internos quebrados, imagens ausentes ou erros de metadados.
- `npm audit`: zero vulnerabilidades conhecidas reportadas.
- `npm run audit:external`: 71 fontes acessíveis e duas com HTTP 403; nenhuma
  fonte confirmada como indisponível. O bloqueio automatizado não comprova
  indisponibilidade para leitores.
- Preservação: nenhum arquivo original removido; 152 dos 161 arquivos da base
  oficial permanecem inalterados. Nove arquivos existentes foram corrigidos ou
  documentados e cinco arquivos de regressão foram adicionados.
- `git fsck --full --strict` concluído sem corrupção; `git diff --check` sem
  erros de whitespace.

Logs e manifesto detalhado ficam em `test_reports/audit-20260923-*`, ignorados
pelo Git. Igualdade de SHA, deploy e validação de produção devem ser conferidos
depois do envio, conforme o gate ao final deste documento.

## Evidência automatizada histórica — 13 de setembro de 2026

Após instalação com `npm ci`, `npm run validate` passou com ESLint sem erros
nem avisos, 48 testes unitários em 9 arquivos, build validado e 171 cenários
Playwright aprovados em desktop/mobile. Um cenário duplicado continua ignorado
intencionalmente pela matriz.

Oito desses cenários verificam as correções de regressão: abertura de ferramenta
durante o recolhimento da navbar com e sem movimento reduzido, densidade e
medidas da régua nos dois sistemas de unidade, e tempos de leitura consistentes
entre home, artigos e índice do blog.

`npm run audit:site` verificou 105 arquivos HTML e as 89 URLs do sitemap, sem
links internos quebrados, imagens ausentes ou erros nas verificações de
metadados. `npm audit` não reportou vulnerabilidades conhecidas. A conferência
de fontes externas encontrou 71 URLs acessíveis e duas que responderam 403 ao
acesso automatizado; essas duas respostas não comprovam indisponibilidade para
leitores.

## Evidência automatizada histórica — 8 de setembro de 2026

O gate rápido executado em 8 de setembro de 2026 passou com:

- ESLint sem erros nem avisos;
- 45 testes Vitest aprovados em 8 arquivos;
- build de produção concluído;
- geração e validação das 86 páginas estáticas adicionais e das 87 URLs do sitemap;
- geração do service worker com caches separados para o núcleo do app e recursos obtidos durante o uso.
- Playwright com 151 cenários aprovados em Chromium desktop/mobile e 1 cenário duplicado ignorado pela própria matriz; o teste equivalente percorreu os 27 modos nos viewports compactos definidos.

Comando reproduzível:

```powershell
npm ci
npm run check
```

`npm run check` executa lint, testes unitários, build e `scripts/validate-build.mjs`. A validação integral acrescenta os cenários Playwright em desktop e mobile:

```powershell
npx playwright install chromium
npm run validate
```

O resultado do E2E deve ser conferido na execução que antecede cada publicação; esta baseline não transforma uma execução passada em garantia futura.

## Contratos técnicos verificados

- GSAP é fornecido localmente por `src/vendor/gsap`; o ticker do Lenis usa `lagSmoothing(0)` e plugins sem consumidores não são inicializados no aplicativo.
- As animações e a suavização de scroll em Lenis/GSAP permanecem sempre ativas sem limitar o desempenho por intenção de movimento do sistema (reducedMotion="never").
- O catálogo central alimenta biblioteca, atalhos, manifest e rotas editoriais; IDs, aliases, atalhos e slugs conflitantes falham nos testes.
- Os guias declaram limites de observação. Eventos do navegador, pixels CSS e `requestAnimationFrame` não provam taxa física, GtG, MPRT, PWM, fidelidade colorimétrica ou defeito eletrônico.
- A instalação do service worker só conclui quando o núcleo do app entra no cache. Páginas editoriais e imagens ainda não visitadas podem exigir rede, e o navegador pode remover o cache.

## AdSense, consentimento e privacidade

O repositório confirma apenas a implementação técnica:

- meta tag de identificação `google-adsense-account` e `ads.txt` presentes;
- sinais do Consent Mode negados por padrão;
- solicitação do script de anúncios condicionada a consentimento explícito e a um slot configurado;
- preferências revogáveis e páginas institucionais presentes;
- unidades de anúncio ausentes das superfícies imersivas dos instrumentos;
- imagens do Loop de Marcas persistidas apenas no IndexedDB local até remoção explícita ou limpeza dos dados do site.

Esses controles não comprovam aprovação do AdSense, não substituem uma CMP certificada onde ela for exigida e não atestam conformidade com LGPD, GDPR ou outras leis. Hospedagem, atualização do PWA e fornecedores externos podem gerar tráfego de rede. Consulte `docs/ADSENSE_COMPLIANCE.md` e valide a configuração do domínio e da conta antes de ativar publicidade.

## Gate de publicação

Antes de publicar:

1. execute `npm ci` e `npm run validate`;
2. confira que `git status` contém somente mudanças intencionais;
3. procure segredos e referências de ferramentas de desenvolvimento que não pertençam ao produto;
4. confira as 89 URLs, páginas legais, canonical, H1, manifest, service worker e navegação crítica no artefato;
5. publique em `main` sem force-push;
6. confirme o commit remoto e o resultado do workflow de deploy;
7. faça uma verificação funcional no domínio publicado.

Falhas em testes, build, deploy ou verificação remota impedem declarar a publicação concluída.
