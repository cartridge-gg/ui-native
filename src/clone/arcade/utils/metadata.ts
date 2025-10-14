import type { MarketToken } from "../hooks/market-tokens";

// Token attribute structure matching web
export type TokenAttribute = {
	trait_type: string;
	value: string | number;
	display_type?: string;
};

// Web format - internal representation
export type AvailableFilters = {
	[trait: string]: {
		[value: string]: number; // Count of tokens with this trait-value
	};
};

// Native UI format - used by CollectionFilters component
export type UIFilterFormat = {
	[key: string]: { property: string; count: number }[];
};

/**
 * Extract attributes from token metadata
 * Matches web's extractTokenAttributes function
 */
export function extractTokenAttributes(token: MarketToken): TokenAttribute[] {
	if (!token.metadata) {
		return [];
	}

	const metadata = token.metadata as {
		attributes?: TokenAttribute[];
	};

	if (!metadata.attributes || !Array.isArray(metadata.attributes)) {
		return [];
	}

	return metadata.attributes.filter(
		(attr) => attr?.trait_type && attr.value !== undefined,
	);
}

/**
 * Build available filters with counts from tokens
 * Matches web's buildMetadataIndex + calculateFilterCounts logic
 */
export function buildAvailableFilters(tokens: MarketToken[]): AvailableFilters {
	const filters: AvailableFilters = {};

	for (const token of tokens) {
		const attributes = extractTokenAttributes(token);

		if (attributes.length === 0) {
			continue;
		}

		for (const attr of attributes) {
			if (!attr.trait_type || attr.value === undefined || attr.value === null) {
				continue;
			}

			const trait = attr.trait_type;
			const value = String(attr.value);

			if (!filters[trait]) {
				filters[trait] = {};
			}
			if (!filters[trait][value]) {
				filters[trait][value] = 0;
			}

			filters[trait][value]++;
		}
	}

	return filters;
}

/**
 * Convert web format to native UI format
 * Transforms { [trait]: { [value]: count } } to { [trait]: [{ property, count }] }
 */
export function convertToUIFormat(
	availableFilters: AvailableFilters,
): UIFilterFormat {
	const uiFormat: UIFilterFormat = {};

	for (const [trait, values] of Object.entries(availableFilters)) {
		uiFormat[trait] = Object.entries(values)
			.map(([property, count]) => ({ property, count }))
			.sort((a, b) => b.count - a.count); // Sort by count descending
	}

	return uiFormat;
}
