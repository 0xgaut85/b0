const { chromium } = require('playwright');

const companies = [
  { name: 'Tempo', website: 'https://www.tempo.io/' },
  { name: 'Better Payment Network', website: 'https://betterpayment.network/' },
  { name: 'Voyage', website: 'https://voyage.wtf/' },
  { name: 'Legend', website: 'https://www.legend.lol/' },
  { name: 'Ryder', website: 'https://www.ryder.xyz/' }
];

async function findTwitterHandle(page, websiteUrl) {
  try {
    console.log(`  → Visiting ${websiteUrl}`);
    await page.goto(websiteUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(2000);
    
    const handle = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href*="twitter.com"], a[href*="x.com"]'));
      for (const link of links) {
        const href = link.href;
        const match = href.match(/(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)/);
        if (match && match[1] && !['intent', 'share', 'home'].includes(match[1])) {
          return match[1];
        }
      }
      return null;
    });
    
    return handle;
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  const results = [];
  
  for (const company of companies) {
    console.log(`\n🔍 ${company.name}`);
    
    const handle = await findTwitterHandle(page, company.website);
    
    if (handle) {
      console.log(`  ✅ Found: @${handle}`);
      results.push({ name: company.name, twitter: handle, success: true });
    } else {
      console.log(`  ❌ No Twitter handle found`);
      results.push({ name: company.name, success: false });
    }
    
    await page.waitForTimeout(1000);
  }
  
  await browser.close();
  
  console.log('\n\n📊 Results:');
  console.log('='.repeat(50));
  results.forEach(r => {
    if (r.success) {
      console.log(`✅ ${r.name.padEnd(25)} @${r.twitter}`);
    } else {
      console.log(`❌ ${r.name.padEnd(25)} NOT FOUND`);
    }
  });
  
  console.log('\n\n📝 Code to update:\n');
  results.filter(r => r.success).forEach(r => {
    console.log(`  { name: '${r.name}', twitter: '${r.twitter}' },`);
  });
}

main().catch(console.error);

