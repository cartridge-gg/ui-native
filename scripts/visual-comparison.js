#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const UI_SNAPSHOTS_DIR = path.join(
	__dirname,
	"..",
	"..",
	"ui",
	"__image_snapshots__",
);
const UI_NATIVE_SNAPSHOTS_DIR = path.join(
	__dirname,
	"..",
	"__image_snapshots__",
);
const COMPARISON_OUTPUT_DIR = path.join(__dirname, "..", "visual-comparisons");

// Parse command line arguments
const args = process.argv.slice(2);
const targetSnapshot = args[0];

// Ensure output directory exists
if (!fs.existsSync(COMPARISON_OUTPUT_DIR)) {
	fs.mkdirSync(COMPARISON_OUTPUT_DIR, { recursive: true });
}

function showUsage() {
	console.log(`
🔍 Visual Comparison Tool
=========================

Usage:
  node scripts/visual-comparison.js [snapshot-name]

Examples:
  node scripts/visual-comparison.js                          # Compare achievement card (default)
  node scripts/visual-comparison.js achievement              # Compare achievement card
  node scripts/visual-comparison.js button                   # Compare button snapshots
  node scripts/visual-comparison.js "modules-tokens"         # Compare token module snapshots

Options:
  --list                                                     # List all available snapshots
  --help, -h                                                # Show this help

The tool will:
  1. Find matching snapshots in both UI and UI-native projects
  2. Generate visual comparisons (static, animated, 50/50 blend)
  3. Provide similarity analysis and fix suggestions
  4. Save results to visual-comparisons/ directory
`);
}

function listAvailableSnapshots() {
	console.log("📋 Available Snapshots");
	console.log("======================");

	const uiSnapshots = fs.existsSync(UI_SNAPSHOTS_DIR)
		? fs.readdirSync(UI_SNAPSHOTS_DIR).filter((f) => f.endsWith(".png"))
		: [];
	const nativeSnapshots = fs.existsSync(UI_NATIVE_SNAPSHOTS_DIR)
		? fs.readdirSync(UI_NATIVE_SNAPSHOTS_DIR).filter((f) => f.endsWith(".png"))
		: [];

	console.log(`\n📁 UI Snapshots (${uiSnapshots.length}):`);
	for (const snapshot of uiSnapshots) {
		const hasNative = nativeSnapshots.includes(snapshot);
		const status = hasNative ? "✅" : "❌";
		console.log(`   ${status} ${snapshot}`);
	}

	console.log(
		`\n📁 UI-Native Only Snapshots (${nativeSnapshots.filter((s) => !uiSnapshots.includes(s)).length}):`,
	);
	for (const snapshot of nativeSnapshots.filter(
		(s) => !uiSnapshots.includes(s),
	)) {
		console.log(`   🔶 ${snapshot}`);
	}

	console.log("\n📊 Summary:");
	console.log(`   • UI snapshots: ${uiSnapshots.length}`);
	console.log(`   • UI-Native snapshots: ${nativeSnapshots.length}`);
	console.log(
		`   • Matching pairs: ${uiSnapshots.filter((s) => nativeSnapshots.includes(s)).length}`,
	);
	console.log(
		`   • UI only: ${uiSnapshots.filter((s) => !nativeSnapshots.includes(s)).length}`,
	);
	console.log(
		`   • UI-Native only: ${nativeSnapshots.filter((s) => !uiSnapshots.includes(s)).length}`,
	);

	console.log("\n💡 Usage:");
	console.log("   • Use snapshot name without .png extension");
	console.log("   • Use partial names for pattern matching");
	console.log("   • Example: node scripts/visual-comparison.js achievement");
}

