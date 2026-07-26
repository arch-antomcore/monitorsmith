import fs from "node:fs/promises";
import path from "node:path";

const BASE_URL = "https://monitorsmith.app";
const DIST_DIR = path.resolve(process.cwd(), "dist");

const pages = [
  {
    slug: "teste-de-dead-pixel",
    toolId: "dead-pixel",
    title: "Teste de Dead Pixel Online Grátis",
    description: "Verifique se o seu monitor possui dead pixels (pixels mortos) ou stuck pixels. Teste online gratuito, fácil e rápido, sem necessidade de download.",
    h1: "Teste de Dead Pixel Online",
    intro: "Um dead pixel (ou pixel morto) é um ponto na sua tela que não acende ou permanece travado em uma única cor. Nosso teste de dead pixel ajuda você a identificar rapidamente qualquer imperfeição na tela do seu monitor, celular ou tablet através de diferentes cores sólidas em tela cheia.",
    comoUsar: [
      "Clique no botão abaixo para abrir a ferramenta de teste.",
      "A tela mudará para diferentes cores sólidas (branco, preto, vermelho, verde, azul).",
      "Inspecione cuidadosamente a tela em cada cor procurando por pontos pretos, brancos ou coloridos que não mudam.",
      "Use as setas do teclado ou clique na tela para alternar entre as cores."
    ],
    quandoUsar: [
      "Ao comprar um monitor ou celular novo (para garantir que não veio com defeito de fábrica).",
      "Antes de o período de devolução ou garantia expirar.",
      "Quando notar uma 'sujeira' na tela que não sai com a limpeza."
    ],
    limitacoes: "A ferramenta ajuda na identificação visual, mas não conserta os pixels defeituosos. Além disso, a precisão depende da sua atenção e inspeção cuidadosa.",
    faq: [
      {
        q: "O que é um dead pixel?",
        a: "É um pixel no painel LCD/OLED que parou de funcionar e não emite mais luz, aparecendo como um pequeno ponto preto."
      },
      {
        q: "Qual a diferença entre dead pixel e stuck pixel?",
        a: "Um dead pixel está 'morto' e não emite luz (fica preto). Um stuck pixel está travado em uma única cor (geralmente vermelho, verde ou azul)."
      },
      {
        q: "Tem como consertar um dead pixel?",
        a: "Na maioria dos casos de dead pixels, o dano é permanente. Já os stuck pixels, às vezes, podem ser 'destravados' com ferramentas que piscam cores rapidamente, embora não haja garantia."
      }
    ],
    related: ["teste-de-monitor", "tela-preta-oled", "verificacao-visual"]
  },
  {
    slug: "tela-preta-oled",
    toolId: "black",
    title: "Tela Preta OLED em Fullscreen",
    description: "Exiba uma tela 100% preta em fullscreen. Ideal para testar vazamento de luz, verificar dead pixels claros ou usar como segunda tela escura.",
    h1: "Tela Preta OLED em Fullscreen",
    intro: "Uma tela completamente preta é essencial para verificar a qualidade do preto em monitores IPS, testar o perfeito apagamento de pixels em telas OLED ou simplesmente usar como descanso de tela sem precisar desligar o monitor secundário.",
    comoUsar: [
      "Acesse a ferramenta clicando no botão abaixo.",
      "A tela ficará inteiramente preta em modo de tela cheia.",
      "Reduza as luzes do ambiente para melhor inspeção ou apenas deixe o monitor em repouso.",
      "Aperte ESC ou toque na tela para sair."
    ],
    quandoUsar: [
      "Para avaliar vazamento de luz (backlight bleed) e IPS glow em ambientes escuros.",
      "Para esconder distrações num segundo monitor enquanto foca no principal.",
      "Para verificar pixels que ficaram travados na cor branca (hot pixels)."
    ],
    limitacoes: "Em monitores LCD tradicionais, a cor preta ainda emite uma luz de fundo (backlight). A escuridão total do painel depende da tecnologia do monitor (como OLED, que desliga o pixel por completo).",
    faq: [
      {
        q: "Isso economiza bateria em notebooks?",
        a: "Se a sua tela for OLED, sim. Telas OLED desligam os pixels pretos, o que economiza energia. Em telas LCD tradicionais, a luz de fundo permanece ligada, então a economia é mínima."
      },
      {
        q: "Ajuda a testar vazamento de luz?",
        a: "Sim! A tela preta em um ambiente escuro é a melhor forma de notar cantos mais brilhantes ou manchas de luz na tela (backlight bleeding)."
      }
    ],
    related: ["teste-de-vazamento-de-luz", "teste-de-dead-pixel", "limpeza-de-monitor"]
  },
  {
    slug: "teste-de-monitor",
    toolId: "color",
    title: "Teste de Monitor Online Completo",
    description: "Faça um teste de monitor online para checar reprodução de cores, contraste e uniformidade da tela. Simples e sem instalar nada.",
    h1: "Teste de Monitor Completo",
    intro: "Avaliar o desempenho do seu display é crucial para edição de fotos, vídeos ou para garantir a melhor qualidade em jogos. Com este teste de cores, você pode identificar bandas de cores, má calibração e problemas de uniformidade de tela.",
    comoUsar: [
      "Inicie o teste clicando no botão ao final da página.",
      "Visualize diferentes padrões e gradientes de cores na tela cheia.",
      "Verifique as transições suaves no gradiente para identificar 'color banding' (faixas de cores).",
      "Passe pelas telas de teste para observar o contraste geral."
    ],
    quandoUsar: [
      "Ao comprar um novo monitor, para atestar a precisão das cores e uniformidade.",
      "Após realizar calibração de software ou hardware, para validar os resultados.",
      "Quando notar que as cores parecem lavadas ou irreais em vídeos ou imagens."
    ],
    limitacoes: "O teste fornece uma avaliação visual que depende dos seus olhos e da iluminação ambiente. Não substitui um colorímetro profissional (hardware de calibração).",
    faq: [
      {
        q: "O que é color banding?",
        a: "É um artefato visual onde a transição de cores num gradiente não é suave, mostrando linhas ou faixas nítidas entre os tons de cor."
      },
      {
        q: "Preciso de algum programa instalado?",
        a: "Não. Todo o teste de monitor é feito através do seu navegador, seja no PC, Mac, celular ou tablet."
      }
    ],
    related: ["verificacao-visual", "teste-de-dead-pixel", "teste-de-vazamento-de-luz"]
  },
  {
    slug: "teste-de-vazamento-de-luz",
    toolId: "black",
    title: "Teste de Vazamento de Luz (Backlight Bleed)",
    description: "Teste seu monitor para vazamento de luz (backlight bleed) e IPS glow. Ferramenta online gratuita para testar telas em ambientes escuros.",
    h1: "Teste de Vazamento de Luz e IPS Glow",
    intro: "O vazamento de luz (backlight bleed) e o IPS glow são fenômenos onde a luz de fundo vaza pelas bordas ou cantos de uma tela escura, afetando a imersão em filmes e jogos. Nossa ferramenta ajuda você a identificar a severidade desse efeito.",
    comoUsar: [
      "Para um resultado preciso, apague todas as luzes do cômodo (ambiente 100% escuro).",
      "Ajuste o brilho do monitor para o nível que você costuma usar no escuro.",
      "Clique para abrir a tela preta completa.",
      "Inspecione as bordas e cantos da tela em busca de nuvens de luz."
    ],
    quandoUsar: [
      "Quando adquirir um novo monitor IPS, VA ou TN para verificar problemas no painel.",
      "Se notar manchas claras nos cantos durante cenas escuras de jogos ou filmes.",
      "Para comparar a uniformidade do preto entre dois monitores."
    ],
    limitacoes: "É normal que monitores IPS tenham um pouco de brilho no ângulo de visão (IPS glow). As câmeras de celular costumam exagerar o efeito nas fotos, portanto, confie sempre no que seus olhos veem.",
    faq: [
      {
        q: "Qual a diferença entre backlight bleed e IPS glow?",
        a: "O backlight bleed são vazamentos irregulares de luz, muitas vezes nas bordas, causados pela montagem do painel. O IPS glow é uma característica do painel IPS que altera o brilho nos cantos dependendo do seu ângulo de visão."
      },
      {
        q: "Vazamento de luz tem conserto?",
        a: "Geralmente não, pois é estrutural da montagem do painel. Se for muito intenso e recente, o ideal é acionar a garantia ou pedir devolução."
      }
    ],
    related: ["tela-preta-oled", "teste-de-monitor", "teste-de-dead-pixel"]
  },
  {
    slug: "limpeza-de-monitor",
    toolId: "cleaner",
    title: "Inspeção e Limpeza de Monitor",
    description: "Use esta tela para inspecionar manchas, poeira e marcas de dedo no seu monitor. Facilite a limpeza da sua tela com nossa ferramenta online.",
    h1: "Guia para Limpeza e Inspeção de Tela",
    intro: "Para limpar seu monitor corretamente, é importante conseguir enxergar toda a sujeira, manchas e impressões digitais. Nossa tela de assistência para limpeza exibe um fundo adequado para evidenciar a sujeira que precisa ser removida.",
    comoUsar: [
      "Desligue o monitor ou reduza o brilho e ative nossa tela escura de inspeção.",
      "Identifique as manchas e áreas com poeira acumulada.",
      "Use um pano de microfibra limpo e seco para remover a poeira leve.",
      "Para manchas, umedeça levemente o pano com água destilada (nunca borrife direto na tela) e passe suavemente."
    ],
    quandoUsar: [
      "Sempre que for fazer a manutenção e limpeza do seu setup.",
      "Para evidenciar manchas persistentes que não são visíveis quando há muita informação na tela.",
      "Antes de aplicar películas de proteção em tablets ou notebooks."
    ],
    limitacoes: "A ferramenta é um auxílio visual. Você precisará dos materiais adequados (pano de microfibra e água ou produto específico) para realizar a limpeza física sem danificar o display.",
    faq: [
      {
        q: "Posso usar álcool ou limpa-vidros no monitor?",
        a: "Não é recomendado. Produtos químicos abrasivos, álcool em gel ou limpa-vidros com amônia podem remover revestimentos antirreflexo e danificar permanentemente o painel."
      },
      {
        q: "Qual o melhor pano para limpar telas?",
        a: "O ideal é utilizar panos de microfibra macios e sem fiapos, como os usados para limpar lentes de óculos."
      }
    ],
    related: ["tela-preta-oled", "teste-de-dead-pixel", "verificacao-visual"]
  },
  {
    slug: "luz-para-videochamada",
    toolId: "white",
    title: "Luz de Apoio para Videochamada",
    description: "Use o seu monitor como iluminação improvisada (ring light virtual) para videochamadas no Zoom, Meet e Teams.",
    h1: "Luz de Apoio para Videochamadas",
    intro: "Precisando de mais luz no rosto durante uma reunião importante? Utilize o brilho do seu próprio monitor como uma fonte de luz de preenchimento (ring light de tela) para melhorar a qualidade da sua webcam instantaneamente.",
    comoUsar: [
      "Se estiver com pouca iluminação, clique no botão para ativar a tela branca.",
      "Coloque a aba em tela dividida junto com sua videochamada ou em um segundo monitor atrás da webcam.",
      "Aumente o brilho do seu monitor para intensificar a luz no seu rosto.",
      "Ajuste a cor da tela, se desejar, para uma luz mais quente (amarelada) ou fria."
    ],
    quandoUsar: [
      "Durante reuniões no Zoom, Google Meet ou Teams em ambientes pouco iluminados.",
      "Para remover sombras escuras do rosto criadas por janelas ao fundo.",
      "Para gravar vídeos com a webcam quando não tiver um Ring Light profissional."
    ],
    limitacoes: "O alcance e intensidade dependem do brilho máximo (nits) e do tamanho do seu monitor. Monitores maiores fornecerão uma iluminação mais difusa e suave.",
    faq: [
      {
        q: "Isso substitui uma Ring Light real?",
        a: "Não completamente. É uma solução quebra-galho rápida e eficaz para preencher o rosto com luz, mas equipamentos de iluminação dedicados oferecem mais potência e controle."
      },
      {
        q: "Como deixo a luz menos agressiva aos olhos?",
        a: "Você pode alterar a cor de fundo da nossa ferramenta de branco puro para um tom amarelado/pêssego, simulando a temperatura de cor de uma lâmpada quente."
      }
    ],
    related: ["mensagem-em-tela", "teleprompter-online", "relogio-em-tela-cheia"]
  },
  {
    slug: "tela-verde-chroma",
    toolId: "green-screen",
    title: "Tela Verde Chroma Key Online",
    description: "Crie um fundo de tela verde (chroma key) no seu monitor, celular ou tablet para efeitos visuais, vídeos ou fotos em tela cheia.",
    h1: "Tela Verde (Chroma Key) em Tela Cheia",
    intro: "A técnica de chroma key permite remover fundos facilmente em edição de vídeo ou em transmissões ao vivo. Com nossa ferramenta de tela verde online, você pode transformar seu monitor, tablet ou smartphone em um painel chroma key em instantes.",
    comoUsar: [
      "Acesse a ferramenta e selecione a opção de tela verde.",
      "Aumente o brilho da tela do dispositivo para o máximo e evite luzes que causem reflexo na tela.",
      "Posicione o tablet ou monitor atrás dos objetos que deseja gravar.",
      "No seu software de edição (Premiere, OBS Studio, DaVinci), aplique o efeito Chroma Key para remover o verde."
    ],
    quandoUsar: [
      "Para fazer efeitos visuais em objetos pequenos utilizando a tela do iPad ou celular.",
      "Para fotografar produtos com fundo facilmente removível.",
      "Para criar transições criativas usando a tela de um notebook."
    ],
    limitacoes: "Como telas emitem luz, o verde pode refletir ('spill') no objeto fotografado, dificultando a edição. Além disso, os reflexos do ambiente no vidro do monitor podem arruinar o efeito.",
    faq: [
      {
        q: "Posso usar outras cores, como tela azul?",
        a: "Sim, a ferramenta permite selecionar cores puras (como azul ou magenta), que são ideais para o caso de o objeto a ser gravado conter elementos esverdeados."
      },
      {
        q: "Como evito reflexos na tela?",
        a: "Grave em um ambiente escuro onde a única luz seja a da tela, ou use filtros polarizadores na lente da câmera."
      }
    ],
    related: ["luz-para-videochamada", "tela-preta-oled", "teleprompter-online"]
  },
  {
    slug: "timer-de-foco",
    toolId: "focus-timer",
    title: "Timer de Foco com Ruído Marrom",
    description: "Melhore sua concentração com nosso timer de foco minimalista. Inclui ruído marrom e branco para abafar distrações no trabalho ou estudos.",
    h1: "Timer de Foco com Ruído Marrom",
    intro: "Mantenha a concentração em tarefas difíceis com o nosso timer minimalista. Baseado em ciclos de foco ininterrupto e complementado por paisagens sonoras como ruído marrom e branco, ideal para bloquear ruídos de fundo e auxiliar pessoas no espectro TDAH.",
    comoUsar: [
      "Defina o tempo que deseja manter o foco (ex: 25, 45 ou 60 minutos).",
      "Selecione um som de fundo (Ruído Marrom, Branco ou Rosa) para abafar sons do ambiente.",
      "Clique em Iniciar e deixe a tela em tela cheia em um monitor secundário.",
      "Quando o tempo acabar, faça uma pausa curta."
    ],
    quandoUsar: [
      "Durante sessões intensas de estudo (método Pomodoro).",
      "Em escritórios barulhentos onde é difícil se concentrar em tarefas de programação, leitura ou escrita.",
      "Ao tentar meditar ou realizar tarefas repetitivas que exigem atenção plena."
    ],
    limitacoes: "A eficácia depende da sua disciplina para não trocar de aba. É recomendado usar fones de ouvido para obter o benefício completo do bloqueio sonoro.",
    faq: [
      {
        q: "O que é Ruído Marrom (Brown Noise)?",
        a: "O ruído marrom foca em frequências mais graves (como o som de uma cachoeira distante ou do oceano). Muitas pessoas o consideram menos estridente que o ruído branco e excelente para concentração profunda."
      },
      {
        q: "Por que usar sons de fundo ajuda?",
        a: "Sons contínuos como ruído rosa e marrom criam uma 'cortina de som' que mascara variações súbitas de barulho (como conversas ou portas batendo), reduzindo distrações e permitindo que o cérebro relaxe."
      }
    ],
    related: ["relogio-em-tela-cheia", "mensagem-em-tela", "teleprompter-online"]
  },
  {
    slug: "relogio-em-tela-cheia",
    toolId: "clock",
    title: "Relógio em Tela Cheia",
    description: "Relógio digital grande e minimalista em tela cheia. Use em monitores secundários, painéis, provas ou como descanso de tela no seu setup.",
    h1: "Relógio Digital Minimalista em Tela Cheia",
    intro: "Um relógio digital grande, esteticamente agradável e livre de distrações, perfeito para preencher a tela de monitores secundários, painéis de informação ou para ajudar no controle de tempo durante eventos e palestras.",
    comoUsar: [
      "Abra a página da ferramenta para visualizar o relógio com a hora atual.",
      "Aperte o botão de fullscreen (tela cheia) para esconder as barras do navegador.",
      "Ajuste a cor do fundo e o estilo dos números para combinar com seu ambiente ou setup.",
      "Deixe a aba aberta no dispositivo escolhido."
    ],
    quandoUsar: [
      "Como um descanso de tela útil (screensaver) para o seu computador.",
      "Em monitores virados para o palco durante palestras ou provas, para o controle de tempo do palestrante.",
      "Para exibir as horas em painéis de lojas, recepções ou salas de aula."
    ],
    limitacoes: "Depende do relógio do sistema operacional do seu dispositivo. Dispositivos muito antigos que entram em suspensão profunda podem causar atrasos visuais até a aba ser reativada.",
    faq: [
      {
        q: "O relógio funciona offline?",
        a: "Não. A ferramenta não é um aplicativo instalado, portanto, requer que a aba permaneça aberta. Uma vez carregado, não consome dados, mas a página precisa ser carregada pela internet."
      },
      {
        q: "Tem modo noturno (escuro)?",
        a: "Sim! Por padrão a ferramenta segue um tema escuro e minimalista para não agredir os olhos em ambientes de baixa luminosidade."
      }
    ],
    related: ["timer-de-foco", "mensagem-em-tela", "tela-preta-oled"]
  },
  {
    slug: "mensagem-em-tela",
    toolId: "message",
    title: "Mensagem em Tela Cheia",
    description: "Exiba um letreiro com texto grande em tela cheia. Use para comunicar informações, avisos rápidos ou mensagens a longa distância.",
    h1: "Letreiro e Mensagem em Tela Cheia",
    intro: "Precisa transmitir uma informação para alguém do outro lado da sala, mas não pode falar? Exiba textos em letras gigantes preenchendo a tela inteira do celular, tablet ou monitor com nossa ferramenta de letreiro digital.",
    comoUsar: [
      "Acesse a ferramenta e digite o texto desejado no campo.",
      "O texto aumentará automaticamente para preencher o máximo de espaço na tela.",
      "Selecione cores fortes para alto contraste (como amarelo sobre preto).",
      "Mostre a tela para a pessoa ou público."
    ],
    quandoUsar: [
      "Para pegar alguém no aeroporto com um tablet.",
      "Para passar um recado rápido a um colega em uma sala de reuniões ou estúdio onde o silêncio é obrigatório.",
      "Como placa de 'volto logo' em estações de trabalho ou estandes."
    ],
    limitacoes: "Frases muito longas farão com que o tamanho da fonte diminua, reduzindo a legibilidade à distância. Mantenha os textos curtos e objetivos.",
    faq: [
      {
        q: "O texto se ajusta em celulares e TVs?",
        a: "Sim, nossa ferramenta é responsiva. O texto se redimensiona automaticamente para caber em qualquer formato de tela, seja na vertical no smartphone ou numa TV 4K."
      },
      {
        q: "Posso salvar a mensagem?",
        a: "As mensagens são temporárias e funcionam apenas na aba ativa do navegador para comunicação rápida e imediata."
      }
    ],
    related: ["teleprompter-online", "relogio-em-tela-cheia", "luz-para-videochamada"]
  },
  {
    slug: "teleprompter-online",
    toolId: "teleprompter",
    title: "Teleprompter Online Grátis",
    description: "Leia seus roteiros facilmente com nosso teleprompter online gratuito. Controle de velocidade, ajuste de fonte e espelhamento de texto.",
    h1: "Teleprompter Online Grátis",
    intro: "Grave vídeos com mais profissionalismo, sem precisar decorar textos longos. Nossa ferramenta de teleprompter online rola seu roteiro automaticamente na tela, permitindo que você mantenha contato visual e passe credibilidade.",
    comoUsar: [
      "Cole ou digite seu texto ou roteiro na área principal.",
      "Ajuste o tamanho do texto para leitura confortável.",
      "Defina a velocidade de rolagem desejada.",
      "Ative o espelhamento de tela (mirror) se estiver utilizando um vidro refletor de teleprompter em frente à câmera."
    ],
    quandoUsar: [
      "Durante gravações de vídeos para YouTube, cursos online ou redes sociais.",
      "Ao conduzir webinars ou apresentações ao vivo onde a fluidez da fala é crucial.",
      "Gravação de discursos usando um tablet, posicionado próximo à lente da câmera."
    ],
    limitacoes: "Em monitores muito largos sem equipamento de teleprompter, os olhos podem se mover de forma perceptível de um lado ao outro da tela.",
    faq: [
      {
        q: "Preciso baixar algum programa?",
        a: "Não, nosso teleprompter funciona 100% online no seu navegador de internet, de forma rápida e segura."
      },
      {
        q: "Como evitar que o olho pareça estar lendo?",
        a: "Aumente as margens laterais do texto. Quanto mais estreita for a coluna de texto (e quanto mais perto da lente da câmera ela estiver), menos os seus olhos se moverão lateralmente."
      }
    ],
    related: ["mensagem-em-tela", "luz-para-videochamada", "relogio-em-tela-cheia"]
  },
  {
    slug: "verificacao-visual",
    toolId: "calibration",
    title: "Verificação Visual e Calibração de Monitor",
    description: "Ferramentas visuais e padrões para ajudar na calibração básica do seu monitor, garantindo melhor contraste, brilho e fidelidade.",
    h1: "Verificação e Calibração Visual",
    intro: "Monitores mal configurados podem causar fadiga visual ou arruinar o trabalho de edição de imagens. Nossos padrões de calibração ajudam a ajustar brilho, contraste e níveis de cinza manualmente pelos menus do próprio monitor.",
    comoUsar: [
      "Acesse os padrões visuais clicando abaixo.",
      "Para ajuste de brilho (Black Level): ajuste até que apenas os quadrados pretos mais escuros se misturem ao fundo.",
      "Para ajuste de contraste (White Level): ajuste até conseguir distinguir os quadrados brancos mais claros do fundo branco 100%.",
      "Para Gama: verifique se as barras de gradiente de cinza apresentam uma transição linear sem cores espúrias (verde ou magenta) no meio."
    ],
    quandoUsar: [
      "Ao configurar um monitor novo recém-saído da caixa.",
      "Antes de iniciar o tratamento de fotografias ou edição de vídeo.",
      "Quando perceber que áreas escuras em filmes estão completamente esmagadas (sem detalhes)."
    ],
    limitacoes: "A calibração visual ajuda bastante, mas não substitui a precisão de um colorímetro profissional de hardware, que cria um perfil ICC absoluto para o seu painel.",
    faq: [
      {
        q: "Qual a diferença entre brilho e contraste no monitor?",
        a: "Geralmente, o controle de brilho ajusta o nível dos tons pretos (o quão profundos eles são). O contraste ajusta os níveis de branco (o limite superior de luminosidade antes de perder detalhes)."
      },
      {
        q: "Devo usar as configurações padrão de fábrica?",
        a: "Muitos monitores vêm de fábrica configurados para vitrines de lojas: brilho intenso e cores saturadas. Para uso em casa ou no escritório, a calibração manual proporciona uma experiência mais confortável e precisa."
      }
    ],
    related: ["teste-de-monitor", "teste-de-vazamento-de-luz", "limpeza-de-monitor"]
  }
];

