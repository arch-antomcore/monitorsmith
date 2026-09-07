# Conformidade com o Google AdSense — MonitorSmith

Documento operacional. Descreve o que já está implementado no código e o que
depende de ação sua no painel do AdSense. Revisão: 7 de setembro de 2026.

---

## 1. Verificação de propriedade e carregamento do script

| Item | Estado | Onde |
| --- | --- | --- |
| Meta tag de verificação `google-adsense-account` | Implementado | `index.html` e todas as páginas estáticas |
| `ads.txt` com o publisher DIRECT | Implementado | `public/ads.txt` |
| Script `adsbygoogle.js` fixo no `<head>` | **Removido de propósito** | ver item 2 |
| Injeção do script após consentimento | Implementado | `src/lib/consent.js`, `CONSENT_BODY_SCRIPT` no gerador |

A identificação do publisher usa a meta tag sem solicitar recursos de anúncio.
O carregamento publicitário permanece condicionado ao consentimento e a um slot
configurado. A presença desses elementos no código não comprova aprovação da
conta ou do domínio pelo Google.

## 2. Onde unidades de anúncio podem aparecer

Política aplicada: *Google-served ads may not be placed on screens without
publisher content.* As superfícies de teste do MonitorSmith são, por definição,
telas sem conteúdo — preto absoluto, campos de cinza, padrões de movimento.

- Unidades de anúncio existem **somente** em: página inicial (entre blocos
  editoriais), guias técnicos estáticos e artigos do blog.
- Nenhuma unidade de anúncio é renderizada dentro de um instrumento. Se o
  carregador já tiver sido solicitado após consentimento na home, ele pode
  continuar presente na página enquanto a SPA troca de estado.
- Mantenha Auto Ads desativado até validar exclusões para todas as rotas e estados
  imersivos. Inserção automática sobre uma superfície sem conteúdo editorial
  pode contrariar as políticas do programa.
- Sem intersticiais, sem pop-ups, sem âncoras sobre os controles das ferramentas.

## 3. Implementação de consentimento

- Google Consent Mode v2 com `ad_storage`, `ad_user_data`, `ad_personalization`
  e `analytics_storage` em `denied` **antes** de qualquer tag (`index.html`).
- Banner com três caminhos: aceitar tudo, só o essencial, escolher por categoria.
- Consentimento revogável em qualquer página pelo link "Preferências de
  privacidade" no rodapé (`openConsentPreferences`).
- A escolha é compartilhada entre a aplicação React e as páginas estáticas pela
  mesma chave `ms_consent_v2`.
- Recusando personalização mas aceitando anúncios, é solicitado
  `requestNonPersonalizedAds = 1`.

Esse controle local não é uma CMP certificada e não constitui parecer de
conformidade com GDPR, DMA ou LGPD. Configure no painel do Google os requisitos
aplicáveis às regiões atendidas antes de ativar publicidade.

## 4. Páginas obrigatórias (todas estáticas e rastreáveis)

| Página | URL |
| --- | --- |
| Política de Privacidade | `/privacidade/` |
| Termos de Uso | `/termos/` |
| Política de Cookies e Consentimento | `/cookies/` |
| Aviso Legal e Isenção de Responsabilidade | `/aviso-legal/` |
| Declaração de Acessibilidade | `/acessibilidade/` |
| Metodologia Técnica | `/metodologia/` |
| Sobre (E-E-A-T, autoria) | `/sobre/` |
| Contato | `/contato/` |

Todas estão linkadas no rodapé da aplicação e no rodapé de **todas** as páginas
estáticas, além de constarem no `sitemap.xml`.

## 5. Conteúdo próprio (o ponto que costuma reprovar)

O motivo mais comum de reprovação em sites de ferramentas é *low value content*:
muita interação, pouco texto original. O que existe hoje:

- 27 instrumentos, 22 pares de guias técnicos em português e inglês (44 páginas)
  e 33 artigos de blog.
- Cada guia declara: introdução, procedimento passo a passo, casos de uso,
  **limite técnico honesto**, FAQ e metodologia com normas de referência.
- Guias selecionados citam APIs e normas como referências de contexto. Essas
  citações não transformam observações do navegador em medições certificadas.

Recomendações antes de reenviar para análise:

1. Revise os 33 artigos existentes procurando parágrafos genéricos; substitua por
   números, medidas e procedimentos verificáveis.
2. Garanta que a home e os guias tenham conteúdo útil visível **antes** de qualquer
   unidade de anúncio.
3. Confira no Search Console se as páginas corrigidas foram rastreadas antes de
   solicitar nova análise. Rastreamento e indexação continuam sob controle dos
   mecanismos de busca.

## 6. Passo a passo para ativar unidades

1. Crie as unidades no painel (display responsiva é suficiente).
2. Preencha as variáveis no `.env` de produção:

   ```
   VITE_ADSENSE_SLOT_LIBRARY=1234567890
   VITE_ADSENSE_SLOT_HERO=
   VITE_ADSENSE_SLOT_FOOTER=
   ```

   Sem um slot numérico válido, `AdSenseUnit` não renderiza nada — o site
   simplesmente não mostra espaço vazio.
3. Para inserir unidades nas páginas estáticas, adicione dentro do conteúdo:

   ```html
   <div class="ms-ad"><span>Publicidade</span>
     <ins class="adsbygoogle" style="display:block"
          data-ad-client="ca-pub-5926952327268950"
          data-ad-slot="SEU_SLOT"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
   </div>
   ```

   O carregador em `CONSENT_BODY_SCRIPT` só faz o `push` dessas unidades após o
   consentimento.
4. Confirme no `ads.txt` que o publisher continua idêntico ao da conta configurada.

## 7. Checklist rápido antes de cada reenvio

- [ ] `ads.txt` acessível em `https://monitorsmith.app/ads.txt`
- [ ] Meta `google-adsense-account` presente em todas as páginas
- [ ] Nenhum `adsbygoogle.js` carregando sem consentimento
- [ ] Auto Ads desativado no painel
- [ ] Todas as 8 páginas institucionais respondendo 200 e linkadas no rodapé
- [ ] `sitemap.xml` e `robots.txt` atualizados após o build
- [ ] Nenhuma unidade de anúncio sobre superfícies de teste em tela cheia
- [ ] Conteúdo editorial visível acima de qualquer unidade
- [ ] Banner de consentimento aparecendo em janela anônima