function findMatchingSnapshots(pattern) {
	const uiSnapshots = fs.existsSync(UI_SNAPSHOTS_DIR)
		? fs.readdirSync(UI_SNAPSHOTS_DIR).filter((f) => f.endsWith(".png"))
		: [];
	const nativeSnapshots = fs.existsSync(UI_NATIVE_SNAPSHOTS_DIR)
		? fs.readdirSync(UI_NATIVE_SNAPSHOTS_DIR).filter((f) => f.endsWith(".png"))
		: [];

	if (!pattern) {
		// Default to achievement card
		const defaultSnapshot = "modules-activities-card--achievement-chromium.png";
		if (
			uiSnapshots.includes(defaultSnapshot) &&
			nativeSnapshots.includes(defaultSnapshot)
		) {
			return [defaultSnapshot];
		}
		return [];
	}

	const regex = new RegExp(pattern, "i");
	const matchingSnapshots = uiSnapshots.filter((snapshot) => {
		const nameWithoutExt = snapshot.replace(".png", "");
		return regex.test(nameWithoutExt) && nativeSnapshots.includes(snapshot);
	});

	return matchingSnapshots;
}

function checkImageMagick() {
	try {
		execSync("magick -version", { stdio: "ignore" });
		return true;
	} catch (_error) {
		console.log(
			"⚠️  ImageMagick not found. Please install it for visual diff generation:",
		);
		console.log("   macOS: brew install imagemagick");
		console.log("   Ubuntu: sudo apt-get install imagemagick");
		return false;
	}
}

function analyzeSpecificDifferences(uiImage, nativeImage) {
	try {
		console.log("\n🔬 Detailed Difference Analysis");
		console.log("================================");

		// Get detailed image properties
		const uiInfo = execSync(`magick identify -verbose "${uiImage}"`, {
			encoding: "utf8",
		});
		const nativeInfo = execSync(`magick identify -verbose "${nativeImage}"`, {
			encoding: "utf8",
		});

		// Extract key properties
		const uiMatch = uiInfo.match(/Geometry: (\d+)x(\d+)/);
		const nativeMatch = nativeInfo.match(/Geometry: (\d+)x(\d+)/);

		if (uiMatch && nativeMatch) {
			const uiWidth = Number.parseInt(uiMatch[1]);
			const uiHeight = Number.parseInt(uiMatch[2]);
			const nativeWidth = Number.parseInt(nativeMatch[1]);
			const nativeHeight = Number.parseInt(nativeMatch[2]);

			console.log("📐 Dimension Analysis:");
			console.log(`   UI: ${uiWidth}x${uiHeight}`);
			console.log(`   Native: ${nativeWidth}x${nativeHeight}`);

			if (uiWidth !== nativeWidth || uiHeight !== nativeHeight) {
				console.log("❌ DIMENSION MISMATCH:");
				console.log(
					`   Width difference: ${Math.abs(uiWidth - nativeWidth)}px`,
				);
				console.log(
					`   Height difference: ${Math.abs(uiHeight - nativeHeight)}px`,
				);
				console.log(
					"💡 FIX: Check component padding, margins, or container sizing",
				);
			} else {
				console.log("✅ Dimensions match perfectly");
			}
		}

		// Analyze color differences
		try {
			const colorDiff = execSync(
				`magick compare -metric AE "${uiImage}" "${nativeImage}" null: 2>&1`,
				{ encoding: "utf8" },
			);
			const diffPixels = Number.parseInt(colorDiff.trim()) || 0;

			if (diffPixels === 0) {
				console.log("🎉 PERFECT MATCH! Images are identical.");
				return { perfect: true, diffPixels: 0 };
			}
			console.log(
				`🔍 Pixel Differences: ${diffPixels.toLocaleString()} pixels differ`,
			);

			// Calculate percentage
			const totalPixels = uiMatch
				? Number.parseInt(uiMatch[1]) * Number.parseInt(uiMatch[2])
				: 0;
			if (totalPixels > 0) {
				const diffPercentage = (diffPixels / totalPixels) * 100;
				console.log(
					`📊 Difference: ${diffPercentage.toFixed(3)}% of total pixels`,
				);

				if (diffPercentage < 0.1) {
					console.log("✅ Very minor differences (< 0.1%)");
				} else if (diffPercentage < 1) {
					console.log("⚠️  Small differences (< 1%)");
				} else {
					console.log("❌ Significant differences (> 1%)");
				}
			}

			return { perfect: false, diffPixels, totalPixels };
		} catch (_e) {
			console.log("⚠️  Could not calculate exact pixel differences");
			return { perfect: false, diffPixels: "unknown" };
		}
	} catch (error) {
		console.log(`❌ Analysis failed: ${error.message}`);
		return { perfect: false, error: true };
	}
}

