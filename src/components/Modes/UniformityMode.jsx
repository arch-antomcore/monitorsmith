import { useCallback, useEffect, useState } from 'react';
import { DisplayToolShell } from './DisplayToolShell';
import { useI18n } from '../../i18n';

const L = {
  pt: {
    title: 'Uniformidade e vazamento',
    subtitle: 'Degraus de valores RGB para inspeção visual',
    steps: [
      'Apague as luzes do ambiente e coloque o monitor no brilho de uso normal.',
      'Use as setas ou os botões para percorrer os degraus de 0% a 100%.',
      'Olhe de frente, a uns 70 cm, e observe centro, bordas e cantos em cada degrau.',
    ],
    limit: 'A percepção de uniformidade depende de brilho, ângulo e luz ambiente. É uma referência visual, não uma medição fotométrica.',
    level: 'Nível de cinza', zones: 'Grade de 9 zonas', hide: 'Ocultar rótulos',
  },
  en: {
    title: 'Uniformity and bleed',
    subtitle: 'RGB value steps for visual inspection',
    steps: [
      'Turn the room lights off and keep the monitor at your normal brightness.',
      'Use the arrow keys or the buttons to step from 0% to 100%.',
      'Look straight on from about 70 cm and inspect centre, edges and corners at each step.',
    ],
    limit: 'Perceived uniformity depends on brightness, angle and ambient light. This is a visual reference, not a photometric measurement.',
    level: 'Gray level', zones: '9-zone grid', hide: 'Hide labels',
  },
  es: {
    title: 'Uniformidad y fugas de luz',
    subtitle: 'Escalones de valores RGB para inspección visual',
    steps: [
      'Apaga las luces de la sala y deja el monitor en tu brillo habitual.',
      'Usa las flechas o los botones para recorrer los escalones de 0% a 100%.',
      'Mira de frente, a unos 70 cm, y revisa centro, bordes y esquinas en cada escalón.',
    ],
    limit: 'La uniformidad percibida depende del brillo, el ángulo y la luz ambiente. Es una referencia visual, no una medición fotométrica.',
    level: 'Nivel de gris', zones: 'Rejilla de 9 zonas', hide: 'Ocultar etiquetas',
  },
};

const LEVELS = [0, 5, 10, 25, 50, 75, 90, 100];

export default function UniformityMode({ visible = true, showControls = true, onExit }) {
  const { locale } = useI18n();
  const s = L[locale] || L.pt;
  const [index, setIndex] = useState(3);
  const [zones, setZones] = useState(true);

  const level = LEVELS[index];
  const value = Math.round((level / 100) * 255);

  const move = useCallback((delta) => {
    setIndex((current) => Math.min(LEVELS.length - 1, Math.max(0, current + delta)));
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.defaultPrevented || event.target.closest?.('button, a[href], input, select, textarea, [role="tablist"]')) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') { event.preventDefault(); move(1); }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') { event.preventDefault(); move(-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [move]);

  const controls = (
    <div className="msx-stack" style={{ gap: 14 }}>
      <div className="msx-wrap">
        {LEVELS.map((item, itemIndex) => (
          <button
            key={item}
            type="button"
            className="msx-chip"
            aria-pressed={itemIndex === index}
            onClick={() => setIndex(itemIndex)}
            data-testid={`uniformity-level-${item}`}
          >
            {item}%
          </button>
        ))}
      </div>
      <button type="button" className="msx-btn" aria-pressed={zones} onClick={() => setZones((current) => !current)} data-testid="uniformity-zones">
        {s.zones}: {zones ? 'ON' : 'OFF'}
      </button>
    </div>
  );

  return (
    <DisplayToolShell
      id="uniformity"
      title={s.title}
      subtitle={s.subtitle}
      instructions={s.steps}
      technicalLimit={s.limit}
      controls={controls}
      visible={visible && showControls}
      onExit={onExit}
    >
      <div
        role="img"
        className="display-mode__canvas"
        style={{ background: `rgb(${value},${value},${value})` }}
        aria-label={`${s.level} ${level}%`}
      >
        {zones ? (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
            }}
          >
            {Array.from({ length: 9 }, (unused, cellIndex) => (
              <div
                key={cellIndex}
                style={{
                  border: `1px solid ${level >= 50 ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.6)'}`,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: '8px 10px',
                  color: level >= 50 ? '#111111' : '#ffffff',
                  fontFamily: 'var(--msx-font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.14em',
                }}
              >
                Z{cellIndex + 1}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </DisplayToolShell>
  );
}
