import { useEffect, useMemo, useRef, useState } from "react";
import DisplayToolShell from "./DisplayToolShell";

const classNames = (...names) => names.filter(Boolean).join(" ");

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

const isFiniteNumber = (value) =>
  typeof value === "number" && Number.isFinite(value);

const CLEANER_PATTERNS = [
  { id: "grid", label: "Grade fina" },
  { id: "checker", label: "Xadrez" },
  { id: "black", label: "Preto absoluto" },
  { id: "white", label: "Branco intenso" },
  { id: "calibration", label: "Mira de contraste" },
];

const getPatternStyle = (pattern) => {
  const styles = {
    black: { backgroundColor: "#000000" },
    white: { backgroundColor: "#FFFFFF" },
    grid: {
      backgroundColor: "#F7F7F4",
      backgroundImage:
        "linear-gradient(rgba(0, 0, 0, 0.26) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.26) 1px, transparent 1px)",
      backgroundSize: "32px 32px",
    },
    checker: {
      backgroundColor: "#FFFFFF",
      backgroundImage:
        "linear-gradient(45deg, #111111 25%, transparent 25%), linear-gradient(-45deg, #111111 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #111111 75%), linear-gradient(-45deg, transparent 75%, #111111 75%)",
      backgroundPosition: "0 0, 0 16px, 16px -16px, -16px 0",
      backgroundSize: "32px 32px",
    },
    calibration: {
      backgroundColor: "#18181B",
      backgroundImage:
        "radial-gradient(circle at center, transparent 0 7%, rgba(255, 255, 255, 0.92) 7.2% 7.6%, transparent 7.8%), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0 1px, transparent 1px 10%), repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.2) 0 1px, transparent 1px 10%)",
    },
  };

  return styles[pattern] || styles.grid;
};

