import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DisplayToolShell } from './DisplayToolShell';
import { Cell, Panel, Readout, ToolHead } from './InstrumentParts';
import { useI18n } from '../../i18n';

const L = {
  pt: {
    title: 'Ficha técnica do display',
    desc: 'Tudo o que o navegador consegue afirmar sobre a sua tela e a GPU que a alimenta. Nada é enviado para fora do dispositivo.',
    logical: 'Resolução lógica', physical: 'Pixels estimados', dpr: 'Densidade (DPR)',
    viewport: 'Área da janela', depth: 'Profundidade de cor', gamut: 'Gamut suportado',
    hdr: 'Faixa dinâmica', orientation: 'Orientação', touch: 'Pontos de toque',
    gpu: 'GPU ativa', vendor: 'Fabricante', cores: 'Núcleos lógicos', memory: 'Memória estimada',
    platform: 'Plataforma', extended: 'Múltiplos monitores', hz: 'Cadência do navegador',
    scaling: 'Razão efetiva', unknown: 'Indisponível', yes: 'Sim', no: 'Não',
    sysBlock: 'Sistema e GPU', screenBlock: 'Painel e sinal',
    hint: 'Pixels estimados = resolução lógica × devicePixelRatio. Zoom e escala do sistema afetam esse valor; ele não confirma a resolução nativa do painel. A cadência de callbacks não certifica os hertz físicos da tela.',
    copy: 'Copiar ficha', copied: 'Ficha copiada',
  },
  en: {
    title: 'Display fact sheet',
    desc: 'Everything the browser can assert about your screen and the GPU driving it. Nothing leaves the device.',
    logical: 'Logical resolution', physical: 'Estimated pixels', dpr: 'Pixel ratio (DPR)',
    viewport: 'Viewport area', depth: 'Color depth', gamut: 'Supported gamut',
    hdr: 'Dynamic range', orientation: 'Orientation', touch: 'Touch points',
    gpu: 'Active GPU', vendor: 'Vendor', cores: 'Logical cores', memory: 'Estimated memory',
    platform: 'Platform', extended: 'Multiple displays', hz: 'Browser cadence',
    scaling: 'Effective ratio', unknown: 'Unavailable', yes: 'Yes', no: 'No',
    sysBlock: 'System and GPU', screenBlock: 'Panel and signal',
    hint: 'Estimated pixels = logical resolution × devicePixelRatio. Zoom and system scaling affect this value; it does not confirm native panel resolution. Callback cadence does not certify physical display hertz.',
    copy: 'Copy fact sheet', copied: 'Fact sheet copied',
  },
  es: {
    title: 'Ficha técnica de la pantalla',
    desc: 'Todo lo que el navegador puede afirmar sobre tu pantalla y la GPU que la alimenta. Nada sale del dispositivo.',
    logical: 'Resolución lógica', physical: 'Píxeles estimados', dpr: 'Densidad (DPR)',
    viewport: 'Área de la ventana', depth: 'Profundidad de color', gamut: 'Gamut soportado',
    hdr: 'Rango dinámico', orientation: 'Orientación', touch: 'Puntos táctiles',
    gpu: 'GPU activa', vendor: 'Fabricante', cores: 'Núcleos lógicos', memory: 'Memoria estimada',
    platform: 'Plataforma', extended: 'Varias pantallas', hz: 'Cadencia del navegador',
    scaling: 'Relación efectiva', unknown: 'No disponible', yes: 'Sí', no: 'No',
    sysBlock: 'Sistema y GPU', screenBlock: 'Panel y señal',
    hint: 'Píxeles estimados = resolución lógica × devicePixelRatio. El zoom y la escala del sistema afectan al valor; no confirma la resolución nativa del panel. La cadencia de callbacks no certifica los hercios físicos.',
    copy: 'Copiar ficha', copied: 'Ficha copiada',
  },
};

function readGpu() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return { renderer: null, vendor: null };
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const result = {
      renderer: info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
      vendor: info ? gl.getParameter(info.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR),
    };
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return result;
  } catch {
    return { renderer: null, vendor: null };
  }
}

function readGamut() {
  if (typeof matchMedia !== 'function') return null;
  if (matchMedia('(color-gamut: rec2020)').matches) return 'Rec. 2020';
  if (matchMedia('(color-gamut: p3)').matches) return 'Display-P3';
  if (matchMedia('(color-gamut: srgb)').matches) return 'sRGB';
  return null;
}

