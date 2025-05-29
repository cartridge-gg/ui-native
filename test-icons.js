const fs = require('fs');
const path = require('path');

// Check if all directional icon files exist
const directionalIconsDir = path.join(__dirname, 'components', 'icons', 'directional');
const expectedIcons = [
  'ArrowIcon.tsx',
  'ArrowFromLineIcon.tsx', 
  'ArrowToLineIcon.tsx',
  'CaratIcon.tsx',
  'ChevronIcon.tsx',
  'WedgeIcon.tsx'
];

console.log('🔍 Checking directional icons...');
console.log('================================');

expectedIcons.forEach(iconFile => {
  const iconPath = path.join(directionalIconsDir, iconFile);
  const exists = fs.existsSync(iconPath);
  console.log(`${exists ? '✅' : '❌'} ${iconFile}`);
});

// Check if index.ts exports all icons
const indexPath = path.join(directionalIconsDir, 'index.ts');
const indexContent = fs.readFileSync(indexPath, 'utf8');

console.log('\n📋 Checking exports in index.ts...');
console.log('===================================');

expectedIcons.forEach(iconFile => {
  const iconName = iconFile.replace('.tsx', '');
  const isExported = indexContent.includes(`export { ${iconName} }`);
  console.log(`${isExported ? '✅' : '❌'} ${iconName} exported`);
});

console.log('\n🎯 Summary:');
console.log(`Total directional icons: ${expectedIcons.length}`);
console.log('All icons should be available for stories and snapshots.');