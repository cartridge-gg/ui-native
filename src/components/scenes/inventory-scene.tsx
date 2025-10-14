import { useMemo } from "react";
import { FlatList, Image, ScrollView, View } from "react-native";
import type { Collection, Token } from "#clone/arcade";
import { useCollections, useMarketplace, useTokens } from "#clone/arcade";
import { ItemCard, ItemGrid, Text } from "#components";

export function InventoryScene() {
	const { tokens, credits, status: tokensStatus } = useTokens();
	const { collections, status: collectionsStatus } = useCollections();

	return (
		<ScrollView className="flex-1">
			<View style={{ padding: 16, gap: 16 }}>
				<TokensSection
					tokens={tokens}
					credits={credits}
					status={tokensStatus}
				/>
				<CollectionsSection
					collections={collections}
					status={collectionsStatus}
				/>
			</View>
		</ScrollView>
	);
}

interface TokensSectionProps {
	tokens: Token[];
	credits: Token;
	status: string;
}

function TokensSection({ tokens, credits, status }: TokensSectionProps) {
	if (status === "loading") {
		return (
			<View>
				<Text className="text-lg font-semibold mb-3">Tokens</Text>
				<View className="flex flex-col gap-2">
					{Array.from({ length: 4 }, (_, i) => `token-skeleton-${i}`).map(
						(key) => (
							<View key={key} className="h-16 bg-background-200 rounded-lg" />
						),
					)}
				</View>
			</View>
		);
	}

	const filteredTokens = tokens.filter((token) => token.balance.amount > 0);

	return (
		<View>
			<Text className="text-lg font-semibold mb-3">Tokens</Text>
			<View className="flex flex-col gap-2">
				{/* Credits card */}
				<TokenCard token={credits} />

				{/* Other tokens */}
				{filteredTokens.map((token) => (
					<TokenCard key={token.metadata.address} token={token} />
				))}

				{filteredTokens.length === 0 && (
					<View className="items-center justify-center py-8">
						<Text className="text-foreground-300 text-center text-sm">
							No tokens available
						</Text>
					</View>
				)}
			</View>
		</View>
	);
}

function TokenCard({ token }: { token: Token }) {
	const changeColor =
		token.balance.change > 0
			? "text-green-500"
			: token.balance.change < 0
				? "text-red-500"
				: "text-foreground-300";

	return (
		<View className="flex-row items-center gap-3 p-3 bg-background-200 rounded-lg">
			<View className="size-10 rounded bg-background-100 items-center justify-center">
				{token.metadata.image ? (
					<Image
						source={{ uri: token.metadata.image }}
						className="size-10 rounded"
					/>
				) : (
					<Text className="text-sm font-bold">{token.metadata.symbol[0]}</Text>
				)}
			</View>
			<View className="flex-1">
				<Text className="text-sm font-medium">{token.metadata.name}</Text>
				<Text className="text-xs text-foreground-300">
					{token.balance.amount.toLocaleString(undefined, {
						maximumFractionDigits: 5,
					})}{" "}
					{token.metadata.symbol}
				</Text>
			</View>
			<View className="items-end">
				{token.balance.value > 0 && (
					<Text className="text-sm font-medium">
						$
						{token.balance.value.toLocaleString(undefined, {
							maximumFractionDigits: 2,
						})}
					</Text>
				)}
				{token.balance.change !== 0 && (
					<Text className={`text-xs ${changeColor}`}>
						{token.balance.change > 0 ? "+" : ""}$
						{token.balance.change.toLocaleString(undefined, {
							maximumFractionDigits: 2,
						})}
					</Text>
				)}
			</View>
		</View>
	);
}

interface CollectionsSectionProps {
	collections: Collection[];
	status: string;
}

function CollectionsSection({ collections, status }: CollectionsSectionProps) {
	const { getListingCount, getFloorPrice, getLastSale } = useMarketplace();

	const skeletonData = useMemo(
		() => Array.from({ length: 4 }, (_, i) => ({ id: `skeleton-${i}` })),
		[],
	);

	if (status === "loading") {
		return (
			<View>
				<Text className="text-lg font-semibold mb-3">Collections</Text>
				<FlatList
					data={skeletonData}
					numColumns={2}
					scrollEnabled={false}
					columnWrapperStyle={{ gap: 12 }}
					contentContainerStyle={{ gap: 12 }}
					keyExtractor={(item) => item.id}
					renderItem={() => (
						<View className="flex-1 h-40 bg-background-200 rounded-lg" />
					)}
				/>
			</View>
		);
	}

	if (collections.length === 0) {
		return (
			<View>
				<Text className="text-lg font-semibold mb-3">Collections</Text>
				<View className="items-center justify-center py-8">
					<Text className="text-foreground-300 text-center text-sm">
						No collections available
					</Text>
				</View>
			</View>
		);
	}

	return (
		<View>
			<Text className="text-lg font-semibold mb-3">Collections</Text>
			<ItemGrid
				data={collections}
				numColumns={2}
				gap={12}
				maintainColumnWidth={true}
				keyExtractor={(item) => item.address}
				renderItem={(item) => {
					const { name, imageUrl, totalCount, address } = item;
					const listingCount = getListingCount(address);
					const price = getFloorPrice(address);
					const lastSale = getLastSale(address);

					return (
						<ItemCard
							href={`../collection/${address}`}
							title={name}
							imageUri={imageUrl}
							totalCount={totalCount}
							listingCount={listingCount}
							price={price}
							lastSale={lastSale}
						/>
					);
				}}
			/>
		</View>
	);
}
