import { describe, expect, it } from 'vitest';
import { ADSENSE_CLIENT, ADSENSE_SCRIPT_SRC } from '../../src/lib/consent';
import { ADS_TXT_RECORD, checkAdSenseHtml, checkAdsTxt } from '../../scripts/adsense-checks.mjs';

const meta = `<meta content="${ADSENSE_CLIENT}" name="google-adsense-account">`;
const page = (head = meta, body = '') => `<html><head>${head}</head><body>${body}</body></html>`;
const loader = `<script>var sc=document.createElement('script');sc.async=true;sc.crossOrigin='anonymous';sc.src='${ADSENSE_SCRIPT_SRC}';</script>`;

describe('public integration checks distinguish verification from ad serving', () => {
  it('accepts the metadata method without requiring ad requests', () => {
    expect(checkAdSenseHtml(page())).toEqual([]);
    expect(checkAdSenseHtml(page(meta, loader))).toEqual([]);
  });

  it('rejects missing, duplicated, misplaced and mismatched publisher metadata', () => {
    for (const html of [page(''), page(meta + meta), page('', meta), page(meta.replace(ADSENSE_CLIENT, 'ca-pub-1111111111111111'))]) {
      expect(checkAdSenseHtml(html).length).toBeGreaterThan(0);
    }
  });

  it('rejects malformed loaders, including a fixed snippet that bypasses consent', () => {
    for (const bad of [
      loader.replace('sc.async=true;', ''),
      loader.replace('anonymous', 'use-credentials'),
      loader.replace(ADSENSE_CLIENT, 'ca-pub-1111111111111111'),
      loader + loader,
      `<script async crossorigin="anonymous" src="${ADSENSE_SCRIPT_SRC}"></script>`,
    ]) expect(checkAdSenseHtml(page(meta, bad)).length).toBeGreaterThan(0);
  });

  it('checks real unit IDs and forbids units/loaders on error or migration pages', () => {
    const unit = `<ins class="adsbygoogle" data-ad-client="${ADSENSE_CLIENT}" data-ad-slot="1234567890"></ins>`;
    expect(checkAdSenseHtml(page(meta, unit))).toEqual([]);
    expect(checkAdSenseHtml(page(meta, unit.replace('1234567890', '0000000000'))).length).toBeGreaterThan(0);
    for (const body of [unit, loader]) expect(checkAdSenseHtml(page('', body), { allowAds: false }).length).toBeGreaterThan(0);
    expect(checkAdSenseHtml(page('', 'Page not found'), { allowAds: false })).toEqual([]);
  });

  it('validates the entire authorized seller record, not just the publisher substring', () => {
    expect(checkAdsTxt(`# Publisher\n${ADS_TXT_RECORD}\n`)).toEqual([]);
    for (const text of [
      `# ${ADS_TXT_RECORD}`, ADS_TXT_RECORD.replace('DIRECT', 'RESELLER'),
      ADS_TXT_RECORD.replace('f08c47fec0942fa0', 'bad'),
      ADS_TXT_RECORD.replace('google.com', 'example.com'),
      `${ADS_TXT_RECORD}\ngoogle.com, pub-1111111111111111, DIRECT, f08c47fec0942fa0`,
    ]) expect(checkAdsTxt(text)).toHaveLength(1);
  });
});
