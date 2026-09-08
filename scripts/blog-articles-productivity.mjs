export default [
  {
    slug: 'tecnica-pomodoro-guia',
    toolId: 'focus-timer',
    title: 'Técnica Pomodoro: Guia Prático para Produtividade e Foco',
    h1: 'Técnica Pomodoro: Como Estruturar Ciclos de Foco e Descanso',
    description: 'Aprenda a usar blocos de 25 ou 50 minutos como estrutura de organização, testar durações diferentes e planejar pausas.',
    relatedSlugs: ['ruido-marrom-branco-rosa-foco', 'foco-trabalho-remoto'],
    faq: [
      ['O que é a Técnica Pomodoro?', 'É um método de gestão de tempo criado por Francesco Cirillo que alterna blocos de trabalho focado com pausas curtas. Vinte e cinco minutos é uma convenção popular, não uma duração universal.'],
      ['Por que o ciclo tradicional usa 25 minutos?', 'É a convenção popular do método, não um limite biológico calibrado. Ajuste a duração à tarefa e à sua capacidade de manter uma rotina.'],
      ['É possível usar intervalos mais longos?', 'Sim. Compare ciclos como 25/5 e 50/10 e adote o que ajuda sem causar desconforto. A ferramenta não previne fadiga ou burnout.']
    ],
    body: `
      <h2>Gestão por intervalos</h2>
      <p>A <strong>Técnica Pomodoro</strong> oferece uma convenção simples: escolher uma tarefa, trabalhar por um período e fazer uma pausa. A utilidade depende da pessoa, da atividade e do ambiente.</p>

      <p>Dividir o trabalho pode facilitar o início e tornar as pausas visíveis. Não há garantia de produtividade, recuperação cognitiva ou redução de procrastinação.</p>

      <h2>Estrutura Clássica do Protocolo Pomodoro</h2>
      <ol>
        <li><strong>Seleção de Tarefa Única:</strong> Defina previamente um objetivo claro e mensurável antes de disparar o cronômetro.</li>
        <li><strong>Bloco de Foco (25 ou 50 minutos):</strong> Execute a atividade sem interrupções externas, com notificações e abas secundárias silenciadas.</li>
        <li><strong>Pausa Curta:</strong> interrompa a tarefa e faça uma atividade confortável fora da tela se isso ajudar.</li>
        <li><strong>Pausa Longa:</strong> após alguns ciclos, faça um intervalo maior conforme sua rotina e necessidades.</li>
      </ol>

      <p><a class="cta" href="/?tool=focus-timer">Iniciar Timer Pomodoro no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'ruido-marrom-branco-rosa-foco',
    toolId: 'focus-timer',
    title: 'Ruído Marrom vs Branco vs Rosa para Foco e Estudo | Física Acústica',
    h1: 'Ruído Marrom, Branco e Rosa: Densidade Espectral e Mascaramento Sonoro',
    description: 'Entenda as diferenças gerais entre ruído branco, rosa e marrom e compare se algum deles ajuda a mascarar sons no seu ambiente.',
    relatedSlugs: ['tecnica-pomodoro-guia', 'foco-trabalho-remoto'],
    faq: [
      ['Qual a diferença física entre ruído branco, rosa e marrom?', 'O ruído branco possui densidade espectral constante (todas as frequências com a mesma energia). O ruído rosa decai 3 dB por oitava. O ruído marrom decai 6 dB por oitava (1/f^2), concentrando sua energia nas frequências graves.'],
      ['Qual o melhor ruído para estudo?', 'Não existe um melhor para todos. Compare em volume baixo; algumas pessoas preferem ruído marrom, rosa, branco ou silêncio. Interrompa se houver desconforto.'],
      ['Como funciona o mascaramento auditivo?', 'O som contínuo eleva o piso de ruído do ambiente, reduzindo o contraste sonoro entre o silêncio e barulhos repentinos da casa ou da rua.']
    ],
    body: `
      <h2>A Física do Espectro Acústico: Cores do Ruído</h2>
      <p>Na acústica e na teoria dos sinais, a "cor" de um sinal sonoro descreve como sua <strong>Densidade Espectral de Potência (Power Spectral Density - PSD)</strong> se distribui ao longo do espectro de frequências audíveis pelo ouvido humano (20 Hz a 20.000 Hz):</p>

      <ul>
        <li><strong>Ruído Branco:</strong> distribui energia de modo mais uniforme por frequência e costuma soar como estática.</li>
        <li><strong>Ruído Rosa (1/f^1):</strong> A energia decai 3 dB por oitava, proporcionando energia constante por banda relativa de oitava. Soa similar à chuva constante ou vento suave em copas de árvores.</li>
        <li><strong>Ruído Marrom / Browniano:</strong> concentra mais energia relativa nas frequências baixas e costuma soar mais grave.</li>
      </ul>

      <h2>Aplicações no Mascaramento Sonoro em Home Office</h2>
      <p>Um som contínuo pode reduzir o contraste percebido de ruídos intermitentes para algumas pessoas. O resultado varia e não substitui controle acústico; use volume baixo para proteger a audição.</p>

      <p><a class="cta" href="/?tool=focus-timer">Ouvir Ruído Marrom no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'foco-trabalho-remoto',
    toolId: 'focus-timer',
    title: 'Foco no Trabalho Remoto: Ergonomia, Rotina e Gestão de Atenção',
    h1: 'Como Manter o Foco no Trabalho Remoto: Guia de Ergonomia e Rotinas',
    description: 'Estratégias práticas para organizar o home office: ambiente, posição de tela, redução de interrupções e blocos de trabalho.',
    relatedSlugs: ['tecnica-pomodoro-guia', 'setup-dois-monitores-dicas'],
    faq: [
      ['Como mitigar distrações no home office?', 'Delimite um espaço físico exclusivo para a atividade profissional, estabeleça rituais fixos de início e término de expediente e utilize a técnica de bloqueio de tempo (time blocking).'],
      ['O que é o custo de alternância de contexto (context switching)?', 'É a perda temporária de eficiência cognitiva que ocorre quando o cérebro precisa desviar a atenção entre tarefas diferentes (ex: responder mensagens instantâneas enquanto programa).'],
      ['Qual altura e distância usar?', 'Ajuste para manter postura confortável e texto legível sem inclinar o pescoço. Tamanho, lentes, visão e tarefa mudam a posição adequada; orientação profissional pode ser necessária.']
    ],
    body: `
      <h2>Atenção no ambiente doméstico</h2>
      <p>O trabalho remoto mistura mensagens, tarefas pessoais e profissionais no mesmo espaço. Rotinas visíveis e menos interrupções podem ajudar algumas pessoas a iniciar e encerrar blocos de trabalho.</p>

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
    description: 'Use uma tela secundária como referência visual de horário com relógio digital e analógico baseado no relógio do dispositivo.',
    relatedSlugs: ['setup-dois-monitores-dicas', 'guia-completo-monitorsmith'],
    faq: [
      ['Quais os benefícios de um relógio na tela secundária?', 'Mantém uma referência de horário visível sem precisar alternar de aplicativo ou consultar outro dispositivo.'],
      ['Exibir um relógio contínuo pode afetar o monitor?', 'Conteúdo estático prolongado pode contribuir para retenção ou desgaste desigual em alguns painéis. Use brilho moderado, alterne conteúdo e siga as proteções do fabricante.'],
      ['O relógio funciona sem conexão à internet?', 'Os recursos já armazenados pelo service worker podem abrir sem conexão. O horário vem do relógio configurado no dispositivo.']
    ],
    body: `
      <h2>Otimização de Espaço em Múltiplos Monitores</h2>
      <p>Em estações de trabalho com dois ou três monitores, é frequente que uma das telas permaneça subutilizada em determinados períodos do dia. Em vez de mantê-la como um repositório desorganizado de abas inativas, convertê-la em um <strong>dashboard temporal minimalista</strong> agrega valor estético e funcional ao setup.</p>

      <h2>Atualização baseada no relógio do dispositivo</h2>
      <p>O MonitorSmith lê <code>Date</code>, formata horário e fuso com <code>Intl.DateTimeFormat</code> e agenda a próxima leitura perto da virada do segundo. Abas em segundo plano podem sofrer atraso, e a ferramenta não substitui sincronização NTP.</p>

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
      ['Qual configuração usar: dois horizontais ou um vertical?', 'Depende das tarefas, aplicativos e espaço. O modo retrato mostra mais linhas em alguns fluxos; teste também largura, escala e rotação antes de fixar o suporte.'],
      ['Como equalizar a escala entre monitores de resoluções diferentes?', 'Ajuste os fatores de escala DPI do sistema operacional (ex: 100% no monitor 1080p e 125% no monitor 1440p) para que janelas não sofram variações bruscas de tamanho ao transitar entre telas.'],
      ['Dois monitores reduzem a autonomia de notebooks?', 'Podem aumentar o consumo, mas o efeito varia com painel, brilho, resolução, GPU, porta e carga. Meça no seu equipamento em vez de aplicar um percentual fixo.']
    ],
    body: `
      <h2>Arquitetura Ergonômica de Estações de Trabalho com Telas Múltiplas</h2>
      <p>Múltiplos displays oferecem mais área de trabalho, mas o ganho depende do fluxo. Posicionamento, escala e tempo olhando para cada tela influenciam o conforto.</p>

      <h2>Diretrizes de Posicionamento Físico</h2>
      <ul>
        <li><strong>Monitor primário:</strong> se uma tela concentra a maior parte do trabalho, mantenha-a em posição confortável à frente e aproxime a secundária conforme a frequência de uso.</li>
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
    description: 'Use o modo espelhado e a rolagem manual do MonitorSmith como apoio simples à leitura em estruturas compatíveis de teleprompter.',
    relatedSlugs: ['guia-completo-monitorsmith', 'sinalizacao-digital-eventos'],
    faq: [
      ['O que faz o vidro de teleprompter?', 'Uma superfície semirrefletora pode mostrar o texto ao apresentador enquanto a câmera registra a cena. Proporção, orientação e perda de luz variam por produto.'],
      ['Quando espelhar o texto?', 'Ative o espelhamento somente se a sua estrutura mostrar as letras invertidas ao apresentador. Confira a orientação antes de gravar.'],
      ['A ferramenta controla velocidade ou WPM?', 'Não. O modo atual exibe e espelha texto e permite rolagem manual; ele não possui rolagem automática nem cálculo de palavras por minuto.']
    ],
    body: `
      <h2>A Óptica dos Sistemas de Teleprompter</h2>
      <p>Estruturas de teleprompter usam uma superfície semirrefletora diante da câmera. O modo espelhado aplica uma inversão horizontal por CSS; a orientação e a exposição final precisam ser conferidas no conjunto real.</p>

      <h2>Técnicas para uma Apresentação Fluida e Natural</h2>
      <ol>
        <li><strong>Área de leitura:</strong> mantenha o texto próximo ao eixo da lente se isso melhorar o contato visual no enquadramento.</li>
        <li><strong>Controle manual:</strong> role o roteiro durante o ensaio ou use trechos que caibam na tela.</li>
        <li><strong>Ensaio:</strong> ajuste tamanho, quantidade de texto e distância conforme sua leitura e o equipamento.</li>
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
      ['É necessário adquirir software dedicado para sinalização básica?', 'Nem sempre. Uma aplicação web em tela cheia pode atender avisos simples, mas operação contínua ainda envolve dispositivo, energia, rede, manutenção e requisitos de segurança.'],
      ['Como melhorar a legibilidade à distância?', 'Use texto curto, fonte grande e alto contraste e teste no local real. WCAG orienta contraste de interfaces, mas não garante leitura física em uma sala.']
    ],
    body: `
      <h2>Comunicação Visual Dinâmica em Espaços Físicos</h2>
      <p>A sinalização digital permite atualizar mensagens sem reimprimir o material. Operação contínua ainda exige dispositivo, energia, segurança, manutenção e um plano alternativo para falhas.</p>

      <h2>Regras de Tipografia e Contraste para Grandes Distâncias</h2>
      <p>Tamanho mínimo depende de distância, acuidade, resolução, brilho, reflexos e tempo disponível para leitura. Teste a mensagem do ponto mais distante e ofereça outro canal quando a informação for essencial.</p>

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
      ['Por que projetar QR Codes em tela cheia durante apresentações?', 'Reduz a digitação manual de links e permite que vários participantes tentem abrir o mesmo destino com a câmera do celular.'],
      ['O que é a correção de erro Reed-Solomon em QR Codes?', 'É um mecanismo de redundância que tolera parte dos módulos ausentes ou corrompidos. Ele não garante leitura quando há reflexo, distância, foco ou obstrução excessivos.'],
      ['Qual tamanho usar na projeção?', 'Aumente o código e a margem até diferentes celulares conseguirem ler do ponto mais distante. Não existe percentual que garanta foco em toda câmera e ambiente.']
    ],
    body: `
      <h2>A Conexão Imediata Entre o Palco e o Público</h2>
      <p>Um QR Code reduz a necessidade de digitar um endereço, mas leitura e participação dependem do público, conexão, câmera, enquadramento e clareza da chamada.</p>

      <h2>Recomendações Técnicas para Projeção</h2>
      <ul>
        <li><strong>Contraste:</strong> mantenha módulos escuros, fundo claro e zona livre ao redor; evite imagens atrás do código.</li>
        <li><strong>Redundância:</strong> o gerador do MonitorSmith usa nível M. Isso ajuda com pequenas perdas, sem garantir leitura sob reflexo, desfoque ou obstrução.</li>
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
      ['Qual o tempo ideal de exibição por patrocinador em um loop?', 'Não existe um intervalo universal. Cinco a dez segundos é um ponto de partida que deve ser testado conforme a distância, o conteúdo e o ritmo do evento.'],
      ['Como integrar o carrossel de logos em transmissões do OBS Studio?', 'Abra a ferramenta no navegador e adicione a janela como uma fonte de captura de janela ou navegador no OBS, aplicando recortes de chroma se necessário.'],
      ['Como reduzir conteúdo estático em monitores de estande?', 'Alterne artes, use brilho moderado e siga as proteções do fabricante. O deslocamento da ferramenta muda a posição, mas não garante prevenção de retenção ou burn-in.']
    ],
    body: `
      <h2>A Economia da Exposição Visual de Marcas</h2>
      <p>Em transmissões ao vivo, palcos e estandes, a clareza e o tempo de exibição influenciam a presença visual dos apoiadores. Uma sequência em tela cheia pode distribuir tempo entre marcas; alcance e retorno dependem da audiência, do enquadramento e da execução.</p>

      <h2>Transições no navegador</h2>
      <p>O Loop de Marcas usa opacidade e transformações CSS. A fluidez e o consumo dependem do navegador, GPU, resolução das imagens e carga do dispositivo; faça um ensaio no equipamento da transmissão.</p>

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
      ['Quais as vantagens de vitrines digitais?', 'Elas permitem trocar artes e horários sem reimpressão. Impacto comercial depende de local, conteúdo, público e operação, e deve ser medido.'],
      ['É possível usar monitores e TVs comuns?', 'Pode funcionar em ambiente interno, desde que o fabricante permita a duração, orientação e brilho previstos. Avalie ventilação, energia, segurança e manutenção.'],
      ['Como evitar que o sistema operacional exiba barras e notificações na vitrine?', 'Ative o modo tela cheia do navegador (F11) e desative as notificações de segundo plano do sistema operacional.']
    ],
    body: `
      <h2>Dinamismo Visual no Ponto de Venda</h2>
      <p>Telas digitais permitem alternar ofertas por horário e atualizar conteúdo rapidamente. O resultado visual e comercial deve ser testado no local, sem promessas de conversão.</p>

      <h2>Operação Leve Diretamente no Navegador</h2>
      <p>A suíte do MonitorSmith permite carregar e ordenar artes promocionais diretamente no navegador. As imagens ficam no armazenamento local da ferramenta; a hospedagem do site e serviços consentidos ainda podem usar a rede.</p>

      <p><a class="cta" href="/?tool=sponsor-loop">Configurar Vitrine Digital no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'guia-completo-monitorsmith',
    toolId: 'dead-pixel',
    title: 'MonitorSmith: Guia Completo com 27 Ferramentas para Monitores',
    h1: 'MonitorSmith: Guia Geral da Suíte de Utilitários e Testes de Display',
    description: 'Conheça as 27 ferramentas web do MonitorSmith para inspeção visual, medição assistida pelo navegador, iluminação, acessibilidade e produtividade.',
    relatedSlugs: ['tecnica-pomodoro-guia', 'relogio-digital-monitor-secundario', 'setup-dois-monitores-dicas'],
    faq: [
      ['O que é a suíte MonitorSmith?', 'É um conjunto de utilitários web leves desenvolvidos pela EXVORN.TECH para testes visuais de telas, iluminação de apoio e produtividade.'],
      ['As ferramentas funcionam offline?', 'O MonitorSmith usa um service worker para manter os recursos centrais em cache após o primeiro carregamento. Atualizações, anúncios e recursos ainda não armazenados podem exigir conexão.'],
      ['Os dados e imagens importados são enviados para algum servidor?', 'As ferramentas processam imagens, textos, temporizadores e sinais no navegador. Serviços de terceiros consentidos, como publicidade, podem fazer suas próprias comunicações de rede conforme a política de privacidade.']
    ],
    body: `
      <h2>Um Canivete Suíço de Ferramentas Visuais no Navegador</h2>
      <p>O <strong>MonitorSmith</strong> foi concebido para reunir utilitários de inspeção e verificação visual, iluminação de suporte e organização temporal em uma interface coesa.</p>

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
