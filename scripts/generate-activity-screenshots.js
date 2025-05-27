const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SNAPSHOTS_DIR = path.join(__dirname, '..', '__image_snapshots__');
const STORYBOOK_URL = 'http://localhost:6006';

const activityCardStories = [
  'modules-activities-card--game',
  'modules-activities-card--token', 
  'modules-activities-card--achievement',
  'modules-activities-card--loading',
  'modules-activities-card--error',
  'modules-activities-card--interactive',
  'modules-activities-card--all-states'
];

async function generateActivityCardScreenshots() {
  console.log('🎨 Generating ActivityCard Screenshots...\n');

  if (!fs.existsSync(SNAPSHOTS_DIR)) {
    fs.mkdirSync(SNAPSHOTS_DIR, { recursive: true });
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const storyId of activityCardStories) {
    try {
      console.log(`📸 Capturing ${storyId}...`);
      
      const url = `${STORYBOOK_URL}/iframe.html?id=${storyId}`;
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Disable animations
      await page.addStyleTag({
        content: `
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
          }
        `
      });
      
      // Wait a moment for styles to apply
      await page.waitForTimeout(500);
      
      // Get the content dimensions to ensure we capture everything
      const contentBox = await page.evaluate(() => {
        const storyRoot = document.querySelector('#storybook-root');
        if (storyRoot) {
          const rect = storyRoot.getBoundingClientRect();
          return {
            width: Math.max(800, Math.ceil(rect.width + 32)), // Add padding
            height: Math.max(600, Math.ceil(rect.height + 32)) // Add padding
          };
        }
        return { width: 800, height: 600 };
      });

      const image = await page.screenshot({
        fullPage: false,
        clip: { x: 0, y: 0, width: contentBox.width, height: contentBox.height }
      });
      
      const filename = `${storyId}-chromium.png`;
      const filepath = path.join(SNAPSHOTS_DIR, filename);
      
      fs.writeFileSync(filepath, image);
      console.log(`✅ Screenshot saved: ${filename}`);
      
    } catch (error) {
      console.error(`❌ Error capturing ${storyId}:`, error.message);
    }
  }

  await browser.close();
  console.log('\n🎉 ActivityCard screenshots generation complete!');
}

generateActivityCardScreenshots().catch(console.error); 