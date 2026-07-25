import { useEffect, useMemo, useRef, useState } from "react";

const classNames = (...names) => names.filter(Boolean).join(" ");

const isFiniteBoolean = (value) => typeof value === "boolean";

const getDateFormatter = (locale, timeZone) => {
  const options = {
    day: "numeric",
    month: "long",
    timeZone,
    weekday: "long",
  };

  try {
    return new Intl.DateTimeFormat(locale, options);
  } catch {
    return new Intl.DateTimeFormat(locale, { ...options, timeZone: undefined });
  }
};

const getTimeFormatter = (locale, timeZone, hourCycle, showSeconds) => {
  const options = {
    hour: "2-digit",
    hourCycle: hourCycle === "12" ? "h12" : "h23",
    minute: "2-digit",
    ...(showSeconds ? { second: "2-digit" } : {}),
    timeZone,
  };

  try {
    return new Intl.DateTimeFormat(locale, options);
  } catch {
    return new Intl.DateTimeFormat(locale, { ...options, timeZone: undefined });
  }
};

const getPartValue = (parts, type) =>
  parts.find((part) => part.type === type)?.value || "";

const readClockParts = (now, locale, timeZone, hourCycle, showSeconds) => {
  const formatter = getTimeFormatter(locale, timeZone, hourCycle, showSeconds);
  const parts = formatter.formatToParts(now);

  return {
    dayPeriod: getPartValue(parts, "dayPeriod"),
    hours: getPartValue(parts, "hour"),
    minutes: getPartValue(parts, "minute"),
    seconds: showSeconds ? getPartValue(parts, "second") : "",
    spoken: formatter.format(now),
  };
};

const getTimeZoneLabel = (locale, timeZone) => {
  try {
    return new Intl.DateTimeFormat(locale, { timeZone }).resolvedOptions().timeZone;
  } catch {
    return "Horário local";
  }
};

/**
 * A low-noise, high-legibility real-time clock for a secondary monitor.
 * The component owns a precise local tick but accepts controlled display
 * preferences and an optional host-managed fullscreen callback.
 */
