import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Image, Pressable, ScrollView, View } from "react-native";
import { useArcade, useCollections } from "#clone/arcade";
import {
	EmptyStateInventoryIcon,
	HamburgerIcon,
	Skeleton,
	Text,
	TimesIcon,
	VerifiedIcon,
} from "#components";
import { CollectionFilters } from "#components/collection-filters";
import { CollectionFiltersContext } from "#context/collection-filters";

type NFT = {
	id: string;
	name: string;
	imageUrl: string;
	tokenId: string;
};

// Mock NFT data for a collection
const MOCK_NFTS: NFT[] = [
	{
		id: "1",
		name: "Item #1",
		imageUrl: "https://static.cartridge.gg/presets/dragark/icon.png",
		tokenId: "1",
	},
	{
		id: "2",
		name: "Item #2",
		imageUrl: "https://static.cartridge.gg/presets/dragark/icon.png",
		tokenId: "2",
	},
	{
		id: "3",
		name: "Item #3",
		imageUrl: "https://static.cartridge.gg/presets/dragark/icon.png",
		tokenId: "3",
	},
	{
		id: "4",
		name: "Item #4",
		imageUrl: "https://static.cartridge.gg/presets/dragark/icon.png",
		tokenId: "4",
	},
	{
		id: "5",
		name: "Item #5",
		imageUrl: "https://static.cartridge.gg/presets/dragark/icon.png",
		tokenId: "5",
	},
	{
		id: "6",
		name: "Item #6",
		imageUrl: "https://static.cartridge.gg/presets/dragark/icon.png",
		tokenId: "6",
	},
	{
		id: "7",
		name: "Item #7",
		imageUrl: "https://static.cartridge.gg/presets/dragark/icon.png",
		tokenId: "7",
	},
	{
		id: "8",
		name: "Item #8",
		imageUrl: "https://static.cartridge.gg/presets/dragark/icon.png",
		tokenId: "8",
	},
];

// Mock attributes for filters
const MOCK_ATTRIBUTES: {
	[key: string]: { property: string; count: number }[];
} = {
	Rarity: [
		{ property: "Common", count: 45 },
		{ property: "Rare", count: 28 },
		{ property: "Epic", count: 15 },
		{ property: "Legendary", count: 8 },
	],
	Type: [
		{ property: "Weapon", count: 32 },
		{ property: "Armor", count: 28 },
		{ property: "Accessory", count: 24 },
		{ property: "Consumable", count: 12 },
	],
	Element: [
		{ property: "Fire", count: 20 },
		{ property: "Water", count: 18 },
		{ property: "Earth", count: 16 },
		{ property: "Air", count: 14 },
		{ property: "Lightning", count: 12 },
	],
};

