import type React from "react";
import { Pressable, View } from "react-native";
import { Text } from "../../../typography/Text";
import { cn } from "../../../utils/cn";

export type ActivityCardVariant = "default";

export interface ActivityCardProps {
	Logo: React.ReactNode;
	title: string;
	subTitle: string | React.ReactNode;
	topic?: string;
	subTopic?: string | React.ReactNode;
	error?: boolean;
	loading?: boolean;
	variant?: ActivityCardVariant;
	onPress?: () => void;
	className?: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
	Logo,
	title,
	subTitle,
	topic,
	subTopic,
	error = false,
	loading = false,
	variant = "default",
	onPress,
	className,
}) => {
	const getTextColorClass = () => {
		if (error) return "text-theme-destructive";
		if (loading) return "text-theme-foreground-muted";
		return "text-theme-foreground";
	};

	const getSubTextColorClass = () => {
		if (error) return "text-theme-destructive";
		return "text-theme-foreground-muted";
	};

	const content = (
		<View
			className={cn(
				"rounded-md p-3 pr-4 flex-row items-center justify-between gap-4 bg-theme-background-subtle",
				className,
			)}
		>
			{Logo}
			<View className="flex-col gap-0.5 items-stretch flex-grow overflow-hidden">
				<View className="flex-row items-center gap-6 justify-between">
					<Text
						className={cn(
							"text-sm font-medium capitalize",
							getTextColorClass(),
						)}
					>
						{title}
					</Text>
					{topic && (
						<Text
							className={cn("text-sm font-medium", getTextColorClass())}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{topic}
						</Text>
					)}
				</View>
				<View className="flex-row items-center gap-1 justify-between">
					{typeof subTitle === "string" ? (
						<Text className={cn("text-xs", getSubTextColorClass())}>
							{subTitle}
						</Text>
					) : (
						subTitle
					)}
					{subTopic &&
						(typeof subTopic === "string" ? (
							<Text className={cn("text-xs", getSubTextColorClass())}>
								{subTopic}
							</Text>
						) : (
							subTopic
						))}
				</View>
			</View>
		</View>
	);

	if (onPress) {
		return (
			<Pressable
				className="rounded-md"
				onPress={onPress}
				android_ripple={{ color: "#e5e7eb" }} // gray-200
			>
				{({ pressed }) => (
					<View className={cn(pressed && "opacity-80")}>{content}</View>
				)}
			</Pressable>
		);
	}

	return content;
};
