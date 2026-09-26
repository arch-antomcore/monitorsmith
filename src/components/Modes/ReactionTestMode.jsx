import { useCallback, useEffect, useRef, useState } from 'react';
import { DisplayToolShell } from './DisplayToolShell';
import { Cell, Panel, Readout, ToolHead } from './InstrumentParts';
import { useI18n } from '../../i18n';

const L = {
  pt: {
    title: 'Tempo de reação e clique',
    desc: 'Cinco rodadas com espera aleatória. Clique, toque ou aperte a barra de espaço no instante em que o campo acender.',
    idle: 'Clique para começar', wait: 'Espere o sinal…', go: 'AGORA!',
    tooSoon: 'Cedo demais — a rodada foi descartada.',
    round: 'Rodada', best: 'Melhor', avg: 'Média', last: 'Última', spread: 'Amplitude',
    done: 'Sequência concluída', again: 'Nova sequência',
    results: 'Rodadas registradas',
    note: 'O número inclui a sua latência humana somada ao atraso do periférico, do sistema e da tela. Repita no mesmo ambiente para comparar setups de forma útil.',
  },
  en: {
    title: 'Reaction and click time',
    desc: 'Five rounds with a random wait. Click, tap or hit the space bar the instant the field lights up.',
    idle: 'Click to start', wait: 'Wait for the signal…', go: 'NOW!',
    tooSoon: 'Too early — round discarded.',
    round: 'Round', best: 'Best', avg: 'Average', last: 'Last', spread: 'Spread',
    done: 'Sequence complete', again: 'New sequence',
    results: 'Recorded rounds',
    note: 'The number includes your human latency plus peripheral, system and display delay. Repeat in the same environment to compare setups meaningfully.',
  },
  es: {
    title: 'Tiempo de reacción y clic',
    desc: 'Cinco rondas con espera aleatoria. Haz clic, toca o pulsa la barra espaciadora en el instante en que se encienda el campo.',
    idle: 'Haz clic para empezar', wait: 'Espera la señal…', go: '¡AHORA!',
    tooSoon: 'Demasiado pronto — ronda descartada.',
    round: 'Ronda', best: 'Mejor', avg: 'Media', last: 'Última', spread: 'Amplitud',
    done: 'Secuencia completa', again: 'Nueva secuencia',
    results: 'Rondas registradas',
    note: 'El número incluye tu latencia humana más el retardo del periférico, del sistema y de la pantalla. Repite en el mismo entorno para comparar equipos.',
  },
};

const TOTAL_ROUNDS = 5;

export default function ReactionTestMode({ onExit }) {
  const { locale } = useI18n();
  const s = L[locale] || L.pt;
  const [phase, setPhase] = useState('idle');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const goAtRef = useRef(0);
  const timerRef = useRef(0);

  const arm = useCallback(() => {
    setPhase('wait');
    setMessage('');
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      goAtRef.current = performance.now();
      setPhase('go');
    }, 900 + Math.random() * 2600);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleHit = useCallback(() => {
    if (phase === 'idle' || phase === 'done' || phase === 'retry') {
      if (phase !== 'retry') setResults([]);
      arm();
      return;
    }
    if (phase === 'wait') {
      clearTimeout(timerRef.current);
      setMessage(s.tooSoon);
      setPhase('retry');
      return;
    }
    if (phase === 'go') {
      const value = performance.now() - goAtRef.current;
      const next = [...results, Math.round(value)];
      setResults(next);
      if (next.length >= TOTAL_ROUNDS) {
        setPhase('done');
      } else {
        arm();
      }
    }
  }, [arm, phase, results, s.tooSoon]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.code === 'Space' && !event.repeat && !event.defaultPrevented && !event.target.closest?.('input, textarea, select, a[href], button:not([data-testid="reaction-field"])')) {
        event.preventDefault();
        handleHit();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleHit]);

  const best = results.length ? Math.min(...results) : 0;
  const avg = results.length ? results.reduce((a, b) => a + b, 0) / results.length : 0;
  const spread = results.length > 1 ? Math.max(...results) - Math.min(...results) : 0;

  const fieldLabel = phase === 'go' ? s.go : phase === 'wait' ? s.wait : phase === 'done' ? s.again : s.idle;

  return (
    <DisplayToolShell id="reaction-test" title={s.title} className="msx-scrollable" visible={false} onExit={onExit}>
      <div className="msx-tool-body">
        <ToolHead id="MS-17 / REACT" title={s.title} description={s.desc} />

        <div className="msx-stack">
          <button
            type="button"
            onClick={handleHit}
            data-testid="reaction-field"
            aria-live="polite"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              minHeight: '250px',
              border: '1px solid var(--msx-hair)',
              background: phase === 'go' ? 'var(--msx-signal)' : phase === 'wait' ? 'var(--msx-panel-3)' : 'var(--msx-panel)',
              color: phase === 'go' ? '#04140d' : 'var(--msx-ink)',
              fontFamily: 'var(--msx-font-display)',
              fontSize: 'clamp(1.4rem, 4vw, 2.6rem)',
              fontWeight: 700,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            {fieldLabel}
          </button>

          {message ? <p className="msx-note" style={{ borderColor: 'var(--msx-alert)' }}>{message}</p> : null}

          <Readout>
            <Cell label={s.round} value={`${Math.min(results.length + (phase === 'done' ? 0 : 1), TOTAL_ROUNDS)} / ${TOTAL_ROUNDS}`} />
            <Cell label={s.last} value={results.length ? `${results[results.length - 1]} ms` : '—'} phosphor />
            <Cell label={s.best} value={best ? `${best} ms` : '—'} />
            <Cell label={s.avg} value={avg ? `${avg.toFixed(0)} ms` : '—'} />
            <Cell label={s.spread} value={spread ? `${spread} ms` : '—'} />
          </Readout>

          <Panel title={s.results}>
            <div className="msx-wrap">
              {results.length === 0 ? <span style={{ color: 'var(--msx-ink-3)', fontFamily: 'var(--msx-font-mono)', fontSize: '0.8rem' }}>—</span> : null}
              {results.map((value, index) => (
                <span key={`${index}-${value}`} className="msx-kbd" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  {index + 1}: {value} ms
                </span>
              ))}
            </div>
            {phase === 'done' ? <p style={{ marginTop: 16, marginBottom: 0, color: 'var(--msx-phos)', fontFamily: 'var(--msx-font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.done}</p> : null}
          </Panel>

          <p className="msx-note">{s.note}</p>
        </div>
      </div>
    </DisplayToolShell>
  );
}