export default function FullScreenClockMode({
  ariaLabel = "Relógio em tela",
  autoFocus = false,
  className,
  defaultHourCycle = "24",
  defaultShowSeconds = true,
  hourCycle,
  isFullscreen,
  locale = "pt-BR",
  onExit,
  onHourCycleChange,
  onShowSecondsChange,
  onToggleFullscreen,
  showControls = true,
  showSeconds,
  timeZone,
}) {
  const containerRef = useRef(null);
  const [now, setNow] = useState(() => new Date());
  const [clockStyle, setClockStyle] = useState("digital");
  const [internalHourCycle, setInternalHourCycle] = useState(
    defaultHourCycle === "12" ? "12" : "24",
  );
  const [internalShowSeconds, setInternalShowSeconds] = useState(
    Boolean(defaultShowSeconds),
  );
  const [nativeFullscreen, setNativeFullscreen] = useState(false);
  const [isPanelClosed, setIsPanelClosed] = useState(false);
  const hourCycleIsControlled = hourCycle === "12" || hourCycle === "24";
  const secondsAreControlled = isFiniteBoolean(showSeconds);
  const fullscreenIsControlled = isFiniteBoolean(isFullscreen);
  const resolvedHourCycle = hourCycleIsControlled ? hourCycle : internalHourCycle;
  const resolvedShowSeconds = secondsAreControlled
    ? showSeconds
    : internalShowSeconds;
  const resolvedFullscreen = fullscreenIsControlled
    ? isFullscreen
    : nativeFullscreen;
  const clockParts = useMemo(
    () => readClockParts(now, locale, timeZone, resolvedHourCycle, resolvedShowSeconds),
    [locale, now, resolvedHourCycle, resolvedShowSeconds, timeZone],
  );
  const dateLabel = useMemo(
    () => getDateFormatter(locale, timeZone).format(now),
    [locale, now, timeZone],
  );
  const timeZoneLabel = useMemo(
    () => getTimeZoneLabel(locale, timeZone),
    [locale, timeZone],
  );

  useEffect(() => {
    let timeoutId;

    const scheduleTick = () => {
      setNow(new Date());
      const delay = 1000 - (Date.now() % 1000) + 8;
      timeoutId = window.setTimeout(scheduleTick, delay);
    };

    scheduleTick();

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const previousTitle = document.title;
    document.title = `${clockParts.hours}:${clockParts.minutes} — Relógio — MonitorSmith`;

    return () => {
      document.title = previousTitle;
    };
  }, [clockParts.hours, clockParts.minutes]);

  useEffect(() => {
    if (!autoFocus || typeof document === "undefined") return;

    const activeElement = document.activeElement;
    if (activeElement?.matches?.("input, textarea, select, [contenteditable]")) {
      return;
    }

    containerRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const syncFullscreenState = () => {
      setNativeFullscreen(Boolean(document.fullscreenElement));
    };

    syncFullscreenState();
    document.addEventListener("fullscreenchange", syncFullscreenState);

    return () => document.removeEventListener("fullscreenchange", syncFullscreenState);
  }, []);

  const secondsAngle = (now.getSeconds() + now.getMilliseconds() / 1000) * 6;
  const minutesAngle = (now.getMinutes() + now.getSeconds() / 60) * 6;
  const hoursAngle = ((now.getHours() % 12) + now.getMinutes() / 60) * 30;

  const updateHourCycle = (nextValue) => {
    const next = nextValue === "12" ? "12" : "24";
    if (!hourCycleIsControlled) setInternalHourCycle(next);
    onHourCycleChange?.(next);
  };

  const updateShowSeconds = (nextValue) => {
    const next = Boolean(nextValue);
    if (!secondsAreControlled) setInternalShowSeconds(next);
    onShowSecondsChange?.(next);
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

    pendingRequest?.catch?.(() => {
      // Embedded browsers
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape" && onExit) {
      event.preventDefault();
      event.stopPropagation();
      onExit();
      return;
    }

    if (event.key.toLowerCase() === "f") {
      event.preventDefault();
      event.stopPropagation();
      toggleFullscreen();
      return;
    }
  };

  return (
    <section
      ref={containerRef}
      aria-label={ariaLabel}
      className={classNames(
        "display-mode",
        "display-mode--clock",
        "fullscreen-clock-mode",
        className,
      )}
      data-mode="clock"
      data-seconds={resolvedShowSeconds}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <div
        aria-hidden="true"
        className="display-mode__canvas display-mode__canvas--clock"
        style={{
          background:
            "radial-gradient(circle at 50% 44%, rgba(211, 255, 238, 0.065), transparent 34rem), #030304",
        }}
      />

      <div className="fullscreen-clock" aria-live="polite" aria-atomic="true">
        <p className="fullscreen-clock__context">Horário local</p>

        {clockStyle === "analog" ? (
          <div className="fullscreen-clock__analog-wrap" style={{ margin: "20px 0" }}>
            <svg width="260" height="260" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="94" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" />
              {Array.from({ length: 12 }).map((_, i) => {
                const rad = (i * 30 * Math.PI) / 180;
                const x1 = 100 + 80 * Math.sin(rad);
                const y1 = 100 - 80 * Math.cos(rad);
                const x2 = 100 + 90 * Math.sin(rad);
                const y2 = 100 - 90 * Math.cos(rad);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />;
              })}
              <line x1="100" y1="100" x2={100 + 52 * Math.sin((hoursAngle * Math.PI) / 180)} y2={100 - 52 * Math.cos((hoursAngle * Math.PI) / 180)} stroke="#ededed" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="100" y1="100" x2={100 + 72 * Math.sin((minutesAngle * Math.PI) / 180)} y2={100 - 72 * Math.cos((minutesAngle * Math.PI) / 180)} stroke="#afe3d4" strokeWidth="3" strokeLinecap="round" />
              {resolvedShowSeconds ? (
                <line x1="100" y1="100" x2={100 + 82 * Math.sin((secondsAngle * Math.PI) / 180)} y2={100 - 82 * Math.cos((secondsAngle * Math.PI) / 180)} stroke="#ff5252" strokeWidth="1.5" strokeLinecap="round" />
              ) : null}
              <circle cx="100" cy="100" r="4" fill="#afe3d4" />
            </svg>
          </div>
        ) : (
          <time
            className="fullscreen-clock__time"
            dateTime={now.toISOString()}
          >
            <span className="fullscreen-clock__hours">{clockParts.hours}</span>
            <span aria-hidden="true" className="fullscreen-clock__separator">:</span>
            <span className="fullscreen-clock__minutes">{clockParts.minutes}</span>
            {resolvedShowSeconds ? (
              <>
                <span aria-hidden="true" className="fullscreen-clock__separator">:</span>
                <span className="fullscreen-clock__seconds">{clockParts.seconds}</span>
              </>
            ) : null}
            {clockParts.dayPeriod ? (
              <span className="fullscreen-clock__period">{clockParts.dayPeriod}</span>
            ) : null}
          </time>
        )}

        <time className="fullscreen-clock__date" dateTime={now.toISOString()}>
          {dateLabel}
        </time>
        <p className="fullscreen-clock__timezone">{timeZoneLabel}</p>
      </div>

      {showControls && !isPanelClosed ? (
        <aside
          aria-label="Controles do relógio"
          className="display-mode__controls display-mode__controls--clock"
        >
          <div className="display-mode__panel-header">
            <div>
              <p className="display-mode__eyebrow">MonitorSmith</p>
              <h2 className="display-mode__title">Relógio de tela</h2>
            </div>
            <button
              aria-label="Ocultar painel do relógio"
              className="display-mode__icon-button"
              onClick={() => setIsPanelClosed(true)}
              type="button"
              title="Ocultar painel"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div
            aria-label="Estilo do mostrador"
            className="fullscreen-clock__format-toggle"
            role="group"
            style={{ marginBottom: '10px' }}
          >
            <button
              aria-pressed={clockStyle === "digital"}
              className="display-mode__preset-button fullscreen-clock__format-button"
              onClick={() => setClockStyle("digital")}
              type="button"
            >
              Digital
            </button>
            <button
              aria-pressed={clockStyle === "analog"}
              className="display-mode__preset-button fullscreen-clock__format-button"
              onClick={() => setClockStyle("analog")}
              type="button"
            >
              Analógico Estúdio
            </button>
          </div>

          <div
            aria-label="Formato da hora"
            className="fullscreen-clock__format-toggle"
            role="group"
          >
            <button
              aria-pressed={resolvedHourCycle === "24"}
              className="display-mode__preset-button fullscreen-clock__format-button"
              onClick={() => updateHourCycle("24")}
              type="button"
            >
              24 horas
            </button>
            <button
              aria-pressed={resolvedHourCycle === "12"}
              className="display-mode__preset-button fullscreen-clock__format-button"
              onClick={() => updateHourCycle("12")}
              type="button"
            >
              12 horas
            </button>
          </div>

          <label className="fullscreen-clock__seconds-toggle">
            <input
              checked={resolvedShowSeconds}
              onChange={(event) => updateShowSeconds(event.target.checked)}
              type="checkbox"
            />
            <span>Exibir segundos</span>
          </label>

          <div className="fullscreen-clock__actions">
            <button
              className="display-mode__secondary-button fullscreen-clock__fullscreen-button"
              onClick={toggleFullscreen}
              type="button"
            >
              {resolvedFullscreen ? "Sair da tela cheia" : "Usar tela cheia"}
            </button>
          </div>

          <p className="display-mode__hint">
            F alterna tela cheia. Use os controles para mudar o formato e os segundos.
          </p>
        </aside>
      ) : showControls && isPanelClosed ? (
        <button
          type="button"
          className="display-mode__reopen-panel-btn"
          onClick={() => setIsPanelClosed(false)}
          title="Abrir painel do relógio"
          aria-label="Abrir painel do relógio"
        >
          <span>Opções do relógio</span>
        </button>
      ) : null}
    </section>
  );
}
