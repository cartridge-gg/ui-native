#!/usr/bin/env node

/**
 * Comprehensive Screenshot Generation Script
 * 
 * This script generates screenshots for all Storybook stories using the test runner,
 * matching the UI library's approach for complete coverage.
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const SNAPSHOTS_DIR = path.join(__dirname, '..', '__image_snapshots__');
const STORYBOOK_PORT = 6006;
const STORYBOOK_URL = `http://localhost:${STORYBOOK_PORT}`;

console.log('🎨 Comprehensive Screenshot Generation\n');

/**
 * Check if Storybook is running
 */
function isStorybookRunning() {
  try {
    execSync(`curl -s ${STORYBOOK_URL} > /dev/null`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Start Storybook if not running
 */
async function ensureStorybookRunning() {
  if (isStorybookRunning()) {
    console.log('✅ Storybook is already running\n');
    return true;
  }

  console.log('📚 Starting Storybook...');
  
  return new Promise((resolve, reject) => {
    // Start Storybook in background
    const storybookProcess = spawn('pnpm', ['storybook'], {
      stdio: 'pipe',
      detached: false
    });

    let output = '';
    storybookProcess.stdout.on('data', (data) => {
      output += data.toString();
      if (output.includes('Local:') || output.includes('localhost:6006')) {
        console.log('✅ Storybook started successfully\n');
        resolve(true);
      }
    });

    storybookProcess.stderr.on('data', (data) => {
      const error = data.toString();
      if (!error.includes('webpack') && !error.includes('info')) {
        console.error('Storybook error:', error);
      }
    });

    // Timeout after 60 seconds
    setTimeout(() => {
      if (!isStorybookRunning()) {
        storybookProcess.kill();
        reject(new Error('Storybook failed to start within 60 seconds'));
      }
    }, 60000);
  });
}

/**
 * Clean up old screenshots and diffs
 */
function cleanupOldFiles() {
  console.log('🧹 Cleaning up old screenshots...');
  
  if (fs.existsSync(SNAPSHOTS_DIR)) {
    const files = fs.readdirSync(SNAPSHOTS_DIR);
    let cleaned = 0;
    
    files.forEach(file => {
      const filePath = path.join(SNAPSHOTS_DIR, file);
      const stat = fs.statSync(filePath);
      
      // Remove old screenshots and diff files
      if (file.endsWith('.png') || file.endsWith('-diff.png') || file.includes('__diff_output__')) {
        try {
          if (stat.isDirectory()) {
            fs.rmSync(filePath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(filePath);
          }
          cleaned++;
        } catch (error) {
          console.warn(`Warning: Could not remove ${file}:`, error.message);
        }
      }
    });
    
    console.log(`✅ Cleaned up ${cleaned} old files\n`);
  } else {
    fs.mkdirSync(SNAPSHOTS_DIR, { recursive: true });
    console.log('✅ Created snapshots directory\n');
  }
}

/**
 * Generate screenshots using Storybook test runner
 */
async function generateScreenshots(updateMode = false) {
  console.log('📸 Generating screenshots with Storybook test runner...');
  
  try {
    const command = updateMode ? 'test:storybook:update' : 'test:storybook';
    const env = {
      ...process.env,
      STORYBOOK_IMAGE_SNAPSHOT_FAILURE_THRESHOLD: '0.001',
      STORYBOOK_IMAGE_SNAPSHOT_DIFF_THRESHOLD: '0.1',
      STORYBOOK_IMAGE_SNAPSHOT_FAILURE_THRESHOLD_TYPE: 'percent'
    };
    
    console.log(`Running: pnpm ${command}\n`);
    
    execSync(`pnpm ${command}`, {
      stdio: 'inherit',
      env,
      cwd: process.cwd()
    });
    
    console.log('\n✅ Screenshot generation completed successfully!');
    return true;
  } catch (error) {
    console.error('\n❌ Screenshot generation failed:', error.message);
    
    // Provide helpful debugging information
    console.log('\n🔍 Debugging information:');
    console.log('- Storybook URL:', STORYBOOK_URL);
    console.log('- Snapshots directory:', SNAPSHOTS_DIR);
    console.log('- Current working directory:', process.cwd());
    
    return false;
  }
}

/**
 * Analyze generated screenshots
 */
function analyzeScreenshots() {
  console.log('\n📊 Analyzing generated screenshots...');
  
  if (!fs.existsSync(SNAPSHOTS_DIR)) {
    console.log('❌ No snapshots directory found');
    return;
  }
  
  const files = fs.readdirSync(SNAPSHOTS_DIR);
  const screenshots = files.filter(f => f.endsWith('.png') && !f.includes('-diff'));
  const diffs = files.filter(f => f.includes('-diff.png'));
  
  console.log(`📸 Generated screenshots: ${screenshots.length}`);
  console.log(`🔍 Diff files: ${diffs.length}`);
  
  if (screenshots.length > 0) {
    console.log('\n📋 Screenshot summary:');
    const categories = {};
    
    screenshots.forEach(file => {
      const category = file.split('--')[0] || 'other';
      if (!categories[category]) categories[category] = 0;
      categories[category]++;
    });
    
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} screenshots`);
    });
  }
  
  if (diffs.length > 0) {
    console.log('\n⚠️  Visual differences detected:');
    diffs.forEach(diff => {
      console.log(`  - ${diff}`);
    });
  }
}

/**
 * Generate visual comparison report
 */
function generateReport() {
  console.log('\n📄 Generating visual comparison report...');
  
  try {
    execSync('node scripts/visual-comparison.js report', {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('✅ Visual comparison report generated');
    console.log('🌐 Open: visual-comparisons/index.html');
  } catch (error) {
    console.warn('⚠️  Could not generate visual comparison report:', error.message);
  }
}

/**
 * Main execution function
 */
async function main() {
  const args = process.argv.slice(2);
  const updateMode = args.includes('--update') || args.includes('-u');
  const skipCleanup = args.includes('--no-cleanup');
  const skipReport = args.includes('--no-report');
  
  try {
    // Ensure Storybook is running
    await ensureStorybookRunning();
    
    // Clean up old files unless skipped
    if (!skipCleanup) {
      cleanupOldFiles();
    }
    
    // Generate screenshots
    const success = await generateScreenshots(updateMode);
    
    if (success) {
      // Analyze results
      analyzeScreenshots();
      
      // Generate comparison report unless skipped
      if (!skipReport) {
        generateReport();
      }
      
      console.log('\n🎉 Screenshot generation completed successfully!');
      console.log('\n💡 Next steps:');
      console.log('   1. Review screenshots in __image_snapshots__/');
      console.log('   2. Check visual-comparisons/index.html for comparisons');
      console.log('   3. Commit new/updated screenshots to version control');
      
    } else {
      console.log('\n💡 Troubleshooting:');
      console.log('   1. Ensure Storybook is running: pnpm storybook');
      console.log('   2. Check for TypeScript/build errors');
      console.log('   3. Try running with --update flag to regenerate baselines');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// CLI interface
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'help':
    case '--help':
    case '-h':
      console.log('Usage:');
      console.log('  node scripts/generate-screenshots.js [options]');
      console.log('');
      console.log('Options:');
      console.log('  --update, -u      Update existing screenshot baselines');
      console.log('  --no-cleanup      Skip cleaning up old screenshots');
      console.log('  --no-report       Skip generating visual comparison report');
      console.log('  --help, -h        Show this help message');
      console.log('');
      console.log('Examples:');
      console.log('  node scripts/generate-screenshots.js');
      console.log('  node scripts/generate-screenshots.js --update');
      console.log('  node scripts/generate-screenshots.js --no-cleanup --no-report');
      break;
    default:
      main();
  }
} 