/** Perguntas frequentes exibidas na home, em três idiomas. */

export const FAQ = {
  pt: [
    {
      id: 'pixels',
      question: 'Como saber se o meu monitor tem pixel morto ou pixel preso?',
      answer: 'Abra o teste de pixels em tela cheia e percorra vermelho, verde, azul, branco e preto. Um pixel morto continua preto em todas as cores; um pixel preso fica fixo em uma cor. Um ponto visível em apenas uma cor não permite confirmar o tipo de falha. Ciclos de cor não garantem reparo. Aproxime-se a uns 30 cm e limpe a tela antes: sujeira imita defeito com facilidade.',
    },
    {
      id: 'refresh',
      question: 'Por que a taxa medida é menor do que os Hz do meu monitor?',
      answer: 'O navegador desenha na cadência do compositor do sistema, que pode limitar a 60 Hz quando a janela não está em foco, quando o notebook está economizando energia ou quando o monitor está em uma porta que negociou uma taxa menor. Deixe a aba em primeiro plano, ligue no cabo certo e confira nas configurações de vídeo do sistema operacional. O valor não certifica o funcionamento de VRR.',
    },
    {
      id: 'uniformity',
      question: 'Como avaliar vazamento de luz e uniformidade do jeito certo?',
      answer: 'Apague as luzes, deixe o monitor no brilho de uso normal e abra o teste de uniformidade no degrau de 0%. Fique de frente, a uns 70 cm, e não use a câmera do celular: sensores exageram o vazamento. Depois suba para 5% e 10% para ver clouding. Um pouco de glow nos cantos é normal em IPS; manchas grandes e assimétricas são o que interessa para acionar a garantia.',
    },
    {
      id: 'oled',
      question: 'Os testes funcionam em OLED, LCD e telas de celular?',
      answer: 'Sim. Em LCD eles ajudam com pixels, vazamento de luz, uniformidade e ghosting. Em OLED são úteis para retenção de imagem, pretos absolutos e ABL. Em celulares e tablets funcionam do mesmo jeito, com o bônus do teste de touchscreen. Só evite deixar padrões estáticos muito brilhantes por muito tempo em um OLED.',
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
      answer: 'Não, e ninguém deveria prometer isso. Padrões de tela ajudam você a enxergar problemas, ajustar brilho, contraste, nitidez e gamma a olho, e a decidir se vale investigar mais. Perfil de cor confiável exige uma sonda física medindo luminância e cromaticidade. Trate o MonitorSmith como diagnóstico rápido e referência visual.',
    },
  ],
  en: [
    {
      id: 'pixels',
      question: 'How do I know whether my monitor has a dead or stuck pixel?',
      answer: 'Open the pixel test in fullscreen and cycle red, green, blue, white and black. A dead pixel stays black on every colour; a stuck pixel is frozen on one colour. A dot visible on one color alone does not confirm the failure type. Color cycling does not guarantee a repair. Get about 30 cm away and clean the panel first: dust imitates a defect very convincingly.',
    },
    {
      id: 'refresh',
      question: 'Why is the measured rate lower than my monitor Hz?',
      answer: 'The browser draws at the cadence of the system compositor, which can cap at 60 Hz when the window loses focus, when a laptop is saving power, or when the display negotiated a lower rate on that port. Keep the tab in the foreground, use the right cable and check the OS display settings. The value does not certify VRR operation.',
    },
    {
      id: 'uniformity',
      question: 'How should I judge backlight bleed and uniformity properly?',
      answer: 'Turn the lights off, keep your normal brightness and open the uniformity test at the 0% step. Sit straight on, about 70 cm away, and do not use a phone camera: sensors exaggerate bleed. Then step to 5% and 10% to look for clouding. Some corner glow is normal on IPS; large asymmetric patches are what matters for a warranty claim.',
    },
    {
      id: 'oled',
      question: 'Do the tests work on OLED, LCD and phone screens?',
      answer: 'Yes. On LCD they help with pixels, bleed, uniformity and ghosting. On OLED they are useful for image retention, absolute blacks and ABL behaviour. On phones and tablets everything works the same, plus the touchscreen test. Just avoid leaving very bright static patterns on an OLED for long stretches.',
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
      answer: 'No, and nobody should promise that. Screen patterns help you see problems, tune brightness, contrast, sharpness and gamma by eye, and decide whether to dig deeper. A trustworthy colour profile needs a physical probe measuring luminance and chromaticity. Treat MonitorSmith as fast diagnosis and a visual reference.',
    },
  ],
  es: [
    {
      id: 'pixels',
      question: '¿Cómo sé si mi monitor tiene un píxel muerto o atascado?',
      answer: 'Abre la prueba de píxeles a pantalla completa y recorre rojo, verde, azul, blanco y negro. Un píxel muerto sigue negro en todos los colores; uno atascado queda fijo en un color. Un punto visible en un solo color no confirma el tipo de fallo. Los ciclos de color no garantizan reparación. Acércate a unos 30 cm y limpia el panel antes: el polvo imita muy bien un defecto.',
    },
    {
      id: 'refresh',
      question: '¿Por qué la tasa medida es menor que los Hz de mi monitor?',
      answer: 'El navegador dibuja a la cadencia del compositor del sistema, que puede limitarse a 60 Hz cuando la ventana pierde el foco, cuando el portátil ahorra energía o cuando la pantalla negoció una tasa menor en ese puerto. Mantén la pestaña en primer plano, usa el cable adecuado y revisa los ajustes de pantalla del sistema. El valor no certifica el funcionamiento de VRR.',
    },
    {
      id: 'uniformity',
      question: '¿Cómo evaluar bien las fugas de luz y la uniformidad?',
      answer: 'Apaga las luces, deja el brillo habitual y abre la prueba de uniformidad en el escalón del 0%. Colócate de frente, a unos 70 cm, y no uses la cámara del móvil: los sensores exageran las fugas. Después sube a 5% y 10% para ver clouding. Algo de glow en las esquinas es normal en IPS; las manchas grandes y asimétricas son las que importan para la garantía.',
    },
    {
      id: 'oled',
      question: '¿Las pruebas funcionan en OLED, LCD y pantallas de móvil?',
      answer: 'Sí. En LCD ayudan con píxeles, fugas, uniformidad y ghosting. En OLED sirven para retención de imagen, negros absolutos y ABL. En móviles y tablets funciona igual, con el añadido de la prueba táctil. Solo evita dejar patrones estáticos muy brillantes mucho tiempo en un OLED.',
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
      answer: 'No, y nadie debería prometerlo. Los patrones te ayudan a ver problemas, ajustar brillo, contraste, nitidez y gamma a ojo, y decidir si conviene investigar más. Un perfil de color fiable exige una sonda física que mida luminancia y cromaticidad. Considera MonitorSmith un diagnóstico rápido y una referencia visual.',
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
