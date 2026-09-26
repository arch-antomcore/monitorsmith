import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const DEFAULT_EVENTS = [
  'pointermove',
  'pointerdown',
  'keydown',
  'touchstart',
  'wheel',
];

function canUseDom() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function toSafeTimeout(timeout) {
  const parsedTimeout = Number(timeout);
  return Number.isFinite(parsedTimeout) ? Math.max(0, parsedTimeout) : 3000;
}

export function useIdleTimer({
  timeout = 3000,
  enabled = true,
  onIdle,
  onActive,
  events = DEFAULT_EVENTS,
} = {}) {
  const [isIdle, setIsIdle] = useState(false);
  const [lastActivity, setLastActivity] = useState(() => Date.now());
  const timerRef = useRef(null);
  const isIdleRef = useRef(false);
  const enabledRef = useRef(Boolean(enabled));
  const timeoutRef = useRef(toSafeTimeout(timeout));
  const callbacksRef = useRef({ onIdle, onActive });
  const mountedRef = useRef(false);
  const lastActivityRef = useRef(lastActivity);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Update refs in an effect to avoid mutating during render
  useEffect(() => {
    callbacksRef.current = { onIdle, onActive };
  }, [onIdle, onActive]);

  const setIdleState = useCallback((nextIsIdle) => {
    if (isIdleRef.current === nextIsIdle) {
      return;
    }

    isIdleRef.current = nextIsIdle;

    if (mountedRef.current) {
      setIsIdle(nextIsIdle);
    }

    const callback = nextIsIdle ? callbacksRef.current.onIdle : callbacksRef.current.onActive;
    callback?.();
  }, []);

  const clearIdleTimer = useCallback(() => {
    if (timerRef.current !== null && canUseDom()) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = null;
  }, []);

  const scheduleIdleTimer = useCallback(() => {
    clearIdleTimer();

    if (!canUseDom() || !enabledRef.current) {
      return;
    }

    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setIdleState(true);
    }, timeoutRef.current);
  }, [clearIdleTimer, setIdleState]);

  const resetIdleTimer = useCallback(() => {
    if (!canUseDom() || !enabledRef.current) {
      return;
    }

    const wasIdle = isIdleRef.current;
    const now = Date.now();
    lastActivityRef.current = now;
    setIdleState(false);

    if (wasIdle && mountedRef.current) {
      setLastActivity(now);
    }

    scheduleIdleTimer();
  }, [scheduleIdleTimer, setIdleState]);

  useEffect(() => {
    enabledRef.current = Boolean(enabled);
    timeoutRef.current = toSafeTimeout(timeout);
    clearIdleTimer();

    if (!canUseDom()) {
      return undefined;
    }

    if (!enabledRef.current) {
      setIdleState(false);
      return undefined;
    }

    resetIdleTimer();

    const handleActivity = () => {
      resetIdleTimer();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        clearIdleTimer();
        setIdleState(true);
        return;
      }

      resetIdleTimer();
    };

    const listenerOptions = { passive: true };
    events.forEach((eventName) => {
      window.addEventListener(eventName, handleActivity, listenerOptions);
    });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearIdleTimer();
      events.forEach((eventName) => {
        window.removeEventListener(eventName, handleActivity, listenerOptions);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [clearIdleTimer, enabled, events, resetIdleTimer, setIdleState, timeout]);

  const getLastActivity = useCallback(() => lastActivityRef.current, []);

  return useMemo(() => ({
    isIdle,
    lastActivity,
    getLastActivity,
    resetIdleTimer,
    clearIdleTimer,
  }), [isIdle, lastActivity, getLastActivity, resetIdleTimer, clearIdleTimer]);
}

export default useIdleTimer;
