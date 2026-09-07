# Playbook Universal: Aprovação e Conformidade no Google AdSense
**Autor / Engenharia**: EXVORN.TECH  
**Propósito**: Checklist técnico para preparar aplicações web, SPAs e utilitários para análise no Google AdSense. A implementação dos itens abaixo não garante aprovação, que depende das políticas, da conta, do domínio e da análise do Google.

---

## 1. Áreas de revisão antes do envio

```
┌────────────────────────────────────────────────────────────────────────┐
│                    PREPARAÇÃO PARA ANÁLISE ADSENSE                     │
├───────────────────┬────────────────────────────┬───────────────────────┤
│  1. PROPRIEDADE   │  2. CONTEÚDO E NAVEGAÇÃO  │ 3. PRIVACIDADE E CMP │
│  E ACESSIBILIDADE │       VERIFICÁVEIS         │   QUANDO APLICÁVEL   │
└───────────────────┴────────────────────────────┴───────────────────────┘
```

---

## 2. Rastreamento e revisão do site

O Google não publica todos os detalhes ou a cadência da análise. Rastreamento automatizado, estado do índice e revisão do site podem participar do processo, e uma versão recém-publicada pode demorar a ser recapturada.

### Defasagem entre publicação e rastreamento
- **O problema possível**: uma nova análise pode ocorrer antes que páginas corrigidas sejam rastreadas novamente.
- **Ação verificável**: publique o sitemap, confira as URLs no **Google Search Console** e solicite nova análise quando a versão corrigida estiver acessível. Isso não força nem garante indexação.

---

## 3. Entendendo a Rejeição por "Conteúdo de Baixo Valor" (*Low-Value Content*)

Uma revisão de conteúdo deve considerar mais do que quantidade de palavras. Para aplicações e ferramentas web, confira pelo menos estes quatro pontos:

1. **Conteúdo raso ou repetitivo**: Uma página com pouco contexto próprio pode não demonstrar utilidade suficiente.
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
- [ ] **Identificação e carregamento:** Use um método de identificação aceito para a configuração da conta. Carregue `adsbygoogle.js` somente de acordo com o consentimento aplicável e com a estratégia de anúncios do produto; não use a tag como atalho para ignorar escolhas do usuário.
- [ ] **`robots.txt` desobstruído:** Garantir que `Googlebot` e `Mediapartners-Google` tenham acesso total:
  ```text
  User-agent: *
  Allow: /
  Sitemap: https://seusite.com/sitemap.xml
  ```
- [ ] **HTTPS e canonical:** Cada página indexável deve ter `<link rel="canonical" href="...">` com a URL canônica exata e uma política consistente de barra final.

---

### Gate 2: Conteúdo Semântico Prerendered (SSG / Static HTML)
- [ ] **Zero páginas em branco no HTML bruto:** O HTML retornado pelo servidor deve conter a árvore semântica completa (`<h1>`, parágrafos, botões, FAQs, rodapé) mesmo com JavaScript desabilitado. O framework hidrata a interatividade por cima.
- [ ] **Título principal previsível:** Adote um H1 que identifique claramente o conteúdo de cada documento e valide a hierarquia usada pelos templates.
- [ ] **Hierarquia de cabeçalhos:** `<h1>` → `<h2>` (seções de ferramentas, controles) → `<h3>` (cards, recursos) → `<p>` (textos explicativos).

---

### Gate 3: Ferramentas Interativas de Alto Valor Técnico
Para utilitários e web apps, adicione recursos que demonstrem engenharia real:
- [ ] **Calculadoras e Conversores:** Fórmulas físicas e matemáticas reais (ex: Calculadora de densidade de pixels PPI, Dot Pitch, Acuidade Snellen 20/20, dimensionamento de telas).
- [ ] **Padrões visuais via Canvas/DOM:** Loops com `requestAnimationFrame` podem mostrar movimento e estimar a cadência dos callbacks do navegador. Eles não medem diretamente GtG, MPRT, PWM ou a taxa física do painel.
- [ ] **Sintetizadores e APIs Nativas:** Web Audio API (geradores de ruído, timers), Screen Wake Lock API, IndexedDB local.

---

### Gate 4: Dados Estruturados (Schema.org / JSON-LD)
Use somente esquemas que correspondam ao conteúdo visível. Dados estruturados ajudam mecanismos de busca a interpretar a página, mas não garantem rich results:
- [ ] **`@type: "WebApplication"` / `"SoftwareApplication"`:** Nome, descrição, categoria, sistema operacional suportado e modelo de gratuidade (`offers: { price: "0" }`).
- [ ] **`@type: "HowTo"`:** Passos numerados (`HowToStep`) ensinando o usuário a operar a ferramenta.
- [ ] **`@type: "FAQPage"`:** Perguntas e respostas técnicas sobre funcionamento, metodologia e limites.
- [ ] **`@type: "BreadcrumbList"`:** Caminho de navegação (`Home > Ferramenta`).
- [ ] **`@type: "Organization"` / `"WebSite"`:** Identidade do mantenedor e URL oficial.

---

### Gate 5: Arquitetura Limpa de Erros (Página 404)
Política segura para um site estático:
- [ ] A página `404.html` existe e contém atalhos para recuperação.
- [ ] A resposta de erro não se declara canonical de uma página indexável.
- [ ] A página 404 não exibe unidades de anúncio.

---

### Gate 6: Política de privacidade e requisitos regionais
A política deve refletir a operação real e as divulgações exigidas pelos fornecedores e pelas regiões atendidas:
- [ ] **Fornecedores e cookies:** Descreva terceiros, finalidades e tecnologias usadas conforme a configuração atual.
- [ ] **Links Clicáveis de Opt-out:**
  - Configurações de Anúncios do Google: `https://www.google.com/settings/ads`
  - Opt-out de Terceiros (AboutAds): `https://www.aboutads.info/choices/`
  - Políticas de Parceiros Google: `https://policies.google.com/technologies/partner-sites`
- [ ] **Privacidade client-side:** Descreva, para cada tipo de dado, o que permanece no navegador, o que é armazenado no dispositivo e quais requisições podem chegar à hospedagem ou a terceiros. Não use “100% local” se qualquer integração contradisser a frase.
- [ ] **Identificação e contato:** Informe controlador ou responsável, canal para solicitações, data de atualização e DPO quando aplicável.

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
[5. Confirmar o novo rastreamento quando o Search Console o registrar]
                         │
                         ▼
[6. Reenviar Pedido de Análise no Painel do Google AdSense]
```

### Detalhamento do Passo 4 (Google Search Console):
1. Acesse o [Google Search Console](https://search.google.com/search-console).
2. Selecione a propriedade do seu domínio.
3. Cole a URL da Home na barra superior **"Inspecionar qualquer URL"**.
4. Clique em **"Testar URL ao vivo"** para verificar a versão acessível naquele momento. O teste não garante indexação.
5. Verifique a captura de tela e o HTML renderizado: confirme que o H1, o texto semântico e as ferramentas estão visíveis.
6. Clique em **"Solicitar Indexação"**.
7. Repita nas páginas canônicas relevantes para a correção realizada.
8. Somente após a confirmação de rastreamento recente no Search Console, solicite a nova revisão no painel do AdSense.
