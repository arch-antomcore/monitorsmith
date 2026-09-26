import { afterEach, describe, expect, it, vi } from 'vitest';
import { hasConfiguredAds, isValidAdSlot, resolveAdSlot } from '../../src/lib/adConfig';

afterEach(() => vi.unstubAllEnvs());

describe('advertising configuration', () => {
  it('only prompts for consent when a mounted placement has a valid slot', () => {
    vi.stubEnv('VITE_ADSENSE_SLOT_LIBRARY', '');
    vi.stubEnv('VITE_ADSENSE_SLOT_HERO', '1234567890');
    expect(hasConfiguredAds()).toBe(false);
    vi.stubEnv('VITE_ADSENSE_SLOT_LIBRARY', '0000000000');
    expect(hasConfiguredAds()).toBe(false);
    vi.stubEnv('VITE_ADSENSE_SLOT_LIBRARY', ' 1234567890 ');
    expect(resolveAdSlot('library')).toBe('1234567890');
    expect(hasConfiguredAds()).toBe(true);
  });

  it.each(['', 'replace-me', 'ca-pub-5926952327268950', '123.456', '12345'])('rejects placeholder or invalid slot %s', (slot) => {
    expect(isValidAdSlot(slot)).toBe(false);
  });
});
