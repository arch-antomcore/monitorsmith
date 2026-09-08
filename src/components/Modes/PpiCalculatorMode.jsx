import { useState, useMemo } from 'react';
import { DisplayToolShell } from './DisplayToolShell';

const PRESETS = [
  { label: '24" 1080p', width: 1920, height: 1080, diagonal: 24 },
  { label: '27" 1440p (QHD)', width: 2560, height: 1440, diagonal: 27 },
  { label: '27" 4K UHD', width: 3840, height: 2160, diagonal: 27 },
  { label: '32" 4K UHD', width: 3840, height: 2160, diagonal: 32 },
  { label: '34" Ultrawide (UWQHD)', width: 3440, height: 1440, diagonal: 34 },
  { label: '49" Super Ultrawide', width: 5120, height: 1440, diagonal: 49 },
  { label: '14,2" 3024×1964', width: 3024, height: 1964, diagonal: 14.2 },
  { label: '16" Laptop 4K', width: 3840, height: 2400, diagonal: 16 },
  { label: '55" TV 4K', width: 3840, height: 2160, diagonal: 55 },
];

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

export default function PpiCalculatorMode({
  visible = true,
  showControls = true,
  onOpenHome,
  isFullscreen,
  onToggleFullscreen,
}) {
  const [width, setWidth] = useState(2560);
  const [height, setHeight] = useState(1440);
  const [diagonal, setDiagonal] = useState(27);
  const [copied, setCopied] = useState(false);

  const metrics = useMemo(() => {
    const w = Math.max(100, Number(width) || 1920);
    const h = Math.max(100, Number(height) || 1080);
    const d = Math.max(1, Number(diagonal) || 27);

    const diagonalPx = Math.sqrt(w * w + h * h);
    const ppi = diagonalPx / d;
    const dotPitchMm = 25.4 / ppi;
    const megapixels = (w * h) / 1000000;

    // Geometric reference: one arcminute (1/60 degree) per pixel.
    // Distance (cm) = (DotPitch in mm / (2 * tan(0.5 arcmin in rad))) / 10
    // Simplified: 8732 / PPI in cm
    const angularDistanceCm = Math.round(8732 / ppi);
    const angularDistanceInches = Math.round(3438 / ppi);

    const divisor = gcd(w, h);
    const aspectW = w / divisor;
    const aspectH = h / divisor;
    const isStandardAspect = (aspectW === 16 && aspectH === 9) || (aspectW === 16 && aspectH === 10) || (aspectW === 21 && aspectH === 9) || (aspectW === 32 && aspectH === 9);
    const aspectLabel = isStandardAspect ? `${aspectW}:${aspectH}` : `${(w / h).toFixed(2)}:1 (${w}×${h})`;

    let recommendedScaling;
    let densityCategory;
    if (ppi < 95) {
      recommendedScaling = '100% (Nativo)';
      densityCategory = 'Baixa densidade; a malha pode ficar visível a curta distância';
    } else if (ppi < 125) {
      recommendedScaling = '100% (Nativo)';
      densityCategory = 'Faixa comum em monitores desktop';
    } else if (ppi < 165) {
      recommendedScaling = '125% – 150%';
      densityCategory = 'Alta densidade; a escala pode melhorar a legibilidade';
    } else if (ppi < 220) {
      recommendedScaling = '150% – 175%';
      densityCategory = 'Densidade muito alta; avalie a escala conforme tamanho e distância';
    } else {
      recommendedScaling = '200% (ponto de partida)';
      densityCategory = 'Densidade muito alta; percepção depende da distância e da visão';
    }

    return {
      w,
      h,
      d,
      ppi: ppi.toFixed(2),
      rawPpi: ppi,
      dotPitchMm: dotPitchMm.toFixed(4),
      megapixels: megapixels.toFixed(2),
      aspectLabel,
      angularDistanceCm,
      angularDistanceInches,
      recommendedScaling,
      densityCategory,
    };
  }, [width, height, diagonal]);

  const handleApplyPreset = (preset) => {
    setWidth(preset.width);
    setHeight(preset.height);
    setDiagonal(preset.diagonal);
  };

  const handleCopy = () => {
    const text = `Especificações de Display MonitorSmith:
- Resolução: ${metrics.w} × ${metrics.h} (${metrics.aspectLabel})
- Diagonal: ${metrics.d}"
- Densidade: ${metrics.ppi} PPI
- Tamanho do Ponto (Dot Pitch): ${metrics.dotPitchMm} mm
- Resolução Total: ${metrics.megapixels} MP
- Distância de Referência Angular (1 arco-minuto): ${metrics.angularDistanceCm} cm (${metrics.angularDistanceInches}")
- Escala de SO Sugerida como ponto de partida: ${metrics.recommendedScaling}
Calculado em https://monitorsmith.app/`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }).catch(() => {});
    }
  };

  return (
    <DisplayToolShell
      id="ppi-calculator"
      title="Calculadora de PPI e Referência Angular"
      subtitle="Densidade de pixels, dot pitch e referência geométrica de um minuto de arco"
      instructions="Ajuste a resolução e a diagonal do display para calcular a densidade e a distância aproximada em que um pixel subtende um minuto de arco."
      technicalLimit="O limiar de um minuto de arco é uma referência geométrica, não uma distância ideal nem uma previsão individual; visão, contraste, conteúdo e escala do sistema alteram a percepção."
      className="bg-[#050508] text-white select-none"
      visible={visible && showControls}
      onOpenHome={onOpenHome}
      isFullscreen={isFullscreen}
      onToggleFullscreen={onToggleFullscreen}
    >
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Presets Grid */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-2.5">
            Presets Populares de Mercado
          </label>
          <div className="flex flex-wrap gap-3">
            {PRESETS.map((p) => {
              const isSelected = width === p.width && height === p.height && diagonal === p.diagonal;
              return (
                <button
                  aria-pressed={isSelected}
                  key={p.label}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className={`min-h-[32px] px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-black font-semibold shadow-lg shadow-amber-500/20'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5">
          <div>
            <label htmlFor="ppi-input-width" className="block text-xs font-mono uppercase tracking-wider text-amber-400/80 mb-1.5">
              Largura (Pixels)
            </label>
            <input
              id="ppi-input-width"
              type="number"
              aria-label="Largura em pixels"
              min="100"
              max="16000"
              step="1"
              value={width}
              onChange={(e) => setWidth(Math.min(16000, Math.max(100, parseInt(e.target.value, 10) || 100)))}
              className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-mono text-lg focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="ppi-input-height" className="block text-xs font-mono uppercase tracking-wider text-amber-400/80 mb-1.5">
              Altura (Pixels)
            </label>
            <input
              id="ppi-input-height"
              type="number"
              aria-label="Altura em pixels"
              min="100"
              max="16000"
              step="1"
              value={height}
              onChange={(e) => setHeight(Math.min(16000, Math.max(100, parseInt(e.target.value, 10) || 100)))}
              className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-mono text-lg focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="ppi-input-diagonal" className="block text-xs font-mono uppercase tracking-wider text-amber-400/80 mb-1.5">
              Diagonal (Polegadas)
            </label>
            <input
              id="ppi-input-diagonal"
              type="number"
              aria-label="Diagonal em polegadas"
              min="1"
              max="200"
              step="0.1"
              value={diagonal}
              onChange={(e) => setDiagonal(Math.min(200, Math.max(1, parseFloat(e.target.value) || 1)))}
              className="w-full bg-black/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-mono text-lg focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Results Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* PPI Card */}
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/30 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-amber-400/90 tracking-wider">Densidade (PPI)</span>
            <div className="my-2">
              <span className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight">{metrics.ppi}</span>
              <span className="text-xs text-white/50 ml-1.5">px/pol</span>
            </div>
            <span className="text-[11px] text-white/60 leading-snug">{metrics.densityCategory}</span>
          </div>

          {/* Dot Pitch Card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-white/60 tracking-wider">Tamanho do Ponto</span>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">{metrics.dotPitchMm}</span>
              <span className="text-xs text-white/50 ml-1.5">mm</span>
            </div>
            <span className="text-[11px] text-white/50 leading-snug">Distância entre centros de pixels adjacentes</span>
          </div>

          {/* Angular reference distance card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-white/60 tracking-wider">Referência angular</span>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">{metrics.angularDistanceCm}</span>
              <span className="text-xs text-white/50 ml-1.5">cm ({metrics.angularDistanceInches}")</span>
            </div>
            <span className="text-[11px] text-white/50 leading-snug">Distância aproximada para 1 pixel subtender 1 minuto de arco</span>
          </div>

          {/* Recommended Scaling Card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-white/60 tracking-wider">Escala do SO</span>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 tracking-tight">{metrics.recommendedScaling}</span>
            </div>
            <span className="text-[11px] text-white/50 leading-snug">Ponto de partida; ajuste por tamanho, distância e preferência</span>
          </div>
        </div>

        {/* Technical Explanation & Subpixel Simulation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 text-xs text-white/70 space-y-3">
            <h4 className="font-semibold text-white text-sm flex items-center gap-2">
              <span>📐</span> O que é a referência angular?
            </h4>
            <p className="leading-relaxed">
              Um minuto de arco equivale a <strong>1/60 de grau</strong>. A calculadora usa esse ângulo como uma convenção geométrica para comparar tamanhos de pixel e distâncias.
            </p>
            <p className="leading-relaxed">
              A cerca de <strong>{metrics.angularDistanceCm} cm</strong>, cada pixel de <strong>{metrics.dotPitchMm} mm</strong> subtende aproximadamente 1 minuto de arco. Isso é uma referência matemática; não garante que uma pessoa deixe de perceber a estrutura do painel.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm flex items-center gap-2 mb-2">
                <span>🖥️</span> Resumo do Display
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-white/70">
                <div>Proporção: <strong className="text-white">{metrics.aspectLabel}</strong></div>
                <div>Resolução Total: <strong className="text-white">{metrics.megapixels} MP</strong></div>
                <div>Largura: <strong className="text-white">{metrics.w} px</strong></div>
                <div>Altura: <strong className="text-white">{metrics.h} px</strong></div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/40 text-white hover:text-amber-300 font-medium text-xs transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <span className="text-emerald-400">✓</span> Relatório Copiado com Sucesso!
                </>
              ) : (
                <>
                  <span>📋</span> Copiar Relatório Técnico de Densidade
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </DisplayToolShell>
  );
}
