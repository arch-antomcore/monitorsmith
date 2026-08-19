# Playbook Universal: Aprovação e Conformidade no Google AdSense
**Autor / Engenharia**: EXVORN.TECH  
**Propósito**: Guia definitivo e template de referência para aprovação de aplicações web, SPAs e utilitários no Google AdSense, com foco em superação de "Conteúdo de Baixo Valor" (*Low-Value Content*).

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

## 2. A Mecânica Real da Análise do AdSense: Por que Sites São Reprovados?

Muitos desenvolvedores acreditam que o revisor do Google AdSense acessa o site em tempo real como um usuário comum no navegador. Na prática, a análise opera em duas frentes:

```
[Seu Servidor / GitHub Pages]
          │
          ▼ (Googlebot rastreia a cada X dias/semanas)
[Google Search Index (Cache do Google)]
          │
          ▼ (AdSense Bot & Revisores consultam o índice em cache)
[Avaliação do Google AdSense: APROVADO / NEGADO]
```

### O Fenômeno do "Desfasamento de Cache"
- **O Problema**: Se você envia um site com pouco conteúdo, é rejeitado por "Conteúdo de Baixo Valor", adiciona 20 páginas de ferramentas hoje e clica em "Reenviar análise" no mesmo dia, **o AdSense avaliará a cópia antiga salva no Google Search Index**, gerando uma nova rejeição automática.
- **A Solução**: Você precisa quebrar o ciclo de espera do Googlebot utilizando o **Google Search Console** antes de submeter uma nova análise ao AdSense.

---

## 3. Entendendo a Rejeição por "Conteúdo de Baixo Valor" (*Low-Value Content*)

O Google não mede "valor" apenas pela quantidade de palavras. Para aplicações e ferramentas web, o algoritmo avalia quatro fatores:

1. **Replicabilidade / Thin Content**: Uma página com apenas um fundo colorido ou um script trivial de 10 linhas é considerada um *thin wrapper*.
2. **Utilidade Real / Engenharia**: O site resolve um problema prático com cálculos matemáticos, telemetria de hardware, áudio sintético ou renderização gráfica avançada?
3. **Profundidade Editorial e Metodologia (E-E-A-T)**: A página explica *como* a ferramenta funciona, quais são seus limites físicos e instruções claras de uso?
4. **Prerender Semântico (O problema da SPA vazia)**: Se sua aplicação React/Vue renderiza apenas `<div id="root"></div>` no HTML bruto sem JavaScript, o crawler do AdSense pode enxergar uma página em branco.

---

## 4. Checklist Técnico Pré-Envio (Quality Gates)

### Gate 1: Verificação de Propriedade & Rastreabilidade
- [ ] **`ads.txt` público na raiz (`/ads.txt`):**
  ```text
  google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
  ```
- [ ] **Tag no `<head>` do HTML:** A tag `<script async src="...pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX">` deve estar dentro de `<head>`, antes do carregamento dos scripts pesados.
- [ ] **`robots.txt` desobstruído:** Garantir que `Googlebot` e `Mediapartners-Google` tenham acesso total:
  ```text
  User-agent: *
  Allow: /
  Sitemap: https://seusite.com/sitemap.xml
  ```
- [ ] **HTTPS e Canonical:** Todas as páginas públicas devem ter `<link rel="canonical" href="...">` com a URL canônica exata (com barra final consistente).

---

### Gate 2: Conteúdo Semântico Prerendered (SSG / Static HTML)
- [ ] **Zero páginas em branco no HTML bruto:** O HTML retornado pelo servidor deve conter a árvore semântica completa (`<h1>`, parágrafos, botões, FAQs, rodapé) mesmo com JavaScript desabilitado. O framework hidrata a interatividade por cima.
- [ ] **Exatamente 1 tag `<h1>` por documento:** Nunca coloque múltiplos `<h1>` na mesma página.
- [ ] **Hierarquia de cabeçalhos:** `<h1>` → `<h2>` (seções de ferramentas, controles) → `<h3>` (cards, recursos) → `<p>` (textos explicativos).

---

