import { useEffect, useRef } from "react";

const classNames = (...names) => names.filter(Boolean).join(" ");

export default function BlackScreenMode({
  ariaLabel = "Tela preta ativa",
  autoFocus = false,
  children,
  className,
  hint = "Pressione Esc para restaurar os controles",
  onExit,
  showHint = false,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!autoFocus || typeof document === "undefined") return;

    const activeElement = document.activeElement;
    if (activeElement?.matches?.("input, textarea, select, [contenteditable]")) {
      return;
    }

    containerRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape" && onExit) {
      event.preventDefault();
      event.stopPropagation();
      onExit();
    }
  };

  return (
    <section
      ref={containerRef}
      aria-label={ariaLabel}
      className={classNames("display-mode", "display-mode--black", className)}
      data-mode="black"
      onKeyDown={handleKeyDown}
      tabIndex={onExit || autoFocus ? 0 : -1}
    >
      <div
        aria-hidden="true"
        className="display-mode__canvas display-mode__canvas--black"
      />

      {showHint ? (
        <p className="display-mode__hint display-mode__hint--inverse">{hint}</p>
      ) : null}

      {children}
    </section>
  );
}
