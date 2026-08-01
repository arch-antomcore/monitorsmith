import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

const SRC_DESKTOP = 'C:\\Users\\Xgm\\Desktop\\Universal\\Icons\\phosphor-icons\\SVGs';
const OUT_DIR = path.join(root, 'raw-svgs');

if (fs.existsSync(OUT_DIR)) {
  fs.rmSync(OUT_DIR, { recursive: true });
}
fs.mkdirSync(OUT_DIR, { recursive: true });

const toKebab = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

// Define icons that are known to be used.
const usedIcons = new Set([
  'CaretLeft', 'CaretRight',
  'ArrowLeft', 'Broom', 'ChatTeardropText', 'Clock', 'Compass',
  'CornersIn', 'CornersOut', 'EyeSlash', 'GridFour', 'House',
  'Lightning', 'Moon', 'Palette', 'Question', 'Slideshow',
  'Sparkle', 'SunDim', 'Timer', 'X',
  'LinkedinLogo', 'Minus', 'Plus', 'ArrowRight',
  'ArrowClockwise', 'DeviceMobile', 'HardDrives',
  'CheckCircle', 'Gavel', 'Warning', 'TerminalWindow', 'Sun'
]);

const weights = ['bold', 'duotone', 'fill', 'regular', 'light', 'thin'];

let copiedCount = 0;

for (const icon of usedIcons) {
  const kebab = toKebab(icon);
  for (const weight of weights) {
    let fileName = weight === 'regular' ? `${kebab}.svg` : `${kebab}-${weight}.svg`;
    let srcFile = path.join(SRC_DESKTOP, weight, fileName);
    
    if (fs.existsSync(srcFile)) {
      let destName = weight === 'regular' ? `${icon}Regular.svg` : `${icon}${weight.charAt(0).toUpperCase() + weight.slice(1)}.svg`;
      fs.copyFileSync(srcFile, path.join(OUT_DIR, destName));
      copiedCount++;
    } else {
      console.warn(`Missing: ${srcFile}`);
    }
  }
}

console.log(`Copied ${copiedCount} SVG files to raw-svgs/`);
