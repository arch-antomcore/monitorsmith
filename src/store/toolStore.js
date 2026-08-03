import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_MODE, MODE_IDS, isDisplayMode } from '../constants/shortcuts';
import { resolveToolLaunch } from '../constants/tools';
import { useUIStore } from './uiStore';

export const useToolStore = create(
  persist(
    (set) => ({
      activeMode: DEFAULT_MODE,
      activeToolId: DEFAULT_MODE,
      activePreset: {},
      
      activateMode: (nextMode, requestedToolId = nextMode, preset = {}) => {
        if (!isDisplayMode(nextMode)) return false;
        const resolvedTool = resolveToolLaunch(requestedToolId);
        const nextToolId = nextMode === MODE_IDS.HOME
          ? MODE_IDS.HOME
          : resolvedTool?.mode === nextMode
            ? resolvedTool.toolId
            : nextMode;
            
        useUIStore.getState().setIsManualUiHidden(false);
        set({ activeMode: nextMode, activeToolId: nextToolId, activePreset: preset || {} });
        useUIStore.getState().setIsDockOpen(true);
        return true;
      },
    }),
    {
      name: 'ms_last_tool',
      partialize: (state) => ({
        activeMode: state.activeMode,
        activeToolId: state.activeToolId,
      }),
      onRehydrate: () => (state) => {
        if (state && !isDisplayMode(state.activeMode)) {
          state.activeMode = DEFAULT_MODE;
          state.activeToolId = DEFAULT_MODE;
        }
      },
    },
  ),
);
