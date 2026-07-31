import { useEffect, useMemo, useRef, useState } from "react";
import DisplayToolShell from "./DisplayToolShell";
const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

const isFiniteNumber = (value) =>
  typeof value === "number" && Number.isFinite(value);

const normalizeHex = (value) => {
  if (typeof value !== "string") return null;

  const compact = value.trim().replace("#", "");
  if (/^[\da-f]{3}$/i.test(compact)) {
    return `#${compact
      .split("")
      .map((character) => `${character}${character}`)
      .join("")}`.toUpperCase();
  }

  return /^[\da-f]{6}$/i.test(compact) ? `#${compact}`.toUpperCase() : null;
};

const dimHex = (hex, brightness) => {
  const normalized = normalizeHex(hex);
  if (!normalized) return hex;

  const amount = clamp(brightness, 0, 100) / 100;
  const channels = [1, 3, 5].map((offset) =>
    Math.round(parseInt(normalized.slice(offset, offset + 2), 16) * amount),
  );

  return `rgb(${channels.join(" ")})`;
};

const temperatureToRgb = (kelvin) => {
  const temperature = clamp(Number(kelvin) || 5000, 1800, 12000) / 100;
  let red;
  let green;
  let blue;

  if (temperature <= 66) {
    red = 255;
    green = 99.47 * Math.log(temperature) - 161.12;
    blue =
      temperature <= 19
        ? 0
        : 138.52 * Math.log(temperature - 10) - 305.04;
  } else {
    red = 329.7 * (temperature - 60) ** -0.1332;
    green = 288.12 * (temperature - 60) ** -0.0755;
    blue = 255;
  }

  return {
    red: Math.round(clamp(red, 0, 255)),
    green: Math.round(clamp(green, 0, 255)),
    blue: Math.round(clamp(blue, 0, 255)),
  };
};

const dimRgb = ({ red, green, blue }, brightness) => {
  const amount = clamp(brightness, 0, 100) / 100;
  return `rgb(${Math.round(red * amount)} ${Math.round(
    green * amount,
  )} ${Math.round(blue * amount)})`;
};

const TEMPERATURE_PRESETS = [
  { label: "Vela (2700K)", value: 2700 },
  { label: "Tungstênio (3200K)", value: 3200 },
  { label: "Neutro (4500K)", value: 4500 },
  { label: "Daylight (5600K)", value: 5600 },
  { label: "Estúdio (6500K)", value: 6500 },
  { label: "Frio (9300K)", value: 9300 },
];

const COLOR_STUDIO_PRESETS = [
  { label: "Branco", value: "#FFFFFF" },
  { label: "Chroma verde", value: "#00B140" },
  { label: "Azul vídeo", value: "#145CFF" },
  { label: "Vermelho", value: "#FF3B30" },
  { label: "Ciano", value: "#00D9FF" },
  { label: "Magenta", value: "#FF2EC8" },
  { label: "Âmbar", value: "#FFB000" },
  { label: "Violeta", value: "#875CFF" },
];

/**
 * Soft light canvas with a controlled-or-uncontrolled API. Pass `variant="color"`
 * (or `allowCustomColor`) to turn it into the ambient colour-lighting utility.
 */