function generateFixSuggestions(analysisResult, _uiImage, _nativeImage) {
	console.log("\n💡 Fix Suggestions");
	console.log("==================");

	if (analysisResult.perfect) {
		console.log("🎉 No fixes needed - images match perfectly!");
		return;
	}

	if (analysisResult.diffPixels === "unknown" || analysisResult.error) {
		console.log("🔧 General suggestions:");
		console.log("   • Check component dimensions and spacing");
		console.log("   • Verify theme colors are applied correctly");
		console.log("   • Ensure fonts and text rendering match");
		console.log("   • Check icon sizes and positioning");
		return;
	}

	const diffPixels = analysisResult.diffPixels;
	const totalPixels = analysisResult.totalPixels || 1;
	const diffPercentage = (diffPixels / totalPixels) * 100;

	if (diffPercentage < 0.01) {
		console.log("🎯 Micro-differences detected:");
		console.log("   • Likely anti-aliasing or font rendering differences");
		console.log("   • Check if different font weights are being used");
		console.log("   • Verify sub-pixel positioning is consistent");
	} else if (diffPercentage < 0.1) {
		console.log("🎯 Minor differences detected:");
		console.log("   • Check spacing/padding values");
		console.log("   • Verify border radius values");
		console.log("   • Check icon positioning or sizing");
	} else if (diffPercentage < 1) {
		console.log("🎯 Noticeable differences detected:");
		console.log("   • Check component dimensions");
		console.log("   • Verify color values match exactly");
		console.log("   • Check text alignment and sizing");
		console.log("   • Verify icon variants and sizes");
	} else {
		console.log("🎯 Significant differences detected:");
		console.log("   • Major layout or sizing issues");
		console.log("   • Check component structure and props");
		console.log("   • Verify theme integration");
		console.log("   • Check if correct component variants are used");
	}

	console.log("\n🔧 Recommended next steps:");
	console.log(
		"   1. Check the red highlighted differences in the comparison image",
	);
	console.log("   2. Focus on the most obvious differences first");
	console.log("   3. Make targeted fixes based on the highlighted areas");
	console.log("   4. Re-run this tool after each fix to track progress");
}

