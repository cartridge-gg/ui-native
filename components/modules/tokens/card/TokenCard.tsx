import type React from "react";
import { useMemo } from "react";
import { Image, Pressable, View } from "react-native";
import { Text } from "../../../typography/Text";
import { cn } from "../../../utils/cn";

export interface TokenCardProps {
	image: string;
	title: string;
	amount: string;
	value?: string;
	change?: string;
	variant?: "default";
	onPress?: () => void;
	className?: string;
}

export const TokenCard: React.FC<TokenCardProps> = ({
	image,
	title,
	amount,
	value,
	change,
	variant = "default",
	onPress,
	className,
}) => {
	const getBackgroundStyle = () => {
		if (change?.includes("+")) {
			return { backgroundColor: "#10b98108" }; // constructive with 3% opacity
		}
		if (change?.includes("-")) {
			return { backgroundColor: "#ef444408" }; // destructive with 3% opacity
		}
		return {};
	};

	const getChangeColorClass = () => {
		if (change?.includes("+")) {
			return "text-theme-constructive";
		}
		if (change?.includes("-")) {
			return "text-theme-destructive";
		}
		return "text-theme-foreground-muted";
	};

	const content = (
		<View
			className={cn(
				"flex-row items-center px-4 py-3 bg-theme-background-subtle gap-3",
				className,
			)}
			style={getBackgroundStyle()}
		>
			<Image
				source={{ uri: image }}
				className="w-10 h-10 rounded-full bg-theme-border"
				resizeMode="cover"
			/>
			<View className="flex-1 flex-col gap-0.5">
				<Text className="text-sm font-semibold text-theme-foreground">
					{title}
				</Text>
				<Text className="text-xs text-theme-foreground-muted">{amount}</Text>
			</View>
			<View className="items-end gap-0.5">
				{value && (
					<Text className="text-sm font-medium text-theme-foreground">
						{value}
					</Text>
				)}
				{change && (
					<Text className={cn("text-xs font-medium", getChangeColorClass())}>
						{change}
					</Text>
				)}
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
