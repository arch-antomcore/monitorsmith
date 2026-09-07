import { useRef } from 'react';
import { useToolStore } from '../store/toolStore';
import { MODE_IDS as MODES, DEFAULT_DOCK_MODES } from '../constants/shortcuts';

const SWIPE_EXCLUDED_SELECTOR = [
  'button',
  'a',
  'input',
  'textarea',
  'select',
  '[contenteditable]',
  '[role="dialog"]',
  '[role="slider"]',
  '.display-mode__controls',
  '.display-mode__reopen-panel-btn',
  '.calibration-lab__guide',
  '.wbp-navbar',
  '.wbp-dock',
  '[data-no-swipe="true"]',
].join(',');

function getModeId(mode) {
  return typeof mode === 'string' ? mode : mode?.id;
}

export function useAppSwipe(options = {}) {
  const { onActivity } = options;
  const { activeMode, activateMode } = useToolStore();
  const touchStartRef = useRef(null);

  const handleTouchStart = (e) => {
    if (onActivity) onActivity();
    if (e.touches?.length !== 1 || e.target?.closest?.(SWIPE_EXCLUDED_SELECTOR)) {
      touchStartRef.current = null;
      return;
    }

    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e) => {
    if (touchStartRef.current === null || !e.changedTouches?.length) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    const isHorizontalSwipe = Math.abs(deltaX) > 90 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5;
    if (isHorizontalSwipe && activeMode !== MODES.HOME) {
      const modeKeys = DEFAULT_DOCK_MODES.map(getModeId).filter(Boolean);
      const currIdx = modeKeys.indexOf(activeMode);
      if (currIdx !== -1) {
        const nextIdx = deltaX < 0
          ? (currIdx + 1) % modeKeys.length
          : (currIdx - 1 + modeKeys.length) % modeKeys.length;
        const nextTool = DEFAULT_DOCK_MODES[nextIdx];
        if (nextTool) {
          activateMode(nextTool.id, nextTool.toolId);
        }
      }
    }
  };

  const handleTouchCancel = () => {
    touchStartRef.current = null;
  };

  return { 
    onTouchStart: handleTouchStart, 
    onTouchEnd: handleTouchEnd, 
    onTouchCancel: handleTouchCancel 
  };
}