function generateVisualDiff(uiImage, nativeImage, outputPath, _snapshotName) {
	try {
		// Get dimensions of both images
		const uiDimensions = execSync(
			`magick identify -format "%w %h" "${uiImage}"`,
			{
				encoding: "utf8",
			},
		)
			.trim()
			.split(" ");
		const nativeDimensions = execSync(
			`magick identify -format "%w %h" "${nativeImage}"`,
			{
				encoding: "utf8",
			},
		)
			.trim()
			.split(" ");

		console.log(`📐 UI dimensions: ${uiDimensions[0]}x${uiDimensions[1]}`);
		console.log(
			`📐 Native dimensions: ${nativeDimensions[0]}x${nativeDimensions[1]}`,
		);

		// Use the larger dimensions to avoid cropping
		const maxWidth = Math.max(
			Number.parseInt(uiDimensions[0]),
			Number.parseInt(nativeDimensions[0]),
		);
		const maxHeight = Math.max(
			Number.parseInt(uiDimensions[1]),
			Number.parseInt(nativeDimensions[1]),
		);

		console.log(`📐 Normalizing to: ${maxWidth}x${maxHeight}`);

		// Resize both images to the same dimensions with white background
		const normalizedUI = path.join(
			COMPARISON_OUTPUT_DIR,
			"temp-ui-normalized.png",
		);
		const normalizedNative = path.join(
			COMPARISON_OUTPUT_DIR,
			"temp-native-normalized.png",
		);

		execSync(
			`magick "${uiImage}" -background white -gravity center -extent ${maxWidth}x${maxHeight} "${normalizedUI}"`,
			{ stdio: "ignore" },
		);
		execSync(
			`magick "${nativeImage}" -background white -gravity center -extent ${maxWidth}x${maxHeight} "${normalizedNative}"`,
			{ stdio: "ignore" },
		);

		// Analyze differences on normalized images
		const analysisResult = analyzeSpecificDifferences(
			normalizedUI,
			normalizedNative,
		);

		// Use higher resolution for final output - keep original size but limit to reasonable max
		const displayWidth = Math.min(maxWidth, 600); // Max 600px width for display
		const scaleFactor = displayWidth / maxWidth;
		const displayHeight = Math.round(maxHeight * scaleFactor);

		// Create labels for each image with larger text
		const labelHeight = 40;
		const labelWidth = displayWidth;

		try {
			execSync(
				`magick -size ${labelWidth}x${labelHeight} xc:white -pointsize 20 -gravity center -fill black -annotate +0+0 "UI (Web)" "${path.join(COMPARISON_OUTPUT_DIR, "temp-ui-label.png")}"`,
				{ stdio: "ignore" },
			);
			execSync(
				`magick -size ${labelWidth}x${labelHeight} xc:white -pointsize 20 -gravity center -fill black -annotate +0+0 "UI-Native (React Native)" "${path.join(COMPARISON_OUTPUT_DIR, "temp-native-label.png")}"`,
				{ stdio: "ignore" },
			);
			execSync(
				`magick -size ${labelWidth}x${labelHeight} xc:white -pointsize 20 -gravity center -fill black -annotate +0+0 "Differences (Red = Changed)" "${path.join(COMPARISON_OUTPUT_DIR, "temp-diff-label.png")}"`,
				{ stdio: "ignore" },
			);
		} catch (_labelError) {
			console.log("⚠️  Label creation failed, continuing without labels...");
		}

		try {
			console.log("🎨 Creating useful difference visualization...");

			// Method 1: Create proper difference highlighting (like test-diff.png)
			try {
				// Create a difference image that shows the UI image with differences highlighted in red
				const diffHighlight = path.join(
					COMPARISON_OUTPUT_DIR,
					"temp-diff-highlight.png",
				);

				// Method 1: Create a proper diff that shows base image with red highlights on differences
				try {
					// First create a difference mask
					const diffMask = path.join(
						COMPARISON_OUTPUT_DIR,
						"temp-diff-mask.png",
					);
					execSync(
						`magick compare -fuzz 5% "${normalizedUI}" "${normalizedNative}" "${diffMask}"`,
						{ stdio: "ignore" },
					);

					// Create the highlighted image: start with UI image, then overlay red where differences exist
					execSync(
						`magick "${normalizedUI}" "${diffMask}" -compose multiply -composite "${diffHighlight}"`,
						{ stdio: "ignore" },
					);
					console.log("✅ Difference highlighting created (method 1)");
				} catch (_method1Error) {
					// Method 2: Use ImageMagick's built-in compare with proper highlighting
					try {
						console.log("⚠️  Method 1 failed, trying method 2...");
						execSync(
							`magick compare -fuzz 5% -highlight-color red -lowlight-color transparent "${normalizedUI}" "${normalizedNative}" "${diffHighlight}"`,
							{ stdio: "ignore" },
						);

						// Composite this over the original UI image to show differences clearly
						const tempDiff = path.join(
							COMPARISON_OUTPUT_DIR,
							"temp-diff-overlay.png",
						);
						execSync(
							`magick "${normalizedUI}" "${diffHighlight}" -composite "${tempDiff}"`,
							{
								stdio: "ignore",
							},
						);
						execSync(`mv "${tempDiff}" "${diffHighlight}"`, {
							stdio: "ignore",
						});
						console.log("✅ Difference highlighting created (method 2)");
					} catch (_method2Error) {
						// Method 3: Manual approach - create red overlay only where pixels differ
						try {
							console.log("⚠️  Method 2 failed, trying method 3...");

							// Create a mask of differences
							const diffMask = path.join(
								COMPARISON_OUTPUT_DIR,
								"temp-diff-mask.png",
							);
							execSync(
								`magick "${normalizedUI}" "${normalizedNative}" -compose difference -composite -threshold 5% "${diffMask}"`,
								{ stdio: "ignore" },
							);

							// Create red overlay
							const redOverlay = path.join(
								COMPARISON_OUTPUT_DIR,
								"temp-red-overlay.png",
							);
							execSync(
								`magick "${diffMask}" -fill red -colorize 100% "${redOverlay}"`,
								{
									stdio: "ignore",
								},
							);

							// Composite red overlay onto UI image only where differences exist
							execSync(
								`magick "${normalizedUI}" "${redOverlay}" "${diffMask}" -composite "${diffHighlight}"`,
								{ stdio: "ignore" },
							);
							console.log("✅ Difference highlighting created (method 3)");
						} catch (_method3Error) {
							console.log("⚠️  All diff methods failed, using side-by-side...");
							// Ultimate fallback: side-by-side comparison
							execSync(
								`magick "${normalizedUI}" "${normalizedNative}" +append "${diffHighlight}"`,
								{ stdio: "ignore" },
							);
						}
					}
				}
			} catch (_diffError) {
				console.log(
					"⚠️  Difference highlighting failed, using basic comparison...",
				);
				const diffHighlight = path.join(
					COMPARISON_OUTPUT_DIR,
					"temp-diff-highlight.png",
				);
				execSync(
					`magick "${normalizedUI}" "${normalizedNative}" +append "${diffHighlight}"`,
					{
						stdio: "ignore",
					},
				);
			}
		} catch (_error) {
			console.log(
				"⚠️  All difference methods failed, using basic side-by-side...",
			);
			// Ultimate fallback: create a basic side-by-side comparison
			const diffHighlight = path.join(
				COMPARISON_OUTPUT_DIR,
				"temp-diff-highlight.png",
			);
			execSync(
				`magick "${normalizedUI}" "${normalizedNative}" +append "${diffHighlight}"`,
				{
					stdio: "ignore",
				},
			);
		}

		// Resize images to display size while maintaining quality
		const resizedUI = path.join(COMPARISON_OUTPUT_DIR, "temp-ui-resized.png");
		const resizedNative = path.join(
			COMPARISON_OUTPUT_DIR,
			"temp-native-resized.png",
		);
		const resizedDiff = path.join(
			COMPARISON_OUTPUT_DIR,
			"temp-diff-resized.png",
		);

		execSync(
			`magick "${normalizedUI}" -resize ${displayWidth}x${displayHeight}! "${resizedUI}"`,
			{
				stdio: "ignore",
			},
		);
		execSync(
			`magick "${normalizedNative}" -resize ${displayWidth}x${displayHeight}! "${resizedNative}"`,
			{ stdio: "ignore" },
		);
		execSync(
			`magick "${path.join(COMPARISON_OUTPUT_DIR, "temp-diff-highlight.png")}" -resize ${displayWidth}x${displayHeight}! "${resizedDiff}"`,
			{ stdio: "ignore" },
		);

		// Try to combine with labels, fall back to simple combination
		try {
			const uiWithLabel = path.join(
				COMPARISON_OUTPUT_DIR,
				"temp-ui-with-label.png",
			);
			const nativeWithLabel = path.join(
				COMPARISON_OUTPUT_DIR,
				"temp-native-with-label.png",
			);
			const diffWithLabel = path.join(
				COMPARISON_OUTPUT_DIR,
				"temp-diff-with-label.png",
			);

			execSync(
				`magick "${path.join(COMPARISON_OUTPUT_DIR, "temp-ui-label.png")}" "${resizedUI}" -append "${uiWithLabel}"`,
				{ stdio: "ignore" },
			);
			execSync(
				`magick "${path.join(COMPARISON_OUTPUT_DIR, "temp-native-label.png")}" "${resizedNative}" -append "${nativeWithLabel}"`,
				{ stdio: "ignore" },
			);
			execSync(
				`magick "${path.join(COMPARISON_OUTPUT_DIR, "temp-diff-label.png")}" "${resizedDiff}" -append "${diffWithLabel}"`,
				{ stdio: "ignore" },
			);

			// Combine all three images horizontally with spacing and border
			execSync(
				`magick "${uiWithLabel}" "${nativeWithLabel}" "${diffWithLabel}" +append -bordercolor "#f0f0f0" -border 15x15 "${outputPath}"`,
				{ stdio: "ignore" },
			);

			console.log(
				`📏 Final output dimensions: ${displayWidth * 3 + 30}x${displayHeight + labelHeight + 30}`,
			);
		} catch (_combineError) {
			console.log(
				"⚠️  Label combination failed, creating simple side-by-side...",
			);
			// Simple side-by-side without labels
			execSync(
				`magick "${resizedUI}" "${resizedNative}" "${resizedDiff}" +append -bordercolor "#f0f0f0" -border 15x15 "${outputPath}"`,
				{ stdio: "ignore" },
			);
		}

		// Clean up temporary files
		const tempFiles = [
			"temp-ui-normalized.png",
			"temp-native-normalized.png",
			"temp-diff-mask.png",
			"temp-diff-highlight.png",
			"temp-diff-overlay.png",
			"temp-red-overlay.png",
			"temp-ui-label.png",
			"temp-native-label.png",
			"temp-diff-label.png",
			"temp-ui-resized.png",
			"temp-native-resized.png",
			"temp-diff-resized.png",
			"temp-ui-with-label.png",
			"temp-native-with-label.png",
			"temp-diff-with-label.png",
		];

		for (const file of tempFiles) {
			const filePath = path.join(COMPARISON_OUTPUT_DIR, file);
			if (fs.existsSync(filePath)) {
				try {
					fs.unlinkSync(filePath);
				} catch (_cleanupError) {
					// Ignore cleanup errors
				}
			}
		}

		// Generate fix suggestions
		generateFixSuggestions(analysisResult, uiImage, nativeImage);

		return analysisResult;
	} catch (error) {
		console.log(`❌ Failed to generate visual diff: ${error.message}`);
		return { perfect: false, error: true };
	}
}

