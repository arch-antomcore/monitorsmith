/**
 * Conteúdo editorial das páginas dos instrumentos adicionados na revisão
 * "Instrument Bench". Mesmo formato exigido por validateEditorialContent:
 * intro, steps (3+), uses (2+), limitations, faq (2+) e methodology.
 */

export const INSTRUMENT_EDITORIAL = Object.freeze({
  'display-info': {
    related: ['ppi-calculator', 'refresh-rate', 'monitor-test'],
    pt: {
      intro: 'A ficha técnica reúne, em uma tela, as informações expostas pelo navegador sobre o seu display: resolução lógica e estimativa de resolução, devicePixelRatio, profundidade de cor, gamut declarado, faixa dinâmica, orientação e a GPU que está compondo os quadros.',
      steps: [
        'Abra a ferramenta na tela que você quer auditar — em setups com dois monitores, arraste a janela para o painel certo antes de ler os valores.',
        'Compare a estimativa com as configurações de vídeo do sistema. Zoom, escala e proteções de privacidade podem alterar os valores; a leitura não confirma a resolução nativa do painel.',
        'Confira os indícios de gamut e faixa dinâmica declarados ao navegador e compare-os com as configurações do sistema e do monitor.',
      ],
      uses: [
        'Descobrir se o Windows ou o macOS está aplicando escala (125%, 150%, 200%) e reduzindo a nitidez percebida.',
        'Observar se o navegador declara suporte a faixa dinâmica ampliada antes de conferir o modo no sistema.',
        'Registrar a identificação de GPU exposta pelo WebGL, que pode ser genérica ou mascarada.',
        'Documentar uma leitura do navegador em tickets de suporte e inventários, com data e limitações.',
      ],
      limitations: 'O navegador expõe apenas o que o sistema operacional declara. Ele não lê o EDID completo, não mede luminância em cd/m² e não confirma cobertura real de gamut — para isso é necessário um colorímetro.',
      faq: [
        ['Por que a resolução mostrada é menor do que a do meu monitor 4K?', 'screen.width devolve pixels CSS. Seu produto por devicePixelRatio é apenas uma estimativa afetada pelo zoom e pela escala; consulte o sistema operacional para confirmar a resolução do sinal.'],
        ['O campo de GPU mostra "ANGLE", um nome genérico ou nada. Isso é problema?', 'Não necessariamente. O navegador pode traduzir, abreviar ou ocultar o renderizador por compatibilidade e privacidade; confirme o hardware no sistema operacional.'],
      ],
      methodology: [
        'A leitura combina quatro fontes independentes. A interface Screen entrega largura, altura, área disponível, profundidade de cor e orientação em pixels lógicos. A propriedade devicePixelRatio informa quantos pixels físicos existem para cada pixel CSS, e o produto dos dois é uma estimativa, pois devicePixelRatio também varia com o zoom da página.',
        'Gamut e faixa dinâmica vêm das media queries CSS `color-gamut` e `dynamic-range`. Elas descrevem capacidades declaradas ao navegador, sem medir cobertura, luminância ou validar toda a cadeia HDR.',
        'A identificação da GPU tenta consultar `WEBGL_debug_renderer_info` em um contexto WebGL temporário. O navegador pode omitir ou mascarar o valor; a ferramenta não confirma qual GPU dirige fisicamente o painel.',
      ],
    },
    en: {
      intro: 'The fact sheet gathers, on one screen, the information exposed by the browser about your display: logical and estimated resolution, devicePixelRatio, colour depth, declared gamut, dynamic range, orientation and the GPU compositing your frames.',
      steps: [
        'Open the tool on the screen you want to audit — on dual-monitor setups, drag the window to the right panel before reading the values.',
        'Compare the estimate with the operating system display settings. Zoom, scaling and privacy protections can change these values; this reading does not confirm native panel resolution.',
        'Check the gamut and dynamic-range hints declared to the browser, then compare them with operating-system and monitor settings.',
      ],
      uses: [
        'Find out whether Windows or macOS is applying scaling (125%, 150%, 200%) and softening perceived sharpness.',
        'Observe whether the browser declares wider dynamic-range support before checking the mode in system settings.',
        'Record the GPU identifier exposed through WebGL, which may be generic or masked.',
        'Document a dated browser reading in reports, support tickets and IT inventories with its limitations.',
      ],
      limitations: 'The browser only exposes what the operating system declares. It does not read the full EDID, does not measure luminance in cd/m² and cannot confirm real gamut coverage — that requires a colorimeter.',
      faq: [
        ['Why is the reported resolution lower than my 4K monitor?', 'screen.width returns CSS pixels. Multiplying it by devicePixelRatio is only an estimate affected by page zoom and scaling; check operating system settings to confirm signal resolution.'],
        ['The GPU field shows "ANGLE", a generic name or nothing. Is that a problem?', 'Not necessarily. Browsers may translate, abbreviate or hide renderer details for compatibility and privacy; confirm hardware in the operating system.'],
      ],
      methodology: [
        'The reading combines four independent sources. The Screen interface returns width, height, available area, colour depth and orientation in logical pixels. The devicePixelRatio property tells how many physical pixels exist per CSS pixel, and the product is an estimate, because devicePixelRatio also changes with page zoom.',
        'Gamut and dynamic range come from the CSS `color-gamut` and `dynamic-range` media queries. They describe capabilities declared to the browser without measuring coverage, luminance or validating the full HDR chain.',
        'GPU identification attempts to query `WEBGL_debug_renderer_info` in a temporary WebGL context. Browsers may omit or mask the value; the tool cannot confirm which GPU physically drives the panel.',
      ],
    },
  },

  'refresh-rate': {
    related: ['motion-blur', 'display-info', 'monitor-test'],
    pt: {
      intro: 'O medidor amostra callbacks de animação e estima sua cadência, intervalo médio, variação e intervalos longos. O resultado depende do navegador, da carga do sistema e da precisão do relógio disponível.',
      steps: [
        'Feche abas pesadas, deixe esta aba em primeiro plano e conecte o notebook na tomada — economia de energia limita a cadência de composição.',
        'Aguarde de 5 a 10 segundos até o Hz médio estabilizar; o valor instantâneo oscila por natureza em janelas curtas de amostragem.',
        'Compare o resultado com a taxa configurada no sistema operacional e observe o gráfico de frame time em busca de picos periódicos.',
      ],
      uses: [
        'Comparar a cadência observada com a taxa configurada depois de trocar cabo, porta ou driver.',
        'Registrar quedas de cadência para investigar carga, energia, compositor ou outras causas.',
        'Observar a regularidade dos callbacks em diferentes modos, sem validar VRR.',
        'Registrar antes e depois de mudanças de configuração em relatórios de suporte técnico.',
      ],
      limitations: 'O navegador não consegue exceder a cadência do compositor do sistema, e não mede o tempo de resposta do painel nem o input lag total da cadeia. O número obtido é a taxa de composição percebida pela aba.',
      faq: [
        ['Meu monitor é 165 Hz, mas mediu 60 Hz. Por quê?', 'A aba pode estar limitada pelo navegador, economia de energia, compositor ou configuração do sistema. Confira o modo de vídeo e repita com a janela em primeiro plano; a página não identifica a causa.'],
        ['O que significa variação alta com Hz médio correto?', 'Os intervalos dos callbacks foram irregulares durante a amostra. Carga do sistema, agendamento e composição podem influenciar; o valor não diagnostica painel ou VRR.'],
      ],
      methodology: [
        'A contagem usa requestAnimationFrame, cujo callback é agendado imediatamente antes de cada composição de quadro, recebendo um timestamp de alta resolução conforme a especificação W3C High Resolution Time. A diferença entre timestamps consecutivos estima o intervalo dos callbacks; não confirma quando cada quadro foi apresentado fisicamente.',
        'A taxa média divide o número de quadros pelo intervalo total decorrido, o que elimina o ruído de janelas curtas. O jitter é o desvio padrão dos frame times, calculado por soma acumulada dos quadrados; esse valor descreve a regularidade da amostra e não diagnostica a saúde do painel.',
        'A contagem de quadros perdidos marca cada intervalo que passa de 1,8 vez a média corrente, uma heurística de intervalos longos, não uma contagem certificada de quadros descartados. A medição não confirma o funcionamento de VRR.',
      ],
    },
    en: {
      intro: 'The meter samples animation callbacks and estimates their cadence, average interval, variation and long intervals. Results depend on the browser, system load and available timer precision.',
      steps: [
        'Close heavy tabs, keep this tab in the foreground and plug the laptop in — power saving caps the composition cadence.',
        'Wait 5 to 10 seconds until the average Hz settles; the instant value naturally swings over short sampling windows.',
        'Compare the result with the rate configured in the operating system and watch the frame time graph for periodic spikes.',
      ],
      uses: [
        'Compare observed cadence with the configured rate after swapping cable, port or driver.',
        'Record cadence drops for investigating load, power, compositor or other causes.',
        'Observe callback regularity in different modes without validating VRR.',
        'Record before-and-after evidence of configuration changes in technical support reports.',
      ],
      limitations: 'The browser cannot exceed the system compositor cadence, and it measures neither panel response time nor total input lag. The number is the composition rate as perceived by the tab.',
      faq: [
        ['My monitor is 165 Hz but it measured 60 Hz. Why?', 'The tab may be limited by the browser, power saving, compositor or system configuration. Check the display mode and repeat in the foreground; the page cannot identify the cause.'],
        ['What does high variation with a correct average Hz mean?', 'Callback intervals were irregular during the sample. System load, scheduling and composition can influence them; the value does not diagnose the panel or VRR.'],
      ],
      methodology: [
        'Counting relies on requestAnimationFrame, whose callback is scheduled right before each frame composition and receives a high-resolution timestamp as defined by the W3C High Resolution Time specification. The difference between consecutive timestamps estimates callback intervals; it does not confirm physical presentation time.',
        'The average rate divides the frame count by the total elapsed interval, which removes short-window noise. Jitter is the standard deviation of frame times, computed from an accumulated sum of squares; this describes sample regularity and does not diagnose panel health.',
        'The dropped-frame counter flags every interval above 1.8 times the running mean, a heuristic for long intervals, not a certified count of discarded frames. The measurement does not verify VRR operation.',
      ],
    },
  },

  uniformity: {
    related: ['black-screen', 'screen-cleaner', 'dead-pixel-test'],
    pt: {
      intro: 'A ferramenta percorre degraus digitais de cinza de 0% a 100%, com uma grade opcional de nove zonas, para comparar visualmente centro, bordas e cantos.',
      steps: [
        'Apague as luzes do ambiente, mantenha o brilho de uso normal e entre em tela cheia com a tecla F.',
        'Comece no degrau de 0% e observe centro, bordas e cantos de frente, a cerca de 70 cm de distância.',
        'Suba para 5%, 10% e 50% comparando as nove zonas entre si; anote onde aparecem diferenças visíveis a olho nu.',
      ],
      uses: [
        'Avaliar um monitor recém-comprado enquanto a política de troca aplicável estiver vigente.',
        'Documentar manchas e vazamentos antes de abrir um pedido de garantia ou RMA.',
        'Comparar dois painéis lado a lado nas mesmas condições de iluminação.',
        'Registrar mudanças aparentes de uniformidade ou retenção sob condições repetidas.',
      ],
      limitations: 'A uniformidade percebida depende de brilho, ângulo e luz ambiente. Esta é uma referência visual: medir desvio percentual de luminância entre zonas exige sonda fotométrica e procedimento VESA FPDM.',
      faq: [
        ['Um pouco de brilho nos cantos é defeito?', 'O brilho aparente pode mudar com ângulo, exposição e tecnologia do painel. Compare de frente e em brilho normal; a página não classifica garantia nem causa física.'],
        ['Posso fotografar a tela para documentar?', 'Para registro serve, mas não use a foto como medida. Sensores de celular ampliam o vazamento em cenas escuras por causa do ganho automático. Avalie sempre a olho nu e use a foto apenas como anexo.'],
      ],
      methodology: [
        'Os degraus solicitam valores RGB iguais calculados entre 0 e 255. Gerenciamento de cor, composição, escala, GPU e processamento do painel podem transformar a saída física.',
        'A grade 3 × 3 serve para nomear regiões e repetir observações. Ela não implementa um procedimento fotométrico VESA nem calcula desvio entre zonas.',
        'Distância, ângulo, brilho, adaptação visual e luz ambiente alteram o resultado. Mantenha essas condições registradas quando comparar duas sessões.',
      ],
    },
    en: {
      intro: 'The tool steps through digital gray levels from 0% to 100%, with an optional nine-zone grid for visually comparing centre, edges and corners.',
      steps: [
        'Turn the room lights off, keep your normal brightness and enter fullscreen with the F key.',
        'Start at the 0% step and inspect centre, edges and corners straight on, from about 70 cm away.',
        'Move up to 5%, 10% and 50% while comparing the nine zones against each other; note where differences are visible to the naked eye.',
      ],
      uses: [
        'Assess a freshly bought monitor while the applicable return policy remains in effect.',
        'Document patches and bleed before opening a warranty or RMA request.',
        'Compare two panels side by side under identical lighting conditions.',
        'Record apparent changes in uniformity or retention under repeated conditions.',
      ],
      limitations: 'Perceived uniformity depends on brightness, angle and ambient light. This is a visual reference: measuring percentage luminance deviation between zones requires a photometric probe and the VESA FPDM procedure.',
      faq: [
        ['Is a little corner glow a defect?', 'Apparent glow can change with angle, exposure and panel technology. Compare straight on at normal brightness; this page cannot classify warranty status or physical cause.'],
        ['Can I photograph the screen to document it?', 'For record keeping yes, but never as a measurement. Automatic exposure and image processing can make bleed appear stronger in dark scenes. Judge with your own eyes and use the photo only as an attachment.'],
      ],
      methodology: [
        'Steps request equal RGB values calculated between 0 and 255. Colour management, composition, scaling, GPU and panel processing can transform the physical output.',
        'The 3 × 3 grid helps name regions and repeat observations. It does not implement a VESA photometric procedure or calculate zone deviation.',
        'Distance, angle, brightness, visual adaptation and ambient light alter results. Record those conditions when comparing sessions.',
      ],
    },
  },

  'keyboard-test': {
    related: ['mouse-test', 'gamepad-test', 'touch-tester'],
    pt: {
      intro: 'O teste acende um mapa conforme recebe eventos de teclado, guarda `KeyboardEvent.code`, mede o intervalo de repetição do sistema e conta teclas simultâneas observadas na página.',
      steps: [
        'Abra o instrumento: enquanto ele está ativo, todos os atalhos do MonitorSmith ficam desligados para não interferir na leitura.',
        'Pressione todas as teclas uma a uma; as já registradas ficam contornadas em âmbar e a tecla ativa acende cheia.',
        'Segure combinações de três, quatro e seis teclas ao mesmo tempo e acompanhe o contador de simultâneas para achar o limite do seu teclado.',
      ],
      uses: [
        'Encontrar teclas mortas ou intermitentes antes de comprar ou vender um teclado usado.',
        'Observar o intervalo da repetição automática configurada no sistema.',
        'Comparar combinações simultâneas expostas ao navegador, sem certificar NKRO físico.',
        'Consultar `KeyboardEvent.code` e `key` ao investigar macros, jogos e remapeamentos.',
      ],
      limitations: 'Teclas interceptadas pelo sistema operacional ou pelo firmware — Print Screen, teclas de mídia, Fn e algumas combinações com a tecla Windows — podem nunca chegar ao navegador, e isso não indica defeito.',
      faq: [
        ['Uma tecla não acende. O teclado está com defeito?', 'Talvez, mas o sistema, o navegador, o firmware ou um atalho global podem interceptá-la. Repita em outro aplicativo ou dispositivo antes de atribuir o sintoma ao hardware.'],
        ['Como interpretar o contador de teclas simultâneas?', 'Ele mostra o máximo de eventos que chegaram à página naquela combinação. Teste várias combinações; o resultado não certifica toda a matriz nem o protocolo do teclado.'],
      ],
      methodology: [
        'A leitura usa eventos `keydown` e `keyup` e registra `KeyboardEvent.code`, um identificador DOM associado à posição esperada, além de `key`, que reflete o valor interpretado pelo layout. Nenhum deles é um scan code bruto do dispositivo.',
        'O intervalo de repetição é medido apenas em eventos com a flag repeat ativa, comparando timestamps de performance.now(). Esse número corresponde à taxa de repetição configurada no sistema operacional, não a uma característica do hardware.',
        'A contagem mantém um conjunto de eventos atualmente pressionados e registra o maior tamanho alcançado. Sistema, firmware, matriz, protocolo e combinação escolhida podem limitar o que chega à página.',
      ],
    },
    en: {
      intro: 'The test lights a map as it receives keyboard events, stores `KeyboardEvent.code`, measures system repeat intervals and counts simultaneous keys observed by the page.',
      steps: [
        'Open the instrument: while it is active every MonitorSmith shortcut is disabled so nothing interferes with the reading.',
        'Press every key one by one; already registered keys keep an amber outline and the active key lights up solid.',
        'Hold combinations of three, four and six keys at once and watch the simultaneous counter to find your keyboard limit.',
      ],
      uses: [
        'Find dead or intermittent keys before buying or selling a used keyboard.',
        'Observe the interval of automatic key repeat configured by the system.',
        'Compare simultaneous combinations exposed to the browser without certifying physical NKRO.',
        'Inspect `KeyboardEvent.code` and `key` while investigating macros, games and remaps.',
      ],
      limitations: 'Keys intercepted by the operating system or firmware — Print Screen, media keys, Fn and some Windows-key combinations — may never reach the browser, and that is not a defect.',
      faq: [
        ['One key does not light up. Is the keyboard faulty?', 'Maybe, but the system, browser, firmware or a global shortcut may intercept it. Repeat in another application or device before assigning the symptom to hardware.'],
        ['How should I interpret the simultaneous-key counter?', 'It shows the most events that reached the page for that combination. Try several combinations; the result cannot certify the entire matrix or keyboard protocol.'],
      ],
      methodology: [
        'The reading uses `keydown` and `keyup` events and records `KeyboardEvent.code`, a DOM identifier associated with an expected position, plus `key`, which reflects the layout-interpreted value. Neither is a raw device scan code.',
        'Repeat interval is measured only on events with the repeat flag set, comparing performance.now() timestamps. That number matches the repeat rate configured in the operating system, not a hardware characteristic.',
        'Simultaneous counting keeps a set of currently held events and records the largest size reached. The operating system, firmware, matrix, protocol and chosen combination can limit what reaches the page.',
      ],
    },
  },

  'mouse-test': {
    related: ['keyboard-test', 'gamepad-test', 'motion-blur'],
    pt: {
      intro: 'O instrumento registra botões e eventos de roda, estima a taxa de eventos entregue pelo navegador durante o movimento e sinaliza cliques duplos indesejados.',
      steps: [
        'Mova o cursor dentro da área de amostragem em movimentos amplos e contínuos por alguns segundos para o polling estabilizar.',
        'Clique uma vez em cada botão, incluindo os laterais, e gire a roda para cima, para baixo e na horizontal.',
        'Dê cliques únicos bem espaçados e observe o contador de cliques duplos suspeitos: qualquer valor acima de zero merece atenção.',
      ],
      uses: [
        'Registrar repetições suspeitas antes de comparar em outro aplicativo ou dispositivo.',
        'Verificar se os botões laterais e a roda horizontal estão sendo reconhecidos pelo sistema.',
        'Comparar a taxa de eventos observada no navegador em diferentes mouses, portas e configurações.',
        'Testar rapidamente um mouse usado antes de fechar a compra.',
      ],
      limitations: 'A taxa medida é limitada pela cadência de eventos que o navegador entrega, normalmente atrelada ao compositor. Não é uma leitura direta do firmware do mouse nem uma medição de DPI.',
      faq: [
        ['Meu mouse é 1000 Hz, mas mediu bem menos. Está com problema?', 'Não é possível concluir isso aqui. O navegador pode agrupar, limitar ou descartar eventos; o valor observado não equivale à frequência USB do dispositivo.'],
        ['O que significa um clique repetido abaixo de 60 ms?', 'É um evento marcado pela heurística da ferramenta. Repetições frequentes merecem comparação controlada, mas o intervalo não comprova defeito nem identifica a causa física.'],
      ],
      methodology: [
        'Os cliques são lidos por Pointer Events com preventDefault, o que permite capturar os botões 3 e 4 (voltar e avançar) que o navegador normalmente consome para navegar no histórico. Cada pressionamento guarda o timestamp de performance.now() por botão.',
        'A taxa soma eventos coalescidos devolvidos por getCoalescedEvents em cada pointermove. O valor descreve eventos expostos pelo navegador e pode divergir da frequência de relatórios USB do dispositivo.',
        'O limiar de 60 ms é uma heurística de triagem para destacar eventos próximos. Cadência humana, software, firmware e hardware variam, portanto a marcação precisa ser repetida e comparada.',
      ],
    },
    en: {
      intro: 'The instrument records button and wheel events, estimates the browser-delivered event rate while the cursor moves and flags unintended double clicks.',
      steps: [
        'Move the cursor inside the sampling area in wide, continuous strokes for a few seconds so the polling reading settles.',
        'Click each button once, including the side buttons, and spin the wheel up, down and horizontally.',
        'Make single, well-spaced clicks and watch the suspicious double-click counter: any value above zero deserves attention.',
      ],
      uses: [
        'Record suspicious repeats before comparing in another application or device.',
        'Verify that side buttons and horizontal wheel are recognised by the system.',
        'Compare the event rate observed in the browser across different mice, ports and settings.',
        'Quickly test a second-hand mouse before closing the deal.',
      ],
      limitations: 'The measured rate is capped by the event cadence the browser delivers, usually tied to the compositor. It is neither a direct firmware reading nor a DPI measurement.',
      faq: [
        ['My mouse is 1000 Hz but it measured much less. Is it broken?', 'This page cannot answer that. The browser may batch, cap or discard events; the observed value is not the device USB report frequency.'],
        ['What does a repeated click below 60 ms mean?', 'It is an event flagged by the tool heuristic. Frequent repeats deserve controlled comparison, but the interval does not prove a defect or identify a physical cause.'],
      ],
      methodology: [
        'Clicks are read through Pointer Events with preventDefault, which lets us capture buttons 3 and 4 (back and forward) that the browser normally consumes for history navigation. Every press stores a performance.now() timestamp per button.',
        'The rate sums coalesced events returned by getCoalescedEvents on each pointermove. It describes events exposed by the browser and may differ from the device USB report frequency.',
        'The 60 ms threshold is a triage heuristic for highlighting nearby events. Human cadence, software, firmware and hardware vary, so a flag should be repeated and compared.',
      ],
    },
  },

  'gamepad-test': {
    related: ['mouse-test', 'keyboard-test', 'motion-blur'],
    pt: {
      intro: 'O teste mostra os botões, eixos e valores de gatilho expostos pela Gamepad API e tenta acionar vibração quando o navegador e o controle oferecem um atuador compatível.',
      steps: [
        'Conecte o controle por cabo ou Bluetooth e aperte qualquer botão: por privacidade, o navegador só revela o dispositivo depois de uma interação.',
        'Aperte cada botão e gatilho observando o painel; gatilhos analógicos mostram o valor intermediário durante o curso.',
        'Solte completamente os analógicos e leia o campo de drift em repouso, que deve ficar próximo de zero.',
      ],
      uses: [
        'Observar desvio dos eixos em repouso antes de comparar em jogos ou outro dispositivo.',
        'Conferir quais botões e gatilhos a API expõe para um controle usado.',
        'Comparar curso e centro reportados em diferentes movimentos.',
        'Tentar a vibração sem abrir um jogo, quando a API oferecer suporte.',
      ],
      limitations: 'A Gamepad API padroniza o mapeamento em um layout genérico. Controles exóticos podem reportar botões fora de ordem, e a vibração só funciona onde o navegador implementa o atuador dual-rumble.',
      faq: [
        ['Qual valor de drift já é problema?', 'Não existe um limiar universal no navegador. Os marcadores 0,05 e 0,08 são referências de triagem; jogos aplicam zonas mortas diferentes. Compare em repouso e no uso real.'],
        ['Meu controle não aparece na lista. O que fazer?', 'Aperte um botão do controle com esta página em foco. Navegadores só expõem o dispositivo depois de uma interação do usuário, justamente para evitar identificação silenciosa de hardware.'],
      ],
      methodology: [
        'A leitura chama navigator.getGamepads() a cada quadro via requestAnimationFrame, conforme o modelo de polling definido pela especificação W3C Gamepad. Cada objeto devolve o array buttons, com estado booleano e valor analógico de 0 a 1, e o array axes normalizado entre -1 e 1.',
        'O desvio é calculado como o maior valor absoluto entre os eixos reportados. Mapeamento, calibração, sensor e posição dos controles variam; o número não identifica a tecnologia nem a causa.',
        'A vibração tenta usar `vibrationActuator.playEffect` com `dual-rumble`. Suporte, mapeamento e efeito efetivo dependem do navegador, sistema e controle.',
      ],
    },
    en: {
      intro: 'The test shows buttons, axes and trigger values exposed by the Gamepad API and attempts vibration when the browser and controller provide a compatible actuator.',
      steps: [
        'Connect the controller by cable or Bluetooth and press any button: for privacy reasons the browser only reveals the device after an interaction.',
        'Press each button and trigger while watching the panel; analog triggers show intermediate values along their travel.',
        'Fully release the sticks and read the idle drift field, which should stay close to zero.',
      ],
      uses: [
        'Observe idle axis deviation before comparing in games or on another device.',
        'Check which buttons and triggers the API exposes for a second-hand controller.',
        'Compare reported centre and travel through different movements.',
        'Attempt vibration without launching a game where the API supports it.',
      ],
      limitations: 'The Gamepad API standardises mapping into a generic layout. Exotic controllers may report buttons out of order, and rumble only works where the browser implements the dual-rumble actuator.',
      faq: [
        ['Which drift value is already a problem?', 'There is no universal browser threshold. The 0.05 and 0.08 markers are triage references; games apply different dead zones. Compare the idle reading with real use.'],
        ['My controller does not show up. What now?', 'Press a button on the controller with this page focused. Browsers only expose the device after user interaction, precisely to avoid silent hardware fingerprinting.'],
      ],
      methodology: [
        'The reading calls navigator.getGamepads() every frame through requestAnimationFrame, following the polling model defined by the W3C Gamepad specification. Each object returns the buttons array, with boolean state and analog value from 0 to 1, plus the axes array normalised between -1 and 1.',
        'Deviation is computed as the largest absolute value across reported axes. Mapping, calibration, sensor and control position vary; the number identifies neither technology nor cause.',
        'Rumble attempts `vibrationActuator.playEffect` with `dual-rumble`. Support, mapping and effective output depend on browser, operating system and controller.',
      ],
    },
  },

  'display-calculators': {
    related: ['ppi-calculator', 'refresh-rate', 'display-info'],
    pt: {
      intro: 'Três estimativas em um painel: banda RGB bruta com margem fixa, distância geométrica por campo de visão e dimensões físicas por proporção de tela.',
      steps: [
        'Informe resolução, taxa de atualização e bits por canal para obter uma estimativa bruta e compará-la com capacidades nominais de interfaces.',
        'Preencha a diagonal e a proporção do painel para obter largura, altura e área reais em centímetros.',
        'Ajuste o campo de visão horizontal desejado e leia a distância de visão correspondente em centímetros e polegadas.',
      ],
      uses: [
        'Comparar uma estimativa com capacidades nominais antes de verificar cabo, porta, timings e dispositivos.',
        'Estimar se um monitor cabe na mesa e qual distância corresponde ao campo de visão escolhido.',
        'Planejar setups de simulação e edição em que o campo de visão importa mais que a diagonal.',
        'Fornecer uma referência inicial para investigar uma combinação de resolução e taxa.',
      ],
      limitations: 'A banda usa uma margem fixa de 5% e não calcula timings CVT-RB, overhead de codificação, número de lanes, DSC ou recursos específicos. Não determina compatibilidade de cabo, porta, GPU e monitor.',
      faq: [
        ['Como o DSC afeta a comparação?', 'DSC comprime o fluxo de vídeo quando toda a cadeia oferece suporte. Razão, timings e compatibilidade variam; confirme nas especificações da GPU, porta, monitor e cabo.'],
        ['Qual campo de visão devo usar?', 'Use o controle para comparar cenários. Conforto depende de tarefa, visão, distância, tamanho, postura e preferência; não há um valor universal prescrito pela ferramenta.'],
      ],
      methodology: [
        'A banda multiplica largura, altura, taxa e bits dos três canais RGB e acrescenta uma margem fixa de 5%. É uma aproximação, sem modelar o transporte real da interface.',
        'A distância geométrica usa metade da largura dividida pela tangente de metade do campo de visão escolhido. O resultado descreve essa geometria e não uma distância ergonômica ideal.',
        'As dimensões físicas derivam da diagonal e da proporção. Para uma proporção a = largura/altura, a largura vale diagonal × a ÷ √(a² + 1), e a altura é a largura dividida por a. Como a diagonal é informada em polegadas, os resultados são convertidos por 2,54 cm por polegada.',
      ],
    },
    en: {
      intro: 'Three estimates in one panel: raw RGB bandwidth with a fixed margin, geometric distance by field of view, and physical dimensions by aspect ratio.',
      steps: [
        'Enter resolution, refresh rate and bits per channel to get a raw estimate and compare it with nominal interface capacities.',
        'Fill in the panel diagonal and aspect ratio to get real width, height and area in centimetres.',
        'Adjust the target horizontal field of view and read the matching viewing distance in centimetres and inches.',
      ],
      uses: [
        'Compare an estimate with nominal capabilities before checking the cable, port, timings and devices.',
        'Estimate whether a monitor fits the desk and which distance matches the chosen field of view.',
        'Plan simulation and editing setups where field of view matters more than diagonal size.',
        'Provide an initial reference while investigating a resolution and refresh-rate combination.',
      ],
      limitations: 'Bandwidth uses a fixed 5% margin and does not calculate CVT-RB timings, encoding overhead, lane count, DSC or device-specific features. It cannot determine cable, port, GPU and monitor compatibility.',
      faq: [
        ['How does DSC affect the comparison?', 'DSC compresses the video stream when the entire chain supports it. Ratio, timings and compatibility vary; verify GPU, port, monitor and cable specifications.'],
        ['Which field of view should I use?', 'Use the control to compare scenarios. Comfort depends on task, eyesight, distance, size, posture and preference; the tool prescribes no universal value.'],
      ],
      methodology: [
        'Bandwidth multiplies width, height, refresh rate and the three RGB channel bits, then adds a fixed 5% margin. It is an approximation and does not model real interface transport.',
        'Geometric distance is half the physical width divided by the tangent of half the selected field of view. The result describes that geometry, not an ideal ergonomic distance.',
        'Physical dimensions derive from diagonal and aspect ratio. For an aspect a = width/height, width equals diagonal × a ÷ √(a² + 1), and height is width divided by a. Since the diagonal is entered in inches, results are converted at 2.54 cm per inch.',
      ],
    },
  },
});
