import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => console.log('BROWSER:', msg.text()));
  
  // Assuming dev server is running on 5173
  await page.goto('http://localhost:5173/#green-screen');
  
  await page.waitForTimeout(2000);
  
  const heading = await page.locator('h1').textContent();
  console.log('Heading:', heading);
  
  const input = await page.locator('input[type="color"]').getAttribute('value');
  console.log('Color input value:', input);
  
  await browser.close();
})();
