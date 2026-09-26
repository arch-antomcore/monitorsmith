import { useCallback, useEffect, useRef, useState } from 'react';
import { DisplayToolShell } from './DisplayToolShell';
import { Cell, Panel, Readout, ToolHead } from './InstrumentParts';
import { useI18n } from '../../i18n';
import { createFrameSampler } from './frameSampling';

const L = {
  pt: {
    title: 'Medidor de Hz e frame time',
    desc: 'Estimamos a cadência de callbacks do navegador. Feche outras abas pesadas e deixe rodar por alguns segundos para o valor estabilizar.',
    live: 'Hz instantâneo', avg: 'Hz médio', frame: 'Frame time médio', jitter: 'Jitter (desvio)',
    worst: 'Maior intervalo', frames: 'Intervalos amostrados', dropped: 'Intervalos longos', elapsed: 'Tempo de amostra',
    graph: 'Histórico de frame time (últimos 180 quadros)',
    verdictTitle: 'Leitura',
    stable: 'Cadência estável: o desvio está abaixo de 15% do intervalo médio.',
    unstable: 'Cadência irregular: há variação alta entre callbacks. Esta leitura, sozinha, não identifica a causa.',
    start: 'Medir', stop: 'Pausar', reset: 'Zerar',
    note: 'requestAnimationFrame não mede os hertz físicos do painel, VRR ou quadros realmente exibidos. Intervalos longos excedem 1,8 vez a média anterior; pausas e tempo com a aba oculta ficam fora da amostra.',
  },
  en: {
    title: 'Hz and frame time meter',
    desc: 'We estimate browser callback cadence. Close other heavy tabs and let it run a few seconds until the value settles.',
    live: 'Instant Hz', avg: 'Average Hz', frame: 'Average frame time', jitter: 'Jitter (deviation)',
    worst: 'Longest interval', frames: 'Sampled intervals', dropped: 'Long intervals', elapsed: 'Sample time',
    graph: 'Frame time history (last 180 frames)',
    verdictTitle: 'Reading',
    stable: 'Stable cadence: deviation stays below 15% of the mean interval.',
    unstable: 'Irregular cadence: callback intervals vary considerably. This reading alone cannot identify the cause.',
    start: 'Measure', stop: 'Pause', reset: 'Clear',
    note: 'requestAnimationFrame does not measure physical panel hertz, VRR or presented frames. Long intervals exceed 1.8 times the previous mean; pauses and hidden-tab time are excluded.',
  },
  es: {
    title: 'Medidor de Hz y frame time',
    desc: 'Estimamos la cadencia de callbacks del navegador. Cierra otras pestañas pesadas y déjalo unos segundos hasta que el valor se estabilice.',
    live: 'Hz instantáneo', avg: 'Hz medio', frame: 'Frame time medio', jitter: 'Jitter (desviación)',
    worst: 'Mayor intervalo', frames: 'Intervalos medidos', dropped: 'Intervalos largos', elapsed: 'Tiempo de muestra',
    graph: 'Historial de frame time (últimos 180 fotogramas)',
    verdictTitle: 'Lectura',
    stable: 'Cadencia estable: la desviación queda por debajo del 15% del intervalo medio.',
    unstable: 'Cadencia irregular: los intervalos entre callbacks varían mucho. Esta lectura por sí sola no identifica la causa.',
    start: 'Medir', stop: 'Pausar', reset: 'Reiniciar',
    note: 'requestAnimationFrame no mide los hercios físicos del panel, VRR ni los fotogramas mostrados. Los intervalos largos superan 1,8 veces la media anterior; se excluyen pausas y tiempo con la pestaña oculta.',
  },
};

const HISTORY = 180;

export default function RefreshRateMode({ onExit }) {
  const { locale } = useI18n();
  const s = L[locale] || L.pt;
  const [running, setRunning] = useState(true);
  const [stats, setStats] = useState({ live: 0, avg: 0, frame: 0, jitter: 0, worst: 0, frames: 0, dropped: 0, elapsed: 0 });
  const historyRef = useRef([]);
  const canvasRef = useRef(null);
  const stateRef = useRef(createFrameSampler());

  const reset = useCallback(() => {
    historyRef.current = [];
    stateRef.current = createFrameSampler();
    setStats({ live: 0, avg: 0, frame: 0, jitter: 0, worst: 0, frames: 0, dropped: 0, elapsed: 0 });
  }, []);

  useEffect(() => {
    if (!running) return undefined;
    let raf = 0;
    const step = (now) => {
      const sample = document.hidden ? null : stateRef.current.sample(now);
      if (sample) {
        historyRef.current.push(sample.delta);
        if (historyRef.current.length > HISTORY) historyRef.current.shift();
        if (sample.stats) setStats(sample.stats);
      }
      raf = requestAnimationFrame(step);
    };
    const skipGap = () => stateRef.current.pause();
    document.addEventListener('visibilitychange', skipGap);
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      stateRef.current.pause();
      document.removeEventListener('visibilitychange', skipGap);
    };
  }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    let raf = 0;
    const draw = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const data = historyRef.current;
      const max = Math.max(24, ...data) * 1.1;

      ctx.strokeStyle = 'rgba(255,255,255,0.07)';
      ctx.lineWidth = 1;
      for (let i = 1; i < 4; i += 1) {
        const y = (h / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (data.length > 1) {
        ctx.beginPath();
        data.forEach((value, index) => {
          const x = (index / (HISTORY - 1)) * w;
          const y = h - (value / max) * h;
          if (index === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = '#ffb020';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  const isStable = stats.frame > 0 && stats.jitter < stats.frame * 0.15;

  return (
    <DisplayToolShell id="refresh-rate" title={s.title} className="msx-scrollable" visible={false} onExit={onExit}>
      <div className="msx-tool-body">
        <ToolHead
          id="MS-16 / SYNC"
          title={s.title}
          description={s.desc}
          actions={(
            <>
              <button type="button" className="msx-btn msx-btn--primary" onClick={() => setRunning((value) => !value)} data-testid="hz-toggle">
                {running ? s.stop : s.start}
              </button>
              <button type="button" className="msx-btn" onClick={reset} data-testid="hz-reset">{s.reset}</button>
            </>
          )}
        />

        <div className="msx-stack">
          <Readout>
            <Cell label={s.live} value={stats.live ? `${stats.live.toFixed(1)} Hz` : '…'} phosphor />
            <Cell label={s.avg} value={stats.avg ? `${stats.avg.toFixed(2)} Hz` : '…'} />
            <Cell label={s.frame} value={stats.frame ? `${stats.frame.toFixed(2)} ms` : '…'} />
            <Cell label={s.jitter} value={stats.frames ? `${stats.jitter.toFixed(2)} ms` : '…'} />
            <Cell label={s.worst} value={stats.worst ? `${stats.worst.toFixed(1)} ms` : '…'} />
            <Cell label={s.frames} value={String(stats.frames)} />
            <Cell label={s.dropped} value={String(stats.dropped)} />
            <Cell label={s.elapsed} value={`${stats.elapsed.toFixed(1)} s`} />
          </Readout>

          <Panel title={s.graph}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '160px', display: 'block' }} aria-hidden="true" />
          </Panel>

          <Panel title={s.verdictTitle}>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--msx-ink-2)' }}>
              {stats.frames > 60 ? (isStable ? s.stable : s.unstable) : '…'}
            </p>
          </Panel>

          <p className="msx-note">{s.note}</p>
        </div>
      </div>
    </DisplayToolShell>
  );
}
