const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'Xgm', 'Desktop', 'APPWBP', 'scripts', 'blog-articles-productivity.mjs');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Image at the top
const imgTag = '<figure><img src="/images/blog/productivity.jpg" alt="Setup noturno estético com dois monitores" /><figcaption>Figura 1: Estação de trabalho otimizada para foco com configuração dual-monitor.</figcaption></figure>';
content = content.replace(/(body:\s*`\s*)/g, `$1${imgTag}\n      `);

// 2. Wrap long quotes or technical citations. Let's find double quotes in the text.
// We only want to wrap quotes that are part of the text (not attributes like href="..." or class="...").
// Since this is HTML, text is outside < >. But to be safe, maybe we can just look for quotes preceded by a space or start of line?
// Actually, looking at the previous script, let's first log what quotes exist in the file.
const regex = /"([^"]{30,})"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  // Check if it's an attribute by seeing if it's preceded by an equal sign
  const index = match.index;
  const precededByEqual = content.slice(Math.max(0, index - 5), index).includes('=');
  if (!precededByEqual) {
    console.log('Found long quote:', match[1]);
  }
}

// Write it temporarily to a separate file so we can inspect
fs.writeFileSync('c:/Users/Xgm/Desktop/APPWBP/scripts/blog-articles-productivity-test.mjs', content, 'utf-8');
