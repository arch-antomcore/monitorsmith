export default [
  {
    slug: 'tecnica-pomodoro-guia',
    toolId: 'focus-timer',
    title: 'Técnica Pomodoro: Guia Prático para Produtividade e Foco',
    h1: 'Técnica Pomodoro: Como Estruturar Ciclos de Foco e Descanso',
    description: 'Aprenda a aplicar a metodologia Pomodoro no trabalho digital: blocos de tempo ultradianos de 25 e 50 minutos, redução da fadiga mental e gestão de pausas.',
    relatedSlugs: ['ruido-marrom-branco-rosa-foco', 'foco-trabalho-remoto'],
    faq: [
      ['O que é a Técnica Pomodoro?', 'É um método de gestão de tempo criado por Francesco Cirillo que divide o trabalho em blocos focados (geralmente de 25 ou 50 minutos), intercalados por pausas curtas de recuperação cognitiva.'],
      ['Por que os ciclos tradicionais duram 25 minutos?', 'O intervalo de 25 minutos é calibrado para sustentar o estado de atenção máxima do córtex pré-frontal sem ultrapassar o limiar de saturação mental.'],
      ['É possível usar intervalos mais longos (ex: 50/10)?', 'Sim. Para tarefas que exigem estado de fluxo profundo (como desenvolvimento de software e redação complexa), ciclos de 50 minutos com pausas de 10 minutos são altamente eficazes.']
    ],
    body: `
      <h2>Fundamentos Neuropsicológicos da Gestão por Intervalos</h2>
      <p>A <strong>Técnica Pomodoro</strong> fundamenta-se nos princípios da cronobiologia e na dinâmica dos ciclos ultradianos de atenção humana. O cérebro humano não foi biologicamente desenhado para sustentar foco contínuo e ininterrupto por horas a fio: o esforço de concentração do córtex pré-frontal consome glicose e neurotransmissores em ritmo acelerado.</p>

      <p>Ao fragmentar a jornada de trabalho em blocos deliberados de execução mono-tarefa seguidos por descompressões regulares, o profissional evita o acúmulo de fadiga neural e reduz drasticamente a procrastinação reativa.</p>

      <h2>Estrutura Clássica do Protocolo Pomodoro</h2>
      <ol>
        <li><strong>Seleção de Tarefa Única:</strong> Defina previamente um objetivo claro e mensurável antes de disparar o cronômetro.</li>
        <li><strong>Bloco de Foco (25 ou 50 minutos):</strong> Execute a atividade sem interrupções externas, com notificações e abas secundárias silenciadas.</li>
        <li><strong>Pausa Curta (5 ou 10 minutos):</strong> Afaste-se da tela do computador, hidrate-se e descanse a musculatura ocular focando em objetos distantes.</li>
        <li><strong>Pausa Longa (15 a 30 minutos):</strong> A cada 4 ciclos completos, execute uma pausa estendida para recuperação cognitiva profunda.</li>
      </ol>

      <p><a class="cta" href="/?tool=focus-timer">Iniciar Timer Pomodoro no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'ruido-marrom-branco-rosa-foco',
    toolId: 'focus-timer',
    title: 'Ruído Marrom vs Branco vs Rosa para Foco e Estudo | Física Acústica',
    h1: 'Ruído Marrom, Branco e Rosa: Densidade Espectral e Mascaramento Sonoro',
    description: 'Entenda as diferenças espectrais entre ruído branco, rosa e marrom (Brownian noise) e como o mascaramento acústico melhora a concentração no home office.',
    relatedSlugs: ['tecnica-pomodoro-guia', 'foco-trabalho-remoto'],
    faq: [
      ['Qual a diferença física entre ruído branco, rosa e marrom?', 'O ruído branco possui densidade espectral constante (todas as frequências com a mesma energia). O ruído rosa decai 3 dB por oitava. O ruído marrom decai 6 dB por oitava (1/f^2), concentrando sua energia nas frequências graves.'],
      ['Qual o melhor ruído para estudo e concentração prolongada?', 'O ruído marrom é o mais indicado para longas sessões de estudo, pois sua curva com ênfase em graves suaves mascara conversas e ruídos intermitentes sem causar estridência ou fadiga auditiva.'],
      ['Como funciona o mascaramento auditivo?', 'O som contínuo eleva o piso de ruído do ambiente, reduzindo o contraste sonoro entre o silêncio e barulhos repentinos da casa ou da rua.']
    ],
    body: `
      <h2>A Física do Espectro Acústico: Cores do Ruído</h2>
      <p>Na acústica e na teoria dos sinais, a "cor" de um sinal sonoro descreve como sua <strong>Densidade Espectral de Potência (Power Spectral Density - PSD)</strong> se distribui ao longo do espectro de frequências audíveis pelo ouvido humano (20 Hz a 20.000 Hz):</p>

      <ul>
        <li><strong>Ruído Branco (1/f^0):</strong> Potência homogênea em todas as frequências. Soa como estática de rádio analógico, sendo altamente eficaz para mascarar sons agudos pontuais, mas potencialmente cansativo em uso prolongado.</li>
        <li><strong>Ruído Rosa (1/f^1):</strong> A energia decai 3 dB por oitava, proporcionando energia constante por banda relativa de oitava. Soa similar à chuva constante ou vento suave em copas de árvores.</li>
        <li><strong>Ruído Marrom / Browniano (1/f^2):</strong> A densidade decai 6 dB por oitava à medida que a frequência se eleva. Apresenta sonoridade profunda e aveludada, semelhante ao rugido distante de uma cachoeira ou ondas do mar, sendo ideal para estudo, trabalho analítico e leitura.</li>
      </ul>

      <h2>Aplicações no Mascaramento Sonoro em Home Office</h2>
      <p>Em ambientes de trabalho compartilhados ou residenciais, conversas em segundo plano e ruídos de tráfego ativam o reflexo de orientação involuntário do cérebro. O ruído marrom gerado diretamente no navegador atua como um escudo psicoacústico contínuo, estabilizando o ambiente sonoro sem a necessidade de streaming externo pesado.</p>

      <p><a class="cta" href="/?tool=focus-timer">Ouvir Ruído Marrom no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'foco-trabalho-remoto',
    toolId: 'focus-timer',
    title: 'Foco no Trabalho Remoto: Ergonomia, Rotina e Gestão de Atenção',
    h1: 'Como Manter o Foco no Trabalho Remoto: Guia de Ergonomia e Rotinas',
    description: 'Estratégias comprovadas para gerenciar a atenção no home office: separação de ambientes, ergonomia de tela, minimização de alternância de contexto e blocos de trabalho.',
    relatedSlugs: ['tecnica-pomodoro-guia', 'setup-dois-monitores-dicas'],
    faq: [
      ['Como mitigar distrações no home office?', 'Delimite um espaço físico exclusivo para a atividade profissional, estabeleça rituais fixos de início e término de expediente e utilize a técnica de bloqueio de tempo (time blocking).'],
      ['O que é o custo de alternância de contexto (context switching)?', 'É a perda temporária de eficiência cognitiva que ocorre quando o cérebro precisa desviar a atenção entre tarefas diferentes (ex: responder mensagens instantâneas enquanto programa).'],
      ['Qual a altura correta do monitor na mesa de trabalho?', 'O terço superior da tela deve estar alinhado à altura horizontal dos olhos, a uma distância aproximada de um braço estendido (60 a 75 cm).']
    ],
    body: `
      <h2>A Neurociência da Atenção no Ambiente Doméstico</h2>
      <p>O trabalho remoto oferece flexibilidade, mas expõe o profissional a armadilhas de fragmentação da atenção. Quando o mesmo ambiente físico é utilizado para trabalho, lazer e descanso, o cérebro perde os marcadores contextuais que auxiliam na transição para o estado de trabalho focado (Deep Work).</p>

      <h2>Diretrizes para Preservação do Foco</h2>
      <ul>
        <li><strong>Higiene Visual da Área de Trabalho:</strong> Mantenha a mesa física limpa e organize a disposição das janelas digitais para que notificações de mensageiros não fiquem visíveis no campo periférico.</li>
        <li><strong>Blocos de Foco Assíncronos:</strong> Reserve janelas de 60 a 90 minutos para execução ininterrupta de projetos prioritários, concentrando a checagem de e-mails em horários pré-determinados.</li>
        <li><strong>Instrumentação Passiva de Tempo:</strong> Manter um cronômetro ou relógio de contagem regressiva em uma tela secundária reforça o senso de compromisso temporal com a tarefa em andamento.</li>
      </ul>

      <p><a class="cta" href="/?tool=focus-timer">Configurar Bloco de Foco no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'relogio-digital-monitor-secundario',
    toolId: 'clock',
    title: 'Relógio Digital para Monitor Secundário: Dashboard e Produtividade',
    h1: 'Como Usar um Relógio Digital em Tela Cheia no Monitor Secundário',
    description: 'Transforme telas secundárias ociosas em painéis informativos elegantes com relógio digital e analógico de alta precisão.',
    relatedSlugs: ['setup-dois-monitores-dicas', 'guia-completo-monitorsmith'],
    faq: [
      ['Quais os benefícios de um relógio na tela secundária?', 'Permite monitorar a passagem do tempo de forma passiva na visão periférica, eliminando a necessidade de pegar o smartphone e se expor a distrações.'],
      ['Exibir um relógio contínuo pode danificar o monitor?', 'Em painéis LCD (IPS, VA), não há risco. Em monitores OLED, recomenda-se utilizar níveis de brilho moderados e temas escuros para preservar os diodos orgânicos.'],
      ['O relógio funciona sem conexão à internet?', 'Sim. Após ser carregado na memória do navegador pelo Progressive Web App (PWA), o relógio utiliza o relógio de tempo real (RTC) do sistema operacional local.']
    ],
    body: `
      <h2>Otimização de Espaço em Múltiplos Monitores</h2>
      <p>Em estações de trabalho com dois ou três monitores, é frequente que uma das telas permaneça subutilizada em determinados períodos do dia. Em vez de mantê-la como um repositório desorganizado de abas inativas, convertê-la em um <strong>dashboard temporal minimalista</strong> agrega valor estético e funcional ao setup.</p>

      <h2>Precisão e Baixo Impacto no Sistema</h2>
      <p>O relógio em tela cheia do MonitorSmith opera com sincronização ao ciclo de VSync do monitor através da High Resolution Time API (performance.now()), garantindo movimento analógico contínuo e atualização digital imediata sem onerar o processador ou a placa de vídeo.</p>

      <p><a class="cta" href="/?tool=clock">Abrir Relógio em Tela Cheia no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'setup-dois-monitores-dicas',
    toolId: 'clock',
    title: 'Setup com Dois Monitores: Ergonomia, Resoluções e Produtividade',
    h1: 'Setup com Dois Monitores: Como Configurar para Máximo Rendimento',
    description: 'Guia de alinhamento ergonômico, orientação horizontal vs vertical, equalização de densidade de pixels (PPI) e fluxos de trabalho dual-monitor.',
    relatedSlugs: ['relogio-digital-monitor-secundario', 'foco-trabalho-remoto'],
    faq: [
      ['Qual a melhor configuração: dois monitores horizontais ou um vertical?', 'A configuração com monitor vertical (modo retrato) é ideal para programadores, redatores e advogados, pois permite visualizar dezenas de linhas de texto e código sem rolagem contínua.'],
      ['Como equalizar a escala entre monitores de resoluções diferentes?', 'Ajuste os fatores de escala DPI do sistema operacional (ex: 100% no monitor 1080p e 125% no monitor 1440p) para que janelas não sofram variações bruscas de tamanho ao transitar entre telas.'],
      ['Dois monitores reduzem a autonomia de notebooks?', 'Sim. A placa de vídeo precisa alimentar dois controladores de saída de vídeo e renderizar o dobro de pixels, elevando o consumo energético em cerca de 15% a 25%.']
    ],
    body: `
      <h2>Arquitetura Ergonômica de Estações de Trabalho com Telas Múltiplas</h2>
      <p>A expansão da área de exibição através de múltiplos displays é comprovadamente um dos aprimoramentos mais eficientes para produtividade multitarefa. No entanto, a montagem incorreta pode gerar tensões musculares cervicais caso o usuário passe longos períodos com a cabeça virada em ângulos acentuados.</p>

      <h2>Diretrizes de Posicionamento Físico</h2>
      <ul>
        <li><strong>Setup com Monitor Primário Central:</strong> Se você gasta 80% do tempo em uma tela, posicione-a perfeitamente centralizada à sua frente e coloque a tela secundária na lateral (com ângulo de cerca de 25° a 30° voltada para dentro).</li>
        <li><strong>Setup 50/50 Dividido:</strong> Se você divide a atenção igualmente entre as duas telas, alinhe o ponto de junção das molduras com o centro do seu nariz.</li>
      </ul>

      <p><a class="cta" href="/?tool=clock">Utilizar Ferramentas de Suporte no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'como-usar-teleprompter-videos',
    toolId: 'online-teleprompter',
    title: 'Como Usar Teleprompter para Gravar Vídeos Profissionais | Guia Óptico',
    h1: 'Teleprompter para Gravação de Vídeos: Configuração Óptica e Técnicas',
    description: 'Aprenda a configurar teleprompters com espelho divisor de feixe (beamsplitter), cadência de fala em WPM e redução do movimento sacádico dos olhos.',
    relatedSlugs: ['guia-completo-monitorsmith', 'sinalizacao-digital-eventos'],
    faq: [
      ['O que é o vidro Beamsplitter no teleprompter?', 'É um vidro óptico semiespelhado (comumente 70/30 ou 60/40) que transmite a luz da cena para a lente da câmera enquanto reflete o texto exibido na tela para os olhos do apresentador.'],
      ['Por que o texto precisa ser espelhado horizontalmente?', 'A reflexão óptica no vidro inverte a orientação das letras. A ferramenta de teleprompter deve aplicar inversão horizontal (Mirror Mode) para que o apresentador leia o texto na orientação correta.'],
      ['Como evitar que os olhos pareçam estar lendo durante a gravação?', 'Reduza a largura da coluna de texto na tela para que o ângulo de deslocamento visual horizontal seja inferior a 10 graus em relação ao eixo central da lente.']
    ],
    body: `
      <h2>A Óptica dos Sistemas de Teleprompter</h2>
      <p>Equipamentos de teleprompter profissionais utilizam um vidro dielétrico semirrefletivo com tecnologia <strong>Beamsplitter 70/30</strong> (70% de transmissão de luz para o sensor da câmera e 30% de reflexão de volta para o orador). Essa geometria óptica permite que o apresentador mantenha contato visual direto com o público através da lente sem desviar o olhar para anotações.</p>

      <h2>Técnicas para uma Apresentação Fluida e Natural</h2>
      <ol>
        <li><strong>Coluna de Leitura Estreita:</strong> Mantenha a largura do texto contida em uma faixa central estreita para minimizar o movimento horizontal das pupilas (movimentos sacádicos).</li>
        <li><strong>Controle de Cadência de Fala:</strong> Configure a velocidade de rolagem para coincidir com sua velocidade natural de fala (geralmente entre 120 e 150 palavras por minuto).</li>
        <li><strong>Margem de Antecipação:</strong> Leia o texto fixando os olhos na linha superior ou no terço superior do display, garantindo tempo hábil para modular a entonação da voz com naturalidade.</li>
      </ol>

      <p><a class="cta" href="/?tool=online-teleprompter">Abrir Teleprompter Espelhado no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'sinalizacao-digital-eventos',
    toolId: 'fullscreen-message',
    title: 'Sinalização Digital para Eventos e Empresas | Guia de Implementação',
    h1: 'Sinalização Digital: Como Exibir Mensagens em Telas de Eventos e Recepções',
    description: 'Aprenda a transformar qualquer monitor ou televisor em um display de sinalização digital dinâmico e de alto contraste diretamente pelo navegador.',
    relatedSlugs: ['qr-code-tela-cheia-eventos', 'logos-patrocinadores-eventos'],
    faq: [
      ['O que é Digital Signage no contexto corporativo?', 'É a utilização de displays eletrônicos (telas, TVs, totens) para transmitir avisos informativos, status de salas de reunião, boas-vindas e cronogramas de eventos.'],
      ['É necessário adquirir licenças pesadas de software para sinalização básica?', 'Não. Aplicações web modernas em modo tela cheia executadas em navegadores atendem perfeitamente à exibição de status, recados e avisos institucionais com custo zero de infraestrutura.'],
      ['Como garantir legibilidade de avisos à distância?', 'Utilize fontes sem serifa com alto contraste (razão mínima de 7:1 conforme WCAG AAA) e tamanho proporcional à distância média do público na sala.']
    ],
    body: `
      <h2>Comunicação Visual Dinâmica em Espaços Físicos</h2>
      <p>A sinalização digital substitui banners e cartazes impressos por painéis luminosos facilmente atualizáveis em tempo real. Em conferências corporativas, clínicas, salas de reunião e eventos de tecnologia, a flexibilidade de atualizar mensagens instantaneamente reduz custos gráficos e otimiza o direcionamento de pessoas.</p>

      <h2>Regras de Tipografia e Contraste para Grandes Distâncias</h2>
      <p>A legibilidade de letreiros digitais apoia-se no cálculo da acuidade visual de Snellen: para leitura confortável a 5 metros de distância, as letras devem possuir altura mínima de 25 a 35 mm na tela, com cores que ofereçam alto contraste em relação ao fundo (como branco sobre preto ou amarelo sobre cinza escuro).</p>

      <p><a class="cta" href="/?tool=fullscreen-message">Criar Mensagem em Tela Cheia no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'qr-code-tela-cheia-eventos',
    toolId: 'fullscreen-message',
    title: 'QR Code em Tela Cheia para Eventos e Palestras | Guia de Engajamento',
    h1: 'Como Usar QR Code em Tela Cheia para Apresentações e Aulas',
    description: 'Aprenda a projetar códigos QR de alta resolução para compartilhamento instantâneo de links, slides e formulários com o público em auditórios.',
    relatedSlugs: ['sinalizacao-digital-eventos', 'vitrine-digital-lojas-estandes'],
    faq: [
      ['Por que projetar QR Codes em tela cheia durante apresentações?', 'Elimina o atrito de digitação manual de links longos, permitindo que dezenas de participantes acessem materiais e formulários simultaneamente com a câmera do celular.'],
      ['O que é a correção de erro Reed-Solomon em QR Codes?', 'É um algoritmo matemático de redundância que permite que a câmera leia o código perfeitamente mesmo se parte dele estiver obstruída por reflexos ou ângulos oblíquos.'],
      ['Qual o tamanho ideal do QR Code na projeção?', 'O código deve ocupar pelo menos 50% da altura total da tela e manter fundo branco puro para garantir que sensores de smartphones foquem à distância.']
    ],
    body: `
      <h2>A Conexão Imediata Entre o Palco e o Público</h2>
      <p>A inserção de códigos QR no encerramento de palestras e aulas é o método mais eficiente para converter a atenção presencial em engajamento digital imediato (downloads de apresentações, coleta de feedbacks e inscrições).</p>

      <h2>Recomendações Técnicas para Projeção</h2>
      <ul>
        <li><strong>Contraste Puro:</strong> Mantenha o QR Code em preto sobre fundo branco absoluto (#FFFFFF), evitando transparências ou imagens de fundo que reduzam a margem de contraste dos módulos.</li>
        <li><strong>Nível de Correção de Erro:</strong> Utilize níveis de redundância M ou Q para tolerar pequenas distorções ópticas causadas por lentes de projetores ou reflexos em vidros.</li>
        <li><strong>URL de Contingência:</strong> Exiba sempre uma versão curta de texto da URL logo abaixo do código para atender usuários com câmeras avariadas.</li>
      </ul>

      <p><a class="cta" href="/?tool=fullscreen-message">Gerar QR Code em Tela Cheia no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'logos-patrocinadores-eventos',
    toolId: 'sponsor-loop',
    title: 'Como Exibir Logos de Patrocinadores em Eventos e Lives | Loop Rotativo',
    h1: 'Logos de Patrocinadores: Carrosséis e Loops Digitais para Eventos',
    description: 'Aprenda a valorizar parceiros e patrocinadores com loops automatizados em tela cheia, rotação temporal suave e integração com OBS Studio.',
    relatedSlugs: ['sinalizacao-digital-eventos', 'vitrine-digital-lojas-estandes'],
    faq: [
      ['Qual o tempo ideal de exibição por patrocinador em um loop?', 'Entre 5 e 10 segundos por marca. Intervalos muito curtos prejudicam o reconhecimento visual; intervalos muito longos reduzem a dinâmica da tela.'],
      ['Como integrar o carrossel de logos em transmissões do OBS Studio?', 'Abra a ferramenta no navegador e adicione a janela como uma fonte de captura de janela ou navegador no OBS, aplicando recortes de chroma se necessário.'],
      ['Como prevenir retenção de imagem em monitores de estande?', 'Ative recursos de transição e leve deslocamento de pixels (pixel shift) para evitar a fixação prolongada de elementos de alta luminosidade nas mesmas coordenadas da tela.']
    ],
    body: `
      <h2>A Economia da Exposição Visual de Marcas</h2>
      <p>Em transmissões ao vivo, palcos de eventos e estandes de feiras, o retorno sobre investimento (ROI) de apoiadores depende da clareza e do destaque concedido à sua identidade visual. A exibição sequencial em tela cheia garante visibilidade exclusiva e proporcional para cada cota de patrocínio.</p>

      <h2>Otimização de Renderização por Hardware</h2>
      <p>A ferramenta Loop de Marcas do MonitorSmith utiliza aceleração gráfica por GPU através de transformações CSS 3D (transform: translate3d), garantindo transições de opacidade e movimento com taxa de quadros estável (60/120 FPS) sem sobrecarregar o processador durante transmissões ao vivo.</p>

      <p><a class="cta" href="/?tool=sponsor-loop">Criar Loop de Patrocinadores no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'vitrine-digital-lojas-estandes',
    toolId: 'sponsor-loop',
    title: 'Vitrine Digital para Lojas e Estandes: Digital Signage Acessível',
    h1: 'Vitrine Digital: Como Usar Monitores e Telas no Ponto de Venda (PDV)',
    description: 'Transforme televisores e monitores em displays comerciais dinâmicos para exibição de ofertas, cardápios e promoções no comércio físico.',
    relatedSlugs: ['logos-patrocinadores-eventos', 'sinalizacao-digital-eventos'],
    faq: [
      ['Quais as vantagens de vitrines digitais em relação a cartazes impressos?', 'Displays luminosos em movimento atraem a atenção periférica de pedestres com muito mais eficácia e permitem atualizar ofertas em tempo real sem custos gráficos.'],
      ['É possível usar monitores e TVs comuns para sinalização comercial?', 'Sim. Para ambientes internos cobertos (shoppings, galerias, estandes), telas convencionais conectadas a um navegador web oferecem excelente resultado com baixo custo.'],
      ['Como evitar que o sistema operacional exiba barras e notificações na vitrine?', 'Ative o modo tela cheia do navegador (F11) e desative as notificações de segundo plano do sistema operacional.']
    ],
    body: `
      <h2>Dinamismo Visual no Ponto de Venda</h2>
      <p>O comércio físico compete continuamente pela atenção visual de consumidores expostos a múltiplos estímulos. A substituição de pôsteres estáticos por telas digitais dinâmicas confere aspecto moderno ao ponto de venda e permite a rotação estratégica de ofertas conforme o horário do dia.</p>

      <h2>Operação Leve Diretamente no Navegador</h2>
      <p>A suíte do MonitorSmith permite carregar e ordenar artes promocionais e ofertas diretamente no navegador local, sem necessidade de servidores proprietários ou licenças de digital signage complexas.</p>

      <p><a class="cta" href="/?tool=sponsor-loop">Configurar Vitrine Digital no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'guia-completo-monitorsmith',
    toolId: 'dead-pixel',
    title: 'MonitorSmith: Guia Completo com as 11 Ferramentas para Monitores',
    h1: 'MonitorSmith: Guia Geral da Suíte de Utilitários e Testes de Display',
    description: 'Conheça todas as 11 ferramentas web do MonitorSmith: inspeção de pixels, verificação de gama, iluminação suave, teleprompter, pomodoro e muito mais.',
    relatedSlugs: ['tecnica-pomodoro-guia', 'relogio-digital-monitor-secundario', 'setup-dois-monitores-dicas'],
    faq: [
      ['O que é a suíte MonitorSmith?', 'É um conjunto de utilitários web leves desenvolvidos pela EXVORN.TECH para testes visuais de telas, iluminação de apoio e produtividade.'],
      ['As ferramentas funcionam offline?', 'Sim. O MonitorSmith é configurado como Progressive Web App (PWA), mantendo os recursos em cache local no navegador para execução offline.'],
      ['Os dados e imagens importados são enviados para algum servidor?', 'Não. Todo o processamento (temporizadores, geradores sonoros, imagens e textos) opera 100% no cliente (browser-side) sem telemetria ou armazenamento em servidores.']
    ],
    body: `
      <h2>Um Canivete Suíço de Ferramentas Visuais no Navegador</h2>
      <p>O <strong>MonitorSmith</strong> foi concebido para reunir utilitários essenciais de inspeção visual, calibração preliminar, iluminação de suporte e organização temporal em uma interface coesa, limpa e livre de distrações.</p>

      <h2>Categorias Principais da Suíte</h2>
      <ul>
        <li><strong>Inspeção e Cuidado de Displays:</strong> Tela Preta OLED, Teste de Dead Pixels, Modo de Limpeza de Painel e Laboratório de Verificação Visual de Contraste e Gama.</li>
        <li><strong>Cor e Iluminação de Suporte:</strong> Luz Suave para Videochamadas (White Light), Tela Verde para Chroma Key e Estúdio de Cores Sólidas.</li>
        <li><strong>Tempo e Presença:</strong> Timer de Foco com Ruído Marrom, Relógio em Tela Cheia, Sinalização de Mensagens, Teleprompter Espelhado e Loop de Marcas.</li>
      </ul>

      <p><a class="cta" href="/">Explorar Todas as Ferramentas no MonitorSmith →</a></p>
    `
  }
];
