# MonitorSmith

> A bancada de ferramentas para o seu monitor.

**MonitorSmith** é um produto da [EXVORN.TECH](https://exvorn.tech): uma suíte local, silenciosa e rápida para testar, cuidar, iluminar e usar qualquer monitor como espaço de foco, presença ou criação.

Não é um "tema escuro" nem um site de tela preta. Tela preta é uma das ferramentas da suíte. Cada ferramenta toma a tela inteira com uma intenção prática: reduzir luz emitida, iluminar uma chamada, revelar resíduos no painel, testar uniformidade de cor ou manter uma informação legível à distância.

## Stack e escolhas de engenharia

| Camada | Escolha | Motivo |
| --- | --- | --- |
| Interface | React 18 | Componentes pequenos, estado previsível e composição clara dos modos. |
| Desenvolvimento e build | Vite | Inicialização quase instantânea, HMR enxuto e build estático otimizado. |
| Design system | CSS custom properties + Tailwind | Tokens próprios para uma superfície escura e precisa, com utilitários disponíveis sem aprisionar a interface a um kit visual. |
| Movimento | Framer Motion | Transições de mola discretas para dock, diálogos e mudanças de contexto. |
| Ícones | SVGs semânticos / Lucide-ready | Legibilidade e baixo peso para controles de alta frequência. |
| Plataforma | Fullscreen API e Screen Wake Lock API | Comportamento de display nativo, sem extensões ou software residente. |

### Arquitetura

```text
src/
├── context/AppContext.jsx       Estado de modo, preferências e ações globais
├── hooks/                       Integração isolada com APIs do navegador e teclado
├── components/
│   ├── UI/                      Primitivos reutilizáveis: botão, modal, slider e glass card
│   ├── Controls/                Navegação, dock e guia de atalhos
│   ├── Home/                    Visão geral, descoberta e orientação de uso
│   └── Modes/                   Superfícies de display independentes
└── App.jsx                      Orquestração dos modos, APIs e transições
```

Os modos são componentes autocontidos: não dependem da página inicial para renderizar e recebem apenas as ações e preferências necessárias. Isso mantém a aplicação simples de testar e permite adicionar novos modos sem transformar o estado global em uma coleção de exceções.

## Acessibilidade, desempenho e movimento

- Navegação completa por teclado, link para pular ao conteúdo, foco visível e retorno de foco após modais.
- Modal com foco contido e fundo inerte; controles têm nomes acessíveis, rótulos associados e alvos touch confortáveis.
- `Esc` sempre encerra o modo e a tela cheia; atalhos locais não competem com atalhos globais ou campos de texto.
- `prefers-reduced-motion`, contraste reforçado e modo de cores forçadas preservam a experiência em diferentes preferências do sistema.
- Animações usam principalmente opacidade e transformação; não há fontes, imagens ou chamadas remotas bloqueando a primeira renderização.

## A suíte de ferramentas

### Ver e cuidar

- **Tela preta:** superfície `#000`, ideal para reduzir luz emitida e remover distrações sem desligar o computador.
- **Teste de pixels:** sequência de vermelho, verde, azul, ciano, magenta, amarelo, branco e preto; útil para procurar pixels presos, pixels mortos e manchas.
- **Limpeza do painel:** contraste e padrão de inspeção para tornar poeira, impressões e resíduos mais fáceis de enxergar antes da limpeza física.
- **Verificação visual:** escala de cinza, gamma, nitidez e barras RGB em uma leitura visual guiada. É uma inspeção de navegador; não mede luminância, gamut ou taxa de atualização.

### Cor e iluminação

- **Luz suave:** branco ajustável com intensidade e temperatura de cor visual para chamadas, retratos e preenchimento de ambiente.
- **Estúdio de cor:** cores sólidas e um seletor livre para cenário, iluminação ambiente, referência visual e composição de espaço.
- **Tela verde:** acesso direto ao preset Chroma verde para fundo de vídeo ou monitor secundário. A cor é renderizada pelo navegador; a uniformidade final depende do painel e da iluminação do ambiente.

### Tempo e presença

- **Foco:** Pomodoro de tela cheia, propositalmente discreto para um monitor lateral.
- **Relógio:** hora, data e segundos em uma composição pensada para recepção, estúdio e segundo monitor.
- **Mensagem em tela:** um display de status tipográfico para reunião, pausa, recepção ou recados rápidos.
- **Wake Lock e atalhos:** quando suportado pelo navegador, o Wake Lock impede repouso da tela enquanto uma ferramenta está ativa; os atalhos reduzem o uso do mouse.

## Casos de uso reais

### Painéis OLED e redução de estímulo visual

Uma superfície totalmente preta faz com que pixels OLED emitam pouca ou nenhuma luz. Isso pode ajudar a reduzir o conteúdo estático exibido enquanto o computador continua em uso e também deixa um setup noturno mais calmo. Não substitui os mecanismos de proteção do fabricante nem elimina risco de retenção ou burn-in: é uma medida complementar, não uma garantia de preservação do painel.

### Limpeza sem interromper o trabalho

Desligar um segundo monitor pode desconectar janelas, alterar o layout do sistema operacional ou interromper uma chamada. O modo de limpeza cria uma referência visual de alto contraste para localizar pó, marcas de dedo e riscos enquanto o monitor continua ligado. Limpe sempre com o procedimento recomendado pelo fabricante, usando material apropriado; o app só auxilia a inspeção visual.

### Luz de preenchimento para videochamadas

Um monitor pode funcionar como uma fonte de luz ampla e difusa quando não há ring light disponível. O modo Luz suave permite regular a intensidade renderizada e a tonalidade percebida entre quente e fria. Esses controles alteram apenas o conteúdo do navegador; brilho físico, gamut e temperatura efetiva continuam sob controle do monitor e do sistema operacional.

### Verificação rápida de painel

Padrões de cores sólidas ajudam a revelar pixels permanentemente acesos/apagados, sombras e falhas de uniformidade. O teste deve ser usado por curtos períodos e não é um laudo técnico de calibração. Em painéis muito luminosos, reduza o brilho físico do monitor antes de iniciar.

### Cenário de cor e tela verde

O Estúdio de cor atende situações em que uma tela precisa se comportar como superfície visual: luz de fundo discreta, teste de uma cor de marca, ponto de referência em um estúdio ou tela verde para um setup de vídeo. O preset Chroma verde é propositalmente direto para que essa intenção não fique escondida dentro de um seletor de cor. Ele não substitui um fundo físico profissional: reflexos, iluminação e qualidade do painel continuam definindo o recorte da câmera.

### Foco e presença em ambientes compartilhados

Um cronômetro minimalista em um display auxiliar torna um bloco de foco visível sem abrir uma janela de produtividade cheia de notificações. A mensagem em tela cheia serve para avisar que alguém está em reunião, indicar horário de retorno ou transformar uma TV/monitor em sinalização temporária.

## Atalhos

| Tecla | Ação |
| --- | --- |
| `F` | Alterna tela cheia |
| `B` | Abre preto absoluto |
| `W` | Abre luz suave |
| `C` | Abre limpeza de painel |
| `G` | Abre verificação do display |
| `S` | Abre Estúdio de cor |
| `P` | Abre foco / Pomodoro |
| `T` | Abre relógio em tela |
| `M` | Abre mensagem |
| `H` | Retorna às ferramentas do MonitorSmith |
| `Esc` | Retorna ao painel ou restaura os controles |
| `?` | Mostra os atalhos globais |

Os atalhos globais não são capturados durante digitação em campos de texto, seletores ou áreas editáveis — com exceção de `Esc`, que sempre restaura a interface. Cada modo apresenta os seus atalhos locais no próprio painel.

## APIs nativas

### Fullscreen API

O botão de tela cheia solicita `document.documentElement.requestFullscreen()`. Navegadores podem exigir uma interação explícita do usuário, e alguns ambientes incorporados ou políticas corporativas podem bloquear a solicitação. O app apresenta um estado coerente mesmo quando a API não está disponível.

### Screen Wake Lock API

Quando disponível em contexto seguro, o app solicita `navigator.wakeLock.request('screen')`. O bloqueio pode ser liberado pelo sistema, por economia de bateria, perda de visibilidade da página ou fechamento de tela cheia; por isso ele é reaplicado quando a página volta a ficar visível. Em navegadores sem suporte, o modo continua funcionando sem essa proteção adicional.

## Executar localmente

Pré-requisito: Node.js 18.18+ (ou 20+ recomendado) e npm.

```bash
cd C:\Users\Xgm\Desktop\APPWBP
npm install
npm run dev
```

Abra o endereço exibido pelo Vite — normalmente `http://localhost:5173`.

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Princípios de produto

- A interface desaparece quando não é necessária: em modos imersivos, cursor e controles se recolhem após alguns segundos sem interação.
- A visão geral inicial mostra finalidade, contexto e limites antes de abrir uma superfície de tela; a ação principal continua a um clique.
- A tela é o conteúdo; controles ficam em uma camada baixa, legível e reversível.
- Funções críticas usam APIs nativas e falham de modo seguro.
- Nenhum dado, mensagem ou preferência é enviado a um servidor por este projeto.

---

MonitorSmith é concebido para o portfólio oficial da **EXVORN.TECH** — ferramentas digitais com presença, precisão e uma relação mais silenciosa com a tecnologia.
