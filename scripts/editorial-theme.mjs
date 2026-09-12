import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

/** Reuse the app's tokens and bundled fonts, without loading the app's layout CSS. */
export async function buildEditorialTheme(distDir) {
  const assetsDir = path.join(distDir, 'assets');
  const assets = await fs.readdir(assetsDir);
  const fonts = [
    ['IBM Plex Sans Variable', 'ibm-plex-sans-latin-wght-normal-', '100 900'],
    ['Chakra Petch', 'chakra-petch-latin-600-normal-', '600'],
    ['JetBrains Mono Variable', 'jetbrains-mono-latin-wght-normal-', '100 800'],
  ].map(([family, prefix, weight]) => {
    const file = assets.find((name) => name.startsWith(prefix) && name.endsWith('.woff2'));
    if (!file) throw new Error(`Missing editorial font: ${family}`);
    return `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:swap;src:url('./${file}') format('woff2')}`;
  }).join('\n');
  const [tokens, editorial] = await Promise.all([
    fs.readFile(new URL('../src/styles/brand-tokens.css', import.meta.url), 'utf8'),
    fs.readFile(new URL('../src/styles/editorial.css', import.meta.url), 'utf8'),
  ]);
  const css = `${fonts}\n${tokens}\n${editorial}`;
  const hash = createHash('sha256').update(css).digest('hex').slice(0, 12);
  const filename = `editorial-${hash}.css`;
  await fs.writeFile(path.join(assetsDir, filename), css, 'utf8');
  return (html) => html.replace('</head>', `<link rel="stylesheet" href="/assets/${filename}">\n</head>`);
}
