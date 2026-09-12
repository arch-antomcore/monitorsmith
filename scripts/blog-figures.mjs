import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

const escape = (text) => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const figure = (section, kind, title, caption, labels = []) => ({ section, kind, title, caption, labels });

// These are explanatory diagrams, not photographs, measurements or diagnostic patterns.
// The section names deliberately bind each image to the passage it helps explain.
export const BLOG_FIGURES = {
  'backlight-bleed-como-testar': [
    figure('Protocolo controlado de inspeção', 'chain', 'Uma comparação, quatro controles', 'Mantenha imagem, brilho, posição e luz ambiente registrados. Alterar várias condições de uma vez impede saber o que mudou a aparência.', ['Imagem escura', 'Brilho habitual', 'Posição de frente', 'Luz ambiente anotada']),
    figure('Como interpretar o mapa visual', 'zones', 'Localize antes de interpretar', 'Exemplo de mapa: B3 identifica uma região para comparar em outra sessão. A marca não representa um defeito medido nem sua gravidade.'),
  ],
  'ips-glow-vs-backlight-bleed': [
    figure('Comparação angular passo a passo', 'angle', 'Mude a posição, mantenha a imagem', 'Compare a visão frontal com as laterais, sem alterar brilho ou conteúdo. Uma mudança com o ângulo é um indício; não confirma sozinha a causa física.'),
    figure('Use pontos fixos para não confundir movimento', 'zones', 'A região precisa continuar sendo a mesma', 'Use referências de linha e coluna para reencontrar a área observada. Evite confundir um reflexo que se desloca com uma região fixa do painel.'),
  ],
  'como-testar-monitor-oled': [
    figure('Sequência visual reproduzível', 'ramp', 'Observe mais de um nível de cinza', 'Faixas ilustrativas do escuro ao claro: não são um padrão de calibração. Abra a ferramenta para a inspeção e mantenha cada padrão apenas pelo tempo necessário.', ['Escuros', 'Claros']),
    figure('Rotinas de compensação e histórico', 'chain', 'Consulte a rotina do modelo', 'A sequência resume a preparação do registro. Não force ciclos de compensação repetidos: os intervalos e procedimentos dependem do fabricante.', ['Histórico de uso', 'Manual do modelo', 'Rotina prevista', 'Nova observação']),
  ],
  'tela-preta-descanso-monitor': [
    figure('Como escolher entre preto, suspensão e desligamento', 'states', 'Três estados, funções diferentes', 'Preto é conteúdo exibido; suspensão é um estado de energia; desligamento é outra decisão do aparelho. A aparência preta não informa, por si só, o consumo.', ['Tela preta|Aplicativo continua ativo', 'Suspensão|Sistema gerencia energia', 'Desligamento|Depende do aparelho']),
    figure('Escolha a ferramenta pelo que precisa continuar funcionando', 'chain', 'Decida pelo que deve continuar ativo', 'Antes de deixar a tela ociosa, confira a tarefa, o estado de energia e a recuperação. Uma chamada ou transmissão pode depender de outra configuração.', ['Tarefa em andamento', 'Estado escolhido', 'Teste de retomada', 'Configuração registrada']),
  ],
  'o-que-sao-dead-pixels': [
    figure('Pixel, subpixel e resolução', 'rgb', 'Um pixel pode reunir subpixels', 'Esquema RGB ampliado, com um grupo destacado. A disposição real varia conforme a tecnologia do painel; o desenho não representa todos os arranjos.'),
    figure('Localize sem tocar no painel', 'zones', 'Registre a posição sem pressionar', 'O ponto em B3 é apenas um exemplo de anotação. Localize a região usando referências da imagem, sem pressionar ou marcar fisicamente a tela.'),
  ],
  'testar-monitor-olx-mercado-livre': [
    figure('Teste funcional com o seu sinal', 'chain', 'Confira o caminho completo do sinal', 'Uma limitação pode estar em qualquer elo. Teste a combinação de equipamento, conexão e modo de vídeo que você pretende usar.', ['Computador', 'Cabo ou adaptador', 'Entrada do monitor', 'Modo de vídeo']),
    figure('Divida o encontro em blocos com tempo marcado', 'chain', 'Uma visita com começo e fim', 'Esta ordem evita gastar todo o encontro em uma única tela de teste. Reserve também uma etapa para registrar o que não pôde ser verificado.', ['Estado físico', 'Conexão e controles', 'Inspeção do painel', 'Registro da decisão']),
  ],
  'pixel-morto-vs-pixel-preso': [
    figure('Prepare uma ficha de observação', 'zones', 'Uma coordenada para cada observação', 'Exemplo de referência B3. Compare o mesmo ponto nas diferentes cores e sessões antes de escolher um rótulo para o comportamento.'),
    figure('Sequência de registro', 'swatches', 'Troque o fundo, mantenha o ponto', 'A sequência de fundos orienta o registro visual. Ela não reproduz pixels defeituosos: anote como o ponto realmente aparece em cada padrão.', ['Preto', 'Branco', 'Vermelho', 'Verde', 'Azul']),
  ],
  'politica-dead-pixel-fabricantes': [
    figure('Comece pela origem da unidade, não pela contagem', 'chain', 'Encontre a política aplicável à unidade', 'O caminho começa pela identificação da compra. Esta ilustração organiza a consulta; não estabelece tolerâncias nem critérios de garantia.', ['Modelo e número de série', 'País e canal de compra', 'Política vigente', 'Condições da cobertura']),
    figure('Monte um dossiê curto que outra pessoa consiga conferir', 'chain', 'Evidência que acompanha o chamado', 'Agrupe identificação, localização e registros comparáveis antes de enviar ao canal oficial. Preserve os arquivos originais do atendimento.', ['Identificação da unidade', 'Mapa dos pontos', 'Fotos e condições', 'Protocolo de atendimento']),
  ],
  'como-limpar-monitor-sem-danificar': [
    figure('Procedimento passo a passo', 'chain', 'Limpeza com uma etapa de conferência', 'Siga primeiro o manual do aparelho. Use somente os materiais permitidos e confira a secagem antes de ligar novamente.', ['Desligar e preparar', 'Remover poeira solta', 'Limpar conforme manual', 'Conferir a secagem']),
    figure('Controle a umidade pelo pano, não pela tela', 'moisture', 'O líquido não vai direto na tela', 'Quando o fabricante permitir umidade, aplique a quantidade adequada ao pano. Evite borrifar no painel e deixar líquido escorrer pelas bordas.'),
  ],
  'guia-limpeza-lcd-oled-notebook': [
    figure('Use uma árvore de decisão antes de tocar na tela', 'chain', 'O acabamento orienta a preparação', 'LCD, OLED e notebook não definem sozinhos o método de limpeza. O acabamento e as instruções do modelo vêm antes da escolha do material.', ['Modelo exato', 'Acabamento da tela', 'Instruções do fabricante', 'Pano e material permitidos']),
    figure('Faça a conferência final em três condições', 'states', 'Confira sem insistir na limpeza', 'Observe a superfície e depois a imagem. Uma marca persistente pede uma nova avaliação da origem, não aumento de pressão ou produto.', ['Desligada|Observe a superfície', 'Luz lateral suave|Procure resíduos', 'Conteúdo habitual|Confira a imagem']),
  ],
  'manchas-no-monitor-causas': [
    figure('Use uma árvore de decisão, não um catálogo de defeitos', 'chain', 'Separe as comparações por camada', 'A ordem organiza a triagem de um sintoma. Nenhuma dessas observações isoladas identifica o componente defeituoso.', ['Superfície desligada', 'Fundos uniformes', 'Outro conteúdo ou sinal', 'Registro para suporte']),
    figure('Transforme o achado em um relato de uma página', 'zones', 'Uma localização que outra pessoa entenda', 'Associe o mapa a brilho, conteúdo, posição e iluminação. A região B3 é demonstrativa; a descrição deve corresponder à sua observação.'),
  ],
  'calibrar-monitor-fotografia-design': [
    figure('Calibração, caracterização e validação', 'states', 'Três etapas do gerenciamento de cor', 'O navegador auxilia a inspeção visual. A medição com instrumento sustenta a caracterização e a validação do comportamento do monitor.', ['Calibração|Ajustar o estado', 'Caracterização|Descrever o estado medido', 'Validação|Conferir o resultado']),
    figure('O perfil precisa acompanhar o estado que foi medido', 'chain', 'O perfil descreve uma condição', 'Um perfil perde correspondência quando o estado que ele descreve é alterado. Registre o modo, os ajustes e a associação no sistema.', ['Modo e ajustes', 'Medição do monitor', 'Perfil correspondente', 'Aplicação com gestão de cor']),
  ],
  'o-que-e-color-banding': [
    figure('Banding é um sintoma, não um diagnóstico', 'gradient', 'Transição suave e degraus visíveis', 'Comparação ilustrativa, com degraus exagerados para explicar o sintoma. A imagem não mede profundidade de bits nem isola a causa do banding.'),
    figure('Divida a cadeia em pontos de controle', 'chain', 'Localize onde a transição muda', 'Repita a comparação alterando um elo por vez. Arquivo, aplicativo, sinal e tela podem influenciar a aparência final.', ['Arquivo de referência', 'Aplicativo', 'Saída e conexão', 'Monitor']),
  ],
  'teste-contraste-gama-monitor': [
    figure('Checklist reproduzível para sombras e realces', 'ramp', 'Confira os dois extremos', 'As faixas apenas ilustram sombras e realces. Para comparar a separação tonal, use a ferramenta nas condições descritas no guia.', ['Sombras', 'Realces']),
    figure('Faixa completa e faixa limitada: um desencontro visível', 'ranges', 'A origem e o destino precisam concordar', 'Exemplo de codificação de luminância em 8 bits: faixa completa 0–255 e faixa de vídeo nominal 16–235. Isso não é uma régua de brilho físico nem uma regra para todo formato.'),
  ],
  'monitor-para-edicao-video': [
    figure('Transforme o contrato de entrega em requisitos', 'chain', 'A entrega vem antes do equipamento', 'Defina as condições de avaliação a partir do formato de entrega. Uma lista de recursos comerciais não substitui a validação do fluxo.', ['Entrega SDR ou HDR', 'Requisitos do projeto', 'Cadeia de visualização', 'Validação do fluxo']),
    figure('Separe a tela de trabalho da tela de avaliação', 'roles', 'Cada tela tem uma responsabilidade', 'Esquema de funções, sem recomendar um modelo: a interface de edição e a avaliação da imagem podem ter requisitos diferentes.', ['Trabalho|Timeline e ferramentas', 'Avaliação|Imagem de referência']),
  ],
  'chroma-key-sem-tecido-tela-verde': [
    figure('Prepare o enquadramento antes de escolher a cor', 'layout', 'Separe fundo, assunto e câmera', 'Vista de cima, sem escala. A separação entre o assunto e a tela ajuda a investigar contaminação de cor e foco; confirme pela imagem da câmera.', ['Fundo de cor', 'Assunto', 'Câmera', 'Luz principal']),
    figure('Ajuste o Chroma Key em uma ordem legível', 'chain', 'Ajuste e confira as bordas', 'A configuração precisa sobreviver a movimento e ao fundo que será usado. Não trate o filtro como solução para iluminação ou captura inadequadas.', ['Cor de recorte', 'Similaridade', 'Suavidade e spill', 'Movimento no fundo final']),
  ],
  'fundo-cor-fotos-produto': [
    figure('Prepare o pequeno estúdio', 'layout', 'A tela é o fundo, não toda a iluminação', 'Vista de cima, sem escala: o objeto fica separado do fundo emissivo e recebe luz própria. Ajuste a geometria pela prévia da câmera.', ['Tela com fundo', 'Produto', 'Câmera', 'Luz do objeto']),
    figure('Evite confundir pixel da tela com textura do produto', 'chain', 'Investigue a textura antes de editar', 'Compare enquadramento, foco e distância antes de atribuir textura ao produto. Confira também o arquivo exportado no tamanho de publicação.', ['Captura de referência', 'Distância e enquadramento', 'Foco no produto', 'Arquivo final']),
  ],
  'fotografia-produto-olx-mercado-livre': [
    figure('Roteiro reproduzível de fotografias', 'shotlist', 'Uma sequência que responde dúvidas', 'Mapa de enquadramentos, não fotografias de um produto: cada quadro tem uma função. Mostre também defeitos e itens incluídos na venda.', ['Vista geral', 'Parte traseira', 'Conexões', 'Detalhe de uso', 'Marca ou defeito', 'Itens incluídos']),
    figure('Eletrônicos exigem uma revisão de privacidade antes da câmera', 'chain', 'Revise os dados antes da publicação', 'Confira o que aparece tanto na captura quanto no arquivo final. A composição pode revelar informações em telas, etiquetas e reflexos.', ['Preparar a cena', 'Conferir dados visíveis', 'Revisar a captura', 'Conferir a exportação']),
  ],
  'cores-streaming-cenarios': [
    figure('Dê uma função a cada cor antes de montar a cena', 'hierarchy', 'Cor a serviço da leitura', 'Esquema de hierarquia: a área principal recebe a mensagem; o apoio organiza; o acento chama atenção para uma ação. As proporções são ilustrativas.', ['Conteúdo principal', 'Informação de apoio', 'Ação']),
    figure('Faça um ensaio privado com o caminho completo', 'chain', 'A prévia local é uma etapa', 'Confira a legibilidade também depois da codificação e na reprodução final. Uma cena pode mudar de aparência ao longo da transmissão.', ['Cena no OBS', 'Codificação', 'Plataforma', 'Reprodução final']),
  ],
  'iluminacao-videochamada-dicas': [
    figure('Procedimento de ajuste reproduzível', 'layout', 'Posicione a luz e confira pela câmera', 'Vista de cima, sem escala. Uma fonte próxima do eixo frontal serve como ponto de partida; ajuste altura e lado para evitar reflexos em óculos.', ['Fundo da chamada', 'Pessoa', 'Webcam', 'Luz suave']),
    figure('O aplicativo pode mudar uma cena que estava pronta', 'chain', 'Verifique o caminho da chamada', 'Autoexposição, efeitos e transmissão podem alterar a captura. Compare a mesma cena no aplicativo que será usado na reunião.', ['Ambiente e luz', 'Captura da câmera', 'Efeitos do aplicativo', 'Imagem recebida']),
  ],
  'monitor-como-softbox-streamer': [
    figure('O tamanho aparente da fonte muda com a distância', 'distance', 'Mesma fonte, ângulos diferentes', 'Geometria esquemática, sem escala: a mesma área emissiva ocupa um ângulo maior quando está próxima. O desenho não estima iluminância nem qualidade de luz.'),
    figure('Use uma tela secundária sem deixar o conteúdo mudar a luz', 'chain', 'Preserve a referência do preenchimento', 'Registre o conteúdo claro e o brilho, depois confira a captura. Trocar de janela pode alterar a luz que a tela acrescenta à cena.', ['Conteúdo estável', 'Brilho registrado', 'Posição mantida', 'Captura conferida']),
  ],
  'temperatura-de-cor-explicada': [
    figure('Como interpretar a faixa nominal', 'temperature', 'Aparência quente, neutra e fria', 'Amostras de cor apenas ilustrativas. A aparência na tela depende do próprio display; estes blocos não reproduzem uma fonte de luz medida em kelvin.'),
    figure('CCT e desvio verde ou magenta são problemas distintos', 'axes', 'Há mais de um eixo na aparência do branco', 'Mapa conceitual, sem unidades: a direção quente–frio e o desvio verde–magenta ajudam a descrever diferenças, mas não substituem medição.'),
  ],
  'tecnica-pomodoro-guia': [
    figure('Prepare o ciclo antes de iniciar o relógio', 'timeline', 'Dois ciclos como ponto de partida', 'Exemplo ajustável de 25 minutos de trabalho e 5 de pausa. A largura dos blocos corresponde ao tempo neste exemplo, sem promessa de produtividade.', ['Trabalho', 'Pausa', 'Trabalho', 'Pausa']),
    figure('Crie um registro pequeno o bastante para ser usado', 'chain', 'Registre o que ajuda a ajustar o método', 'A revisão conecta a intenção à experiência. Uma interrupção anotada pode explicar melhor o bloco do que apenas contar ciclos concluídos.', ['Tarefa definida', 'Bloco realizado', 'Interrupções anotadas', 'Próximo ajuste']),
  ],
  'ruido-marrom-branco-rosa-foco': [
    figure('Quando um ruído contínuo pode ajudar', 'spectrum', 'Perfis ideais de ruído', 'Espectros de densidade de potência idealizados: branco constante, rosa caindo 3 dB por oitava e marrom 6 dB por oitava. Não são medições do dispositivo nem níveis de volume seguros.'),
    figure('Separe o sinal gerado do som que chega ao ouvido', 'chain', 'O som atravessa mais de uma etapa', 'O ajuste na página não determina sozinho o nível que chega ao ouvido. Saída, dispositivo e ambiente influenciam a escuta.', ['Sinal no navegador', 'Saída do sistema', 'Fones ou caixas', 'Escuta no ambiente']),
  ],
  'foco-trabalho-remoto': [
    figure('Planeje três tipos de bloco', 'states', 'Reserve espaço para tarefas diferentes', 'Três funções para organizar a agenda, sem duração universal. Intercale os blocos conforme dependências da equipe e condições do dia.', ['Concentração|Uma tarefa delimitada', 'Colaboração|Trocas e decisões', 'Operação|Mensagens e rotinas']),
    figure('Transforme disponibilidade em um acordo visível', 'chain', 'O sinal funciona junto com um acordo', 'A equipe precisa saber o que o aviso significa e por onde tratar uma urgência. O relógio ou a mensagem na tela comunica uma decisão combinada.', ['Horário combinado', 'Sinal visível', 'Canal de urgência', 'Retorno combinado']),
  ],
  'relogio-digital-monitor-secundario': [
    figure('Como avaliar a leitura', 'distance', 'A distância muda o tamanho aparente', 'Esquema geométrico: o mesmo mostrador ocupa menos do campo visual quando está longe. Confira a leitura do ponto real de observação, sem impor uma distância universal.'),
    figure('Confira fuso, idioma e mudança de data', 'chain', 'O relógio depende do sistema', 'A página apresenta a referência de tempo recebida do dispositivo. Confira fuso, data e sincronização antes de depender do mostrador.', ['Hora do sistema', 'Fuso selecionado', 'Formato de exibição', 'Conferência independente']),
  ],
  'setup-dois-monitores-dicas': [
    figure('Faça o mapa físico coincidir com o mapa do sistema', 'screens', 'Alinhe as telas também no sistema', 'O desenho compara a disposição física com o arranjo lógico. Ajuste a borda de passagem do cursor e confira a escala de cada tela.'),
    figure('Verifique toda a cadeia de conexão', 'chain', 'A conexão é uma cadeia', 'Cada elo pode limitar os modos disponíveis. Verifique a combinação real, incluindo dock ou adaptador quando houver.', ['Saída do computador', 'Dock ou adaptador', 'Cabo', 'Entrada do monitor']),
  ],
  'como-usar-teleprompter-videos': [
    figure('Alinhe lente, reflexo e olhos', 'alignment', 'Aproxime a leitura do eixo da lente', 'Esquema de alinhamento, sem escala. Quanto mais afastado o texto estiver do eixo de captura, maior pode ser o desvio aparente do olhar; confirme no ensaio.'),
    figure('Ensaie ritmo e rolagem separadamente', 'chain', 'O roteiro conduz a velocidade', 'Prepare frases faláveis antes de regular a rolagem. Confira pausas e retomadas com uma gravação curta.', ['Roteiro falado', 'Pausas marcadas', 'Rolagem ajustada', 'Ensaio gravado']),
  ],
  'sinalizacao-digital-eventos': [
    figure('Escreva para quem passa, não para quem montou o evento', 'hierarchy', 'Uma tela deve orientar uma decisão', 'Esquema de mensagem: prioridade para destino e ação. A informação de apoio fica subordinada ao que a pessoa precisa decidir no local.', ['Destino ou atividade', 'Local e horário', 'Próximo passo']),
    figure('Prepare o conteúdo de contingência', 'chain', 'Prepare a operação antes da abertura', 'Confirme a tela no local e mantenha uma alternativa disponível para mudança de conteúdo, conexão ou equipamento.', ['Conteúdo aprovado', 'Ensaio no local', 'Alternativa disponível', 'Responsável definido']),
  ],
  'qr-code-tela-cheia-eventos': [
    figure('Crie e teste o código', 'quiet', 'Deixe a margem livre ao redor', 'Esquema não escaneável de um QR Code: a margem livre tem pelo menos quatro módulos por lado. Não coloque texto, moldura ou fundo complexo nessa área.'),
    figure('Escolha a rota pelo que a pessoa precisa concluir', 'chain', 'O teste só termina no destino', 'Não basta a câmera reconhecer o código. Complete a ação em um telefone real, na rede e nas condições esperadas para o evento.', ['Leitura do código', 'Abertura do endereço', 'Página de destino', 'Ação concluída']),
  ],
  'logos-patrocinadores-eventos': [
    figure('Normalize a presença sem deformar marcas', 'contain', 'Ajuste a área, preserve a proporção', 'Retângulos geométricos representam uma marca hipotética. O ajuste proporcional preserva a relação entre largura e altura; esticar o arquivo a altera.'),
    figure('Teste o caminho até a transmissão', 'chain', 'Confira a marca no resultado final', 'A revisão acompanha o arquivo até o dispositivo do público. Verifique proporção, transparência, ordem e legibilidade ao longo do caminho.', ['Arquivo aprovado', 'Loop na tela', 'Captura no OBS', 'Transmissão final']),
  ],
  'vitrine-digital-lojas-estandes': [
    figure('Planeje a sequência para quem pode entrar no meio', 'shotlist', 'Cada quadro precisa fazer sentido sozinho', 'Mapa de funções para uma sequência de vitrine. Cada quadro deve trazer contexto suficiente para quem começa a assistir no meio do loop.', ['O que é', 'Para quem serve', 'Condição da oferta', 'Como encontrar', 'Próxima ação', 'Contato alternativo']),
    figure('Inclua uma rotina curta de abertura', 'chain', 'Confira no horário de funcionamento', 'Uma prévia em ambiente controlado não antecipa sol, reflexos e circulação. Repita a conferência nas condições do local.', ['Tela e conexão', 'Conteúdo vigente', 'Leitura no local', 'Alternativa de atendimento']),
  ],
  'guia-completo-monitorsmith': [
    figure('Execute um teste controlado', 'chain', 'Uma pergunta por comparação', 'O fluxo mantém a inspeção ligada à hipótese original. Registre também aquilo que a ferramenta não permite concluir.', ['Hipótese observável', 'Condições registradas', 'Uma variável alterada', 'Observação comparada']),
    figure('Interprete por camadas', 'chain', 'Observe antes de atribuir a causa', 'O resultado atravessa camadas diferentes. Um sintoma no navegador não basta para concluir que o painel ou periférico está defeituoso.', ['Página e navegador', 'Sistema e permissões', 'Conexão e sinal', 'Dispositivo físico']),
  ],
};

