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
        'Confira o gamut e a faixa dinâmica: "Display-P3" e "HDR / high" só aparecem quando o sistema operacional realmente entregou um caminho de cor ampliado ao navegador.',
      ],
      uses: [
        'Descobrir se o Windows ou o macOS está aplicando escala (125%, 150%, 200%) e reduzindo a nitidez percebida.',
        'Verificar se o HDR está de fato ativo antes de gravar, editar ou jogar conteúdo em alta faixa dinâmica.',
        'Identificar qual GPU está renderizando a aba em notebooks com gráficos híbridos Intel/NVIDIA ou AMD.',
        'Documentar a configuração exata de um posto de trabalho em laudos, tickets de suporte e inventários de TI.',
      ],
      limitations: 'O navegador expõe apenas o que o sistema operacional declara. Ele não lê o EDID completo, não mede luminância em cd/m² e não confirma cobertura real de gamut — para isso é necessário um colorímetro.',
      faq: [
        ['Por que a resolução mostrada é menor do que a do meu monitor 4K?', 'screen.width devolve pixels CSS. Seu produto por devicePixelRatio é apenas uma estimativa afetada pelo zoom e pela escala; consulte o sistema operacional para confirmar a resolução do sinal.'],
        ['O campo de GPU mostra "ANGLE" ou um nome estranho. Isso é problema?', 'Não. Navegadores baseados em Chromium traduzem WebGL para Direct3D pela camada ANGLE e prefixam o nome do adaptador. O modelo real da placa aparece dentro dos parênteses.'],
      ],
      methodology: [
        'A leitura combina quatro fontes independentes. A interface Screen entrega largura, altura, área disponível, profundidade de cor e orientação em pixels lógicos. A propriedade devicePixelRatio informa quantos pixels físicos existem para cada pixel CSS, e o produto dos dois é uma estimativa, pois devicePixelRatio também varia com o zoom da página.',
        'O gamut e a faixa dinâmica vêm das media queries CSS color-gamut e dynamic-range, definidas pelo W3C Media Queries Level 4 e 5. O navegador só responde "p3" ou "rec2020" quando o pipeline de cor do sistema declara aquele volume; "dynamic-range: high" exige, além do painel, que o modo HDR esteja ativo no sistema operacional.',
        'A identificação da GPU usa a extensão WEBGL_debug_renderer_info sobre um contexto WebGL descartável, lendo UNMASKED_RENDERER_WEBGL e UNMASKED_VENDOR_WEBGL. Nenhuma dessas chamadas envia dados: o contexto é criado, consultado e descartado dentro da própria aba.',
      ],
    },
    en: {
      intro: 'The fact sheet gathers, on one screen, the information exposed by the browser about your display: logical and estimated resolution, devicePixelRatio, colour depth, declared gamut, dynamic range, orientation and the GPU compositing your frames.',
      steps: [
        'Open the tool on the screen you want to audit — on dual-monitor setups, drag the window to the right panel before reading the values.',
        'Compare the estimate with the operating system display settings. Zoom, scaling and privacy protections can change these values; this reading does not confirm native panel resolution.',
        'Check gamut and dynamic range: "Display-P3" and "HDR / high" only appear when the operating system actually handed a wide colour path to the browser.',
      ],
      uses: [
        'Find out whether Windows or macOS is applying scaling (125%, 150%, 200%) and softening perceived sharpness.',
        'Verify that HDR is genuinely active before recording, grading or playing high dynamic range content.',
        'Identify which GPU is rendering the tab on laptops with hybrid Intel/NVIDIA or AMD graphics.',
        'Document the exact configuration of a workstation in reports, support tickets and IT inventories.',
      ],
      limitations: 'The browser only exposes what the operating system declares. It does not read the full EDID, does not measure luminance in cd/m² and cannot confirm real gamut coverage — that requires a colorimeter.',
      faq: [
        ['Why is the reported resolution lower than my 4K monitor?', 'screen.width returns CSS pixels. Multiplying it by devicePixelRatio is only an estimate affected by page zoom and scaling; check operating system settings to confirm signal resolution.'],
        ['The GPU field shows "ANGLE" or an odd name. Is that a problem?', 'No. Chromium-based browsers translate WebGL to Direct3D through the ANGLE layer and prefix the adapter name. The real board model appears inside the parentheses.'],
      ],
      methodology: [
        'The reading combines four independent sources. The Screen interface returns width, height, available area, colour depth and orientation in logical pixels. The devicePixelRatio property tells how many physical pixels exist per CSS pixel, and the product is an estimate, because devicePixelRatio also changes with page zoom.',
        'Gamut and dynamic range come from the CSS color-gamut and dynamic-range media queries defined in W3C Media Queries Level 4 and 5. A browser only answers "p3" or "rec2020" when the system colour pipeline declares that volume; "dynamic-range: high" additionally requires HDR mode to be enabled in the operating system.',
        'GPU identification uses the WEBGL_debug_renderer_info extension on a throwaway WebGL context, reading UNMASKED_RENDERER_WEBGL and UNMASKED_VENDOR_WEBGL. None of these calls transmit data: the context is created, queried and discarded inside the tab.',
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
        'Confirmar se o monitor está funcionando na taxa anunciada depois de trocar cabo, porta ou driver.',
        'Detectar quedas de cadência causadas por limitação térmica, economia de energia ou concorrência de outra aba.',
        'Verificar o comportamento de telas com VRR (FreeSync e G-Sync) ao entrar e sair da faixa dinâmica.',
        'Registrar antes e depois de mudanças de configuração em relatórios de suporte técnico.',
      ],
      limitations: 'O navegador não consegue exceder a cadência do compositor do sistema, e não mede o tempo de resposta do painel nem o input lag total da cadeia. O número obtido é a taxa de composição percebida pela aba.',
      faq: [
        ['Meu monitor é 165 Hz, mas mediu 60 Hz. Por quê?', 'Na maioria dos casos a aba perdeu o foco, o notebook está no modo de economia, o cabo negociou um modo inferior ou o sistema operacional continua configurado em 60 Hz. Confira as configurações de vídeo e repita a medição com a janela em primeiro plano.'],
        ['O que significa jitter alto com Hz médio correto?', 'Significa que os quadros chegam na média certa, mas de forma irregular. Isso costuma indicar concorrência de CPU/GPU, VRR oscilando ou animação de outra aba disputando o compositor.'],
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
        'Confirm the monitor runs at the advertised rate after swapping cable, port or driver.',
        'Detect cadence drops caused by thermal throttling, power saving or another tab competing for the GPU.',
        'Observe how VRR displays (FreeSync and G-Sync) behave when entering and leaving the dynamic range.',
        'Record before-and-after evidence of configuration changes in technical support reports.',
      ],
      limitations: 'The browser cannot exceed the system compositor cadence, and it measures neither panel response time nor total input lag. The number is the composition rate as perceived by the tab.',
      faq: [
        ['My monitor is 165 Hz but it measured 60 Hz. Why?', 'In most cases the tab lost focus, the laptop is in power saving mode, the cable negotiated a lower mode, or the operating system is still set to 60 Hz. Check the display settings and repeat with the window in the foreground.'],
        ['What does high jitter with a correct average Hz mean?', 'Frames arrive at the right average but unevenly. That usually points to CPU/GPU contention, VRR swinging, or an animation in another tab competing for the compositor.'],
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
      intro: 'A ferramenta percorre degraus de cinza definidos em sRGB, de 0% a 100%, com uma grade opcional de nove zonas. É o padrão clássico para revelar clouding, vazamento de luz de fundo, glow de borda e manchas de retenção.',
      steps: [
        'Apague as luzes do ambiente, mantenha o brilho de uso normal e entre em tela cheia com a tecla F.',
        'Comece no degrau de 0% e observe centro, bordas e cantos de frente, a cerca de 70 cm de distância.',
        'Suba para 5%, 10% e 50% comparando as nove zonas entre si; anote onde aparecem diferenças visíveis a olho nu.',
      ],
      uses: [
        'Avaliar um monitor recém-comprado ainda dentro do prazo legal de troca.',
        'Documentar manchas e vazamentos antes de abrir um pedido de garantia ou RMA.',
        'Comparar dois painéis lado a lado nas mesmas condições de iluminação.',
        'Acompanhar a evolução de retenção de imagem em painéis OLED ao longo do tempo.',
      ],
      limitations: 'A uniformidade percebida depende de brilho, ângulo e luz ambiente. Esta é uma referência visual: medir desvio percentual de luminância entre zonas exige sonda fotométrica e procedimento VESA FPDM.',
      faq: [
        ['Um pouco de brilho nos cantos é defeito?', 'Em painéis IPS, glow nos cantos é uma característica óptica do próprio tipo de cristal líquido e muda de intensidade quando você move a cabeça. Vazamento real fica fixo na mesma posição, independente do ângulo.'],
        ['Posso fotografar a tela para documentar?', 'Para registro serve, mas não use a foto como medida. Sensores de celular ampliam o vazamento em cenas escuras por causa do ganho automático. Avalie sempre a olho nu e use a foto apenas como anexo.'],
      ],
      methodology: [
        'Os degraus são gerados em valores absolutos de sRGB de 8 bits, multiplicando a fração desejada por 255 sem correção de gama adicional. Isso garante que o 5% enviado ao painel seja exatamente o código 13 na escala digital, o intervalo mais sensível para revelar deficiência de preto e clouding.',
        'A grade de nove zonas segue a lógica do procedimento de uniformidade descrito no VESA Flat Panel Display Measurement Standard, que divide a área ativa em uma matriz 3 × 3 e compara cada célula com o centro. No navegador a comparação é visual, mas a divisão espacial ajuda a nomear e localizar o defeito com precisão.',
        'A recomendação de 0,5 a 2 lux de luz ambiente e distância de 70 cm vem da ergonomia da ISO 9241: acima disso, o reflexo difuso da sala mascara vazamentos de baixa intensidade e a inspeção deixa de ser reprodutível entre dois observadores.',
      ],
    },
    en: {
      intro: 'The tool steps through sRGB reference gray levels from 0% to 100%, with an optional nine-zone grid. It is the classic pattern for revealing clouding, backlight bleed, edge glow and image retention stains.',
      steps: [
        'Turn the room lights off, keep your normal brightness and enter fullscreen with the F key.',
        'Start at the 0% step and inspect centre, edges and corners straight on, from about 70 cm away.',
        'Move up to 5%, 10% and 50% while comparing the nine zones against each other; note where differences are visible to the naked eye.',
      ],
      uses: [
        'Assess a freshly bought monitor while still inside the statutory return window.',
        'Document patches and bleed before opening a warranty or RMA request.',
        'Compare two panels side by side under identical lighting conditions.',
        'Track how image retention evolves on OLED panels over time.',
      ],
      limitations: 'Perceived uniformity depends on brightness, angle and ambient light. This is a visual reference: measuring percentage luminance deviation between zones requires a photometric probe and the VESA FPDM procedure.',
      faq: [
        ['Is a little corner glow a defect?', 'On IPS panels, corner glow is an optical characteristic of the liquid crystal type and changes intensity as you move your head. Real bleed stays fixed in the same place regardless of angle.'],
        ['Can I photograph the screen to document it?', 'For record keeping yes, but never as a measurement. Phone sensors exaggerate bleed in dark scenes because of automatic gain. Always judge with your own eyes and use the photo only as an attachment.'],
      ],
      methodology: [
        'Steps are generated in absolute 8-bit sRGB values, multiplying the target fraction by 255 without extra gamma correction. That guarantees the 5% sent to the panel is exactly code 13 on the digital scale, the range most sensitive for exposing poor black level and clouding.',
        'The nine-zone grid follows the uniformity procedure described in the VESA Flat Panel Display Measurement Standard, which divides the active area into a 3 × 3 matrix and compares each cell against the centre. In a browser the comparison is visual, but the spatial division helps you name and locate a defect precisely.',
        'The recommendation of 0.5 to 2 lux ambient light and a 70 cm distance comes from ISO 9241 ergonomics: above that, diffuse room reflection masks low-intensity bleed and the inspection stops being reproducible between two observers.',
      ],
    },
  },

  'keyboard-test': {
    related: ['mouse-test', 'gamepad-test', 'touch-tester'],
    pt: {
      intro: 'O teste acende um mapa ANSI completo conforme você digita, guarda o histórico de códigos de scan, mede o intervalo entre repetições e conta quantas teclas o controlador aceita simultaneamente — o famoso N-key rollover.',
      steps: [
        'Abra o instrumento: enquanto ele está ativo, todos os atalhos do MonitorSmith ficam desligados para não interferir na leitura.',
        'Pressione todas as teclas uma a uma; as já registradas ficam contornadas em âmbar e a tecla ativa acende cheia.',
        'Segure combinações de três, quatro e seis teclas ao mesmo tempo e acompanhe o contador de simultâneas para achar o limite do seu teclado.',
      ],
      uses: [
        'Encontrar teclas mortas ou intermitentes antes de comprar ou vender um teclado usado.',
        'Diagnosticar chattering, quando um único toque registra dois eventos em poucos milissegundos.',
        'Confirmar se um teclado mecânico realmente entrega N-key rollover ou apenas 6KRO.',
        'Descobrir o código de scan exato de uma tecla ao configurar macros, jogos e remapeamentos.',
      ],
      limitations: 'Teclas interceptadas pelo sistema operacional ou pelo firmware — Print Screen, teclas de mídia, Fn e algumas combinações com a tecla Windows — podem nunca chegar ao navegador, e isso não indica defeito.',
      faq: [
        ['Uma tecla não acende. O teclado está com defeito?', 'Talvez, mas antes verifique se ela não é interceptada pelo sistema. Print Screen, Fn, teclas de mídia e atalhos globais do sistema operacional costumam ser capturados antes do navegador. Se uma tecla comum de letra ou número não acende, aí sim há indício de falha.'],
        ['Como saber se meu teclado tem N-key rollover?', 'Segure seis, oito e dez teclas ao mesmo tempo e observe o contador de máximo simultâneo. Teclados com NKRO real continuam registrando todas; modelos 6KRO travam em seis teclas além dos modificadores.'],
      ],
      methodology: [
        'A leitura usa os eventos keydown e keyup na fase de captura, lendo a propriedade code do KeyboardEvent — que identifica a posição física da tecla no layout, independente do idioma configurado — e a propriedade key, que reflete o caractere resultante depois do mapeamento.',
        'O intervalo de repetição é medido apenas em eventos com a flag repeat ativa, comparando timestamps de performance.now(). Esse número corresponde à taxa de repetição configurada no sistema operacional, não a uma característica do hardware.',
        'A contagem de simultâneas mantém um conjunto das teclas atualmente pressionadas e registra o maior tamanho alcançado. O limite observado depende da matriz de diodos do teclado e do protocolo USB HID: relatórios boot-protocol clássicos transportam seis teclas mais modificadores, enquanto teclados com relatórios estendidos entregam rollover completo.',
      ],
    },
    en: {
      intro: 'The test lights up a full ANSI map as you type, keeps a history of scan codes, measures the repeat interval and counts how many keys the controller accepts at once — the famous N-key rollover.',
      steps: [
        'Open the instrument: while it is active every MonitorSmith shortcut is disabled so nothing interferes with the reading.',
        'Press every key one by one; already registered keys keep an amber outline and the active key lights up solid.',
        'Hold combinations of three, four and six keys at once and watch the simultaneous counter to find your keyboard limit.',
      ],
      uses: [
        'Find dead or intermittent keys before buying or selling a used keyboard.',
        'Diagnose chattering, when a single press registers two events milliseconds apart.',
        'Confirm whether a mechanical keyboard truly delivers N-key rollover or only 6KRO.',
        'Discover the exact scan code of a key when configuring macros, games and remaps.',
      ],
      limitations: 'Keys intercepted by the operating system or firmware — Print Screen, media keys, Fn and some Windows-key combinations — may never reach the browser, and that is not a defect.',
      faq: [
        ['One key does not light up. Is the keyboard faulty?', 'Maybe, but first check whether the system intercepts it. Print Screen, Fn, media keys and global OS shortcuts are usually captured before the browser. If a plain letter or number key stays dark, that is a genuine failure signal.'],
        ['How do I know my keyboard has N-key rollover?', 'Hold six, eight and ten keys at once and watch the max simultaneous counter. Real NKRO keyboards keep registering all of them; 6KRO models stop at six keys plus modifiers.'],
      ],
      methodology: [
        'The reading uses keydown and keyup events in the capture phase, taking the KeyboardEvent code property — which identifies the physical key position regardless of the configured language — plus the key property, which reflects the resulting character after mapping.',
        'Repeat interval is measured only on events with the repeat flag set, comparing performance.now() timestamps. That number matches the repeat rate configured in the operating system, not a hardware characteristic.',
        'Simultaneous counting keeps a set of currently held keys and records the largest size reached. The observed limit depends on the keyboard diode matrix and the USB HID protocol: classic boot-protocol reports carry six keys plus modifiers, while keyboards with extended reports deliver full rollover.',
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
        'Confirmar o defeito de clique duplo antes de trocar switch, abrir garantia ou descartar o mouse.',
        'Verificar se os botões laterais e a roda horizontal estão sendo reconhecidos pelo sistema.',
        'Comparar a taxa de eventos observada no navegador em diferentes mouses, portas e configurações.',
        'Testar rapidamente um mouse usado antes de fechar a compra.',
      ],
      limitations: 'A taxa medida é limitada pela cadência de eventos que o navegador entrega, normalmente atrelada ao compositor. Não é uma leitura direta do firmware do mouse nem uma medição de DPI.',
      faq: [
        ['Meu mouse é 1000 Hz, mas mediu bem menos. Está com problema?', 'Provavelmente não. O navegador agrupa eventos de ponteiro por quadro; sem contar os eventos coalescidos, o teto fica próximo da taxa de atualização da tela. Movimentos contínuos e amplos aproximam a leitura do valor real.'],
        ['O que caracteriza um clique duplo indesejado?', 'Dois eventos do mesmo botão separados por menos de 60 ms. Nenhuma mão humana consegue produzir esse intervalo de propósito, então repetições frequentes indicam contato oxidado ou mola fatigada no switch.'],
      ],
      methodology: [
        'Os cliques são lidos por Pointer Events com preventDefault, o que permite capturar os botões 3 e 4 (voltar e avançar) que o navegador normalmente consome para navegar no histórico. Cada pressionamento guarda o timestamp de performance.now() por botão.',
        'A taxa soma eventos coalescidos devolvidos por getCoalescedEvents em cada pointermove. O valor descreve eventos expostos pelo navegador e pode divergir da frequência de relatórios USB do dispositivo.',
        'O limiar de 60 ms para clique duplo indesejado deriva do tempo mínimo de atuação mecânica somado ao debounce típico de firmware. Switches de mouse novos aplicam debounce entre 8 e 20 ms; quando o contato oxida, a oscilação atravessa a janela de debounce e o sistema recebe dois relatórios válidos.',
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
        'Confirm the double-click defect before replacing a switch, claiming warranty or discarding the mouse.',
        'Verify that side buttons and horizontal wheel are recognised by the system.',
        'Compare the event rate observed in the browser across different mice, ports and settings.',
        'Quickly test a second-hand mouse before closing the deal.',
      ],
      limitations: 'The measured rate is capped by the event cadence the browser delivers, usually tied to the compositor. It is neither a direct firmware reading nor a DPI measurement.',
      faq: [
        ['My mouse is 1000 Hz but it measured much less. Is it broken?', 'Probably not. The browser batches pointer events per frame; without counting coalesced events the ceiling sits near the display refresh rate. Wide, continuous movement brings the reading closer to the real value.'],
        ['What counts as an unintended double click?', 'Two events from the same button less than 60 ms apart. No human hand can produce that interval on purpose, so frequent repeats point to an oxidised contact or a fatigued switch spring.'],
      ],
      methodology: [
        'Clicks are read through Pointer Events with preventDefault, which lets us capture buttons 3 and 4 (back and forward) that the browser normally consumes for history navigation. Every press stores a performance.now() timestamp per button.',
        'The rate sums coalesced events returned by getCoalescedEvents on each pointermove. It describes events exposed by the browser and may differ from the device USB report frequency.',
        'The 60 ms threshold for unintended double clicks derives from the minimum mechanical actuation time plus typical firmware debounce. New mouse switches debounce between 8 and 20 ms; when the contact oxidises, bounce crosses that window and the system receives two valid reports.',
      ],
    },
  },

  'gamepad-test': {
    related: ['mouse-test', 'keyboard-test', 'motion-blur'],
    pt: {
      intro: 'O teste lê pela Gamepad API todos os botões, os eixos dos analógicos com valor numérico de quatro casas, a pressão dos gatilhos e permite disparar a vibração para confirmar os motores.',
      steps: [
        'Conecte o controle por cabo ou Bluetooth e aperte qualquer botão: por privacidade, o navegador só revela o dispositivo depois de uma interação.',
        'Aperte cada botão e gatilho observando o painel; gatilhos analógicos mostram o valor intermediário durante o curso.',
        'Solte completamente os analógicos e leia o campo de drift em repouso, que deve ficar próximo de zero.',
      ],
      uses: [
        'Medir stick drift antes de mandar o controle para reparo ou trocar o módulo do analógico.',
        'Confirmar se todos os botões e gatilhos respondem em um controle usado.',
        'Verificar zona morta e curso útil dos analógicos ao configurar jogos e simuladores.',
        'Testar os motores de vibração sem precisar abrir um jogo.',
      ],
      limitations: 'A Gamepad API padroniza o mapeamento em um layout genérico. Controles exóticos podem reportar botões fora de ordem, e a vibração só funciona onde o navegador implementa o atuador dual-rumble.',
      faq: [
        ['Qual valor de drift já é problema?', 'Com os analógicos totalmente soltos, desvios abaixo de 0,05 são normais e absorvidos pela zona morta dos jogos. Acima de 0,08 o personagem já tende a se mover sozinho, o que caracteriza stick drift.'],
        ['Meu controle não aparece na lista. O que fazer?', 'Aperte um botão do controle com esta página em foco. Navegadores só expõem o dispositivo depois de uma interação do usuário, justamente para evitar identificação silenciosa de hardware.'],
      ],
      methodology: [
        'A leitura chama navigator.getGamepads() a cada quadro via requestAnimationFrame, conforme o modelo de polling definido pela especificação W3C Gamepad. Cada objeto devolve o array buttons, com estado booleano e valor analógico de 0 a 1, e o array axes normalizado entre -1 e 1.',
        'O drift é calculado como o maior valor absoluto entre todos os eixos com os analógicos em repouso. Esse número expressa quanto o potenciômetro ou sensor Hall está reportando fora do centro mecânico, causa direta do movimento involuntário em jogos.',
        'A vibração usa vibrationActuator.playEffect com o efeito dual-rumble, que aciona separadamente os motores de magnitude forte e fraca. Nem todo navegador ou controle implementa o atuador, por isso o botão só aparece quando um dispositivo está ativo.',
      ],
    },
    en: {
      intro: 'The test reads every button through the Gamepad API, the analog axes with four-decimal values, trigger pressure, and lets you fire the rumble motors to confirm they work.',
      steps: [
        'Connect the controller by cable or Bluetooth and press any button: for privacy reasons the browser only reveals the device after an interaction.',
        'Press each button and trigger while watching the panel; analog triggers show intermediate values along their travel.',
        'Fully release the sticks and read the idle drift field, which should stay close to zero.',
      ],
      uses: [
        'Measure stick drift before sending the controller for repair or replacing the stick module.',
        'Confirm every button and trigger responds on a second-hand controller.',
        'Check dead zone and useful travel of the sticks when configuring games and simulators.',
        'Test the rumble motors without launching a game.',
      ],
      limitations: 'The Gamepad API standardises mapping into a generic layout. Exotic controllers may report buttons out of order, and rumble only works where the browser implements the dual-rumble actuator.',
      faq: [
        ['Which drift value is already a problem?', 'With the sticks fully released, deviations under 0.05 are normal and absorbed by in-game dead zones. Above 0.08 the character starts drifting on its own, which is stick drift.'],
        ['My controller does not show up. What now?', 'Press a button on the controller with this page focused. Browsers only expose the device after user interaction, precisely to avoid silent hardware fingerprinting.'],
      ],
      methodology: [
        'The reading calls navigator.getGamepads() every frame through requestAnimationFrame, following the polling model defined by the W3C Gamepad specification. Each object returns the buttons array, with boolean state and analog value from 0 to 1, plus the axes array normalised between -1 and 1.',
        'Drift is computed as the largest absolute value across all axes with the sticks at rest. That number expresses how far the potentiometer or Hall sensor reports away from mechanical centre, the direct cause of involuntary movement in games.',
        'Rumble uses vibrationActuator.playEffect with the dual-rumble effect, which drives the strong and weak magnitude motors separately. Not every browser or controller implements the actuator, which is why the button only appears when a device is live.',
      ],
    },
  },

  'display-calculators': {
    related: ['ppi-calculator', 'refresh-rate', 'display-info'],
    pt: {
      intro: 'Três calculadoras reunidas em um painel: banda de vídeo necessária em Gbps por resolução, taxa e profundidade de cor; distância de visão a partir do campo de visão desejado; e dimensões físicas por proporção de tela.',
      steps: [
        'Informe resolução, taxa de atualização e bits por canal para descobrir quantos Gbps o sinal exige e qual especificação de cabo atende.',
        'Preencha a diagonal e a proporção do painel para obter largura, altura e área reais em centímetros.',
        'Ajuste o campo de visão horizontal desejado e leia a distância de visão correspondente em centímetros e polegadas.',
      ],
      uses: [
        'Escolher entre HDMI 2.0, HDMI 2.1, DisplayPort 1.4 e DisplayPort 2.1 antes de comprar cabo ou adaptador.',
        'Descobrir se um monitor cabe na mesa e a que distância ele deve ficar do olho.',
        'Planejar setups de simulação e edição em que o campo de visão importa mais que a diagonal.',
        'Explicar em suporte técnico por que uma combinação de resolução e taxa não é alcançável em determinada porta.',
      ],
      limitations: 'A conta de banda assume blanking reduzido de cerca de 5% e não modela o overhead de codificação de cada versão de HDMI ou DisplayPort. Use a especificação seguinte quando o resultado ficar próximo do limite.',
      faq: [
        ['O que é DSC e por que reduz a banda em três vezes?', 'DSC é a compressão Display Stream Compression da VESA, considerada visualmente sem perdas, com razão típica de 3:1. Ela permite 4K a 144 Hz em 10 bits sobre DisplayPort 1.4, mas exige suporte simultâneo na GPU, no cabo e no monitor.'],
        ['Qual campo de visão devo usar como referência?', 'Para trabalho de escritório e leitura, 30 a 35 graus mantém a cabeça parada. Para edição de vídeo e jogos imersivos, 40 a 50 graus é comum. Acima disso, o olho passa a varrer a tela e o conforto cai em sessões longas.'],
      ],
      methodology: [
        'A banda parte da taxa de pixels — largura × altura × taxa de atualização — multiplicada pela profundidade de bits dos três canais RGB. Sobre esse total aplicamos aproximadamente 5% de blanking, coerente com os timings CVT-RB v2 da VESA usados por monitores modernos.',
        'A distância ideal vem de trigonometria simples: metade da largura física dividida pela tangente de metade do campo de visão desejado. É a mesma relação usada em recomendações de sala de cinema da SMPTE e da THX, apenas aplicada à escala de uma mesa de trabalho.',
        'As dimensões físicas derivam da diagonal e da proporção. Para uma proporção a = largura/altura, a largura vale diagonal × a ÷ √(a² + 1), e a altura é a largura dividida por a. Como a diagonal é informada em polegadas, os resultados são convertidos por 2,54 cm por polegada.',
      ],
    },
    en: {
      intro: 'Three calculators in one panel: required video bandwidth in Gbps per resolution, refresh rate and colour depth; viewing distance derived from the desired field of view; and physical dimensions per aspect ratio.',
      steps: [
        'Enter resolution, refresh rate and bits per channel to find how many Gbps the signal needs and which cable specification covers it.',
        'Fill in the panel diagonal and aspect ratio to get real width, height and area in centimetres.',
        'Adjust the target horizontal field of view and read the matching viewing distance in centimetres and inches.',
      ],
      uses: [
        'Choose between HDMI 2.0, HDMI 2.1, DisplayPort 1.4 and DisplayPort 2.1 before buying a cable or adapter.',
        'Find out whether a monitor fits your desk and how far it should sit from your eyes.',
        'Plan simulation and editing setups where field of view matters more than diagonal size.',
        'Explain in technical support why a resolution and refresh rate combination is unreachable on a given port.',
      ],
      limitations: 'The bandwidth maths assumes roughly 5% reduced blanking and does not model the encoding overhead of each HDMI or DisplayPort revision. Pick the next specification whenever the result sits near the limit.',
      faq: [
        ['What is DSC and why does it cut bandwidth threefold?', 'DSC is VESA Display Stream Compression, considered visually lossless, with a typical 3:1 ratio. It enables 4K at 144 Hz in 10 bits over DisplayPort 1.4, but requires simultaneous support in the GPU, the cable and the monitor.'],
        ['Which field of view should I use as reference?', 'For office work and reading, 30 to 35 degrees keeps your head still. For video editing and immersive gaming, 40 to 50 degrees is common. Beyond that the eye has to scan the screen and comfort drops in long sessions.'],
      ],
      methodology: [
        'Bandwidth starts from the pixel rate — width × height × refresh rate — multiplied by the bit depth of the three RGB channels. We then add roughly 5% blanking, consistent with the VESA CVT-RB v2 timings used by modern monitors.',
        'Ideal distance comes from simple trigonometry: half the physical width divided by the tangent of half the desired field of view. It is the same relation used in SMPTE and THX cinema room recommendations, applied to desk scale.',
        'Physical dimensions derive from diagonal and aspect ratio. For an aspect a = width/height, width equals diagonal × a ÷ √(a² + 1), and height is width divided by a. Since the diagonal is entered in inches, results are converted at 2.54 cm per inch.',
      ],
    },
  },
});
