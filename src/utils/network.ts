// Simplified network utilities for React Native without external dependencies

export function getChainName(chainId: string) {
	switch (chainId) {
		case "0x534e5f4d41494e": // SN_MAIN
			return "Starknet";
		case "0x534e5f5345504f4c4941": // SN_SEPOLIA
			return "Sepolia";
		default:
			try {
				return isSlotChain(chainId) ? "Slot" : hexToString(chainId);
			} catch {
				return "Unknown";
			}
	}
}

export function isPublicChain(chainId: string) {
	return (
		[
			"0x534e5f4d41494e", // SN_MAIN
			"0x534e5f5345504f4c4941", // SN_SEPOLIA
		] as string[]
	).includes(chainId);
}

export function isSlotChain(chainId: string) {
	try {
		return hexToString(chainId).startsWith("WP_");
	} catch {
		return false;
	}
}

// Simple hex to string conversion without viem dependency
function hexToString(hex: string): string {
	if (!hex || !hex.startsWith("0x")) {
		return hex;
	}

	try {
		const hexString = hex.slice(2);
		let result = "";
		for (let i = 0; i < hexString.length; i += 2) {
			const hexChar = hexString.substr(i, 2);
			const charCode = parseInt(hexChar, 16);
			if (charCode > 0) {
				result += String.fromCharCode(charCode);
			}
		}
		return result;
	} catch {
		return "Unknown";
	}
}
