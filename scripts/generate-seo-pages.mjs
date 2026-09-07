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
import { INSTRUMENT_EDITORIAL } from './editorial-instruments.mjs';

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
  function read(){try{var raw=JSON.parse(localStorage.getItem(KEY));if(raw&&raw.decided===true&&typeof raw.ads==='boolean'&&typeof raw.personalization==='boolean')return{decided:true,ads:raw.ads,personalization:raw.ads&&raw.personalization};}catch(e){}return null}
  function update(state){try{gtag('consent','update',{ad_storage:state.ads?'granted':'denied',ad_user_data:state.personalization?'granted':'denied',ad_personalization:state.personalization?'granted':'denied',analytics_storage:'denied'});}catch(e){}}
  function loadAds(state){
    if(!state||state.ads!==true||document.getElementById('ms-adsense-script'))return;
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
  banner.innerHTML='<div class="wrap"><div><h2 id="ms-consent-title">Privacidade, cookies e anúncios</h2><p>Usamos armazenamento local para lembrar suas preferências. Você decide se permite anúncios e personalização. <a href="/cookies/" style="color:#ffb020">Política de cookies</a>.</p><p><label><input type="checkbox" data-ms-ads> Publicidade</label> <label><input type="checkbox" data-ms-personalization> Personalização</label></p></div><div class="actions"><button type="button" data-ms-reject>Só o essencial</button><button type="button" data-ms-selection>Salvar seleção</button><button type="button" class="primary" data-ms-accept>Aceitar tudo</button></div></div>';
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
  if(footer){var preferences=document.createElement('button');preferences.type='button';preferences.textContent='Preferências de privacidade';preferences.style.cssText='padding:12px;color:inherit;background:transparent;border:1px solid currentColor;border-radius:6px;cursor:pointer';preferences.addEventListener('click',openPreferences);footer.appendChild(preferences)}
  var saved=read();
  if(saved){update(saved);loadAds(saved)}else{openPreferences()}
})();
</script>`;

const BLOG_ARTICLES = [...blogInspection, ...blogCalibration, ...blogProductivity];
const BLOG_SLUG_SET = new Set(BLOG_ARTICLES.map((a) => a.slug));

const EDITORIAL_CONTENT = Object.freeze({
  ...INSTRUMENT_EDITORIAL,
  'black-screen': {
    related: ['dead-pixel-test', 'screen-cleaner', 'monitor-test'],
    pt: {
      intro: 'Uma superfície preta ajuda a observar uniformidade, pixels luminosos, IPS glow e vazamento de luz (backlight bleed) em um ambiente escuro. Em OLED, pixels pretos desligam completamente os emissores; em LCD, a luz de fundo é bloqueada pelos cristais líquidos com contraste finito.',
      steps: ['Abra a ferramenta e solicite tela cheia pelo botão ou pela tecla F.', 'Reduza a iluminação do ambiente para 0,5 a 2 lux sem alterar o ângulo normal de uso.', 'Observe o centro, as bordas e os cantos. Mova levemente a cabeça para distinguir IPS glow de vazamento físico fixo. Pressione Esc para encerrar.'],
      uses: ['Inspeção visual de pixels claros, IPS glow e vazamento de luz (backlight bleed).', 'Conferência de um monitor novo durante o prazo de devolução legal (CDC Art. 49).', 'Comparação do comportamento de dois painéis sob as mesmas condições ópticas.', 'Descanso visual e redução de emissão de luz em monitores secundários.'],
      limitations: 'Em LCD, a luz de fundo permanece ativa. Em OLED, a emissão em preto é nula (0,000 cd/m²). A ferramenta é uma referência óptica no navegador e não gera laudo pericial.',
      faq: [
        ['Isso economiza energia?', 'Em painéis OLED e telas MiniLED com local dimming, a exibição de preto puro desativa os emissores e reduz drasticamente o consumo elétrico. Em LCDs convencionais, a economia é marginal.'],
        ['Como distinguir IPS Glow de Backlight Bleed?', 'O IPS Glow altera sua intensidade e posição conforme o observador muda o ângulo de visão. O Backlight Bleed permanece fixo nas bordas da moldura independentemente do movimento.']
      ],
      methodology: [
        'Displays OLED (WOLED e QD-OLED) são emissores diretos onde cada subpixel é um diodo orgânico individual. Ao renderizar a cor #000000 no espaço sRGB, o sinal digital envia valor zero aos transistores de controle, cessando completamente a passagem de corrente e resultando em luminância de 0,000 cd/m² (contraste infinito mensurável).',
        'Em contrapartida, painéis LCD (Twisted Nematic, Vertical Alignment e In-Plane Switching) são moduladores de luz transmissivos dependentes de uma Unidade de Luz de Fundo (Backlight Unit - BLU) contínua. Mesmo os melhores painéis IPS mantêm um nível de preto residual entre 0,10 e 0,40 cd/m², resultando em contraste estático típico de 1.000:1 a 2.000:1 (IPS Black).',
        'O vazamento de luz (backlight bleed) é um defeito de montagem mecânica onde a pressão irregular da moldura desalinha as camadas difusoras de luz, mantendo pontos luminosos fixos nas bordas. Já o IPS Glow é um fenômeno de refração angular nos cristais líquidos inclinados, alterando sua intensidade ao mover a cabeça a uma distância recomendada de 80 a 100 cm em ambiente escurecido.'
      ]
    },
    en: {
      intro: 'A fullscreen black surface helps you inspect panel uniformity, bright subpixels, IPS glow, and backlight bleed in a dark room. On OLED displays, black pixels power off completely; on LCDs, the continuous backlight is blocked by liquid crystal rotation with finite contrast.',
      steps: ['Open the tool and request fullscreen using its button or the F key.', 'Dim room lighting to 0.5–2 lux without changing your standard viewing angle.', 'Inspect the center, corners, and edges. Move slightly off-axis to distinguish viewing-angle glow from fixed mechanical bleed. Press Escape to finish.'],
      uses: ['Visual inspection of bright subpixels, IPS glow, and backlight bleed.', 'Evaluating a new monitor during the statutory return or warranty window.', 'Side-by-side uniformity comparison of two displays under controlled illumination.', 'Reducing peripheral light and ocular strain on a secondary monitor.'],
      limitations: 'LCD backlights remain energized. OLED black emission is zero (0.000 cd/m²). This browser utility provides a standard optical reference without generating certified hardware laboratory metrics.',
      faq: [
        ['Does a black screen save power?', 'On OLED and MiniLED displays with active local dimming, black pixels power down completely, yielding substantial energy savings. On conventional edge-lit LCDs, power savings are negligible.'],
        ['How do I distinguish IPS Glow from Backlight Bleed?', 'IPS Glow shifts in intensity and position as your head moves relative to the screen axis. Backlight bleed remains stationary along the bezel edges regardless of perspective.']
      ],
      methodology: [
        'OLED displays (including WOLED and QD-OLED matrices) are self-emissive devices where each subpixel functions as an independent organic diode. When rendering sRGB #000000, digital control signals drive switching transistors to the cut-off state, achieving true 0.000 cd/m² black luminance and infinite static contrast ratio.',
        'Conversely, LCD panels (TN, VA, and IPS) act as transmissive spatial light modulators relying on a continuous Backlight Unit (BLU) of blue/white LEDs and phosphor diffusers. Liquid crystals block polarized light with finite efficiency, yielding residual black levels of 0.10 to 0.40 cd/m² and standard contrast ratios of 1,000:1 to 2,000:1 (IPS Black).',
        'Backlight bleed stems from uneven mechanical clamping pressure around the chassis bezel that deforms internal optical diffusion sheets, producing invariant edge hotspots. IPS Glow is an intrinsic birefringent phenomenon where light escapes at oblique angles, shifting dynamically as the observer inspects the screen from an 80–100 cm distance in low ambient lighting.'
      ]
    },
  },
  'dead-pixel-test': {
    related: ['monitor-test', 'black-screen', 'display-calibration'],
    pt: {
      intro: 'A alternância entre 8 campos de cores sólidas puras isola os transistores da matriz TFT para identificar com precisão subpixels presos, pixels mortos e pontos quentes.',
      steps: ['Abra o teste em tela cheia e limpe a superfície do monitor com microfibra.', 'Percorra a sequência completa: Vermelho, Verde, Azul, Ciano, Magenta, Amarelo, Branco e Preto.', 'Examine minuciosamente toda a matriz a uma distância confortável e repita qualquer ponto suspeito.'],
      uses: ['Inspeção de monitores, notebooks, tablets e smartphones novos ou usados.', 'Auditoria técnica antes do término do prazo de devolução ou acionamento de garantia.', 'Mapeamento de subpixels defeituosos conforme a norma ISO 9241-307.'],
      limitations: 'Trata-se de uma inspeção visual de conformidade óptica. Não repara danos físicos no semicondutor nem substitui a análise de RMA do fabricante.',
      faq: [
        ['Qual a diferença entre Dead Pixel e Stuck Pixel?', 'Um dead pixel permanece desligado e escuro em todas as cores; um stuck pixel é um transistor travado em condução, emitindo permanentemente vermelho, verde ou azul puro.'],
        ['A norma ISO 9241-307 tolera quantos pixels defeituosos?', 'Em painéis Classe II (padrão de mercado de consumo), a norma admite até 2 pixels acesos, 2 pixels escuros e até 5 subpixels defeituosos por milhão de pixels.']
      ],
      methodology: [
        'Monitores modernos utilizam matrizes ativas de transistores de filme fino (TFT - a-Si, IGZO ou LTPS). Em uma resolução 4K UHD (3840x2160), existem 8,29 milhões de pixels e mais de 24,88 milhões de subpixels RGB individuais controlados por transistores microscópicos.',
        'Um Dead Pixel (pixel morto) ocorre quando a trilha elétrica do transistor queima em circuito aberto, mantendo os três subpixels desligados. Um Stuck Pixel (subpixel preso) é um transistor travado em estado condutor (on), emitindo luz vermelha, verde ou azul pura mesmo quando o sinal é preto absoluto.',
        'A norma internacional ISO 9241-307 rege os critérios de garantia da indústria. Painéis de Classe I exigem zero defeitos. Painéis de Classe II admitem até 2 pixels acesos, 2 pixels escuros e 5 subpixels defeituosos por milhão de pixels. A ciclagem pelas 8 cores fundamentais do MonitorSmith isola cada subcanal elétrico para auditoria técnica.'
      ]
    },
    en: {
      intro: 'Cycling through 8 pure primary and secondary solid colors isolates individual TFT subpixel circuits to pinpoint dead pixels, stuck subpixels, and hot pixels.',
      steps: ['Open the test fullscreen and wipe the screen with a clean microfiber cloth.', 'Cycle through the full sequence: Red, Green, Blue, Cyan, Magenta, Yellow, White, and Black.', 'Inspect the entire active matrix at a comfortable distance and re-verify any anomaly.'],
      uses: ['Inspecting new or refurbished monitors, laptops, tablets, and smartphones.', 'Auditing display health before warranty or return window expiration.', 'Mapping defective subpixels in compliance with ISO 9241-307 standards.'],
      limitations: 'This is a visual inspection protocol. It does not electronically repair broken semiconductor traces or alter manufacturer RMA policies.',
      faq: [
        ['What is the difference between a dead pixel and a stuck subpixel?', 'A dead pixel stays permanently dark across all color fields. A stuck subpixel is a transistor locked in the conductive state, emitting continuous red, green, or blue light over dark scenes.'],
        ['How many pixel defects are permitted under ISO 9241-307?', 'Under Class II tolerances (standard consumer displays), up to 2 hot pixels, 2 dark pixels, and 5 defective subpixels are permitted per million pixels.']
      ],
      methodology: [
        'Modern displays utilize thin-film transistor (TFT) active matrices. A 4K UHD display (3840x2160) houses 8.29 million pixels and over 24.88 million discrete RGB subpixel gates lithographed onto glass substrates.',
        'A true Dead Pixel occurs when thin-film transistor gate traces fail in open circuit, leaving all three subpixels unpowered. A Stuck Pixel occurs when a subpixel transistor remains locked in conductive saturation, emitting red, green, or blue light continuously.',
        'ISO 9241-307 governs display quality classification worldwide. Class I requires zero defects; Class II permits up to 2 hot pixels, 2 dark pixels, and 5 defective subpixels per million pixels. MonitorSmith’s 8-field test routine systematically audits every individual electrical subpixel channel.'
      ]
    },
  },
  'screen-cleaner': {
    related: ['dead-pixel-test', 'black-screen', 'display-calibration'],
    pt: {
      intro: 'Fundos de alto contraste evidenciam partículas de poeira, marcas oleofóbicas e resíduos para higienização segura de revestimentos ópticos.',
      steps: ['Use o fundo de contraste para localizar marcas e poeira, sem limpar o painel ligado.', 'Encerre o teste, desligue o monitor e siga as orientações de limpeza do fabricante.', 'Use um pano macio adequado; se o fabricante permitir umidade, aplique o líquido no pano, nunca diretamente na tela.'],
      uses: ['Preparação para manutenção periódica preventiva de estações de trabalho.', 'Mapeamento de poeira superficial antes da aplicação de películas protetoras.', 'Inspeção de riscos superficiais na camada polarizadora.'],
      limitations: 'O MonitorSmith fornece superfícies de contraste óptico para localização de resíduos. Produtos abrasivos ou solventes inadequados causam danos irreversíveis ao painel.',
      faq: [
        ['Posso utilizar álcool ou limpa-vidros no monitor?', 'Nunca. Substâncias como amônia, álcool etílico, acetona ou limpa-vidros dissolvem a matriz polimérica dos filmes antirreflexo (AG/AR) e polarizadores, causando manchas opacas permanentes.'],
        ['Qual o tecido mais seguro para limpar a tela?', 'Pano de microfibra de filamento dividido limpo (80% poliéster / 20% poliamida), livre de poeira abrasiva acumulada.']
      ],
      methodology: [
        'Superfícies de displays modernos incorporam filmes poliméricos ultrafinos depositados por pulverização catódica ou evaporação a vácuo. Painéis foscos (matte) utilizam revestimentos Anti-Glare (AG) com microtexturas de dispersão luminosa. Telas brilhantes e OLED utilizam revestimentos multicamadas Anti-Reflective (AR) de interferência com camadas oleofóbicas fluoradas.',
        'Solventes agressivos como hidróxido de amônio (amônia), acetona, tolueno e álcool etílico desidratam e dissolvem a matriz de triacetato de celulose (TAC) dos filmes polarizadores, resultando em descamação irreversível (crazing) e perda de uniformidade de contraste.',
        'O procedimento seguro exige resfriamento elétrico do painel, remoção preliminar de poeiras minerais com pincel antiestático e aplicação indireta de água destilada ou desmineralizada em microfibra de alta densidade, exercendo pressão linear suave inferior a 50 g/cm² sem infiltração de líquidos nas molduras.'
      ]
    },
    en: {
      intro: 'High-contrast inspection backgrounds illuminate dust particles, fingerprints, and residue for safe decontamination of optical display coatings.',
      steps: ['Use the contrast background to locate dust and marks without cleaning the powered screen.', 'Close the test, power off the display and follow the manufacturer cleaning instructions.', 'Use a suitable soft cloth; if moisture is allowed, apply it to the cloth, never directly to the screen.'],
      uses: ['Routine maintenance of professional editing and gaming monitors.', 'Inspecting display glass before applying protective films.', 'Evaluating superficial scratches on anti-glare coatings.'],
      limitations: 'MonitorSmith delivers visual contrast references. Chemical solvents or abrasive wiping materials cause permanent delamination and polarizer damage.',
      faq: [
        ['Can I use household glass cleaners or alcohol on my monitor?', 'Never. Ammonia, ethyl alcohol, acetone, and household detergents dissolve polymer anti-glare (AG) and polarizing layers, producing permanent cloudy crazing and coating breakdown.'],
        ['What is the safest cloth for cleaning screens?', 'A clean split-filament microfiber cloth (80% polyester / 20% polyamide) dedicated solely to optical glass surfaces.']
      ],
      methodology: [
        'Modern display surfaces incorporate sub-micron polymer coatings. Matte panels apply etched Anti-Glare (AG) surfaces that scatter specular reflections. Glossy displays and OLEDs apply multilayer Anti-Reflective (AR) optical interference coatings paired with top fluoropolymer oleophobic treatments.',
        'Harsh solvents including ammonium hydroxide, ethyl alcohol, acetone, and acetic acid break polymer bonds in cellulose triacetate (TAC) polarizing films, causing irreversible clouding, delamination, and contrast degradation.',
        'Safe cleaning protocol requires cooling down the panel, removing abrasive mineral dust with an anti-static brush, and indirect application of distilled water via clean microfiber, using linear wiping pressure below 50 g/cm² with zero liquid ingress into chassis bezels.'
      ]
    },
  },
  'monitor-test': {
    related: ['display-calibration', 'dead-pixel-test', 'black-screen'],
    pt: {
      intro: 'O Teste de Monitor é uma rotina de triagem rápida para conferência geral de painéis: integridade de geometria, uniformidade de iluminação, fase de sinal e clock de pixels.',
      steps: ['Abra o teste em tela cheia logo após desembalar o monitor ou antes de finalizar uma compra.', 'Percorra a lista de verificação visual: geometria, uniformidade básica e ausência de distorções evidentes.', 'Anote qualquer inconsistência observada para acionar a garantia ou devolução dentro do prazo legal.'],
      uses: ['Checklist de triagem e recebimento de monitores novos ou usados.', 'Verificação rápida de integridade geral do display antes de calibração avançada.', 'Detecção de incompatibilidades de quantização HDMI (Full RGB vs Limited RGB).'],
      limitations: 'Este é um teste de triagem visual preliminar. Para avaliação aprofundada de escala de cinza e curvas de gama, utilize a ferramenta Verificação Visual.',
      faq: [
        ['Qual a diferença entre o Teste de Monitor e a Verificação Visual?', 'O Teste de Monitor é uma triagem rápida para conferência geral (ideal para recebimento); a Verificação Visual oferece laboratório de padrões para análise minuciosa de tons e gama.'],
        ['Este teste identifica problemas de handshake HDMI/DisplayPort?', 'Sim. Permite verificar se o sinal está configurado na faixa completa (Full RGB 0-255) ou limitada (16-235).']
      ],
      methodology: [
        'Ao receber um display novo ou seminovo, uma auditoria de primeiro nível deve verificar simultaneamente integridade da matriz, clock de pixels e alinhamento de fase de sinal. Tensões mecânicas de transporte frequentemente causam deslocamento interno de difusores e microfissuras em conexões TAB/COF.',
        'Painéis de consumo operam com tolerâncias de uniformidade de luminância de 10% a 15% entre o centro e os cantos. Padrões de teste em grade e campos uniformes expõem desvios assimétricos de temperatura de cor antes de ajustes finos no OSD.',
        'A ferramenta auxilia na detecção de discrepâncias de quantização HDMI/DisplayPort, onde a GPU transmite faixa limitada (16-235) para um monitor configurado em faixa completa (0-255), resultando em pretos acinzentados e perda de contraste.'
      ]
    },
    en: {
      intro: 'The Monitor Test is a rapid triage checklist for newly acquired displays: verifying geometry, luminance uniformity, signal phase alignment, and pixel clock stability.',
      steps: ['Open the test fullscreen immediately after unboxing or before completing a purchase.', 'Go through the visual checklist: geometric grid alignment, basic uniformity, and absence of artifacts.', 'Document any defect to request immediate replacement within return periods.'],
      uses: ['Unboxing triage checklist for new and refurbished monitors.', 'Quick general display health check before advanced color profiling.', 'Detecting HDMI quantization mismatches (Full RGB 0-255 vs Limited RGB 16-235).'],
      limitations: 'This is a preliminary triage checklist. For granular grayscale ramps and gamma tracking, use the Visual Check tool.',
      faq: [
        ['What is the difference between Monitor Test and Visual Check?', 'Monitor Test is a rapid triage checklist (great for unboxing/returns); Visual Check is a technical pattern laboratory for evaluating tonal transitions and gamma.'],
        ['Does this test detect HDMI handshake range mismatches?', 'Yes. It quickly reveals whether your GPU is outputting Full Range (0-255) or Limited Range (16-235).']
      ],
      methodology: [
        'When receiving a new display, an initial triage audit evaluates matrix integrity, pixel clock stability, and signal phase alignment. Shipping shocks commonly induce optical sheet displacement and stress around chassis bezels.',
        'Consumer monitors operate within allowable luminance uniformity variances of 10% to 15% between center and periphery. Geometric grid and uniform color patterns expose gross chromatic drift before OSD calibration.',
        'The test assists in identifying HDMI/DisplayPort handshake mismatches, where a graphics card transmits Limited RGB (16-235) to a screen expecting Full RGB (0-255), producing washed-out black levels.'
      ]
    },
  },
  'display-calibration': {
    related: ['monitor-test', 'black-screen', 'screen-cleaner'],
    pt: {
      intro: 'A Verificação Visual é um laboratório técnico de padrões de referência: escala de cinza de 256 níveis, curvas de gama (2.2 e BT.1886), nitidez de subpixel e detecção de color banding.',
      steps: ['Restaure o perfil padrão sRGB do monitor e estabilize a iluminação da sala.', 'Analise os passos de sombra (0% a 5%) e realce (95% a 100%) para verificar esmagamento ou estouro.', 'Examine gradientes contínuos e padrões de subpixel para avaliar dithering (FRC) e nitidez de fontes.'],
      uses: ['Avaliação avançada de gradação tonal e rastreamento de curva gama.', 'Detecção de color banding em gradientes de 8 bits e 10 bits.', 'Verificação de nitidez e alinhamento de renderização de subpixel (ClearType/FreeType).'],
      limitations: 'A avaliação visual orienta ajustes no menu OSD e na GPU. Não gera perfil ICC automatizado nem substitui um colorímetro ou espectrofotômetro de hardware.',
      faq: [
        ['Como identificar se as sombras estão esmagadas (black crush)?', 'Nos blocos de cinza escuro (níveis de vídeo 1 a 5), todos os degraus adjacentes devem ser discerníveis do fundo preto absoluto. Se forem indistinguíveis, ajuste o brilho ou a curva gama.'],
        ['Qual a curva gama recomendada para uso geral na web?', 'Gama 2.2 conforme a especificação sRGB (IEC 61966-2-1). Para edição de vídeo em ambiente escuro, a norma ITU-R BT.1886 especifica Gama 2.4.']
      ],
      methodology: [
        'A função de transferência gama (L = V^γ) compensa a resposta logarítmica da percepção humana de luminância descrita pela Lei de Stevens. O padrão sRGB e Rec.709 adota Gama 2.2 para ambientes de escritório iluminados (80 a 120 cd/m²), enquanto a norma ITU-R BT.1886 especifica Gama 2.4 para salas de masterização escurecidas.',
        'Em sistemas de 8 bits por canal, a escala de cinza divide-se em 256 níveis discretos (0 a 255). Os padrões de teste do MonitorSmith oferecem degraus de avaliação de baixa intensidade (níveis 0 a 5) e alta intensidade (níveis 250 a 255) para validar se o display preserva detalhes de sombras profundas sem crushing e realces sem clipping.',
        'A renderização de subpixel (como Microsoft ClearType e FreeType) utiliza a disposição física horizontal RGB para triplicar a resolução horizontal aparente de fontes. Em painéis com matriz BGR ou OLED PenTile, padrões de teste de subpixel revelam franjas cromáticas que exigem compensação no sistema operacional.'
      ]
    },
    en: {
      intro: 'Visual Check is a precision reference pattern laboratory: 256-level grayscale ramps, gamma tracking curves (2.2 and BT.1886), continuous gradient sweeps, and subpixel font rendering.',
      steps: ['Restore the default sRGB profile on your display and stabilize ambient room lighting.', 'Inspect deep shadow steps (0%–5%) and highlight steps (95%–100%) for crushing or clipping.', 'Examine continuous gradient sweeps and subpixel targets to assess dithering (FRC) and font rendering clarity.'],
      uses: ['Advanced assessment of tonal gradation and gamma tracking.', 'Detecting color banding across 8-bit and 10-bit graphics pipelines.', 'Evaluating subpixel font antialiasing (ClearType/FreeType) on RGB and BGR panels.'],
      limitations: 'Visual inspection guides OSD and GPU driver tuning. It does not generate hardware ICC profiles or replace a dedicated spectrophotometer.',
      faq: [
        ['How do I detect shadow crushing (black crush)?', 'In near-black test steps (levels 1 through 5), each block must remain distinguishable from pure black (#000000). If indistinguishable, increase display brightness or adjust gamma.'],
        ['Which gamma standard should I target for web work?', 'Gamma 2.2 in compliance with the sRGB specification (IEC 61966-2-1). For video grading in darkened suites, ITU-R BT.1886 specifies Gamma 2.4.']
      ],
      methodology: [
        'The electro-optical transfer function (gamma curve L = V^γ) models human perceptual brightness scaling described by Stevens’ Power Law. Standard sRGB and Rec.709 pipelines target gamma 2.2 for typical ambient illumination, whereas ITU-R BT.1886 defines gamma 2.4 for controlled grading environments.',
        'In an 8-bit per channel pipeline, grayscale is quantized into 256 discrete levels (0–255). MonitorSmith’s precision test patterns supply near-black evaluation steps (levels 0–5) and near-white highlight steps (levels 250–255) to verify absence of shadow crushing or highlight clipping.',
        'Subpixel text rasterizers (such as Microsoft ClearType and FreeType) leverage horizontal RGB stripe geometries to achieve 3x apparent horizontal resolution. Displays utilizing BGR or diamond OLED PenTile matrices produce chromatic fringing unless compensated by font antialiasing tuning.'
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
        ['O monitor substitui uma luminária Softbox ou Ring Light?', 'Em distâncias de 50 a 80 cm, uma tela de 24 a 32 polegadas atua como uma fonte difusa de grande área, suavizando sombras faciais com qualidade superior a ring lights compactas.'],
        ['O que significa a temperatura de cor em Kelvin?', 'Valores baixos (3200K) produzem luz quente amarelada (lâmpada incandescente); valores altos (6500K / D65) produzem luz branca fria simulando a luz solar do meio-dia.']
      ],
      methodology: [
        'A intensidade luminosa incidente decai com o quadrado da distância ($E = I / d^2$). Ao utilizar um monitor de 24 a 32 polegadas a 60 cm de distância, a ampla área emissiva transforma a tela em uma fonte difusa de grande abertura (softbox), suavizando sombras duras sob as sobrancelhas e o nariz.',
        'A temperatura de cor correlacionada (CCT em Kelvin) permite casar a emissão do monitor com a iluminação ambiente da sala (3200K quente a 6500K D65), evitando que o sensor da câmera oscile o balanço de branco automático ou gere tons de pele cadavéricos.',
        'LEDs brancos de monitores convencionais utilizam emissores azuis revestidos com fósforo amarelo, apresentando Índice de Reprodução de Cor (CRI / Ra) típico entre 80 e 90 Ra, oferecendo excelente luz de preenchimento facial para comunicação remota.'
      ]
    },
    en: {
      intro: 'Transforms your computer display into a wide-aperture softbox light source for video calls and streams, featuring adjustable Correlated Color Temperature (CCT).',
      steps: ['Position the browser window facing your subject or onto a secondary display.', 'Adjust intensity and color temperature (3200K to 6500K) to harmonize with ambient room light.', 'Lower screen luminance if specular reflections appear on eyeglasses.'],
      uses: ['Corporate video calls on Zoom, Google Meet, and Microsoft Teams.', 'Diffuse fill lighting for tabletop and macro product photography.', 'Matching camera white balance during remote presentations.'],
      limitations: 'Displayed CCT is an sRGB chromatic approximation rendered on-screen. Peak illuminance is bounded by the panel’s native nit rating.',
      faq: [
        ['Can a monitor replace a physical softbox or ring light?', 'At standard desktop distances (50–80 cm), a 24-to-32-inch screen functions as a wide diffuse light source, significantly softening facial shadows compared to compact point lights.'],
        ['What does the Kelvin temperature scale signify?', 'Lower values (3200K) emit warm amber light mimicking incandescent tungsten; higher values (6500K / D65) emit crisp daylight white.']
      ],
      methodology: [
        'Illuminance incident on a subject diminishes with the square of distance ($E = I / d^2$). Operating a 24-to-32-inch monitor at a 60 cm distance converts the panel into a wide-aperture diffuse light source, eliminating harsh facial shadows.',
        'Modulating Correlated Color Temperature (CCT) from 3200K to 6500K matches room ambient lighting, preventing camera auto-exposure and white-balance hunting.',
        'Consumer LCD backlights deliver Color Rendering Index (CRI/Ra) ratings between 80 and 90 Ra, providing high-quality fill lighting for remote meetings and streaming setups.'
      ]
    },
  },
  'green-screen': {
    related: ['webcam-light', 'fullscreen-message', 'sponsor-loop'],
    pt: {
      intro: 'Superfície de croma verde sólida calibrada no código sRGB #00B140 para composições de vídeo, recorte de fundo em OBS e fotografia de produtos.',
      steps: ['Abra a ferramenta e ative o modo tela cheia.', 'Posicione a tela atrás do objeto ou apresentador com iluminação frontal adequada.', 'Configure o filtro de Chroma Key no OBS Studio ou software de edição e ajuste a tolerância de recorte.'],
      uses: ['Fundo de chroma key para gravação de pequenos produtos e miniaturas.', 'Fundo autoiluminado para transmissões e gravação de webcams em mesas compactas.', 'Composições rápidas em DaVinci Resolve, Premiere Pro e CapCut.'],
      limitations: 'Displays emitem luz ativa e podem projetar reflexos verdes (spill) em objetos muito próximos. Mantenha distância adequada e regule o brilho.',
      faq: [
        ['Por que o verde é a cor mais usada para Chroma Key?', 'Os sensores de câmeras digitais (matriz Bayer RGGB) possuem o dobro de fotodiodos verdes, proporcionando a maior relação sinal-ruído para algoritmos de recorte.'],
        ['Como evitar que o verde reflita no objeto filmado?', 'Reduza o brilho do monitor para 30%–50% e ilumine o objeto frontalmente com uma fonte de luz dedicada.']
      ],
      methodology: [
        'A cor verde #00B140 (RGB: 0, 177, 64) situa-se no ponto de máxima sensibilidade dos sensores de câmeras digitais que utilizam matriz de filtros de cor Bayer (RGGB), maximizando a relação sinal-ruído (SNR) para algoritmos de recorte.',
        'A maioria das câmeras comprime o sinal de vídeo em formato 4:2:0, onde a resolução de cor é metade da resolução de luminância. Uma tela emissiva plana produz bordas de transição limpas sem rugas de tecido.',
        'Diferente de tecidos de musselina que exigem iluminação externa difusa para eliminar vincos, a tela do monitor emite luminância própria homogênea, eliminando sombras projetadas em capturas de mesa.'
      ]
    },
    en: {
      intro: 'Solid chroma green surface calibrated to sRGB #00B140 for video matting, OBS keying, and tabletop product shoots.',
      steps: ['Open the tool and enter fullscreen mode.', 'Position the display behind the subject with dedicated frontal lighting.', 'Configure the Chroma Key filter in OBS Studio or your NLE editor and adjust threshold tolerances.'],
      uses: ['Clean chroma key backdrop for macro product reviews and unboxings.', 'Self-luminous green background for compact webcam streaming setups.', 'Rapid compositing in DaVinci Resolve, Premiere Pro, and CapCut.'],
      limitations: 'Active displays emit light that can cause green spill on nearby subjects. Maintain physical distance and calibrate brightness.',
      faq: [
        ['Why is green the preferred chroma key color?', 'Digital camera sensors using Bayer filter arrays (RGGB) feature twice as many green photosites as red or blue, delivering maximum signal-to-noise ratio for keying algorithms.'],
        ['How do I eliminate green spill on reflective objects?', 'Lower screen brightness to 30%–50% and illuminate the foreground subject with a dedicated key light.']
      ],
      methodology: [
        'Chroma green #00B140 (RGB: 0, 177, 64) aligns with the peak spectral quantum efficiency of Bayer RGGB sensor arrays, maximizing keying signal-to-noise ratios (SNR).',
        'Video capture pipelines commonly encode in 4:2:0 chroma subsampling. An active emissive screen generates sharp boundary contrast without fabric micro-creases.',
        'Unlike physical backdrops that require complex multi-point lighting to remove folds and shadows, a flat display surface produces uniform self-luminous chroma output.'
      ]
    },
  },
  'focus-timer': {
    related: ['fullscreen-clock', 'fullscreen-message', 'webcam-light'],
    pt: {
      intro: 'Temporizador de foco e produtividade com metodologia Pomodoro e gerador de ruído marrom, rosa e branco sintetizado localmente via Web Audio API.',
      steps: ['Escolha a duração do ciclo de foco (25 ou 50 minutos) e o som de mascaramento acústico desejado.', 'Inicie o temporizador e mantenha a tela em modo imersivo.', 'Ao soar o alerta de término, cumpra a pausa programada e reinicie o ciclo com disciplina.'],
      uses: ['Blocos de trabalho focado (Deep Work) em programação, escrita e análise.', 'Mascaramento acústico de conversas e ruídos no home office.', 'Gestão de ritmo e prevenção de estafa mental em jornadas intensas.'],
      limitations: 'É uma ferramenta de gestão temporal e apoio acústico. O áudio é sintetizado diretamente no navegador sem transmissão para servidores.',
      faq: [
        ['O que é ruído marrom (Brownian noise)?', 'É um ruído com densidade espectral que decai 6 dB por oitava ($1/f^2$), concentrando energia nos graves suaves, ideal para concentração profunda.'],
        ['O temporizador consome internet para tocar o áudio?', 'Não. Todo o áudio é sintetizado matematicamente em tempo real no cliente pela Web Audio API.']
      ],
      methodology: [
        'A síntese sonora utiliza a Web Audio API com AudioNodes nativos no navegador sem transmissão de streaming. O ruído marrom decai 6 dB por oitava ($1/f^2$), mascarando conversas e ruídos transitórios do ambiente.',
        'A metodologia apoia-se em ciclos ultradianos biológicos de atenção de 90 minutos divididos em intervalos de foco de 25 a 50 minutos. A transição visual nítida atua como gatilho de descompressão neurológica.',
        'Temporizadores e geradores de DSP desta ferramenta executam localmente no navegador, sem fluxo de áudio vindo de um servidor.'
      ]
    },
    en: {
      intro: 'Productivity timer based on Pomodoro protocols featuring real-time client-side Brownian, pink, and white noise synthesis powered by the Web Audio API.',
      steps: ['Select your focus interval (25 or 50 minutes) and optional acoustic masking profile.', 'Start the timer and leave the interface in full-screen immersion.', 'When the cycle concludes, take the scheduled break and restart deliberately.'],
      uses: ['Deep work blocks for software engineering, writing, and research.', 'Acoustic masking of ambient chatter and household distractions.', 'Pacing cognitive effort to prevent mental fatigue and burnout.'],
      limitations: 'This is an organizational and psychoacoustic aid. All DSP audio generation runs locally in the client browser thread.',
      faq: [
        ['What is Brownian noise (red noise)?', 'It is continuous noise with a power spectral density decaying at 6 dB per octave ($1/f^2$), emphasizing deep, soothing low frequencies for deep focus.'],
        ['Does audio generation consume network bandwidth?', 'No. Audio waveforms are synthesized algorithmically in real time via the browser’s Web Audio API.']
      ],
      methodology: [
        'Audio synthesis leverages the Web Audio API with native browser DSP nodes. Brown noise decays at 6 dB per octave ($1/f^2$), masking transient speech and environmental noise.',
        'Structured work intervals align with biological ultradian attention rhythms. Visual phase transitions serve as unambiguous cues for cognitive context switching.',
        'The tool timer loops and audio synthesizers run locally in the browser, without an audio stream from a server.'
      ]
    },
  },
  'fullscreen-clock': {
    related: ['focus-timer', 'fullscreen-message', 'black-screen'],
    pt: {
      intro: 'Exibe horário e data em formatos digital e analógico de alta resolução sincronizados com VSync para dashboards de estúdios e telas secundárias.',
      steps: ['Abra a ferramenta e selecione a composição desejada (Digital ou Analógico).', 'Ative o modo tela cheia (F11) para ocultar barras e menus do sistema operacional.', 'Mantenha a aba aberta na tela secundária para referência contínua de horário.'],
      uses: ['Painel de horário contínuo em mesas de edição, recepções e estúdios.', 'Referência temporal sincronizada para apresentações e gravações.', 'Dashboard minimalista para telas secundárias ociosas.'],
      limitations: 'O horário é lido a partir do relógio do sistema operacional local. A ferramenta não atua como servidor NTP primário.',
      faq: [
        ['O relógio funciona sem conexão à internet?', 'Os recursos já armazenados pelo service worker podem abrir sem conexão. O horário vem do relógio configurado no dispositivo.'],
        ['O que acontece se a aba ficar em segundo plano?', 'O MonitorSmith utiliza a Page Visibility API para re-sincronizar imediatamente os ponteiros e dígitos assim que a aba se torna ativa.']
      ],
      methodology: [
        'O relógio sincroniza a renderização analógica e digital com a cadência de atualização do monitor (VSync) utilizando a High Resolution Time API (`performance.now()`) e `requestAnimationFrame`.',
        'Navegadores modernos aplicam throttling em timers inativos para economizar bateria. O MonitorSmith re-sincroniza o estado temporal instantaneamente através de listeners do evento `visibilitychange`.',
        'O service worker armazena o shell principal para uso posterior; a disponibilidade offline depende de o navegador ter concluído esse cache.'
      ]
    },
    en: {
      intro: 'High-resolution digital and analog clock synchronized with display VSync cadences for secondary monitors, studio dashboards, and events.',
      steps: ['Open the tool and choose your preferred layout (Digital or Analog).', 'Enter fullscreen mode (F11) to hide browser chrome and OS taskbars.', 'Keep the tab open on your secondary screen as a continuous time reference.'],
      uses: ['Continuous studio time reference on secondary monitors and reception desks.', 'Timed cue tracking during live presentations and broadcasts.', 'Minimalist dashboard for idle auxiliary displays.'],
      limitations: 'Time data is sourced from the local operating system RTC clock. The tool does not serve as a primary NTP time server.',
      faq: [
        ['Does the clock work without an active internet connection?', 'Resources already cached by the service worker can open without a connection. Time comes from the clock configured on the device.'],
        ['How does it handle browser background tab throttling?', 'It listens to HTML5 Page Visibility API events to re-synchronize time instantly upon regaining window focus.']
      ],
      methodology: [
        'The clock synchronizes rendering to the display refresh cadence via the High Resolution Time API (`performance.now()`) and `requestAnimationFrame`.',
        'Modern browser engines throttle background tab timers to reduce battery draw; MonitorSmith re-syncs state immediately upon window focus events.',
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
      limitations: 'Projetada para sinalização estática e recados de grande porte. Para leitura dinâmica de roteiros rolantes, utilize o Teleprompter Online.',
      faq: [
        ['Como funciona o gerador de QR Code integrado?', 'O texto ou link é codificado diretamente no navegador com correção de erro Reed-Solomon de alta tolerância a reflexos e ângulos oblíquos.'],
        ['As mensagens digitadas são salvas em servidores externos?', 'Não. Todo o estado é mantido exclusivamente na memória local da sessão no seu navegador.']
      ],
      methodology: [
        'A legibilidade de texto em telas a distâncias de 3 a 10 metros fundamenta-se no padrão de acuidade visual de Snellen (resolução angular mínima de 1 minuto de arco por traço tipográfico). A tipografia responsiva ajusta a escala em unidades `vw/vh` para máxima legibilidade.',
        'Ao alternar para o modo QR Code, os dados são codificados com algoritmos de correção de erro Reed-Solomon de alta tolerância, permitindo leitura por smartphones sob ângulos oblíquos ou reflexos na tela.',
        'Os temas oferecem opções de contraste; a legibilidade deve ser conferida na combinação de cores e tamanho de texto escolhidos. Não há certificação integral WCAG AAA.'
      ]
    },
    en: {
      intro: 'Fullscreen digital signage with dynamic typographic scaling for presentation halls, meeting room status boards, and dynamic Reed-Solomon QR Code generation.',
      steps: ['Type your notice or URL and select high-contrast color themes.', 'Adjust typographic scale for clear legibility across your room or venue.', 'Enter fullscreen mode to transform your screen into a clean status display.'],
      uses: ['Meeting room status signage (Occupied / Available).', 'Large-scale visual cue boards for stages, studios, and reception lobbies.', 'Projecting high-contrast QR codes for instant audience link distribution.'],
      limitations: 'Engineered for static notices and stage prompts. For dynamic scrolling text during speech recording, use the Online Teleprompter.',
      faq: [
        ['How does the built-in QR Code generator operate?', 'Text and URLs are encoded client-side with Reed-Solomon error correction for reliable scanning under oblique angles and specular glare.'],
        ['Are messages stored on external database servers?', 'No. State remains strictly within the local browser memory session.']
      ],
      methodology: [
        'Signage legibility across 3 to 10 meters follows Snellen visual acuity standards (1 arcminute stroke angular resolution). Scaled typography utilizes viewport units (`vw/vh`) to guarantee character recognition.',
        'QR Code conversions implement high-level Reed-Solomon error correction, ensuring mobile camera decodability even under oblique angles or glass reflections.',
        'Themes offer contrast options; check legibility for the chosen colors and text size. There is no claim of comprehensive WCAG AAA certification.'
      ]
    },
  },
  'online-teleprompter': {
    related: ['fullscreen-message', 'webcam-light', 'fullscreen-clock'],
    pt: {
      intro: 'Teleprompter online com controle de velocidade de rolagem em palavras por minuto (WPM), coluna estreita para redução de movimento ocular e espelhamento horizontal para vidros Beamsplitter.',
      steps: ['Cole seu roteiro e ajuste o tamanho da tipografia e a largura da coluna de leitura.', 'Configure a velocidade de rolagem para coincidir com seu ritmo natural de fala (120 a 150 WPM).', 'Ative a inversão horizontal (Mirror Mode) caso utilize estrutura com espelho semi-refletor na câmera.'],
      uses: ['Gravação de videoaulas, palestras, apresentações executivas e vídeos para o YouTube.', 'Leitura de roteiros através de vidros divisores de feixe (beamsplitter 70/30).', 'Treinamento de oratória e controle de cadência de fala.'],
      limitations: 'Ferramenta de rolagem dinâmica. Requer ensaio prévio para sincronizar a cadência de leitura com a velocidade do texto.',
      faq: [
        ['Por que o teleprompter possui modo de espelhamento horizontal?', 'Equipamentos profissionais utilizam um vidro dielétrico inclinado na frente da lente da câmera que inverte a imagem. A inversão horizontal cancela a reflexão óptica.'],
        ['Como evitar que meus olhos pareçam estar lendo?', 'Mantenha a coluna de leitura estreita e posicione a tela o mais próximo possível do eixo central da lente da câmera.']
      ],
      methodology: [
        'Equipamentos de teleprompter profissionais utilizam vidros dielétricos semirrefletivos Beamsplitter 70/30 (70% de transmissão para a lente e 30% de reflexão para o leitor). O modo espelhado inverte a matriz gráfica horizontalmente ($[-1, 0, 0, 1]$), cancelando a reflexão óptica.',
        'Para manter contato visual direto com a lente sem movimento ocular lateral perceptível (movimentos sacádicos), a largura da coluna de leitura deve ocupar um campo visual inferior a 10 graus em relação ao eixo da câmera.',
        'A taxa média de fala humana situa-se entre 120 e 150 palavras por minuto (WPM). O motor de rolagem suave com interpolação baseada em `requestAnimationFrame` evita saltos discretos de linha.'
      ]
    },
    en: {
      intro: 'Online teleprompter with words-per-minute (WPM) scroll control, narrow column width adjustments to minimize saccadic eye tracking, and horizontal mirroring for beamsplitter glass rigs.',
      steps: ['Paste your script and adjust font size and column width.', 'Set scroll speed to match your natural speaking pace (120–150 WPM).', 'Enable horizontal mirroring if using a beamsplitter glass frame mounted in front of your camera lens.'],
      uses: ['Recording video courses, keynote presentations, and YouTube content.', 'Delivering scripted speeches through 70/30 beamsplitter prompter glass.', 'Speech pacing and public speaking cadence training.'],
      limitations: 'Dynamic scrolling reading tool. Benefits from a quick rehearsal to match speech delivery with scroll progression.',
      faq: [
        ['Why is horizontal mirroring needed for teleprompters?', 'Studio prompter hardware places a reflective glass in front of the lens that flips the image horizontally. Mirroring cancels this optical inversion.'],
        ['How do I prevent visible lateral eye movement?', 'Keep the reading column narrow and place the screen as close to the camera lens optical axis as possible.']
      ],
      methodology: [
        'Studio prompters utilize 70/30 dielectric beamsplitter glass. Horizontal mirror mode applies a CSS matrix ($[-1, 0, 0, 1]$) that cancels physical mirror reflection, presenting natural text orientation to the speaker.',
        'To maintain direct eye contact without visible lateral eye movement, the text column width must occupy less than a 10-degree field of view relative to the optical axis.',
        'Natural speech delivery averages 120–150 WPM. The smooth scrolling engine interpolates line progression on every display frame cycle (`requestAnimationFrame`), eliminating discrete line jumps.'
      ]
    },
  },
  'sponsor-loop': {
    related: ['fullscreen-message', 'green-screen', 'webcam-light'],
    pt: {
      intro: 'Carrossel em tela cheia para rotação automatizada de marcas de patrocinadores, anúncios e artes promocionais em eventos, lives e vitrines de lojas.',
      steps: ['Selecione as imagens que possui autorização para exibir.', 'Configure a ordem, a duração de cada marca (5 a 10 segundos), o tipo de transição e a cor de fundo.', 'Inicie a sequência e ative o modo tela cheia (F11).'],
      uses: ['Exibição de cotas de patrocinadores em transmissões ao vivo e palcos.', 'Vitrine digital para lojas, restaurantes (menuboards) e estandes de feiras.', 'Overlay rotativo de apoiadores em softwares de streaming (OBS Studio / vMix).'],
      limitations: 'As imagens são processadas localmente na memória da sessão do navegador. Para sessões estáticas muito prolongadas em OLED, ative o deslocamento sutil de pixels.',
      faq: [
        ['Posso utilizar a ferramenta como overlay no OBS Studio?', 'Sim. Adicione a aba em modo tela cheia como fonte de captura de janela ou navegador no OBS e aplique filtros de corte se necessário.'],
        ['Como o deslocamento de pixels auxilia na preservação do painel?', 'Ele introduz microtranslações periódicas nos eixos X e Y para evitar a queima contínua dos mesmos subpixels em displays OLED.']
      ],
      methodology: [
        'A exibição prolongada de logotipos de alta luminosidade em eventos pode causar retenção temporária em painéis estáticos. O algoritmo de deslocamento sutil de pixels (pixel orbiter) introduz micro-vetores de translação para mitigar desgaste sem comprometer o enquadramento.',
        'As transições usam opacidade e transformações CSS. A fluidez efetiva depende do navegador, da GPU, da resolução das imagens e da carga do dispositivo.',
        'As imagens importadas são representadas por URLs Blob locais (`URL.createObjectURL`) e revogadas no encerramento da sessão; a ferramenta não implementa um endpoint de upload.'
      ]
    },
    en: {
      intro: 'Fullscreen automated carousel for rotating sponsor logos, commercial branding, and promotional banners across events, livestreams, and retail storefronts.',
      steps: ['Select the brand images you are authorized to display.', 'Configure sequence order, per-slide duration (5–10 seconds), transition style, and background color.', 'Launch the carousel and enter fullscreen mode (F11).'],
      uses: ['Sponsor logo rotation on stages, conferences, and tournament streams.', 'Digital signage for retail stores, restaurant menuboards, and trade show booths.', 'Rotating supporter overlay in OBS Studio, vMix, and Streamlabs.'],
      limitations: 'Images are processed locally in browser session memory. For prolonged static sessions on OLEDs, activate subtle pixel shifting.',
      faq: [
        ['Can I use this carousel as an OBS Studio overlay?', 'Yes. Capture the fullscreen browser tab as a Window Capture source in OBS and apply chroma or crop filters as needed.'],
        ['How does pixel shifting protect displays?', 'It introduces subtle micro-translation vectors across X/Y axes to prevent continuous static subpixel wear on OLED panels.']
      ],
      methodology: [
        'Prolonged static display of high-luminance sponsor logos can induce temporary retention. The subtle pixel shifting algorithm introduces micro-translation vectors across X/Y axes without degrading aesthetic framing.',
        'Fade transitions and translation routines leverage CSS 3D hardware acceleration (`transform: translate3d`) on isolated compositing layers, guaranteeing stable 60/120 FPS performance during live broadcasts.',
        'Imported images are represented by local object URLs (`URL.createObjectURL`) and revoked when the tool is torn down; the tool does not implement an image-upload endpoint.'
      ]
    },
  },
  'ppi-calculator': {
    related: ['monitor-test', 'display-calibration', 'dead-pixel-test'],
    pt: {
      intro: 'Calculadora óptica e geométrica de densidade de pixels (PPI), tamanho do ponto (dot pitch) e distância de visualização para acuidade visual humana padrão (Snellen 20/20).',
      steps: ['Insira a resolução horizontal e vertical do display (ex: 2560 × 1440 ou 3840 × 2160) ou clique em um preset de mercado.', 'Informe a medida diagonal da tela visível em polegadas (ex: 24", 27" ou 32").', 'Analise o PPI calculado, o tamanho físico do ponto em milímetros e a distância ideal recomendada para nitidez de padrão Retina.'],
      uses: ['Cálculo de densidade de pixels e tamanho físico de monitores antes da compra.', 'Definição da distância ergonômica ideal de trabalho para evitar fadiga visual e percepção de malha de pixels.', 'Ajuste correto da escala de interface (DPI Scaling) no Windows, macOS e Linux.'],
      limitations: 'Os cálculos consideram um painel plano com pixels quadrados homogêneos. Telas curvas mantêm a mesma densidade planar, mas variam o campo de visão periférico.',
      faq: [
        ['O que é PPI e por que ele importa?', 'PPI (Pixels Per Inch) representa a quantidade de pixels lineares por polegada. Quanto maior o PPI, mais nítidos serão os textos e elementos gráficos, eliminando bordas serrilhadas.'],
        ['O que significa a distância ideal "Retina"?', 'É a distância a partir da qual o olho humano com visão normal 20/20 (acuidade de 1 minuto de arco) não consegue mais discernir pixels individuais a olho nu.']
      ],
      methodology: [
        'A densidade de pixels é obtida pela fórmula euclidiana da diagonal em pixels dividida pela diagonal física em polegadas: PPI = sqrt(W² + H²) / D. O dot pitch físico é o inverso métrico exato: 25,4 mm / PPI.',
        'O cálculo do limiar de retinopatia baseia-se na acuidade visual padrão de Snellen (visão 20/20 ou 1.0 decimal), onde a resolução angular máxima do olho humano corresponde a 1 arco-minuto (1/60° ou 0,000290888 radianos). A distância em que um pixel subtende menos de 1 arco-minuto é dada por Distância (cm) = (Dot Pitch mm / 2 · tan(0,5′)) / 10 ≈ 8732 / PPI.',
        'As recomendações de escala de sistema operacional (DPI scaling) equilibram a legibilidade de fontes vetoriais (mínimo de 10 a 12 pontos físicos) com a preservação de espaço de trabalho útil em ambientes Windows e macOS.'
      ]
    },
    en: {
      intro: 'Optical and geometric display calculator for pixel density (PPI), dot pitch (mm), and optimal viewing distance based on standard human visual acuity (Snellen 20/20).',
      steps: ['Enter horizontal and vertical display resolution (e.g., 2560 × 1440 or 3840 × 2160) or select a popular market preset.', 'Specify the diagonal screen measurement in inches (e.g., 24", 27", or 32").', 'Review calculated PPI, physical dot pitch in millimeters, and the recommended viewing distance for Retina-grade acuity.'],
      uses: ['Determining pixel density and physical pixel size prior to purchasing new monitors.', 'Setting ergonomic viewing distance to eliminate visual fatigue and visible pixel grid structure.', 'Configuring optimal OS scaling (DPI Scaling) in Windows, macOS, and Linux.'],
      limitations: 'Calculations assume flat panels with square pixel geometry. Curved screens share the same planar pixel density but alter peripheral field-of-view angles.',
      faq: [
        ['What is PPI and why does it matter?', 'PPI (Pixels Per Inch) measures linear pixel density. Higher PPI produces sharper text and crisper graphics, eliminating visible subpixel aliasing.'],
        ['What does "Retina" viewing distance mean?', 'It is the minimum distance at which a person with standard 20/20 vision (1 arcminute resolving power) cannot distinguish individual display pixels.']
      ],
      methodology: [
        'Pixel density is derived from the Euclidean diagonal pixel count divided by physical diagonal in inches: PPI = sqrt(W² + H²) / D. Dot pitch is the exact metric reciprocal: 25.4 mm / PPI.',
        'The Retina visual acuity threshold adheres to standard Snellen 20/20 vision (1 arcminute or 0.000290888 radians angular resolution). The distance where a single pixel subtends under 1 arcminute is given by Distance (cm) = (Dot Pitch mm / 2 · tan(0.5′)) / 10 ≈ 8732 / PPI.',
        'Operating system DPI scaling recommendations balance vector font legibility (10–12 physical points minimum) against desktop workspace productivity across Windows and macOS.'
      ]
    }
  },
  'motion-blur': {
    related: ['monitor-test', 'display-calibration', 'dead-pixel-test'],
    pt: {
      intro: 'Animação em canvas para observar visualmente rastros, desfoque e artefatos de overdrive. A telemetria descreve a cadência dos callbacks do navegador; não mede GtG ou MPRT físicos.',
      steps: ['Selecione a velocidade de deslocamento (recomendado: 480 ou 960 px/s) e o padrão visual desejado (blocos de contraste, texto ou transição escura).', 'Acompanhe visualmente o objeto em movimento da esquerda para a direita mantendo os olhos fixos na linha central de sincronização.', 'Observe se há rastros escuros trailing (ghosting) ou bordas claras brilhantes invertidas (overshoot por overdrive excessivo).'],
      uses: ['Ajuste fino do nível de overdrive (Response Time) no menu OSD do monitor para eliminar ghosting sem introduzir overshoot.', 'Verificação de estabilidade de taxa de quadros (FPS) e consistência de tempo de quadro (frame time pacing).', 'Comparação de clareza de movimento em taxas de atualização de 60Hz, 120Hz, 144Hz, 165Hz, 240Hz e 360Hz.'],
      limitations: 'O resultado depende do navegador, do sistema e da taxa configurada. A ferramenta não mede tempo de resposta físico, latência total ou MPRT em milissegundos. Essas medições exigem instrumentos e um procedimento controlado.',
      faq: [
        ['Qual a diferença entre GtG e MPRT?', 'GtG (Gray-to-Gray) mede o tempo físico que os cristais líquidos ou diodos levam para mudar de cor. MPRT (Motion Picture Response Time) mede a persistência da imagem na retina decorrente do princípio sample-and-hold.'],
        ['Como corrigir o rastro brilhante (overshoot)?', 'O overshoot é causado por tensão elétrica excessiva aplicada aos pixels (overdrive agressivo). No menu do seu monitor, reduza o nível de Response Time / Overdrive de "Fastest/Extreme" para "Normal/Fast".']
      ],
      methodology: [
        'A animação usa `window.requestAnimationFrame`, agendado antes das repinturas do navegador. Sua cadência costuma acompanhar o display, mas pode ser limitada pelo sistema e por abas em segundo plano.',
        'A telemetria observa intervalos de animação para indicar variações de cadência. Ela não elimina engasgos nem confirma a apresentação física de cada quadro.',
        'Os padrões de contraste em três faixas reproduzem as transições críticas de engenharia de painéis: escuro para cinza (revela black smearing em painéis VA), cinza médio (revela overdrive overshoot) e claro (revela retenção de tempo de resposta em transições simétricas).'
      ]
    },
    en: {
      intro: 'A canvas animation for visually inspecting trails, blur and overdrive artifacts. Telemetry describes browser callback cadence; it does not measure physical GtG or MPRT.',
      steps: ['Select motion speed (recommended: 480 or 960 px/s) and your desired visual pattern (high-contrast blocks, readable text, or dark transition).', 'Track the moving object smoothly from left to right, focusing on the central pursuit synchronization mark.', 'Examine trailing dark shadows (ghosting) or bright inverse halos (overshoot caused by aggressive overdrive).'],
      uses: ['Tuning monitor overdrive / response time settings in the OSD menu to eliminate trailing without introducing inverse ghosting.', 'Verifying frame rate stability and frame time consistency across high-refresh-rate displays.', 'Evaluating dynamic motion clarity across 60Hz, 120Hz, 144Hz, 165Hz, 240Hz, and 360Hz panels.'],
      limitations: 'Results depend on the browser, operating system and configured refresh rate. The tool does not measure physical response time, total latency or MPRT in milliseconds. Those measurements require instruments and a controlled procedure.',
      faq: [
        ['What is the difference between GtG and MPRT?', 'GtG (Gray-to-Gray) measures the physical transition time of liquid crystals or diodes. MPRT (Motion Picture Response Time) measures perceived retinal blur caused by sample-and-hold display persistence.'],
        ['How do I fix bright halos (overshoot)?', 'Overshoot is caused by excessive voltage applied to accelerate pixel transitions. In your monitor’s OSD menu, reduce the Overdrive / Response Time setting from "Extreme" to "Fast" or "Normal".']
      ],
      methodology: [
        'The animation uses `window.requestAnimationFrame`, scheduled before browser repaints. Cadence usually follows the display, but system conditions and background tabs may limit it.',
        'Telemetry observes animation intervals to indicate cadence variation. It cannot prevent stuttering or confirm physical presentation of each frame.',
        'Three-tiered background luminance tracks replicate critical display engineering transitions: dark-to-gray (identifies VA black smearing), mid-gray (identifies overdrive corona/overshoot), and high-key (evaluates symmetric rise/fall times).'
      ]
    }
  },
  'touch-tester': {
    related: ['dead-pixel-test', 'screen-cleaner'],
    pt: {
      intro: 'Este teste interativo mapeia a precisão do digitalizador (touchscreen) de celulares, tablets e monitores interativos. Ele permite detectar áreas insensíveis (zonas mortas), toques fantasmas e avaliar o suporte máximo ao multi-toque.',
      steps: ['Toque e arraste os dedos por toda a área da tela para pintar as células.', 'Se alguma célula não mudar de cor, você localizou uma possível zona morta no sensor touch.', 'Para testar o limite de multi-toque, posicione vários dedos simultaneamente até que o contador pare de subir.'],
      uses: ['Identificação de danos físicos ou flexíveis rompidos no display do celular ou tablet.', 'Teste de resposta ao toque após a substituição de uma tela (reparo de hardware).', 'Diagnóstico de "touch fantasma" (ghost touch) ao deixar o dispositivo imóvel.', 'Verificação da especificação do fabricante sobre o limite simultâneo de toques.'],
      limitations: 'Depende das permissões da API de toque do navegador e de reservas do SO. No iOS ou Android, gestos de navegação do sistema podem interceptar o toque.',
      faq: [
        ['Por que meu celular de "10 toques" só registra 3 dedos aqui?', 'Muitos sistemas operacionais (especialmente Android customizados) interceptam toques com 3 ou 4 dedos para funções globais do sistema. Desative esses atalhos se quiser testar a capacidade bruta do hardware no navegador.'],
        ['Este teste diz se minha tela está quebrada?', 'Ele mostra onde o navegador não recebeu contato durante a sessão. Repita o teste e descarte interferências de software, película, umidade ou configuração antes de atribuir o resultado ao hardware.']
      ],
      methodology: [
        'O digitalizador capacitivo é uma fina camada transparente sobreposta ao painel LCD ou OLED. Ele projeta um campo eletrostático que sofre deformação ao ser tocado por um material condutivo.',
        'A API nativa "Touch Events" dos navegadores traduz essas interações de hardware para eventos do DOM (`touchstart`, `touchmove`, `touchend`). O Motor do MonitorSmith rastreia o ciclo de vida individual de cada dedo ativo.',
        'Zonas mortas (dead zones) representam trilhas de capacitores rompidas na matriz física. O teste de "Touch Fantasma" aproveita esse mesmo registro de eventos passivos.'
      ]
    },
    en: {
      intro: 'This interactive tool maps the digitizer accuracy of smartphones, tablets, and touch monitors. It helps detect unresponsive regions (dead zones), ghost touches, and evaluates multi-touch limits.',
      steps: ['Tap and drag your fingers across the entire screen area to paint the grid cells.', 'If any cell remains unaffected, you have found a potential digitizer dead zone.', 'To test the multi-touch threshold, press multiple fingers simultaneously until the counter stops registering.'],
      uses: ['Identifying hardware damage or broken flex cables in mobile displays.', 'Post-repair touch response validation after replacing a cracked screen.', 'Diagnosing "ghost touch" issues by leaving the device motionless.', 'Verifying manufacturer specifications for concurrent touch points.'],
      limitations: 'Reliant on browser Touch API implementation and OS reservations. System navigation gestures (like edge swipes or 3/4 finger actions on iOS/Android) may intercept events.',
      faq: [
        ['Why does my "10-point touch" phone only log 3 fingers here?', 'Many operating systems intercept 3 or 4-finger gestures for global system shortcuts. Disable these OS-level shortcuts if you want to test raw hardware capability in the browser.'],
        ['Does this test confirm my screen is broken?', 'It shows exactly where the digitizer fails to register electrical contact, which strongly indicates a hardware defect in the touch layer.']
      ],
      methodology: [
        'A capacitive digitizer is a transparent mesh overlay on top of the LCD or OLED panel. It creates an electrostatic field that deforms upon contact with a conductive object.',
        'The native browser Touch Events API translates hardware interactions into DOM events (`touchstart`, `touchmove`, `touchend`). MonitorSmith tracks the individual lifecycle of each active finger.',
        'Dead zones represent physically severed capacitor traces in the matrix. Ghost touch testing leverages this same passive event logging.'
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
        'O MonitorSmith foi desenvolvido para fornecer um conjunto integrado de utilitários de alta precisão para inspeção visual de telas, testes de uniformidade, calibração preliminar de cores e produtividade em múltiplos monitores.',
        'O MonitorSmith reúne ferramentas executadas no navegador com HTML, Canvas, Web Audio API, High Resolution Time API e Service Workers, sem exigir a instalação de um aplicativo nativo.',
      ]],
      ['2. Processamento local e privacidade', [
        'Todas as operações — desde a sintetização espectral de ruído marrom até a renderização de teleprompter e rotação de logotipos em modo tela cheia — são processadas localmente na GPU e CPU do dispositivo do usuário.',
        'As ferramentas processam texto, imagens e leituras de dispositivos localmente. A hospedagem recebe requisições de acesso, e serviços de publicidade podem receber dados após consentimento, conforme a política de privacidade.',
      ]],
      ['3. Padrões Técnicos e Normas de Referência', [
        'As ferramentas e publicações técnicas do MonitorSmith fundamentam-se em padrões e normas consolidadas da indústria de displays e acústica:',
        '• ISO 9241-307:2008: Métodos de análise ergonômica e limites de tolerância para defeitos de subpixels (pixels mortos, presos e luminosos) em painéis LCD (IPS/VA/TN).',
        '• IEC 61966-2-1: Especificação padrão do espaço de cor sRGB e curva eletro-óptica de Gama 2.2.',
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
        'O navegador pode utilizar recursos locais como localStorage, Cache Storage e Service Worker exclusivamente para salvar tema visual, preferências de interface e arquivos necessários ao funcionamento offline do Progressive Web App (PWA).',
        'Imagens adicionadas ao Loop de Marcas permanecem apenas na memória temporária da aba aberta e são automaticamente descartadas ao encerrar ou recarregar a ferramenta. O usuário pode limpar dados de navegação, cookies e cache a qualquer momento nas configurações do seu navegador.',
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
        'Como as ferramentas operam no modelo client-side sem cadastro obrigatório, nenhuma informação pessoal identificável é mantida em bases de dados da EXVORN.TECH.',
        `Para esclarecimentos sobre privacidade, solicitações institucionais ou exercício de direitos sob a Lei Geral de Proteção de Dados (LGPD), utilize o canal institucional em ${SITE_METADATA.contactUrl} ou envie e-mail para contato@exvorn.tech.`,
      ]],
      ['6. Atualizações desta Política', [
        `Esta política foi revisada em 6 de junho de 2026 e reflete a operação atual da plataforma. Alterações materiais serão publicadas nesta mesma URL.`,
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
      ['5. Contato e Vigência', [`Revisão vigente desde 18 de agosto de 2026. Para dúvidas e contato institucional, acesse ${SITE_METADATA.contactUrl} ou contato@exvorn.tech.`]],
    ],
  },
  {
    slug: 'cookies',
    title: 'Política de Cookies e Consentimento — MonitorSmith',
    description: 'Quais cookies e armazenamentos locais o MonitorSmith utiliza, como funciona o Consent Mode v2 do Google e como revogar o consentimento de publicidade a qualquer momento.',
    h1: 'Política de Cookies e Consentimento',
    sections: [
      ['1. O que usamos e por quê', [
        'O MonitorSmith é uma aplicação que roda no navegador e depende de muito pouco armazenamento. Usamos três recursos locais essenciais: localStorage para lembrar o tema visual, o idioma da interface e a sua decisão de consentimento; Cache Storage e Service Worker para permitir que as ferramentas funcionem offline depois da primeira visita.',
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
        'Por decisão de produto e por conformidade com as políticas do Google Publisher, unidades de anúncio existem apenas em páginas com conteúdo editorial próprio: a página inicial, os guias técnicos de cada instrumento e os artigos do blog.',
        'Nenhum anúncio é exibido sobre as superfícies de teste em tela cheia, sobre padrões de calibração, sobre a tela preta ou em qualquer estado da aplicação sem conteúdo textual. Também não há anúncios intersticiais, pop-ups, camadas que induzem cliques acidentais ou elementos que se sobrepõem aos controles das ferramentas.',
      ]],
      ['5. Como revogar ou alterar o consentimento', [
        'Você pode mudar a sua escolha quando quiser: no rodapé de qualquer página, use o link "Preferências de privacidade" para reabrir o painel de consentimento e ajustar cada categoria separadamente.',
        'Também é possível desativar a personalização diretamente no Google, em https://www.google.com/settings/ads, ou apagar todos os dados locais deste site pelas configurações do seu navegador — nesse caso, o banner de consentimento voltará a aparecer na próxima visita.',
      ]],
      ['6. Vigência e contato', [
        'Esta política de cookies vigora desde 6 de junho de 2026. Dúvidas sobre cookies, consentimento ou exercício de direitos podem ser enviadas para contato@exvorn.tech.',
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
        'Toda ferramenta do MonitorSmith declara o seu limite técnico na própria interface. Um navegador não mede luminância em cd/m², não lê o EDID completo do painel e não substitui colorímetro, sonda de contraste ou laudo laboratorial. O que ele faz muito bem é gerar padrões precisos, contar tempo com exatidão e aplicar contas determinísticas.',
        'Essa honestidade é deliberada: um diagnóstico visual útil depende de o leitor saber exatamente qual conclusão o teste sustenta e qual não sustenta.',
      ]],
      ['2. Renderização dos padrões', [
        'Os padrões são desenhados em elementos canvas ou em superfícies CSS de cor sólida, sempre em valores absolutos de sRGB de 8 bits, sem gradiente decorativo, sombra ou filtro sobre a área de teste. Quando um degrau de 5% é solicitado, o valor enviado ao painel é exatamente o código digital 13.',
        'As animações de movimento — como o teste de ghosting e o exercitador de pixels — são sincronizadas com o VSync do display através de requestAnimationFrame, para que cada quadro corresponda a uma composição real e não a um temporizador aproximado.',
      ]],
      ['3. Medição de tempo', [
        'As medições temporais usam `performance.now()`, um relógio monotônico cuja precisão disponível pode ser reduzida pelo navegador por segurança e privacidade. Isso evita saltos causados por ajuste do relógio civil, mas não remove atrasos de agendamento.',
        'A taxa de atualização é obtida contando quadros entregues em uma janela de amostragem e dividindo pelo intervalo decorrido; o jitter é o desvio padrão dos intervalos entre quadros. Nenhum valor é suavizado ou interpolado antes de aparecer na tela.',
      ]],
      ['4. Cálculos ópticos', [
        'As calculadoras aplicam óptica geométrica clássica. A densidade de pixels vem da diagonal em pixels dividida pela diagonal física; o dot pitch é o inverso da densidade convertido para milímetros; a distância de acuidade usa o padrão Snellen 20/20, equivalente a um minuto de arco de resolução angular.',
        'A banda de vídeo parte da taxa de pixels multiplicada pela profundidade de bits dos três canais, com aproximadamente 5% de blanking, coerente com os timings CVT-RB v2 da VESA. Todos os resultados são reproduzíveis à mão com as mesmas fórmulas.',
      ]],
      ['5. Normas e especificações de referência', [
        '• ISO 9241-307 — critérios de defeitos de pixels e classes de tolerância de painéis.',
        '• ISO 9241-303 e 9241-3 — requisitos ergonômicos de displays eletrônicos.',
        '• IEC 61966-2-1 — definição do espaço de cor sRGB e curva de gama 2.2.',
        '• ITU-R BT.709 e BT.1886 — colorimetria e função de transferência eletro-óptica para vídeo.',
        '• VESA CVT-RB v2, Adaptive-Sync e Display Stream Compression — timings, taxa variável e compressão.',
        '• W3C High Resolution Time, Media Queries Level 4/5, Gamepad, Pointer Events e Web Audio — as APIs que sustentam cada instrumento.',
        '• WCAG 2.2 — referência para contraste, navegação e acessibilidade; sem declaração de certificação integral.',
      ]],
      ['6. Revisão e autoria', [
        'Pesquisa, implementação e revisão técnica são conduzidas pela equipe de engenharia da EXVORN.TECH, estúdio responsável pelo produto. Correções e contestações técnicas são bem-vindas em contato@exvorn.tech e resultam em atualização datada desta página.',
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
        'Todo o conteúdo publicado no MonitorSmith — instrumentos, guias técnicos e artigos — tem finalidade informativa e educacional. Ele apoia a observação humana e o diagnóstico preliminar, mas não constitui laudo técnico, perícia, certificação, consultoria profissional ou garantia de resultado.',
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
        'O site é sustentado por publicidade veiculada por meio do Google AdSense. Anunciantes não têm qualquer influência sobre o conteúdo técnico, as recomendações ou os limites declarados em cada ferramenta.',
        'Anúncios são sempre rotulados como publicidade e aparecem apenas em páginas com conteúdo editorial, nunca sobre as superfícies de teste.',
      ]],
      ['6. Limitação de responsabilidade e contato', [
        'Na máxima extensão permitida pela legislação aplicável, a EXVORN.TECH não responde por danos diretos ou indiretos decorrentes do uso ou da impossibilidade de uso das ferramentas e do conteúdo deste site.',
        'Este aviso vigora desde 6 de junho de 2026. Contato para questões legais: contato@exvorn.tech.',
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
        'A interface é operável inteiramente por teclado, respeita a preferência prefers-reduced-motion do sistema e expõe rótulos programáticos em todos os controles interativos.',
      ]],
      ['2. Recursos implementados', [
        '• Navegação completa por teclado, com foco visível de alto contraste em todos os elementos interativos.',
        '• Atalhos de uma tecla para abrir instrumentos, além de Esc para sair e F para alternar tela cheia.',
        '• Estrutura semântica com marcos de página, hierarquia de títulos consistente e textos alternativos nas imagens informativas.',
        '• Redução automática de animações quando o sistema operacional sinaliza preferência por menos movimento.',
        '• Tema claro e tema escuro, ambos com contraste verificado, e interface disponível em português, inglês e espanhol.',
      ]],
      ['3. Limitações conhecidas e inerentes', [
        'Alguns instrumentos são, por natureza, visuais: identificar um pixel preso, avaliar uniformidade de cinza ou julgar banding depende de percepção visual e não pode ser traduzido em texto equivalente. Nesses casos, a página descreve o objetivo, o procedimento e a interpretação do resultado em linguagem clara.',
        'Ferramentas com padrões em movimento ou piscadas rápidas trazem aviso explícito de fotossensibilidade e controles para reduzir velocidade e brilho.',
        'Instrumentos que dependem de hardware específico — controle, microfone, câmera — informam quando a API não está disponível no navegador, em vez de falhar silenciosamente.',
      ]],
      ['4. Tecnologias assistivas testadas', [
        'A interface é verificada com navegação exclusivamente por teclado e com leitores de tela em configuração padrão no Windows e no macOS. Relatos de incompatibilidade com outras combinações são tratados como defeito prioritário.',
      ]],
      ['5. Como relatar uma barreira', [
        'Se você encontrar qualquer barreira de acessibilidade, escreva para contato@exvorn.tech descrevendo a página, o navegador, a tecnologia assistiva usada e o que aconteceu. Respondemos e registramos a correção com data nesta página.',
        'Declaração revisada em 6 de junho de 2026.',
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
      dateModified: SITE_METADATA.contentLastModified,
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
      <span>${isEn ? 'By' : 'Por'} <strong>EXVORN.TECH — Display Analysis</strong></span>
      <span>•</span>
      <time datetime="${SITE_METADATA.contentLastModified}">${isEn ? 'Updated August 18, 2026' : 'Atualizado em 18 de agosto de 2026'}</time>
    </div>
    <p class="intro">${escapeHtml(content.intro)}</p>
    <a class="cta" href="/?tool=${encodeURIComponent(route.toolId)}">${labels.open}</a>
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
  <footer><a href="/">${labels.back}</a><a href="/blog/">Blog</a><a href="/sobre/">${isEn ? 'About' : 'Sobre'}</a><a href="/contato/">${isEn ? 'Contact' : 'Contato'}</a><a href="/metodologia/">${isEn ? 'Methodology' : 'Metodologia'}</a><a href="/privacidade/">${labels.privacy}</a><a href="/termos/">${labels.terms}</a><a href="/cookies/">Cookies</a><a href="/aviso-legal/">${isEn ? 'Disclaimer' : 'Aviso legal'}</a><a href="/acessibilidade/">${isEn ? 'Accessibility' : 'Acessibilidade'}</a></footer>${CONSENT_BODY_SCRIPT}
</body>
</html>`;
  return html;
}