const text = (x, y, value, size = 24, color = '#e9e7e2', anchor = 'start') =>
  `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" text-anchor="${anchor}">${escape(value)}</text>`;
const rect = (x, y, width, height, fill = '#14181d', stroke = '#46505d') =>
  `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="3" fill="${fill}" stroke="${stroke}"/>`;
const line = (x1, y1, x2, y2, color = '#ffb020', dashed = false) =>
  `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="2"${dashed ? ' stroke-dasharray="6 6"' : ''}/>`;
const circle = (x, y, radius = 12) => `<circle cx="${x}" cy="${y}" r="${radius}" fill="#ffb020"/>`;
const down = (x, y) => `${line(x, y, x, y + 18)}<path d="m${x - 5} ${y + 12} 5 6 5-6" fill="none" stroke="#ffb020" stroke-width="2"/>`;
const centered = (x, y, label, size = 24) => text(x, y, label, size, '#e9e7e2', 'middle');

function diagram({ kind, labels }) {
  switch (kind) {
    case 'chain':
      return labels.map((label, i) => `${rect(80, 100 + i * 75, 560, 54)}${text(103, 135 + i * 75, String(i + 1).padStart(2, '0'), 20, '#ffb020')}${text(153, 135 + i * 75, label, 23)}${i < labels.length - 1 ? down(360, 155 + i * 75) : ''}`).join('');
    case 'states':
      return labels.map((label, i) => {
        const [name, detail] = label.split('|');
        return `${rect(40, 104 + i * 94, 640, 78)}${text(60, 135 + i * 94, name, 25, '#ffb020')}${text(60, 165 + i * 94, detail, 22)}`;
      }).join('');
    case 'zones':
      return ['A', 'B', 'C'].map((row, y) => [1, 2, 3].map((col, x) => `${rect(100 + x * 174, 106 + y * 87, 174, 87)}${text(118 + x * 174, 138 + y * 87, row + col, 23, '#a8aeb6')}`).join('')).join('') + circle(529, 237, 8) + centered(360, 405, 'Exemplo: região B3', 24);
    case 'angle':
      return `${rect(160, 120, 400, 20, '#a8aeb6')}${centered(360, 105, 'Painel fixo')}${[175, 360, 545].map((x) => {
        const y = 140 + Math.sqrt(220 ** 2 - (x - 360) ** 2);
        return line(x, y, 360, 140, x === 360 ? '#ffb020' : '#6fc3ff', x !== 360) + circle(x, y) + centered(x, y + 44, x === 360 ? 'Frente' : 'Lado', 23);
      }).join('')}`;
    case 'rgb':
      return [0, 1, 2, 3].map((p) => ['#d74d56', '#4fc181', '#488ded'].map((color, s) => rect(70 + p * 146 + s * 42, 146, 35, 157, color, color)).join('')).join('') + rect(62, 134, 130, 181, 'none', '#ffb020') + centered(126, 358, '1 pixel', 23) + centered(430, 358, 'Subpixels R · G · B', 23);
    case 'ramp':
      return [0, 1].map((r) => centered(360, 112 + r * 154, labels[r]) + Array.from({ length: 8 }, (_, i) => {
        const level = r === 0 ? i * 7 : 206 + i * 7;
        return rect(49 + i * 78, 136 + r * 154, 76, 87, `rgb(${level},${level},${level})`, '#46505d');
      }).join('')).join('');
    case 'swatches':
      return ['#090909', '#f8f8f8', '#d33838', '#20833f', '#274eca'].map((color, i) => rect(36 + i * 132, 147, 120, 158, color) + centered(96 + i * 132, 348, labels[i], 20)).join('');
    case 'moisture':
      return `${rect(50, 125, 270, 225)}${rect(400, 125, 270, 225)}${centered(185, 172, 'Pano permitido')}${centered(535, 172, 'Painel')}${down(185, 210)}${rect(115, 247, 140, 42, '#a8aeb6')}${line(494, 223, 576, 302, '#ff5470')}${line(576, 223, 494, 302, '#ff5470')}${centered(185, 390, 'Umidade controlada', 22)}${centered(535, 390, 'Sem borrifo direto', 22)}`;
    case 'gradient':
      return `<defs><linearGradient id="tone"><stop stop-color="#050505"/><stop offset="1" stop-color="#eee"/></linearGradient></defs>${text(45, 112, 'Transição contínua')}${rect(45, 132, 630, 88, 'url(#tone)')}${text(45, 272, 'Degraus exagerados')}${Array.from({ length: 8 }, (_, i) => { const v = Math.round(5 + i * 233 / 7); return rect(45 + i * 78.75, 292, 78.75, 88, `rgb(${v},${v},${v})`, 'none'); }).join('')}`;
    case 'ranges':
      return `${text(60, 127, 'Faixa completa')}${rect(60, 154, 600, 50, '#384452')}${text(60, 237, '0', 23)}${text(660, 237, '255', 23, '#e9e7e2', 'end')}${text(60, 290, 'Faixa nominal de vídeo')}${rect(60, 315, 600, 50)}${rect(60 + 600 * 16 / 255, 315, 600 * 219 / 255, 50, '#ffb020')}${text(60 + 600 * 16 / 255, 402, '16', 23)}${text(60 + 600 * 235 / 255, 402, '235', 23, '#e9e7e2', 'end')}`;
    case 'roles':
      return labels.map((label, i) => { const [name, detail] = label.split('|'); return rect(40 + i * 340, 137, 300, 190) + centered(190 + i * 340, 204, name, 28) + centered(190 + i * 340, 251, detail, 21); }).join('');
    case 'layout':
      return `${rect(230, 104, 365, 25, '#46505d')}${centered(412, 91, labels[0], 23)}${circle(412, 237, 19)}${text(448, 245, labels[1], 23)}${rect(378, 352, 68, 36)}${centered(412, 419, labels[2], 23)}${rect(60, 196, 105, 64, '#e9e7e2')}${text(48, 172, labels[3], 23)}${line(168, 228, 387, 237, '#ffb020')}${line(412, 345, 412, 265, '#6fc3ff', true)}`;
    case 'shotlist':
      return labels.map((label, i) => {
        const x = 38 + (i % 2) * 340;
        const y = 103 + Math.floor(i / 2) * 102;
        return rect(x, y, 305, 86) + text(x + 17, y + 30, String(i + 1).padStart(2, '0'), 19, '#ffb020') + text(x + 17, y + 63, label, 22);
      }).join('');
    case 'hierarchy':
      return `${rect(55, 111, 610, 278)}${text(85, 188, labels[0], 31)}${text(85, 250, labels[1], 24, '#a8aeb6')}${rect(85, 288, 300, 61, '#ffb020')}${text(104, 327, labels[2], 25, '#1a1200')}`;
    case 'distance':
      return [0, 1].map((i) => {
        const top = 126 + i * 158;
        const x = i === 0 ? 343 : 567;
        return rect(105, top, 17, 104, '#e9e7e2') + line(126, top, x, top + 52, '#6fc3ff') + line(126, top + 104, x, top + 52, '#6fc3ff') + circle(x, top + 52) + text(148, top + 128, i === 0 ? 'Mais perto' : 'Mais longe', 23);
      }).join('');
    case 'temperature':
      return ['#e5b787', '#dfdfd9', '#a8c8e5'].map((color, i) => rect(49 + i * 218, 155, 186, 145, color) + centered(142 + i * 218, 346, ['Quente', 'Neutra', 'Fria'][i], 25)).join('');
    case 'axes':
      return `${line(132, 260, 590, 260, '#a8aeb6')}${line(360, 132, 360, 367, '#a8aeb6')}${circle(360, 260, 7)}${text(42, 268, 'Quente', 22, '#e5b787')}${text(610, 268, 'Frio', 22, '#a8c8e5')}${centered(360, 113, 'Verde', 23)}${centered(360, 405, 'Magenta', 23)}`;
    case 'timeline': {
      const durations = [25, 5, 25, 5];
      let x = 60;
      return text(60, 138, 'Trabalho: 25 min · pausa: 5 min', 24) + durations.map((n, i) => {
        const start = x;
        x += n * 10;
        return rect(start, 179, n * 10, 98, i % 2 ? '#6fc3ff' : '#ffb020') + text(start + n * 5, 239, String(n), 24, '#1a1200', 'middle') + text(start, 319, `${durations.slice(0, i).reduce((a, b) => a + b, 0)}`, 22);
      }).join('') + text(660, 319, '60', 22, '#e9e7e2', 'end') + centered(360, 377, 'Tempo acumulado em minutos', 22);
    }
    case 'spectrum':
      return `${line(86, 338, 646, 338, '#a8aeb6')}${line(86, 110, 86, 338, '#a8aeb6')}${text(92, 102, 'Densidade de potência relativa', 22)}${line(100, 146, 470, 146, '#e9e7e2')}${line(100, 146, 470, 224, '#ffa5c1')}${line(100, 146, 470, 302, '#e5b787')}${text(484, 153, 'Branco', 22)}${text(484, 231, 'Rosa', 22, '#ffa5c1')}${text(484, 309, 'Marrom', 22, '#e5b787')}${centered(360, 388, 'Frequência em escala logarítmica →', 23)}`;
    case 'screens':
      return [0, 1].map((i) => {
        const x = 37 + i * 346;
        return centered(x + 145, 117, i === 0 ? 'Na mesa' : 'No sistema', 24) + rect(x, 164, 184, 127) + rect(x + 191, 164, 94, 187) + centered(x + 92, 241, '1', 34) + centered(x + 238, 264, '2', 34) + line(x, 153, x + 285, 153, '#ffb020', true);
      }).join('') + centered(360, 407, 'Mesma ordem · mesma borda de referência', 22);
    case 'alignment':
      return `${rect(239, 112, 242, 72)}${centered(360, 156, 'Área de leitura', 25)}${circle(360, 228, 15)}${text(395, 236, 'Lente', 23)}${circle(360, 370, 12)}${text(395, 378, 'Olhar', 23)}${line(360, 244, 360, 350, '#ffb020', true)}${line(348, 355, 260, 182, '#6fc3ff', true)}${line(372, 355, 460, 182, '#6fc3ff', true)}`;
    case 'quiet':
      return `${rect(195, 102, 300, 300, '#fff', '#fff')}${rect(259, 166, 172, 172, '#14181d')}${centered(345, 240, 'Matriz', 23)}${centered(345, 272, 'de dados', 23)}${line(195, 134, 259, 134, '#1a1200')}${[0, 1, 2, 3, 4].map((i) => line(195 + i * 16, 128, 195 + i * 16, 140, '#1a1200')).join('')}${text(26, 143, '4 módulos', 23)}${text(513, 258, 'Área livre', 23)}${line(501, 252, 473, 252, '#ffb020')}`;
    case 'contain':
      return `${rect(40, 132, 300, 200)}${rect(380, 132, 300, 200)}${rect(75, 194, 230, 77, '#a8aeb6')}${rect(415, 155, 230, 154, '#a8aeb6')}${line(439, 173, 621, 290, '#b4213c')}${line(621, 173, 439, 290, '#b4213c')}${centered(190, 381, 'Proporção preservada', 22)}${centered(530, 381, 'Arquivo esticado', 22)}`;
    default:
      throw new Error(`Unknown blog diagram: ${kind}`);
  }
}

