import { useEffect, useRef, useState } from 'react';
import { DisplayToolShell } from './DisplayToolShell';
import { useI18n } from '../../i18n';

const L = {
  pt: {
    title: 'Exercitador de pixels',
    subtitle: 'Ciclo rápido de cores primárias',
    steps: [
      'Escolha a velocidade e, se quiser, reduza a área para focar em um ponto específico.',
      'Inicie o ciclo apenas depois de ler o aviso sobre piscadas rápidas.',
      'Pare e volte ao teste de pixels para verificar se o subpixel voltou a responder.',
    ],
    limit: 'Este ciclo é experimental e não garante recuperar pixels presos ou retenção. Não conserta pixels mortos nem burn-in permanente. Consulte as orientações do fabricante.',
    speed: 'Velocidade', area: 'Área', full: 'Tela cheia', band: 'Faixa central', box: 'Quadro central',
    warn: 'Piscadas rápidas podem incomodar quem tem sensibilidade à luz. Reduza a velocidade se sentir desconforto.',
    running: 'Rodando', paused: 'Pausado', pause: 'Pausar', resume: 'Retomar', elapsed: 'Tempo',
  },
  en: {
    title: 'Pixel exerciser',
    subtitle: 'Fast primary colour cycling',
    steps: [
      'Pick a speed and, if you want, shrink the area to target a specific spot.',
      'Start the cycle only after reading the warning about rapid flashing.',
      'Stop and go back to the pixel test to check whether the subpixel responds again.',
    ],
    limit: 'This cycle is experimental and does not guarantee recovery of stuck pixels or retention. It cannot repair dead pixels or permanent burn-in. Follow the manufacturer guidance.',
    speed: 'Speed', area: 'Area', full: 'Fullscreen', band: 'Centre band', box: 'Centre box',
    warn: 'Fast flashing can bother light-sensitive viewers. Lower the speed if you feel discomfort.',
    running: 'Running', paused: 'Paused', pause: 'Pause', resume: 'Resume', elapsed: 'Elapsed',
  },
  es: {
    title: 'Ejercitador de píxeles',
    subtitle: 'Ciclo rápido de colores primarios',
    steps: [
      'Elige la velocidad y, si quieres, reduce el área para enfocar un punto concreto.',
      'Inicia el ciclo solo después de leer el aviso sobre parpadeos rápidos.',
      'Detenlo y vuelve a la prueba de píxeles para ver si el subpíxel responde de nuevo.',
    ],
    limit: 'Este ciclo es experimental y no garantiza recuperar píxeles atascados o retención. No repara píxeles muertos ni burn-in permanente. Sigue las indicaciones del fabricante.',
    speed: 'Velocidad', area: 'Área', full: 'Pantalla completa', band: 'Banda central', box: 'Cuadro central',
    warn: 'El parpadeo rápido puede molestar a personas con sensibilidad a la luz. Baja la velocidad si sientes incomodidad.',
    running: 'En marcha', paused: 'En pausa', pause: 'Pausar', resume: 'Reanudar', elapsed: 'Tiempo',
  },
};

const COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffffff', '#000000', '#ffff00', '#00ffff', '#ff00ff'];
const AREAS = ['full', 'band', 'box'];

export default function PixelExerciserMode({ visible = true, showControls = true, onExit }) {
  const { locale } = useI18n();
  const s = L[locale] || L.pt;
  const [interval, setIntervalMs] = useState(120);
  const [area, setArea] = useState('full');
  const [running, setRunning] = useState(false);
  const [color, setColor] = useState(COLORS[0]);
  const [seconds, setSeconds] = useState(0);
  const indexRef = useRef(0);
  const elapsedRef = useRef(0);

  useEffect(() => {
    if (!running) return undefined;
    const id = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % COLORS.length;
      setColor(COLORS[indexRef.current]);
    }, interval);
    return () => clearInterval(id);
  }, [interval, running]);

  useEffect(() => {
    if (!running) return undefined;
    const start = performance.now();
    const id = setInterval(() => setSeconds(Math.floor((elapsedRef.current + performance.now() - start) / 1000)), 250);
    return () => {
      elapsedRef.current += performance.now() - start;
      clearInterval(id);
    };
  }, [running]);

  const areaStyle = area === 'full'
    ? { inset: 0 }
    : area === 'band'
      ? { left: 0, right: 0, top: '35%', height: '30%' }
      : { left: '30%', width: '40%', top: '30%', height: '40%' };

  const controls = (
    <div className="msx-stack" style={{ gap: 14 }}>
      <div className="msx-field">
        <label htmlFor="exerciser-speed">{s.speed}: {interval} ms</label>
        <input
          id="exerciser-speed"
          type="range"
          min="40"
          max="600"
          step="20"
          value={interval}
          onChange={(event) => setIntervalMs(Number(event.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      <div className="msx-wrap">
        {AREAS.map((item) => (
          <button key={item} type="button" className="msx-chip" aria-pressed={area === item} onClick={() => setArea(item)} data-testid={`exerciser-area-${item}`}>
            {s[item]}
          </button>
        ))}
      </div>
      <button type="button" className="msx-btn msx-btn--primary" onClick={() => setRunning((value) => !value)} data-testid="exerciser-toggle">
        {running ? s.pause : s.resume}
      </button>
      <p style={{ margin: 0, color: 'var(--msx-ink-3)', fontFamily: 'var(--msx-font-mono)', fontSize: '0.7rem' }}>
        {s.elapsed}: {Math.floor(seconds / 60)}m {seconds % 60}s · {running ? s.running : s.paused}
      </p>
      <p style={{ margin: 0, color: 'var(--msx-alert)', fontSize: '0.76rem', lineHeight: 1.55 }}>{s.warn}</p>
    </div>
  );

  return (
    <DisplayToolShell
      id="pixel-exerciser"
      title={s.title}
      subtitle={s.subtitle}
      instructions={s.steps}
      technicalLimit={s.limit}
      controls={controls}
      visible={visible && showControls}
      onExit={onExit}
    >
      <div role="img" className="display-mode__canvas" style={{ background: '#000' }} aria-label={s.title}>
        <div style={{ position: 'absolute', background: color, ...areaStyle }} />
      </div>
    </DisplayToolShell>
  );
}
