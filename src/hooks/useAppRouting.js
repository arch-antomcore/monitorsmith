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
  const hashParts = location.hash.replace(/^#/, '').split('?');
  const hashValue = hashParts[0].trim().toLowerCase();
  const hashParams = new URLSearchParams(hashParts[1] || '');
  
  const searchParams = new URLSearchParams(location.search);
  const queryValue = searchParams.get('tool')?.trim().toLowerCase();

  const customColor = searchParams.get('color') || hashParams.get('color');
  const ambientBrightness = searchParams.get('brightness') || hashParams.get('brightness');
  
  const extractDynamicPreset = (basePreset) => {
    const preset = { ...basePreset };
    if (customColor && /^#?[0-9a-f]{6}$/i.test(customColor)) {
      preset.customColor = customColor.startsWith('#') ? customColor : `#${customColor}`;
    }
    if (ambientBrightness) {
      const parsed = parseInt(ambientBrightness, 10);
      if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 100) {
        preset.ambientBrightness = parsed;
      }
    }
    return preset;
  };

  for (const value of [hashValue, queryValue]) {
    if (!value) continue;
    if (value === MODES.HOME) return { mode: MODES.HOME, toolId: MODES.HOME, preset: {} };

    const tool = resolveToolLaunch(value);
    if (tool) {
      tool.preset = extractDynamicPreset(tool.preset);
      return tool;
    }

    const mode = Object.values(MODES).find((candidate) => candidate.toLowerCase() === value);
    if (mode) return { mode, toolId: mode, preset: extractDynamicPreset({}) };
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
      return activateMode(target.mode, target.toolId, target.preset);
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
