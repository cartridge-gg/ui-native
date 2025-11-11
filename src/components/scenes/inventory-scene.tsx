import React, { useMemo, type ComponentType } from "react";
import { Image, Pressable, ScrollView, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAccount, useConnect } from "@starknet-react/core";
import type { Token } from "#clone/arcade";
import { useTokens } from "#clone/arcade";
import { ItemCard, ItemGrid, Skeleton, Text, CreditIcon, ScarecrowIcon, Button, ConnectIcon, EyeIcon } from "#components";
import { StarknetColorIcon } from "#components/icons/brand-color/starknet";
import { EthereumColorIcon } from "#components/icons/brand-color/ethereum";
import { USDCIcon } from "#components/icons/brand-color/usdc";
import { useTokenBalances } from "../../../../../hooks/useTokenBalances";
import { useActivities, type ParsedActivity } from "../../../../../hooks/useActivities";

const { height: screenHeight } = Dimensions.get('window');

export function InventoryScene() {
	const { tokens, credits, status: tokensStatus } = useTokens();
	const { address, status } = useAccount();
	const { connect, connectors } = useConnect();
	const { tokenBalances, loading: nftsLoading } = useTokenBalances(address);
	const { activities, loading: activitiesLoading } = useActivities(address, 20);

	// Filter NFTs (those with tokenId)
	const nfts = useMemo(() => {
		return tokenBalances.filter(balance => balance.isNFT);
	}, [tokenBalances]);

	const nftsStatus = nftsLoading ? "loading" : "success";
	const activitiesStatus = activitiesLoading ? "loading" : "success";
	
	// Show not connected state
	if (status !== "connected") {
		return (
			<View className="flex-1 items-center justify-center" style={{ minHeight: screenHeight * 0.7 }}>
				<ConnectIcon size="xl" variant="line" color="#71717a" className="mb-4" />
				<Text className="text-foreground-200 text-center text-lg font-medium mb-2">
					Controller not connected
				</Text>
				<Text className="text-foreground-400 text-center text-sm mb-6">
					Connect your controller to view your inventory
				</Text>
				<Button
					variant="outline"
					onPress={() => {
						const connector = connectors?.[0];
						if (connector) {
							connect({ connector });
						}
					}}
					disabled={!connectors?.[0]}
				>
					<Text className="text-sm font-semibold">CONNECT</Text>
				</Button>
			</View>
		);
	}
	
	return (
		<ScrollView className="flex-1">
			<View style={{ padding: 16, gap: 16 }}>
				{/* Always show tokens section (credits always visible) */}
				<TokensSection
					tokens={tokens}
					credits={credits}
					status={tokensStatus}
				/>
				{/* Always show NFTs section */}
				<NFTsSection
					nfts={nfts}
					status={nftsStatus}
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

// Token icon mapping with colored brand icons
const getTokenIcon = (symbol: string): { Icon: ComponentType<any>, isColored: boolean } | null => {
	const symbolUpper = symbol?.toUpperCase() || '';
	switch (symbolUpper) {
		case 'CREDITS':
			return { Icon: CreditIcon, isColored: true };
		case 'ETH':
		case 'ETHER':
			return { Icon: EthereumColorIcon, isColored: true };
		case 'STRK':
			return { Icon: StarknetColorIcon, isColored: true };
		case 'USDC':
			return { Icon: USDCIcon, isColored: true };
		case 'USDT':
			// For now using first letter, can add USDT icon later
			return null;
		default:
			return null;
	}
};

function TokensSection({ tokens, credits, status }: TokensSectionProps) {
	const [showAllTokens, setShowAllTokens] = React.useState(false);
	
	if (status === "loading") {
		return (
			<View>
				<View className="flex flex-col gap-2">
					{Array.from({ length: 4 }, (_, i) => `token-skeleton-${i}`).map(
						(key) => (
							<View key={key} className="h-16 bg-background-200" />
						),
					)}
				</View>
			</View>
		);
	}

	const filteredTokens = tokens.filter((token) => token.balance.amount > 0);
	const displayTokens = showAllTokens ? filteredTokens : filteredTokens.slice(0, 3);
	const hasMoreTokens = filteredTokens.length > 3;

	return (
		<View className="rounded-md overflow-hidden">
			<View className="flex flex-col gap-[1.2px]">
				{/* Credits card - always show */}
				<TokenCard key="credits" token={credits} />

				{/* Other tokens */}
				{displayTokens.map((token, index) => (
					<TokenCard key={`${token.metadata.symbol}-${index}`} token={token} />
				))}
				
				{/* View All Button - styled like a token row */}
				{hasMoreTokens && !showAllTokens && (
					<Pressable
						onPress={() => setShowAllTokens(true)}
						className="bg-background-200 p-4 flex-row items-center justify-center gap-1 active:opacity-70"
					>
						<EyeIcon color="#71717a" variant="line" size="default"/>
						<Text className="text-foreground-400 font-medium text-base">
							View All
						</Text>
					</Pressable>
				)}
			</View>
		</View>
	);
}

function TokenCard({ token }: { token: Token }) {
	const iconInfo = getTokenIcon(token.metadata.symbol);
	
	// Calculate percentage change
	const oldValue = token.balance.value - token.balance.change;
	const percentageChange = oldValue !== 0 ? (token.balance.change / oldValue) * 100 : 0;
	const isPositive = percentageChange >= 0;
	const showPercentage = !isNaN(percentageChange) && isFinite(percentageChange) && percentageChange !== 0;

	return (
		<View className="relative overflow-hidden bg-background-200">
			{/* Subtle gradient overlay */}
			{showPercentage && (
				<LinearGradient
					colors={
						isPositive 
							? ['rgba(16, 185, 129, 0.05)', 'transparent']
							: ['rgba(239, 68, 68, 0.05)', 'transparent']
					}
					start={{ x: 1, y: 0 }}
					end={{ x: 0, y: 0 }}
					className="absolute inset-0"
					pointerEvents="none"
				/>
			)}
			
			{/* Content */}
			<View className="flex-row items-center gap-3 p-4">
				{/* Token Icon */}
				{iconInfo ? (
					<iconInfo.Icon size="lg" />
				) : token.metadata.image ? (
					<Image
						source={{ uri: token.metadata.image }}
						className="size-10 rounded-full"
					/>
				) : (
					<View className="size-10 bg-background-300 rounded-full items-center justify-center">
						<Text className="text-foreground-100 font-bold text-sm">
							{token.metadata.symbol[0]?.toUpperCase() || '?'}
						</Text>
					</View>
				)}
				<View className="flex-1">
					<Text className="text-foreground-100 font-medium text-base">{token.metadata.name}</Text>
					<Text className="text-foreground-400 text-sm">
						{token.balance.amount.toLocaleString(undefined, {
							maximumFractionDigits: 5,
						})}{" "}
						{token.metadata.symbol}
					</Text>
				</View>
				<View className="items-end">
					{token.balance.value > 0 && (
						<Text className="text-foreground-100 font-semibold text-base">
							${token.balance.value.toLocaleString(undefined, {
								maximumFractionDigits: 2,
							})}
						</Text>
					)}
					{showPercentage && (
						<Text className="text-xs" style={{ color: isPositive ? '#10b981' : '#ef4444' }}>
							{isPositive ? '+' : ''}{percentageChange.toFixed(1)}%
						</Text>
					)}
				</View>
			</View>
		</View>
	);
}

interface NFTsSectionProps {
	nfts: Array<{ contractAddress: string; tokenId?: string; balance: string }>;
	status: string;
}

function NFTsSection({ nfts, status }: NFTsSectionProps) {

	if (status === "loading") {
		return (
			<View>
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

	if (nfts.length === 0) {
		return (
			<View style={{ minHeight: screenHeight * 0.4 }} className="items-center justify-center">
				<View style={{ width: 200, height: 200 }}>
					<ScarecrowIcon variant="line" style={{ width: 200, height: 200 }} />
				</View>
				<Text className="text-center text-md color-[#4a5a4d]">
					It's empty here..
				</Text>
			</View>
		);
	}

	return (
		<ItemGrid
			data={nfts}
			numColumns={2}
			gap={12}
			maintainColumnWidth={true}
			keyExtractor={(item) => item.contractAddress + (item.tokenId || "")}
			renderItem={(item) => (
				<ItemCard
					href={`/(drawer)/nft/${item.contractAddress}/${item.tokenId || ""}`}
					title={`NFT #${item.tokenId || "0"}`}
					imageUri={"https://via.placeholder.com/150"}
				/>
			)}
		/>
	);
}