### Gate 3: Ferramentas Interativas de Alto Valor Técnico
Para utilitários e web apps, adicione recursos que demonstrem engenharia real:
- [ ] **Calculadoras e Conversores:** Fórmulas físicas e matemáticas reais (ex: Calculadora de densidade de pixels PPI, Dot Pitch, Acuidade Snellen 20/20, dimensionamento de telas).
- [ ] **Testes de Hardware / Display via Canvas:** Loops com `requestAnimationFrame` sincronizados com VSync (ex: Teste de Ghosting, tempo de resposta GtG, MPRT, taxa real de FPS e jitter).
- [ ] **Sintetizadores e APIs Nativas:** Web Audio API (geradores de ruído, timers), Screen Wake Lock API, IndexedDB local.

---

### Gate 4: Dados Estruturados (Schema.org / JSON-LD)
Cada página de ferramenta deve conter múltiplos esquemas estruturados em um bloco `<script type="application/ld+json">`:
- [ ] **`@type: "WebApplication"` / `"SoftwareApplication"`:** Nome, descrição, categoria, sistema operacional suportado e modelo de gratuidade (`offers: { price: "0" }`).
- [ ] **`@type: "HowTo"`:** Passos numerados (`HowToStep`) ensinando o usuário a operar a ferramenta.
- [ ] **`@type: "FAQPage"`:** Perguntas e respostas técnicas sobre funcionamento, metodologia e limites.
- [ ] **`@type: "BreadcrumbList"`:** Caminho de navegação (`Home > Ferramenta`).
- [ ] **`@type: "Organization"` / `"WebSite"`:** Identidade do mantenedor e URL oficial.

---

### Gate 5: Arquitetura Limpa de Erros (Página 404)
Conforme as diretrizes do **Google Search Central**:
- [ ] A página `404.html` deve existir fisicamente e conter atalhos para a Home.
- [ ] **NUNCA** inclua `<link rel="canonical">` na página 404.
- [ ] **NUNCA** insira tags de anúncios do Google AdSense na página 404.

---

### Gate 6: Política de Privacidade e Conformidade Legal (G7 AdSense & LGPD)
A política de privacidade deve conter obrigatoriamente:
- [ ] **Declaração de Cookies de Terceiros e DART:** Aviso de que fornecedores terceiros (incluindo o Google) utilizam cookies para exibir anúncios com base em visitas anteriores.
- [ ] **Links Clicáveis de Opt-out:**
  - Configurações de Anúncios do Google: `https://www.google.com/settings/ads`
  - Opt-out de Terceiros (AboutAds): `https://www.aboutads.info/choices/`
  - Políticas de Parceiros Google: `https://policies.google.com/technologies/partner-sites`
- [ ] **Privacidade Client-Side:** Declaração explícita de que os dados manipulados nas ferramentas (fotos, textos, temporizadores) são processados 100% no navegador do usuário, sem transmissão ou retenção em servidores.
- [ ] **Identificação do Controlador:** Razão social ou nome institucional (`EXVORN.TECH`), contato de DPO e data visível da última atualização.

---

## 5. Roteiro Passo a Passo para Reaplicação Após Recusa

Se o seu site foi negado por "Conteúdo de Baixo Valor", siga este procedimento estrito:

```
[1. Implementar Melhorias & Ferramentas de Alto Valor]
                         │
                         ▼
[2. Executar Linter, Testes Unitários e Build Estático]
                         │
                         ▼
[3. Fazer Deploy em Produção (GitHub Pages / Vercel / Cloudflare)]
                         │
                         ▼
[4. Google Search Console: Testar URL ao Vivo & Solicitar Indexação]
                         │
                         ▼
[5. Aguardar Atualização do Cache no Índice do Google (24h–72h)]
                         │
                         ▼
[6. Reenviar Pedido de Análise no Painel do Google AdSense]
```

### Detalhamento do Passo 4 (Google Search Console):
1. Acesse o [Google Search Console](https://search.google.com/search-console).
2. Selecione a propriedade do seu domínio.
3. Cole a URL da Home na barra superior **"Inspecionar qualquer URL"**.
4. Clique no botão **"Testar URL ao vivo"** (isso força o Googlebot a renderizar a página naquele instante).
5. Verifique a captura de tela e o HTML renderizado: confirme que o H1, o texto semântico e as ferramentas estão visíveis.
6. Clique em **"Solicitar Indexação"**.
7. Repita para as 3 a 5 principais páginas de ferramentas do seu site.
8. Somente após a confirmação de rastreamento recente no Search Console, solicite a nova revisão no painel do AdSense.
