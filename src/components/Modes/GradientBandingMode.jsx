import { useEffect, useRef, useState } from 'react';
import { DisplayToolShell } from './DisplayToolShell';
import { useI18n } from '../../i18n';

const L = {
  pt: {
    title: 'Gradiente e banding',
    subtitle: 'Rampas lineares em tela cheia',
    steps: [
      'Deixe a tela cheia ativa e desligue qualquer filtro de cor do sistema.',
      'Escolha a rampa: cinza, vermelho, verde, azul ou espectro.',
      'Procure faixas horizontais visíveis; quanto mais suave a transição, melhor o caminho de sinal.',
    ],
    limit: 'O navegador compõe em 8 bits por canal na maioria dos sistemas. Um gradiente perfeito aqui não prova 10 bits ponta a ponta.',
    ramp: 'Rampa', bands: 'Degraus visíveis', smooth: 'Suave', stepped: 'Escalonado',
    dither: 'Dither aleatório',
  },
  en: {
    title: 'Gradient and banding',
    subtitle: 'Fullscreen linear ramps',
    steps: [
      'Keep fullscreen active and disable any system colour filter.',
      'Pick a ramp: gray, red, green, blue or spectrum.',
      'Look for visible horizontal bands; the smoother the transition, the better the signal path.',
    ],
    limit: 'Browsers composite at 8 bits per channel on most systems. A perfect gradient here does not prove end-to-end 10-bit.',
    ramp: 'Ramp', bands: 'Visible steps', smooth: 'Smooth', stepped: 'Stepped',
    dither: 'Random dither',
  },
  es: {
    title: 'Degradado y banding',
    subtitle: 'Rampas lineales a pantalla completa',
    steps: [
      'Mantén la pantalla completa activa y desactiva cualquier filtro de color del sistema.',
      'Elige la rampa: gris, rojo, verde, azul o espectro.',
      'Busca franjas horizontales visibles; cuanto más suave la transición, mejor la cadena de señal.',
    ],
    limit: 'Los navegadores componen a 8 bits por canal en la mayoría de sistemas. Un degradado perfecto aquí no prueba 10 bits de extremo a extremo.',
    ramp: 'Rampa', bands: 'Escalones visibles', smooth: 'Suave', stepped: 'Escalonado',
    dither: 'Tramado aleatorio',
  },
};

const RAMPS = [
  { id: 'gray', label: 'Gray', color: (t) => [t, t, t] },
  { id: 'red', label: 'Red', color: (t) => [t, 0, 0] },
  { id: 'green', label: 'Green', color: (t) => [0, t, 0] },
  { id: 'blue', label: 'Blue', color: (t) => [0, 0, t] },
  { id: 'spectrum', label: 'Spectrum', color: null },
];

export default function GradientBandingMode({ visible = true, showControls = true, onExit }) {
  const { locale } = useI18n();
  const s = L[locale] || L.pt;
  const [ramp, setRamp] = useState('gray');
  const [steps, setSteps] = useState(0);
  const [dither, setDither] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const paint = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx || width < 2 || height < 1) return;
      const image = ctx.createImageData(width, height);
      const definition = RAMPS.find((item) => item.id === ramp);

      for (let x = 0; x < width; x += 1) {
        let t = x / (width - 1);
        if (steps > 0) t = Math.round(t * (steps - 1)) / (steps - 1);
        let r;
        let g;
        let b;
        if (definition.color) {
          const value = t * 255;
          [r, g, b] = definition.color(value);
        } else {
          const hue = t * 360;
          const c = 1;
          const hp = hue / 60;
          const xx = c * (1 - Math.abs((hp % 2) - 1));
          const table = [[c, xx, 0], [xx, c, 0], [0, c, xx], [0, xx, c], [xx, 0, c], [c, 0, xx]];
          const [rr, gg, bb] = table[Math.min(5, Math.floor(hp))];
          r = rr * 255;
          g = gg * 255;
          b = bb * 255;
        }
        for (let y = 0; y < height; y += 1) {
          const offset = (y * width + x) * 4;
          const noise = dither ? (Math.random() - 0.5) * 2 : 0;
          image.data[offset] = Math.max(0, Math.min(255, r + noise));
          image.data[offset + 1] = Math.max(0, Math.min(255, g + noise));
          image.data[offset + 2] = Math.max(0, Math.min(255, b + noise));
          image.data[offset + 3] = 255;
        }
      }
      ctx.putImageData(image, 0, 0);
    };

    paint();
    window.addEventListener('resize', paint);
    return () => window.removeEventListener('resize', paint);
  }, [dither, ramp, steps]);

  const controls = (
    <div className="msx-stack" style={{ gap: 14 }}>
      <div className="msx-wrap">
        {RAMPS.map((item) => (
          <button key={item.id} type="button" className="msx-chip" aria-pressed={ramp === item.id} onClick={() => setRamp(item.id)} data-testid={`gradient-ramp-${item.id}`}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="msx-field">
        <label htmlFor="gradient-steps">{s.bands}: {steps === 0 ? s.smooth : steps}</label>
        <input
          id="gradient-steps"
          type="range"
          min="0"
          max="64"
          step="2"
          value={steps}
          onChange={(event) => setSteps(Number(event.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      <button type="button" className="msx-btn" onClick={() => setDither((value) => !value)} data-testid="gradient-dither">
        {s.dither}: {dither ? 'ON' : 'OFF'}
      </button>
    </div>
  );

  return (
    <DisplayToolShell
      id="gradient-banding"
      title={s.title}
      subtitle={s.subtitle}
      instructions={s.steps}
      technicalLimit={s.limit}
      controls={controls}
      visible={visible && showControls}
      onExit={onExit}
    >
      <canvas ref={canvasRef} className="display-mode__canvas" aria-label={s.title} />
    </DisplayToolShell>
  );
}
