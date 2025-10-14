import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	buildAvailableFilters,
	convertToUIFormat,
	type UIFilterFormat,
} from "../utils/metadata";

// MarketToken type matching @dojoengine/torii-wasm Token structure
export type MarketToken = {
	contract_address: string;
	token_id: string;
	metadata: unknown; // Can be string or object with name, attributes, etc.
	image?: string;
	name?: string;
	balance?: string;
	// Marketplace data
	price?: string | null; // Current listing price
	lastSale?: string | null; // Last sale price
};

type MarketTokensFetcherInput = {
	project: string[];
	address: string;
	autoFetch?: boolean;
	attributeFilters?: { [name: string]: Set<string> };
};

type MarketTokensFetcherResult = {
	collection: unknown; // Collection contract metadata
	tokens: MarketToken[];
	owners: string[];
	status: "idle" | "loading" | "success" | "error";
	isLoading: boolean;
	isError: boolean;
	errorMessage: string | null;
	loadingProgress: number;
	retryCount: number;
	hasMore: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
	availableFilters: UIFilterFormat; // Computed attributes for filtering
	// Collection-level stats
	totalCount: number; // Total items in collection
	listingCount: number; // Number of items currently listed
};

// Mock NFT data generator based on collection address
const generateMockNFTs = (
	collectionAddress: string,
	count: number,
): MarketToken[] => {
	// Get the collection from MOCK_COLLECTIONS or use default image
	const mockCollections = {
		"0x051d0844f96f86c7363cc7eb3ab939e0ef5b70939dcbc17895b2fa178d9af420":
			"https://static.cartridge.gg/presets/dragark/icon.png",
		"0x07d8ea58612a5de25f29281199a4fc1f2ce42f0f207f93c3a35280605f3b8e68":
			"https://static.cartridge.gg/presets/karat/icon.png",
		"0x077485a949c130cf0d98819d2b0749f5860b0734ea28cb678dd3f39379131bfa":
			"https://static.cartridge.gg/presets/schizodio/icon.png",
		"0x02d66679de61a5c6d57afd21e005a8c96118bd60315fd79a4521d68f5e5430d1":
			"https://static.cartridge.gg/presets/pixel-banner/icon.png",
		"0x00539f522b29ae9251dbf7443c7a950cf260372e69efab3710a11bf17a9599f1":
			"https://static.cartridge.gg/presets/blob-arena-amma/icon.png",
		"0x0314cca49699d0db8ac0b9df2c9a89b76c44d6d3c1a7d76f15cebc8535acfb91":
			"https://static.cartridge.gg/presets/dope-wars/icon.png",
		"0x04fa864a706e3403fd17ac8df307f22eafa21b778b73353abf69a622e47a2003":
			"https://static.cartridge.gg/presets/dope-wars/icon.png",
		"0x2e9c711b1a7e2784570b1bda5082a92606044e836ba392d2b977d280fb74b3c":
			"https://static.cartridge.gg/presets/pistols/icon.png",
		"0x7aaa9866750a0db82a54ba8674c38620fa2f967d2fbb31133def48e0527c87f":
			"https://static.cartridge.gg/presets/pistols/icon.png",
		"0x0158160018d590d93528995b340260e65aedd76d28a686e9daa5c4e8fad0c5dd":
			"https://static.cartridge.gg/presets/loot-survivor/icon.png",
	};

	const imageUrl =
		mockCollections[
			collectionAddress.toLowerCase() as keyof typeof mockCollections
		] || "https://static.cartridge.gg/presets/dragark/icon.png";

	// Attribute value pools for variety
	const rarities = ["Common", "Rare", "Epic", "Legendary"];
	const types = ["Weapon", "Armor", "Accessory", "Consumable"];
	const elements = ["Fire", "Water", "Earth", "Air", "Lightning"];

	return Array.from({ length: count }, (_, i) => {
		// Create varied distribution instead of simple modulo
		const rarityIndex =
			i < count * 0.45 ? 0 : i < count * 0.73 ? 1 : i < count * 0.88 ? 2 : 3; // Common: 45%, Rare: 28%, Epic: 15%, Legendary: 12%
		const typeIndex = Math.floor((i * 4) / count); // Spread evenly
		const elementIndex = Math.floor((i * 5) / count); // Spread across 5 elements

		// Generate varied marketplace data
		const hasListing = i % 2 === 0; // 50% have current listings
		const hadSale = i % 3 === 0; // 33% have sale history
		const priceValue = hasListing ? (10 + (i % 50)).toString() : null;
		const lastSaleValue =
			hadSale && !hasListing ? (5 + (i % 30)).toString() : null;

		return {
			contract_address: collectionAddress,
			token_id: (i + 1).toString(),
			name: `Item #${i + 1}`,
			image: imageUrl,
			metadata: {
				name: `Item #${i + 1}`,
				description: `Mock NFT item #${i + 1}`,
				image: imageUrl,
				attributes: [
					{
						trait_type: "Rarity",
						value: rarities[rarityIndex],
					},
					{
						trait_type: "Type",
						value: types[typeIndex],
					},
					{
						trait_type: "Element",
						value: elements[elementIndex],
					},
				],
			},
			balance: "1",
			price: priceValue,
			lastSale: lastSaleValue,
		};
	});
};

