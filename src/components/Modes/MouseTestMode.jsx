import { useCallback, useEffect, useRef, useState } from 'react';
import { DisplayToolShell } from './DisplayToolShell';
import { Cell, Panel, Readout, ToolHead } from './InstrumentParts';
import { useI18n } from '../../i18n';

const L = {
  pt: {
    title: 'Teste de mouse',
    desc: 'Clique nos botões, gire a roda e mova o cursor dentro da área de amostragem. Nada é enviado para fora do navegador.',
    zone: 'Área de amostragem — mova o cursor aqui',
    polling: 'Taxa de eventos', pollingHint: 'Eventos entregues por segundo durante o movimento',
    left: 'Esquerdo', right: 'Direito', middle: 'Meio', back: 'Voltar (4)', forward: 'Avançar (5)',
    wheelUp: 'Roda ↑', wheelDown: 'Roda ↓', wheelH: 'Roda lateral',
    doubles: 'Cliques duplos suspeitos', doublesHint: 'Dois cliques do mesmo botão em menos de 60 ms',
    lastGap: 'Intervalo entre cliques', clicks: 'Cliques totais', coords: 'Coordenadas',
    buttons: 'Botões e roda', reset: 'Zerar contadores',
    note: 'A taxa inclui eventos coalescidos quando disponíveis e depende do navegador. Não certifica o polling USB do mouse. Atalhos do sistema e do navegador podem interceptar botões.',
    ok: 'Sem repetição indevida detectada.',
    bad: 'Foram registrados cliques muito próximos. Repita com cliques isolados: esta leitura não distingue intenção, software e falha do switch.',
  },
  en: {
    title: 'Mouse test',
    desc: 'Click the buttons, spin the wheel and move the cursor inside the sampling area. Nothing leaves the browser.',
    zone: 'Sampling area — move the cursor here',
    polling: 'Event rate', pollingHint: 'Delivered events per second while moving',
    left: 'Left', right: 'Right', middle: 'Middle', back: 'Back (4)', forward: 'Forward (5)',
    wheelUp: 'Wheel ↑', wheelDown: 'Wheel ↓', wheelH: 'Side wheel',
    doubles: 'Suspicious double clicks', doublesHint: 'Two clicks of the same button under 60 ms',
    lastGap: 'Gap between clicks', clicks: 'Total clicks', coords: 'Coordinates',
    buttons: 'Buttons and wheel', reset: 'Clear counters',
    note: 'The rate includes coalesced events when available and depends on the browser. It does not certify USB polling. Browser and system shortcuts may intercept buttons.',
    ok: 'No unintended repeats detected.',
    bad: 'Very close clicks recorded. Repeat with isolated clicks: this reading cannot distinguish intent, software and switch faults.',
  },
  es: {
    title: 'Prueba de ratón',
    desc: 'Haz clic en los botones, gira la rueda y mueve el cursor dentro del área de muestreo. Nada sale del navegador.',
    zone: 'Área de muestreo — mueve el cursor aquí',
    polling: 'Tasa de eventos', pollingHint: 'Eventos entregados por segundo al mover',
    left: 'Izquierdo', right: 'Derecho', middle: 'Central', back: 'Atrás (4)', forward: 'Adelante (5)',
    wheelUp: 'Rueda ↑', wheelDown: 'Rueda ↓', wheelH: 'Rueda lateral',
    doubles: 'Dobles clics sospechosos', doublesHint: 'Dos clics del mismo botón en menos de 60 ms',
    lastGap: 'Intervalo entre clics', clicks: 'Clics totales', coords: 'Coordenadas',
    buttons: 'Botones y rueda', reset: 'Reiniciar contadores',
    note: 'La tasa incluye eventos combinados cuando están disponibles y depende del navegador. No certifica el polling USB. Los atajos del sistema y del navegador pueden interceptar botones.',
    ok: 'Sin repeticiones indebidas detectadas.',
    bad: 'Se registraron clics muy próximos. Repite con clics aislados: esta lectura no distingue intención, software y fallos del switch.',
  },
};

const BUTTON_KEYS = ['left', 'middle', 'right', 'back', 'forward'];

