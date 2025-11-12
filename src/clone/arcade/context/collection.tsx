/**
 * Collection Context - REAL DATA from Torii
 * Provides collection data from Torii token contracts
 */
import { createContext, type ReactNode, useMemo, useEffect, useState } from "react";
import { useTokenContracts, type ParsedTokenContract } from "../../../../../../hooks/useTokenContracts";
import { useToriiClient } from "../../../../../../contexts/ToriiContext";
import { PaginationDirection } from "../../../../../../modules/arcade/src/generated/dojo";
import { sanitizeSvgDataUri } from "#utils";

/**
 * Pads a hex string to 64 characters (0x + 64 hex digits)
 */
function padHexTo64(hex: string): string {
	// Remove 0x prefix if present
	const cleaned = hex.startsWith('0x') ? hex.slice(2) : hex;
	// Pad to 64 characters
	const padded = cleaned.padStart(64, '0');
	return `0x${padded}`;
}

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
	// Use name directly from tokenContract
	const name = tokenContract.name || 'Unknown Collection';
	
	// Generate image URL using Cartridge API with padded contract address
	const paddedAddress = padHexTo64(tokenContract.contractAddress);
	const imageUrl = `https://api.cartridge.gg/x/arcade-main/torii/static/${paddedAddress}/image`;
	
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
	const { client, isReady } = useToriiClient();
	const [firstTokenImages, setFirstTokenImages] = useState<Map<string, string>>(new Map());
	const [fetchingImages, setFetchingImages] = useState(false);
	
	// Fetch first token for each collection to get image
	useEffect(() => {
		if (!client || !isReady || tokenContracts.length === 0 || fetchingImages) {
			return;
		}
		
		const fetchFirstTokenImages = async () => {
			setFetchingImages(true);
			const imageMap = new Map<string, string>();
			
			console.log(`🖼️ Fetching first token images for ${tokenContracts.length} collections...`);

			
			// Fetch first token for each collection in parallel
			const promises = tokenContracts.map(async (contract) => {
				try {
					console.log(`🔍 [${contract.name}] Fetching first token for collection image...`);
					
					const result = await client.tokens({
						contractAddresses: [contract.contractAddress],
						tokenIds: [],
						attributeFilters: [],
						pagination: {
							cursor: undefined,
							limit: 1,
							direction: PaginationDirection.Forward,
							orderBy: [],
						},
					});
					
					if (result.items && result.items.length > 0) {
						const firstToken = result.items[0];
						
						// Try to extract image from metadata if it's a data URI
						let imageUrl: string | undefined;
						
						if (typeof firstToken.metadata === 'string' && firstToken.metadata.length > 0) {
							try {
								// Try parsing as JSON first
								const parsed = JSON.parse(firstToken.metadata);
								if (parsed.image && typeof parsed.image === 'string') {
									if (parsed.image.startsWith('data:image/svg+xml')) {
										// Sanitize SVG data URIs
										imageUrl = sanitizeSvgDataUri(parsed.image, `Collection: ${contract.name}`);
										console.log(`📝 [${contract.name}] Using SVG from metadata`);
									} else if (parsed.image.startsWith('data:')) {
										// Use other data URIs as-is
										imageUrl = parsed.image;
										console.log(`📝 [${contract.name}] Using data URI from metadata`);
									}
								}
							} catch (e) {
								// If JSON parse fails, try base64 decode
								try {
									const decoded = atob(firstToken.metadata);
									const parsedDecoded = JSON.parse(decoded);
									if (parsedDecoded.image && typeof parsedDecoded.image === 'string') {
										if (parsedDecoded.image.startsWith('data:image/svg+xml')) {
											imageUrl = sanitizeSvgDataUri(parsedDecoded.image, `Collection: ${contract.name}`);
											console.log(`📝 [${contract.name}] Using SVG from decoded metadata`);
										} else if (parsedDecoded.image.startsWith('data:')) {
											imageUrl = parsedDecoded.image;
											console.log(`📝 [${contract.name}] Using data URI from decoded metadata`);
										}
									}
								} catch (e2) {
									// Metadata couldn't be parsed, will use API URL
								}
							}
						}
						
						// Fallback to API URL if no metadata image found
						if (!imageUrl) {
							const paddedAddress = padHexTo64(contract.contractAddress);
							const paddedTokenId = padHexTo64(firstToken.tokenId || '0');
							imageUrl = `https://api.cartridge.gg/x/arcade-main/torii/static/${paddedAddress}/${paddedTokenId}/image`;
							console.log(`🌐 [${contract.name}] Using API URL: ${imageUrl}`);
						}
						
						imageMap.set(contract.contractAddress, imageUrl);
					} else {
						console.warn(`⚠️ [${contract.name}] No tokens found in collection (${contract.contractAddress})`);
					}
				} catch (err) {
					console.error(`❌ [${contract.name}] Failed to fetch first token:`, err);
				}
			});
			
			await Promise.all(promises);
			console.log(`✅ Fetched ${imageMap.size} collection images`);
			setFirstTokenImages(imageMap);
			setFetchingImages(false);
		};
		
		fetchFirstTokenImages();
	}, [client, isReady, tokenContracts.length, fetchingImages]);
	
	// Memoize collections conversion with first token images
	const collections = useMemo(() => {
		return tokenContracts.map(tokenContract => {
			const collection = tokenContractToCollection(tokenContract);
			// Use first token image if available, otherwise keep contract image
			const firstTokenImage = firstTokenImages.get(tokenContract.contractAddress);
			if (firstTokenImage) {
				return { ...collection, imageUrl: firstTokenImage };
			}
			return collection;
		});
	}, [tokenContracts.length, firstTokenImages.size]); // Depend on both lengths
	
	// Determine status
	const status = useMemo<"success" | "error" | "idle" | "loading">(() => {
		if (loading || fetchingImages) return "loading";
		if (error) return "error";
		if (collections.length > 0) return "success";
		return "idle";
	}, [loading, fetchingImages, error, collections.length]);
	
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
