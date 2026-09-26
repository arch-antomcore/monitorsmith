import { PRODUCTIVITY_EXPANSIONS } from './blog-articles-productivity-expansions.mjs';

const PRODUCTIVITY_ARTICLES = [
  {
    slug: 'tecnica-pomodoro-guia',
    toolId: 'focus-timer',
    title: 'Técnica Pomodoro: como planejar ciclos de foco e pausa',
    h1: 'Técnica Pomodoro: um procedimento prático para testar no trabalho',
    description: 'Aprenda a planejar ciclos de foco, registrar interrupções e ajustar trabalho e pausas sem tratar 25 minutos como regra universal.',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    relatedSlugs: ['ruido-marrom-branco-rosa-foco', 'foco-trabalho-remoto'],
    faq: [
      ['O que é a Técnica Pomodoro?', 'É um método de gestão de tempo criado por Francesco Cirillo que alterna blocos de trabalho focado com pausas curtas. Vinte e cinco minutos é uma convenção popular, não uma duração universal.'],
      ['Por que o ciclo tradicional usa 25 minutos?', 'É a convenção popular do método, não um limite biológico calibrado. Ajuste a duração à tarefa e à sua capacidade de manter uma rotina.'],
      ['É possível usar intervalos mais longos?', 'Sim. Compare ciclos como 25/5 e 50/10 e adote o que ajuda sem causar desconforto. A ferramenta não previne fadiga ou burnout.'],
    ],
    sources: [
      { label: 'Pomodoro Technique — site oficial', url: 'https://www.pomodorotechnique.com/', note: 'Apresenta o método criado por Francesco Cirillo, incluindo planejamento, ciclos, pausas e tratamento de interrupções.' },
      { label: 'NIOSH — Step 1: Identify Risk Factors', url: 'https://www.cdc.gov/niosh/ergonomics/ergo-programs/risk-factors.html', note: 'Descreve fatores de risco físicos e organizacionais e o uso responsável de checklists ergonômicos.' },
      { label: 'NIOSH — Office Environments and Your Safety', url: 'https://www.cdc.gov/niosh/office-environment/about/index.html', note: 'Resume fatores do ambiente de escritório que podem afetar saúde, segurança e execução do trabalho.' },
    ],
    body: `
      <p>A Técnica Pomodoro organiza o trabalho em períodos delimitados de atenção, separados por pausas. O ciclo clássico de 25 minutos é uma referência, não uma medida universal de produtividade. Uma tarefa de leitura cuidadosa pode pedir um bloco maior; uma atividade nova ou cansativa pode funcionar melhor em um bloco menor. O valor do método está em escolher uma entrega observável, proteger um intervalo e revisar o que aconteceu.</p>

      <p>O Timer de Foco do MonitorSmith fornece o cronômetro, presets de duração, pausa e sons ambientes opcionais gerados no navegador. Ele não escolhe prioridades, não bloqueia sites ou notificações, não mede qualidade e não confirma que uma pessoa esteve concentrada. A ferramenta serve como marcador visual e sonoro. O planejamento e a avaliação continuam sendo responsabilidade de quem executa o trabalho.</p>

      <h2>Prepare o ciclo antes de iniciar o relógio</h2>
      <p>Transforme uma intenção ampla em uma ação que possa ser encerrada ou deixada em um ponto claro. “Trabalhar no relatório” é vago; “revisar a introdução e marcar trechos sem fonte” informa o que fazer e como reconhecer o fim. Deixe água, referências e arquivos necessários acessíveis. Feche o que não será usado e silencie avisos quando isso for compatível com suas responsabilidades.</p>

      <h3>Procedimento reproduzível</h3>
      <ol>
        <li><strong>Escolha uma única entrega.</strong> Escreva-a em uma frase curta e mantenha-a visível.</li>
        <li><strong>Defina um intervalo inicial.</strong> Use 25 minutos se não tiver referência anterior, ou escolha uma duração coerente com a tarefa. Não prolongue o bloco apenas para obedecer ao relógio.</li>
        <li><strong>Inicie o Timer de Foco.</strong> Se usar som ambiente, comece em volume baixo. O som é opcional e não substitui o controle do ruído do ambiente.</li>
        <li><strong>Registre interrupções sem trocar de tarefa.</strong> Anote em poucas palavras chamadas, ideias e pendências que possam esperar. Atenda imediatamente apenas o que tiver urgência real.</li>
        <li><strong>Encerre no sinal.</strong> Salve o trabalho e escreva o próximo passo. Se estiver no meio de uma operação que não pode ser interrompida com segurança, conclua essa operação antes da pausa.</li>
        <li><strong>Faça uma pausa diferente do trabalho.</strong> Levante-se, mude o foco visual ou hidrate-se. Evite preencher toda pausa com outra tela se o objetivo for descansar visão e postura.</li>
      </ol>

      <h2>Como interpretar a experiência</h2>
      <p>Depois de alguns ciclos comparáveis, observe o registro. Se quase todos terminam no meio de uma frase ou cálculo, o intervalo pode estar curto. Se a atenção cai muito antes do sinal, reduza o bloco ou divida melhor a entrega. Interrupções repetidas vindas da mesma pessoa, aplicativo ou falta de material indicam um problema de processo, não uma falha do timer. Uma tarefa concluída cedo pode ser revisada ou encerrada; não é necessário inventar trabalho para ocupar o tempo restante.</p>

      <p>Compare tarefas semelhantes, porque escrever, responder mensagens e investigar um erro exigem ritmos diferentes. Use o número de ciclos apenas para planejar capacidade aproximada. Ele não representa horas faturáveis, dificuldade ou valor produzido sem contexto. Se a estimativa muda, registre o motivo: escopo incerto, dependência externa, pesquisa adicional ou cansaço.</p>

      <h2>Erros comuns</h2>
      <ul>
        <li>começar o cronômetro antes de decidir o resultado do bloco;</li>
        <li>tratar toda interrupção como falta de disciplina, mesmo quando o trabalho exige disponibilidade;</li>
        <li>pular pausas para compensar atraso e acumular fadiga;</li>
        <li>usar a mesma duração para toda atividade e abandonar o método quando uma delas não se encaixa;</li>
        <li>confundir o tempo exibido com prova de concentração ou de qualidade.</li>
      </ul>

      <h2>Limites e ajustes</h2>
      <p>O método pode não combinar com reuniões, atendimento contínuo, tarefas de resposta urgente ou estados de fluxo em que uma parada rígida atrapalha. Regras de descanso, ergonomia e jornada da sua organização continuam valendo. Dor, desconforto visual persistente, ansiedade ou dificuldade de atenção não são problemas que um timer diagnostique ou trate. Nesses casos, adapte o processo e procure orientação apropriada. O resultado útil é um ritmo sustentável e compreensível, não a maior quantidade possível de ciclos.</p>
    `,
  },
  {
    slug: 'ruido-marrom-branco-rosa-foco',
    toolId: 'focus-timer',
    title: 'Ruído branco, rosa e marrom: diferenças e teste responsável',
    h1: 'Ruído branco, rosa e marrom para foco: como comparar com cuidado',
    description: 'Entenda as diferenças entre ruído branco, rosa e marrom, compare a reprodução em volume baixo e reconheça os limites do navegador.',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    relatedSlugs: ['tecnica-pomodoro-guia', 'foco-trabalho-remoto'],
    faq: [
      ['Qual a diferença física entre ruído branco, rosa e marrom?', 'O ruído branco possui densidade espectral constante. O ruído rosa reduz a energia conforme a frequência sobe, e o ruído marrom concentra ainda mais energia nas frequências baixas. A reprodução percebida também depende do equipamento.'],
      ['Qual o melhor ruído para estudo?', 'Não existe um melhor para todos. Compare em volume baixo; algumas pessoas preferem ruído marrom, rosa, branco ou silêncio. Interrompa se houver desconforto.'],
      ['Como funciona o mascaramento auditivo?', 'Um som contínuo pode reduzir o contraste percebido entre o fundo e ruídos intermitentes. O efeito varia com frequência, volume, ambiente, equipamento, pessoa e tarefa.'],
    ],
    sources: [
      { label: 'W3C — Web Audio API', url: 'https://www.w3.org/TR/webaudio-1.0/', note: 'Especifica a geração, o processamento e o roteamento de áudio no navegador.' },
      { label: 'NIOSH — Understand Noise Exposure', url: 'https://www.cdc.gov/niosh/noise/prevent/understand.html', note: 'Explica nível, duração e medição da exposição ocupacional a ruído.' },
      { label: 'NIOSH — About Occupational Hearing Loss', url: 'https://www.cdc.gov/niosh/noise/about/noise.html', note: 'Descreve riscos auditivos e sinais associados à exposição nociva ao ruído.' },
    ],
    body: `
      <p>Ruído branco, rosa e marrom são sinais com distribuições diferentes de energia ao longo das frequências. O branco tende a soar mais brilhante porque contém energia uniforme por hertz; o rosa reduz a energia conforme a frequência sobe e costuma parecer mais equilibrado; o marrom dá ainda mais peso às frequências baixas e soa mais grave. Esses nomes descrevem o espectro do sinal. Eles não indicam, por si só, efeito garantido sobre concentração, sono ou saúde.</p>

      <p>No Timer de Foco, o MonitorSmith sintetiza opções de ruído pelo sistema de áudio do navegador. A ferramenta ajuda a criar um fundo sonoro contínuo, mas não mede decibéis, não calibra o fone, não conhece a distância até a caixa e não identifica perda auditiva. O controle percentual exibido pelo navegador ou sistema não equivale ao nível de pressão sonora que chega ao ouvido.</p>

      <h2>Quando um ruído contínuo pode ajudar</h2>
      <p>O uso mais simples é mascarar sons intermitentes, como conversas distantes, portas e pequenos ruídos de escritório. Um fundo estável pode tornar essas variações menos perceptíveis. Isso depende do ambiente, do equipamento, da sensibilidade individual e da tarefa. Para algumas pessoas, qualquer áudio adicional compete com leitura, escrita ou memorização. Silêncio, protetor auditivo adequado ou mudança de local também devem entrar na comparação.</p>

      <h3>Comparação controlada no seu ambiente</h3>
      <ol>
        <li><strong>Escolha uma tarefa repetível.</strong> Use algo com começo e fim claros, como revisar páginas equivalentes ou organizar itens da mesma categoria.</li>
        <li><strong>Faça primeiro um bloco em silêncio.</strong> Registre distrações percebidas, desconforto e o ponto alcançado, sem transformar isso em teste clínico.</li>
        <li><strong>Selecione um ruído e reduza o volume.</strong> Comece no mínimo audível e aumente somente o necessário para suavizar o som externo. Se precisar encobrir completamente o ambiente, a reprodução pode estar alta demais.</li>
        <li><strong>Mantenha o restante constante.</strong> Use o mesmo dispositivo, posição, tarefa e duração aproximada ao comparar branco, rosa e marrom.</li>
        <li><strong>Inclua uma pausa sem áudio.</strong> Isso evita reprodução contínua e ajuda a perceber zumbido, pressão, fadiga ou irritação.</li>
        <li><strong>Escolha pela menor interferência.</strong> Mantenha a opção que reduz distrações em volume baixo; descarte qualquer uma que exija esforço para ignorar.</li>
      </ol>

      <h2>Como ler o resultado</h2>
      <p>Se o som ajuda apenas quando está alto, ele pode estar substituindo um incômodo por outro. Tente afastar-se da fonte de ruído, vedar uma porta ou usar fones com melhor isolamento antes de subir o volume. Se o resultado muda entre notebook, celular e fone, isso é esperado: cada saída tem resposta de frequência, potência e processamento próprios. Um ruído marrom reproduzido por alto-falantes pequenos pode perder graves e ficar diferente do previsto.</p>

      <p>Considere também a natureza da distração. Ruído contínuo pode mascarar ventilação e murmúrios, porém não resolve notificações visuais, interrupções de colegas, calor, postura ou falta de definição da tarefa. Se você continua alternando de janela, combine o som com um plano de trabalho e controle de avisos.</p>

      <h2>Erros comuns</h2>
      <ul>
        <li>usar a mesma porcentagem de volume como se representasse o mesmo nível sonoro em todos os aparelhos;</li>
        <li>trabalhar ou estudar por longos períodos sem pausas porque o som parece suave;</li>
        <li>aumentar o volume para vencer trânsito, máquinas ou música externa intensa;</li>
        <li>interpretar uma preferência pessoal como evidência de tratamento ou melhora cognitiva;</li>
        <li>usar áudio que impeça perceber alarmes, veículos, pessoas ou outros sinais importantes.</li>
      </ul>

      <h2>Limites e segurança auditiva</h2>
      <p>As referências ocupacionais do NIOSH relacionam risco à intensidade e à duração, mas não transformam o volume do navegador em uma dose mensurável. O MonitorSmith não substitui sonômetro, dosímetro, avaliação do ambiente ou orientação de saúde. Interrompa o áudio se houver dor, zumbido, abafamento, tontura ou desconforto. Em ambientes com risco físico ou exigência de comunicação, preserve a capacidade de ouvir sinais essenciais e siga as regras locais.</p>
    `,
  },
  {
    slug: 'foco-trabalho-remoto',
    toolId: 'focus-timer',
    title: 'Foco no trabalho remoto: rotina, ambiente e interrupções',
    h1: 'Como organizar foco no trabalho remoto sem confundir presença com resultado',
    description: 'Monte uma rotina com entregas claras, blocos de atenção, pausas, registro de interrupções e revisão do ambiente de trabalho.',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    relatedSlugs: ['tecnica-pomodoro-guia', 'setup-dois-monitores-dicas'],
    faq: [
      ['Como mitigar distrações no home office?', 'Defina uma entrega por vez, combine janelas de resposta, silencie avisos dispensáveis e registre interrupções recorrentes. O espaço e a rotina devem ser ajustados às responsabilidades reais.'],
      ['O que é o custo de alternância de contexto (context switching)?', 'É o esforço de interromper uma tarefa, orientar-se em outra e depois reconstruir o ponto anterior. Reduzir trocas desnecessárias preserva tempo e contexto, mas algumas funções exigem atendimento contínuo.'],
      ['Qual altura e distância usar?', 'Ajuste para manter postura confortável e texto legível sem inclinar o pescoço. Tamanho, lentes, visão e tarefa mudam a posição adequada; orientação profissional pode ser necessária.'],
    ],
    sources: [
      { label: 'NIOSH — About Ergonomics and Work-Related Musculoskeletal Disorders', url: 'https://www.cdc.gov/niosh/ergonomics/about/index.html', note: 'Explica a adaptação de tarefas, equipamentos e ambiente às capacidades de quem trabalha.' },
      { label: 'NIOSH — Office Environments and Your Safety', url: 'https://www.cdc.gov/niosh/office-environment/about/index.html', note: 'Relaciona fatores físicos e organizacionais do escritório com segurança e bem-estar.' },
      { label: 'NIOSH — Stress and Work', url: 'https://www.cdc.gov/niosh/stress/about/index.html', note: 'Discute estressores e organização do trabalho sem reduzir o problema a uma técnica individual.' },
    ],
    body: `
      <p>Foco no trabalho remoto depende de três coisas planejadas juntas: uma entrega compreensível, um ambiente utilizável e regras de disponibilidade. Um timer ajuda a marcar o período, mas não corrige prioridades conflitantes, mobiliário inadequado ou expectativa de resposta imediata. Antes de buscar mais horas de concentração, esclareça o que precisa terminar e quais interrupções fazem parte da função.</p>

      <p>O Timer de Foco do MonitorSmith mostra ciclos de trabalho e pausa e pode reproduzir sons ambientes opcionais. Ele não lê sua agenda, não bloqueia mensagens, não observa atividade, não envia status à equipe e não avalia produtividade. Use-o como um sinal pessoal dentro de um processo que também inclua comunicação e ergonomia.</p>

      <h2>Faça uma abertura curta do dia</h2>
      <p>Consulte compromissos, prazos e dependências. Escolha uma entrega principal e descreva o primeiro passo com um verbo concreto: revisar, comparar, redigir, corrigir ou enviar. Reserve uma janela separada para e-mail e tarefas pequenas. Essa escolha reduz trocas constantes sem esconder demandas urgentes. Antes de iniciar, confirme quem depende do seu retorno e como um caso crítico deve chegar até você.</p>

      <h2>Prepare espaço e disponibilidade</h2>
      <p>Posicione tela, teclado e cadeira para evitar posturas forçadas. Mantenha o que será usado ao alcance, ajuste reflexos e deixe uma passagem segura para cabos. Um posto improvisado pode ser suficiente por pouco tempo, mas desconforto recorrente pede ajuste físico; aumentar o número de ciclos não resolve isso.</p>

      <p>Defina com a equipe quais canais indicam urgência, em quanto tempo se espera uma resposta e quando o trabalho concentrado é aceitável. Um status como “em foco até 10h30; urgências por telefone” é mais útil do que desaparecer sem contexto. Funções de atendimento, cuidado ou operação exigem blocos compatíveis com o serviço.</p>

      <h3>Procedimento para um bloco observável</h3>
      <ol>
        <li>abra apenas os materiais necessários;</li>
        <li>anote a entrega e o critério de conclusão;</li>
        <li>inicie um intervalo compatível com a tarefa;</li>
        <li>registre interrupções que possam esperar, sem abrir cada nova demanda;</li>
        <li>ao final, salve, descreva o próximo passo e faça a pausa prevista.</li>
      </ol>

      <h2>Interprete as interrupções</h2>
      <p>Classifique-as por origem: comunicação necessária, aviso automático, pessoa no ambiente, falta de informação ou impulso de trocar de tarefa. Muitas interrupções necessárias podem indicar que seu papel precisa de blocos menores. Avisos automáticos recorrentes pedem configuração. Falta de informação sugere preparar melhor o ciclo. Demandas domésticas previsíveis podem ser incluídas no horário, em vez de tratadas como falhas pessoais.</p>

      <p>Observe também o que acontece depois da pausa. Se você retorna com clareza, a separação está ajudando. Se toda pausa se transforma em longa navegação ou se o bloco termina com dor e fadiga, ajuste duração, atividade e espaço. Compare dias equivalentes e considere reuniões, sono, carga de cuidado e complexidade antes de tirar conclusões.</p>

      <h2>Feche o expediente</h2>
      <p>Revise o que ficou pronto, devolva pendências que dependem de outras pessoas e registre onde retomar. Fechar abas e guardar materiais cria uma fronteira prática entre trabalho e vida doméstica. Se há exigência de jornada ou apontamento de horas, use o sistema definido pela organização; o Timer de Foco não é controle de ponto.</p>

      <h2>Erros comuns e limites</h2>
      <ul>
        <li>confundir câmera ligada ou resposta instantânea com trabalho concluído;</li>
        <li>planejar blocos sem espaço para atendimento e tarefas administrativas;</li>
        <li>usar pausas para continuar respondendo mensagens na mesma postura;</li>
        <li>tentar resolver sobrecarga, conflito de prioridades ou assédio apenas com organização pessoal;</li>
        <li>deixar dados sensíveis visíveis ou acessíveis em um ambiente compartilhado.</li>
      </ul>

      <p>Uma rotina individual não substitui recursos, metas realistas, pausas previstas, suporte de gestão ou avaliação ergonômica. Se o trabalho remoto causa dor persistente, sofrimento, isolamento intenso ou jornadas que não terminam, registre o problema e use os canais de saúde e trabalho disponíveis. O MonitorSmith oferece um marcador de tempo; as condições para um trabalho sustentável precisam ser construídas no ambiente e na organização.</p>
    `,
  },
  {
    slug: 'relogio-digital-monitor-secundario',
    toolId: 'clock',
    title: 'Relógio em monitor secundário: configuração e cuidados',
    h1: 'Como usar um monitor secundário como relógio de mesa',
    description: 'Configure hora e data em tela cheia, confira o relógio do sistema e reduza riscos de imagem estática e consumo desnecessário.',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    relatedSlugs: ['setup-dois-monitores-dicas', 'guia-completo-monitorsmith'],
    faq: [
      ['Quais os benefícios de um relógio na tela secundária?', 'Mantém uma referência de horário visível sem precisar alternar de aplicativo ou consultar outro dispositivo.'],
      ['Exibir um relógio contínuo pode afetar o monitor?', 'Conteúdo estático prolongado pode contribuir para retenção ou desgaste desigual em alguns painéis. Use brilho moderado, alterne conteúdo e siga as proteções do fabricante.'],
      ['O relógio funciona sem conexão à internet?', 'Os recursos já armazenados pelo service worker podem abrir sem conexão. O horário vem do relógio configurado no dispositivo.'],
    ],
    sources: [
      { label: 'ECMA-262 — Date Objects', url: 'https://tc39.es/ecma262/multipage/numbers-and-dates.html', note: 'Define como JavaScript representa datas, horas e o tempo do sistema.' },
      { label: 'ECMA-402 — Internationalization API', url: 'https://tc39.es/ecma402/', note: 'Define a formatação de data e hora conforme localidade e opções do navegador.' },
      { label: 'LG — Troubleshooting Image Burn-In', url: 'https://www.lg.com/us/support/help-library/lg-tv-troubleshooting-image-burn-in-CT10000030-20152745607830', note: 'Reúne orientações do fabricante sobre conteúdo estático e recursos de proteção em telas compatíveis.' },
    ],
    body: `
      <p>Um monitor secundário pode exibir hora e data de forma legível durante trabalho, gravação ou atendimento. Para isso funcionar bem, o relógio do sistema precisa estar correto, a janela deve permanecer no display escolhido e o painel não deve ficar ligado sem necessidade. A precisão não vem do tamanho dos números: o MonitorSmith lê o tempo disponibilizado pelo dispositivo.</p>

      <p>O modo Relógio mostra formatos digital e analógico e opções visuais de exibição. Ele não consulta uma fonte independente de tempo, não sincroniza o computador, não substitui um relógio certificado e não dispara alarmes de segurança. Se o sistema estiver com hora, fuso ou data incorretos, a tela repetirá o erro.</p>

      <h2>Configuração passo a passo</h2>
      <ol>
        <li><strong>Confira o sistema.</strong> Abra as configurações de data e hora, confirme fuso horário, sincronização automática e formato regional. Compare com uma fonte de tempo adotada pela sua organização se a atividade exigir precisão.</li>
        <li><strong>Organize os monitores.</strong> No sistema operacional, identifique as telas e confirme a posição física. Use o modo estendido para mover o relógio sem duplicar tudo o que aparece na tela principal.</li>
        <li><strong>Abra o modo Relógio.</strong> Escolha digital ou analógico e selecione uma combinação legível para o ambiente. Evite brilho maior do que o necessário, sobretudo em sala escura.</li>
        <li><strong>Mova a janela e ative tela cheia.</strong> Faça isso no monitor secundário. O navegador pode exigir uma ação do usuário para entrar em tela cheia e pode sair desse modo com a tecla Esc.</li>
        <li><strong>Teste o comportamento.</strong> Bloqueie e desbloqueie o computador, suspenda e retome o sistema e verifique se a janela permanece no display correto e se a hora continua coerente.</li>
        <li><strong>Defina um encerramento.</strong> Use o gerenciamento de energia do sistema ou desligue o monitor quando a informação não precisar ser exibida.</li>
      </ol>

      <h2>Como avaliar a leitura</h2>
      <p>Observe o relógio da distância real de uso, não apenas sentado diante da tela. Dígitos precisam ser distinguíveis sem esforço e sem confusão entre caracteres. Reflexos, ângulo de visão, baixo contraste e escala do sistema podem reduzir a leitura. Se o relógio serve a uma sala, peça a pessoas em posições diferentes que leiam hora e data; isso é uma verificação prática, não uma certificação de acessibilidade.</p>

      <p>Se a hora muda depois de suspensão, viagem ou conexão com rede corporativa, verifique fuso e sincronização no sistema. Se segundos parecem pular quando a aba fica em segundo plano, lembre que navegadores podem reduzir a frequência de atualizações de páginas não visíveis. Reabrir a aba corrige a apresentação a partir do tempo atual, mas não corrige o relógio do dispositivo.</p>

      <h2>Conteúdo estático e manutenção</h2>
      <p>Relógios mantêm muitos elementos na mesma posição. Alguns displays, especialmente painéis suscetíveis a retenção, têm recursos próprios de proteção e recomendações de uso. Consulte o manual do modelo, ative mecanismos como deslocamento de pixels quando disponíveis e alterne o conteúdo. Reduzir brilho e desligar a tela fora do horário também limita desgaste e energia consumida.</p>

      <h2>Erros comuns</h2>
      <ul>
        <li>assumir que o site corrige automaticamente uma hora errada do computador;</li>
        <li>duplicar a tela e expor notificações ou informações da área principal;</li>
        <li>desativar suspensão e deixar o painel ligado continuamente sem necessidade;</li>
        <li>usar contraste baixo ou tamanho escolhido de perto para leitura à distância;</li>
        <li>tratar uma página do navegador como relógio de referência para operações críticas.</li>
      </ul>

      <h2>Limites de uso</h2>
      <p>O relógio é adequado como informação visual cotidiana. Controle de processo, transmissão, prova de horário, acessibilidade regulamentada ou ambientes em que um atraso possa causar dano exigem sistemas próprios, redundância e manutenção. O MonitorSmith não monitora a saúde do display, não garante que o navegador permaneça aberto e não impede notificações do sistema. Faça o teste no equipamento final e mantenha uma forma simples de recuperar a tela após reinicializações.</p>
    `,
  },
  {
    slug: 'setup-dois-monitores-dicas',
    toolId: 'clock',
    title: 'Dois monitores: como configurar posição, escala e rotina',
    h1: 'Setup com dois monitores: configuração prática e verificação',
    description: 'Organize dois monitores com resolução, escala, posição física e ergonomia coerentes, e saiba o que comparar antes de ajustar.',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    relatedSlugs: ['relogio-digital-monitor-secundario', 'foco-trabalho-remoto'],
    faq: [
      ['Qual configuração usar: dois horizontais ou um vertical?', 'Depende das tarefas, aplicativos e espaço. O modo retrato mostra mais linhas em alguns fluxos; teste também largura, escala e rotação antes de fixar o suporte.'],
      ['Como equalizar a escala entre monitores de resoluções diferentes?', 'Ajuste a escala de cada tela no sistema operacional e compare o tamanho físico do texto e a passagem de janelas. PPI ajuda a explicar diferenças, mas não determina uma porcentagem universal.'],
      ['Dois monitores reduzem a autonomia de notebooks?', 'Podem aumentar o consumo, mas o efeito varia com painel, brilho, resolução, GPU, porta e carga. Meça no seu equipamento em vez de aplicar um percentual fixo.'],
    ],
    sources: [
      { label: 'Microsoft Support — How to use multiple monitors in Windows', url: 'https://support.microsoft.com/en-us/windows/hardware/display-graphics/how-to-use-multiple-monitors-in-windows', note: 'Explica detecção, identificação, organização, resolução, orientação e modos de múltiplas telas no Windows.' },
      { label: 'NIOSH — About Ergonomics and Work-Related Musculoskeletal Disorders', url: 'https://www.cdc.gov/niosh/ergonomics/about/index.html', note: 'Explica como tarefas, equipamentos e ambiente fazem parte de uma abordagem ergonômica.' },
      { label: 'OSHA — Computer Workstations: Monitors', url: 'https://www.osha.gov/etools/computer-workstations/components/monitors', note: 'Apresenta fatores ergonômicos ligados à posição, distância e uso de monitores.' },
    ],
    body: `
      <p>Um setup com dois monitores funciona melhor quando a organização digital acompanha a posição física. O cursor deve atravessar a borda esperada, o conteúdo precisa ter tamanho confortável em cada tela e a atividade principal deve exigir pouca rotação de cabeça e tronco. Comprar duas telas iguais facilita alguns ajustes, mas não é requisito; resolução, densidade, tamanho, conexão e distância importam mais do que a aparência externa.</p>

      <p>O MonitorSmith pode exibir relógio e outras superfícies em uma tela secundária e oferece uma Calculadora de PPI para comparar densidade geométrica a partir de resolução e diagonal. Ele não detecta a diagonal física com precisão, não altera resolução ou escala do sistema, não calibra cor e não mede ergonomia. Valores informados pelo navegador podem refletir pixels CSS e escala, por isso confirme configurações no sistema.</p>

      <h2>Faça um inventário antes de mover as telas</h2>
      <p>Anote modelo, tamanho, resolução nativa, taxa de atualização disponível, tipo de conexão e função de cada monitor. Verifique se computador, adaptador e cabo suportam a combinação desejada. Uma porta com o formato correto não garante a mesma largura de banda em todos os equipamentos. Se uma tela não oferece a resolução ou frequência esperada, consulte os manuais antes de comprar outro cabo.</p>

      <h2>Configure sistema e posição física</h2>
      <ol>
        <li><strong>Identifique as telas.</strong> Use o comando de identificação e arraste os retângulos para reproduzir esquerda, direita e diferença de altura reais.</li>
        <li><strong>Selecione o modo.</strong> Para áreas de trabalho independentes, escolha estender. Duplicar é útil quando as pessoas precisam ver o mesmo conteúdo, mas pode limitar a combinação de resoluções.</li>
        <li><strong>Comece pela resolução recomendada.</strong> Em geral, ela corresponde à matriz física do painel. Ajuste escala e tamanho do texto separadamente conforme o sistema permitir.</li>
        <li><strong>Alinhe a passagem do cursor.</strong> Mova uma janela por diferentes pontos da borda. Se ela salta para cima ou para baixo, corrija a posição virtual.</li>
        <li><strong>Posicione a tarefa principal.</strong> Deixe o monitor mais usado à frente. Coloque a tela auxiliar próxima e levemente voltada para você.</li>
        <li><strong>Ajuste altura, distância e reflexos.</strong> Trabalhe com pescoço neutro, texto legível e iluminação sem brilho direto. O suporte e a mesa devem sustentar os equipamentos com estabilidade.</li>
        <li><strong>Teste fluxos reais.</strong> Abra os aplicativos usados, arraste janelas, compartilhe tela e bloqueie o computador. Confirme onde notificações e caixas aparecem.</li>
      </ol>

      <h2>Use PPI como comparação, não como regra</h2>
      <p>PPI estima quantos pixels cabem em uma polegada. Duas telas com PPI próximo tendem a exibir elementos físicos de tamanho semelhante quando usam uma relação de escala compatível, mas sistema, aplicativo e distância mudam a percepção. Informe resolução e diagonal corretas na calculadora e use o resultado para explicar uma diferença, não para impor uma porcentagem.</p>

      <p>Se texto fica pequeno em uma tela de maior densidade, aumente a escala nessa tela e teste nitidez. Se uma janela muda muito de tamanho ao atravessar os monitores, procure uma combinação que preserve legibilidade no trabalho habitual. Alguns aplicativos antigos não se adaptam bem a escalas distintas; atualizá-los ou mantê-los em uma tela pode ser mais estável.</p>

      <h2>Interprete problemas por camada</h2>
      <p>Resolução ausente pode vir da porta, do cabo, do adaptador, do driver ou do próprio monitor. Tamanho incoerente pode estar na escala do sistema. Diferença de cor pode vir de modos de imagem, brilho, perfil, tecnologia ou ângulo. Altere uma variável por vez e registre a combinação. O MonitorSmith mostra padrões úteis para comparação visual, mas não identifica sozinho a causa.</p>

      <h2>Erros comuns e limites</h2>
      <ul>
        <li>alinhar apenas a base dos suportes e deixar a posição virtual diferente;</li>
        <li>forçar resolução não nativa para aumentar texto, sem testar escala e acessibilidade;</li>
        <li>colocar a divisão entre telas diretamente à frente durante uso contínuo;</li>
        <li>julgar cor sem considerar modos, brilho, painel e perfil de cada monitor;</li>
        <li>deixar cabos tracionados, adaptadores suspensos ou bases além do limite da mesa.</li>
      </ul>

      <p>Orientações gerais não substituem avaliação individual do posto. Dor, formigamento, fadiga visual persistente ou limitação de movimento precisam de ajuste e orientação adequada. O MonitorSmith não conhece suas medidas, não valida a capacidade elétrica ou mecânica de suportes e não garante precisão de cor entre painéis. Faça mudanças pequenas, teste durante tarefas reais e preserve uma configuração que possa ser revertida.</p>
    `,
  },
  {
    slug: 'como-usar-teleprompter-videos',
    toolId: 'online-teleprompter',
    title: 'Teleprompter online: roteiro, espelhamento e ensaio',
    h1: 'Como usar um teleprompter online em gravações',
    description: 'Prepare um roteiro legível, escolha quando espelhar o texto, ensaie a leitura e teste enquadramento e captura antes de gravar.',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    relatedSlugs: ['guia-completo-monitorsmith', 'sinalizacao-digital-eventos'],
    faq: [
      ['O que faz o vidro de teleprompter?', 'Uma superfície semirrefletora pode mostrar o texto ao apresentador enquanto a câmera registra a cena. Proporção, orientação e perda de luz variam por produto.'],
      ['Quando espelhar o texto?', 'Ative o espelhamento somente se a sua estrutura mostrar as letras invertidas ao apresentador. Confira a orientação antes de gravar.'],
      ['A ferramenta controla velocidade ou WPM?', 'Não. O modo atual exibe e espelha texto e permite rolagem manual; ele não possui rolagem automática nem cálculo de palavras por minuto.'],
    ],
    sources: [
      { label: 'Elgato — Prompter: product and compatibility information', url: 'https://www.elgato.com/us/en/p/prompter', note: 'Descreve componentes, opções de montagem e compatibilidade de um teleprompter físico; requisitos variam por câmera e suporte.' },
      { label: 'WHATWG — Fullscreen API', url: 'https://fullscreen.spec.whatwg.org/', note: 'Define como documentos entram e saem do modo de tela cheia no navegador.' },
      { label: 'W3C — CSS Transforms Module Level 1', url: 'https://www.w3.org/TR/css-transforms-1/', note: 'Define transformações visuais usadas para inverter ou reposicionar conteúdo renderizado.' },
    ],
    body: `
      <p>Um teleprompter ajuda o apresentador a consultar um roteiro perto do eixo da câmera. O resultado depende menos de ler sem errar e mais de preparar frases que possam ser ditas naturalmente, posicionar a tela perto da lente e ensaiar as pausas. Espelhamento só é necessário quando um vidro semirrefletor inverte a imagem; numa tela vista diretamente, a inversão dificulta a leitura.</p>

      <p>O modo Teleprompter do MonitorSmith exibe texto, permite ajustar sua apresentação, oferece espelhamento e rolagem manual em tela cheia. Ele não calcula velocidade de fala, não acompanha sua voz, não controla câmera ou microfone, não grava e não garante compatibilidade física com um suporte. O navegador pode sair da tela cheia e o operador precisa manter acesso aos controles.</p>

      <h2>Transforme texto escrito em roteiro falado</h2>
      <p>Comece pelo objetivo da gravação e por quem vai assistir. Use frases curtas, voz ativa e palavras que você realmente emprega. Separe uma ideia por parágrafo. Marque nomes, números e termos que não podem ser improvisados. Indique pausas com quebras de linha, mas evite uma coluna tão estreita que os olhos precisem saltar a cada duas palavras.</p>

      <h2>Prepare e teste a montagem</h2>
      <ol>
        <li><strong>Revise o conteúdo.</strong> Confirme fatos, pronúncia, nomes e autorizações. O teleprompter não verifica o roteiro.</li>
        <li><strong>Cole uma cópia no MonitorSmith.</strong> Preserve o original em outro arquivo. Remova instruções que não devem ser faladas ou deixe-as claramente marcadas.</li>
        <li><strong>Escolha a orientação correta.</strong> Ative o espelho apenas depois de olhar através do vidro. Se o texto aparece normal para o apresentador, não inverta.</li>
        <li><strong>Ajuste tamanho, largura e contraste.</strong> Faça isso na distância final. O apresentador deve ler sem inclinar o corpo ou semicerrar os olhos.</li>
        <li><strong>Alinhe câmera e tela.</strong> Posicione as linhas perto do eixo óptico, dentro dos limites de montagem do fabricante. Prenda cabos e não obstrua lente, ventilação ou controles.</li>
        <li><strong>Combine sinais.</strong> Apresentador e operador precisam saber como avançar, voltar, parar e repetir. A rolagem manual exige coordenação.</li>
        <li><strong>Grave uma amostra curta.</strong> Assista ao olhar, ritmo, reflexos no vidro, foco, áudio e enquadramento antes da tomada completa.</li>
      </ol>

      <h2>Interprete o ensaio</h2>
      <p>Se os olhos percorrem muito a horizontal, reduza a largura da coluna ou aumente a distância até a tela sem prejudicar a montagem. Se a leitura parece apressada, quebre períodos longos e insira pausas. Se o olhar desce de forma evidente, aproxime a área de leitura da lente. Um pequeno desvio pode ser aceitável em aula ou reunião; uma fala direta para câmera costuma exigir alinhamento mais cuidadoso.</p>

      <p>Se o vidro mostra reflexos, vazamento de luz ou perda de contraste, ajuste o ambiente e consulte as orientações do equipamento. Aumentar muito o brilho pode afetar conforto e aparecer na lente. Se a pessoa improvisa bem, use tópicos em vez de texto integral. O objetivo é apoiar a mensagem, não obrigar uma cadência uniforme.</p>

      <h2>Erros comuns</h2>
      <ul>
        <li>espelhar o texto em uma tela direta porque teleprompter sempre inverte;</li>
        <li>usar parágrafos escritos para leitura silenciosa, com frases longas e muitas subordinadas;</li>
        <li>esconder toda expressão atrás de fonte grande demais ou reduzir as letras para caber mais texto;</li>
        <li>começar a gravação principal sem conferir uma amostra com áudio e imagem;</li>
        <li>deixar dados pessoais, credenciais ou material sob embargo no roteiro aberto diante de terceiros.</li>
      </ul>

      <h2>Limites e contingência</h2>
      <p>Tenha uma cópia local do roteiro e um resumo em tópicos. Queda de energia, suspensão do computador, atualização do navegador ou perda de tela cheia podem interromper a leitura. Em transmissões ao vivo, uma segunda pessoa pode acompanhar o texto e avisar falhas. O MonitorSmith é uma superfície de leitura; segurança da montagem, direitos sobre o conteúdo, armazenamento do vídeo e qualidade editorial continuam fora da ferramenta.</p>
    `,
  },
  {
    slug: 'sinalizacao-digital-eventos',
    toolId: 'fullscreen-message',
    title: 'Sinalização digital simples para eventos e recepção',
    h1: 'Como preparar uma mensagem em tela cheia para eventos',
    description: 'Crie avisos legíveis, teste contraste e distância, configure o navegador e mantenha um plano para falhas e mudanças urgentes.',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    relatedSlugs: ['qr-code-tela-cheia-eventos', 'logos-patrocinadores-eventos'],
    faq: [
      ['O que é Digital Signage no contexto corporativo?', 'É o uso de displays eletrônicos para apresentar avisos, orientação, status ou programação. A operação pode variar de uma página local supervisionada a uma plataforma gerenciada.'],
      ['É necessário adquirir software dedicado para sinalização básica?', 'Nem sempre. Uma aplicação web em tela cheia pode atender avisos simples, mas operação contínua ainda envolve dispositivo, energia, rede, manutenção e requisitos de segurança.'],
      ['Como melhorar a legibilidade à distância?', 'Use texto curto, fonte grande e alto contraste e teste no local real. WCAG orienta contraste de interfaces, mas não garante leitura física em uma sala.'],
    ],
    sources: [
      { label: 'W3C — Web Content Accessibility Guidelines 2.2', url: 'https://www.w3.org/TR/WCAG22/', note: 'Fornece critérios de contraste, redimensionamento e apresentação de texto para conteúdo web.' },
      { label: 'WHATWG — Fullscreen API', url: 'https://fullscreen.spec.whatwg.org/', note: 'Define o comportamento e as restrições do modo de tela cheia em navegadores.' },
      { label: 'Samsung Business — DM Series Digital Signage Support', url: 'https://www.samsung.com/us/business/support/owners/product/dm-series-digital-signage-dm75e/', note: 'Centraliza manuais e orientações de operação para um display comercial; requisitos variam por modelo.' },
    ],
    body: `
      <p>Uma mensagem em tela cheia pode orientar entrada, fila, sala, sessão ou intervalo quando há computador e display disponíveis. Ela funciona melhor para uma informação principal, com poucas palavras e uma ação reconhecível à distância. Uma página aberta no navegador não oferece, por si só, a operação contínua de uma plataforma de sinalização: reinício, atualizações, notificações e conexão física precisam ser administrados.</p>

      <p>O modo Mensagem do MonitorSmith permite inserir texto, ajustar apresentação e exibi-lo em tela cheia. Ele calcula e mostra uma estimativa de contraste entre as cores escolhidas e também pode gerar um QR code. Essa estimativa trata apenas as cores digitais, sem conhecer brilho, reflexos ou distância. O modo não agenda campanhas, não recebe atualizações de uma central, não confirma que a tela está ligada, não registra visualizações e não substitui sinalização de emergência.</p>

      <h2>Comece pela decisão do visitante</h2>
      <p>Escreva primeiro a ação: “Credenciamento no balcão à direita”, “Sala fechada até 14h” ou “Aponte a câmera para abrir o programa”. Acrescente somente o contexto necessário. Nome interno de equipe, slogan e decoração não devem competir com destino, horário ou restrição. Se há mais de uma etapa, distribua em telas ou materiais separados.</p>

      <h2>Prepare conteúdo e equipamento</h2>
      <ol>
        <li><strong>Confirme conteúdo e validade.</strong> Identifique quem aprova o texto, quando começa e quando deixa de valer. Horários e nomes devem ter uma fonte responsável.</li>
        <li><strong>Defina a distância de leitura.</strong> Monte o display no local e escolha tamanho pela posição mais distante esperada, sem encobrir margens.</li>
        <li><strong>Use contraste claro.</strong> Verifique texto e fundo com ferramenta de contraste quando forem cores personalizadas. Depois observe no painel real e sob a iluminação do evento.</li>
        <li><strong>Reduza elementos.</strong> Evite animações contínuas, linhas longas, letras inteiras em caixa alta e várias chamadas na mesma composição.</li>
        <li><strong>Configure o equipamento.</strong> Desative notificações dispensáveis, confirme cabos, energia, resolução, orientação e suspensão. Preserve controles exigidos pela equipe de TI.</li>
        <li><strong>Abra a página no display correto.</strong> Ative tela cheia e teste como sair dela. Reinicie uma vez para saber como recuperar a mensagem.</li>
        <li><strong>Prepare alternativa.</strong> Tenha placa impressa, arquivo local ou texto breve para substituir a tela se o navegador ou equipamento falhar.</li>
      </ol>

      <h2>Teste com público e espaço reais</h2>
      <p>Peça a alguém que não participou da criação para olhar a tela por poucos segundos e explicar o que deve fazer. Se a pessoa lê o título mas não encontra destino ou horário, reorganize a hierarquia. Faça o teste em diferentes ângulos, porque painéis, reflexos e objetos podem esconder informação. Critérios WCAG orientam contraste web; uma instalação depende ainda de distância, luminância, visão e obstáculos.</p>

      <p>Observe o fluxo. Uma mensagem compreendida mas colocada depois da bifurcação chega tarde. Uma tela na entrada pode precisar indicar direção antes que a fila se forme. Se o conteúdo muda durante o evento, defina uma pessoa para atualizar e outra para revisar. Registre o horário da troca fora da tela, em um procedimento operacional.</p>

      <h2>Erros comuns</h2>
      <ul>
        <li>copiar um cartaz inteiro para o monitor e reduzir a fonte até tudo caber;</li>
        <li>usar cores da marca com contraste insuficiente ou brilho desconfortável;</li>
        <li>deixar cursor, barra do navegador, notificações ou informações pessoais sobre a mensagem;</li>
        <li>confiar em uma única tela para comunicação urgente ou de segurança;</li>
        <li>manter um aviso vencido porque ninguém foi designado para encerrá-lo.</li>
      </ul>

      <h2>Limites operacionais</h2>
      <p>Displays comerciais e domésticos têm limites diferentes de ventilação, orientação, brilho e tempo de operação; siga o manual do modelo. O MonitorSmith não gerencia temperatura, energia ou integridade do painel. Para vários locais, conteúdo regulamentado, evacuação, transporte, atendimento acessível ou serviço contínuo, use processos e sistemas projetados para esses requisitos. A página atende uma mensagem simples, supervisionada e com alternativa definida.</p>
    `,
  },
  {
    slug: 'qr-code-tela-cheia-eventos',
    toolId: 'fullscreen-message',
    title: 'QR code em tela: como preparar e testar no local',
    h1: 'Como exibir um QR code em tela cheia com destino e contexto',
    description: 'Monte um QR code com URL reconhecível, margem, contraste e alternativa em texto; teste aparelhos, distâncias e segurança antes do evento.',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    relatedSlugs: ['sinalizacao-digital-eventos', 'vitrine-digital-lojas-estandes'],
    faq: [
      ['Por que projetar QR Codes em tela cheia durante apresentações?', 'Isso reduz a digitação manual e permite que várias pessoas tentem abrir o mesmo destino. O endereço também deve aparecer em texto para quem não puder usar a câmera.'],
      ['O que é a correção de erro Reed-Solomon em QR Codes?', 'É um mecanismo de redundância que tolera parte dos módulos ausentes ou corrompidos. Ele não garante leitura quando há reflexo, distância, foco ou obstrução excessivos.'],
      ['Qual tamanho usar na projeção?', 'Escolha uma tela e um layout que apresentem o código maior, com a margem livre preservada, e teste celulares diferentes no ponto mais distante. A interface não oferece controle manual do tamanho e nenhum percentual garante foco em toda câmera e ambiente.'],
    ],
    sources: [
      { label: 'DENSO WAVE — Error Correction Feature', url: 'https://www.qrcode.com/en/about/error_correction.html', note: 'Explica níveis de correção de erro do QR Code e a troca entre recuperação e capacidade.' },
      { label: 'DENSO WAVE — Point for setting the module size', url: 'https://www.qrcode.com/en/howto/code.html/index.html', note: 'Orienta sobre tamanho dos módulos e margem livre ao redor do símbolo.' },
      { label: 'qrcode.react — propriedades de geração', url: 'https://github.com/zpao/qrcode.react#available-props', note: 'Documenta o nível mínimo de correção, a elevação automática quando há capacidade e o tamanho da margem configurável usados pelo componente.' },
      { label: 'Federal Trade Commission — Scammers hide harmful links in QR codes', url: 'https://consumer.ftc.gov/consumer-alerts/2023/12/scammers-hide-harmful-links-qr-codes-steal-your-information', note: 'Alerta para destinos maliciosos e para a verificação do endereço antes de abrir um QR code.' },
    ],
    body: `
      <p>Um QR code em tela funciona quando a câmera consegue separar seus módulos, reconhecer a margem e interpretar um conteúdo que permanece válido. A composição precisa dizer também o que será aberto e oferecer um caminho alternativo. Mostrar apenas um quadrado sem domínio, ação ou contexto obriga o visitante a confiar em um destino invisível e dificulta a recuperação quando a leitura falha.</p>

      <p>O modo Mensagem do MonitorSmith gera uma representação visual a partir do texto ou URL fornecida e a exibe no navegador. O campo aceita no máximo 1.024 caracteres, mas esse teto não garante que toda entrada caiba num QR code: a capacidade efetiva depende dos bytes, do modo de codificação e da correção de erro, e um conteúdo longo pode ser recusado. Confira a prévia antes de publicar. A ferramenta não hospeda a página de destino, não encurta o endereço, não verifica malware nem mede a taxa de leitura. Se o endereço muda ou expira, o código continua apontando para o valor antigo.</p>

      <h2>Prepare primeiro o destino</h2>
      <p>Use HTTPS e um domínio que o público possa reconhecer. Abra o endereço em janela privada e conexão diferente para identificar login obrigatório, permissão negada, redirecionamento inesperado ou página pesada. Confirme título, idioma, formulário, consentimento e mensagem após envio. Se usar um redirecionador sob seu controle, documente quem pode alterá-lo e por quanto tempo ele será mantido.</p>

      <h2>Crie e teste o código</h2>
      <ol>
        <li><strong>Copie o endereço final.</strong> Remova parâmetros desnecessários e confirme que não há espaço, quebra de linha ou erro de digitação.</li>
        <li><strong>Gere o código.</strong> Cole o valor no modo Mensagem. Quanto mais dados houver, mais denso pode ficar o símbolo; uma URL curta e estável facilita a apresentação.</li>
        <li><strong>Preserve a margem.</strong> Reserve uma zona clara equivalente a quatro módulos em todos os lados. Não invada essa área com texto, borda, logo ou decoração.</li>
        <li><strong>Use contraste simples.</strong> Prefira código escuro sobre fundo claro. Transparência, gradiente e inversão podem falhar em leitores ou condições específicas.</li>
        <li><strong>Mostre contexto e alternativa.</strong> Escreva ação, domínio e uma URL curta legível. Explique se haverá cadastro, download ou pedido de permissão.</li>
        <li><strong>Teste no display final.</strong> Use aparelhos e aplicativos diferentes, com brilho e iluminação do evento. Leia de perto, da distância prevista e em ângulos laterais.</li>
        <li><strong>Repita após mudanças.</strong> Alteração no conteúdo, escala, navegador, monitor, URL ou posição exige novo teste.</li>
      </ol>

      <h2>Interprete as falhas</h2>
      <p>Se funciona de perto e falha longe, reduza a quantidade de dados ou use uma tela e um layout que o apresentem maior; a interface não possui ajuste manual de tamanho. Se falha sob luz forte, mude a posição, controle reflexos e revise brilho e contraste. Se apenas um aparelho falha, compare câmera e aplicativo, mas não descarte o problema: o público pode usar combinação semelhante. Se todos reconhecem o código e não chegam ao conteúdo, investigue rede, certificado, redirecionamento e disponibilidade do destino.</p>

      <p>Correção de erro permite recuperar parte de um símbolo danificado, com custo de capacidade, mas não torna seguro cobrir o centro com logo ou ignorar a margem. O componente solicita pelo menos o nível M; a biblioteca pode elevar esse nível quando houver capacidade na mesma versão do símbolo. Mantenha a área desobstruída e valide no tamanho final. O MonitorSmith não fornece certificação de conformidade do código.</p>

      <h2>Segurança e erros comuns</h2>
      <ul>
        <li>exibir um QR code sem indicar domínio ou finalidade;</li>
        <li>apontar diretamente para pagamento, instalação ou coleta sensível sem contexto e confirmação;</li>
        <li>usar URL temporária, privada ou ligada à conta de quem montou o evento;</li>
        <li>decorar, recortar ou sobrepor o símbolo sem testar cada leitor relevante;</li>
        <li>supor que sucesso em um telefone, a poucos centímetros, representa a experiência do público.</li>
      </ul>

      <h2>Limites e operação</h2>
      <p>QR code não atende quem está sem câmera, sem rede, com dificuldade visual ou sem confiança para abrir o link. Ofereça orientação humana ou endereço digitável. Para credenciais, pagamentos ou dados pessoais, use domínio verificável, informe o tratamento de dados e evite coletar além do necessário. Durante o evento, uma pessoa deve conferir periodicamente tela e destino. O MonitorSmith apresenta o código; disponibilidade, segurança, privacidade e manutenção da página continuam sob responsabilidade de quem publica.</p>
    `,
  },
  {
    slug: 'logos-patrocinadores-eventos',
    toolId: 'sponsor-loop',
    title: 'Loop de logos de patrocinadores: preparação e captura',
    h1: 'Como organizar um loop de logos para evento ou transmissão',
    description: 'Prepare arquivos autorizados, defina ordem e duração, teste o loop no display final e escolha uma captura adequada no software de transmissão.',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    relatedSlugs: ['sinalizacao-digital-eventos', 'vitrine-digital-lojas-estandes'],
    faq: [
      ['Qual o tempo ideal de exibição por patrocinador em um loop?', 'Não existe intervalo universal. A duração deve permitir reconhecer a arte na distância real e respeitar o plano aprovado para o evento. Observe um ciclo completo antes de publicar.'],
      ['Como integrar o carrossel de logos em transmissões do OBS Studio?', 'Configure o loop em uma janela e teste a captura de janela ou de tela no OBS. A fonte Navegador usa outro contexto e pode não compartilhar os mesmos arquivos locais.'],
      ['Como reduzir conteúdo estático em monitores de estande?', 'Alterne artes, use brilho moderado e siga as proteções do fabricante. O deslocamento da ferramenta muda a posição, mas não garante prevenção de retenção ou burn-in.'],
    ],
    sources: [
      { label: 'OBS Studio — Window Capture Sources', url: 'https://obsproject.com/kb/window-capture-sources', note: 'Documenta a captura de uma janela específica e opções que variam entre sistemas.' },
      { label: 'OBS Studio — Browser Source', url: 'https://obsproject.com/kb/browser-source', note: 'Explica que a fonte Navegador renderiza uma página dentro do OBS e possui configuração própria.' },
      { label: 'OBS Studio — Quick Start Guide', url: 'https://obsproject.com/kb/quick-start-guide', note: 'Recomenda configurar fontes e realizar um teste antes de transmitir ou gravar.' },
    ],
    body: `
      <p>Um loop de patrocinadores organiza imagens em sequência repetida para uma tela de evento ou cena de transmissão. Ele não prova entrega contratual apenas por estar aberto. Antes de montar o carrossel, confirme quais marcas podem aparecer, por quanto tempo, em que ordem e com quais regras de proporção, fundo e associação. Guarde a aprovação e a versão recebida de cada arquivo.</p>

      <p>O Loop de Marcas do MonitorSmith recebe PNG, JPEG ou WebP e apresenta os arquivos em tela cheia. A implementação atual aceita até 15 imagens, limita cada arquivo a 5 MB e também limita o conjunto a 5 MB. Ela não baixa kits de marca, não verifica direitos de uso, não corrige logo inadequado, não transmite vídeo, não envia NDI ou RTMP e não registra impressões. Os arquivos precisam estar disponíveis no contexto usado para exibição.</p>

      <h2>Prepare os arquivos antes do ensaio</h2>
      <p>Solicite versões oficiais e confirme se o fundo deve ser claro, escuro ou transparente. Não estique nem redesenhe a marca para ocupar toda a tela. Logos horizontais, verticais e quadrados precisam de margens que produzam presença visual equilibrada; igualdade de largura não significa igualdade percebida. Se o contrato define tamanho ou duração, siga essa especificação e registre a configuração.</p>

      <h2>Monte uma sequência reproduzível</h2>
      <ol>
        <li><strong>Faça um inventário.</strong> Liste organização, nome do arquivo, versão, responsável pela aprovação e qualquer condição de exibição.</li>
        <li><strong>Revise cada imagem.</strong> Abra em fundo claro e escuro, observe recortes, transparência, bordas, resolução e texto pequeno. Corrija o arquivo-fonte somente com autorização.</li>
        <li><strong>Carregue uma cópia no loop.</strong> Adicione os arquivos na ordem do plano. Se precisar mudar a sequência, remova e importe novamente na ordem correta. Evite artes antigas e novas com nomes indistinguíveis.</li>
        <li><strong>Defina duração e transição.</strong> Use tempo suficiente para reconhecer a marca sem tornar a sequência parada. Faça a escolha no display e no ritmo reais.</li>
        <li><strong>Observe ciclos completos.</strong> Confira início, última imagem, retorno à primeira, enquadramento e ausência de tela vazia.</li>
        <li><strong>Teste interrupções.</strong> Saia e volte da tela cheia, minimize a janela e reinicie o navegador. Saiba reconstruir a lista se o armazenamento local não estiver disponível.</li>
        <li><strong>Salve um pacote operacional.</strong> Mantenha arquivos aprovados, ordem e instruções em pasta acessível à equipe autorizada.</li>
      </ol>

      <h2>Teste a captura no OBS Studio</h2>
      <p>Uma abordagem é abrir e configurar o loop em uma janela comum e adicioná-la como fonte de captura de janela. Recorte apenas o necessário e confira resolução, cursor, bordas e aceleração gráfica no sistema final. A fonte Navegador do OBS carrega uma página dentro do próprio ambiente; não conte com o mesmo armazenamento local ou com imagens selecionadas em outro navegador. Se optar por essa fonte, reconstrua e valide todo o fluxo nela.</p>

      <p>Grave uma amostra com pelo menos um ciclo completo e assista ao arquivo. Verifique transições, continuidade quando a janela perde foco e tamanho na cena. Depois teste troca de cena e recuperação após fechar a fonte. A gravação confirma o caminho técnico naquele equipamento; ela não substitui relatório de veiculação combinado com o patrocinador.</p>

      <h2>Erros comuns</h2>
      <ul>
        <li>usar logos encontrados em busca de imagens sem confirmar versão e autorização;</li>
        <li>deformar proporção, remover área de proteção ou aplicar fundo não permitido;</li>
        <li>presumir que armazenamento de uma janela será compartilhado com a fonte Navegador do OBS;</li>
        <li>começar a transmissão sem assistir a um ciclo gravado;</li>
        <li>deixar arquivos pessoais, nomes sensíveis ou outras janelas visíveis na captura;</li>
        <li>prometer número de exibições que a ferramenta não mede.</li>
      </ul>

      <h2>Limites e responsabilidade</h2>
      <p>O loop é uma superfície de apresentação supervisionada. Campanhas com obrigação de auditoria precisam de registro, relógio confiável e método aceito pelas partes. Transmissões exigem plano de contingência para perda da fonte, atualização do navegador ou reinício. O MonitorSmith não concede licença sobre marcas, não confirma acessibilidade nem garante operação contínua. A equipe deve manter arquivos aprovados e uma cena ou arte de reserva.</p>
    `,
  },
  {
    slug: 'vitrine-digital-lojas-estandes',
    toolId: 'sponsor-loop',
    title: 'Vitrine digital com monitor: conteúdo, instalação e rotina',
    h1: 'Como montar uma vitrine digital simples em loja ou estande',
    description: 'Planeje uma sequência curta de imagens, confira preços e validade, instale o monitor com segurança e defina uma rotina de operação.',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    relatedSlugs: ['logos-patrocinadores-eventos', 'sinalizacao-digital-eventos'],
    faq: [
      ['Quais as vantagens de vitrines digitais?', 'Elas permitem trocar artes sem reimpressão. O efeito depende de local, conteúdo, público e operação; o MonitorSmith não mede visualizações, vendas ou conversões.'],
      ['É possível usar monitores e TVs comuns?', 'Pode funcionar em ambiente interno, desde que o fabricante permita a duração, orientação e brilho previstos. Avalie ventilação, energia, segurança e manutenção.'],
      ['Como evitar que o sistema operacional exiba barras e notificações na vitrine?', 'Ative tela cheia, configure notificações e teste reinício, bloqueio e atualização no equipamento final. A página não impede avisos ou caixas do próprio sistema.'],
    ],
    sources: [
      { label: 'Samsung Business — DM Series Digital Signage Support', url: 'https://www.samsung.com/us/business/support/owners/product/dm-series-digital-signage-dm75e/', note: 'Oferece manuais e suporte de um display comercial, úteis para verificar instalação e limites específicos do equipamento.' },
      { label: 'U.S. Department of Energy — Purchasing Energy-Efficient Displays and Monitors', url: 'https://www.energy.gov/cmei/femp/purchasing-energy-efficient-displays-and-monitors', note: 'Orienta sobre eficiência energética, gerenciamento de energia e desligamento de displays.' },
      { label: 'W3C — Web Content Accessibility Guidelines 2.2', url: 'https://www.w3.org/TR/WCAG22/', note: 'Fornece critérios de contraste e apresentação de conteúdo web usados como referência inicial para as artes.' },
    ],
    body: `
      <p>Uma vitrine digital simples é um monitor que apresenta uma sequência curta de informações visuais em um ponto de venda ou estande. Ela precisa responder rapidamente a três perguntas: o que está sendo oferecido, para quem e qual é o próximo passo. A tela não compensa preço vencido, imagem ilegível ou instalação insegura. Conteúdo, operação e equipamento precisam ter responsáveis definidos.</p>

      <p>O Loop de Marcas do MonitorSmith exibe imagens locais em rotação dentro do navegador. Ele pode servir a uma vitrine pequena e supervisionada. Não é um sistema de gestão de conteúdo: não agenda início e fim, não atualiza uma rede de lojas, não consulta estoque ou preço, não gera comprovante de exibição e não monitora se o display está ligado. Mudanças precisam ser aplicadas e conferidas no equipamento.</p>

      <h2>Planeje pela jornada no local</h2>
      <p>Observe quanto tempo uma pessoa permanece no campo de visão e o que já sabe naquele ponto. Uma tela de passagem deve comunicar uma ideia com poucos elementos. Próximo ao atendimento, pode explicar etapas ou opções. Evite colocar em cada slide logo, slogan, tabela, regulamento e várias chamadas. Informações obrigatórias, condições e validade precisam permanecer legíveis ou estar disponíveis em suporte complementar.</p>

      <h2>Prepare conteúdo e instalação</h2>
      <ol>
        <li><strong>Defina objetivo e validade.</strong> Para cada arte, registre oferta, público, ação, início, término e pessoa que aprovou preço e condições.</li>
        <li><strong>Crie no formato do painel.</strong> Confirme orientação e resolução. Preserve margens, contraste e proporção; teste texto na distância real.</li>
        <li><strong>Reduza a sequência.</strong> Ordene por prioridade e remova duplicações. O visitante pode ver apenas parte do ciclo, então cada imagem deve fazer sentido sozinha.</li>
        <li><strong>Carregue cópias aprovadas.</strong> Use nomes de arquivo com data ou versão. Mantenha os originais fora do armazenamento do navegador.</li>
        <li><strong>Configure o loop.</strong> Ajuste duração e transição e observe vários ciclos. Confirme que não há recortes, quadro vazio ou conteúdo antigo.</li>
        <li><strong>Instale conforme o fabricante.</strong> Garanta base ou suporte compatível, ventilação, tomada e cabos protegidos. Verifique se o modelo aceita orientação e tempo previstos.</li>
        <li><strong>Prepare a abertura.</strong> Documente como ligar, abrir o navegador, restaurar a lista, entrar em tela cheia e remover notificações inadequadas.</li>
      </ol>

      <h2>Faça uma verificação diária</h2>
      <p>No início do período, confira data e hora, arte vigente, preço, disponibilidade, ordem, tela cheia e ausência de mensagens do sistema. Abra links ou QR codes em outro aparelho. Observe o display da posição do público, porque reflexos e brilho mudam ao longo do dia. No encerramento, desligue ou deixe o gerenciamento de energia atuar conforme a política local e as instruções do fabricante.</p>

      <p>Se as pessoas param mas fazem uma pergunta diferente da ação proposta, o conteúdo pode estar ambíguo. Se ninguém consegue ler antes de passar, reduza texto ou mude posição e duração. Essas observações ajudam a revisar a comunicação, mas não equivalem a uma métrica de conversão: o MonitorSmith não conta público, vendas ou interações.</p>

      <h2>Erros comuns</h2>
      <ul>
        <li>deixar promoção vencida porque a página não tem agendamento automático;</li>
        <li>usar fonte legível no computador de criação, mas pequena ou refletida na vitrine;</li>
        <li>operar display fora das condições de montagem, ventilação ou duração indicadas no manual;</li>
        <li>guardar a única cópia das artes no perfil do navegador;</li>
        <li>desativar atualizações e controles de segurança sem processo de manutenção;</li>
        <li>mostrar dados pessoais, área de trabalho ou notificações ao público.</li>
      </ul>

      <h2>Limites</h2>
      <p>Preço, publicidade, direitos de imagem, acessibilidade, segurança elétrica e proteção de dados obedecem às regras do local e da atividade. O MonitorSmith não valida essas obrigações. Operações com muitas telas, campanhas sincronizadas ou exigência de disponibilidade pedem gerenciamento remoto, logs, redundância e suporte. Para uma tela local, mantenha arte de reserva, instruções impressas e alguém responsável por retirar conteúdo incorreto imediatamente.</p>
    `,
  },
  {
    slug: 'guia-completo-monitorsmith',
    toolId: 'dead-pixel',
    title: 'Guia do MonitorSmith: como testar uma hipótese no navegador',
    h1: 'Guia do MonitorSmith: método, evidência e limites das ferramentas',
    description: 'Aprenda a formular uma pergunta, controlar variáveis, registrar observações e escolher uma verificação seguinte ao usar as 27 ferramentas.',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    relatedSlugs: ['tecnica-pomodoro-guia', 'relogio-digital-monitor-secundario', 'setup-dois-monitores-dicas'],
    faq: [
      ['O que é a suíte MonitorSmith?', 'É um conjunto de 27 utilitários web da EXVORN.TECH para inspeção visual, cálculo, teste de entradas, apoio de iluminação, tempo e apresentação. Eles operam dentro dos limites do navegador.'],
      ['As ferramentas funcionam offline?', 'Recursos já armazenados pelo service worker podem abrir sem conexão após um carregamento bem-sucedido. A primeira visita, atualizações, anúncios e recursos ainda não armazenados podem exigir rede.'],
      ['Os dados e imagens importados são enviados para algum servidor?', 'As ferramentas processam imagens, textos, temporizadores e sinais no navegador. Serviços de terceiros consentidos, como publicidade, podem fazer comunicações de rede conforme a política de privacidade.'],
    ],
    sources: [
      { label: 'WHATWG — Fullscreen API', url: 'https://fullscreen.spec.whatwg.org/', note: 'Define permissões e comportamento de tela cheia usados em vários modos visuais.' },
      { label: 'W3C — Web Audio API', url: 'https://www.w3.org/TR/webaudio-1.0/', note: 'Define recursos de geração e processamento de áudio disponíveis no navegador.' },
      { label: 'W3C — Media Capture and Streams', url: 'https://www.w3.org/TR/mediacapture-streams/', note: 'Define o acesso mediado por permissão a câmera e microfone.' },
      { label: 'W3C — Screen Capture', url: 'https://www.w3.org/TR/screen-capture/', note: 'Define seleção e captura de uma superfície de exibição com consentimento do usuário.' },
      { label: 'W3C — Service Workers', url: 'https://www.w3.org/TR/service-workers/', note: 'Define o mecanismo de cache e execução que pode apoiar uso offline após recursos serem obtidos.' },
    ],
    body: `
      <p>O MonitorSmith reúne 27 ferramentas que usam recursos do navegador para mostrar padrões, fazer cálculos, receber eventos de periféricos ou apresentar conteúdo. A escolha correta começa pela pergunta que você quer responder. “Quero calibrar o monitor” é amplo; “quero observar se um gradiente tem faixas visíveis” aponta para um teste específico. Nenhum modo transforma uma observação visual em laudo.</p>

      <p>O site renderiza cores e movimentos, calcula valores com dados informados e solicita permissões quando câmera, microfone ou captura exigem. Ele não acessa controles internos do painel, não mede luminância ou cor sem instrumento, não certifica taxa de atualização, não repara pixels e não substitui assistência técnica. Resultados dependem de navegador, sistema, escala, cabo, processamento, ambiente e percepção.</p>

      <h2>Defina uma hipótese observável</h2>
      <p>Comece descrevendo o sintoma sem atribuir uma causa: “há um ponto escuro em fundo branco”, “vejo faixas num gradiente” ou “a tecla não aparece no teste”. Registre onde ocorre, desde quando, em quais aplicativos e com quais configurações. Depois formule uma comparação que mude uma variável: outra cor, outro cabo, outra entrada, captura de tela ou segundo dispositivo.</p>

      <p>Essa separação evita conclusões apressadas. Uma captura vista corretamente em outro display sugere que o arquivo digital não contém o defeito observado, mas não identifica qual componente físico falhou. Uma foto também acrescenta foco, exposição, obturador e processamento. Preserve o original e descreva condições junto com qualquer imagem.</p>

      <h2>Escolha a família pela pergunta</h2>
      <p>Ferramentas de inspeção mostram preto, cores sólidas, gradientes, uniformidade e alvos móveis. Elas ajudam a localizar ou comparar uma aparência. Calculadoras usam resolução, diagonal, distância e outros valores fornecidos; entradas erradas geram resultados errados. Medidores baseados em animação e eventos descrevem o que o navegador observou, sem medir eletricamente painel ou conexão.</p>

      <p>Testes de teclado, mouse, controle e touchscreen confirmam eventos que chegaram à página. Áudio, microfone e webcam dependem de dispositivos selecionados e permissões do navegador e sistema. Modos de foco, relógio, mensagem e loop apresentam informação durante uma sessão local. Eles não são controle de ponto, relógio certificado, plataforma de sinalização ou comprovante de veiculação.</p>

      <p>Alguns limites são parte da implementação e devem entrar no plano. A mensagem aceita até 10.000 caracteres e o conteúdo do QR code, até 1.024. O loop aceita PNG, JPEG ou WebP, no máximo 15 imagens e 5 MB no conjunto. O Timer de Foco inclui presets de 5, 15, 25 e 50 minutos e também permite duração personalizada. Esses valores descrevem a interface atual; não são recomendações universais de conteúdo, exposição ou trabalho.</p>

      <h2>Execute um teste controlado</h2>
      <ol>
        <li><strong>Registre o contexto.</strong> Anote monitor, conexão, resolução, escala, taxa configurada, navegador, iluminação e processamento relevante.</li>
        <li><strong>Prepare uma referência.</strong> Use o mesmo padrão, distância e posição ao comparar configurações.</li>
        <li><strong>Altere uma variável.</strong> Mudar cabo, modo, brilho e escala ao mesmo tempo impede saber qual teve efeito.</li>
        <li><strong>Use tela cheia quando ajudar.</strong> Ela reduz elementos ao redor, mas não elimina processamento nem notificações do sistema.</li>
        <li><strong>Repita.</strong> Confira se a observação ocorre em cores, posições e aplicativos comparáveis.</li>
        <li><strong>Restaure.</strong> Volte brilho, energia, escala e conexão ao estado seguro; encerre permissões de mídia.</li>
      </ol>

      <h2>Interprete por camadas</h2>
      <p>Se um ponto permanece na mesma coordenada em todas as cores e não aparece em captura vista em outro aparelho, o painel merece verificação adicional. Se uma tecla não registra, confirme foco da janela, layout e atalhos reservados antes de suspeitar do hardware. Se um teste de quadros oscila, observe carga da CPU, visibilidade da aba e sincronização, além da taxa escolhida no sistema.</p>

      <p>Em áudio, comece baixo e não trate porcentagem de volume como decibéis. Em câmera e microfone, confira o indicador de captura e feche a sessão quando terminar. Em apresentação, teste reinício e mantenha arquivo de reserva. O cache pode permitir que recursos já obtidos abram sem rede, mas não presuma disponibilidade offline na primeira visita ou para destinos externos.</p>

      <h2>Registre o que pode ser revisado</h2>
      <p>Anote pergunta, configuração inicial, única mudança feita, observação e próximo passo. Evite registrar “monitor ruim”; prefira “faixa vertical visível em cinza médio, entrada HDMI, brilho X”. Quando possível, repita com outra pessoa sem dizer antecipadamente o resultado esperado. Isso não cria um teste laboratorial, mas reduz ambiguidade ao pedir suporte ou comparar configurações.</p>

      <h2>Erros comuns e próximos passos</h2>
      <ul>
        <li>chamar inspeção visual de calibração, diagnóstico ou laudo;</li>
        <li>comparar resultados com escala, navegador e iluminação diferentes;</li>
        <li>usar um único tempo exibido como especificação do hardware;</li>
        <li>conceder câmera ou microfone sem conferir a origem e esquecer a captura aberta;</li>
        <li>deixar cores estáticas e brilho alto por períodos prolongados;</li>
        <li>concluir que funcionamento offline está garantido sem carregar e testar os recursos.</li>
      </ul>

      <p>Use colorímetro para calibração mensurável, equipamento apropriado para sinal e latência, assistência para reparo, avaliação ergonômica para desconforto e plataforma dedicada para sinalização contínua. Preserve garantia e instruções do fabricante. O MonitorSmith serve para triagem, comparação e apresentação no navegador; seu valor está em tornar a observação mais clara e indicar qual verificação deve vir em seguida.</p>
    `,
  },
];

export default PRODUCTIVITY_ARTICLES.map((article) => {
  const expansion = PRODUCTIVITY_EXPANSIONS[article.slug];
  if (!expansion) throw new Error(`Expansão editorial ausente para ${article.slug}`);
  const finalSectionAt = article.body.lastIndexOf('\n      <h2>');
  if (finalSectionAt < 0) throw new Error(`Seção final ausente para ${article.slug}`);
  const body = `${article.body.slice(0, finalSectionAt)}${expansion}${article.body.slice(finalSectionAt)}`;
  return Object.freeze({ ...article, body });
});
