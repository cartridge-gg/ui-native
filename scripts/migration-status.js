const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const UI_SNAPSHOTS_DIR = path.join(__dirname, '../ui/__image_snapshots__');
const NATIVE_SNAPSHOTS_DIR = path.join(__dirname, '../__image_snapshots__');
const VISUAL_COMPARISONS_DIR = path.join(__dirname, '../visual-comparisons');
const TARGET_SIMILARITY = 95.0;

// Ensure visual comparisons directory exists
if (!fs.existsSync(VISUAL_COMPARISONS_DIR)) {
    fs.mkdirSync(VISUAL_COMPARISONS_DIR, { recursive: true });
}

function getSnapshotFiles(dir) {
    if (!fs.existsSync(dir)) {
        return [];
    }
    return fs.readdirSync(dir)
        .filter(file => file.endsWith('.png'))
        .map(file => file.replace('.png', ''));
}

function findMatchingPairs() {
    const uiSnapshots = getSnapshotFiles(UI_SNAPSHOTS_DIR);
    const nativeSnapshots = getSnapshotFiles(NATIVE_SNAPSHOTS_DIR);
    
    const pairs = [];
    const uiOnly = [];
    const nativeOnly = [];
    
    // Find exact matches
    for (const uiSnapshot of uiSnapshots) {
        if (nativeSnapshots.includes(uiSnapshot)) {
            pairs.push(uiSnapshot);
        } else {
            uiOnly.push(uiSnapshot);
        }
    }
    
    // Find native-only snapshots
    for (const nativeSnapshot of nativeSnapshots) {
        if (!uiSnapshots.includes(nativeSnapshot)) {
            nativeOnly.push(nativeSnapshot);
        }
    }
    
    return { pairs, uiOnly, nativeOnly };
}

function calculateSimilarity(uiImagePath, nativeImagePath) {
    try {
        // Use ImageMagick to compare images with SSIM metric
        const result = execSync(`compare -metric SSIM "${uiImagePath}" "${nativeImagePath}" null:`, { 
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'pipe']
        });
        
        const similarity = parseFloat(result.trim()) * 100;
        return similarity;
    } catch (error) {
        // ImageMagick returns exit code 1 when images are different, check stderr for actual result
        if (error.stderr) {
            const ssimMatch = error.stderr.match(/([0-9.]+)/);
            if (ssimMatch) {
                const similarity = parseFloat(ssimMatch[1]) * 100;
                return similarity;
            }
        }
        
        // If SSIM fails, try AE (Absolute Error) metric
        try {
            const result = execSync(`compare -metric AE "${uiImagePath}" "${nativeImagePath}" null:`, { 
                encoding: 'utf8',
                stdio: ['pipe', 'pipe', 'pipe']
            });
            
            const pixelDiff = parseInt(result.trim());
            
            // Get image dimensions to calculate total pixels
            const identify = execSync(`identify -format "%w %h" "${uiImagePath}"`, { encoding: 'utf8' });
            const [width, height] = identify.trim().split(' ').map(Number);
            const totalPixels = width * height;
            
            // Calculate similarity as percentage of matching pixels
            const similarity = Math.max(0, ((totalPixels - pixelDiff) / totalPixels) * 100);
            return similarity;
        } catch (secondError) {
            // Check if AE result is in stderr
            if (secondError.stderr) {
                const aeMatch = secondError.stderr.match(/([0-9]+)/);
                if (aeMatch) {
                    const pixelDiff = parseInt(aeMatch[1]);
                    
                    try {
                        // Get image dimensions to calculate total pixels
                        const identify = execSync(`identify -format "%w %h" "${uiImagePath}"`, { encoding: 'utf8' });
                        const [width, height] = identify.trim().split(' ').map(Number);
                        const totalPixels = width * height;
                        
                        // Calculate similarity as percentage of matching pixels
                        const similarity = Math.max(0, ((totalPixels - pixelDiff) / totalPixels) * 100);
                        return similarity;
                    } catch (identifyError) {
                        console.warn(`⚠️  Could not get image dimensions: ${identifyError.message}`);
                        return null;
                    }
                }
            }
            
            console.warn(`⚠️  Could not calculate similarity for images: ${secondError.message}`);
            return null;
        }
    }
}

