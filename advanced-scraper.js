const { chromium } = require('playwright');
const fs = require('fs');

async function advancedScrape() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  console.log('Navigating to Node Capital...');
  await page.goto('https://www.node.capital/', { waitUntil: 'networkidle', timeout: 60000 });
  
  // Wait for page to fully load
  await page.waitForTimeout(5000);
  
  // Scroll through the page to load everything
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });
  
  await page.waitForTimeout(2000);
  
  // Take full page screenshot
  await page.screenshot({ path: 'full-page.png', fullPage: true });
  console.log('Full page screenshot saved');
  
  // Extract comprehensive page data
  const pageData = await page.evaluate(() => {
    const result = {
      bodyStyles: {},
      navigation: {},
      sections: [],
      animations: [],
      fonts: new Set(),
      colors: new Set()
    };
    
    // Get body styles
    const bodyStyles = window.getComputedStyle(document.body);
    result.bodyStyles = {
      backgroundColor: bodyStyles.backgroundColor,
      color: bodyStyles.color,
      fontFamily: bodyStyles.fontFamily,
      fontSize: bodyStyles.fontSize,
      lineHeight: bodyStyles.lineHeight,
      padding: bodyStyles.padding,
      margin: bodyStyles.margin
    };
    
    // Get navigation
    const nav = document.querySelector('nav, .navbar, [class*="nav"]');
    if (nav) {
      const navStyles = window.getComputedStyle(nav);
      const navLinks = Array.from(nav.querySelectorAll('a')).map(a => ({
        text: a.innerText,
        href: a.href
      }));
      
      result.navigation = {
        html: nav.outerHTML.substring(0, 500),
        position: navStyles.position,
        top: navStyles.top,
        backgroundColor: navStyles.backgroundColor,
        padding: navStyles.padding,
        height: navStyles.height,
        links: navLinks,
        boundingBox: nav.getBoundingClientRect()
      };
    }
    
    // Get all sections with detailed information
    const sections = document.querySelectorAll('section, [class*="section"]');
    sections.forEach((section, idx) => {
      const styles = window.getComputedStyle(section);
      const rect = section.getBoundingClientRect();
      
      const sectionData = {
        index: idx,
        id: section.id,
        className: section.className,
        tagName: section.tagName,
        boundingBox: {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left
        },
        styles: {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          padding: styles.padding,
          margin: styles.margin,
          display: styles.display,
          flexDirection: styles.flexDirection,
          alignItems: styles.alignItems,
          justifyContent: styles.justifyContent,
          gap: styles.gap,
          gridTemplateColumns: styles.gridTemplateColumns,
          minHeight: styles.minHeight,
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight,
          lineHeight: styles.lineHeight
        },
        content: {
          text: section.innerText.substring(0, 1000),
          html: section.innerHTML.substring(0, 2000)
        },
        children: []
      };
      
      // Analyze child elements
      const directChildren = Array.from(section.children);
      directChildren.forEach(child => {
        const childStyles = window.getComputedStyle(child);
        const childRect = child.getBoundingClientRect();
        
        sectionData.children.push({
          tagName: child.tagName,
          className: child.className,
          id: child.id,
          text: child.innerText?.substring(0, 200) || '',
          boundingBox: {
            width: childRect.width,
            height: childRect.height,
            top: childRect.top,
            left: childRect.left
          },
          styles: {
            display: childStyles.display,
            flexDirection: childStyles.flexDirection,
            gridTemplateColumns: childStyles.gridTemplateColumns,
            padding: childStyles.padding,
            margin: childStyles.margin,
            fontSize: childStyles.fontSize,
            fontWeight: childStyles.fontWeight,
            color: childStyles.color,
            backgroundColor: childStyles.backgroundColor,
            textAlign: childStyles.textAlign,
            gap: childStyles.gap
          }
        });
      });
      
      // Get headings in section
      const headings = Array.from(section.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      sectionData.headings = headings.map(h => {
        const hStyles = window.getComputedStyle(h);
        return {
          tag: h.tagName,
          text: h.innerText,
          styles: {
            fontSize: hStyles.fontSize,
            fontWeight: hStyles.fontWeight,
            color: hStyles.color,
            lineHeight: hStyles.lineHeight,
            letterSpacing: hStyles.letterSpacing,
            textTransform: hStyles.textTransform,
            marginBottom: hStyles.marginBottom,
            marginTop: hStyles.marginTop
          }
        };
      });
      
      // Get paragraphs
      const paragraphs = Array.from(section.querySelectorAll('p'));
      sectionData.paragraphs = paragraphs.slice(0, 5).map(p => {
        const pStyles = window.getComputedStyle(p);
        return {
          text: p.innerText,
          styles: {
            fontSize: pStyles.fontSize,
            fontWeight: pStyles.fontWeight,
            lineHeight: pStyles.lineHeight,
            color: pStyles.color,
            marginBottom: pStyles.marginBottom,
            maxWidth: pStyles.maxWidth
          }
        };
      });
      
      result.sections.push(sectionData);
      
      // Collect colors
      result.colors.add(styles.backgroundColor);
      result.colors.add(styles.color);
    });
    
    // Get all unique fonts
    document.querySelectorAll('*').forEach(el => {
      const styles = window.getComputedStyle(el);
      result.fonts.add(styles.fontFamily);
    });
    
    // Get animations
    const animatedElements = document.querySelectorAll('[style*="animation"], [class*="animate"]');
    animatedElements.forEach(el => {
      const styles = window.getComputedStyle(el);
      result.animations.push({
        className: el.className,
        animation: styles.animation,
        transition: styles.transition
      });
    });
    
    return {
      ...result,
      fonts: Array.from(result.fonts),
      colors: Array.from(result.colors)
    };
  });
  
  // Save the detailed data
  fs.writeFileSync('detailed-scrape.json', JSON.stringify(pageData, null, 2));
  console.log('Detailed scrape saved to detailed-scrape.json');
  
  // Take screenshots of each section
  const sections = await page.$$('section');
  for (let i = 0; i < sections.length; i++) {
    try {
      await sections[i].screenshot({ path: `section-${i}.png` });
      console.log(`Screenshot saved for section ${i}`);
    } catch (e) {
      console.log(`Could not screenshot section ${i}`);
    }
  }
  
  // Get CSS files
  const cssLinks = await page.$$eval('link[rel="stylesheet"]', links => 
    links.map(link => link.href)
  );
  console.log('CSS files:', cssLinks);
  
  // Get inline styles
  const inlineStyles = await page.$$eval('style', styles => 
    styles.map(s => s.innerHTML).join('\n')
  );
  fs.writeFileSync('inline-styles.css', inlineStyles);
  console.log('Inline styles saved');
  
  await browser.close();
  console.log('Scraping complete!');
}

advancedScrape().catch(console.error);

