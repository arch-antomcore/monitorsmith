# Playbook Universal: Aprovação e Conformidade no Google AdSense

Este guia consolida todos os requisitos oficiais do Google AdSense, as diretrizes da série oficial de aprovações (*AdSense Site Approvals Series*) e a experiência prática de conformidade em aplicações web e utilitários modernos.

---

## 1. Os Três Pilares da Aprovação

```
┌────────────────────────────────────────────────────────────────────────┐
│                        APROVAÇÃO GOOGLE ADSENSE                        │
├───────────────────┬────────────────────────────┬───────────────────────┤
│  1. PROPRIEDADE   │  2. CONTEÚDO DE ALTO VALOR │ 3. POLÍTICA E PRIVACY │
│  E ACESSIBILIDADE │     E NAVEGAÇÃO REAL       │    (LGPD, CMP, G7)    │
└───────────────────┴────────────────────────────┴───────────────────────┘
```

---

## 2. Checklist Técnico Pré-Envio (Gates de Aprovação)

### Gate 1: Verificação de Propriedade & Rastreabilidade
- [ ] **`ads.txt` na raiz:** Arquivo público em `https://seusite.com/ads.txt` com a sintaxe oficial:
  ```text
  google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
  ```
- [ ] **Tag de verificação no `<head>`:** Se usar o método de código, a tag `<script async src="...pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX">` deve estar dentro de `<head>`, e **não** no final de `<body>`.
- [ ] **`robots.txt` desobstruído:** Garantir que `Googlebot` e `Mediapartners-Google` tenham permissão de leitura em todas as rotas públicas:
  ```text
  User-agent: *
  Allow: /
  Disallow: /api/
  Sitemap: https://seusite.com/sitemap.xml
  ```
- [ ] **HTTPS ativo e estável:** Certificado SSL válido, redirecionamento HTTP → HTTPS limpo e respostas com status HTTP 200.

---

### Gate 2: Conteúdo Visível Sem Dependência Estrita de JavaScript (SPA Fallback)
*Um dos motivos mais frequentes de reprovação em aplicações React/Vue/Svelte é o revisor automático ou humano receber um `<div id="root"></div>` vazio.*

- [ ] **Home pré-renderizada:** O HTML inicial deve conter conteúdo semântico real (`<h1>`, artigos, descrições, links, FAQs) dentro de `#root` ou via SSG. O framework hidrata por cima quando carregado.
- [ ] **Não confie apenas em `<noscript>`:** O conteúdo principal do produto deve estar na estrutura HTML padrão visível para qualquer crawler.
- [ ] **Zero páginas "Em Construção" ou "Placeholder":** Todas as rotas indexáveis do sitemap devem entregar ferramentas ou artigos funcionais e completos.

---

### Gate 3: Política de Privacidade Conforme o AdSense ([G7])
O Google exige divulgações contratuais obrigatórias na política de privacidade:
- [ ] **Cookies de Fornecedores Terceiros:** Informar expressamente que fornecedores de terceiros, incluindo o Google, usam cookies para veicular anúncios com base em visitas anteriores do usuário ao site ou a outros sites na internet.
- [ ] **Cookies de Publicidade do Google:** Informar que o uso de cookies de publicidade permite veicular anúncios para os usuários com base nas visitas feitas aos seus sites e/ou a outros sites na internet.
- [ ] **Links de Opt-out Obrigatórios e Clicáveis:**
  - Configurações de Anúncios do Google: `https://www.google.com/settings/ads`
  - Opt-out de terceiros (AboutAds): `https://www.aboutads.info/choices/`
  - Explicação de parceiros Google: `https://policies.google.com/technologies/partner-sites`
- [ ] **Privacidade de Ferramentas / Client-side:** Deixar explícito que os dados inseridos nas ferramentas (textos, imagens, uploads, timers) são processados localmente no navegador e não são salvos em servidores.
- [ ] **Controlador e LGPD:** Indicar claramente a razão social ou nome do controlador (`EXVORN.TECH`, etc.), contato de DPO/privacidade e data visível da última atualização.