const pagesEn = [
  {
    slug: "dead-pixel-test",
    toolId: "dead-pixel",
    title: "Free Dead Pixel Test Online",
    description: "Check if your monitor has dead pixels or stuck pixels. Free, fast and easy online test, no download required.",
    h1: "Free Dead Pixel Test Online",
    intro: "A dead pixel is a point on your screen that fails to light up or stays stuck on a single color. Our dead pixel test helps you quickly identify any imperfections on your monitor, smartphone or tablet display through various full-screen solid colors.",
    comoUsar: [
      "Click the button below to launch the testing tool.",
      "The screen will cycle through different solid colors (white, black, red, green, blue).",
      "Carefully inspect the screen on each color looking for dots that do not change.",
      "Use keyboard arrows or tap the screen to switch colors."
    ],
    quandoUsar: [
      "When buying a new monitor or smartphone to ensure there are no factory defects.",
      "Before your warranty or return window expires.",
      "When you notice a 'dirt' spot on your screen that cannot be cleaned off."
    ],
    limitacoes: "The tool helps with visual identification but does not fix defective pixels. Precision depends on your careful inspection.",
    faq: [
      {
        q: "What is a dead pixel?",
        a: "It's a pixel on an LCD/OLED panel that has stopped working and no longer emits light, appearing as a small black dot."
      },
      {
        q: "What is the difference between a dead pixel and a stuck pixel?",
        a: "A dead pixel is 'dead' and emits no light (it stays black). A stuck pixel is locked onto a single color (usually red, green, or blue)."
      },
      {
        q: "Can a dead pixel be fixed?",
        a: "In most dead pixel cases, the damage is permanent. Stuck pixels, on the other hand, can sometimes be 'unstuck' with tools that flash colors rapidly, though there is no guarantee."
      }
    ],
    related: ["monitor-test", "black-screen", "screen-cleaner"]
  },
  {
    slug: "black-screen",
    toolId: "black",
    title: "OLED Black Screen Fullscreen",
    description: "Display a 100% black screen in fullscreen. Ideal for backlight bleed tests, checking bright dead pixels, or as a dark second screen.",
    h1: "OLED Black Screen Fullscreen",
    intro: "A completely black screen is essential for checking the black uniformity on IPS monitors, testing perfect pixel shutdown on OLEDs, or simply using it as a screen saver without turning off your secondary monitor.",
    comoUsar: [
      "Access the tool by clicking the button below.",
      "The screen will turn entirely black in fullscreen mode.",
      "Dim the room lights for better inspection or just let the monitor rest.",
      "Press ESC or tap the screen to exit."
    ],
    quandoUsar: [
      "To evaluate backlight bleed and IPS glow in dark environments.",
      "To hide distractions on a second monitor while focusing on the main one.",
      "To check for pixels that are stuck on white (hot pixels)."
    ],
    limitacoes: "On traditional LCD monitors, the color black still emits backlight. True panel darkness depends on monitor technology (like OLED, which fully turns off the pixel).",
    faq: [
      {
        q: "Does this save battery on laptops?",
        a: "If your screen is OLED, yes. OLED displays turn off black pixels, saving energy. On traditional LCD screens, the backlight remains on, so savings are minimal."
      },
      {
        q: "Does it help test for backlight bleed?",
        a: "Yes! A black screen in a dark room is the best way to notice brighter corners or light patches on the screen (backlight bleeding)."
      }
    ],
    related: ["backlight-bleed-test", "dead-pixel-test", "screen-cleaner"]
  },
  {
    slug: "monitor-test",
    toolId: "color",
    title: "Complete Monitor Test Online",
    description: "Run an online monitor test to check color reproduction, contrast, and screen uniformity. Simple and no installation required.",
    h1: "Complete Monitor Test Online",
    intro: "Evaluating your display's performance is crucial for photo/video editing or getting the best quality in games. With this color test, you can identify color banding, poor calibration, and screen uniformity issues.",
    comoUsar: [
      "Start the test by clicking the button at the bottom of the page.",
      "View different patterns and color gradients in fullscreen.",
      "Check for smooth transitions in the gradient to spot color banding.",
      "Go through the test screens to observe overall contrast."
    ],
    quandoUsar: [
      "When buying a new monitor to verify color accuracy and uniformity.",
      "After performing hardware or software calibration, to validate the results.",
      "When you notice colors look washed out or unrealistic in videos or images."
    ],
    limitacoes: "The test provides a visual evaluation that relies on your eyes and ambient lighting. It doesn't replace a professional colorimeter (calibration hardware).",
    faq: [
      {
        q: "What is color banding?",
        a: "It's a visual artifact where color transitions in a gradient are not smooth, showing distinct lines or bands between shades of color."
      },
      {
        q: "Do I need any installed software?",
        a: "No. The entire monitor test runs through your browser, whether on PC, Mac, smartphone, or tablet."
      }
    ],
    related: ["display-calibration", "dead-pixel-test", "backlight-bleed-test"]
  },
  {
    slug: "backlight-bleed-test",
    toolId: "black",
    title: "Backlight Bleed Test",
    description: "Test your monitor for backlight bleed and IPS glow. Free online tool to test screens in dark environments.",
    h1: "Backlight Bleed and IPS Glow Test",
    intro: "Backlight bleed and IPS glow are phenomena where the backlight leaks through the edges or corners of a dark screen, affecting immersion in movies and games. Our tool helps you identify the severity of this effect.",
    comoUsar: [
      "For an accurate result, turn off all room lights (100% dark environment).",
      "Adjust the monitor brightness to the level you normally use in the dark.",
      "Click to open the full black screen.",
      "Inspect the edges and corners of the screen for light clouds."
    ],
    quandoUsar: [
      "When purchasing a new IPS, VA, or TN monitor to check for panel issues.",
      "If you notice bright spots in corners during dark scenes in games or movies.",
      "To compare the black uniformity between two monitors."
    ],
    limitacoes: "It is normal for IPS monitors to have some glow at viewing angles (IPS glow). Smartphone cameras often exaggerate the effect in photos, so always trust what your eyes see.",
    faq: [
      {
        q: "What is the difference between backlight bleed and IPS glow?",
        a: "Backlight bleed consists of irregular light leaks, often at the edges, caused by panel assembly. IPS glow is a characteristic of IPS panels that changes brightness in corners depending on your viewing angle."
      },
      {
        q: "Can backlight bleed be fixed?",
        a: "Usually no, as it is structural to the panel assembly. If it's very intense and recent, the best option is to use the warranty or request a return."
      }
    ],
    related: ["black-screen", "monitor-test", "dead-pixel-test"]
  },
  {
    slug: "screen-cleaner",
    toolId: "cleaner",
    title: "Screen Cleaning Inspection Tool",
    description: "Use this screen to inspect for smudges, dust, and fingerprints on your monitor. Make cleaning your display easier with our online tool.",
    h1: "Screen Cleaning and Inspection Guide",
    intro: "To properly clean your monitor, you must be able to see all the dirt, smudges, and fingerprints. Our cleaning assist screen provides an optimal background to highlight any grime that needs removing.",
    comoUsar: [
      "Dim your monitor or activate our dark inspection screen.",
      "Identify smudges and areas with accumulated dust.",
      "Use a clean, dry microfiber cloth to remove light dust.",
      "For smudges, slightly dampen the cloth with distilled water (never spray directly on the screen) and wipe gently."
    ],
    quandoUsar: [
      "Whenever performing maintenance and cleaning on your setup.",
      "To highlight persistent smudges that aren't visible when there's too much information on screen.",
      "Before applying screen protectors on tablets or laptops."
    ],
    limitacoes: "The tool is a visual aid. You will still need proper materials (microfiber cloth and water or specific cleaner) to physically clean without damaging the display.",
    faq: [
      {
        q: "Can I use alcohol or glass cleaner on my monitor?",
        a: "It's not recommended. Harsh chemicals, rubbing alcohol, or ammonia-based glass cleaners can strip anti-reflective coatings and permanently damage the panel."
      },
      {
        q: "What is the best cloth for cleaning screens?",
        a: "It's best to use soft, lint-free microfiber cloths, similar to those used for cleaning eyeglasses."
      }
    ],
    related: ["black-screen", "dead-pixel-test", "display-calibration"]
  },
  {
    slug: "webcam-light",
    toolId: "white",
    title: "Monitor Light for Video Calls",
    description: "Use your monitor as makeshift lighting (virtual ring light) for video calls on Zoom, Meet, and Teams.",
    h1: "Monitor Light for Video Calls",
    intro: "Need more light on your face during an important meeting? Use your own monitor's brightness as a fill light source (screen ring light) to instantly improve your webcam quality.",
    comoUsar: [
      "If you're in low light, click the button to activate the white screen.",
      "Place the tab in split-screen alongside your video call, or on a second monitor behind the webcam.",
      "Increase your monitor's brightness to intensify the light on your face.",
      "Adjust the screen color, if desired, for warmer (yellowish) or cooler lighting."
    ],
    quandoUsar: [
      "During meetings on Zoom, Google Meet, or Teams in poorly lit rooms.",
      "To remove dark shadows from your face caused by background windows.",
      "To record webcam videos when you don't have a professional ring light."
    ],
    limitacoes: "The range and intensity depend on your monitor's peak brightness (nits) and size. Larger monitors will provide softer, more diffused lighting.",
    faq: [
      {
        q: "Does this replace a real ring light?",
        a: "Not entirely. It's a quick and effective workaround to fill your face with light, but dedicated lighting equipment offers much more power and control."
      },
      {
        q: "How can I make the light less harsh on the eyes?",
        a: "You can change the background color of our tool from pure white to a warm/peach tone, simulating the color temperature of a warm bulb."
      }
    ],
    related: ["fullscreen-message", "online-teleprompter", "fullscreen-clock"]
  },
  {
    slug: "green-screen",
    toolId: "color",
    title: "Green Screen Chroma Key Online",
    description: "Create a green screen background (chroma key) on your monitor, phone, or tablet for visual effects, videos, or fullscreen photos.",
    h1: "Fullscreen Green Screen (Chroma Key)",
    intro: "Chroma keying allows for easy background removal in video editing or live streaming. With our online green screen tool, you can instantly turn your monitor, tablet, or smartphone into a chroma key panel.",
    comoUsar: [
      "Access the tool and select the green screen option.",
      "Turn your device's screen brightness to maximum and avoid lights that cause glare on the screen.",
      "Place the tablet or monitor behind the objects you wish to record.",
      "In your editing software (Premiere, OBS Studio, DaVinci), apply the Chroma Key effect to key out the green."
    ],
    quandoUsar: [
      "For visual effects on small objects using an iPad or phone screen.",
      "To photograph products with an easily removable background.",
      "To create creative transitions using a laptop screen."
    ],
    limitacoes: "Since screens emit light, the green can spill onto the photographed object, making editing harder. Also, room reflections on the monitor glass might ruin the effect.",
    faq: [
      {
        q: "Can I use other colors, like a blue screen?",
        a: "Yes, the tool allows you to select solid colors (like blue or magenta), which is ideal if the object being recorded contains greenish elements."
      },
      {
        q: "How do I avoid screen reflections?",
        a: "Record in a dark room where the only light is from the screen, or use polarizing filters on your camera lens."
      }
    ],
    related: ["webcam-light", "black-screen", "online-teleprompter"]
  },
  {
    slug: "focus-timer",
    toolId: "focus-timer",
    title: "Focus Timer with Brown Noise",
    description: "Improve your concentration with our minimalist focus timer. Includes brown and white noise to drown out distractions while working or studying.",
    h1: "Focus Timer with Brown Noise",
    intro: "Stay focused on difficult tasks with our minimalist timer. Based on uninterrupted focus cycles and supplemented by soundscapes like brown and white noise, it's ideal for blocking background sounds and aiding people on the ADHD spectrum.",
    comoUsar: [
      "Set the time you want to stay focused for (e.g., 25, 45, or 60 minutes).",
      "Select a background sound (Brown, White, or Pink Noise) to muffle ambient noise.",
      "Click Start and leave it in fullscreen on a secondary monitor.",
      "When the time runs out, take a short break."
    ],
    quandoUsar: [
      "During intense study sessions (Pomodoro technique).",
      "In noisy offices where it's hard to focus on programming, reading, or writing tasks.",
      "When trying to meditate or perform repetitive tasks that require mindfulness."
    ],
    limitacoes: "Effectiveness relies on your discipline to not switch tabs. It's recommended to use headphones to fully benefit from the sound blocking.",
    faq: [
      {
        q: "What is Brown Noise?",
        a: "Brown noise emphasizes lower frequencies (like the sound of a distant waterfall or ocean). Many find it less harsh than white noise and excellent for deep concentration."
      },
      {
        q: "Why do background sounds help?",
        a: "Continuous sounds like pink and brown noise create a 'sound curtain' that masks sudden noise variations (like chatter or doors slamming), reducing distractions and allowing the brain to relax."
      }
    ],
    related: ["fullscreen-clock", "fullscreen-message", "online-teleprompter"]
  },
  {
    slug: "fullscreen-clock",
    toolId: "clock",
    title: "Fullscreen Clock Display",
    description: "Large and minimalist digital clock in fullscreen. Use it on secondary monitors, dashboards, exams, or as a screensaver for your setup.",
    h1: "Minimalist Fullscreen Digital Clock",
    intro: "A large, aesthetically pleasing digital clock free of distractions, perfect for filling the screen of secondary monitors, information dashboards, or keeping track of time during events and lectures.",
    comoUsar: [
      "Open the tool page to view the clock with the current time.",
      "Press the fullscreen button to hide the browser bars.",
      "Adjust the background color and number style to match your room or setup.",
      "Keep the tab open on your chosen device."
    ],
    quandoUsar: [
      "As a useful screensaver for your computer.",
      "On monitors facing the stage during lectures or exams, to help speakers manage their time.",
      "To display time on digital signage in stores, receptions, or classrooms."
    ],
    limitacoes: "Relies on your device's operating system clock. Very old devices that go into deep sleep may cause visual delays until the tab is reactivated.",
    faq: [
      {
        q: "Does the clock work offline?",
        a: "No. The tool is not an installed app, so it requires the tab to remain open. Once loaded, it doesn't consume data, but the page needs an internet connection to load."
      },
      {
        q: "Is there a dark mode?",
        a: "Yes! By default, the tool uses a dark, minimalist theme to avoid straining your eyes in low-light environments."
      }
    ],
    related: ["focus-timer", "fullscreen-message", "black-screen"]
  },
  {
    slug: "fullscreen-message",
    toolId: "message",
    title: "Fullscreen Message Display",
    description: "Display a large text sign in fullscreen. Use it to communicate information, quick warnings, or messages from a distance.",
    h1: "Fullscreen Message and Signboard",
    intro: "Need to relay information to someone across the room but can't speak? Display texts in giant letters filling the entire screen of your phone, tablet, or monitor with our digital signboard tool.",
    comoUsar: [
      "Access the tool and type your desired text in the field.",
      "The text will scale automatically to fill as much screen space as possible.",
      "Select bold colors for high contrast (like yellow on black).",
      "Show the screen to the person or audience."
    ],
    quandoUsar: [
      "To pick someone up at the airport with a tablet.",
      "To pass a quick message to a colleague in a meeting room or studio where silence is required.",
      "As a 'be right back' sign at workstations or booths."
    ],
    limitacoes: "Very long sentences will cause the font size to shrink, reducing readability at a distance. Keep texts short and to the point.",
    faq: [
      {
        q: "Does the text adjust on phones and TVs?",
        a: "Yes, our tool is responsive. The text automatically resizes to fit any screen format, whether vertically on a smartphone or on a 4K TV."
      },
      {
        q: "Can I save the message?",
        a: "Messages are temporary and work only in the active browser tab for quick, immediate communication."
      }
    ],
    related: ["online-teleprompter", "fullscreen-clock", "webcam-light"]
  },
  {
    slug: "online-teleprompter",
    toolId: "message",
    title: "Free Online Teleprompter",
    description: "Read your scripts easily with our free online teleprompter. Features speed control, font adjustment, and text mirroring.",
    h1: "Free Online Teleprompter",
    intro: "Record videos more professionally without having to memorize long texts. Our online teleprompter tool automatically scrolls your script on the screen, allowing you to maintain eye contact and convey credibility.",
    comoUsar: [
      "Paste or type your text or script in the main area.",
      "Adjust the text size for comfortable reading.",
      "Set your desired scrolling speed.",
      "Enable screen mirroring if using a teleprompter reflector glass in front of your camera."
    ],
    quandoUsar: [
      "During video recordings for YouTube, online courses, or social media.",
      "When hosting webinars or live presentations where speech fluency is crucial.",
      "Recording speeches using a tablet positioned near the camera lens."
    ],
    limitacoes: "On very wide monitors without teleprompter equipment, eyes may noticeably dart from side to side.",
    faq: [
      {
        q: "Do I need to download any software?",
        a: "No, our teleprompter runs 100% online in your web browser, quickly and securely."
      },
      {
        q: "How do I avoid looking like I'm reading?",
        a: "Increase the side margins of the text. The narrower the text column (and the closer it is to the camera lens), the less your eyes will move side to side."
      }
    ],
    related: ["fullscreen-message", "webcam-light", "fullscreen-clock"]
  },
  {
    slug: "display-calibration",
    toolId: "calibration",
    title: "Display Calibration Patterns",
    description: "Visual tools and patterns to help with the basic calibration of your monitor, ensuring better contrast, brightness, and fidelity.",
    h1: "Visual Verification and Calibration",
    intro: "Poorly configured monitors can cause eye strain or ruin image editing work. Our calibration patterns help you manually adjust brightness, contrast, and gray levels using your monitor's built-in menus.",
    comoUsar: [
      "Access the visual patterns by clicking below.",
      "For brightness adjustment (Black Level): tweak until only the darkest black squares blend into the background.",
      "For contrast adjustment (White Level): tweak until you can just distinguish the lightest white squares from the 100% white background.",
      "For Gamma: verify if the grayscale gradient bars show a linear transition without spurious colors (green or magenta) in the middle."
    ],
    quandoUsar: [
      "When setting up a brand-new monitor straight out of the box.",
      "Before starting photo retouching or video editing.",
      "When you notice dark areas in movies are completely crushed (lacking detail)."
    ],
    limitacoes: "Visual calibration is very helpful, but it does not replace the precision of a professional hardware colorimeter, which creates an absolute ICC profile for your panel.",
    faq: [
      {
        q: "What is the difference between brightness and contrast on a monitor?",
        a: "Generally, the brightness control adjusts the level of black tones (how deep they are). Contrast adjusts the white levels (the upper limit of luminosity before losing detail)."
      },
      {
        q: "Should I use factory default settings?",
        a: "Many monitors come factory-configured for store displays: intense brightness and oversaturated colors. For home or office use, manual calibration provides a more comfortable and accurate experience."
      }
    ],
    related: ["monitor-test", "backlight-bleed-test", "screen-cleaner"]
  }
];

