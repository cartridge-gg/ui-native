const fs = require("node:fs");
const path = require("node:path");

console.log("Starting icon conversion...");

// Function to convert web icon to React Native icon
function convertIcon(webIconPath, nativeIconPath) {
	const webContent = fs.readFileSync(webIconPath, "utf8");

	// Extract icon name from file
	const fileName = path.basename(webIconPath, ".tsx");

	// Check if this is a brand-color icon
	const isBrandColor = webIconPath.includes("/brand-color/");

	// Handle special cases for proper capitalization
	const specialCases = {
		github: "GitHub",
		"qr-code": "QrCode",
		metamask: "MetaMask",
		"ethereum-dark": "EthereumDark",
		"ethereum-light": "EthereumLight",
	};

	let iconName;
	if (specialCases[fileName]) {
		iconName = `${specialCases[fileName]}${isBrandColor ? "Color" : ""}Icon`;
	} else {
		iconName = `${fileName
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join("")}${isBrandColor ? "Color" : ""}Icon`;
	}

	// Extract the SVG content
	const svgMatch = webContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
	if (!svgMatch) {
		throw new Error("No SVG content found");
	}

	const svgContent = svgMatch[1];

	// Check if gradients or clipPaths are used (need useId)
	const hasGradients =
		svgContent.includes("LinearGradient") ||
		svgContent.includes("linearGradient") ||
		svgContent.includes("RadialGradient") ||
		svgContent.includes("radialGradient");

	const hasClipPaths =
		svgContent.includes("clipPath") || svgContent.includes("ClipPath");

	const needsUseId = hasGradients || hasClipPaths;

	// Determine if this is a directional or state icon based on the file path
	const isDirectional = webIconPath.includes("/directional/");
	const isState = webIconPath.includes("/state/");

	// Check if the original icon has variants (directional or state icons)
	const hasVariants =
		webContent.includes("variant") && webContent.includes("switch");

	// Check if it has solid/line variants (state icon)
	const hasSolidLineVariants =
		hasVariants &&
		webContent.includes('case "solid"') &&
		webContent.includes('case "line"');

	// If it has variants but isn't in directional folder, check if it's a state icon
	const isStateIcon = isState || hasSolidLineVariants;

	const paramType = isDirectional
		? "DirectionalIconProps"
		: isStateIcon
			? "StateIconProps"
			: "IconProps";

	// Extract the variant switch logic for directional/state icons
	let variantLogic = "";
	if (hasVariants) {
		const switchMatch = webContent.match(/\{\(\(\) => \{([\s\S]*?)\}\)\(\)\}/);
		if (switchMatch) {
			variantLogic = switchMatch[1].trim();

			// Extract all case blocks and rebuild the switch statement properly
			const caseMatches = variantLogic.match(
				/case "([^"]+)":[\s]*return \(([\s\S]*?)\);/g,
			);

			if (caseMatches) {
				const caseBlocks = [];
				caseBlocks.push("switch (variant) {");

				caseMatches.forEach((match, _index) => {
					// Extract case name and content
					const caseMatch = match.match(
						/case "([^"]+)":[\s]*return \(([\s\S]*?)\);/,
					);
					if (caseMatch) {
						const caseName = caseMatch[1];
						let caseContent = caseMatch[2];

						// Clean up the case content
						caseContent = caseContent
							.replace(/<path/g, "<Path")
							.replace(/<\/path>/g, "</Path>")
							.replace(/<circle/g, "<Circle")
							.replace(/<\/circle>/g, "</Circle>")
							.replace(/<rect/g, "<Rect")
							.replace(/<\/rect>/g, "</Rect>")
							.replace(/<line/g, "<Line")
							.replace(/<\/line>/g, "</Line>")
							.replace(/<polygon/g, "<Polygon")
							.replace(/<\/polygon>/g, "</Polygon>")
							.replace(
								/className="fill-current"/g,
								'fill={color || "currentColor"}',
							)
							.replace(
								/className="fill-foreground-200"/g,
								'fill="currentColor"',
							);

						caseBlocks.push(`            case "${caseName}":
              return (
                ${caseContent}
              );`);
					}
				});

				caseBlocks.push("          }");
				variantLogic = caseBlocks.join("\n");
			}
		}
	}

	// Convert SVG elements to React Native SVG
	let convertedContent = svgContent
		.replace(/<svg[^>]*>/g, "")
		.replace(/<\/svg>/g, "")
		.replace(/className="fill-current"/g, 'fill={color || "currentColor"}')
		.replace(/fill="currentColor"/g, 'fill={color || "currentColor"}')
		.replace(/className="fill-foreground-200"/g, 'fill="currentColor"');

	// Add @ts-expect-error comment before className attributes
	convertedContent = convertedContent.replace(
		/(\s+)className=/g,
		"$1// @ts-expect-error TODO: className prop type issue with cssInterop-ed component\n$1className=",
	);

	// Replace static IDs with dynamic ones if gradients or clipPaths are present
	if (needsUseId) {
		// Find all id attributes and replace them with dynamic references
		convertedContent = convertedContent.replace(
			/id="([^"]+)"/g,
			"id={`$1-$${id}`}",
		);
		// Handle fill attributes with url() references
		convertedContent = convertedContent.replace(
			/fill="url\(#([^)]+)\)"/g,
			"fill={`url(#$1-$${id})`}",
		);
		// Handle stroke attributes with url() references
		convertedContent = convertedContent.replace(
			/stroke="url\(#([^)]+)\)"/g,
			"stroke={`url(#$1-$${id})`}",
		);
		// Handle clipPath attributes with url() references
		convertedContent = convertedContent.replace(
			/clipPath="url\(#([^)]+)\)"/g,
			"clipPath={`url(#$1-$${id})`}",
		);
		// Handle mask attributes with url() references
		convertedContent = convertedContent.replace(
			/mask="url\(#([^)]+)\)"/g,
			"mask={`url(#$1-$${id})`}",
		);
	}

	// Check what SVG components are actually used in the converted content
	const usedComponents = new Set();

	// For variant-based icons, also check the variant logic content
	const _contentToCheck = hasVariants ? variantLogic : convertedContent;

	// Check if svgClass will actually be used
	const willUseSvgClass =
		convertedContent.includes("className={svgClass}") ||
		(hasVariants && variantLogic.includes("className={svgClass}")) ||
		convertedContent.includes('fill={color || "currentColor"}') ||
		convertedContent.includes('fill="currentColor"') ||
		convertedContent.includes('fill="var(--foreground-100)"') ||
		(hasVariants &&
			(variantLogic.includes('fill={color || "currentColor"}') ||
				variantLogic.includes('fill="currentColor"') ||
				variantLogic.includes('fill="var(--foreground-100)"')));

	if (
		convertedContent.includes("<Path") ||
		convertedContent.match(/<path[\s>]/) ||
		(hasVariants &&
			(variantLogic.includes("<path") || variantLogic.includes("Path")))
	)
		usedComponents.add("Path");
	if (
		convertedContent.includes("<Circle") ||
		convertedContent.match(/<circle[\s>]/) ||
		(hasVariants &&
			(variantLogic.includes("<circle") || variantLogic.includes("Circle")))
	)
		usedComponents.add("Circle");
	if (
		convertedContent.includes("<Rect") ||
		convertedContent.match(/<rect[\s>]/) ||
		(hasVariants &&
			(variantLogic.includes("<rect") || variantLogic.includes("Rect")))
	)
		usedComponents.add("Rect");
	if (
		convertedContent.includes("<Line") ||
		convertedContent.match(/<line[\s>]/) ||
		(hasVariants &&
			(variantLogic.includes("<line") || variantLogic.includes("Line")))
	)
		usedComponents.add("Line");
	if (
		convertedContent.includes("<Polygon") ||
		convertedContent.match(/<polygon[\s>]/) ||
		(hasVariants &&
			(variantLogic.includes("<polygon") || variantLogic.includes("Polygon")))
	)
		usedComponents.add("Polygon");
	// Note: lowercase <ellipse> elements don't need Ellipse import in React Native SVG
	// Only check for capitalized usage that would need the import
	if (
		convertedContent.includes("<Ellipse") ||
		(hasVariants && variantLogic.includes("<Ellipse"))
	)
		usedComponents.add("Ellipse");
	if (
		convertedContent.includes("<Polyline") ||
		convertedContent.match(/<polyline[\s>]/) ||
		(hasVariants &&
			(variantLogic.includes("<polyline") || variantLogic.includes("Polyline")))
	)
		usedComponents.add("Polyline");
	if (
		convertedContent.includes("<G") ||
		convertedContent.match(/<g[\s>]/) ||
		(hasVariants && (variantLogic.includes("<g") || variantLogic.includes("G")))
	)
		usedComponents.add("G");
	if (
		convertedContent.includes("<LinearGradient") ||
		convertedContent.match(/<linearGradient[\s>]/) ||
		(hasVariants &&
			(variantLogic.includes("<linearGradient") ||
				variantLogic.includes("LinearGradient")))
	)
		usedComponents.add("LinearGradient");
	if (
		convertedContent.includes("<RadialGradient") ||
		convertedContent.match(/<radialGradient[\s>]/) ||
		(hasVariants &&
			(variantLogic.includes("<radialGradient") ||
				variantLogic.includes("RadialGradient")))
	)
		usedComponents.add("RadialGradient");
	if (
		convertedContent.includes("<Stop") ||
		convertedContent.match(/<stop[\s>]/) ||
		(hasVariants &&
			(variantLogic.includes("<stop") || variantLogic.includes("Stop")))
	)
		usedComponents.add("Stop");
	if (
		convertedContent.includes("<Defs") ||
		convertedContent.match(/<defs[\s>]/) ||
		(hasVariants &&
			(variantLogic.includes("<defs") || variantLogic.includes("Defs")))
	)
		usedComponents.add("Defs");
	if (
		convertedContent.includes("<ClipPath") ||
		convertedContent.match(/<clipPath[\s>]/) ||
		(hasVariants &&
			(variantLogic.includes("<clipPath") || variantLogic.includes("ClipPath")))
	)
		usedComponents.add("ClipPath");
	if (
		convertedContent.includes("<Mask") ||
		convertedContent.match(/<mask[\s>]/) ||
		(hasVariants &&
			(variantLogic.includes("<mask") || variantLogic.includes("Mask")))
	)
		usedComponents.add("Mask");

	// Convert lowercase SVG elements to React Native SVG components
	convertedContent = convertedContent
		.replace(/<path/g, "<Path")
		.replace(/<\/path>/g, "</Path>")
		.replace(/<circle/g, "<Circle")
		.replace(/<\/circle>/g, "</Circle>")
		.replace(/<rect/g, "<Rect")
		.replace(/<\/rect>/g, "</Rect>")
		.replace(/<line/g, "<Line")
		.replace(/<\/line>/g, "</Line>")
		.replace(/<polygon/g, "<Polygon")
		.replace(/<\/polygon>/g, "</Polygon>")
		// Note: Keep ellipse lowercase in React Native SVG
		// .replace(/<ellipse/g, "<Ellipse")
		// .replace(/<\/ellipse>/g, "</Ellipse>")
		.replace(/<polyline/g, "<Polyline")
		.replace(/<\/polyline>/g, "</Polyline>")
		.replace(/<g/g, "<G")
		.replace(/<\/g>/g, "</G>")
		.replace(/<linearGradient/g, "<LinearGradient")
		.replace(/<\/linearGradient>/g, "</LinearGradient>")
		.replace(/<radialGradient/g, "<RadialGradient")
		.replace(/<\/radialGradient>/g, "</RadialGradient>")
		.replace(/<stop/g, "<Stop")
		.replace(/<\/stop>/g, "</Stop>")
		.replace(/<defs/g, "<Defs")
		.replace(/<\/defs>/g, "</Defs>")
		.replace(/<clipPath/g, "<ClipPath")
		.replace(/<\/clipPath>/g, "</ClipPath>")
		.replace(/<mask/g, "<Mask")
		.replace(/<\/mask>/g, "</Mask>");

	// Extract viewBox from the original SVG
	const viewBoxMatch = webContent.match(/viewBox="([^"]+)"/);
	const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";

	// Build imports
	const reactImports = needsUseId ? "{ memo, useId }" : "{ memo }";
	const svgImports = Array.from(usedComponents).sort().join(", ");

	// Generate the React Native component
	const nativeContent = `import ${reactImports} from "react";
import Svg, { ${svgImports} } from "react-native-svg";

import type { ${paramType} } from "#components/icons/types";
import { iconVariants${willUseSvgClass ? ", useSvgClass" : ""} } from "#components/icons/utils";

export const ${iconName} = memo<${paramType}>(
	({ className, size: sizeProp${hasVariants ? ", variant" : ""}, ref, ...props }) => {${
		needsUseId
			? `
		const id = useId();`
			: ""
	}${
		willUseSvgClass
			? `
		const svgClass = useSvgClass() ?? "fill-foreground";`
			: ""
	}
		return (
			<Svg
				viewBox="${viewBox}"
				className={iconVariants({ size: sizeProp, className })}
				ref={ref}
				{...props}
			>
				${
					hasVariants
						? `{(() => {
					${variantLogic
						.replace(
							/fill=\{color \|\| "currentColor"\}/g,
							"className={svgClass}",
						)
						.replace(/fill="currentColor"/g, "className={svgClass}")
						.replace(/fill="var\(--foreground-100\)"/g, "className={svgClass}")
						.replace(
							/(\s+)className=/g,
							"$1// @ts-expect-error TODO: className prop type issue with cssInterop-ed component\n$1className=",
						)}
				})()}`
						: convertedContent
								.replace(
									/fill=\{color \|\| "currentColor"\}/g,
									"className={svgClass}",
								)
								.replace(/fill="currentColor"/g, "className={svgClass}")
								.replace(
									/fill="var\(--foreground-100\)"/g,
									"className={svgClass}",
								)
								.replace(
									/(\s+)className=/g,
									"$1// @ts-expect-error TODO: className prop type issue with cssInterop-ed component\n$1className=",
								)
				}
			</Svg>
		);
	},
);
`;

	// Create directory if it doesn't exist
	const dir = path.dirname(nativeIconPath);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	// Write the converted file
	fs.writeFileSync(nativeIconPath, nativeContent);
	console.log(`Converted: ${iconName}`);
}

