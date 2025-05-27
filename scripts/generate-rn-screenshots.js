#!/usr/bin/env node

/**
 * Generate Real React Native Screenshots
 * 
 * This script generates actual React Native screenshots from Storybook
 * using Chromatic or Playwright for visual testing.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SNAPSHOTS_DIR = path.join(__dirname, '..', '__image_snapshots__');
const STORYBOOK_PORT = 6006;

console.log('🎨 Generating Real React Native Screenshots...\n');

/**
 * Check if Storybook is running
 */
function isStorybookRunning() {
  try {
    execSync(`curl -s http://localhost:${STORYBOOK_PORT} > /dev/null`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Start Storybook if not running
 */
function startStorybook() {
  console.log('📚 Starting Storybook...');
  try {
    // Start Storybook in background
    execSync('pnpm storybook &', { stdio: 'inherit' });
    
    // Wait for Storybook to start
    let attempts = 0;
    while (!isStorybookRunning() && attempts < 30) {
      console.log(`⏳ Waiting for Storybook to start... (${attempts + 1}/30)`);
      execSync('sleep 2');
      attempts++;
    }
    
    if (!isStorybookRunning()) {
      throw new Error('Storybook failed to start');
    }
    
    console.log('✅ Storybook is running on http://localhost:6006\n');
    return true;
  } catch (error) {
    console.error('❌ Failed to start Storybook:', error.message);
    return false;
  }
}

/**
 * Generate screenshots using Chromatic
 */
function generateWithChromatic() {
  console.log('📸 Generating screenshots with Chromatic...');
  
  try {
    // Run Chromatic to generate screenshots
    execSync('npx chromatic --exit-zero-on-changes --only-changed=false', {
      stdio: 'inherit',
      env: { ...process.env, CHROMATIC_PROJECT_TOKEN: process.env.CHROMATIC_PROJECT_TOKEN }
    });
    
    console.log('✅ Chromatic screenshots generated');
    return true;
  } catch (error) {
    console.error('❌ Chromatic failed:', error.message);
    return false;
  }
}

/**
 * Generate screenshots using Playwright (fallback)
 */
function generateWithPlaywright() {
  console.log('📸 Generating screenshots with Playwright...');
  
  try {
    // Install Playwright if not available
    try {
      execSync('npx playwright --version', { stdio: 'ignore' });
    } catch {
      console.log('📦 Installing Playwright...');
      execSync('npx playwright install chromium', { stdio: 'inherit' });
    }
    
    // Create a simple Playwright script to take screenshots
    const playwrightScript = `
const { chromium } = require('${path.join(process.cwd(), 'node_modules', 'playwright')}');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to Storybook
  await page.goto('http://localhost:${STORYBOOK_PORT}');
  await page.waitForLoadState('networkidle');
  
  // Get all stories
  const stories = await page.evaluate(() => {
    const iframe = document.querySelector('#storybook-preview-iframe');
    if (!iframe) return [];
    
    // This is a simplified approach - in reality you'd need to parse the Storybook API
    return [
      'primitives-badge--default',
      'primitives-button--default',
      'primitives-card--default',
      'primitives-checkbox--default',
      'primitives-input--default',
      'primitives-modal--default',
      'primitives-progress--default',
      'primitives-select--default',
      'primitives-tabs--default',
      'primitives-toast--default',
      'primitives-toggle--default'
    ];
  });
  
  console.log('Found', stories.length, 'stories to screenshot');
  
  // Take screenshots of each story
  for (const story of stories) {
    try {
      await page.goto(\`http://localhost:${STORYBOOK_PORT}/iframe.html?id=\${story}\`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000); // Wait for animations
      
      const screenshot = await page.screenshot({
        path: path.join('${SNAPSHOTS_DIR}', \`\${story}-chromium.png\`),
        fullPage: false,
        clip: { x: 0, y: 0, width: 800, height: 600 }
      });
      
      console.log('✅ Screenshot taken:', story);
    } catch (error) {
      console.error('❌ Failed to screenshot', story, ':', error.message);
    }
  }
  
  await browser.close();
  console.log('✅ Playwright screenshots completed');
})();
`;
    
    // Write and execute the Playwright script
    fs.writeFileSync('/tmp/screenshot-script.js', playwrightScript);
    execSync('node /tmp/screenshot-script.js', { stdio: 'inherit' });
    fs.unlinkSync('/tmp/screenshot-script.js');
    
    return true;
  } catch (error) {
    console.error('❌ Playwright failed:', error.message);
    return false;
  }
}

/**
 * Clean up old placeholder files
 */
function cleanupPlaceholders() {
  console.log('🧹 Cleaning up placeholder files...');
  
  if (!fs.existsSync(SNAPSHOTS_DIR)) {
    return;
  }
  
  const files = fs.readdirSync(SNAPSHOTS_DIR);
  let cleaned = 0;
  
  files.forEach(file => {
    const filePath = path.join(SNAPSHOTS_DIR, file);
    const stat = fs.statSync(filePath);
    
    // If file is very small (likely a placeholder text file)
    if (stat.size < 100) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('PLACEHOLDER:')) {
          fs.unlinkSync(filePath);
          cleaned++;
        }
      } catch {
        // File might be binary, skip
      }
    }
  });
  
  console.log(`✅ Cleaned up ${cleaned} placeholder files\n`);
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting React Native Screenshot Generation\n');
  
  // Check if Storybook is running, start if needed
  if (!isStorybookRunning()) {
    if (!startStorybook()) {
      console.error('❌ Cannot proceed without Storybook');
      process.exit(1);
    }
  } else {
    console.log('✅ Storybook is already running\n');
  }
  
  // Clean up old placeholders
  cleanupPlaceholders();
  
  // Try Chromatic first, fallback to Playwright
  let success = false;
  
  if (process.env.CHROMATIC_PROJECT_TOKEN) {
    success = generateWithChromatic();
  }
  
  if (!success) {
    console.log('🔄 Falling back to Playwright...\n');
    success = generateWithPlaywright();
  }
  
  if (success) {
    console.log('\n🎉 Screenshot generation completed!');
    console.log('📁 Screenshots saved to:', SNAPSHOTS_DIR);
    console.log('\n💡 Next steps:');
    console.log('   1. Run: node scripts/visual-comparison.js screenshots');
    console.log('   2. Run: node scripts/visual-comparison.js report');
    console.log('   3. Open: visual-comparisons/index.html');
  } else {
    console.error('\n❌ Screenshot generation failed');
    console.log('\n💡 Manual alternatives:');
    console.log('   1. Set CHROMATIC_PROJECT_TOKEN environment variable');
    console.log('   2. Use Storybook test-runner with screenshot addon');
    console.log('   3. Manually take screenshots from http://localhost:6006');
  }
}

