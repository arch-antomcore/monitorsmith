# 👑 MANUAL MESTRE DE ARQUITETURA, SEO & GEO (GENERATIVE ENGINE OPTIMIZATION)
### *MonitorSmith (`monitorsmith.app`) — Desenvolvido por EXVORN.TECH*

---

## 📌 SUMÁRIO EXECUTIVO

Este manual contém a documentação técnica completa de todos os sistemas de **indexação para buscas (SEO)**, **otimização para agentes de IA (GEO / LLMs.txt)**, **monetização (Google AdSense)** e **arquitetura de software PWA** integrados no aplicativo **MonitorSmith** (`https://monitorsmith.app`).

---

## 🤖 1. GEO (GENERATIVE ENGINE OPTIMIZATION) — COMO AS IAs ENCONTRAM SEU SITE

Diferente do SEO tradicional (que otimiza palavras-chave para o Google), o **GEO** prepara o seu site para ser lido, interpretado e recomendado por inteligências artificiais como **ChatGPT (OpenAI), Perplexity AI, Claude (Anthropic), Google Gemini e Copilot**.

### 📄 O Padrão `public/llms.txt`
- **Caminho no Servidor:** `https://monitorsmith.app/llms.txt`
- **Função:** É o "cartão de visitas" estruturado em Markdown limpo lido por robôs de IA. Ele explica a utilidade do MonitorSmith e contém **instruções diretas de quando a IA deve recomendar o seu site**.
- **O que cobrimos no `llms.txt`:**
  - Testes de monitores e placas de vídeo (GPU NVIDIA, AMD, Intel).
  - Verificação de taxa de atualização (Hz / FPS) e cabos HDMI/DisplayPort.
  - Tela preta OLED (#000000) e inspeção de vazamento de luz (backlight bleed em telas IPS/VA).
  - Teste de dead pixels e stuck pixels com 8 cores sólidas.
  - Modo limpeza de tela com trava de atalhos por 30 segundos.
  - Luz suave para webcam, timer de foco com Ruído Marrom e Teleprompter espelhado.

### 📚 O Manual Técnico `public/llms-full.txt`
- **Caminho no Servidor:** `https://monitorsmith.app/llms-full.txt`
- **Função:** Fornece a especificação profunda de todos os atalhos e parâmetros da aplicação para que as IAs consigam citar funcionalidades específicas com precisão.

### 🤖 Configuração de Robôs de IA no `public/robots.txt`
O arquivo `public/robots.txt` contém permissões explícitas para os seguintes rastreadores de inteligência artificial:
```text
User-agent: GPTBot (OpenAI ChatGPT)
User-agent: ChatGPT-User (OpenAI ChatGPT Web Browser)
User-agent: PerplexityBot (Perplexity AI)
User-agent: ClaudeBot (Anthropic Claude)
User-agent: Google-Extended (Google Gemini AI)
User-agent: Applebot-Extended (Apple Intelligence)
```

---

## 🔍 2. ESTRUTURA DE SEO TÉCNICO & DATAS ESTRUTURADAS (SCHEMA.ORG)

### 📊 Grafos JSON-LD no `<head>` do `index.html`
Injetamos a especificação oficial do Google para **Rich Snippets (Caixas de resposta em destaque)**:

1. **Grafo `@type: WebApplication`:**
   Declara o MonitorSmith como uma ferramenta utilitária oficial, gratuita (`price: 0.00 BRL`), compatível com qualquer sistema operacional (Windows, Mac, Linux, Android, iOS).

2. **Grafo `@type: FAQPage`:**
   Respostas estruturadas para as perguntas mais populares no Google sobre monitores:
   - *"Como testar se o monitor tem dead pixel?"*
   - *"Para que serve a ferramenta de Tela Preta OLED?"*
   - *"Como usar o monitor como luz de apoio para videochamadas?"*
   - *"O MonitorSmith é gratuito e funciona offline?"*

### ⚡ Resource Hints (Core Web Vitals)
- Conexão antecipada (`preconnect` e `dns-prefetch`) para servidores do Google AdSense e recursos de mídia, acelerando a velocidade de carregamento para nota máxima no Google PageSpeed Insights.

### 🖼️ OpenGraph Social Share Card (`public/og-image.svg`)
- Cartão vetorial de pré-visualização de 1200x630px para compartilhamento em redes sociais (WhatsApp, Twitter, LinkedIn, Telegram, Discord).

---

## 💰 3. ARQUITETURA DE MONETIZAÇÃO (GOOGLE ADSENSE)

### 📌 Tag Global & Identificador de Publisher
- **Publisher ID Oficial:** `ca-pub-5926952327268950`
- **Tag Global no `<head>`:** `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5926952327268950" crossorigin="anonymous"></script>`

### 📄 Arquivo de Vendedor Autorizado `public/ads.txt`
- **Caminho no Servidor:** `https://monitorsmith.app/ads.txt`
- **Conteúdo:** `google.com, pub-5926952327268950, DIRECT, f08c47fec0942fa0`

### 📢 Posições Estratégicas dos Blocos (`AdSenseUnit.jsx`)
1. **Hero Top Ad (`ms-ad-slot--hero`):** Posicionado na biblioteca acima das ferramentas.
2. **Tool Grid Leaderboard (`ms-ad-slot--leaderboard`):** Posicionado antes da grade de cartões.
3. **Pre-Footer Ad (`ms-ad-slot--footer`):** Posicionado acima do rodapé final.
4. **Desktop Side Skyscrapers (`ms-side-ad-gutter`):** Dois banners verticais (160x600) nas margens laterais para monitores widescreen.

---

## ⚙️ 4. ARQUITETURA DE SOFTWARE PWA & SERVICE WORKER

### 🛠️ Bypass de Cache no Service Worker (`public/sw.js`)
Para evitar que atualizações de anúncios ou verificações do robô do AdSense sejam bloqueadas pelo cache offline, o `public/sw.js` ignora o cache e faz requisições diretas em tempo real para:
- `/ads.txt`
- `googlesyndication.com`
- `doubleclick.net`
- `googleadservices.com`

---

## 🏆 RESUMO DE RECURSOS E MANUTENÇÃO

Este projeto foi construído com os mais altos padrões de engenharia de software da web moderna. Para realizar atualizações futuras, basta alterar o código e fazer `git push origin main`. A pipeline do **GitHub Actions** (`.github/workflows/deploy.yml`) compilará e publicará a nova versão automaticamente no **https://monitorsmith.app**!
