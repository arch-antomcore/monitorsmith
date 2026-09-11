import fs from 'node:fs/promises';
import path from 'node:path';

import {
  SEO_PAGE_ROUTES,
  SITE_METADATA,
  TOOL_COUNT,
  TOOLS_REGISTRY,
  TOOL_CATEGORIES,
  PWA_SHORTCUTS,
  validateToolsRegistry,
} from '../src/constants/tools.js';

import blogInspection from './blog-articles-inspection.mjs';
import blogCalibration from './blog-articles-calibration.mjs';
import blogProductivity from './blog-articles-productivity.mjs';
import { BLOG_DOUBLE_WORD_TARGETS } from './blog-editorial-targets.mjs';
import { INSTRUMENT_EDITORIAL } from './editorial-instruments.mjs';
import { LEGACY_REDIRECTS } from './site-migrations.mjs';

const BASE_URL = SITE_METADATA.baseUrl;
const DIST_DIR = path.resolve(process.cwd(), 'dist');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

const ADSENSE_CLIENT = 'ca-pub-5926952327268950';

/** Consent Mode v2: todos os sinais negados antes de qualquer tag. */
const CONSENT_HEAD_SCRIPT = `<meta name="google-adsense-account" content="${ADSENSE_CLIENT}"><script>window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments)}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});</script>`;

/**
 * Banner de consentimento das páginas estáticas. O script do AdSense só é
 * injetado depois do consentimento explícito, e a escolha é compartilhada com
 * a aplicação React pela mesma chave de armazenamento (ms_consent_v2).
 */
const CONSENT_BODY_SCRIPT = `<style>
  #ms-consent{position:fixed;inset:auto 0 0 0;z-index:99999;padding:18px clamp(16px,5vw,48px);border-top:1px solid rgba(255,176,32,.32);background:#0b0d10;box-shadow:0 -24px 60px -20px rgba(0,0,0,.8)}
  #ms-consent .wrap{display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between;max-width:1180px;margin:0 auto}
  #ms-consent h2{margin:0 0 6px;color:#ffb020;font:600 .68rem/1.4 ui-monospace,monospace;letter-spacing:.2em;text-transform:uppercase}
  #ms-consent p{margin:0;max-width:66ch;color:#a8aeb6;font-size:.84rem;line-height:1.6}
  #ms-consent .actions{display:flex;flex-wrap:wrap;gap:10px}
  #ms-consent button{padding:12px 18px;border:1px solid rgba(255,255,255,.16);border-radius:3px;background:#14181d;color:#e9e7e2;font:600 .72rem/1 ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;cursor:pointer}
  #ms-consent button.primary{background:#ffb020;border-color:#ffb020;color:#1a1200}
  .ms-ad{margin:32px auto;padding:10px 12px;border:1px solid rgba(255,255,255,.1);border-radius:3px;background:#0f1216;text-align:center}
  .ms-ad span{display:block;margin-bottom:8px;color:#6d757e;font:600 .6rem/1 ui-monospace,monospace;letter-spacing:.18em;text-transform:uppercase}
</style>
<script>
(function(){
  var KEY='ms_consent_v2';
  var isEnglish=(document.documentElement.lang||'').toLowerCase().indexOf('en')===0;
  var copy=isEnglish?{
    title:'Privacy, cookies and ads',
    description:'We use local storage to remember your preferences. You decide whether to allow ads and personalization.',
    policy:'Cookie policy',ads:'Advertising',personalization:'Personalization',reject:'Essential only',selection:'Save selection',accept:'Accept all',preferences:'Privacy preferences'
  }:{
    title:'Privacidade, cookies e anúncios',
    description:'Usamos armazenamento local para lembrar suas preferências. Você decide se permite anúncios e personalização.',
    policy:'Política de cookies',ads:'Publicidade',personalization:'Personalização',reject:'Só o essencial',selection:'Salvar seleção',accept:'Aceitar tudo',preferences:'Preferências de privacidade'
  };
  function read(){try{var raw=JSON.parse(localStorage.getItem(KEY));if(raw&&raw.decided===true&&typeof raw.ads==='boolean'&&typeof raw.personalization==='boolean')return{decided:true,ads:raw.ads,personalization:raw.ads&&raw.personalization};}catch(e){}return null}
  function update(state){try{gtag('consent','update',{ad_storage:state.ads?'granted':'denied',ad_user_data:state.personalization?'granted':'denied',ad_personalization:state.personalization?'granted':'denied',analytics_storage:'denied'});}catch(e){}}
  function loadAds(state){
    if(!state||state.ads!==true||document.getElementById('ms-adsense-script'))return;
    if(!document.querySelector('.ms-ad ins.adsbygoogle'))return;
    window.adsbygoogle=window.adsbygoogle||[];
    if(!state.personalization)window.adsbygoogle.requestNonPersonalizedAds=1;
    var sc=document.createElement('script');sc.id='ms-adsense-script';
    sc.async=true;sc.crossOrigin='anonymous';
    sc.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}';
    document.head.appendChild(sc);
    document.querySelectorAll('.ms-ad ins.adsbygoogle').forEach(function(){try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch(e){}});
  }
  function decide(ads,personalization){
    var state={decided:true,ads:ads,personalization:ads&&personalization};
    var previous=read();
    try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}
    update(state);
    if(previous&&previous.ads&&(previous.ads!==state.ads||previous.personalization!==state.personalization)){window.location.reload();return}
    loadAds(state);
    var el=document.getElementById('ms-consent');if(el)el.remove();
  }
  function openPreferences(){
  if(document.getElementById('ms-consent'))return;
  var saved=read();
  var banner=document.createElement('div');
  banner.id='ms-consent';
  banner.setAttribute('role','dialog');
  banner.setAttribute('aria-labelledby','ms-consent-title');
  banner.innerHTML='<div class="wrap"><div><h2 id="ms-consent-title">'+copy.title+'</h2><p>'+copy.description+' <a href="/cookies/" style="color:#ffb020">'+copy.policy+'</a>.</p><p><label><input type="checkbox" data-ms-ads> '+copy.ads+'</label> <label><input type="checkbox" data-ms-personalization> '+copy.personalization+'</label></p></div><div class="actions"><button type="button" data-ms-reject>'+copy.reject+'</button><button type="button" data-ms-selection>'+copy.selection+'</button><button type="button" class="primary" data-ms-accept>'+copy.accept+'</button></div></div>';
  document.body.appendChild(banner);
  var ads=banner.querySelector('[data-ms-ads]');var personalization=banner.querySelector('[data-ms-personalization]');
  ads.checked=!!(saved&&saved.ads);personalization.checked=!!(saved&&saved.personalization);
  ads.addEventListener('change',function(){if(!ads.checked)personalization.checked=false});
  personalization.addEventListener('change',function(){if(personalization.checked)ads.checked=true});
  banner.querySelector('[data-ms-accept]').addEventListener('click',function(){decide(true,true)});
  banner.querySelector('[data-ms-reject]').addEventListener('click',function(){decide(false,false)});
  banner.querySelector('[data-ms-selection]').addEventListener('click',function(){decide(ads.checked,personalization.checked)});
  banner.querySelector('[data-ms-reject]').focus({preventScroll:true});
  }
  var footer=document.querySelector('footer');
  if(footer){var preferences=document.createElement('button');preferences.type='button';preferences.textContent=copy.preferences;preferences.style.cssText='padding:12px;color:inherit;background:transparent;border:1px solid currentColor;border-radius:6px;cursor:pointer';preferences.addEventListener('click',openPreferences);footer.appendChild(preferences)}
  var saved=read();
  var hasAdSlots=!!document.querySelector('.ms-ad ins.adsbygoogle');
  if(saved){update(saved);loadAds(saved)}else if(hasAdSlots){openPreferences()}
})();
</script>`;

const BLOG_CATEGORIES = Object.freeze([
  Object.freeze({
    id: 'inspecao-de-paineis',
    label: 'Inspeção e cuidado de painéis',
    description: 'Procedimentos para observar pixels, uniformidade, retenção, superfícies e vazamento aparente sem transformar uma triagem visual em diagnóstico.',
    articles: blogInspection,
  }),
  Object.freeze({
    id: 'cor-e-imagem',
    label: 'Cor, imagem e iluminação',
    description: 'Guias sobre resposta tonal, gerenciamento de cor, gradientes, iluminação de apoio e uso de telas como parte de um fluxo visual.',
    articles: blogCalibration,
  }),
  Object.freeze({
    id: 'trabalho-e-apresentacao',
    label: 'Trabalho, áudio e apresentação',
    description: 'Métodos práticos para organizar tempo, posicionar telas e usar relógio, teleprompter, mensagens, QR codes e loops em situações reais.',
    articles: blogProductivity,
  }),
]);

const BLOG_ARTICLES = BLOG_CATEGORIES.flatMap((category) => category.articles.map((article) => Object.freeze({
  ...article,
  categoryId: category.id,
  categoryLabel: category.label,
})));
const BLOG_LAST_MODIFIED = BLOG_ARTICLES.reduce(
  (latest, article) => article.updatedAt > latest ? article.updatedAt : latest,
  SITE_METADATA.contentLastModified,
);
const BLOG_SLUG_SET = new Set(BLOG_ARTICLES.map((a) => a.slug));