const ptToEnSlugs = {
  "teste-de-dead-pixel": "dead-pixel-test",
  "tela-preta-oled": "black-screen",
  "teste-de-monitor": "monitor-test",
  "teste-de-vazamento-de-luz": "backlight-bleed-test",
  "limpeza-de-monitor": "screen-cleaner",
  "luz-para-videochamada": "webcam-light",
  "tela-verde-chroma": "green-screen",
  "timer-de-foco": "focus-timer",
  "relogio-em-tela-cheia": "fullscreen-clock",
  "mensagem-em-tela": "fullscreen-message",
  "teleprompter-online": "online-teleprompter",
  "verificacao-visual": "display-calibration"
};

const enToPtSlugs = Object.fromEntries(Object.entries(ptToEnSlugs).map(([k, v]) => [v, k]));

function generateHTML(page, lang = "pt-BR", allPagesList = pages) {
  const isEn = lang === "en";
  const ptSlug = isEn ? enToPtSlugs[page.slug] : page.slug;
  const enSlug = isEn ? page.slug : ptToEnSlugs[page.slug];
  const pageUrl = isEn ? `${BASE_URL}/en/${page.slug}/` : `${BASE_URL}/${page.slug}/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": page.title,
    "url": pageUrl,
    "description": page.description,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.title,
    "description": page.description,
    "url": pageUrl
  };

  const relatedLinksHtml = page.related.map(rel => {
    const p = allPagesList.find(pg => pg.slug === rel);
    const href = isEn ? `/en/${p.slug}/` : `/${p.slug}/`;
    return p ? `<li><a href="${href}">${p.title}</a></li>` : "";
  }).join("\n        ");
  
  const backAllText = isEn ? "← All tools" : "← Todas as ferramentas";
  const ctaText = isEn ? "🚀 Open Free Tool in Fullscreen" : "🚀 Abrir Ferramenta Online em Tela Cheia";
  const footerText = isEn ? "Back to all MonitorSmith tools" : "Voltar para todas as ferramentas do MonitorSmith";
  const copyrightText = isEn ? "© EXVORN.TECH — Free Web Tool Suite for Displays & Monitors" : "© EXVORN.TECH — Suíte Gratuita de Ferramentas Web para Display & Monitores";
  const howToUseTitle = isEn ? "How to use" : "Como usar";
  const whenToUseTitle = isEn ? "When to use" : "Quando usar";
  const limitationsTitle = isEn ? "Limitations" : "Limitações";
  const faqTitle = isEn ? "Frequently Asked Questions (FAQ)" : "Perguntas Frequentes (FAQ)";
  const relatedTitle = isEn ? "Related Tools" : "Ferramentas Relacionadas";

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <link rel="canonical" href="${pageUrl}">
  <link rel="alternate" hreflang="pt-BR" href="${BASE_URL}/${ptSlug}/" />
  <link rel="alternate" hreflang="en" href="${BASE_URL}/en/${enSlug}/" />
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:type" content="website">
  
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  
  <script type="application/ld+json">
  ${JSON.stringify([jsonLd, jsonLdWebPage])}
  </script>
  
  <style>
    :root {
      --bg: #030304;
      --text: #e5e7eb;
      --accent: #34d399;
      --card-bg: rgba(16, 18, 26, 0.7);
      --border: rgba(255, 255, 255, 0.1);
    }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background-color: var(--bg);
      background-image: radial-gradient(circle at 50% 0%, rgba(52, 211, 153, 0.08), transparent 40rem);
      color: var(--text);
      line-height: 1.65;
    }
    header {
      border-bottom: 1px solid var(--border);
      padding: 1.1rem 2rem;
      background: rgba(3, 3, 4, 0.85);
      backdrop-filter: blur(16px);
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    header a.brand {
      color: #ffffff;
      text-decoration: none;
      font-weight: 700;
      font-size: 1.2rem;
      letter-spacing: -0.02em;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    header .brand-badge {
      font-size: 0.65rem;
      font-family: monospace;
      color: var(--accent);
      padding: 2px 7px;
      border-radius: 4px;
      background: rgba(52, 211, 153, 0.12);
      border: 1px solid rgba(52, 211, 153, 0.3);
    }
    main {
      max-width: 860px;
      margin: 0 auto;
      padding: 2.5rem 1.25rem;
    }
    h1 {
      color: #ffffff;
      font-size: clamp(2rem, 5vw, 2.75rem);
      font-weight: 700;
      letter-spacing: -0.03em;
      margin-top: 0;
      margin-bottom: 1.25rem;
      line-height: 1.15;
    }
    h2 {
      color: #ffffff;
      font-size: 1.35rem;
      margin-top: 2rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.5rem;
      letter-spacing: -0.01em;
    }
    .intro {
      font-size: 1.125rem;
      color: rgba(229, 231, 235, 0.8);
      margin-bottom: 2rem;
      line-height: 1.7;
    }
    .cta-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: linear-gradient(135deg, #34d399, #10b981);
      color: #030304;
      padding: 1rem 2.2rem;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 700;
      font-size: 1.1rem;
      margin: 1.5rem 0 2.5rem;
      box-shadow: 0 8px 24px rgba(52, 211, 153, 0.35);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(52, 211, 153, 0.5);
    }
    .section {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 1.75rem;
      margin-bottom: 2rem;
      backdrop-filter: blur(12px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }
    ul, ol {
      padding-left: 1.5rem;
    }
    li {
      margin-bottom: 0.6rem;
      color: rgba(229, 231, 235, 0.9);
    }
    .faq-q {
      font-weight: 600;
      color: #ffffff;
      font-size: 1.05rem;
      margin-top: 1.5rem;
    }
    .faq-a {
      color: rgba(229, 231, 235, 0.75);
      margin-top: 4px;
    }
    footer {
      margin-top: 4rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border);
      text-align: center;
      padding-bottom: 4rem;
    }
    footer a {
      color: var(--accent);
      text-decoration: none;
      font-weight: 600;
    }
    footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <header>
    <a href="/" class="brand">
      <span>MonitorSmith</span>
      <span class="brand-badge">EXVORN.TECH</span>
    </a>
    <a href="/" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.85rem;">${backAllText}</a>
  </header>
  
  <main>
    <h1>${page.h1}</h1>
    <p class="intro">${page.intro}</p>
    
    <a href="/?tool=${page.toolId}" class="cta-btn">${ctaText}</a>
    
    <div class="section">
      <h2>${howToUseTitle}</h2>
      <ol>
        ${page.comoUsar.map(step => `<li>${step}</li>`).join("\n        ")}
      </ol>
    </div>
    
    <div class="section">
      <h2>${whenToUseTitle}</h2>
      <ul>
        ${page.quandoUsar.map(item => `<li>${item}</li>`).join("\n        ")}
      </ul>
    </div>
    
    <div class="section">
      <h2>${limitationsTitle}</h2>
      <p>${page.limitacoes}</p>
    </div>
    
    <div class="section">
      <h2>${faqTitle}</h2>
      ${page.faq.map(f => `
      <div class="faq-item">
        <div class="faq-q">${f.q}</div>
        <div class="faq-a">${f.a}</div>
      </div>`).join("")}
    </div>
    
    <div class="section">
      <h2>${relatedTitle}</h2>
      <ul>
        ${relatedLinksHtml}
      </ul>
    </div>
    
    <footer>
      <p><a href="/">${footerText}</a></p>
      <p style="font-size: 0.8rem; color: rgba(255,255,255,0.4); margin-top: 12px;">${copyrightText}</p>
    </footer>
  </main>
</body>
</html>`;
}

