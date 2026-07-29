import { useCallback, useEffect, useRef, useState } from "react";

const classNames = (...names) => names.filter(Boolean).join(" ");

const clampSeconds = (value) => Math.max(0, Math.round(Number(value) || 0));

const isFiniteNumber = (value) =>
  typeof value === "number" && Number.isFinite(value);

const getSecondsUntil = (deadline) =>
  Math.max(0, Math.ceil((deadline - Date.now()) / 1000));

function playCompletionChime() {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.3);
    osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.6);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.addEventListener('ended', () => {
      ctx.close().catch(() => {});
    }, { once: true });

    osc.start();
    osc.stop(ctx.currentTime + 1.2);
  } catch {
    // Ignore audio restrictions
  }
}

const formatFocusTime = (totalSeconds) => {
  const seconds = clampSeconds(totalSeconds);
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
};

function createAmbientNoiseSynth() {
  if (typeof window === "undefined") return null;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    const ctx = new AudioContext();
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);

    whiteNoise.connect(gainNode);
    gainNode.connect(ctx.destination);
    whiteNoise.start();

    return {
      stop: () => {
        try { whiteNoise.stop(); ctx.close(); } catch { /* Audio can already be closed by the browser. */ }
      },
      setVolume: (vol) => {
        try { gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), ctx.currentTime); } catch { /* Ignore a closed audio context. */ }
      }
    };
  } catch {
    return null;
  }
}

const DEFAULT_PRESETS = [
  { label: "5 min", seconds: 5 * 60 },
  { label: "15 min (Pausa)", seconds: 15 * 60 },
  { label: "25 min (Foco)", seconds: 25 * 60 },
  { label: "50 min (Foco)", seconds: 50 * 60 },
];

/**
 * Focus timer with controlled (`secondsRemaining` / `isRunning`) and local
 * state options. All callbacks emit plain, serializable values.
 */
