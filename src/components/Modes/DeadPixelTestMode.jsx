import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DisplayToolShell from "./DisplayToolShell";

const classNames = (...names) => names.filter(Boolean).join(" ");

const DEFAULT_DEAD_PIXEL_COLORS = [
  { id: "black", label: "Preto", value: "#000000" },
  { id: "white", label: "Branco", value: "#FFFFFF" },
  { id: "red", label: "Vermelho", value: "#FF0000" },
  { id: "green", label: "Verde", value: "#00FF00" },
  { id: "blue", label: "Azul", value: "#0000FF" },
  { id: "cyan", label: "Ciano", value: "#00FFFF" },
  { id: "magenta", label: "Magenta", value: "#FF00FF" },
  { id: "yellow", label: "Amarelo", value: "#FFFF00" },
];

const normalizePalette = (palette) => {
  const source = Array.isArray(palette) && palette.length ? palette : DEFAULT_DEAD_PIXEL_COLORS;

  return source.map((entry, index) => {
    if (typeof entry === "string") {
      return {
        id: `color-${index}`,
        label: `Cor ${index + 1}`,
        value: entry,
      };
    }

    return {
      id: entry?.id || `color-${index}`,
      label: entry?.label || `Cor ${index + 1}`,
      value: entry?.value || "#000000",
    };
  });
};

export default function DeadPixelTestMode({
  ariaLabel = "Teste visual de pixels",
  autoFocus = false,
  autoCycle,
  className,
  cycleInterval = 1250,
  defaultAutoCycle = false,
  defaultColor = "black",
  onAutoCycleChange,
  onColorChange,
  onExit,
  palette,
  selectedColor,
  showControls = true,
}) {
  const containerRef = useRef(null);
  const colors = useMemo(() => normalizePalette(palette), [palette]);
  const [internalColor, setInternalColor] = useState(defaultColor);
  const [internalAutoCycle, setInternalAutoCycle] = useState(defaultAutoCycle);
  const [cycleSpeed, setCycleSpeed] = useState(1250);
  const [isFlashing, setIsFlashing] = useState(false);
  const colorIsControlled = typeof selectedColor === "string";
  const autoCycleIsControlled = typeof autoCycle === "boolean";
  const currentColorReference = colorIsControlled ? selectedColor : internalColor;
  const resolvedAutoCycle = autoCycleIsControlled ? autoCycle : internalAutoCycle;

  const activeIndex = Math.max(
    0,
    colors.findIndex(
      (color) =>
        color.id === currentColorReference || color.value === currentColorReference,
    ),
  );
  const activeColor = colors[activeIndex] || colors[0];

  useEffect(() => {
    if (!autoFocus || typeof document === "undefined") return;

    const activeElement = document.activeElement;
    if (activeElement?.matches?.("input, textarea, select, [contenteditable]")) {
      return;
    }

    containerRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  const selectColor = useCallback(
    (index) => {
      const normalizedIndex = ((index % colors.length) + colors.length) % colors.length;
      const next = colors[normalizedIndex];
      if (!next) return;

      if (!colorIsControlled) setInternalColor(next.id);
      onColorChange?.(next.value, next, normalizedIndex);
    },
    [colorIsControlled, colors, onColorChange],
  );

  const updateAutoCycle = useCallback(
    (nextValue) => {
      const next = Boolean(nextValue);
      if (!autoCycleIsControlled) setInternalAutoCycle(next);
      onAutoCycleChange?.(next);
    },
    [autoCycleIsControlled, onAutoCycleChange],
  );

  useEffect(() => {
    if (isFlashing) {
      let step = 0;
      const strobeInterval = window.setInterval(() => {
        step = (step + 1) % colors.length;
        selectColor(step);
      }, 70);
      return () => window.clearInterval(strobeInterval);
    }

    if (!resolvedAutoCycle || colors.length < 2) return undefined;

    const intervalId = window.setInterval(() => {
      selectColor(activeIndex + 1);
    }, cycleSpeed);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, colors.length, cycleSpeed, isFlashing, resolvedAutoCycle, selectColor]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape" && onExit) {
      event.preventDefault();
      event.stopPropagation();
      onExit();
      return;
    }

    if (event.target !== event.currentTarget) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectColor(activeIndex + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectColor(activeIndex - 1);
    }

    if (event.key === " " && event.target === event.currentTarget) {
      event.preventDefault();
      updateAutoCycle(!resolvedAutoCycle);
    }
  };

  return (
    <DisplayToolShell
      id="dead-pixel"
      title="Teste de pixels"
      subtitle={`Cor ativa: ${activeColor.label}`}
      instructions={[
        "Use as setas (← →) do teclado para alternar entre as 8 cores sólidas.",
        "Aperte Espaço para ativar ou pausar a alternância automática de cores."
      ]}
      controls={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="display-mode__color-grid" role="group" aria-label="Escolha uma cor de teste">
            {colors.map((color, index) => (
              <button
                key={color.id}
                type="button"
                className="display-mode__color-button"
                aria-pressed={index === activeIndex}
                onClick={() => selectColor(index)}
                style={{ "--test-color": color.value }}
              >
                <span className="display-mode__color-swatch" style={{ backgroundColor: color.value }} />
                <span>{color.label}</span>
              </button>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', cursor: 'pointer', marginBottom: '8px' }}>
              <input
                type="checkbox"
                checked={resolvedAutoCycle}
                onChange={(event) => updateAutoCycle(event.target.checked)}
              />
              <span>Ciclo automático ({(cycleSpeed / 1000).toFixed(1)}s)</span>
            </label>

            <div style={{ display: 'flex', gap: '6px' }}>
              {[500, 1000, 2000, 5000].map((ms) => (
                <button
                  key={ms}
                  type="button"
                  className={classNames(
                    "wbp-button",
                    cycleSpeed === ms ? "wbp-button--active" : "wbp-button--ghost"
                  )}
                  style={{ flex: 1, padding: '4px 8px', fontSize: '0.72rem' }}
                  onClick={() => setCycleSpeed(ms)}
                >
                  {(ms / 1000).toFixed(1)}s
                </button>
              ))}
            </div>
          </div>

          <div>
            <button
              type="button"
              className={`wbp-button ${isFlashing ? 'wbp-button--active' : 'wbp-button--ghost'}`}
              style={{ width: '100%', background: isFlashing ? '#e53935' : undefined, borderColor: isFlashing ? '#ff5252' : undefined }}
              onClick={() => {
                setIsFlashing(!isFlashing);
                if (resolvedAutoCycle) updateAutoCycle(false);
              }}
            >
              {isFlashing ? '⏹ Parar Desbloqueador' : '⚡ Desbloqueador de Pixels Presos'}
            </button>
          </div>
        </div>
      }
    >
      <div
        ref={containerRef}
        aria-label={ariaLabel}
        className="display-mode__canvas"
        style={{ position: 'absolute', inset: 0, width: '100vw', height: '100vh', backgroundColor: activeColor.value }}
        onKeyDown={handleKeyDown}
        tabIndex="0"
      />
    </DisplayToolShell>
  );
}
