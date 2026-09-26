# Preparação para AdSense e Search Console — MonitorSmith

Documento operacional do estado implementado no repositório e das ações que
dependem dos painéis do Google. Revisão: 23 de setembro de 2026. Nenhum teste
local garante aprovação comercial, indexação ou rich results.

## 1. Conteúdo e arquitetura indexável

O sitemap contém 89 URLs canônicas:

- home do produto;
- 44 guias de ferramentas, em 22 pares português/inglês;
- diretório `/ferramentas/` com links HTML para todos os guias;
- índice do blog e 33 artigos em português;
- 9 páginas institucionais e legais.

Os artigos são organizados em três trilhas editoriais e incluem autoria
institucional, datas de publicação e revisão, sumário, procedimento, fatores de
confusão, limites, perguntas frequentes, referências visíveis e artigos
relacionados. O build interrompe quando um artigo tem menos de quatro seções,
duas fontes HTTPS, três perguntas ou a meta editorial individual registrada para
aquele texto, quando repete uma CTA dentro do corpo ou quando aponta para uma
relação inexistente. As metas atuais correspondem ao dobro da extensão que cada
post tinha antes da ampliação concluída em 11 de setembro de 2026. Os 33 artigos
somam 48.732 palavras no corpo editorial, com 1.198 a 1.870 palavras por texto e
média de 1.477. Essa contagem é um controle interno contra regressão; o Google
não publica uma quantidade mínima universal e avalia propósito, originalidade e
valor.

Os 44 guias descrevem o que a interface faz, sequência de uso, aplicações,
limitações e metodologia. Resultados visuais são apresentados como observações
ou estimativas, sem promessa de laudo, calibração física ou reparo.

## 2. Transparência editorial

| Recurso | URL |
| --- | --- |
| Sobre, autoria e operação | `/sobre/` |
| Política editorial, fontes e correções | `/politica-editorial/` |
| Metodologia técnica | `/metodologia/` |
| Contato | `/contato/` |
| Política de privacidade | `/privacidade/` |
| Termos de uso | `/termos/` |
| Cookies e consentimento | `/cookies/` |
| Aviso legal | `/aviso-legal/` |
| Acessibilidade | `/acessibilidade/` |

Todas as páginas estão no rodapé da aplicação, nos rodapés estáticos e no
sitemap. A política editorial explica público, seleção de pauta, hierarquia de
fontes, independência, limites, atualização e canal de correções.

## 3. AdSense e áreas sem conteúdo

- A meta `google-adsense-account` e o registro DIRECT em `ads.txt` publicam o
  identificador `ca-pub-5926952327268950` informado pelo proprietário. O Google
  aceita meta tag ou `ads.txt` como alternativas ao snippet na conexão do site;
  a conta deve usar o método que está efetivamente publicado.
- O loader usa exatamente `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5926952327268950`, com `async` e `crossorigin="anonymous"`. O build e os testes verificam esses três atributos.
- O script `adsbygoogle.js` não fica fixo no `<head>`.
- A aplicação só solicita o script após consentimento e quando existe um slot
  numérico configurado.
- Páginas estáticas sem uma unidade real `.ms-ad ins.adsbygoogle` não solicitam
  o script mesmo após consentimento e não abrem um banner inicial desnecessário;
  o controle de preferências continua disponível no rodapé.
- A home também só abre o banner inicial quando a unidade montada na biblioteca
  tem um slot válido. As preferências continuam acessíveis manualmente.
- Ferramentas imersivas, página 404 e páginas de migração não contêm unidades.
- Auto Ads deve permanecer desativado até que exclusões e comportamento em
  todos os estados imersivos sejam conferidos no painel.

Isso evita anúncios em telas de erro, navegação, padrões vazios ou superfícies
cujo conteúdo principal é apenas uma ação, além de impedir sobreposição com os
controles.

### Identificadores, conta e ativação

O publisher ID, os IDs de unidades e o arquivo público de verificação do Search
Console são identificadores públicos, não senhas nem tokens privados. A
consistência entre código, HTML e `ads.txt` pode ser verificada publicamente; ela
não comprova que a conta está aprovada, que pertence à pessoa autenticada ou que
pagamentos, identidade e informações fiscais foram validados. Esses estados
precisam ser conferidos no painel autenticado; não foram comprovados por esta
auditoria do repositório. Nunca coloque tokens OAuth, chaves de conta de serviço
ou credenciais privadas em variáveis `VITE_*`, pois entram no JavaScript público.

