# Baseline de verificação — MonitorSmith

**Produto:** MonitorSmith

**Responsável:** EXVORN.TECH

**Repositório oficial:** <https://github.com/arch-antomcore/monitorsmith>

**Revisão desta baseline:** 8 de setembro de 2026

Este documento registra fatos que podem ser conferidos no código e no artefato de produção. Ele não certifica hardware, acessibilidade integral, conformidade jurídica, aprovação comercial do Google AdSense nem funcionamento idêntico em todos os navegadores e dispositivos.

## Escopo publicado

O catálogo autoritativo em `src/constants/tools.js` contém 27 ferramentas. Algumas intenções públicas compartilham um mesmo modo interno, como Tela Verde e Estúdio de Cor; por isso, quantidade de ferramentas e quantidade de componentes não são métricas equivalentes.

O build atual produz:

- 44 guias localizados, formados por 22 pares em português e inglês;
- 33 artigos e um índice de blog;
- 8 páginas institucionais e legais;
- 86 páginas estáticas adicionais à home criada pelo Vite;
- 87 URLs no `sitemap.xml`, incluindo a home;
- 46 recursos no precache do service worker gerado em `dist/sw.js`.

Essas contagens são validadas a partir do catálogo e dos arquivos gerados. O arquivo `public/sw.js` é apenas o template de desenvolvimento; a lista final de precache existe em `dist/sw.js` depois de `npm run build`.

## Evidência automatizada

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

- O Lenis usa o próprio ciclo `requestAnimationFrame`; não há cópia vendorizada de GSAP. As fontes usadas pela interface são empacotadas no projeto.
- Lenis e animações respeitam a preferência `prefers-reduced-motion` por meio de `reducedMotion="user"`.
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
4. confira as 87 URLs, páginas legais, canonical, H1, manifest, service worker e navegação crítica no artefato;
5. publique em `main` sem force-push;
6. confirme o commit remoto e o resultado do workflow de deploy;
7. faça uma verificação funcional no domínio publicado.

Falhas em testes, build, deploy ou verificação remota impedem declarar a publicação concluída.
