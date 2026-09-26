import { useCallback, useEffect, useState } from 'react';

const FULLSCREEN_CHANGE_EVENTS = [
  'fullscreenchange',
  'webkitfullscreenchange',
  'MSFullscreenChange',
];

const FULLSCREEN_ERROR_EVENTS = [
  'fullscreenerror',
  'webkitfullscreenerror',
  'MSFullscreenError',
];

function canUseDom() {
  return typeof document !== 'undefined';
}

function getFullscreenElement() {
  if (!canUseDom()) {
    return null;
  }

  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement ||
    null
  );
}

function getRequestFullscreenMethod(element) {
  return (
    element?.requestFullscreen ||
    element?.webkitRequestFullscreen ||
    element?.msRequestFullscreen ||
    null
  );
}

function getExitFullscreenMethod() {
  if (!canUseDom()) {
    return null;
  }

  return (
    document.exitFullscreen ||
    document.webkitExitFullscreen ||
    document.msExitFullscreen ||
    null
  );
}

function createFullscreenError(message) {
  return new Error(message);
}

export function useFullscreen(targetRef) {
  const [fullscreenElement, setFullscreenElement] = useState(getFullscreenElement);
  const [error, setError] = useState(null);

  const syncFullscreenState = useCallback(() => {
    setFullscreenElement(getFullscreenElement());
  }, []);

  useEffect(() => {
    if (!canUseDom()) {
      return undefined;
    }

    FULLSCREEN_CHANGE_EVENTS.forEach((eventName) => {
      document.addEventListener(eventName, syncFullscreenState);
    });

    const handleFullscreenError = () => {
      setError(createFullscreenError('Não foi possível alterar o modo de tela cheia.'));
      syncFullscreenState();
    };

    FULLSCREEN_ERROR_EVENTS.forEach((eventName) => {
      document.addEventListener(eventName, handleFullscreenError);
    });

    syncFullscreenState();

    return () => {
      FULLSCREEN_CHANGE_EVENTS.forEach((eventName) => {
        document.removeEventListener(eventName, syncFullscreenState);
      });
      FULLSCREEN_ERROR_EVENTS.forEach((eventName) => {
        document.removeEventListener(eventName, handleFullscreenError);
      });
    };
  }, [syncFullscreenState]);

  const enterFullscreen = useCallback(
    async (requestedElement) => {
      if (!canUseDom()) {
        const nextError = createFullscreenError('A tela cheia não está disponível neste ambiente.');
        setError(nextError);
        return false;
      }

      const element = requestedElement || targetRef?.current || document.documentElement;
      const requestFullscreen = getRequestFullscreenMethod(element);

      if (!element || !requestFullscreen) {
        const nextError = createFullscreenError('Este navegador não oferece suporte à tela cheia.');
        setError(nextError);
        return false;
      }

      if (getFullscreenElement() === element) {
        setError(null);
        syncFullscreenState();
        return true;
      }

      try {
        await requestFullscreen.call(element);
        setError(null);
        syncFullscreenState();
        return true;
      } catch (nextError) {
        setError(nextError instanceof Error ? nextError : createFullscreenError('Não foi possível entrar em tela cheia.'));
        syncFullscreenState();
        return false;
      }
    },
    [syncFullscreenState, targetRef],
  );

  const exitFullscreen = useCallback(async () => {
    if (!canUseDom()) {
      const nextError = createFullscreenError('A tela cheia não está disponível neste ambiente.');
      setError(nextError);
      return false;
    }

    if (!getFullscreenElement()) {
      setError(null);
      syncFullscreenState();
      return true;
    }

    const exitMethod = getExitFullscreenMethod();
    if (!exitMethod) {
      const nextError = createFullscreenError('Este navegador não oferece suporte para sair da tela cheia.');
      setError(nextError);
      return false;
    }

    try {
      await exitMethod.call(document);
      setError(null);
      syncFullscreenState();
      return true;
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError : createFullscreenError('Não foi possível sair da tela cheia.'));
      syncFullscreenState();
      return false;
    }
  }, [syncFullscreenState]);

  const toggleFullscreen = useCallback(
    async (requestedElement) => {
      if (getFullscreenElement()) {
        return exitFullscreen();
      }

      return enterFullscreen(requestedElement);
    },
    [enterFullscreen, exitFullscreen],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const isSupported = Boolean(
    canUseDom() &&
      (document.documentElement?.requestFullscreen ||
        document.documentElement?.webkitRequestFullscreen ||
        document.documentElement?.msRequestFullscreen),
  );

  const requestMultiScreenDetails = useCallback(async () => {
    if (typeof window !== 'undefined' && 'getScreenDetails' in window) {
      try {
        const screens = await window.getScreenDetails();
        return screens;
      } catch {
        return null;
      }
    }
    return null;
  }, []);

  return {
    isFullscreen: Boolean(fullscreenElement),
    isSupported,
    fullscreenElement,
    error,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    requestMultiScreenDetails,
    clearError,
  };
}

export default useFullscreen;
