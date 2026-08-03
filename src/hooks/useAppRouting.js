import { useEffect, useRef } from 'react';
import { useToolStore } from '../store/toolStore';
import { MODE_IDS as MODES } from '../constants/shortcuts';
import { resolveToolLaunch } from '../constants/tools';

function buildNavigationHref(toolId) {
  const url = new URL(window.location.href);
  url.searchParams.delete('tool');
  if (!toolId || toolId === MODES.HOME) {
    url.hash = '';
  } else {
    url.hash = toolId;
  }
  return `${url.pathname}${url.search}${url.hash}`;
}

function resolveLocationLaunch(location) {
  const hashValue = location.hash.replace(/^#/, '').trim().toLowerCase();
  const queryValue = new URLSearchParams(location.search).get('tool')?.trim().toLowerCase();

  for (const value of [hashValue, queryValue]) {
    if (!value) continue;
    if (value === MODES.HOME) return { mode: MODES.HOME, toolId: MODES.HOME, preset: {} };

    const tool = resolveToolLaunch(value);
    if (tool) return tool;

    const mode = Object.values(MODES).find((candidate) => candidate.toLowerCase() === value);
    if (mode) return { mode, toolId: mode, preset: {} };
  }

  return {
    mode: MODES.HOME,
    toolId: MODES.HOME,
    preset: {},
    preserveHash: Boolean(hashValue),
  };
}

export function useAppRouting() {
  const { activeMode, activeToolId, activateMode } = useToolStore();
  const pendingLocationRef = useRef(null);
  const hasResolvedInitialLocationRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const activateUrlTarget = (target) => {
      // Custom color and brightness removed from URL parsing as we pushed state down
      return activateMode(target.mode, target.toolId);
    };

    const handleUrlState = () => {
      const target = resolveLocationLaunch(window.location);
      pendingLocationRef.current = target;
      hasResolvedInitialLocationRef.current = true;
      activateUrlTarget(target);
    };
    
    handleUrlState();
    window.addEventListener('popstate', handleUrlState);
    return () => {
      window.removeEventListener('popstate', handleUrlState);
    };
  }, [activateMode]);

  useEffect(() => {
    if (typeof window === 'undefined' || !hasResolvedInitialLocationRef.current) return;

    const pendingLocation = pendingLocationRef.current;
    const desiredHref = buildNavigationHref(activeToolId);
    const currentHref = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (pendingLocation) {
      if (
        pendingLocation.mode !== activeMode
        || pendingLocation.toolId !== activeToolId
      ) {
        return;
      }

      if (currentHref !== desiredHref) {
        window.history.replaceState({ monitorSmithTool: activeToolId }, '', desiredHref);
      }
      pendingLocationRef.current = null;
      return;
    }

    if (currentHref !== desiredHref) {
      window.history.pushState({ monitorSmithTool: activeToolId }, '', desiredHref);
    }
  }, [activeMode, activeToolId]);
}
