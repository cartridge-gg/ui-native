import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCollections, useMarketplace, useGameLookup } from "#clone/arcade";
import {
	EmptyStateInventoryIcon,
	ItemCard,
	ItemGrid,
	Skeleton,
	Text,
} from "#components";
import { TAB_BAR_HEIGHT } from "#utils";
import { useGameContext } from "../../../../contexts/GameContext";
import { useCollectionGameMapping } from "../../../../hooks/useCollectionGameMapping";

export function Marketplace() {
	const insets = useSafeAreaInsets();
	const { game } = useLocalSearchParams<{ game: string }>();
	const { collections, status } = useCollections();
	const { getListingCount, getFloorPrice, getLastSale } = useMarketplace();
	const gameLookup = useGameLookup();
	const { selectedEdition } = useGameContext();
	const { getCollectionsForEdition, mappings } = useCollectionGameMapping();

	// Find the current game if we're in a game context
	const currentGame = useMemo(() => {
		if (!game) return undefined;

		try {
			return gameLookup.byIdOrSlug(game);
		} catch {
			return undefined;
		}
	}, [game, gameLookup]);

	// Filter collections by edition (if selected) or game ID
	const filteredCollections = useMemo(() => {
		if (!currentGame) return collections;
		
		// If an edition is selected, filter by edition
		if (selectedEdition) {
			const editionCollections = getCollectionsForEdition(selectedEdition.id);
			const editionCollectionSet = new Set(editionCollections.map(addr => addr.toLowerCase()));
			
			return collections.filter((c) => 
				editionCollectionSet.has(c.address.toLowerCase())
			);
		}
		
		// Otherwise, filter by game ID
		const gameIdHex = `0x${currentGame.id.toString(16).padStart(64, '0')}`;
		
		return collections.filter((c) => {
			if (!c.gameId) return false;
			return c.gameId.toLowerCase() === gameIdHex.toLowerCase();
		});
	}, [collections, currentGame, selectedEdition, getCollectionsForEdition]);

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
					There are no collections available for this edition yet.
				</Text>
			</View>
		</View>
	);
}
