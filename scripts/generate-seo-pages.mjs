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

function generateHTML(page) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": page.title,
    "url": `${BASE_URL}/${page.slug}/`,
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
    "url": `${BASE_URL}/${page.slug}/`
  };

  const relatedLinksHtml = page.related.map(rel => {
    const p = pages.find(pg => pg.slug === rel);
    return p ? `<li><a href="/${p.slug}/">${p.title}</a></li>` : "";
  }).join("\n        ");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <link rel="canonical" href="${BASE_URL}/${page.slug}/">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="${BASE_URL}/${page.slug}/">
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
    <a href="/" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.85rem;">← Todas as ferramentas</a>
  </header>
  
  <main>
    <h1>${page.h1}</h1>
    <p class="intro">${page.intro}</p>
    
    <a href="/?tool=${page.toolId}" class="cta-btn">🚀 Abrir Ferramenta Online em Tela Cheia</a>
    
    <div class="section">
      <h2>Como usar</h2>
      <ol>
        ${page.comoUsar.map(step => `<li>${step}</li>`).join("\n        ")}
      </ol>
    </div>
    
    <div class="section">
      <h2>Quando usar</h2>
      <ul>
        ${page.quandoUsar.map(item => `<li>${item}</li>`).join("\n        ")}
      </ul>
    </div>
    
    <div class="section">
      <h2>Limitações</h2>
      <p>${page.limitacoes}</p>
    </div>
    
    <div class="section">
      <h2>Perguntas Frequentes (FAQ)</h2>
      ${page.faq.map(f => `
      <div class="faq-item">
        <div class="faq-q">${f.q}</div>
        <div class="faq-a">${f.a}</div>
      </div>`).join("")}
    </div>
    
    <div class="section">
      <h2>Ferramentas Relacionadas</h2>
      <ul>
        ${relatedLinksHtml}
      </ul>
    </div>
    
    <footer>
      <p><a href="/">Voltar para todas as ferramentas do MonitorSmith</a></p>
      <p style="font-size: 0.8rem; color: rgba(255,255,255,0.4); margin-top: 12px;">© EXVORN.TECH — Suíte Gratuita de Ferramentas Web para Display & Monitores</p>
    </footer>
  </main>
</body>
</html>`;
}

async function generateSitemap() {
  const date = new Date().toISOString().split("T")[0];
  
  const urls = [
    { loc: `${BASE_URL}/`, priority: "1.0" },
    ...pages.map(p => ({ loc: `${BASE_URL}/${p.slug}/`, priority: "0.8" }))
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
      
      const html = generateHTML(page);
      await fs.writeFile(path.join(pageDir, "index.html"), html, "utf-8");
      console.log(`Generated page: ${page.slug}`);
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
