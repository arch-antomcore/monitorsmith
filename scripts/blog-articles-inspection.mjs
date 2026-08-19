export default [
  {
    slug: 'backlight-bleed-como-testar',
    title: 'Como Testar Backlight Bleed no Monitor | Guia Técnico',
    h1: 'O que é Backlight Bleed e Como Testar seu Monitor',
    description: 'Entenda a física do Backlight Bleed (vazamento de luz), como testar seu monitor LCD/IPS em ambiente controlado e quando o comportamento é considerado vício de fabricação.',
    toolId: 'black',
    relatedSlugs: ['ips-glow-vs-backlight-bleed', 'como-testar-monitor-oled', 'testar-monitor-olx-mercado-livre'],
    faq: [
      ['O que causa o backlight bleed no nível estrutural?', 'Ocorre quando a pressão mecânica da moldura (bezel) ou o desalinhamento dos difusores ópticos permite que a luz da unidade de retroiluminação (BLU) escape pelas extremidades do painel.'],
      ['Backlight bleed tem conserto via software ou firmware?', 'Não. É uma limitação puramente mecânica e estrutural da montagem do display. Se o vazamento for excessivo e invadir a área central de visão, a solução é solicitar a troca do equipamento.'],
      ['Como diferenciar Backlight Bleed de IPS Glow?', 'O IPS Glow altera sua intensidade e posição conforme o ângulo de visão do observador muda. O Backlight Bleed permanece fixo nas bordas, independente de como você se movimenta.']
    ],
    body: `
      <h2>A Física do Vazamento de Luz (Backlight Bleed)</h2>
      <p>Em painéis de cristal líquido (LCD — incluindo variantes IPS, VA e TN), a imagem não é autoemissiva. O display depende de uma <strong>Unidade de Luz de Fundo (Backlight Unit - BLU)</strong>, geralmente composta por fitas de LEDs brancos posicionadas nas bordas (Edge-lit) ou distribuídas em uma matriz traseira (Direct-lit).</p>
      
      <p>Para formar a imagem, a luz emitida pela BLU passa por múltiplas camadas ópticas: guias de luz (LGP), folhas difusoras, prismas de incremento de brilho (BEF) e polarizadores, até atingir a camada de cristal líquido TFT. Quando há tolerâncias mecânicas imperfeitas na moldura, parafusos com torque excessivo ou empenamento do chassi, as camadas ópticas sofrem microdeformações. Isso permite que feixes de luz escapem desobstruídos pelas bordas, criando manchas luminosas estáticas sobre fundos escuros.</p>

      <h2>Protocolo de Teste em Ambiente Controlado</h2>
      <p>Para diagnosticar a severidade do vazamento de luz sem incorrer em falsos positivos gerados por reflexos ou superexposição de câmeras, siga este procedimento de inspeção:</p>
      
      <ol>
        <li><strong>Controle de Iluminação Ambiente:</strong> Reduza a luz da sala para 0,5 a 2 lux (ambiente escurecido, mas sem escuridão absoluta que induza fadiga pupilar).</li>
        <li><strong>Ajuste de Luminância Operacional:</strong> Configure o brilho do monitor para um nível realista de uso contínuo (geralmente entre 100 e 140 cd/m², equivalente a 25%–40% na maioria dos monitores de 300–400 nits). Testar com brilho em 100% no escuro total distorce a avaliação prática.</li>
        <li><strong>Superfície de Teste em Tela Cheia:</strong> Abra a ferramenta de tela preta absoluta em modo tela cheia (F11) para preencher todos os pixels com o valor digital RGB (0, 0, 0).</li>
        <li><strong>Verificação Angular:</strong> Posicione-se a uma distância equivalente a 1,5 vez a largura da tela (cerca de 80 a 100 cm). Mova a cabeça 30 graus para os lados: manchas que permanecerem fixas nas extremidades da moldura são vazamentos de luz (bleed).</li>
      </ol>

      <p><a class="cta" href="/?tool=black">Abrir Tela Preta de Inspeção no MonitorSmith →</a></p>

      <h2>Critérios de Troca e Direitos do Consumidor</h2>
      <p>Pequenas variações de uniformidade nas bordas são intrínsecas a displays Edge-lit de consumo. No entanto, o vazamento configura vício de qualidade quando invade a área de trabalho ativa (relação de aspecto 16:9), altera a renderização de cenas escuras em edição ou apresenta desvio cromático amarelado/azulado severo.</p>
      <p>No Brasil, compras realizadas fora do estabelecimento comercial (internet ou telefone) garantem o <strong>direito de arrependimento em até 7 dias corridos</strong> após o recebimento (Art. 49 do Código de Defesa do Consumidor), permitindo a devolução sem necessidade de perícia técnica.</p>
    `
  },
  {
    slug: 'ips-glow-vs-backlight-bleed',
    title: 'IPS Glow vs Backlight Bleed: Diferenças Técnicas e Diagnóstico',
    h1: 'IPS Glow vs Backlight Bleed: Como Diferenciar',
    description: 'Compreenda a diferença óptica entre a birrefringência dos cristais IPS (IPS Glow) e falhas de montagem mecânica (Backlight Bleed).',
    toolId: 'black',
    relatedSlugs: ['backlight-bleed-como-testar', 'politica-dead-pixel-fabricantes', 'o-que-sao-dead-pixels'],
    faq: [
      ['O que é IPS Glow?', 'É um brilho característico dos painéis In-Plane Switching causado pela refração da luz polarizada através dos cristais líquidos inclinados quando observados em ângulos não-perpendiculares.'],
      ['O IPS Glow é coberto por garantia de fábrica?', 'Não. Fabricantes consideram o IPS Glow uma característica óptica inerente à tecnologia IPS. Apenas o vazamento mecânico excessivo (Backlight Bleed) é elegível para reparo.'],
      ['Como mitigar a percepção do IPS Glow no setup?', 'Aumentar a distância de visão (mínimo de 70-80 cm), posicionar o monitor na altura dos olhos e adicionar iluminação indireta atrás do monitor (bias lighting) reduz substancialmente o contraste percebido do glow.']
    ],
    body: `
      <h2>A Natureza Óptica do IPS Glow</h2>
      <p>Os painéis IPS (In-Plane Switching) são amplamente adotados em monitores profissionais e gamers devido à fidelidade cromática superior e estabilidade de ângulo de visão. Entretanto, a arquitetura onde os cristais líquidos giram paralelamente ao substrato de vidro apresenta uma limitação óptica conhecida: a <strong>birrefringência residual</strong>.</p>
      
      <p>Quando a tela exibe tons escuros, os cristais bloqueiam a maior parte da luz polarizada na perpendicular. Porém, para os cantos da tela — que o olho do usuário enxerga em um ângulo oblíquo —, a luz escapa com leve desvio espectral, produzindo um halo acinzentado, prateado ou alaranjado denominado <em>IPS Glow</em>.</p>

      <h2>Tabela Comparativa: IPS Glow vs. Backlight Bleed</h2>
      <p>Identificar corretamente o fenômeno evita pedidos de suporte desnecessários e direciona reclamações fundamentadas:</p>

      <ul>
        <li><strong>Origem Física:</strong> IPS Glow é um comportamento óptico-angular dos cristais; Backlight Bleed é uma fresta mecânica na vedação do chassi.</li>
        <li><strong>Comportamento com Movimento:</strong> O IPS Glow desloca-se e desaparece quando você olha diretamente para o canto afetado; o Backlight Bleed permanece exatamente no mesmo ponto e com a mesma intensidade.</li>
        <li><strong>Sensibilidade à Distância:</strong> Afastar-se do monitor reduz o IPS Glow porque os ângulos de visão nos cantos tornam-se mais fechados (próximos a 90°); o Bleed não se altera com a distância.</li>
        <li><strong>Cobertura de RMA:</strong> O Glow não é defeito coberto; o Bleed grave com invasão de área útil é passível de troca.</li>
      </ul>

      <h2>O Erro Comum das Fotografias com Smartphone</h2>
      <p>Smartphones modernos utilizam algoritmos de fotografia computacional com modo noturno e longa exposição. Ao fotografar uma tela preta no escuro, o sensor do celular amplifica a luz residual em 10x a 20x, transformando um leve IPS Glow padrão em uma mancha esbranquiçada gritante na foto.</p>
      <p>Para registrar evidências técnicas válidas para fabricantes, utilize o modo manual (Pro) da câmera, fixando ISO em 100–200, balanço de branco em 6500K e tempo de exposição correspondente à percepção real do olho humano.</p>

      <p><a class="cta" href="/?tool=black">Testar Comportamento Angular no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'como-testar-monitor-oled',
    title: 'Como Testar Monitor OLED Antes de Comprar | Guia Definitivo',
    h1: 'Guia: Como Testar um Monitor OLED (Novos e Usados)',
    description: 'Aprenda a inspecionar painéis WOLED e QD-OLED: detecção de retenção permanente (burn-in), uniformidade em 5% cinza e integridade de subpixels.',
    toolId: 'black',
    relatedSlugs: ['tela-preta-descanso-monitor', 'o-que-sao-dead-pixels', 'testar-monitor-olx-mercado-livre'],
    faq: [
      ['O que testar primeiro em um monitor OLED usado?', 'Exiba telas cheias em cores primárias (especialmente Vermelho e Magenta) e cinza a 5% de luminância para verificar retenção de logos, barras de tarefas e uniformidade de substrato.'],
      ['Monitores OLED sofrem de vazamento de luz?', 'Não. Como cada pixel é um diodo orgânico individual que se desliga por completo em preto (#000000), o contraste estático é infinito e não há backlight unit.'],
      ['O que é o teste de 5% de cinza?', 'É o teste mais rigoroso para avaliar a uniformidade de condução elétrica do painel OLED (TFT backplane), revelando faixas verticais (banding) em baixas tensões.']
    ],
    body: `
      <h2>A Arquitetura OLED e Seus Pontos Críticos</h2>
      <p>Displays OLED (Organic Light-Emitting Diode), incluindo tecnologias <strong>WOLED (LG Display)</strong> e <strong>QD-OLED (Samsung Display)</strong>, representam o ápice da qualidade de imagem contemporânea. Com tempos de resposta de transição de pixel inferiores a 0,03 ms e nível de preto absoluto de 0,000 cd/m², eliminam problemas clássicos de LCDs como backlight bleed e tempos de resposta lentos.</p>
      
      <p>No entanto, a natureza orgânica dos materiais emissores introduz vulnerabilidades específicas, principalmente o envelhecimento cumulativo diferencial dos subpixels (comumente chamado de <em>burn-in</em>) e a sensibilidade de uniformidade em baixos níveis de cinza.</p>

      <h2>Checklist Técnico de Inspeção de OLED</h2>

      <h3>1. Mapeamento de Retenção de Imagem (Burn-in)</h3>
      <p>Os compostos emissores azuis e vermelhos degradam em taxas diferentes dependendo da densidade de corrente. Para verificar se há queima de elementos estáticos (como HUDs de jogos ou barras de menu):</p>
      <ul>
        <li>Exiba um campo sólido <strong>Vermelho 100%</strong>: procure contornos escuros onde ficavam ícones de alta luminosidade.</li>
        <li>Exiba um campo sólido <strong>Magenta</strong> e <strong>Amarelo</strong>: isola o desgaste nos subpixels secundários.</li>
        <li>Exiba um campo <strong>Cinza 50%</strong>: verifica a homogeneidade geral de desgaste da matriz emissiva.</li>
      </ul>

      <h3>2. Uniformidade em Baixas Luzes (5% Near-Black)</h3>
      <p>Em tensões elétricas muito baixas, os transistores do backplane de um painel OLED podem apresentar microvariações de condução. Exibir uma tela com 5% de cinza em ambiente escuro permite identificar o chamado <em>vertical banding</em> (linhas verticais sutis). Em painéis novos, essa irregularidade costuma estabilizar após os primeiros ciclos automáticos de compensação (Pixel Clean / Compensation Cycle).</p>

      <p><a class="cta" href="/?tool=black">Executar Ciclo de Inspeção no MonitorSmith →</a></p>

      <h2>Verificação de Ciclos de Limpeza no Menu OSD</h2>
      <p>Ao negociar um monitor OLED usado, acesse o menu de serviço ou de suporte do monitor e confira o <strong>contador de horas de operação</strong> e o total de <strong>ciclos de Pixel Refresh</strong> executados. Painéis mantidos com as rotinas de proteção de fábrica ativas têm vida útil amplamente estendida.</p>
    `
  },
  {
    slug: 'tela-preta-descanso-monitor',
    title: 'Tela Preta: Proteção e Descanso para seu Monitor',
    h1: 'Tela Preta: Proteção do Painel, Eficiência e Conforto Visual',
    description: 'Entenda os impactos de utilizar uma tela preta em tela cheia na conservação de diodos OLED, redução de consumo elétrico e alívio da fadiga visual.',
    toolId: 'black',
    relatedSlugs: ['como-testar-monitor-oled', 'manchas-no-monitor-causas', 'como-limpar-monitor-sem-danificar'],
    faq: [
      ['Tela preta economiza energia em qualquer monitor?', 'A economia real ocorre em displays OLED e painéis LCD com MiniLED (Local Dimming ativo), onde os LEDs são fisicamente desligados. Em LCDs convencionais Edge-lit, a lâmpada de fundo permanece acesa com consumo similar.'],
      ['Usar tela preta reduz o risco de burn-in em OLEDs?', 'Sim. Em preto absoluto (#000000), os diodos orgânicos não conduzem corrente elétrica, cessando o desgaste térmico e acumulativo dos subpixels.'],
      ['Como a tela preta auxilia na ergonomia visual?', 'Em setups com múltiplos monitores, cobrir telas secundárias ociosas com preto absoluto elimina fontes periféricas de luz direta, reduzindo a contração contínua da pupila.']
    ],
    body: `
      <h2>O Papel da Tela Preta na Conservação de Displays</h2>
      <p>O uso de fundos escuros em estações de trabalho não é apenas uma escolha estética, mas uma estratégia fundamentada na física dos semicondutores e na ergonomia visual. Diferentes tecnologias de display respondem de maneira distinta à exibição de preto puro:</p>

      <ul>
        <li><strong>Telas OLED / QD-OLED:</strong> O sinal digital nulo (0, 0, 0) desliga os transistores dos diodos emissores. O consumo de energia do painel cai para próximo de zero watt na matriz, e a temperatura de operação diminui, pausando o envelhecimento dos materiais orgânicos.</li>
        <li><strong>Telas LCD MiniLED:</strong> O controlador de Local Dimming desativa os clusters de iluminação traseira nas zonas pretas, eliminando a emissão de fótons e o calor residual.</li>
        <li><strong>Telas LCD IPS/VA Convencionais:</strong> Os cristais líquidos giram para bloquear a passagem de luz da backlight unit contínua. Embora não haja desligamento físico dos LEDs, reduz-se o brilho geral que atinge o campo visual do usuário.</li>
      </ul>

      <h2>Ergonomia e Redução da Fadiga Ocular Digital (CVS)</h2>
      <p>A Síndrome da Visão de Computador (Computer Vision Syndrome) é agravada por contrastes excessivos no campo de visão periférico. Quando um profissional utiliza duas ou três telas, manter monitores secundários exibindo fundos brancos vazios ou documentos estáticos enquanto foca na tela primária força a musculatura ciliar a um esforço compensatório contínuo.</p>
      <p>Colocar a tela secundária em descanso preto imediato equaliza a distribuição de luminância do campo visual, permitindo maior foco na tarefa ativa sem a necessidade de desligar fisicamente o display e desconfigurar a disposição das janelas no sistema operacional.</p>

      <p><a class="cta" href="/?tool=black">Ativar Tela Preta de Descanso no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'o-que-sao-dead-pixels',
    title: 'O que São Dead Pixels: Guia Completo e Identificação',
    h1: 'O que São Dead Pixels e Como Identificar no seu Monitor',
    description: 'Compreenda a estrutura da matriz TFT, a diferença física entre pixels mortos, acesos e presos, e os métodos técnicos de verificação.',
    toolId: 'dead-pixel',
    relatedSlugs: ['pixel-morto-vs-pixel-preso', 'politica-dead-pixel-fabricantes', 'testar-monitor-olx-mercado-livre'],
    faq: [
      ['O que é um Dead Pixel?', 'É um ponto na matriz onde o transistor de controle falhou em estado inativo, impedindo a passagem de luz e resultando em um ponto preto permanente.'],
      ['Dead pixels se espalham pela tela?', 'Não. Cada pixel possui circuitos independentes no backplane TFT. Uma falha elétrica isolada não se propaga para pixels vizinhos, a menos que haja fissura física no vidro.'],
      ['É possível recuperar um pixel morto por software?', 'Não. Pixels mortos são danos físicos no semicondutor. Apenas subpixels travados em estado condutivo (stuck pixels) têm chance de recuperação com estímulos de ciclagem rápida de sinal.']
    ],
    body: `
      <h2>A Estrutura Microscópica de uma Matriz TFT</h2>
      <p>Um monitor moderno de resolução 1440p (2560x1440) contém 3,68 milhões de pixels; em resolução 4K (3840x2160), esse número sobe para 8,29 milhões. Como cada pixel é formado por três subpixels dedicados (Vermelho, Verde e Azul), a placa traseira do display abriga quase <strong>25 milhões de transistores microscópicos</strong> depositados sobre vidro.</p>
      
      <p>Durante a litografia do semicondutor, micropartículas de poeira ou variações térmicas mínimas podem inutilizar uma trilha elétrica individual. O resultado visual dessa anomalia depende do estado elétrico em que o circuito foi interrompido.</p>

      <h2>Classificação das Anomalias de Pixel</h2>
      <ul>
        <li><strong>Pixel Morto (Dead Pixel):</strong> Todos os 3 subpixels estão permanentemente desligados. Em matrizes normalmente pretas (IPS/VA), manifesta-se como um ponto escuro constante sobre qualquer fundo claro.</li>
        <li><strong>Subpixel Preso (Stuck Pixel):</strong> Um único transistor permanece travado em estado condutor (ligado). O ponto emite luz constante em vermelho, verde ou azul, tornando-se muito visível sobre fundos escuros ou pretos.</li>
        <li><strong>Pixel Quente (Hot Pixel):</strong> Os três subpixels estão energizados simultaneamente no valor máximo, gerando um ponto branco brilhante inalterável.</li>
      </ul>

      <h2>Metodologia de Detecção com Cores Primárias</h2>
      <p>Para mapear anomalias sem confundir com partículas de poeira superficial, o procedimento correto exige inspecionar a tela limpa através de uma sequência de 8 fundos sólidos: Vermelho, Verde, Azul, Ciano, Magenta, Amarelo, Branco e Preto.</p>

      <p><a class="cta" href="/?tool=dead-pixel">Iniciar Teste de 8 Cores no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'testar-monitor-olx-mercado-livre',
    title: 'Testar Monitor Usado no OLX e Mercado Livre | Checklist',
    h1: 'Como Testar Monitor Usado Antes de Comprar no OLX ou Mercado Livre',
    description: 'Checklist técnico para avaliar monitores de segunda mão: inspeção de portas de vídeo, teste de painel, tempo de resposta e integridade estrutural.',
    toolId: 'dead-pixel',
    relatedSlugs: ['como-testar-monitor-oled', 'o-que-sao-dead-pixels', 'manchas-no-monitor-causas'],
    faq: [
      ['Como testar um monitor com o vendedor presencialmente?', 'Conecte um notebook com bateria, teste todas as portas HDMI/DisplayPort na resolução e taxa de atualização nativas e execute um teste de cores sólidas em tela cheia.'],
      ['Como identificar arranhões no painel sem ligar a tela?', 'Aponte uma lanterna de LED em ângulo oblíquo contra a tela desligada. Isso revela riscos superficiais no filme antirreflexo que somem com o brilho da tela ligada.'],
      ['Quais os prazos de devolução no Mercado Livre?', 'O programa Compra Garantida permite devolução em até 30 dias corridos caso o produto apresente vícios ocultos ou divergências em relação ao anúncio.']
    ],
    body: `
      <h2>O Mercado de Monitores Seminovo: Riscos e Oportunidades</h2>
      <p>Adquirir monitores de alta gama no mercado secundário pode representar economia substancial. Contudo, ao contrário de componentes como memórias RAM ou CPUs (que geralmente funcionam em estado binário de integridade), displays eletrônicos acumulam desgastes graduais mecânicos, ópticos e térmicos.</p>

      <h2>Checklist Passo a Passo para Teste Presencial</h2>

      <h3>1. Inspeção Física com Luz Rasante</h3>
      <p>Com o monitor completamente desligado, aponte a lanterna do celular em um ângulo de 45 graus. Procure por microarranhões na camada polarizadora, marcas de pressão e descamações químicas decorrentes do uso de produtos de limpeza abrasivos.</p>

      <h3>2. Verificação de Portas e Largura de Banda</h3>
      <p>Conecte cabos em todas as entradas de vídeo disponíveis (DisplayPort 1.4, HDMI 2.0/2.1). Confirme nas configurações de exibição do sistema operacional se o monitor atinge a <strong>resolução nativa, a profundidade de cor (8-bit / 10-bit) e a taxa de atualização máxima (ex: 144Hz, 240Hz)</strong> sem apresentar oscilações de sinal (flicker) ou linhas pretas intermitentes.</p>

      <h3>3. Auditoria de Subpixels e Uniformidade</h3>
      <p>Abra o navegador no notebook conectado e carregue a suíte do MonitorSmith. Percorra a sequência de cores puras para identificar dead pixels e verifique a homogeneidade em tela preta para aferir vazamentos de luz anormais.</p>

      <p><a class="cta" href="/?tool=dead-pixel">Levar MonitorSmith para o Teste →</a></p>
    `
  },
  {
    slug: 'pixel-morto-vs-pixel-preso',
    title: 'Pixel Morto vs Pixel Preso: Entenda as Diferenças e Soluções',
    h1: 'Pixel Morto vs Pixel Preso: Diferenças Técnicas e Possibilidades de Reparo',
    description: 'Entenda os mecanismos de falha eletroeletrônica de subpixels presos e pixels mortos, e saiba quais abordagens práticas têm fundamentação real.',
    toolId: 'dead-pixel',
    relatedSlugs: ['o-que-sao-dead-pixels', 'politica-dead-pixel-fabricantes', 'testar-monitor-olx-mercado-livre'],
    faq: [
      ['Qual a diferença visual essencial entre eles?', 'O pixel morto é invariavelmente escuro em todas as cores de fundo. O subpixel preso brilha continuamente em vermelho, verde ou azul, destacando-se sobre fundos escuros.'],
      ['Softwares de flashing rápido realmente funcionam?', 'Em casos de subpixels presos por desalinhamento temporário de carga estática nos cristais, a ciclagem de sinal em alta frequência (JScreenFix / color cycling) pode destravar o subpixel.'],
      ['Aplicar pressão na tela com o dedo é seguro?', 'Não é recomendado por fabricantes. A pressão física pode danificar permanentemente as camadas polarizadoras e desalinhar difusores de luz adjacentes.']
    ],
    body: `
      <h2>Fundamentos da Comutação de Cristais Líquidos</h2>
      <p>Em um painel LCD, a passagem de luz é modulada pela rotação física das moléculas de cristal líquido em resposta a um campo elétrico gerado pelo transistor de filme fino. Quando esse mecanismo sofre uma avaria, duas condições distintas podem ocorrer:</p>

      <h3>1. O Pixel Morto (Circuito Aberto)</h3>
      <p>Ocorre quando a trilha semicondutora do transistor queima ou se desconecta permanentemente. Sem corrente, os cristais permanecem em sua posição de repouso (bloqueando a passagem de luz em painéis normalmente pretos). Não existe intervenção por software capaz de reestabelecer a continuidade física de uma trilha rompida.</p>

      <h3>2. O Subpixel Preso (Trava Eletrostática)</h3>
      <p>Neste caso, o transistor permanece ativo e conduzindo tensão para um subpixel individual, mantendo os cristais alinhados para passagem total de luz. Como a conexão elétrica existe, métodos de estimulação rápida de sinal que forçam mudanças instantâneas de tensão entre 0V e Vmax podem, em certos casos, reverter o estado do subpixel.</p>

      <p><a class="cta" href="/?tool=dead-pixel">Testar Subpixels no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'politica-dead-pixel-fabricantes',
    title: 'Políticas de Dead Pixel: Padrão ISO 9241-307 e Garantia de Fabricantes',
    h1: 'Quantos Dead Pixels São Aceitáveis? Normas ISO e Políticas de Garantia',
    description: 'Entenda a classificação internacional ISO 9241-307 para defeitos de pixel e como as políticas de garantia de marcas como Dell, LG, Samsung e Asus operam.',
    toolId: 'dead-pixel',
    relatedSlugs: ['o-que-sao-dead-pixels', 'pixel-morto-vs-pixel-preso', 'testar-monitor-olx-mercado-livre'],
    faq: [
      ['O que define a norma ISO 9241-307?', 'É o padrão internacional que rege requisitos ergonômicos e tolerâncias máximas de defeitos por milhão de pixels em displays eletrônicos.'],
      ['Qual a classe da maioria dos monitores de consumo?', 'A maioria dos monitores e notebooks de consumo é enquadrada na Classe II da ISO 9241-307, que admite até 2 pixels acesos, 2 pixels escuros e até 5 subpixels defeituosos por milhão de pixels.'],
      ['O Código de Defesa do Consumidor prevalece sobre a norma ISO no Brasil?', 'Sim. Jurisprudências brasileiras frequentemente determinam que o CDC protege o consumidor contra vícios de qualidade, independentemente de cláusulas restritivas em manuais de fábrica.']
    ],
    body: `
      <h2>A Norma Internacional ISO 9241-307</h2>
      <p>Para equacionar o rendimento industrial (yield) na fabricação de lâminas de vidro de grande escala sem encarecer excessivamente os produtos finais, a indústria de displays adota a <strong>Norma ISO 9241-307</strong> (que sucedeu a clássica ISO 13406-2). Essa norma categoriza os painéis em quatro classes de tolerância por milhão de pixels:</p>

      <ul>
        <li><strong>Classe 0 / I:</strong> Zero defeitos permitidos (padrão de monitores cirúrgicos, militares e linhas de altíssima precisão).</li>
        <li><strong>Classe II (Padrão de Mercado):</strong> Admite até 2 pixels sempre acesos (Tipo 1), até 2 pixels sempre apagados (Tipo 2) e até 5 subpixels com falha (Tipo 3) por milhão de pixels.</li>
        <li><strong>Classe III e IV:</strong> Níveis de tolerância mais amplos, utilizados em sinalização industrial e painéis de baixo custo.</li>
      </ul>

      <h2>Políticas Comerciais das Principais Marcas</h2>
      <p>Alguns fabricantes oferecem garantias que superam a exigência mínima da norma:</p>
      <ul>
        <li><strong>Dell (Garantia de Painel Premium):</strong> Substituição gratuita da tela durante o período de garantia caso seja identificado um único subpixel brilhante (hot/stuck pixel) nas linhas UltraSharp, Alienware e Série P.</li>
        <li><strong>Linhas Gamer com Política Zero Bright Dot (ZBD):</strong> Modelos premium da ASUS (ROG), Acer (Predator) e BenQ frequentemente oferecem prazos especiais com tolerância zero para pixels brilhantes nos primeiros meses.</li>
      </ul>

      <p><a class="cta" href="/?tool=dead-pixel">Mapear Pixels Defeituosos com o MonitorSmith →</a></p>
    `
  },
  {
    slug: 'como-limpar-monitor-sem-danificar',
    title: 'Como Limpar Monitor Sem Danificar a Tela | Guia Técnico',
    h1: 'Como Limpar seu Monitor Sem Danificar o Revestimento Antirreflexo',
    description: 'Guia técnico de higienização de displays: solventes permitidos, microfibras adequadas e técnicas seguras para evitar danos a revestimentos ópticos.',
    toolId: 'cleaner',
    relatedSlugs: ['guia-limpeza-lcd-oled-notebook', 'manchas-no-monitor-causas', 'como-testar-monitor-oled'],
    faq: [
      ['Posso usar álcool comum ou limpa-vidros na tela?', 'Nunca. Produtos com amônia, álcool etílico ou solventes dissolvem os polímeros das camadas antirreflexo (AG/AR) e polarizadoras, causando manchas opacas irreversíveis.'],
      ['Qual líquido é seguro para limpar monitores?', 'Água destilada ou desmineralizada é o padrão mais seguro. Para resíduos oleosos persistentes, soluções específicas para limpeza de telas sem álcool e sem amônia podem ser aplicadas.'],
      ['Por que não usar papel toalha ou guardanapos?', 'Papéis possuem fibras de celulose rígidas que causam microarranhões na camada superficial plástica do monitor ao longo do tempo.']
    ],
    body: `
      <h2>A Química dos Revestimentos de Superfície</h2>
      <p>A superfície visível de um monitor não é vidro comum. Trata-se de um conjunto de filmes poliméricos ultrafinos depositados sobre o painel:</p>
      <ul>
        <li><strong>Filmes Antirreflexo (Anti-Glare - AG):</strong> Microtexturas que dispersam a luz ambiente, reduzindo reflexos especulares.</li>
        <li><strong>Tratamentos Antirreflexo Multicamada (AR):</strong> Filmes de interferência óptica com índices de refração calculados com precisão nanométrica.</li>
        <li><strong>Camadas Oleofóbicas:</strong> Polímeros fluorados que reduzem a adesão de gordura dactilar.</li>
      </ul>

      <h2>Produtos Químicos Proibidos e Seus Efeitos</h2>
      <p>Substâncias alcalinas ou solventes polares agressivos como <strong>amônia (hidróxido de amônio), álcool etílico, acetona e tolueno</strong> quebram as ligações moleculares dos revestimentos, resultando em descamação, manchas leitosas permanentes (crazing) e perda de uniformidade de contraste.</p>

      <h2>Procedimento de Limpeza em 4 Etapas</h2>
      <ol>
        <li><strong>Desligamento e Resfriamento:</strong> Desligue o monitor da tomada. O painel frio evita a evaporação acelerada do líquido e facilita a visualização de resíduos sobre a superfície escura.</li>
        <li><strong>Despoeiramento Inicial:</strong> Remova partículas minerais soprando ou utilizando um pincel de cerdas macias antiestáticas para que poeiras duras não atuem como abrasivos durante a fricção.</li>
        <li><strong>Aplicação Indireta de Líquido:</strong> Umedeça levemente um pano de microfibra limpo (densidade ≥ 300 GSM) com água destilada. <strong>Nunca borrife líquido diretamente na tela</strong>, pois o excesso escorre para a moldura inferior, oxidando as conexões do controlador (TAB/COF).</li>
        <li><strong>Movimentos Lineares Suaves:</strong> Passe o pano com movimentos retilíneos sem aplicar pressão mecânica concentrada. Finalize com o lado seco da microfibra.</li>
      </ol>

      <p><a class="cta" href="/?tool=cleaner">Abrir Fundo de Inspeção no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'guia-limpeza-lcd-oled-notebook',
    title: 'Guia de Limpeza de Monitores: LCD, OLED e Telas de Notebook',
    h1: 'Guia de Limpeza Especializada para Displays LCD, OLED e Laptops',
    description: 'Cuidados específicos de manutenção para diferentes tecnologias de display: telas foscas de escritório, vidros de notebooks e painéis OLED.',
    toolId: 'cleaner',
    relatedSlugs: ['como-limpar-monitor-sem-danificar', 'manchas-no-monitor-causas', 'como-testar-monitor-oled'],
    faq: [
      ['Telas de notebook exigem cuidados adicionais?', 'Sim. Devido ao contato frequente com a gordura do teclado quando fechado e à espessura reduzida da tampa, a pressão de limpeza deve ser mínima para não marcar o cristal líquido.'],
      ['Como limpar telas OLED com acabamento brilhante (glossy)?', 'Utilize panos de microfibra de alta densidade sem costuras rígidas, pois acabamentos glossy evidenciam marcas de fricção com maior facilidade.'],
      ['Como evitar que o teclado marque a tela do notebook?', 'Utilize uma manta de microfibra fina de proteção sobre o teclado ao transportar o notebook dentro de mochilas ou capas.']
    ],
    body: `
      <h2>Particularidades Estruturais por Tipo de Equipamento</h2>
      <p>Diferentes categorias de dispositivos apresentam construções físicas distintas que exigem abordagens de higienização personalizadas:</p>

      <h3>Monitores Desktop com Acabamento Fosco (Matte)</h3>
      <p>A superfície microtexturizada retém poeira com maior facilidade nas microranhuras. A limpeza deve ser suave e periódica com microfibra levemente umedecida, evitando fricção circular intensa para não polir áreas localizadas e alterar a refletância da tela.</p>

      <h3>Telas de Notebooks e Ultrawides Curvos</h3>
      <p>Em laptops, a proximidade com o teclado transfere óleos sebáceos naturais dos dedos. Ao fechar a tampa, a pressão de transporte pode transferir marcas de teclas para a tela. A limpeza deve apoiar a parte traseira da tampa para evitar flexão mecânica excessiva do painel de vidro.</p>

      <p><a class="cta" href="/?tool=cleaner">Usar Modo de Inspeção de Contraste no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'manchas-no-monitor-causas',
    title: 'Manchas no Monitor: Causas, Diagnóstico e Como Resolver',
    h1: 'Manchas no Monitor: Causas, Diagnóstico e Avaliação de Danos',
    description: 'Aprenda a identificar e diferenciar os tipos de manchas em displays eletrônicos: marcas de pressão (Mura), umidade, queima de backplane e burn-in.',
    toolId: 'cleaner',
    relatedSlugs: ['como-limpar-monitor-sem-danificar', 'guia-limpeza-lcd-oled-notebook', 'o-que-sao-dead-pixels'],
    faq: [
      ['O que é o efeito Mura em monitores?', 'Mura é um termo da indústria de displays para descrever irregularidades de luminância e contraste causadas por variações na espessura do cristal líquido ou estresse mecânico no painel.'],
      ['Manchas causadas por umidade têm conserto?', 'Se a umidade penetrou entre as folhas difusoras da unidade de luz de fundo, a secagem natural raramente elimina as marcas d’água microscópicas, exigindo troca do módulo óptico.'],
      ['Como testar a uniformidade de um painel manchado?', 'Exiba fundos homogêneos em branco puro, cinza a 50% e cores sólidas para mapear se a mancha é de atenuação óptica ou de falha nos emissores de luz.']
    ],
    body: `
      <h2>Diagnóstico Diferencial de Manchas em Displays</h2>
      <p>O aparecimento de manchas em uma tela pode ser resultado de degradação química, sobrecarga térmica, impacto mecânico ou falhas de controle de qualidade na montagem do display.</p>

      <h2>Principais Tipos de Anomalias de Superfície</h2>
      <ul>
        <li><strong>Marcas de Pressão (Efeito Mura Mecânico):</strong> Manchas esbranquiçadas ou amareladas difusas causadas por dedos pressionando o painel ou impactos em transporte. Deformam a distância entre os substratos de vidro, alterando a densidade do cristal líquido.</li>
        <li><strong>Infiltração de Umidade:</strong> Nuvens escuras ou irregulares visíveis em fundos brancos, causadas pela condensação de líquidos nas folhas difusoras da unidade de luz de fundo.</li>
        <li><strong>Degradação Térmica do Difusor:</strong> Amarelamento progressivo em bordas inferiores devido ao calor concentrado das barras de LED de alta potência.</li>
        <li><strong>Retenção de Imagem em OLED:</strong> Sombras nítidas de interfaces estáticas decorrentes do consumo diferenciado de corrente em subpixels individuais.</li>
      </ul>

      <p><a class="cta" href="/?tool=cleaner">Inspecionar Uniformidade do Painel no MonitorSmith →</a></p>
    `
  }
];
