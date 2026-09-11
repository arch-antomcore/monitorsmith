# Preparação para AdSense e Search Console — MonitorSmith

Documento operacional do estado implementado no repositório e das ações que
dependem dos painéis do Google. Revisão: 11 de setembro de 2026. Nenhum teste
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

- A meta `google-adsense-account` e o registro DIRECT em `ads.txt` preservam a
  verificação do publisher.
- O script `adsbygoogle.js` não fica fixo no `<head>`.
- A aplicação só solicita o script após consentimento e quando existe um slot
  numérico configurado.
- Páginas estáticas sem uma unidade real `.ms-ad ins.adsbygoogle` não solicitam
  o script mesmo após consentimento e não abrem um banner inicial desnecessário;
  o controle de preferências continua disponível no rodapé.
- Ferramentas imersivas, página 404 e páginas de migração não contêm unidades.
- Auto Ads deve permanecer desativado até que exclusões e comportamento em
  todos os estados imersivos sejam conferidos no painel.

Isso evita anúncios em telas de erro, navegação, padrões vazios ou superfícies
cujo conteúdo principal é apenas uma ação, além de impedir sobreposição com os
controles.

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

## 7. Sequência para nova avaliação

1. Aguarde o deploy concluir e confirme em produção home, blog, um artigo,
   `/ferramentas/`, políticas, `robots.txt`, `sitemap.xml`, `ads.txt` e uma URL
   histórica.
2. Envie novamente `https://monitorsmith.app/sitemap.xml` no Search Console.
3. Inspecione a home, `/blog/`, `/ferramentas/` e artigos representativos e peça
   indexação das URLs canônicas. Não peça indexação das migrações `noindex`.
4. Abra o relatório **Indexação de páginas**. Para 404s restantes, confirme a URL
   de origem: corrija links internos ou crie migração somente quando houver um
   substituto real.
5. Inicie **Validar correção** para o agrupamento de 404 quando o novo deploy já
   tiver sido rastreado. A categoria de redirect pode continuar contendo os
   redirects canônicos intencionais.
6. Configure e publique a CMP certificada, se aplicável às regiões atendidas.
7. Mantenha Auto Ads desativado e slots vazios durante a conferência. Depois de
   verificar rastreamento recente e políticas, solicite a nova análise no
   AdSense.

## 8. Checklist de produção

- [ ] `https://monitorsmith.app/ads.txt` contém o publisher correto
- [ ] `robots.txt` permite rastreamento e referencia o sitemap
- [ ] sitemap contém 89 URLs e todas respondem 200 com canonical próprio
- [ ] 14 URLs históricas encaminham ao destino correto e estão fora do sitemap
- [ ] URL aleatória retorna 404 real, sem anúncio e com `noindex`
- [ ] artigos exibem autoria, datas, fontes, limites e links relacionados
- [ ] política editorial, privacidade, contato e demais páginas respondem 200
- [ ] nenhum anúncio aparece dentro de ferramenta, 404 ou migração
- [ ] CMP certificada publicada no painel quando exigida pela região
- [ ] Search Console registrou novo rastreamento antes do reenvio ao AdSense

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
