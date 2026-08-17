import fs from 'node:fs/promises';
import path from 'node:path';

import {
  PWA_SHORTCUTS,
  SEO_PAGE_ROUTES,
  SITE_METADATA,
  TOOL_COUNT,
  TOOLS_REGISTRY,
  validateToolsRegistry,
} from '../src/constants/tools.js';

import blogInspection from './blog-articles-inspection.mjs';
import blogCalibration from './blog-articles-calibration.mjs';
import blogProductivity from './blog-articles-productivity.mjs';

const BASE_URL = SITE_METADATA.baseUrl;
const DIST_DIR = path.resolve(process.cwd(), 'dist');

const BLOG_ARTICLES = [...blogInspection, ...blogCalibration, ...blogProductivity];
const BLOG_SLUG_SET = new Set(BLOG_ARTICLES.map((a) => a.slug));

const EDITORIAL_CONTENT = Object.freeze({
  'black-screen': {
    related: ['dead-pixel-test', 'screen-cleaner', 'monitor-test'],
    pt: {
      intro: 'Uma superfície preta ajuda a observar uniformidade, pixels luminosos, IPS glow e vazamento de luz (backlight bleed) em um ambiente escuro. Em OLED, pixels pretos tendem a emitir pouca ou nenhuma luz; o comportamento exato depende do painel e do processamento do dispositivo. O IPS glow muda com o ângulo de visão, enquanto o backlight bleed tende a permanecer fixo.',
      steps: ['Abra a ferramenta e solicite tela cheia.', 'Reduza a iluminação do ambiente sem alterar o ângulo normal de uso.', 'Observe o centro, as bordas e os cantos. Mova levemente o ângulo para distinguir glow de manchas fixas. Pressione Esc para encerrar.'],
      uses: ['Inspeção visual de pixels claros, IPS glow e backlight bleed.', 'Conferência de um monitor novo durante o prazo de devolução.', 'Comparação do comportamento de dois painéis sob as mesmas condições.', 'Redução temporária de luz e distrações em um monitor secundário.'],
      limitations: 'Em LCD, a luz de fundo permanece ativa. Em OLED, a emissão em preto depende do painel e do processamento. A ferramenta não mede energia, contraste ou nível de preto e não garante proteção contra burn-in. Câmeras costumam exagerar brilho em cenas escuras.',
      faq: [['Isso economiza energia?', 'Conteúdo escuro pode reduzir consumo em alguns painéis OLED, mas o efeito varia com dispositivo, brilho e conteúdo. O MonitorSmith não mede energia.'], ['Isso identifica backlight bleed e IPS glow?', 'Ajuda a observar áreas claras em um ambiente escuro, mas não determina causa, tolerância de fábrica ou necessidade de reparo. O IPS glow varia com o ângulo, enquanto o backlight bleed é mais fixo nas bordas.']],
    },
    en: {
      intro: 'A black surface helps you observe uniformity, bright pixels, IPS glow and backlight bleed in a dark room. On OLED displays, black pixels tend to emit little or no light; exact behavior depends on the panel and device processing. IPS glow changes with viewing angle, while backlight bleed tends to remain fixed.',
      steps: ['Open the tool and request fullscreen.', 'Dim the room without changing your normal viewing angle.', 'Observe the center, edges and corners. Change your viewing angle slightly to distinguish glow from fixed patches. Press Escape to finish.'],
      uses: ['Visual inspection of bright pixels, IPS glow and backlight bleed.', 'Checking a new display during its return period.', 'Comparing two panels under the same conditions.', 'Temporary reduction of light and distractions on a secondary display.'],
      limitations: 'LCD backlights remain active. OLED black emission depends on the panel and processing. The tool does not measure energy, contrast or black level and cannot guarantee burn-in protection. Cameras often exaggerate brightness in dark scenes.',
      faq: [['Does this save energy?', 'Dark content can reduce power use on some OLED panels, but the effect varies with device, brightness and content. MonitorSmith does not measure energy.'], ['Does it identify backlight bleed and IPS glow?', 'It helps you observe bright areas in a dark room, but it cannot determine cause, factory tolerance or whether repair is needed. IPS glow varies with angle, while bleed is fixed.']],
    },
  },
  'dead-pixel-test': {
    related: ['monitor-test', 'black-screen', 'display-calibration'],
    pt: {
      intro: 'Cores sólidas tornam mais fácil localizar pontos que permanecem apagados, luminosos ou presos em uma cor. Limpe a superfície antes do teste para não confundir poeira com defeito do painel.',
      steps: ['Abra o teste em tela cheia.', 'Percorra vermelho, verde, azul, ciano, magenta, amarelo, branco e preto.', 'Examine toda a área a uma distância confortável e repita qualquer resultado suspeito.'],
      uses: ['Inspeção de monitor, celular ou tablet novo ou usado.', 'Revisão antes do fim do prazo de devolução ou garantia.'],
      limitations: 'É uma inspeção visual, não um diagnóstico eletrônico. Ela não conserta pixels e não determina a política de tolerância do fabricante.',
      faq: [['Qual é a diferença entre pixel morto e preso?', 'Um ponto apagado em todas as cores pode indicar pixel morto; um ponto que mantém uma cor pode indicar subpixel preso. Sujeira e escala também podem enganar.'], ['Uma página web consegue reparar pixels?', 'Não há reparo garantido. Repita a inspeção e consulte fabricante ou assistência antes de aplicar qualquer procedimento físico.']],
    },
    en: {
      intro: 'Solid colors make it easier to locate points that remain dark, bright or stuck on one color. Clean the surface first so dust is not confused with a panel defect.',
      steps: ['Open the test fullscreen.', 'Cycle through red, green, blue, cyan, magenta, yellow, white and black.', 'Inspect the entire area at a comfortable distance and repeat any suspicious result.'],
      uses: ['Inspecting a new or used monitor, phone or tablet.', 'Reviewing a display before a return or warranty period ends.'],
      limitations: 'This is a visual inspection, not an electronic diagnosis. It does not repair pixels or determine a manufacturer tolerance policy.',
      faq: [['What is the difference between a dead and stuck pixel?', 'A point that stays dark on every color may indicate a dead pixel; one that keeps a color may indicate a stuck subpixel. Dirt and scaling can also mislead.'], ['Can a web page repair pixels?', 'There is no guaranteed repair. Repeat the inspection and contact the manufacturer or qualified support before attempting a physical procedure.']],
    },
  },
  'screen-cleaner': {
    related: ['dead-pixel-test', 'black-screen', 'display-calibration'],
    pt: {
      intro: 'Fundos de contraste ajudam a localizar poeira, marcas de dedo e resíduos antes da limpeza. A ferramenta é apenas uma referência visual; o procedimento físico continua seguindo o manual do equipamento.',
      steps: ['Consulte primeiro as orientações do fabricante e, se indicado, desligue o equipamento.', 'Use o fundo de inspeção para localizar as áreas afetadas.', 'Limpe com material apropriado, sem borrifar líquido diretamente no painel nem aplicar pressão excessiva.'],
      uses: ['Preparação para manutenção periódica do setup.', 'Conferência da superfície antes de instalar uma película.'],
      limitations: 'O MonitorSmith não limpa nem protege o revestimento do painel. Produtos, líquidos e técnicas inadequados podem causar dano permanente.',
      faq: [['Qual pano devo usar?', 'Em geral, um pano de microfibra limpo e sem fiapos; as instruções específicas do fabricante prevalecem.'], ['Posso usar limpa-vidros?', 'Não use produtos domésticos sem autorização do fabricante. Amônia, abrasivos e alguns álcoois podem danificar revestimentos.']],
    },
    en: {
      intro: 'High-contrast backgrounds help locate dust, fingerprints and residue before cleaning. The tool is only a visual reference; physical cleaning must follow the device manual.',
      steps: ['Read the manufacturer guidance first and power the device off when instructed.', 'Use the inspection background to locate affected areas.', 'Clean with suitable material without spraying liquid directly on the panel or applying excessive pressure.'],
      uses: ['Preparing for regular setup maintenance.', 'Checking the surface before installing a protector.'],
      limitations: 'MonitorSmith does not clean or protect panel coatings. Unsuitable products, liquids or techniques can cause permanent damage.',
      faq: [['What cloth should I use?', 'A clean lint-free microfiber cloth is generally suitable; device-specific manufacturer instructions take priority.'], ['Can I use glass cleaner?', 'Do not use household products unless the manufacturer allows them. Ammonia, abrasives and some alcohols can damage coatings.']],
    },
  },
  'monitor-test': {
    related: ['display-calibration', 'dead-pixel-test', 'black-screen'],
    pt: {
      intro: 'O Teste de Monitor serve como um checklist de triagem rápida para conferência geral de novos displays ou equipamentos recém-adquiridos. Reúne verificações básicas de geometria, uniformidade geral de cor e resposta do painel.',
      steps: ['Abra o teste em tela cheia logo após instalar o monitor ou antes de fechar uma compra.', 'Percorra a lista de verificação visual: geometria, uniformidade básica e ausência de distorções evidentes.', 'Anote qualquer inconsistência observada para acionar a garantia ou suporte dentro do prazo legal.'],
      uses: ['Checklist de triagem e recebimento de monitores novos ou usados.', 'Verificação rápida de integridade geral do display antes de configurações avançadas.'],
      limitations: 'Este é um teste de triagem visual preliminar para diagnóstico rápido de problemas óbvios. Para análise aprofundada de escala de cinza, curvas de gama e nitidez subpixel, utilize a ferramenta Verificação Visual.',
      faq: [['Qual a diferença entre o Teste de Monitor e a Verificação Visual?', 'O Teste de Monitor é uma triagem rápida para conferência geral (ideal para compra/recebimento); a Verificação Visual oferece laboratório de padrões técnicos para análise minuciosa de tons e curvas.'], ['Este teste substitui uma assistência técnica?', 'Não. Ele orienta a inspeção humana durante o prazo de devolução ou garantia, sem gerar laudo laboratorial.']],
    },
    en: {
      intro: 'The Monitor Test provides a rapid triage checklist for general inspection of new or recently acquired displays. It aggregates basic checks for geometry, general color uniformity, and panel responsiveness.',
      steps: ['Open the test fullscreen right after setup or before purchasing a display.', 'Go through the visual checklist: geometry, basic uniformity, and absence of obvious artifacts.', 'Note any inconsistencies to request warranty support within the return window.'],
      uses: ['Triage checklist when receiving new or used monitors.', 'Quick display health check before advanced software calibration.'],
      limitations: 'This is a preliminary triage tool designed to spot obvious defects quickly. For granular grayscale ramps, gamma tracking, and subpixel inspection, use the Visual Check tool.',
      faq: [['What is the difference between Monitor Test and Visual Check?', 'Monitor Test is a rapid triage checklist (great for unboxing/returns); Visual Check is a technical pattern laboratory for evaluating tonal transitions and gamma.'], ['Does this test replace certified repair diagnostics?', 'No. It guides human visual inspection during return windows without producing certified laboratory reports.']],
    },
  },
  'display-calibration': {
    related: ['monitor-test', 'black-screen', 'screen-cleaner'],
    pt: {
      intro: 'A Verificação Visual é um laboratório técnico de padrões de referência: escala de cinza de múltiplos níveis, curvas de gama (2.2 e 2.4), transições de gradiente, nitidez de subpixel (ClearType/font rendering) e contraste dinâmico.',
      steps: ['Restaure o perfil padrão sRGB do monitor e estabilize a iluminação do ambiente.', 'Analise os padrões de sombra profunda e realce alto para verificar se há detalhes esmagados (crushed shadows) ou estourados (clipped highlights).', 'Examine os padrões de gradiente contínuo e subpixel para avaliar banding e nitidez de renderização.'],
      uses: ['Avaliação avançada de gradação tonal e rastreamento de gama.', 'Detecção de color banding em gradientes de 8 bits e 10 bits.', 'Verificação de nitidez e alinhamento de subpixels RGB.'],
      limitations: 'A avaliação visual é subjetiva e depende do perfil de cor do sistema operacional e do navegador. Não gera perfil ICC automatizado nem substitui um colorímetro ou espectrofotômetro dedicado.',
      faq: [['Como identificar se as sombras estão esmagadas?', 'Nos passos de cinza escuro (0% a 5%), todos os blocos adjacentes devem ser discerníveis do fundo preto absoluto. Se forem indistinguíveis, ajuste o nível de preto ou gama.'], ['Posso usar esta ferramenta para calibração profissional?', 'Serve como excelente referência de validação e verificação antes e depois de calibrar com um sensor de hardware.']],
    },
    en: {
      intro: 'Visual Check is a technical reference pattern laboratory: multi-step grayscale ramps, gamma curves (2.2 and 2.4), gradient sweeps, subpixel sharpness (ClearType/font rendering), and contrast evaluation.',
      steps: ['Restore standard sRGB monitor profile and stabilize ambient lighting.', 'Examine deep shadow and high highlight steps to check for crushed shadows or clipped highlights.', 'Inspect continuous gradient sweeps and subpixel targets to assess banding and rendering clarity.'],
      uses: ['Advanced assessment of tonal gradation and gamma tracking.', 'Detecting color banding across 8-bit and 10-bit gradients.', 'Evaluating sharpness and RGB subpixel font alignment.'],
      limitations: 'Visual assessment is subjective and depends on operating system color management and browser rendering. It does not generate ICC profiles or replace a hardware colorimeter or spectrophotometer.',
      faq: [['How do I know if shadows are crushed?', 'On dark gray steps (0% to 5%), each block should remain discernable from pure black. If indistinguishable, adjust black level or gamma.'], ['Can I use this for professional color grading?', 'It serves as a strong validation and verification aid before and after hardware calibration.']],
    },
  },
  'webcam-light': {
    related: ['green-screen', 'fullscreen-message', 'focus-timer'],
    pt: {
      intro: 'Uma tela clara pode funcionar como luz de preenchimento próxima quando não há iluminação dedicada. O controle de temperatura é uma aproximação visual de cor, não uma medição da luz emitida.',
      steps: ['Posicione a janela próxima à webcam ou use um segundo monitor.', 'Comece com intensidade baixa e ajuste a tonalidade conforme o ambiente.', 'Evite reflexos em óculos e reduza o brilho se houver desconforto.'],
      uses: ['Videochamadas em ambientes com pouca luz frontal.', 'Luz de apoio próxima para pequenos objetos e gravações.'],
      limitations: 'Intensidade, temperatura efetiva e qualidade dependem do painel, brilho físico, perfil e ambiente. Não substitui iluminação dedicada.',
      faq: [['Substitui uma ring light?', 'Pode ajudar como preenchimento próximo, mas oferece menos alcance e controle que uma fonte dedicada.'], ['A temperatura exibida é exata?', 'Não. É uma aproximação de cor renderizada em sRGB, influenciada pelo monitor e pelo ambiente.']],
    },
    en: {
      intro: 'A bright screen can work as nearby fill light when dedicated lighting is unavailable. The temperature control is a visual color approximation, not a measurement of emitted light.',
      steps: ['Place the window near the webcam or use a second monitor.', 'Start at low intensity and adjust the tint to the room.', 'Avoid reflections on glasses and reduce brightness if uncomfortable.'],
      uses: ['Video calls with limited frontal lighting.', 'Nearby fill light for small objects and recordings.'],
      limitations: 'Intensity, effective temperature and quality depend on panel, physical brightness, profile and room. It does not replace dedicated lighting.',
      faq: [['Does it replace a ring light?', 'It can provide nearby fill, but has less reach and control than a dedicated source.'], ['Is the displayed temperature exact?', 'No. It is an sRGB color approximation influenced by the monitor and environment.']],
    },
  },
  'green-screen': {
    related: ['webcam-light', 'fullscreen-message', 'sponsor-loop'],
    pt: {
      intro: 'O atalho Tela Verde abre o Estúdio de Cor com o preset sRGB #00B140. Ele pode servir como fundo luminoso para objetos pequenos e composições simples.',
      steps: ['Abra a ferramenta e confirme que o fundo está verde.', 'Posicione a tela atrás do objeto sem exibir controles.', 'Evite reflexos e ajuste a chave de cor no software de captura.'],
      uses: ['Captura de pequenos objetos diante de um tablet ou monitor.', 'Fundo auxiliar em OBS ou software de edição.'],
      limitations: 'A tela emite luz e pode causar spill verde. Painel, câmera, perfil, brilho e ambiente alteram a cor capturada; não é um fundo chroma físico calibrado.',
      faq: [['Posso escolher azul?', 'Sim. Abra o Estúdio de Cor e escolha outro tom quando o objeto contiver verde.'], ['Como reduzir reflexos?', 'Controle a iluminação e o ângulo entre tela, objeto e câmera; filtros polarizadores podem ajudar em situações específicas.']],
    },
    en: {
      intro: 'The Green Screen shortcut opens Color Studio with the #00B140 sRGB preset. It can serve as a luminous background for small objects and simple composites.',
      steps: ['Open the tool and confirm the background is green.', 'Place the display behind the object with controls hidden.', 'Avoid reflections and tune the color key in your capture software.'],
      uses: ['Capturing small objects against a tablet or monitor.', 'An auxiliary background in OBS or editing software.'],
      limitations: 'A display emits light and can cause green spill. Panel, camera, profile, brightness and room alter the captured color; this is not a calibrated physical chroma backdrop.',
      faq: [['Can I choose blue?', 'Yes. Open Color Studio and select another tone when the subject contains green.'], ['How can I reduce reflections?', 'Control lighting and angles between display, subject and camera; polarizing filters can help in specific situations.']],
    },
  },
  'focus-timer': {
    related: ['fullscreen-clock', 'fullscreen-message', 'webcam-light'],
    pt: {
      intro: 'O timer organiza períodos de trabalho e pausa em uma tela discreta. Sons contínuos opcionais podem mascarar parte do ruído ambiente, mas preferências e resultados variam entre pessoas.',
      steps: ['Escolha a duração do ciclo e, se desejar, um som ambiente.', 'Inicie o timer e ajuste o volume em nível confortável.', 'Ao finalizar, faça a pausa planejada e reinicie conscientemente.'],
      uses: ['Blocos de estudo, leitura, escrita ou programação.', 'Referência de tempo em um monitor secundário.'],
      limitations: 'É uma ferramenta de organização, não um tratamento de saúde. Sons não eliminam todo o ruído; interrompa o áudio se houver desconforto.',
      faq: [['O que é ruído marrom?', 'É um ruído contínuo com maior energia em frequências baixas. Algumas pessoas o consideram mais suave que o ruído branco.'], ['Preciso usar fones?', 'Não. Se usar, mantenha volume moderado e respeite sua percepção de conforto.']],
    },
    en: {
      intro: 'The timer organizes work and break periods on a quiet screen. Optional continuous sounds may mask some ambient noise, but preferences and results vary by person.',
      steps: ['Choose a cycle duration and, optionally, an ambient sound.', 'Start the timer and set a comfortable volume.', 'When it ends, take the planned break and restart deliberately.'],
      uses: ['Study, reading, writing or programming blocks.', 'A time reference on a secondary display.'],
      limitations: 'This is an organization aid, not a health treatment. Sounds do not remove all noise; stop audio if it causes discomfort.',
      faq: [['What is brown noise?', 'It is continuous noise with more energy at lower frequencies. Some people perceive it as softer than white noise.'], ['Do I need headphones?', 'No. If you use them, keep volume moderate and follow your own comfort.']],
    },
  },
  'fullscreen-clock': {
    related: ['focus-timer', 'fullscreen-message', 'black-screen'],
    pt: {
      intro: 'O relógio mostra hora e data do dispositivo em composições digital e analógica para uma tela secundária, sala ou evento.',
      steps: ['Abra a ferramenta e escolha o estilo.', 'Solicite fullscreen se quiser ocultar as barras do navegador.', 'Mantenha a aba aberta e verifique se a hora do sistema está correta.'],
      uses: ['Monitor secundário em mesa, recepção ou estúdio.', 'Referência de horário durante uma apresentação.'],
      limitations: 'A hora vem do sistema operacional. Suspensão, aba em segundo plano e políticas de energia podem interromper atualizações até a página voltar a ficar ativa.',
      faq: [['Funciona offline?', 'Depois que o PWA for baixado, pode continuar disponível sem rede enquanto o navegador preservar o cache.'], ['É uma fonte de horário certificada?', 'Não. Ele apenas apresenta o relógio configurado no dispositivo.']],
    },
    en: {
      intro: 'The clock displays the device time and date in digital and analog layouts for a secondary display, room or event.',
      steps: ['Open the tool and choose a style.', 'Request fullscreen if you want to hide browser chrome.', 'Keep the tab open and verify the system clock is correct.'],
      uses: ['A secondary display on a desk, reception or studio.', 'A time reference during a presentation.'],
      limitations: 'Time comes from the operating system. Sleep, background-tab throttling and power policies can pause updates until the page is active again.',
      faq: [['Does it work offline?', 'After the PWA has been downloaded, it may remain available without a network while the browser preserves its cache.'], ['Is it a certified time source?', 'No. It only presents the clock configured on the device.']],
    },
  },
  'fullscreen-message': {
    related: ['online-teleprompter', 'fullscreen-clock', 'webcam-light'],
    pt: {
      intro: 'A ferramenta Mensagem em Tela foi criada para sinalização estática, recados visuais à distância e comunicação em salas de reunião, eventos ou transmissões. Inclui gerador de QR Code dinâmico para compartilhamento rápido.',
      steps: ['Digite o recado ou URL e selecione cores de alto contraste.', 'Ajuste a escala tipográfica para visualização clara à distância.', 'Ative o modo tela cheia para transformar o monitor em painel de status ou aviso.'],
      uses: ['Sinalização estática de status de sala de reunião (Ocupado / Livre).', 'Avisos visuais para palcos, recepções e estúdios.', 'Exibição de QR Code para Wi-Fi, links ou contatos.'],
      limitations: 'Esta ferramenta é voltada para mensagens estáticas e avisos visuais de grande porte. Para leitura de roteiros contínuos em gravação de vídeo, utilize o Teleprompter Online.',
      faq: [['Como funciona o gerador de QR Code?', 'Ao ativar a opção de QR Code, o texto informado é convertido em um código escaneável diretamente no navegador, sem passar por servidores externos.'], ['A mensagem fica salva?', 'O estado é mantido apenas localmente no navegador enquanto a sessão estiver ativa.']],
    },
    en: {
      intro: 'The Fullscreen Message tool is designed for static signage, large distance notices, and silent communication in meeting rooms, stages, or streams. Includes dynamic QR Code generation for instant sharing.',
      steps: ['Type your notice or URL and pick high-contrast colors.', 'Adjust typographic scale for clear legibility across the room.', 'Enter fullscreen to turn your display into a clean status or reception board.'],
      uses: ['Static meeting room status boards (Occupied / Available).', 'Visual cues and notices for stages, receptions, and studios.', 'Displaying high-contrast QR Codes for links or contact info.'],
      limitations: 'This tool is intended for static signs and large-scale notices. For scrolling speech delivery and mirrored recording setups, use the Online Teleprompter.',
      faq: [['How does the QR code generator work?', 'When QR mode is toggled, your text is converted into a scannable QR code entirely inside the browser without transmitting data to external servers.'], ['Is my message saved permanently?', 'State is retained locally in your browser session and can be cleared at any time.']],
    },
  },
  'online-teleprompter': {
    related: ['fullscreen-message', 'webcam-light', 'fullscreen-clock'],
    pt: {
      intro: 'O Teleprompter Online é uma ferramenta dinâmica de leitura para gravação de vídeos e discursos. Oferece controle preciso de velocidade de rolagem (palavras por minuto), ajuste de largura de coluna para reduzir o movimento ocular e espelhamento horizontal para uso com vidros semi-refletores (beamsplitter).',
      steps: ['Cole seu roteiro e ajuste o tamanho da fonte e a largura da coluna de leitura.', 'Defina a velocidade de rolagem compatível com seu ritmo natural de fala.', 'Ative o espelhamento horizontal caso esteja usando uma estrutura com espelho beamsplitter na lente da câmera.'],
      uses: ['Gravação de videoaulas, apresentações, palestras e vídeos para YouTube.', 'Leitura de roteiros com vidro refletor diante da lente da câmera.', 'Treinamento de oratória com ritmo constante de fala.'],
      limitations: 'Ao contrário da ferramenta de Mensagem em Tela (que é estática), o teleprompter é dinâmico e requer ensaio prévio para sincronizar o ritmo de fala com a rolagem.',
      faq: [['Por que usar espelhamento horizontal?', 'Equipamentos de teleprompter profissionais usam um vidro inclinado diante da câmera que inverte a imagem. O espelhamento compensa essa reflexão ótica.'], ['Como evitar que meus olhos pareçam estar lendo?', 'Mantenha a coluna de texto estreita e posicione a tela o mais próximo possível do eixo central da lente da câmera.']],
    },
    en: {
      intro: 'The Online Teleprompter is a dynamic reading tool for video creators, presenters, and public speakers. It features fine-grained scroll speed control (words per minute), narrow column adjustments to minimize eye movement, and horizontal mirroring for beamsplitter glass setups.',
      steps: ['Paste your script and adjust font size and column width.', 'Set the scroll speed to match your natural speech cadence.', 'Enable horizontal mirroring if using a beamsplitter glass rig in front of your camera lens.'],
      uses: ['Recording video courses, keynote presentations, and video content.', 'Reading scripts directly through beamsplitter prompter glass.', 'Public speaking training with timed speech pacing.'],
      limitations: 'Unlike the static Fullscreen Message tool, the teleprompter is dynamic and benefits from a rehearsal to synchronize speech speed with scroll pace.',
      faq: [['Why is horizontal mirroring needed?', 'Professional prompter hardware places a reflective glass in front of the lens that flips the image horizontally. Mirroring cancels this optical inversion.'], ['How can I minimize visible eye tracking?', 'Keep the reading column narrow and place the screen as close to the camera lens axis as possible.']],
    },
  },
  'sponsor-loop': {
    related: ['fullscreen-message', 'green-screen', 'webcam-light'],
    pt: {
      intro: 'O Loop de Marcas apresenta imagens selecionadas no dispositivo em uma sequência de tela cheia para eventos, transmissões e vitrines.',
      steps: ['Selecione somente imagens que tenha autorização para exibir.', 'Organize a ordem, duração, transição e cor de fundo.', 'Inicie a sequência, confira o enquadramento e então solicite fullscreen.'],
      uses: ['Logos de patrocinadores em eventos e transmissões.', 'Apresentação temporária de marcas em estandes ou vitrines.'],
      limitations: 'As imagens ficam na sessão local e podem consumir memória. Movimento discreto não garante prevenção de burn-in; use também as proteções do fabricante e evite sessões estáticas prolongadas.',
      faq: [['Posso usar fundo chroma no OBS?', 'Sim. Escolha o fundo verde e configure a chave no software de captura, conferindo bordas e reflexos.'], ['O deslocamento evita burn-in?', 'Não há garantia. Ele reduz a permanência na mesma posição, mas não elimina desgaste ou retenção.']],
    },
    en: {
      intro: 'Brand Loop presents images selected on the device in a fullscreen sequence for events, streams and displays.',
      steps: ['Select only images you are authorized to display.', 'Arrange order, duration, transition and background color.', 'Start the sequence, check framing, then request fullscreen.'],
      uses: ['Sponsor logos at events and streams.', 'Temporary brand presentation at booths or store displays.'],
      limitations: 'Images remain in the local session and can use significant memory. Subtle movement cannot guarantee burn-in prevention; also use manufacturer protections and avoid prolonged static sessions.',
      faq: [['Can I use a chroma background in OBS?', 'Yes. Choose green and configure the key in capture software, checking edges and reflections.'], ['Does movement prevent burn-in?', 'There is no guarantee. It reduces time in one position but does not eliminate wear or retention.']],
    },
  },
});

