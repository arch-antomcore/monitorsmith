import { useCallback, useEffect, useRef, useState } from 'react';

function canUseWakeLock() {
  return typeof navigator !== 'undefined' && Boolean(navigator.wakeLock?.request);
}

function canUseDocument() {
  return typeof document !== 'undefined';
}

function createWakeLockError(message) {
  return new Error(message);
}

export function useWakeLock({ autoRequest = false } = {}) {
  const [isSupported, setIsSupported] = useState(canUseWakeLock);
  const [isLocked, setIsLocked] = useState(false);
  const [error, setError] = useState(null);
  const sentinelRef = useRef(null);
  const requestInFlightRef = useRef(null);
  const shouldRestoreRef = useRef(Boolean(autoRequest));
  const generationRef = useRef(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    setIsSupported(canUseWakeLock());

    return () => {
      mountedRef.current = false;
      shouldRestoreRef.current = false;
      generationRef.current += 1;

      const sentinel = sentinelRef.current;
      sentinelRef.current = null;
      if (sentinel && !sentinel.released) {
        sentinel.release().catch(() => undefined);
      }
    };
  }, []);

  const requestWakeLock = useCallback(async () => {
    if (!canUseWakeLock()) {
      const nextError = createWakeLockError('O bloqueio de suspensão não é compatível com este navegador.');
      if (mountedRef.current) {
        setIsSupported(false);
        setError(nextError);
      }
      return false;
    }

    shouldRestoreRef.current = true;
    const activeSentinel = sentinelRef.current;
    if (activeSentinel && !activeSentinel.released) {
      if (mountedRef.current) {
        setIsLocked(true);
        setError(null);
      }
      return true;
    }

    if (requestInFlightRef.current) {
      return requestInFlightRef.current;
    }

    const requestGeneration = generationRef.current;
    const requestPromise = (async () => {
      try {
        const sentinel = await navigator.wakeLock.request('screen');

        if (!shouldRestoreRef.current || generationRef.current !== requestGeneration) {
          await sentinel.release().catch(() => undefined);
          return false;
        }

        const handleRelease = () => {
          if (sentinelRef.current === sentinel) {
            sentinelRef.current = null;
          }

          if (mountedRef.current) {
            setIsLocked(false);
          }
        };

        sentinel.addEventListener?.('release', handleRelease, { once: true });
        sentinelRef.current = sentinel;

        if (mountedRef.current) {
          setIsSupported(true);
          setIsLocked(true);
          setError(null);
        }

        return true;
      } catch (nextError) {
        if (mountedRef.current) {
          setIsLocked(false);
          setError(
            nextError instanceof Error
              ? nextError
              : createWakeLockError('Não foi possível manter a tela ativa.'),
          );
        }
        return false;
      }
    })();

    requestInFlightRef.current = requestPromise;

    try {
      return await requestPromise;
    } finally {
      if (requestInFlightRef.current === requestPromise) {
        requestInFlightRef.current = null;
      }
    }
  }, []);

  const releaseWakeLock = useCallback(async () => {
    shouldRestoreRef.current = false;
    generationRef.current += 1;

    const sentinel = sentinelRef.current;
    sentinelRef.current = null;

    if (mountedRef.current) {
      setIsLocked(false);
    }

    if (!sentinel || sentinel.released) {
      return true;
    }

    try {
      await sentinel.release();
      return true;
    } catch (nextError) {
      if (mountedRef.current) {
        setError(
          nextError instanceof Error
            ? nextError
            : createWakeLockError('Não foi possível liberar o bloqueio de suspensão.'),
        );
      }
      return false;
    }
  }, []);

  useEffect(() => {
    if (!canUseDocument()) {
      return undefined;
    }

    const restoreOnVisibility = () => {
      if (document.visibilityState === 'visible' && shouldRestoreRef.current) {
        void requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', restoreOnVisibility);

    return () => {
      document.removeEventListener('visibilitychange', restoreOnVisibility);
    };
  }, [requestWakeLock]);

  useEffect(() => {
    if (autoRequest) {
      void requestWakeLock();
    }
  }, [autoRequest, requestWakeLock]);

  const toggleWakeLock = useCallback(() => {
    const activeSentinel = sentinelRef.current;
    if (activeSentinel && !activeSentinel.released) {
      return releaseWakeLock();
    }

    return requestWakeLock();
  }, [releaseWakeLock, requestWakeLock]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isSupported,
    isLocked,
    error,
    requestWakeLock,
    releaseWakeLock,
    toggleWakeLock,
    clearError,
  };
}

export default useWakeLock;
