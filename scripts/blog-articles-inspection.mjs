export default [
  {
    slug: 'backlight-bleed-como-testar',
    title: 'Backlight bleed: protocolo de inspeção visual em monitores LCD',
    h1: 'Como inspecionar backlight bleed em um monitor LCD',
    description: 'Use um protocolo controlado para comparar áreas claras em cenas escuras, registrar as condições e levar evidências úteis ao suporte.',
    toolId: 'black',
    publishedAt: '2026-08-10',
    updatedAt: '2026-09-09',
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
    updatedAt: '2026-09-09',
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
    updatedAt: '2026-09-09',
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
    updatedAt: '2026-09-09',
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
    updatedAt: '2026-09-09',
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
    updatedAt: '2026-09-09',
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
      <p>Peça um vídeo contínuo que mostre o modelo, a conexão, o menu normal e a mudança entre padrões, mas lembre que compressão e exposição escondem ou acentuam detalhes. Prefira pagamentos e conversas dentro dos canais oficiais da plataforma. Não envie credenciais, códigos de verificação ou documentos além do necessário ao processo legítimo.</p>
      <p>Direitos de devolução, garantia e intermediação variam com a relação de consumo, o tipo de vendedor, a modalidade e a jurisdição. Consulte os termos atuais da plataforma e os canais oficiais de defesa do consumidor. Guarde comprovante, anúncio, mensagens e gravações autorizadas.</p>

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
    updatedAt: '2026-09-09',
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
    updatedAt: '2026-09-09',
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

      <h2>Documentos a reunir</h2>
      <ul>
        <li><strong>Identificação do produto:</strong> modelo completo, etiqueta e número de série. Guarde dados identificadores em local privado.</li>
        <li><strong>Prova da compra:</strong> nota fiscal, pedido, recibo e data de entrega, conforme os documentos disponíveis.</li>
        <li><strong>Termos aplicáveis:</strong> certificado de garantia, página oficial da política, termos do vendedor e versão do anúncio.</li>
        <li><strong>Registro do sintoma:</strong> ficha com posição, fundos em que aparece, configurações e data da inspeção.</li>
        <li><strong>Histórico:</strong> protocolos, e-mails, ordens de serviço, respostas e comprovantes de envio ou entrega.</li>
      </ul>
      <p>Salve a página oficial em PDF ou captura com URL e data para preservar o contexto consultado. Isso não congela os termos nem substitui o documento contratual, mas facilita mostrar qual informação estava publicada.</p>

      <h2>Procedimento de evidência</h2>
      <ol>
        <li>Limpe a superfície pelo método do manual e confirme a resolução nativa.</li>
        <li>Exiba branco, preto, vermelho, verde e azul em tela cheia no brilho habitual.</li>
        <li>Anote cada ponto separadamente, com posição e cor em que fica mais evidente.</li>
        <li>Faça uma foto geral da tela e outra da região, sem encostar, editar contraste ou usar filtros.</li>
        <li>Se houver autoteste documentado, registre o resultado. Não entre em menu de serviço nem aplique pressão.</li>
        <li>Repita uma vez para verificar se o achado é estável e descreva também o impacto em conteúdo normal.</li>
      </ol>

      <h2>Como abrir o chamado</h2>
      <p>Use o canal oficial do fabricante ou vendedor e escreva de forma factual: modelo, data da compra, quando o ponto foi percebido, posição, fundos em que aparece e verificações realizadas. Anexe apenas os documentos solicitados e oculte dados desnecessários. Peça o número do protocolo, os próximos passos, custos previstos e a política específica usada na decisão.</p>
      <p>Se for necessário enviar o produto, fotografe o estado externo, acessórios e embalagem. Siga exatamente a orientação de transporte fornecida. Guarde comprovantes e não inclua senhas, mídias ou cabos não solicitados.</p>

      <h2>Se a primeira resposta for negativa</h2>
      <ol>
        <li>Peça a regra aplicável ao modelo e a justificativa por escrito.</li>
        <li>Confira se o suporte classificou corretamente ponto claro, escuro, subpixel e agrupamento.</li>
        <li>Corrija evidências incompletas e solicite reanálise pelo canal indicado.</li>
        <li>Quando houver relação de consumo, consulte os canais oficiais de defesa do consumidor da sua jurisdição.</li>
      </ol>
      <p>No Brasil, direitos legais e garantia contratual têm bases próprias, e sua aplicação depende dos fatos e da relação estabelecida. O texto do Código de Defesa do Consumidor e os órgãos oficiais oferecem a referência adequada; este artigo não determina o enquadramento jurídico de uma compra específica.</p>

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
    updatedAt: '2026-09-09',
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
    updatedAt: '2026-09-09',
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
      }
    ],
    relatedSlugs: ['como-limpar-monitor-sem-danificar', 'manchas-no-monitor-causas', 'como-testar-monitor-oled'],
    faq: [
      ['A tecnologia LCD ou OLED define sozinha a limpeza?', 'Não. O acabamento externo e as instruções do modelo são decisivos. Um OLED brilhante, um LCD fosco e uma tela com vidro especial podem exigir materiais diferentes.'],
      ['Telas de notebook exigem cuidado adicional?', 'Sim. A tampa fina pode flexionar e as bordas abrigam câmera, microfones e juntas. Apoie a tampa, use pressão mínima e mantenha umidade longe das aberturas.'],
      ['Posso colocar uma manta entre teclado e tela?', 'Somente se o fabricante aprovar. Material adicional pode aumentar a pressão quando o notebook é fechado; primeiro mantenha o teclado limpo e siga as orientações de transporte.']
    ],
    body: `
      <p><strong>Resposta direta:</strong> escolha o método pela construção externa e pelo manual, não apenas pela sigla LCD ou OLED. Acabamento fosco, vidro brilhante, camada sensível ao toque e vidro nanotexturizado reagem de modos diferentes. Quando as instruções divergirem, vale a orientação do fabricante para o modelo exato.</p>

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
    updatedAt: '2026-09-09',
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

      <h2>Como ler os resultados sem rotular a causa</h2>
      <table>
        <thead><tr><th scope="col">Observação</th><th scope="col">Próximo passo</th><th scope="col">Cuidado na interpretação</th></tr></thead>
        <tbody>
          <tr><td>Marca visível com a tela desligada</td><td>Revisar superfície, reflexos e instrução de limpeza</td><td>Não tentar polir ou remover camada</td></tr>
          <tr><td>Marca aparece na captura de tela</td><td>Verificar aplicativo, conteúdo, sistema e driver</td><td>A captura não mostra defeitos físicos da tela</td></tr>
          <tr><td>Marca não aparece na captura, mas aparece no autoteste</td><td>Registrar e consultar suporte do aparelho</td><td>Isso localiza o problema no caminho da tela, não a peça exata</td></tr>
          <tr><td>Área clara muda com a posição do observador</td><td>Comparar ângulo, distância, ambiente e brilho</td><td>Pode ser comportamento angular ou reflexo</td></tr>
          <tr><td>Contorno de interface aparece em várias fontes</td><td>Registrar duração e consultar rotina oficial do modelo</td><td>Uma sessão curta pode não separar retenção temporária de alteração persistente</td></tr>
          <tr><td>Faixa ocorre somente em um cabo ou dispositivo</td><td>Testar combinação conhecida e configurações compatíveis</td><td>Não atribuir imediatamente ao painel</td></tr>
        </tbody>
      </table>

      <h2>Película, umidade e pressão</h2>
      <p>Alguns produtos chegam com película de transporte identificada por aba ou impressão; outros expõem um polarizador ou revestimento que faz parte da tela. Confirme o manual antes de remover qualquer camada. Bolhas, bordas levantadas ou manchas não são autorização para puxar o material.</p>
      <p>Uma aparência semelhante a líquido interno ou marca de pressão não deve ser “testada” pressionando o painel. A força pode ampliar o dano. Umidade externa deve ser seca pelo procedimento permitido; suspeita de entrada de líquido exige equipamento desligado e orientação técnica.</p>

      <h2>Registro para assistência</h2>
      <ul>
        <li>Modelo, data e circunstância em que a mancha foi percebida.</li>
        <li>Brilho, modo de imagem, HDR, entrada, cabo e fonte usados.</li>
        <li>Fundos em que aparece, comportamento com ângulo e resultado do autoteste.</li>
        <li>Fotos da tela inteira e da região, sem filtros, com preservação dos arquivos originais.</li>
        <li>Indicação de qualquer impacto, transporte, limpeza recente ou contato com líquido, sem omitir fatos relevantes.</li>
      </ul>

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