function formatLegalParagraph(paragraph) {
  const escaped = escapeHtml(paragraph);
  return escaped.replace(/(https?:\/\/[^\s)]+|www\.[^\s)]+)/g, (url) => {
    const href = url.startsWith('http') ? url : `https://${url}`;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
}

function renderLegalPage(page) {
  const url = `${BASE_URL}/${page.slug}/`;
  const schema = { '@context': 'https://schema.org', '@type': 'WebPage', name: page.title, description: page.description, url, inLanguage: 'pt-BR', dateModified: SITE_METADATA.contentLastModified, isPartOf: { '@type': 'WebSite', name: SITE_METADATA.name, url: `${BASE_URL}/` }, publisher: { '@type': 'Organization', name: SITE_METADATA.owner, url: 'https://exvorn.tech/' } };
  const sections = page.sections.map(([heading, paragraphs]) => `<section><h2>${escapeHtml(heading)}</h2>${paragraphs.map((paragraph) => `<p>${formatLegalParagraph(paragraph)}</p>`).join('')}</section>`).join('');
  const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>${escapeHtml(page.title)}</title><meta name="description" content="${escapeHtml(page.description)}"><meta name="theme-color" content="#030304"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1"><link rel="canonical" href="${url}"><link rel="alternate" hreflang="pt-BR" href="${url}"><link rel="alternate" hreflang="x-default" href="${url}"><link rel="icon" href="/logo.png" type="image/png"><link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest"><link rel="describedby" href="/llms.txt" type="text/markdown"><meta property="og:title" content="${escapeHtml(page.title)}"><meta property="og:description" content="${escapeHtml(page.description)}"><meta property="og:url" content="${url}"><meta property="og:type" content="website"><meta property="og:site_name" content="MonitorSmith"><meta property="og:locale" content="pt_BR"><meta property="og:image" content="${BASE_URL}/og-image.jpg"><meta property="og:image:secure_url" content="${BASE_URL}/og-image.jpg"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="MonitorSmith — informações legais e de privacidade"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(page.title)}"><meta name="twitter:description" content="${escapeHtml(page.description)}"><meta name="twitter:image" content="${BASE_URL}/og-image.jpg"><meta name="twitter:image:alt" content="MonitorSmith — informações legais e de privacidade">${CONSENT_HEAD_SCRIPT}<script type="application/ld+json">${safeJson(schema)}</script>
