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

function calculateSimilarityAccurate(uiImagePath, nativeImagePath) {
    try {
        // Use the same logic as the working visual-comparison.js script
        
        // Get image dimensions
        const uiDimensions = execSync(`identify -format "%w %h" "${uiImagePath}"`, { encoding: 'utf8' }).trim().split(' ');
        const nativeDimensions = execSync(`identify -format "%w %h" "${nativeImagePath}"`, { encoding: 'utf8' }).trim().split(' ');
        
        const uiWidth = parseInt(uiDimensions[0]);
        const uiHeight = parseInt(uiDimensions[1]);
        const nativeWidth = parseInt(nativeDimensions[0]);
        const nativeHeight = parseInt(nativeDimensions[1]);
        
        // Calculate pixel-level similarity using compare
        try {
            // Use AE (Absolute Error) metric for pixel differences
            const result = execSync(`compare -metric AE "${uiImagePath}" "${nativeImagePath}" null:`, { 
                encoding: 'utf8',
                stdio: ['pipe', 'pipe', 'pipe']
            });
            
            const pixelDiff = parseInt(result.trim());
            const totalPixels = Math.max(uiWidth * uiHeight, nativeWidth * nativeHeight);
            const similarity = Math.max(0, ((totalPixels - pixelDiff) / totalPixels) * 100);
            
            return {
                similarity: similarity,
                uiDimensions: `${uiWidth}x${uiHeight}`,
                nativeDimensions: `${nativeWidth}x${nativeHeight}`,
                pixelDiff: pixelDiff,
                totalPixels: totalPixels
            };
        } catch (compareError) {
            // Check if result is in stderr (ImageMagick returns exit code 1 for different images)
            if (compareError.stderr) {
                const aeMatch = compareError.stderr.match(/([0-9]+)/);
                if (aeMatch) {
                    const pixelDiff = parseInt(aeMatch[1]);
                    const totalPixels = Math.max(uiWidth * uiHeight, nativeWidth * nativeHeight);
                    const similarity = Math.max(0, ((totalPixels - pixelDiff) / totalPixels) * 100);
                    
                    return {
                        similarity: similarity,
                        uiDimensions: `${uiWidth}x${uiHeight}`,
                        nativeDimensions: `${nativeWidth}x${nativeHeight}`,
                        pixelDiff: pixelDiff,
                        totalPixels: totalPixels
                    };
                }
            }
            throw compareError;
        }
    } catch (error) {
        console.warn(`⚠️  Could not calculate similarity for ${path.basename(uiImagePath)}: ${error.message}`);
        return null;
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
        return { total: 0, above95: 0, above90: 0, below90: 0, avgSimilarity: 0, results: [] };
    }
    
    const results = [];
    let totalSimilarity = 0;
    let validComparisons = 0;
    
    for (const component of components) {
        const uiPath = path.join(UI_SNAPSHOTS_DIR, `${component}.png`);
        const nativePath = path.join(NATIVE_SNAPSHOTS_DIR, `${component}.png`);
        
        if (fs.existsSync(uiPath) && fs.existsSync(nativePath)) {
            const result = calculateSimilarityAccurate(uiPath, nativePath);
            if (result !== null) {
                results.push({ 
                    component, 
                    similarity: result.similarity,
                    uiDimensions: result.uiDimensions,
                    nativeDimensions: result.nativeDimensions,
                    pixelDiff: result.pixelDiff,
                    totalPixels: result.totalPixels
                });
                totalSimilarity += result.similarity;
                validComparisons++;
                
                const status = result.similarity >= TARGET_SIMILARITY ? '✅' : 
                             result.similarity >= 90 ? '⚠️ ' : '❌';
                const dimensionMatch = result.uiDimensions === result.nativeDimensions ? '' : ` [${result.uiDimensions} vs ${result.nativeDimensions}]`;
                console.log(`${status} ${component}: ${result.similarity.toFixed(1)}%${dimensionMatch}`);
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
    console.log(`   ✅ Above 95%: ${above95} (${validComparisons > 0 ? ((above95/validComparisons)*100).toFixed(1) : 0}%)`);
    console.log(`   ⚠️  90-95%: ${above90} (${validComparisons > 0 ? ((above90/validComparisons)*100).toFixed(1) : 0}%)`);
    console.log(`   ❌ Below 90%: ${below90} (${validComparisons > 0 ? ((below90/validComparisons)*100).toFixed(1) : 0}%)`);
    
    return { 
        total: validComparisons, 
        above95, 
        above90, 
        below90, 
        avgSimilarity,
        results: results.sort((a, b) => b.similarity - a.similarity)
    };
}

function generateDetailedReport() {
    console.log('🎯 COMPREHENSIVE UI LIBRARY MIGRATION ANALYSIS');
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
            const dimensionNote = item.uiDimensions !== item.nativeDimensions ? ` [dimension mismatch: ${item.uiDimensions} vs ${item.nativeDimensions}]` : '';
            console.log(`   ${item.component} (${item.category}): ${item.similarity.toFixed(1)}%${dimensionNote}`);
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
            const dimensionNote = item.uiDimensions !== item.nativeDimensions ? ` [dimension mismatch: ${item.uiDimensions} vs ${item.nativeDimensions}]` : '';
            console.log(`   ${item.component} (${item.category}): ${item.similarity.toFixed(1)}%${dimensionNote}`);
        });
    }
    
    // Show best performers (already at 95%+)
    const alreadyGood = [];
    for (const [categoryName, results] of Object.entries(categoryResults)) {
        for (const result of results.results || []) {
            if (result.similarity >= 95) {
                alreadyGood.push({ ...result, category: categoryName });
            }
        }
    }
    
    if (alreadyGood.length > 0) {
        console.log(`\n✅ Components already meeting 95%+ target (${alreadyGood.length} total):`);
        alreadyGood.sort((a, b) => b.similarity - a.similarity).slice(0, 10).forEach(item => {
            console.log(`   ${item.component} (${item.category}): ${item.similarity.toFixed(1)}%`);
        });
        if (alreadyGood.length > 10) {
            console.log(`   ... and ${alreadyGood.length - 10} more`);
        }
    }
    
    return {
        totalComponents,
        migrationProgress,
        overallAvgSimilarity,
        categoryResults,
        nearThreshold,
        needMajorWork,
        alreadyGood,
        uiOnly,
        nativeOnly
    };
}

// Run the analysis
if (require.main === module) {
    generateDetailedReport();
}

module.exports = { generateDetailedReport, findMatchingPairs, categorizeComponents };