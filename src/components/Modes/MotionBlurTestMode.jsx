import { useCallback, useEffect, useRef, useState } from 'react';
import { DisplayToolShell } from './DisplayToolShell';

const SPEED_PRESETS = [
  { label: '240 px/s (Lento)', value: 240 },
  { label: '480 px/s (Padrão)', value: 480 },
  { label: '960 px/s (Rápido)', value: 960 },
  { label: '1440 px/s (Alto)', value: 1440 },
  { label: '1920 px/s (Extremo)', value: 1920 },
];

const PATTERNS = [
  { id: 'ufo', label: 'Blocos de Alto Contraste (GtG)' },
  { id: 'text', label: 'Texto em Movimento (Legibilidade)' },
  { id: 'lines', label: 'Linhas Finas de Retícula (MPRT)' },
  { id: 'va-dark', label: 'Transição Escura (Black Smearing)' },
];

export default function MotionBlurTestMode({
  visible = true,
  onOpenHome,
  isFullscreen,
  onToggleFullscreen,
}) {
  const canvasRef = useRef(null);
  const [speed, setSpeed] = useState(960);
  const [pattern, setPattern] = useState('ufo');
  const [isPlaying, setIsPlaying] = useState(true);
  const [fps, setFps] = useState(60);
  const [frameTimeJitter, setFrameTimeJitter] = useState(0);

  const stateRef = useRef({
    pos: 0,
    lastTime: 0,
    speed: 960,
    pattern: 'ufo',
    isPlaying: true,
    frameCount: 0,
    lastFpsUpdate: 0,
    frameTimes: [],
  });

  useEffect(() => {
    stateRef.current.speed = speed;
    stateRef.current.pattern = pattern;
    stateRef.current.isPlaying = isPlaying;
  }, [speed, pattern, isPlaying]);

  const drawFrame = useCallback((ctx, width, height, posX) => {
    ctx.clearRect(0, 0, width, height);

    // Background tracks
    const trackHeight = Math.floor(height / 3);

    // Track 1: Dark background (#111318)
    ctx.fillStyle = '#111318';
    ctx.fillRect(0, 0, width, trackHeight);

    // Track 2: Medium gray background (#3a3f4d)
    ctx.fillStyle = '#3a3f4d';
    ctx.fillRect(0, trackHeight, width, trackHeight);

    // Track 3: Light gray background (#9aa0b0)
    ctx.fillStyle = '#9aa0b0';
    ctx.fillRect(0, trackHeight * 2, width, height - trackHeight * 2);

    // Track dividers
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, trackHeight);
    ctx.lineTo(width, trackHeight);
    ctx.moveTo(0, trackHeight * 2);
    ctx.lineTo(width, trackHeight * 2);
    ctx.stroke();

    const normalizedPos = ((posX % (width + 200)) + (width + 200)) % (width + 200) - 100;

    const currentPattern = stateRef.current.pattern;

    for (let track = 0; track < 3; track++) {
      const centerY = track * trackHeight + trackHeight / 2;

      if (currentPattern === 'ufo') {
        // High Contrast Block (UFO Style)
        const blockW = 80;
        const blockH = 44;
        const blockX = normalizedPos - blockW / 2;
        const blockY = centerY - blockH / 2;

        // Outer glow/stroke for overshoot detection
        ctx.fillStyle = track === 0 ? '#38bdf8' : track === 1 ? '#fbbf24' : '#f43f5e';
        ctx.fillRect(blockX, blockY, blockW, blockH);

        // Inner core
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(blockX + 12, blockY + 8, blockW - 24, blockH - 16);

        // Center pursuit sync line
        ctx.fillStyle = '#000000';
        ctx.fillRect(blockX + blockW / 2 - 2, blockY, 4, blockH);
      } else if (currentPattern === 'text') {
        // Text Readability Test
        ctx.fillStyle = track === 2 ? '#000000' : '#ffffff';
        ctx.font = 'bold 22px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('MonitorSmith 240Hz Response Test', normalizedPos, centerY - 10);
        ctx.font = '13px monospace';
        ctx.fillText('1234567890 ABCDEF GtG / MPRT', normalizedPos, centerY + 16);
      } else if (currentPattern === 'lines') {
        // Fine 1px / 2px Grid Lines
        ctx.strokeStyle = track === 2 ? '#000000' : '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = -40; i <= 40; i += 8) {
          ctx.moveTo(normalizedPos + i, centerY - 25);
          ctx.lineTo(normalizedPos + i, centerY + 25);
        }
        ctx.stroke();
      } else if (currentPattern === 'va-dark') {
        // Extreme Dark-to-Gray VA Smearing Transition
        const blockW = 90;
        const blockH = 50;
        const blockX = normalizedPos - blockW / 2;
        const blockY = centerY - blockH / 2;

        ctx.fillStyle = '#000000';
        ctx.fillRect(blockX, blockY, blockW, blockH);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeRect(blockX, blockY, blockW, blockH);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('0% BLACK', normalizedPos, centerY);
      }
    }
  }, []);

  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let resizeObserver;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(300, Math.floor(rect.width * dpr));
      canvas.height = Math.max(200, Math.floor(rect.height * dpr));
      ctx.scale(dpr, dpr);
    };

    handleResize();

    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(canvas);
    }

    const render = (now) => {
      const state = stateRef.current;
      if (!state.lastTime) state.lastTime = now;
      const deltaSec = Math.min(0.1, (now - state.lastTime) / 1000);
      state.lastTime = now;

      if (state.isPlaying) {
        state.pos += state.speed * deltaSec;
      }

      state.frameCount++;
      state.frameTimes.push(deltaSec * 1000);
      if (state.frameTimes.length > 30) state.frameTimes.shift();

      if (now - state.lastFpsUpdate >= 500) {
        const measuredFps = Math.round((state.frameCount * 1000) / (now - state.lastFpsUpdate));
        setFps(measuredFps);
        state.frameCount = 0;
        state.lastFpsUpdate = now;

        if (state.frameTimes.length > 1) {
          const avg = state.frameTimes.reduce((a, b) => a + b, 0) / state.frameTimes.length;
          const variance = state.frameTimes.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / state.frameTimes.length;
          setFrameTimeJitter(Math.sqrt(variance).toFixed(2));
        }
      }

      const rect = canvas.getBoundingClientRect();
      drawFrame(ctx, rect.width, rect.height, state.pos);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [drawFrame]);

  return (
    <DisplayToolShell
      id="motion-blur"
      title="Teste de Ghosting e Motion Blur (UFO Motion)"
      subtitle="Avaliação de tempo de resposta GtG, MPRT, overshoot e sincronização VSync"
      instructions="Acompanhe os objetos em movimento com os olhos ou com a câmera em modo perseguição (pursuit camera) para identificar rastros de desfoque (ghosting), coronas claras de overdrive excessivo (overshoot) ou borrão de transição escura em painéis VA (black smearing)."
      technicalLimit="A precisão do teste visual depende da taxa de atualização real do seu monitor (60Hz, 120Hz, 144Hz, 240Hz+) e da sincronização estrita de quadros no navegador."
      className="bg-[#050508] text-white select-none"
      visible={visible}
      onOpenHome={onOpenHome}
      isFullscreen={isFullscreen}
      onToggleFullscreen={onToggleFullscreen}
    >
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Canvas Display Stage */}
        <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{ width: '100%', height: '100%' }}
          />

          {/* Realtime Telemetry Overlay Badge */}
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-white/15 rounded-xl px-3.5 py-2 flex items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-white/50 text-[10px] block">TAXA REAL</span>
              <span className="text-emerald-400 font-bold text-base">{fps} FPS</span>
            </div>
            <div className="h-6 w-px bg-white/15" />
            <div>
              <span className="text-white/50 text-[10px] block">JITTER VSYNC</span>
              <span className="text-amber-400 font-semibold">{frameTimeJitter} ms</span>
            </div>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pattern Selector */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3">
            <label className="block text-xs font-mono uppercase tracking-wider text-amber-400/90">
              Padrão de Análise Visual
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PATTERNS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPattern(p.id)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                    pattern === p.id
                      ? 'bg-amber-500 text-black font-semibold shadow-lg shadow-amber-500/20'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Speed & Playback Controls */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono uppercase tracking-wider text-amber-400/90">
                Velocidade de Movimento ({speed} px/s)
              </label>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 font-mono transition-colors"
              >
                {isPlaying ? '⏸ Pausar' : '▶ Reproduzir'}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {SPEED_PRESETS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setSpeed(s.value)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    speed === s.value
                      ? 'bg-amber-500 text-black font-semibold'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Guide: How to Read the Test */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-white/70">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 space-y-2">
            <h4 className="font-semibold text-white text-sm flex items-center gap-1.5">
              <span>👻</span> Ghosting Normal
            </h4>
            <p className="leading-relaxed">
              Um rastro suave da mesma cor que segue o objeto. Ocorre quando o tempo de resposta do pixel (GtG) é mais lento que o tempo de quadro (ex: painéis VA em transições escuras).
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 space-y-2">
            <h4 className="font-semibold text-white text-sm flex items-center gap-1.5">
              <span>⚡</span> Overshoot (Inverse Ghosting)
            </h4>
            <p className="leading-relaxed">
              Um rastro luminoso ou brilhante que precede ou segue o objeto. É causado por <em>overdrive</em> excessivo no monitor. Se visível, reduza o nível de overdrive no menu OSD.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 space-y-2">
            <h4 className="font-semibold text-white text-sm flex items-center gap-1.5">
              <span>👁️</span> MPRT (Motion Blur do Olho)
            </h4>
            <p className="leading-relaxed">
              Desfoque natural causado pelo rastreamento contínuo dos olhos sobre pixels que permanecem acesos durante todo o quadro (<em>sample-and-hold</em>). Reduz-se aumentando os Hz ou usando BFI/Strobe.
            </p>
          </div>
        </div>
      </div>
    </DisplayToolShell>
  );
}
