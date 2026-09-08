export default [
  {
    slug: 'calibrar-monitor-fotografia-design',
    toolId: 'calibration',
    title: 'Calibrar Monitor para Fotografia e Design | Guia Técnico',
    h1: 'Como Calibrar Monitor para Fotografia e Design Gráfico',
    description: 'Aprenda os fundamentos de calibração de cor para fluxos criativos: perfis ICC, espaços sRGB vs Adobe RGB, curvas de gama e verificação visual de escala de cinza.',
    relatedSlugs: ['teste-contraste-gama-monitor', 'o-que-e-color-banding', 'monitor-para-edicao-video'],
    faq: [
      ['Por que calibrar o monitor para design e fotografia?', 'Medição e perfilamento podem reduzir desvios em um fluxo controlado. Isso melhora previsibilidade, mas não garante correspondência entre telas, impressão, iluminação e materiais diferentes.'],
      ['Qual a diferença entre calibração por hardware e software?', 'Alguns monitores permitem ajustar uma LUT interna; outros fluxos aplicam correções pelo sistema ou GPU. Capacidade e profundidade variam por equipamento e software.'],
      ['O que é um perfil ICC?', 'É um arquivo digital padronizado pelo International Color Consortium que mapeia as coordenadas colorimétricas do monitor em relação a um espaço de cor padrão independente de dispositivo (CIE Lab).']
    ],
    body: `
      <h2>A Ciência da Calibração e Gerenciamento de Cores</h2>
      <p>Em design e fotografia, uma cadeia de cor previsível depende do monitor, ambiente, perfil, aplicativo e destino. Modos de fábrica variam; restaure um modo conhecido e meça o equipamento quando a fidelidade for crítica.</p>

      <p><strong>Calibração</strong> ajusta o dispositivo em direção a um alvo definido; <strong>perfilamento</strong> mede sua resposta e descreve essa condição em um perfil ICC. A correção efetiva depende de aplicativos com gerenciamento de cor e de um fluxo configurado de ponta a ponta.</p>

      <h2>Espaços de Cor: sRGB, Adobe RGB e DCI-P3</h2>
      <ul>
        <li><strong>sRGB:</strong> espaço de referência comum para conteúdo web; incorpore o perfil e confira o destino em aplicativos com gerenciamento de cor.</li>
        <li><strong>Adobe RGB:</strong> possui gamut diferente e pode ser útil em fluxos de fotografia e impressão configurados para ele.</li>
        <li><strong>DCI-P3 e Display P3:</strong> são referências distintas usadas em cinema e dispositivos. Escolha o espaço exigido pelo fluxo, sem tratá-los como intercambiáveis.</li>
      </ul>

      <h2>Aferição Visual de Sombras e Realces</h2>
      <p>Antes de aplicar perfis com colorímetros dedicados, realize uma verificação visual preliminar. Compare os degraus de escala de cinza nos extremos: perdas de separação entre tons escuros ou claros podem sugerir <em>black crush</em> ou <em>white clipping</em>, mas a avaliação depende do ambiente, do sinal e do observador.</p>

      <p><a class="cta" href="/?tool=calibration">Abrir Laboratório de Padrões no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'o-que-e-color-banding',
    toolId: 'calibration',
    title: 'O que é Color Banding e Como Resolver no Monitor',
    h1: 'Color Banding: Causas Físicas, Profundidade de Bits e Soluções',
    description: 'Entenda o que causa as faixas de cor em gradientes (color banding), a diferença entre painéis 8-bit e 10-bit e o papel dos algoritmos de dithering (FRC).',
    relatedSlugs: ['calibrar-monitor-fotografia-design', 'teste-contraste-gama-monitor'],
    faq: [
      ['O que é color banding?', 'É a quebra visual de um gradiente contínuo e suave em degraus ou faixas duras de cor, decorrente de profundidade de bits insuficiente, compressão de sinal ou quantização errônea.'],
      ['Painel nativo de 10 bits elimina o color banding?', 'Não necessariamente. Maior profundidade pode reduzir quantização quando toda a cadeia entrega 10 bits, mas compressão, processamento, calibração, dithering e o próprio painel ainda podem produzir faixas.'],
      ['O que é FRC (Frame Rate Control)?', 'É um algoritmo de dithering temporal que alterna subpixels entre dois estados adjacentes a cada ciclo de atualização para simular cores intermediárias que um painel de 8 bits ou 6 bits não renderiza nativamente.']
    ],
    body: `
      <h2>A Física da Quantização Tonal</h2>
      <p>Um fluxo RGB de 8 bits por canal possui 256 códigos por canal. Faixas visíveis podem surgir da quantização, mas também de compressão, transformação de cor, composição, sinal, painel ou do próprio arquivo.</p>

      <h2>Painéis 8-bit vs. 10-bit vs. 8-bit + FRC</h2>
      <p>Um caminho de 10 bits oferece mais códigos por canal quando aplicativo, sistema, GPU, conexão e painel mantêm essa profundidade. Uma ficha técnica isolada não confirma toda a cadeia.</p>

      <p>Alguns painéis usam dithering temporal, frequentemente descrito como FRC, para representar valores intermediários. Implementação e resultado variam por modelo e não podem ser identificados apenas por um gradiente no navegador.</p>

      <h2>Diagnóstico: Falha de Display vs. Compressão de Origem</h2>
      <p>Para investigar onde o banding aparece:</p>
      <ul>
        <li>Compare o gradiente em navegadores, perfis e telas diferentes. Um resultado suave não certifica a configuração completa.</li>
        <li>Compare também arquivos sem compressão e conteúdos de outras fontes. Diferenças ajudam a isolar a etapa, mas não provam uma causa sozinhas.</li>
      </ul>

      <p><a class="cta" href="/?tool=calibration">Testar Gradientes Contínuos no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'teste-contraste-gama-monitor',
    toolId: 'calibration',
    title: 'Teste de Contraste e Curva Gama (Gamma 2.2) para Monitores',
    h1: 'Teste de Contraste e Gama: Avalie a Resposta Tonal do Monitor',
    description: 'Aprenda a avaliar a relação de contraste e o alinhamento da curva Gama (Gamma 2.2 e BT.1886) para evitar esmagamento de pretos e realces estourados.',
    relatedSlugs: ['calibrar-monitor-fotografia-design', 'monitor-para-edicao-video'],
    faq: [
      ['O que é a curva Gama em termos de engenharia de display?', 'É a função de transferência eletro-óptica que relaciona a tensão do sinal digital com a luminância de saída física do painel, compensando a percepção logarítmica do olho humano.'],
      ['O que pode causar perda de detalhes nas sombras?', 'Faixa RGB, curva de transferência, brilho, contraste, perfil, luz ambiente e processamento podem aproximar níveis escuros. O padrão ajuda a observar, não a determinar a causa.'],
      ['Por que comparar com processamento dinâmico desligado?', 'Recursos dinâmicos podem mudar brilho e contraste conforme o conteúdo. Um modo estável facilita comparações, desde que o manual permita desativá-los.']
    ],
    body: `
      <h2>A Função de Transferência Gama (EOTF)</h2>
      <p>Funções de transferência relacionam valores codificados e luz. A aproximação por uma potência simples pode ser útil em alguns contextos, enquanto padrões como sRGB usam uma função segmentada e fluxos de vídeo podem adotar outras referências.</p>

      <p>O alvo depende do padrão de entrega, do ambiente e do sistema de referência. sRGB e Rec.709 compartilham primárias, mas não devem ser reduzidos a uma única regra universal de gama.</p>

      <h2>Avaliação Visual de Níveis Extremos de Cinza</h2>
      <p>Para fazer uma triagem visual de sombras e realces:</p>
      <ul>
        <li><strong>Sombras:</strong> observe quantos degraus próximos ao preto permanecem separados e confirme faixa RGB, perfil e ambiente antes de ajustar o OSD.</li>
        <li><strong>Realces:</strong> compare os degraus próximos ao branco em um modo conhecido. Mudanças no contraste podem afetar outros níveis; registre antes e depois.</li>
      </ul>

      <p><a class="cta" href="/?tool=calibration">Executar Padrão de Teste Gama no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'monitor-para-edicao-video',
    toolId: 'calibration',
    title: 'Monitor para Edição de Vídeo: Especificações Técnicas Essenciais',
    h1: 'Como Escolher Monitor para Edição de Vídeo: Guia de Engenharia',
    description: 'Critérios para comparar monitores de edição: padrão de entrega, medições de gamut e erro, sinais aceitos, uniformidade e condições de referência.',
    relatedSlugs: ['calibrar-monitor-fotografia-design', 'o-que-e-color-banding'],
    faq: [
      ['Qual cobertura de gamut é necessária?', 'Depende do padrão de entrega e do contrato do projeto. Verifique cobertura e volume medidos, modo de referência, estabilidade e requisitos do cliente em vez de adotar um percentual universal.'],
      ['O que significa Delta E?', 'É uma família de métricas para diferença entre cores. Fórmula, referência, distribuição dos patches e condições de medição importam; um único número não garante invisibilidade do erro.'],
      ['Como avaliar capacidade HDR?', 'Considere EOTF, luminância medida, nível de preto, controle de luz, gamut, precisão e sinal aceito. Tecnologia do painel ou selo isolado não valida todo o fluxo.']
    ],
    body: `
      <h2>Requisitos Críticos para Monitor de Referência de Vídeo</h2>
      <p>Pós-produção e color grading exigem um alvo definido, cadeia configurada e medições periódicas. Requisitos de controle de qualidade variam por cliente e plataforma; confirme a especificação de entrega atual do projeto.</p>

      <h2>Principais Parâmetros Técnicos</h2>
      <ul>
        <li><strong>Padrão de entrega:</strong> confirme primárias, ponto branco, função de transferência, faixa de sinal e ambiente exigidos pelo projeto.</li>
        <li><strong>Calibração e LUT:</strong> verifique se o modelo oferece fluxo mensurável compatível com seu software; profundidade e implementação variam.</li>
        <li><strong>Cadência e sinais:</strong> confira as taxas aceitas e como o monitor trata cada sinal real usado na produção.</li>
      </ul>

      <p><a class="cta" href="/?tool=calibration">Abrir Verificação Visual no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'chroma-key-sem-tecido-tela-verde',
    toolId: 'green-screen',
    title: 'Chroma Key Sem Tecido: Usando a Tela do Monitor como Fundo Verde',
    h1: 'Chroma Key Sem Tecido: Como Usar Monitores e Telas como Fundo Verde',
    description: 'Aprenda a utilizar a tela de um monitor, TV ou tablet como fundo chroma key limpo e autoiluminado para gravações de produtos, webcams e streaming.',
    relatedSlugs: ['fundo-cor-fotos-produto', 'cores-streaming-cenarios'],
    faq: [
      ['Qual a vantagem de usar um monitor em vez de tecido verde?', 'Para enquadramentos pequenos, a tela oferece uma superfície plana e autoiluminada sem vincos. Uniformidade, reflexos e brilho ainda dependem do painel, do ângulo e da iluminação da cena.'],
      ['Como evitar o reflexo verde (green spill) no rosto ou objeto?', 'Reduza o brilho do monitor até a câmera registrar uma referência verde estável e aumente a iluminação frontal (luz principal). O resultado depende da tela, câmera e exposição.'],
      ['Quais softwares suportam remoção de fundo por chroma key?', 'OBS Studio, Streamlabs, DaVinci Resolve, Adobe Premiere Pro, Final Cut Pro e plataformas de videoconferência como Zoom e Google Meet.']
    ],
    body: `
      <h2>A Óptica da Chave de Croma em Superfícies Autoemissivas</h2>
      <p>O <strong>Chroma Key</strong> remove uma faixa de cor do sinal para compor transparência. O verde é comum porque costuma se separar de tons de pele e muitos sensores o amostram densamente, mas câmera, compressão, exposição e objeto determinam o resultado. #00B140 é apenas o valor CSS solicitado à tela.</p>

      <h2>Vantagens e Desafios de Displays como Fundo</h2>
      <p>Uma tela evita rugas de tecido, mas pode introduzir pixel grid, moiré, banding, reflexos, spill e variação de brilho. Confira o recorte em movimento e na resolução final antes de gravar.</p>

      <h2>Controle de Transbordamento de Luz (Despill)</h2>
      <p>Como o monitor é uma fonte emissiva de fótons, uma tela verde com brilho excessivo pode projetar reflexos verdes nas bordas do objeto em primeiro plano. Para mitigar esse efeito:</p>
      <ol>
        <li>Aumente a distância entre objeto e tela até reduzir o reflexo verde no enquadramento.</li>
        <li>Ajuste o brilho pelo histograma e pela prévia da câmera, sem usar um percentual universal.</li>
        <li>Ative o algoritmo de supressão de cor (Despill / Spill Suppressor) no seu software de edição.</li>
      </ol>

      <p><a class="cta" href="/?tool=green-screen">Ativar Tela Verde de Chroma Key no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'fundo-cor-fotos-produto',
    toolId: 'color',
    title: 'Fundo de Cor para Fotos de Produto com o Monitor | Guia Prático',
    h1: 'Fundo de Cor para Fotografia de Produto: Como Usar Telas Digitais',
    description: 'Use o monitor ou tablet como fundo luminoso aproximado para fotografar pequenos produtos e confira artefatos na própria câmera.',
    relatedSlugs: ['fotografia-produto-olx-mercado-livre', 'chroma-key-sem-tecido-tela-verde'],
    faq: [
      ['Como o monitor pode servir de fundo?', 'A superfície exibe cores ajustáveis para pequenos enquadramentos. Pixel grid, reflexos, moiré, brilho e fidelidade de cor precisam ser avaliados na foto final.'],
      ['Como evitar o efeito Moiré nas fotos tiradas contra a tela?', 'Abra o diafragma da lente da câmera (menor valor f/) para criar profundidade de campo rasa e desfocar a malha de pixels do monitor no fundo.'],
      ['Quais cores usar em e-commerce?', 'Consulte as regras atuais da categoria e do marketplace. Para fotos secundárias e catálogos, escolha uma cor que mantenha contraste com o produto e represente sua aparência com honestidade.']
    ],
    body: `
      <h2>A Técnica do Monitor como Fundo e Fonte de Luz Difusa</h2>
      <p>Para fotografar joias, peças eletrônicas, miniaturas, frascos de cosméticos e colecionáveis, montar um estúdio fotográfico com rolos de papel de fundo pode ser inviável em espaços compactos. A tela de um monitor de 24 a 32 polegadas posicionada horizontal ou verticalmente atua simultaneamente como um <strong>fundo de cor saturada pura</strong> e uma <strong>softbox de preenchimento</strong>.</p>

      <h2>Mitigação de Artefatos Ópticos: Moiré e Flicker</h2>
      <ul>
        <li><strong>Padrão de Moiré:</strong> Ocorre pela interferência geométrica entre a grade de pixels do sensor da câmera e a grade de pixels do monitor. Solução: utilize uma lente com abertura ampla (f/1.8 a f/2.8) para manter o foco restrito ao produto, deixando a malha de pixels do monitor suavemente desfocada.</li>
        <li><strong>Flicker / Faixas Pretas:</strong> Ajuste o obturador da câmera para velocidades que sejam frações inteiras da taxa de atualização do monitor (ex: 1/60s ou 1/120s para monitores de 60Hz/120Hz).</li>
      </ul>

      <p><a class="cta" href="/?tool=color">Abrir Estúdio de Cores Sólidas no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'fotografia-produto-olx-mercado-livre',
    toolId: 'color',
    title: 'Fotografia de Produto para OLX e Mercado Livre: Dicas de Iluminação',
    h1: 'Fotografia de Produto para Vendas Online: Técnicas de Iluminação e Fundo',
    description: 'Aprenda a fotografar produtos para venda em plataformas digitais com iluminação uniforme, fundo branco e clareza de detalhes.',
    relatedSlugs: ['fundo-cor-fotos-produto', 'iluminacao-videochamada-dicas'],
    faq: [
      ['Qual fundo usar na foto principal?', 'Consulte as regras atuais do marketplace e da categoria antes de publicar. Elas podem variar por plataforma, região e tipo de produto.'],
      ['Como fotografar telas de celulares ou notebooks usados para venda?', 'Evite flash direto para não criar pontos cegos de reflexo no vidro. Use uma iluminação difusa indireta e exiba imagens de teste claras no aparelho para comprovar a integridade do display.'],
      ['Como destacar o estado real de itens usados sem desvalorizá-los?', 'Utilize iluminação lateral suave para evidenciar que os conectores, dobradiças e superfícies estão limpos e sem oxidação, gerando transparência e confiança no comprador.']
    ],
    body: `
      <h2>A Fotografia como Fator Crítico de Conversão em E-Commerce</h2>
      <p>Fotos claras e honestas ajudam o comprador a avaliar estado, escala e acessórios. Use iluminação consistente e não esconda defeitos; desempenho do anúncio depende de muitos fatores além da imagem.</p>

      <h2>Checklist de Produção de Fotos de Alta Conversão</h2>
      <ol>
        <li><strong>Fundo compatível:</strong> confira a regra atual da plataforma e mantenha contraste suficiente com o objeto.</li>
        <li><strong>Luz Difusa Sem Flash Direto:</strong> O flash integrado de smartphones cria pontos de superexposição que estouram plásticos e metais. Utilize uma fonte de luz ampla posicionada a 45 graus.</li>
        <li><strong>Foco em detalhes:</strong> fotografe portas, quinas e acessórios. Guarde números de série em registro privado e oculte-os nas imagens públicas para reduzir risco de uso indevido.</li>
      </ol>

      <p><a class="cta" href="/?tool=color">Gerar Fundo Branco de Iluminação no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'cores-streaming-cenarios',
    toolId: 'color',
    title: 'Cores para Streaming: Cenários e Iluminação com Monitores',
    h1: 'Cores e Iluminação para Streaming: Como Compor Cenários Dinâmicos',
    description: 'Aprenda a teoria das cores para transmissões ao vivo na Twitch e YouTube: iluminação cênica de contorno, paletas complementares e atmosfera.',
    relatedSlugs: ['monitor-como-softbox-streamer', 'chroma-key-sem-tecido-tela-verde'],
    faq: [
      ['Como a iluminação de fundo influencia a imagem da webcam?', 'A iluminação cênica traseira cria separação de planos entre o streamer e o ambiente, evitando que a câmera confunda o sujeito com as sombras da sala.'],
      ['Quais combinações de cores posso comparar em transmissões?', 'Pares como ciano e laranja ou roxo e âmbar oferecem contraste cromático visível, mas o resultado depende da câmera, exposição, compressão, perfil e iluminação. Teste na imagem capturada.'],
      ['Posso usar um monitor secundário como luz cênica de fundo?', 'Sim. Um monitor secundário ou tablet exibindo uma cor sólida saturada em tela cheia projeta uma iluminação difusa ampla nas paredes ou no contorno dos ombros.']
    ],
    body: `
      <h2>Composição Visual e Identidade Cromática em Lives</h2>
      <p>A cinematografia em transmissões ao vivo na Twitch e YouTube baseia-se no princípio dos <strong>três pontos de luz</strong>: Luz Principal (Key Light), Luz de Preenchimento (Fill Light) e Luz de Contorno/Fundo (Rim/Back Light).</p>

      <h2>O Princípio da Separação de Planos</h2>
      <p>Quando a sala está uniformemente escura ou iluminada por uma única lâmpada de teto, o rosto do criador funde-se visualmente com a parede de fundo. Ao posicionar um monitor secundário nas costas ou nas laterais do setup exibindo cores saturadas (como azul cobalto, violeta ou âmbar), cria-se um feixe suave de luz de contorno (rim light) que delineia a silhueta do streamer, conferindo profundidade tridimensional à transmissão.</p>

      <p><a class="cta" href="/?tool=color">Configurar Cores de Cenário no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'iluminacao-videochamada-dicas',
    toolId: 'white',
    title: 'Iluminação para Videochamadas no Zoom, Meet e Teams | Guia Prático',
    h1: 'Como Melhorar a Iluminação para Videochamadas e Reuniões Online',
    description: 'Elimine sombras duras e imagem granulada na webcam: posicionamento em 45 graus, controle de temperatura de cor e uso do monitor como fonte de luz suave.',
    relatedSlugs: ['temperatura-de-cor-explicada', 'monitor-como-softbox-streamer'],
    faq: [
      ['Por que a imagem da webcam fica granulada em chamadas?', 'Sensores pequenos costumam elevar o ganho eletrônico em pouca luz, aumentando o ruído. Mais luz frontal pode reduzir esse ganho, mas lente, sensor, compressão e processamento também limitam a imagem.'],
      ['Por que não sentar de costas para uma janela ensolarada?', 'A contraluz intensa faz a exposição automática da câmera fechar o diafragma para não estourar a janela, deixando seu rosto em silhueta escura.'],
      ['Como usar o monitor como luz de apoio?', 'Abra uma tela clara diante do rosto e ajuste cor e intensidade observando a prévia. O controle é uma aproximação RGB e não mede a temperatura emitida.']
    ],
    body: `
      <h2>A Física da Iluminação Facial em Sensores Pequenos</h2>
      <p>A grande maioria das webcams integradas a notebooks utiliza sensores minúsculos (tipicamente de 1/4" ou 1/3") com fotodiodos de área reduzida. Em ambientes mal iluminados, o processador de sinal de imagem (ISP) da câmera amplifica agressivamente o ganho do sensor, resultando em ruído digital granulado e perda de definição facial.</p>

      <h2>Regras de Ouro para o Setup de Reuniões</h2>
      <ol>
        <li><strong>Orientação em Relação às Janelas:</strong> Evite uma janela brilhante diretamente atrás de você; posicionar-se de frente ou em ângulo costuma reduzir a contraluz.</li>
        <li><strong>Fonte de Luz Ampla e Próxima:</strong> Luzes pontuais pequenas (como lâmpadas sem cúpula) geram sombras duras sob as sobrancelhas e o queixo. Fontes de área ampla (como a tela de um monitor grande) suavizam as transições de sombra no rosto.</li>
        <li><strong>Cor de apoio:</strong> ajuste o tom na prévia e trave o balanço de branco quando a câmera permitir. O número exibido na ferramenta não é uma medição de CCT.</li>
      </ol>

      <p><a class="cta" href="/?tool=white">Ativar Luz de Apoio para Webcam no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'monitor-como-softbox-streamer',
    toolId: 'white',
    title: 'Monitor como Softbox para Streamers e Criadores de Conteúdo',
    h1: 'Monitor como Softbox: Iluminação Facial Suave sem Equipamentos Extras',
    description: 'Aprenda a transformar seu monitor ou tela secundária em uma fonte de luz difusa de grande área superficial (Softbox) para transmissões e gravações.',
    relatedSlugs: ['iluminacao-videochamada-dicas', 'cores-streaming-cenarios'],
    faq: [
      ['O que é o efeito Softbox na iluminação?', 'É a dispersão da luz através de uma superfície ampla, gerando uma transição suave entre áreas claras e sombras no rosto do sujeito fotografado ou filmado.'],
      ['Usar o monitor com tela branca contínua pode estragar a tela?', 'Campos claros elevam consumo e aquecimento em alguns displays. LCDs não apresentam burn-in orgânico como OLEDs, mas sessões longas em brilho máximo não são necessárias; siga as orientações do fabricante.'],
      ['Como posicionar o monitor para obter a melhor luz de preenchimento?', 'Posicione o monitor ligeiramente acima da linha dos olhos em um ângulo de cerca de 30 a 45 graus para simular iluminação natural de claraboia.']
    ],
    body: `
      <h2>Tamanho aparente da fonte luminosa</h2>
      <p>Em iluminação fotográfica, a suavidade da luz é inversamente proporcional à dureza das sombras: quanto maior for o tamanho relativo da fonte de luz em comparação com o sujeito, mais suaves serão as sombras projetadas. É por isso que fotógrafos utilizam sombrinhas e caixas difusoras (softboxes) de grandes dimensões.</p>

      <h2>O Monitor como Painel Difusor de Alta Eficiência</h2>
      <p>Uma tela próxima pode funcionar como luz de preenchimento ampla. Potência, espectro, uniformidade, reflexos e posição variam por painel, então compare o resultado na própria câmera; uma luminária dedicada oferece controle mais previsível.</p>

      <p><a class="cta" href="/?tool=white">Abrir Luz Suave de Estúdio no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'temperatura-de-cor-explicada',
    toolId: 'white',
    title: 'Temperatura de Cor: O que é a Escala Kelvin e Como Ajustar',
    h1: 'Temperatura de Cor Explicada: Escala Kelvin, Luz Quente e Luz Fria',
    description: 'Entenda o conceito físico de temperatura de cor (CCT em Kelvin), o padrão D65 (6500K) e como harmonizar a luz do monitor com o ambiente.',
    relatedSlugs: ['iluminacao-videochamada-dicas', 'calibrar-monitor-fotografia-design'],
    faq: [
      ['O que é temperatura de cor correlacionada?', 'É uma forma de descrever a cromaticidade aparente de uma fonte por comparação com o locus de um radiador ideal. Fontes diferentes podem compartilhar CCT e ter espectros distintos.'],
      ['O que é D65?', 'É um iluminante padrão usado em vários fluxos de cor. Alvo, luminância e ambiente devem seguir o padrão específico do trabalho.'],
      ['O controle do MonitorSmith mede Kelvin?', 'Não. Ele converte uma faixa nominal em cores RGB. A CCT real da luz emitida depende do painel, perfil, brilho e instrumento de medição.']
    ],
    body: `
      <h2>A Física da Radiação do Corpo Negro e a Escala Kelvin</h2>
      <p>A <strong>Temperatura de Cor Correlacionada (Correlated Color Temperature - CCT)</strong> é expressa na escala absoluta Kelvin (K). Baseia-se na cor da luz emitida por um corpo negro teórico conforme ele é progressivamente aquecido:</p>
      <ul>
        <li><strong>Faixa baixa:</strong> costuma ser descrita visualmente como mais quente ou amarelada.</li>
        <li><strong>Faixa intermediária:</strong> costuma produzir uma aparência mais neutra, dependendo da adaptação e do ambiente.</li>
        <li><strong>Faixa alta:</strong> costuma parecer mais fria ou azulada. Um alvo de referência deve vir do fluxo de trabalho, não desta ferramenta.</li>
      </ul>

      <h2>Ajuste Dinâmico no Setup de Trabalho</h2>
      <p>Use o controle para comparar aparências na câmera ou no ambiente. Ele não calibra a luz, não trata fadiga visual e não fornece orientação de sono; para trabalho de cor, meça a fonte e siga o padrão do projeto.</p>

      <p><a class="cta" href="/?tool=white">Ajustar Temperatura de Cor no MonitorSmith →</a></p>
    `
  }
];