const EDITORIAL_CONTENT = Object.freeze({
  ...INSTRUMENT_EDITORIAL,
  'black-screen': {
    related: ['dead-pixel-test', 'screen-cleaner', 'monitor-test'],
    pt: {
      intro: 'Uma superfície preta ajuda a observar uniformidade, pixels luminosos, IPS glow e vazamento de luz em ambiente escurecido. OLEDs normalmente reduzem muito a emissão em preto; LCDs continuam dependentes da luz de fundo e do comportamento do local dimming.',
      steps: ['Abra a ferramenta e solicite tela cheia pelo botão ou pela tecla F.', 'Use o brilho habitual e reduza a iluminação da sala sem criar uma condição desconfortável.', 'Observe centro, bordas e cantos de frente e, depois, mude levemente o ângulo. Registre apenas o que se repete nas mesmas condições.'],
      uses: ['Inspeção visual de pixels claros, IPS glow e vazamento de luz.', 'Conferência de um monitor novo dentro do prazo aplicável de troca ou garantia.', 'Comparação de dois painéis sob as mesmas condições de brilho, ângulo e ambiente.', 'Redução da luz emitida por uma tela secundária ociosa.'],
      limitations: 'O resultado depende da tecnologia, brilho, local dimming, ângulo e adaptação visual. O navegador não mede luminância nem certifica defeitos físicos.',
      faq: [
        ['Isso economiza energia?', 'OLEDs e LCDs com local dimming podem consumir menos ao exibir áreas pretas, mas a redução varia por modelo, brilho e processamento. Em LCDs sem escurecimento local, a luz de fundo pode continuar ativa.'],
        ['Como distinguir IPS Glow de Backlight Bleed?', 'Uma mudança forte ao alterar o ângulo sugere glow; uma região que se repete na mesma posição pode sugerir bleed. Fotografias, exposição automática e montagem do painel podem confundir a comparação.']
      ],
      methodology: [
        'OLEDs são autoemissivos e conseguem reduzir a emissão de pixels pretos sem uma luz de fundo contínua. O valor físico de luminância e o consumo restante dependem do painel, dos circuitos e do processamento do aparelho; esta página não os mede.',
        'LCDs modulam uma luz de fundo. O nível de preto varia por tecnologia, brilho, contraste, escurecimento local e condições de observação, portanto um campo digital #000000 não implica um valor físico universal.',
        'Glow angular e vazamento associado à montagem podem produzir manchas parecidas. Repetir a observação com posição, brilho e ambiente controlados ajuda a descrevê-las, mas a causa final exige avaliação do fabricante ou de um técnico.'
      ]
    },
    en: {
      intro: 'A fullscreen black surface helps inspect uniformity, bright pixels, IPS glow and backlight bleed in a dim room. OLEDs usually reduce black emission substantially; LCDs still depend on their backlight and local-dimming behavior.',
      steps: ['Open the tool and request fullscreen using its button or the F key.', 'Use your normal brightness and dim the room without creating an uncomfortable condition.', 'Inspect center, corners and edges head-on, then shift the viewing angle slightly. Record only repeatable observations.'],
      uses: ['Visual inspection of bright pixels, IPS glow and backlight bleed.', 'Checking a new monitor within the applicable return or warranty period.', 'Side-by-side comparison under the same brightness, angle and ambient light.', 'Reducing light from an idle secondary display.'],
      limitations: 'Results depend on panel technology, brightness, local dimming, angle and visual adaptation. The browser does not measure luminance or certify hardware faults.',
      faq: [
        ['Does a black screen save power?', 'OLEDs and LCDs with local dimming may use less power for black areas, but the change varies by model, brightness and processing. LCDs without local dimming may keep the backlight active.'],
        ['How do I distinguish IPS Glow from Backlight Bleed?', 'A strong change with viewing angle suggests glow; a repeatable fixed region may suggest bleed. Camera exposure and chassis construction can make the comparison ambiguous.']
      ],
      methodology: [
        'OLED panels are self-emissive and can reduce emission from black pixels without a continuous backlight. Physical luminance and remaining power depend on the panel, electronics and device processing; this page does not measure them.',
        'LCDs modulate a backlight. Black level varies with panel type, brightness, contrast, local dimming and viewing conditions, so digital #000000 does not imply one universal physical value.',
        'Angular glow and assembly-related bleed can look similar. Repeating the observation with a controlled position, brightness and room condition helps describe the pattern, while final cause attribution requires manufacturer or technician assessment.'
      ]
    },
  },
  'dead-pixel-test': {
    related: ['monitor-test', 'black-screen', 'display-calibration'],
    pt: {
      intro: 'A alternância entre oito campos sólidos ajuda a localizar pontos que se comportam de modo diferente em cores claras, escuras e primárias.',
      steps: ['Abra o teste em tela cheia e limpe a superfície do monitor com microfibra.', 'Percorra a sequência completa: Vermelho, Verde, Azul, Ciano, Magenta, Amarelo, Branco e Preto.', 'Examine minuciosamente toda a matriz a uma distância confortável e repita qualquer ponto suspeito.'],
      uses: ['Inspeção de monitores, notebooks, tablets e smartphones novos ou usados.', 'Registro visual antes do término do prazo aplicável de devolução ou garantia.', 'Localização repetível de pontos suspeitos para comparar com a política do fabricante.'],
      limitations: 'Trata-se de inspeção visual. Poeira, escala, processamento e diferentes mecanismos de falha podem produzir aparências parecidas; a ferramenta não determina a causa nem a elegibilidade de garantia.',
      faq: [
        ['Qual a diferença visual entre pixel morto e subpixel preso?', 'Um ponto escuro em vários fundos claros costuma ser chamado de pixel morto; um ponto colorido que persiste em determinados fundos costuma ser chamado de subpixel preso. Só a aparência não revela o mecanismo elétrico.'],
        ['Quantos defeitos são aceitos?', 'A política varia por fabricante, modelo, região, tipo e agrupamento do defeito. Consulte a garantia vigente do produto; uma classe técnica não substitui o contrato ou a legislação aplicável.']
      ],
      methodology: [
        'Monitores modernos utilizam matrizes ativas de transistores de filme fino (TFT - a-Si, IGZO ou LTPS). Em uma resolução 4K UHD (3840x2160), existem 8,29 milhões de pixels e mais de 24,88 milhões de subpixels RGB individuais controlados por transistores microscópicos.',
        'Falhas de transistores, conexões, emissores ou controle podem produzir pontos escuros, claros ou coloridos. Um teste no navegador descreve o padrão visual, mas não identifica qual componente falhou.',
        'Normas técnicas fornecem métodos e classificações, enquanto a cobertura comercial depende da política vigente do fabricante e da legislação local. A sequência de cores ajuda a registrar quais fundos tornam a anomalia visível.'
      ]
    },
    en: {
      intro: 'Cycling eight solid fields helps locate points that behave differently on bright, dark and primary-color backgrounds.',
      steps: ['Open the test fullscreen and wipe the screen with a clean microfiber cloth.', 'Cycle through the full sequence: Red, Green, Blue, Cyan, Magenta, Yellow, White, and Black.', 'Inspect the entire active matrix at a comfortable distance and re-verify any anomaly.'],
      uses: ['Inspecting new or refurbished monitors, laptops, tablets and smartphones.', 'Recording observations before an applicable return or warranty period expires.', 'Locating repeatable suspicious points to compare with the manufacturer policy.'],
      limitations: 'This is a visual inspection. Dust, scaling, processing and different failure mechanisms can look similar; the tool cannot determine cause or warranty eligibility.',
      faq: [
        ['What is the visual difference between a dead pixel and a stuck subpixel?', 'A dark point across several bright fields is often called dead; a colored point that persists on specific fields is often called stuck. Appearance alone does not reveal the electrical mechanism.'],
        ['How many defects are accepted?', 'Policies vary by manufacturer, model, region, defect type and clustering. Check the current product warranty; a technical class does not replace the contract or applicable law.']
      ],
      methodology: [
        'Modern displays utilize thin-film transistor (TFT) active matrices. A 4K UHD display (3840x2160) houses 8.29 million pixels and over 24.88 million discrete RGB subpixel gates lithographed onto glass substrates.',
        'Failures in transistors, interconnects, emitters or control electronics can produce dark, bright or colored points. A browser test describes the visible pattern but cannot identify the failed component.',
        'Technical standards provide methods and classifications, while commercial coverage depends on the current manufacturer policy and local law. The color sequence helps record which fields reveal the anomaly.'
      ]
    },
  },
  'screen-cleaner': {
    related: ['dead-pixel-test', 'black-screen', 'display-calibration'],
    pt: {
      intro: 'Fundos de alto contraste ajudam a localizar poeira, marcas e resíduos antes de limpar a tela conforme o manual do modelo.',
      steps: ['Use o fundo de contraste para localizar marcas e poeira, sem limpar o painel ligado.', 'Encerre o teste, desligue o monitor e siga as orientações de limpeza do fabricante.', 'Use um pano macio adequado; se o fabricante permitir umidade, aplique o líquido no pano, nunca diretamente na tela.'],
      uses: ['Preparação para manutenção periódica preventiva de estações de trabalho.', 'Mapeamento de poeira superficial antes da aplicação de películas protetoras.', 'Inspeção de riscos superficiais na camada polarizadora.'],
      limitations: 'O MonitorSmith fornece apenas superfícies de contraste. Materiais, líquidos e concentrações compatíveis variam; use somente o método autorizado pelo fabricante.',
      faq: [
        ['Posso utilizar álcool ou limpa-vidros no monitor?', 'Use somente o produto e a concentração autorizados no manual do modelo. Limpa-vidros, amônia, acetona e soluções não aprovadas podem danificar revestimentos.'],
        ['Qual pano usar?', 'Use um pano macio, limpo e sem partículas abrasivas, conforme a orientação do fabricante. Não aplique líquido diretamente no painel.']
      ],
      methodology: [
        'Telas podem usar vidro, polarizadores e revestimentos antirreflexo ou oleofóbicos com tolerâncias químicas diferentes. A aparência externa não informa qual solução é compatível.',
        'Solventes e produtos domésticos podem manchar ou remover revestimentos. Alguns fabricantes permitem soluções específicas em certos modelos; por isso o manual do aparelho é a referência.',
        'Desligue o equipamento, remova partículas sem pressionar e use um pano adequado apenas com a umidade permitida pelo fabricante. Evite que líquido alcance bordas, portas ou aberturas.'
      ]
    },
    en: {
      intro: 'High-contrast backgrounds help locate dust, marks and residue before cleaning the screen as its model manual directs.',
      steps: ['Use the contrast background to locate dust and marks without cleaning the powered screen.', 'Close the test, power off the display and follow the manufacturer cleaning instructions.', 'Use a suitable soft cloth; if moisture is allowed, apply it to the cloth, never directly to the screen.'],
      uses: ['Routine maintenance of professional editing and gaming monitors.', 'Inspecting display glass before applying protective films.', 'Evaluating superficial scratches on anti-glare coatings.'],
      limitations: 'MonitorSmith only provides contrast surfaces. Compatible materials, liquids and concentrations vary; use only the method authorised by the manufacturer.',
      faq: [
        ['Can I use household glass cleaners or alcohol on my monitor?', 'Use only the product and concentration allowed by the exact model manual. Glass cleaner, ammonia, acetone and unapproved solutions can damage coatings.'],
        ['What cloth should I use?', 'Use a soft, clean cloth without abrasive particles, following the manufacturer instructions. Never spray liquid directly onto the panel.']
      ],
      methodology: [
        'Displays may use glass, polarizers and anti-glare or oleophobic coatings with different chemical tolerances. External appearance does not identify which solution is compatible.',
        'Solvents and household products can stain or remove coatings. Some manufacturers permit specific solutions on certain models, so the device manual is the authority.',
        'Power the device down, remove particles without pressure and use a suitable cloth with only the moisture the manufacturer permits. Keep liquid away from edges, ports and openings.'
      ]
    },
  },
  'monitor-test': {
    related: ['display-calibration', 'dead-pixel-test', 'black-screen'],
    pt: {
      intro: 'O Teste de Monitor reúne padrões para uma triagem visual rápida de geometria, uniformidade aparente, tons e artefatos evidentes.',
      steps: ['Abra o teste em tela cheia logo após desembalar o monitor ou antes de finalizar uma compra.', 'Percorra a lista de verificação visual: geometria, uniformidade básica e ausência de distorções evidentes.', 'Anote qualquer inconsistência observada para consultar a política de garantia ou devolução aplicável.'],
      uses: ['Checklist de triagem e recebimento de monitores novos ou usados.', 'Verificação visual antes de uma medição instrumental.', 'Observação de sintomas compatíveis com uma faixa RGB incorreta, sem determinar a causa.'],
      limitations: 'É uma triagem visual preliminar. O navegador não lê o sinal do cabo, a fase ou o clock físico e não confirma a configuração RGB da GPU.',
      faq: [
        ['Qual a diferença entre o Teste de Monitor e a Verificação Visual?', 'O Teste de Monitor é uma triagem rápida para conferência geral (ideal para recebimento); a Verificação Visual oferece laboratório de padrões para análise minuciosa de tons e gama.'],
        ['Este teste identifica problemas de faixa HDMI/DisplayPort?', 'Pode revelar pretos elevados ou perda de níveis, mas esses sintomas também têm outras causas. Confirme a faixa RGB nas configurações da GPU, do sistema e do monitor.']
      ],
      methodology: [
        'Uma triagem inicial pode registrar pixels suspeitos, distorções geométricas, regiões desiguais e artefatos que se repetem. A causa não pode ser inferida apenas pelo padrão mostrado na página.',
        'Grades e campos uniformes facilitam a comparação visual entre centro, bordas e cantos. Quantificar luminância ou desvio de cor exige medidor e condições controladas.',
        'Uma incompatibilidade entre faixa RGB limitada e completa pode elevar pretos ou cortar detalhes, mas a confirmação deve ser feita nas configurações da cadeia de vídeo.'
      ]
    },
    en: {
      intro: 'The Monitor Test groups patterns for a quick visual triage of geometry, apparent uniformity, tonal steps and obvious artifacts.',
      steps: ['Open the test fullscreen immediately after unboxing or before completing a purchase.', 'Go through the visual checklist: geometric grid alignment, basic uniformity, and absence of artifacts.', 'Document any defect to request immediate replacement within return periods.'],
      uses: ['Unboxing triage checklist for new and refurbished monitors.', 'A visual check before instrument-based measurement.', 'Observing symptoms compatible with an RGB-range mismatch without assigning the cause.'],
      limitations: 'This is preliminary visual triage. The browser does not read cable signal timing, physical phase or pixel clock and cannot confirm GPU RGB-range settings.',
      faq: [
        ['What is the difference between Monitor Test and Visual Check?', 'Monitor Test is a rapid triage checklist (great for unboxing/returns); Visual Check is a technical pattern laboratory for evaluating tonal transitions and gamma.'],
        ['Does this test identify HDMI or DisplayPort range mismatches?', 'It may reveal elevated blacks or clipped levels, but other causes look similar. Confirm RGB range in GPU, operating-system and monitor settings.']
      ],
      methodology: [
        'An initial triage can record suspicious pixels, geometric distortion, uneven regions and repeatable artifacts. The pattern alone cannot establish the underlying cause.',
        'Grids and uniform fields make visual comparison between center, edges and corners easier. Quantifying luminance or color deviation requires a meter and controlled conditions.',
        'A mismatch between limited and full RGB range can elevate blacks or clip detail, but confirmation belongs in the video-chain settings.'
      ]
    },
  },
  'display-calibration': {
    related: ['monitor-test', 'black-screen', 'screen-cleaner'],
    pt: {
      intro: 'A Verificação Visual reúne padrões renderizados pelo navegador para observar escala de cinza, contraste, gradientes e nitidez aparente.',
      steps: ['Restaure o perfil padrão sRGB do monitor e estabilize a iluminação da sala.', 'Analise os passos de sombra (0% a 5%) e realce (95% a 100%) para verificar esmagamento ou estouro.', 'Examine gradientes contínuos e padrões de subpixel para avaliar dithering (FRC) e nitidez de fontes.'],
      uses: ['Comparação visual de gradação tonal e respostas após ajustes no OSD.', 'Observação de banding aparente em diferentes conteúdos e modos.', 'Comparação de nitidez e franjas em renderização de texto.'],
      limitations: 'A avaliação visual orienta ajustes no menu OSD e na GPU. Não gera perfil ICC automatizado nem substitui um colorímetro ou espectrofotômetro de hardware.',
      faq: [
        ['Como identificar possível black crush?', 'Se vários degraus próximos ao preto se fundirem, registre o comportamento e confira faixa RGB, brilho, contraste, perfil de cor e luz ambiente antes de ajustar o monitor.'],
        ['Qual curva usar como referência?', 'sRGB possui uma função de transferência própria, frequentemente aproximada como gama 2,2. Fluxos de vídeo podem adotar BT.1886; o alvo depende do padrão e do ambiente do trabalho.']
      ],
      methodology: [
        'Funções de transferência relacionam códigos digitais e luminância. sRGB é segmentada e não equivale exatamente a uma potência única; BT.1886 define uma resposta de referência considerando as condições do display.',
        'Uma rampa de 8 bits contém códigos de 0 a 255, mas gerenciamento de cor, composição, profundidade do framebuffer, GPU e painel podem transformar o resultado físico. A página permite observação, não validação colorimétrica.',
        'A renderização de texto depende do sistema, navegador, escala e geometria de subpixels. Comparar padrões pode revelar franjas aparentes, sem identificar automaticamente a matriz física ou a correção adequada.'
      ]
    },
    en: {
      intro: 'Visual Check groups browser-rendered patterns for observing grayscale, contrast, gradients and apparent sharpness.',
      steps: ['Restore the default sRGB profile on your display and stabilize ambient room lighting.', 'Inspect deep shadow steps (0%–5%) and highlight steps (95%–100%) for crushing or clipping.', 'Examine continuous gradient sweeps and subpixel targets to assess dithering (FRC) and font rendering clarity.'],
      uses: ['Visual comparison of tonal gradation after OSD changes.', 'Observing apparent banding across content and display modes.', 'Comparing text sharpness and visible color fringing.'],
      limitations: 'Visual inspection guides OSD and GPU driver tuning. It does not generate hardware ICC profiles or replace a dedicated spectrophotometer.',
      faq: [
        ['How do I identify possible shadow crushing?', 'If several near-black steps merge, record the behavior and check RGB range, brightness, contrast, color profile and ambient light before adjusting the display.'],
        ['Which transfer curve should I use as reference?', 'sRGB has its own segmented transfer function, often approximated as gamma 2.2. Video workflows may use BT.1886; the target depends on the delivery standard and viewing environment.']
      ],
      methodology: [
        'Transfer functions relate digital code values to luminance. sRGB is segmented rather than an exact single power law; BT.1886 defines a reference response that accounts for display conditions.',
        'An 8-bit ramp has codes from 0 to 255, but color management, composition, framebuffer depth, GPU and panel processing can transform the physical output. This page supports observation, not colorimetric validation.',
        'Text rendering depends on the operating system, browser, scaling and subpixel geometry. Comparing targets may reveal visible fringing without automatically identifying panel layout or the correct compensation.'
      ]
    },
  },
  'webcam-light': {
    related: ['green-screen', 'fullscreen-message', 'focus-timer'],
    pt: {
      intro: 'Utiliza a tela do monitor como uma fonte de luz suave de grande abertura superficial (Softbox) para videochamadas e gravações, com ajuste de temperatura em Kelvin.',
      steps: ['Posicione a janela do navegador em frente ao seu rosto ou em um segundo monitor.', 'Ajuste a intensidade e a temperatura de cor (de 3200K a 6500K) para casar com o ambiente da sala.', 'Reduza o brilho físico se houver reflexos indesejados em óculos.'],
      uses: ['Videochamadas corporativas no Zoom, Google Meet e Microsoft Teams.', 'Luz de preenchimento suave para fotografia macro de pequenos produtos.', 'Equalização de balanço de branco para gravações com webcam.'],
      limitations: 'A temperatura exibida é uma aproximação colorimétrica sRGB renderizada na tela. A potência efetiva depende da luminância máxima do painel (nits).',
      faq: [
        ['O monitor substitui uma softbox ou ring light?', 'Ele pode servir como luz de apoio próxima, mas oferece menos controle de potência, espectro e posicionamento do que uma luminária dedicada. Compare o resultado na própria câmera.'],
        ['O que significa a temperatura de cor em Kelvin?', 'Valores baixos (3200K) produzem luz quente amarelada (lâmpada incandescente); valores altos (6500K / D65) produzem luz branca fria simulando a luz solar do meio-dia.']
      ],
      methodology: [
        'Uma tela grande e próxima pode funcionar como fonte de área e suavizar sombras em comparação com uma fonte pontual. A iluminância depende do tamanho, brilho, distância e ângulo do painel.',
        'O controle de “Kelvin” converte uma faixa nominal em cores sRGB. Ele não mede nem calibra a CCT real emitida pelo monitor; use a prévia da câmera e ajuste conforme o ambiente.',
        'Espectro, uniformidade e reprodução de cor variam entre painéis. Para trabalho colorimétrico ou iluminação consistente, use uma fonte medida e adequada à finalidade.'
      ]
    },
    en: {
      intro: 'Transforms your computer display into a wide-aperture softbox light source for video calls and streams, featuring adjustable Correlated Color Temperature (CCT).',
      steps: ['Position the browser window facing your subject or onto a secondary display.', 'Adjust intensity and color temperature (3200K to 6500K) to harmonize with ambient room light.', 'Lower screen luminance if specular reflections appear on eyeglasses.'],
      uses: ['Corporate video calls on Zoom, Google Meet, and Microsoft Teams.', 'Diffuse fill lighting for tabletop and macro product photography.', 'Matching camera white balance during remote presentations.'],
      limitations: 'Displayed CCT is an sRGB chromatic approximation rendered on-screen. Peak illuminance is bounded by the panel’s native nit rating.',
      faq: [
        ['Can a monitor replace a physical softbox or ring light?', 'It can provide nearby fill light, but offers less control over output, spectrum and placement than a dedicated fixture. Judge the result in the camera preview.'],
        ['What does the Kelvin temperature scale signify?', 'Lower values (3200K) emit warm amber light mimicking incandescent tungsten; higher values (6500K / D65) emit crisp daylight white.']
      ],
      methodology: [
        'A large nearby screen can behave as an area source and soften shadows compared with a small point source. Illuminance depends on panel size, brightness, distance and angle.',
        'The “Kelvin” control maps a nominal range to sRGB colors. It neither measures nor calibrates the monitor’s emitted CCT; use the camera preview and adjust for the room.',
        'Spectrum, uniformity and color rendering vary between panels. Color-critical or repeatable lighting requires a measured fixture suited to the task.'
      ]
    },
  },
  'green-screen': {
    related: ['webcam-light', 'fullscreen-message', 'sponsor-loop'],
    pt: {
      intro: 'Superfície de croma verde solicitada ao navegador no código sRGB #00B140 para composições de vídeo, recorte de fundo em OBS e fotografia de pequenos objetos.',
      steps: ['Abra a ferramenta e ative o modo tela cheia.', 'Posicione a tela atrás do objeto ou apresentador com iluminação frontal adequada.', 'Configure o filtro de Chroma Key no OBS Studio ou software de edição e ajuste a tolerância de recorte.'],
      uses: ['Fundo de chroma key para gravação de pequenos produtos e miniaturas.', 'Fundo autoiluminado para transmissões e gravação de webcams em mesas compactas.', 'Composições rápidas em DaVinci Resolve, Premiere Pro e CapCut.'],
      limitations: 'Displays emitem luz ativa e podem projetar reflexos verdes (spill) em objetos muito próximos. Mantenha distância adequada e regule o brilho.',
      faq: [
        ['Por que o verde é comum em Chroma Key?', 'Ele costuma se separar bem de tons de pele e muitos sensores usam mais amostras verdes em sua matriz de cor. O resultado também depende da câmera, compressão, iluminação e objeto filmado.'],
        ['Como reduzir reflexos verdes no objeto filmado?', 'Afaste o objeto da tela, reduza o brilho até o recorte ficar estável e use iluminação frontal independente. Ajuste enquanto observa a prévia da própria câmera.']
      ],
      methodology: [
        'O valor #00B140 é uma referência nominal em CSS. Gerenciamento de cor, perfil, brilho e características do painel podem alterar a luz que chega à câmera.',
        'Câmeras e plataformas podem reduzir a resolução de cor ou comprimir o vídeo. Spill, moiré, banding, reflexos e foco na malha do painel podem prejudicar o recorte.',
        'A tela evita vincos de tecido, mas não garante uniformidade nem elimina sombras. Confira exposição, distância, luz frontal e tolerância do filtro na imagem capturada.'
      ]
    },
    en: {
      intro: 'A chroma-green surface requested from the browser as sRGB #00B140 for video matting, OBS keying, and small tabletop shoots.',
      steps: ['Open the tool and enter fullscreen mode.', 'Position the display behind the subject with dedicated frontal lighting.', 'Configure the Chroma Key filter in OBS Studio or your NLE editor and adjust threshold tolerances.'],
      uses: ['Clean chroma key backdrop for macro product reviews and unboxings.', 'Self-luminous green background for compact webcam streaming setups.', 'Rapid compositing in DaVinci Resolve, Premiere Pro, and CapCut.'],
      limitations: 'Active displays emit light that can cause green spill on nearby subjects. Maintain physical distance and calibrate brightness.',
      faq: [
        ['Why is green commonly used for chroma key?', 'It often separates well from skin tones, and many camera sensors sample green more densely. Results still depend on the camera, compression, lighting and subject.'],
        ['How do I reduce green spill on reflective objects?', 'Increase subject-to-screen distance, lower brightness until the key is stable and light the subject separately while checking the camera preview.']
      ],
      methodology: [
        '#00B140 is a nominal CSS reference. Colour management, profiles, brightness and panel characteristics can change the light recorded by the camera.',
        'Cameras and platforms may reduce colour resolution or compress video. Spill, moiré, banding, reflections and focus on the pixel grid can all weaken the key.',
        'A screen avoids fabric folds but does not guarantee uniform output or remove shadows. Check exposure, distance, foreground lighting and key tolerance in the captured image.'
      ]
    },
  },
  'focus-timer': {
    related: ['fullscreen-clock', 'fullscreen-message', 'webcam-light'],
    pt: {
      intro: 'Temporizador de foco com ciclos configuráveis e aproximações digitais de ruído marrom, rosa e branco geradas no dispositivo pela Web Audio API.',
      steps: ['Escolha a duração do ciclo, o perfil de ruído opcional e um volume baixo.', 'Inicie o temporizador e use a visualização imersiva se ela ajudar na sua rotina.', 'Quando o alerta tocar, faça a pausa que você planejou ou inicie outro ciclo.'],
      uses: ['Blocos de trabalho focado em programação, escrita e análise.', 'Mascaramento opcional de conversas e ruídos no home office.', 'Organização de ciclos de trabalho e pausas de acordo com a preferência pessoal.'],
      limitations: 'É uma ferramenta de organização temporal e apoio acústico. Os perfis são aproximações digitais, e o efeito varia entre pessoas e ambientes. O áudio é sintetizado no dispositivo sem transmissão de um fluxo sonoro para servidores.',
      faq: [
        ['O que é ruído marrom (Brownian noise)?', 'É um ruído com maior energia relativa nas frequências baixas. Algumas pessoas o preferem para mascarar sons; outras trabalham melhor em silêncio.'],
        ['O temporizador consome internet para tocar o áudio?', 'Não. Todo o áudio é sintetizado matematicamente em tempo real no cliente pela Web Audio API.']
      ],
      methodology: [
        'A síntese sonora gera amostras pseudoaleatórias no navegador. O perfil branco mantém as amostras sem filtragem espectral adicional; rosa e marrom usam aproximações digitais que aumentam o peso relativo das frequências baixas.',
        'Os intervalos servem como estrutura de organização. A ferramenta não previne fadiga, estafa ou burnout e não substitui pausas, ergonomia ou orientação de saúde.',
        'Temporizadores e geradores de DSP desta ferramenta executam localmente no navegador, sem fluxo de áudio vindo de um servidor.'
      ]
    },
    en: {
      intro: 'Focus timer with configurable intervals and digital approximations of brown, pink and white noise generated on the device through the Web Audio API.',
      steps: ['Choose an interval, an optional noise profile and a low volume.', 'Start the timer and use the immersive view if it helps your routine.', 'When the alert sounds, take the break you planned or start another cycle.'],
      uses: ['Focused work blocks for software engineering, writing, and research.', 'Optional masking of ambient chatter and household distractions.', 'Organising work and break cycles around personal preference.'],
      limitations: 'This is a time-organisation and optional sound tool. The profiles are digital approximations, and their effect varies by person and environment. Audio is generated on the device without sending an audio stream to a server.',
      faq: [
        ['What is Brownian noise (red noise)?', 'It is noise with more relative energy at lower frequencies. Some people prefer it for masking sounds; others work better in silence.'],
        ['Does audio generation consume network bandwidth?', 'No. Audio waveforms are synthesized algorithmically in real time via the browser’s Web Audio API.']
      ],
      methodology: [
        'Audio synthesis generates pseudorandom samples in the browser. The white profile adds no spectral filtering; pink and brown use digital approximations that place more relative energy at lower frequencies.',
        'Intervals provide an organisational structure. The tool does not prevent fatigue or burnout and does not replace breaks, ergonomics or health advice.',
        'The tool timer loops and audio synthesizers run locally in the browser, without an audio stream from a server.'
      ]
    },
  },
  'fullscreen-clock': {
    related: ['focus-timer', 'fullscreen-message', 'black-screen'],
    pt: {
      intro: 'Exibe horário e data em formatos digital e analógico para dashboards, estúdios e telas secundárias.',
      steps: ['Abra a ferramenta e selecione a composição desejada (Digital ou Analógico).', 'Ative o modo tela cheia (F11) para ocultar barras e menus do sistema operacional.', 'Mantenha a aba aberta na tela secundária para referência contínua de horário.'],
      uses: ['Painel de horário contínuo em mesas de edição, recepções e estúdios.', 'Referência temporal sincronizada para apresentações e gravações.', 'Dashboard minimalista para telas secundárias ociosas.'],
      limitations: 'O horário é lido a partir do relógio do sistema operacional local. A ferramenta não atua como servidor NTP primário.',
      faq: [
        ['O relógio funciona sem conexão à internet?', 'Os recursos já armazenados pelo service worker podem abrir sem conexão. O horário vem do relógio configurado no dispositivo.'],
        ['O que acontece se a aba ficar em segundo plano?', 'O navegador pode atrasar temporizadores de abas inativas. Ao voltar, a próxima atualização lê novamente o relógio do dispositivo.']
      ],
      methodology: [
        'O componente lê `Date` e formata horário, data e fuso com `Intl.DateTimeFormat`. Um `setTimeout` alinhado ao próximo segundo agenda as atualizações.',
        'Navegadores podem atrasar temporizadores em abas inativas. Cada atualização usa uma nova leitura do relógio do dispositivo, sem prometer sincronização de rede ou de VSync.',
        'O service worker armazena o shell principal para uso posterior; a disponibilidade offline depende de o navegador ter concluído esse cache.'
      ]
    },
    en: {
      intro: 'Digital and analog clock for secondary monitors, studio dashboards and events.',
      steps: ['Open the tool and choose your preferred layout (Digital or Analog).', 'Enter fullscreen mode (F11) to hide browser chrome and OS taskbars.', 'Keep the tab open on your secondary screen as a continuous time reference.'],
      uses: ['Continuous studio time reference on secondary monitors and reception desks.', 'Timed cue tracking during live presentations and broadcasts.', 'Minimalist dashboard for idle auxiliary displays.'],
      limitations: 'Time data is sourced from the local operating system RTC clock. The tool does not serve as a primary NTP time server.',
      faq: [
        ['Does the clock work without an active internet connection?', 'Resources already cached by the service worker can open without a connection. Time comes from the clock configured on the device.'],
        ['How does it handle browser background tab throttling?', 'The browser may delay timers in inactive tabs. After you return, the next update reads the device clock again.']
      ],
      methodology: [
        'The component reads `Date` and formats time, date and time zone through `Intl.DateTimeFormat`. A `setTimeout` aligned to the next second schedules updates.',
        'Browsers may delay inactive-tab timers. Every update takes a fresh device-clock reading, without claiming network or VSync synchronisation.',
        'The service worker caches the main shell for later use; offline availability depends on the browser completing that cache.'
      ]
    },
  },
  'fullscreen-message': {
    related: ['online-teleprompter', 'fullscreen-clock', 'webcam-light'],
    pt: {
      intro: 'Sinalização digital estática em tela cheia com tipografia escalável para auditórios, status de salas de reunião e gerador dinâmico de QR Code com correção Reed-Solomon.',
      steps: ['Digite a mensagem ou URL desejada e selecione uma paleta de alto contraste.', 'Ajuste a escala tipográfica para visualização nítida à distância da sala.', 'Ative o modo tela cheia para transformar o monitor em letreiro ou painel de status.'],
      uses: ['Sinalização de status de salas de reunião (Ocupado / Disponível).', 'Avisos visuais de grande porte para palcos, estandes e recepções.', 'Projeção de QR Code de alto contraste para acesso imediato a links e formulários.'],
      limitations: 'Projetada para sinalização estática. O modo teleprompter apenas espelha o texto e permite rolagem manual; não há rolagem automática.',
      faq: [
        ['Como funciona o gerador de QR Code integrado?', 'O texto ou link é codificado diretamente no navegador com correção de erro mínima M; a biblioteca pode elevar o nível quando isso cabe no mesmo símbolo. Entradas acima da capacidade codificável são recusadas com uma mensagem.'],
        ['As mensagens digitadas são salvas em servidores externos?', 'Não. Todo o estado é mantido exclusivamente na memória local da sessão no seu navegador.']
      ],
      methodology: [
        'A tipografia escala de acordo com a janela. O usuário deve conferir a mensagem no local real, pois distância, acuidade, reflexos, tamanho e contraste mudam a leitura.',
        'No modo QR Code, a biblioteca solicita correção de erro mínima M, pode elevar o nível quando houver capacidade e mantém uma zona livre de quatro módulos. A interface recusa conteúdo cuja representação codificada exceda a capacidade suportada.',
        'Os temas oferecem opções de contraste; a legibilidade deve ser conferida na combinação de cores e tamanho de texto escolhidos. Não há certificação integral WCAG AAA.'
      ]
    },
    en: {
      intro: 'Fullscreen digital signage with dynamic typographic scaling for presentation halls, meeting room status boards, and dynamic Reed-Solomon QR Code generation.',
      steps: ['Type your notice or URL and select high-contrast color themes.', 'Adjust typographic scale for clear legibility across your room or venue.', 'Enter fullscreen mode to transform your screen into a clean status display.'],
      uses: ['Meeting room status signage (Occupied / Available).', 'Large-scale visual cue boards for stages, studios, and reception lobbies.', 'Projecting high-contrast QR codes for instant audience link distribution.'],
      limitations: 'Designed for static notices. Teleprompter mode mirrors text and allows manual scrolling; it does not auto-scroll.',
      faq: [
        ['How does the built-in QR Code generator operate?', 'Text and URLs are encoded client-side with error-correction level M as a minimum; the library may raise it when the stronger level fits the same symbol. Content beyond the encodable capacity is rejected with a message.'],
        ['Are messages stored on external database servers?', 'No. State remains strictly within the local browser memory session.']
      ],
      methodology: [
        'Typography scales with the viewport. Check the message at the real venue because distance, acuity, glare, character size and contrast affect legibility.',
        'QR content is encoded locally with error-correction level M as a minimum, optional automatic boosting when capacity permits, and a four-module quiet zone. The interface rejects content whose encoded representation exceeds supported capacity.',
        'Themes offer contrast options; check legibility for the chosen colors and text size. There is no claim of comprehensive WCAG AAA certification.'
      ]
    },
  },
  'online-teleprompter': {
    related: ['fullscreen-message', 'webcam-light', 'fullscreen-clock'],
    pt: {
      intro: 'Modo de apoio à leitura que exibe texto em tela cheia, permite rolagem manual e oferece espelhamento horizontal para estruturas de teleprompter.',
      steps: ['Cole seu roteiro e ajuste o tamanho da tipografia.', 'Role o texto manualmente durante o ensaio e escolha uma quantidade que caiba de forma confortável.', 'Ative o espelhamento horizontal se a estrutura óptica utilizada inverter a imagem.'],
      uses: ['Apoio de leitura para videoaulas, apresentações e gravações.', 'Exibição de texto espelhado em estruturas compatíveis.', 'Ensaio de roteiros curtos com controle manual.'],
      limitations: 'O modo atual não controla WPM nem oferece rolagem automática. A compatibilidade e a orientação correta dependem da estrutura óptica usada.',
      faq: [
        ['Por que o teleprompter possui modo de espelhamento horizontal?', 'Algumas estruturas com vidro semirrefletor invertem a imagem vista pelo apresentador. Use o controle somente quando a prévia na sua estrutura aparecer ao contrário.'],
        ['Como evitar que meus olhos pareçam estar lendo?', 'Mantenha a coluna de leitura estreita e posicione a tela o mais próximo possível do eixo central da lente da câmera.']
      ],
      methodology: [
        'O modo espelhado aplica uma inversão horizontal por CSS. A orientação final deve ser conferida no vidro e no enquadramento reais.',
        'Posicionar a área de leitura próxima ao eixo da lente pode reduzir movimentos laterais perceptíveis, mas o resultado depende de distância, largura do texto e enquadramento.',
        'O conteúdo permanece estático e, quando excede a tela, pode ser rolado manualmente. Não existe motor de rolagem automática ou cálculo de palavras por minuto.'
      ]
    },
    en: {
      intro: 'A fullscreen reading aid with manual scrolling and horizontal mirroring for compatible teleprompter rigs.',
      steps: ['Paste your script and adjust the type size.', 'Scroll manually during rehearsal and choose an amount of text that remains comfortable to read.', 'Enable horizontal mirroring only if your optical rig reverses the image.'],
      uses: ['Reading support for video lessons, presentations and recordings.', 'Displaying mirrored text in compatible optical rigs.', 'Rehearsing short scripts under manual control.'],
      limitations: 'The current mode has no WPM control or automatic scrolling. Compatibility and correct orientation depend on the optical rig.',
      faq: [
        ['Why is horizontal mirroring available?', 'Some semi-reflective glass rigs reverse the image seen by the presenter. Enable it only when the preview in your own rig appears backwards.'],
        ['How can I reduce visible lateral eye movement?', 'A narrow reading column placed near the camera lens axis may help. Rehearse with the real distance, text width and framing because the tool cannot guarantee the result.']
      ],
      methodology: [
        'Mirror mode applies a horizontal CSS transform. Verify final orientation with the actual glass and camera framing.',
        'Keeping the reading area close to the lens axis may reduce visible lateral eye movement, but results depend on distance, text width and framing.',
        'Content remains static and can be scrolled manually when it exceeds the viewport. There is no auto-scroll engine or words-per-minute calculation.'
      ]
    },
  },
  'sponsor-loop': {
    related: ['fullscreen-message', 'green-screen', 'webcam-light'],
    pt: {
      intro: 'Carrossel em tela cheia para rotação automatizada de marcas de patrocinadores, anúncios e artes promocionais em eventos, lives e vitrines de lojas.',
      steps: ['Selecione as imagens que possui autorização para exibir.', 'Configure a ordem, a duração de cada marca (5 a 10 segundos), o tipo de transição e a cor de fundo.', 'Inicie a sequência e ative o modo tela cheia (F11).'],
      uses: ['Exibição de cotas de patrocinadores em transmissões ao vivo e palcos.', 'Vitrine digital para lojas, restaurantes (menuboards) e estandes de feiras.', 'Overlay rotativo de apoiadores em softwares de streaming (OBS Studio / vMix).'],
      limitations: 'As imagens são processadas no navegador e persistidas localmente em IndexedDB para reutilização. Movimento sutil não impede retenção ou desgaste; siga as proteções do fabricante do display.',
      faq: [
        ['Posso utilizar a ferramenta como overlay no OBS Studio?', 'Sim. Adicione a aba em modo tela cheia como fonte de captura de janela ou navegador no OBS e aplique filtros de corte se necessário.'],
        ['O que o deslocamento de pixels faz?', 'Ele move levemente a composição para variar sua posição. Isso não garante proteção contra retenção ou burn-in; limite brilho e duração e use as proteções do próprio painel.']
      ],
      methodology: [
        'Conteúdo estático e luminoso por longos períodos pode contribuir para retenção ou desgaste desigual em alguns painéis. O deslocamento muda a posição da composição, sem assegurar prevenção.',
        'As transições usam opacidade e transformações CSS. A fluidez efetiva depende do navegador, da GPU, da resolução das imagens e da carga do dispositivo.',
        'Os arquivos são persistidos no IndexedDB do navegador e exibidos por URLs Blob locais (`URL.createObjectURL`). A ferramenta não implementa endpoint de upload; remover as imagens ou apagar os dados do site limpa esse armazenamento.'
      ]
    },
    en: {
      intro: 'Fullscreen automated carousel for rotating sponsor logos, commercial branding, and promotional banners across events, livestreams, and retail storefronts.',
      steps: ['Select the brand images you are authorized to display.', 'Configure sequence order, per-slide duration (5–10 seconds), transition style, and background color.', 'Launch the carousel and enter fullscreen mode (F11).'],
      uses: ['Sponsor logo rotation on stages, conferences, and tournament streams.', 'Digital signage for retail stores, restaurant menuboards, and trade show booths.', 'Rotating supporter overlay in OBS Studio, vMix, and Streamlabs.'],
      limitations: 'Images are processed in the browser and persisted locally in IndexedDB for reuse. Subtle movement cannot prevent retention or wear; follow the display manufacturer protections.',
      faq: [
        ['Can I use this carousel as an OBS Studio overlay?', 'Yes. Capture the fullscreen browser tab as a Window Capture source in OBS and apply chroma or crop filters as needed.'],
        ['What does pixel shifting do?', 'It moves the composition slightly to vary its position. It does not guarantee protection from retention or burn-in; limit brightness and duration and use the panel’s own protections.']
      ],
      methodology: [
        'Bright static content shown for long periods can contribute to retention or uneven wear on some panels. Pixel shifting changes composition position without assuring prevention.',
        'Transitions use CSS opacity and transforms. Actual smoothness depends on the browser, GPU, image resolution and device load.',
        'Files are persisted in browser IndexedDB and displayed through local object URLs (`URL.createObjectURL`). The tool has no upload endpoint; remove images or clear site data to erase that storage.'
      ]
    },
  },
  'ppi-calculator': {
    related: ['monitor-test', 'display-calibration', 'dead-pixel-test'],
    pt: {
      intro: 'Calculadora geométrica de densidade de pixels (PPI), tamanho nominal do ponto e distância em que um pixel subtende cerca de um minuto de arco.',
      steps: ['Insira a resolução horizontal e vertical do display (ex: 2560 × 1440 ou 3840 × 2160) ou escolha um preset.', 'Informe a diagonal visível da tela em polegadas.', 'Compare PPI, dot pitch e a referência angular calculada com sua distância, visão e preferência de escala.'],
      uses: ['Comparação de densidade e tamanho nominal de pixels antes da compra.', 'Referência geométrica para avaliar a percepção da malha de pixels.', 'Apoio à escolha de escala de interface no sistema operacional.'],
      limitations: 'Os cálculos usam a resolução e a diagonal informadas, assumindo pixels quadrados e geometria plana. Diagonais nominais, curvas, escala do sistema e geometrias de subpixel podem diferir do modelo.',
      faq: [
        ['O que é PPI e por que ele importa?', 'PPI representa a quantidade de pixels lineares por polegada. Densidade maior reduz o tamanho angular dos pixels, mas nitidez percebida também depende de distância, escala, renderização e visão.'],
        ['O que significa a distância de referência?', 'É o ponto geométrico em que um pixel subtende aproximadamente um minuto de arco. Trata-se de uma convenção de cálculo, não de um limite universal de percepção.']
      ],
      methodology: [
        'A densidade de pixels é obtida pela fórmula euclidiana da diagonal em pixels dividida pela diagonal física em polegadas: PPI = sqrt(W² + H²) / D. O dot pitch físico é o inverso métrico exato: 25,4 mm / PPI.',
        'A referência angular usa um minuto de arco e a aproximação Distância (cm) ≈ 8732 / PPI. Acuidade real, contraste, geometria de subpixels e conteúdo podem alterar a percepção.',
        'Escala de interface é uma preferência operacional influenciada por distância, visão, tamanho do painel, sistema e aplicativo; a ferramenta não prescreve um valor universal.'
      ]
    },
    en: {
      intro: 'A geometric calculator for pixel density (PPI), nominal dot pitch and the distance where one pixel subtends about one arcminute.',
      steps: ['Enter horizontal and vertical display resolution or choose a preset.', 'Specify the visible screen diagonal in inches.', 'Compare PPI, dot pitch and the angular reference with your distance, eyesight and scaling preference.'],
      uses: ['Comparing pixel density and nominal pixel size before a purchase.', 'A geometric reference for considering visible pixel structure.', 'Supporting an operating-system interface scaling choice.'],
      limitations: 'Calculations use the entered resolution and diagonal, assuming square pixels and flat geometry. Nominal diagonals, curves, system scaling and subpixel geometry can differ from the model.',
      faq: [
        ['What is PPI and why does it matter?', 'PPI measures linear pixel density. A higher value reduces pixel angular size, while perceived sharpness also depends on distance, scaling, rendering and eyesight.'],
        ['What does the reference distance mean?', 'It is the geometric point where one pixel subtends roughly one arcminute. It is a calculation convention, not a universal perception threshold.']
      ],
      methodology: [
        'Pixel density is derived from the Euclidean diagonal pixel count divided by physical diagonal in inches: PPI = sqrt(W² + H²) / D. Dot pitch is the exact metric reciprocal: 25.4 mm / PPI.',
        'The angular reference uses one arcminute and the approximation Distance (cm) ≈ 8732 / PPI. Actual acuity, contrast, subpixel geometry and content can change perception.',
        'Interface scaling is an operational preference influenced by distance, eyesight, display size, operating system and application; the tool does not prescribe a universal value.'
      ]
    }
  },
  'motion-blur': {
    related: ['monitor-test', 'display-calibration', 'dead-pixel-test'],
    pt: {
      intro: 'Animação em canvas para observar visualmente rastros, desfoque e artefatos de overdrive. A telemetria descreve a cadência dos callbacks do navegador; não mede GtG ou MPRT físicos.',
      steps: ['Selecione a velocidade de deslocamento (recomendado: 480 ou 960 px/s) e o padrão visual desejado (blocos de contraste, texto ou transição escura).', 'Acompanhe visualmente o objeto em movimento da esquerda para a direita mantendo os olhos fixos na linha central de sincronização.', 'Observe se há rastros escuros trailing (ghosting) ou bordas claras brilhantes invertidas (overshoot por overdrive excessivo).'],
      uses: ['Comparação visual de níveis de overdrive no menu OSD.', 'Observação da estabilidade dos callbacks de animação no navegador.', 'Comparação de clareza de movimento entre configurações de taxa de atualização.'],
      limitations: 'O resultado depende do navegador, do sistema e da taxa configurada. A ferramenta não mede tempo de resposta físico, latência total ou MPRT em milissegundos. Essas medições exigem instrumentos e um procedimento controlado.',
      faq: [
        ['Qual a diferença entre GtG e MPRT?', 'GtG descreve transições de pixel sob um procedimento de medição; MPRT descreve persistência percebida sob outro procedimento. Esta animação não mede nenhum dos dois.'],
        ['Como investigar um rastro brilhante?', 'Compare níveis de Response Time ou Overdrive do monitor e escolha o que produzir o melhor equilíbrio no conteúdo real. Os nomes e efeitos variam por modelo.']
      ],
      methodology: [
        'A animação usa `window.requestAnimationFrame`, agendado antes das repinturas do navegador. Sua cadência costuma acompanhar o display, mas pode ser limitada pelo sistema e por abas em segundo plano.',
        'A telemetria observa intervalos de animação para indicar variações de cadência. Ela não elimina engasgos nem confirma a apresentação física de cada quadro.',
        'As faixas de contraste oferecem transições escuras, médias e claras para comparação visual. Elas podem tornar rastros aparentes, mas não identificam sozinhas a tecnologia, a causa ou o tempo de resposta.'
      ]
    },
    en: {
      intro: 'A canvas animation for visually inspecting trails, blur and overdrive artifacts. Telemetry describes browser callback cadence; it does not measure physical GtG or MPRT.',
      steps: ['Select motion speed (recommended: 480 or 960 px/s) and your desired visual pattern (high-contrast blocks, readable text, or dark transition).', 'Track the moving object smoothly from left to right, focusing on the central pursuit synchronization mark.', 'Examine trailing dark shadows (ghosting) or bright inverse halos (overshoot caused by aggressive overdrive).'],
      uses: ['Visually comparing overdrive settings in the monitor OSD.', 'Observing browser animation-callback stability.', 'Comparing motion clarity between configured refresh-rate modes.'],
      limitations: 'Results depend on the browser, operating system and configured refresh rate. The tool does not measure physical response time, total latency or MPRT in milliseconds. Those measurements require instruments and a controlled procedure.',
      faq: [
        ['What is the difference between GtG and MPRT?', 'GtG describes pixel transitions under one measurement procedure; MPRT describes persistence under another. This animation measures neither value.'],
        ['How do I investigate bright halos?', 'Compare the monitor’s Response Time or Overdrive levels and choose the best balance in real content. Names and effects vary by model.']
      ],
      methodology: [
        'The animation uses `window.requestAnimationFrame`, scheduled before browser repaints. Cadence usually follows the display, but system conditions and background tabs may limit it.',
        'Telemetry observes animation intervals to indicate cadence variation. It cannot prevent stuttering or confirm physical presentation of each frame.',
        'Contrast tracks provide dark, mid-tone and bright transitions for visual comparison. They can make trails apparent but cannot identify display technology, cause or response time on their own.'
      ]
    }
  },
  'touch-tester': {
    related: ['dead-pixel-test', 'screen-cleaner'],
    pt: {
      intro: 'Este teste registra eventos de toque entregues pelo navegador em celulares, tablets e monitores interativos. Ele ajuda a observar regiões sem eventos, contatos inesperados e simultaneidade aparente.',
      steps: ['Toque e arraste os dedos por toda a área da tela para pintar as células.', 'Se alguma célula não mudar de cor, você localizou uma possível zona morta no sensor touch.', 'Para testar o limite de multi-toque, posicione vários dedos simultaneamente até que o contador pare de subir.'],
      uses: ['Mapeamento repetível de onde o navegador recebeu contatos.', 'Comparação antes e depois de uma alteração de película, configuração ou reparo.', 'Registro de eventos inesperados com o dispositivo imóvel.', 'Observação do máximo simultâneo exposto nessa sessão.'],
      limitations: 'Depende da API do navegador, do sistema e de gestos reservados. O resultado não mede eletrônica, não identifica a causa e não confirma a capacidade física máxima do digitalizador.',
      faq: [
        ['Por que meu celular de "10 toques" só registra 3 dedos aqui?', 'O sistema, o navegador e gestos globais podem interceptar ou agrupar contatos. O contador mostra apenas os eventos expostos à página naquela tentativa.'],
        ['Este teste diz se minha tela está quebrada?', 'Ele mostra onde o navegador não recebeu contato durante a sessão. Repita o teste e descarte interferências de software, película, umidade ou configuração antes de atribuir o resultado ao hardware.']
      ],
      methodology: [
        'O digitalizador capacitivo é uma fina camada transparente sobreposta ao painel LCD ou OLED. Ele projeta um campo eletrostático que sofre deformação ao ser tocado por um material condutivo.',
        'A API nativa "Touch Events" dos navegadores traduz essas interações de hardware para eventos do DOM (`touchstart`, `touchmove`, `touchend`). O Motor do MonitorSmith rastreia o ciclo de vida individual de cada dedo ativo.',
        'Ausência ou aparecimento inesperado de eventos é apenas um sintoma. Repita em condições diferentes e consulte suporte técnico antes de atribuir uma causa física.'
      ]
    },
    en: {
      intro: 'This test records touch events delivered by the browser on phones, tablets and touch monitors. It helps observe regions without events, unexpected contacts and apparent simultaneity.',
      steps: ['Tap and drag your fingers across the entire screen area to paint the grid cells.', 'If any cell remains unaffected, you have found a potential digitizer dead zone.', 'To test the multi-touch threshold, press multiple fingers simultaneously until the counter stops registering.'],
      uses: ['Repeatably mapping where the browser received contact.', 'Comparing behavior before and after a protector, setting or repair change.', 'Recording unexpected events while the device remains untouched.', 'Observing the maximum simultaneity exposed in this session.'],
      limitations: 'Results depend on browser APIs, the operating system and reserved gestures. They do not measure electronics, identify a cause or confirm the digitizer’s physical maximum.',
      faq: [
        ['Why does my "10-point touch" phone only log 3 fingers here?', 'The operating system, browser and global gestures may intercept or group contacts. The counter only shows events exposed to this page in that attempt.'],
        ['Does this test confirm my screen is broken?', 'No. It shows where the page did or did not receive events. Repeat the test and rule out software, protectors, moisture and settings before seeking hardware service.']
      ],
      methodology: [
        'A capacitive digitizer is a transparent mesh overlay on top of the LCD or OLED panel. It creates an electrostatic field that deforms upon contact with a conductive object.',
        'The native browser Touch Events API translates hardware interactions into DOM events (`touchstart`, `touchmove`, `touchend`). MonitorSmith tracks the individual lifecycle of each active finger.',
        'Missing or unexpected events are symptoms only. Repeat under different conditions and consult technical support before assigning a physical cause.'
      ]
    }
  }
});