O único ponto de anúncio React montado atualmente é `placement="library"`, na
biblioteca da home. Os nomes `HERO` e `FOOTER` existem na resolução de slots, mas
não há unidades montadas nesses locais. O gerador de páginas estáticas contém
controle de consentimento, mas não gera unidades de anúncio; preencher as
variáveis da aplicação não cria anúncios nos artigos ou guias.

O workflow `.github/workflows/deploy.yml` não injeta `VITE_ADSENSE_SLOT_*` no
build. Um `.env.local` altera somente o build local. Para uma ativação futura:

1. Confirme a aprovação do domínio e crie a unidade real no AdSense.
2. Publique e valide a solução de consentimento aplicável antes de habilitar a
   unidade; o banner próprio não deve substituir uma CMP certificada.
3. Passe explicitamente `VITE_ADSENSE_SLOT_LIBRARY` ao passo de build do GitHub
   Actions, por exemplo a partir de uma variável de repositório com o mesmo nome.
   O valor é público. Mantenha-o vazio enquanto a ativação não estiver concluída.
4. Confira o artefato de produção: antes da decisão e após recusa, nenhuma
   solicitação de anúncio; após consentimento válido, no máximo uma solicitação
   por unidade; revogação e abertura das ferramentas devem respeitar a escolha.
5. Confira Auto Ads e exclusões no painel. O código local não consegue atestar
   nem alterar essas configurações remotas.

## 4. Consentimento e privacidade

O site inicia os sinais do Google Consent Mode v2 como negados e oferece aceitar,
recusar ou escolher categorias. A preferência fica na chave local
`ms_consent_v2` e pode ser reaberta pelo rodapé. A política de privacidade
informa cookies, armazenamento local, identificadores e o uso possível de
serviços do Google.

O controle próprio não é uma CMP certificada. Antes de servir anúncios
personalizados no Espaço Econômico Europeu, Reino Unido ou Suíça, configure uma
CMP certificada pelo Google em **AdSense → Privacidade e mensagens**, publique a
mensagem aplicável e valide o fluxo no domínio de produção.

Consent Mode e TCF são mecanismos diferentes. As chamadas `gtag('consent', ...)`
registram sinais na fila `dataLayer`; não criam uma TC string nem tornam o
banner uma CMP certificada. Os controles efetivos atuais do AdSense são a
ausência do script antes da autorização e `requestNonPersonalizedAds`.

Anúncios não personalizados ainda podem usar cookies para frequência e
relatórios, e exigem consentimento onde isso for obrigatório. A documentação
atual permite que tráfego de CMP não certificada seja elegível a anúncios não
personalizados ou limitados quando suportado; isso não equivale a autorizar
personalização nem a certificar a conformidade do banner próprio. Os anúncios
limitados também têm configurações próprias, incluindo armazenamento para
combate a tráfego inválido. Não trate `requestNonPersonalizedAds=1` como modo
"sem cookies" ou como substituto dos requisitos de consentimento.

Se usar a mensagem europeia do Google, conclua **Privacidade e mensagens** e
integre o fluxo recomendado pelo painel. Teste a API TCF e os cenários aceitar,
recusar e revogar em produção. Não dependa de um ciclo em que o banner próprio
precisa autorizar o script antes que a CMP possa apresentar sua mensagem.

## 5. 404, redirects e indexação

A página `404.html` retorna a experiência de recuperação, usa `noindex,follow`,
não tem canonical e não carrega anúncios. Links e imagens internos são
verificados no build.

Quatorze endereços encontrados no sitemap histórico foram preservados como
páginas de migração. Cada uma:

- fica fora do sitemap atual;
- usa `noindex,follow`;
- aponta para o destino canônico atual;
- encaminha por `location.replace` e meta refresh;
- mantém título, explicação e link visível caso o JavaScript esteja bloqueado.

O GitHub Pages não oferece regras HTTP 301 por caminho no artefato estático. Por
isso, o Search Console pode classificar essas páginas como **Página com
redirecionamento**; isso é intencional. Para obter 301/308 reais por caminho,
seria necessário configurar a camada que atende o domínio, como um proxy/CDN.

Os redirects de `http` e `www` para `https://monitorsmith.app/` também são
canônicos e esperados. O sitemap e os links internos usam somente o host HTTPS
final. Um 404 permanece correto para uma URL nunca publicada e sem substituta.

## 6. Gates automatizados

`npm run build` e `scripts/validate-build.mjs` verificam:

- canonical autorreferente e `index,follow` nas 89 páginas indexáveis;
- ausência de redirects e parâmetros `?tool=` no sitemap e nos links gerados;
- pelo menos um link HTML de entrada para cada URL do sitemap, exceto a home;
- exatamente 33 artigos e 14 migrações históricas;
- estrutura, fontes e datas dos artigos;
- JSON-LD válido, destinos internos e recursos locais existentes;
- 404, manifest, service worker, `ads.txt` e arquivos LLM;
- limites de tamanho gzip do JavaScript e CSS.

