import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DisplayToolShell } from './DisplayToolShell';
import { Cell, Panel, Readout, ToolHead } from './InstrumentParts';
import { useI18n } from '../../i18n';

const L = {
  pt: {
    title: 'Teste de teclado',
    desc: 'Os atalhos do MonitorSmith ficam desligados durante o teste. Tab continua navegando até os botões, onde Enter e Espaço ativam a ação. Atalhos do navegador e do sistema podem interceptar teclas.',
    pressed: 'Teclas registradas', simultaneous: 'Simultâneas agora', maxSim: 'Máximo simultâneo',
    lastCode: 'Último code', lastKey: 'Último key', repeatGap: 'Intervalo de repetição',
    history: 'Histórico de eventos', reset: 'Limpar', back: 'Voltar às ferramentas',
    note: 'Teclas nunca acesas podem estar mortas, presas ou interceptadas pelo sistema (Print Screen, teclas de mídia e Fn costumam não chegar ao navegador).',
    legend: 'Cinza: não testada · Fósforo: pressionada agora · Contorno: já registrada',
  },
  en: {
    title: 'Keyboard test',
    desc: 'MonitorSmith shortcuts are disabled during the test. Tab still navigates to buttons, where Enter and Space activate the action. Browser and system shortcuts may intercept keys.',
    pressed: 'Keys registered', simultaneous: 'Simultaneous now', maxSim: 'Max simultaneous',
    lastCode: 'Last code', lastKey: 'Last key', repeatGap: 'Repeat interval',
    history: 'Event history', reset: 'Clear', back: 'Back to tools',
    note: 'Keys that never light up may be dead, stuck or intercepted by the OS (Print Screen, media keys and Fn often never reach the browser).',
    legend: 'Gray: untested · Phosphor: pressed now · Outline: already registered',
  },
  es: {
    title: 'Prueba de teclado',
    desc: 'Los atajos de MonitorSmith están desactivados durante la prueba. Tab sigue navegando a los botones, donde Intro y Espacio activan la acción. El navegador y el sistema pueden interceptar teclas.',
    pressed: 'Teclas registradas', simultaneous: 'Simultáneas ahora', maxSim: 'Máximo simultáneo',
    lastCode: 'Último code', lastKey: 'Último key', repeatGap: 'Intervalo de repetición',
    history: 'Historial de eventos', reset: 'Limpiar', back: 'Volver a las herramientas',
    note: 'Las teclas que nunca se encienden pueden estar muertas, atascadas o interceptadas por el sistema (Print Screen, teclas multimedia y Fn suelen no llegar al navegador).',
    legend: 'Gris: sin probar · Fósforo: pulsada ahora · Contorno: ya registrada',
  },
};

const ROWS = [
  [['Escape', 'Esc', 1.4], ['F1', 'F1'], ['F2', 'F2'], ['F3', 'F3'], ['F4', 'F4'], ['F5', 'F5'], ['F6', 'F6'], ['F7', 'F7'], ['F8', 'F8'], ['F9', 'F9'], ['F10', 'F10'], ['F11', 'F11'], ['F12', 'F12']],
  [['Backquote', '`'], ['Digit1', '1'], ['Digit2', '2'], ['Digit3', '3'], ['Digit4', '4'], ['Digit5', '5'], ['Digit6', '6'], ['Digit7', '7'], ['Digit8', '8'], ['Digit9', '9'], ['Digit0', '0'], ['Minus', '-'], ['Equal', '='], ['Backspace', '⌫', 2]],
  [['Tab', 'Tab', 1.6], ['KeyQ', 'Q'], ['KeyW', 'W'], ['KeyE', 'E'], ['KeyR', 'R'], ['KeyT', 'T'], ['KeyY', 'Y'], ['KeyU', 'U'], ['KeyI', 'I'], ['KeyO', 'O'], ['KeyP', 'P'], ['BracketLeft', '['], ['BracketRight', ']'], ['Backslash', '\\', 1.4]],
  [['CapsLock', 'Caps', 1.9], ['KeyA', 'A'], ['KeyS', 'S'], ['KeyD', 'D'], ['KeyF', 'F'], ['KeyG', 'G'], ['KeyH', 'H'], ['KeyJ', 'J'], ['KeyK', 'K'], ['KeyL', 'L'], ['Semicolon', ';'], ['Quote', "'"], ['Enter', '⏎', 2.1]],
  [['ShiftLeft', 'Shift', 2.4], ['KeyZ', 'Z'], ['KeyX', 'X'], ['KeyC', 'C'], ['KeyV', 'V'], ['KeyB', 'B'], ['KeyN', 'N'], ['KeyM', 'M'], ['Comma', ','], ['Period', '.'], ['Slash', '/'], ['ShiftRight', 'Shift', 2.6]],
  [['ControlLeft', 'Ctrl', 1.5], ['MetaLeft', 'Meta', 1.2], ['AltLeft', 'Alt', 1.2], ['Space', 'Space', 7], ['AltRight', 'Alt', 1.2], ['MetaRight', 'Meta', 1.2], ['ControlRight', 'Ctrl', 1.5]],
  [['ArrowLeft', '←'], ['ArrowUp', '↑'], ['ArrowDown', '↓'], ['ArrowRight', '→'], ['Insert', 'Ins'], ['Delete', 'Del'], ['Home', 'Home'], ['End', 'End'], ['PageUp', 'PgUp'], ['PageDown', 'PgDn']],
];