const LEGAL_PAGES = Object.freeze([
  {
    slug: 'sobre',
    title: 'Sobre o MonitorSmith e EXVORN.TECH — Engenharia de Displays',
    description: 'Conheça o propósito, arquitetura client-side e as diretrizes de engenharia de displays da suíte MonitorSmith, mantida pela EXVORN.TECH.',
    h1: 'Sobre o MonitorSmith e a EXVORN.TECH',
    sections: [
      ['1. Nossa Missão e Filosofia de Produto', [
        'O MonitorSmith reúne utilitários de referência para inspeção visual de telas, comparação de uniformidade aparente, verificação preliminar de cores e uso de monitores auxiliares.',
        'O MonitorSmith reúne ferramentas executadas no navegador com HTML, Canvas, Web Audio API, High Resolution Time API e Service Workers, sem exigir a instalação de um aplicativo nativo.',
      ]],
      ['2. Processamento local e privacidade', [
        'Entradas das ferramentas, como texto, imagens, temporizadores e síntese de áudio, são processadas no dispositivo do usuário. A execução pode envolver CPU, GPU e APIs do navegador conforme o recurso.',
        'As ferramentas processam texto, imagens e leituras de dispositivos localmente. A hospedagem recebe requisições de acesso, e serviços de publicidade podem receber dados após consentimento, conforme a política de privacidade.',
      ]],
      ['3. Padrões Técnicos e Normas de Referência', [
        'As ferramentas e publicações técnicas do MonitorSmith fundamentam-se em padrões e normas consolidadas da indústria de displays e acústica:',
        '• ISO 9241-307:2008: Métodos de análise ergonômica e limites de tolerância para defeitos de subpixels (pixels mortos, presos e luminosos) em painéis LCD (IPS/VA/TN).',
        '• IEC 61966-2-1: Especificação do espaço de cor sRGB e de sua função de transferência segmentada.',
        '• ITU-R BT.709 e BT.1886: Parâmetros colorimétricos e função de transferência eletro-óptica (Gama 2.4) para produção e exibição de vídeo.',
        '• W3C Web Audio API e WCAG 2.2: referências para áudio no navegador e acessibilidade.',
      ]],
      ['4. Sobre a EXVORN.TECH', [
        'A EXVORN.TECH é um estúdio de engenharia de software e pesquisa tecnológica focado no desenvolvimento de ferramentas web de alto desempenho, plataformas de computação e soluções digitais acessíveis.',
        `Para saber mais sobre os projetos e iniciativas da EXVORN.TECH, visite o site oficial em https://exvorn.tech/.`,
      ]],
    ],
  },
  {
    slug: 'politica-editorial',
    title: 'Política Editorial, Fontes e Correções — MonitorSmith',
    description: 'Como o MonitorSmith escolhe temas, verifica afirmações, informa limites, identifica autoria e corrige seus guias técnicos.',
    h1: 'Política Editorial, Fontes e Correções',
    sections: [
      ['1. Para quem e para que publicamos', [
        'O blog do MonitorSmith atende pessoas que precisam observar uma tela, preparar um ambiente visual ou usar uma ferramenta do site com mais segurança. Cada artigo deve resolver uma tarefa concreta e permanecer dentro do foco do produto: displays, cor, iluminação de apoio, periféricos, áudio funcional e organização do trabalho diante da tela.',
        'Não criamos páginas apenas para cobrir variações de palavras pesquisadas. Quando dois temas levam ao mesmo procedimento e à mesma conclusão, a revisão deve diferenciá-los com escopos claros ou consolidá-los. O título precisa corresponder ao que a página realmente entrega.',
      ]],
      ['2. Autoria e responsabilidade', [
        'Os textos são publicados pela equipe MonitorSmith da EXVORN.TECH, responsável também pela implementação e manutenção das ferramentas. A identificação institucional não representa certificação independente, laboratório acreditado ou vínculo com fabricantes citados.',
        'Cada artigo informa as datas de publicação e de revisão substancial. Alterações apenas visuais ou tipográficas não justificam apresentar o conteúdo como recém-revisado. Dúvidas sobre autoria ou contestar uma afirmação podem ser enviadas para contato@exvorn.tech.',
      ]],
      ['3. Como uma orientação é construída', [
        'A revisão parte do comportamento verificável da ferramenta e descreve preparação, sequência de uso, sinais observáveis, fatores de confusão e próximos passos. Resultados que dependem de brilho físico, colorimetria, eletrônica, firmware ou estado clínico não são inferidos a partir de uma página web.',
        'Sempre que a conclusão depende do produto, o artigo remete ao manual e à política vigente do modelo. Valores digitais solicitados ao navegador, como RGB, duração ou contagem de quadros, são separados de medições físicas que exigem instrumento.',
      ]],
      ['4. Hierarquia de fontes', [
        'Priorizamos especificações dos organismos responsáveis, documentação técnica de APIs, normas e orientações oficiais de fabricantes ou autoridades. Fontes secundárias podem ajudar a explicar contexto, mas não substituem a referência primária quando a afirmação trata de uma regra, interface ou requisito técnico.',
        'As referências visíveis no fim de cada artigo indicam o ponto para o qual foram consultadas. Um link não significa endosso integral do conteúdo externo, e a disponibilidade ou redação da fonte pode mudar depois da revisão.',
      ]],
      ['5. Limites, segurança e independência', [
        'Os guias distinguem observação, estimativa e medição. O MonitorSmith não emite laudos, não decide cobertura de garantia, não promete reparar pixels, não calibra fisicamente um monitor e não substitui avaliação profissional quando ela é necessária.',
        'Publicidade, quando ativada, não compra cobertura editorial nem altera conclusões. Não usamos links de afiliado nos guias atuais. Unidades publicitárias ficam fora das superfícies imersivas, páginas de erro e documentos institucionais.',
      ]],
      ['6. Correções e atualização', [
        'Corrigimos erros factuais, links quebrados e descrições incompatíveis com a ferramenta. Uma revisão substancial atualiza a data do artigo e deve preservar a diferença entre o que foi observado no navegador e o que apenas uma fonte externa sustenta.',
        'Para solicitar uma correção, informe a URL, o trecho, a fonte que contradiz a página e, quando relevante, navegador, sistema e modelo do dispositivo. O canal público é contato@exvorn.tech. Política revisada em 9 de setembro de 2026.',
      ]],
    ],
  },
  {
    slug: 'contato',
    title: 'Contato e Suporte Técnico — MonitorSmith',
    description: 'Entre em contato com a equipe técnica do MonitorSmith e EXVORN.TECH para suporte, feedback, sugestões e parcerias.',
    h1: 'Contato e Suporte Técnico',
    sections: [
      ['1. Canais Oficiais de Atendimento', [
        'Se você tiver dúvidas técnicas sobre o uso das ferramentas, encontrar alguma inconsistência visual em seu monitor ou quiser sugerir novos recursos, estamos à disposição através dos seguintes canais:',
        '• E-mail institucional de suporte: contato@exvorn.tech',
        '• Website institucional da desenvolvedora: https://exvorn.tech/',
      ]],
      ['2. Suporte ao Desenvolvedor e Sugestões', [
        'O MonitorSmith é constantemente aprimorado com base no feedback de engenheiros, editores de vídeo, designers e usuários entusiastas de hardware.',
        'Sugestões de melhorias nas rotinas de calibração, relatórios de compatibilidade com novos tipos de painéis (OLED, QD-OLED, Mini-LED) e requisições de novas funcionalidades podem ser enviadas diretamente pelo e-mail de contato.',
      ]],
      ['3. Liderança Técnica e Redes Profissionais', [
        'Você também pode acompanhar atualizações e conectar-se diretamente com a liderança de desenvolvimento no LinkedIn através de https://www.linkedin.com/in/matheus-peres-da-silva/.',
      ]],
    ],
  },
  {
    slug: 'privacidade',
    title: 'Política de Privacidade — MonitorSmith',
    description: 'Informações sobre dados locais, uso de cookies e conformidade com fornecedores de terceiros e Google AdSense no MonitorSmith.',
    h1: 'Política de Privacidade',
    sections: [
      ['1. Resumo e Operação Local', [
        'O MonitorSmith reúne utilitários e superfícies visuais para monitores desenvolvidos pela EXVORN.TECH. Textos, cores, temporizadores e imagens importadas são processados pelas ferramentas no navegador; o produto não possui um endpoint próprio para armazenar esse conteúdo. Hospedagem e serviços consentidos ainda podem receber requisições de rede.',
        'A operação do site envolve infraestrutura de hospedagem e exibição de publicidade de terceiros. Esta política descreve o tratamento de dados técnicos, cookies e as opções de controle disponíveis.',
      ]],
      ['2. Dados Armazenados no Dispositivo', [
        'O navegador utiliza localStorage para tema, idioma, apresentação inicial e consentimento; Cache Storage e Service Worker guardam arquivos do PWA; e IndexedDB guarda imagens escolhidas no Loop de Marcas para reutilização local.',
        'As imagens do Loop de Marcas permanecem no armazenamento local do navegador até serem removidas na ferramenta ou até os dados do site serem apagados. A aplicação não possui endpoint próprio para receber esses arquivos.',
      ]],
      ['3. Fornecedores de Terceiros e Google AdSense', [
        'Fornecedores de terceiros, incluindo o Google, utilizam cookies para veicular anúncios com base em visitas anteriores dos usuários a este site ou a outros sites na internet.',
        'O uso de cookies de publicidade pelo Google e por seus parceiros permite veicular anúncios para os usuários com base nas visitas feitas ao MonitorSmith e/ou a outros sites na internet.',
        'Para entender detalhadamente como o Google coleta e processa dados ao utilizar sites parceiros, consulte a documentação oficial em https://policies.google.com/technologies/partner-sites.',
      ]],
      ['4. Seus Controles e Desativação de Anúncios', [
        'Os usuários podem optar por desativar a publicidade personalizada acessando as Configurações de Anúncios do Google em https://www.google.com/settings/ads.',
        'Alternativamente, você pode desativar o uso de cookies de publicidade personalizada de terceiros acessando www.aboutads.info ou ajustando os controles de privacidade do seu navegador ou região.',
      ]],
      ['5. Direitos sob a LGPD e Contato', [
        'As ferramentas não exigem cadastro e não enviam seus textos ou imagens a um backend próprio do aplicativo. A hospedagem, o canal de e-mail e serviços de terceiros consentidos podem processar dados técnicos ou informações fornecidas pelo usuário conforme suas próprias finalidades e políticas.',
        `Para esclarecimentos sobre privacidade, solicitações institucionais ou exercício de direitos sob a Lei Geral de Proteção de Dados (LGPD), utilize o canal institucional em ${SITE_METADATA.contactUrl} ou envie e-mail para contato@exvorn.tech.`,
      ]],
      ['6. Atualizações desta Política', [
        `Esta política foi revisada em 9 de setembro de 2026 e reflete a operação atual da plataforma. Alterações materiais serão publicadas nesta mesma URL.`,
      ]],
    ],
  },
  {
    slug: 'termos',
    title: 'Termos de Uso — MonitorSmith',
    description: 'Condições e limitações de uso das ferramentas visuais do MonitorSmith.',
    h1: 'Termos de Uso',
    sections: [
      ['1. Uso do Serviço', ['O MonitorSmith fornece superfícies, padrões visuais e utilitários executados no navegador. O uso é gratuito e voluntário, devendo respeitar a legislação aplicável, os direitos de terceiros e as orientações dos fabricantes de monitores.', 'Não utilize o serviço para disseminar conteúdo ilícito, tentar violar medidas de segurança ou apresentar uma inspeção visual simples como laudo pericial ou certificação técnica formal.']],
      ['2. Limites Técnicos e Operacionais', ['Os padrões visuais oferecem apoio à observação humana. O MonitorSmith não mede diretamente parâmetros elétricos de painéis, não substitui colorímetros de hardware e não garante identificação exata de causas de defeitos.', 'Fatores como gerenciamento de cor do sistema operacional, renderização do navegador, ângulo de visão, iluminação ambiente e brilho influenciam o que é visualizado.']],
      ['3. Ergonomia e Segurança', ['Interrompa o uso imediatamente caso luzes, contrastes ou frequências visuais causem desconforto ou fadiga ocular.', 'Para limpeza física de telas, siga sempre o manual do fabricante do monitor, utilizando panos de microfibra limpos e sem aplicar líquidos diretamente sobre os circuitos ou painel.']],
      ['4. Propriedade Intelectual e Conteúdo', ['A marca MonitorSmith, a identidade visual e o código-fonte pertencem à EXVORN.TECH.', 'O usuário é o único responsável pelas imagens e textos que carregar localmente na aplicação, declarando possuir os direitos necessários para sua exibição.']],
      ['5. Contato e Vigência', [`Revisão vigente desde 9 de setembro de 2026. Para dúvidas e contato institucional, acesse ${SITE_METADATA.contactUrl} ou contato@exvorn.tech.`]],
    ],
  },
  {
    slug: 'cookies',
    title: 'Política de Cookies e Consentimento — MonitorSmith',
    description: 'Quais cookies e armazenamentos locais o MonitorSmith utiliza, como funciona o Consent Mode v2 do Google e como revogar o consentimento de publicidade a qualquer momento.',
    h1: 'Política de Cookies e Consentimento',
    sections: [
      ['1. O que usamos e por quê', [
        'O MonitorSmith usa localStorage para preferências de interface e consentimento, IndexedDB para imagens do Loop de Marcas e Cache Storage com Service Worker para arquivos necessários ao uso posterior.',
        'Nenhum desses recursos essenciais rastreia comportamento, cria identificadores publicitários ou é compartilhado com terceiros. Eles são gravados no seu dispositivo e podem ser apagados a qualquer momento pelas configurações do navegador.',
      ]],
      ['2. Cookies de publicidade (Google AdSense)', [
        'Quando você concede consentimento para publicidade, carregamos o script do Google AdSense, que pode gravar cookies próprios e de parceiros para medir impressões, limitar a frequência de exibição, combater fraude e — se você também autorizar a personalização — selecionar anúncios com base nas suas visitas anteriores a este e a outros sites.',
        'Sem o seu consentimento, o script de publicidade simplesmente não é carregado: nenhuma requisição é feita aos servidores de anúncios. Se você aceitar anúncios mas recusar a personalização, solicitamos explicitamente anúncios não personalizados ao Google.',
        'A lista completa e atualizada de fornecedores e finalidades do Google está em https://policies.google.com/technologies/partner-sites e em https://business.safety.google/adscookies/.',
      ]],
      ['3. Google Consent Mode v2', [
        'O site implementa o Google Consent Mode v2 com todos os sinais negados por padrão. Antes de qualquer interação sua, os parâmetros ad_storage, ad_user_data, ad_personalization e analytics_storage estão definidos como "denied".',
        'Assim que você decide no banner, enviamos uma atualização de consentimento correspondente à sua escolha, e somente então o script de anúncios é injetado na página. Esses controles técnicos permitem registrar a escolha do usuário. Eles não representam certificação jurídica de conformidade.',
      ]],
      ['4. Onde os anúncios podem aparecer', [
        'Por decisão de produto e em atenção às políticas do Google Publisher, unidades de anúncio só podem ser configuradas em páginas com conteúdo editorial próprio, como a página inicial, os guias técnicos e os artigos do blog. Sem um identificador de unidade válido, nenhum espaço publicitário é renderizado.',
        'Nenhum anúncio é exibido sobre as superfícies de teste em tela cheia, sobre padrões de calibração, sobre a tela preta ou em qualquer estado da aplicação sem conteúdo textual. Também não há anúncios intersticiais, pop-ups, camadas que induzem cliques acidentais ou elementos que se sobrepõem aos controles das ferramentas.',
      ]],
      ['5. Como revogar ou alterar o consentimento', [
        'Você pode mudar a sua escolha quando quiser: no rodapé de qualquer página, use o link "Preferências de privacidade" para reabrir o painel de consentimento e ajustar cada categoria separadamente.',
        'Também é possível desativar a personalização diretamente no Google, em https://www.google.com/settings/ads, ou apagar todos os dados locais deste site pelas configurações do seu navegador — nesse caso, o banner de consentimento voltará a aparecer na próxima visita.',
      ]],
      ['6. Vigência e contato', [
        'Esta política de cookies foi revisada em 9 de setembro de 2026. Dúvidas sobre cookies, consentimento ou exercício de direitos podem ser enviadas para contato@exvorn.tech.',
      ]],
    ],
  },
  {
    slug: 'metodologia',
    title: 'Metodologia Técnica e Padrões de Referência — MonitorSmith',
    description: 'Como o MonitorSmith constrói padrões de teste, mede tempo, calcula óptica geométrica e quais normas internacionais servem de base para cada instrumento.',
    h1: 'Metodologia Técnica e Padrões de Referência',
    sections: [
      ['1. Princípio editorial: dizer o que a ferramenta não faz', [
        'Toda ferramenta do MonitorSmith declara o seu limite técnico na própria interface. Um navegador não mede luminância em cd/m², não lê o EDID completo do painel e não substitui colorímetro, sonda de contraste ou laudo laboratorial. Ele solicita padrões digitais, observa eventos e aplica cálculos reproduzíveis dentro das limitações da plataforma.',
        'Essa honestidade é deliberada: uma triagem visual útil depende de o leitor saber exatamente qual conclusão o teste sustenta e qual não sustenta.',
      ]],
      ['2. Renderização dos padrões', [
        'Os padrões são desenhados em canvas ou superfícies CSS com valores digitais definidos. Gerenciamento de cor, composição, GPU, perfil e processamento do painel podem alterar o sinal e a luz efetivamente exibidos.',
        'Animações como o teste de movimento e o exercitador de pixels usam requestAnimationFrame. A API agenda callbacks para a composição do navegador, mas não confirma que cada callback virou um quadro físico no painel.',
      ]],
      ['3. Medição de tempo', [
        'As medições temporais usam `performance.now()`, um relógio monotônico cuja precisão disponível pode ser reduzida pelo navegador por segurança e privacidade. Isso evita saltos causados por ajuste do relógio civil, mas não remove atrasos de agendamento.',
        'A taxa de atualização é obtida contando quadros entregues em uma janela de amostragem e dividindo pelo intervalo decorrido; o jitter é o desvio padrão dos intervalos entre quadros. Nenhum valor é suavizado ou interpolado antes de aparecer na tela.',
      ]],
      ['4. Cálculos ópticos', [
        'As calculadoras aplicam óptica geométrica. A densidade de pixels vem da diagonal em pixels dividida pela diagonal informada; o dot pitch correspondente é o inverso da densidade convertido para milímetros; a referência de distância usa a convenção geométrica de um minuto de arco por pixel.',
        'A estimativa de banda parte da taxa de pixels multiplicada pela profundidade de bits dos três canais e aplica uma margem fixa de 5%. Ela não calcula timings CVT-RB, overhead de codificação, número de lanes ou DSC; compatibilidade deve ser confirmada nos dois dispositivos e no cabo.',
      ]],
      ['5. Normas e especificações de referência', [
        '• ISO 9241-307 — critérios de defeitos de pixels e classes de tolerância de painéis.',
        '• ISO 9241-303 e 9241-3 — requisitos ergonômicos de displays eletrônicos.',
        '• IEC 61966-2-1 — definição do espaço de cor sRGB e de sua função de transferência.',
        '• ITU-R BT.709 e BT.1886 — colorimetria e função de transferência eletro-óptica para vídeo.',
        '• VESA CVT-RB v2, Adaptive-Sync e Display Stream Compression — timings, taxa variável e compressão.',
        '• W3C High Resolution Time, Media Queries Level 4/5, Gamepad, Pointer Events e Web Audio — as APIs que sustentam cada instrumento.',
        '• WCAG 2.2 — referência para contraste, navegação e acessibilidade; sem declaração de certificação integral.',
      ]],
      ['6. Revisão e autoria', [
        'Pesquisa, implementação e revisão técnica são conduzidas pela equipe editorial MonitorSmith da EXVORN.TECH, responsável pelo produto. Correções e contestações técnicas são bem-vindas em contato@exvorn.tech e resultam em atualização datada desta página.',
        'Quando um instrumento depende de comportamento específico de navegador — como a taxa de eventos coalescidos do ponteiro ou a disponibilidade do atuador de vibração —, isso é declarado na página do próprio instrumento.',
      ]],
    ],
  },
  {
    slug: 'aviso-legal',
    title: 'Aviso Legal e Isenção de Responsabilidade — MonitorSmith',
    description: 'Escopo, limites de responsabilidade, relação com fabricantes e natureza informativa do conteúdo publicado no MonitorSmith.',
    h1: 'Aviso Legal e Isenção de Responsabilidade',
    sections: [
      ['1. Natureza informativa do conteúdo', [
        'Todo o conteúdo publicado no MonitorSmith — instrumentos, guias técnicos e artigos — tem finalidade informativa e educacional. Ele apoia a observação e a triagem visual, mas não constitui laudo técnico, perícia, certificação, consultoria profissional ou garantia de resultado.',
        'Decisões de compra, devolução, reparo ou acionamento de garantia são de responsabilidade exclusiva do usuário e devem considerar o manual do fabricante e a legislação aplicável.',
      ]],
      ['2. Limites técnicos', [
        'Os resultados apresentados dependem do navegador, do sistema operacional, do gerenciamento de cor, do cabo, da GPU, da iluminação ambiente e do ângulo de observação. Duas leituras feitas em condições diferentes podem divergir legitimamente.',
        'A EXVORN.TECH não garante que as ferramentas detectem todos os defeitos existentes em um display, periférico ou dispositivo de áudio, nem que a ausência de detecção signifique ausência de defeito.',
      ]],
      ['3. Segurança e ergonomia', [
        'Algumas ferramentas produzem luz intensa, alto contraste, padrões em movimento ou piscadas rápidas. Pessoas com fotossensibilidade, epilepsia fotossensível, migrânea com aura ou sensibilidade visual devem evitar essas superfícies ou reduzir a velocidade e o brilho antes de usar.',
        'O teste de áudio gera tons puros que soam mais altos do que música na mesma configuração de volume. Comece sempre em nível baixo para proteger a audição e o equipamento.',
        'Para limpeza física de telas, siga o manual do fabricante: nunca aplique líquido diretamente no painel nem pressione a superfície.',
      ]],
      ['4. Marcas de terceiros', [
        'Nomes de fabricantes, tecnologias e produtos citados — como OLED, QD-OLED, IPS, FreeSync, G-Sync, HDMI e DisplayPort — pertencem aos seus respectivos titulares e são mencionados apenas em caráter descritivo e informativo.',
        'O MonitorSmith não é afiliado, patrocinado ou endossado por nenhum fabricante de monitores, periféricos ou placas de vídeo.',
      ]],
      ['5. Publicidade e independência editorial', [
        'O site pode ser monetizado por meio do Google AdSense quando unidades de anúncio estiverem ativadas. O conteúdo editorial e os limites técnicos são definidos pela EXVORN.TECH.',
        'Quando exibidas, as unidades são identificadas e reservadas a páginas com conteúdo editorial, fora das superfícies de teste.',
      ]],
      ['6. Limitação de responsabilidade e contato', [
        'Na máxima extensão permitida pela legislação aplicável, a EXVORN.TECH não responde por danos diretos ou indiretos decorrentes do uso ou da impossibilidade de uso das ferramentas e do conteúdo deste site.',
        'Este aviso foi revisado em 9 de setembro de 2026. Contato para questões legais: contato@exvorn.tech.',
      ]],
    ],
  },
  {
    slug: 'acessibilidade',
    title: 'Declaração de Acessibilidade — MonitorSmith',
    description: 'Compromisso de acessibilidade do MonitorSmith, recursos implementados, limitações conhecidas nas ferramentas visuais e canal para relatar barreiras.',
    h1: 'Declaração de Acessibilidade',
    sections: [
      ['1. Compromisso', [
        'O MonitorSmith utiliza WCAG 2.2 como referência de acessibilidade e passa por verificações automatizadas e revisão de fluxos. Essas verificações não equivalem a uma avaliação integral de conformidade AA ou AAA.',
        'A navegação principal e os controles centrais são operáveis por teclado, a preferência prefers-reduced-motion é respeitada e controles recebem rótulos programáticos durante o desenvolvimento e a revisão.',
      ]],
      ['2. Recursos implementados', [
        '• Navegação principal por teclado e foco visível nos controles revisados.',
        '• Esc para sair de instrumentos e atalhos documentados apenas nos fluxos que os implementam.',
        '• Estrutura semântica com marcos de página, hierarquia de títulos consistente e textos alternativos nas imagens informativas.',
        '• Transições de interface reduzidas e teste de movimento iniciado em pausa quando o sistema sinaliza preferência por menos movimento.',
        '• Tema claro e tema escuro. A página inicial, o catálogo e os controles globais têm português, inglês e espanhol; parte dos instrumentos originais permanece em português, como indicado nos guias traduzidos.',
      ]],
      ['3. Limitações conhecidas e inerentes', [
        'Alguns instrumentos são, por natureza, visuais: identificar um pixel preso, avaliar uniformidade de cinza ou julgar banding depende de percepção visual e não pode ser traduzido em texto equivalente. Nesses casos, a página descreve o objetivo, o procedimento e a interpretação do resultado em linguagem clara.',
        'O teste de movimento oferece pausa e seleção de velocidade. O exercitador de pixels permanece bloqueado até a confirmação de um aviso sobre piscadas rápidas e oferece controle de velocidade.',
        'Instrumentos que dependem de hardware específico — controle, microfone, câmera — informam quando a API não está disponível no navegador, em vez de falhar silenciosamente.',
      ]],
      ['4. Tecnologias assistivas testadas', [
        'A validação inclui verificações automatizadas, navegação por teclado e zoom. A cobertura manual com diferentes leitores de tela, navegadores e sistemas ainda precisa ser ampliada; relatos de incompatibilidade são tratados como defeitos.',
      ]],
      ['5. Como relatar uma barreira', [
        'Se você encontrar qualquer barreira de acessibilidade, escreva para contato@exvorn.tech descrevendo a página, o navegador, a tecnologia assistiva usada e o que aconteceu. Respondemos e registramos a correção com data nesta página.',
        'Declaração revisada em 9 de setembro de 2026.',
      ]],
    ],
  },
]);