<style>:root{color-scheme:dark;--bg:#030304;--surface:#0a0b0f;--text:#f5f5f5;--muted:#b9bbc4;--line:rgba(255,255,255,.1);--accent:#f59e0b}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.7 Outfit,ui-sans-serif,system-ui,-apple-system,sans-serif;padding-bottom:env(safe-area-inset-bottom)}header,main,footer{width:min(760px,calc(100% - 2rem));margin-inline:auto}header{padding:1.2rem 0;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line)}a{color:#fbbf24;text-underline-offset:.2em}header a{color:var(--text);font-weight:750;text-decoration:none;display:inline-flex;align-items:center;min-height:44px;padding:0.4rem 0.6rem;border-radius:0.5rem}main{padding:3rem 0}h1{font-size:clamp(2rem,6vw,3rem);line-height:1.1;letter-spacing:-.035em}h2{font-size:1.2rem;margin:2.2rem 0 .5rem}p{color:var(--muted)}.notice{padding:1rem;background:var(--surface);border:1px solid var(--line);border-radius:.8rem}footer{padding:1.5rem 0 3rem;border-top:1px solid var(--line);display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center}footer a{display:inline-flex;align-items:center;min-height:44px;padding:0.5rem 0.85rem;border-radius:0.6rem;background:rgba(255,255,255,0.04);border:1px solid var(--line);color:var(--text);text-decoration:none;font-size:0.88rem;transition:background 0.15s, border-color 0.15s}footer a:hover{background:rgba(251,191,36,0.12);border-color:var(--accent);color:#fbbf24}:focus-visible{outline:3px solid var(--accent);outline-offset:4px}@media(max-width:640px){footer a{flex:1 1 calc(50% - 0.5rem);justify-content:center;text-align:center}}</style></head>
<body><header><a href="/">MonitorSmith · EXVORN.TECH</a><a href="/">← Todas as ferramentas</a></header><main><h1>${escapeHtml(page.h1)}</h1><p class="notice">Este documento descreve a operação atual do MonitorSmith. Em caso de dúvida, entre em contato antes de continuar o uso.</p>${sections}</main><footer><a href="/">Todas as ferramentas</a><a href="/blog/">Blog</a><a href="/sobre/">Sobre</a><a href="/contato/">Contato</a><a href="/metodologia/">Metodologia</a><a href="/privacidade/">Privacidade</a><a href="/termos/">Termos de uso</a><a href="/cookies/">Cookies</a><a href="/aviso-legal/">Aviso legal</a><a href="/acessibilidade/">Acessibilidade</a></footer>${CONSENT_BODY_SCRIPT}</body></html>`;
  return html;
}

function renderBlogArticle(article) {
  const pageUrl = `${BASE_URL}/blog/${article.slug}/`;
  const documentTitle = `${article.title} | ${SITE_METADATA.name}`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const relatedHtml = (article.relatedSlugs || []).filter((s) => BLOG_SLUG_SET.has(s)).map((s) => {
    const rel = BLOG_ARTICLES.find((a) => a.slug === s);
    return rel ? `<li><a href="/blog/${rel.slug}/">${escapeHtml(rel.h1)}</a></li>` : '';
  }).join('');
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    headline: article.h1,
    description: article.description,
    inLanguage: 'pt-BR',
    datePublished: '2026-08-10',
    dateModified: SITE_METADATA.contentLastModified,
    author: { '@type': 'Organization', name: SITE_METADATA.owner, url: 'https://exvorn.tech/' },
    publisher: { '@type': 'Organization', name: SITE_METADATA.owner, url: 'https://exvorn.tech/' },
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
  <title>${escapeHtml(documentTitle)}</title>
  <meta name="description" content="${escapeHtml(article.description)}">
  <meta name="theme-color" content="#030304">
  <meta name="author" content="EXVORN.TECH">
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
    main{padding:clamp(2rem,6vw,4rem) 0}h1{font-size:clamp(1.8rem,6vw,3rem);line-height:1.1;letter-spacing:-.03em;margin:0 0 1rem}h2{font-size:1.25rem;margin:2rem 0 .7rem}h3{font-size:1.1rem;margin:1.5rem 0 .5rem}
    .editorial-byline{display:flex;gap:.75rem;align-items:center;font-size:.85rem;color:var(--muted);margin-bottom:1.5rem;padding-bottom:.75rem;border-bottom:1px solid var(--line);flex-wrap:wrap}
    .cta-group{display:flex;gap:1rem;margin:2.5rem 0;flex-wrap:wrap;justify-content:flex-start}
    .cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0.9rem 1.4rem;border-radius:.85rem;background:var(--accent);color:#171006;font-weight:800;text-decoration:none;transition:transform .15s, box-shadow .15s}.cta:hover{transform:scale(1.03);box-shadow:0 0 15px rgba(245,158,11,0.4)}
    .cta.secondary{background:var(--surface);color:var(--text);border:1px solid var(--line)}.cta.secondary:hover{border-color:var(--accent);box-shadow:0 0 15px rgba(255,255,255,0.05)}
    .blog-body p{color:var(--muted);margin:1rem 0}.blog-body h2{color:var(--text)}.blog-body h3{color:var(--text)}.blog-body ul,.blog-body ol{color:var(--muted);padding-left:1.5rem}.blog-body li{margin:.4rem 0}
    .blog-body table{width:100%;max-width:100%;overflow-x:auto;display:block;border-collapse:collapse;margin:1.5rem 0}
    .blog-body pre,.blog-body code{max-width:100%;overflow-x:auto}
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
  <header><a href="/">MonitorSmith · EXVORN.TECH</a><a href="/">← Todas as ferramentas</a></header>
  <main>
    <h1>${escapeHtml(article.h1)}</h1>
    <div class="editorial-byline">
      <span>Por <strong>EXVORN.TECH — Display Analysis</strong></span>
      <span>•</span>
      <time datetime="${SITE_METADATA.contentLastModified}">Atualizado em 18 de agosto de 2026</time>
    </div>
    <div class="blog-body">${article.body}</div>
    <div class="cta-group">
      <a class="cta" href="/?tool=${encodeURIComponent(article.toolId)}">Experimentar Ferramenta →</a>
      <a class="cta secondary" href="/blog/">Ver todas as matérias 📚</a>
    </div>
    ${faqHtml}
    ${relatedHtml ? `<section><h2>Leia também</h2><div class="related-grid"><ul>${relatedHtml}</ul></div></section>` : ''}
  </main>
  <footer><a href="/">Todas as ferramentas</a><a href="/blog/">Blog</a><a href="/sobre/">Sobre</a><a href="/contato/">Contato</a><a href="/metodologia/">Metodologia</a><a href="/privacidade/">Privacidade</a><a href="/termos/">Termos de uso</a><a href="/cookies/">Cookies</a><a href="/aviso-legal/">Aviso legal</a><a href="/acessibilidade/">Acessibilidade</a></footer>${CONSENT_BODY_SCRIPT}
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
    isPartOf: { '@type': 'WebSite', name: SITE_METADATA.name, url: `${BASE_URL}/` },
    publisher: { '@type': 'Organization', name: SITE_METADATA.owner, url: 'https://exvorn.tech/' },
  };
  const cards = BLOG_ARTICLES.map((article) => `<a href="/blog/${article.slug}/" class="card"><h2>${escapeHtml(article.h1)}</h2><p>${escapeHtml(article.description)}</p></a>`).join('');
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
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
    main{padding:clamp(2rem,6vw,4rem) 0}h1{font-size:clamp(2rem,7vw,3.5rem);line-height:1.04;letter-spacing:-.04em;margin:0 0 .5rem}.subtitle{color:var(--muted);font-size:1.1rem;margin-bottom:2rem}
    .grid{display:grid;gap:1.25rem;grid-template-columns:repeat(auto-fill,minmax(280px,1fr))}
    .card{display:flex;flex-direction:column;justify-content:center;padding:1.5rem;background:var(--surface);border:1px solid var(--line);border-radius:1.25rem;text-decoration:none;transition:border-color .2s,transform .15s,box-shadow .2s;min-height:120px}.card:hover{border-color:var(--accent);transform:translateY(-3px);box-shadow:0 10px 30px rgba(0,0,0,0.4)}
    .card h2{font-size:1.15rem;line-height:1.3;margin:0 0 .75rem;color:var(--text)}.card p{font-size:.95rem;color:var(--muted);margin:0;line-height:1.6}
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
  <header><a href="/">MonitorSmith · EXVORN.TECH</a><a href="/">← Todas as ferramentas</a></header>
  <main>
    <h1>Blog</h1>
    <p class="subtitle">Artigos técnicos, engenharia de displays e guias práticos sobre monitores e produtividade.</p>
    <div class="grid">${cards}</div>
  </main>
  <footer><a href="/">Todas as ferramentas</a><a href="/blog/">Blog</a><a href="/sobre/">Sobre</a><a href="/contato/">Contato</a><a href="/metodologia/">Metodologia</a><a href="/privacidade/">Privacidade</a><a href="/termos/">Termos de uso</a><a href="/cookies/">Cookies</a><a href="/aviso-legal/">Aviso legal</a><a href="/acessibilidade/">Acessibilidade</a></footer>${CONSENT_BODY_SCRIPT}
</body>
</html>`;
}