function renderSvg(entry) {
  const caption = entry.caption;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="460" viewBox="0 0 720 460" role="img" aria-labelledby="title desc"><title id="title">${escape(entry.title)}</title><desc id="desc">${escape(caption)}</desc><rect width="720" height="460" fill="#0f1216"/><g font-family="Arial, Helvetica, sans-serif">${text(36, 49, entry.title, 25)}${line(36, 68, 684, 68, '#46505d')}${diagram(entry)}${text(36, 445, 'MONITORSMITH / DIAGRAMA EXPLICATIVO', 13, '#a8aeb6')}</g></svg>\n`;
}

/** Assets have content hashes so an updated diagram cannot reuse a stale offline response. */
export async function buildBlogFigures(articles, distDir) {
  const output = new Map();
  const dir = path.join(distDir, 'blog-media');
  await fs.mkdir(dir, { recursive: true });
  for (const article of articles) {
    const entries = BLOG_FIGURES[article.slug];
    if (entries?.length !== 2) throw new Error(`Expected two figures for ${article.slug}`);
    let body = article.body;
    for (const [index, entry] of entries.entries()) {
      const heading = `<h2>${entry.section}</h2>`;
      const start = body.indexOf(heading);
      if (start < 0) throw new Error(`Figure section missing in ${article.slug}: ${entry.section}`);
      const next = body.indexOf('<h2>', start + heading.length);
      const position = next < 0 ? body.length : next;
      const svg = renderSvg(entry);
      const hash = createHash('sha256').update(svg).digest('hex').slice(0, 12);
      const url = `/blog-media/${article.slug}-${index + 1}-${hash}.svg`;
      await fs.writeFile(path.join(distDir, url.slice(1)), svg, 'utf8');
      const html = `<figure class="blog-figure"><img src="${url}" width="720" height="460" loading="lazy" decoding="async" alt="${escape(entry.title + '. ' + entry.caption)}"><figcaption><span>Figura ${index + 1}.</span> ${escape(entry.caption)} <a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Ampliar diagrama: ${escape(entry.title)} (nova aba)">Ampliar diagrama</a></figcaption></figure>\n`;
      body = body.slice(0, position) + html + body.slice(position);
    }
    output.set(article.slug, body);
  }
  return output;
}
