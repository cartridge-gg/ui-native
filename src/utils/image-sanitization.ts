/**
 * Convert CSS background-image in SVG to proper <image> element
 * This is necessary because React Native doesn't support CSS background-image in SVGs
 * We keep the SVG structure but convert the background-image to an embedded <image> tag
 */
export function sanitizeSvgDataUri(dataUri: string, debugLabel?: string): string {
	if (!dataUri || !dataUri.startsWith('data:image/svg+xml')) {
		return dataUri;
	}
	
	const label = debugLabel ? `[${debugLabel}]` : '';
	
	try {
		let svgContent = '';
		
		// Decode the SVG content
		// Check if the SVG WRAPPER itself is base64 encoded (not just contains base64 inside)
		if (dataUri.startsWith('data:image/svg+xml;base64,')) {
			let base64Data = dataUri.substring('data:image/svg+xml;base64,'.length);
			
			// Extract ONLY valid base64 characters (stop at first invalid character)
			// This handles cases where SVG markup is appended after the base64
			const base64Match = base64Data.match(/^[A-Za-z0-9+/=]+/);
			if (base64Match) {
				base64Data = base64Match[0];
			}
			
			// Fix base64 padding if needed (must be multiple of 4)
			const paddingNeeded = (4 - (base64Data.length % 4)) % 4;
			if (paddingNeeded > 0) {
				base64Data += '='.repeat(paddingNeeded);
			}
			
			svgContent = atob(base64Data);
		} else {
			// UTF-8 encoded SVG
			svgContent = dataUri.replace('data:image/svg+xml;utf8,', '').replace('data:image/svg+xml,', '');
			try {
				svgContent = decodeURIComponent(svgContent);
			} catch (e) {
				// Use original if decode fails
			}
		}
		
		// Check if SVG contains a CSS background-image - if so, extract and return just the image
		const backgroundImageMatch = svgContent.match(/background-image:\s*url\(([^)]+)\)/);
		if (backgroundImageMatch && backgroundImageMatch[1]) {
			const extractedImage = backgroundImageMatch[1];
			return extractedImage;
		}
		
		// No background-image, check if we need to patch foreignObject
		let patchedSvg = svgContent;
		let wasPatched = false;
		
		// Fix malformed attributes like width="100width="100%" -> width="100%"
		patchedSvg = patchedSvg.replace(/width="100width="([^"]*)"/g, 'width="$1"');
		patchedSvg = patchedSvg.replace(/height="100height="([^"]*)"/g, 'height="$1"');
		if (patchedSvg !== svgContent) {
			wasPatched = true;
		}
		
		// Convert <foreignObject> to <image> elements (React Native doesn't support foreignObject)
		const foreignObjectRegex = /<foreignObject([^>]*)>([\s\S]*?)<\/foreignObject>/g;
		if (patchedSvg.includes('<foreignObject')) {
			patchedSvg = patchedSvg.replace(foreignObjectRegex, (match, foreignObjectAttrs, innerContent) => {
				const xMatch = foreignObjectAttrs.match(/x=['"]([^'"]*)['"]/);
				const yMatch = foreignObjectAttrs.match(/y=['"]([^'"]*)['"]/);
				const widthMatch = foreignObjectAttrs.match(/width=['"]([^'"]*)['"]/);
				const heightMatch = foreignObjectAttrs.match(/height=['"]([^'"]*)['"]/);
				
				const x = xMatch ? xMatch[1] : '0';
				const y = yMatch ? yMatch[1] : '0';
				const width = widthMatch ? widthMatch[1] : '100%';
				const height = heightMatch ? heightMatch[1] : '100%';
				
				const imgSrcMatch = innerContent.match(/src=['"]([^'"]*)['"]/);
				
				if (imgSrcMatch && imgSrcMatch[1]) {
					wasPatched = true;
					return `<image href="${imgSrcMatch[1]}" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" style="image-rendering: pixelated;" />`;
				}
				
				return '';
			});
		}
		
		// Re-encode if we made changes
		if (wasPatched) {
			const encodedSvg = btoa(patchedSvg);
			return `data:image/svg+xml;base64,${encodedSvg}`;
		}
		
		// No changes needed
		return dataUri;
	} catch (e) {
		console.error(`❌ ${label} Failed to process SVG:`, e);
		return dataUri;
	}
}

/**
 * Sanitize any image URI (including SVGs)
 * Use this for all image sources to ensure they render properly
 */
export function sanitizeImageUri(uri: string | undefined | null, debugLabel?: string): string | undefined {
	if (!uri) {
		return undefined;
	}
	
	// Handle IPFS URIs
	if (uri.startsWith('ipfs://')) {
		return uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
	}
	
	// Sanitize SVG data URIs (extract CSS background-images and return them directly)
	if (uri.startsWith('data:image/svg+xml')) {
		return sanitizeSvgDataUri(uri, debugLabel);
	}
	
	return uri;
}