`npm run audit:external` verifica separadamente a disponibilidade das fontes
externas. Ele depende da rede e, por isso, não bloqueia o build reproduzível.

`scripts/adsense-checks.mjs` é usado no build, na auditoria e no teste de produção.
Verifica uma única meta de publisher no `head`, o registro completo do `ads.txt`,
URL e atributos do loader, IDs de unidades e ausência de anúncios em erros e
migrações. Rejeita um snippet fixo que contorne o consentimento atual. O teste
de produção também confere `X-Robots-Tag` e o conteúdo do arquivo público de
verificação do Search Console. Isso não consulta nem aprova a conta Google.

## 7. Sequência para nova avaliação

1. Aguarde o deploy concluir e confirme em produção home, blog, um artigo,
   `/ferramentas/`, políticas, `robots.txt`, `sitemap.xml`, `ads.txt` e uma URL
   histórica.
2. Confirme que `https://monitorsmith.app/sitemap.xml` está enviado e foi lido no
   Search Console. Reenvie se houver erro ou se ainda não estiver cadastrado.
3. Inspecione a home, `/blog/`, `/ferramentas/` e artigos representativos e peça
   indexação das URLs canônicas. Não peça indexação das migrações `noindex`.
4. Abra o relatório **Indexação de páginas**. Para 404s restantes, confirme a URL
   de origem: corrija links internos ou crie migração somente quando houver um
   substituto real.
5. Inicie **Validar correção** somente para problemas não intencionais que foram
   efetivamente corrigidos. URLs removidas sem substituto podem continuar como
   404; redirects canônicos intencionais não precisam virar páginas indexáveis.
6. Planeje a CMP e conclua sua publicação antes de servir anúncios personalizados
   nas regiões que a exigem. A preparação da mensagem pode ser feita no fluxo
   do AdSense; não simule certificação em uma variável do código.
7. Mantenha Auto Ads desativado e slots vazios durante a conferência. Confirme no
   painel o publisher, a conexão do domínio e o motivo da rejeição. Quando as
   correções de conteúdo e técnicas estiverem publicadas, solicite nova análise.
   A indexação de todas as páginas no Search Console não é uma garantia nem um
   pré-requisito declarado para aprovação no AdSense.

## 8. Checklist de produção

Checklist técnico de 23 de setembro de 2026. `npm run audit:site` confere o
artefato local e `npm run check:live` confere o domínio público. Os itens
marcados registram a conferência técnica; repita a verificação pública após
cada deploy, inclusive após esta segunda revisão.
Eles não atestam aprovação, titularidade do publisher ou configuração da conta.

- [x] `https://monitorsmith.app/ads.txt` contém `pub-5926952327268950`, o publisher configurado no repositório
- [x] `robots.txt` permite rastreamento e referencia o sitemap
- [x] sitemap contém 89 URLs e todas respondem 200 com canonical próprio
- [x] 14 URLs históricas encaminham ao destino correto e estão fora do sitemap
- [x] URL aleatória retorna 404 real, sem anúncio e com `noindex`
- [x] artigos exibem autoria, datas, fontes, limites e links relacionados
- [x] política editorial, privacidade, contato e demais páginas respondem 200
- [x] nenhum anúncio aparece dentro de ferramenta, 404 ou migração

Pendências que exigem verificação nos painéis do Google:

- [ ] CMP certificada publicada no painel quando exigida pela região
- [ ] Conta autenticada confirma o publisher, o domínio conectado e seu status
- [ ] Auto Ads e configurações de anúncios confirmados no painel
- [ ] URLs de exemplo das exclusões do Search Console foram examinadas
- [ ] Novo rastreamento e validação das correções acompanhados no Search Console

## 9. Referências oficiais usadas nesta revisão

