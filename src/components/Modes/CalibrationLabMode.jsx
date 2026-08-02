import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";

const classNames = (...names) => names.filter(Boolean).join(" ");
const isFiniteBoolean = (value) => typeof value === "boolean";

const GRAYSCALE_STEPS = Array.from({ length: 17 }, (_, index) => {
  const value = Math.round((index / 16) * 255);
  return {
    id: `gray-${value}`,
    label: `${Math.round((index / 16) * 100)}%`,
    value,
  };
});

const RGB_CHANNELS = [
  { id: "red", label: "Vermelho", color: "#FF0000" },
  { id: "green", label: "Verde", color: "#00FF00" },
  { id: "blue", label: "Azul", color: "#0000FF" },
];



const CALIBRATION_PATTERNS = [
  {
    id: "grayscale",
    label: "Escala de cinza",
    instruction: "Compare os 17 níveis discretos do preto ao branco e observe cortes, dominantes de cor ou níveis difíceis de distinguir.",
  },
  {
    id: "near-black",
    label: "Uniformidade 5%",
    instruction: "Compare visualmente cinco níveis escuros. Ambiente, brilho, perfil de cor e compressão do navegador influenciam o resultado.",
  },
  {
    id: "smpte-bars",
    label: "Barras de cor",
    instruction: "Aproximação em CSS inspirada em barras broadcast para comparação visual. Não é um sinal SMPTE certificado nem substitui um gerador de referência.",
  },
  {
    id: "retention-burnin",
    label: "Persistência estática",
    instruction: "Observe o campo cinza uniforme em busca de sombras residuais. O padrão não repara retenção nem evita burn-in.",
  },
  {
    id: "fps-stutter",
    label: "Fluidez do navegador",
    instruction: "O marcador usa requestAnimationFrame para inspeção subjetiva de arrasto e engasgos. A contagem exibida não mede nem certifica os hertz físicos do painel.",
  },
  {
    id: "moire-aliasing",
    label: "Moiré & Aliasing",
    instruction: "Grades de um pixel CSS ajudam a observar interferências de escala e nitidez. Um pixel CSS pode não corresponder a um pixel físico.",
  },
  {
    id: "gradient-dither",
    label: "Gradiente CSS",
    instruction: "Rampa gerada pelo navegador para observar faixas visíveis. Ela não determina a profundidade de bits nem a origem de um eventual banding.",
  },
  {
    id: "subpixel-layout",
    label: "Subpixel RGB/BGR",
    instruction: "Observe franjas nas bordas do texto em sua configuração atual. A página não identifica com certeza o arranjo físico RGB ou BGR.",
  },
  {
    id: "ansi-checker",
    label: "Xadrez 4×4",
    instruction: "Padrão simultâneo preto e branco para inspeção visual de uniformidade. Medir contraste exige colorímetro e condições controladas.",
  },
  {
    id: "flicker-shutter",
    label: "Barras para câmera",
    instruction: "Barras estáticas para observar moiré e foco em uma captura. Não detectam PWM nem sincronizam o obturador da câmera.",
  },
  {
    id: "rgb-bars",
    label: "Barras RGB",
    instruction: "Verifique a uniformidade e resposta individual dos canais de cor primários.",
  },
  {
    id: "sharpness-grid",
    label: "Grade de nitidez",
    instruction: "Verifique se há artefatos de halos nas bordas dos elementos.",
  },
  {
    id: "gamma",
    label: "Gamma",
    instruction: "Compare visualmente as amostras tramadas. É uma referência aproximada afetada por escala, perfil de cor e renderização do navegador.",
  },
];

const resolvePattern = (candidate) =>
  CALIBRATION_PATTERNS.some((pattern) => pattern.id === candidate)
    ? candidate
    : "grayscale";

const PATTERN_CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'luminance', label: 'Luminância & Contraste' },
  { id: 'color', label: 'Cor & Gamma' },
  { id: 'geometry', label: 'Geometria & Nitidez' },
  { id: 'motion', label: 'Movimento & Retenção' },
];