export default function DisplayInfoMode({ onExit }) {
  const { locale } = useI18n();
  const s = L[locale] || L.pt;
  const [hz, setHz] = useState(null);
  const [copied, setCopied] = useState(false);
  const [screenRevision, setScreenRevision] = useState(0);
  const copyTimerRef = useRef(0);

  const gpu = useMemo(() => readGpu(), []);

  const facts = (() => {
    const dpr = window.devicePixelRatio || 1;
    const dyn = typeof matchMedia === 'function' && matchMedia('(dynamic-range: high)').matches;
    return {
      logical: `${screen.width} × ${screen.height}`,
      physical: `${Math.round(screen.width * dpr)} × ${Math.round(screen.height * dpr)}`,
      dpr: dpr.toFixed(2),
      scaling: `${Math.round(dpr * 100)}%`,
      viewport: `${window.innerWidth} × ${window.innerHeight}`,
      depth: `${screen.colorDepth} bits`,
      gamut: readGamut() || s.unknown,
      hdr: dyn ? 'HDR / high' : 'SDR / standard',
      orientation: screen.orientation?.type || s.unknown,
      touch: String(navigator.maxTouchPoints ?? 0),
      cores: String(navigator.hardwareConcurrency || '—'),
      memory: navigator.deviceMemory ? `≈ ${navigator.deviceMemory} GB` : s.unknown,
      platform: navigator.userAgentData?.platform || navigator.platform || s.unknown,
      extended: screen.isExtended === undefined ? s.unknown : screen.isExtended ? s.yes : s.no,
    };
  })();

  useEffect(() => {
    const refresh = () => setScreenRevision((value) => value + 1);
    const queries = ['(color-gamut: p3)', '(color-gamut: rec2020)', '(dynamic-range: high)', `(resolution: ${window.devicePixelRatio || 1}dppx)`].map((query) => window.matchMedia(query));
    queries.forEach((query) => query.addEventListener('change', refresh));
    window.addEventListener('resize', refresh);
    screen.orientation?.addEventListener('change', refresh);
    return () => {
      queries.forEach((query) => query.removeEventListener('change', refresh));
      window.removeEventListener('resize', refresh);
      screen.orientation?.removeEventListener('change', refresh);
    };
  }, [screenRevision]);

  useEffect(() => {
    let frames = 0;
    let raf = 0;
    let start = null;
    const restart = () => { start = null; frames = 0; };
    const tick = (now) => {
      if (document.hidden) restart();
      if (start === null) {
        start = now;
        raf = requestAnimationFrame(tick);
        return;
      }
      frames += 1;
      const elapsed = now - start;
      if (elapsed >= 1200) {
        setHz(Math.round((frames / elapsed) * 1000));
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    document.addEventListener('visibilitychange', restart);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', restart);
    };
  }, [screenRevision]);

  useEffect(() => () => clearTimeout(copyTimerRef.current), []);

  const handleCopy = useCallback(() => {
    const lines = [
      `MonitorSmith — ${s.title}`,
      `${s.logical}: ${facts.logical}`,
      `${s.physical}: ${facts.physical}`,
      `${s.dpr}: ${facts.dpr} (${facts.scaling})`,
      `${s.viewport}: ${facts.viewport}`,
      `${s.depth}: ${facts.depth}`,
      `${s.gamut}: ${facts.gamut}`,
      `${s.hdr}: ${facts.hdr}`,
      `${s.hz}: ${hz ? `${hz} Hz` : '—'}`,
      `${s.gpu}: ${gpu.renderer || s.unknown}`,
      `${s.vendor}: ${gpu.vendor || s.unknown}`,
      `${s.cores}: ${facts.cores}`,
      `${s.platform}: ${facts.platform}`,
      'https://monitorsmith.app/',
    ].join('\n');
    navigator.clipboard?.writeText(lines).then(() => {
      setCopied(true);
      clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2400);
    }).catch(() => {});
  }, [facts, gpu, hz, s]);

  return (
    <DisplayToolShell
      id="display-info"
      title={s.title}
      className="msx-scrollable"
      visible={false}
      onExit={onExit}
    >
      <div className="msx-tool-body">
        <ToolHead
          id="MS-15 / SPEC"
          title={s.title}
          description={s.desc}
          actions={(
            <button type="button" className="msx-btn" onClick={handleCopy} data-testid="display-info-copy">
              {copied ? s.copied : s.copy}
            </button>
          )}
        />

        <div className="msx-stack">
          <Panel title={s.screenBlock}>
            <Readout>
              <Cell label={s.logical} value={facts.logical} />
              <Cell label={s.physical} value={facts.physical} phosphor />
              <Cell label={s.dpr} value={facts.dpr} hint={`${s.scaling}: ${facts.scaling}`} />
              <Cell label={s.viewport} value={facts.viewport} />
              <Cell label={s.depth} value={facts.depth} />
              <Cell label={s.gamut} value={facts.gamut} phosphor />
              <Cell label={s.hdr} value={facts.hdr} />
              <Cell label={s.hz} value={hz ? `${hz} Hz` : '…'} phosphor />
            </Readout>
          </Panel>

          <Panel title={s.sysBlock}>
            <Readout>
              <Cell label={s.gpu} value={gpu.renderer ? String(gpu.renderer).slice(0, 34) : s.unknown} hint={gpu.renderer ? String(gpu.renderer) : undefined} />
              <Cell label={s.vendor} value={gpu.vendor ? String(gpu.vendor).slice(0, 24) : s.unknown} />
              <Cell label={s.cores} value={facts.cores} />
              <Cell label={s.memory} value={facts.memory} />
              <Cell label={s.platform} value={facts.platform} />
              <Cell label={s.orientation} value={facts.orientation} />
              <Cell label={s.touch} value={facts.touch} />
              <Cell label={s.extended} value={facts.extended} />
            </Readout>
          </Panel>

          <p className="msx-note">{s.hint}</p>
        </div>
      </div>
    </DisplayToolShell>
  );
}
