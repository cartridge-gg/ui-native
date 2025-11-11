import { Image } from "expo-image";
import { memo, useState } from "react";
import { View } from "react-native";
import { Text } from "#components";

interface GameIconProps {
	icon?: string;
	title: string;
	size?: "sm" | "md" | "lg";
	variant?: "default" | "primary";
}

/**
 * Optimized game icon with progressive loading and fallback
 */
export const GameIcon = memo(function GameIcon({ 
	icon, 
	title, 
	size = "md",
	variant = "default" 
}: GameIconProps) {
	const [hasError, setHasError] = useState(false);
	
	// Size mappings
	const sizeClass = size === "sm" ? "size-6" : size === "lg" ? "size-10" : "size-8";
	const textSize = size === "sm" ? "text-xs" : size === "lg" ? "text-lg" : "text-sm";
	
	// Variant colors
	const bgClass = variant === "primary" ? "bg-primary-100" : "bg-background-200";
	const textClass = variant === "primary" ? "text-primary-foreground-100" : "text-foreground-100";
	
	// Show text fallback if no icon or error
	if (!icon || hasError) {
		return (
			<View className={`${sizeClass} ${bgClass} rounded items-center justify-center`}>
				<Text className={`${textClass} font-bold ${textSize}`}>
					{title[0].toUpperCase()}
				</Text>
			</View>
		);
	}
	
	return (
		<View className={`${sizeClass} rounded overflow-hidden bg-background-200`}>
			<Image
				source={{ uri: icon }}
				style={{ width: "100%", height: "100%" }}
				contentFit="cover"
				transition={200}
				priority="normal"
				cachePolicy="memory-disk"
				recyclingKey={icon}
				onError={() => setHasError(true)}
				placeholder={undefined}
			/>
		</View>
	);
});

