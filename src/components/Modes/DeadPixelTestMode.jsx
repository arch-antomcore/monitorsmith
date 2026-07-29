import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
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
  onColorChange,  palette,
  selectedColor,
  showControls = true,
}) {
  const containerRef = useRef(null);
  const colors = useMemo(() => normalizePalette(palette), [palette]);
  const [internalColor, setInternalColor] = useState(defaultColor);
  const [internalAutoCycle, setInternalAutoCycle] = useState(defaultAutoCycle);
  const [cycleSpeed, setCycleSpeed] = useState(() =>
    Math.min(Math.max(Number(cycleInterval) || 5000, 2000), 15000),
  );
  const [showInspectionGuide, setShowInspectionGuide] = useState(false);
  const shouldReduceMotion = useReducedMotion();
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
      const next = shouldReduceMotion ? false : Boolean(nextValue);
      if (!autoCycleIsControlled) setInternalAutoCycle(next);
      onAutoCycleChange?.(next);
    },
    [autoCycleIsControlled, onAutoCycleChange, shouldReduceMotion],
  );

  useEffect(() => {
    if (!resolvedAutoCycle || shouldReduceMotion || colors.length < 2) return undefined;

    const intervalId = window.setInterval(() => {
      selectColor(activeIndex + 1);
    }, cycleSpeed);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, colors.length, cycleSpeed, resolvedAutoCycle, selectColor, shouldReduceMotion]);

  const handleKeyDown = (event) => {
    const isEditableTarget = event.target instanceof Element
      && Boolean(event.target.closest('input, textarea, select, [contenteditable="true"]'));

    if (event.key === "ArrowRight" && !isEditableTarget) {
      event.preventDefault();
      selectColor(activeIndex + 1);
    }

    if (event.key === "ArrowLeft" && !isEditableTarget) {
      event.preventDefault();
      selectColor(activeIndex - 1);
    }

    if (event.key === " " && event.target === containerRef.current) {
      event.preventDefault();
      updateAutoCycle(!resolvedAutoCycle);
    }
  };

  return (
    <DisplayToolShell
      id="dead-pixel"
      onKeyDown={handleKeyDown}
      visible={showControls}
      title="Teste de pixels"
      subtitle={`Cor ativa: ${activeColor.label}`}
      instructions={[
        "Examine cada cor sólida a uma distância confortável e procure pontos que permaneçam diferentes do fundo.",
        "Use as setas (← →) para avançar manualmente; Espaço inicia ou pausa o ciclo lento.",
        "O guia estático divide a tela em áreas sem emitir flashes e ajuda a percorrer todo o painel."
      ]}
      technicalLimit="Inspeção visual não identifica a causa do defeito nem repara pixels. O antigo estrobo foi removido: flashes rápidos em tela inteira podem causar mal-estar e risco fotossensível."
      controls={
        <div className="display-mode__control-stack">
          <div className="display-mode__color-grid" role="group" aria-label="Escolha uma cor de teste">
            {colors.map((color, index) => (
              <button
                key={color.id}
                type="button"
                className="display-mode__color-button"
                aria-pressed={index === activeIndex}
                aria-label={`Usar ${color.label} no teste`}
                onClick={() => selectColor(index)}
                style={{ "--test-color": color.value }}
              >
                <span className="display-mode__color-swatch" style={{ backgroundColor: color.value }} />
                <span>{color.label}</span>
              </button>
            ))}
          </div>

          <div className="display-mode__control-section">
            <label className="display-mode__checkbox-row">
              <input
                type="checkbox"
                checked={resolvedAutoCycle && !shouldReduceMotion}
                disabled={shouldReduceMotion}
                onChange={(event) => updateAutoCycle(event.target.checked)}
              />
              <span>
                {shouldReduceMotion
                  ? "Ciclo automático desativado pela preferência de movimento reduzido"
                  : `Ciclo lento (${(cycleSpeed / 1000).toFixed(0)}s por cor)`}
              </span>
            </label>

            <div className="display-mode__speed-grid" role="group" aria-label="Intervalo do ciclo de cores">
              {[2000, 5000, 10000, 15000].map((ms) => (
                <button
                  key={ms}
                  type="button"
                  className={classNames(
                    "wbp-button",
                    cycleSpeed === ms ? "wbp-button--active" : "wbp-button--ghost"
                  )}
                  aria-pressed={cycleSpeed === ms}
                  onClick={() => setCycleSpeed(ms)}
                >
                  {(ms / 1000).toFixed(0)}s
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`wbp-button display-mode__wide-action ${showInspectionGuide ? 'wbp-button--active' : 'wbp-button--ghost'}`}
            aria-pressed={showInspectionGuide}
            onClick={() => setShowInspectionGuide((visible) => !visible)}
          >
            {showInspectionGuide ? 'Ocultar guia de varredura' : 'Exibir guia de varredura estática'}
          </button>
        </div>
      }
    >
      <div
        ref={containerRef}
        aria-label={ariaLabel}
        className={classNames("display-mode__canvas", className)}
        style={{ backgroundColor: activeColor.value }}
        tabIndex="0"
      >
        {showInspectionGuide ? (
          <div
            aria-label="Guia estático de inspeção dividido em nove áreas"
            role="img"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(90deg, transparent 33.2%, rgba(127,127,127,.72) 33.3% 33.45%, transparent 33.55% 66.45%, rgba(127,127,127,.72) 66.55% 66.7%, transparent 66.8%), linear-gradient(transparent 33.2%, rgba(127,127,127,.72) 33.3% 33.45%, transparent 33.55% 66.45%, rgba(127,127,127,.72) 66.55% 66.7%, transparent 66.8%)",
              pointerEvents: "none",
            }}
          />
        ) : null}
        <span className="sr-only" aria-live="polite">
          Cor de inspeção: {activeColor.label}.
        </span>
      </div>
    </DisplayToolShell>
  );
}
