import { Image, ScrollView, View } from "react-native";
import type { Collection, Token } from "#clone/arcade";
import { useCollections, useTokens } from "#clone/arcade";
import { Text } from "#components";

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
	if (status === "loading") {
		return (
			<View>
				<Text className="text-lg font-semibold mb-3">Collections</Text>
				<View className="grid grid-cols-2 gap-3">
					{Array.from({ length: 4 }, (_, i) => `collection-skeleton-${i}`).map(
						(key) => (
							<View key={key} className="h-40 bg-background-200 rounded-lg" />
						),
					)}
				</View>
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
			<View className="flex flex-row flex-wrap gap-3">
				{collections.map((collection) => (
					<CollectionCard key={collection.address} collection={collection} />
				))}
			</View>
		</View>
	);
}

function CollectionCard({ collection }: { collection: Collection }) {
	const imageUri = collection.imageUrl.replace(
		"ipfs://",
		"https://ipfs.io/ipfs/",
	);

	return (
		<View className="grid grid-cols-2 gap-3 bg-background-200 rounded-lg overflow-hidden">
			<View className="aspect-square bg-background-100">
				<Image source={{ uri: imageUri }} resizeMode="cover" />
			</View>
			<View className="p-3">
				<Text className="text-sm font-medium" numberOfLines={1}>
					{collection.name}
				</Text>
				<Text className="text-xs text-foreground-300 mt-1">
					{collection.totalCount}{" "}
					{collection.totalCount === 1 ? "item" : "items"}
				</Text>
				<Text className="text-xs text-foreground-400 mt-0.5">
					{collection.type}
				</Text>
			</View>
		</View>
	);
}