export default function ScreenCleanerMode({
  ariaLabel = "Modo de inspeção para limpeza",
  autoFocus = false,
  brightness,
  className,
  defaultBrightness = 100,
  defaultPattern = "grid",
  onBrightnessChange,
  onExit,
  onPatternChange,
  pattern,
  showControls = true,
}) {
  const containerRef = useRef(null);
  const lockButtonRef = useRef(null);
  const unlockButtonRef = useRef(null);
  const restoreFocusAfterLock = useRef(false);
  const [internalPattern, setInternalPattern] = useState(defaultPattern);
  const [internalBrightness, setInternalBrightness] = useState(() =>
    clamp(Number(defaultBrightness) || 0, 10, 100),
  );
  const [isCleanLocked, setIsCleanLocked] = useState(false);
  const [cleanLockTimer, setCleanLockTimer] = useState(30);

  useEffect(() => {
    if (!isCleanLocked) {
      if (restoreFocusAfterLock.current) {
        restoreFocusAfterLock.current = false;
        window.requestAnimationFrame(() => lockButtonRef.current?.focus({ preventScroll: true }));
      }
      return;
    }

    restoreFocusAfterLock.current = true;
    window.requestAnimationFrame(() => unlockButtonRef.current?.focus({ preventScroll: true }));

    const interval = setInterval(() => {
      setCleanLockTimer((prev) => {
        if (prev <= 1) {
          setIsCleanLocked(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    const handleKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        setIsCleanLocked(false);
        return;
      }

      const isUnlockActivation =
        event.target === unlockButtonRef.current &&
        (event.key === "Enter" || event.key === " ");

      if (!isUnlockActivation) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    window.addEventListener("keydown", handleKey, true);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKey, true);
    };
  }, [isCleanLocked]);
  const patternIsControlled = typeof pattern === "string";
  const brightnessIsControlled = isFiniteNumber(brightness);
  const resolvedPattern = CLEANER_PATTERNS.some(
    (item) => item.id === (patternIsControlled ? pattern : internalPattern),
  )
    ? patternIsControlled
      ? pattern
      : internalPattern
    : "grid";
  const resolvedBrightness = brightnessIsControlled
    ? clamp(brightness, 10, 100)
    : internalBrightness;

  const canvasStyle = useMemo(
    () => ({
      ...getPatternStyle(resolvedPattern),
      filter: `brightness(${resolvedBrightness / 100})`,
    }),
    [resolvedBrightness, resolvedPattern],
  );

  const updatePattern = (nextValue) => {
    const next = CLEANER_PATTERNS.some((item) => item.id === nextValue)
      ? nextValue
      : "grid";
    if (!patternIsControlled) setInternalPattern(next);
    onPatternChange?.(next);
  };

  const updateBrightness = (nextValue) => {
    const next = clamp(Number(nextValue) || 10, 10, 100);
    if (!brightnessIsControlled) setInternalBrightness(next);
    onBrightnessChange?.(next);
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
    <DisplayToolShell
      id="cleaner"
      title="Inspeção para limpeza"
      subtitle="Diagnóstico de painel"
      instructions={[
        "Poeira e marcas ficam mais visíveis quando você alterna fundos claros, escuros e reticulados.",
        "Antes de limpar, desligue e desconecte o monitor e consulte as instruções do fabricante.",
        "Use microfibra limpa e seca. Só umedeça levemente com o produto permitido pelo fabricante; nunca borrife líquido diretamente na tela."
      ]}
      technicalLimit="Os padrões apenas ajudam a localizar resíduos. Não pressione o painel e não use álcool, amônia, acetona ou abrasivos sem autorização expressa do fabricante."
      controls={
        showControls ? <div className="display-mode__control-group" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label className="display-mode__label" style={{ fontSize: '0.76rem', opacity: 0.7, marginBottom: '6px', display: 'block' }}>
              Padrão de inspeção
            </label>
            <div className="display-mode__preset-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {CLEANER_PATTERNS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={classNames(
                    "wbp-button",
                    item.id === resolvedPattern ? "wbp-button--active" : "wbp-button--ghost"
                  )}
                  style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                  onClick={() => updatePattern(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="cleaner-brightness" className="display-mode__label" style={{ fontSize: '0.76rem', opacity: 0.7, marginBottom: '4px', display: 'block' }}>
              Brilho do teste ({resolvedBrightness}%)
            </label>
            <input
              id="cleaner-brightness"
              type="range"
              min="10"
              max="100"
              value={resolvedBrightness}
              onChange={(e) => updateBrightness(e.target.value)}
              className="wbp-range"
              style={{ width: '100%' }}
            />
          </div>

          <button
            ref={lockButtonRef}
            type="button"
            className="wbp-button wbp-button--active"
            style={{ width: '100%', marginTop: '6px', fontSize: '0.78rem', background: '#047857', borderColor: '#34d399', color: '#ffffff' }}
            onClick={() => {
              setCleanLockTimer(30);
              setIsCleanLocked(true);
            }}
          >
            Ativar bloqueio local por 30 segundos
          </button>
        </div> : null
      }
    >
      {isCleanLocked ? (
        <div
          data-ms-shortcuts-disabled="true"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cleaner-lock-title"
          aria-describedby="cleaner-lock-description"
          onContextMenu={(event) => event.preventDefault()}
          onPointerDown={(event) => {
            if (event.target !== unlockButtonRef.current) event.preventDefault();
            event.stopPropagation();
          }}
          onTouchMove={(event) => event.preventDefault()}
          onWheel={(event) => event.preventDefault()}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(5, 6, 8, 0.96)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            textAlign: 'center',
            padding: '24px',
            touchAction: 'none',
            userSelect: 'none',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔒</div>
          <h2 id="cleaner-lock-title" style={{ fontSize: '1.6rem', fontWeight: 600, letterSpacing: '-0.04em', margin: '0 0 10px' }}>
            Bloqueio local ativo
          </h2>
          <p id="cleaner-lock-description" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '480px', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 24px' }}>
            O MonitorSmith ignorará atalhos e interações por 30 segundos. Isso não bloqueia teclas do sistema operacional. Para limpeza física, desligue o monitor e siga o manual do fabricante.
          </p>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '2.5rem', color: '#34d399', margin: '0 0 24px' }}>
            00:{String(cleanLockTimer).padStart(2, '0')}
          </div>
          <button
            ref={unlockButtonRef}
            type="button"
            className="wbp-button wbp-button--ghost"
            style={{ fontSize: '0.8rem', padding: '8px 16px', borderRadius: '10px' }}
            onClick={() => setIsCleanLocked(false)}
          >
            Encerrar bloqueio agora (Esc)
          </button>
        </div>
      ) : null}
      <div
        ref={containerRef}
        role="region"
        aria-label={ariaLabel}
        className={classNames("display-mode__canvas", "display-mode__canvas--cleaner", className)}
        style={{ position: 'absolute', inset: 0, width: '100vw', height: '100vh', ...canvasStyle }}
        onKeyDown={handleKeyDown}
        tabIndex="0"
      />
    </DisplayToolShell>
  );
}