---

### Gate 4: Navegação e Experiência do Usuário (UX)
- [ ] **Links reais `<a href>`:** Menus, rodapés e listas de ferramentas devem usar elementos `<a>` com `href` reais para permitir que crawlers mapeiem o site.
- [ ] **Caminho de volta à Home:** Toda página editorial ou sub-rota deve conter navegação de retorno clara (`← Todas as ferramentas` ou Breadcrumbs).
- [ ] **Links no Rodapé:** Rodapé fixo contendo links públicos para:
  - Todas as Ferramentas / Home
  - Política de Privacidade (`/privacidade/`)
  - Termos de Uso (`/termos/`)
  - Contato / Suporte institucional

---

### Gate 5: Densidade e Inserção de Anúncios
- [ ] **Proporção Conteúdo / Anúncio:** No lançamento inicial, nunca sobrecarregue a página com múltiplos banners. Comece com 1 a 2 unidades de anúncio posicionadas abaixo da área nobre de utilidade.
- [ ] **Rotulagem Obrigatória:** Todo anúncio deve ter a indicação visual clara de *"Publicidade"* ou *"Anúncios"*.
- [ ] **Modos Imersivos e Ferramentas:** Ferramentas de tela cheia (como tela preta, teleprompter, jogos ou timers) **não** devem conter anúncios intrusivos sobrepostos durante a execução ativa.

---

## 3. As 6 Diretrizes da Série Oficial do Google (*Site Approvals Series*)

| # | Tema | Diretriz do Google | Como Cumprir no Projeto |
|---|---|---|---|
| **1** | **Visão Geral** | Páginas fáceis de navegar, com conteúdo exclusivo e útil. A análise é automática e manual. | Não crie apenas cascas de ferramentas; adicione explicações técnicas, limites reais e guias práticos. |
| **2** | **Propriedade e Acesso** | Comprovar controle via ads.txt, head tag ou Search Console. Site 100% acessível. | Mantenha `ads.txt` atualizado e tag no `<head>`. Não submeta sites com erros 404/500. |
| **3** | **Tráfego Válido** | Tráfego deve ser orgânico e de usuários reais. Bots, cliques artificiais ou auto-refresh são banidos. | Monitore o Search Console e Analytics. Nunca compre tráfego nem faça cliques de teste nos próprios anúncios. |
| **4** | **Conteúdo de Qualidade** | Valor único e profundidade. Evitar repetição e duplicação em massa. | Diferencie ferramentas com propósitos parecidos. Inclua bylines de autoria, datas visíveis e fontes técnicas. |
| **5** | **Navegação Transparente** | A barra e os links devem entregar o que prometem, sem redirecionamentos enganosos. | Use links semânticos, breadcrumbs Schema.org e evite botões que prometem páginas mas não abrem nada. |
| **6** | **Tratamento de Recusas** | Entender o motivo exato no Policy Center antes de pedir nova análise. | Faça o deploy das correções, solicite recrawl no Search Console e aguarde 7 a 14 dias antes de reaplicar. |

---

## 4. O que Fazer em Caso de Recusa ("Baixo Valor de Conteúdo")

1. **Não reaplique imediatamente no mesmo dia.** O Google costuma manter a avaliação anterior em cache.
2. **Amplie a profundidade editorial:** Em ferramentas utilitárias, adicione seções de *Metodologia Técnica*, *Ciência do Funcionamento*, *Passo a Passo*, *Casos de Uso* e *FAQ Estruturado (Schema.org)*.
3. **Valide a autoria e autoridade (E-E-A-T):** Adicione `<div class="editorial-byline">` indicando quem produziu o conteúdo e a data da última revisão.
4. **Peça Inspeção no Google Search Console:** Após o deploy, use a ferramenta "Inspeção de URL" e clique em "Solicitar indexação" na Home e nas páginas principais.
5. **Reenvie para análise** somente quando o Search Console confirmar a leitura da versão atualizada.
