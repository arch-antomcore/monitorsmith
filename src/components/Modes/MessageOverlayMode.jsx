import { useEffect, useMemo, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

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

const relativeLuminance = (hex) => {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
};

const contrastRatio = (foreground, background) => {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
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
  const closePanelButtonRef = useRef(null);
  const reopenPanelButtonRef = useRef(null);
  const pendingFocusTarget = useRef(null);
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
  const normalizedQrContent = qrContent.trim().slice(0, 1024);
  const resolvedContrastRatio = useMemo(
    () => contrastRatio(resolvedTextColor, resolvedBackgroundColor),
    [resolvedBackgroundColor, resolvedTextColor],
  );

  useEffect(() => {
    if (!pendingFocusTarget.current) return;
    const target = pendingFocusTarget.current === "reopen"
      ? reopenPanelButtonRef.current
      : closePanelButtonRef.current;
    if (!target) return;
    target.focus({ preventScroll: true });
    pendingFocusTarget.current = null;
  }, [isPanelClosed]);

  const closePanel = () => {
    pendingFocusTarget.current = "reopen";
    setIsPanelClosed(true);
  };

  const openPanel = () => {
    pendingFocusTarget.current = "close";
    setIsPanelClosed(false);
  };

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

      <div
        className="message-overlay"
        style={{
          color: resolvedTextColor,
        }}
      >
        <div
          style={{
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
        </div>

        {showQrCode ? (
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            {normalizedQrContent ? (
              <div style={{ padding: '12px', background: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                <QRCodeSVG
                  value={normalizedQrContent}
                  size={160}
                  level="M"
                  marginSize={1}
                  role="img"
                  aria-label={`QR Code com o conteúdo: ${normalizedQrContent}`}
                  title="QR Code gerado pelo MonitorSmith"
                />
              </div>
            ) : (
              <p role="status">Digite um conteúdo no painel para gerar o QR Code.</p>
            )}
            {normalizedQrContent ? (
              <span style={{ maxWidth: 'min(28rem, 80vw)', overflowWrap: 'anywhere', fontSize: '0.75rem', opacity: 0.8, fontFamily: "'DM Mono', monospace" }}>
                Conteúdo do QR: {normalizedQrContent}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

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
              ref={closePanelButtonRef}
              aria-label="Ocultar painel de edição"
              className="display-mode__icon-button"
              onClick={closePanel}
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

          <p
            role="status"
            style={{
              margin: '-4px 0 10px',
              color: resolvedContrastRatio >= 4.5 ? '#86efac' : '#fbbf24',
              fontSize: '0.72rem',
              lineHeight: 1.45,
            }}
          >
            Contraste estimado: {resolvedContrastRatio.toFixed(1)}:1.{' '}
            {resolvedContrastRatio >= 4.5
              ? 'Adequado para texto comum.'
              : 'Aumente o contraste entre texto e fundo para leitura mais confortável.'}
          </p>

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
            <label className="display-mode__field" htmlFor="message-qr-content">
              <span className="display-mode__field-label">
                Conteúdo do QR <output>{normalizedQrContent.length}/1024</output>
              </span>
              <input
                id="message-qr-content"
                type="text"
                maxLength="1024"
                placeholder="URL, contato ou texto curto"
                value={qrContent}
                onChange={(e) => setQrContent(e.target.value.slice(0, 1024))}
                className="wbp-input"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
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
            </label>
          ) : null}

          <p className="display-mode__hint">
            Mantenha a frase curta para leitura confortável à distância.
          </p>
        </aside>
      ) : showControls && isPanelClosed ? (
        <button
          ref={reopenPanelButtonRef}
          type="button"
          className="display-mode__reopen-panel-btn"
          onClick={openPanel}
          title="Abrir painel de mensagem"
          aria-label="Abrir painel de mensagem"
        >
          <span>Editar mensagem</span>
        </button>
      ) : null}
    </section>
  );
}
