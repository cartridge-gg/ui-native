import { Image } from "expo-image";
import { Link } from "expo-router";
import { useMemo } from "react";
import { Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
	StackDiamondIcon,
	StarknetColorIcon,
	TagIcon,
	Text,
} from "#components";
import { sanitizeImageUri } from "#utils";

export interface ItemCardProps {
	href: string;
	title: string;
	imageUri: string | undefined;
	price?: string | null;
	lastSale?: string | null;
	totalCount?: number;
	listingCount?: number;
	variant?: "collection" | "nft";
}

export function ItemCard({
	href,
	title,
	imageUri,
	price,
	lastSale,
	totalCount,
	listingCount,
	variant = "nft",
}: ItemCardProps) {
	const imageSource = useMemo(() => {
		return sanitizeImageUri(imageUri, `ItemCard: ${title}`);
	}, [imageUri, title]);

	// Collection variant - simpler design with just image and name
	if (variant === "collection") {
		return (
			<Link href={href} asChild>
				<Pressable className="flex-1 relative rounded-lg overflow-hidden">
					<View className="relative overflow-hidden h-48">
						{/* Blurred background layer */}
						<View className="absolute inset-0 z-0">
							<Image
								className="size-full"
								source={imageSource}
								style={{ transform: [{ scale: 1.5 }] }}
								blurRadius={30}
								contentFit="cover"
								placeholder={require("#assets/placeholder.png")}
								cachePolicy="memory-disk"
								transition={150}
							/>
							<View className="absolute inset-0 bg-black/40" />
						</View>
						
						{/* Main sharp image */}
						<View className="absolute inset-0 z-10 p-2 items-center justify-center">
							<Image
								className="size-full"
								source={imageSource}
								contentFit="contain"
								placeholder={require("#assets/placeholder.png")}
								cachePolicy="memory-disk"
								transition={150}
							/>
						</View>
						
						{/* Gradient overlay from dark at bottom to transparent */}
						<LinearGradient
							colors={["rgba(0, 0, 0, 0.95)", "rgba(0, 0, 0, 0.3)", "transparent"]}
							start={{ x: 0, y: 1 }}
							end={{ x: 0, y: 0 }}
							locations={[0, 0.5, 1]}
							className="absolute inset-0 z-20"
							pointerEvents="none"
						/>
						
						{/* Title at bottom */}
						<View className="absolute bottom-0 left-0 right-0 p-3 z-30">
							<Text
								className="text-base font-semibold"
								numberOfLines={1}
								style={{ 
									color: '#ffffff',
									textShadowColor: 'rgba(0, 0, 0, 0.8)', 
									textShadowOffset: { width: 0, height: 1 }, 
									textShadowRadius: 3 
								}}
							>
								{title}
							</Text>
						</View>
					</View>
				</Pressable>
			</Link>
		);
	}

	// NFT variant - modern design matching collections
	return (
		<Link href={href} asChild>
			<Pressable className="flex-1 relative rounded-lg overflow-hidden">
				<View className="relative overflow-hidden h-48">
					{/* Blurred background layer */}
					<View className="absolute inset-0 z-0">
						<Image
							className="size-full"
							source={imageSource}
							style={{ transform: [{ scale: 1.5 }] }}
							blurRadius={30}
							contentFit="cover"
							placeholder={require("#assets/placeholder.png")}
							cachePolicy="memory-disk"
							transition={150}
						/>
						<View className="absolute inset-0 bg-black/40" />
					</View>
					
					{/* Main sharp image */}
					<View className="absolute inset-0 z-10 p-3 items-center justify-center">
						<Image
							className="size-full"
							source={imageSource}
							contentFit="contain"
							placeholder={require("#assets/placeholder.png")}
							cachePolicy="memory-disk"
							transition={150}
						/>
					</View>
					
					{/* Gradient overlay from dark at bottom to transparent */}
					<LinearGradient
						colors={["rgba(0, 0, 0, 0.95)", "rgba(0, 0, 0, 0.3)", "transparent"]}
						start={{ x: 0, y: 1 }}
						end={{ x: 0, y: 0 }}
						locations={[0, 0.5, 1]}
						className="absolute inset-0 z-20"
						pointerEvents="none"
					/>
					
					{/* Stats badges */}
					<View className="absolute top-2 right-2 flex-row gap-1 items-center z-30">
						{!!totalCount && (
							<View className="px-1.5 py-0.5 rounded-sm flex-row items-center bg-black/60">
								<StackDiamondIcon variant="solid" size="xs" />
								<Text className="text-xs font-semibold text-foreground-100 ml-0.5">
									{totalCount.toLocaleString()}
								</Text>
							</View>
						)}
						{!!listingCount && (
							<View className="px-1.5 py-0.5 rounded-sm flex-row items-center bg-black/60">
								<TagIcon variant="solid" size="xs" />
								<Text className="text-xs font-semibold text-foreground-100 ml-0.5">
									{listingCount}
								</Text>
							</View>
						)}
					</View>
					
					{/* Title and price at bottom */}
					<View className="absolute bottom-0 left-0 right-0 p-3 z-30">
						<Text
							className="text-base font-semibold mb-1"
							numberOfLines={1}
							style={{ 
								color: '#ffffff',
								textShadowColor: 'rgba(0, 0, 0, 0.8)', 
								textShadowOffset: { width: 0, height: 1 }, 
								textShadowRadius: 3 
							}}
						>
							{title}
						</Text>
						{(price || lastSale) && (
							<View className="flex-row items-center justify-between">
								<View className="flex-row items-center gap-1">
									<StarknetColorIcon size="xs" />
									<Text
										className="text-sm font-medium"
										style={{ color: price ? '#ffffff' : '#a8a29e' }}
									>
										{price || "--"}
									</Text>
								</View>
								{lastSale && (
									<Text className="text-xs text-foreground-400">
										Last: {lastSale}
									</Text>
								)}
							</View>
						)}
					</View>
				</View>
			</Pressable>
		</Link>
	);
}
