const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const UI_SNAPSHOTS_DIR = path.join(__dirname, '../ui/__image_snapshots__');
const NATIVE_SNAPSHOTS_DIR = path.join(__dirname, '../__image_snapshots__/ui');
const TARGET_SIMILARITY = 95.0;
const QUICK_WIN_THRESHOLD = 90.0; // Components above this are potential quick wins

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
    
    // Find exact matches that exist in both directories
    for (const uiSnapshot of uiSnapshots) {
        if (nativeSnapshots.includes(uiSnapshot)) {
            // Double-check that both files actually exist
            const uiPath = path.join(UI_SNAPSHOTS_DIR, `${uiSnapshot}.png`);
            const nativePath = path.join(NATIVE_SNAPSHOTS_DIR, `${uiSnapshot}.png`);
            
            if (fs.existsSync(uiPath) && fs.existsSync(nativePath)) {
                pairs.push(uiSnapshot);
            }
        }
    }
    
    return pairs;
}

function calculateVisualSimilarity(componentName) {
    const uiPath = path.join(UI_SNAPSHOTS_DIR, `${componentName}.png`);
    const nativePath = path.join(NATIVE_SNAPSHOTS_DIR, `${componentName}.png`);
    
    if (!fs.existsSync(uiPath) || !fs.existsSync(nativePath)) {
        return null;
    }
    
    try {
        // Use the same logic as the working visual-comparison.js script
        // Get image dimensions first
        const uiDimensions = execSync(`identify -format "%w %h" "${uiPath}"`, { encoding: 'utf8' }).trim().split(' ');
        const nativeDimensions = execSync(`identify -format "%w %h" "${nativePath}"`, { encoding: 'utf8' }).trim().split(' ');
        
        const uiWidth = parseInt(uiDimensions[0]);
        const uiHeight = parseInt(uiDimensions[1]);
        const nativeWidth = parseInt(nativeDimensions[0]);
        const nativeHeight = parseInt(nativeDimensions[1]);
        
        // Normalize dimensions for comparison
        const maxWidth = Math.max(uiWidth, nativeWidth);
        const maxHeight = Math.max(uiHeight, nativeHeight);
        
        // Create temporary normalized images
        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        
        const tempUi = path.join(tempDir, `ui_${componentName}.png`);
        const tempNative = path.join(tempDir, `native_${componentName}.png`);
        
        // Resize images to same dimensions with white background
        execSync(`convert "${uiPath}" -background white -gravity center -extent ${maxWidth}x${maxHeight} "${tempUi}"`);
        execSync(`convert "${nativePath}" -background white -gravity center -extent ${maxWidth}x${maxHeight} "${tempNative}"`);
        
        // Calculate similarity using compare
        try {
            const result = execSync(`compare -metric AE "${tempUi}" "${tempNative}" null:`, { 
                encoding: 'utf8',
                stdio: ['pipe', 'pipe', 'pipe']
            });
            
            const pixelDiff = parseInt(result.trim());
            const totalPixels = maxWidth * maxHeight;
            const similarity = Math.max(0, ((totalPixels - pixelDiff) / totalPixels) * 100);
            
            // Clean up temp files
            fs.unlinkSync(tempUi);
            fs.unlinkSync(tempNative);
            
            return {
                similarity: similarity,
                uiDimensions: `${uiWidth}x${uiHeight}`,
                nativeDimensions: `${nativeWidth}x${nativeHeight}`,
                normalizedDimensions: `${maxWidth}x${maxHeight}`,
                pixelDiff: pixelDiff,
                totalPixels: totalPixels
            };
        } catch (compareError) {
            // Check if result is in stderr (ImageMagick returns exit code 1 for different images)
            if (compareError.stderr) {
                const aeMatch = compareError.stderr.match(/([0-9]+)/);
                if (aeMatch) {
                    const pixelDiff = parseInt(aeMatch[1]);
                    const totalPixels = maxWidth * maxHeight;
                    const similarity = Math.max(0, ((totalPixels - pixelDiff) / totalPixels) * 100);
                    
                    // Clean up temp files
                    try {
                        fs.unlinkSync(tempUi);
                        fs.unlinkSync(tempNative);
                    } catch (e) {}
                    
                    return {
                        similarity: similarity,
                        uiDimensions: `${uiWidth}x${uiHeight}`,
                        nativeDimensions: `${nativeWidth}x${nativeHeight}`,
                        normalizedDimensions: `${maxWidth}x${maxHeight}`,
                        pixelDiff: pixelDiff,
                        totalPixels: totalPixels
                    };
                }
            }
            
            // Clean up temp files
            try {
                fs.unlinkSync(tempUi);
                fs.unlinkSync(tempNative);
            } catch (e) {}
            
            throw compareError;
        }
    } catch (error) {
        console.warn(`⚠️  Could not calculate similarity for ${componentName}: ${error.message}`);
        return null;
    }
}

