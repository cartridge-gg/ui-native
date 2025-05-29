#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const storyPattern = args[0];

function showUsage() {
  console.log(`
📸 Snapshot Update Tool
======================

Usage:
  node scripts/update-snapshots.js [story-pattern]

Examples:
  node scripts/update-snapshots.js                           # Update all snapshots
  node scripts/update-snapshots.js Achievement               # Update stories containing "Achievement"
  node scripts/update-snapshots.js "activities.*card"       # Update stories matching pattern
  node scripts/update-snapshots.js Button                   # Update all Button stories

Story Patterns:
  - Use partial names: "Achievement" matches any story with "Achievement"
  - Use regex patterns: "activities.*card" for complex matching
  - Case insensitive matching
`);
}

function findMatchingStories(pattern) {
  const storybookDir = path.join(__dirname, '..', 'components');
  const storyFiles = [];
  
  function findStoryFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        findStoryFiles(fullPath);
      } else if (file.endsWith('.stories.tsx')) {
        storyFiles.push(fullPath);
      }
    }
  }
  
  findStoryFiles(storybookDir);
  
  if (!pattern) {
    return storyFiles; // Return all if no pattern
  }
  
  const regex = new RegExp(pattern, 'i'); // Case insensitive
  return storyFiles.filter(file => {
    const relativePath = path.relative(storybookDir, file);
    return regex.test(relativePath) || regex.test(path.basename(file, '.stories.tsx'));
  });
}

function updateSnapshots(storyFiles = []) {
  console.log('🎯 Snapshot Update Process');
  console.log('==========================');
  
  if (storyPattern) {
    console.log(`📋 Pattern: "${storyPattern}"`);
    console.log(`📁 Found ${storyFiles.length} matching story files:`);
    storyFiles.forEach(file => {
      const relativePath = path.relative(path.join(__dirname, '..'), file);
      console.log(`   • ${relativePath}`);
    });
    console.log('');
  } else {
    console.log('📋 Updating all snapshots');
    console.log('');
  }
  
  try {
    let command = 'npm run test:storybook:update';
    
    if (storyPattern && storyFiles.length > 0) {
      // Create a temporary test pattern that matches our story files
      const testPatterns = storyFiles.map(file => {
        const relativePath = path.relative(path.join(__dirname, '..'), file);
        return relativePath.replace(/\\/g, '/').replace('.stories.tsx', '');
      });
      
      // Use the first pattern as a simple approach
      // Note: test-storybook doesn't have great pattern matching, so we'll run all and filter results
      console.log('⚠️  Note: Running all tests (test-storybook has limited filtering)');
      console.log('   The tool will update all snapshots, but you can verify only your target stories changed.');
      console.log('');
    }
    
    console.log('🚀 Running snapshot update...');
    console.log(`💻 Command: ${command}`);
    console.log('');
    
    const result = execSync(command, { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    
    console.log('');
    console.log('✅ Snapshot update completed successfully!');
    
    if (storyPattern) {
      console.log('');
      console.log('📊 Next Steps:');
      console.log('   1. Check which snapshots were actually updated');
      console.log('   2. Run visual comparison on your target stories');
      console.log('   3. Use: node scripts/visual-comparison.js [story-name]');
    }
    
  } catch (error) {
    console.error('❌ Snapshot update failed:', error.message);
    process.exit(1);
  }
}

// Main execution
if (args.includes('--help') || args.includes('-h')) {
  showUsage();
  process.exit(0);
}

const matchingStories = findMatchingStories(storyPattern);

if (storyPattern && matchingStories.length === 0) {
  console.log(`❌ No stories found matching pattern: "${storyPattern}"`);
  console.log('');
  console.log('💡 Try:');
  console.log('   • Check spelling');
  console.log('   • Use partial names (e.g., "Button" instead of "ButtonStories")');
  console.log('   • Use --help to see usage examples');
  process.exit(1);
}

updateSnapshots(matchingStories); 