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

const BASE_URL = SITE_METADATA.baseUrl;
const DIST_DIR = path.resolve(process.cwd(), 'dist');

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
      intro: 'Padrões visuais ajudam a observar gradientes, tons, contraste e nitidez antes de ajustes manuais. Eles são renderizados pelo navegador e não constituem medição instrumental.',
      steps: ['Abra a Verificação Visual em tela cheia.', 'Percorra os padrões sem alterar simultaneamente vários controles do monitor.', 'Registre observações e compare novamente sob a mesma iluminação.'],
      uses: ['Conferência inicial de um monitor novo.', 'Comparação visual antes e depois de um ajuste manual.'],
      limitations: 'Escala, zoom, perfil de cor, composição, brilho e iluminação afetam o resultado. Use colorímetro e software apropriado quando fidelidade de cor for requisito.',
      faq: [['O que é color banding?', 'É a percepção de faixas em uma transição que deveria parecer contínua. O navegador, o conteúdo, o sinal e o painel podem influenciar.'], ['Este teste calibra o monitor?', 'Não. Ele fornece referências visuais; não mede o painel nem cria um perfil ICC.']],
    },
    en: {
      intro: 'Visual patterns help you observe gradients, tones, contrast and sharpness before manual adjustments. They are rendered by the browser and are not instrument measurements.',
      steps: ['Open Visual Check fullscreen.', 'Review patterns without changing several monitor controls at once.', 'Record observations and compare again under the same lighting.'],
      uses: ['Initial inspection of a new monitor.', 'Visual comparison before and after a manual adjustment.'],
      limitations: 'Scaling, zoom, color profile, composition, brightness and room lighting affect results. Use a colorimeter and suitable software when color fidelity is required.',
      faq: [['What is color banding?', 'It is the perception of bands in a transition that should look continuous. Browser, content, signal and panel can all contribute.'], ['Does this test calibrate my monitor?', 'No. It provides visual references; it does not measure the panel or create an ICC profile.']],
    },
  },
  'display-calibration': {
    related: ['monitor-test', 'black-screen', 'screen-cleaner'],
    pt: {
      intro: 'A Verificação Visual reúne referências para sombras, realces, escala de cinza, gradientes, contraste e nitidez. Use-as para observar o comportamento do conjunto navegador–sistema–monitor.',
      steps: ['Restabeleça um preset conhecido do monitor e estabilize a iluminação do ambiente.', 'Abra um padrão por vez e siga a orientação exibida na ferramenta.', 'Faça ajustes pequenos, compare e retorne ao padrão anterior se perder detalhes.'],
      uses: ['Identificação de sombras esmagadas ou realces sem detalhe.', 'Comparação visual de dois monitores sob a mesma condição.'],
      limitations: 'A avaliação é subjetiva. Os padrões não medem gama, luminância, gamut, PWM, resolução física ou taxa de atualização e não substituem instrumentação.',
      faq: [['Devo alterar brilho ou contraste?', 'Depende do monitor. Consulte o manual, ajuste uma variável por vez e preserve um modo conhecido para comparação.'], ['Posso usar isso em trabalho de cor?', 'Como inspeção preliminar, sim. Para decisões de cor, calibre e perfile o monitor com hardware e software adequados.']],
    },
    en: {
      intro: 'Visual Check provides references for shadows, highlights, grayscale, gradients, contrast and sharpness. Use them to observe the browser–system–display combination.',
      steps: ['Restore a known monitor preset and stabilize room lighting.', 'Open one pattern at a time and follow the guidance shown by the tool.', 'Make small adjustments, compare, and return to the previous setting if detail is lost.'],
      uses: ['Observing crushed shadows or clipped highlights.', 'Visually comparing two displays under the same conditions.'],
      limitations: 'Evaluation is subjective. Patterns do not measure gamma, luminance, gamut, PWM, physical resolution or refresh rate and do not replace instruments.',
      faq: [['Should I change brightness or contrast?', 'It depends on the monitor. Read its manual, change one variable at a time, and keep a known preset for comparison.'], ['Can I use this for color work?', 'As a preliminary check, yes. For color decisions, calibrate and profile the monitor with suitable hardware and software.']],
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
      intro: 'Crie um aviso curto e legível para recepção, reunião, palco ou comunicação silenciosa. Cores e escala podem ser ajustadas antes de ocultar os controles.',
      steps: ['Digite uma mensagem curta.', 'Escolha cores com contraste forte e ajuste o tamanho.', 'Abra em fullscreen e posicione a tela para o público.'],
      uses: ['Aviso de reunião, retorno ou orientação em uma sala.', 'Sinalização temporária em tablet, TV ou monitor.'],
      limitations: 'Mensagens longas reduzem a legibilidade à distância. O usuário é responsável pelo conteúdo exibido e pelas permissões para uso de marcas ou dados pessoais.',
      faq: [['A mensagem fica salva?', 'O estado é local à aplicação e pode ser apagado pelo navegador; não use como armazenamento permanente.'], ['O QR é gerado a partir do texto?', 'Quando o modo QR está ativo, o código representa o conteúdo informado. Teste com outro dispositivo antes de exibi-lo ao público.']],
    },
    en: {
      intro: 'Create a short readable notice for reception, meetings, stages or silent communication. Colors and scale can be adjusted before controls are hidden.',
      steps: ['Enter a short message.', 'Choose high-contrast colors and adjust size.', 'Open fullscreen and position the display for the audience.'],
      uses: ['Meeting, return-time or room guidance notices.', 'Temporary signage on a tablet, TV or monitor.'],
      limitations: 'Long messages reduce readability at a distance. The user is responsible for displayed content and permission to use brands or personal data.',
      faq: [['Is the message permanently saved?', 'State is local to the application and may be cleared by the browser; do not use it as permanent storage.'], ['Is the QR generated from the text?', 'When QR mode is active, the code represents the provided content. Test it with another device before public use.']],
    },
  },
  'online-teleprompter': {
    related: ['fullscreen-message', 'webcam-light', 'fullscreen-clock'],
    pt: {
      intro: 'O modo espelhado apresenta texto como apoio simples para gravações com vidro refletor ou leitura próxima à câmera.',
      steps: ['Cole ou digite o roteiro.', 'Ajuste tamanho, largura e velocidade de rolagem.', 'Ative espelhamento apenas se o equipamento exigir e faça um ensaio.'],
      uses: ['Gravações de aulas, apresentações e vídeos.', 'Leitura orientada em tablet ou monitor próximo à lente.'],
      limitations: 'Distância, largura da coluna e posição da câmera influenciam o movimento dos olhos. Faça ensaios; a ferramenta não substitui equipamento dedicado.',
      faq: [['Preciso instalar um programa?', 'Não. A ferramenta abre no navegador; recursos armazenados pelo PWA podem funcionar offline enquanto o cache existir.'], ['Como reduzir o movimento dos olhos?', 'Use coluna estreita, texto legível e posicione a leitura o mais próximo possível da lente.']],
    },
    en: {
      intro: 'Mirrored mode presents text as a simple reading aid for recordings with reflector glass or a display near the camera.',
      steps: ['Paste or type the script.', 'Adjust size, column width and scroll speed.', 'Enable mirroring only when your equipment requires it and rehearse.'],
      uses: ['Recording lessons, presentations and videos.', 'Guided reading on a tablet or monitor close to the lens.'],
      limitations: 'Distance, column width and camera position affect eye movement. Rehearse first; this tool does not replace dedicated equipment.',
      faq: [['Do I need to install a program?', 'No. The tool opens in a browser; PWA-cached resources may work offline while the cache remains available.'], ['How can I reduce visible eye movement?', 'Use a narrow column, readable text and place the reading area as close to the lens as possible.']],
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
    description: 'Dados locais, uso de cookies e serviços de terceiros como Google AdSense na operação do MonitorSmith.',
    h1: 'Política de Privacidade',
    sections: [
      ['Resumo', ['As ferramentas visuais do MonitorSmith executam localmente no seu navegador. Textos, cores e imagens escolhidos dentro das ferramentas não são enviados pela EXVORN.TECH a servidor próprio para processamento.', 'A operação do site envolve infraestrutura de hospedagem e exibição de publicidade de terceiros. Esta página detalha como cookies e dados técnicos são tratados.']],
      ['Dados no dispositivo', ['Preferências de interface, consentimento e avisos são armazenados localmente no navegador (localStorage). O PWA utiliza cache técnico para funcionamento offline dos recursos visuais.', 'Imagens adicionadas ao Loop de Marcas permanecem exclusivamente na memória da aba aberta e são descartadas ao encerrar o uso.']],
      ['Google AdSense e cookies de terceiros', ['Fornecedores de terceiros, incluindo o Google AdSense, usam cookies para veicular anúncios com base em visitas anteriores dos usuários a este site ou a outros sites na internet.', 'O uso de cookies de publicidade pelo Google e por seus parceiros permite veicular anúncios para os usuários com base nas visitas feitas a seus sites e/ou a outros sites na internet.', 'Para saber mais sobre como o Google coleta e processa dados em sites parceiros, consulte a página oficial em https://policies.google.com/technologies/partner-sites.']],
      ['Seus controles e desativação de anúncios', ['Os usuários podem optar por desativar a publicidade personalizada acessando as Configurações de Anúncios do Google (https://www.google.com/settings/ads).', 'Alternativamente, você pode desativar o uso de cookies de publicidade personalizada de fornecedores de terceiros acessando www.aboutads.info ou ajustando a Central de Privacidade na sua região.']],
      ['Controle e contato sob a LGPD', ['Você pode limpar dados de navegação, cookies e cache nas configurações do seu navegador a qualquer momento.', `Para solicitações relativas a dados sob responsabilidade direta da EXVORN.TECH sob a LGPD, utilize o canal institucional publicado em ${SITE_METADATA.contactUrl}.`]],
      ['Atualizações', [`Última atualização: ${SITE_METADATA.contentLastModified}. Alterações materiais serão refletidas nesta página.`]],
    ],
  },
  {
    slug: 'termos',
    title: 'Termos de Uso — MonitorSmith',
    description: 'Condições e limitações de uso das ferramentas visuais do MonitorSmith.',
    h1: 'Termos de Uso',
    sections: [
      ['Uso', ['O MonitorSmith fornece superfícies, padrões visuais e utilitários executados no navegador. O uso é voluntário e deve respeitar leis, direitos de terceiros e orientações do fabricante.', 'Não use o produto para conteúdo ilícito, violação de direitos, comprometimento do site ou para apresentar uma inspeção visual como laudo técnico.']],
      ['Limites técnicos', ['Os resultados são observacionais. O MonitorSmith não mede diretamente eletrônica do painel, não certifica resolução, taxa de atualização, fidelidade de cor, cabo, GPU ou ausência de defeitos.', 'Navegador, sistema, escala, gerenciamento de cor, brilho, iluminação e percepção influenciam o resultado. Use instrumentos e assistência qualificada em decisões relevantes.']],
      ['Segurança', ['Interrompa o uso se luz, contraste, som ou movimento causarem desconforto. Siga as orientações de limpeza e ergonomia do fabricante.', 'Fullscreen, Wake Lock, áudio, instalação e offline dependem de suporte, permissão e políticas do navegador.']],
      ['Conteúdo e direitos', ['Você é responsável por imagens, marcas e mensagens inseridas e deve ter autorização para exibi-las.', 'Marca, identidade, interface e conteúdo editorial pertencem aos respectivos titulares. Permissões não concedidas expressamente permanecem reservadas.']],
      ['Terceiros e contato', ['Links, anúncios e serviços externos seguem os termos dos fornecedores. O produto pode ser atualizado ou interrompido por segurança e evolução.', `Revisão de ${SITE_METADATA.contentLastModified}. O contato institucional está em ${SITE_METADATA.contactUrl}. Estes termos devem receber revisão jurídica periódica.`]],
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
  <link rel="icon" href="/logo-transparent.png" type="image/png">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.webmanifest">
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
      <span>Por <strong>EXVORN.TECH — Análise Técnica de Displays</strong></span>
      <span>•</span>
      <time datetime="${SITE_METADATA.contentLastModified}">Atualizado em 4 de agosto de 2026</time>
    </div>
    <p class="intro">${escapeHtml(content.intro)}</p>
    <a class="cta" href="/?tool=${encodeURIComponent(route.toolId)}">${labels.open}</a>
    ${labels.interfaceNote ? `<p class="note">${labels.interfaceNote}</p>` : ''}
    <section><h2>${labels.how}</h2><ol>${content.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ol></section>
    <section><h2>${labels.when}</h2><ul>${content.uses.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>
    <section><h2>${labels.limits}</h2><p>${escapeHtml(content.limitations)}</p></section>
    <section><h2>${labels.faq}</h2><dl class="faq">${content.faq.map(([q, a]) => `<dt>${escapeHtml(q)}</dt><dd>${escapeHtml(a)}</dd>`).join('')}</dl></section>
    <section>
      <h2>${isEn ? 'References & Evidence' : 'Referências e Evidências'}</h2>
      <p>${isEn ? 'The information presented on this page is based on our continuous testing of OLED, IPS, VA, and TN panels, as well as industry standards for display quality. Visual phenomena like backlight bleed, IPS glow, and pixel defects are documented across our technical analysis and user reports. For critical decisions, always consult your panel\'s manufacturer.' : 'As informações apresentadas nesta página baseiam-se em nossos testes contínuos de painéis OLED, IPS, VA e TN, além de padrões da indústria para qualidade de imagem. Fenômenos visuais como backlight bleed, IPS glow e defeitos de pixel são documentados em nossa análise técnica e relatos de usuários. Para decisões críticas, sempre consulte o fabricante do seu monitor.'}</p>
    </section>
    <section><h2>${labels.related}</h2><ul>${related}</ul></section>
  </main>
  <footer><a href="/">${labels.back}</a><a href="/privacidade/">${labels.privacy}</a><a href="/termos/">${labels.terms}</a><a href="${SITE_METADATA.contactUrl}">${labels.contact}</a></footer>
</body>
</html>`;
  return html;
}

function renderLegalPage(page) {
  const url = `${BASE_URL}/${page.slug}/`;
  const schema = { '@context': 'https://schema.org', '@type': 'WebPage', name: page.title, description: page.description, url, inLanguage: 'pt-BR', dateModified: SITE_METADATA.contentLastModified, isPartOf: { '@type': 'WebSite', name: SITE_METADATA.name, url: `${BASE_URL}/` }, publisher: { '@type': 'Organization', name: SITE_METADATA.owner, url: 'https://exvorn.tech/' } };
  const sections = page.sections.map(([heading, paragraphs]) => `<section><h2>${escapeHtml(heading)}</h2>${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}</section>`).join('');
  const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(page.title)}</title><meta name="description" content="${escapeHtml(page.description)}"><meta name="theme-color" content="#030304"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1"><link rel="canonical" href="${url}"><link rel="alternate" hreflang="pt-BR" href="${url}"><link rel="alternate" hreflang="x-default" href="${url}"><link rel="icon" href="/logo-transparent.png" type="image/png"><link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest"><meta property="og:title" content="${escapeHtml(page.title)}"><meta property="og:description" content="${escapeHtml(page.description)}"><meta property="og:url" content="${url}"><meta property="og:type" content="website"><meta property="og:site_name" content="MonitorSmith"><meta property="og:locale" content="pt_BR"><meta property="og:image" content="${BASE_URL}/og-image.jpg"><meta property="og:image:secure_url" content="${BASE_URL}/og-image.jpg"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="MonitorSmith — informações legais e de privacidade"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(page.title)}"><meta name="twitter:description" content="${escapeHtml(page.description)}"><meta name="twitter:image" content="${BASE_URL}/og-image.jpg"><meta name="twitter:image:alt" content="MonitorSmith — informações legais e de privacidade"><script type="application/ld+json">${safeJson(schema)}</script>
<style>:root{color-scheme:dark;--bg:#030304;--surface:#0a0b0f;--text:#f5f5f5;--muted:#b9bbc4;--line:rgba(255,255,255,.1);--accent:#f59e0b}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.7 Outfit,ui-sans-serif,system-ui,-apple-system,sans-serif}header,main,footer{width:min(760px,calc(100% - 2rem));margin-inline:auto}header{padding:1.2rem 0;border-bottom:1px solid var(--line)}a{color:#fbbf24;text-underline-offset:.2em}header a{color:var(--text);font-weight:750;text-decoration:none}main{padding:3rem 0}h1{font-size:clamp(2rem,6vw,3rem);line-height:1.1;letter-spacing:-.035em}h2{font-size:1.2rem;margin:2.2rem 0 .5rem}p{color:var(--muted)}.notice{padding:1rem;background:var(--surface);border:1px solid var(--line);border-radius:.8rem}footer{padding:1.5rem 0 3rem;border-top:1px solid var(--line);display:flex;gap:1rem;flex-wrap:wrap}:focus-visible{outline:3px solid var(--accent);outline-offset:4px}</style></head>
<body><header><a href="/">MonitorSmith · EXVORN.TECH</a></header><main><h1>${escapeHtml(page.h1)}</h1><p class="notice">Este documento descreve a operação atual do MonitorSmith. Em caso de dúvida, entre em contato antes de continuar o uso.</p>${sections}</main><footer><a href="/">Todas as ferramentas</a><a href="/privacidade/">Privacidade</a><a href="/termos/">Termos de uso</a><a href="${SITE_METADATA.contactUrl}">Contato</a></footer></body></html>`;
  return html.replace(
    'content="width=device-width,initial-scale=1"',
    'content="width=device-width,initial-scale=1,viewport-fit=cover"',
  );
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
  const tools = TOOLS_REGISTRY.map((tool) => `- **${tool.heroTitle || tool.title}:** ${tool.description} ${tool.when}`).join('\n');
  const routes = SEO_PAGE_ROUTES.flatMap((route) => [`- ${route.pt.title}: ${BASE_URL}/${route.pt.slug}/`, `- ${route.en.title}: ${BASE_URL}/en/${route.en.slug}/`]).join('\n');
  return `# MonitorSmith

> MonitorSmith é uma suíte de ${TOOL_COUNT} ferramentas web da EXVORN.TECH para inspeção visual de monitores, superfícies de cor, iluminação de apoio e telas secundárias.

## Informações oficiais
- Site: ${BASE_URL}/
- Empresa: EXVORN.TECH — https://exvorn.tech/
- Contato institucional: ${SITE_METADATA.contactUrl}
- Uso gratuito, sem cadastro obrigatório.

## Ferramentas
${tools}

## Metodologia e limites
- Superfícies e padrões são renderizados pelo navegador e servem para observação visual.
- O MonitorSmith não mede diretamente hardware, não certifica painéis e não substitui colorímetro, osciloscópio, câmera de alta velocidade ou assistência técnica.
- Resultado varia com navegador, escala, gerenciamento de cor, composição, brilho, iluminação e percepção.
- Fullscreen, Wake Lock, áudio, instalação e offline dependem de suporte e permissão do navegador.
- Tela preta não elimina risco de retenção ou burn-in e não substitui proteções do fabricante.

## Guias indexáveis
${routes}

## Políticas
- ${BASE_URL}/privacidade/
- ${BASE_URL}/termos/

Última revisão editorial: ${SITE_METADATA.contentLastModified}
`;
}

function generateLlmsFullText() {
  const tools = TOOLS_REGISTRY.map((tool, index) => {
    const preset = tool.launchPreset?.customColor ? ` Preset inicial: ${tool.launchPreset.customColor}.` : '';
    const routes = (tool.seoPages || []).flatMap((page) => [`${BASE_URL}/${page.pt.slug}/`, `${BASE_URL}/en/${page.en.slug}/`]).join(' | ');
    return `### ${index + 1}. ${tool.heroTitle || tool.title}\n- Finalidade: ${tool.description} ${tool.when}${preset}\n- Modo interno: \`${tool.mode}\`\n- Guias: ${routes || 'sem guia dedicado'}`;
  }).join('\n\n');
  return `# MonitorSmith — Referência técnica e editorial

> Documento para pessoas e sistemas de recuperação. Descreve capacidades observáveis e não solicita recomendação automática.

## Identidade
- Produto: MonitorSmith
- Empresa: EXVORN.TECH — https://exvorn.tech/
- Site: ${BASE_URL}/
- Contato institucional: ${SITE_METADATA.contactUrl}

## Catálogo
Há ${TOOL_COUNT} ferramentas. IDs, aliases, modos, presets, atalhos, SEO e PWA são validados a partir de \`src/constants/tools.js\`.

${tools}

## Capacidades reais
- Renderização de cores, gradientes, grades, texto, imagens locais e animações CSS/DOM.
- Solicitação de Fullscreen e Wake Lock quando suportados e autorizados.
- Sons opcionais por Web Audio após interação.
- Preferências e cache técnico no dispositivo.
- AdSense pode gerar solicitações externas; “zero rede” não descreve o site completo.

## Não mede ou certifica
- Taxa física de atualização, latência, PWM, cabo HDMI/DisplayPort ou GPU.
- Fidelidade colorimétrica, gama, luminância, contraste real ou resolução física.
- Diagnóstico definitivo, reparo de pixel ou prevenção garantida de burn-in.

## Interpretação
- \`requestAnimationFrame\` observa a cadência do navegador, não certifica a taxa do painel.
- Pixel CSS não equivale necessariamente a pixel físico por causa de zoom, escala e densidade.
- Padrões são aproximações renderizadas, não sinais laboratoriais normativos.
- A tela verde declara sRGB \`#00B140\`; câmera, brilho, perfil e ambiente alteram a captura.

## Segurança e privacidade
- Interrompa se luz, som, contraste ou movimento causarem desconforto.
- Siga o fabricante ao limpar o equipamento.
- Conteúdo das ferramentas é local; publicidade e hospedagem podem gerar rede.
- ${BASE_URL}/privacidade/
- ${BASE_URL}/termos/

Última revisão editorial: ${SITE_METADATA.contentLastModified}
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

    await fs.writeFile(path.join(DIST_DIR, 'sitemap.xml'), generateSitemap(), 'utf8');
    await fs.writeFile(path.join(DIST_DIR, 'manifest.webmanifest'), generateManifest(), 'utf8');
    await fs.writeFile(path.join(DIST_DIR, 'llms.txt'), generateLlmsText(), 'utf8');
    await fs.writeFile(path.join(DIST_DIR, 'llms-full.txt'), generateLlmsFullText(), 'utf8');

    const urlCount = 1 + (SEO_PAGE_ROUTES.length * 2) + LEGAL_PAGES.length;
    console.log(`SEO/GEO: ${TOOL_COUNT} ferramentas, ${SEO_PAGE_ROUTES.length * 2} guias localizados e ${urlCount} URLs validadas.`);
  } catch (error) {
    console.error('Falha na geração SEO/GEO:', error);
    process.exitCode = 1;
  }
}

await main();