export function CollectionScene() {
	const router = useRouter();
	const { collection: collectionParam } = useLocalSearchParams<{
		collection: string;
		game?: string;
	}>();
	const { collections, status } = useCollections();
	const { games, editions } = useArcade();

	// Filter state
	const [filtersVisible, setFiltersVisible] = useState(false);
	const [filterStatus, setFilterStatus] = useState<"buy_now" | "show_all">(
		"show_all",
	);
	const [propertyFilters, setPropertyFilters] = useState<
		{ attribute: string; property: string }[]
	>([]);

	// Find the collection by address
	const collection = useMemo(() => {
		if (!collectionParam) return undefined;
		return collections.find(
			(c) => c.address.toLowerCase() === collectionParam.toLowerCase(),
		);
	}, [collectionParam, collections]);

	// Find the game for this collection
	const game = useMemo(() => {
		if (!collection) return undefined;
		const edition = editions.find(
			(e) => e.config?.project === collection.project,
		);
		if (!edition) return undefined;
		return games.find((g) => g.id === edition.gameId);
	}, [collection, editions, games]);

	if (status === "loading") {
		return <LoadingState />;
	}

	if (!collection) {
		return <EmptyState message="Collection not found" />;
	}

	return (
		<CollectionFiltersContext.Provider
			value={{ openFilters: () => setFiltersVisible(true) }}
		>
			<View className="flex-1 bg-background">
				<View className="bg-background-200 border-b border-spacer-100 p-4">
					<View className="flex-row items-center justify-between gap-4">
						<Pressable
							onPress={() => setFiltersVisible(true)}
							className="w-9 h-9 items-center justify-center active:opacity-60"
						>
							<HamburgerIcon />
						</Pressable>
						<View className="flex-row gap-4 items-center flex-1">
							<View className="w-16 h-16 rounded-lg overflow-hidden bg-background-100">
								<Image
									source={{
										uri: collection.imageUrl.startsWith("ipfs://")
											? collection.imageUrl.replace(
													"ipfs://",
													"https://ipfs.io/ipfs/",
												)
											: collection.imageUrl,
									}}
									className="w-full h-full"
									resizeMode="cover"
								/>
							</View>
							<View className="flex-1 gap-2">
								<Text className="text-xl font-semibold" numberOfLines={1}>
									{collection.name}
								</Text>
								{game && (
									<View className="flex-row items-center gap-1 bg-background-150 rounded px-2 py-1 self-start">
										<VerifiedIcon size="sm" />
										<Text className="text-sm text-foreground-300">
											{game.name}
										</Text>
									</View>
								)}
							</View>
						</View>
						<Pressable
							onPress={() => router.back()}
							className="w-9 h-9 rounded-full bg-background-100 items-center justify-center active:bg-background-300"
						>
							<TimesIcon size="sm" />
						</Pressable>
					</View>
				</View>

				<ScrollView className="flex-1 p-4">
					<FlatList
						data={MOCK_NFTS}
						numColumns={2}
						scrollEnabled={false}
						columnWrapperStyle={{ gap: 12 }}
						ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
						keyExtractor={(item) => item.id}
						renderItem={({ item, index }) => (
							<View
								style={{
									flex: 1,
									maxWidth: "50%",
									paddingLeft: index % 2 === 0 ? 0 : 6,
									paddingRight: index % 2 === 0 ? 6 : 0,
								}}
							>
								<NFTCard nft={item} />
							</View>
						)}
						ListEmptyComponent={
							<EmptyState message="No items in this collection" />
						}
					/>
				</ScrollView>

				<CollectionFilters
					visible={filtersVisible}
					onClose={() => setFiltersVisible(false)}
					status={filterStatus}
					onStatusChange={setFilterStatus}
					selectedFilters={propertyFilters}
					onFiltersChange={setPropertyFilters}
					attributes={MOCK_ATTRIBUTES}
				/>
			</View>
		</CollectionFiltersContext.Provider>
	);
}

function NFTCard({ nft }: { nft: NFT }) {
	const imageUri = nft.imageUrl.startsWith("ipfs://")
		? nft.imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/")
		: nft.imageUrl;

	return (
		<Pressable className="flex-1 bg-background-200 rounded-lg overflow-hidden active:opacity-80">
			<View className="aspect-square bg-background-100">
				<Image
					source={{ uri: imageUri }}
					className="w-full h-full"
					resizeMode="cover"
				/>
			</View>
			<View className="p-3">
				<Text className="text-sm font-medium" numberOfLines={1}>
					{nft.name}
				</Text>
				<Text className="text-xs text-foreground-400">#{nft.tokenId}</Text>
			</View>
		</Pressable>
	);
}

function LoadingState() {
	return (
		<View className="flex-1 bg-background p-4">
			<View className="flex-row gap-4 items-center mb-6">
				<Skeleton className="w-16 h-16 rounded-lg" />
				<View className="flex-1 gap-2">
					<Skeleton className="h-6 w-48" />
					<Skeleton className="h-4 w-24" />
				</View>
			</View>
			<View className="flex-row gap-3 mb-3">
				<Skeleton className="flex-1 h-48 rounded-lg" />
				<Skeleton className="flex-1 h-48 rounded-lg" />
			</View>
			<View className="flex-row gap-3 mb-3">
				<Skeleton className="flex-1 h-48 rounded-lg" />
				<Skeleton className="flex-1 h-48 rounded-lg" />
			</View>
		</View>
	);
}

function EmptyState({ message }: { message: string }) {
	return (
		<View className="flex-1 items-center justify-center gap-4 px-6 py-12">
			<EmptyStateInventoryIcon size="xl" />
			<View className="items-center gap-2">
				<Text className="text-lg font-semibold text-foreground-200">
					No Items
				</Text>
				<Text className="text-sm text-foreground-400 text-center">
					{message}
				</Text>
			</View>
		</View>
	);
}
