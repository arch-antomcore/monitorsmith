const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'Xgm', 'Desktop', 'APPWBP', 'scripts', 'blog-articles-productivity.mjs');
const content = fs.readFileSync(filePath, 'utf-8');

const regex = /"([^"]{30,})"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log('Quote:', match[1]);
}
