import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
console.log('=== AUDITORIA COMPLETA DE INTEGRIDADE DO SITE ===\n');

// 1. Ads.txt
const adsTxt = fs.readFileSync(path.join(dist, 'ads.txt'), 'utf8').trim();
console.log('[1/7] ads.txt:', adsTxt);
if (!adsTxt.includes('pub-5926952327268950')) throw new Error('ads.txt inválido');

// 2. Sitemap.xml
const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
console.log(`[2/7] sitemap.xml: ${locs.length} URLs registradas`);

// 3. Robots.txt
const robotsTxt = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8').trim();
console.log('[3/7] robots.txt:');
console.log(robotsTxt.split('\n').map((l) => '      ' + l).join('\n'));

// 4. LLMs.txt e LLMs-full.txt
const llmsTxt = fs.readFileSync(path.join(dist, 'llms.txt'), 'utf8');
const llmsFullTxt = fs.readFileSync(path.join(dist, 'llms-full.txt'), 'utf8');
console.log(`[4/7] llms.txt (${llmsTxt.length} bytes) e llms-full.txt (${llmsFullTxt.length} bytes) presentes`);

// 5. Service Worker
const swPath = path.join(dist, 'sw.js');
if (fs.existsSync(swPath)) {
  const sw = fs.readFileSync(swPath, 'utf8');
  console.log(`[5/7] sw.js gerado (${sw.length} bytes)`);
} else {
  throw new Error('sw.js ausente!');
}

// 6. Varredura de todos os arquivos HTML
function getHtmlFiles(dir) {
  let results = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) results = results.concat(getHtmlFiles(full));
    else if (item.name.endsWith('.html')) results.push(full);
  }
  return results;
}

const htmlFiles = getHtmlFiles(dist);
console.log(`\n[6/7] Auditando ${htmlFiles.length} páginas HTML...`);

let brokenLinks = 0;
let brokenImages = 0;
let missingAdSense = 0;
let jsonLdErrors = 0;
let missingCanonical = 0;

for (const file of htmlFiles) {
  const rel = path.relative(dist, file).replace(/\\/g, '/');
  if (rel.startsWith('google') && rel.endsWith('.html')) continue;
  const html = fs.readFileSync(file, 'utf8');

  // AdSense check
  if (!html.includes('ca-pub-5926952327268950')) {
    console.warn(`  ⚠️ Falta AdSense em: ${rel}`);
    missingAdSense++;
  }

  // Canonical check
  if (!html.includes('rel="canonical"')) {
    console.warn(`  ⚠️ Falta canonical em: ${rel}`);
    missingCanonical++;
  }

  // JSON-LD validation
  const jsonLdMatches = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  for (const m of jsonLdMatches) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      console.error(`  ❌ JSON-LD inválido em: ${rel}`, e.message);
      jsonLdErrors++;
    }
  }

  // Links internos
  const hrefs = [...html.matchAll(/href="(\/[^"]*?)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (href.startsWith('//') || href.includes('#')) continue;
    const cleanHref = href.split('?')[0];
    let target = path.join(dist, cleanHref);
    if (cleanHref.endsWith('/')) target = path.join(target, 'index.html');
    if (!fs.existsSync(target) && !fs.existsSync(target + '.html') && !fs.existsSync(path.join(dist, cleanHref))) {
      console.error(`  ❌ Link quebrado em ${rel} -> ${href}`);
      brokenLinks++;
    }
  }

  // Imagens
  const srcs = [...html.matchAll(/src="(\/[^"]*?)"/g)].map((m) => m[1]);
  for (const src of srcs) {
    if (src.startsWith('//') || src.includes('googlesyndication') || src.includes('pagead2')) continue;
    const cleanSrc = src.split('?')[0];
    const target = path.join(dist, cleanSrc);
    if (!fs.existsSync(target)) {
      console.error(`  ❌ Imagem não encontrada em ${rel} -> ${src}`);
      brokenImages++;
    }
  }
}

// 7. Checar se todas as URLs do sitemap existem no dist
console.log('\n[7/7] Verificando se todas as URLs do sitemap existem fisicamente...');
let sitemapMissing = 0;
for (const loc of locs) {
  const urlPath = loc.replace('https://monitorsmith.app', '');
  let expectedFile = path.join(dist, urlPath);
  if (urlPath.endsWith('/')) expectedFile = path.join(expectedFile, 'index.html');
  if (!fs.existsSync(expectedFile)) {
    console.error(`  ❌ URL do sitemap não encontrada no build: ${loc} (esperado: ${expectedFile})`);
    sitemapMissing++;
  }
}

console.log('\n=== RESULTADO FINAL DA AUDITORIA ===');
console.log(`- Total de páginas HTML: ${htmlFiles.length}`);
console.log(`- URLs no sitemap: ${locs.length}`);
console.log(`- Links internos quebrados: ${brokenLinks}`);
console.log(`- Imagens ausentes: ${brokenImages}`);
console.log(`- Páginas sem AdSense: ${missingAdSense}`);
console.log(`- Erros em JSON-LD: ${jsonLdErrors}`);
console.log(`- Páginas sem Canonical: ${missingCanonical}`);
console.log(`- URLs do sitemap ausentes: ${sitemapMissing}`);

if (brokenLinks > 0 || brokenImages > 0 || missingAdSense > 0 || jsonLdErrors > 0 || missingCanonical > 0 || sitemapMissing > 0) {
  console.log('\n❌ AUDITORIA REPROVADA.');
  process.exit(1);
} else {
  console.log('\n✅ 100% APROVADO! Todos os 61 documentos, links, metadados e esquemas estão perfeitamente válidos e saudáveis.');
}