export default function MouseTestMode({ onExit }) {
  const { locale } = useI18n();
  const s = L[locale] || L.pt;
  const [counts, setCounts] = useState({ left: 0, middle: 0, right: 0, back: 0, forward: 0 });
  const [wheel, setWheel] = useState({ up: 0, down: 0, side: 0 });
  const [pressed, setPressed] = useState(() => new Set());
  const [polling, setPolling] = useState(0);
  const [doubles, setDoubles] = useState(0);
  const [gapMs, setGapMs] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const lastClickRef = useRef(new Map());
  const sampleRef = useRef({ count: 0, start: 0, last: 0 });
  const zoneRef = useRef(null);

  const reset = useCallback(() => {
    setCounts({ left: 0, middle: 0, right: 0, back: 0, forward: 0 });
    setWheel({ up: 0, down: 0, side: 0 });
    setDoubles(0);
    setGapMs(null);
    setPolling(0);
    setPressed(new Set());
    setCoords({ x: 0, y: 0 });
    lastClickRef.current.clear();
    sampleRef.current = { count: 0, start: 0, last: 0 };
  }, []);

  const handlePointerMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCoords({ x: Math.round(event.clientX - rect.left), y: Math.round(event.clientY - rect.top) });
    const nativeEvent = event.nativeEvent || event;
    const events = nativeEvent.getCoalescedEvents ? Math.max(1, nativeEvent.getCoalescedEvents().length) : 1;
    const sample = sampleRef.current;
    const now = performance.now();
    if (!sample.start || now - sample.last > 250) {
      sample.start = now;
      sample.count = 0;
    }
    sample.last = now;
    sample.count += events;
    if (now - sample.start >= 500) {
      setPolling(Math.round((sample.count / (now - sample.start)) * 1000));
      sample.count = 0;
      sample.start = now;
    }
  }, []);

  const handleDown = useCallback((event) => {
    event.preventDefault();
    const key = BUTTON_KEYS[event.button];
    if (!key) return;
    setPressed((current) => new Set(current).add(key));
    setCounts((current) => ({ ...current, [key]: current[key] + 1 }));

    const now = performance.now();
    const previous = lastClickRef.current.get(event.button);
    if (previous !== undefined) {
      const delta = now - previous;
      setGapMs(delta);
      if (delta < 60) setDoubles((value) => value + 1);
    }
    lastClickRef.current.set(event.button, now);
  }, []);

  const handleUp = useCallback((event) => {
    const key = BUTTON_KEYS[event.button];
    if (!key) return;
    setPressed((current) => {
      const next = new Set(current);
      next.delete(key);
      return next;
    });
  }, []);

  const handleWheel = useCallback((event) => {
    event.preventDefault();
    setWheel((current) => ({
      up: current.up + (event.deltaY < 0 ? 1 : 0),
      down: current.down + (event.deltaY > 0 ? 1 : 0),
      side: current.side + (event.deltaX !== 0 ? 1 : 0),
    }));
  }, []);

  useEffect(() => {
    const zone = zoneRef.current;
    const resetPressed = () => setPressed(new Set());
    zone?.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('blur', resetPressed);
    const timer = window.setInterval(() => {
      if (performance.now() - sampleRef.current.last > 500) {
        sampleRef.current = { count: 0, start: 0, last: 0 };
        setPolling(0);
      }
    }, 250);
    return () => {
      zone?.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('blur', resetPressed);
      window.clearInterval(timer);
    };
  }, [handleUp, handleWheel]);

  return (
    <DisplayToolShell id="mouse-test" title={s.title} className="msx-scrollable" visible={false} onExit={onExit}>
      <div className="msx-tool-body">
        <ToolHead
          id="MS-22 / POINT"
          title={s.title}
          description={s.desc}
          actions={<button type="button" className="msx-btn" onClick={reset} data-testid="mouse-reset">{s.reset}</button>}
        />

        <div className="msx-stack">
          <div
            ref={zoneRef}
            data-testid="mouse-zone"
            onPointerMove={handlePointerMove}
            onMouseDown={handleDown}
            onPointerCancel={() => setPressed(new Set())}
            onContextMenu={(event) => event.preventDefault()}
            onAuxClick={(event) => event.preventDefault()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '220px',
              border: '1px dashed var(--msx-hair-2)',
              background: 'var(--msx-panel)',
              color: 'var(--msx-ink-3)',
              fontFamily: 'var(--msx-font-mono)',
              fontSize: '0.76rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'crosshair',
              touchAction: 'none',
              userSelect: 'none',
            }}
          >
            {s.zone}
          </div>

          <Readout>
            <Cell label={s.polling} value={polling ? `${polling} Hz` : '…'} hint={s.pollingHint} phosphor />
            <Cell label={s.coords} value={`${coords.x}, ${coords.y}`} />
            <Cell label={s.clicks} value={String(Object.values(counts).reduce((a, b) => a + b, 0))} />
            <Cell label={s.lastGap} value={gapMs ? `${gapMs.toFixed(0)} ms` : '—'} />
            <Cell label={s.doubles} value={String(doubles)} hint={s.doublesHint} />
          </Readout>

          <Panel title={s.buttons}>
            <div className="msx-wrap">
              {BUTTON_KEYS.map((key) => (
                <span
                  key={key}
                  data-testid={`mouse-btn-${key}`}
                  style={{
                    padding: '10px 14px',
                    border: `1px solid ${pressed.has(key) ? 'var(--msx-phos)' : 'var(--msx-hair)'}`,
                    background: pressed.has(key) ? 'var(--msx-phos)' : 'var(--msx-panel-2)',
                    color: pressed.has(key) ? 'var(--msx-phos-ink)' : 'var(--msx-ink-2)',
                    fontFamily: 'var(--msx-font-mono)',
                    fontSize: '0.72rem',
                  }}
                >
                  {s[key]}: {counts[key]}
                </span>
              ))}
              <span className="msx-kbd" style={{ padding: '10px 14px', fontSize: '0.72rem' }}>{s.wheelUp}: {wheel.up}</span>
              <span className="msx-kbd" style={{ padding: '10px 14px', fontSize: '0.72rem' }}>{s.wheelDown}: {wheel.down}</span>
              <span className="msx-kbd" style={{ padding: '10px 14px', fontSize: '0.72rem' }}>{s.wheelH}: {wheel.side}</span>
            </div>
            <p style={{ margin: '16px 0 0', color: doubles > 0 ? 'var(--msx-alert)' : 'var(--msx-signal)', fontSize: '0.84rem', lineHeight: 1.6 }}>
              {doubles > 0 ? s.bad : s.ok}
            </p>
          </Panel>

          <p className="msx-note">{s.note}</p>
        </div>
      </div>
    </DisplayToolShell>
  );
}
