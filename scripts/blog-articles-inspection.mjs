export default [
  {
    slug: 'backlight-bleed-como-testar',
    title: 'Como Testar Backlight Bleed no Monitor | Guia Técnico',
    h1: 'O que é Backlight Bleed e Como Testar seu Monitor',
    description: 'Entenda o vazamento de luz aparente, como comparar um monitor LCD em condições repetíveis e como registrar o resultado para consultar a garantia vigente.',
    toolId: 'black',
    relatedSlugs: ['ips-glow-vs-backlight-bleed', 'como-testar-monitor-oled', 'testar-monitor-olx-mercado-livre'],
    faq: [
      ['O que pode contribuir para o brilho irregular nas bordas?', 'Montagem, pressão, difusores, tecnologia do painel, ângulo e exposição podem influenciar a aparência. Uma inspeção visual não determina a causa estrutural.'],
      ['A página indica se o produto deve ser trocado?', 'Não. Registre o comportamento em brilho normal e consulte a política vigente do fabricante, vendedor e os canais oficiais de defesa do consumidor aplicáveis ao caso.'],
      ['Como comparar Backlight Bleed e IPS Glow?', 'Mude levemente o ângulo e a distância. Variações angulares são compatíveis com glow; regiões persistentes podem merecer registro, mas a página não fecha o diagnóstico.']
    ],
    body: `
      <h2>A Física do Vazamento de Luz (Backlight Bleed)</h2>
      <p>Em painéis de cristal líquido (LCD — incluindo variantes IPS, VA e TN), a imagem não é autoemissiva. O display depende de uma <strong>Unidade de Luz de Fundo (Backlight Unit - BLU)</strong>, geralmente composta por fitas de LEDs brancos posicionadas nas bordas (Edge-lit) ou distribuídas em uma matriz traseira (Direct-lit).</p>
      
      <p>Para formar a imagem, a luz emitida pela BLU passa por múltiplas camadas ópticas: guias de luz (LGP), folhas difusoras, prismas de incremento de brilho (BEF) e polarizadores, até atingir a camada de cristal líquido TFT. Quando há tolerâncias mecânicas imperfeitas na moldura, parafusos com torque excessivo ou empenamento do chassi, as camadas ópticas sofrem microdeformações. Isso permite que feixes de luz escapem desobstruídos pelas bordas, criando manchas luminosas estáticas sobre fundos escuros.</p>

      <h2>Protocolo de Teste em Ambiente Controlado</h2>
      <p>Para comparar a aparência sem confundir reflexos e exposição automática da câmera, use um procedimento simples e repetível:</p>
      
      <ol>
        <li><strong>Controle do Ambiente:</strong> Reduza reflexos e mantenha a mesma iluminação nas comparações.</li>
        <li><strong>Brilho de Uso:</strong> Configure o monitor no nível que você realmente utiliza e registre esse ajuste.</li>
        <li><strong>Superfície de Teste em Tela Cheia:</strong> Abra a ferramenta de tela preta absoluta em modo tela cheia (F11) para preencher todos os pixels com o valor digital RGB (0, 0, 0).</li>
        <li><strong>Verificação Angular:</strong> Observe de frente e mude levemente ângulo e distância. Registre o que muda e o que permanece aparente, sem atribuir uma causa apenas por esse teste.</li>
      </ol>

      <p><a class="cta" href="/?tool=black">Abrir Tela Preta de Inspeção no MonitorSmith →</a></p>

      <h2>Critérios de Troca e Direitos do Consumidor</h2>
      <p>Tolerância, cobertura e prazo variam conforme modelo, fabricante, vendedor, região e modalidade de compra. Guarde nota, anúncio, número do pedido e fotos comparáveis; confirme a política e a legislação atuais nos canais oficiais antes de decidir.</p>
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
      ['O IPS Glow é coberto por garantia?', 'Políticas variam por fabricante, modelo, região e severidade. Compare com a documentação vigente do produto e envie registros feitos em condições normais de uso.'],
      ['Como reduzir sua percepção no setup?', 'Teste distância, ângulo, brilho e luz ambiente até encontrar uma condição confortável; não existe uma distância universal para todos os painéis e usuários.']
    ],
    body: `
      <h2>A Natureza Óptica do IPS Glow</h2>
      <p>Os painéis IPS (In-Plane Switching) são amplamente adotados em monitores profissionais e gamers devido à fidelidade cromática superior e estabilidade de ângulo de visão. Entretanto, a arquitetura onde os cristais líquidos giram paralelamente ao substrato de vidro apresenta uma limitação óptica conhecida: a <strong>birrefringência residual</strong>.</p>
      
      <p>Quando a tela exibe tons escuros, os cristais bloqueiam a maior parte da luz polarizada na perpendicular. Porém, para os cantos da tela — que o olho do usuário enxerga em um ângulo oblíquo —, a luz escapa com leve desvio espectral, produzindo um halo acinzentado, prateado ou alaranjado denominado <em>IPS Glow</em>.</p>

      <h2>Tabela Comparativa: IPS Glow vs. Backlight Bleed</h2>
      <p>Identificar corretamente o fenômeno evita pedidos de suporte desnecessários e direciona reclamações fundamentadas:</p>

      <ul>
        <li><strong>Ângulo:</strong> glow tende a variar com posição e distância; regiões persistentes podem ter outras origens.</li>
        <li><strong>Repetição:</strong> observe de frente, repita com o mesmo brilho e registre quais áreas mudam.</li>
        <li><strong>Câmera:</strong> exposição automática pode ampliar diferenças que parecem discretas a olho nu.</li>
        <li><strong>Garantia:</strong> somente a documentação vigente e a avaliação do fornecedor definem cobertura.</li>
      </ul>

      <h2>O Erro Comum das Fotografias com Smartphone</h2>
      <p>Celulares podem aumentar exposição, combinar quadros e alterar balanço de branco em cenas escuras. A fotografia documenta uma configuração, mas não mede luminância nem reproduz necessariamente a percepção visual.</p>
      <p>Se houver controles manuais, mantenha os mesmos valores entre fotos e inclua também uma descrição do que foi visto a olho nu. Siga o procedimento solicitado pelo suporte do fabricante.</p>

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
      ['Monitores OLED sofrem de backlight bleed?', 'OLED não usa a mesma unidade de luz de fundo dos LCDs, portanto esse mecanismo específico não se aplica. Reflexos, processamento, uniformidade e outros artefatos ainda podem aparecer.'],
      ['O que é o teste de 5% de cinza?', 'É uma referência visual escura que pode tornar diferenças de uniformidade aparentes. O código solicitado pelo navegador não mede luminância nem a condução elétrica do painel.']
    ],
    body: `
      <h2>A Arquitetura OLED e Seus Pontos Críticos</h2>
      <p>Displays OLED, incluindo variantes WOLED e QD-OLED, controlam a emissão por pixel e por isso não usam a luz de fundo típica de LCDs. Isso evita o <em>backlight bleed</em> do LCD e costuma oferecer transições rápidas, mas desempenho, brilho, uniformidade e retenção variam entre modelos e condições de uso.</p>
      
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
      <p>Uma referência cinza escura pode tornar faixas e diferenças de uniformidade mais visíveis. Gerenciamento de cor, brilho e processamento alteram o resultado; rotinas de compensação devem ser usadas apenas conforme o manual do modelo.</p>

      <p><a class="cta" href="/?tool=black">Executar Ciclo de Inspeção no MonitorSmith →</a></p>

      <h2>Verificação de Ciclos de Limpeza no Menu OSD</h2>
      <p>Ao avaliar um OLED usado, consulte no menu normal os dados que o fabricante disponibiliza e peça histórico de uso e nota fiscal. Evite menus de serviço ou ciclos manuais não recomendados; siga as proteções descritas no manual do modelo.</p>
    `
  },
  {
    slug: 'tela-preta-descanso-monitor',
    title: 'Tela Preta: Proteção e Descanso para seu Monitor',
    h1: 'Tela Preta: Proteção do Painel, Eficiência e Conforto Visual',
    description: 'Entenda o que uma tela preta muda na emissão de um painel OLED e quais limites ainda dependem do modelo, do brilho e do ambiente.',
    toolId: 'black',
    relatedSlugs: ['como-testar-monitor-oled', 'manchas-no-monitor-causas', 'como-limpar-monitor-sem-danificar'],
    faq: [
      ['Tela preta economiza energia em qualquer monitor?', 'A economia real ocorre em displays OLED e painéis LCD com MiniLED (Local Dimming ativo), onde os LEDs são fisicamente desligados. Em LCDs convencionais Edge-lit, a lâmpada de fundo permanece acesa com consumo similar.'],
      ['Usar tela preta reduz o risco de burn-in em OLEDs?', 'Pixels pretos normalmente emitem pouca ou nenhuma luz em OLEDs, reduzindo o uso desses subpixels durante a exibição. O comportamento de compensação e o consumo restante dependem do modelo.'],
      ['Como a tela preta auxilia na ergonomia visual?', 'Em setups com múltiplos monitores, uma superfície escura em telas ociosas pode reduzir luz periférica. Ajuste também o brilho e a iluminação ambiente para conforto.']
    ],
    body: `
      <h2>O Papel da Tela Preta na Conservação de Displays</h2>
      <p>Fundos escuros podem reduzir a luz aparente de uma tela ociosa, mas consumo e efeito no painel dependem da tecnologia, do firmware e do brilho configurado:</p>

      <ul>
        <li><strong>Telas OLED / QD-OLED:</strong> pixels escuros costumam emitir menos luz, porém eletrônica, compensação e outras áreas da tela continuam consumindo energia.</li>
        <li><strong>Telas LCD MiniLED:</strong> o local dimming pode reduzir a luz em zonas escuras, conforme algoritmo, modo e conteúdo.</li>
        <li><strong>Telas LCD IPS/VA Convencionais:</strong> Os cristais líquidos giram para bloquear a passagem de luz da backlight unit contínua. Embora não haja desligamento físico dos LEDs, reduz-se o brilho geral que atinge o campo visual do usuário.</li>
      </ul>

      <h2>Conforto em Setups com Várias Telas</h2>
      <p>Uma tela secundária muito clara pode incomodar algumas pessoas. O fundo preto oferece uma forma rápida de reduzir essa luz percebida sem mudar a disposição das janelas.</p>
      <p>Conforto visual depende de brilho, distância, reflexos, iluminação do ambiente, pausas e necessidades individuais. A ferramenta não previne nem trata fadiga ocular.</p>

      <p><a class="cta" href="/?tool=black">Ativar Tela Preta de Descanso no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'o-que-sao-dead-pixels',
    title: 'O que São Dead Pixels: Guia Completo e Identificação',
    h1: 'O que São Dead Pixels e Como Identificar no seu Monitor',
    description: 'Compare a aparência de pontos escuros, claros ou coloridos e aprenda a registrar o comportamento sem atribuir uma causa física apenas pelo navegador.',
    toolId: 'dead-pixel',
    relatedSlugs: ['pixel-morto-vs-pixel-preso', 'politica-dead-pixel-fabricantes', 'testar-monitor-olx-mercado-livre'],
    faq: [
      ['O que esta página chama de pixel morto?', 'É a descrição visual de um ponto que permanece escuro em vários fundos. Poeira, escala e diferentes falhas podem parecer semelhantes, então a causa exige avaliação técnica.'],
      ['Um ponto isolado tende a se espalhar?', 'A ferramenta não prevê evolução. Registre posição e aparência em datas diferentes e procure suporte se surgirem novas áreas ou dano físico.'],
      ['Ciclagem de cores recupera pixels?', 'Não há garantia estabelecida. O ciclo é experimental, pode incomodar pessoas fotossensíveis e não repara dano físico ou burn-in; siga o fabricante.']
    ],
    body: `
      <h2>A Estrutura Microscópica de uma Matriz TFT</h2>
      <p>Um monitor moderno de resolução 1440p (2560x1440) contém 3,68 milhões de pixels; em resolução 4K (3840x2160), esse número sobe para 8,29 milhões. Como cada pixel é formado por três subpixels dedicados (Vermelho, Verde e Azul), a placa traseira do display abriga quase <strong>25 milhões de transistores microscópicos</strong> depositados sobre vidro.</p>
      
      <p>Diferentes mecanismos no painel, no processamento ou na superfície podem produzir pontos de aparência semelhante. Uma página web mostra fundos de comparação, mas não lê o circuito responsável.</p>

      <h2>Classificação das Anomalias de Pixel</h2>
      <ul>
        <li><strong>Ponto escuro:</strong> permanece aparente em fundos claros e merece comparação após limpar a superfície.</li>
        <li><strong>Ponto colorido:</strong> aparece em uma ou mais cores; a sequência ajuda a registrar em quais fundos ele é visível.</li>
        <li><strong>Ponto claro:</strong> destaca-se em fundos escuros. A aparência sozinha não identifica o mecanismo elétrico.</li>
      </ul>

      <h2>Metodologia de Detecção com Cores Primárias</h2>
      <p>Limpe a tela conforme o manual e percorra os oito fundos sólidos. Anote posição, cor e repetibilidade; a sequência mapeia sintomas e não constitui diagnóstico físico.</p>

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
      ['Como conferir o prazo de devolução em um marketplace?', 'Consulte os termos vigentes exibidos no anúncio e na sua conta, além dos direitos aplicáveis à compra. Prazos e condições podem mudar por país, categoria e modalidade de venda.']
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
      <p>Abra o MonitorSmith e percorra a sequência de cores para registrar pontos suspeitos. Compare regiões da tela preta de frente e no brilho de uso; não trate a observação como medição de uniformidade.</p>

      <p><a class="cta" href="/?tool=dead-pixel">Levar MonitorSmith para o Teste →</a></p>
    `
  },
  {
    slug: 'pixel-morto-vs-pixel-preso',
    title: 'Pixel Morto vs Pixel Preso: Entenda as Diferenças e Soluções',
    h1: 'Pixel Morto vs Pixel Preso: Diferenças Técnicas e Possibilidades de Reparo',
    description: 'Entenda as diferenças visuais entre pontos escuros, claros e coloridos, os limites do teste no navegador e como documentar o resultado.',
    toolId: 'dead-pixel',
    relatedSlugs: ['o-que-sao-dead-pixels', 'politica-dead-pixel-fabricantes', 'testar-monitor-olx-mercado-livre'],
    faq: [
      ['Qual a diferença visual essencial entre eles?', 'Um ponto escuro costuma aparecer em fundos claros; um ponto claro ou colorido destaca-se em fundos escuros ou cores específicas. Isso não confirma o mecanismo físico.'],
      ['Softwares de flashing rápido realmente funcionam?', 'Não existe garantia. O recurso é experimental, não repara dano físico ou burn-in e deve ser evitado por pessoas sensíveis a flashes.'],
      ['Aplicar pressão na tela com o dedo é seguro?', 'Não é recomendado por fabricantes. A pressão física pode danificar permanentemente as camadas polarizadoras e desalinhar difusores de luz adjacentes.']
    ],
    body: `
      <h2>Fundamentos da Comutação de Cristais Líquidos</h2>
      <p>Em um painel LCD, a passagem de luz é modulada pela rotação física das moléculas de cristal líquido em resposta a um campo elétrico gerado pelo transistor de filme fino. Quando esse mecanismo sofre uma avaria, duas condições distintas podem ocorrer:</p>

      <h3>1. Ponto Escuro Persistente</h3>
      <p>Um ponto que continua escuro em vários fundos pode ser compatível com falha de pixel ou subpixel, mas sujeira, escala e outros mecanismos também interferem. O navegador não lê a trilha elétrica.</p>

      <h3>2. Ponto Claro ou Colorido Persistente</h3>
      <p>A cor em que o ponto aparece ajuda a documentar o sintoma. A ciclagem rápida apenas alterna valores digitais e não comprova a causa nem oferece garantia de recuperação.</p>

      <p><a class="cta" href="/?tool=dead-pixel">Testar Subpixels no MonitorSmith →</a></p>
    `
  },
  {
    slug: 'politica-dead-pixel-fabricantes',
    title: 'Dead Pixel e Garantia: Como Conferir a Política do Monitor',
    h1: 'Dead Pixels: Como Documentar e Conferir a Garantia Vigente',
    description: 'Saiba como registrar pontos suspeitos e localizar a política vigente do fabricante, vendedor e região sem depender de limites genéricos.',
    toolId: 'dead-pixel',
    relatedSlugs: ['o-que-sao-dead-pixels', 'pixel-morto-vs-pixel-preso', 'testar-monitor-olx-mercado-livre'],
    faq: [
      ['Existe um limite universal de pixels defeituosos?', 'Não. Classes técnicas podem servir de referência, mas cobertura real varia por fabricante, modelo, tipo de ponto, agrupamento, região, vendedor e contrato.'],
      ['Como encontro a regra aplicável?', 'Use o número exato do modelo e a região no site oficial do fabricante, leia o certificado de garantia e confirme com o vendedor antes de abrir o chamado.'],
      ['O teste do MonitorSmith decide a garantia?', 'Não. Ele ajuda a localizar e registrar pontos aparentes. Elegibilidade é definida pela política vigente e pelos direitos aplicáveis à compra.']
    ],
    body: `
      <h2>Por que tabelas genéricas não bastam</h2>
      <p>Normas técnicas e classes de defeito podem aparecer na documentação de displays, mas uma tabela encontrada na internet não define sozinha a cobertura do seu produto. Fabricantes atualizam programas comerciais e podem aplicar regras diferentes por linha e região.</p>

      <ul>
        <li><strong>Modelo e número de série:</strong> identifique-os no produto e guarde-os em registro privado.</li>
        <li><strong>Tipo, posição e agrupamento:</strong> anote em quais fundos cada ponto aparece.</li>
        <li><strong>Documentos atuais:</strong> salve a página da garantia, nota fiscal e protocolo de atendimento com data.</li>
      </ul>

      <h2>Como abrir um chamado verificável</h2>
      <p>Faça a inspeção com a tela limpa, brilho de uso e câmera sem filtros. Envie fotos junto de uma descrição do que é visível a olho nu. Consulte diretamente o suporte oficial e os canais públicos de defesa do consumidor de sua região para regras e prazos atuais.</p>

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
      ['Posso usar álcool comum ou limpa-vidros na tela?', 'Use somente o método autorizado pelo fabricante. Limpa-vidros, amônia, solventes e concentrações não aprovadas podem danificar revestimentos; água ou álcool também podem ser restritos em certos modelos.'],
      ['Qual líquido é seguro para limpar monitores?', 'Não há uma resposta universal. Alguns manuais permitem água ou determinada solução; outros impõem restrições. Siga o procedimento e a concentração do modelo exato.'],
      ['Por que evitar papel toalha ou guardanapos?', 'Eles podem reter partículas, soltar fibras ou ser mais abrasivos que o material recomendado pelo fabricante. Use um pano limpo e adequado ao modelo.']
    ],
    body: `
      <h2>A Química dos Revestimentos de Superfície</h2>
      <p>A superfície visível de um monitor não é vidro comum. Trata-se de um conjunto de filmes poliméricos ultrafinos depositados sobre o painel:</p>
      <ul>
        <li><strong>Filmes Antirreflexo (Anti-Glare - AG):</strong> Microtexturas que dispersam a luz ambiente, reduzindo reflexos especulares.</li>
        <li><strong>Tratamentos Antirreflexo Multicamada (AR):</strong> Filmes de interferência óptica com índices de refração calculados com precisão nanométrica.</li>
        <li><strong>Camadas Oleofóbicas:</strong> Polímeros fluorados que reduzem a adesão de gordura dactilar.</li>
      </ul>

      <h2>Compatibilidade depende do revestimento</h2>
      <p>Vidro, polarizadores e revestimentos variam entre modelos. Uma solução aceita em um equipamento pode manchar ou remover a camada de outro; a aparência externa não revela a compatibilidade química.</p>

      <h2>Procedimento de Limpeza em 4 Etapas</h2>
      <ol>
        <li><strong>Consulte o manual:</strong> confirme material, solução permitida e forma de desligamento do equipamento.</li>
        <li><strong>Remova partículas soltas:</strong> evite arrastá-las pela superfície e não use ar de alta pressão em bordas e aberturas.</li>
        <li><strong>Use o pano indicado:</strong> se o manual permitir umidade, aplique-a ao pano, sem encharcar nem borrifar a tela.</li>
        <li><strong>Faça movimentos suaves:</strong> não pressione o painel e mantenha líquido longe de bordas, portas e aberturas.</li>
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
      <p>Superfícies foscas podem mostrar resíduos de forma diferente das brilhantes. Use somente o material e a umidade permitidos no manual e evite pressão ou fricção repetida no mesmo ponto.</p>

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
      ['Manchas causadas por umidade têm conserto?', 'A aparência não confirma onde a umidade está nem o reparo necessário. Desligue o equipamento, não aplique calor e procure a orientação do fabricante ou assistência.'],
      ['Como observar uma mancha?', 'Exiba branco, cinza e cores sólidas e registre em quais fundos ela aparece. Isso mapeia o sintoma, sem identificar a camada ou a causa.']
    ],
    body: `
      <h2>Diagnóstico Diferencial de Manchas em Displays</h2>
      <p>Manchas podem ter origens superficiais, ópticas, eletrônicas ou ambientais. Formato e cor ajudam a documentar, mas não bastam para determinar a causa.</p>

      <h2>Principais Tipos de Anomalias de Superfície</h2>
      <ul>
        <li><strong>Irregularidade difusa:</strong> registre se muda com ângulo, brilho ou conteúdo.</li>
        <li><strong>Nuvens ou bordas escuras:</strong> desligue o equipamento se houver suspeita de líquido e procure assistência.</li>
        <li><strong>Alteração de cor:</strong> compare com outro dispositivo e com o perfil padrão antes de atribuir uma causa térmica.</li>
        <li><strong>Imagem persistente:</strong> observe se desaparece com o tempo e siga as rotinas do fabricante; não execute ciclos excessivos.</li>
      </ul>

      <p><a class="cta" href="/?tool=cleaner">Inspecionar Uniformidade do Painel no MonitorSmith →</a></p>
    `
  }
];
