import { Image } from "expo-image";
import { Link } from "expo-router";
import { useMemo } from "react";
import { Pressable, View } from "react-native";
import {
	StackDiamondIcon,
	StarknetColorIcon,
	TagIcon,
	Text,
} from "#components";

export interface ItemCardProps {
	href: string;
	title: string;
	imageUri: string | undefined;
	price?: string | null;
	lastSale?: string | null;
	totalCount?: number;
	listingCount?: number;
}

export function ItemCard({
	href,
	title,
	imageUri,
	price,
	lastSale,
	totalCount,
	listingCount,
}: ItemCardProps) {
	const imageSource = useMemo(
		() =>
			imageUri?.startsWith("ipfs://")
				? imageUri.replace("ipfs://", "https://ipfs.io/ipfs/")
				: imageUri,
		[imageUri],
	);

	return (
		<Link href={href} asChild>
			<Pressable className="flex-1 relative rounded overflow-hidden border-2 border-transparent">
				<View className="h-9 relative flex-row gap-2 px-1.5 py-1.5 justify-between items-center bg-background-200">
					<View className="flex-row items-center gap-1.5 overflow-hidden flex-1">
						<Text
							className="text-sm font-medium text-foreground-100 flex-1 pl-2.5"
							numberOfLines={1}
						>
							{title}
						</Text>
					</View>
				</View>

				<View className="relative overflow-hidden h-[128px]">
					<View className="absolute inset-0 opacity-75 z-0">
						<Image
							className="size-full"
							source={imageSource}
							style={{ transform: [{ scale: 3 }] }}
							blurRadius={8}
							contentFit="cover"
							placeholder={require("#assets/placeholder.png")}
						/>
						<View className="absolute inset-0 bg-black/64" />
					</View>

					<View className="absolute inset-0 h-full py-2 items-center justify-center z-10">
						<Image
							className="size-full"
							source={imageSource}
							contentFit="contain"
							placeholder={require("#assets/placeholder.png")}
						/>
					</View>

					<View className="absolute bottom-1.5 left-1.5 flex-row gap-1 items-center flex-wrap z-20">
						{!!totalCount && (
							<View className="relative px-1 py-0.5 rounded-sm h-6 flex-row justify-center items-center bg-[#1E221FA3]">
								<StackDiamondIcon variant="solid" size="sm" />
								<Text className="text-sm font-semibold text-foreground-100 px-0.5">
									{totalCount.toLocaleString()}
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
							<View className="flex-row items-center gap-1">
								<StarknetColorIcon />
								<Text
									className={
										price
											? "text-sm font-medium text-foreground-100"
											: "text-sm font-medium text-foreground-400"
									}
								>
									{price || "--"}
								</Text>
							</View>
							<Text className="text-sm font-medium text-foreground-400">
								{lastSale || "--"}
							</Text>
						</View>
					</View>
				)}
			</Pressable>
		</Link>
	);
}
