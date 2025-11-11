import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useArcade, useCollections, useMarketplace, useGameLookup } from "#clone/arcade";
import {
	EmptyStateInventoryIcon,
	ItemCard,
	ItemGrid,
	Skeleton,
	Text,
} from "#components";
import { TAB_BAR_HEIGHT } from "#utils";

export function Marketplace() {
	const insets = useSafeAreaInsets();
	const { game } = useLocalSearchParams<{ game: string }>();
	const { collections, status } = useCollections();
	const { editions } = useArcade();
	const { getListingCount, getFloorPrice, getLastSale } = useMarketplace();
	const gameLookup = useGameLookup();

	// Find the current game and edition if we're in a game context
	const { edition } = useMemo(() => {
		if (!game) return { game: undefined, edition: undefined };

		try {
			const foundGame = gameLookup.byIdOrSlug(game);
			if (!foundGame) return { game: undefined, edition: undefined };

			// Match edition by gameId instead of config.project
			const foundEdition = editions.find((e) => e.gameId === foundGame.id);

			return { game: foundGame, edition: foundEdition };
		} catch {
			return { game: undefined, edition: undefined };
		}
	}, [game, gameLookup, editions]);

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
		<ScrollView
			contentContainerStyle={{
				padding: 16,
				paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 16,
			}}
			showsVerticalScrollIndicator={false}
		>
			<ItemGrid
				data={filteredCollections}
				numColumns={2}
				gap={12}
				maintainColumnWidth={true}
				keyExtractor={(item) => item.address}
				renderItem={(item) => {
					const { name, imageUrl, address } = item;

					return (
						<ItemCard
							variant="collection"
							href={
								game
									? `/(drawer)/game/${game}/collection/${address}`
									: `/(drawer)/collection/${address}`
							}
							title={name}
							imageUri={imageUrl}
						/>
					);
				}}
			/>
		</ScrollView>
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