// CLI interface
const command = process.argv[2];

switch (command) {
  case 'generate':
  case undefined:
    main();
    break;
  case 'cleanup':
    cleanupPlaceholders();
    break;
  case 'check':
    console.log('Storybook running:', isStorybookRunning());
    break;
  default:
    console.log('Usage:');
    console.log('  node generate-rn-screenshots.js [generate] - Generate React Native screenshots');
    console.log('  node generate-rn-screenshots.js cleanup    - Clean up placeholder files');
    console.log('  node generate-rn-screenshots.js check      - Check if Storybook is running');
} 

/**
 * Generate Real React Native Screenshots
 * 
 * This script generates actual React Native screenshots from Storybook
 * using Chromatic or Playwright for visual testing.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SNAPSHOTS_DIR = path.join(__dirname, '..', '__image_snapshots__');
const STORYBOOK_PORT = 6006;

console.log('🎨 Generating Real React Native Screenshots...\n');

/**
 * Check if Storybook is running
 */
function isStorybookRunning() {
  try {
    execSync(`curl -s http://localhost:${STORYBOOK_PORT} > /dev/null`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Start Storybook if not running
 */
function startStorybook() {
  console.log('📚 Starting Storybook...');
  try {
    // Start Storybook in background
    execSync('pnpm storybook &', { stdio: 'inherit' });
    
    // Wait for Storybook to start
    let attempts = 0;
    while (!isStorybookRunning() && attempts < 30) {
      console.log(`⏳ Waiting for Storybook to start... (${attempts + 1}/30)`);
      execSync('sleep 2');
      attempts++;
    }
    
    if (!isStorybookRunning()) {
      throw new Error('Storybook failed to start');
    }
    
    console.log('✅ Storybook is running on http://localhost:6006\n');
    return true;
  } catch (error) {
    console.error('❌ Failed to start Storybook:', error.message);
    return false;
  }
}

/**
 * Generate screenshots using Chromatic
 */
function generateWithChromatic() {
  console.log('📸 Generating screenshots with Chromatic...');
  
  try {
    // Run Chromatic to generate screenshots
    execSync('npx chromatic --exit-zero-on-changes --only-changed=false', {
      stdio: 'inherit',
      env: { ...process.env, CHROMATIC_PROJECT_TOKEN: process.env.CHROMATIC_PROJECT_TOKEN }
    });
    
    console.log('✅ Chromatic screenshots generated');
    return true;
  } catch (error) {
    console.error('❌ Chromatic failed:', error.message);
    return false;
  }
}

/**
 * Generate screenshots using Playwright (fallback)
 */
function generateWithPlaywright() {
  console.log('📸 Generating screenshots with Playwright...');
  
  try {
    // Install Playwright if not available
    try {
      execSync('npx playwright --version', { stdio: 'ignore' });
    } catch {
      console.log('📦 Installing Playwright...');
      execSync('npx playwright install chromium', { stdio: 'inherit' });
    }
    
    // Create a simple Playwright script to take screenshots
    const playwrightScript = `
const { chromium } = require('${path.join(process.cwd(), 'node_modules', 'playwright')}');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to Storybook
  await page.goto('http://localhost:${STORYBOOK_PORT}');
  await page.waitForLoadState('networkidle');
  
  // Get all stories
  const stories = await page.evaluate(() => {
    const iframe = document.querySelector('#storybook-preview-iframe');
    if (!iframe) return [];
    
    // This is a simplified approach - in reality you'd need to parse the Storybook API
    return [
      'primitives-badge--default',
      'primitives-button--default',
      'primitives-card--default',
      'primitives-checkbox--default',
      'primitives-input--default',
      'primitives-modal--default',
      'primitives-progress--default',
      'primitives-select--default',
      'primitives-tabs--default',
      'primitives-toast--default',
      'primitives-toggle--default'
    ];
  });
  
  console.log('Found', stories.length, 'stories to screenshot');
  
  // Take screenshots of each story
  for (const story of stories) {
    try {
      await page.goto(\`http://localhost:${STORYBOOK_PORT}/iframe.html?id=\${story}\`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000); // Wait for animations
      
      const screenshot = await page.screenshot({
        path: path.join('${SNAPSHOTS_DIR}', \`\${story}-chromium.png\`),
        fullPage: false,
        clip: { x: 0, y: 0, width: 800, height: 600 }
      });
      
      console.log('✅ Screenshot taken:', story);
    } catch (error) {
      console.error('❌ Failed to screenshot', story, ':', error.message);
    }
  }
  
  await browser.close();
  console.log('✅ Playwright screenshots completed');
})();
`;
    
    // Write and execute the Playwright script
    fs.writeFileSync('/tmp/screenshot-script.js', playwrightScript);
    execSync('node /tmp/screenshot-script.js', { stdio: 'inherit' });
    fs.unlinkSync('/tmp/screenshot-script.js');
    
    return true;
  } catch (error) {
    console.error('❌ Playwright failed:', error.message);
    return false;
  }
}

/**
 * Clean up old placeholder files
 */
function cleanupPlaceholders() {
  console.log('🧹 Cleaning up placeholder files...');
  
  if (!fs.existsSync(SNAPSHOTS_DIR)) {
    return;
  }
  
  const files = fs.readdirSync(SNAPSHOTS_DIR);
  let cleaned = 0;
  
  files.forEach(file => {
    const filePath = path.join(SNAPSHOTS_DIR, file);
    const stat = fs.statSync(filePath);
    
    // If file is very small (likely a placeholder text file)
    if (stat.size < 100) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('PLACEHOLDER:')) {
          fs.unlinkSync(filePath);
          cleaned++;
        }
      } catch {
        // File might be binary, skip
      }
    }
  });
  
  console.log(`✅ Cleaned up ${cleaned} placeholder files\n`);
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting React Native Screenshot Generation\n');
  
  // Check if Storybook is running, start if needed
  if (!isStorybookRunning()) {
    if (!startStorybook()) {
      console.error('❌ Cannot proceed without Storybook');
      process.exit(1);
    }
  } else {
    console.log('✅ Storybook is already running\n');
  }
  
  // Clean up old placeholders
  cleanupPlaceholders();
  
  // Try Chromatic first, fallback to Playwright
  let success = false;
  
  if (process.env.CHROMATIC_PROJECT_TOKEN) {
    success = generateWithChromatic();
  }
  
  if (!success) {
    console.log('🔄 Falling back to Playwright...\n');
    success = generateWithPlaywright();
  }
  
  if (success) {
    console.log('\n🎉 Screenshot generation completed!');
    console.log('📁 Screenshots saved to:', SNAPSHOTS_DIR);
    console.log('\n💡 Next steps:');
    console.log('   1. Run: node scripts/visual-comparison.js screenshots');
    console.log('   2. Run: node scripts/visual-comparison.js report');
    console.log('   3. Open: visual-comparisons/index.html');
  } else {
    console.error('\n❌ Screenshot generation failed');
    console.log('\n💡 Manual alternatives:');
    console.log('   1. Set CHROMATIC_PROJECT_TOKEN environment variable');
    console.log('   2. Use Storybook test-runner with screenshot addon');
    console.log('   3. Manually take screenshots from http://localhost:6006');
  }
}

// CLI interface
const command = process.argv[2];

switch (command) {
  case 'generate':
  case undefined:
    main();
    break;
  case 'cleanup':
    cleanupPlaceholders();
    break;
  case 'check':
    console.log('Storybook running:', isStorybookRunning());
    break;
  default:
    console.log('Usage:');
    console.log('  node generate-rn-screenshots.js [generate] - Generate React Native screenshots');
    console.log('  node generate-rn-screenshots.js cleanup    - Clean up placeholder files');
    console.log('  node generate-rn-screenshots.js check      - Check if Storybook is running');
} 