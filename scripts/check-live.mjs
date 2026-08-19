async function checkLive() {
  const urls = [
    'https://monitorsmith.app/',
    'https://monitorsmith.app/ads.txt',
    'https://monitorsmith.app/sitemap.xml',
    'https://monitorsmith.app/robots.txt',
    'https://monitorsmith.app/sobre/',
    'https://monitorsmith.app/contato/',
    'https://monitorsmith.app/blog/',
    'https://monitorsmith.app/teste-de-dead-pixel/',
    'https://monitorsmith.app/tela-preta-oled/',
    'https://monitorsmith.app/privacidade/',
    'https://monitorsmith.app/termos/'
  ];
  console.log('=== TESTE DE DISPONIBILIDADE EM PRODUÇÃO (LIVE) ===\n');
  let successCount = 0;
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } });
      const text = await res.text();
      const hasAdSense = text.includes('ca-pub-5926952327268950');
      console.log(`✅ [HTTP ${res.status}] ${url} (${text.length} bytes)${hasAdSense ? ' [AdSense Detectado]' : ''}`);
      if (res.status === 200) successCount++;
    } catch (e) {
      console.error(`❌ [ERRO] ${url}: ${e.message}`);
    }
  }
  console.log(`\nResultado: ${successCount}/${urls.length} URLs online com sucesso.`);
}

checkLive();
