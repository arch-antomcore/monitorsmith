export default [
  {
    slug: 'backlight-bleed-como-testar',
    title: 'Backlight bleed: protocolo de inspeção visual em monitores LCD',
    h1: 'Como inspecionar backlight bleed em um monitor LCD',
    description: 'Use um protocolo controlado para comparar áreas claras em cenas escuras, registrar as condições e levar evidências úteis ao suporte.',
    toolId: 'black',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    sources: [
      {
        label: 'Dell — Troubleshooting light leakage or bleeding on an LCD display',
        url: 'https://www.dell.com/support/kbdoc/en-us/000132299/troubleshooting-light-leakage-bleeding-on-a-lcd-monitor-or-notebook-lcd-screen',
        note: 'Orientação do fabricante sobre iluminação ambiente, brilho, ângulo de observação e comparação entre unidades equivalentes.'
      },
      {
        label: 'ISO 9241-307 — Electronic visual displays',
        url: 'https://www.iso.org/standard/40102.html',
        note: 'Referência técnica para métodos de teste e requisitos de análise de displays eletrônicos.'
      },
      {
        label: 'Dell — How to run a diagnostic test on a Dell monitor',
        url: 'https://www.dell.com/support/kbdoc/en-us/000124390/how-to-run-diagnostic-test-on-a-dell-monitor',
        note: 'Mostra como o autoteste interno separa uma anormalidade do monitor de problemas no computador, na placa gráfica ou no sinal.'
      }
    ],
    relatedSlugs: ['ips-glow-vs-backlight-bleed', 'como-testar-monitor-oled', 'testar-monitor-olx-mercado-livre'],
    faq: [
      ['O que pode contribuir para uma área clara nas bordas?', 'Reflexos, ângulo, exposição da câmera, brilho e características das camadas ópticas podem produzir aparências semelhantes. O teste visual não identifica sozinho a causa física.'],
      ['Quando devo falar com o suporte?', 'Se a região permanecer visível na posição e no brilho usados no dia a dia, registre as condições, fotos comparáveis e o modelo exato; então consulte a política vigente.'],
      ['Como comparar backlight bleed e IPS glow?', 'Mantenha imagem e brilho, mas varie ângulo e distância. O glow tende a mudar com a posição do observador; uma região mais fixa merece registro, sem confirmar o mecanismo físico.']
    ],
    body: `
      <p><strong>Resposta direta:</strong> backlight bleed é o nome dado ao vazamento aparente da luz de fundo de um LCD, geralmente percebido perto das bordas em imagens escuras. Uma página preta ajuda a localizar e comparar o sintoma, mas não mede luminância nem determina sozinha se o painel está fora da especificação.</p>

      <h2>Por que a condição do teste muda o resultado</h2>
      <p>Painéis LCD usam uma fonte de luz atrás da matriz. O conjunto inclui guia de luz, difusores, polarizadores, moldura e a própria célula de cristal líquido. Em uma cena escura, pequenas diferenças do conjunto podem ficar aparentes. Reflexos do cômodo, nível de brilho, modo de imagem, posição do observador e adaptação dos olhos ao escuro também mudam a percepção.</p>
      <p>Por isso, uma foto isolada feita em um quarto escuro e com exposição automática não é uma comparação confiável. O telefone pode elevar sombras, combinar quadros e mudar o balanço de branco. O registro continua útil quando vem acompanhado das condições em que foi produzido e de uma descrição do que era visível a olho nu.</p>

      <h2>Protocolo controlado de inspeção</h2>
      <ol>
        <li><strong>Prepare a superfície.</strong> Desligue o monitor e verifique se há poeira, impressões ou película de transporte. Faça qualquer limpeza apenas pelo método indicado no manual e deixe a tela seca antes de continuar.</li>
        <li><strong>Use a configuração cotidiana.</strong> Ligue o equipamento, selecione a entrada e o modo de imagem normalmente utilizados e anote brilho, contraste, HDR, escurecimento local e tempo aproximado desde que a tela foi ligada. Não altere vários controles entre uma observação e outra.</li>
        <li><strong>Controle o ambiente.</strong> Reduza reflexos diretos, mas mantenha uma luz ambiente que represente o uso real. Se quiser repetir no escuro, trate isso como uma segunda condição e identifique-a separadamente.</li>
        <li><strong>Preencha a tela.</strong> Exiba preto e depois cinza escuro em tela cheia. O navegador envia valores digitais ao sistema; isso não significa emissão física igual a zero nem substitui um instrumento de medição.</li>
        <li><strong>Fixe a posição frontal.</strong> Sente-se no ponto habitual, centralize os olhos em relação à tela e observe bordas e cantos. Descreva posição, extensão aproximada e intensidade percebida sem atribuir uma causa.</li>
        <li><strong>Faça a comparação angular.</strong> Mova a cabeça um pouco para os lados, para cima e para trás. Anote quais áreas mudam rapidamente e quais permanecem em lugar semelhante.</li>
        <li><strong>Repita sem mudar variáveis.</strong> Volte ao ponto inicial e faça uma segunda passagem. Se documentar com câmera, desative filtros quando possível e mantenha distância, enquadramento e exposição iguais.</li>
      </ol>

      <h2>Como interpretar o mapa visual</h2>
      <table>
        <thead><tr><th scope="col">Observação</th><th scope="col">Próxima verificação</th><th scope="col">O que não concluir</th></tr></thead>
        <tbody>
          <tr><td>Halo muda muito quando você se desloca</td><td>Compare ângulo, distância e brilho</td><td>Não classifique como defeito apenas pela foto</td></tr>
          <tr><td>Região permanece perto da mesma borda</td><td>Repita nas mesmas condições e registre</td><td>Não presuma a causa interna</td></tr>
          <tr><td>Marca acompanha reflexo ou objeto do cômodo</td><td>Mude a iluminação e a posição da fonte</td><td>Não atribua ao painel antes de eliminar o reflexo</td></tr>
          <tr><td>Aparece somente na fotografia</td><td>Compare com a visão direta e revise a exposição</td><td>Não use a câmera como medidor fotométrico</td></tr>
        </tbody>
      </table>
      <p>Uma área que muda com o observador é compatível com comportamento angular, como o IPS glow. Uma região que permanece próxima da mesma borda em condições repetidas pode justificar um registro de vazamento aparente. Esses padrões orientam a conversa com o suporte; não revelam qual camada, fixação ou componente produziu a aparência.</p>

      <h2>Faça duas passagens com objetivos diferentes</h2>
      <p>Uma inspeção útil começa pelo uso normal. Abra uma cena escura de um filme, um jogo ou um projeto que você conheça, sente-se como costuma trabalhar e observe se alguma região clara chama atenção sem que você a procure. Essa primeira passagem responde à pergunta mais prática: o efeito interfere na imagem que motivou a compra do monitor? Anote o horário, a iluminação do cômodo e o ajuste de brilho. Não apague as luzes só para intensificar o achado.</p>
      <p>A segunda passagem serve para localizar e repetir. Use preto e cinza escuro em tela cheia, mantenha as condições anotadas e percorra bordas e cantos. Se quiser incluir uma observação em ambiente escuro, faça-a depois e identifique-a como condição adicional. Separar as duas passagens evita que um caso visível somente em uma situação extrema receba o mesmo peso de uma região perceptível durante o trabalho.</p>

      <h2>Monte uma ficha que outra pessoa consiga repetir</h2>
      <p>Não é preciso transformar a mesa em laboratório. Uma ficha curta já reduz ambiguidades: modelo completo, entrada, resolução, taxa de atualização, modo de imagem, brilho mostrado no menu, HDR ligado ou desligado, escurecimento local e tempo desde que o painel foi ligado. Acrescente distância aproximada dos olhos, altura da cadeira e fontes de luz acesas. Quando repetir, mude uma variável por vez e registre a alteração.</p>
      <table>
        <thead><tr><th scope="col">Passagem</th><th scope="col">Condição</th><th scope="col">Pergunta respondida</th></tr></thead>
        <tbody>
          <tr><td>Uso habitual</td><td>Conteúdo real, brilho e luz cotidianos</td><td>A região distrai ou encobre detalhes?</td></tr>
          <tr><td>Padrão controlado</td><td>Preto e cinza escuro, posição marcada</td><td>O achado reaparece no mesmo lugar?</td></tr>
          <tr><td>Variação angular</td><td>Mesmo padrão, movimento da cabeça</td><td>A aparência acompanha o observador?</td></tr>
          <tr><td>Autoteste</td><td>Rotina prevista no manual do modelo</td><td>O achado existe sem o sinal do computador?</td></tr>
        </tbody>
      </table>
      <p>Se o monitor tiver diagnóstico interno, siga o manual em vez de copiar uma combinação de botões de outro aparelho. A Dell, por exemplo, orienta localizar o procedimento no guia do modelo e usa o teste integrado para verificar se uma anormalidade também aparece sem depender do computador. O princípio é útil; os comandos não são universais.</p>

      <h2>Compare sem criar uma falsa equivalência</h2>
      <p>Duas unidades do mesmo modelo oferecem uma comparação mais informativa do que telas de famílias diferentes, desde que usem configuração, entrada, ambiente e posição semelhantes. Ainda assim, a comparação lado a lado não define sozinha o limite de fabricação. Variações de tamanho, tipo de painel, curva, revestimento, sistema de iluminação e algoritmo de escurecimento tornam uma fotografia de outro produto uma referência fraca.</p>
      <p>Também não use a borda do vídeo como prova. Filmes podem trazer barras pretas comprimidas, vinheta, granulação ou gradação irregular no próprio arquivo. Abra o padrão local em tela cheia e confirme que ele cobre a área útil. Em seguida, volte ao conteúdo real. Se a região só aparece no arquivo, investigue a fonte; se aparece no menu ou no autoteste, o registro ganha contexto para o suporte.</p>

      <h2>Fotografe uma sequência, não um flagrante isolado</h2>
      <p>Comece com uma foto ampla que mostre a tela inteira e um pouco do ambiente. Faça outra do mesmo enquadramento com cinza escuro e, se necessário, uma aproximação moderada da área. Trave exposição e foco quando o aplicativo permitir, desligue modo noturno, HDR da câmera e filtros de embelezamento. Não recorte a primeira imagem: ela documenta posição e proporção.</p>
      <p>Ao nomear os arquivos, use uma sequência simples, como “uso-normal”, “preto-frontal”, “cinza-frontal” e “preto-angulo”. Guarde os originais e faça marcações somente em cópias. Se a câmera mostra uma mancha mais forte do que seus olhos, escreva isso no relato. A discrepância não invalida a foto; apenas define o que ela consegue demonstrar.</p>

      <h2>Decida o próximo passo pelo impacto observado</h2>
      <p>Uma região discreta no padrão, mas invisível no conteúdo de trabalho, pode ser acompanhada com a ficha guardada. Quando a claridade encobre detalhes, desvia o olhar em cenas comuns ou mudou desde a primeira inspeção, repita a sequência nas mesmas condições e procure o canal oficial. Em produto recém-entregue, verifique também os prazos e procedimentos do vendedor antes de desmontar a instalação ou descartar a embalagem.</p>
      <p>Envie ao atendimento um conjunto enxuto: foto geral, comparação de fundos, condições anotadas, resultado do diagnóstico interno quando disponível e descrição do impacto. Frases como “canto inferior direito visível a 80 cm em cenas escuras com brilho 35” permitem uma análise melhor do que “a tela está horrível”. O suporte pode pedir outro procedimento; preserve a configuração inicial para que as duas séries continuem comparáveis.</p>

      <h2>Erros comuns e limites</h2>
      <ul>
        <li>Elevar o brilho apenas para produzir uma imagem mais dramática e depois comparar com o uso normal.</li>
        <li>Pressionar a moldura ou massagear a tela; isso pode causar dano e prejudicar uma eventual análise de garantia.</li>
        <li>Comparar fotos capturadas com exposições diferentes ou monitores de modelos distintos.</li>
        <li>Aplicar um limite encontrado em fóruns sem verificar a documentação do modelo, da região e do vendedor.</li>
        <li>Confundir a cor digital preta com a ausência medida de emissão luminosa.</li>
      </ul>
      <p>O resultado deste protocolo é um registro visual reproduzível. Um ensaio de conformidade exige método, condições e limites definidos pelo fabricante ou por uma norma aplicável. Se a área clara interfere no conteúdo real, guarde nota fiscal, modelo, configurações utilizadas e arquivos originais das fotos para apresentar ao suporte. Mantenha número de série e dados pessoais fora de publicações abertas.</p>
    `
  },
  {
    slug: 'ips-glow-vs-backlight-bleed',
    title: 'IPS glow e backlight bleed: comparação por ângulo e posição',
    h1: 'Como comparar IPS glow e backlight bleed',
    description: 'Compare brilho aparente em cenas escuras variando ângulo, distância e posição, sem transformar uma observação visual em diagnóstico do painel.',
    toolId: 'black',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    sources: [
      {
        label: 'BenQ — What is IPS glow and how can I reduce it?',
        url: 'https://www.benq.com/en-us/support/downloads-faq/faq/product/application/monitor-faq-kn-00032.html',
        note: 'Explica a variação do IPS glow com ângulo, distância, iluminação ambiente e brilho.'
      },
      {
        label: 'Dell — Troubleshooting light leakage or bleeding on an LCD display',
        url: 'https://www.dell.com/support/kbdoc/en-us/000132299/troubleshooting-light-leakage-bleeding-on-a-lcd-monitor-or-notebook-lcd-screen',
        note: 'Orienta avaliar vazamento aparente em condições controladas e considerar posição e exposição.'
      },
      {
        label: 'ISO 9241-307 — Electronic visual displays',
        url: 'https://www.iso.org/standard/40102.html',
        note: 'Referência para métodos e condições de avaliação de displays; ajuda a separar uma observação doméstica de um ensaio de conformidade.'
      }
    ],
    relatedSlugs: ['backlight-bleed-como-testar', 'politica-dead-pixel-fabricantes', 'o-que-sao-dead-pixels'],
    faq: [
      ['O que é IPS glow?', 'É um brilho aparente associado ao modo como um painel IPS é visto em cenas escuras. Sua intensidade e posição percebida podem variar com ângulo, distância, brilho e luz ambiente.'],
      ['O IPS glow é coberto por garantia?', 'A cobertura depende da política vigente para fabricante, modelo, região e condição observada. Um teste no navegador não decide elegibilidade.'],
      ['Como reduzir sua percepção no uso?', 'Teste uma posição mais central, ajuste a distância, evite brilho maior que o necessário e controle reflexos. Preserve uma configuração confortável e compatível com o manual.']
    ],
    body: `
      <p><strong>Resposta direta:</strong> IPS glow costuma mudar de intensidade ou de lugar aparente quando o observador altera ângulo e distância. Backlight bleed tende a ser descrito como uma região mais localizada que permanece próxima da mesma borda. Essa diferença é útil para comparar sintomas, mas não substitui a avaliação do fabricante.</p>

      <h2>O que está sendo comparado</h2>
      <p>Em um painel IPS, a imagem escura ainda é observada através de camadas ópticas iluminadas por uma unidade de luz de fundo. Ao olhar para os cantos, a linha de visão atravessa essas camadas em ângulo diferente da região central. Isso pode produzir uma aparência acinzentada, prateada ou levemente colorida que varia quando a cabeça se move.</p>
      <p>A expressão backlight bleed é usada para uma concentração de luz aparente relacionada ao conjunto de iluminação e às bordas de um LCD. As duas aparências podem coexistir, e uma fotografia pode acentuar ambas. A comparação angular separa o que acompanha o observador do que permanece preso à mesma região da tela.</p>

      <h2>Comparação angular passo a passo</h2>
      <ol>
        <li><strong>Estabeleça um ponto inicial.</strong> Coloque a cadeira na posição normal de trabalho, alinhe o centro da tela com a visão e anote aproximadamente a distância.</li>
        <li><strong>Registre os controles.</strong> Anote brilho, modo de imagem, HDR e escurecimento local. Use uma condição de luz ambiente estável e evite reflexos diretos.</li>
        <li><strong>Exiba preto e cinza escuro.</strong> Use tela cheia e espere os controles sumirem. O padrão é uma referência digital, não uma medição física de preto.</li>
        <li><strong>Observe de frente.</strong> Divida mentalmente a tela em centro, quatro cantos e quatro bordas. Anote onde o brilho chama atenção sem aproximar o rosto.</li>
        <li><strong>Mude somente o ângulo horizontal.</strong> Desloque a cabeça lentamente para a esquerda e para a direita, mantendo distância semelhante. Observe se o halo parece migrar, desaparecer ou mudar de cor.</li>
        <li><strong>Mude somente a altura.</strong> Repita um pouco acima e abaixo do centro. Depois volte à posição inicial para confirmar se a aparência retorna.</li>
        <li><strong>Compare a distância.</strong> Afaste-se moderadamente sem alterar a inclinação da tela. Em seguida retorne ao ponto de uso e registre a mudança percebida.</li>
      </ol>

      <h2>Matriz de interpretação</h2>
      <table>
        <thead><tr><th scope="col">Comportamento observado</th><th scope="col">Compatibilidade visual</th><th scope="col">Ação útil</th></tr></thead>
        <tbody>
          <tr><td>Halo muda de canto conforme a cabeça se move</td><td>Comportamento angular compatível com glow</td><td>Ajustar posição, distância, brilho e ambiente</td></tr>
          <tr><td>Faixa localizada permanece na mesma borda</td><td>Pode justificar registro de vazamento aparente</td><td>Repetir o protocolo e consultar suporte</td></tr>
          <tr><td>Brilho some ao bloquear uma fonte do cômodo</td><td>Reflexo ambiental</td><td>Reposicionar luz ou monitor</td></tr>
          <tr><td>Diferença é forte na foto e discreta a olho nu</td><td>Possível efeito da exposição</td><td>Descrever a percepção e preservar dados da captura</td></tr>
        </tbody>
      </table>

      <h2>Como documentar sem distorcer</h2>
      <p>Se precisar fotografar, apoie o telefone no mesmo lugar para todas as imagens, mantenha a lente paralela ao centro da tela e use os mesmos controles de captura. Inclua uma foto com alguma luz ambiente e outra apenas se o suporte solicitar uma condição escura. Não edite contraste, sombras ou saturação; guarde os arquivos originais.</p>
      <p>Faça também uma descrição curta: posição do observador, distância aproximada, brilho, modo de imagem, iluminação e quais regiões mudaram durante o movimento. A descrição registra o que a câmera não reproduz bem e permite repetir a observação depois.</p>

      <h2>Use pontos fixos para não confundir movimento</h2>
      <p>Antes de começar, escolha três referências que não mudem: o centro do assento, a borda da mesa e a altura dos olhos em relação ao topo da tela. Uma fita na mesa pode marcar a distância da cadeira sem tocar no monitor. Faça a primeira leitura no centro e volte a esse ponto depois de cada deslocamento. Assim, “mudou de lugar” descreve uma comparação real, não uma lembrança aproximada.</p>
      <p>Ao mover a cabeça, acompanhe um canto por vez. Um halo angular pode crescer no canto oposto ao deslocamento, perder intensidade quando a visão se aproxima da perpendicular ou assumir outra tonalidade. Uma faixa junto à moldura pode continuar na mesma área, embora sua aparência também mude com o ângulo. O comportamento forma um conjunto de indícios; nenhum gesto isolado cria um diagnóstico.</p>

      <h2>Faça uma comparação A/B sem perder o controle</h2>
      <ol>
        <li>Comece na posição marcada, com luz ambiente moderada e brilho habitual. Registre a aparência em preto e cinza escuro.</li>
        <li>Afaste a cadeira por uma distância pequena e repetível. Não incline a tela nem altere o brilho nesse momento.</li>
        <li>Volte à marca inicial e reduza apenas a luz que causa reflexo direto. Compare o que mudou no vidro e o que permaneceu dentro da imagem.</li>
        <li>Restaure o ambiente e ajuste somente o brilho para um nível confortável mais baixo. Anote se a região perdeu destaque junto com o restante da imagem.</li>
        <li>Abra uma cena real escura e outra com contraste médio. Descreva se o efeito continua visível quando há objetos, movimento e detalhes.</li>
      </ol>
      <p>Essa ordem não procura fazer a aparência desaparecer a qualquer custo. Ela mostra qual variável exerce maior influência. Se a distância muda muito o halo e a posição aparente migra, o componente angular fica mais evidente. Se a mesma faixa junto à borda reaparece após cada retorno ao ponto inicial, registre essa estabilidade para a conversa com o fabricante.</p>

      <h2>Leve em conta tamanho, curva e disposição da mesa</h2>
      <p>Em telas grandes, os cantos são vistos por um ângulo mais oblíquo quando a pessoa fica perto. Afastar-se pode tornar a linha de visão mais uniforme sem alterar o painel. Em um monitor curvo, a relação entre olhos, centro e bordas muda novamente; por isso, a posição usada em uma tela plana não deve ser copiada de modo automático. A altura também conta: uma cadeira baixa pode intensificar uma área que fica discreta quando os olhos se alinham ao centro.</p>
      <p>Um segundo monitor ao lado costuma ficar inclinado. Se ele for comparado ao principal sem que ambos estejam voltados para o observador, a diferença angular já está embutida no arranjo. Para uma checagem curta, gire temporariamente cada tela para uma observação frontal, sem alterar os suportes além do movimento previsto pelo fabricante. Depois devolva o conjunto à posição de trabalho e avalie o incômodo real.</p>

      <h2>Leia a fotografia como registro da câmera</h2>
      <p>O modo automático tende a clarear uma cena predominantemente preta. Em alguns telefones, múltiplos quadros são combinados para revelar detalhes que quase não apareciam ao vivo. Uma lente grande-angular perto do monitor também observa os cantos por ângulos diferentes do olho colocado mais longe. Esses recursos explicam por que a imagem pode parecer mais severa; não autorizam concluir que a câmera “inventou” tudo.</p>
      <p>Para uma série coerente, use o mesmo aparelho, lente, distância, orientação e exposição. Inclua uma fotografia com conteúdo normal na mesma configuração. Se houver outro monitor no enquadramento, não use sua luminosidade como escala: processamento local e diferenças entre telas impedem uma comparação fotométrica. O texto que acompanha a série deve dizer o que mudava ao mover a cabeça e o que permanecia fixo.</p>

      <h2>Três situações que pedem leituras diferentes</h2>
      <p>Em um jogo escuro, a atenção se move e a região clara pode atrapalhar a leitura de detalhes próximos à borda. Em edição de fotografia, a luz ambiente e a posição central costumam ser mais controladas, então uma diferença repetível merece ser descrita nas condições de trabalho. Durante um filme visto de lado por várias pessoas, cada assento produz uma relação angular diferente; uma única foto central não representa todos os espectadores.</p>
      <p>Relate o cenário que importa em vez de procurar uma etiqueta universal. “O halo acompanha meu movimento e some na posição central” orienta ajuste de ergonomia. “A faixa inferior permanece visível de frente e cobre detalhe em cenas comuns” orienta uma nova inspeção e possível chamado. Se os dois comportamentos aparecem ao mesmo tempo, registre-os em linhas separadas.</p>

      <h2>Erros comuns e limites</h2>
      <ul>
        <li>Encostar a câmera no painel, criando um ângulo que não representa o uso.</li>
        <li>Comparar uma tela com brilho máximo a outra ajustada para o ambiente.</li>
        <li>Dar um nome definitivo ao fenômeno com base apenas na cor do halo.</li>
        <li>Pressionar moldura ou painel para verificar se a mancha muda.</li>
        <li>Comparar modelos diferentes como se tivessem a mesma construção e tolerância.</li>
      </ul>
      <p>O teste responde a uma pergunta restrita: a aparência acompanha o ângulo do observador ou permanece na mesma área? Aceitabilidade, tolerância e garantia exigem a política do modelo e, quando necessário, inspeção técnica. Para um relato útil, informe posição de uso, configurações, iluminação, comportamento angular e impacto percebido em conteúdo real.</p>
    `
  },
  {
    slug: 'como-testar-monitor-oled',
    title: 'Como inspecionar um monitor OLED novo ou usado',
    h1: 'Checklist de inspeção para monitores OLED',
    description: 'Confira sinal, superfície, cores, uniformidade aparente, retenção e rotinas de manutenção seguindo os controles previstos pelo fabricante.',
    toolId: 'black',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    sources: [
      {
        label: 'LG — Troubleshooting image burn-in on an OLED display',
        url: 'https://www.lg.com/us/support/help-library/lg-tv-troubleshooting-image-burn-in-CT10000030-20152745607830',
        note: 'Distingue retenção temporária de alteração persistente e orienta usar recursos de manutenção do fabricante.'
      },
      {
        label: 'Dell — Gaming monitor frequently asked questions',
        url: 'https://www.dell.com/support/kbdoc/en-us/000131796/dell-gaming-monitor-frequently-asked-questions',
        note: 'Documenta funções de manutenção de painel OLED, como Pixel Refresh e Panel Refresh, em modelos compatíveis.'
      },
      {
        label: 'LG — Lines or stains on an OLED screen',
        url: 'https://www.lg.com/us/support/help-library/lg-oled-tv-i-see-vertical-lines-or-stains-on-my-screen--20154629490729',
        note: 'Orienta usar o teste de imagem interno para separar a tela de fontes e sinais externos.'
      },
      {
        label: 'Dell — How to run a diagnostic test on a Dell monitor',
        url: 'https://www.dell.com/support/kbdoc/en-us/000124390/how-to-run-diagnostic-test-on-a-dell-monitor',
        note: 'Documenta o uso de diagnóstico integrado para verificar anormalidades sem depender do sinal do computador; o procedimento exato varia por modelo.'
      }
    ],
    relatedSlugs: ['tela-preta-descanso-monitor', 'o-que-sao-dead-pixels', 'testar-monitor-olx-mercado-livre'],
    faq: [
      ['O que testar primeiro em um OLED usado?', 'Confirme modelo, histórico e documentação; depois verifique superfície, sinal e fundos sólidos nas configurações de uso. Compare qualquer marca em mais de uma cor e no teste interno, se disponível.'],
      ['Monitores OLED sofrem de backlight bleed?', 'OLED não usa a unidade de luz de fundo típica do LCD, portanto esse mecanismo específico não se aplica. Reflexos, retenção, processamento e diferenças de uniformidade ainda podem aparecer.'],
      ['Devo executar uma limpeza de pixels durante a compra?', 'Somente se o manual do modelo recomendar e houver tempo para o ciclo terminar. Não interrompa a rotina nem acesse menus de serviço; ciclos repetidos sem necessidade não são um teste neutro.']
    ],
    body: `
      <p><strong>Resposta direta:</strong> para avaliar um OLED, confirme primeiro o funcionamento normal e depois procure pontos, faixas ou imagens residuais em vários fundos. Use o teste de imagem interno e as rotinas de manutenção apenas quando o manual do modelo indicar. Uma página web exibe referências visuais, mas não mede desgaste, horas de uso ou vida restante.</p>

      <h2>O que muda em relação a um LCD</h2>
      <p>Pixels OLED emitem a própria luz. Por isso, o mecanismo de vazamento da iluminação traseira de um LCD não existe nesse tipo de painel. A inspeção se concentra em integridade dos pixels, uniformidade aparente em tons escuros, retenção de elementos estáticos, reflexos do acabamento e funcionamento dos recursos de proteção implementados pelo fabricante.</p>
      <p>Retenção temporária e alteração persistente podem parecer semelhantes em uma visita curta. Uma marca vista após uma imagem estática não deve ser rotulada imediatamente. Registre quanto tempo ela permanece, em quais cores é visível e se também aparece no padrão interno do aparelho.</p>

      <h2>Checklist antes dos padrões de tela</h2>
      <ul>
        <li><strong>Identificação:</strong> confira modelo completo, etiqueta, nota fiscal disponível, acessórios e manual. Mantenha número de série e documentos pessoais fora de fotos públicas.</li>
        <li><strong>Superfície desligada:</strong> observe sob luz difusa, sem pressionar, procurando riscos, marcas no revestimento e película de transporte identificada pelo fabricante.</li>
        <li><strong>Entradas e sinal:</strong> teste a conexão que será usada, confirme resolução e taxa de atualização disponíveis no sistema e verifique se o sinal permanece estável.</li>
        <li><strong>Configurações:</strong> anote modo de imagem, brilho, HDR e qualquer proteção OLED ativa. Evite redefinir o aparelho do vendedor antes de registrar a configuração atual.</li>
      </ul>

      <h2>Sequência visual reproduzível</h2>
      <ol>
        <li>Exiba branco, vermelho, verde e azul em tela cheia. Percorra a tela a uma distância confortável e anote pontos claros, escuros ou coloridos que reaparecem na mesma coordenada.</li>
        <li>Use cinza médio para procurar contornos de barras, logotipos ou regiões com tonalidade diferente. Repita em outra cor para verificar se a marca depende do padrão.</li>
        <li>Exiba cinza escuro em ambiente com reflexos controlados. Compare faixas e sombreamentos sem aumentar o brilho apenas para tornar a foto mais intensa.</li>
        <li>Exiba preto para observar pontos acesos e reflexos. O valor digital solicitado pelo navegador não comprova a emissão física de cada pixel.</li>
        <li>Abra uma imagem ou vídeo conhecido, com tons de pele, gradientes e movimento. Isso mostra se o achado dos padrões interfere no conteúdo realmente usado.</li>
        <li>Se o aparelho tiver autoteste ou teste de imagem documentado, execute-o pelo menu normal. Uma marca presente no teste interno independe da fonte externa, embora sua causa ainda precise de avaliação.</li>
      </ol>

      <h2>Rotinas de compensação e histórico</h2>
      <p>Alguns fabricantes oferecem ciclos automáticos ou manuais com nomes como Pixel Refresh, Panel Refresh ou Pixel Cleaning. Os nomes, a duração e as condições mudam por modelo. Consulte o manual antes de iniciar, mantenha a alimentação conectada e não interrompa o processo. Não repita ciclos intensivos apenas para tentar produzir um resultado diferente durante a inspeção.</p>
      <p>Em uma unidade usada, pergunte sobre padrão de uso, elementos estáticos frequentes, cuidados de desligamento e eventual manutenção já executada. Trate essas respostas como histórico declarado, não como medição. Menus de serviço podem alterar configurações ou registrar acesso; não são necessários para esta inspeção.</p>

      <h2>Interpretação e limites</h2>
      <table>
        <thead><tr><th scope="col">Achado</th><th scope="col">Verificação seguinte</th><th scope="col">Limite</th></tr></thead>
        <tbody>
          <tr><td>Ponto fixo em várias cores</td><td>Mapear fundos e fotografar sem zoom digital</td><td>A página não identifica o circuito afetado</td></tr>
          <tr><td>Contorno semelhante a uma interface</td><td>Repetir após conteúdo variado e usar teste interno</td><td>Uma sessão curta nem sempre separa retenção e alteração persistente</td></tr>
          <tr><td>Faixa em cinza escuro</td><td>Comparar brilho normal, outra entrada e autoteste</td><td>Não é medição de uniformidade</td></tr>
          <tr><td>Falha apenas em uma fonte</td><td>Revisar cabo, porta e configuração</td><td>Não atribuir de imediato ao painel</td></tr>
        </tbody>
      </table>

      <h2>Separe a chegada do painel da condição de uso</h2>
      <p>Em uma unidade recém-entregue, registre o estado antes de personalizar todos os controles. Fotografe a embalagem se houver impacto, confira se a película indicada foi removida conforme o manual e deixe o aparelho completar a inicialização normal. Depois anote o modo de imagem e faça uma passagem curta. A meta é preservar uma referência de chegada, não submeter o OLED a horas de padrões.</p>
      <p>Em uma unidade usada, o foco muda. Pergunte quais interfaces ficavam estáticas, por quanto tempo o monitor era usado por dia e como era desligado. Não há como verificar toda a história por uma conversa ou por um contador exibido em menu. Trate as respostas como contexto e concentre a decisão no que pode ser observado: imagem atual, estabilidade das entradas, integridade externa, recursos anunciados e documentação disponível.</p>

      <h2>Observe tons próximos do preto com moderação</h2>
      <p>Cinza muito escuro pode revelar faixas ou diferenças de tonalidade que desaparecem em imagens claras. Esse tipo de padrão também é sensível ao modo HDR, ao nível de preto enviado pela fonte, à compressão do arquivo e à adaptação dos olhos. Use o brilho cotidiano primeiro, mantenha alguma referência de luz no cômodo e espere apenas o suficiente para observar. Uma sessão prolongada no escuro pode tornar pequenas diferenças mais salientes sem dizer quanto elas interferem no uso.</p>
      <p>Compare ao menos dois níveis escuros e um cinza médio. Se uma faixa aparece somente em um arquivo baixado, abra o padrão gerado localmente ou o diagnóstico interno. Se surge em todos eles, anote orientação, largura aproximada e distância em que fica visível. Evite expressões como “5% de cinza” se você não controlou toda a cadeia de vídeo; o valor digital da página não é uma medida da luz emitida.</p>

      <h2>Registre imagens residuais ao longo do tempo</h2>
      <p>Quando aparecer o contorno de uma barra, logotipo ou janela, troque para conteúdo variado e inicie um registro de tempo. Faça uma observação logo após a troca, outra alguns minutos depois e mais uma ao final do período disponível. Mantenha brilho, ambiente e posição. Escreva “visível”, “discreto” ou “não percebido” e indique em quais fundos, sem prometer que a mudança é permanente ou temporária.</p>
      <p>Não deixe um padrão estático aberto para tentar reproduzir burn-in e não repita ciclos manuais de compensação. O fabricante define quando as rotinas devem ocorrer, e algumas funcionam automaticamente durante o modo de espera. Se a marca persiste em conteúdo comum e no teste interno, leve a linha do tempo ao suporte. Ela mostra comportamento; não estima desgaste restante.</p>

      <h2>Inclua movimento e conexão no roteiro</h2>
      <p>Fundos sólidos localizam pontos, mas uma tela usada também precisa exibir movimento e manter o sinal. Reproduza um trecho conhecido, role um texto e alterne entre uma janela clara e outra escura. Observe perdas de imagem, lampejos, mudança inesperada de brilho e demora para recuperar o sinal. Faça isso na resolução e taxa que pretende usar.</p>
      <p>Se ocorrer uma falha, não troque cabo, porta, taxa e aplicativo ao mesmo tempo. Repita o evento; depois mude uma peça da cadeia. Um segundo cabo conhecido pode esclarecer uma perda de sinal, enquanto o menu do próprio monitor ajuda a separar a imagem recebida do funcionamento interno. Recursos como HDR, taxa variável e proteção de brilho podem mudar a aparência. Registre se estavam ativos.</p>

      <h2>Use um quadro de decisão para compra</h2>
      <table>
        <thead><tr><th scope="col">Pergunta</th><th scope="col">Evidência disponível</th><th scope="col">Incerteza restante</th></tr></thead>
        <tbody>
          <tr><td>O ponto interfere na tarefa?</td><td>Conteúdo normal e distância habitual</td><td>Como evoluirá com o tempo</td></tr>
          <tr><td>A marca depende da fonte?</td><td>Outra entrada, menu e teste interno</td><td>Componente físico exato</td></tr>
          <tr><td>Os recursos anunciados funcionam?</td><td>Resolução, taxa e entradas testadas</td><td>Estabilidade em uso prolongado</td></tr>
          <tr><td>Há suporte ou garantia?</td><td>Nota, política e resposta oficial</td><td>Decisão futura sobre um caso</td></tr>
        </tbody>
      </table>
      <p>Um desconto não elimina a incerteza; ele apenas muda a troca proposta. Se a característica observada é incompatível com edição, jogos ou leitura que você pretende fazer, registre isso antes do pagamento. Se algum recurso essencial não pôde ser testado, nomeie a lacuna no acordo em vez de presumir que está em ordem.</p>

      <h2>Prepare um conjunto de evidências enxuto</h2>
      <p>Guarde uma foto da tela inteira por padrão, aproximações moderadas das regiões relevantes, um vídeo curto de qualquer perda de sinal e a ficha com configurações. Acrescente resultado do diagnóstico interno, modelo, data e versão da política consultada. Evite dezenas de imagens quase iguais: uma sequência nomeada e acompanhada de contexto é mais simples de revisar.</p>
      <p>Quando a inspeção for presencial, confira as anotações com o vendedor antes de concluir. Em atendimento posterior, envie arquivos originais pelo canal oficial e oculte dados que não foram solicitados. A documentação não transforma uma observação em garantia, mas deixa claro o que estava visível, em qual condição e antes de quais alterações.</p>

      <h2>Erros que comprometem a inspeção</h2>
      <ul>
        <li>Rotular uma sombra após poucos segundos como burn-in permanente.</li>
        <li>Aumentar a exposição da câmera e apresentá-la como a visão normal.</li>
        <li>Executar vários ciclos manuais de compensação sem consultar o modelo.</li>
        <li>Pressionar, aquecer ou umedecer uma região para tentar alterar sua aparência.</li>
      </ul>
      <p>Se o achado persistir e afetar o uso, reúna fotos originais, padrões em que aparece, configuração, resultado do teste interno e documentação de compra. A inspeção fornece contexto para suporte e decisão de compra; ela não prevê a evolução do painel nem garante cobertura.</p>
    `
  },
  {
    slug: 'tela-preta-descanso-monitor',
    title: 'Tela preta em monitores: emissão, energia e uso em telas ociosas',
    h1: 'O que uma tela preta muda no monitor',
    description: 'Entenda como OLED, LCD convencional e LCD com escurecimento local reagem a uma imagem preta e quando usar o modo de suspensão.',
    toolId: 'black',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    sources: [
      {
        label: 'Microsoft — Battery saving tips for Windows',
        url: 'https://support.microsoft.com/en-us/windows/experience/power-battery/battery-saving-tips-for-windows',
        note: 'Recomenda ajustar brilho, tema escuro e tempo para desligamento da tela conforme o objetivo de economia.'
      },
      {
        label: 'Dell — Monitor usage guidelines to prevent image retention and preserve panel life',
        url: 'https://www.dell.com/support/kbdoc/en-us/000129648/guidelines-for-dell-monitor-usage-to-prevent-image-retention-and-preserve-panel-life',
        note: 'Orienta usar proteção de tela e gerenciamento de energia de acordo com a tecnologia e o modelo.'
      },
      {
        label: 'W3C — CSS Color Module Level 4',
        url: 'https://www.w3.org/TR/css-color-4/',
        note: 'Define valores de cor enviados pelo conteúdo web; a emissão física depende do sistema e do equipamento.'
      },
      {
        label: 'ENERGY STAR — Monitors',
        url: 'https://www.energystar.gov/products/monitors',
        note: 'Recomenda ativar a suspensão do monitor e distingue os requisitos de consumo nos modos ligado e de espera.'
      }
    ],
    relatedSlugs: ['como-testar-monitor-oled', 'manchas-no-monitor-causas', 'como-limpar-monitor-sem-danificar'],
    faq: [
      ['Tela preta economiza energia em qualquer monitor?', 'Não de forma igual. OLED pode reduzir emissão por pixel; LCD com escurecimento local pode reduzir algumas zonas; LCD convencional mantém a luz de fundo ativa. Para ociosidade prolongada, prefira suspensão ou desligamento.'],
      ['Uma tela preta reduz o uso dos pixels OLED?', 'Em áreas pretas, pixels OLED normalmente emitem pouca ou nenhuma luz, mas a eletrônica continua ativa. Siga também as rotinas de proteção e desligamento recomendadas para o modelo.'],
      ['Tela preta trata cansaço visual?', 'Não. Ela pode reduzir luz periférica de uma tela ociosa, mas conforto depende de brilho, reflexos, ambiente, distância, pausas e necessidades individuais.']
    ],
    body: `
      <p><strong>Resposta direta:</strong> uma imagem preta reduz a luz visível, mas seu efeito sobre consumo e painel varia por tecnologia. Em OLED, os pixels pretos geralmente emitem pouca ou nenhuma luz. Em LCD convencional, a luz de fundo pode continuar ligada. Para uma pausa longa, o modo de suspensão ou o desligamento é mais previsível do que deixar uma página aberta.</p>

      <h2>Preto digital e luz física são coisas diferentes</h2>
      <p>Uma página web preta pede ao navegador um valor de cor. O sistema operacional, o gerenciamento de cor, o modo HDR, a placa gráfica e o monitor transformam esse valor em saída. A página não lê potência elétrica, luminância ou estado de cada zona de iluminação. “Preto” descreve o conteúdo solicitado, não uma medição do aparelho.</p>

      <table>
        <thead><tr><th scope="col">Tecnologia</th><th scope="col">Com uma imagem preta</th><th scope="col">Para ociosidade maior</th></tr></thead>
        <tbody>
          <tr><td>OLED ou QD-OLED</td><td>Pixels escuros tendem a reduzir a própria emissão; circuitos permanecem ativos</td><td>Usar suspensão e permitir rotinas automáticas do fabricante</td></tr>
          <tr><td>LCD com escurecimento local</td><td>O algoritmo pode reduzir ou apagar zonas, conforme modo e conteúdo</td><td>Suspender ou desligar conforme o manual</td></tr>
          <tr><td>LCD convencional</td><td>A matriz bloqueia parte da luz, mas a unidade de iluminação costuma continuar ativa</td><td>Usar gerenciamento de energia</td></tr>
        </tbody>
      </table>

      <h2>Quando uma tela preta é útil</h2>
      <p>Em um conjunto com vários monitores, preencher uma tela secundária com preto pode diminuir a distração enquanto ela ainda precisa permanecer acordada. Também serve como fundo temporário para observar reflexos, pontos claros e vazamento aparente em um LCD. Nesses casos, mantenha brilho e ambiente próximos do uso cotidiano.</p>
      <p>Ela não substitui bloqueio de sessão, proteção de dados, suspensão ou desligamento. Notificações, ponteiro, barras do navegador e elementos do sistema ainda podem aparecer. Em OLED, deixar uma interface estática por muito tempo contraria o objetivo de reduzir elementos persistentes.</p>

      <h2>Configuração prática para uma tela ociosa</h2>
      <ol>
        <li><strong>Defina o intervalo.</strong> Para poucos minutos em que a tela precisa continuar disponível, um fundo preto pode ser conveniente. Para períodos maiores, programe o desligamento da tela no sistema.</li>
        <li><strong>Ajuste brilho e ambiente.</strong> Use o menor nível que continue confortável e legível para a tarefa, sem depender de um valor universal.</li>
        <li><strong>Ative o gerenciamento de energia.</strong> Configure o tempo para apagar o monitor e, se adequado ao trabalho, suspender o computador. Em notebooks, revise separadamente os comportamentos na bateria e na tomada.</li>
        <li><strong>Preserve rotinas do painel.</strong> Em OLED, não corte a alimentação imediatamente se o manual disser que processos automáticos ocorrem em espera.</li>
        <li><strong>Faça um teste simples.</strong> Observe se o monitor entra e sai de suspensão corretamente, se janelas retornam à tela esperada e se dispositivos conectados permanecem funcionais.</li>
      </ol>

      <h2>Como escolher entre preto, suspensão e desligamento</h2>
      <ul>
        <li><strong>Tela ainda necessária:</strong> use preto se quiser reduzir luz sem interromper uma apresentação, captura ou arranjo de janelas.</li>
        <li><strong>Pausa previsível:</strong> programe o apagamento da tela pelo sistema, permitindo retomada automática.</li>
        <li><strong>Fim do trabalho:</strong> siga o procedimento de desligamento recomendado para o monitor e o computador.</li>
        <li><strong>OLED com manutenção automática:</strong> permita o estado de espera exigido antes de cortar energia em filtro de linha ou tomada.</li>
      </ul>

      <h2>Escolha a ferramenta pelo que precisa continuar funcionando</h2>
      <p>Há momentos em que apagar fisicamente a tela interrompe outra coisa. Em uma gravação, a janela pode precisar permanecer no mesmo monitor para que o arranjo não mude. Em uma apresentação, uma saída secundária pode estar pronta para o próximo conteúdo. Nesses intervalos curtos, o preto em tela cheia é um recurso operacional: reduz a presença visual sem desconectar a saída.</p>
      <p>Quando nada depende da tela acordada, o gerenciamento de energia é uma escolha mais direta. O ENERGY STAR recomenda ativar a suspensão do monitor, e o Windows oferece temporizadores separados para apagar a tela e colocar o computador em espera. O intervalo adequado depende do trabalho: uma renderização pode continuar com a tela apagada, enquanto uma chamada ou reprodução pode impedir a suspensão completa.</p>
      <table>
        <thead><tr><th scope="col">Situação</th><th scope="col">Opção inicial</th><th scope="col">Verificação necessária</th></tr></thead>
        <tbody>
          <tr><td>Intervalo breve durante gravação</td><td>Página preta no monitor que deve permanecer ativo</td><td>Notificações, cursor e controles escondidos</td></tr>
          <tr><td>Pausa de trabalho</td><td>Temporizador para apagar a tela</td><td>Retomada, áudio e janelas no lugar correto</td></tr>
          <tr><td>Ausência prolongada</td><td>Suspensão, hibernação ou desligamento</td><td>Requisitos de rede, tarefas e manual</td></tr>
          <tr><td>Fim do uso de OLED</td><td>Espera conforme o fabricante</td><td>Rotinas automáticas concluídas antes de cortar energia</td></tr>
        </tbody>
      </table>

      <h2>Teste o comportamento do sistema antes de depender dele</h2>
      <ol>
        <li>Salve o trabalho e anote os tempos configurados para apagar a tela e suspender o computador.</li>
        <li>Feche vídeos, jogos ou páginas que possam manter o sistema desperto. Espere o primeiro intervalo sem tocar no mouse.</li>
        <li>Observe se todos os monitores apagam ou se algum dispositivo continua exibindo sinal. Não use essa observação como medição de consumo.</li>
        <li>Retome pelo método normal e confirme posição das janelas, áudio, câmera, rede e periféricos essenciais.</li>
        <li>Repita com os aplicativos usados no dia a dia. Um programa de conferência, captura ou mídia pode produzir resultado diferente.</li>
      </ol>
      <p>Em um conjunto com dois ou três monitores, desligar apenas um pelo botão pode fazer o sistema reorganizar as áreas de trabalho; isso varia com conexão, driver e aparelho. Uma tela preta evita a reorganização porque a saída continua presente, mas mantém a eletrônica ativa. Faça um ensaio curto das duas opções e escolha pelo comportamento que realmente precisa.</p>

      <h2>Não transforme aparência em cálculo de energia</h2>
      <p>Em OLED, conteúdo mais escuro pode reduzir a emissão dos pixels. Em LCD convencional, o preto pode deixar a imagem visualmente escura enquanto a luz de fundo continua funcionando. Monitores com escurecimento local têm outro comportamento, condicionado ao número de zonas, ao algoritmo, ao modo e a elementos claros ainda presentes na tela. Nenhuma dessas diferenças informa quantos watts o conjunto está usando.</p>
      <p>Para comparar consumo, seria necessário um medidor adequado e um protocolo que mantivesse iguais brilho, entrada, modo de imagem, periféricos USB e tempo de estabilização. Até uma porta USB-C carregando um notebook pode dominar a leitura feita na tomada. Sem esse controle, descreva somente o efeito visível. Para economia cotidiana, use os estados de baixa energia documentados em vez de inferir potência pela cor exibida.</p>

      <h2>Cuide do que pode aparecer sobre o preto</h2>
      <p>Tela cheia não bloqueia alertas do sistema, sobreposições de volume, aviso de bateria, ponteiro ou menus acionados por atalho. Antes de usar o fundo em palco ou gravação, ative o modo de concentração apropriado, mova o cursor para uma região segura e faça um ensaio com os mesmos cabos e aplicativos. Se há informação confidencial na sessão, bloqueie o computador; uma superfície preta não impede acesso.</p>
      <p>O navegador também pode sair da tela cheia após uma tecla, perda de foco ou pedido de permissão. Deixe um caminho de recuperação conhecido e evite extensões que inserem elementos sobre a página. Em locais públicos, não abandone a máquina desbloqueada só porque o monitor parece apagado.</p>

      <h2>Respeite a espera prevista para OLED</h2>
      <p>Alguns OLED executam cuidados automáticos depois de entrar em espera. Cortar a tomada imediatamente após cada uso pode impedir a rotina prevista; manter uma página preta aberta tampouco equivale a colocar o aparelho nesse estado. Consulte o manual do modelo para saber como desligar e por quanto tempo manter a alimentação. Filtro de linha inteligente e automação residencial devem seguir a mesma lógica.</p>
      <p>Se o monitor reduz o brilho, desloca a imagem ou inicia um protetor próprio, não desative esses recursos apenas para manter o preto uniforme. Eles fazem parte do comportamento projetado pelo fabricante. Uma apresentação que exige saída constante deve ser planejada com esse limite e testada antes, sem alterar menus de serviço.</p>

      <h2>Conforto visual e erros comuns</h2>
      <p>Uma superfície escura pode reduzir a luz periférica de um monitor ocioso, mas não corrige reflexos, brilho excessivo na tela principal, postura ou necessidade de pausas. Se alternar entre conteúdo muito claro e uma tela totalmente escura for desconfortável, ajuste o ambiente e o brilho em vez de forçar a adaptação.</p>
      <ul>
        <li>Não interprete uma redução visual de brilho como prova de economia medida.</li>
        <li>Não use preto em tela cheia como método de segurança quando a sessão deve ser bloqueada.</li>
        <li>Não desative proteções, escurecimento automático ou manutenção OLED sem consultar o manual.</li>
        <li>Não deixe o navegador impedir indefinidamente o gerenciamento de energia do sistema.</li>
      </ul>
      <p>Se a prioridade for consumo, use as opções de energia do sistema e os recursos do fabricante. Se a prioridade for inspeção, mantenha condições registradas. Se a prioridade for conforto, considere o conjunto formado por tela principal, luz ambiente, reflexos e tempo de uso. A página preta é uma ferramenta de exibição, não um medidor nem uma intervenção de saúde.</p>
    `
  },
  {
    slug: 'o-que-sao-dead-pixels',
    title: 'Pixels e subpixels: como pontos claros, escuros e coloridos aparecem',
    h1: 'O que são pixels e como observar pontos aparentes na tela',
    description: 'Entenda pixels, subpixels e as descrições de pontos claros, escuros ou coloridos antes de registrar uma ocorrência para o suporte.',
    toolId: 'dead-pixel',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    sources: [
      {
        label: 'Dell — Display pixel guidelines',
        url: 'https://www.dell.com/support/kbdoc/en-us/000126004/dell-display-pixel-guidelines',
        note: 'Define pixel e subpixel, diferencia pontos claros e escuros e descreve uma inspeção com fundos sólidos.'
      },
      {
        label: 'ISO 9241-307 — Electronic visual displays',
        url: 'https://www.iso.org/standard/40102.html',
        note: 'Referência técnica para métodos de teste e requisitos de displays eletrônicos.'
      },
      {
        label: 'Dell — How to run a diagnostic test on a Dell monitor',
        url: 'https://www.dell.com/support/kbdoc/en-us/000124390/how-to-run-diagnostic-test-on-a-dell-monitor',
        note: 'Explica como padrões internos do monitor ajudam a separar uma anormalidade da tela de problemas na fonte de vídeo.'
      }
    ],
    relatedSlugs: ['pixel-morto-vs-pixel-preso', 'politica-dead-pixel-fabricantes', 'testar-monitor-olx-mercado-livre'],
    faq: [
      ['O que esta página chama de ponto escuro?', 'É um ponto que permanece visível em fundos claros. Poeira, sujeira, escala e diferentes condições do painel podem produzir aparências semelhantes, então o termo descreve o registro visual.'],
      ['Um ponto isolado tende a se espalhar?', 'Uma inspeção não prevê evolução. Registre posição e aparência em datas diferentes e procure suporte se o comportamento mudar ou houver dano físico.'],
      ['Ciclagem de cores recupera pixels?', 'Não há garantia de recuperação. A sequência ajuda a localizar e documentar pontos; flashes rápidos podem causar desconforto e não reparam dano físico.']
    ],
    body: `
      <p><strong>Resposta direta:</strong> um pixel é um elemento da imagem formado por componentes de cor, normalmente chamados subpixels. Quando um ponto fica escuro, claro ou colorido em fundos diferentes, ele pode ser registrado como uma anomalia aparente. O padrão exibido no navegador localiza o ponto, mas não revela o componente físico responsável.</p>

      <h2>Pixel, subpixel e resolução</h2>
      <p>A resolução informa quantas posições de imagem existem na horizontal e na vertical. Cada posição combina intensidades de componentes de cor para formar o tom visto pelo usuário. O arranjo não é idêntico em toda tecnologia: muitos LCDs usam grupos vermelho, verde e azul, enquanto alguns painéis empregam estruturas ou componentes adicionais.</p>
      <p>Essa distinção importa porque uma ocorrência pode envolver o pixel completo ou apenas parte de sua composição. Um ponto vermelho visível sobre certos fundos, por exemplo, não deve ser contado automaticamente como três componentes afetados. Use a terminologia definida pela política do fabricante quando abrir um chamado.</p>

      <h2>Vocabulário visual útil</h2>
      <table>
        <thead><tr><th scope="col">Descrição</th><th scope="col">Onde fica mais aparente</th><th scope="col">Como registrar</th></tr></thead>
        <tbody>
          <tr><td>Ponto escuro</td><td>Branco e cores claras</td><td>Indicar fundos, posição e repetição</td></tr>
          <tr><td>Ponto claro</td><td>Preto e cores escuras</td><td>Comparar a olho nu e em foto sem realce</td></tr>
          <tr><td>Ponto colorido</td><td>Fundos que contrastam com sua cor</td><td>Anotar em quais cores aparece ou desaparece</td></tr>
          <tr><td>Partícula ou marca superficial</td><td>Pode mudar com luz ambiente e foco dos olhos</td><td>Limpar pelo manual e repetir sem pressionar</td></tr>
        </tbody>
      </table>

      <h2>Como fazer uma observação básica</h2>
      <ol>
        <li><strong>Confirme a resolução.</strong> Selecione a resolução nativa recomendada pelo sistema e mantenha a escala habitual. Isso reduz bordas e reamostragem que podem confundir padrões pequenos.</li>
        <li><strong>Prepare a tela.</strong> Desligue o equipamento, procure poeira na superfície e limpe apenas conforme o manual. Aguarde secar antes de ligar.</li>
        <li><strong>Use tela cheia.</strong> Exiba branco, preto, vermelho, verde e azul, esperando os controles sumirem. Não precisa aproximar o rosto até perder o foco normal de uso.</li>
        <li><strong>Mapeie a posição.</strong> Divida a tela em uma grade simples de três colunas e três linhas. Anote a região e uma referência próxima, sem marcar ou tocar o painel.</li>
        <li><strong>Compare os fundos.</strong> Registre em quais cores o ponto fica escuro, claro, colorido ou invisível. Repita a sequência uma vez nas mesmas condições.</li>
        <li><strong>Volte ao conteúdo real.</strong> Abra texto, fotografia e vídeo conhecidos para entender se o ponto interfere no uso cotidiano.</li>
      </ol>

      <h2>O que a câmera acrescenta</h2>
      <p>Uma foto geral comprova a posição; uma foto aproximada mostra a aparência. Faça ambas sem encostar a lente, sem zoom digital excessivo e sem filtros. Inclua a cor de fundo e as configurações do monitor no nome ou nas anotações do arquivo. Se o telefone elevar a exposição no preto, descreva separadamente o que você viu.</p>
      <p>Fotografias comuns raramente resolvem subpixels com fidelidade suficiente para uma contagem técnica. Moiré, foco e processamento do telefone podem criar padrões falsos. O objetivo da aproximação é indicar a região ao suporte, não substituir o método solicitado por ele.</p>

      <h2>Como usar a classificação sem exagerar</h2>
      <p>“Dead pixel” é uma expressão comum, mas políticas oficiais podem separar ponto brilhante, ponto escuro, subpixel e agrupamento. Registre primeiro o comportamento visível e depois consulte a definição usada para o modelo. Isso evita escolher um rótulo que não corresponde ao critério da garantia.</p>

      <h2>Entenda o tamanho aparente do ponto</h2>
      <p>Um único elemento de imagem ocupa uma fração muito pequena da tela. Em resoluções altas, ele pode desaparecer à distância de uso e ficar nítido apenas quando o rosto se aproxima. Escala do sistema e zoom do navegador aumentam os objetos da interface, mas não aumentam fisicamente o pixel do painel. Por isso, confirme a resolução nativa e observe o padrão sem redimensionamento antes de contar ocorrências.</p>
      <p>A câmera introduz outra grade, formada pelos fotossítios do sensor de imagem, e a interação entre essa grade e a do painel pode criar moiré ou cores falsas. Uma fotografia aproximada com vários quadradinhos coloridos não é automaticamente uma imagem fiel da estrutura de subpixels. Use-a para apontar a região; deixe a classificação técnica para o método adotado pelo fabricante.</p>

      <h2>Separe sujeira com paralaxe e foco</h2>
      <p>Com a tela desligada e sob luz lateral, uma partícula na superfície costuma ganhar sombra ou mudar de destaque quando a cabeça se desloca. Com a tela ligada, alterne o foco dos olhos entre a reflexão da superfície e a imagem. Não encoste a unha para “confirmar”. Se o manual permitir, faça uma limpeza leve em toda a pequena região e repita a sequência depois que a superfície secar.</p>
      <p>Uma marca no revestimento também pode permanecer no mesmo lugar e parecer um ponto escuro em fundo claro. Compare branco, vermelho, verde e azul e depois desligue a tela. Se a ocorrência ainda pode ser vista pela luz refletida, documente esse fato separadamente. O objetivo é evitar somar uma marca externa à contagem de pontos da imagem.</p>

      <h2>Localize sem tocar no painel</h2>
      <p>Para uma ocorrência isolada, a grade de nove regiões funciona bem. Quando há várias, use coordenadas relativas, como “25% a partir da esquerda e 40% a partir do topo”, sem prometer precisão de laboratório. Um desenho simples da tela em papel ajuda a numerar os achados. Acrescente a cor em que cada um fica mais evidente.</p>
      <table>
        <thead><tr><th scope="col">Registro</th><th scope="col">Exemplo</th><th scope="col">Por que ajuda</th></tr></thead>
        <tbody>
          <tr><td>Região</td><td>Superior esquerda, próximo ao centro</td><td>Permite reencontrar o ponto sem marcar a tela</td></tr>
          <tr><td>Fundos</td><td>Escuro no branco e no verde</td><td>Descreve comportamento, sem impor rótulo</td></tr>
          <tr><td>Distância</td><td>Visível a 60 cm em documento claro</td><td>Relaciona o achado ao uso</td></tr>
          <tr><td>Repetição</td><td>Mesma posição após reiniciar a fonte</td><td>Reduz a chance de ser elemento do arquivo</td></tr>
        </tbody>
      </table>

      <h2>Faça três verificações de origem</h2>
      <p>Primeiro, troque o fundo mantendo o mesmo navegador. Segundo, abra a sequência em outra aplicação ou dispositivo. Terceiro, use o menu ou o diagnóstico integrado indicado no manual. A Dell descreve testes internos que percorrem cores e ajudam a verificar se uma anormalidade pertence ao monitor ou à cadeia de vídeo. Outros fabricantes adotam comandos diferentes, e alguns modelos não oferecem esse recurso.</p>
      <p>Uma captura de tela completa o raciocínio. Se o ponto aparece no arquivo capturado e também em outra tela, ele pode estar no conteúdo, na aplicação ou no processamento anterior à saída. Se não aparece na captura, mas continua sobre o menu interno, a tela merece atenção do suporte. Essa separação não identifica a peça defeituosa; apenas elimina etapas da cadeia.</p>

      <h2>Conte em mais de uma sessão</h2>
      <p>Faça uma primeira ficha e guarde-a. Se a compra ou prazo de troca permitir, repita no dia seguinte com as mesmas configurações. Compare posição por posição, sem procurar novos pontos indefinidamente. Uma ocorrência que não pôde ser reencontrada deve ficar marcada como inconclusiva, não ser apagada do histórico nem somada como confirmada.</p>
      <p>Esse acompanhamento é especialmente útil quando uma partícula foi removida, o monitor mudou de mesa ou uma configuração foi restaurada. Registre a mudança entre sessões. Sem essa nota, duas fotografias diferentes podem parecer evidência de evolução quando apenas a condição de observação mudou.</p>

      <h2>Relacione o mapa à tarefa cotidiana</h2>
      <p>Depois dos padrões, abra um documento claro, uma fotografia, uma interface escura e um vídeo. Um ponto próximo ao centro pode incomodar em leitura ou retoque mesmo quando a contagem total é pequena; outro junto à borda pode passar despercebido. Esse impacto não altera por si só a política de garantia, mas informa sua decisão de compra e ajuda a explicar o problema ao atendimento.</p>
      <p>Evite deixar os fundos sólidos abertos por tempo prolongado, sobretudo em painéis emissivos. A sequência precisa durar apenas o suficiente para percorrer a tela. O teste serve para encontrar e descrever; não é um tratamento, um exercício visual ou uma prova de vida útil.</p>

      <h2>Erros comuns e limites</h2>
      <ul>
        <li>Contar sujeira antes de limpar a tela pelo procedimento permitido.</li>
        <li>Aplicar pressão, esfregar ou tentar deslocar o ponto com a unha.</li>
        <li>Usar um vídeo comprimido ou imagem que não preenche a tela como único padrão.</li>
        <li>Concluir que todo ponto colorido é “preso” ou que todo ponto escuro é “morto”.</li>
        <li>Transformar a contagem visual em decisão de garantia sem ler a política do modelo.</li>
      </ul>
      <p>Normas técnicas oferecem métodos e classificações, mas o navegador não executa um ensaio de conformidade. Ele não controla luminância, distância, instrumento, temperatura ou tolerância do fabricante. O resultado útil é um mapa simples, repetível e honesto do que aparece. Para uma decisão comercial, consulte a documentação vigente e envie ao suporte os arquivos originais e o modelo exato.</p>
    `
  },
  {
    slug: 'testar-monitor-olx-mercado-livre',
    title: 'Checklist para avaliar um monitor usado antes da compra',
    h1: 'Como avaliar um monitor usado presencialmente ou a distância',
    description: 'Organize documentos, inspeção física, conexões, resolução, taxa de atualização e padrões de tela antes de decidir sobre um monitor usado.',
    toolId: 'dead-pixel',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    sources: [
      {
        label: 'Dell — Display pixel guidelines',
        url: 'https://www.dell.com/support/kbdoc/en-us/000126004/dell-display-pixel-guidelines',
        note: 'Descreve a inspeção de pixels com fundos sólidos e ressalta que a cobertura depende do modelo.'
      },
      {
        label: 'Microsoft — Change the refresh rate on your monitor in Windows',
        url: 'https://support.microsoft.com/en-us/windows/hardware/display-graphics/change-the-refresh-rate-on-your-monitor-in-windows',
        note: 'Explica como conferir as taxas oferecidas pelo sistema para a combinação de tela, resolução e hardware.'
      },
      {
        label: 'Ministério da Justiça — Guia do consumidor estrangeiro',
        url: 'https://www.gov.br/mj/pt-br/assuntos/seus-direitos/consumidor/Anexos/guia-do-consumidor-estrangeiro-portugues.pdf',
        note: 'Resume documentos e registros úteis em relações de consumo no Brasil.'
      },
      {
        label: 'OLX — Está pensando em fazer uma compra?',
        url: 'https://ajuda.olx.com.br/s/article/fazer-uma-compra',
        note: 'Recomenda conferir anúncio e reputação, pedir evidências, negociar pela plataforma e testar o produto no encontro quando for viável.'
      },
      {
        label: 'Mercado Livre — Compra Garantida',
        url: 'https://www.mercadolivre.com.br/compra-garantida',
        note: 'Explica o fluxo de reclamação, as condições da proteção e transações ou categorias que podem ficar fora da cobertura.'
      },
      {
        label: 'Dell — How to run a diagnostic test on a Dell monitor',
        url: 'https://www.dell.com/support/kbdoc/en-us/000124390/how-to-run-diagnostic-test-on-a-dell-monitor',
        note: 'Explica como o diagnóstico integrado pode separar anormalidades do monitor de falhas na placa gráfica, no computador ou no sinal.'
      }
    ],
    relatedSlugs: ['como-testar-monitor-oled', 'o-que-sao-dead-pixels', 'manchas-no-monitor-causas'],
    faq: [
      ['O que levar para um teste presencial?', 'Leve um notebook carregado, cabos e adaptadores compatíveis e a lista das especificações oficiais do modelo. Não conecte dispositivos desconhecidos ao seu computador sem necessidade.'],
      ['Como observar riscos com a tela desligada?', 'Use luz ambiente difusa ou uma lanterna em ângulo, sem tocar o painel. Compare marcas superficiais com a tela ligada e não tente removê-las durante a negociação.'],
      ['Como conferir devolução e garantia em marketplace?', 'Leia os termos vigentes no anúncio, na plataforma e no documento de garantia. A aplicação de direitos depende de país, vendedor e modalidade; preserve anúncio, conversa e comprovante.']
    ],
    body: `
      <p><strong>Resposta direta:</strong> avalie um monitor usado em três blocos: procedência e documentos, integridade física e funcionamento com sinal real. Reserve tempo para testar a resolução e a taxa anunciadas, todas as entradas importantes e alguns fundos sólidos. Se a compra for remota, peça evidências contínuas e guarde o anúncio e a conversa.</p>

      <h2>Antes do encontro ou pagamento</h2>
      <ul>
        <li>Confirme marca, modelo completo, tamanho, resolução, taxa de atualização, entradas, fonte e acessórios no site oficial do fabricante.</li>
        <li>Peça uma foto atual da etiqueta e da tela ligada com uma palavra ou data combinada. Oriente o vendedor a ocultar número de série e dados pessoais em publicações abertas.</li>
        <li>Pergunte sobre nota fiscal, garantia restante, reparos, queda, contato com líquido, transporte e motivo da venda. Registre as respostas como declarações, sem tratá-las como prova técnica.</li>
        <li>Combine quais portas e cabos poderão ser testados e se haverá tempo para acessar o menu normal do monitor.</li>
        <li>Salve a versão do anúncio, preço, descrição, fotos, identificação do vendedor na plataforma e regras de proteção aplicáveis à transação.</li>
      </ul>

      <h2>Inspeção física sem desmontagem</h2>
      <ol>
        <li>Com o aparelho desligado e desconectado, observe moldura, base, parafusos externos, conectores e cabo de energia. Procure peças frouxas, trincas e sinais visíveis de impacto.</li>
        <li>Use luz difusa em ângulo para examinar riscos e manchas no revestimento. Não pressione, retire película ou aplique produto durante o teste.</li>
        <li>Confira se a base sustenta o monitor nas posições previstas, sem forçar articulações. Se houver suporte VESA instalado, verifique a fixação apenas externamente.</li>
        <li>Cheque se etiqueta e menu informam o modelo esperado. Uma divergência pode ser erro de anúncio, mas deve ser esclarecida antes da compra.</li>
      </ol>

      <h2>Teste funcional com o seu sinal</h2>
      <p>Conecte o notebook por uma entrada compatível e selecione a resolução nativa. No Windows ou em outro sistema, veja as taxas de atualização oferecidas para aquela resolução. A disponibilidade depende do monitor, cabo, porta, adaptador, placa gráfica e configuração; a ausência de uma taxa não prova isoladamente falha do monitor.</p>
      <ul>
        <li>Teste cada porta necessária por alguns minutos, movimentando o cabo apenas pelo conector. Observe perdas de sinal, artefatos e reconexões.</li>
        <li>Verifique brilho, botões, menu, seleção de entrada e áudio ou USB somente se esses recursos fizerem parte da compra.</li>
        <li>Abra texto pequeno e linhas finas para conferir nitidez na resolução nativa. Depois reproduza movimento conhecido para observar funcionamento normal, sem prometer medição de tempo de resposta.</li>
        <li>Se o modelo oferecer HDR ou sincronização adaptativa, confirme que o recurso é reconhecido na combinação disponível. Uma demonstração curta não valida todo o intervalo operacional.</li>
      </ul>

      <h2>Sequência de inspeção do painel</h2>
      <ol>
        <li>Exiba branco, preto, vermelho, verde e azul em tela cheia e procure pontos que reaparecem na mesma posição.</li>
        <li>Use cinza médio para perceber contornos, faixas e diferenças de tonalidade. Compare também com conteúdo real.</li>
        <li>Em LCD, observe preto de frente e depois varie levemente o ângulo; separe glow angular de uma região persistente.</li>
        <li>Em OLED, procure contornos de interfaces em várias cores e, se existir, use o autoteste documentado. Não acione repetidamente ciclos de manutenção.</li>
        <li>Fotografe a tela inteira e depois a área de interesse, mantendo o mesmo fundo e sem editar a imagem.</li>
      </ol>

      <h2>Compra a distância e documentação</h2>
      <p>Peça um vídeo contínuo que mostre o modelo, a conexão, o menu normal e a mudança entre padrões, mas lembre que compressão e exposição escondem ou acentuam detalhes. A orientação atual da OLX inclui ler o anúncio inteiro, conferir a reputação, pedir mais fotos ou vídeos e manter a negociação na própria plataforma. Para um encontro, a empresa também recomenda local público, horário diurno e teste do produto quando isso for viável.</p>
      <p>No Mercado Livre, a página da Compra Garantida descreve uma proteção sujeita às condições do programa e ao motivo da solicitação. Ela também lista exclusões, como pagamentos feitos fora do Mercado Livre, envio de dinheiro e certos produtos ou situações que não atendam aos requisitos. Por isso, confira a cobertura exibida na compra concreta antes de pagar e use os recursos oficiais de pagamento, mensagens e reclamação. Não envie credenciais, códigos de verificação ou documentos por contatos improvisados.</p>
      <p>Direitos de devolução, garantia e intermediação variam com a relação de consumo, o tipo de vendedor, a modalidade e a jurisdição. Leia os termos atuais vinculados ao pedido, sem transportar automaticamente para ele um prazo visto em outra categoria ou transação. Guarde comprovante, anúncio e mensagens; se houver gravação, observe antes as regras aplicáveis.</p>

      <h2>Monte um kit pequeno e compatível</h2>
      <p>Leve um notebook carregado, a fonte dele, um cabo conhecido e apenas os adaptadores necessários para as entradas do monitor. Baixe antes a página oficial de especificações e os padrões que pretende abrir; o local pode não ter internet. Uma extensão com proteção adequada pode ajudar quando a tomada está longe, mas não improvise adaptadores elétricos nem conecte equipamento com cabo danificado.</p>
      <p>Inclua um pano somente para remover poeira do seu próprio aparelho. Não limpe o monitor do vendedor durante a visita: uma marca pode exigir o método específico do manual, e qualquer dano criaria uma disputa desnecessária. Uma lanterna pequena usada de lado, sem encostar na superfície, já revela riscos, lascas e sinais de pressão com a tela desligada.</p>

      <h2>Divida o encontro em blocos com tempo marcado</h2>
      <p>Uma sequência de vinte a trinta minutos costuma ser mais informativa do que passar todo o encontro olhando fundos sólidos. Reserve o começo para identidade e estado externo, o meio para sinal, portas e controles e o fim para painel e conteúdo real. Avise o vendedor sobre o roteiro antes; pressa inesperada costuma deixar justamente os itens difíceis para depois do pagamento.</p>
      <ol>
        <li><strong>Primeiros cinco minutos:</strong> confira modelo, etiqueta, acessórios, base, moldura e conectores sem desmontar.</li>
        <li><strong>Próximos dez minutos:</strong> ligue, teste a entrada principal, resolução nativa, taxa de atualização e menu.</li>
        <li><strong>Bloco seguinte:</strong> percorra fundos sólidos, cinza, texto e movimento na posição normal de uso.</li>
        <li><strong>Fechamento:</strong> revise portas essenciais, registre achados e compare o que foi entregue com o anúncio.</li>
      </ol>
      <p>O relógio não transforma a inspeção em ensaio de durabilidade. Ele impede que um teste chamativo consuma todo o tempo enquanto fonte, suporte, botões ou entrada necessária ficam esquecidos.</p>

      <h2>Observe estabilidade sem provocar o aparelho</h2>
      <p>Durante o teste, preste atenção a reinicializações, perda de sinal, cheiro anormal, estalos e aquecimento concentrado. Fontes externas podem ficar mornas no funcionamento comum; a visita não permite definir uma temperatura segura pelo toque. Se houver odor forte, deformação, cabo exposto ou desligamentos repetidos, pare e desconecte de modo seguro. Não abra a carcaça.</p>
      <p>Mude brilho e volume pelos controles normais, depois retorne à configuração inicial. Verifique se os botões respondem uma vez por comando e se o menu não se move sozinho. Alto-falante embutido, hub USB, KVM, webcam e carregamento USB-C só entram no roteiro quando fazem parte da oferta. Cada função adicional precisa de cabo e dispositivo compatíveis.</p>

      <h2>Confirme a taxa anunciada sem confundir a cadeia</h2>
      <p>O sistema mostra as taxas disponíveis para a combinação formada por monitor, resolução, porta, cabo, adaptador e placa gráfica. Se 144 Hz ou outro valor anunciado não aparece, confira primeiro a resolução selecionada e a especificação de cada elo. Um adaptador limitado pode esconder uma capacidade que o monitor possui. Da mesma forma, o menu exibir um número não comprova que todos os quadros sejam entregues de forma perfeita.</p>
      <p>Selecione a taxa pelo painel do sistema e use uma animação ou rolagem conhecida para confirmar funcionamento básico. Não prometa medir tempo de resposta, atraso ou quadros descartados a olho nu. Se a compra depende de HDR, VRR ou uma taxa específica, faça o teste com o hardware que será usado e registre quais combinações não puderam ser verificadas.</p>

      <h2>Avalie USB-C como três funções separadas</h2>
      <p>Uma porta USB-C pode transportar vídeo, dados e energia, mas nem toda porta oferece as três funções ou a mesma potência. Confira a especificação oficial do modelo e teste o que está anunciado. Veja se o notebook recebe imagem, se os periféricos do hub aparecem e se o sistema reconhece alimentação. Um cabo que carrega pode não suportar o modo de vídeo necessário.</p>
      <p>Não conclua que há defeito ao ver uma mensagem de carregamento lento sem comparar a potência exigida pelo notebook e a oferecida pelo monitor. Se o equipamento inclui uma fonte destacável, confirme modelo e potência na etiqueta, sem divulgar números de série. Fonte substituta incompatível deve ser esclarecida antes da compra.</p>

      <h2>Peça um vídeo remoto que tenha começo, meio e fim</h2>
      <p>Para uma negociação a distância, combine uma palavra curta e peça que ela apareça em papel ao lado do monitor no início. O vídeo pode mostrar a etiqueta com dados sensíveis cobertos, a conexão do cabo, o menu com modelo quando disponível, a troca contínua entre cores e alguns minutos de conteúdo. Um corte entre cada etapa reduz o valor da sequência porque não mostra se é a mesma unidade e condição.</p>
      <p>Compressão pode apagar um ponto pequeno; exposição pode esconder preto ou clarear manchas. Portanto, peça também fotos originais da tela inteira em branco e preto, além de uma aproximação indicada por contexto. Nenhum arquivo remoto elimina o risco de transporte ou substitui uma inspeção física. Mantenha pagamento, conversa e envio nos recursos oficiais da plataforma.</p>

      <h2>Inclua embalagem e transporte na decisão</h2>
      <p>Monitor sem caixa original pode ser transportado com segurança, mas exige material e posição adequados. Confira se a base será removida conforme o manual, se a superfície ficará protegida sem pressão e quem assume a responsabilidade pelo envio. Não apoie outros objetos sobre a tela e não deixe cabos soltos baterem no painel.</p>
      <p>Antes de sair do local, fotografe o estado do equipamento e os acessórios acordados. Em entrega por transportadora, registre a embalagem antes de abrir e interrompa se houver impacto grave ou líquido. Siga o procedimento da plataforma para comunicar dano; ligar imediatamente uma unidade molhada pode ampliar o problema.</p>

      <h2>Registre a decisão, inclusive o que ficou sem teste</h2>
      <table>
        <thead><tr><th scope="col">Item</th><th scope="col">Estado</th><th scope="col">Consequência prática</th></tr></thead>
        <tbody>
          <tr><td>Entrada principal</td><td>Testada na resolução e taxa desejadas</td><td>Compatível com o computador levado</td></tr>
          <tr><td>Porta secundária</td><td>Não testada por falta de cabo</td><td>Risco pendente, sem presumir funcionamento</td></tr>
          <tr><td>Ponto aparente</td><td>Visível em branco, fora do centro</td><td>Avaliar impacto e política vigente</td></tr>
          <tr><td>Documento de compra</td><td>Cópia disponível com dados conferidos</td><td>Consultar transferência e cobertura com o suporte</td></tr>
        </tbody>
      </table>
      <p>Termine comparando essa ficha com suas prioridades e com o desconto. Uma porta sem importância para você pesa menos do que instabilidade na entrada principal. Um recurso não verificado continua sendo incerteza. Essa linguagem deixa a negociação clara e evita transformar ausência de evidência em promessa.</p>

      <h2>Erros comuns e limite do checklist</h2>
      <ul>
        <li>Testar apenas a tela inicial do vendedor e não confirmar a resolução nativa.</li>
        <li>Usar um único cabo para concluir que uma porta está defeituosa.</li>
        <li>Confundir reflexo, poeira ou compressão de vídeo com dano interno.</li>
        <li>Entregar dinheiro antes de confirmar identidade da transação e condições registradas.</li>
        <li>Tratar a ausência de nota fiscal como confirmação de origem irregular, sem verificar outros documentos.</li>
      </ul>
      <p>Este roteiro reduz lacunas de informação, mas não prevê vida útil nem substitui assistência. Se um item essencial não puder ser testado, registre a incerteza e inclua esse risco na decisão, em vez de assumir que o recurso funciona.</p>
    `
  },
  {
    slug: 'pixel-morto-vs-pixel-preso',
    title: 'Ponto escuro, claro ou colorido: como registrar a diferença',
    h1: 'Como documentar um ponto aparente na tela',
    description: 'Monte um registro visual comparável de pontos escuros, claros ou coloridos e evite concluir a causa física apenas pela aparência.',
    toolId: 'dead-pixel',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    sources: [
      {
        label: 'Dell — Display pixel guidelines',
        url: 'https://www.dell.com/support/kbdoc/en-us/000126004/dell-display-pixel-guidelines',
        note: 'Diferencia visualmente pontos brilhantes e escuros e orienta usar cores sólidas para inspeção.'
      },
      {
        label: 'ISO 9241-307 — Electronic visual displays',
        url: 'https://www.iso.org/standard/40102.html',
        note: 'Referência técnica sobre métodos de teste e requisitos de displays eletrônicos.'
      },
      {
        label: 'Dell — How to run a diagnostic test on a Dell monitor',
        url: 'https://www.dell.com/support/kbdoc/en-us/000124390/how-to-run-diagnostic-test-on-a-dell-monitor',
        note: 'Explica como padrões internos ajudam a verificar se uma anormalidade continua presente sem o sinal do computador.'
      }
    ],
    relatedSlugs: ['o-que-sao-dead-pixels', 'politica-dead-pixel-fabricantes', 'testar-monitor-olx-mercado-livre'],
    faq: [
      ['Qual é a diferença visual básica?', 'Um ponto escuro fica mais evidente em fundos claros; um ponto claro se destaca no preto; um ponto colorido muda de contraste conforme a cor exibida. Isso descreve aparência, não o circuito afetado.'],
      ['Softwares com flashes recuperam pixels?', 'Não existe garantia de recuperação. Flashes rápidos podem causar desconforto ou risco para pessoas fotossensíveis e não reparam dano físico ou alteração persistente do painel.'],
      ['Posso aplicar pressão na tela?', 'Não. Fabricantes desaconselham pressionar ou esfregar um ponto, porque isso pode danificar o painel e o revestimento.']
    ],
    body: `
      <p><strong>Resposta direta:</strong> “morto” e “preso” são rótulos populares aplicados a aparências diferentes. Para um chamado útil, registre o ponto como escuro, claro ou colorido, liste os fundos em que aparece e marque sua posição. A observação no navegador não confirma qual transistor, subpixel ou camada está envolvido.</p>

      <h2>Por que o registro visual é mais útil que o rótulo</h2>
      <p>Fabricantes podem definir categorias próprias para pontos brilhantes, escuros, subpixels e agrupamentos. Uma mesma palavra usada em fóruns não garante a mesma interpretação na política de garantia. Fotos consistentes e uma tabela de ocorrência permitem que o suporte aplique os termos corretos ao modelo.</p>
      <p>Poeira, marca na superfície, escala de exibição, reflexo e defeito na própria imagem também podem imitar um ponto do painel. O procedimento começa eliminando essas variáveis simples, sem pressão, desmontagem ou tentativa de reparo.</p>

      <h2>Prepare uma ficha de observação</h2>
      <p>Anote marca e modelo, resolução selecionada, escala do sistema, entrada usada, brilho, modo de imagem, HDR, data e iluminação do ambiente. Não publique número de série, nota fiscal ou dados pessoais. Se o suporte pedir essas informações, envie-as somente pelo canal oficial.</p>
      <p>Defina antes como localizar cada ponto. Uma grade de três colunas por três linhas costuma ser suficiente para o relato. Se existirem vários pontos, numere-os na ficha e associe cada número a uma descrição; não desenhe nem cole etiquetas na superfície.</p>

      <h2>Sequência de registro</h2>
      <ol>
        <li><strong>Limpe com segurança.</strong> Desligue a tela e siga o manual para remover poeira ou impressão. Espere secar e não esfregue a área suspeita.</li>
        <li><strong>Confirme o padrão.</strong> Use a resolução nativa recomendada, abra a cor em tela cheia e espere a interface desaparecer.</li>
        <li><strong>Passe por cinco fundos.</strong> Observe branco, preto, vermelho, verde e azul. Acrescente cinza médio se precisar comparar contraste.</li>
        <li><strong>Mapeie a posição.</strong> Descreva, por exemplo, “terço superior, coluna central”. Se houver vários pontos, numere-os apenas na anotação.</li>
        <li><strong>Repita.</strong> Feche e reabra a sequência ou use o autoteste documentado do monitor. Confirme se o ponto retorna à mesma posição.</li>
        <li><strong>Compare outra fonte.</strong> Quando possível, use outra entrada ou o menu do monitor. Se o ponto aparece no menu ou autoteste, ele não pertence ao arquivo exibido, embora a causa ainda exija avaliação.</li>
      </ol>

      <h2>Tabela para cada ponto</h2>
      <table>
        <thead><tr><th scope="col">Campo</th><th scope="col">Exemplo de descrição objetiva</th></tr></thead>
        <tbody>
          <tr><td>Posição</td><td>Terço inferior, próximo à borda direita</td></tr>
          <tr><td>Branco</td><td>Ponto escuro visível</td></tr>
          <tr><td>Preto</td><td>Não perceptível a olho nu</td></tr>
          <tr><td>Vermelho, verde e azul</td><td>Visível no verde; discreto no vermelho; ausente no azul</td></tr>
          <tr><td>Conteúdo normal</td><td>Perceptível em documentos claros, não percebido em vídeo</td></tr>
        </tbody>
      </table>
      <p>O exemplo mostra o formato, não um resultado esperado. Use exatamente o que você viu, inclusive “inconclusivo”. Não estime dimensões microscópicas nem conte subpixels por uma fotografia comum.</p>

      <h2>Fotografia e evidência</h2>
      <p>Faça primeiro uma imagem da tela inteira para dar contexto. Depois aproxime sem encostar a lente e mantenha foco, exposição e orientação. Evite zoom digital, modo noturno e filtros. Inclua no nome do arquivo a cor do fundo e guarde o original. Um marcador pode ser adicionado a uma cópia para indicar a região, preservando o arquivo sem edição.</p>

      <h2>Descreva comportamento antes de escolher um nome</h2>
      <p>Comece cada linha da ficha com algo que qualquer pessoa possa observar: “escuro no branco”, “azul no preto”, “claro no vermelho” ou “não percebido no conteúdo normal”. Depois, se a política oficial empregar uma categoria específica, associe o registro a ela. Essa ordem evita ajustar a observação ao rótulo que você esperava encontrar.</p>
      <p>Um ponto pode parecer diferente quando o fundo muda porque o contraste ao redor mudou. A câmera também pode registrar uma cor diferente daquela percebida. Se houver dúvida, escreva “aparência colorida” e liste os padrões. O suporte precisa do conjunto, não de uma certeza sobre um componente invisível.</p>

      <h2>Confirme que a coordenada é realmente a mesma</h2>
      <p>Em padrões de tela cheia, barras do navegador, cursor, indicadores de volume e notificações podem criar marcas transitórias. Espere a interface desaparecer e mova o cursor para uma borda conhecida. Se o ponto parece mudar junto com uma janela ou captura, investigue o conteúdo. Se fica na mesma coordenada física enquanto a imagem se move, anote essa estabilidade.</p>
      <p>O menu do monitor e o diagnóstico integrado oferecem uma comparação sem o desenho do navegador. A Dell documenta que seus modelos compatíveis percorrem cores sólidas no teste interno; outras marcas usam rotinas e comandos próprios. Consulte o guia exato, pois uma combinação de botões errada pode apenas mudar configurações.</p>

      <h2>Organize os arquivos para uma leitura rápida</h2>
      <p>Crie uma pasta com data e modelo, sem número de série no nome. Dentro dela, use nomes previsíveis: “geral-branco”, “geral-preto”, “ponto-1-verde”, “ponto-2-azul” e “conteudo-real”. Coloque a ficha em texto ou PDF na mesma pasta. Se fizer uma cópia com círculo ou seta, acrescente “marcada” e preserve a original ao lado.</p>
      <table>
        <thead><tr><th scope="col">Arquivo</th><th scope="col">Enquadramento</th><th scope="col">Função</th></tr></thead>
        <tbody>
          <tr><td>Geral</td><td>Tela inteira e bordas</td><td>Localiza a ocorrência no painel</td></tr>
          <tr><td>Aproximação</td><td>Região e referências próximas</td><td>Mostra a aparência sem perder contexto</td></tr>
          <tr><td>Conteúdo real</td><td>Distância habitual</td><td>Registra o impacto na tarefa</td></tr>
          <tr><td>Ficha</td><td>Texto com condições</td><td>Permite repetir a observação</td></tr>
        </tbody>
      </table>

      <h2>Faça uma repetição que possa discordar da primeira</h2>
      <p>Após a sequência inicial, feche o navegador, restaure a posição de uso e repita uma vez. Se um ponto não reaparece, marque o resultado como inconclusivo. Não apague a primeira nota e não tente forçar o retorno com pressão, calor ou flashes. Divergência é uma informação válida e pode revelar que o elemento vinha da superfície, do arquivo ou de uma sobreposição.</p>
      <p>Quando houver prazo para observar, repita em outro dia com as mesmas configurações. Registre qualquer limpeza autorizada, troca de cabo, atualização ou restauração feita entre as sessões. Comparar imagens sem esse histórico pode transformar uma mudança externa em suposta evolução do painel.</p>

      <h2>Evite métodos agressivos apresentados como conserto</h2>
      <p>Vídeos com alternância rápida de cores podem ser desconfortáveis para pessoas fotossensíveis e não são necessários para mapear um ponto. Massagear a tela, pressionar com pano ou aquecer a região pode danificar o painel ou o revestimento. Não há base para prometer que um ponto observado voltará ao funcionamento após uma dessas tentativas.</p>
      <p>Se o fabricante oferecer uma rotina eletrônica para o tipo de tela, execute-a somente nas condições e frequência do manual. Rotina de compensação de OLED, diagnóstico de LCD e limpeza física são processos diferentes. O nome informal “pixel preso” não autoriza aplicar um procedimento encontrado para outra tecnologia.</p>

      <h2>Mostre o efeito na atividade que motivou o chamado</h2>
      <p>Um editor de imagens pode registrar o ponto sobre áreas uniformes do projeto; quem trabalha com texto pode mostrar um documento claro; um jogador pode indicar a região durante uma cena comum. Faça essa imagem na distância normal, sem ampliar artificialmente. Ela complementa os padrões e explica por que a ocorrência é relevante, mesmo que não defina cobertura.</p>
      <p>Ao falar com o suporte, apresente o mapa antes de usar “morto” ou “preso”: quantidade observada, posição, fundos, repetição no menu ou teste interno e impacto no uso. Se a equipe adotar outro termo, mantenha sua descrição original. Assim, uma mudança de classificação não apaga a evidência que você realmente produziu.</p>

      <h2>Erros comuns e limites</h2>
      <ul>
        <li>Aplicar pressão, massagear ou aquecer a tela.</li>
        <li>Executar flashes rápidos sem aviso; eles não são necessários para localizar um ponto.</li>
        <li>Fotografar apenas em preto com a exposição automática elevada.</li>
        <li>Decidir cobertura por uma tabela genérica encontrada fora do suporte oficial.</li>
        <li>Chamar o ponto de recuperado depois de uma única mudança temporária.</li>
      </ul>
      <p>O registro responde onde o ponto está, como ele aparece e em quais condições se repete. Ele não prova a causa, não prevê evolução e não garante reparo. Leve a ficha, fotos e comprovante ao fabricante ou vendedor para que a política vigente seja aplicada ao modelo e à região corretos.</p>
    `
  },
  {
    slug: 'politica-dead-pixel-fabricantes',
    title: 'Pixels aparentes e garantia: como reunir documentação',
    h1: 'Como documentar pixels aparentes para consultar a garantia',
    description: 'Identifique a política do modelo, reúna evidências comparáveis e organize o chamado sem depender de limites genéricos encontrados na internet.',
    toolId: 'dead-pixel',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    sources: [
      {
        label: 'Dell — Display pixel guidelines',
        url: 'https://www.dell.com/support/kbdoc/en-us/000126004/dell-display-pixel-guidelines',
        note: 'Exemplo oficial de política que varia por família, tipo de ponto e período de cobertura.'
      },
      {
        label: 'Consumidor.gov.br — Código de Defesa do Consumidor',
        url: 'https://www.consumidor.gov.br/pages/conteudo/publico/102',
        note: 'Texto oficial para consultar direitos e deveres aplicáveis às relações de consumo no Brasil.'
      },
      {
        label: 'Ministério da Justiça — Guia do consumidor estrangeiro',
        url: 'https://www.gov.br/mj/pt-br/assuntos/seus-direitos/consumidor/Anexos/guia-do-consumidor-estrangeiro-portugues.pdf',
        note: 'Orienta conservar comprovantes, contratos e documentos usados em atendimento ao consumidor.'
      },
      {
        label: 'Dell — How to run a diagnostic test on a Dell monitor',
        url: 'https://www.dell.com/support/kbdoc/en-us/000124390/how-to-run-diagnostic-test-on-a-dell-monitor',
        note: 'Orienta registrar anormalidades por meio do teste integrado antes de encaminhar o caso ao suporte; os comandos variam por modelo.'
      }
    ],
    relatedSlugs: ['o-que-sao-dead-pixels', 'pixel-morto-vs-pixel-preso', 'testar-monitor-olx-mercado-livre'],
    faq: [
      ['Existe um limite universal de pixels defeituosos?', 'Não. Normas técnicas podem servir de referência, mas cobertura comercial varia por fabricante, família, modelo, tipo e agrupamento do ponto, país, vendedor e período.'],
      ['Como encontro a regra aplicável?', 'Pesquise o modelo exato no site regional do fabricante, leia certificado e termos da compra e peça confirmação escrita ao suporte oficial.'],
      ['O teste do MonitorSmith decide a garantia?', 'Não. Ele ajuda a localizar e documentar pontos aparentes. A elegibilidade é definida pelos termos vigentes e pelos direitos aplicáveis à compra.']
    ],
    body: `
      <p><strong>Resposta direta:</strong> não existe uma contagem universal que garanta troca de qualquer monitor. Localize a política do modelo e da região, registre cada ponto em fundos sólidos e abra um protocolo com documentos da compra. O fabricante ou vendedor aplica os termos vigentes ao caso.</p>

      <h2>Por que uma tabela genérica pode induzir ao erro</h2>
      <p>Uma norma de ergonomia ou qualidade pode estabelecer classes e métodos, mas a garantia comercial pode criar condições próprias. Uma marca também pode oferecer coberturas diferentes entre linhas profissionais, consumidores, notebooks e monitores. Tipo de ponto, quantidade, proximidade entre ocorrências, localização, data da compra e país podem influenciar a análise.</p>
      <p>Capturas de fóruns ou páginas antigas não demonstram a política atual. Procure o domínio oficial, selecione sua região e use o nome completo do modelo. Se a página não mencionar seu produto, peça uma resposta por escrito ao suporte.</p>

      <h2>Comece pela origem da unidade, não pela contagem</h2>
      <p>Antes de procurar um limite, descubra quem vendeu, quem emitiu a garantia e qual variante chegou às suas mãos. Um sufixo no modelo pode indicar região, revisão ou pacote comercial diferente. Copie o código da etiqueta ou do menu, entre na área de suporte da marca para o país da compra e abra os documentos a partir da página do produto. O trecho exibido pelo buscador serve apenas para localizar a página; não basta para decidir o caso.</p>
      <table>
        <thead><tr><th scope="col">Situação da compra</th><th scope="col">Primeira fonte a consultar</th><th scope="col">Pergunta que precisa de resposta</th></tr></thead>
        <tbody>
          <tr><td>Loja e distribuição nacionais</td><td>Pedido, certificado e suporte regional</td><td>Qual política cobre exatamente o modelo e a data?</td></tr>
          <tr><td>Importação</td><td>Termos do vendedor e suporte da região de origem</td><td>A cobertura atravessa fronteiras e quem recebe o produto?</td></tr>
          <tr><td>Unidade usada</td><td>Comprovante disponível e condições de transferência</td><td>A garantia acompanha a unidade ou o comprador original?</td></tr>
          <tr><td>Recondicionado ou venda empresarial</td><td>Contrato específico e documento fiscal</td><td>Quais condições foram oferecidas nessa modalidade?</td></tr>
        </tbody>
      </table>
      <p>Se a família não aparecer na política publicada, não complete a lacuna com uma tabela de outro país. Pergunte por escrito ao canal oficial e guarde a resposta vinculada ao protocolo. Uma cópia em PDF com título, endereço e data registra o que estava acessível, mas não transforma uma página antiga em termo aplicável à venda.</p>

      <h2>Monte um dossiê curto que outra pessoa consiga conferir</h2>
      <p>Separe o material em três grupos. No primeiro ficam modelo completo, foto privada da etiqueta, nota ou pedido e data de entrega. No segundo, a página de pixels, o certificado e o anúncio da compra. No terceiro, a ficha do ponto aparente, os arquivos originais e o histórico do atendimento. Essa divisão responde a três perguntas diferentes: qual produto é, qual regra pode valer e o que foi observado.</p>
      <ul>
        <li>Nomeie os arquivos com data, fundo e enquadramento, como <em>2026-09-11_branco_geral</em>, sem colocar CPF, endereço ou número de série no nome.</li>
        <li>Guarde a fotografia original e faça qualquer círculo ou seta somente em uma cópia identificada como marcada.</li>
        <li>Registre versão do sistema, resolução, brilho, entrada e cabo quando esses dados influenciarem a repetição.</li>
        <li>Associe cada e-mail, ordem de serviço e comprovante ao protocolo correspondente, em vez de juntar conversas de casos diferentes.</li>
      </ul>

      <h2>Produza a evidência que a política consegue avaliar</h2>
      <ol>
        <li>Limpe a superfície apenas pelo método do manual e selecione a resolução nativa recomendada.</li>
        <li>Exiba branco, preto, vermelho, verde e azul em tela cheia, no brilho usado normalmente.</li>
        <li>Mapeie cada ocorrência por região e descreva em quais fundos ela fica clara, escura, colorida ou imperceptível.</li>
        <li>Fotografe primeiro a tela inteira e depois a região. Não encoste a lente, não use filtro e não altere contraste.</li>
        <li>Execute o autoteste somente se o manual do modelo o documentar. Menu de serviço, pressão e tentativas caseiras de reparo ficam fora do roteiro.</li>
        <li>Volte a um documento, jogo ou fotografia real e anote o impacto na distância cotidiana de uso.</li>
      </ol>
      <p>O resultado é uma descrição, não um diagnóstico microscópico. Se a câmera produz moiré ou não separa os subpixels, diga isso. Uma imagem honesta, com contexto, vale mais do que uma ampliação artificial que parece precisa.</p>

      <h2>Abra um chamado que possa ser encaminhado sem tradução</h2>
      <p>Use o canal oficial e leve as informações essenciais para o primeiro parágrafo: “Monitor [modelo], recebido em [data]. Observei [quantidade] pontos aparentes nas regiões [posição]. Eles aparecem como [descrição] nos fundos [cores] e são perceptíveis em [atividade]. O teste interno [foi executado conforme o manual e mostrou o mesmo resultado / não está disponível / não foi localizado]. Anexo foto geral, aproximações originais e comprovante. Solicito a política aplicável e a orientação para análise.”</p>
      <p>Escolha somente a alternativa que corresponde ao que ocorreu. Depois peça o protocolo, o nome ou endereço da política considerada, os próximos passos e qualquer custo informado. Se o prazo da compra estiver correndo, abra a solicitação com o material disponível e avise quais arquivos ainda serão enviados. Isso registra a data sem inventar uma contagem ou um teste.</p>

      <h2>Leia a resposta como uma árvore de decisão</h2>
      <ol>
        <li><strong>A política e a variante estão identificadas?</strong> Se não, responda com o código completo, o país da compra e peça o documento usado na análise.</li>
        <li><strong>A classificação coincide com a observação?</strong> Se o suporte fala em ponto escuro e sua ficha mostra um ponto claro no preto, encaminhe os fundos e posições novamente, sem discutir componentes internos.</li>
        <li><strong>Falta uma evidência executável?</strong> Repita apenas a etapa solicitada e prevista no manual. Se o comando não existe no modelo, informe isso em vez de improvisar.</li>
        <li><strong>A cobertura foi negada com justificativa clara?</strong> Guarde a decisão. Quando houver relação de consumo, os canais oficiais da sua jurisdição podem orientar os passos seguintes a partir dos documentos concretos.</li>
      </ol>
      <p>No Brasil, garantia contratual e direitos legais não são a mesma coisa e dependem dos fatos da relação. Código de Defesa do Consumidor, Consumidor.gov.br, Procon, assistência jurídica e Judiciário exercem funções diferentes. Este roteiro deixa o caso legível para consulta; ele não escolhe a medida jurídica nem prevê seu resultado.</p>

      <h2>Veja como o caminho muda em três casos comuns</h2>
      <p><strong>Compra recente em loja:</strong> o pedido mostra vendedor e entrega, enquanto a política da marca classifica o ponto. Comece pelo canal indicado para aquela compra e pergunte quem fará a análise. Abrir dois chamados paralelos sem relacioná-los pode produzir orientações incompatíveis.</p>
      <p><strong>Monitor profissional com política própria:</strong> confirme que o código completo pertence à linha citada. Uma cobertura anunciada para certos modelos não se estende automaticamente aos demais produtos da marca. Na mensagem, inclua a página encontrada e peça confirmação da correspondência.</p>
      <p><strong>Unidade usada ou importada:</strong> ausência de nota local, troca de proprietário e região de origem podem mudar o responsável e a logística. Reúna o que existe, pergunte se a cobertura é transferível e obtenha o endereço de atendimento antes de prometer um envio. A resposta negativa de um canal não prova, sozinha, que nenhuma obrigação exista.</p>

      <h2>Se o monitor precisar viajar, crie uma cadeia simples de conferência</h2>
      <table>
        <thead><tr><th scope="col">Momento</th><th scope="col">Ação concreta</th><th scope="col">Registro preservado</th></tr></thead>
        <tbody>
          <tr><td>Antes de embalar</td><td>Confirmar destino, protocolo e acessórios pedidos; fotografar tela, carcaça e conectores</td><td>Autorização e imagens originais</td></tr>
          <tr><td>Na embalagem</td><td>Seguir a orientação recebida e impedir pressão sobre o painel</td><td>Fotos das camadas e lista do conteúdo</td></tr>
          <tr><td>Na coleta ou postagem</td><td>Conferir destinatário e guardar peso e rastreio</td><td>Comprovante de entrega à transportadora</td></tr>
          <tr><td>No retorno</td><td>Fotografar a caixa antes de abrir e repetir o teste inicial</td><td>Ordem de serviço e ficha posterior</td></tr>
        </tbody>
      </table>
      <p>Envie apenas o que foi solicitado; cabos extras e mídias pessoais criam itens para conferir sem ajudar a análise. Em monitor com sistema integrado, remova contas e dados pelo procedimento oficial antes da coleta. Ao receber, compare o número de série em privado e veja se o sintoma descrito mudou. A palavra “reparado” na ordem de serviço não substitui essa verificação.</p>
      <p>Se algo divergir, registre a embalagem, a unidade recebida e o teste feito, depois retome o mesmo protocolo. Datas, arquivos e comprovantes formam uma sequência verificável sem exigir gravações indevidas ou um diário de cada telefonema.</p>

      <h2>Erros comuns e limites</h2>
      <ul>
        <li>Citar um número de pixels sem informar modelo, região ou fonte atual.</li>
        <li>Enviar somente uma foto ampliada, sem tela inteira, fundo ou descrição.</li>
        <li>Publicar número de série, endereço ou nota fiscal completa em redes sociais.</li>
        <li>Tentar reparar o ponto antes da análise e comprometer o estado do produto.</li>
      </ul>
      <p>A documentação não garante aprovação, mas permite uma decisão rastreável e uma contestação fundamentada. Preserve originais, datas e protocolos até a conclusão do atendimento.</p>
    `
  },
  {
    slug: 'como-limpar-monitor-sem-danificar',
    title: 'Como limpar a tela do monitor seguindo o fabricante',
    h1: 'Procedimento seguro para limpar a tela do monitor',
    description: 'Siga uma sequência conservadora para remover poeira e marcas sem borrifar líquidos, pressionar o painel ou ignorar o revestimento do modelo.',
    toolId: 'cleaner',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    sources: [
      {
        label: 'Apple — How to clean your Apple products',
        url: 'https://support.apple.com/en-us/103258',
        note: 'Orienta desligar, desconectar, usar pano macio sem fiapos e evitar borrifar líquidos diretamente.'
      },
      {
        label: 'LG — How to clean a monitor screen',
        url: 'https://www.lg.com/us/support/help-library/lg-monitor-how-to-clean-the-monitor-screen--20153255207578',
        note: 'Recomenda desligar o monitor, usar pano macio e evitar força excessiva, água direta e produtos químicos inadequados.'
      },
      {
        label: 'Microsoft — Clean and care for your Surface',
        url: 'https://support.microsoft.com/en-us/surface/setup/clean-and-care-for-your-surface',
        note: 'Mostra que telas e dispositivos específicos podem ter limites próprios para pano, solução e frequência de limpeza.'
      }
    ],
    relatedSlugs: ['guia-limpeza-lcd-oled-notebook', 'manchas-no-monitor-causas', 'como-testar-monitor-oled'],
    faq: [
      ['Posso usar álcool comum ou limpa-vidros?', 'Não presuma compatibilidade. Limpa-vidros, amônia, solventes e concentrações não aprovadas podem afetar revestimentos. Use somente a solução e o método autorizados para o modelo.'],
      ['Qual líquido é seguro para qualquer monitor?', 'Não existe um líquido universal. Alguns fabricantes permitem apenas pano seco ou água; outros autorizam formulações específicas. Consulte o manual antes de umedecer o pano.'],
      ['Por que evitar papel toalha e guardanapo?', 'Eles podem reter partículas, soltar fibras ou ser mais abrasivos do que o material indicado. Prefira um pano limpo, macio e sem fiapos aprovado pelo fabricante.']
    ],
    body: `
      <p><strong>Resposta direta:</strong> desligue e desconecte o monitor, remova a poeira com um pano macio e sem fiapos e use líquido somente se o manual do modelo permitir. Umedeça o pano de forma leve; nunca borrife diretamente na tela, nunca deixe líquido alcançar as bordas e não pressione o painel.</p>

      <h2>Por que o manual vem antes do produto de limpeza</h2>
      <p>A superfície visível pode ser vidro, plástico, polarizador ou um revestimento fosco, antirreflexo, brilhante ou texturizado. Dois aparelhos parecidos podem aceitar métodos diferentes. Uma solução usada em janelas ou em outro monitor pode deixar resíduo, alterar um revestimento ou penetrar pelas bordas.</p>
      <p>Procure no site oficial a seção de limpeza do modelo exato. Se o manual indicar apenas pano seco, pare aí. Se autorizar água ou outra solução, respeite composição, concentração e aplicação descritas. Não misture produtos nem transfira líquidos para frascos sem identificação.</p>

      <h2>Materiais e preparação</h2>
      <ul>
        <li>Pano macio, limpo, sem fiapos e sem costuras rígidas na área de contato.</li>
        <li>Segundo pano seco, se o fabricante permitir uma etapa úmida.</li>
        <li>Solução expressamente autorizada no manual, mantida em recipiente identificado.</li>
        <li>Superfície estável, mãos limpas e luz ambiente suficiente para enxergar resíduos.</li>
      </ul>
      <p>Retire anéis ou objetos que possam tocar a tela. Desligue o aparelho, desconecte energia e cabos e espere a superfície esfriar. Em notebook, desligue o computador, retire a alimentação e apoie a tampa sem forçar a dobradiça.</p>

      <h2>Procedimento passo a passo</h2>
      <ol>
        <li><strong>Examine antes de tocar.</strong> Identifique poeira solta, impressão, respingo e possível dano. Não tente limpar trinca, líquido interno, delaminação ou uma área quente.</li>
        <li><strong>Dobre o pano.</strong> Crie uma face limpa e plana. Uma partícula presa pode riscar se for arrastada repetidamente.</li>
        <li><strong>Remova poeira com leveza.</strong> Passe o pano sem força, usando trajetos curtos. Levante-o e troque de face se houver partículas visíveis.</li>
        <li><strong>Trate marcas somente se permitido.</strong> Coloque pequena quantidade da solução autorizada no pano, longe do monitor. Ele deve ficar levemente úmido, sem gotejar.</li>
        <li><strong>Limpe a área.</strong> Passe com pressão mínima e evite insistir em um ponto. Mantenha umidade longe de moldura, câmera, alto-falantes, botões e aberturas.</li>
        <li><strong>Finalize.</strong> Use uma parte seca do pano se o manual orientar. Espere a superfície secar por completo antes de reconectar e ligar.</li>
      </ol>

      <h2>Como conferir o resultado</h2>
      <p>Observe primeiro com a tela desligada sob luz difusa. Depois ligue e use fundos branco, cinza e preto para distinguir resíduo superficial de algo que aparece na imagem. Se a marca mudou com a iluminação do cômodo, pode ser reflexo ou resíduo; se aparece apenas com o painel ligado, interrompa a limpeza e registre o comportamento.</p>
      <p>Use o fundo apenas para inspeção visual. Ele não identifica composição química, não revela dano abaixo da superfície e não indica qual produto deve ser aplicado. Se a marca reaparece depois de secar, consulte o manual antes de repetir.</p>

      <h2>Identifique o acabamento antes de separar os materiais</h2>
      <p>Procure o modelo na etiqueta e abra o manual oficial. Uma tela fosca pode ter uma camada externa flexível; outra pode usar vidro brilhante; alguns equipamentos têm acabamento nanotexturizado ou tratamento sensível a produtos comuns. A aparência sozinha não confirma a composição. Se o documento não disser o que pode ser usado, comece e termine com o método seco indicado.</p>
      <p>Veja também se existe uma película de transporte claramente marcada por aba ou instrução. Não confunda borda levantada, polarizador ou revestimento funcional com plástico removível. Quando houver dúvida, fotografe sem puxar e consulte o suporte do modelo.</p>

      <h2>Prepare uma área que não devolva poeira à tela</h2>
      <p>Limpe as mãos, afaste copos e desligue ventilador direcionado ao monitor. Estenda o pano sobre uma superfície limpa apenas enquanto organiza o material; não o deixe sobre teclado, piso ou bancada com migalhas. Um pano recém-lavado também pode conter amaciante, fiapos ou resíduos. Se houver cheiro, rigidez ou partículas, escolha outro.</p>
      <p>Use faces diferentes para poeira e etapa úmida. Dobre o pano de modo que os dedos não ultrapassem sua área e troque de face quando ela recolher material. Se mais de uma tela será limpa, não carregue gordura de uma superfície para outra. Em ambiente compartilhado, separe panos identificados e mantenha qualquer solução autorizada no recipiente original.</p>

      <h2>A primeira passagem deve ser seca e curta</h2>
      <p>Com a tela fria e sem energia, incline a luz do cômodo para enxergar as partículas. Encoste o pano sem pressionar e faça trajetos curtos, levantando-o entre regiões. Não empurre toda a poeira até a borda inferior, onde há junções e aberturas. Se uma partícula parece presa, pare de arrastá-la; insistência transforma um grão pequeno em risco comprido.</p>
      <p>Depois da passagem, observe de outro ângulo. Muitas impressões ficam mais claras quando a poeira ao redor sai. Isso não significa que você deva aumentar a força. A etapa seguinte só existe se o fabricante autorizar alguma umidade e se a marca superficial justificar nova tentativa.</p>

      <h2>Controle a umidade pelo pano, não pela tela</h2>
      <p>Aplique uma quantidade pequena da solução permitida longe do equipamento. O pano deve ficar úmido ao toque e não soltar gota quando dobrado. Use movimentos leves sobre a marca e pare antes de alcançar moldura, microfone, câmera, alto-falante ou botão. Em monitor com orientação vertical, lembre que uma gota pode correr em direção diferente da posição original de fábrica.</p>
      <p>Não faça misturas caseiras nem suponha que uma porcentagem citada para outro dispositivo vale para o seu. A Microsoft publica orientações próprias para a família Surface; a Apple e a LG também descrevem métodos e restrições de seus produtos. Essas páginas demonstram justamente por que o nome genérico “limpa-telas” não substitui o manual.</p>

      <h2>Trate cada tipo de marca como uma pergunta</h2>
      <table>
        <thead><tr><th scope="col">Aparência superficial</th><th scope="col">Conduta conservadora</th><th scope="col">Ponto de parada</th></tr></thead>
        <tbody>
          <tr><td>Poeira solta</td><td>Pano seco, macio e sem fiapos</td><td>Partícula que não sai com passagem leve</td></tr>
          <tr><td>Impressão digital</td><td>Etapa úmida somente se autorizada</td><td>Marca permanece após poucas passagens</td></tr>
          <tr><td>Respingo seco desconhecido</td><td>Consultar manual antes de dissolver</td><td>Exige raspar, solvente ou pressão</td></tr>
          <tr><td>Adesivo, tinta ou resíduo químico</td><td>Acionar fabricante ou assistência</td><td>Qualquer tentativa não prevista</td></tr>
          <tr><td>Trinca ou camada alterada</td><td>Não limpar a região</td><td>Desligar e documentar</td></tr>
        </tbody>
      </table>

      <h2>Corrija faixas sem reiniciar todo o processo</h2>
      <p>Se a superfície secar com linhas, espere a evaporação completa antes de avaliar. Sob luz difusa, passe uma face seca e limpa apenas se o manual permitir. Não adicione mais produto de imediato: excesso costuma redistribuir resíduo e alcançar as bordas. Mude o ângulo de observação para distinguir faixa de limpeza de reflexo.</p>
      <p>Uma mancha que só aparece com a tela ligada pode pertencer à imagem ou ao painel. Abra fundos diferentes e o menu interno; limpeza adicional não resolve uma alteração eletrônica. Se a marca mudou de cor, o revestimento ficou opaco ou apareceu um arco semelhante a pressão, desligue e registre o ocorrido.</p>

      <h2>Crie uma rotina que evite limpezas agressivas</h2>
      <p>Manter comida e bebida afastadas, remover poeira leve antes que se acumule e não tocar na área visível reduz a necessidade de etapas úmidas. Cubra o monitor somente com acessório aprovado e quando estiver frio; capas improvisadas podem reter umidade ou pressionar a tela. Em notebook, mantenha teclado e apoio de mãos limpos antes de fechar a tampa.</p>
      <p>Não estabeleça uma frequência rígida sem necessidade. Limpe quando houver sujeira observável, usando o procedimento mais leve que resolva. Registre o produto e o método em equipamentos compartilhados para que a próxima pessoa não combine soluções incompatíveis.</p>

      <h2>Erros comuns</h2>
      <ul>
        <li>Borrifar sobre a tela, permitindo que gotas escorram para a moldura.</li>
        <li>Usar limpa-vidros, amônia, acetona, abrasivos ou álcool sem autorização específica.</li>
        <li>Limpar com o aparelho ligado e quente, quando marcas podem secar de modo desigual.</li>
        <li>Usar papel, roupa, esponja ou pano que já contém areia, gordura ou amaciante.</li>
        <li>Pressionar uma mancha para “soltá-la” ou raspar com unha e cartão.</li>
      </ul>

      <h2>Quando parar</h2>
      <p>Pare se ouvir estalos, perceber flexão, notar líquido nas bordas, ver alteração do revestimento ou encontrar uma película sem indicação clara de remoção. Não desmonte a moldura e não tente secar internamente com calor. Registre fotos sem dados pessoais e consulte o fabricante ou uma assistência autorizada.</p>
      <p>Este procedimento cobre sujeira superficial em condições normais. Ele não remove riscos, marcas de pressão, falhas internas, burn-in ou danos químicos já ocorridos. Se duas passagens leves conforme o manual não resolverem, insistir aumenta o risco sem esclarecer a causa.</p>
    `
  },
  {
    slug: 'guia-limpeza-lcd-oled-notebook',
    title: 'Limpeza de LCD, OLED e notebooks: o que muda na construção',
    h1: 'Como adaptar a limpeza ao tipo de tela e acabamento',
    description: 'Compare cuidados para monitores foscos, OLED brilhante, notebooks, telas sensíveis ao toque e vidro nanotexturizado antes de escolher o método.',
    toolId: 'cleaner',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    sources: [
      {
        label: 'Apple — Cleaning the nano-texture glass on your Apple display',
        url: 'https://support.apple.com/en-us/104948',
        note: 'Demonstra que superfícies nanotexturizadas exigem pano e procedimento específicos do fabricante.'
      },
      {
        label: 'Microsoft — Clean and care for your Surface',
        url: 'https://support.microsoft.com/en-us/surface/setup/clean-and-care-for-your-surface',
        note: 'Traz limites de solução e cuidados próprios para telas e dispositivos Surface compatíveis.'
      },
      {
        label: 'LG — How to clean an OLED screen',
        url: 'https://www.lg.com/us/support/help-library/lg-oled-tv-how-to-clean-the-screen--20154713242110',
        note: 'Orienta desligamento, pano macio, pouca força e ausência de aplicação direta de líquidos em OLED.'
      },
      {
        label: 'Apple — How to clean your Apple products',
        url: 'https://support.apple.com/en-us/103258',
        note: 'Explica cuidados gerais com materiais distintos, como desconectar cabos, evitar abrasivos e nunca borrifar produto diretamente na tela.'
      }
    ],
    relatedSlugs: ['como-limpar-monitor-sem-danificar', 'manchas-no-monitor-causas', 'como-testar-monitor-oled'],
    faq: [
      ['A tecnologia LCD ou OLED define sozinha a limpeza?', 'Não. O acabamento externo e as instruções do modelo são decisivos. Um OLED brilhante, um LCD fosco e uma tela com vidro especial podem exigir materiais diferentes.'],
      ['Telas de notebook exigem cuidado adicional?', 'Sim. A tampa fina pode flexionar e as bordas abrigam câmera, microfones e juntas. Apoie a tampa, use pressão mínima e mantenha umidade longe das aberturas.'],
      ['Posso colocar uma manta entre teclado e tela?', 'Somente se o fabricante aprovar. Material adicional pode aumentar a pressão quando o notebook é fechado; primeiro mantenha o teclado limpo e siga as orientações de transporte.']
    ],
    body: `
      <p><strong>Resposta direta:</strong> a sigla LCD ou OLED não basta; escolha o método pela construção externa e pelo manual. Acabamento fosco, vidro brilhante, camada sensível ao toque e vidro nanotexturizado reagem de modos diferentes. Quando as instruções divergirem, vale a orientação do fabricante para o modelo exato.</p>

      <h2>Matriz por construção</h2>
      <table>
        <thead><tr><th scope="col">Construção aparente</th><th scope="col">Cuidado principal</th><th scope="col">O que confirmar no manual</th></tr></thead>
        <tbody>
          <tr><td>Monitor fosco sem vidro frontal</td><td>Pressão mínima sobre o painel flexível</td><td>Tipo de pano e se alguma umidade é permitida</td></tr>
          <tr><td>OLED ou LCD com vidro brilhante</td><td>Evitar manchas, abrasão e líquido nas bordas</td><td>Produto aceito para o revestimento</td></tr>
          <tr><td>Notebook com tampa fina</td><td>Apoiar a tampa e proteger câmera e juntas</td><td>Forma de desligar e áreas que não devem receber umidade</td></tr>
          <tr><td>Tela sensível ao toque</td><td>Remover óleo sem solvente incompatível</td><td>Concentração e frequência autorizadas</td></tr>
          <tr><td>Vidro nanotexturizado ou acabamento especial</td><td>Usar o pano específico indicado</td><td>Procedimento para manchas persistentes</td></tr>
        </tbody>
      </table>

      <h2>Monitor fosco de mesa</h2>
      <p>A camada externa pode ser fina e levemente flexível. Desligue, desconecte e remova poeira com pano macio sem fiapos. Apoie a moldura apenas para estabilizar o equipamento, sem apertar a área visível. Se o manual permitir um pano úmido, umedeça longe da tela e evite que líquido alcance a borda inferior.</p>
      <p>Não tente “polir” uma região até obter brilho uniforme. Fricção localizada pode mudar a aparência de um revestimento fosco e transformar uma pequena marca em uma área maior.</p>

      <h2>Vidro brilhante e OLED</h2>
      <p>Uma superfície brilhante evidencia impressões e também reflexos do ambiente. Isso não autoriza o uso de limpa-vidros. Siga o fabricante, aplique a solução permitida somente no pano e faça passagens leves. Com a tela desligada, reflexos ajudam a localizar resíduo; com ela ligada, fundos sólidos ajudam a separar sujeira de um achado na imagem.</p>
      <p>A tecnologia emissiva está atrás da superfície. A limpeza externa não corrige retenção, linhas, pontos ou diferenças de uniformidade. Não execute Pixel Cleaning como etapa de higiene; essa é uma rotina eletrônica separada, usada apenas conforme o manual.</p>

      <h2>Notebook e tela sensível ao toque</h2>
      <p>Desligue o notebook, desconecte a fonte e apoie a parte traseira da tampa durante movimentos leves. Não segure a tela por um canto e não permita umidade perto da câmera, microfones, dobradiças ou moldura inferior. Marcas que repetem o formato do teclado podem envolver contato durante o transporte; não pressione a tampa tentando removê-las.</p>
      <p>Em telas de toque, impressões são frequentes, mas soluções aceitas variam. A Microsoft, por exemplo, publica limites próprios para dispositivos Surface compatíveis. Esses limites não devem ser copiados para outra marca ou para todo monitor.</p>

      <h2>Vidro nanotexturizado e materiais dedicados</h2>
      <p>Superfícies especiais ilustram por que uma regra universal falha. A Apple orienta usar o pano fornecido para certos vidros nanotexturizados e reserva uma solução específica para manchas difíceis. Antes de substituir esse pano ou produto, consulte a instrução atual do modelo.</p>

      <h2>Roteiro comum a todas as categorias</h2>
      <ol>
        <li>Identifique modelo, acabamento e seção de limpeza no site oficial.</li>
        <li>Desligue, desconecte e espere a tela esfriar.</li>
        <li>Examine a superfície para não arrastar partículas.</li>
        <li>Use uma face limpa do pano e pressão mínima.</li>
        <li>Se autorizado, umedeça o pano fora do equipamento; nunca borrife diretamente.</li>
        <li>Espere secar, ligue e confira em branco, cinza e preto.</li>
      </ol>

      <h2>Use uma árvore de decisão antes de tocar na tela</h2>
      <ol>
        <li><strong>Há trinca, líquido interno ou camada levantada?</strong> Não limpe a área; desligue e procure orientação técnica.</li>
        <li><strong>O manual identifica o acabamento e o pano?</strong> Separe exatamente esse material. Se não identifica, não improvise química.</li>
        <li><strong>A marca é poeira solta?</strong> Comece por uma passagem seca, leve e curta.</li>
        <li><strong>Permaneceu uma impressão ou respingo?</strong> Faça etapa úmida somente quando o documento autorizar.</li>
        <li><strong>Algo ainda aparece após secar?</strong> Compare desligado, ligado e sob outro ângulo antes de repetir.</li>
      </ol>
      <p>A árvore evita usar o método mais forte como primeira tentativa. Ela também revela quando “sujeira” pode ser risco, alteração de revestimento ou achado na própria imagem. Nesses casos, mais fricção piora a evidência e pode ampliar o dano.</p>

      <h2>LCD fosco pede atenção à flexão</h2>
      <p>Em monitores sem vidro frontal aparente, a superfície pode ceder mesmo sob uma força que parece pequena. Estabilize a base, passe o pano com a mão aberta e não apoie o polegar na moldura para aumentar pressão. Se uma mancha exige insistência em um ponto, pare e confirme o método oficial.</p>
      <p>Faixas brilhantes que surgem somente depois de esfregar podem indicar resíduo ou mudança na maneira como o revestimento reflete a luz. Espere secar, observe de vários ângulos e use uma face limpa e seca somente se permitido. Não tente igualar o brilho “polindo” o restante da tela.</p>

      <h2>Vidro brilhante não significa vidro de janela</h2>
      <p>Uma frente rígida e reflexiva ainda pode conter camadas antirreflexo ou oleofóbicas. Produtos domésticos para janela não ganham compatibilidade pela aparência do material. A Apple, por exemplo, proíbe diversos limpadores e orienta nunca borrifar diretamente em seus displays. LG e Microsoft publicam instruções próprias para outros conjuntos.</p>
      <p>Em superfícies brilhantes, confira o resultado com luz difusa, pois uma lâmpada pontual pode fazer qualquer faixa parecer intensa. Depois ligue a tela e use conteúdo claro e escuro. Se a marca existe apenas na imagem, encerre a limpeza e passe para uma triagem de sinal ou painel.</p>

      <h2>Touchscreen acumula contato, mas mantém limites</h2>
      <p>Óleo dos dedos costuma exigir mais atenção do que poeira, porém o toque repetido não autoriza solvente mais forte. Desative ou desligue o equipamento para evitar comandos durante a limpeza e proteja portas, câmera e microfones. Se o aparelho aceita caneta, retire-a da área de trabalho para que ponta ou presilha não arranhe a superfície.</p>
      <p>Uma tela usada em balcão pode precisar de higienização por regras do local. Nesse caso, concilie o procedimento institucional com a lista de produtos autorizados pelo fabricante. Quando houver conflito, a equipe responsável pelo equipamento deve obter orientação formal; não combine substâncias nem aumente concentração.</p>

      <h2>O pano dedicado também precisa de cuidado</h2>
      <p>No vidro nanotexturizado, o pano indicado faz parte do procedimento. Guarde-o em recipiente limpo, sem contato com chaves, papel ou superfícies oleosas. Siga a orientação oficial para lavá-lo e espere secar por completo antes de usar. Um pano dedicado contaminado deixa de ser uma opção segura apenas por conservar o mesmo nome.</p>
      <p>Não substitua o material por uma esponja “extra macia” ou tecido de roupa. Costuras, fibras duras e partículas presas podem alterar a superfície. Se o pano específico foi perdido, consulte o fabricante sobre reposição compatível.</p>

      <h2>Notebook acrescenta pressão e transporte</h2>
      <p>Ao limpar, apoie a tampa pela parte traseira e evite empurrá-la além do ângulo normal. Ao transportar, nada deve ficar entre teclado e tela sem aprovação do fabricante. Protetores grossos, tampas de câmera, papéis e cabos esquecidos podem concentrar pressão quando o notebook fecha.</p>
      <p>Marcas que repetem teclas ou o contorno do trackpad devem ser documentadas antes da limpeza. Remova primeiro a sujeira das áreas de contato, depois trate a tela pelo manual. Se a marca não muda e parece abaixo da superfície, não tente compensar com força.</p>

      <h2>Faça a conferência final em três condições</h2>
      <table>
        <thead><tr><th scope="col">Condição</th><th scope="col">O que observar</th><th scope="col">Próxima ação</th></tr></thead>
        <tbody>
          <tr><td>Desligada, luz difusa</td><td>Fiapos, faixas, riscos e reflexos</td><td>Passagem seca permitida ou encerramento</td></tr>
          <tr><td>Ligada, fundo claro</td><td>Resíduo superficial e pontos escuros</td><td>Separar limpeza de anomalia de imagem</td></tr>
          <tr><td>Ligada, fundo escuro</td><td>Reflexos, áreas claras e marcas persistentes</td><td>Registrar sem aumentar exposição</td></tr>
        </tbody>
      </table>
      <p>Se a tela ficou uniforme e seca, reconecte os cabos e retorne ao uso. Se apareceu opacidade, cor diferente, líquido na borda ou resposta irregular ao toque, desligue e documente. Repetir o ciclo não esclarece uma alteração material.</p>

      <h2>Erros comuns e limites</h2>
      <ul>
        <li>Escolher o produto apenas porque a embalagem diz “para telas”.</li>
        <li>Usar a mesma solução em monitor, TV, celular e notebook sem consultar cada manual.</li>
        <li>Retirar uma película sem aba ou instrução que confirme ser proteção de transporte.</li>
        <li>Fechar o notebook com pano grosso, protetor ou objeto que aumente a pressão interna.</li>
      </ul>
      <p>A matriz orienta quais perguntas fazer; ela não substitui o manual. Se houver trinca, líquido interno, delaminação, alteração de revestimento ou marca que não muda após uma limpeza leve autorizada, interrompa o procedimento e procure suporte.</p>
    `
  },
  {
    slug: 'manchas-no-monitor-causas',
    title: 'Manchas na tela: roteiro de observação antes da assistência',
    h1: 'Como observar manchas na tela sem presumir a causa',
    description: 'Separe superfície, reflexo, fonte de vídeo e comportamento do painel com uma triagem visual organizada antes de procurar suporte.',
    toolId: 'cleaner',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-11',
    sources: [
      {
        label: 'LG — Lines or stains on an OLED screen',
        url: 'https://www.lg.com/us/support/help-library/lg-oled-tv-i-see-vertical-lines-or-stains-on-my-screen--20154629490729',
        note: 'Orienta usar o teste de imagem interno para distinguir a tela de uma fonte ou sinal externo.'
      },
      {
        label: 'Dell — Troubleshooting light leakage or bleeding on an LCD display',
        url: 'https://www.dell.com/support/kbdoc/en-us/000132299/troubleshooting-light-leakage-bleeding-on-a-lcd-monitor-or-notebook-lcd-screen',
        note: 'Mostra como ambiente, brilho, ângulo e exposição influenciam áreas claras aparentes em LCD.'
      },
      {
        label: 'LG — Should I remove the protective film from my monitor?',
        url: 'https://www.lg.com/us/support/help-library/should-i-remove-the-protective-film-from-my-lg-monitor-CT10000030-20155143214666',
        note: 'Distingue película de transporte identificada de camadas funcionais que não devem ser removidas.'
      },
      {
        label: 'Dell — How to run a diagnostic test on a Dell monitor',
        url: 'https://www.dell.com/support/kbdoc/en-us/000124390/how-to-run-diagnostic-test-on-a-dell-monitor',
        note: 'Mostra como o autoteste integrado ajuda a separar manchas e linhas da tela de problemas no computador, na placa gráfica ou no sinal.'
      }
    ],
    relatedSlugs: ['como-limpar-monitor-sem-danificar', 'guia-limpeza-lcd-oled-notebook', 'o-que-sao-dead-pixels'],
    faq: [
      ['Uma mancha escura significa pressão ou dano interno?', 'Não necessariamente. Resíduo, reflexo, conteúdo, sinal e diferentes condições do painel podem ter aparência semelhante. Registre o comportamento antes de atribuir uma causa.'],
      ['Como separar a fonte de vídeo da tela?', 'Veja se a marca aparece no menu ou no autoteste documentado. Compare outra entrada e faça uma captura de tela; cada passo reduz possibilidades, mas não determina sozinho o componente afetado.'],
      ['Devo retirar uma película visível?', 'Apenas quando o fabricante identifica claramente uma película de transporte removível, geralmente com aba ou instrução. Não puxe uma camada sem confirmação, pois ela pode fazer parte do painel.']
    ],
    body: `
      <p><strong>Resposta direta:</strong> uma mancha pode estar na superfície, ser um reflexo, vir do conteúdo ou sinal, ou aparecer no próprio conjunto da tela. Comece pelo teste menos invasivo: observe desligado, limpe somente se o manual permitir, compare fontes e use o autoteste do aparelho. A triagem organiza evidências; não fecha um diagnóstico.</p>

      <h2>Interrompa o uso quando houver risco evidente</h2>
      <p>Desligue e desconecte se houver trinca recente, líquido escorrendo para a moldura, cheiro anormal, aquecimento localizado, estalos ou deformação. Não pressione a área, não use secador e não desmonte. Siga o canal de segurança e assistência indicado pelo fabricante.</p>

      <h2>Triagem em cinco etapas</h2>
      <ol>
        <li><strong>Observe com a tela desligada.</strong> Use luz difusa e depois mude o ângulo. Uma marca que acompanha o reflexo ou fica evidente na superfície pode ser resíduo, risco ou alteração de revestimento. Não raspe nem puxe películas.</li>
        <li><strong>Faça apenas a limpeza autorizada.</strong> Consulte o manual, use pano macio sem fiapos e evite aplicação direta de líquido. Se duas passagens leves não mudarem a marca, pare.</li>
        <li><strong>Compare padrões simples.</strong> Com o monitor no brilho habitual, exiba branco, cinza, preto, vermelho, verde e azul. Anote em quais fundos a região aparece e se muda de cor ou contraste.</li>
        <li><strong>Separe conteúdo e entrada.</strong> Abra o mesmo padrão em outro navegador ou dispositivo e, quando possível, teste outro cabo e outra porta. Faça também uma captura de tela pelo sistema.</li>
        <li><strong>Use o teste interno.</strong> Se o menu oferece autoteste ou teste de imagem documentado, execute-o. Uma marca presente no menu ou autoteste independe do arquivo e da fonte externa, mas ainda pode ter mais de uma origem física.</li>
      </ol>

      <h2>Use uma árvore de decisão, não um catálogo de defeitos</h2>
      <p><strong>A marca também aparece com a tela desligada?</strong> Observe sob luz difusa e mude a posição da cabeça. Resíduo, risco, reflexo e alteração do revestimento entram nesse ramo. Se o manual autorizar uma limpeza leve, faça-a uma vez; uma marca que permanece não deve ser polida, raspada nem pressionada.</p>
      <p><strong>Ela aparece no arquivo de captura quando esse arquivo é aberto em outra tela?</strong> Nesse caso, comece pelo conteúdo, aplicativo, sistema ou processamento anterior à saída. Se o arquivo estiver limpo, o caminho ainda inclui porta, cabo, entrada, eletrônica do monitor e superfície. A captura separa etapas; não aponta sozinha uma peça.</p>
      <p><strong>Ela surge apenas com uma fonte, porta ou cabo?</strong> Refaça a combinação com componentes conhecidos e configurações compatíveis. Uma faixa que some ao trocar o HDMI merece investigação da cadeia de sinal antes de ser atribuída ao painel.</p>
      <p><strong>Ela permanece sobre o menu do monitor ou no teste interno previsto no manual?</strong> O computador e o arquivo deixam de ser a origem daquela imagem, então o relato deve seguir para o suporte do aparelho. Ainda assim, o resultado não distingue camada, conexão interna ou componente.</p>
      <p><strong>Ela muda bastante com ângulo, distância ou iluminação?</strong> Volte à posição de uso, bloqueie uma fonte de luz por vez e repita a observação. Reflexo e comportamento angular podem parecer uma mancha fixa em uma única fotografia.</p>

      <h2>Cinco cenas reais e a próxima comparação útil</h2>
      <table>
        <thead><tr><th scope="col">O que você encontra</th><th scope="col">Próximo movimento</th><th scope="col">O que ainda não dá para afirmar</th></tr></thead>
        <tbody>
          <tr><td>Oval acinzentado visível no branco e também com a tela apagada</td><td>Examinar a superfície de lado e consultar a limpeza permitida</td><td>Se é resíduo, risco ou camada alterada</td></tr>
          <tr><td>Faixa vertical presente somente no notebook conectado por um cabo</td><td>Trocar cabo e entrada, mantendo resolução e conteúdo</td><td>Se a origem está no computador, na conexão ou no monitor</td></tr>
          <tr><td>Nuvem clara no canto, forte no escuro e discreta de frente</td><td>Comparar brilho habitual, posição e luz do cômodo</td><td>Se há anormalidade de montagem ou efeito óptico esperado</td></tr>
          <tr><td>Contorno de uma barra depois de trocar o conteúdo em OLED</td><td>Usar conteúdo variado e seguir a rotina oficial do modelo</td><td>Se é retenção passageira ou alteração persistente</td></tr>
          <tr><td>Marca nova após transporte, ao lado de uma trinca na moldura</td><td>Parar a limpeza e documentar embalagem e estado externo</td><td>Qual evento produziu a alteração interna</td></tr>
        </tbody>
      </table>
      <p>Formato e cor escolhem a próxima comparação, não o diagnóstico. Causas diferentes podem produzir desenhos parecidos, e a mesma região pode mudar de aparência conforme o fundo.</p>

      <h2>Película, condensação e pressão pedem freio</h2>
      <p>Alguns produtos chegam com película de transporte identificada por aba ou impressão; outros deixam exposto um polarizador ou revestimento funcional. Uma bolha ou borda levantada não autoriza puxar a camada. Confirme a documentação do modelo e, se ela não for conclusiva, envie uma foto ao suporte.</p>
      <p>Um aparelho que saiu de ambiente frio para um cômodo quente pode condensar umidade. Mantenha-o desligado e cumpra as condições do manual, sem secador ou aquecimento improvisado. Depois de transporte, fotografe embalagem, carcaça e superfície antes de limpar. Trinca, líquido interno ou área pressionada não deve receber fricção para “ver se volta”.</p>

      <h2>Transforme o achado em um relato de uma página</h2>
      <p>Comece pelo observável: “Área acinzentada, oval, no terço inferior, visível em branco e cinza, discreta em vídeo e também perceptível com a tela desligada”. Essa frase é mais útil do que “LCD queimado” porque continua correta mesmo que a assistência use outro nome. Acrescente modelo, data, circunstância em que surgiu e qualquer transporte, impacto, limpeza, atualização ou troca de cabo recente, sem tratar proximidade temporal como prova da causa.</p>
      <p>Na mesma página, registre brilho, modo de imagem, HDR, entrada e fonte; depois liste o resultado de cada ramo relevante da árvore. Anexe uma foto da tela inteira e outra da região, ambas sem filtro. Guarde o arquivo original e marque a posição somente em uma cópia. Não publique etiqueta, nota fiscal ou dados pessoais.</p>
      <p>Use proporções simples para localizar a área, como “terço inferior, próximo à borda direita”. Uma régua encostada no painel pode riscá-lo, e milímetros inferidos de uma foto passam uma precisão que a imagem não tem. Se a câmera, distância ou iluminação mudou entre arquivos, anote a mudança em vez de comparar as imagens como se fossem equivalentes.</p>

      <h2>Repita somente quando a repetição responde algo</h2>
      <p>Uma segunda observação faz sentido quando o primeiro resultado foi inconclusivo, quando o suporte pede condições específicas ou quando você precisa saber se a aparência mudou com o uso normal. Preserve a ficha inicial, repita com posição e configuração comparáveis e registre o intervalo. Não deixe padrões estáticos abertos por horas para “forçar” uma diferença, sobretudo em tela emissiva.</p>
      <p>Se a área cresce, aparece junto com lampejos ou perda de sinal, ou passa a incomodar no conteúdo cotidiano, procure o suporte com os dois registros. Se só surge sob brilho extremo, quarto escuro e fotografia superexposta, descreva exatamente essa condição. O impacto pode ser pequeno sem que a observação seja falsa; também pode ser grande sem que uma fotografia automática consiga mostrá-lo.</p>
      <p>Quando uma redefinição, atualização ou rotina do fabricante for solicitada, fotografe antes as configurações relevantes. A ação pode mudar o sintoma e apagar parte do contexto. Depois dela, registre o que mudou e o que permaneceu, sem reescrever a primeira ficha.</p>

      <h2>Quando a fotografia conta uma história diferente do olho</h2>
      <p>Em uma cena escura, o telefone costuma elevar automaticamente a exposição e transformar uma diferença discreta em uma nuvem luminosa. Em fundo branco, reflexos e foco impreciso podem suavizar a mesma área. Faça primeiro uma foto da distância de uso, com parte da moldura visível, e só depois aproxime para localizar a região. Apoie o aparelho, mantenha a lente paralela à tela e evite modo noturno, filtros ou edição.</p>
      <p>Se souber travar foco e exposição, use a mesma configuração na comparação; se não souber, não esconda isso. Escreva ao lado do arquivo “mais forte na foto”, “mais discreta na foto” ou “semelhante ao observado”. Uma imagem que não reproduz perfeitamente a percepção ainda pode mostrar posição e formato. Envie o original ao suporte e deixe qualquer seta ou círculo em uma cópia separada.</p>
      <p>Uma segunda pessoa pode observar da mesma cadeira sem ouvir antes o diagnóstico sugerido. Peça que descreva apenas o que vê e em qual fundo. Concordância ajuda a comunicar o efeito; discordância indica que ângulo, acuidade ou iluminação merecem constar no relato. Nenhum dos dois resultados converte percepção em medição instrumental.</p>

      <h2>Erros comuns e limites</h2>
      <ul>
        <li>Dar nome técnico à mancha somente pela cor ou pelo formato.</li>
        <li>Pressionar a tela, usar calor ou aplicar produto para observar se a região muda.</li>
        <li>Comparar fotos com brilho e exposição diferentes.</li>
        <li>Ignorar o autoteste e a possibilidade de cabo, fonte ou conteúdo.</li>
      </ul>
      <p>A página permite comparar aparências e produzir um registro. Ela não identifica uma camada interna, não decide se há reparo e não estima custo. Entregue ao suporte o histórico, as condições do teste e os arquivos originais; uma descrição precisa evita que a triagem visual seja apresentada como diagnóstico.</p>
    `
  }
];
