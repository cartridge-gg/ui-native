export type FormatAddressOptions = {
	first?: number;
	last?: number;
	size?: FormatAddressSize;
	padding?: boolean;
};

type FormatAddressSize = "xs" | "sm" | "base" | "lg" | "full";

export function formatAddress(
	addr: string,
	{ first, last, size = "base" }: FormatAddressOptions = {},
) {
	// For React Native, we'll use the address as-is without starknet utilities
	// This is a simplified version that doesn't require starknet dependency
	const full = addr;
	const { _first, _last } =
		first !== undefined || last !== undefined
			? { _first: first ?? 0, _last: last ?? 0 }
			: { _first: sizeLen(size), _last: sizeLen(size) };

	return _first + _last === 0
		? full
		: full.substring(0, _first + 2) +
				"..." +
				full.substring(full.length - _last);
}

function sizeLen(size: FormatAddressSize) {
	switch (size) {
		case "xs":
			return 4;
		case "sm":
			return 10;
		case "lg":
			return 20;
		default:
			return 15;
	}
}
