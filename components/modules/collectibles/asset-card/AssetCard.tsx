import type React from "react";
import { Image, Pressable, View } from "react-native";
import { Text } from "../../../typography/Text";
import { cn } from "../../../utils/cn";

export interface CollectibleAssetCardProps {
	image: string;
	title: string;
	description: string;
	variant?: "default";
	onPress?: () => void;
	className?: string;
}

export const CollectibleAssetCard: React.FC<CollectibleAssetCardProps> = ({
	image,
	title,
	description,
	variant = "default",
	onPress,
	className,
}) => {
	const content = (
		<View
			className={cn(
				"w-full px-4 py-3 flex-row gap-3 bg-theme-background-subtle",
				className,
			)}
		>
			<Image
				source={{ uri: image }}
				className="w-12 h-12 rounded-lg bg-theme-border"
				resizeMode="cover"
			/>
			<View className="flex-1 flex-col gap-0.5 justify-between">
				<Text className="text-sm font-medium text-theme-foreground">
					{title}
				</Text>
				<Text className="text-xs text-theme-foreground-muted">
					{description}
				</Text>
			</View>
		</View>
	);

	if (onPress) {
		return (
			<Pressable onPress={onPress} className="active:opacity-80">
				{content}
			</Pressable>
		);
	}

	return content;
};