- [Requisitos mínimos de conteúdo do AdSense](https://support.google.com/adsense/answer/10502938?hl=pt-BR)
- [Conteúdo valioso e experiência do usuário no AdSense](https://support.google.com/adsense/answer/10015918?hl=pt-BR)
- [Conteúdo superficial no relatório de ações manuais](https://support.google.com/webmasters/answer/9044175?hl=pt-BR#thin-content)
- [Políticas para inventário de baixo valor ou sem conteúdo](https://support.google.com/publisherpolicies/answer/11035931?hl=pt-BR)
- [Como criar conteúdo útil, confiável e voltado às pessoas](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Como criar e enviar um sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Consolidação de URLs duplicadas e redirects](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Motivos do relatório de indexação de páginas](https://support.google.com/webmasters/answer/7440203?hl=pt-BR)
- [CMP certificada para EEE, Reino Unido e Suíça](https://support.google.com/adsense/answer/13554116?hl=pt-BR)
- [Conectar o site por snippet, ads.txt ou meta tag](https://support.google.com/adsense/answer/7584263?hl=pt-BR)
- [Anúncios personalizados e não personalizados](https://support.google.com/adsense/answer/9007336?hl=pt-BR)
- [Anúncios limitados e armazenamento contra fraude](https://support.google.com/adsense/answer/14210870?hl=pt-BR)
- [Produtos e tags compatíveis com Consent Mode](https://developers.google.com/tag-platform/security/concepts/consent-mode)
- [Políticas do programa AdSense](https://support.google.com/adsense/answer/48182?hl=pt-BR)
- [Anúncios em telas sem conteúdo editorial](https://support.google.com/publisherpolicies/answer/11112688?hl=pt-BR)

## 10. Segunda revisão e pesquisa da comunidade — 23/09/2026

Foram corrigidos cinco pares de guias (português/inglês), com datas de revisão
atualizadas somente nessas rotas:

- Teste de monitor: explica que abre o mesmo instrumento da Verificação Visual,
  com outro objetivo de leitura; não promete direitos de troca universais.
- Verificação visual: descreve os 17 degraus e os cinco campos escuros realmente
  disponíveis e não apresenta a ferramenta como detector de FRC.
- Luz para videochamada: escala nominal correta de 1800 a 12000 K, com limite
  explícito de que o valor RGB não mede nem calibra a luz emitida.
- Loop de marcas: duração por slide de 1 a 60 segundos e comando real de tela
  cheia; arquivos locais exigem autorização de uso.
- PPI: exemplo reproduzível com os presets de 27 polegadas QHD e 4K, distinguindo
  cálculo geométrico de medição física. Um teste no navegador reproduz o exemplo.

Esse teste revelou que a barra fixa cobria os presets da calculadora. A tela
agora reserva espaço para a navegação e permite rolar os resultados; o painel
explicativo acompanha o conteúdo em vez de cobrir os campos.

A pesquisa comunitária é fonte de hipóteses, não de regras ou garantias:

| Relato consultado | Aplicação nesta revisão |
| --- | --- |
| [Site de ferramentas rejeitado apesar de 61 artigos](https://www.reddit.com/r/Adsense/comments/1s6pn2b/toolutility_site_rejected_4x_for_low_value/) | Não aumentar textos por volume. Corrigir instruções e oferecer um exemplo que o visitante consiga conferir. Os números e a causa alegada não foram verificados independentemente. |
| [Discussão sobre baixo valor em ferramentas](https://www.reddit.com/r/Adsense/comments/1sq79yn/adsense_keeps_rejecting_my_tools_site_for_low/) | Demonstrar o propósito de cada ferramenta, seus limites e a interpretação do resultado. Relatos de aprovação são anedóticos. |

As recomendações aproveitadas são compatíveis com a orientação oficial de
conteúdo útil e navegação clara. Não foram adotadas receitas de quantidade mínima
de posts, palavras ou visitas, mudança de tema, ocultação temporária de conteúdo
ou compra de tráfego. Telas imersivas continuam sem unidades publicitárias.

A tentativa de acessar o AdSense nesta revisão abriu a tela de login. Por isso,
publisher, slots, status da conta, CMP e Auto Ads não foram conferidos dentro do
painel autenticado. O ID público foi comparado ao informado pelo proprietário;
as pendências de conta da seção 8 continuam abertas.

Validação local final da segunda revisão:

- `npm run validate`: lint, 72 testes unitários, build e 193 testes de navegador
  aprovados. Um caso é omitido intencionalmente no projeto mobile porque a mesma
  matriz de viewports já roda no projeto desktop.
- `npm run audit:site`: 105 arquivos HTML, 89 URLs no sitemap, nenhum link interno
  quebrado, imagem ausente, erro de JSON-LD ou falha na integração pública AdSense.
- `npm run audit:external`: 73 destinos, 71 acessíveis e dois com bloqueio HTTP
  403 (ISO e OSHA); nenhum indisponível confirmado. Um 403 impede esta checagem
  automatizada de certificar o conteúdo remoto.
- `npm audit`: nenhuma vulnerabilidade reportada nas dependências instaladas.

A publicação só é considerada concluída depois do workflow no GitHub e da
repetição de `npm run check:live` no domínio. O resultado dessa execução não
substitui as pendências autenticadas listadas acima.