function calculateSimilarity(uiImage, nativeImage) {
	try {
		// Use ImageMagick to calculate the actual pixel difference
		const command = `magick compare -metric AE -fuzz 5% "${uiImage}" "${nativeImage}" null: 2>&1`;
		const result = execSync(command, { encoding: "utf8" });

		const diffPixels = Number.parseInt(result.trim()) || 0;

		// Get image dimensions to calculate percentage
		const identifyCommand = `magick identify -format "%w %h" "${uiImage}"`;
		const dimensions = execSync(identifyCommand, { encoding: "utf8" })
			.trim()
			.split(" ");
		const totalPixels =
			Number.parseInt(dimensions[0]) * Number.parseInt(dimensions[1]);

		const diffPercentage = (diffPixels / totalPixels) * 100;
		const similarity = Math.max(0, 100 - diffPercentage);

		return {
			similarity: similarity,
			diffPixels,
			totalPixels,
			diffPercentage,
		};
	} catch (_error) {
		// Fallback to file size comparison
		const uiStats = fs.statSync(uiImage);
		const nativeStats = fs.statSync(nativeImage);
		const sizeDiff = Math.abs(uiStats.size - nativeStats.size);
		const avgSize = (uiStats.size + nativeStats.size) / 2;
		const diffPercentage = (sizeDiff / avgSize) * 100;
		const similarity = Math.max(0, 100 - diffPercentage);

		return {
			similarity: similarity,
			diffPixels: "unknown",
			totalPixels: "unknown",
			diffPercentage: diffPercentage,
			fallback: true,
		};
	}
}

