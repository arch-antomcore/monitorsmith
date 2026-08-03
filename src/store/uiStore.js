import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
  persist(
    (set) => ({
      isDockOpen: true,
      setIsDockOpen: (isOpen) => set({ isDockOpen: isOpen }),
      
      isHelpOpen: false,
      setIsHelpOpen: (isOpen) => set({ isHelpOpen: isOpen }),
      
      isManualUiHidden: false,
      setIsManualUiHidden: (isHidden) => set({ isManualUiHidden: isHidden }),
      
      hasPersistentUiFocus: false,
      setHasPersistentUiFocus: (hasFocus) => set({ hasPersistentUiFocus: hasFocus }),
      
      toast: null,
      setToast: (toast) => set({ toast }),
      
      showToast: (key, message) => {
        set({ toast: { id: Date.now(), key, message } });
        if (window._toastTimer) window.clearTimeout(window._toastTimer);
        window._toastTimer = window.setTimeout(() => set({ toast: null }), 1800);
      },
      
      hideUiManually: () => {
        if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        set({ isManualUiHidden: true });
      },
    }),
    {
      name: 'ms_ui_prefs',
      partialize: (state) => ({
        isDockOpen: state.isDockOpen,
      }),
    },
  ),
);
