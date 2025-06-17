import React from "react";
import { View } from "react-native";
import { Text } from "../../../typography/Text";
import { cn } from "../../../utils/cn";

export interface AchievementCounterProps {
	count: number;
	total: number;
	active?: boolean;
	className?: string;
}

export const AchievementCounter = ({
	count,
	total,
	active = false,
	className,
}: AchievementCounterProps) => {
	return (
		<View
			className={cn(
				"flex-row items-center justify-center gap-1.5 px-2 py-1 rounded-full",
				active ? "bg-theme-border" : "bg-theme-background-subtle",
				className,
			)}
		>
			<Text
				className={cn(
					"text-xs font-semibold tracking-wider",
					active ? "text-theme-foreground" : "text-theme-foreground-muted",
				)}
			>
				{`${count}/${total}`}
			</Text>
		</View>
	);
};

export default AchievementCounter;
