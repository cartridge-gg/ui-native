import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, View } from "react-native";
import { useMarketTokensFetcher } from "#clone/arcade";
import {
	ArrowIcon,
	BookIcon,
	Button,
	CopyIcon,
	PulseIcon,
	Skeleton,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Text,
} from "#components";

export function Asset() {
	const params = useLocalSearchParams<{
		collection: string;
		asset: string;
	}>();
	const [activeTab, setActiveTab] = useState("details");

	const { tokens, status } = useMarketTokensFetcher({
		project: [],
		address: params.collection || "",
		autoFetch: !!params.collection,
	});

	const token = useMemo(() => {
		if (!params.asset) return undefined;
		return tokens.find((t) => t.token_id === params.asset);
	}, [params.asset, tokens]);

	const metadata = useMemo(() => {
		if (!token?.metadata) return null;
		return token.metadata as {
			name?: string;
			description?: string;
			image?: string;
			attributes?: Array<{ trait_type: string; value: string }>;
		};
	}, [token?.metadata]);

	const imageSource = useMemo(() => {
		const imageUri = token?.image || metadata?.image;
		if (!imageUri) return undefined;
		return imageUri.startsWith("ipfs://")
			? imageUri.replace("ipfs://", "https://ipfs.io/ipfs/")
			: imageUri;
	}, [token?.image, metadata?.image]);

	const attributes = metadata?.attributes || [];

	const properties = useMemo<
		Array<{ label: string; value: string; placeholder?: boolean }>
	>(() => {
		if (!token) return [];
		const props = [
			{ label: "Token ID", value: token.token_id },
			...attributes.map((attr) => ({
				label: attr.trait_type,
				value: attr.value,
			})),
		];
		if (token.balance) {
			props.push({ label: "Balance", value: token.balance });
		}
		if (token.price) {
			props.push({ label: "Price", value: `${token.price} ETH` });
		}
		if (token.lastSale) {
			props.push({ label: "Last Sale", value: `${token.lastSale} ETH` });
		}
		const numColumns = 3;
		const remainder = props.length % numColumns;
		if (remainder !== 0) {
			const placeholdersNeeded = numColumns - remainder;
			for (let i = 0; i < placeholdersNeeded; i++) {
				props.push({ label: "", value: "", placeholder: true } as {
					label: string;
					value: string;
					placeholder?: boolean;
				});
			}
		}
		return props;
	}, [token, attributes]);

	if (status === "loading") {
		return <LoadingState />;
	}

	if (!token) {
		return <EmptyState />;
	}

	return (
		<View className="flex-1 bg-background">
			<View className="bg-background-200 border-b border-spacer-100 p-4 flex-row items-center justify-between gap-2">
				<Link href=".." asChild>
					<Button variant="icon" size="icon">
						<ArrowIcon variant="left" />
					</Button>
				</Link>
				<View className="flex-1">
					<Text className="text-xl font-semibold" numberOfLines={1}>
						{token.name || metadata?.name || `#${token.token_id}`}
					</Text>
					<Text className="text-sm text-foreground-400">
						{metadata?.name?.split(" ")[0] || "Collection"}
					</Text>
				</View>
			</View>

			<ScrollView className="flex-1">
				<View className="p-4 gap-4">
					<View className="w-full self-center aspect-[5/3] rounded-lg overflow-hidden relative">
						<View className="absolute inset-0 opacity-75">
							<Image
								source={imageSource}
								className="size-full"
								style={{ transform: [{ scale: 1.1 }] }}
								blurRadius={8}
								contentFit="cover"
								placeholder={require("#assets/placeholder.png")}
							/>
							<View className="absolute inset-0 bg-black/64" />
						</View>
						<View className="absolute inset-0 p-4 items-center justify-center">
							<Image
								source={imageSource}
								className="size-full"
								contentFit="contain"
								placeholder={require("#assets/placeholder.png")}
							/>
						</View>
					</View>

					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className="flex-1"
					>
						<TabsList className="w-full border-b border-spacer-100">
							<TabsTrigger value="details" className="flex-1">
								<BookIcon
									variant={activeTab === "details" ? "solid" : "line"}
								/>
								<Text>Details</Text>
							</TabsTrigger>
							<TabsTrigger value="activity" className="flex-1">
								<PulseIcon
									variant={activeTab === "activity" ? "solid" : "line"}
								/>
								<Text>Activity</Text>
							</TabsTrigger>
						</TabsList>

						<TabsContent value="details" className="gap-2">
							<FlatList
								data={properties}
								numColumns={3}
								scrollEnabled={false}
								columnWrapperStyle={{ gap: 1 }}
								contentContainerStyle={{ gap: 1, borderBottomEndRadius: 4 }}
								keyExtractor={(item, index) => `${item.label}-${index}`}
								ListHeaderComponent={() => (
									<Text className="text-xs text-foreground-300 font-semibold uppercase tracking-wider bg-background-200 p-3 rounded-t">
										Properties
									</Text>
								)}
								renderItem={({ item }) => (
									<View className="flex-1">
										{item.placeholder ? (
											<View />
										) : (
											<View className="bg-background-200 font-semibold rounded p-3 gap-3">
												<Text className="text-xs text-foreground-400 font-semibold">
													{item.label}
												</Text>
												<Text
													className="text-sm font-medium text-foreground-100"
													numberOfLines={1}
												>
													{item.value}
												</Text>
											</View>
										)}
									</View>
								)}
							/>
							<View className="gap-px rounded overflow-hidden">
								<Text className="text-xs text-foreground-300 font-semibold uppercase tracking-wider bg-background-200 p-3">
									Details
								</Text>
								<View className="gap-px">
									<DetailRow label="Owner" value="lei" />
									<DetailRow
										label="Contract Address"
										value={`${token.contract_address.slice(0, 6)}...${token.contract_address.slice(-4)}`}
										copyable
									/>
									<DetailRow label="Token ID" value={token.token_id} />
									<DetailRow label="Token Standard" value="ERC-721" />
								</View>
							</View>
						</TabsContent>

						<TabsContent
							value="activity"
							className="items-center justify-center py-12"
						>
							<Text className="text-foreground-400">No activity yet</Text>
						</TabsContent>
					</Tabs>
				</View>
			</ScrollView>
		</View>
	);
}

