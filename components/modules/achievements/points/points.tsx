import React from "react";
import { View } from "react-native";
import { CalendarIcon } from "../../../icons/state/CalendarIcon";
import { SparklesIcon } from "../../../icons/state/SparklesIcon";
import { Separator } from "../../../primitives/separator/Separator";
import { Text } from "../../../typography/Text";
import { cn } from "../../../utils/cn";

// Simple date utility for React Native
const getDate = (timestamp: number) => {
	const date = new Date(timestamp);
	const today = new Date();
	if (date.toDateString() === today.toDateString()) {
		return "Today";
	}
	if (
		date.toDateString() ===
		new Date(today.getTime() - 24 * 60 * 60 * 1000).toDateString()
	) {
		return "Yesterday";
	}
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

interface AchievementPointsProps {
	points: number;
	timestamp?: number;
	className?: string;
}

export function AchievementPoints({
	points,
	timestamp,
	className,
}: AchievementPointsProps) {
	return (
		<View className={cn("flex-row items-center gap-2", className)}>
			<View className="flex-row items-center gap-1">
				<SparklesIcon size="xs" variant={timestamp ? "line" : "solid"} />
				<Text
					className={cn(
						"text-xs",
						timestamp
							? "text-theme-foreground-muted line-through"
							: "text-theme-foreground-muted",
					)}
				>
					{points.toLocaleString()}
				</Text>
			</View>

			{timestamp && (
				<Separator
					className="bg-theme-background-muted h-2 ml-0.5"
					orientation="vertical"
				/>
			)}

			{timestamp && <Timestamp timestamp={timestamp} />}
		</View>
	);
}

function Timestamp({ timestamp }: { timestamp: number }) {
	return (
		<View className="flex-row items-center gap-1">
			<CalendarIcon size="xs" variant="line" />
			<Text className="text-xs text-theme-foreground-muted">
				{getDate(timestamp * 1000)}
			</Text>
		</View>
	);
}

export default AchievementPoints;
