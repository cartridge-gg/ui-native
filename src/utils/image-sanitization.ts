/**
 * Extract CSS background-image from SVG and return it directly
 * This replaces SVGs that only contain a CSS background-image with the actual image
 * This is necessary because React Native doesn't support CSS background-image in SVGs
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
		
		// Check if SVG contains a CSS background-image
		const backgroundImageMatch = svgContent.match(/background-image:\s*url\((data:image\/[^)]+)\)/);
		
		// If we found a background image, just return it directly instead of the SVG
		if (backgroundImageMatch) {
			const extractedImage = backgroundImageMatch[1];
			console.log(`🎨 ${label} Extracted background image, replacing SVG`);
			return extractedImage;
		}
		
		// No background image found, return original
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

