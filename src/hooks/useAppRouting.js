import { useEffect, useRef } from 'react';
import { useToolStore } from '../store/toolStore';
import { MODE_IDS as MODES } from '../constants/shortcuts';
import { resolveToolLaunch } from '../constants/tools';

export function buildNavigationHref(toolId, preset = {}, href = window.location.href) {
  const url = new URL(href);
  url.searchParams.delete('tool');
  url.searchParams.delete('color');
  url.searchParams.delete('brightness');
  if (!toolId || toolId === MODES.HOME) {
    url.hash = '';
  } else {
    url.hash = toolId;
    const defaults = resolveToolLaunch(toolId)?.preset || {};
    if (preset.customColor && preset.customColor.toLowerCase() !== defaults.customColor?.toLowerCase()) {
      url.searchParams.set('color', preset.customColor.replace(/^#/, ''));
    }
    if (Number.isFinite(preset.ambientBrightness) && preset.ambientBrightness !== defaults.ambientBrightness) {
      url.searchParams.set('brightness', String(preset.ambientBrightness));
    }
  }
  return `${url.pathname}${url.search}${url.hash}`;
}

export function resolveLocationLaunch(location) {
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
      const parsed = /^\d{1,3}$/.test(ambientBrightness) ? Number(ambientBrightness) : NaN;
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
  const { activeMode, activeToolId, activePreset, activateMode } = useToolStore();
  const pendingLocationRef = useRef(null);
  const hasResolvedInitialLocationRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const activateUrlTarget = (target) => {
      return activateMode(target.mode, target.toolId, target.preset);
    };

    const handleUrlState = () => {
      const target = resolveLocationLaunch(window.location);
      // Native section/skip links must keep their anchor and current tool.
      if (hasResolvedInitialLocationRef.current && target.preserveHash
        && document.getElementById(window.location.hash.slice(1))) return;
      pendingLocationRef.current = target;
      hasResolvedInitialLocationRef.current = true;
      activateUrlTarget(target);
    };
    
    handleUrlState();
    window.addEventListener('popstate', handleUrlState);
    window.addEventListener('hashchange', handleUrlState);
    return () => {
      window.removeEventListener('popstate', handleUrlState);
      window.removeEventListener('hashchange', handleUrlState);
    };
  }, [activateMode]);

  useEffect(() => {
    if (typeof window === 'undefined' || !hasResolvedInitialLocationRef.current) return;

    const pendingLocation = pendingLocationRef.current;
    const currentLocation = resolveLocationLaunch(window.location);
    const currentHashId = window.location.hash.slice(1);

    // Keep real in-page anchors stable while the home state re-renders.
    if (
      activeMode === MODES.HOME
      && currentLocation.preserveHash
      && document.getElementById(currentHashId)
    ) {
      pendingLocationRef.current = null;
      return;
    }

    const desiredHref = buildNavigationHref(activeToolId, activePreset);
    const currentHref = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (pendingLocation) {
      if (
        pendingLocation.mode !== activeMode
        || pendingLocation.toolId !== activeToolId
      ) {
        return;
      }

      if (!pendingLocation.preserveHash && currentHref !== desiredHref) {
        window.history.replaceState({ monitorSmithTool: activeToolId }, '', desiredHref);
      }
      pendingLocationRef.current = null;
      return;
    }

    if (currentHref !== desiredHref) {
      window.history.pushState({ monitorSmithTool: activeToolId }, '', desiredHref);
    }
  }, [activeMode, activeToolId, activePreset]);
}
