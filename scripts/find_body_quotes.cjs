const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'Xgm', 'Desktop', 'APPWBP', 'scripts', 'blog-articles-productivity.mjs');
let content = fs.readFileSync(filePath, 'utf-8');

const bodyRegex = /body:\s*`([\s\S]*?)`/g;
let bodyMatch;
while ((bodyMatch = bodyRegex.exec(content)) !== null) {
  const bodyText = bodyMatch[1];
  const quoteRegex = /"([^"]+)"/g;
  let qMatch;
  while ((qMatch = quoteRegex.exec(bodyText)) !== null) {
    if (!bodyText.slice(Math.max(0, qMatch.index - 5), qMatch.index).includes('=')) {
      console.log('Body quote:', qMatch[1]);
    }
  }
}