const ROUTE_BY_KEY = new Map(SEO_PAGE_ROUTES.map((route) => [route.key, route]));

function validateEditorialContent() {
  validateToolsRegistry();
  const errors = [];
  const catalogKeys = new Set(SEO_PAGE_ROUTES.map((route) => route.key));
  const contentKeys = new Set(Object.keys(EDITORIAL_CONTENT));

  for (const route of SEO_PAGE_ROUTES) {
    const content = EDITORIAL_CONTENT[route.key];
    if (!content) {
      errors.push(`Rota sem conteúdo editorial: ${route.key}`);
      continue;
    }
    for (const locale of ['pt', 'en']) {
      const page = content[locale];
      if (!page?.intro || page.steps?.length < 3 || page.uses?.length < 2 || !page.limitations || page.faq?.length < 2 || !page.methodology?.length) {
        errors.push(`Conteúdo incompleto ou sem metodologia técnica: ${route.key}/${locale}`);
      }
    }
    for (const relatedKey of content.related || []) {
      if (!catalogKeys.has(relatedKey)) errors.push(`Relação inexistente: ${route.key} -> ${relatedKey}`);
    }
  }

  for (const key of contentKeys) {
    if (!catalogKeys.has(key)) errors.push(`Conteúdo sem rota no catálogo: ${key}`);
  }

  const articleSlugs = new Set();
  const articleTitles = new Set();
  const substantialParagraphs = new Map();
  for (const article of BLOG_ARTICLES) {
    const label = article.slug || '(sem slug)';
    if (!article.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) errors.push(`Slug de artigo inválido: ${label}`);
    if (articleSlugs.has(article.slug)) errors.push(`Slug de artigo duplicado: ${label}`);
    articleSlugs.add(article.slug);
    if (!article.title || !article.h1 || !article.description || !article.toolId) errors.push(`Metadados incompletos no artigo: ${label}`);
    if (articleTitles.has(article.title)) errors.push(`Título de artigo duplicado: ${article.title}`);
    articleTitles.add(article.title);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(article.publishedAt || '')) errors.push(`publishedAt inválido em ${label}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(article.updatedAt || '')) errors.push(`updatedAt inválido em ${label}`);
    if (article.updatedAt && article.publishedAt && article.updatedAt < article.publishedAt) errors.push(`updatedAt anterior à publicação em ${label}`);
    const wordTarget = BLOG_DOUBLE_WORD_TARGETS[article.slug];
    const articleWords = countWords(article.body);
    if (!wordTarget) errors.push(`Meta editorial ausente em ${label}`);
    else if (articleWords < wordTarget) errors.push(`Corpo editorial insuficiente em ${label}: ${articleWords}/${wordTarget} palavras`);
    if ((article.body.match(/<h2\b/gi) || []).length < 4) errors.push(`Artigo sem seções suficientes: ${label}`);
    if (/\bclass=["'][^"']*\bcta\b/i.test(article.body) || /href=["']\/?\?tool=/i.test(article.body)) errors.push(`CTA promocional duplicada dentro do corpo: ${label}`);
    if (!Array.isArray(article.faq) || article.faq.length < 3) errors.push(`FAQ incompleta em ${label}`);
    if (!Array.isArray(article.relatedSlugs) || article.relatedSlugs.length < 2) errors.push(`Artigos relacionados insuficientes em ${label}`);
    for (const relatedSlug of article.relatedSlugs || []) {
      if (!BLOG_SLUG_SET.has(relatedSlug)) errors.push(`Artigo relacionado inexistente: ${label} -> ${relatedSlug}`);
      if (relatedSlug === article.slug) errors.push(`Artigo relacionado a si mesmo: ${label}`);
    }
    if (!Array.isArray(article.sources) || article.sources.length < 2) errors.push(`Fontes primárias insuficientes em ${label}`);
    const sourceUrls = new Set();
    for (const source of article.sources || []) {
      if (!source?.label || !source?.note || !/^https:\/\//.test(source?.url || '')) errors.push(`Fonte incompleta ou insegura em ${label}`);
      if (sourceUrls.has(source?.url)) errors.push(`Fonte duplicada em ${label}: ${source?.url}`);
      sourceUrls.add(source?.url);
    }

    for (const paragraph of article.body.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi)) {
      const normalized = stripHtml(paragraph[1]).toLocaleLowerCase('pt-BR');
      if (normalized.split(/\s+/u).length < 24) continue;
      const previous = substantialParagraphs.get(normalized);
      if (previous) errors.push(`Parágrafo substancial duplicado entre ${previous} e ${label}`);
      else substantialParagraphs.set(normalized, label);
    }
  }
  for (const slug of Object.keys(BLOG_DOUBLE_WORD_TARGETS)) {
    if (!articleSlugs.has(slug)) errors.push(`Meta editorial sem artigo correspondente: ${slug}`);
  }
  if (errors.length) throw new Error(`Conteúdo de build inválido:\n- ${errors.join('\n- ')}`);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function safeJson(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}

function formatIsoDate(value, locale = 'pt-BR') {
  const date = new Date(`${value}T12:00:00Z`);
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

function stripHtml(value) {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|amp|quot|#39|lt|gt);/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function countWords(value) {
  const text = stripHtml(value);
  return text ? text.split(/\s+/u).length : 0;
}

function headingId(value) {
  return stripHtml(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'secao';
}

function prepareArticleBody(body) {
  const usedIds = new Map();
  const headings = [];
  let html = String(body).replace(/<h(2|3)([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attributes, label) => {
    const existingId = attributes.match(/\bid=["']([^"']+)["']/i)?.[1];
    const baseId = existingId || headingId(label);
    const count = usedIds.get(baseId) || 0;
    usedIds.set(baseId, count + 1);
    const id = count ? `${baseId}-${count + 1}` : baseId;
    if (level === '2') headings.push({ id, label: stripHtml(label) });
    const cleanAttributes = attributes.replace(/\s+id=["'][^"']+["']/i, '');
    return `<h${level}${cleanAttributes} id="${id}">${label}</h${level}>`;
  });
  html = html
    .replace(/<table([^>]*)>/gi, '<div class="table-scroll" role="region" aria-label="Tabela de referência com rolagem horizontal" tabindex="0"><table$1>')
    .replace(/<\/table>/gi, '</table></div>');
  return { html, headings };
}

function renderFooter(locale = 'pt') {
  const isEn = locale === 'en';
  return `<footer><a href="/">${isEn ? 'Home' : 'Início'}</a><a href="/ferramentas/">${isEn ? 'Tool guide index' : 'Guias de ferramentas'}</a><a href="/blog/">Blog</a><a href="/sobre/">${isEn ? 'About' : 'Sobre'}</a><a href="/politica-editorial/">${isEn ? 'Editorial policy' : 'Política editorial'}</a><a href="/contato/">${isEn ? 'Contact' : 'Contato'}</a><a href="/metodologia/">${isEn ? 'Methodology' : 'Metodologia'}</a><a href="/privacidade/">${isEn ? 'Privacy' : 'Privacidade'}</a><a href="/termos/">${isEn ? 'Terms' : 'Termos de uso'}</a><a href="/cookies/">Cookies</a><a href="/aviso-legal/">${isEn ? 'Disclaimer' : 'Aviso legal'}</a><a href="/acessibilidade/">${isEn ? 'Accessibility' : 'Acessibilidade'}</a></footer>`;
}

function renderToolPage(route, locale) {
  const isEn = locale === 'en';
  const metadata = route[locale];
  const content = EDITORIAL_CONTENT[route.key][locale];
  const url = `${BASE_URL}/${metadata.slug}/`;
  const alternateUrl = `${BASE_URL}/${route[isEn ? 'pt' : 'en'].slug}/`;
  const ptUrl = isEn ? alternateUrl : url;
  const enUrl = isEn ? url : alternateUrl;

  const labels = isEn
    ? {
      back: 'All tools',
      open: 'Open tool fullscreen →',
      how: 'How to use',
      when: 'When to use',
      limits: 'Limitations',
      faq: 'Frequently Asked Questions',
      methodology: 'Technical Methodology & Display Science',
      related: 'Related tools',
      privacy: 'Privacy policy',
      terms: 'Terms of use',
      contact: 'Contact',
      interfaceNote: 'Interface and local controls remain in Portuguese.',
    }
    : {
      back: 'Todas as ferramentas',
      open: 'Abrir ferramenta em tela cheia →',
      how: 'Como usar',
      when: 'Quando usar',
      limits: 'Limitações',
      faq: 'Perguntas Frequentes',
      methodology: 'Metodologia Técnica e Ciência dos Painéis',
      related: 'Ferramentas relacionadas',
      privacy: 'Política de privacidade',
      terms: 'Termos de uso',
      contact: 'Contato',
    };

  const related = EDITORIAL_CONTENT[route.key].related
    .map((key) => ROUTE_BY_KEY.get(key))
    .filter(Boolean)
    .map((item) => `<li><a href="/${item[locale].slug}/">${escapeHtml(item[locale].h1)}</a></li>`)
    .join('');

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: metadata.h1,
      description: metadata.description,
      inLanguage: isEn ? 'en-US' : 'pt-BR',
      datePublished: '2026-08-10',
      dateModified: route.lastModified,
      author: { '@type': 'Organization', name: SITE_METADATA.owner, url: 'https://exvorn.tech/' },
      publisher: { '@type': 'Organization', name: SITE_METADATA.owner, url: 'https://exvorn.tech/' },
      mainEntityOfPage: url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: metadata.h1,
      description: metadata.description,
      inLanguage: isEn ? 'en-US' : 'pt-BR',
      step: content.steps.map((stepText, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: `${isEn ? 'Step' : 'Passo'} ${index + 1}`,
        text: stepText,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: metadata.title,
      description: metadata.description,
      url,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      inLanguage: isEn ? 'en-US' : 'pt-BR',
      browserRequirements: 'Requires modern web browser with HTML5 support.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      publisher: { '@type': 'Organization', name: SITE_METADATA.owner, url: 'https://exvorn.tech/' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: content.faq.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'MonitorSmith', item: `${BASE_URL}/` },
        { '@type': 'ListItem', position: 2, name: metadata.h1, item: url },
      ],
    },
  ];

  const html = `<!doctype html>
<html lang="${isEn ? 'en' : 'pt-BR'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>${escapeHtml(metadata.title)} | ${SITE_METADATA.name}</title>
  <meta name="description" content="${escapeHtml(metadata.description)}">
  <meta name="theme-color" content="#030304">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="pt-BR" href="${ptUrl}">
  <link rel="alternate" hreflang="en" href="${enUrl}">
  <link rel="alternate" hreflang="x-default" href="${ptUrl}">
  <link rel="icon" href="/logo.png" type="image/png">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="describedby" href="/llms.txt" type="text/markdown">
  <meta property="og:title" content="${escapeHtml(metadata.title)}">
  <meta property="og:description" content="${escapeHtml(metadata.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="MonitorSmith">
  <meta property="og:locale" content="${isEn ? 'en_US' : 'pt_BR'}">
  <meta property="og:image" content="${BASE_URL}/og-image.jpg">
  <meta property="og:image:secure_url" content="${BASE_URL}/og-image.jpg">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="MonitorSmith — ${escapeHtml(metadata.h1)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(metadata.title)}">
  <meta name="twitter:description" content="${escapeHtml(metadata.description)}">
  <meta name="twitter:image" content="${BASE_URL}/og-image.jpg">
  <meta name="twitter:image:alt" content="MonitorSmith — ${escapeHtml(metadata.h1)}">
  ${CONSENT_HEAD_SCRIPT}
  <script type="application/ld+json">${safeJson(schemas)}</script>
  <style>
    :root{color-scheme:dark;--bg:#030304;--surface:#0a0b0f;--text:#f5f5f5;--muted:#b9bbc4;--line:rgba(255,255,255,.1);--accent:#f59e0b}*{box-sizing:border-box}
    body{margin:0;background:var(--bg);color:var(--text);font:16px/1.7 Outfit,ui-sans-serif,system-ui,-apple-system,sans-serif;padding-bottom:env(safe-area-inset-bottom)}a{color:#fbbf24;text-underline-offset:.2em}
    header,main,footer{width:min(820px,calc(100% - 2rem));margin-inline:auto}
    header{padding:1.1rem 0;display:flex;justify-content:space-between;align-items:center;gap:1rem;border-bottom:1px solid var(--line);flex-wrap:wrap}
    header a{text-decoration:none;font-weight:700;display:inline-flex;align-items:center;min-height:44px;padding:0.4rem 0.6rem;border-radius:0.5rem}
    main{padding:clamp(2rem,6vw,4rem) 0}h1{font-size:clamp(2rem,7vw,3.5rem);line-height:1.04;letter-spacing:-.04em;margin:0 0 1rem}h2{font-size:1.25rem;margin:0 0 .7rem}.intro{font-size:1.1rem;color:var(--muted)}
    .editorial-byline{display:flex;gap:.75rem;align-items:center;font-size:.85rem;color:var(--muted);margin-bottom:1.5rem;padding-bottom:.75rem;border-bottom:1px solid var(--line);flex-wrap:wrap}
    .cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;margin:1rem 0 2rem;padding:.85rem 1.4rem;border-radius:.75rem;background:var(--accent);color:#171006;font-weight:800;text-decoration:none;transition:transform .15s}.cta:hover{transform:scale(1.02)}
    .note{color:var(--muted);font-size:.9rem}
    section{margin:1.25rem 0;padding:1.4rem;background:var(--surface);border:1px solid var(--line);border-radius:1rem}li,p{color:var(--muted)}.faq dt{font-weight:750;margin-top:1rem}.faq dd{color:var(--muted);margin:.25rem 0 0}
    footer{padding:1.5rem 0 3rem;border-top:1px solid var(--line);display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center}
    footer a{display:inline-flex;align-items:center;min-height:44px;padding:0.5rem 0.85rem;border-radius:0.6rem;background:rgba(255,255,255,0.04);border:1px solid var(--line);color:var(--text);text-decoration:none;font-size:0.88rem;transition:background 0.15s, border-color 0.15s}
    footer a:hover{background:rgba(251,191,36,0.12);border-color:var(--accent);color:#fbbf24}
    :focus-visible{outline:3px solid var(--accent);outline-offset:4px}
    @media(max-width:640px){
      header{gap:0.5rem}
      .cta{width:100%;text-align:center}
      section{padding:1.1rem}
      footer a{flex:1 1 calc(50% - 0.5rem);justify-content:center;text-align:center}
    }
    @media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important}}
  </style>
</head>
<body>
  <header><a href="/">MonitorSmith · EXVORN.TECH</a><a href="/">← ${labels.back}</a></header>
  <main>
    <h1>${escapeHtml(metadata.h1)}</h1>
    <div class="editorial-byline">
      <span>${isEn ? 'By' : 'Por'} <strong>${isEn ? 'MonitorSmith editorial team' : 'Equipe editorial MonitorSmith'} · EXVORN.TECH</strong></span>
      <span>•</span>
      <time datetime="${route.lastModified}">${isEn ? `Updated ${formatIsoDate(route.lastModified, 'en-US')}` : `Atualizado em ${formatIsoDate(route.lastModified, 'pt-BR')}`}</time>
      <span>•</span>
      <a href="/politica-editorial/">${isEn ? 'Editorial process' : 'Processo editorial'}</a>
    </div>
    <p class="intro">${escapeHtml(content.intro)}</p>
    <a class="cta" href="/#${encodeURIComponent(route.toolId)}">${labels.open}</a>
    ${labels.interfaceNote ? `<p class="note">${labels.interfaceNote}</p>` : ''}
    <section><h2>${labels.how}</h2><ol>${content.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ol></section>
    <section><h2>${labels.when}</h2><ul>${content.uses.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>
    <section><h2>${labels.limits}</h2><p>${escapeHtml(content.limitations)}</p></section>
    <section><h2>${labels.faq}</h2><dl class="faq">${content.faq.map(([q, a]) => `<dt>${escapeHtml(q)}</dt><dd>${escapeHtml(a)}</dd>`).join('')}</dl></section>
    
    <section>
      <h2>${labels.methodology}</h2>
      ${content.methodology.map((p, idx) => `<p style="${idx > 0 ? 'margin-top: 1rem;' : ''}">${escapeHtml(p)}</p>`).join('')}
    </section>

    <section><h2>${labels.related}</h2><ul>${related}</ul></section>
  </main>
  ${renderFooter(isEn ? 'en' : 'pt')}
${CONSENT_BODY_SCRIPT}
</body>
</html>`;
  return html;
}

function formatLegalParagraph(paragraph) {
  const escaped = escapeHtml(paragraph);
  return escaped.replace(/(https?:\/\/[^\s)]+|www\.[^\s)]+)/g, (url) => {
    const punctuation = url.match(/[.,;:!?]+$/)?.[0] ?? '';
    const cleanUrl = punctuation ? url.slice(0, -punctuation.length) : url;
    const href = cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${cleanUrl}</a>${punctuation}`;
  });
}

function renderLegalPage(page) {
  const url = `${BASE_URL}/${page.slug}/`;
  const schema = { '@context': 'https://schema.org', '@type': 'WebPage', name: page.title, description: page.description, url, inLanguage: 'pt-BR', dateModified: SITE_METADATA.contentLastModified, isPartOf: { '@type': 'WebSite', name: SITE_METADATA.name, url: `${BASE_URL}/` }, publisher: { '@type': 'Organization', name: SITE_METADATA.owner, url: 'https://exvorn.tech/' } };
  const sections = page.sections.map(([heading, paragraphs]) => `<section><h2>${escapeHtml(heading)}</h2>${paragraphs.map((paragraph) => `<p>${formatLegalParagraph(paragraph)}</p>`).join('')}</section>`).join('');
  const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="referrer" content="strict-origin-when-cross-origin"><title>${escapeHtml(page.title)}</title><meta name="description" content="${escapeHtml(page.description)}"><meta name="theme-color" content="#030304"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1"><link rel="canonical" href="${url}"><link rel="alternate" hreflang="pt-BR" href="${url}"><link rel="alternate" hreflang="x-default" href="${url}"><link rel="icon" href="/logo.png" type="image/png"><link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest"><link rel="describedby" href="/llms.txt" type="text/markdown"><meta property="og:title" content="${escapeHtml(page.title)}"><meta property="og:description" content="${escapeHtml(page.description)}"><meta property="og:url" content="${url}"><meta property="og:type" content="website"><meta property="og:site_name" content="MonitorSmith"><meta property="og:locale" content="pt_BR"><meta property="og:image" content="${BASE_URL}/og-image.jpg"><meta property="og:image:secure_url" content="${BASE_URL}/og-image.jpg"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="MonitorSmith — informações legais e de privacidade"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(page.title)}"><meta name="twitter:description" content="${escapeHtml(page.description)}"><meta name="twitter:image" content="${BASE_URL}/og-image.jpg"><meta name="twitter:image:alt" content="MonitorSmith — informações legais e de privacidade">${CONSENT_HEAD_SCRIPT}<script type="application/ld+json">${safeJson(schema)}</script>
<style>:root{color-scheme:dark;--bg:#030304;--surface:#0a0b0f;--text:#f5f5f5;--muted:#b9bbc4;--line:rgba(255,255,255,.1);--accent:#f59e0b}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.7 Outfit,ui-sans-serif,system-ui,-apple-system,sans-serif;padding-bottom:env(safe-area-inset-bottom)}header,main,footer{width:min(760px,calc(100% - 2rem));margin-inline:auto}header{padding:1.2rem 0;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line)}a{color:#fbbf24;text-underline-offset:.2em}header a{color:var(--text);font-weight:750;text-decoration:none;display:inline-flex;align-items:center;min-height:44px;padding:0.4rem 0.6rem;border-radius:0.5rem}main{padding:3rem 0}h1{font-size:clamp(2rem,6vw,3rem);line-height:1.1;letter-spacing:-.035em}h2{font-size:1.2rem;margin:2.2rem 0 .5rem}p{color:var(--muted)}.notice{padding:1rem;background:var(--surface);border:1px solid var(--line);border-radius:.8rem}footer{padding:1.5rem 0 3rem;border-top:1px solid var(--line);display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center}footer a{display:inline-flex;align-items:center;min-height:44px;padding:0.5rem 0.85rem;border-radius:0.6rem;background:rgba(255,255,255,0.04);border:1px solid var(--line);color:var(--text);text-decoration:none;font-size:0.88rem;transition:background 0.15s, border-color 0.15s}footer a:hover{background:rgba(251,191,36,0.12);border-color:var(--accent);color:#fbbf24}:focus-visible{outline:3px solid var(--accent);outline-offset:4px}@media(max-width:640px){footer a{flex:1 1 calc(50% - 0.5rem);justify-content:center;text-align:center}}</style></head>
<body><header><a href="/">MonitorSmith · EXVORN.TECH</a><a href="/ferramentas/">← Diretório de ferramentas</a></header><main><h1>${escapeHtml(page.h1)}</h1><p class="notice">Este documento descreve a operação atual do MonitorSmith. Em caso de dúvida, entre em contato antes de continuar o uso.</p>${sections}</main>${renderFooter('pt')}${CONSENT_BODY_SCRIPT}</body></html>`;
  return html;
}

function renderBlogArticle(article) {
  const pageUrl = `${BASE_URL}/blog/${article.slug}/`;
  const documentTitle = `${article.title} | ${SITE_METADATA.name}`;
  const preparedBody = prepareArticleBody(article.body);
  const editorialWordCount = countWords(article.body);
  const readingMinutes = Math.max(3, Math.ceil(editorialWordCount / 200));
  const publishedAt = article.publishedAt;
  const updatedAt = article.updatedAt;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const relatedHtml = (article.relatedSlugs || []).filter((s) => BLOG_SLUG_SET.has(s)).map((s) => {
    const rel = BLOG_ARTICLES.find((a) => a.slug === s);
    return rel ? `<li><a href="/blog/${rel.slug}/">${escapeHtml(rel.h1)}</a></li>` : '';
  }).join('');
  const tocHtml = preparedBody.headings.length > 2 ? `<nav class="article-toc" aria-label="Sumário do artigo"><h2>Neste guia</h2><ol>${preparedBody.headings.map((heading) => `<li><a href="#${heading.id}">${escapeHtml(heading.label)}</a></li>`).join('')}</ol></nav>` : '';
  const sourcesHtml = `<section class="sources" data-editorial-sources><h2>Fontes consultadas</h2><p>Referências primárias e oficiais usadas para conferir conceitos, interfaces e limites deste guia.</p><ol>${article.sources.map((source) => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a><span>${escapeHtml(source.note)}</span></li>`).join('')}</ol></section>`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    headline: article.h1,
    description: article.description,
    inLanguage: 'pt-BR',
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: { '@type': 'Organization', name: 'Equipe MonitorSmith — EXVORN.TECH', url: `${BASE_URL}/sobre/` },
    publisher: { '@type': 'Organization', name: SITE_METADATA.owner, url: 'https://exvorn.tech/' },
    image: `${BASE_URL}/og-image.jpg`,
    articleSection: article.categoryLabel,
    wordCount: editorialWordCount,
    isAccessibleForFree: true,
    mainEntityOfPage: pageUrl,
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'MonitorSmith', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog/` },
      { '@type': 'ListItem', position: 3, name: article.h1, item: pageUrl },
    ],
  };
  const faqSchema = article.faq?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map(([question, answer]) => ({
      '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  } : null;
  const schemas = [articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])];
  const faqHtml = article.faq?.length ? `<section><h2>Perguntas Frequentes</h2><dl class="faq">${article.faq.map(([q, a]) => `<dt>${escapeHtml(q)}</dt><dd>${escapeHtml(a)}</dd>`).join('')}</dl></section>` : '';
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>${escapeHtml(documentTitle)}</title>
  <meta name="description" content="${escapeHtml(article.description)}">
  <meta name="theme-color" content="#030304">
  <meta name="author" content="Equipe MonitorSmith — EXVORN.TECH">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${pageUrl}">
  <link rel="icon" href="/logo.png" type="image/png">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="describedby" href="/llms.txt" type="text/markdown">
  <meta property="og:title" content="${escapeHtml(documentTitle)}">
  <meta property="og:description" content="${escapeHtml(article.description)}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="MonitorSmith">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:image" content="${BASE_URL}/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="MonitorSmith — ${escapeHtml(article.h1)}">
  <meta property="article:published_time" content="${publishedAt}">
  <meta property="article:modified_time" content="${updatedAt}">
  <meta property="article:section" content="${escapeHtml(article.categoryLabel)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(documentTitle)}">
  <meta name="twitter:description" content="${escapeHtml(article.description)}">
  <meta name="twitter:image" content="${BASE_URL}/og-image.jpg">
  ${CONSENT_HEAD_SCRIPT}
  <script type="application/ld+json">${safeJson(schemas)}</script>
  <style>
    :root{color-scheme:dark;--bg:#030304;--surface:#0a0b0f;--text:#f5f5f5;--muted:#b9bbc4;--line:rgba(255,255,255,.1);--accent:#f59e0b}*{box-sizing:border-box}
    body{margin:0;background:var(--bg);color:var(--text);font:16px/1.7 Outfit,ui-sans-serif,system-ui,-apple-system,sans-serif;padding-bottom:env(safe-area-inset-bottom)}a{color:#fbbf24;text-underline-offset:.2em}
    header,main,footer{width:min(820px,calc(100% - 2rem));margin-inline:auto}
    header{padding:1.1rem 0;display:flex;justify-content:space-between;align-items:center;gap:1rem;border-bottom:1px solid var(--line);flex-wrap:wrap}
    header a{text-decoration:none;font-weight:700;display:inline-flex;align-items:center;min-height:44px;padding:0.4rem 0.6rem;border-radius:0.5rem}
    main{padding:clamp(2rem,6vw,4rem) 0}h1{font-size:clamp(1.8rem,6vw,3rem);line-height:1.1;letter-spacing:-.03em;margin:0 0 1rem}h2{font-size:1.25rem;margin:2rem 0 .7rem;scroll-margin-top:1rem}h3{font-size:1.1rem;margin:1.5rem 0 .5rem;scroll-margin-top:1rem}
    .article-kicker{margin:0 0 .65rem;color:var(--accent);font:700 .72rem/1.4 ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase}.standfirst{font-size:1.12rem;line-height:1.75;color:#d0d2d8;margin:0 0 1.25rem}
    .editorial-byline{display:flex;gap:.75rem;align-items:center;font-size:.85rem;color:var(--muted);margin-bottom:1.5rem;padding-bottom:.75rem;border-bottom:1px solid var(--line);flex-wrap:wrap}
    .cta-group{display:flex;gap:1rem;margin:2.5rem 0;flex-wrap:wrap;justify-content:flex-start}
    .cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0.9rem 1.4rem;border-radius:.85rem;background:var(--accent);color:#171006;font-weight:800;text-decoration:none;transition:transform .15s, box-shadow .15s}.cta:hover{transform:scale(1.03);box-shadow:0 0 15px rgba(245,158,11,0.4)}
    .cta.secondary{background:var(--surface);color:var(--text);border:1px solid var(--line)}.cta.secondary:hover{border-color:var(--accent);box-shadow:0 0 15px rgba(255,255,255,0.05)}
    .blog-body p{color:var(--muted);margin:1rem 0}.blog-body h2{color:var(--text)}.blog-body h3{color:var(--text)}.blog-body ul,.blog-body ol{color:var(--muted);padding-left:1.5rem}.blog-body li{margin:.4rem 0}
    .blog-body .table-scroll{width:100%;max-width:100%;overflow-x:auto;margin:1.5rem 0;border-radius:.4rem}.blog-body table{width:100%;min-width:36rem;border-collapse:collapse;margin:0}.blog-body th,.blog-body td{padding:.75rem;text-align:left;border:1px solid var(--line);vertical-align:top}.blog-body th{color:var(--text);background:rgba(255,255,255,.04)}
    .blog-body pre,.blog-body code{max-width:100%;overflow-x:auto}
    .article-toc{margin:1.5rem 0;padding:1.25rem 1.4rem;background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.24);border-radius:1rem}.article-toc h2{margin:0 0 .65rem;font-size:1rem}.article-toc ol{margin:0;padding-left:1.25rem}.article-toc li{margin:.35rem 0}.article-toc a{color:#f5d28d}
    .sources li{margin:1rem 0}.sources a{font-weight:700}.sources span{display:block;margin-top:.2rem;color:var(--muted);font-size:.92rem}
    section{margin:1.5rem 0;padding:1.4rem;background:var(--surface);border:1px solid var(--line);border-radius:1rem}li,p{color:var(--muted)}.faq dt{font-weight:750;margin-top:1rem;color:var(--text)}.faq dd{color:var(--muted);margin:.25rem 0 0}
    .related-grid{display:grid;gap:.75rem}.related-grid a{display:block;padding:1rem;background:var(--surface);border:1px solid var(--line);border-radius:.75rem;text-decoration:none;transition:border-color .2s;min-height:44px}.related-grid a:hover{border-color:var(--accent)}
    footer{padding:1.5rem 0 3rem;border-top:1px solid var(--line);display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center}
    footer a{display:inline-flex;align-items:center;min-height:44px;padding:0.5rem 0.85rem;border-radius:0.6rem;background:rgba(255,255,255,0.04);border:1px solid var(--line);color:var(--text);text-decoration:none;font-size:0.88rem;transition:background 0.15s, border-color 0.15s}
    footer a:hover{background:rgba(251,191,36,0.12);border-color:var(--accent);color:#fbbf24}
    :focus-visible{outline:3px solid var(--accent);outline-offset:4px}
    @media(max-width:640px){
      header{gap:0.5rem}
      .cta-group{flex-direction:column;gap:0.75rem;width:100%}
      .cta,.cta.secondary{width:100%;text-align:center;justify-content:center}
      section{padding:1.1rem}
      footer a{flex:1 1 calc(50% - 0.5rem);justify-content:center;text-align:center}
    }
    @media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important}}
  </style>
</head>
<body>
  <header><a href="/">MonitorSmith · EXVORN.TECH</a><a href="/blog/">← Índice do blog</a></header>
  <main>
    <p class="article-kicker">${escapeHtml(article.categoryLabel)}</p>
    <h1>${escapeHtml(article.h1)}</h1>
    <p class="standfirst">${escapeHtml(article.description)}</p>
    <div class="editorial-byline">
      <span>Por <strong>Equipe editorial MonitorSmith · EXVORN.TECH</strong></span>
      <span>•</span>
      <span>Publicado em <time datetime="${publishedAt}">${formatIsoDate(publishedAt, 'pt-BR')}</time></span>
      <span>•</span>
      <span>Revisado em <time datetime="${updatedAt}">${formatIsoDate(updatedAt, 'pt-BR')}</time></span>
      <span>•</span>
      <span>${readingMinutes} min de leitura</span>
      <span>•</span>
      <a href="/politica-editorial/">Como revisamos</a>
    </div>
    ${tocHtml}
    <article class="blog-body" data-blog-article>${preparedBody.html}</article>
    ${faqHtml}
    ${sourcesHtml}
    ${relatedHtml ? `<section><h2>Continue pelo tema</h2><div class="related-grid"><ul>${relatedHtml}</ul></div></section>` : ''}
    <div class="cta-group">
      <a class="cta" href="/#${encodeURIComponent(article.toolId)}">Abrir a ferramenta relacionada →</a>
    </div>
  </main>
  ${renderFooter('pt')}
${CONSENT_BODY_SCRIPT}
</body>
</html>`;
}

function renderBlogIndex() {
  const pageUrl = `${BASE_URL}/blog/`;
  const documentTitle = `Blog — Guias e Artigos sobre Monitores | ${SITE_METADATA.name}`;
  const description = 'Artigos técnicos, engenharia de displays e guias práticos sobre monitores, calibração de cor, painéis OLED/IPS, ergonomia e produtividade.';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: documentTitle,
    description,
    url: pageUrl,
    inLanguage: 'pt-BR',
    dateModified: BLOG_LAST_MODIFIED,
    isPartOf: { '@type': 'WebSite', name: SITE_METADATA.name, url: `${BASE_URL}/` },
    publisher: { '@type': 'Organization', name: SITE_METADATA.owner, url: 'https://exvorn.tech/' },
    hasPart: BLOG_ARTICLES.map((article) => ({ '@type': 'Article', name: article.h1, url: `${BASE_URL}/blog/${article.slug}/` })),
  };
  const categoryNav = BLOG_CATEGORIES.map((category) => `<a href="#${category.id}">${escapeHtml(category.label)}</a>`).join('');
  const categorySections = BLOG_CATEGORIES.map((category) => {
    const cards = BLOG_ARTICLES.filter((article) => article.categoryId === category.id).map((article) => {
      const readingMinutes = Math.max(3, Math.ceil(countWords(article.body) / 200));
      return `<article class="card"><div class="card-meta"><span>${readingMinutes} min</span><time datetime="${article.updatedAt}">revisto ${escapeHtml(formatIsoDate(article.updatedAt, 'pt-BR'))}</time></div><h3><a href="/blog/${article.slug}/">${escapeHtml(article.h1)}</a></h3><p>${escapeHtml(article.description)}</p></article>`;
    }).join('');
    return `<section class="category" id="${category.id}" aria-labelledby="${category.id}-title"><div class="category-head"><p class="eyebrow">Trilha editorial</p><h2 id="${category.id}-title">${escapeHtml(category.label)}</h2><p>${escapeHtml(category.description)}</p></div><div class="grid">${cards}</div></section>`;
  }).join('');
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>${escapeHtml(documentTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="#030304">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${pageUrl}">
  <link rel="icon" href="/logo.png" type="image/png">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="describedby" href="/llms.txt" type="text/markdown">
  <meta property="og:title" content="${escapeHtml(documentTitle)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="MonitorSmith">
  <meta property="og:image" content="${BASE_URL}/og-image.jpg">
  ${CONSENT_HEAD_SCRIPT}
  <script type="application/ld+json">${safeJson(schema)}</script>
  <style>
    :root{color-scheme:dark;--bg:#030304;--surface:#0a0b0f;--text:#f5f5f5;--muted:#b9bbc4;--line:rgba(255,255,255,.1);--accent:#f59e0b}*{box-sizing:border-box}
    body{margin:0;background:var(--bg);color:var(--text);font:16px/1.7 Outfit,ui-sans-serif,system-ui,-apple-system,sans-serif;padding-bottom:env(safe-area-inset-bottom)}a{color:#fbbf24;text-underline-offset:.2em}
    header,main,footer{width:min(960px,calc(100% - 2rem));margin-inline:auto}
    header{padding:1.1rem 0;display:flex;justify-content:space-between;align-items:center;gap:1rem;border-bottom:1px solid var(--line);flex-wrap:wrap}
    header a{text-decoration:none;font-weight:700;display:inline-flex;align-items:center;min-height:44px;padding:0.4rem 0.6rem;border-radius:0.5rem}
    main{padding:clamp(2rem,6vw,4rem) 0}h1{font-size:clamp(2rem,7vw,3.5rem);line-height:1.04;letter-spacing:-.04em;margin:0 0 .5rem}.subtitle{color:var(--muted);font-size:1.1rem;margin:0 0 1rem;max-width:70ch}
    .editorial-intro{margin:1.5rem 0;padding:1.25rem 1.4rem;background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.24);border-radius:1rem}.editorial-intro p{margin:.3rem 0;color:var(--muted)}.trail-nav{display:flex;gap:.65rem;flex-wrap:wrap;margin:1rem 0 2.5rem}.trail-nav a{display:inline-flex;align-items:center;min-height:44px;padding:.55rem .85rem;border:1px solid var(--line);border-radius:999px;text-decoration:none;color:var(--text)}
    .category{margin:3rem 0;scroll-margin-top:1rem}.category-head{max-width:70ch;margin-bottom:1.2rem}.category-head h2{font-size:clamp(1.5rem,4vw,2rem);margin:.2rem 0}.category-head p{color:var(--muted)}.eyebrow{color:var(--accent)!important;font:700 .68rem/1.4 ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase}
    .grid{display:grid;gap:1.25rem;grid-template-columns:repeat(auto-fill,minmax(280px,1fr))}
    .card{display:flex;flex-direction:column;padding:1.5rem;background:var(--surface);border:1px solid var(--line);border-radius:1.25rem;transition:border-color .2s,transform .15s,box-shadow .2s;min-height:190px}.card:hover{border-color:var(--accent);transform:translateY(-3px);box-shadow:0 10px 30px rgba(0,0,0,0.4)}
    .card h3{font-size:1.15rem;line-height:1.35;margin:.55rem 0 .75rem}.card h3 a{color:var(--text);text-decoration:none}.card p{font-size:.95rem;color:var(--muted);margin:0;line-height:1.6}.card-meta{display:flex;justify-content:space-between;gap:.75rem;color:#8e949d;font-size:.75rem}.card-meta time{text-align:right}
    footer{padding:1.5rem 0 3rem;border-top:1px solid var(--line);display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center}
    footer a{display:inline-flex;align-items:center;min-height:44px;padding:0.5rem 0.85rem;border-radius:0.6rem;background:rgba(255,255,255,0.04);border:1px solid var(--line);color:var(--text);text-decoration:none;font-size:0.88rem;transition:background 0.15s, border-color 0.15s}
    footer a:hover{background:rgba(251,191,36,0.12);border-color:var(--accent);color:#fbbf24}
    :focus-visible{outline:3px solid var(--accent);outline-offset:4px}
    @media(max-width:640px){
      header{gap:0.5rem}
      .grid{grid-template-columns:1fr}
      .card{padding:1.2rem}
      footer a{flex:1 1 calc(50% - 0.5rem);justify-content:center;text-align:center}
    }
  </style>
</head>
<body>
  <header><a href="/">MonitorSmith · EXVORN.TECH</a><a href="/ferramentas/">Diretório de ferramentas</a></header>
  <main>
    <h1>Blog</h1>
    <p class="subtitle">Guias revisados para observar telas, interpretar resultados, preparar ambientes visuais e usar cada instrumento com limites claros.</p>
    <aside class="editorial-intro" aria-label="Compromisso editorial">
      <p><strong>O que você encontra aqui:</strong> procedimentos reproduzíveis, fatores que confundem a observação, fontes consultadas e uma seção explícita sobre o que cada teste não comprova.</p>
      <p>Conteúdo por Equipe MonitorSmith · EXVORN.TECH. <a href="/politica-editorial/">Leia como pesquisamos, revisamos e corrigimos os guias.</a></p>
    </aside>
    <nav class="trail-nav" aria-label="Trilhas do blog">${categoryNav}</nav>
    ${categorySections}
  </main>
  ${renderFooter('pt')}
${CONSENT_BODY_SCRIPT}
</body>
</html>`;
}

function renderToolsIndex() {
  const pageUrl = `${BASE_URL}/ferramentas/`;
  const description = `Diretório dos ${SEO_PAGE_ROUTES.length * 2} guias de ferramentas do MonitorSmith, com versões em português e inglês, procedimentos de uso e limites técnicos.`;
  const categoryByTool = new Map(TOOLS_REGISTRY.map((tool) => [tool.id, tool.category]));
  const categorySections = TOOL_CATEGORIES.map((category, categoryIndex) => {
    const routes = SEO_PAGE_ROUTES.filter((route) => categoryByTool.get(route.toolId) === category);
    if (!routes.length) return '';
    const categoryId = `categoria-${categoryIndex + 1}`;
    const cards = routes.map((route) => `<article class="tool-card"><p class="tool-id">${escapeHtml(route.toolId)}</p><h3><a href="/${route.pt.slug}/">${escapeHtml(route.pt.h1)}</a></h3><p>${escapeHtml(route.pt.description)}</p><div class="tool-links"><a href="/${route.pt.slug}/" hreflang="pt-BR">Guia em português</a><a href="/${route.en.slug}/" lang="en" hreflang="en">English guide</a></div></article>`).join('');
    return `<section id="${categoryId}" class="tool-category"><h2>${escapeHtml(category)}</h2><div class="tool-grid">${cards}</div></section>`;
  }).join('');
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Diretório de ferramentas do MonitorSmith',
    description,
    url: pageUrl,
    inLanguage: 'pt-BR',
    dateModified: SITE_METADATA.contentLastModified,
    isPartOf: { '@type': 'WebSite', name: SITE_METADATA.name, url: `${BASE_URL}/` },
    hasPart: SEO_PAGE_ROUTES.flatMap((route) => [
      { '@type': 'TechArticle', name: route.pt.h1, url: `${BASE_URL}/${route.pt.slug}/`, inLanguage: 'pt-BR' },
      { '@type': 'TechArticle', name: route.en.h1, url: `${BASE_URL}/${route.en.slug}/`, inLanguage: 'en' },
    ]),
  };
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>Ferramentas e Guias de Uso | MonitorSmith</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
  <meta name="theme-color" content="#030304">
  <link rel="canonical" href="${pageUrl}">
  <link rel="icon" href="/logo.png" type="image/png">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.webmanifest">
  <meta property="og:title" content="Ferramentas e Guias de Uso | MonitorSmith">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="MonitorSmith">
  <meta property="og:image" content="${BASE_URL}/og-image.jpg">
  ${CONSENT_HEAD_SCRIPT}
  <script type="application/ld+json">${safeJson(schema)}</script>
  <style>
    :root{color-scheme:dark;--bg:#030304;--surface:#0a0b0f;--text:#f5f5f5;--muted:#b9bbc4;--line:rgba(255,255,255,.1);--accent:#f59e0b}*{box-sizing:border-box}
    body{margin:0;background:var(--bg);color:var(--text);font:16px/1.7 Outfit,ui-sans-serif,system-ui,-apple-system,sans-serif;padding-bottom:env(safe-area-inset-bottom)}a{color:#fbbf24;text-underline-offset:.2em}header,main,footer{width:min(1080px,calc(100% - 2rem));margin-inline:auto}
    header{padding:1.1rem 0;display:flex;justify-content:space-between;align-items:center;gap:1rem;border-bottom:1px solid var(--line);flex-wrap:wrap}header a{text-decoration:none;font-weight:700;min-height:44px;display:inline-flex;align-items:center;padding:.4rem .6rem}
    main{padding:clamp(2rem,6vw,4rem) 0}h1{font-size:clamp(2rem,7vw,3.6rem);line-height:1.05;letter-spacing:-.04em;margin:0 0 1rem}.lead{max-width:72ch;color:var(--muted);font-size:1.1rem}.how{margin:2rem 0;padding:1.3rem 1.5rem;border:1px solid rgba(245,158,11,.25);background:rgba(245,158,11,.06);border-radius:1rem}.how h2{margin:0 0 .5rem;font-size:1.15rem}.how p{margin:.4rem 0;color:var(--muted)}
    .tool-category{margin:3rem 0;scroll-margin-top:1rem}.tool-category>h2{font-size:clamp(1.45rem,4vw,2rem);margin:0 0 1rem}.tool-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:1rem}.tool-card{display:flex;flex-direction:column;padding:1.35rem;background:var(--surface);border:1px solid var(--line);border-radius:1rem}.tool-card h3{font-size:1.1rem;line-height:1.35;margin:.25rem 0 .65rem}.tool-card h3 a{color:var(--text);text-decoration:none}.tool-card p{color:var(--muted);margin:0}.tool-id{color:var(--accent)!important;font:700 .66rem/1.4 ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase}.tool-links{display:flex;gap:.7rem;flex-wrap:wrap;margin-top:auto;padding-top:1rem}.tool-links a{display:inline-flex;align-items:center;min-height:44px}
    footer{padding:1.5rem 0 3rem;border-top:1px solid var(--line);display:flex;gap:.75rem;flex-wrap:wrap}footer a{display:inline-flex;align-items:center;min-height:44px;padding:.5rem .85rem;border:1px solid var(--line);border-radius:.6rem;color:var(--text);text-decoration:none}:focus-visible{outline:3px solid var(--accent);outline-offset:4px}@media(max-width:640px){.tool-grid{grid-template-columns:1fr}footer a{flex:1 1 calc(50% - .5rem);justify-content:center;text-align:center}}
  </style>
</head>
<body>
  <header><a href="/">MonitorSmith · EXVORN.TECH</a><a href="/blog/">Blog e guias editoriais</a></header>
  <main>
    <h1>Ferramentas e guias de uso</h1>
    <p class="lead">Escolha uma tarefa e leia o procedimento antes de abrir o instrumento. Cada guia explica o que a página solicita ao navegador, como repetir a observação e quais conclusões exigem equipamento ou avaliação externa.</p>
    <aside class="how" aria-label="Como usar este diretório"><h2>Como escolher</h2><p>Os guias em português levam à mesma aplicação interativa. As versões em inglês têm conteúdo equivalente e informam quando a interface permanece em português.</p><p>Para artigos de contexto, comparações e checklists mais longos, visite o <a href="/blog/">blog organizado por trilhas</a>. Para fórmulas e limites comuns, consulte a <a href="/metodologia/">metodologia técnica</a>.</p></aside>
    ${categorySections}
  </main>
  ${renderFooter('pt')}
${CONSENT_BODY_SCRIPT}
</body>
</html>`;
}

function renderLegacyRedirect(sourcePath, targetPath) {
  const isEnglish = sourcePath.startsWith('/en/');
  const targetUrl = `${BASE_URL}${targetPath}`;
  const title = isEnglish ? 'Page moved | MonitorSmith' : 'Página movida | MonitorSmith';
  const heading = isEnglish ? 'This page has moved' : 'Esta página mudou de endereço';
  const message = isEnglish
    ? 'The guide now has a permanent canonical address. You will be taken directly to the current page.'
    : 'O guia foi consolidado em um endereço canônico permanente. Você será levado diretamente à página atual.';
  const linkLabel = isEnglish ? 'Continue to the current guide' : 'Continuar para o guia atual';
  return `<!doctype html>
<html lang="${isEnglish ? 'en' : 'pt-BR'}" data-legacy-redirect>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>${title}</title>
  <meta name="description" content="${message}">
  <meta name="robots" content="noindex,follow">
  <link rel="canonical" href="${targetUrl}">
  <meta http-equiv="refresh" content="0;url=${targetPath}">
  <link rel="icon" href="/logo.png" type="image/png">
  <style>:root{color-scheme:dark}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#030304;color:#f5f5f5;font:16px/1.7 system-ui,sans-serif}main{width:min(620px,calc(100% - 2rem));padding:3rem;text-align:center;background:#0a0b0f;border:1px solid rgba(255,255,255,.12);border-radius:1rem}p{color:#b9bbc4}a{display:inline-flex;min-height:44px;align-items:center;color:#fbbf24;font-weight:700}</style>
  <script>window.location.replace(${safeJson(targetPath)});</script>
</head>
<body><main><h1>${heading}</h1><p>${message}</p><a href="${targetPath}">${linkLabel} →</a></main></body>
</html>`;
}

function generateSitemapXml() {
  const urls = [];
  urls.push({ loc: `${BASE_URL}/`, lastmod: SITE_METADATA.contentLastModified, changefreq: 'weekly', priority: '1.0' });
  urls.push({ loc: `${BASE_URL}/blog/`, lastmod: BLOG_LAST_MODIFIED, changefreq: 'weekly', priority: '0.9' });
  urls.push({ loc: `${BASE_URL}/ferramentas/`, lastmod: SITE_METADATA.contentLastModified, changefreq: 'weekly', priority: '0.9' });

  for (const page of LEGAL_PAGES) {
    urls.push({ loc: `${BASE_URL}/${page.slug}/`, lastmod: SITE_METADATA.contentLastModified, changefreq: 'monthly', priority: '0.5' });
  }

  for (const route of SEO_PAGE_ROUTES) {
    for (const locale of ['pt', 'en']) {
      const priority = locale === 'pt' ? '0.8' : '0.7';
      urls.push({ loc: `${BASE_URL}/${route[locale].slug}/`, lastmod: route.lastModified, changefreq: 'weekly', priority });
    }
  }

  for (const article of BLOG_ARTICLES) {
    urls.push({ loc: `${BASE_URL}/blog/${article.slug}/`, lastmod: article.updatedAt, changefreq: 'monthly', priority: '0.7' });
  }

  const entries = urls
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function generateRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
}

function generateLlmsText() {
  const tools = TOOL_CATEGORIES.map((category) => `## ${category}\n${TOOLS_REGISTRY
    .filter((tool) => tool.category === category)
    .map((tool) => `- [${tool.title}](${BASE_URL}${tool.seoPages?.[0] ? `/${tool.seoPages[0].pt.slug}/` : `/#${tool.id}`}): ${tool.description}`)
    .join('\n')}`).join('\n\n');
  return `# MonitorSmith

> Suíte de utilitários web para inspeção visual de displays, iluminação e produtividade, por EXVORN.TECH.

${tools}

## Artigos e Guias Técnicos
- [Diretório de ferramentas](https://monitorsmith.app/ferramentas/): Todos os guias de uso em português e inglês.
- [Blog do MonitorSmith](https://monitorsmith.app/blog/): Artigos sobre tecnologia de displays, calibração e produtividade.

## Informações Institucionais e Legais
- [Sobre o MonitorSmith](https://monitorsmith.app/sobre/): Propósito, arquitetura client-side e padrões de engenharia de displays da EXVORN.TECH.
- [Política Editorial](https://monitorsmith.app/politica-editorial/): Autoria, seleção de fontes, revisão, limites e correções.
- [Contato e Suporte](https://monitorsmith.app/contato/): Canais oficiais de atendimento, dúvidas técnicas e feedback.
- [Política de Privacidade](https://monitorsmith.app/privacidade/): Tratamento de dados locais, cookies e diretrizes Google AdSense.
- [Termos de Uso](https://monitorsmith.app/termos/): Condições de uso e propriedade intelectual.

## Optional
- [Documentação Completa para LLMs](https://monitorsmith.app/llms-full.txt): Índice detalhado com URLs e descrições completas.
`;
}

function generateLlmsFullText() {
  const toolLines = SEO_PAGE_ROUTES.map(
    (r) => `- [${r.pt.h1}](https://monitorsmith.app/${r.pt.slug}/): ${r.pt.description}\n- [${r.en.h1}](https://monitorsmith.app/${r.en.slug}/): ${r.en.description}`,
  ).join('\n');

  const blogLines = BLOG_ARTICLES.map(
    (a) => `- [${a.h1}](https://monitorsmith.app/blog/${a.slug}/): ${a.description}`,
  ).join('\n');

  return `# MonitorSmith — Documentação Completa (llms-full.txt)

> Suíte de utilitários web para inspeção visual de displays, iluminação e produtividade, por EXVORN.TECH.

## Ferramentas Disponíveis
${toolLines}

## Artigos e Guias do Blog
${blogLines}

## Institucional e Legal
- [Sobre o MonitorSmith](https://monitorsmith.app/sobre/): Propósito, arquitetura client-side e padrões de engenharia de displays.
- [Política Editorial](https://monitorsmith.app/politica-editorial/): Autoria, seleção de fontes, revisão, limites e correções.
- [Contato e Suporte](https://monitorsmith.app/contato/): Canais oficiais de atendimento, dúvidas técnicas e feedback.
- [Política de Privacidade](https://monitorsmith.app/privacidade/): Tratamento de dados locais, cookies e diretrizes Google AdSense.
- [Termos de Uso](https://monitorsmith.app/termos/): Condições de uso e propriedade intelectual.
`;
}

function render404Page() {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>Página Não Encontrada (404) | ${SITE_METADATA.name}</title>
  <meta name="description" content="A página solicitada não foi encontrada no MonitorSmith. Explore nossas ferramentas de teste de monitor, guias e blog.">
  <meta name="theme-color" content="#030304">
  <meta name="robots" content="noindex, follow">
  <link rel="icon" href="/logo.png" type="image/png">
  <style>
    :root{color-scheme:dark;--bg:#030304;--surface:#0a0b0f;--text:#f5f5f5;--muted:#b9bbc4;--line:rgba(255,255,255,.1);--accent:#f59e0b}*{box-sizing:border-box}
    body{margin:0;background:var(--bg);color:var(--text);font:16px/1.7 Outfit,ui-sans-serif,system-ui,-apple-system,sans-serif;display:flex;flex-direction:column;min-height:100vh;padding-bottom:env(safe-area-inset-bottom)}
    main{flex:1;width:min(680px,calc(100% - 2rem));margin:auto;padding:4rem 0;text-align:center}
    h1{font-size:clamp(3rem,8vw,5rem);line-height:1;margin:0 0 1rem;color:var(--accent);font-family:monospace}
    h2{font-size:1.5rem;margin:0 0 1rem}
    p{color:var(--muted);margin:0 0 2rem}
    .links{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
    .cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:.85rem 1.4rem;border-radius:.75rem;background:var(--accent);color:#171006;font-weight:800;text-decoration:none;transition:transform .15s}
    .cta:hover{transform:scale(1.03)}
    .cta.secondary{background:var(--surface);color:var(--text);border:1px solid var(--line)}
    footer{padding:2rem 0;border-top:1px solid var(--line);text-align:center;font-size:.85rem;color:var(--muted)}
    @media(max-width:640px){.links{flex-direction:column;gap:0.75rem}.cta,.cta.secondary{width:100%}}
    @media(prefers-reduced-motion:reduce){.cta{transition:none}.cta:hover{transform:none}}
  </style>
</head>
<body>
  <main>
    <h1>404</h1>
    <h2>Página Não Encontrada</h2>
    <p>O link que você acessou pode ter sido movido ou não existe. Explore nossas ferramentas e guias de display abaixo:</p>
    <div class="links">
      <a class="cta" href="/">Todas as Ferramentas →</a>
      <a class="cta secondary" href="/blog/">Acessar o Blog 📚</a>
      <a class="cta secondary" href="/sobre/">Sobre Nós</a>
    </div>
  </main>
  <footer>
    <p>© 2026 MonitorSmith · <a href="https://exvorn.tech/" style="color:#fbbf24">EXVORN.TECH</a></p>
  </footer>
</body>
</html>`;
}

async function main() {
  validateEditorialContent();

  const generatedFiles = [];

  for (const route of SEO_PAGE_ROUTES) {
    for (const locale of ['pt', 'en']) {
      const pageMetadata = route[locale];
      const pageDir = path.join(DIST_DIR, pageMetadata.slug);
      await fs.mkdir(pageDir, { recursive: true });
      const html = renderToolPage(route, locale);
      await fs.writeFile(path.join(pageDir, 'index.html'), html, 'utf8');
      generatedFiles.push(`/${pageMetadata.slug}/`);
    }
  }

  for (const page of LEGAL_PAGES) {
    const pageDir = path.join(DIST_DIR, page.slug);
    await fs.mkdir(pageDir, { recursive: true });
    const html = renderLegalPage(page);
    await fs.writeFile(path.join(pageDir, 'index.html'), html, 'utf8');
    generatedFiles.push(`/${page.slug}/`);
  }

  const blogDir = path.join(DIST_DIR, 'blog');
  await fs.mkdir(blogDir, { recursive: true });
  await fs.writeFile(path.join(blogDir, 'index.html'), renderBlogIndex(), 'utf8');
  generatedFiles.push('/blog/');

  const toolsDir = path.join(DIST_DIR, 'ferramentas');
  await fs.mkdir(toolsDir, { recursive: true });
  await fs.writeFile(path.join(toolsDir, 'index.html'), renderToolsIndex(), 'utf8');
  generatedFiles.push('/ferramentas/');

  for (const article of BLOG_ARTICLES) {
    const articleDir = path.join(blogDir, article.slug);
    await fs.mkdir(articleDir, { recursive: true });
    const html = renderBlogArticle(article);
    await fs.writeFile(path.join(articleDir, 'index.html'), html, 'utf8');
    generatedFiles.push(`/blog/${article.slug}/`);
  }

  for (const [sourcePath, targetPath] of LEGACY_REDIRECTS) {
    const sourceDir = path.join(DIST_DIR, ...sourcePath.split('/').filter(Boolean));
    await fs.mkdir(sourceDir, { recursive: true });
    await fs.writeFile(path.join(sourceDir, 'index.html'), renderLegacyRedirect(sourcePath, targetPath), 'utf8');
  }

  const notFoundHtml = render404Page();
  await fs.writeFile(path.join(DIST_DIR, '404.html'), notFoundHtml, 'utf8');

  const generatedPublicFiles = new Map([
    ['sitemap.xml', generateSitemapXml()],
    ['robots.txt', generateRobotsTxt()],
    ['llms.txt', generateLlmsText()],
    ['llms-full.txt', generateLlmsFullText()],
  ]);
  await Promise.all([...generatedPublicFiles].flatMap(([filename, content]) => [
    fs.writeFile(path.join(DIST_DIR, filename), content, 'utf8'),
    fs.writeFile(path.join(PUBLIC_DIR, filename), content, 'utf8'),
  ]));

  const manifest = JSON.parse(await fs.readFile(path.join(PUBLIC_DIR, 'manifest.webmanifest'), 'utf8'));
  manifest.description = `${TOOL_COUNT} ferramentas visuais para inspecionar displays, testar periféricos e organizar telas secundárias.`;
  manifest.shortcuts = PWA_SHORTCUTS.map(({ toolId: _toolId, ...shortcut }) => ({
    ...shortcut,
    icons: [{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
  }));
  const manifestOutput = `${JSON.stringify(manifest, null, 2)}\n`;
  await Promise.all([
    fs.writeFile(path.join(DIST_DIR, 'manifest.webmanifest'), manifestOutput, 'utf8'),
    fs.writeFile(path.join(PUBLIC_DIR, 'manifest.webmanifest'), manifestOutput, 'utf8'),
  ]);

  console.log(
    `SEO/GEO: ${TOOL_COUNT} ferramentas, ${SEO_PAGE_ROUTES.length * 2} guias localizados, ${BLOG_ARTICLES.length} artigos de blog, ${generatedFiles.length} páginas canônicas e ${LEGACY_REDIRECTS.length} rotas históricas preservadas; ${generatedFiles.length + 1} URLs indexáveis com a home do Vite.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
