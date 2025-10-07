import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { FlatList, Image, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useArcade, useCollections } from "#clone/arcade";
import type { Collection } from "#clone/arcade/context/collection";
import { EmptyStateInventoryIcon, Skeleton, Text } from "#components";
import { TAB_BAR_HEIGHT } from "#utils";

export function MarketplaceScene() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { game: gameParam } = useLocalSearchParams<{ game?: string }>();
	const { collections, status } = useCollections();
	const { games, editions } = useArcade();

	// Find the current game and edition if we're in a game context
	const { edition } = useMemo(() => {
		if (!gameParam) return { game: undefined, edition: undefined };

		try {
			const idNum = Number(gameParam);
			const foundGame =
				(Number.isFinite(idNum)
					? games.find((g) => g.id === idNum)
					: undefined) ??
				games.find(
					(g) => g.name.toLowerCase().replace(/\s+/g, "-") === gameParam,
				);

			if (!foundGame) return { game: undefined, edition: undefined };

			// Match edition by gameId instead of config.project
			const foundEdition = editions.find((e) => e.gameId === foundGame.id);

			return { game: foundGame, edition: foundEdition };
		} catch {
			return { game: undefined, edition: undefined };
		}
	}, [gameParam, games, editions]);

	// Filter collections by game/edition if applicable
	const filteredCollections = useMemo(() => {
		if (!edition) return collections;
		// Filter collections that belong to this game's project
		return collections.filter((c) => c.project === edition.config?.project);
	}, [collections, edition]);

	if (status === "loading") {
		return <LoadingState />;
	}

	if (status === "error" || filteredCollections.length === 0) {
		return <EmptyState />;
	}

	return (
		<FlatList
			data={filteredCollections}
			numColumns={2}
			contentContainerStyle={{
				padding: 16,
				paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 16,
			}}
			columnWrapperStyle={{ gap: 12 }}
			ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
			keyExtractor={(item) => item.address}
			renderItem={({ item, index }) => (
				<View
					style={{
						flex: 1,
						maxWidth: "50%",
						paddingLeft: index % 2 === 0 ? 0 : 6,
						paddingRight: index % 2 === 0 ? 6 : 0,
					}}
				>
					<CollectionCard
						collection={item}
						gameParam={gameParam}
						router={router}
					/>
				</View>
			)}
			showsVerticalScrollIndicator={false}
		/>
	);
}

interface CollectionCardProps {
	collection: Collection;
	gameParam?: string;
	router: ReturnType<typeof useRouter>;
}

function CollectionCard({
	collection,
	gameParam,
	router,
}: CollectionCardProps) {
	const imageUri = collection.imageUrl.startsWith("ipfs://")
		? collection.imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/")
		: collection.imageUrl;

	const handlePress = () => {
		const collectionAddress = collection.address.toLowerCase();
		router.push({
			pathname: `/collection/${collectionAddress}`,
			params: gameParam ? { game: gameParam } : {},
		});
	};

	return (
		<Pressable
			onPress={handlePress}
			className="flex-1 bg-background-200 rounded-lg overflow-hidden active:opacity-80"
		>
			<View className="aspect-square bg-background-100">
				<Image
					source={{ uri: imageUri }}
					className="w-full h-full"
					resizeMode="cover"
				/>
			</View>
			<View className="p-3 gap-1">
				<Text className="text-sm font-medium" numberOfLines={1}>
					{collection.name}
				</Text>
				<Text className="text-xs text-foreground-300">
					{collection.totalCount}{" "}
					{collection.totalCount === 1 ? "item" : "items"}
				</Text>
				<Text className="text-xs text-foreground-400">{collection.type}</Text>
			</View>
		</Pressable>
	);
}

function LoadingState() {
	return (
		<View className="flex-1 p-4">
			<View className="flex-row gap-3 mb-3">
				<Skeleton className="flex-1 h-48 rounded-lg" />
				<Skeleton className="flex-1 h-48 rounded-lg" />
			</View>
			<View className="flex-row gap-3 mb-3">
				<Skeleton className="flex-1 h-48 rounded-lg" />
				<Skeleton className="flex-1 h-48 rounded-lg" />
			</View>
			<View className="flex-row gap-3">
				<Skeleton className="flex-1 h-48 rounded-lg" />
				<Skeleton className="flex-1 h-48 rounded-lg" />
			</View>
		</View>
	);
}

function EmptyState() {
	return (
		<View className="flex-1 items-center justify-center gap-4 px-6 py-12">
			<EmptyStateInventoryIcon size="xl" />
			<View className="items-center gap-2">
				<Text className="text-lg font-semibold text-foreground-200">
					No Collections
				</Text>
				<Text className="text-sm text-foreground-400 text-center">
					There are no collections available for this game yet.
				</Text>
			</View>
		</View>
	);
}
