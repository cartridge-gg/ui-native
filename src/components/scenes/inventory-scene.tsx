import { Image, Pressable, ScrollView, View } from "react-native";
import type { Collection, Token } from "#clone/arcade";
import { useCollections, useTokens } from "#clone/arcade";
import { StackDiamondIcon, TagIcon, Text } from "#components";

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
					<View key={collection.address} className="w-[48%]">
						<CollectionCard collection={collection} />
					</View>
				))}
			</View>
		</View>
	);
}

function CollectionCard({ collection }: { collection: Collection }) {
	const imageUri = collection.imageUrl.startsWith("ipfs://")
		? collection.imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/")
		: collection.imageUrl;

	// Mock data - in real app these would come from marketplace data
	const listingCount = 0; // No listings for user's own collections typically
	const price = null;
	const lastSale = null;

	return (
		<Pressable className="relative rounded overflow-hidden border-2 border-transparent">
			{/* Header */}
			<View className="h-9 relative flex-row gap-2 px-1.5 py-1.5 justify-between items-center bg-background-200">
				<View className="flex-row items-center gap-1.5 overflow-hidden flex-1">
					<Text
						className="text-sm font-medium text-foreground-100 flex-1 pl-2.5"
						numberOfLines={1}
					>
						{collection.name}
					</Text>
				</View>
			</View>

			{/* Preview */}
			<View className="relative overflow-hidden aspect-square">
				{/* Blurred background */}
				<View className="absolute inset-0 opacity-75" style={{ zIndex: 0 }}>
					<Image
						source={{ uri: imageUri }}
						className="w-full h-full"
						style={{ transform: [{ scale: 1.1 }] }}
						blurRadius={8}
						resizeMode="cover"
					/>
					<View className="absolute inset-0 bg-black/64" />
				</View>

				{/* Main image - centered with padding */}
				<View
					className="absolute inset-0 p-2 items-center justify-center"
					style={{ zIndex: 1 }}
				>
					<Image
						source={{ uri: imageUri }}
						style={{
							width: "100%",
							height: "100%",
						}}
						resizeMode="contain"
					/>
				</View>

				{/* Stats overlay - bottom left */}
				<View
					className="absolute bottom-1.5 left-1.5 flex-row gap-1 items-center flex-wrap"
					style={{ zIndex: 2 }}
				>
					{!!collection.totalCount && (
						<View className="relative px-1 py-0.5 rounded-sm h-6 flex-row justify-center items-center bg-[#1E221FA3]">
							<StackDiamondIcon variant="solid" size="sm" />
							<Text className="text-sm font-semibold text-foreground-100 px-0.5">
								{collection.totalCount.toLocaleString()}
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

			{/* Footer */}
			{(price || lastSale) && (
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
						<Text
							className={
								price
									? "text-sm font-medium text-foreground-100"
									: "text-sm font-medium text-foreground-400"
							}
						>
							{price || "--"}
						</Text>
						<Text className="text-sm font-medium text-foreground-400">
							{lastSale || "--"}
						</Text>
					</View>
				</View>
			)}
		</Pressable>
	);
}