const CATEGORY_MAP = {
  'grayscale': 'luminance',
  'near-black': 'luminance',
  'ansi-checker': 'luminance',
  'smpte-bars': 'color',
  'rgb-bars': 'color',
  'gamma': 'color',
  'gradient-dither': 'color',
  'sharpness-grid': 'geometry',
  'subpixel-layout': 'geometry',
  'moire-aliasing': 'geometry',
  'fps-stutter': 'motion',
  'flicker-shutter': 'motion',
  'retention-burnin': 'motion',
};

function GrayscalePattern({ showGuidance }) {
  return (
    <div aria-label="Escala de cinza" className="calibration-lab__grayscale" role="img">
      {GRAYSCALE_STEPS.map((step) => (
        <div
          className="calibration-lab__grayscale-step"
          key={step.id}
          style={{ backgroundColor: `rgb(${step.value} ${step.value} ${step.value})` }}
        >
          <AnimatePresence>
          {showGuidance ? (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              aria-hidden="true"
              className="calibration-lab__grayscale-label"
              style={{ color: step.value > 142 ? "#111111" : "#FFFFFF" }}
            >
              {step.label}
            </motion.span>
          ) : null}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function NearBlackPattern({ showGuidance }) {
  const steps = [
    { label: "0% (Preto)", color: "rgb(0,0,0)" },
    { label: "2.5% Near-Black", color: "rgb(6,6,6)" },
    { label: "5.0% Near-Black", color: "rgb(13,13,13)" },
    { label: "7.5% Near-Black", color: "rgb(19,19,19)" },
    { label: "10% Cinza Escuro", color: "rgb(25,25,25)" },
  ];

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      {steps.map((step, idx) => (
        <div
          key={idx}
          style={{
            flex: 1,
            backgroundColor: step.color,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: "24px",
            borderRight: idx < steps.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
          }}
        >
          <AnimatePresence>
          {showGuidance ? (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              style={{
                fontFamily: "monospace",
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.6)",
                background: "rgba(0,0,0,0.6)",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              {step.label}
            </motion.span>
          ) : null}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function SmpteBarsPattern({ showGuidance }) {
  const topBars = ["#C0C0C0", "#C0C000", "#00C0C0", "#00C000", "#C000C0", "#C00000", "#0000C0"];
  const plugeBars = [
    { label: "-4% Sub-black", color: "#000000" },
    { label: "0% Ref Black", color: "#0A0A0A" },
    { label: "+4% Above Black", color: "#1A1A1A" },
    { label: "100% Ref White", color: "#FFFFFF" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
      <div style={{ display: "flex", flex: 3 }}>
        {topBars.map((color, idx) => (
          <div key={idx} style={{ flex: 1, backgroundColor: color }} />
        ))}
      </div>
      <div style={{ display: "flex", flex: 1, backgroundColor: "#050505" }}>
        {plugeBars.map((bar, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              backgroundColor: bar.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AnimatePresence>
            {showGuidance ? (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#888888" }}
              >
                {bar.label}
              </motion.span>
            ) : null}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

function RetentionBurninPattern({ showGuidance }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#7F7F7F",
      }}
    >
      <AnimatePresence>
      {showGuidance ? (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          style={{
            position: "absolute",
            right: "20px",
            bottom: "20px",
            margin: 0,
            padding: "7px 10px",
            borderRadius: "7px",
            background: "rgba(0,0,0,.72)",
            color: "#fff",
            fontFamily: "monospace",
            fontSize: ".72rem",
          }}
        >
          Campo uniforme 50% · procure sombras residuais sem fixar o olhar
        </motion.p>
      ) : null}
      </AnimatePresence>
    </div>
  );
}

function FpsStutterPattern({ motionEnabled, showGuidance }) {
  const fpsTextRef = useRef(null);
  const animRef = useRef(null);
  const markerRef = useRef(null);
  const lastTimeRef = useRef(0);
  const framesRef = useRef(0);

  useEffect(() => {
    if (!motionEnabled) {
      if (markerRef.current) markerRef.current.style.left = "50%";
      return undefined;
    }

    lastTimeRef.current = window.performance.now();
    framesRef.current = 0;

    const loop = (now) => {
      framesRef.current += 1;
      if (now - lastTimeRef.current >= 1000) {
        if (fpsTextRef.current) {
          fpsTextRef.current.textContent = String(framesRef.current);
        }
        framesRef.current = 0;
        lastTimeRef.current = now;
      }

      const cycle = (now % 4000) / 4000;
      const position = cycle <= 0.5 ? cycle * 160 : (1 - cycle) * 160;
      if (markerRef.current) markerRef.current.style.left = `${10 + position}%`;

      animRef.current = window.requestAnimationFrame(loop);
    };

    animRef.current = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(animRef.current);
  }, [motionEnabled]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", backgroundColor: "#060709", overflow: "hidden" }}>
      <div
        ref={markerRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #38bdf8 0%, #34d399 100%)",
          boxShadow: "0 0 30px rgba(56,189,248,0.8)",
        }}
      />
      <AnimatePresence>
      {showGuidance ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          style={{ position: "absolute", bottom: "20px", left: "20px", color: "#34d399", fontFamily: "monospace", fontSize: "0.85rem", background: "rgba(0,0,0,0.75)", padding: "8px 14px", borderRadius: "8px" }}
        >
          {motionEnabled ? <>Callbacks rAF no último segundo: <strong ref={fpsTextRef}>60</strong></> : <strong>Animação pausada</strong>}
        </motion.div>
      ) : null}
      </AnimatePresence>
    </div>
  );
}

function MoireAliasingPattern() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", width: "100%", height: "100%" }}>
      <div style={{ backgroundColor: "#FFFFFF", backgroundImage: "repeating-linear-gradient(90deg, #000 0 1px, #fff 1px 2px)" }} />
      <div style={{ backgroundColor: "#FFFFFF", backgroundImage: "repeating-linear-gradient(0deg, #000 0 1px, #fff 1px 2px)" }} />
      <div style={{ backgroundColor: "#FFFFFF", backgroundImage: "repeating-linear-gradient(45deg, #000 0 1px, #fff 1px 2px)" }} />
      <div style={{ backgroundColor: "#FFFFFF", backgroundImage: "repeating-linear-gradient(-45deg, #000 0 1px, #fff 1px 2px)" }} />
    </div>
  );
}

function GradientDitherPattern() {
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(to right, #000000 0%, #ffffff 100%)" }} />
  );
}

function SubpixelLayoutPattern() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", backgroundColor: "#0B0C10", color: "#FFFFFF", padding: "40px", justifyContent: "center", alignItems: "center" }}>
      <h2 style={{ fontSize: "1.8rem", letterSpacing: "-0.03em" }}>Teste de Nitidez Subpixel ClearType</h2>
      <p style={{ color: "#94a3b8", maxWidth: "500px", textAlign: "center", lineHeight: "1.6" }}>
        Observe franjas coloridas nas bordas do texto. Elas variam com escala e renderização e não confirmam sozinhas o arranjo físico RGB ou BGR.
      </p>
      <div style={{ marginTop: "30px", fontSize: "1.4rem", fontWeight: "600", color: "#FFFFFF" }}>
        ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
      </div>
    </div>
  );
}

function AnsiCheckerPattern() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(4, 1fr)", width: "100%", height: "100%" }}>
      {Array.from({ length: 16 }).map((_, idx) => {
        const row = Math.floor(idx / 4);
        const col = idx % 4;
        const isWhite = (row + col) % 2 === 0;
        return <div key={idx} style={{ backgroundColor: isWhite ? "#FFFFFF" : "#000000" }} />;
      })}
    </div>
  );
}

function FlickerShutterPattern() {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#FFFFFF", backgroundImage: "repeating-linear-gradient(90deg, #000000 0 4px, #FFFFFF 4px 8px)" }} />
  );
}

function RgbBarsPattern({ showGuidance }) {
  return (
    <div aria-label="Barras de gradiente RGB" className="calibration-lab__rgb" role="img">
      {RGB_CHANNELS.map((channel) => (
        <div className="calibration-lab__rgb-channel" key={channel.id}>
          <div
            aria-hidden="true"
            className="calibration-lab__rgb-bar"
            style={{
              backgroundImage: `linear-gradient(90deg, #000000 0%, ${channel.color} 100%)`,
            }}
          />
          <AnimatePresence>
          {showGuidance ? (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="calibration-lab__rgb-label"
            >
              Canal {channel.label}
            </motion.span>
          ) : null}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function SharpnessGridPattern({ showGuidance }) {
  const checks = [
    {
      id: "vertical",
      label: "Linhas verticais",
      style: {
        backgroundColor: "#FFFFFF",
        backgroundImage: "repeating-linear-gradient(90deg, #111111 0 1px, #FFFFFF 1px 2px)",
      },
    },
    {
      id: "horizontal",
      label: "Linhas horizontais",
      style: {
        backgroundColor: "#FFFFFF",
        backgroundImage: "repeating-linear-gradient(0deg, #111111 0 1px, #FFFFFF 1px 2px)",
      },
    },
  ];

  return (
    <div aria-label="Grade para verificação de nitidez" className="calibration-lab__sharpness" role="img">
      {checks.map((check) => (
        <div className="calibration-lab__sharpness-check" key={check.id}>
          <div aria-hidden="true" className="calibration-lab__sharpness-sample" style={check.style} />
          <AnimatePresence>
          {showGuidance ? (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="calibration-lab__sharpness-label"
            >
              {check.label}
            </motion.span>
          ) : null}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function GammaPattern({ showGuidance }) {
  const canvasRef = useRef(null);

  const targets = useMemo(() => [
    { gamma: 1.8, color: `rgb(${Math.round(255 * Math.pow(0.5, 1 / 1.8))}, ${Math.round(255 * Math.pow(0.5, 1 / 1.8))}, ${Math.round(255 * Math.pow(0.5, 1 / 1.8))})` },
    { gamma: 2.2, color: `rgb(${Math.round(255 * Math.pow(0.5, 1 / 2.2))}, ${Math.round(255 * Math.pow(0.5, 1 / 2.2))}, ${Math.round(255 * Math.pow(0.5, 1 / 2.2))})` },
    { gamma: 2.4, color: `rgb(${Math.round(255 * Math.pow(0.5, 1 / 2.4))}, ${Math.round(255 * Math.pow(0.5, 1 / 2.4))}, ${Math.round(255 * Math.pow(0.5, 1 / 2.4))})` },
  ], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let rafId;
    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        const imgData = ctx.createImageData(width, height);
        const data = imgData.data;

        for (let y = 0; y < height; y++) {
          const color = y % 2 === 0 ? 255 : 0;
          for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            data[idx] = color;
            data[idx + 1] = color;
            data[idx + 2] = color;
            data[idx + 3] = 255;
          }
        }
        ctx.putImageData(imgData, 0, 0);
      }
    };

    const scheduleRender = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(render);
    };

    scheduleRender();
    window.addEventListener("resize", scheduleRender);
    return () => {
      window.removeEventListener("resize", scheduleRender);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div aria-label="Cartões de referência gamma" className="calibration-lab__gamma" role="img" style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      />
      
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
        {targets.map((target) => (
          <div key={target.gamma} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <div
              aria-hidden="true"
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: target.color,
                borderRadius: "50%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
              }}
            />
            <AnimatePresence>
            {showGuidance ? (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                style={{ backgroundColor: "rgba(0,0,0,0.8)", color: "#FFF", padding: "4px 10px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "bold" }}
              >
                {target.gamma}
              </motion.span>
            ) : null}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <AnimatePresence>
      {showGuidance ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          style={{ position: "absolute", bottom: "16px", left: "0", right: "0", textAlign: "center" }}
        >
          <span style={{ backgroundColor: "rgba(0,0,0,0.8)", color: "#FFF", padding: "6px 12px", borderRadius: "4px", fontSize: "0.75rem", display: "inline-block", maxWidth: "90%" }}>
            Estimativa visual baseada em mistura espacial. Ajuste o zoom do navegador para 100% (físico).
          </span>
        </motion.div>
      ) : null}
      </AnimatePresence>
    </div>
  );
}

function CalibrationPattern({ motionEnabled, pattern, showGuidance }) {
  switch (pattern) {
    case "near-black":
      return <NearBlackPattern showGuidance={showGuidance} />;
    case "smpte-bars":
      return <SmpteBarsPattern showGuidance={showGuidance} />;
    case "retention-burnin":
      return <RetentionBurninPattern showGuidance={showGuidance} />;
    case "fps-stutter":
      return <FpsStutterPattern motionEnabled={motionEnabled} showGuidance={showGuidance} />;
    case "moire-aliasing":
      return <MoireAliasingPattern />;
    case "gradient-dither":
      return <GradientDitherPattern />;
    case "subpixel-layout":
      return <SubpixelLayoutPattern />;
    case "ansi-checker":
      return <AnsiCheckerPattern />;
    case "flicker-shutter":
      return <FlickerShutterPattern />;
    case "rgb-bars":
      return <RgbBarsPattern showGuidance={showGuidance} />;
    case "sharpness-grid":
      return <SharpnessGridPattern showGuidance={showGuidance} />;
    case "gamma":
      return <GammaPattern showGuidance={showGuidance} />;
    case "grayscale":
    default:
      return <GrayscalePattern showGuidance={showGuidance} />;
  }
}

export default function CalibrationLabMode({
  ariaLabel = "Verificação visual do display",
  autoFocus = false,
  className,
  defaultPattern = "grayscale",
  isFullscreen,
  onExit,
  onPatternChange,
  onToggleFullscreen,
  pattern,
  showControls = true,
}) {
  const titleId = useId();
  const containerRef = useRef(null);
  const patternButtonRefs = useRef([]);
  const shouldReduceMotion = useReducedMotion();
  const [internalPattern, setInternalPattern] = useState(() => resolvePattern(defaultPattern));
  const [showGuidance, setShowGuidance] = useState(true);
  const [nativeFullscreen, setNativeFullscreen] = useState(false);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);

  const patternIsControlled = typeof pattern === "string";
  const fullscreenIsControlled = isFiniteBoolean(isFullscreen);
  const resolvedPattern = resolvePattern(patternIsControlled ? pattern : internalPattern);
  const resolvedFullscreen = fullscreenIsControlled ? isFullscreen : nativeFullscreen;
  const motionEnabled = !shouldReduceMotion && !isAnimationPaused;

  const activePattern = useMemo(
    () => CALIBRATION_PATTERNS.find((item) => item.id === resolvedPattern) || CALIBRATION_PATTERNS[0],
    [resolvedPattern]
  );
  const [activeCategory, setActiveCategory] = useState(() => CATEGORY_MAP[activePattern.id] || 'all');
  const filteredPatterns = CALIBRATION_PATTERNS.filter(p => activeCategory === 'all' || CATEGORY_MAP[p.id] === activeCategory);

  useEffect(() => {
    if (!autoFocus || typeof document === "undefined") return;
    const activeElement = document.activeElement;
    if (activeElement?.matches?.("input, textarea, select, [contenteditable]")) return;
    containerRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const syncFullscreenState = () => setNativeFullscreen(Boolean(document.fullscreenElement));
    syncFullscreenState();
    document.addEventListener("fullscreenchange", syncFullscreenState);
    return () => document.removeEventListener("fullscreenchange", syncFullscreenState);
  }, []);

  const updatePattern = (nextPattern) => {
    const next = resolvePattern(nextPattern);
    if (!patternIsControlled) setInternalPattern(next);
    onPatternChange?.(next);
  };

  const handlePatternKeyDown = (event, index) => {
    let nextIndex = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % CALIBRATION_PATTERNS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + CALIBRATION_PATTERNS.length) % CALIBRATION_PATTERNS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = CALIBRATION_PATTERNS.length - 1;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    updatePattern(filteredPatterns[nextIndex].id);
    patternButtonRefs.current[nextIndex]?.focus({ preventScroll: true });
  };

  const toggleFullscreen = () => {
    if (onToggleFullscreen) {
      onToggleFullscreen();
      return;
    }
    if (typeof document === "undefined") return;
    const pendingRequest = document.fullscreenElement
      ? document.exitFullscreen?.()
      : document.documentElement?.requestFullscreen?.();
    pendingRequest?.catch(() => {});
  };

  return (
    <section
      aria-label={ariaLabel}
      aria-labelledby={titleId}
      className={classNames("display-mode", "display-mode--calibration", className)}
      ref={containerRef}
      tabIndex={-1}
    >
      <h2 className="sr-only" id={titleId}>
        {activePattern.label}
      </h2>
      <div
        aria-label={`${activePattern.label}. ${activePattern.instruction}`}
        className="calibration-lab__canvas"
        role="img"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={resolvedPattern}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ width: "100%", height: "100%" }}
          >
            <CalibrationPattern
              motionEnabled={motionEnabled}
              pattern={resolvedPattern}
              showGuidance={showGuidance}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
      {showControls ? (
        <motion.aside
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="display-mode__controls display-mode__controls--calibration"
          aria-label="Controles e instruções de verificação visual"
        >
          <div className="calibration-lab__guide calibration-lab__guide--inline">
            <p className="calibration-lab__eyebrow">Como inspecionar</p>
            <h3 className="calibration-lab__title">{activePattern.label}</h3>
            <p className="calibration-lab__instruction">{activePattern.instruction}</p>
          </div>

          <div className="calibration-lab__categories" style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            {PATTERN_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={classNames("display-mode__preset-button", activeCategory === cat.id && "display-mode__preset-button--active")}
                style={{ padding: '4px 8px', fontSize: '0.75rem', backgroundColor: activeCategory === cat.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)' }}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="calibration-lab__pattern-switcher" role="toolbar" aria-label="Seletor de padrão">
            {filteredPatterns.map((item, index) => {
              const isActive = item.id === resolvedPattern;
              return (
                <button
                  ref={(element) => { patternButtonRefs.current[index] = element; }}
                  aria-pressed={isActive}
                  className={classNames(
                    "calibration-lab__pattern-button",
                    isActive && "calibration-lab__pattern-button--active"
                  )}
                  key={item.id}
                  onClick={() => updatePattern(item.id)}
                  onKeyDown={(event) => handlePatternKeyDown(event, index)}
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                >
                  <span className="calibration-lab__pattern-key" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <label className="calibration-lab__guide-toggle">
              <input
                checked={showGuidance}
                onChange={(event) => setShowGuidance(event.target.checked)}
                type="checkbox"
              />
              <span>Dicas visuais</span>
            </label>
          </div>

          {resolvedPattern === "fps-stutter" ? (
            <label className="calibration-lab__guide-toggle" style={{ marginTop: "8px" }}>
              <input
                checked={isAnimationPaused || Boolean(shouldReduceMotion)}
                disabled={Boolean(shouldReduceMotion)}
                onChange={(event) => setIsAnimationPaused(event.target.checked)}
                type="checkbox"
              />
              <span>
                {shouldReduceMotion
                  ? "Animação pausada pela preferência de movimento reduzido"
                  : "Pausar marcador em movimento"}
              </span>
            </label>
          ) : null}

          <div className="calibration-lab__actions">
            <button className="display-mode__primary-button calibration-lab__fullscreen-button" onClick={toggleFullscreen} type="button">
              {resolvedFullscreen ? "Sair da tela cheia" : "Tela cheia (100%)"}
            </button>
            {onExit ? (
              <button className="display-mode__secondary-button" onClick={onExit} style={{ marginTop: "6px" }} type="button">
                Sair da ferramenta
              </button>
            ) : null}
          </div>

          <p className="display-mode__hint">
            Estes padrões servem à inspeção visual e são afetados pelo navegador, escala, perfil de cor e ambiente. Não constituem calibração instrumental ou laudo do painel.
          </p>
        </motion.aside>
      ) : null}
      </AnimatePresence>
    </section>
  );
}