async function generateSitemap() {
  const date = new Date().toISOString().split("T")[0];
  
  const urls = [
    { loc: `${BASE_URL}/`, priority: "1.0" },
    ...pages.map(p => ({ loc: `${BASE_URL}/${p.slug}/`, priority: "0.8" })),
    ...pagesEn.map(p => ({ loc: `${BASE_URL}/en/${p.slug}/`, priority: "0.7" }))
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const u of urls) {
    xml += `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${date}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>\n`;
  }
  
  xml += `</urlset>`;
  return xml;
}

async function main() {
  try {
    await fs.mkdir(DIST_DIR, { recursive: true });
    
    for (const page of pages) {
      const pageDir = path.join(DIST_DIR, page.slug);
      await fs.mkdir(pageDir, { recursive: true });
      
      const html = generateHTML(page, "pt-BR", pages);
      await fs.writeFile(path.join(pageDir, "index.html"), html, "utf-8");
      console.log(`Generated page: ${page.slug}`);
    }
    
    for (const page of pagesEn) {
      const pageDir = path.join(DIST_DIR, "en", page.slug);
      await fs.mkdir(pageDir, { recursive: true });
      
      const html = generateHTML(page, "en", pagesEn);
      await fs.writeFile(path.join(pageDir, "index.html"), html, "utf-8");
      console.log(`Generated page: en/${page.slug}`);
    }
    
    const sitemapXml = await generateSitemap();
    await fs.writeFile(path.join(DIST_DIR, "sitemap.xml"), sitemapXml, "utf-8");
    console.log("Generated sitemap.xml");
    
    console.log("SEO pages generation complete.");
  } catch (err) {
    console.error("Error generating SEO pages:", err);
    process.exit(1);
  }
}

main();