function categorizeComponents(pairs) {
    const categories = {
        icons: [],
        buttons: [],
        inputs: [],
        typography: [],
        primitives: [],
        modules: [],
        other: []
    };
    
    for (const pair of pairs) {
        if (pair.includes('icons')) {
            categories.icons.push(pair);
        } else if (pair.includes('button')) {
            categories.buttons.push(pair);
        } else if (pair.includes('input') || pair.includes('textarea') || pair.includes('select')) {
            categories.inputs.push(pair);
        } else if (pair.includes('typography')) {
            categories.typography.push(pair);
        } else if (pair.startsWith('primitives-')) {
            categories.primitives.push(pair);
        } else if (pair.startsWith('modules-')) {
            categories.modules.push(pair);
        } else {
            categories.other.push(pair);
        }
    }
    
    return categories;
}

function analyzeCategory(categoryName, components) {
    console.log(`\n📊 ${categoryName.toUpperCase()} ANALYSIS`);
    console.log('='.repeat(50));
    
    if (components.length === 0) {
        console.log('❌ No components found in this category');
        return { total: 0, above95: 0, above90: 0, below90: 0, avgSimilarity: 0 };
    }
    
    const results = [];
    let totalSimilarity = 0;
    let validComparisons = 0;
    
    for (const component of components) {
        const uiPath = path.join(UI_SNAPSHOTS_DIR, `${component}.png`);
        const nativePath = path.join(NATIVE_SNAPSHOTS_DIR, `${component}.png`);
        
        if (fs.existsSync(uiPath) && fs.existsSync(nativePath)) {
            const similarity = calculateSimilarity(uiPath, nativePath);
            if (similarity !== null) {
                results.push({ component, similarity });
                totalSimilarity += similarity;
                validComparisons++;
                
                const status = similarity >= TARGET_SIMILARITY ? '✅' : 
                             similarity >= 90 ? '⚠️ ' : '❌';
                console.log(`${status} ${component}: ${similarity.toFixed(1)}%`);
            } else {
                console.log(`⚠️  ${component}: Could not calculate similarity`);
            }
        } else {
            console.log(`❌ ${component}: Missing files`);
        }
    }
    
    const avgSimilarity = validComparisons > 0 ? totalSimilarity / validComparisons : 0;
    const above95 = results.filter(r => r.similarity >= 95).length;
    const above90 = results.filter(r => r.similarity >= 90 && r.similarity < 95).length;
    const below90 = results.filter(r => r.similarity < 90).length;
    
    console.log(`\n📈 Category Summary:`);
    console.log(`   Total components: ${components.length}`);
    console.log(`   Valid comparisons: ${validComparisons}`);
    console.log(`   Average similarity: ${avgSimilarity.toFixed(1)}%`);
    console.log(`   ✅ Above 95%: ${above95} (${((above95/validComparisons)*100).toFixed(1)}%)`);
    console.log(`   ⚠️  90-95%: ${above90} (${((above90/validComparisons)*100).toFixed(1)}%)`);
    console.log(`   ❌ Below 90%: ${below90} (${((below90/validComparisons)*100).toFixed(1)}%)`);
    
    return { 
        total: validComparisons, 
        above95, 
        above90, 
        below90, 
        avgSimilarity,
        results: results.sort((a, b) => b.similarity - a.similarity)
    };
}

