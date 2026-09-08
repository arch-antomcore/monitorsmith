/** Perguntas frequentes exibidas na home, em três idiomas. */

export const FAQ = {
  pt: [
    {
      id: 'pixels',
      question: 'Como saber se o meu monitor tem pixel morto ou pixel preso?',
      answer: 'Limpe a tela conforme o manual e percorra fundos vermelhos, verdes, azuis, brancos e pretos. Registre em quais cores o ponto aparece e repita em outra escala ou dispositivo. A aparência ajuda a localizar o sintoma, mas não confirma sua causa física; ciclos de cor não garantem reparo.',
    },
    {
      id: 'refresh',
      question: 'Por que a taxa medida é menor do que os Hz do meu monitor?',
      answer: 'A página estima a cadência dos callbacks do navegador, influenciada por foco, energia, carga, compositor e configuração do sistema. Deixe a aba em primeiro plano e confira a taxa no sistema operacional. O valor não mede diretamente o painel nem certifica VRR.',
    },
    {
      id: 'uniformity',
      question: 'Como avaliar vazamento de luz e uniformidade do jeito certo?',
      answer: 'Mantenha brilho, posição e ambiente constantes e compare os degraus de 0%, 5%, 10% e 50% de frente. Câmeras podem alterar exposição, então use fotos apenas como registro. A avaliação é visual e não classifica a causa nem a cobertura de garantia.',
    },
    {
      id: 'oled',
      question: 'Os testes funcionam em OLED, LCD e telas de celular?',
      answer: 'Sim, dentro dos recursos que o navegador e o dispositivo expõem. Os padrões ajudam a observar pontos, uniformidade aparente, retenção e movimento; o teste touch registra eventos recebidos pela página. Evite padrões brilhantes ou estáticos por longos períodos e siga o fabricante.',
    },
    {
      id: 'privacy',
      question: 'O MonitorSmith envia alguma informação para servidores?',
      answer: 'As ferramentas processam imagens, texto e leituras de dispositivos no navegador. Preferências e imagens do loop podem ser salvas localmente. A hospedagem recebe as requisições de acesso ao site e anúncios externos só são carregados após consentimento. As ferramentas funcionam offline após o cache concluir; páginas e imagens editoriais dependem de visitas anteriores.',
    },
    {
      id: 'install',
      question: 'Preciso instalar algo para usar as ferramentas?',
      answer: 'Não. Tudo roda no navegador. Se quiser acesso rápido e uso offline, use a opção de instalar aplicativo do seu navegador: o MonitorSmith abre em janela própria, com atalhos diretos para as ferramentas mais usadas.',
    },
    {
      id: 'mouse',
      question: 'Meu mouse clica duas vezes sozinho. Como confirmar?',
      answer: 'Abra o teste de mouse e dê cliques únicos e espaçados. Pares do mesmo botão em intervalos muito curtos são marcados para investigação. Isso não confirma defeito: gestos, configurações, drivers e o próprio navegador também podem produzir eventos próximos. Repita o teste e compare com outro dispositivo.',
    },
    {
      id: 'calibration',
      question: 'Os testes substituem um colorímetro?',
      answer: 'Não. Padrões ajudam a comparar sombras, realces, gradientes e nitidez aparente e a decidir se vale medir mais. Um perfil de cor confiável exige uma sonda física e um fluxo com gerenciamento de cor. Trate o MonitorSmith como triagem e referência visual.',
    },
  ],
  en: [
    {
      id: 'pixels',
      question: 'How do I know whether my monitor has a dead or stuck pixel?',
      answer: 'Clean the screen as the manual directs and cycle red, green, blue, white and black. Record where the dot appears and repeat at another scale or device. Appearance helps locate the symptom but cannot confirm its physical cause; colour cycling does not guarantee repair.',
    },
    {
      id: 'refresh',
      question: 'Why is the measured rate lower than my monitor Hz?',
      answer: 'The page estimates browser callback cadence, influenced by focus, power, load, compositor and system configuration. Keep the tab in the foreground and check the rate in operating-system settings. The value neither measures the panel directly nor certifies VRR.',
    },
    {
      id: 'uniformity',
      question: 'How should I judge backlight bleed and uniformity properly?',
      answer: 'Keep brightness, position and environment constant and compare 0%, 5%, 10% and 50% steps straight on. Cameras can alter exposure, so use photos only as records. This is visual inspection and cannot classify cause or warranty coverage.',
    },
    {
      id: 'oled',
      question: 'Do the tests work on OLED, LCD and phone screens?',
      answer: 'Yes, within what the browser and device expose. Patterns help observe dots, apparent uniformity, retention and motion; the touch test records events received by the page. Avoid bright or static patterns for long periods and follow manufacturer guidance.',
    },
    {
      id: 'privacy',
      question: 'Does MonitorSmith send anything to a server?',
      answer: 'The tools process images, text and device readings in the browser. Preferences and loop images may be stored locally. Hosting receives requests when you visit the site, and external advertising loads only with consent. Tools work offline after the cache completes; editorial pages and images depend on prior visits.',
    },
    {
      id: 'install',
      question: 'Do I need to install anything to use the tools?',
      answer: 'No. Everything runs in the browser. If you want quick access and offline use, take your browser install-app option: MonitorSmith opens in its own window with direct shortcuts to the most used instruments.',
    },
    {
      id: 'mouse',
      question: 'My mouse double-clicks by itself. How do I confirm it?',
      answer: 'Open the mouse test and make single, well-spaced clicks. Very short intervals between clicks are flagged for investigation. This does not confirm a fault: gestures, settings, drivers and browser behavior can also produce closely spaced events. Repeat and compare with another device.',
    },
    {
      id: 'calibration',
      question: 'Do these tests replace a colorimeter?',
      answer: 'No. Patterns help compare shadows, highlights, gradients and apparent sharpness and decide whether to measure further. A trustworthy colour profile needs a physical probe and a colour-managed workflow. Treat MonitorSmith as triage and a visual reference.',
    },
  ],
  es: [
    {
      id: 'pixels',
      question: '¿Cómo sé si mi monitor tiene un píxel muerto o atascado?',
      answer: 'Limpia la pantalla según el manual y recorre rojo, verde, azul, blanco y negro. Registra en qué fondos aparece el punto y repite con otra escala o dispositivo. La apariencia localiza el síntoma, pero no confirma su causa física; el ciclo de color no garantiza reparación.',
    },
    {
      id: 'refresh',
      question: '¿Por qué la tasa medida es menor que los Hz de mi monitor?',
      answer: 'La página estima la cadencia de callbacks del navegador, influida por foco, energía, carga, compositor y configuración del sistema. Mantén la pestaña en primer plano y revisa la tasa en el sistema operativo. El valor no mide directamente el panel ni certifica VRR.',
    },
    {
      id: 'uniformity',
      question: '¿Cómo evaluar bien las fugas de luz y la uniformidad?',
      answer: 'Mantén constantes el brillo, la posición y el ambiente y compara los pasos de 0%, 5%, 10% y 50% de frente. Las cámaras pueden cambiar la exposición, así que usa las fotos solo como registro. Es una inspección visual y no clasifica causa ni cobertura de garantía.',
    },
    {
      id: 'oled',
      question: '¿Las pruebas funcionan en OLED, LCD y pantallas de móvil?',
      answer: 'Sí, dentro de lo que exponen el navegador y el dispositivo. Los patrones ayudan a observar puntos, uniformidad aparente, retención y movimiento; la prueba táctil registra eventos recibidos por la página. Evita patrones brillantes o estáticos durante mucho tiempo y sigue al fabricante.',
    },
    {
      id: 'privacy',
      question: '¿MonitorSmith envía información a algún servidor?',
      answer: 'Las herramientas procesan imágenes, texto y lecturas de dispositivos en el navegador. Las preferencias y las imágenes del bucle pueden guardarse localmente. El alojamiento recibe las solicitudes de acceso y la publicidad externa solo se carga con consentimiento. Las herramientas funcionan sin conexión tras completar la caché; las páginas e imágenes editoriales dependen de visitas previas.',
    },
    {
      id: 'install',
      question: '¿Necesito instalar algo para usar las herramientas?',
      answer: 'No. Todo funciona en el navegador. Si quieres acceso rápido y uso sin conexión, usa la opción de instalar aplicación de tu navegador: MonitorSmith se abre en su propia ventana con atajos directos a los instrumentos más usados.',
    },
    {
      id: 'mouse',
      question: 'Mi ratón hace doble clic solo. ¿Cómo lo confirmo?',
      answer: 'Abre la prueba de ratón y haz clics únicos y espaciados. Los intervalos muy cortos se señalan para investigar. No confirman un defecto: los gestos, ajustes, controladores y el navegador también pueden producir eventos cercanos. Repite y compara con otro dispositivo.',
    },
    {
      id: 'calibration',
      question: '¿Estas pruebas sustituyen a un colorímetro?',
      answer: 'No. Los patrones ayudan a comparar sombras, luces, gradientes y nitidez aparente y a decidir si conviene medir más. Un perfil de color fiable exige una sonda física y un flujo con gestión de color. Considera MonitorSmith una referencia visual de orientación.',
    },
  ],
};

export const STANDARDS = [
  'ISO 9241-307 · pixels e ergonomia',
  'IEC 61966-2-1 · espaço sRGB',
  'ITU-R BT.709 / BT.1886 · gamma',
  'VESA CVT-RB v2 · timings',
  'WCAG 2.2 · acessibilidade',
];