export default function WhiteLightingMode({
  allowCustomColor = false,
  ariaLabel,
  autoFocus = false,
  brightness,
  className,
  color,
  customColor,
  defaultBrightness = 92,
  defaultColor = "#FFFFFF",
  defaultTemperature = 5000,
  onBrightnessChange,
  onColorChange,  onTemperatureChange,
  showControls = true,
  temperature,
  title,
  variant = "white",
}) {
  const containerRef = useRef(null);
  const [internalBrightness, setInternalBrightness] = useState(() =>
    clamp(Number(defaultBrightness) || 0, 0, 100),
  );
  const [internalTemperature, setInternalTemperature] = useState(() =>
    clamp(Number(defaultTemperature) || 5000, 1800, 12000),
  );
  const [internalColor, setInternalColor] = useState(
    () => normalizeHex(defaultColor) || "#FFFFFF",
  );

  const brightnessIsControlled = isFiniteNumber(brightness);
  const temperatureIsControlled = isFiniteNumber(temperature);
  const suppliedColor = color ?? customColor;
  const colorIsControlled = typeof suppliedColor === "string";
  const isColorMode = variant === "color" || allowCustomColor;

  const resolvedBrightness = brightnessIsControlled
    ? clamp(brightness, 0, 100)
    : internalBrightness;
  const resolvedTemperature = temperatureIsControlled
    ? clamp(temperature, 1800, 12000)
    : internalTemperature;
  const resolvedColor = normalizeHex(suppliedColor) || internalColor;
  const defaultModeTitle = isColorMode ? "Estúdio de cor" : "Luz suave";
  const panelTitle = title || defaultModeTitle;
  const resolvedAriaLabel = ariaLabel || panelTitle;
  const baseTemperatureColor = useMemo(
    () => temperatureToRgb(resolvedTemperature),
    [resolvedTemperature],
  );
  const displayColor = isColorMode
    ? dimHex(resolvedColor, resolvedBrightness)
    : dimRgb(baseTemperatureColor, resolvedBrightness);

  const updateBrightness = (nextValue) => {
    const next = clamp(Number(nextValue) || 0, 0, 100);
    if (!brightnessIsControlled) setInternalBrightness(next);
    onBrightnessChange?.(next);
  };

  const updateTemperature = (nextValue) => {
    const next = clamp(Number(nextValue) || 1800, 1800, 12000);
    if (!temperatureIsControlled) setInternalTemperature(next);
    onTemperatureChange?.(next);
  };

  const updateColor = (nextValue) => {
    const next = normalizeHex(nextValue) || "#FFFFFF";
    if (!colorIsControlled) setInternalColor(next);
    onColorChange?.(next);
  };

  useEffect(() => {
    if (!autoFocus || typeof document === "undefined") return;

    const activeElement = document.activeElement;
    if (activeElement?.matches?.("input, textarea, select, [contenteditable]")) {
      return;
    }

    containerRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);



  const controls = (
    <>
      <label className="display-mode__field" htmlFor="light-brightness">
        <span className="display-mode__field-label">
          Intensidade <output>{resolvedBrightness}%</output>
        </span>
        <input
          aria-label="Intensidade da luz"
          id="light-brightness"
          max="100"
          min="0"
          onChange={(event) => updateBrightness(event.target.value)}
          step="1"
          type="range"
          value={resolvedBrightness}
        />
      </label>

      {isColorMode ? (
        <>
          <label className="display-mode__field" htmlFor="light-color">
            <span className="display-mode__field-label">Cor personalizada</span>
            <input
              aria-label="Escolher cor do estúdio"
              id="light-color"
              onChange={(event) => updateColor(event.target.value)}
              type="color"
              value={resolvedColor}
            />
          </label>

          <div
            aria-label="Cores sólidas rápidas"
            className="display-mode__color-presets"
            role="group"
          >
            {COLOR_STUDIO_PRESETS.map((preset) => (
              <button
                aria-pressed={resolvedColor === preset.value}
                className="display-mode__color-preset"
                key={preset.value}
                onClick={() => updateColor(preset.value)}
                type="button"
              >
                <span
                  aria-hidden="true"
                  className="display-mode__color-preset-swatch"
                  style={{ backgroundColor: preset.value }}
                />
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <label
            className="display-mode__field"
            htmlFor="light-temperature"
          >
            <span className="display-mode__field-label">
              Temperatura visual <output>{resolvedTemperature} K</output>
            </span>
            <input
              aria-label="Temperatura visual"
              id="light-temperature"
              max="12000"
              min="1800"
              onChange={(event) => updateTemperature(event.target.value)}
              step="50"
              type="range"
              value={clamp(resolvedTemperature, 1800, 12000)}
            />
          </label>

          <div
            aria-label="Predefinições de temperatura visual"
            className="display-mode__preset-row"
            role="group"
          >
            {TEMPERATURE_PRESETS.map((preset) => (
              <button
                aria-pressed={
                  Math.abs(resolvedTemperature - preset.value) < 150
                }
                className="display-mode__preset-button"
                key={preset.value}
                onClick={() => updateTemperature(preset.value)}
                type="button"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </>
      )}

      <p className="display-mode__supporting-text">
        {isColorMode
          ? "Cores sólidas para cenário, chroma e atmosfera. A intensidade altera a cor renderizada; o brilho físico continua configurado no monitor."
          : "Referência visual aproximada para chamadas ou luz ambiente. A tela não substitui uma luminária calibrada, e a intensidade não altera o brilho físico configurado no monitor."}
      </p>
    </>
  );

  return (
    <DisplayToolShell
      id={isColorMode ? "color" : "light"}
      title={panelTitle}
      controls={controls}
      visible={showControls}
      className={className}
      aria-label={resolvedAriaLabel}
      data-mode={isColorMode ? "color" : "white"}
      style={{
        "--light-brightness": `${resolvedBrightness}%`,
        "--light-color": displayColor,
        "--light-temperature": `${resolvedTemperature}K`,
      }}
      tabIndex="0"
    >
      <div
        aria-hidden="true"
        className="display-mode__canvas display-mode__canvas--light"
        style={{ backgroundColor: displayColor }}
      />
    </DisplayToolShell>
  );
}
