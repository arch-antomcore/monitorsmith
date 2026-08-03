import { create } from 'zustand';
import { DEFAULT_MODE, MODE_IDS, isDisplayMode } from '../constants/shortcuts';
import { resolveToolLaunch } from '../constants/tools';
import { useUIStore } from './uiStore';

export const useToolStore = create((set, get) => ({
  activeMode: DEFAULT_MODE,
  activeToolId: DEFAULT_MODE,
  
  activateMode: (nextMode, requestedToolId = nextMode) => {
    if (!isDisplayMode(nextMode)) return false;
    const resolvedTool = resolveToolLaunch(requestedToolId);
    const nextToolId = nextMode === MODE_IDS.HOME
      ? MODE_IDS.HOME
      : resolvedTool?.mode === nextMode
        ? resolvedTool.toolId
        : nextMode;
        
    useUIStore.getState().setIsManualUiHidden(false);
    set({ activeMode: nextMode, activeToolId: nextToolId });
    useUIStore.getState().setIsDockOpen(true);
    return true;
  },
}));