function categorizeComponent(componentName) {
    if (componentName.includes('icons')) {
        return 'icons';
    } else if (componentName.includes('button')) {
        return 'buttons';
    } else if (componentName.includes('input') || componentName.includes('textarea') || componentName.includes('select')) {
        return 'inputs';
    } else if (componentName.includes('typography')) {
        return 'typography';
    } else if (componentName.startsWith('primitives-')) {
        return 'primitives';
    } else if (componentName.startsWith('modules-')) {
        return 'modules';
    } else {
        return 'other';
    }
}

function analyzeQuickWins() {
    console.log('🎯 QUICK WINS ANALYSIS - Components Close to 95% Target');
    console.log('='.repeat(70));
    
    const pairs = findMatchingPairs();
    console.log(`\n📊 Analyzing ${pairs.length} component pairs...\n`);
    
    const results = [];
    const quickWins = [];
    const alreadyGood = [];
    const needWork = [];
    
    // Analyze each component
    for (const componentName of pairs) {
        const result = calculateVisualSimilarity(componentName);
        if (result !== null) {
            const componentData = {
                name: componentName,
                category: categorizeComponent(componentName),
                ...result
            };
            
            results.push(componentData);
            
            if (result.similarity >= TARGET_SIMILARITY) {
                alreadyGood.push(componentData);
            } else if (result.similarity >= QUICK_WIN_THRESHOLD) {
                quickWins.push(componentData);
            } else {
                needWork.push(componentData);
            }
            
            const status = result.similarity >= TARGET_SIMILARITY ? '✅' : 
                         result.similarity >= QUICK_WIN_THRESHOLD ? '🔧' : '❌';
            const dimensionNote = result.uiDimensions !== result.nativeDimensions ? 
                ` [${result.uiDimensions} → ${result.nativeDimensions}]` : '';
            
            console.log(`${status} ${componentName}: ${result.similarity.toFixed(1)}%${dimensionNote}`);
        }
    }
    
    // Summary
    console.log(`\n📈 SUMMARY`);
    console.log('='.repeat(50));
    console.log(`✅ Already at 95%+: ${alreadyGood.length} components`);
    console.log(`🔧 Quick wins (90-95%): ${quickWins.length} components`);
    console.log(`❌ Need major work (<90%): ${needWork.length} components`);
    console.log(`📊 Migration progress: ${((alreadyGood.length / results.length) * 100).toFixed(1)}%`);
    
    // Quick wins analysis
    if (quickWins.length > 0) {
        console.log(`\n🔧 QUICK WINS - Priority Order`);
        console.log('='.repeat(50));
        
        quickWins.sort((a, b) => b.similarity - a.similarity);
        
        quickWins.forEach((component, index) => {
            const gap = (TARGET_SIMILARITY - component.similarity).toFixed(1);
            const dimensionIssue = component.uiDimensions !== component.nativeDimensions ? 
                ' (dimension mismatch)' : '';
            console.log(`${index + 1}. ${component.name} (${component.category})`);
            console.log(`   Current: ${component.similarity.toFixed(1)}% | Gap: ${gap}%${dimensionIssue}`);
            console.log(`   Dimensions: ${component.uiDimensions} vs ${component.nativeDimensions}`);
            console.log('');
        });
    }
    
    // Best performers
    if (alreadyGood.length > 0) {
        console.log(`\n✅ ALREADY MEETING TARGET (${alreadyGood.length} components)`);
        console.log('='.repeat(50));
        
        alreadyGood.sort((a, b) => b.similarity - a.similarity);
        
        alreadyGood.slice(0, 10).forEach(component => {
            console.log(`   ${component.name} (${component.category}): ${component.similarity.toFixed(1)}%`);
        });
        
        if (alreadyGood.length > 10) {
            console.log(`   ... and ${alreadyGood.length - 10} more`);
        }
    }
    
    // Category breakdown
    console.log(`\n📊 CATEGORY BREAKDOWN`);
    console.log('='.repeat(50));
    
    const categories = {};
    results.forEach(component => {
        if (!categories[component.category]) {
            categories[component.category] = { total: 0, good: 0, quickWins: 0, needWork: 0 };
        }
        categories[component.category].total++;
        if (component.similarity >= TARGET_SIMILARITY) {
            categories[component.category].good++;
        } else if (component.similarity >= QUICK_WIN_THRESHOLD) {
            categories[component.category].quickWins++;
        } else {
            categories[component.category].needWork++;
        }
    });
    
    Object.entries(categories).forEach(([category, stats]) => {
        const progress = ((stats.good / stats.total) * 100).toFixed(1);
        console.log(`${category}: ${progress}% complete (${stats.good}/${stats.total})`);
        console.log(`  ✅ Good: ${stats.good} | 🔧 Quick wins: ${stats.quickWins} | ❌ Need work: ${stats.needWork}`);
    });
    
    return {
        results,
        quickWins,
        alreadyGood,
        needWork,
        categories
    };
}

// Clean up temp directory on exit
process.on('exit', () => {
    const tempDir = path.join(__dirname, '../temp');
    if (fs.existsSync(tempDir)) {
        try {
            fs.rmSync(tempDir, { recursive: true, force: true });
        } catch (e) {}
    }
});

// Run the analysis
if (require.main === module) {
    analyzeQuickWins();
}

module.exports = { analyzeQuickWins };