export function useMarketTokensFetcher({
	project: _project,
	address,
	autoFetch = true,
	attributeFilters = {},
}: MarketTokensFetcherInput): MarketTokensFetcherResult {
	const [tokens, setTokens] = useState<MarketToken[]>([]);
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [loadingProgress, setLoadingProgress] = useState(0);
	const [cursor, setCursor] = useState<number>(0);
	const isFetchingRef = useRef(false);
	const hasInitializedRef = useRef(false);
	const prevFiltersRef = useRef<string>("");

	const LIMIT = 20; // Load 20 items at a time
	const TOTAL_MOCK_ITEMS = 50; // Total mock items available

	const fetchData = useCallback(
		async (offset: number) => {
			if (isFetchingRef.current || !address) return;

			isFetchingRef.current = true;
			setStatus("loading");
			setLoadingProgress(50);

			// Simulate network delay
			await new Promise((resolve) => setTimeout(resolve, 500));

			try {
				// Generate mock NFTs for this page
				const allMockNFTs = generateMockNFTs(address, TOTAL_MOCK_ITEMS);

				// Apply attribute filters if any
				let filteredNFTs = allMockNFTs;
				if (Object.keys(attributeFilters).length > 0) {
					filteredNFTs = allMockNFTs.filter((token) => {
						const metadata = token.metadata as {
							attributes?: Array<{ trait_type: string; value: string }>;
						};
						const attributes = metadata?.attributes || [];
						return Object.entries(attributeFilters).every(
							([traitType, values]) => {
								const attr = attributes.find((a) => a.trait_type === traitType);
								return attr && values.has(attr.value);
							},
						);
					});
				}

				// Paginate
				const pageTokens = filteredNFTs.slice(offset, offset + LIMIT);

				setTokens((prev) =>
					offset === 0 ? pageTokens : [...prev, ...pageTokens],
				);
				setCursor(offset + LIMIT);
				setStatus("success");
				setLoadingProgress(100);
			} catch (error) {
				console.error("Error in mock token fetcher:", error);
				setStatus("error");
			} finally {
				isFetchingRef.current = false;
			}
		},
		[address, attributeFilters],
	);

	// Initial fetch and filter change handling
	useEffect(() => {
		const filtersString = JSON.stringify(attributeFilters);
		const filtersChanged = prevFiltersRef.current !== filtersString;

		if (filtersChanged && prevFiltersRef.current !== "") {
			// Filters changed, reset
			setTokens([]);
			setCursor(0);
			hasInitializedRef.current = false;
		}

		prevFiltersRef.current = filtersString;

		if (autoFetch && !hasInitializedRef.current && address) {
			hasInitializedRef.current = true;
			fetchData(0);
		}
	}, [autoFetch, address, attributeFilters, fetchData]);

	const fetchNextPage = useCallback(() => {
		if (!isFetchingRef.current && cursor < TOTAL_MOCK_ITEMS) {
			fetchData(cursor);
		}
	}, [cursor, fetchData]);

	// Compute available filters from tokens
	const availableFilters = useMemo(() => {
		if (tokens.length === 0) {
			return {};
		}
		const filters = buildAvailableFilters(tokens);
		return convertToUIFormat(filters);
	}, [tokens]);

	// Compute collection-level stats
	const stats = useMemo(() => {
		const allMockTokens = generateMockNFTs(address, TOTAL_MOCK_ITEMS);
		const listingCount = allMockTokens.filter((t) => t.price).length;
		return {
			totalCount: TOTAL_MOCK_ITEMS,
			listingCount,
		};
	}, [address]);

	return {
		collection: null, // Could add collection metadata if needed
		tokens,
		owners: [],
		status,
		isLoading: status === "loading",
		isError: status === "error",
		errorMessage: status === "error" ? "Failed to fetch tokens" : null,
		loadingProgress,
		retryCount: 0,
		hasMore: cursor < TOTAL_MOCK_ITEMS,
		isFetchingNextPage: isFetchingRef.current && tokens.length > 0,
		fetchNextPage,
		availableFilters,
		totalCount: stats.totalCount,
		listingCount: stats.listingCount,
	};
}
