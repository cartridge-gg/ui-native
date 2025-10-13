import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { FlatList, Image, Pressable, ScrollView, View } from "react-native";
import {
	type MarketToken,
	useArcade,
	useCollections,
	useMarketTokensFetcher,
} from "#clone/arcade";
import {
	EmptyStateInventoryIcon,
	Skeleton,
	SliderIcon,
	Text,
	TimesIcon,
	VerifiedIcon,
} from "#components";

export function CollectionScene() {
	const router = useRouter();
	const { collection: collectionParam } = useLocalSearchParams<{
		collection: string;
		game?: string;
	}>();
	const { collections, status } = useCollections();
	const { games, editions } = useArcade();

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

	// Fetch tokens for this collection
	const {
		tokens,
		status: tokensStatus,
		availableFilters,
	} = useMarketTokensFetcher({
		project: collection?.project ? [collection.project] : [],
		address: collection?.address || "",
		autoFetch: !!collection,
	});

	if (status === "loading") {
		return <LoadingState />;
	}

	if (!collection) {
		return <EmptyState message="Collection not found" />;
	}

	const handleOpenFilters = () => {
		router.push({
			pathname: "/(drawer)/collection/[collection]/filters",
			params: {
				collection: collection?.address || "",
				availableFilters: JSON.stringify(availableFilters),
			},
		});
	};

	return (
		<View className="flex-1 bg-background">
			<View className="bg-background-200 border-b border-spacer-100 p-4">
				<View className="flex-row items-center justify-between gap-4">
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
						onPress={handleOpenFilters}
						className="w-9 h-9 items-center justify-center active:opacity-60"
					>
						<SliderIcon size="lg" />
					</Pressable>
					<Pressable
						onPress={() => router.back()}
						className="w-9 h-9 rounded-full bg-background-100 items-center justify-center active:bg-background-300"
					>
						<TimesIcon size="sm" />
					</Pressable>
				</View>
			</View>

			<ScrollView className="flex-1 p-4">
				{tokensStatus === "loading" ? (
					<View className="flex-row gap-3 mb-3">
						<Skeleton className="flex-1 h-48 rounded-lg" />
						<Skeleton className="flex-1 h-48 rounded-lg" />
					</View>
				) : (
					<FlatList
						data={tokens}
						numColumns={2}
						scrollEnabled={false}
						columnWrapperStyle={{ gap: 12 }}
						ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
						keyExtractor={(item) => `${item.contract_address}-${item.token_id}`}
						renderItem={({ item, index }) => (
							<View
								style={{
									flex: 1,
									maxWidth: "50%",
									paddingLeft: index % 2 === 0 ? 0 : 6,
									paddingRight: index % 2 === 0 ? 6 : 0,
								}}
							>
								<NFTCard token={item} />
							</View>
						)}
						ListEmptyComponent={
							<EmptyState message="No items in this collection" />
						}
					/>
				)}
			</ScrollView>
		</View>
	);
}

function NFTCard({ token }: { token: MarketToken }) {
	const imageUri = token.image?.startsWith("ipfs://")
		? token.image.replace("ipfs://", "https://ipfs.io/ipfs/")
		: token.image;

	const metadata = token.metadata as { name?: string } | undefined;
	const tokenName = token.name || metadata?.name || "Unknown";

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
					{tokenName}
				</Text>
				<Text className="text-xs text-foreground-400">#{token.token_id}</Text>
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