function generateSitemapXml() {
  const urls = [];
  urls.push({ loc: `${BASE_URL}/`, lastmod: SITE_METADATA.contentLastModified, changefreq: 'weekly', priority: '1.0' });
  urls.push({ loc: `${BASE_URL}/blog/`, lastmod: SITE_METADATA.contentLastModified, changefreq: 'weekly', priority: '0.9' });

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
    urls.push({ loc: `${BASE_URL}/blog/${article.slug}/`, lastmod: SITE_METADATA.contentLastModified, changefreq: 'monthly', priority: '0.7' });
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
    .map((tool) => `- [${tool.title}](${BASE_URL}${tool.seoPages?.[0] ? `/${tool.seoPages[0].pt.slug}/` : `/?tool=${tool.id}`}): ${tool.description}`)
    .join('\n')}`).join('\n\n');
  return `# MonitorSmith

> Suíte de utilitários web para inspeção visual de displays, iluminação e produtividade, por EXVORN.TECH.

${tools}

## Artigos e Guias Técnicos
- [Blog do MonitorSmith](https://monitorsmith.app/blog/): Artigos sobre tecnologia de displays, calibração e produtividade.

## Informações Institucionais e Legais
- [Sobre o MonitorSmith](https://monitorsmith.app/sobre/): Propósito, arquitetura client-side e padrões de engenharia de displays da EXVORN.TECH.
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

  for (const article of BLOG_ARTICLES) {
    const articleDir = path.join(blogDir, article.slug);
    await fs.mkdir(articleDir, { recursive: true });
    const html = renderBlogArticle(article);
    await fs.writeFile(path.join(articleDir, 'index.html'), html, 'utf8');
    generatedFiles.push(`/blog/${article.slug}/`);
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
    `SEO/GEO: ${TOOL_COUNT} ferramentas, ${SEO_PAGE_ROUTES.length * 2} guias localizados, ${BLOG_ARTICLES.length} artigos de blog e ${generatedFiles.length} páginas geradas; ${generatedFiles.length + 1} URLs com a home do Vite.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
