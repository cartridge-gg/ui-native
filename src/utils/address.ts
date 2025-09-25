import { getChecksumAddress } from "starknet";

/**
 * Safely converts a string to a checksum address
 * @param address - The address string to convert
 * @param fallback - Fallback address if conversion fails
 * @returns The checksum address or fallback
 */
export function safeGetChecksumAddress(
	address: string | undefined | null,
	fallback: string = "0x0",
): string {
	try {
		if (!address || typeof address !== "string") {
			return fallback;
		}

		// Basic validation - should start with 0x and have reasonable length
		if (!address.startsWith("0x") || address.length < 3) {
			return fallback;
		}

		return getChecksumAddress(address);
	} catch (error) {
		console.warn("Failed to convert address to checksum:", address, error);
		return fallback;
	}
}

/**
 * Validates if a string is a valid address format
 * @param address - The address string to validate
 * @returns true if valid address format, false otherwise
 */
export function isValidAddressFormat(
	address: string | undefined | null,
): address is string {
	if (!address || typeof address !== "string") {
		return false;
	}

	// Basic format validation
	if (!address.startsWith("0x") || address.length < 3) {
		return false;
	}

	try {
		getChecksumAddress(address);
		return true;
	} catch {
		return false;
	}
}

/**
 * Resolves a username or address to an address
 * @param identifier - Username or address to resolve
 * @param usernames - Map of usernames to addresses
 * @param fallback - Fallback address if resolution fails
 * @returns The resolved address
 */
export function resolveUserIdentifier(
	identifier: string | undefined | null,
	usernames: Record<string, string>,
	fallback: string = "0x0",
): string {
	if (!identifier || typeof identifier !== "string") {
		return fallback;
	}

	// If it's already a valid address, return it
	if (isValidAddressFormat(identifier)) {
		return safeGetChecksumAddress(identifier, fallback);
	}

	// Try to find the address for this username
	const address = Object.entries(usernames).find(
		([_, addr]) => addr === identifier,
	)?.[0];
	if (address) {
		return safeGetChecksumAddress(address, fallback);
	}

	// If not found, return fallback
	return fallback;
}
