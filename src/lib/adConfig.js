export function resolveAdSlot(placement, explicitSlot) {
  if (explicitSlot) return String(explicitSlot).trim();
  const slots = {
    hero: import.meta.env.VITE_ADSENSE_SLOT_HERO,
    library: import.meta.env.VITE_ADSENSE_SLOT_LIBRARY,
    sidebar: import.meta.env.VITE_ADSENSE_SLOT_LIBRARY,
    footer: import.meta.env.VITE_ADSENSE_SLOT_FOOTER,
  };
  return String(slots[placement] || '').trim();
}

export const isValidAdSlot = (value) => /^\d{6,}$/.test(value) && !/^0+$/.test(value);

// Only the library placement is currently mounted in the application.
export const hasConfiguredAds = () => isValidAdSlot(resolveAdSlot('library'));
