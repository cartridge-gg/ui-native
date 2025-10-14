import { Link, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { FlatList, Image, Pressable, ScrollView, View } from "react-native";
import {
	type MarketToken,
	useArcade,
	useCollections,
	useMarketTokensFetcher,
} from "#clone/arcade";
import {
	Button,
	EmptyStateInventoryIcon,
	Skeleton,
	SliderIcon,
	StackDiamondIcon,
	StarknetColorIcon,
	TagIcon,
	Text,
	TimesIcon,
	VerifiedIcon,
} from "#components";

export function Collection() {
	const params = useLocalSearchParams<{
		collection: string;
		game?: string;
		filters?: string; // Format: "trait1:value1,value2|trait2:value3"
		status?: string; // "buy_now" or "show_all"
	}>();
	const { collections, status } = useCollections();
	const { games, editions } = useArcade();

	const collection = useMemo(() => {
		if (!params.collection) return undefined;
		return collections.find(
			(c) => c.address.toLowerCase() === params.collection.toLowerCase(),
		);
	}, [params.collection, collections]);

	// Parse filters from URL params
	const attributeFilters = useMemo(() => {
		if (!params.filters) return {};
		try {
			// Format: "trait1:value1,value2|trait2:value3"
			const filters: { [name: string]: Set<string> } = {};
			const traits = params.filters.split("|");
			for (const trait of traits) {
				const [name, valuesStr] = trait.split(":");
				if (name && valuesStr) {
					filters[name] = new Set(valuesStr.split(","));
				}
			}
			return filters;
		} catch {
			return {};
		}
	}, [params.filters]);

	const game = useMemo(() => {
		if (!collection) return undefined;
		const edition = editions.find(
			(e) => e.config?.project === collection.project,
		);
		if (!edition) return undefined;
		return games.find((g) => g.id === edition.gameId);
	}, [collection, editions, games]);

	const {
		tokens,
		status: tokensStatus,
		availableFilters,
		totalCount,
		listingCount,
	} = useMarketTokensFetcher({
		project: collection?.project ? [collection.project] : [],
		address: collection?.address || "",
		autoFetch: !!collection,
		attributeFilters,
	});

	if (status === "loading") {
		return <LoadingState />;
	}

	if (!collection) {
		return <EmptyState message="Collection not found" />;
	}

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
					<Link
						href={{
							pathname: "/(drawer)/collection/[collection]/filter",
							params: {
								collection: collection?.address || "",
								availableFilters: JSON.stringify(availableFilters),
								filters: params.filters || "",
								status: params.status || "show_all",
							},
						}}
						asChild
					>
						<Button variant="icon" size="icon">
							<SliderIcon size="lg" />
						</Button>
					</Link>
					<Link href=".." asChild>
						<Button variant="icon" size="icon">
							<TimesIcon size="sm" />
						</Button>
					</Link>
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
								<Item
									token={item}
									collectionName={collection.name}
									totalCount={totalCount}
									listingCount={listingCount}
								/>
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

function Item({
	token,
	collectionName,
	totalCount,
	listingCount,
}: {
	token: MarketToken;
	collectionName: string;
	totalCount: number;
	listingCount: number;
}) {
	const imageUri = token.image?.startsWith("ipfs://")
		? token.image.replace("ipfs://", "https://ipfs.io/ipfs/")
		: token.image || "";

	return (
		<Pressable className="flex-1 relative rounded overflow-hidden border-2 border-transparent">
			<View className="h-9 relative flex-row gap-2 px-1.5 py-1.5 justify-between items-center bg-background-200">
				<View className="flex-row items-center gap-1.5 overflow-hidden flex-1">
					<Text
						className="text-sm font-medium text-foreground-100 flex-1 pl-2.5"
						numberOfLines={1}
					>
						{collectionName}
					</Text>
				</View>
			</View>

			<View className="relative overflow-hidden h-[128px]">
				<View className="absolute inset-0 opacity-75 z-0">
					<Image
						source={{ uri: imageUri }}
						className="size-full"
						style={{ transform: [{ scale: 1.1 }] }}
						blurRadius={8}
						resizeMode="cover"
					/>
					<View className="absolute inset-0 bg-black/64" />
				</View>

				<View className="absolute inset-0 h-full py-2 items-center justify-center z-10">
					<Image
						className="size-full"
						source={{ uri: imageUri }}
						resizeMode="contain"
					/>
				</View>

				<View className="absolute bottom-1.5 left-1.5 flex-row gap-1 items-center flex-wrap z-20">
					{!!totalCount && (
						<View className="relative px-1 py-0.5 rounded-sm h-6 flex-row justify-center items-center bg-[#1E221FA3]">
							<StackDiamondIcon variant="solid" size="sm" />
							<Text className="text-sm font-semibold text-foreground-100 px-0.5">
								{totalCount.toLocaleString()}
							</Text>
						</View>
					)}
					{!!listingCount && (
						<View className="relative px-1 py-0.5 rounded-sm h-6 flex-row justify-center items-center bg-[#1E221FA3]">
							<TagIcon variant="solid" size="sm" />
							<Text className="text-sm font-semibold text-foreground-100 px-0.5">
								{listingCount}
							</Text>
						</View>
					)}
				</View>
			</View>

			{(token.price || token.lastSale) && (
				<View className="px-3 py-2 flex-col gap-0.5 text-foreground-400 bg-background-200">
					<View className="flex-row justify-between items-center">
						<Text className="text-[10px] leading-3 text-foreground-400">
							Price
						</Text>
						<Text className="text-[10px] leading-3 text-foreground-400">
							Last Sale
						</Text>
					</View>
					<View className="flex-row justify-between items-center">
						<View className="flex-row items-center gap-1">
							<StarknetColorIcon />
							<Text
								className={
									token.price
										? "text-sm font-medium text-foreground-100"
										: "text-sm font-medium text-foreground-400"
								}
							>
								{token.price || "--"}
							</Text>
						</View>
						<Text className="text-sm font-medium text-foreground-400">
							{token.lastSale || "--"}
						</Text>
					</View>
				</View>
			)}
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
