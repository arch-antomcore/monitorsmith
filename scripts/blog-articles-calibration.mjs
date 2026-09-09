export default [
  {
    slug: 'calibrar-monitor-fotografia-design',
    toolId: 'calibration',
    title: 'Calibração de Monitor para Fotografia e Design',
    h1: 'Calibração e Perfil de Monitor para Fotografia e Design',
    description: 'Entenda o que padrões visuais conseguem verificar, quando usar um colorímetro e como manter um fluxo de cor documentado para fotografia e design.',
    relatedSlugs: ['teste-contraste-gama-monitor', 'o-que-e-color-banding', 'monitor-para-edicao-video'],
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-09',
    sources: [
      {
        label: 'International Color Consortium — Display calibration',
        url: 'https://www.color.org/displaycalibration/',
        note: 'Explica a diferença entre calibrar, caracterizar e usar um perfil de monitor.'
      },
      {
        label: 'International Color Consortium — ICC specifications',
        url: 'https://www.color.org/specifications/',
        note: 'Página oficial das especificações de perfis ICC.'
      },
      {
        label: 'W3C — CSS Color Module Level 4',
        url: 'https://www.w3.org/TR/css-color-4/',
        note: 'Define sRGB, espaços de cor predefinidos e o tratamento de cores na Web.'
      }
    ],
    faq: [
      ['Um padrão no navegador calibra o monitor?', 'Não. Ele ajuda a observar gradientes, recortes e neutralidade aparente, mas não mede a emissão da tela nem cria um perfil ICC. Calibração e perfilamento confiáveis exigem instrumento e software compatíveis.'],
      ['Qual é a diferença entre calibração e perfilamento?', 'Calibração ajusta o dispositivo para uma condição escolhida. Perfilamento mede a resposta nessa condição e a descreve em um perfil ICC, que precisa ser usado por um fluxo com gerenciamento de cor.'],
      ['Preciso de colorímetro para editar imagens?', 'Para trabalho em que a cor precisa ser reproduzível, um instrumento adequado é a referência prática. Sem ele, a verificação visual serve como triagem e manutenção básica, não como certificação de precisão.']
    ],
    body: `
      <h2>O navegador ajuda a inspecionar; não calibra</h2>
      <p>Padrões de cinza, branco, preto e gradientes ajudam a encontrar problemas visíveis antes de editar: níveis que se confundem, realces recortados, dominante de cor aparente ou transições com faixas. Eles não medem luminância, cromaticidade, uniformidade ou erro de cor. Por isso, não transformam uma tela em referência e não substituem colorímetro, espectrofotômetro ou o procedimento indicado pelo fabricante.</p>
      <p>Para fotografia e design, o objetivo útil é tornar o fluxo previsível. Isso exige saber qual é o destino da imagem, estabilizar a tela e o ambiente, medir quando a precisão importa, instalar o perfil correto e usar aplicativos que respeitem gerenciamento de cor. Uma imagem pode parecer equilibrada em uma tela e mudar em outra porque perfil, gamut, brilho, iluminação e condições de observação também mudam.</p>

      <h2>Calibração, caracterização e validação</h2>
      <table>
        <thead><tr><th scope="col">Etapa</th><th scope="col">O que faz</th><th scope="col">O que entrega</th></tr></thead>
        <tbody>
          <tr><td>Calibração</td><td>Ajusta a tela em direção a uma condição definida, dentro dos limites do equipamento.</td><td>Um estado de funcionamento conhecido, com ajustes no monitor, no sistema ou em ambos.</td></tr>
          <tr><td>Caracterização ou perfilamento</td><td>Mede como o dispositivo reproduz amostras de cor.</td><td>Um perfil ICC que descreve a resposta medida.</td></tr>
          <tr><td>Validação</td><td>Mede novamente amostras independentes e compara com o alvo do fluxo.</td><td>Um relatório condicionado ao instrumento, método, alvo e data.</td></tr>
          <tr><td>Inspeção visual</td><td>Procura defeitos perceptíveis com padrões conhecidos.</td><td>Indícios para investigar; não produz medição colorimétrica.</td></tr>
        </tbody>
      </table>

      <h2>Preparação antes de ajustar qualquer controle</h2>
      <ul>
        <li>Defina o destino: web em sRGB, impressão com prova e perfil fornecido, ou outro contrato de cor documentado. Não escolha o espaço apenas porque ele tem gamut maior.</li>
        <li>Use a resolução nativa, confirme a faixa do sinal e selecione um modo de imagem conhecido. Registre os valores atuais para poder desfazer mudanças.</li>
        <li>Deixe tela e instrumento estabilizarem pelo período recomendado por seus fabricantes. Evite sol direto, reflexos e grandes mudanças de luz durante a sessão.</li>
        <li>Desative temporariamente brilho automático, contraste dinâmico, filtro noturno e outros ajustes que alterem a imagem conforme o conteúdo, quando o equipamento permitir.</li>
        <li>Verifique se o perfil associado no sistema pertence à tela e à conexão atuais. Um perfil antigo pode deixar de representar o equipamento após mudança de modo, placa de vídeo ou brilho.</li>
        <li>Limpe a tela com o método aprovado pelo fabricante; marcas e reflexos podem ser confundidos com falta de uniformidade.</li>
      </ul>

      <h2>Procedimento reproduzível</h2>
      <ol>
        <li>Anote data, iluminação do ambiente, modelo da tela, entrada usada, modo de imagem, brilho, contraste e recursos automáticos ativos.</li>
        <li>Abra os padrões em tela cheia e sem zoom. Confirme que o navegador não está aplicando extensão, filtro de acessibilidade ou modo de leitura que modifique as cores.</li>
        <li>Observe uma escala de cinza do centro para os extremos. Procure separação entre degraus, dominante colorida e mudanças bruscas. Não ajuste vários controles ao mesmo tempo.</li>
        <li>Confira manchas ou variações com campos claros, médios e escuros. Mova a cabeça apenas o necessário para distinguir variação do painel de efeito de ângulo de visão.</li>
        <li>Analise gradientes. Se houver faixas, repita em outra janela, aplicativo e arquivo conhecido antes de atribuir a causa ao painel.</li>
        <li>Quando houver instrumento, escolha alvos compatíveis com a entrega, execute calibração e perfilamento no software suportado e associe o novo perfil somente à tela medida.</li>
        <li>Valide com amostras separadas e guarde o relatório. Compare resultados ao longo do tempo sob as mesmas condições, sem interpretar uma única média como descrição completa da tela.</li>
      </ol>

      <h2>Como interpretar a inspeção visual</h2>
      <p>Degraus escuros fundidos podem envolver brilho, nível de preto, faixa RGB, processamento ou luz ambiente. Degraus claros iguais podem envolver contraste, sinal ou recorte no próprio conteúdo. Uma dominante que aparece apenas em um aplicativo aponta para o fluxo de cor antes de apontar para o painel. Uma dominante presente em todos os campos e entradas merece comparação com outro modo e, se o trabalho exigir precisão, medição.</p>
      <p>sRGB, Adobe RGB, Display P3 e os espaços de cinema não são nomes intercambiáveis. O perfil incorporado descreve como interpretar números da imagem; o perfil do monitor descreve o dispositivo. Converter uma imagem, atribuir um perfil e trocar o modo do monitor são operações diferentes.</p>

      <h2>Erros comuns e limites</h2>
      <ul>
        <li>Ajustar o branco comparando com uma folha sob iluminação desconhecida. Papel, lâmpada e adaptação visual alteram a comparação.</li>
        <li>Usar a foto de um padrão feita por celular como prova de fidelidade. A câmera aplica exposição, balanço de branco, compressão e processamento próprios.</li>
        <li>Instalar o perfil de outro exemplar do mesmo modelo. Variações de unidade, modo e envelhecimento tornam essa descrição inadequada para validação.</li>
        <li>Editar com brilho excessivo e compensar escurecendo os arquivos. O efeito costuma aparecer na impressão ou em telas menos brilhantes.</li>
      </ul>
      <p>A inspeção aqui é uma etapa de controle, não um laudo. Para decisões contratuais, prova de impressão, restauração, produto ou entrega audiovisual, documente o padrão exigido e use medição rastreável, software atualizado e um ambiente de observação definido.</p>
    `
  },
  {
    slug: 'o-que-e-color-banding',
    toolId: 'calibration',
    title: 'Color Banding: Como Investigar Faixas em Gradientes',
    h1: 'Color Banding: Origem, Testes e Limites do Diagnóstico Visual',
    description: 'Método para separar banding presente no arquivo de problemas na renderização, no sinal ou na tela usando comparações controladas.',
    relatedSlugs: ['calibrar-monitor-fotografia-design', 'teste-contraste-gama-monitor'],
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-09',
    sources: [
      {
        label: 'W3C — CSS Color Module Level 4',
        url: 'https://www.w3.org/TR/css-color-4/',
        note: 'Documenta espaços, conversões, precisão de cor e interpolação usadas no conteúdo web.'
      },
      {
        label: 'W3C — Media Queries Level 5',
        url: 'https://www.w3.org/TR/mediaqueries-5/',
        note: 'Define consultas de gamut e faixa dinâmica e registra que elas descrevem capacidades aproximadas.'
      },
      {
        label: 'ITU — Recommendation BT.2100',
        url: 'https://www.itu.int/rec/r-rec-bt.2100',
        note: 'Referência oficial para parâmetros de produção e intercâmbio de televisão HDR.'
      }
    ],
    faq: [
      ['O que é color banding?', 'É a percepção de degraus ou faixas onde se esperava uma transição suave. A origem pode estar no arquivo, na quantização, na compressão, na conversão de cor, no sinal, no processamento ou na tela.'],
      ['Uma tela de 10 bits elimina banding?', 'Não. Mais níveis podem reduzir quantização quando toda a cadeia os preserva, mas não corrigem faixas já gravadas no arquivo nem garantem que aplicativo, sistema, conexão e painel operem na mesma profundidade.'],
      ['Um gradiente no navegador identifica a peça defeituosa?', 'Não sozinho. Ele mostra o resultado combinado do navegador, gerenciamento de cor, sistema, GPU, conexão e tela. Comparações controladas ajudam a localizar uma etapa provável.']
    ],
    body: `
      <h2>Banding é um sintoma, não um diagnóstico</h2>
      <p>Color banding aparece como faixas discretas em uma área que deveria variar suavemente, como um céu, uma sombra ou um degradê gráfico. O efeito pode ter sido criado na captura ou edição, reforçado pela compressão, introduzido por uma conversão de cor ou surgir na saída até o painel. Ver um único gradiente não basta para dizer que o monitor é de 8 bits, que a GPU está configurada errado ou que existe defeito físico.</p>
      <p>Em RGB com 8 bits por canal há 256 códigos possíveis por canal. A quantidade de diferenças visíveis em uma transição depende também de como esses códigos são distribuídos pela função de transferência, do contraste local, do ruído ou dithering e das etapas de processamento. Um caminho com maior profundidade oferece mais códigos, mas só ajuda quando conteúdo, aplicativo, composição do sistema, saída, conexão e display preservam esse caminho.</p>

      <h2>Prepare uma comparação que possa ser repetida</h2>
      <ul>
        <li>Use a resolução nativa e registre modo de imagem, faixa de sinal, profundidade indicada pelo sistema, conexão e recursos HDR ativos.</li>
        <li>Evite luz refletida forte sobre a tela e espere a visão se adaptar por alguns minutos. Bandas sutis mudam de aparência conforme o ambiente.</li>
        <li>Desative temporariamente extensões do navegador, filtro noturno e contraste dinâmico quando houver controle seguro sobre eles.</li>
        <li>Separe três materiais: o gradiente gerado pela página, um arquivo de referência sem compressão com perfil conhecido e um arquivo comprimido que apresente o problema real.</li>
        <li>Não use uma fotografia da tela como referência primária. Sensor, obturador, foco, redução de ruído e compressão da câmera podem criar ou ocultar faixas.</li>
      </ul>

      <h2>Procedimento para localizar a etapa provável</h2>
      <ol>
        <li>Observe o gradiente gerado no centro da tela e anote cor, direção e posição das faixas. Não altere controles durante essa primeira leitura.</li>
        <li>Abra o mesmo padrão em outro navegador atualizado. Se o resultado mudar, investigue renderização, gerenciamento de cor, extensões e aceleração antes do painel.</li>
        <li>Abra o arquivo de referência em um visualizador com gerenciamento de cor conhecido. Compare a aparência com a versão web sem redimensionar.</li>
        <li>Faça uma captura de tela digital da área problemática. Visualize essa captura em outro equipamento. Se as faixas estiverem codificadas na captura, elas surgiram antes da emissão física do primeiro painel; se não estiverem, a causa continua possível nas etapas de saída ou exibição.</li>
        <li>Conecte a mesma tela por outra porta ou cabo compatível e repita sem mudar outras variáveis. Depois, se disponível, compare o mesmo sinal em outra tela.</li>
        <li>Alterne SDR e HDR somente com conteúdo e sistema configurados para cada modo. Mudanças simultâneas de função de transferência, gamut e mapeamento de tons impedem uma comparação simples.</li>
        <li>Restaure a configuração original ao final e guarde capturas, arquivos, horários e versões usadas.</li>
      </ol>

      <h2>Leitura dos resultados</h2>
      <table>
        <thead><tr><th scope="col">Observação</th><th scope="col">Próxima verificação útil</th><th scope="col">O que ainda não está provado</th></tr></thead>
        <tbody>
          <tr><td>Faixas iguais em telas diferentes</td><td>Examine arquivo, compressão, escala e renderização.</td><td>Que todos os painéis estejam corretos ou incorretos.</td></tr>
          <tr><td>Faixas presentes na captura digital</td><td>Compare aplicativos e o arquivo original.</td><td>Que o painel não acrescente outros artefatos.</td></tr>
          <tr><td>Faixas apenas em uma entrada</td><td>Confira faixa RGB, formato, cabo e processamento dessa entrada.</td><td>Que o cabo seja necessariamente defeituoso.</td></tr>
          <tr><td>Faixas mudam ao mover a janela</td><td>Investigue composição do sistema, perfil por tela e aceleração.</td><td>Que o navegador seja a única causa.</td></tr>
        </tbody>
      </table>

      <h2>Dithering, compressão e erros comuns</h2>
      <p>Dithering adiciona variação espacial ou temporal para tornar degraus menos perceptíveis. FRC é uma forma temporal usada por alguns displays, mas um padrão visual não identifica com segurança a implementação do painel. Compressão com perdas também pode agrupar tons e criar blocos, sobretudo em áreas escuras ou com baixo detalhe. Exportar novamente o mesmo material com ruído não recupera informação perdida; no máximo muda a percepção do defeito.</p>
      <ul>
        <li>Não conclua que todo banding indica baixa profundidade do painel.</li>
        <li>Não compare imagens com perfis diferentes sem considerar a conversão aplicada.</li>
        <li>Não force 10 bits apenas pelo painel; confirme suporte de cada etapa e do modo usado.</li>
        <li>Não confunda banding com posterização intencional, macroblocos de vídeo, contorno de nitidez ou moiré da foto da tela.</li>
      </ul>

      <h2>Limites do teste</h2>
      <p>O navegador pode informar capacidades aproximadas de gamut e faixa dinâmica, mas isso não certifica profundidade efetiva nem precisão. Para aceitar um monitor em produção, use padrões apropriados ao sinal, gerador ou software validado, medição instrumental e critérios definidos. A sequência acima serve para reduzir hipóteses e produzir um relato reproduzível para suporte técnico ou para a equipe de pós-produção.</p>
    `
  },
  {
    slug: 'teste-contraste-gama-monitor',
    toolId: 'calibration',
    title: 'Contraste e Resposta Tonal do Monitor: Teste Visual',
    h1: 'Como Verificar Sombras, Realces e Resposta Tonal do Monitor',
    description: 'Use padrões visuais para observar recorte e separação tonal, entender funções de transferência e registrar ajustes sem confundir triagem com medição.',
    relatedSlugs: ['calibrar-monitor-fotografia-design', 'monitor-para-edicao-video'],
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-09',
    sources: [
      {
        label: 'W3C — CSS Color Module Level 4',
        url: 'https://www.w3.org/TR/css-color-4/',
        note: 'Descreve a função de transferência segmentada do sRGB e o processamento de cores na Web.'
      },
      {
        label: 'ITU — Recommendation BT.1886',
        url: 'https://www.itu.int/rec/R-REC-BT.1886-0-201103-I',
        note: 'Especifica uma função eletro-óptica de referência para monitores planos usados em produção HDTV.'
      },
      {
        label: 'ICC — Rec. 709 reference display profile',
        url: 'https://registry.color.org/profile-library/rec709',
        note: 'Perfil de referência registrado pelo ICC para conteúdo Rec. 709 em condições descritas.'
      }
    ],
    faq: [
      ['Um padrão visual mede a relação de contraste?', 'Não. Ele permite observar separação de níveis sob uma condição específica, mas a relação de contraste requer medir luminância de branco e preto com método definido.'],
      ['Gamma 2,2 é o alvo de todo conteúdo?', 'Não. sRGB usa uma função segmentada, e fluxos de vídeo ou HDR adotam outras funções e condições. O alvo deve vir do padrão de entrega e do ambiente de referência.'],
      ['O que pode esconder detalhes nas sombras?', 'Faixa de sinal incompatível, nível de preto, curva tonal, processamento, perfil, reflexos e luz ambiente podem aproximar níveis escuros. O padrão ajuda a observar o efeito, não determina a causa sozinho.']
    ],
    body: `
      <h2>O teste mostra separação; não mede contraste</h2>
      <p>Um padrão de níveis próximos ao preto e ao branco mostra se diferenças codificadas continuam perceptíveis na configuração atual. Ele é útil para flagrar recorte evidente, faixa RGB incompatível ou processamento variável. Não mede a relação de contraste e não calcula a função de transferência real do monitor. Essas tarefas exigem um instrumento, padrões compatíveis com o sinal e um procedimento controlado.</p>
      <p>Também é impreciso chamar toda resposta tonal de “gamma 2,2”. sRGB usa uma função segmentada. Em vídeo, BT.1886 descreve uma função eletro-óptica para condições específicas de monitor de referência. HDR emprega outras funções. Antes de ajustar a tela, identifique se você está avaliando web sRGB, fotografia, vídeo SDR, HDR ou apenas conforto de uso.</p>

      <h2>Conceitos necessários para não corrigir o problema errado</h2>
      <table>
        <thead><tr><th scope="col">Termo</th><th scope="col">Significado prático</th></tr></thead>
        <tbody>
          <tr><td>Nível codificado</td><td>O número armazenado ou transmitido; ele não é, por si só, a luminância emitida.</td></tr>
          <tr><td>Função de transferência</td><td>Relação definida entre sinal e luz ao codificar, transportar ou exibir a imagem.</td></tr>
          <tr><td>Faixa de sinal</td><td>Mapeamento dos códigos usado pela cadeia. Uma incompatibilidade pode comprimir ou recortar extremos.</td></tr>
          <tr><td>Relação de contraste</td><td>Relação entre luminâncias medidas de branco e preto sob condições declaradas.</td></tr>
          <tr><td>Contraste do OSD</td><td>Controle do monitor que pode alterar ganho, recorte ou processamento; não equivale à relação medida.</td></tr>
        </tbody>
      </table>

      <h2>Preparação do teste</h2>
      <ul>
        <li>Use a resolução nativa e confirme se computador, GPU e monitor concordam sobre faixa completa ou limitada para o modo escolhido.</li>
        <li>Selecione um modo conhecido e registre brilho, contraste, nível de preto, HDR e recursos dinâmicos. Evite “melhorias” automáticas durante a comparação.</li>
        <li>Elimine reflexos diretos. Uma sala completamente escura e uma sala muito clara produzem leituras visuais diferentes; anote a condição em vez de procurar uma regra universal.</li>
        <li>Abra a página em escala de 100%, tela cheia e navegador atualizado. Desative filtros noturnos e extensões que mudem cor ou contraste.</li>
        <li>Espere a tela estabilizar conforme orientação do fabricante e dê alguns minutos para adaptação visual antes de julgar os níveis mais escuros.</li>
      </ul>

      <h2>Checklist reproduzível para sombras e realces</h2>
      <ol>
        <li>Comece com os controles no modo documentado, sem tentar maximizar a quantidade de degraus visíveis.</li>
        <li>Observe os níveis escuros no centro da tela. Anote o primeiro degrau que consegue distinguir do fundo, sem aproximar o rosto ou mudar o ângulo para “encontrá-lo”.</li>
        <li>Repita nos cantos para perceber variação de uniformidade e ângulo. Não corrija uniformidade com o controle de brilho.</li>
        <li>Observe os níveis claros e registre onde dois degraus passam a parecer iguais. Reduza contraste apenas se o manual e o modo permitirem, uma etapa por vez.</li>
        <li>Verifique um gradiente neutro. Procure dominante, inversão local, contornos de nitidez e mudanças causadas por dimming ou contraste dinâmico.</li>
        <li>Abra o mesmo padrão em outro aplicativo ou dispositivo. Se a diferença seguir o arquivo ou aplicativo, investigue o fluxo de cor e a renderização.</li>
        <li>Retorne ao valor inicial, repita e compare as anotações. Uma mudança só é útil se for estável e não prejudicar outras partes da escala.</li>
      </ol>

      <h2>Como interpretar sem transformar indício em certeza</h2>
      <p>Se sombras e realces forem recortados ao mesmo tempo, confira primeiro faixa do sinal e modos automáticos. Se apenas as sombras mudarem conforme a luz da sala, reflexos e adaptação visual podem ser relevantes. Se o comportamento variar com a posição da cabeça, ângulo de visão e tecnologia do painel entram na investigação. Se apenas um aplicativo divergir, compare perfis, gerenciamento de cor e configurações de reprodução.</p>
      <p>Ver todos os degraus também não significa que a curva esteja correta: aumentar demais o nível de preto pode revelar códigos escuros e, ao mesmo tempo, reduzir profundidade visual. Da mesma forma, preservar realces não prova que branco, luminância ou contraste estejam no alvo.</p>

      <h2>Erros comuns e limites</h2>
      <ul>
        <li>Ajustar brilho e contraste simultaneamente e perder a referência da mudança.</li>
        <li>Usar uma captura fotográfica automática para comparar preto entre telas.</li>
        <li>Aplicar um alvo de vídeo a conteúdo web sem confirmar função, faixa e condições.</li>
        <li>Interpretar preto mais escuro como maior fidelidade sem verificar detalhes e estabilidade.</li>
        <li>Alterar o arquivo para compensar uma tela não caracterizada.</li>
      </ul>
      <p>Este teste é uma triagem perceptiva. Controle de qualidade para edição, masterização ou impressão requer medição de luminância e cromaticidade, padrões adequados, validação do caminho do sinal e critérios registrados. O valor do procedimento visual está em revelar mudanças e permitir que outra pessoa repita a observação nas mesmas condições.</p>
    `
  },
  {
    slug: 'monitor-para-edicao-video',
    toolId: 'calibration',
    title: 'Como Comparar um Monitor para Edição de Vídeo',
    h1: 'Monitor para Edição de Vídeo: Critérios por Tipo de Entrega',
    description: 'Organize a escolha do monitor pelo padrão de entrega, caminho do sinal, uniformidade, medição e condições reais de trabalho em SDR ou HDR.',
    relatedSlugs: ['calibrar-monitor-fotografia-design', 'o-que-e-color-banding'],
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-09',
    sources: [
      {
        label: 'ITU — Recommendation BT.2100',
        url: 'https://www.itu.int/rec/r-rec-bt.2100',
        note: 'Parâmetros oficiais de imagem para produção e intercâmbio de televisão HDR.'
      },
      {
        label: 'ITU — Recommendation BT.1886',
        url: 'https://www.itu.int/rec/R-REC-BT.1886-0-201103-I',
        note: 'Função eletro-óptica de referência para monitores planos em produção HDTV.'
      },
      {
        label: 'W3C — Media Queries Level 5',
        url: 'https://www.w3.org/TR/mediaqueries-5/',
        note: 'Esclarece que indicações do navegador sobre gamut e faixa dinâmica são aproximadas.'
      }
    ],
    faq: [
      ['Qual cobertura de gamut é necessária?', 'Depende do padrão de entrega. Compare cobertura e volume medidos no modo que será usado; um percentual de marketing sem método, alvo e relatório não descreve a precisão.'],
      ['O que um número de Delta E informa?', 'Informa diferença segundo uma fórmula e amostras determinadas. É preciso conhecer fórmula, referência, distribuição, máximo, média, instrumento e condições; um único valor não resume uniformidade nem comportamento tonal.'],
      ['Um selo HDR torna o monitor adequado para masterização?', 'Não sozinho. O fluxo precisa avaliar função de transferência, luminância, nível de preto, gamut, controle de luz, estabilidade, sinais aceitos e os requisitos da entrega.']
    ],
    body: `
      <h2>Comece pelo arquivo que precisa entregar</h2>
      <p>O monitor adequado para edição de vídeo é aquele que consegue representar, de forma mensurável e estável, o padrão que você precisa entregar dentro do orçamento e do nível de risco do projeto. Uma lista genérica de resolução, gamut e selo HDR não resolve essa escolha. Primeiro defina o contrato de entrega e o ambiente. Depois, compare as especificações verificáveis e os relatórios do modo que será usado.</p>
      <p>Há diferença entre uma tela de interface para montar a linha do tempo, uma tela de confiança para decisões criativas e um monitor de referência para controle de qualidade. A mesma produção pode usar funções separadas. Chamar qualquer painel amplo de “referência” cria uma expectativa que cobertura de gamut ou calibração de fábrica isoladas não sustentam.</p>

      <h2>Transforme o contrato de entrega em requisitos</h2>
      <p>A tabela abaixo organiza o uso antes de comparar modelos.</p>
      <table>
        <thead><tr><th scope="col">Uso</th><th scope="col">Perguntas antes da compra</th><th scope="col">Evidência útil</th></tr></thead>
        <tbody>
          <tr><td>Web e vídeo SDR</td><td>Qual espaço, função de transferência, faixa e ambiente a equipe adotará?</td><td>Um relatório medido no modo correspondente e um caminho de sinal documentado.</td></tr>
          <tr><td>Broadcast SDR</td><td>Quais parâmetros e tolerâncias o cliente ou emissora exige?</td><td>Especificação de entrega, validação periódica e monitoramento do sinal.</td></tr>
          <tr><td>Revisão HDR</td><td>É uma prévia de criação ou masterização contratual? Qual sistema HDR?</td><td>Medições de EOTF, luminância, preto, gamut e comportamento do controle de luz.</td></tr>
          <tr><td>Trabalho híbrido</td><td>Como SDR e HDR serão alternados sem perder configurações?</td><td>Modos independentes, presets documentados e validação de cada cadeia.</td></tr>
        </tbody>
      </table>

      <h2>Checklist de comparação técnica</h2>
      <ol>
        <li><strong>Sinais e conexões:</strong> confirme resolução, cadência, profundidade, subamostragem e faixa aceitas nas entradas que seu hardware realmente usa. Compatibilidade nominal não garante tratamento igual em todos os modos.</li>
        <li><strong>Gamut:</strong> procure cobertura e volume, ambos medidos. Um painel pode cobrir as bordas do espaço e ainda errar cores ou exceder o alvo sem gerenciamento adequado.</li>
        <li><strong>Resposta tonal:</strong> veja se há medições da função relevante, recorte, comportamento próximo ao preto e resposta em diferentes níveis. Para HDR, observe também o mapeamento de tons.</li>
        <li><strong>Uniformidade:</strong> peça dados de luminância e cromaticidade em várias posições. Uma média no centro não descreve bordas, manchas ou variação angular.</li>
        <li><strong>Estabilidade:</strong> verifique deriva ao aquecer, repetibilidade entre modos, controle automático de brilho e política de atualização de firmware.</li>
        <li><strong>Calibração:</strong> confirme instrumentos e software suportados, possibilidade de LUT interna, limitações do fluxo e como exportar um relatório de validação.</li>
        <li><strong>Ambiente e ergonomia:</strong> considere reflexos, controle da luz, tamanho à distância de trabalho, ruído, ventilação e espaço para uma saída de vídeo dedicada.</li>
        <li><strong>Operação:</strong> avalie garantia, assistência, política para pixels ou uniformidade, disponibilidade de peças e custo de recalibração.</li>
      </ol>

      <h2>Como ler alegações de fabricante e avaliações</h2>
      <p>“99% de um espaço” precisa de método, modo, unidade e tolerância. “Delta E menor que” precisa dizer qual fórmula, quantas amostras e se o número é média ou máximo. “10 bits” pode se referir ao painel, ao processamento interno ou ao sinal aceito. “HDR” pode indicar compatibilidade de entrada sem demonstrar luminância, preto ou controle necessários ao seu uso.</p>
      <p>Prefira avaliações que publiquem condições, instrumento, gráficos e comportamento em mais de um nível. Compare unidades, porque uma amostra não representa toda a produção. Se possível, teste seu software, interface de vídeo e formatos antes do fim do prazo de devolução. Padrões de navegador ajudam a observar gradientes e recorte, mas o próprio navegador informa capacidades de forma aproximada e não valida a cadeia de pós-produção.</p>

      <h2>Procedimento de aceitação após a compra</h2>
      <ol>
        <li>Registre o identificador da unidade de forma privada, firmware, horas de uso, entradas e presets.</li>
        <li>Verifique pixels, danos, reflexos e uniformidade com campos adequados, sem confundir fotografias com medição.</li>
        <li>Teste todos os sinais e cadências do trabalho, incluindo alternância entre modos e retomada após repouso.</li>
        <li>Calibre e caracterize com o método previsto. Valide com amostras independentes e guarde o relatório inicial.</li>
        <li>Compare um projeto conhecido em toda a cadeia e confirme faixa, níveis, gerenciamento de cor e saída limpa do software.</li>
        <li>Defina periodicidade de nova medição com base na estabilidade observada e na criticidade da entrega.</li>
      </ol>

      <h2>Erros comuns e limites</h2>
      <ul>
        <li>Comprar pela maior resolução quando conexão, escala da interface ou distância de trabalho são o limite real.</li>
        <li>Confundir DCI-P3 com Display P3 ou usar o nome “P3” sem confirmar primárias e ponto branco.</li>
        <li>Decidir HDR pelo brilho de pico anunciado sem entender duração, área da janela e controle de preto.</li>
        <li>Aplicar um perfil ICC à interface e supor que toda saída de vídeo dedicada seguirá o mesmo caminho.</li>
        <li>Usar uma TV ou monitor de consumo para aprovação crítica sem declarar as limitações à equipe e ao cliente.</li>
      </ul>
      <p>Nenhuma página web certifica um monitor. Para masterização ou conformidade contratual, siga a especificação atual do destinatário, use uma cadeia validada e mantenha registros de medição. Para edição geral, o mesmo método de requisitos evita pagar por recursos irrelevantes e revela onde uma segunda tela de referência ou revisão externa ainda é necessária.</p>
    `
  },
  {
    slug: 'chroma-key-sem-tecido-tela-verde',
    toolId: 'green-screen',
    title: 'Chroma Key com uma Tela como Fundo',
    h1: 'Como Testar Chroma Key com Monitor, TV ou Tablet',
    description: 'Use uma tela como fundo de chroma key em enquadramentos pequenos, controle reflexos e moiré e ajuste o recorte com um checklist reproduzível.',
    relatedSlugs: ['fundo-cor-fotos-produto', 'cores-streaming-cenarios'],
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-09',
    sources: [
      {
        label: 'OBS Studio — Chroma Key Filter',
        url: 'https://obsproject.com/kb/chroma-key-filter',
        note: 'Documentação dos controles de similaridade, suavidade, redução de spill e opacidade do filtro.'
      },
      {
        label: 'OBS Studio — Filters Guide',
        url: 'https://obsproject.com/kb/Filters-Guide',
        note: 'Guia oficial para adicionar e organizar filtros em fontes de vídeo.'
      },
      {
        label: 'W3C — CSS Color Module Level 4',
        url: 'https://www.w3.org/TR/css-color-4/',
        note: 'Referência para a interpretação das cores CSS enviadas ao navegador.'
      }
    ],
    faq: [
      ['Quando uma tela funciona como fundo de chroma key?', 'Quando cobre todo o enquadramento atrás de um objeto ou rosto, aparece uniforme para a câmera e não cria reflexo, moiré ou flicker excessivos. É mais prática em planos pequenos.'],
      ['Existe um verde RGB universal para o recorte?', 'Não. A cor escolhida precisa se separar do sujeito e dos objetos, e o resultado capturado depende do painel, câmera, exposição, balanço de branco, compressão e luz ambiente.'],
      ['Como reduzir spill verde?', 'Afaste o sujeito da tela, reduza a emissão até manter um fundo bem registrado, ilumine o sujeito separadamente e use o controle de redução de spill com moderação.']
    ],
    body: `
      <h2>Quando a tela funciona como fundo de chroma key</h2>
      <p>Um monitor, uma TV ou um tablet pode servir como fundo de chroma key quando a área luminosa cobre todo o quadro atrás do sujeito. É uma solução prática para objetos, miniaturas, cabeça e ombros ou demonstrações de webcam. Para corpo inteiro, movimento amplo ou cabelo muito solto, o tamanho da tela e a curta distância costumam aumentar spill, reflexos e recortes difíceis; um fundo físico iluminado separadamente oferece mais espaço de controle.</p>
      <p>A tela não fornece um “verde perfeito”. Um valor CSS define números enviados ao navegador, enquanto o painel, seu modo de imagem e a câmera determinam o sinal gravado. O critério útil é separação consistente entre fundo e primeiro plano, sem recortar roupas, olhos, transparências ou detalhes do produto.</p>

      <h2>Prepare o enquadramento antes de escolher a cor</h2>
      <ul>
        <li>Monte a câmera na resolução e taxa de quadros que serão usadas na gravação ou transmissão. Avalie sempre a saída final, não apenas a tela do computador.</li>
        <li>Preencha todo o fundo visível com a tela. Bordas, moldura e reflexos próximos criam cores que o filtro terá de tratar separadamente.</li>
        <li>Limpe a tela e retire películas brilhantes soltas. Observe pixels, grade, faixas e reflexos no foco real da lente.</li>
        <li>Separe o sujeito do painel tanto quanto o espaço permitir. A distância reduz a luz colorida refletida e permite desfocar a estrutura da tela.</li>
        <li>Ilumine rosto ou objeto com uma fonte independente. A tela deve resolver o fundo; usá-la também como luz principal verde aumenta contaminação.</li>
        <li>Desative balanço de branco e exposição automáticos se a câmera oferecer controle estável. Caso contrário, espere os ajustes automáticos estabilizarem antes de avaliar.</li>
      </ul>

      <h2>Procedimento reproduzível no OBS</h2>
      <ol>
        <li>Escolha verde, azul ou outra cor que não apareça no sujeito. Comece com saturação suficiente para separar o fundo sem levar o brilho ao máximo.</li>
        <li>Faça uma gravação curta sem filtro. Inclua mãos, cabelo, bordas transparentes, superfícies metálicas e o movimento mais rápido previsto.</li>
        <li>Examine o arquivo em tamanho real. Se aparecer grade ou moiré, aumente a distância, mude levemente o enquadramento ou deixe o painel fora do plano de foco. Não há abertura de lente válida para todas as câmeras.</li>
        <li>Se houver faixas móveis, teste ajustes de obturador e as opções anti-flicker da câmera, uma de cada vez. Taxa nominal do painel não determina sozinha o ajuste correto porque modulação de brilho e leitura do sensor também interferem.</li>
        <li>No OBS, selecione a fonte de câmera, abra <strong>Filtros</strong>, adicione <strong>Chroma Key</strong> e escolha a família de cor mais próxima. Use cor personalizada apenas quando souber qual amostra está sendo capturada.</li>
        <li>Aumente <strong>Similarity</strong> apenas até remover o fundo principal. Depois ajuste <strong>Smoothness</strong> para a borda e <strong>Spill Reduction</strong> para reflexos, verificando se pele e produto não perdem cor.</li>
        <li>Grave novamente com o fundo final. Revise quadros em pausa e em movimento, além da saída já comprimida pela plataforma.</li>
      </ol>

      <h2>Interpretação dos defeitos</h2>
      <table>
        <thead><tr><th scope="col">Sinal observado</th><th scope="col">Ajuste para testar</th></tr></thead>
        <tbody>
          <tr><td>Borda verde no sujeito</td><td>Aumentar distância, reduzir emissão do painel e reforçar luz neutra no primeiro plano.</td></tr>
          <tr><td>Partes da roupa desaparecem</td><td>Trocar a cor de chave ou reduzir Similarity; a roupa está próxima do fundo no sinal capturado.</td></tr>
          <tr><td>Contorno serrilhado ou instável</td><td>Rever foco, compressão, exposição e Smoothness sem apagar detalhes finos.</td></tr>
          <tr><td>Manchas não removidas</td><td>Eliminar reflexos, uniformizar o ângulo visto pela câmera e ajustar a luz do ambiente.</td></tr>
          <tr><td>Ondas ou grade na imagem</td><td>Alterar distância, foco, escala ou enquadramento para reduzir interferência com a matriz de pixels.</td></tr>
        </tbody>
      </table>

      <h2>Erros comuns</h2>
      <ul>
        <li>Aumentar Similarity até remover o fundo e ignorar buracos no rosto ou produto.</li>
        <li>Julgar pelo preview reduzido, onde compressão e redimensionamento escondem bordas.</li>
        <li>Usar brilho máximo e depois tentar corrigir spill apenas por software.</li>
        <li>Misturar luz verde no sujeito com balanço de branco automático, que muda durante a cena.</li>
        <li>Trocar fundo, câmera e filtro ao mesmo tempo e perder a causa da melhora ou piora.</li>
      </ul>

      <h2>Limites do método</h2>
      <p>Vidro, líquidos, transparências, fumaça, cabelo fino e desfoque de movimento exigem recortes mais cuidadosos. Uma tela pequena também restringe o ângulo e pode iluminar o sujeito de maneira pouco natural. Mantenha o arquivo sem chave para refazer o efeito, siga os limites de uso do painel e faça um teste completo antes de uma transmissão ao vivo. O procedimento reduz tentativas aleatórias, mas não substitui iluminação de fundo dedicada quando o acabamento precisa resistir a pós-produção exigente.</p>
    `
  },
  {
    slug: 'fundo-cor-fotos-produto',
    toolId: 'color',
    title: 'Como Usar uma Tela como Fundo para Fotos de Produto',
    h1: 'Fundo de Cor em Tela para Fotografar Produtos Pequenos',
    description: 'Monte um fundo emissivo para objetos pequenos e controle foco, reflexos, moiré, flicker e fidelidade da cor com testes na própria câmera.',
    relatedSlugs: ['fotografia-produto-olx-mercado-livre', 'chroma-key-sem-tecido-tela-verde'],
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-09',
    sources: [
      {
        label: 'Sony — Anti-flicker shooting',
        url: 'https://helpguide.sony.net/ilc/2390/v1/en/contents/201h_anti_flicker_comparison.html',
        note: 'Exemplo oficial de como fontes intermitentes podem produzir faixas e exposição irregular em câmera.'
      },
      {
        label: 'Sony — Anti-flicker settings',
        url: 'https://helpguide.sony.net/ilc/2390/v1/en/contents/201h_anti_flicker_setting.html',
        note: 'Documenta ajustes de câmera para reduzir flicker em condições compatíveis.'
      },
      {
        label: 'W3C — CSS Color Module Level 4',
        url: 'https://www.w3.org/TR/css-color-4/',
        note: 'Define como valores de cor CSS são interpretados e convertidos no navegador.'
      }
    ],
    faq: [
      ['Quando vale usar um monitor como fundo?', 'Quando o produto e o enquadramento cabem diante da área útil da tela e você consegue controlar reflexos, foco e exposição. É especialmente útil para protótipos rápidos e fotos de objetos pequenos.'],
      ['Como reduzir moiré da grade de pixels?', 'Teste maior distância entre produto e tela, deixe o painel fora do plano de foco, altere levemente enquadramento ou escala e confira o arquivo em tamanho real. Não existe uma abertura fixa que funcione para toda lente e sensor.'],
      ['A cor exibida será igual à cor da foto?', 'Não necessariamente. Painel, perfil, balanço de branco, exposição, espectro da luz e processamento da câmera mudam a cor registrada. Use uma referência medida quando a fidelidade for requisito.']
    ],
    body: `
      <h2>Trate a tela como fundo emissivo</h2>
      <p>Uma tela pode criar fundos coloridos e gradientes para joias, miniaturas, frascos, componentes e outros objetos pequenos. Ela facilita trocar a aparência sem mover papel ou tecido, mas traz características próprias: emite luz, tem uma grade de pixels, pode modular o brilho e costuma ser refletiva. O resultado deve ser julgado no arquivo capturado, porque uma cor uniforme a olho nu pode revelar faixas, moiré ou manchas para a câmera.</p>
      <p>O foco deste método é construir a imagem. Regras para foto principal de catálogo ou marketplace pertencem à plataforma e à categoria; uma composição colorida pode servir para foto secundária, portfólio ou material editorial mesmo quando não é aceita como imagem principal.</p>

      <h2>Prepare o pequeno estúdio</h2>
      <ul>
        <li>Escolha uma tela grande o bastante para cobrir o enquadramento com margem. A moldura não deve aparecer em reflexos ou nas bordas do quadro.</li>
        <li>Apoie o produto em base firme e limpe produto, tela e lente. Poeira fica evidente em fundos lisos e superfícies brilhantes.</li>
        <li>Afaste o produto do monitor para controlar desfoque e reflexos. Observe se a tela passa a iluminar ou tingir bordas do objeto.</li>
        <li>Use tripé ou apoio quando precisar repetir ângulo e exposição. Marque posição de câmera, produto e tela para comparar versões.</li>
        <li>Adicione uma fonte neutra para modelar o produto. O monitor pode contribuir como preenchimento, mas raramente oferece potência e espectro equivalentes a uma luz fotográfica.</li>
        <li>Desative brilho adaptativo e proteção que altere a emissão conforme o conteúdo, se o fabricante permitir. Registre o brilho usado e respeite as orientações do painel.</li>
      </ul>

      <h2>Procedimento de captura</h2>
      <ol>
        <li>Defina primeiro a intenção: fundo neutro, contraste com o produto, gradiente ou reflexo colorido. Escolha uma cor que preserve a leitura de bordas e não simule outra cor real do item.</li>
        <li>Exiba a cor em tela cheia. O número CSS é um comando digital, não uma medição da luz emitida. Se a cor precisa ser reproduzida, inclua uma referência apropriada e use um fluxo de cor medido.</li>
        <li>Faça o foco no ponto importante do produto. Depois avalie a tela em tamanho real. Se a malha estiver visível, teste aumentar distância, alterar distância focal, mudar levemente o ângulo ou reduzir a profundidade de campo, observando se todo o produto necessário continua nítido.</li>
        <li>Exponha para o produto e confira histograma ou alertas de recorte. Reduza a emissão da tela se ela estourar, criar halo ou dominar superfícies reflexivas.</li>
        <li>Faça uma sequência curta com diferentes ajustes de obturador caso apareçam faixas. Use a função anti-flicker da câmera quando disponível e compatível. Valores como <strong>1/60</strong> ou <strong>1/120</strong> não são receita: frequência da rede, modulação do painel, taxa de quadros e leitura do sensor mudam o resultado.</li>
        <li>Capture uma versão com fundo neutro para comparação. Isso ajuda a identificar contaminação colorida no produto e fornece uma alternativa de edição.</li>
        <li>Revise os arquivos no tamanho de entrega, com atenção a bordas, transparências, reflexos, ruído e transições. Faça o ajuste final mudando uma variável por vez.</li>
      </ol>

      <h2>Como interpretar artefatos</h2>
      <table>
        <thead><tr><th scope="col">Artefato</th><th scope="col">Causa a investigar</th><th scope="col">Teste prático</th></tr></thead>
        <tbody>
          <tr><td>Moiré ou ondas</td><td>Interferência entre detalhe da tela, óptica, sensor e escala.</td><td>Mudar distância, foco, ângulo ou escala sem alterar tudo de uma vez.</td></tr>
          <tr><td>Faixas horizontais</td><td>Modulação da fonte combinada com obturador ou leitura do sensor.</td><td>Comparar ajustes de obturador e anti-flicker em uma sequência controlada.</td></tr>
          <tr><td>Halo colorido</td><td>Fundo brilhante, reflexo ou desfoque excessivo.</td><td>Reduzir emissão, afastar produto e usar anteparo fora do quadro.</td></tr>
          <tr><td>Cor desigual</td><td>Ângulo de visão, uniformidade, reflexos ou processamento da câmera.</td><td>Reenquadrar, bloquear luz ambiente e comparar arquivo bruto quando disponível.</td></tr>
        </tbody>
      </table>

      <h2>Erros comuns</h2>
      <ul>
        <li>Fixar abertura ampla e perder nitidez necessária no produto apenas para esconder pixels.</li>
        <li>Aceitar reflexos que mostram a interface, a moldura ou o fotógrafo.</li>
        <li>Usar saturação e brilho máximos, criando recorte e contaminação de cor.</li>
        <li>Confiar no balanço de branco automático entre fotos que precisam combinar.</li>
        <li>Editar a cor do produto para neutralizar o fundo e acabar representando o item de forma incorreta.</li>
      </ul>

      <h2>Limites do método</h2>
      <p>Objetos grandes, espelhos, metal polido e transparências podem expor a fonte e exigir modificadores físicos. A tela também não garante cor espectralmente adequada nem emissão uniforme. Se a fotografia documenta cor, acabamento ou condição para uma venda, mantenha uma imagem neutra e honesta, registre a configuração e use referências de cor compatíveis com o nível de precisão exigido.</p>
    `
  },
  {
    slug: 'fotografia-produto-olx-mercado-livre',
    toolId: 'color',
    title: 'Fotografia de Produto para Anúncios: Guia de Registro',
    h1: 'Como Fotografar Produtos para Venda Online com Clareza',
    description: 'Crie um conjunto de fotos que documente aparência, escala, acessórios e defeitos do produto e revise as regras atuais da plataforma antes de publicar.',
    relatedSlugs: ['fundo-cor-fotos-produto', 'iluminacao-videochamada-dicas'],
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-09',
    sources: [
      {
        label: 'Google Merchant Center — Image link specification',
        url: 'https://support.google.com/merchants/answer/6324350?hl=en',
        note: 'Requisitos oficiais para imagens principais em dados de produto do Google Merchant Center.'
      },
      {
        label: 'Google Merchant Center — Local product data specification',
        url: 'https://support.google.com/merchants/answer/14779112?hl=en',
        note: 'Exemplo oficial de campos e requisitos de imagem para produtos locais.'
      },
      {
        label: 'Sony — Anti-flicker shooting',
        url: 'https://helpguide.sony.net/ilc/2390/v1/en/contents/201h_anti_flicker_comparison.html',
        note: 'Mostra como fontes intermitentes podem causar faixas ou exposição desigual na fotografia.'
      }
    ],
    faq: [
      ['Qual fundo devo usar na foto principal?', 'Consulte a regra atual do canal, país, categoria e formato do anúncio. Quando a plataforma exigir produto isolado ou fundo claro, siga a especificação; use fotos adicionais para contexto e detalhes.'],
      ['Como fotografar a tela de um aparelho usado?', 'Limpe a superfície, evite reflexo direto, use um padrão neutro e fotografe também a tela desligada. Explique no anúncio que o padrão é demonstrativo e não esconda manchas, riscos ou defeitos.'],
      ['Quais defeitos precisam aparecer?', 'Registre desgaste, riscos, trincas, manchas, portas, reparos e itens ausentes que afetem a decisão. A descrição deve corresponder às fotos e às regras da plataforma.']
    ],
    body: `
      <h2>Fotografe para permitir uma decisão informada</h2>
      <p>Uma boa fotografia de anúncio mostra o produto real, sua condição, proporção, acessórios e pontos de desgaste sem depender de retoque para parecer novo. A foto principal identifica o item rapidamente; as demais respondem às dúvidas que um comprador faria ao examinar o objeto. Fundo e iluminação servem à leitura, não à ocultação de defeitos.</p>
      <p>Regras variam entre marketplace, categoria, formato de anúncio e região. Consulte a documentação vigente no momento da publicação. As orientações do Google Merchant Center são uma referência oficial para listagens que usam esse serviço, mas não substituem as políticas de OLX, Mercado Livre ou outro canal.</p>

      <h2>Prepare o produto e uma ficha de captura</h2>
      <ul>
        <li>Confira exatamente qual unidade, variante, cor, capacidade e conjunto de acessórios será vendido. Evite imagens de catálogo para representar um item usado específico.</li>
        <li>Limpe apenas com método seguro para o material. Não remova sinais que precisem ser declarados nem use produto que crie brilho temporário enganoso.</li>
        <li>Separe fundo simples, duas fontes difusas ou luz de janela controlada, apoio para câmera, régua ou objeto de escala quando pertinente e pano para reduzir reflexos.</li>
        <li>Registre privadamente número de série, nota e funcionamento. Antes de publicar, cubra ou desfoque identificadores, chaves, etiquetas de endereço e telas com dados pessoais.</li>
        <li>Leia os requisitos de dimensão, formato, conteúdo permitido, marcas d'água, bordas e fundo da plataforma. Guarde a data e o link da regra consultada.</li>
      </ul>

      <h2>Roteiro reproduzível de fotografias</h2>
      <ol>
        <li><strong>Vista principal:</strong> enquadre o produto inteiro, com linhas retas e espaço ao redor. Use fundo que o separe claramente e exposição que preserve branco e preto.</li>
        <li><strong>Lados e traseira:</strong> faça vistas coerentes de cada face relevante. Mantenha distância e altura semelhantes para facilitar comparação.</li>
        <li><strong>Escala:</strong> mostre dimensões com régua ou referência reconhecível quando o tamanho não for óbvio. Não use perspectiva extrema para aumentar ou reduzir a aparência.</li>
        <li><strong>Detalhes funcionais:</strong> registre portas, conectores, dobradiças, controles, etiquetas de modelo e acessórios, ocultando identificadores sensíveis.</li>
        <li><strong>Condição:</strong> ilumine riscos, trincas, manchas e reparos por um ângulo que os torne visíveis. Inclua uma vista ampla para localizar cada detalhe.</li>
        <li><strong>Funcionamento:</strong> para eletrônicos, mostre o aparelho ligado e, quando relevante, uma tela neutra ou padrão simples. Não apresente o padrão como diagnóstico completo; pixels defeituosos, uniformidade e flicker podem exigir outros registros.</li>
        <li><strong>Conteúdo da embalagem:</strong> fotografe juntos todos os itens incluídos e separe o que aparece apenas para contexto.</li>
        <li><strong>Revisão:</strong> confira foco, cor, recorte, reflexos e consistência com a descrição antes de exportar. Mantenha originais para responder a dúvidas.</li>
      </ol>

      <h2>Iluminação e fundo sem receita fixa</h2>
      <p>Uma fonte ampla próxima costuma produzir transições de sombra mais suaves, mas a posição depende da forma e do acabamento. Mova a luz observando se volume, textura e defeitos continuam legíveis. Flash frontal direto frequentemente aparece em vidro e metal; rebater ou difundir pode ajudar, desde que não reduza a potência a ponto de exigir ganho excessivo.</p>
      <p>Monitores podem fornecer fundo branco ou colorido para objetos pequenos. Revise a foto em tamanho real porque a tela pode criar moiré, faixas e reflexos. Se a fonte produzir flicker, teste os controles anti-flicker e diferentes ajustes de obturador da câmera; não aplique um valor universal. Para representar a cor do produto, use luz estável e referência adequada, e informe variações que o comprador possa ver em sua própria tela.</p>

      <h2>Checklist de honestidade antes de publicar</h2>
      <table>
        <thead><tr><th scope="col">Pergunta</th><th scope="col">Ação se a resposta for não</th></tr></thead>
        <tbody>
          <tr><td>A foto mostra a unidade realmente vendida?</td><td>Substitua imagem genérica ou identifique claramente seu papel.</td></tr>
          <tr><td>Defeitos citados podem ser localizados?</td><td>Inclua detalhe e uma vista ampla correspondente.</td></tr>
          <tr><td>Acessórios da foto estão todos incluídos?</td><td>Retire-os do quadro ou indique com clareza o que acompanha.</td></tr>
          <tr><td>A cor parece plausível em uma tela neutra?</td><td>Revise balanço, luz e edição; evite saturação decorativa na imagem documental.</td></tr>
          <tr><td>Não há dados pessoais ou credenciais visíveis?</td><td>Refaça ou oculte antes do envio.</td></tr>
        </tbody>
      </table>

      <h2>Erros comuns e limites</h2>
      <ul>
        <li>Usar apenas uma vista frontal limpa e deixar condição, traseira e acessórios sem prova.</li>
        <li>Clarear sombras até apagar riscos ou escurecer vidro para esconder manchas.</li>
        <li>Adicionar textos, selos ou montagens proibidos na imagem principal.</li>
        <li>Exibir contas abertas, notificações, chaves de software ou números de série completos.</li>
        <li>Prometer funcionamento que uma foto estática não consegue demonstrar.</li>
      </ul>
      <p>Fotos não substituem teste funcional, descrição completa, política de devolução ou comunicação com o comprador. Elas devem registrar o que é visualmente verificável. Para bens de valor, mantenha arquivos originais, data, ficha do item e evidência de embalagem de acordo com as regras aplicáveis.</p>
    `
  },
  {
    slug: 'cores-streaming-cenarios',
    toolId: 'color',
    title: 'Como Planejar Cores e Luz para um Cenário de Streaming',
    h1: 'Cores no Streaming: Paleta, Separação e Teste na Câmera',
    description: 'Monte uma paleta simples, preserve tons de pele, avalie compressão e use fontes de cor do OBS ou uma tela auxiliar com controle.',
    relatedSlugs: ['monitor-como-softbox-streamer', 'chroma-key-sem-tecido-tela-verde'],
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-09',
    sources: [
      {
        label: 'OBS Studio — Color Source',
        url: 'https://obsproject.com/kb/color-source',
        note: 'Documenta a criação de uma fonte de cor sólida dentro de uma cena do OBS.'
      },
      {
        label: 'OBS Studio — Color Correction Filter',
        url: 'https://obsproject.com/kb/color-correction-filter',
        note: 'Explica controles de correção de cor aplicados às fontes do OBS.'
      },
      {
        label: 'W3C — CSS Color Module Level 4',
        url: 'https://www.w3.org/TR/css-color-4/',
        note: 'Referência dos espaços e valores de cor usados pelo navegador.'
      }
    ],
    faq: [
      ['Quantas cores devo usar no cenário?', 'Comece com uma cor de base neutra e uma cor de destaque. Acrescente outra apenas se ela tiver função clara e continuar legível após captura e compressão.'],
      ['Uma paleta complementar sempre favorece a pele?', 'Não. Exposição, balanço de branco, espectro das luzes, câmera e tons presentes no ambiente alteram o resultado. Ajuste primeiro a reprodução do rosto e depois o fundo.'],
      ['Posso usar um monitor secundário como luz colorida?', 'Sim, como fonte auxiliar para parede ou contorno em setups pequenos. A cor emitida não é garantida pelo valor CSS e pode criar flicker, reflexos ou spill; teste na gravação final.']
    ],
    body: `
      <h2>Construa a cena a partir do rosto e da mensagem</h2>
      <p>Cores de fundo ajudam a separar o apresentador do ambiente, organizar a marca e indicar mudanças de quadro. Elas funcionam melhor quando não competem com pele, texto, produto ou captura de jogo. Em vez de começar por combinações populares, ajuste uma luz neutra para o rosto, defina uma cor de destaque com função clara e avalie o resultado depois da câmera e da compressão.</p>
      <p>O número escolhido em uma página ou fonte de cor do OBS não garante a aparência física. Painel, luminária, parede, balanço de branco, exposição, perfil e processamento mudam a cor capturada. A referência é a gravação produzida pela mesma cadeia da transmissão.</p>

      <h2>Mapeie os elementos da cena</h2>
      <ul>
        <li><strong>Sujeito:</strong> rosto, roupa, cabelo e movimento precisam manter separação do fundo.</li>
        <li><strong>Conteúdo:</strong> gameplay, slides, produtos e alertas têm cores próprias que podem colidir com o cenário.</li>
        <li><strong>Interface:</strong> texto, chat, legendas e bordas precisam de contraste no tamanho real de visualização.</li>
        <li><strong>Ambiente:</strong> parede, móveis e objetos refletem e misturam a luz; uma parede colorida não responde como uma tela.</li>
        <li><strong>Plataforma:</strong> resolução, taxa de bits e redimensionamento alteram gradientes, sombras e detalhes saturados.</li>
      </ul>

      <h2>Procedimento para criar uma paleta testável</h2>
      <ol>
        <li>Desligue temporariamente as luzes decorativas e configure enquadramento, foco e exposição para o rosto com uma fonte neutra. Trave balanço de branco e exposição quando o equipamento permitir.</li>
        <li>Escolha uma cor de fundo ligada ao conteúdo ou à identidade visual. Use saturação moderada e confirme que roupa, cabelo e cadeira não desaparecem contra ela.</li>
        <li>Adicione a cor à parede ou ao contorno. Se usar monitor, posicione-o fora do quadro e verifique reflexos nos olhos, óculos, pele e superfícies.</li>
        <li>Inclua uma segunda cor apenas para separar outro plano ou indicar hierarquia. Pares como ciano e âmbar podem oferecer contraste, mas não constituem regra e podem se aproximar de tons de pele após a captura.</li>
        <li>No OBS, crie uma <strong>Color Source</strong> quando precisar de bloco gráfico, fundo digital ou referência. Para câmera, aplique <strong>Color Correction</strong> somente depois de corrigir luz e ajustes do dispositivo.</li>
        <li>Grave uma amostra falando, movimentando as mãos e alternando cenas. Examine o arquivo local e uma transmissão privada ou não listada com as mesmas configurações de codificação.</li>
        <li>Revise em tela grande e em celular. Anote quais cores perdem separação, criam blocos ou dificultam legendas; ajuste uma variável por vez.</li>
      </ol>

      <h2>Interpretação prática</h2>
      <table>
        <thead><tr><th scope="col">Problema</th><th scope="col">Verificação</th><th scope="col">Possível ajuste</th></tr></thead>
        <tbody>
          <tr><td>Rosto assume cor do cenário</td><td>Compare com a luz decorativa desligada.</td><td>Afaste a fonte, use anteparo e fortaleça a luz neutra do rosto.</td></tr>
          <tr><td>Fundo vira blocos após transmissão</td><td>Compare gravação local com a saída da plataforma.</td><td>Reduza gradientes sutis, ruído e saturação; reveja a codificação disponível.</td></tr>
          <tr><td>Contorno desaparece</td><td>Observe roupa e cabelo contra cada cena.</td><td>Mude luminância ou matiz do fundo, não apenas a intensidade global.</td></tr>
          <tr><td>Texto perde leitura</td><td>Teste no tamanho real em telas menores.</td><td>Corrija contraste, fundo do componente e espessura tipográfica.</td></tr>
          <tr><td>Cor muda durante a fala</td><td>Procure exposição ou balanço automático.</td><td>Trave controles compatíveis ou reduza variações luminosas no quadro.</td></tr>
        </tbody>
      </table>

      <h2>Erros comuns</h2>
      <ul>
        <li>Usar três ou quatro luzes saturadas sem uma base neutra e tentar recuperar a pele por filtro.</li>
        <li>Aplicar correção global no OBS que também altera jogo, imagens ou elementos já finalizados.</li>
        <li>Escolher cores apenas no monitor de edição sem verificar a câmera e a transmissão comprimida.</li>
        <li>Manter o fundo mais brilhante que o assunto e compensar elevando demais a exposição do rosto.</li>
        <li>Confundir uma cena chamativa em captura estática com uma imagem confortável durante horas de conteúdo.</li>
      </ul>

      <h2>Limites do controle por tela</h2>
      <p>Um monitor secundário tem área útil, potência e espectro limitados. Paredes absorvem cores de modo diferente, e PWM ou outras formas de modulação podem produzir faixas na câmera. Para uma identidade cromática repetível entre episódios, registre posição, exposição, balanço, valores das fontes e horário, e considere luminárias controláveis e medição quando a correspondência com marca ou produto for crítica.</p>
    `
  },
  {
    slug: 'iluminacao-videochamada-dicas',
    toolId: 'white',
    title: 'Iluminação para Videochamadas: Ajuste e Verificação',
    h1: 'Como Melhorar a Iluminação em Videochamadas',
    description: 'Organize janela, câmera e luz frontal, use o monitor como apoio e confira como o aplicativo altera exposição e aparência.',
    relatedSlugs: ['temperatura-de-cor-explicada', 'monitor-como-softbox-streamer'],
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-09',
    sources: [
      {
        label: 'Google Meet Help — Change your video and audio settings',
        url: 'https://support.google.com/meet/answer/9302964?co=GENIE.Platform%3DDesktop&hl=en',
        note: 'Documenta configurações de vídeo e o ajuste automático de iluminação do Google Meet.'
      },
      {
        label: 'Google Meet Help — Requirements for using Google Meet',
        url: 'https://support.google.com/meet/answer/7317473?hl=en',
        note: 'Lista requisitos e fatores de hardware, navegador e conexão que afetam chamadas.'
      },
      {
        label: 'W3C — CSS Color Module Level 4',
        url: 'https://www.w3.org/TR/css-color-4/',
        note: 'Define a interpretação das cores RGB exibidas pelo navegador.'
      }
    ],
    faq: [
      ['Por que a imagem fica granulada em pouca luz?', 'A câmera pode elevar ganho e aplicar redução de ruído quando recebe pouca luz, mas lente, sensor, foco, compressão e processamento também afetam o detalhe. Não é possível atribuir a causa pelo preview sozinho.'],
      ['Devo evitar uma janela atrás de mim?', 'Contraluz intensa pode levar a exposição automática a escurecer o rosto. Fechar a cortina, mudar o enquadramento ou adicionar luz frontal costuma equilibrar a cena; a melhor solução depende do ambiente.'],
      ['O controle de branco do MonitorSmith define Kelvin real?', 'Não. Ele envia valores RGB nominais à tela. A luz emitida depende do painel e precisa ser medida para ter CCT conhecida. Use a prévia da chamada para ajuste visual.']
    ],
    body: `
      <h2>Equilibre o rosto antes de adicionar efeitos</h2>
      <p>Para melhorar uma videochamada, posicione a câmera, reduza a contraluz e ofereça ao rosto uma fonte frontal ampla e controlável. Uma janela, luminária difusa ou tela clara pode ajudar. O monitor funciona como preenchimento de curta distância; ele não tem potência, espectro ou medição garantidos e não deve ser tratado como luz calibrada.</p>
      <p>Ruído e perda de detalhe podem aumentar quando a câmera recebe pouca luz e compensa o sinal, mas também dependem de foco, lente, processamento, resolução, conexão e compressão. O objetivo prático é produzir uma imagem estável na prévia e confirmar que ela continua adequada no aplicativo e no dispositivo de quem recebe.</p>

      <h2>Prepare o ambiente antes da chamada</h2>
      <ul>
        <li>Limpe a lente e coloque a câmera próxima da altura dos olhos. Enquadramento e foco ruins não são corrigidos com mais brilho.</li>
        <li>Olhe para o fundo e remova fontes intensas apontadas à lente. Se houver janela atrás, teste cortina, persiana ou uma mudança de posição.</li>
        <li>Apague lâmpadas que criem sombras profundas sob os olhos ou mistura de cores difícil de controlar. Reacenda uma por vez para entender seu efeito.</li>
        <li>Abra a prévia no mesmo aplicativo da reunião. Zoom, Meet, Teams e outros serviços podem aplicar enquadramento, exposição, desfoque e correções próprios.</li>
        <li>Verifique conexão, câmera selecionada e resolução disponível. Iluminação não resolve limitação de rede nem seleção acidental de uma câmera inferior.</li>
      </ul>

      <h2>Procedimento de ajuste reproduzível</h2>
      <ol>
        <li>Faça uma captura de referência com as luzes atuais. Inclua rosto, camisa clara e objeto escuro para observar realces e sombras.</li>
        <li>Escolha a fonte principal. Uma janela frontal difusa ou luminária ampla pode funcionar; mova-a até os dois olhos ficarem legíveis e a pele não apresentar áreas recortadas.</li>
        <li>Ajuste o fundo separadamente. Reduza o brilho de janelas ou luminárias que chamem mais atenção que o rosto e afaste-se da parede se uma sombra dura dominar a imagem.</li>
        <li>Se ainda houver sombra forte, abra uma tela clara no monitor e aumente sua área visível. Ajuste brilho e tom observando a câmera, não o número exibido.</li>
        <li>Mova a janela ou a tela na mesa em pequenos passos. A posição correta é a que equilibra seus traços e evita reflexos, não um ângulo fixo aplicável a todos.</li>
        <li>Quando a câmera oferecer controles manuais confiáveis, ajuste exposição e balanço de branco após posicionar as luzes. Trave-os para impedir variações durante slides ou movimento. Se só houver automático, espere estabilizar.</li>
        <li>Confira opções do aplicativo. O Google Meet, por exemplo, pode oferecer ajuste automático de iluminação; compare ligado e desligado porque o processamento pode alterar ruído e aparência.</li>
        <li>Grave uma amostra ou faça uma chamada de teste. Mova as mãos, use óculos e compartilhe uma tela clara para verificar se a exposição muda.</li>
      </ol>

      <h2>Interpretação rápida</h2>
      <table>
        <thead><tr><th scope="col">Sintoma</th><th scope="col">Teste</th><th scope="col">Ajuste provável</th></tr></thead>
        <tbody>
          <tr><td>Rosto escuro e janela branca</td><td>Feche parcialmente a janela ou gire a mesa.</td><td>Reduzir contraluz e adicionar luz frontal.</td></tr>
          <tr><td>Imagem granulada</td><td>Aproxime uma fonte sem mudar a rede.</td><td>Mais luz útil; depois confira resolução e processamento.</td></tr>
          <tr><td>Óculos com retângulo branco</td><td>Mova a fonte enquanto observa o reflexo.</td><td>Alterar altura, lateralidade ou área clara da tela.</td></tr>
          <tr><td>Pele muda de cor</td><td>Desligue fontes coloridas uma por vez.</td><td>Reduzir a mistura e estabilizar o balanço de branco.</td></tr>
          <tr><td>Brilho oscila ao compartilhar tela</td><td>Compare controles automáticos ligados e desligados.</td><td>Travar exposição ou reduzir mudança luminosa no enquadramento.</td></tr>
        </tbody>
      </table>

      <h2>Erros comuns</h2>
      <ul>
        <li>Colocar uma luz pequena e intensa muito perto da lente, criando desconforto e realces duros.</li>
        <li>Usar tela branca no brilho máximo e deixar o rosto pálido ou os óculos cobertos por reflexo.</li>
        <li>Misturar janela azulada, lâmpada quente e monitor colorido e tentar neutralizar tudo com um filtro.</li>
        <li>Avaliar apenas a miniatura da própria imagem, que pode ocultar ruído e foco ruim.</li>
        <li>Aplicar desfoque ou correção forte sem verificar cabelos, fones e movimento.</li>
      </ul>

      <h2>Limites e conforto</h2>
      <p>A tela pode ajudar em uma reunião ocasional, mas ocupa espaço visual e sua emissão muda com o painel. Evite intensidade desconfortável e pausas prolongadas diante de um campo muito claro. Se você grava com frequência, uma luminária dedicada oferece posição e repetibilidade melhores. Para reuniões importantes, faça a chamada de teste no mesmo horário: a luz natural e a exposição do fundo podem mudar ao longo do dia.</p>
    `
  },
  {
    slug: 'monitor-como-softbox-streamer',
    toolId: 'white',
    title: 'Monitor como Luz de Preenchimento para Vídeo',
    h1: 'Como Usar o Monitor como Luz de Preenchimento',
    description: 'Entenda quando a área clara da tela suaviza sombras, como posicioná-la pela prévia e quais limitações diferenciam um monitor de uma softbox.',
    relatedSlugs: ['iluminacao-videochamada-dicas', 'cores-streaming-cenarios'],
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-09',
    sources: [
      {
        label: 'Sony — Anti-flicker shooting',
        url: 'https://helpguide.sony.net/ilc/2390/v1/en/contents/201h_anti_flicker_comparison.html',
        note: 'Mostra a relação prática entre fontes intermitentes, faixas e exposição na câmera.'
      },
      {
        label: 'Google Meet Help — Change your video and audio settings',
        url: 'https://support.google.com/meet/answer/9302964?co=GENIE.Platform%3DDesktop&hl=en',
        note: 'Referência oficial para prévia, câmera e ajuste de iluminação em chamadas.'
      },
      {
        label: 'W3C — CSS Color Module Level 4',
        url: 'https://www.w3.org/TR/css-color-4/',
        note: 'Define as cores RGB que a página solicita ao navegador, distintas de uma medição da emissão.'
      }
    ],
    faq: [
      ['Um monitor vira uma softbox de verdade?', 'Ele pode se comportar como fonte de área e suavizar sombras a curta distância, mas não oferece difusor, potência, montagem, espectro e controle de uma softbox fotográfica. É mais preciso chamá-lo de luz de preenchimento.'],
      ['Qual é o melhor ângulo para posicionar a tela?', 'Não há ângulo universal. Mova a fonte observando sombra, reflexos, óculos e formato do rosto na câmera; altura, distância e tamanho da tela mudam o resultado.'],
      ['Posso deixar a tela branca no brilho máximo?', 'Não é necessário. Ajuste somente até obter preenchimento útil, preserve conforto e siga as orientações do fabricante sobre brilho, calor, conteúdo estático e uso prolongado.']
    ],
    body: `
      <h2>Use a tela como preenchimento com limites claros</h2>
      <p>Uma área clara no monitor pode levantar sombras do rosto em webcam, streaming ou gravação de mesa. Quanto maior a área aparente da fonte vista pelo sujeito, mais gradual tende a ser a transição entre luz e sombra. Como a tela costuma ficar próxima, ela pode parecer grande mesmo com potência modesta. Ainda assim, não é uma softbox completa: faltam montagem flexível, difusão projetada, controle de feixe, espectro conhecido e saída constante.</p>
      <p>O uso mais previsível é como luz de preenchimento junto de uma janela ou luminária principal. Usada sozinha, a tela pode deixar a direção da luz plana, criar reflexo retangular nos olhos e variar de intensidade conforme o conteúdo da área de trabalho.</p>

      <h2>Prepare a cena e preserve uma referência</h2>
      <ul>
        <li>Fixe enquadramento, foco e distância da câmera. Uma mudança de posição do rosto altera o tamanho aparente da fonte.</li>
        <li>Defina a luz principal e reduza fontes coloridas desnecessárias. O preenchimento deve resolver uma sombra identificada.</li>
        <li>Abra a prévia ou faça gravação local na mesma resolução e taxa de quadros da produção.</li>
        <li>Registre brilho do painel, cor de fundo, modo de imagem e posição aproximada. Isso permite repetir o setup sem depender da memória.</li>
        <li>Desative brilho adaptativo e protetores que mudem o campo claro quando for seguro e permitido pelo fabricante.</li>
        <li>Comece abaixo do brilho máximo. Dê prioridade ao conforto, à ausência de recorte na pele e à estabilidade do painel.</li>
      </ul>

      <h2>Procedimento de posicionamento</h2>
      <ol>
        <li>Grave alguns segundos apenas com a luz principal. Observe qual lado do rosto perde detalhe e se essa sombra ajuda ou prejudica a leitura.</li>
        <li>Exiba uma área clara grande no monitor. Um branco neutro nominal é um ponto de partida, mas não representa CCT medida.</li>
        <li>Mova a tela ou sua janela clara lateralmente até preencher a sombra sem eliminar todo o volume. Não persiga um valor fixo de <strong>30</strong>, <strong>45</strong> ou outro ângulo: anatomia, óculos, distância e fonte principal determinam a posição.</li>
        <li>Ajuste a altura observando sombras sob olhos e queixo e reflexos em lentes. Se não puder mover o monitor, reduza a janela clara para deslocar o centro luminoso dentro da tela.</li>
        <li>Aumente o brilho em pequenos passos e confira histograma ou alertas de exposição quando disponíveis. Pare quando houver informação suficiente nas sombras; mais luz pode reduzir contraste desejado.</li>
        <li>Compare tons nominais mais quentes ou frios na própria câmera. Escolha o que se mistura melhor com a luz principal, sem interpretar o controle como medidor de Kelvin.</li>
        <li>Faça movimento normal, abra uma página escura e compartilhe uma tela. Garanta que a área usada como fonte permaneça constante ou use uma tela secundária dedicada.</li>
        <li>Revise a gravação em tamanho real e faça uma chamada ou transmissão privada para observar a compressão.</li>
      </ol>

      <h2>Leitura dos resultados</h2>
      <table>
        <thead><tr><th scope="col">Resultado</th><th scope="col">Mudança para testar</th></tr></thead>
        <tbody>
          <tr><td>Rosto sem volume</td><td>Reduzir o preenchimento ou afastar a área clara da direção da câmera.</td></tr>
          <tr><td>Reflexo retangular nos óculos</td><td>Mudar altura e lateralidade, diminuir a área branca ou inclinar a lente em relação à fonte.</td></tr>
          <tr><td>Um lado continua escuro</td><td>Aproximar ou ampliar a fonte aparente, sem elevar primeiro o ganho da câmera.</td></tr>
          <tr><td>Pele com dominante</td><td>Comparar a tela desligada e alinhar visualmente as fontes; medir quando a cor for crítica.</td></tr>
          <tr><td>Faixas na imagem</td><td>Testar obturador e recurso anti-flicker; não inferir a solução apenas pela taxa anunciada da tela.</td></tr>
        </tbody>
      </table>

      <h2>Erros comuns</h2>
      <ul>
        <li>Chamar a tela de luz difusa sem considerar que a superfície é diretamente emissiva e refletida nos olhos.</li>
        <li>Usar brilho máximo para compensar uma fonte principal mal posicionada.</li>
        <li>Deixar o balanço de branco automático reagir a cada mudança de página.</li>
        <li>Fixar a mesma posição para todas as pessoas e enquadramentos.</li>
        <li>Ignorar PWM, faixas ou variação de exposição que só aparecem no arquivo gravado.</li>
      </ul>

      <h2>Limites e uso prolongado</h2>
      <p>O monitor ocupa a linha de visão e pode causar desconforto quando exibe um campo claro intenso por longos períodos. Alguns painéis aplicam limitação automática de brilho; outros aquecem ou exigem cuidados com conteúdo estático. Consulte o manual do modelo. Se o setup precisa ser montado diariamente, iluminar mais de uma pessoa ou manter cor constante entre gravações, uma luminária de vídeo com difusão, suporte e controles independentes tende a oferecer uma solução mais repetível.</p>
    `
  },
  {
    slug: 'temperatura-de-cor-explicada',
    toolId: 'white',
    title: 'Temperatura de Cor e CCT: Como Interpretar',
    h1: 'Temperatura de Cor, CCT e D65 sem Confundir Medição e Aparência',
    description: 'Entenda CCT, D65, matiz e espectro e saiba por que um controle RGB nominal serve para comparação visual, não para medir Kelvin.',
    relatedSlugs: ['iluminacao-videochamada-dicas', 'calibrar-monitor-fotografia-design'],
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-09',
    sources: [
      {
        label: 'CIE — Correlated colour temperature',
        url: 'https://www.cie.co.at/eilvterm/17-23-068',
        note: 'Definição oficial do termo temperatura de cor correlacionada.'
      },
      {
        label: 'CIE — Standard Illuminant D65 data',
        url: 'https://www.cie.co.at/datatable/cie-standard-illuminant-d65',
        note: 'Dados oficiais de distribuição espectral do iluminante padrão D65.'
      },
      {
        label: 'W3C — CSS Color Module Level 4',
        url: 'https://www.w3.org/TR/css-color-4/',
        note: 'Define os valores RGB e espaços de cor usados para solicitar cores no navegador.'
      }
    ],
    faq: [
      ['O que é temperatura de cor correlacionada?', 'É uma descrição da cromaticidade de uma fonte em relação à cromaticidade de um radiador planckiano próximo, expressa em kelvin. Fontes com a mesma CCT podem ter espectros e reprodução de cor diferentes.'],
      ['D65 significa simplesmente 6500 K?', 'Não. D65 é um iluminante padrão definido por uma distribuição espectral e cromaticidade. Usar “6500 K” em uma interface ou lâmpada não demonstra correspondência com D65.'],
      ['O controle do MonitorSmith mede a luz da tela?', 'Não. Ele calcula valores RGB nominais para comparação. A emissão final depende do painel, modo, perfil e brilho; medir CCT exige instrumento e método adequados.']
    ],
    body: `
      <h2>O número da interface não é uma medição</h2>
      <p>Temperatura de cor correlacionada, ou CCT, descreve a cromaticidade de uma fonte por sua proximidade a um radiador planckiano, em kelvin. Ela não informa sozinha o espectro completo, a capacidade de reproduzir cores, a intensidade ou a componente de matiz fora desse caminho. Duas fontes podem receber a mesma CCT e produzir aparência diferente em pele, tinta, tecido ou câmera.</p>
      <p>Quando uma ferramenta web associa um controle numérico a um branco RGB, ela gera uma aproximação visual. O navegador envia valores digitais; o monitor os converte em luz segundo primárias, perfil, modo, brilho e estado do painel. Sem medir a emissão, o valor exibido não é a CCT real e não calibra a fonte.</p>

      <h2>Separe conceitos que costumam ser misturados</h2>
      <table>
        <thead><tr><th scope="col">Conceito</th><th scope="col">O que descreve</th><th scope="col">O que não garante</th></tr></thead>
        <tbody>
          <tr><td>Temperatura de cor</td><td>Cromaticidade de um radiador planckiano em determinada temperatura.</td><td>Comportamento de qualquer fonte não planckiana.</td></tr>
          <tr><td>CCT</td><td>Correspondência aproximada de cromaticidade com um radiador próximo.</td><td>Espectro, qualidade de reprodução ou ausência de matiz verde e magenta.</td></tr>
          <tr><td>D65</td><td>Iluminante padrão com distribuição espectral definida pela CIE.</td><td>Que qualquer seletor “6500 K” reproduza essa distribuição.</td></tr>
          <tr><td>Ponto branco</td><td>Cromaticidade tratada como branco em um sistema ou condição.</td><td>Uma única luminância ou adaptação igual entre ambientes.</td></tr>
          <tr><td>RGB da tela</td><td>Comando digital convertido pelas primárias do display.</td><td>CCT conhecida sem caracterização e medição.</td></tr>
        </tbody>
      </table>

      <h2>Como fazer uma comparação visual útil</h2>
      <ol>
        <li>Defina a finalidade: preencher sombras em uma videochamada, comparar aparência de brancos ou trabalhar em um fluxo de cor. A precisão exigida muda o método.</li>
        <li>Reduza a mistura de fontes. Feche ou estabilize a luz natural e desligue lâmpadas coloridas que não fazem parte do teste.</li>
        <li>Fixe brilho e modo do monitor. Desative temporariamente filtro noturno, brilho adaptativo e mudanças automáticas de ponto branco, quando houver controle seguro.</li>
        <li>Exiba primeiro um branco neutro nominal e dê tempo para adaptação. Observe na câmera e no ambiente, sem tratar a visão como instrumento absoluto.</li>
        <li>Compare uma opção nominalmente mais baixa e outra mais alta mantendo a intensidade o mais próxima possível. Se o brilho também mudar, registre que duas variáveis foram alteradas.</li>
        <li>Para webcam, estabilize exposição e balanço de branco quando suportado e grave amostras. Para fotografia, inclua uma referência adequada ao fluxo e avalie o arquivo em aplicativo gerenciado.</li>
        <li>Retorne ao ponto inicial e repita. Se a preferência mudar com a ordem, luz externa ou adaptação, o resultado é contextual e não deve ser registrado como calibração.</li>
      </ol>

      <h2>Como interpretar a faixa nominal</h2>
      <ul>
        <li><strong>Valores nominais mais baixos:</strong> a aproximação RGB costuma parecer mais amarelada ou avermelhada. Isso não confirma a CCT emitida.</li>
        <li><strong>Região intermediária:</strong> pode parecer neutra depois da adaptação visual, mas neutralidade percebida depende do entorno e do observador.</li>
        <li><strong>Valores nominais mais altos:</strong> a aproximação costuma parecer mais azulada. Um azul mais intenso não comprova uma CCT específica.</li>
        <li><strong>Desvio verde ou magenta:</strong> pode permanecer mesmo quando duas fontes têm CCT semelhante; a CCT é uma descrição em uma dimensão e não resolve todo desvio de cromaticidade.</li>
      </ul>

      <h2>D65 em fotografia, design e vídeo</h2>
      <p>D65 aparece como iluminante e ponto branco de referência em vários sistemas de cor, inclusive sRGB, mas isso não transforma uma lâmpada rotulada como 6500 K em condição de referência. O ambiente de observação, a luminância, o espectro da luz e a caracterização da tela continuam relevantes. Em impressão, siga a condição de visualização e os perfis do fornecedor; em vídeo, siga o padrão e o ambiente definidos para a entrega.</p>
      <p>Se a tarefa é apenas melhorar a aparência da webcam, uma comparação nominal pode ser suficiente: escolha o tom que se mistura com a fonte principal e mantém pele plausível no arquivo. Se a tarefa é aprovar cor, medir é necessário.</p>

      <h2>Erros comuns e limites</h2>
      <ul>
        <li>Dizer que uma tela “está em 6500 K” porque um controle do navegador mostra esse número.</li>
        <li>Confundir CCT com índice de reprodução de cor, espectro, luminância ou matiz.</li>
        <li>Ajustar uma tela visualmente para coincidir com outra sem saber qual delas representa o alvo.</li>
        <li>Usar câmera em balanço automático para comparar fontes; ela pode neutralizar justamente a diferença observada.</li>
        <li>Tratar D65 como descrição genérica da luz do dia, que varia com horário, céu, orientação e ambiente.</li>
      </ul>
      <p>Esta ferramenta fornece uma visualização RGB nominal. Medições de CCT, cromaticidade e distribuição espectral exigem equipamento adequado, geometria definida e condições registradas. Para saúde, sono ou tratamento de sensibilidade à luz, procure orientação profissional e não derive recomendações clínicas de um seletor de cor.</p>
    `
  },
];
