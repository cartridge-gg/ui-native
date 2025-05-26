#!/usr/bin/env node

/**
 * Visual Comparison Script
 * 
 * This script helps compare React Native components with their web counterparts
 * by organizing screenshots and generating comparison reports.
 */

const fs = require('fs');
const path = require('path');

const COMPARISON_DIR = path.join(__dirname, '..', 'visual-comparisons');
const WEB_SNAPSHOTS_DIR = path.join(__dirname, '..', '..', 'ui', '__image_snapshots__');
const RN_SNAPSHOTS_DIR = path.join(__dirname, '..', '__image_snapshots__');

// Ensure comparison directory exists
if (!fs.existsSync(COMPARISON_DIR)) {
  fs.mkdirSync(COMPARISON_DIR, { recursive: true });
}

/**
 * Generate HTML comparison report
 */
function generateComparisonReport() {
  const webSnapshots = fs.existsSync(WEB_SNAPSHOTS_DIR) 
    ? fs.readdirSync(WEB_SNAPSHOTS_DIR).filter(f => f.endsWith('.png'))
    : [];
  
  const rnSnapshots = fs.existsSync(RN_SNAPSHOTS_DIR)
    ? fs.readdirSync(RN_SNAPSHOTS_DIR).filter(f => f.endsWith('.png'))
    : [];

  const comparisons = [];
  
  // Find matching components
  webSnapshots.forEach(webFile => {
    const componentName = webFile.replace('--', '_').replace('-chromium.png', '');
    const matchingRN = rnSnapshots.find(rnFile => 
      rnFile.includes(componentName) || componentName.includes(rnFile.replace('.png', ''))
    );
    
    comparisons.push({
      component: componentName,
      web: webFile,
      reactNative: matchingRN || null,
      status: matchingRN ? 'matched' : 'missing'
    });
  });

  // Generate HTML report
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>UI Component Comparison - Web vs React Native</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
    .header { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .comparison { background: white; margin-bottom: 20px; border-radius: 8px; overflow: hidden; }
    .comparison-header { background: #333; color: white; padding: 15px; }
    .comparison-content { display: flex; }
    .comparison-side { flex: 1; padding: 20px; text-align: center; }
    .comparison-side img { max-width: 100%; border: 1px solid #ddd; border-radius: 4px; }
    .status-matched { color: #28a745; }
    .status-missing { color: #dc3545; }
    .stats { display: flex; gap: 20px; margin-bottom: 20px; }
    .stat { background: white; padding: 15px; border-radius: 8px; text-align: center; flex: 1; }
  </style>
</head>
<body>
  <div class="header">
    <h1>UI Component Migration Progress</h1>
    <p>Visual comparison between Web (React) and React Native implementations</p>
  </div>
  
  <div class="stats">
    <div class="stat">
      <h3>${comparisons.filter(c => c.status === 'matched').length}</h3>
      <p>Components Migrated</p>
    </div>
    <div class="stat">
      <h3>${comparisons.filter(c => c.status === 'missing').length}</h3>
      <p>Pending Migration</p>
    </div>
    <div class="stat">
      <h3>${Math.round((comparisons.filter(c => c.status === 'matched').length / comparisons.length) * 100)}%</h3>
      <p>Migration Progress</p>
    </div>
  </div>

  ${comparisons.map(comp => `
    <div class="comparison">
      <div class="comparison-header">
        <h3>${comp.component} <span class="status-${comp.status}">(${comp.status})</span></h3>
      </div>
      <div class="comparison-content">
        <div class="comparison-side">
          <h4>Web (React)</h4>
          <img src="../../../ui/__image_snapshots__/${comp.web}" alt="Web version" />
        </div>
        <div class="comparison-side">
          <h4>React Native</h4>
          ${comp.reactNative 
            ? `<img src="../__image_snapshots__/${comp.reactNative}" alt="React Native version" />`
            : '<p style="color: #999; font-style: italic;">Not yet implemented</p>'
          }
        </div>
      </div>
    </div>
  `).join('')}
</body>
</html>
  `;

  fs.writeFileSync(path.join(COMPARISON_DIR, 'index.html'), html);
  console.log(`✅ Comparison report generated: ${path.join(COMPARISON_DIR, 'index.html')}`);
  console.log(`📊 Progress: ${comparisons.filter(c => c.status === 'matched').length}/${comparisons.length} components migrated`);
}

/**
 * List components that need migration
 */
function listPendingComponents() {
  const webSnapshots = fs.existsSync(WEB_SNAPSHOTS_DIR) 
    ? fs.readdirSync(WEB_SNAPSHOTS_DIR).filter(f => f.endsWith('.png'))
    : [];
  
  const rnSnapshots = fs.existsSync(RN_SNAPSHOTS_DIR)
    ? fs.readdirSync(RN_SNAPSHOTS_DIR).filter(f => f.endsWith('.png'))
    : [];

  console.log('\n📋 Components pending migration:');
  console.log('================================');
  
  webSnapshots.forEach(webFile => {
    const componentName = webFile.replace('--', '_').replace('-chromium.png', '');
    const matchingRN = rnSnapshots.find(rnFile => 
      rnFile.includes(componentName) || componentName.includes(rnFile.replace('.png', ''))
    );
    
    if (!matchingRN) {
      console.log(`❌ ${componentName}`);
    }
  });
}

// CLI interface
const command = process.argv[2];

switch (command) {
  case 'report':
    generateComparisonReport();
    break;
  case 'list':
    listPendingComponents();
    break;
  default:
    console.log('Usage:');
    console.log('  node visual-comparison.js report  - Generate HTML comparison report');
    console.log('  node visual-comparison.js list    - List pending components');
} 