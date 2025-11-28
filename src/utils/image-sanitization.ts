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
		
		// React Native doesn't support <foreignObject>, so we need to extract images and convert to <image> elements
		const foreignObjectRegex = /<foreignObject([^>]*)>([\s\S]*?)<\/foreignObject>/g;
		let hasForeignObject = svgContent.includes('<foreignObject');
		
		if (hasForeignObject) {
			let patchedSvg = svgContent.replace(foreignObjectRegex, (match, foreignObjectAttrs, innerContent) => {
				// Extract attributes from foreignObject
				const xMatch = foreignObjectAttrs.match(/x=['"]([^'"]*)['"]/);
				const yMatch = foreignObjectAttrs.match(/y=['"]([^'"]*)['"]/);
				const widthMatch = foreignObjectAttrs.match(/width=['"]([^'"]*)['"]/);
				const heightMatch = foreignObjectAttrs.match(/height=['"]([^'"]*)['"]/);
				
				const x = xMatch ? xMatch[1] : '0';
				const y = yMatch ? yMatch[1] : '0';
				const width = widthMatch ? widthMatch[1] : '100%';
				const height = heightMatch ? heightMatch[1] : '100%';
				
				// Extract image src from xhtml:img
				const imgSrcMatch = innerContent.match(/src=['"]([^'"]*)['"]/);
				
				if (imgSrcMatch && imgSrcMatch[1]) {
					const imageSrc = imgSrcMatch[1];
					// Create a proper SVG <image> element - use "meet" to show full image without cropping
					return `<image href="${imageSrc}" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" style="image-rendering: pixelated;" />`;
				}
				
				// If we couldn't extract the image, return empty
				return '';
			});
			
			// Re-encode the patched SVG
			const encodedSvg = btoa(patchedSvg);
			return `data:image/svg+xml;base64,${encodedSvg}`;
		}
		
		// No foreignObject, return original
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