function DetailRow({
	label,
	value,
	copyable,
}: {
	label: string;
	value: string;
	copyable?: boolean;
}) {
	return (
		<View className="flex-row justify-between items-center bg-background-200 p-3">
			<Text className="text-sm text-foreground-400 font-semibold">{label}</Text>
			<View className="flex-row items-center gap-2">
				<Text className="text-sm text-foreground-100">{value}</Text>
				{copyable && (
					<Pressable className="p-1">
						<CopyIcon size="sm" />
					</Pressable>
				)}
			</View>
		</View>
	);
}

function LoadingState() {
	return (
		<View className="flex-1 bg-background">
			<View className="bg-background-200 border-b border-spacer-100 p-4">
				<Skeleton className="h-6 w-48 mb-2" />
				<Skeleton className="h-4 w-24" />
			</View>
			<ScrollView className="flex-1 p-4">
				<Skeleton className="w-full self-center aspect-[5/3] rounded-lg mb-6" />
				<View className="gap-4">
					<View className="flex-row gap-4">
						<Skeleton className="h-10 flex-1 rounded" />
						<Skeleton className="h-10 flex-1 rounded" />
					</View>
					<Skeleton className="h-4 w-24 mb-1" />
					<View className="flex-row gap-1">
						<Skeleton className="h-16 flex-1 rounded" />
						<Skeleton className="h-16 flex-1 rounded" />
						<Skeleton className="h-16 flex-1 rounded" />
					</View>
					<View className="flex-row gap-1">
						<Skeleton className="h-16 flex-1 rounded" />
						<Skeleton className="h-16 flex-1 rounded" />
						<Skeleton className="h-16 flex-1 rounded" />
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

function EmptyState() {
	return (
		<View className="flex-1 bg-background items-center justify-center p-6">
			<Text className="text-lg font-semibold text-foreground-200 mb-2">
				Asset Not Found
			</Text>
			<Text className="text-sm text-foreground-400 text-center mb-6">
				The asset you're looking for could not be found.
			</Text>
			<Link href="../.." asChild>
				<Pressable className="bg-background-200 px-6 py-3 rounded-lg">
					<Text className="text-foreground-100 font-medium">Go Back</Text>
				</Pressable>
			</Link>
		</View>
	);
}
