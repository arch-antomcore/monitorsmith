/**
 * Safely trigger haptic feedback on supported devices.
 * 
 * @param {number|number[]} pattern - The vibration pattern in milliseconds.
 */
export function triggerHaptic(pattern = 10) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      // Ignore errors on devices that don't support vibration or block it
    }
  }
}

export const HAPTIC_PATTERNS = {
  light: 10,
  medium: 20,
  heavy: 40,
  success: [10, 50, 20],
  error: [20, 50, 20, 50, 20]
};
