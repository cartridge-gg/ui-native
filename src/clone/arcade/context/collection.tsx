/**
 * Collection Context - REAL DATA from Torii
 * Provides collection data from Torii token contracts
 */
import { createContext, type ReactNode, useMemo } from "react";
import { useTokenContracts, type ParsedTokenContract } from "../../../../../../hooks/useTokenContracts";

export enum CollectionType {
	ERC721 = "ERC-721",
	ERC1155 = "ERC-1155",
}

export type Collection = {
	address: string;
	name: string;
	type: CollectionType;
	imageUrl: string;
	totalCount: number;
	project: string;
};

export type CollectionContextType = {
	collections: Collection[];
	status: "success" | "error" | "idle" | "loading";
};

export const CollectionContext = createContext<CollectionContextType | null>(
	null,
);

/**
 * Convert TokenContract to Collection format
 * Uses already-parsed metadata from useTokenContracts hook
 */
function tokenContractToCollection(tokenContract: ParsedTokenContract): Collection {
	const parsedTokenMetadata = tokenContract.parsedMetadata;
	
	// Also try the metadata field as fallback (some collections have it there)
	let parsedMetadata: any;
	try {
		parsedMetadata = tokenContract.metadata ? JSON.parse(tokenContract.metadata) : undefined;
	} catch {
		// metadata field might not be valid JSON, ignore
	}
	
	// Get name from various sources
	const name = parsedTokenMetadata?.name || parsedMetadata?.name || tokenContract.name || 'Unknown Collection';
	
	// Get image URL - prioritize parsedTokenMetadata (from tokenMetadata field) as it's more reliable
	// Then fall back to parsedMetadata (from metadata field)
	let imageUrl = parsedTokenMetadata?.image || parsedMetadata?.image || '';
	
	// Convert IPFS URLs to HTTP gateway URLs (but keep data URLs as-is)
	if (imageUrl.startsWith('ipfs://')) {
		imageUrl = imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
	}
	
	// Parse total supply
	let totalCount = 0;
	if (tokenContract.totalSupply) {
		try {
			totalCount = parseInt(tokenContract.totalSupply, 10);
		} catch (e) {
			// Silently fail
		}
	}
	
	// Determine collection type based on contract
	const type = CollectionType.ERC721; // Default, could be enhanced
	
	// Use contract address as project identifier
	const project = `arcade-${name.toLowerCase().replace(/\s+/g, '-')}`;
	
	return {
		address: tokenContract.contractAddress,
		name,
		type,
		imageUrl,
		totalCount,
		project,
	};
}

export function CollectionProvider({ children }: { children: ReactNode }) {
	const { tokenContracts, loading, error } = useTokenContracts();
	
	// Memoize collections conversion to avoid re-computing on every render
	// Only re-compute when tokenContracts array changes (by length)
	const collections = useMemo(() => {
		return tokenContracts.map(tokenContractToCollection);
	}, [tokenContracts.length]); // Depend on length to avoid deep comparison
	
	// Determine status
	const status = useMemo<"success" | "error" | "idle" | "loading">(() => {
		if (loading) return "loading";
		if (error) return "error";
		if (collections.length > 0) return "success";
		return "idle";
	}, [loading, error, collections.length]);
	
	return (
		<CollectionContext.Provider
			value={{
				collections,
				status,
			}}
		>
			{children}
		</CollectionContext.Provider>
	);
}