export default function KeyboardTestMode({ onExit }) {
  const { locale } = useI18n();
  const s = L[locale] || L.pt;
  const [active, setActive] = useState(() => new Set());
  const [seen, setSeen] = useState(() => new Set());
  const [last, setLast] = useState({ code: '—', key: '—' });
  const [gap, setGap] = useState(null);
  const [history, setHistory] = useState([]);
  const [maxSim, setMaxSim] = useState(0);
  const lastTimeRef = useRef(new Map());
  const activeRef = useRef(new Set());

  useEffect(() => {
    const onDown = (event) => {
      if (event.code === 'Escape') {
        event.preventDefault();
        onExit?.();
        return;
      }
      const buttonActivation = event.target.closest?.('button, a[href]') && (event.code === 'Space' || event.code === 'Enter');
      // Escape remains the product-wide way to leave a tool. Tab must keep its
      // native focus behavior; Enter/Space must still activate focused controls.
      if (!['Tab', 'Escape'].includes(event.code) && !buttonActivation) event.preventDefault();
      const now = performance.now();
      const code = event.code || event.key;
      const lastTime = lastTimeRef.current.get(code);
      if (event.repeat && lastTime !== undefined) setGap(now - lastTime);
      lastTimeRef.current.set(code, now);
      setLast({ code: event.code || '—', key: event.key === ' ' ? 'Space' : event.key });
      const next = new Set(activeRef.current).add(code);
      activeRef.current = next;
      setActive(next);
      setMaxSim((value) => Math.max(value, next.size));
      setSeen((current) => new Set(current).add(code));
      if (!event.repeat) {
        setHistory((current) => [`${event.code} · key="${event.key === ' ' ? 'Space' : event.key}"`, ...current].slice(0, 14));
      }
    };
    const onUp = (event) => {
      const code = event.code || event.key;
      const next = new Set(activeRef.current);
      next.delete(code);
      activeRef.current = next;
      lastTimeRef.current.delete(code);
      setActive(next);
    };
    const onBlur = () => {
      activeRef.current = new Set();
      lastTimeRef.current.clear();
      setActive(new Set());
    };

    window.addEventListener('keydown', onDown, true);
    window.addEventListener('keyup', onUp, true);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onDown, true);
      window.removeEventListener('keyup', onUp, true);
      window.removeEventListener('blur', onBlur);
    };
  }, [onExit]);

  const reset = useCallback(() => {
    activeRef.current = new Set();
    lastTimeRef.current.clear();
    setActive(new Set());
    setSeen(new Set());
    setHistory([]);
    setMaxSim(0);
    setGap(null);
    setLast({ code: '—', key: '—' });
  }, []);

  const keyboard = useMemo(() => ROWS.map((row, rowIndex) => (
    <div key={rowIndex} style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
      {row.map(([code, label, width = 1]) => {
        const isActive = active.has(code);
        const isSeen = seen.has(code);
        return (
          <span
            key={code}
            data-testid={`key-${code}`}
            style={{
              flex: `${width} 1 0`,
              minWidth: 0,
              padding: '10px 2px',
              border: `1px solid ${isActive ? 'var(--msx-phos)' : isSeen ? 'var(--msx-phos-line)' : 'var(--msx-hair)'}`,
              background: isActive ? 'var(--msx-phos)' : isSeen ? 'var(--msx-phos-soft)' : 'var(--msx-panel-2)',
              color: isActive ? 'var(--msx-phos-ink)' : 'var(--msx-ink-2)',
              fontFamily: 'var(--msx-font-mono)',
              fontSize: '0.66rem',
              textAlign: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              transition: 'background-color 40ms linear, border-color 40ms linear',
            }}
          >
            {label}
          </span>
        );
      })}
    </div>
  )), [active, seen]);

  return (
    <DisplayToolShell id="keyboard-test" title={s.title} className="msx-scrollable" visible={false} onExit={onExit}>
      <div className="msx-tool-body" data-ms-shortcuts-disabled="true">
        <ToolHead
          id="MS-21 / INPUT"
          title={s.title}
          description={s.desc}
          actions={(
            <>
              <button type="button" className="msx-btn" onClick={reset} data-testid="keyboard-reset">{s.reset}</button>
              <button type="button" className="msx-btn msx-btn--primary" onClick={onExit} data-testid="keyboard-back">{s.back}</button>
            </>
          )}
        />

        <div className="msx-stack">
          <Readout>
            <Cell label={s.pressed} value={String(seen.size)} phosphor />
            <Cell label={s.simultaneous} value={String(active.size)} />
            <Cell label={s.maxSim} value={String(maxSim)} />
            <Cell label={s.lastCode} value={last.code} />
            <Cell label={s.lastKey} value={last.key} />
            <Cell label={s.repeatGap} value={gap ? `${gap.toFixed(0)} ms` : '—'} />
          </Readout>

          <Panel>
            {keyboard}
            <p style={{ margin: '14px 0 0', color: 'var(--msx-ink-3)', fontFamily: 'var(--msx-font-mono)', fontSize: '0.66rem' }}>{s.legend}</p>
          </Panel>

          <Panel title={s.history}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {history.length === 0 ? <li style={{ color: 'var(--msx-ink-3)', fontFamily: 'var(--msx-font-mono)', fontSize: '0.78rem' }}>—</li> : null}
              {history.map((entry, index) => (
                <li key={`${index}-${entry}`} style={{ color: index === 0 ? 'var(--msx-phos)' : 'var(--msx-ink-2)', fontFamily: 'var(--msx-font-mono)', fontSize: '0.78rem' }}>{entry}</li>
              ))}
            </ul>
          </Panel>

          <p className="msx-note">{s.note}</p>
        </div>
      </div>
    </DisplayToolShell>
  );
}