function generateMigrationReport() {
    console.log('🎯 UI LIBRARY MIGRATION STATUS REPORT');
    console.log('='.repeat(60));
    
    const { pairs, uiOnly, nativeOnly } = findMatchingPairs();
    
    console.log(`\n📊 SNAPSHOT OVERVIEW`);
    console.log(`   UI snapshots: ${getSnapshotFiles(UI_SNAPSHOTS_DIR).length}`);
    console.log(`   UI-Native snapshots: ${getSnapshotFiles(NATIVE_SNAPSHOTS_DIR).length}`);
    console.log(`   Matching pairs: ${pairs.length}`);
    console.log(`   UI-only: ${uiOnly.length}`);
    console.log(`   Native-only: ${nativeOnly.length}`);
    
    // Categorize components
    const categories = categorizeComponents(pairs);
    
    // Analyze each category
    const categoryResults = {};
    for (const [categoryName, components] of Object.entries(categories)) {
        categoryResults[categoryName] = analyzeCategory(categoryName, components);
    }
    
    // Overall summary
    console.log(`\n🎯 OVERALL MIGRATION PROGRESS`);
    console.log('='.repeat(60));
    
    let totalComponents = 0;
    let totalAbove95 = 0;
    let totalAbove90 = 0;
    let totalBelow90 = 0;
    let weightedSimilarity = 0;
    
    for (const [categoryName, results] of Object.entries(categoryResults)) {
        if (results.total > 0) {
            totalComponents += results.total;
            totalAbove95 += results.above95;
            totalAbove90 += results.above90;
            totalBelow90 += results.below90;
            weightedSimilarity += results.avgSimilarity * results.total;
        }
    }
    
    const overallAvgSimilarity = totalComponents > 0 ? weightedSimilarity / totalComponents : 0;
    const migrationProgress = totalComponents > 0 ? (totalAbove95 / totalComponents) * 100 : 0;
    
    console.log(`📈 Migration Progress: ${migrationProgress.toFixed(1)}% (${totalAbove95}/${totalComponents} components at 95%+)`);
    console.log(`📊 Overall Average Similarity: ${overallAvgSimilarity.toFixed(1)}%`);
    console.log(`✅ Components at 95%+: ${totalAbove95}`);
    console.log(`⚠️  Components at 90-95%: ${totalAbove90}`);
    console.log(`❌ Components below 90%: ${totalBelow90}`);
    
    // Priority recommendations
    console.log(`\n🎯 PRIORITY RECOMMENDATIONS`);
    console.log('='.repeat(60));
    
    // Find components closest to 95% threshold
    const nearThreshold = [];
    for (const [categoryName, results] of Object.entries(categoryResults)) {
        for (const result of results.results || []) {
            if (result.similarity >= 90 && result.similarity < 95) {
                nearThreshold.push({ ...result, category: categoryName });
            }
        }
    }
    
    nearThreshold.sort((a, b) => b.similarity - a.similarity);
    
    if (nearThreshold.length > 0) {
        console.log(`🔧 Components close to 95% threshold (quick wins):`);
        nearThreshold.slice(0, 10).forEach(item => {
            console.log(`   ${item.component} (${item.category}): ${item.similarity.toFixed(1)}%`);
        });
    }
    
    // Show worst performers that need major work
    const needMajorWork = [];
    for (const [categoryName, results] of Object.entries(categoryResults)) {
        for (const result of results.results || []) {
            if (result.similarity < 80) {
                needMajorWork.push({ ...result, category: categoryName });
            }
        }
    }
    
    needMajorWork.sort((a, b) => a.similarity - b.similarity);
    
    if (needMajorWork.length > 0) {
        console.log(`\n🚨 Components needing major work (<80% similarity):`);
        needMajorWork.slice(0, 10).forEach(item => {
            console.log(`   ${item.component} (${item.category}): ${item.similarity.toFixed(1)}%`);
        });
    }
    
    // Missing components
    if (uiOnly.length > 0) {
        console.log(`\n📋 Missing UI-Native implementations (${uiOnly.length} components):`);
        const categorizedMissing = categorizeComponents(uiOnly);
        for (const [categoryName, components] of Object.entries(categorizedMissing)) {
            if (components.length > 0) {
                console.log(`   ${categoryName}: ${components.length} components`);
                components.slice(0, 5).forEach(comp => console.log(`     - ${comp}`));
                if (components.length > 5) {
                    console.log(`     ... and ${components.length - 5} more`);
                }
            }
        }
    }
    
    return {
        totalComponents,
        migrationProgress,
        overallAvgSimilarity,
        categoryResults,
        nearThreshold,
        needMajorWork,
        uiOnly,
        nativeOnly
    };
}

// Run the analysis
if (require.main === module) {
    generateMigrationReport();
}

module.exports = { generateMigrationReport, findMatchingPairs, categorizeComponents };