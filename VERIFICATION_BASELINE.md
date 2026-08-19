# VERIFICATION BASELINE — MONITORSMITH
**Empresa / Proprietário**: EXVORN.TECH  
**Data da Baseline**: 8 de Agosto de 2026 (Ancorado no Rollback de 4 de Agosto de 2026)  
**Status do Projeto**: 100% Funcional | 0 Alucinações | AdSense Audit Compliant | GSAP & Lenis Smooth 60/120+ FPS

---

## 📍 1. Ancoragem de Versão e Repositório (Git Anchor)
- **Repositório de Origem**: `https://github.com/arch-antomcore/monitorsmith.git`
- **Commit Base do Rollback**: `fbe189af581c368e6336256afea293f5440c772d` (*chore: clean up temporary test files*)
- **Diretório Local do Projeto**: `C:\Users\Xgm\Desktop\APPWBP`
- **Comando de Rollback Executado**: `git reset --hard fbe189af581c368e6336256afea293f5440c772d && git push --force origin main`

---

## 🚀 2. Contrato de Animação e Performance (GSAP + Lenis Offline)
1. **Pacotes e Módulos GSAP ESM**:
   - Localização: [`src/vendor/gsap`](file:///c:/Users/Xgm/Desktop/APPWBP/src/vendor/gsap)
   - Aliases configurados no [`vite.config.js`](file:///c:/Users/Xgm/Desktop/APPWBP/vite.config.js): `'gsap'`, `'gsap/ScrollTrigger'`, `'gsap/ScrollToPlugin'`, `'gsap/CustomEase'`, `'gsap/Flip'`.
   - Chunk manual Rollup: `vendor-gsap`.
2. **Sincronização 60/120+ FPS**:
   - `ReactLenis` envelopa a aplicação em [`src/App.jsx`](file:///c:/Users/Xgm/Desktop/APPWBP/src/App.jsx) (`lerp: 0.08`, `duration: 1.2`, `smoothWheel: true`).
   - Sincronizador de renderização GSAP: `gsap.ticker.lagSmoothing(0)` ativo em [`src/App.jsx`](file:///c:/Users/Xgm/Desktop/APPWBP/src/App.jsx).
3. **Efeito 3D Perspective Tilt**:
   - Aplicado via GSAP `rotationX` / `rotationY` nos cards de [`src/components/Home/ToolLibrary.jsx`](file:///c:/Users/Xgm/Desktop/APPWBP/src/components/Home/ToolLibrary.jsx).
4. **Remoção de Travas de Animação e Economia de Bateria**:
   - Removida a regra CSS de `0.01ms !important` de [`src/styles/globals.css`](file:///c:/Users/Xgm/Desktop/APPWBP/src/styles/globals.css).
   - Removidas verificações impeditivas de `prefers-reduced-motion` no `ReactLenis` e nos handlers do GSAP.

---

## 🧹 3. Limpeza Visual e Verificação de Integridade das Ferramentas
- **Componente de Linhas Roxas**: Removido do projeto. Arquivo [`src/components/UI/RisingLines.jsx`](file:///c:/Users/Xgm/Desktop/APPWBP/src/components/UI/RisingLines.jsx) deletado.
- **Catálogo de 13 Ferramentas Ativas (100% Operacionais)**:
  1. `black` (`BlackScreenMode.jsx`): Tela preta absoluta #000000 para OLED e inspeção de vazamento de luz.
  2. `dead-pixel` (`DeadPixelTestMode.jsx`): 8 cores sólidas com atalhos de navegação e temporizador.
  3. `cleaner` (`ScreenCleanerMode.jsx`): Padrões de alto contraste e trava de tela de 30 segundos.
  4. `calibration` (`CalibrationLabMode.jsx`): 13 padrões de teste visual (escala de cinza, moiré, gamma, etc.).
  5. `white` (`WhiteLightingMode.jsx`): Luz suave com ajuste de temperatura (2700K - 9300K) e brilho.
  6. `color` / `green-screen` (`WhiteLightingMode.jsx` variant="color"): Estúdio de cor livre e preset verde #00B140.
  7. `focus-timer` (`FocusTimerMode.jsx`): Timer de Pomodoro com áudio sintético (Web Audio API).
  8. `clock` (`FullScreenClockMode.jsx`): Relógio digital e analógico para tela secundária.
  9. `message` (`MessageOverlayMode.jsx`): Mensagem em escala de sala e leitura de teleprompter espelhado.
  10. `sponsor-loop` (`SponsorLoopMode.jsx`): Rotação local de logos e imagens com transições e IndexedDB.
  11. `ppi-calculator` (`PpiCalculatorMode.jsx`): Calculadora de densidade de pixels (PPI), dot pitch e distância de acuidade visual Retina Snellen 20/20.
  12. `motion-blur` (`MotionBlurTestMode.jsx`): Teste de ghosting, tempo de resposta (GtG), MPRT e overshoot a 60Hz-240Hz+ com telemetria VSync em tempo real.

---

## 🛡️ 4. Conformidade do Google AdSense (Relatório de Auditoria 2026-08-19)

| Requisito do AdSense | Implementação no Código | Status |
| :--- | :--- | :--- |
| **Tag no `<head>`** | Presente em [`index.html`](file:///c:/Users/Xgm/Desktop/APPWBP/index.html) (`ca-pub-5926952327268950`) | ✅ Aprovado |
| **Conteúdo Semântico Prerendered** | Shell `<div id="root">` em [`index.html`](file:///c:/Users/Xgm/Desktop/APPWBP/index.html) contém H1 único, 13 ferramentas, seção Sobre e FAQ | ✅ Aprovado |
| **H1 Único por Página** | Validados `index.html` e 69 páginas geradas com exatamente 1 tag `<h1>` | ✅ Aprovado |
| **Rich Snippets JSON-LD** | Marcação `@type: HowTo`, `@type: SoftwareApplication`, `@type: FAQPage` e `@type: WebSite` em todos os 28 guias técnicos | ✅ Aprovado |
| **Página de Erro 404 Customizada** | [`public/404.html`](file:///c:/Users/Xgm/Desktop/APPWBP/public/404.html) com navegação de recuperação e sem canonical incorreto | ✅ Aprovado |
| **Divulgação de Cookies AdSense** | [`PrivacyModal.jsx`](file:///c:/Users/Xgm/Desktop/APPWBP/src/components/UI/PrivacyModal.jsx) contém avisos de cookies de terceiros/DART | ✅ Aprovado |
| **Links de Opt-out de Anúncios** | Adicionados links para `https://www.google.com/settings/ads` e `https://policies.google.com/technologies/partner-sites` | ✅ Aprovado |
| **Links Estáticos de Rodapé** | [`FooterSection.jsx`](file:///c:/Users/Xgm/Desktop/APPWBP/src/components/UI/FooterSection.jsx) inclui `<a href="/privacidade/">` e `<a href="/termos/">` | ✅ Aprovado |
| **Metadados Editoriais e Schema** | `TechArticle` schema, autor (`EXVORN.TECH`) e metodologia técnica detalhada em [`scripts/generate-seo-pages.mjs`](file:///c:/Users/Xgm/Desktop/APPWBP/scripts/generate-seo-pages.mjs) | ✅ Aprovado |

---

## ⚙️ 5. Suíte Automatizada de Verificação (Quality Gates)

O projeto conta com suítes de testes unitários e de validação de build que devem passar com **0 erros**:

1. **Testes Unitários (`npm run test`)**:
   - [`tests/unit/public-contracts.test.js`](file:///c:/Users/Xgm/Desktop/APPWBP/tests/unit/public-contracts.test.js) (6 testes)
   - [`tests/unit/verification-baseline.test.js`](file:///c:/Users/Xgm/Desktop/APPWBP/tests/unit/verification-baseline.test.js) (4 testes)
   - [`tests/unit/sponsor-loop.test.js`](file:///c:/Users/Xgm/Desktop/APPWBP/tests/unit/sponsor-loop.test.js) (3 testes)
   - [`tests/unit/tools-registry.test.js`](file:///c:/Users/Xgm/Desktop/APPWBP/tests/unit/tools-registry.test.js) (4 testes)
   - **Total**: 17/17 testes aprovados.

2. **Validação do Build (`npm run build`)**:
   - 29 páginas HTML estáticas geradas.
   - 29 URLs mapeadas no `sitemap.xml`.
   - 67 arquivos estáticos no precache do Service Worker (`sw.js`).
   - [`scripts/validate-build.mjs`](file:///c:/Users/Xgm/Desktop/APPWBP/scripts/validate-build.mjs) executado com sucesso.

3. **Comando Mestre de Verificação**:
   ```bash
   npm run check
   ```
   *(Executa `npm run lint && npm run test && npm run build` em sequência e deve retornar código de saída 0).*

---

## 📌 6. Instruções Salvas de Uso e Verificação Posterior

Se no futuro for necessário validar se qualquer modificação alterou o comportamento das ferramentas ou reintroduziu regressões:

1. **Executar a Verificação Geral no Terminal**:
   ```bash
   npm run check
   ```
2. **Critério de Validação**:
   - **Linting**: 0 warnings, 0 erros no ESLint.
   - **Testes Unitários**: 17/17 testes em `tests/unit/*.test.js` passando.
   - **Build & SEO**: 29 páginas geradas, 29 sitemaps validados e `scripts/validate-build.mjs` reportando `Build validado`.
3. **Contrato de Modificações**:
   - Nunca reintroduzir `RisingLines.jsx` nem travas de `0.01ms !important`.
   - Nunca remover o Publisher ID do AdSense ou a tag no `<head>`.
   - Garantir que cada ferramenta declarada em `TOOLS_REGISTRY` possua seu componente ativo em `src/components/Modes/`.
