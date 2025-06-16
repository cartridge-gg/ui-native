import React from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { CalendarIcon } from "../../../icons/state/CalendarIcon";
import { SparklesIcon } from "../../../icons/state/SparklesIcon";
import { Separator } from "../../../primitives/separator/Separator";
import { useTheme } from "../../../theme/ThemeProvider";
import { Text } from "../../../typography/Text";

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
	style?: ViewStyle;
}

export function AchievementPoints({
	points,
	timestamp,
	style,
}: AchievementPointsProps) {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "center",
			gap: 8, // gap-2 = 8px
		},
		pointsContainer: {
			flexDirection: "row",
			alignItems: "center",
			gap: 4, // gap-1 = 4px
		},
		pointsText: {
			fontSize: 12, // text-xs
			color: timestamp ? colors.foreground[400] : colors.foreground[300],
			textDecorationLine: timestamp ? "line-through" : "none",
		},
		separator: {
			backgroundColor: colors.background[400],
			height: 8, // h-2 = 8px
			marginLeft: 2, // ml-0.5 = 2px
		},
		timestampContainer: {
			flexDirection: "row",
			alignItems: "center",
			gap: 4, // gap-1 = 4px
		},
		timestampText: {
			fontSize: 12, // text-xs
			color: colors.foreground[400],
		},
	});

	return (
		<View style={[styles.container, style]}>
			<View style={styles.pointsContainer}>
				<SparklesIcon size="xs" variant={timestamp ? "line" : "solid"} />
				<Text style={styles.pointsText}>{points.toLocaleString()}</Text>
			</View>

			{timestamp && (
				<Separator style={styles.separator} orientation="vertical" />
			)}

			{timestamp && <Timestamp timestamp={timestamp} />}
		</View>
	);
}

function Timestamp({ timestamp }: { timestamp: number }) {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "center",
			gap: 4, // gap-1 = 4px
		},
		text: {
			fontSize: 12, // text-xs
			color: colors.foreground[400],
		},
	});

	return (
		<View style={styles.container}>
			<CalendarIcon size="xs" variant="line" />
			<Text style={styles.text}>{getDate(timestamp * 1000)}</Text>
		</View>
	);
}

export default AchievementPoints;