const LEGAL_PAGES = Object.freeze([
  {
    slug: 'privacidade',
    title: 'Política de Privacidade — MonitorSmith',
    description: 'Informações sobre dados locais, uso de cookies e conformidade com fornecedores de terceiros e Google AdSense no MonitorSmith.',
    h1: 'Política de Privacidade',
    sections: [
      ['1. Resumo e Operação Local', [
        'O MonitorSmith reúne utilitários e superfícies visuais para monitores desenvolvidos pela EXVORN.TECH. As ferramentas executam inteiramente no navegador do usuário: textos, cores, temporizadores e imagens importadas são processados localmente no seu dispositivo e nunca são enviados a servidores próprios para armazenamento ou perfilamento.',
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
        `Para esclarecimentos sobre privacidade, solicitações institucionais ou exercício de direitos sob a Lei Geral de Proteção de Dados (LGPD), utilize o canal institucional em ${SITE_METADATA.contactUrl}.`,
      ]],
      ['6. Atualizações desta Política', [
        `Esta política foi revisada em 10 de agosto de 2026 e reflete a operação atual da plataforma. Alterações materiais serão publicadas nesta mesma URL.`,
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
      ['5. Contato e Vigência', [`Revisão vigente desde 10 de agosto de 2026. Para dúvidas e contato institucional, acesse ${SITE_METADATA.contactUrl}.`]],
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
      if (!page?.intro || page.steps?.length < 3 || page.uses?.length < 2 || !page.limitations || page.faq?.length < 2) {
        errors.push(`Conteúdo incompleto: ${route.key}/${locale}`);
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

function localizedPage(route, locale) {
  const metadata = route[locale];
  const editorial = EDITORIAL_CONTENT[route.key];
  const content = editorial[locale];
  return { route, locale, metadata, content, relatedKeys: editorial.related };
}

function renderToolPage(route, locale) {
  const isEn = locale === 'en';
  const { metadata, content, relatedKeys } = localizedPage(route, locale);
  const lang = isEn ? 'en' : 'pt-BR';
  const pageUrl = isEn ? `${BASE_URL}/en/${metadata.slug}/` : `${BASE_URL}/${metadata.slug}/`;
  const ptUrl = `${BASE_URL}/${route.pt.slug}/`;
  const enUrl = `${BASE_URL}/en/${route.en.slug}/`;
  const documentTitle = `${metadata.title} | ${SITE_METADATA.name}`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const imageAlt = isEn
    ? 'MonitorSmith — 11 visual tools for displays'
    : 'MonitorSmith — 11 ferramentas visuais para monitores';
  const related = relatedKeys.map((key) => {
    const relatedRoute = ROUTE_BY_KEY.get(key);
    const item = relatedRoute[locale];
    const href = isEn ? `/en/${item.slug}/` : `/${item.slug}/`;
    return `<li><a href="${href}">${escapeHtml(item.title)}</a></li>`;
  }).join('');
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: metadata.title,
    description: metadata.description,
    url: pageUrl,
    inLanguage: lang,
    dateModified: route.lastModified,
    isPartOf: { '@type': 'WebSite', name: SITE_METADATA.name, url: `${BASE_URL}/` },
    breadcrumb: { '@id': breadcrumbId },
    publisher: { '@type': 'Organization', name: SITE_METADATA.owner, url: 'https://exvorn.tech/' },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEn ? 'MonitorSmith tools' : 'Ferramentas MonitorSmith', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: metadata.h1, item: pageUrl },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map(([question, answer]) => ({
      '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
  const techArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${pageUrl}#article`,
    headline: metadata.h1,
    description: metadata.description,
    inLanguage: isEn ? 'en-US' : 'pt-BR',
    datePublished: '2026-08-04',
    dateModified: SITE_METADATA.contentLastModified,
    author: { '@type': 'Organization', name: SITE_METADATA.owner, url: 'https://exvorn.tech/' },
    publisher: { '@type': 'Organization', name: SITE_METADATA.owner, url: 'https://exvorn.tech/' },
    mainEntityOfPage: pageUrl,
  };
  const labels = isEn
    ? { back: 'All tools', open: 'Open tool', how: 'How to use', when: 'When to use', limits: 'Limitations', faq: 'Questions', related: 'Related guides', privacy: 'Privacy', terms: 'Terms', contact: 'Contact', interfaceNote: 'The interactive application currently uses a Portuguese interface.' }
    : { back: 'Todas as ferramentas', open: 'Abrir ferramenta', how: 'Como usar', when: 'Quando usar', limits: 'Limitações', faq: 'Perguntas', related: 'Guias relacionados', privacy: 'Privacidade', terms: 'Termos de uso', contact: 'Contato', interfaceNote: '' };

  const html = `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${escapeHtml(documentTitle)}</title>
  <meta name="description" content="${escapeHtml(metadata.description)}">
  <meta name="theme-color" content="#030304">
  <meta name="author" content="EXVORN.TECH">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${pageUrl}">
  <link rel="alternate" hreflang="pt-BR" href="${ptUrl}">
  <link rel="alternate" hreflang="en" href="${enUrl}">
  <link rel="alternate" hreflang="x-default" href="${ptUrl}">
  <link rel="icon" href="/logo.png" type="image/png">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="describedby" href="/llms.txt" type="text/markdown">
  <meta property="og:title" content="${escapeHtml(documentTitle)}">
  <meta property="og:description" content="${escapeHtml(metadata.description)}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="MonitorSmith">
  <meta property="og:locale" content="${isEn ? 'en_US' : 'pt_BR'}">
  <meta property="og:locale:alternate" content="${isEn ? 'pt_BR' : 'en_US'}">
  <meta property="og:image" content="${BASE_URL}/og-image.jpg">
  <meta property="og:image:secure_url" content="${BASE_URL}/og-image.jpg">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapeHtml(imageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(documentTitle)}">
  <meta name="twitter:description" content="${escapeHtml(metadata.description)}">
  <meta name="twitter:image" content="${BASE_URL}/og-image.jpg">
  <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}">
  <script type="application/ld+json">${safeJson([webPageSchema, techArticleSchema, breadcrumbSchema, faqSchema])}</script>
  <style>
    :root{color-scheme:dark;--bg:#030304;--surface:#0a0b0f;--text:#f5f5f5;--muted:#b9bbc4;--line:rgba(255,255,255,.1);--accent:#f59e0b}*{box-sizing:border-box}
    body{margin:0;background:var(--bg);color:var(--text);font:16px/1.7 Outfit,ui-sans-serif,system-ui,-apple-system,sans-serif}a{color:#fbbf24;text-underline-offset:.2em}
    header,main,footer{width:min(820px,calc(100% - 2rem));margin-inline:auto}header{padding:1.1rem 0;display:flex;justify-content:space-between;gap:1rem;border-bottom:1px solid var(--line)}header a{text-decoration:none;font-weight:700}
    main{padding:clamp(2rem,6vw,4rem) 0}h1{font-size:clamp(2rem,7vw,3.5rem);line-height:1.04;letter-spacing:-.04em;margin:0 0 1rem}h2{font-size:1.25rem;margin:0 0 .7rem}.intro{font-size:1.1rem;color:var(--muted)}
    .editorial-byline{display:flex;gap:.75rem;align-items:center;font-size:.85rem;color:var(--muted);margin-bottom:1.5rem;padding-bottom:.75rem;border-bottom:1px solid var(--line)}
    .cta{display:inline-flex;margin:1rem 0 2rem;padding:.85rem 1.15rem;border-radius:.7rem;background:var(--accent);color:#171006;font-weight:800;text-decoration:none}.note{color:var(--muted);font-size:.9rem}
    section{margin:1rem 0;padding:1.4rem;background:var(--surface);border:1px solid var(--line);border-radius:1rem}li,p{color:var(--muted)}.faq dt{font-weight:750;margin-top:1rem}.faq dd{color:var(--muted);margin:.25rem 0 0}
    footer{padding:1.5rem 0 3rem;border-top:1px solid var(--line);display:flex;gap:1rem;flex-wrap:wrap}:focus-visible{outline:3px solid var(--accent);outline-offset:4px}
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
      <time datetime="${SITE_METADATA.contentLastModified}">${isEn ? 'Updated August 10, 2026' : 'Atualizado em 10 de agosto de 2026'}</time>
    </div>
    <p class="intro">${escapeHtml(content.intro)}</p>
    <a class="cta" href="/?tool=${encodeURIComponent(route.toolId)}">${labels.open}</a>
    ${labels.interfaceNote ? `<p class="note">${labels.interfaceNote}</p>` : ''}
    <section><h2>${labels.how}</h2><ol>${content.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ol></section>
    <section><h2>${labels.when}</h2><ul>${content.uses.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>
    <section><h2>${labels.limits}</h2><p>${escapeHtml(content.limitations)}</p></section>
    <section><h2>${labels.faq}</h2><dl class="faq">${content.faq.map(([q, a]) => `<dt>${escapeHtml(q)}</dt><dd>${escapeHtml(a)}</dd>`).join('')}</dl></section>
    
    <section>
      <h2>${isEn ? 'Technical Methodology & Panel Science' : 'Metodologia Técnica e Ciência dos Painéis'}</h2>
      <p>${isEn ? 'The evaluation and calibration tools provided by MonitorSmith are grounded in display engineering principles to offer accurate, browser-based visual references. When testing monitors, understanding the underlying panel technology is critical. OLED (Organic Light-Emitting Diode) displays, for instance, excel at absolute black levels because individual pixels can completely power off, virtually eliminating the concept of backlight bleed. However, they remain susceptible to image retention and burn-in, making our screen cleaner and color cycle tools vital for maintenance.' : 'As ferramentas de avaliação e calibração fornecidas pelo MonitorSmith baseiam-se em princípios de engenharia de displays para oferecer referências visuais precisas no navegador. Ao testar monitores, entender a tecnologia do painel subjacente é crítico. Displays OLED (Organic Light-Emitting Diode), por exemplo, se destacam em níveis de preto absolutos porque pixels individuais podem desligar completamente, eliminando praticamente o conceito de vazamento de luz. No entanto, permanecem suscetíveis à retenção de imagem e burn-in, tornando nossas ferramentas de limpeza e ciclo de cores vitais para manutenção.'}</p>
      
      <p style="margin-top: 1rem;">${isEn ? 'Conversely, LCD panels (including IPS, VA, and TN variations) rely on a dedicated backlight unit (BLU). This architecture inherently produces phenomena such as IPS glow—a shifting luminescence visible when viewing dark content from off-angles—and edge bleeding, where light escapes from the monitor’s bezel assembly. Our pure black and solid color full-screen utilities isolate these artifacts, allowing users to differentiate between normal technological limitations and manufacturing defects.' : 'Em contrapartida, painéis LCD (incluindo variações IPS, VA e TN) dependem de uma unidade de luz de fundo dedicada (BLU). Essa arquitetura produz inerentemente fenômenos como IPS glow — uma luminescência variável visível ao visualizar conteúdos escuros em ângulos abertos — e vazamento pelas bordas (edge bleeding). Nossos utilitários de tela cheia preta e de cores sólidas isolam esses artefatos, permitindo que usuários diferenciem entre limitações tecnológicas normais e defeitos de fabricação.'}</p>
      
      <p style="margin-top: 1rem;">${isEn ? 'For professional workflows, accurate color representation is paramount. While software-based tools cannot replace hardware colorimeters (like X-Rite or Spyder devices), they provide an essential first-line assessment of color banding, gamma tracking, and pixel integrity. We continuously validate these patterns against a wide array of consumer and professional-grade monitors to ensure the patterns scale correctly across different resolutions and aspect ratios without introducing scaling artifacts.' : 'Para fluxos de trabalho profissionais, a representação precisa de cores é fundamental. Embora ferramentas baseadas em software não substituam colorímetros de hardware, elas fornecem uma avaliação essencial de primeira linha de color banding, rastreamento de gama e integridade de pixels. Validamos continuamente esses padrões em uma ampla gama de monitores para garantir que os padrões escalem corretamente em diferentes resoluções e proporções, sem introduzir artefatos de redimensionamento.'}</p>
    </section>

    <section><h2>${labels.related}</h2><ul>${related}</ul></section>
  </main>
  <footer><a href="/">${labels.back}</a><a href="/privacidade/">${labels.privacy}</a><a href="/termos/">${labels.terms}</a><a href="${SITE_METADATA.contactUrl}">${labels.contact}</a></footer>
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
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>${escapeHtml(page.title)}</title><meta name="description" content="${escapeHtml(page.description)}"><meta name="theme-color" content="#030304"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1"><link rel="canonical" href="${url}"><link rel="alternate" hreflang="pt-BR" href="${url}"><link rel="alternate" hreflang="x-default" href="${url}"><link rel="icon" href="/logo.png" type="image/png"><link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest"><link rel="describedby" href="/llms.txt" type="text/markdown"><meta property="og:title" content="${escapeHtml(page.title)}"><meta property="og:description" content="${escapeHtml(page.description)}"><meta property="og:url" content="${url}"><meta property="og:type" content="website"><meta property="og:site_name" content="MonitorSmith"><meta property="og:locale" content="pt_BR"><meta property="og:image" content="${BASE_URL}/og-image.jpg"><meta property="og:image:secure_url" content="${BASE_URL}/og-image.jpg"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="MonitorSmith — informações legais e de privacidade"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(page.title)}"><meta name="twitter:description" content="${escapeHtml(page.description)}"><meta name="twitter:image" content="${BASE_URL}/og-image.jpg"><meta name="twitter:image:alt" content="MonitorSmith — informações legais e de privacidade"><script type="application/ld+json">${safeJson(schema)}</script>
<style>:root{color-scheme:dark;--bg:#030304;--surface:#0a0b0f;--text:#f5f5f5;--muted:#b9bbc4;--line:rgba(255,255,255,.1);--accent:#f59e0b}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.7 Outfit,ui-sans-serif,system-ui,-apple-system,sans-serif}header,main,footer{width:min(760px,calc(100% - 2rem));margin-inline:auto}header{padding:1.2rem 0;border-bottom:1px solid var(--line)}a{color:#fbbf24;text-underline-offset:.2em}header a{color:var(--text);font-weight:750;text-decoration:none}main{padding:3rem 0}h1{font-size:clamp(2rem,6vw,3rem);line-height:1.1;letter-spacing:-.035em}h2{font-size:1.2rem;margin:2.2rem 0 .5rem}p{color:var(--muted)}.notice{padding:1rem;background:var(--surface);border:1px solid var(--line);border-radius:.8rem}footer{padding:1.5rem 0 3rem;border-top:1px solid var(--line);display:flex;gap:1rem;flex-wrap:wrap}:focus-visible{outline:3px solid var(--accent);outline-offset:4px}</style></head>
<body><header><a href="/">MonitorSmith · EXVORN.TECH</a></header><main><h1>${escapeHtml(page.h1)}</h1><p class="notice">Este documento descreve a operação atual do MonitorSmith. Em caso de dúvida, entre em contato antes de continuar o uso.</p>${sections}</main><footer><a href="/">Todas as ferramentas</a><a href="/privacidade/">Privacidade</a><a href="/termos/">Termos de uso</a><a href="${SITE_METADATA.contactUrl}">Contato</a></footer></body></html>`;
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
  <link rel="icon" href="/logo-transparent.png" type="image/png">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.webmanifest">
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
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5926952327268950" crossorigin="anonymous"></script>
  <script type="application/ld+json">${safeJson(schemas)}</script>
  <style>
    :root{color-scheme:dark;--bg:#030304;--surface:#0a0b0f;--text:#f5f5f5;--muted:#b9bbc4;--line:rgba(255,255,255,.1);--accent:#f59e0b}*{box-sizing:border-box}
    body{margin:0;background:var(--bg);color:var(--text);font:16px/1.7 Outfit,ui-sans-serif,system-ui,-apple-system,sans-serif}a{color:#fbbf24;text-underline-offset:.2em}
    header,main,footer{width:min(820px,calc(100% - 2rem));margin-inline:auto}header{padding:1.1rem 0;display:flex;justify-content:space-between;gap:1rem;border-bottom:1px solid var(--line)}header a{text-decoration:none;font-weight:700}
    main{padding:clamp(2rem,6vw,4rem) 0}h1{font-size:clamp(1.8rem,6vw,3rem);line-height:1.1;letter-spacing:-.03em;margin:0 0 1rem}h2{font-size:1.25rem;margin:2rem 0 .7rem}h3{font-size:1.1rem;margin:1.5rem 0 .5rem}
    .editorial-byline{display:flex;gap:.75rem;align-items:center;font-size:.85rem;color:var(--muted);margin-bottom:1.5rem;padding-bottom:.75rem;border-bottom:1px solid var(--line)}
    .cta-group{display:flex;gap:1.5rem;margin:2.5rem 0;flex-wrap:wrap;justify-content:flex-start}
    .cta{display:inline-flex;padding:1rem 1.4rem;border-radius:.85rem;background:var(--accent);color:#171006;font-weight:800;text-decoration:none;transition:transform .15s, box-shadow .15s}.cta:hover{transform:scale(1.03);box-shadow:0 0 15px rgba(245,158,11,0.4)}
    .cta.secondary{background:var(--surface);color:var(--text);border:1px solid var(--line)}.cta.secondary:hover{border-color:var(--accent);box-shadow:0 0 15px rgba(255,255,255,0.05)}
    .blog-body p{color:var(--muted);margin:1rem 0}.blog-body h2{color:var(--text)}.blog-body h3{color:var(--text)}.blog-body ul,.blog-body ol{color:var(--muted);padding-left:1.5rem}.blog-body li{margin:.4rem 0}
    figure{margin:2.5rem 0}figure img{width:100%;height:auto;border-radius:.8rem;border:1px solid var(--line);box-shadow:0 10px 30px rgba(0,0,0,0.5)}figcaption{font-size:.85rem;color:var(--muted);text-align:center;margin-top:.75rem;font-style:italic}
    blockquote.abnt-quote{margin:1.5rem 0 1.5rem 2rem;font-size:.95rem;line-height:1.6;color:var(--muted);border-left:3px solid var(--line);padding-left:1.2rem}
    .abnt-references{margin-top:3rem;padding-top:2rem;border-top:2px solid var(--line)}.abnt-references h2{font-size:1.1rem;margin-bottom:1rem}.abnt-references p{font-size:.9rem;line-height:1.5;margin-bottom:.5rem;padding-left:1.5rem;text-indent:-1.5rem}
    section{margin:1.5rem 0;padding:1.4rem;background:var(--surface);border:1px solid var(--line);border-radius:1rem}li,p{color:var(--muted)}.faq dt{font-weight:750;margin-top:1rem;color:var(--text)}.faq dd{color:var(--muted);margin:.25rem 0 0}
    .related-grid{display:grid;gap:.75rem}.related-grid a{display:block;padding:1rem;background:var(--surface);border:1px solid var(--line);border-radius:.75rem;text-decoration:none;transition:border-color .2s}.related-grid a:hover{border-color:var(--accent)}
    footer{padding:1.5rem 0 3rem;border-top:1px solid var(--line);display:flex;gap:1rem;flex-wrap:wrap}:focus-visible{outline:3px solid var(--accent);outline-offset:4px}
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
      <time datetime="${SITE_METADATA.contentLastModified}">Atualizado em 10 de agosto de 2026</time>
    </div>
    <div class="blog-body">${article.body}</div>
    <div class="cta-group">
      <a class="cta" href="/?tool=${encodeURIComponent(article.toolId)}">Experimentar Ferramenta →</a>
      <a class="cta secondary" href="/blog/">Ver todas as matérias 📚</a>
    </div>
    ${faqHtml}
    ${relatedHtml ? `<section><h2>Leia também</h2><div class="related-grid"><ul>${relatedHtml}</ul></div></section>` : ''}
  </main>
  <footer><a href="/">Todas as ferramentas</a><a href="/privacidade/">Privacidade</a><a href="/termos/">Termos de uso</a><a href="${SITE_METADATA.contactUrl}">Contato</a></footer>
  <script src="https://unpkg.com/lenis@1.1.9/dist/lenis.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="/blog-animations.js"></script>
</body>
</html>`;
}

function renderBlogIndex() {
  const pageUrl = `${BASE_URL}/blog/`;
  const documentTitle = `Blog — Guias e Artigos sobre Monitores | ${SITE_METADATA.name}`;
  const description = 'Artigos técnicos, guias práticos e dicas sobre monitores, displays, calibração, limpeza, produtividade e muito mais.';
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
  <link rel="icon" href="/logo-transparent.png" type="image/png">
  <link rel="manifest" href="/manifest.webmanifest">
  <meta property="og:title" content="${escapeHtml(documentTitle)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="MonitorSmith">
  <meta property="og:image" content="${BASE_URL}/og-image.jpg">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5926952327268950" crossorigin="anonymous"></script>
  <script type="application/ld+json">${safeJson(schema)}</script>
  <style>
    :root{color-scheme:dark;--bg:#030304;--surface:#0a0b0f;--text:#f5f5f5;--muted:#b9bbc4;--line:rgba(255,255,255,.1);--accent:#f59e0b}*{box-sizing:border-box}
    body{margin:0;background:var(--bg);color:var(--text);font:16px/1.7 Outfit,ui-sans-serif,system-ui,-apple-system,sans-serif}a{color:#fbbf24;text-underline-offset:.2em}
    header,main,footer{width:min(960px,calc(100% - 2rem));margin-inline:auto}header{padding:1.1rem 0;display:flex;justify-content:space-between;gap:1rem;border-bottom:1px solid var(--line)}header a{text-decoration:none;font-weight:700}
    main{padding:clamp(2rem,6vw,4rem) 0}h1{font-size:clamp(2rem,7vw,3.5rem);line-height:1.04;letter-spacing:-.04em;margin:0 0 .5rem}.subtitle{color:var(--muted);font-size:1.1rem;margin-bottom:2rem}
    .grid{display:grid;gap:1.25rem;grid-template-columns:repeat(auto-fill,minmax(300px,1fr))}
    .card{display:flex;flex-direction:column;justify-content:center;padding:1.5rem;background:var(--surface);border:1px solid var(--line);border-radius:1.25rem;text-decoration:none;transition:border-color .2s,transform .15s,box-shadow .2s}.card:hover{border-color:var(--accent);transform:translateY(-3px);box-shadow:0 10px 30px rgba(0,0,0,0.4)}
    .card h2{font-size:1.15rem;line-height:1.3;margin:0 0 .75rem;color:var(--text)}.card p{font-size:.95rem;color:var(--muted);margin:0;line-height:1.6}
    footer{padding:1.5rem 0 3rem;border-top:1px solid var(--line);display:flex;gap:1rem;flex-wrap:wrap}:focus-visible{outline:3px solid var(--accent);outline-offset:4px}
  </style>
</head>
<body>
  <header><a href="/">MonitorSmith · EXVORN.TECH</a><a href="/">← Todas as ferramentas</a></header>
  <main>
    <h1>Blog</h1>
    <p class="subtitle">Guias técnicos, dicas práticas e artigos sobre monitores, displays e produtividade.</p>
    <div class="grid">${cards}</div>
  </main>
  <footer><a href="/">Todas as ferramentas</a><a href="/privacidade/">Privacidade</a><a href="/termos/">Termos de uso</a><a href="${SITE_METADATA.contactUrl}">Contato</a></footer>
  <script src="https://unpkg.com/lenis@1.1.9/dist/lenis.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="/blog-animations.js"></script>
</body>
</html>`;
}

function generateManifest() {
  const manifest = {
    id: '/', name: 'MonitorSmith — Ferramentas para Monitores', short_name: 'MonitorSmith',
    description: `${TOOL_COUNT} ferramentas visuais para inspecionar monitores, iluminar cenas e organizar telas secundárias.`,
    start_url: '/', scope: '/', display: 'standalone', display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'], orientation: 'any',
    background_color: '#030304', theme_color: '#030304', lang: 'pt-BR', dir: 'ltr', categories: ['utilities', 'productivity'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },

    ],
    shortcuts: PWA_SHORTCUTS.map(({ toolId: _toolId, ...shortcut }) => ({ ...shortcut, icons: [{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }] })),
  };
  return `${JSON.stringify(manifest, null, 2)}\n`;
}

function generateLlmsText() {
  return `# MonitorSmith

> MonitorSmith é uma suíte web gratuita de ferramentas visuais para monitores: inspeção de pixels, teste de vazamento de luz, iluminação de apoio, chroma key, timer de foco e mais. Funciona no navegador, sem cadastro. Desenvolvido pela EXVORN.TECH.

- URL: ${BASE_URL}
- Idioma principal: pt-BR
- Instalável como PWA para uso offline
- Todas as ferramentas processam dados localmente no dispositivo

## Ferramentas de inspeção

- [Tela Preta OLED](${BASE_URL}/tela-preta-oled/): Superfície preta (#000000) em tela cheia para inspecionar IPS glow, pixels claros e vazamento de luz (backlight bleed) em ambiente escuro.
- [Teste de Dead Pixel](${BASE_URL}/teste-de-dead-pixel/): 8 cores sólidas em tela cheia para identificar dead pixels, pixels presos e pontos luminosos.
- [Inspeção para Limpeza](${BASE_URL}/limpeza-de-monitor/): Fundos de alto contraste que revelam poeira, marcas de dedo e manchas no painel antes da limpeza.
- [Verificação Visual de Display](${BASE_URL}/teste-de-monitor/): Padrões de referência para observar contraste, escala de cinza, gradientes, nitidez e uniformidade.

## Ferramentas de iluminação e cor

- [Luz para Videochamada](${BASE_URL}/luz-para-videochamada/): Superfície clara com temperatura e intensidade ajustáveis para usar o monitor como luz de apoio em chamadas e gravações.
- [Tela Verde para Chroma Key](${BASE_URL}/tela-verde-chroma/): Fundo verde #00B140 em tela cheia para composições de foto e vídeo.

## Ferramentas de produtividade

- [Timer de Foco](${BASE_URL}/timer-de-foco/): Timer em tela cheia para ciclos de concentração com presets de tempo e sons ambientes opcionais.
- [Relógio em Tela Cheia](${BASE_URL}/relogio-em-tela-cheia/): Hora e data em formatos digital e analógico para tela secundária.
- [Teleprompter Online](${BASE_URL}/teleprompter-online/): Texto em tela cheia com espelhamento horizontal para gravações e apresentações.
- [Loop de Marcas](${BASE_URL}/loop-de-marcas/): Rotação automática de logos e imagens locais para eventos, lives e vitrines.

## Optional

- [Verificação Visual de Display (alternativa)](${BASE_URL}/verificacao-visual/): Rota alternativa para os mesmos padrões de verificação visual.
- [Mensagem em Tela](${BASE_URL}/mensagem-em-tela/): Avisos e recados em tela cheia com texto e cores ajustáveis.
- [Política de Privacidade](${BASE_URL}/privacidade/): Como o MonitorSmith trata dados e cookies.
- [Termos de Serviço](${BASE_URL}/termos/): Condições de uso do serviço.
- [llms-full.txt](${BASE_URL}/llms-full.txt): Documentação detalhada de cada ferramenta com descrições estendidas.
`;
}

function generateLlmsFullText() {
  return `# MonitorSmith

> MonitorSmith é uma suíte web gratuita de ferramentas visuais para monitores: inspeção de pixels, teste de vazamento de luz, iluminação de apoio, chroma key, timer de foco e mais. Funciona no navegador, sem cadastro. Desenvolvido pela EXVORN.TECH.

- URL: ${BASE_URL}
- Desenvolvido por: EXVORN.TECH (https://exvorn.tech/)
- Idioma principal: pt-BR
- Instalável como PWA (Progressive Web App) para uso offline
- Todas as ferramentas processam dados localmente no dispositivo do usuário
- Compatível com Chrome, Edge, Firefox, Safari e navegadores móveis

---

## Ferramentas de inspeção

### Tela Preta OLED e Inspeção de Vazamento de Luz

- [Tela Preta OLED](${BASE_URL}/tela-preta-oled/): Superfície preta (#000000) em tela cheia para inspecionar IPS glow, pixels claros e vazamento de luz (backlight bleed) em ambiente escuro.

Preenche a tela com preto absoluto. Em painéis OLED, reduz a emissão de luz. Em LCDs (IPS, VA, TN), permite observar vazamento de luz nas bordas e cantos. Atalho de teclado: B.

### Teste de Dead Pixel Online

- [Teste de Dead Pixel](${BASE_URL}/teste-de-dead-pixel/): 8 cores sólidas em tela cheia para identificar visualmente dead pixels, pixels presos e pontos luminosos.

Alterne entre preto, branco, vermelho, verde, azul, ciano, magenta e amarelo. Pixels que não mudam de cor ou permanecem apagados podem indicar defeito. Recomendado para verificar monitores novos ou usados antes da compra.

### Inspeção para Limpeza de Monitor

- [Inspeção para Limpeza](${BASE_URL}/limpeza-de-monitor/): Fundos de alto contraste que revelam poeira, marcas de dedo e manchas no painel antes da limpeza.

Exibe superfícies de contraste para localizar sujeira no painel. Atalho de teclado: C.

### Verificação Visual de Display

- [Verificação Visual de Display](${BASE_URL}/teste-de-monitor/): Padrões de referência para observar contraste, escala de cinza, gradientes, nitidez e uniformidade.
- [Rota alternativa](${BASE_URL}/verificacao-visual/): Mesmos padrões, URL diferente.

Inclui padrões de gradiente, escala de cinza, grade de escala, nitidez de subpixel e contraste. Atalho de teclado: G.

---

## Ferramentas de iluminação e cor

### Luz para Videochamada

- [Luz para Videochamada](${BASE_URL}/luz-para-videochamada/): Superfície clara com temperatura visual e intensidade ajustáveis para usar o monitor como luz de apoio.

Transforma o monitor em fonte de luz próxima para videochamadas e gravações. Permite ajustar brilho e temperatura de cor. Atalho de teclado: W.

### Estúdio de Cor

Superfície de cor sólida livre ou predefinida. Preencha a tela com qualquer cor usando o seletor ou presets disponíveis. Atalho de teclado: S.

### Tela Verde para Chroma Key

- [Tela Verde para Chroma Key](${BASE_URL}/tela-verde-chroma/): Fundo verde #00B140 em tela cheia para composições de foto e vídeo por chroma key.

Exibe a cor verde padrão de chroma key (#00B140) em tela cheia. Ideal para usar uma tela próxima como fundo uniforme em gravações.

---

## Ferramentas de produtividade

### Timer de Foco

- [Timer de Foco](${BASE_URL}/timer-de-foco/): Timer em tela cheia para ciclos de concentração com presets de tempo e sons ambientes opcionais gerados no navegador.

Permite configurar sessões de trabalho e pausas no estilo Pomodoro. Sons ambientes são gerados localmente via Web Audio API. Atalho de teclado: P.

### Relógio em Tela Cheia

- [Relógio em Tela Cheia](${BASE_URL}/relogio-em-tela-cheia/): Hora e data em formatos digital e analógico para tela secundária.

Exibe hora e data em tela cheia. Dois modos: digital (com segundos) e analógico. Atalho de teclado: T.

### Teleprompter e Mensagem em Tela

- [Teleprompter Online](${BASE_URL}/teleprompter-online/): Texto em tela cheia com espelhamento horizontal para gravações e apresentações.
- [Mensagem em Tela](${BASE_URL}/mensagem-em-tela/): Avisos e recados em tela cheia com texto e cores ajustáveis.

Exibe texto legível à distância com tamanho, cor e alinhamento configuráveis. Suporte a espelhamento horizontal para uso como teleprompter. Geração de QR Code. Atalho de teclado: M.

### Loop de Marcas

- [Loop de Marcas](${BASE_URL}/loop-de-marcas/): Rotação automática de logos e imagens locais em tela cheia para eventos, lives, estandes e vitrines.

Importe imagens do dispositivo. Elas ficam apenas na memória da aba e não são enviadas a nenhum servidor. Transições e deslocamento configuráveis. Atalho de teclado: L.

---

## Optional

- [Política de Privacidade](${BASE_URL}/privacidade/): Como o MonitorSmith trata dados, cookies e serviços de terceiros.
- [Termos de Serviço](${BASE_URL}/termos/): Condições de uso, limites das ferramentas e propriedade intelectual.
- [EXVORN.TECH](https://exvorn.tech/): Site institucional da empresa desenvolvedora.
`;
}

function generateSitemap() {
  const entries = [{ loc: `${BASE_URL}/`, lastModified: SITE_METADATA.contentLastModified, priority: '1.0' }];
  for (const route of SEO_PAGE_ROUTES) {
    const pt = `${BASE_URL}/${route.pt.slug}/`;
    const en = `${BASE_URL}/en/${route.en.slug}/`;
    entries.push({ loc: pt, pt, en, lastModified: route.lastModified, priority: '0.8' });
    entries.push({ loc: en, pt, en, lastModified: route.lastModified, priority: '0.7' });
  }
  for (const page of LEGAL_PAGES) entries.push({ loc: `${BASE_URL}/${page.slug}/`, lastModified: SITE_METADATA.contentLastModified, priority: '0.3' });
  // Blog index
  entries.push({ loc: `${BASE_URL}/blog/`, lastModified: SITE_METADATA.contentLastModified, priority: '0.7' });
  // Blog articles
  for (const article of BLOG_ARTICLES) {
    entries.push({ loc: `${BASE_URL}/blog/${article.slug}/`, lastModified: SITE_METADATA.contentLastModified, priority: '0.6' });
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  for (const entry of entries) {
    xml += `  <url>\n    <loc>${entry.loc}</loc>\n`;
    if (entry.pt) {
      xml += `    <xhtml:link rel="alternate" hreflang="pt-BR" href="${entry.pt}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${entry.en}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${entry.pt}" />\n`;
    }
    xml += `    <lastmod>${entry.lastModified}</lastmod>\n    <priority>${entry.priority}</priority>\n  </url>\n`;
  }
  return `${xml}</urlset>\n`;
}

async function main() {
  try {
    validateEditorialContent();
    await fs.mkdir(DIST_DIR, { recursive: true });

    for (const route of SEO_PAGE_ROUTES) {
      const ptDir = path.join(DIST_DIR, route.pt.slug);
      const enDir = path.join(DIST_DIR, 'en', route.en.slug);
      await fs.mkdir(ptDir, { recursive: true });
      await fs.mkdir(enDir, { recursive: true });
      await fs.writeFile(path.join(ptDir, 'index.html'), renderToolPage(route, 'pt'), 'utf8');
      await fs.writeFile(path.join(enDir, 'index.html'), renderToolPage(route, 'en'), 'utf8');
    }

    for (const page of LEGAL_PAGES) {
      const pageDir = path.join(DIST_DIR, page.slug);
      await fs.mkdir(pageDir, { recursive: true });
      await fs.writeFile(path.join(pageDir, 'index.html'), renderLegalPage(page), 'utf8');
    }

    // Blog: index page
    const blogDir = path.join(DIST_DIR, 'blog');
    await fs.mkdir(blogDir, { recursive: true });
    await fs.writeFile(path.join(blogDir, 'index.html'), renderBlogIndex(), 'utf8');

    // Blog: individual article pages
    for (const article of BLOG_ARTICLES) {
      const articleDir = path.join(blogDir, article.slug);
      await fs.mkdir(articleDir, { recursive: true });
      await fs.writeFile(path.join(articleDir, 'index.html'), renderBlogArticle(article), 'utf8');
    }

    await fs.writeFile(path.join(DIST_DIR, 'sitemap.xml'), generateSitemap(), 'utf8');
    await fs.writeFile(path.join(DIST_DIR, 'manifest.webmanifest'), generateManifest(), 'utf8');
    await fs.writeFile(path.join(DIST_DIR, 'llms.txt'), generateLlmsText(), 'utf8');
    await fs.writeFile(path.join(DIST_DIR, 'llms-full.txt'), generateLlmsFullText(), 'utf8');

    const blogCount = BLOG_ARTICLES.length;
    const urlCount = 1 + (SEO_PAGE_ROUTES.length * 2) + LEGAL_PAGES.length + 1 + blogCount;
    console.log(`SEO/GEO: ${TOOL_COUNT} ferramentas, ${SEO_PAGE_ROUTES.length * 2} guias localizados, ${blogCount} artigos de blog e ${urlCount} URLs validadas.`);
  } catch (error) {
    console.error('Falha na geração SEO/GEO:', error);
    process.exitCode = 1;
  }
}

await main();
