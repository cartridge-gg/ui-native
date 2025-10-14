import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { FlatList, ScrollView, View } from "react-native";
import {
	useArcade,
	useCollections,
	useMarketTokensFetcher,
} from "#clone/arcade";
import {
	Button,
	EmptyStateInventoryIcon,
	Skeleton,
	SliderIcon,
	Text,
	TimesIcon,
	VerifiedIcon,
} from "#components";
import { ItemCard } from "./item-card";

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
								placeholder={require("#assets/placeholder.png")}
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
						renderItem={({ item }) => (
							<ItemCard
								href={`./${params.collection}/${item.token_id}`}
								title={item.name ?? item.contract_address}
								imageUri={item.image}
								price={item.price}
								lastSale={item.lastSale}
							/>
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
