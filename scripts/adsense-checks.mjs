import { ADSENSE_CLIENT, ADSENSE_SCRIPT_SRC } from '../src/lib/consent.js';

export const ADS_TXT_RECORD = `google.com, ${ADSENSE_CLIENT.slice(3)}, DIRECT, f08c47fec0942fa0`;

// Validate the public integration, not account approval or ownership.
export function checkAdsTxt(text) {
  const records = text.split(/\r?\n/).map((line) => line.split('#')[0].trim()).filter(Boolean);
  return records.length === 1 && records[0].split(',').map((field) => field.trim()).join(', ') === ADS_TXT_RECORD
    ? [] : ['ads.txt deve conter o registro Google DIRECT completo do publisher configurado'];
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\s${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1];
}

export function checkAdSenseHtml(html, { allowAds = true } = {}) {
  const errors = [];
  const tags = [...html.matchAll(/<script\b[^>]*>/gi)].map(([tag]) => tag);
  const units = [...html.matchAll(/<ins\b[^>]*>/gi)].map(([tag]) => tag)
    .filter((tag) => attribute(tag, 'class')?.split(/\s+/).includes('adsbygoogle'));
  const loaders = tags.filter((tag) => attribute(tag, 'src')?.includes('adsbygoogle.js'));
  const dynamicLoaders = [...html.matchAll(/\b(\w+)\.src\s*=\s*["']([^"']*adsbygoogle\.js[^"']*)["']/g)];
  if (!allowAds) {
    if (units.length || loaders.length || dynamicLoaders.length) errors.push('tela de erro ou migração não pode solicitar anúncios');
    return errors;
  }

  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '';
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => tag)
    .filter((tag) => attribute(tag, 'name') === 'google-adsense-account');
  if (metas.length !== 1 || attribute(metas[0], 'content') !== ADSENSE_CLIENT || !head.includes(metas[0])) {
    errors.push('head deve ter exatamente uma meta google-adsense-account com o publisher correto');
  }
  if ([...html.matchAll(/ca-pub-\d+/g)].some(([client]) => client !== ADSENSE_CLIENT)) {
    errors.push('HTML contém outro publisher AdSense');
  }
  for (const tag of loaders) {
    if (attribute(tag, 'src') !== ADSENSE_SCRIPT_SRC || !/\sasync(?:\s|=|>)/i.test(tag) || attribute(tag, 'crossorigin') !== 'anonymous') {
      errors.push('snippet AdSense deve usar URL exata, async e crossorigin="anonymous"');
    }
    // A fixed loader bypasses the site's explicit-consent gate.
    errors.push('loader AdSense fixo no HTML contorna o consentimento explícito');
  }
  for (const [, variable, url] of dynamicLoaders) {
    if (url !== ADSENSE_SCRIPT_SRC
      || !new RegExp(`\\b${variable}\\.async\\s*=\\s*true\\b`).test(html)
      || !new RegExp(`\\b${variable}\\.crossOrigin\\s*=\\s*["']anonymous["']`).test(html)) {
      errors.push('loader dinâmico AdSense deve usar URL exata, async e crossorigin="anonymous"');
    }
  }
  if (dynamicLoaders.length > 1) errors.push('loader AdSense duplicado na página');
  for (const tag of units) {
    const slot = attribute(tag, 'data-ad-slot') || '';
    if (attribute(tag, 'data-ad-client') !== ADSENSE_CLIENT || !/^\d{6,}$/.test(slot) || /^0+$/.test(slot)) {
      errors.push('unidade AdSense sem publisher/slot válido');
    }
  }
  return errors;
}
