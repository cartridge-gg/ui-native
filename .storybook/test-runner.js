module.exports = {
  async postRender(page, context) {
    // Only take screenshots if SNAPSHOT environment variable is set
    if (process.env.SNAPSHOT) {
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
      await page.waitForTimeout(100);
      
      const image = await page.screenshot({
        fullPage: false,
        clip: { x: 0, y: 0, width: 800, height: 600 }
      });
      
      // Save screenshot directly to file
      const fs = require('fs');
      const path = require('path');
      const snapshotsDir = path.join(process.cwd(), '__image_snapshots__');
      
      if (!fs.existsSync(snapshotsDir)) {
        fs.mkdirSync(snapshotsDir, { recursive: true });
      }
      
      const filename = `${context.id}-chromium.png`;
      const filepath = path.join(snapshotsDir, filename);
      
      fs.writeFileSync(filepath, image);
      console.log(`✅ Screenshot saved: ${filename}`);
    }
  }
}; 