// Process all icons in a directory
function processIconDirectory(webDir, nativeDir) {
	const files = fs.readdirSync(webDir);

	for (const file of files) {
		if (file.endsWith(".tsx") && file !== "index.ts") {
			const webPath = path.join(webDir, file);
			const nativePath = path.join(nativeDir, file);

			try {
				convertIcon(webPath, nativePath);
			} catch (error) {
				console.error(`Error converting ${file}:`, error.message);
			}
		}
	}
}

// Icon directories to process
const iconCategories = [
	"utility",
	"brand",
	"brand-color",
	"badge",
	"state",
	"directional",
];

// Process each category
for (const category of iconCategories) {
	const webDir = path.join(__dirname, "../ui/src/components/icons", category);
	const nativeDir = path.join(__dirname, "../src/components/icons", category);

	if (fs.existsSync(webDir)) {
		console.log(`\nConverting ${category} icons...`);
		processIconDirectory(webDir, nativeDir);
	}
}

// Also convert error-alert-icon.tsx (skip if it doesn't contain SVG)
const errorAlertWebPath = path.join(
	__dirname,
	"../ui/src/components/icons/error-alert-icon.tsx",
);
const errorAlertNativePath = path.join(
	__dirname,
	"../src/components/icons/error-alert-icon.tsx",
);
if (fs.existsSync(errorAlertWebPath)) {
	console.log("\nConverting error-alert-icon...");
	try {
		convertIcon(errorAlertWebPath, errorAlertNativePath);
	} catch (_error) {
		console.log("Skipping error-alert-icon (no SVG content)");
	}
}

console.log("\nConversion complete!");
