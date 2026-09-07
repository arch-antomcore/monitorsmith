import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { safeStorage } from '../lib/safeStorage';
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
        set({
          activeMode: nextMode,
          activeToolId: nextToolId,
          activePreset: { ...(resolvedTool?.mode === nextMode ? resolvedTool.preset : {}), ...(preset || {}) },
        });
        useUIStore.getState().setIsDockOpen(true);
        return true;
      },
    }),
    {
      name: 'ms_last_tool',
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({
        activeMode: state.activeMode,
        activeToolId: state.activeToolId,
      }),
      merge: (persisted, state) => {
        const mode = isDisplayMode(persisted?.activeMode) ? persisted.activeMode : DEFAULT_MODE;
        const tool = typeof persisted?.activeToolId === 'string' ? resolveToolLaunch(persisted.activeToolId) : null;
        return {
          ...state,
          activeMode: mode,
          activeToolId: tool?.mode === mode ? tool.toolId : mode,
          activePreset: tool?.mode === mode ? { ...tool.preset } : {},
        };
      },
    },
  ),
);
