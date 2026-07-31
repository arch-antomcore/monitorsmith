import { useEffect, useRef, useState } from "react";

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
  const [isHintVisible, setIsHintVisible] = useState(showHint);

  useEffect(() => {
    if (showHint) {
      setIsHintVisible(true);
      const timer = setTimeout(() => setIsHintVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showHint]);

  useEffect(() => {
    if (!autoFocus || typeof document === "undefined") return;

    const activeElement = document.activeElement;
    if (activeElement?.matches?.("input, textarea, select, [contenteditable]")) {
      return;
    }

    containerRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);


  return (
    <section
      ref={containerRef}
      aria-label={ariaLabel}
      className={classNames("display-mode", "display-mode--black", className)}
      data-mode="black"
      tabIndex={onExit || autoFocus ? 0 : -1}
    >
      <div
        aria-hidden="true"
        className="display-mode__canvas display-mode__canvas--black"
      />

      {isHintVisible ? (
        <p className="display-mode__hint display-mode__hint--inverse">{hint}</p>
      ) : null}

      {children}
    </section>
  );
}