export default function FocusTimerMode({
  ariaLabel = "Cronômetro de foco",
  autoFocus = false,
  className,
  defaultRunning = false,
  initialDuration = 25 * 60,
  isRunning,
  onComplete,
  onDurationChange,  onRunningChange,
  onSecondsRemainingChange,
  presets = DEFAULT_PRESETS,
  secondsRemaining,
  showControls = true,
  title = "Foco profundo",
  totalDuration,
}) {
  const containerRef = useRef(null);
  const closePanelButtonRef = useRef(null);
  const reopenPanelButtonRef = useRef(null);
  const pendingFocusTarget = useRef(null);
  const normalizedInitialDuration = clampSeconds(initialDuration) || 25 * 60;
  const [internalSeconds, setInternalSeconds] = useState(
    normalizedInitialDuration,
  );
  const [internalRunning, setInternalRunning] = useState(defaultRunning);
  const [internalTotalDuration, setInternalTotalDuration] = useState(
    normalizedInitialDuration,
  );
  const [customMinutesInput, setCustomMinutesInput] = useState('');
  const [isPanelClosed, setIsPanelClosed] = useState(false);
  const [isAmbientNoiseActive, setIsAmbientNoiseActive] = useState(false);
  const ambientNoiseRef = useRef(null);

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

  const toggleAmbientNoise = () => {
    if (isAmbientNoiseActive) {
      ambientNoiseRef.current?.stop();
      ambientNoiseRef.current = null;
      setIsAmbientNoiseActive(false);
    } else {
      const synth = createAmbientNoiseSynth();
      ambientNoiseRef.current = synth;
      setIsAmbientNoiseActive(Boolean(synth));
    }
  };

  useEffect(() => {
    return () => {
      ambientNoiseRef.current?.stop();
      ambientNoiseRef.current = null;
    };
  }, []);
  const deadlineRef = useRef(null);
  const lastReportedSecondsRef = useRef(null);
  const completionDeliveredRef = useRef(false);
  const hasStartedRef = useRef(false);
  const secondsAreControlled = isFiniteNumber(secondsRemaining);
  const runningIsControlled = typeof isRunning === "boolean";
  const resolvedSeconds = secondsAreControlled
    ? clampSeconds(secondsRemaining)
    : internalSeconds;
  const resolvedRunning = runningIsControlled ? isRunning : internalRunning;
  const totalDurationIsControlled = isFiniteNumber(totalDuration);
  const resolvedTotalDuration = Math.max(
    1,
    clampSeconds(totalDurationIsControlled ? totalDuration : internalTotalDuration),
  );
  const progress = Math.min(1, Math.max(0, 1 - resolvedSeconds / resolvedTotalDuration));

  const setRemaining = useCallback(
    (nextValue) => {
      const next = clampSeconds(nextValue);
      if (!secondsAreControlled) setInternalSeconds(next);
      onSecondsRemainingChange?.(next);
    },
    [onSecondsRemainingChange, secondsAreControlled],
  );

  const setRunning = useCallback(
    (nextValue) => {
      const next = Boolean(nextValue);
      if (!next && deadlineRef.current !== null) {
        const nextSeconds = getSecondsUntil(deadlineRef.current);
        deadlineRef.current = null;
        lastReportedSecondsRef.current = null;

        if (nextSeconds !== resolvedSeconds) {
          setRemaining(nextSeconds);
        }
      }

      if (next) hasStartedRef.current = true;
      if (!runningIsControlled) setInternalRunning(next);
      onRunningChange?.(next);
    },
    [onRunningChange, resolvedSeconds, runningIsControlled, setRemaining],
  );

  useEffect(() => {
    if (!autoFocus || typeof document === "undefined") return;

    const activeElement = document.activeElement;
    if (activeElement?.matches?.("input, textarea, select, [contenteditable]")) {
      return;
    }

    containerRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  useEffect(() => {
    if (!resolvedRunning || resolvedSeconds <= 0) {
      deadlineRef.current = null;
      lastReportedSecondsRef.current = null;
      return undefined;
    }

    // A deadline, rather than a decrementing interval, keeps the timer
    // accurate when the browser throttles JavaScript in a background tab.
    // Keep that deadline while ordinary one-second updates flow back through
    // the controlled or uncontrolled state; rebase only on an external edit.
    if (
      deadlineRef.current === null ||
      lastReportedSecondsRef.current !== resolvedSeconds
    ) {
      deadlineRef.current = Date.now() + resolvedSeconds * 1000;
      lastReportedSecondsRef.current = resolvedSeconds;
    }

    let timeoutId;

    const syncToDeadline = () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);

      const deadline = deadlineRef.current;
      if (deadline === null) return;

      const nextSeconds = getSecondsUntil(deadline);
      if (nextSeconds !== lastReportedSecondsRef.current) {
        lastReportedSecondsRef.current = nextSeconds;
        setRemaining(nextSeconds);
      }

      if (nextSeconds <= 0) return;

      const millisecondsRemaining = Math.max(0, deadline - Date.now());
      const millisecondsToNextSecond = millisecondsRemaining % 1000 || 1000;
      timeoutId = window.setTimeout(
        syncToDeadline,
        Math.max(32, millisecondsToNextSecond),
      );
    };

    const syncWhenVisible = () => {
      if (document.visibilityState === "visible") syncToDeadline();
    };

    syncToDeadline();
    document.addEventListener("visibilitychange", syncWhenVisible);
    window.addEventListener("focus", syncToDeadline);

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", syncWhenVisible);
      window.removeEventListener("focus", syncToDeadline);
    };
  }, [resolvedRunning, resolvedSeconds, setRemaining]);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const previousTitle = document.title;

    if (resolvedRunning) {
      document.title = `(${formatFocusTime(resolvedSeconds)}) Foco — MonitorSmith`;
    }

    return () => {
      document.title = previousTitle;
    };
  }, [resolvedRunning, resolvedSeconds]);

  useEffect(() => {
    if (resolvedSeconds > 0) {
      completionDeliveredRef.current = false;
      return;
    }

    if (!hasStartedRef.current || completionDeliveredRef.current) return;

    completionDeliveredRef.current = true;
    setRunning(false);
    playCompletionChime();
    onComplete?.();
  }, [onComplete, resolvedSeconds, setRunning]);

  const resetTimer = (duration = resolvedTotalDuration) => {
    const nextDuration = Math.max(1, clampSeconds(duration));
    completionDeliveredRef.current = false;
    hasStartedRef.current = false;
    deadlineRef.current = null;
    lastReportedSecondsRef.current = null;
    setRunning(false);
    if (!totalDurationIsControlled) setInternalTotalDuration(nextDuration);
    onDurationChange?.(nextDuration);
    setRemaining(nextDuration);
  };

  const toggleTimer = () => {
    if (resolvedSeconds <= 0) {
      resetTimer(resolvedTotalDuration);
      setRunning(true);
      return;
    }
    setRunning(!resolvedRunning);
  };

  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === " ") {
      event.preventDefault();
      toggleTimer();
    }

    if (event.key.toLowerCase() === "r") {
      event.preventDefault();
      resetTimer();
    }
  };

  return (
    <section
      ref={containerRef}
      aria-label={ariaLabel}
      className={classNames("display-mode", "display-mode--focus", className)}
      data-mode="focus-timer"
      data-running={resolvedRunning}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <div aria-hidden="true" className="display-mode__canvas display-mode__canvas--focus" />

      <div className="focus-timer" role="timer">
        <p className="focus-timer__eyebrow">Sessão de concentração</p>
        <div
          aria-label={`${formatFocusTime(resolvedSeconds)} restantes`}
          aria-live="off"
          className="focus-timer__dial"
          style={{ "--focus-progress": `${Math.round(progress * 360)}deg` }}
        >
          <time className="focus-timer__time" dateTime={`PT${resolvedSeconds}S`}>
            {formatFocusTime(resolvedSeconds)}
          </time>
          <span className="focus-timer__state">
            {resolvedRunning ? "Em foco" : resolvedSeconds === 0 ? "Concluído" : "Pronto"}
          </span>
        </div>
        <span className="sr-only" aria-live="polite">
          {resolvedSeconds === 0 ? 'Sessão de foco concluída.' : ''}
        </span>
        <h2 className="focus-timer__title">{title}</h2>
        <p className="focus-timer__caption">
          {resolvedRunning
            ? "Proteja este intervalo. O resto pode esperar alguns minutos."
            : "Comece quando estiver pronto para uma única tarefa importante."}
        </p>
      </div>

      {showControls && !isPanelClosed ? (
        <aside
          aria-label="Controles do cronômetro"
          className="display-mode__controls display-mode__controls--focus"
        >
          <div className="display-mode__panel-header">
            <div>
              <p className="display-mode__eyebrow">Timer de foco</p>
              <h2 className="display-mode__title">Cronômetro</h2>
            </div>
            <button
              ref={closePanelButtonRef}
              aria-label="Ocultar painel do cronômetro"
              className="display-mode__icon-button"
              onClick={closePanel}
              type="button"
              title="Ocultar painel"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="focus-timer__actions">
            <button
              className="display-mode__primary-button"
              onClick={toggleTimer}
              type="button"
            >
              {resolvedRunning ? "Pausar" : resolvedSeconds === 0 ? "Recomeçar" : "Iniciar"}
            </button>
            <button
              className="display-mode__secondary-button"
              onClick={() => resetTimer()}
              type="button"
            >
              Reiniciar
            </button>
          </div>

          <button
            type="button"
            className={classNames("wbp-button", isAmbientNoiseActive ? "wbp-button--active" : "wbp-button--ghost")}
            style={{ width: "100%", marginTop: "8px", fontSize: "0.75rem" }}
            onClick={() => toggleAmbientNoise()}
            aria-pressed={isAmbientNoiseActive}
          >
            {isAmbientNoiseActive ? "Pausar ruído ambiente sintetizado" : "Ativar ruído ambiente sintetizado"}
          </button>

          <div
            aria-label="Duração da sessão"
            className="display-mode__preset-row"
            role="group"
          >
            {presets.map((preset) => (
              <button
                aria-pressed={
                  !resolvedRunning && resolvedSeconds === clampSeconds(preset.seconds)
                }
                className="display-mode__preset-button"
                key={`${preset.label}-${preset.seconds}`}
                onClick={() => {
                  setCustomMinutesInput('');
                  resetTimer(clampSeconds(preset.seconds));
                }}
                type="button"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <label className="display-mode__field" htmlFor="custom-focus-time">
            <span className="display-mode__field-label">Tempo personalizado (minutos)</span>
            <input
              id="custom-focus-time"
              type="number"
              min="1"
              max="999"
              placeholder="Ex.: 45"
              value={customMinutesInput}
              onChange={(event) => {
                const val = event.target.value;
                setCustomMinutesInput(val);
                const num = parseInt(val, 10);
                if (num > 0 && num <= 999) {
                  resetTimer(num * 60);
                }
              }}
            />
          </label>

          <p className="display-mode__hint">
            Espaço inicia ou pausa. R reinicia a duração escolhida.
          </p>
        </aside>
      ) : showControls && isPanelClosed ? (
        <button
          ref={reopenPanelButtonRef}
          type="button"
          className="display-mode__reopen-panel-btn"
          onClick={openPanel}
          title="Abrir painel do cronômetro"
          aria-label="Abrir painel do cronômetro"
        >
          <span>Opções do timer</span>
        </button>
      ) : null}
    </section>
  );
}
