import { useEffect, useRef, useState } from "react";

const classNames = (...names) => names.filter(Boolean).join(" ");

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

const isFiniteNumber = (value) =>
  typeof value === "number" && Number.isFinite(value);

const normalizeHex = (value, fallback) => {
  if (typeof value !== "string") return fallback;
  const compact = value.trim().replace("#", "");
  return /^[\da-f]{6}$/i.test(compact) ? `#${compact}`.toUpperCase() : fallback;
};

/** A large, readable status display for a second monitor or a meeting room. */
const MESSAGE_PRESETS = [
  "Em reunião. Retorno em breve.",
  "Volto às 14h00.",
  "Em horário de almoço.",
  "Não perturbe · Foco profundo",
  "Recepção · Favor aguardar",
];

export default function MessageOverlayMode({
  ariaLabel = "Mensagem em tela",
  autoFocus = false,
  backgroundColor,
  className,
  defaultBackgroundColor = "#030304",
  defaultFontScale = 8,
  defaultMessage = "Em foco. Retorno em breve.",
  defaultTextColor = "#FFFFFF",
  fontScale,
  message,
  onBackgroundColorChange,
  onExit,
  onFontScaleChange,
  onMessageChange,
  onTextColorChange,
  showControls = true,
  textColor,
}) {
  const containerRef = useRef(null);
  const [internalMessage, setInternalMessage] = useState(defaultMessage);
  const [internalTextColor, setInternalTextColor] = useState(() =>
    normalizeHex(defaultTextColor, "#FFFFFF"),
  );
  const [internalBackgroundColor, setInternalBackgroundColor] = useState(() =>
    normalizeHex(defaultBackgroundColor, "#030304"),
  );
  const [internalFontScale, setInternalFontScale] = useState(() =>
    clamp(Number(defaultFontScale) || 8, 3, 16),
  );
  const [isTeleprompter, setIsTeleprompter] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrContent, setQrContent] = useState('https://monitorsmith.app');
  const [isPanelClosed, setIsPanelClosed] = useState(false);

  const messageIsControlled = typeof message === "string";
  const textColorIsControlled = typeof textColor === "string";
  const backgroundIsControlled = typeof backgroundColor === "string";
  const fontScaleIsControlled = isFiniteNumber(fontScale);
  const resolvedMessage = messageIsControlled ? message : internalMessage;
  const resolvedTextColor = normalizeHex(textColor, internalTextColor);
  const resolvedBackgroundColor = normalizeHex(
    backgroundColor,
    internalBackgroundColor,
  );
  const resolvedFontScale = fontScaleIsControlled
    ? clamp(fontScale, 3, 16)
    : internalFontScale;
  const visibleMessage = resolvedMessage.trim() || "Sua mensagem aparece aqui.";

  const updateMessage = (nextValue) => {
    const next = nextValue.slice(0, 220);
    if (!messageIsControlled) setInternalMessage(next);
    onMessageChange?.(next);
  };

  const updateTextColor = (nextValue) => {
    const next = normalizeHex(nextValue, "#FFFFFF");
    if (!textColorIsControlled) setInternalTextColor(next);
    onTextColorChange?.(next);
  };

  const updateBackgroundColor = (nextValue) => {
    const next = normalizeHex(nextValue, "#030304");
    if (!backgroundIsControlled) setInternalBackgroundColor(next);
    onBackgroundColorChange?.(next);
  };

  const updateFontScale = (nextValue) => {
    const next = clamp(Number(nextValue) || 3, 3, 16);
    if (!fontScaleIsControlled) setInternalFontScale(next);
    onFontScaleChange?.(next);
  };

  useEffect(() => {
    if (!autoFocus || typeof document === "undefined") return;

    const activeElement = document.activeElement;
    if (activeElement?.matches?.("input, textarea, select, [contenteditable]")) {
      return;
    }

    containerRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  const handleKeyDown = (event) => {
    if (event.key !== "Escape" || !onExit) return;

    event.preventDefault();
    event.stopPropagation();
    onExit();
  };

  return (
    <section
      ref={containerRef}
      aria-label={ariaLabel}
      className={classNames("display-mode", "display-mode--message", className)}
      data-mode="message"
      onKeyDown={handleKeyDown}
      style={{
        "--message-background": resolvedBackgroundColor,
        "--message-color": resolvedTextColor,
        "--message-size": `${resolvedFontScale}vw`,
      }}
      tabIndex="0"
    >
      <div
        aria-hidden="true"
        className="display-mode__canvas display-mode__canvas--message"
        style={{ backgroundColor: resolvedBackgroundColor }}
      />

      <main
        className="message-overlay"
        style={{
          color: resolvedTextColor,
          transform: isTeleprompter ? 'scaleX(-1)' : 'none',
          transition: 'transform 200ms ease',
        }}
      >
        <p className="message-overlay__label">MonitorSmith</p>
        <p
          className="message-overlay__message"
          style={{ fontSize: `clamp(2.75rem, ${resolvedFontScale}vw, 16rem)` }}
        >
          {visibleMessage}
        </p>

        {showQrCode ? (
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ padding: '12px', background: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              <svg width="120" height="120" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="#ffffff" />
                <path d="M10 10h30v30h-30zM15 15v20h20v-20zM20 20h10v10h-10z" fill="#000000" />
                <path d="M60 10h30v30h-30zM65 15v20h20v-20zM70 20h10v10h-10z" fill="#000000" />
                <path d="M10 60h30v30h-30zM15 65v20h20v-20zM20 70h10v10h-10z" fill="#000000" />
                <rect x="50" y="50" width="10" height="10" fill="#000000" />
                <rect x="70" y="50" width="15" height="10" fill="#000000" />
                <rect x="50" y="70" width="10" height="20" fill="#000000" />
                <rect x="70" y="75" width="15" height="15" fill="#000000" />
              </svg>
            </div>
            <span style={{ fontSize: '0.75rem', opacity: 0.8, fontFamily: "'DM Mono', monospace" }}>{qrContent}</span>
          </div>
        ) : null}
      </main>

      {showControls && !isPanelClosed ? (
        <aside
          aria-label="Editor de mensagem"
          className="display-mode__controls display-mode__controls--message"
        >
          <div className="display-mode__panel-header">
            <div>
              <p className="display-mode__eyebrow">Monitor secundário</p>
              <h2 className="display-mode__title">Mensagem de status</h2>
            </div>
            <button
              aria-label="Ocultar painel de edição"
              className="display-mode__icon-button"
              onClick={() => setIsPanelClosed(true)}
              type="button"
              title="Ocultar painel"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <label className="display-mode__field" htmlFor="message-content">
            <span className="display-mode__field-label">
              Mensagem <output>{resolvedMessage.length}/220</output>
            </span>
            <textarea
              id="message-content"
              maxLength="220"
              onChange={(event) => updateMessage(event.target.value)}
              placeholder="Ex.: Em reunião. Retorno às 14h."
              rows="3"
              value={resolvedMessage}
            />
          </label>

          <div
            aria-label="Mensagens rápidas"
            className="display-mode__preset-row"
            role="group"
            style={{ marginBottom: '12px' }}
          >
            {MESSAGE_PRESETS.map((presetText) => (
              <button
                key={presetText}
                type="button"
                className="display-mode__preset-button"
                aria-pressed={resolvedMessage === presetText}
                onClick={() => updateMessage(presetText)}
              >
                {presetText.split('·')[0]}
              </button>
            ))}
          </div>

          <div className="message-overlay__color-fields">
            <label className="display-mode__field" htmlFor="message-text-color">
              <span className="display-mode__field-label">Texto</span>
              <input
                aria-label="Cor do texto"
                id="message-text-color"
                onChange={(event) => updateTextColor(event.target.value)}
                type="color"
                value={resolvedTextColor}
              />
            </label>

            <label
              className="display-mode__field"
              htmlFor="message-background-color"
            >
              <span className="display-mode__field-label">Fundo</span>
              <input
                aria-label="Cor do fundo"
                id="message-background-color"
                onChange={(event) => updateBackgroundColor(event.target.value)}
                type="color"
                value={resolvedBackgroundColor}
              />
            </label>
          </div>

          <label className="display-mode__field" htmlFor="message-font-size">
            <span className="display-mode__field-label">
              Escala tipográfica <output>{resolvedFontScale.toFixed(1)}</output>
            </span>
            <input
              aria-label="Escala da mensagem"
              id="message-font-size"
              max="16"
              min="3"
              onChange={(event) => updateFontScale(event.target.value)}
              step="0.5"
              type="range"
              value={resolvedFontScale}
            />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', margin: '10px 0' }}>
            <label className="calibration-lab__guide-toggle">
              <input
                type="checkbox"
                checked={isTeleprompter}
                onChange={(e) => setIsTeleprompter(e.target.checked)}
              />
              <span>Espelho (Teleprompter)</span>
            </label>
            <label className="calibration-lab__guide-toggle">
              <input
                type="checkbox"
                checked={showQrCode}
                onChange={(e) => setShowQrCode(e.target.checked)}
              />
              <span>Exibir QR Code</span>
            </label>
          </div>

          {showQrCode ? (
            <input
              type="text"
              placeholder="Conteúdo do QR Code (URL ou Wi-Fi)..."
              value={qrContent}
              onChange={(e) => setQrContent(e.target.value)}
              className="wbp-input"
              style={{
                width: '100%',
                marginBottom: '10px',
                padding: '6px 10px',
                fontSize: '0.74rem',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.14)',
                color: '#ffffff',
              }}
            />
          ) : null}

          <p className="display-mode__hint">
            Mantenha a frase curta para leitura confortável à distância.
          </p>
        </aside>
      ) : showControls && isPanelClosed ? (
        <button
          type="button"
          className="display-mode__reopen-panel-btn"
          onClick={() => setIsPanelClosed(false)}
          title="Abrir painel de mensagem"
          aria-label="Abrir painel de mensagem"
        >
          <span>Editar mensagem</span>
        </button>
      ) : null}
    </section>
  );
}