function compareSnapshots(snapshots) {
	if (snapshots.length === 0) {
		console.log("❌ No matching snapshots found for comparison");
		return;
	}

	for (let index = 0; index < snapshots.length; index++) {
		const filename = snapshots[index];
		const snapshotName = filename.replace(".png", "");
		const uiImage = path.join(UI_SNAPSHOTS_DIR, filename);
		const nativeImage = path.join(UI_NATIVE_SNAPSHOTS_DIR, filename);
		const outputImage = path.join(
			COMPARISON_OUTPUT_DIR,
			`${snapshotName}-comparison.png`,
		);

		console.log(`\n${"=".repeat(60)}`);
		console.log(
			`🎯 Visual Comparison ${index + 1}/${snapshots.length}: ${snapshotName}`,
		);
		console.log(`${"=".repeat(60)}`);
		console.log(`UI image: ${uiImage}`);
		console.log(`Native image: ${nativeImage}`);
		console.log(`Output: ${outputImage}`);
		console.log("");

		if (!fs.existsSync(uiImage)) {
			console.log("❌ UI image not found");
			console.log("💡 Run: cd ../ui && npm run test:storybook:update");
			return;
		}

		if (!fs.existsSync(nativeImage)) {
			console.log("❌ Native image not found");
			console.log("💡 Run: npm run test:storybook:update");
			return;
		}

		// Basic file size comparison
		const uiStats = fs.statSync(uiImage);
		const nativeStats = fs.statSync(nativeImage);

		console.log(`📊 UI size: ${uiStats.size} bytes`);
		console.log(`📊 Native size: ${nativeStats.size} bytes`);
		console.log(
			`📊 Size difference: ${Math.abs(uiStats.size - nativeStats.size)} bytes`,
		);
		console.log("");

		// Check if ImageMagick is available for advanced comparison
		const hasImageMagick = checkImageMagick();

		if (hasImageMagick) {
			console.log("🎨 Generating visual diff comparison...");

			const similarity = calculateSimilarity(uiImage, nativeImage);

			console.log(
				`📊 Pixel-level similarity: ${similarity.similarity.toFixed(1)}%`,
			);
			if (!similarity.fallback) {
				console.log(
					`📊 Different pixels: ${similarity.diffPixels.toLocaleString()} / ${similarity.totalPixels.toLocaleString()}`,
				);
				console.log(
					`📊 Pixel difference: ${similarity.diffPercentage.toFixed(2)}%`,
				);
			}
			console.log("");

			const analysisResult = generateVisualDiff(
				uiImage,
				nativeImage,
				outputImage,
				snapshotName,
			);

			if (analysisResult && !analysisResult.error) {
				console.log(`✅ Visual comparison saved to: ${outputImage}`);
				console.log("");
				console.log("📖 The comparison image shows:");
				console.log("   • Left: UI (Web) version");
				console.log("   • Center: UI-Native (React Native) version");
				console.log("   • Right: Differences (Red = Changed)");
				console.log("");

				if (analysisResult.perfect) {
					console.log("\n🎉 PERFECT MATCH! No further changes needed.");
				} else if (similarity.similarity >= 99.9) {
					console.log(
						"\n🎯 Nearly perfect (≥99.9% similar) - minor tweaks may be needed",
					);
				} else if (similarity.similarity >= 99) {
					console.log(
						"\n✅ Very close (≥99% similar) - small adjustments needed",
					);
				} else if (similarity.similarity >= 95) {
					console.log(
						"\n⚠️  Good similarity (≥95%) - some differences to address",
					);
				} else {
					console.log(
						"\n❌ Significant differences (<95% similarity) - major fixes needed",
					);
				}
			}
		} else {
			// Fallback to basic file size comparison
			const sizeDiff = Math.abs(uiStats.size - nativeStats.size);
			const avgSize = (uiStats.size + nativeStats.size) / 2;
			const diffPercentage = (sizeDiff / avgSize) * 100;
			const similarity = Math.max(0, 100 - diffPercentage);

			console.log(`📊 File size similarity: ${similarity.toFixed(1)}%`);

			if (similarity >= 90) {
				console.log("✅ Images are similar enough based on file size");
			} else {
				console.log("❌ Images need alignment based on file size");
			}
		}
	}
}

// Main execution
if (args.includes("--help") || args.includes("-h")) {
	showUsage();
	process.exit(0);
}

if (args.includes("--list")) {
	listAvailableSnapshots();
	process.exit(0);
}

const matchingSnapshots = findMatchingSnapshots(targetSnapshot);

if (matchingSnapshots.length === 0) {
	if (targetSnapshot) {
		console.log(
			`❌ No matching snapshots found for pattern: "${targetSnapshot}"`,
		);
		console.log("");
		console.log("💡 Try:");
		console.log("   • Use --list to see all available snapshots");
		console.log(
			'   • Use partial names (e.g., "achievement" instead of full filename)',
		);
		console.log("   • Check if both UI and UI-native have the snapshot");
	} else {
		console.log("❌ Default achievement card snapshot not found");
		console.log("💡 Use --list to see available snapshots");
	}
	process.exit(1);
}

compareSnapshots(matchingSnapshots);
