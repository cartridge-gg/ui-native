import React from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import { Text } from "../../../typography/Text";

export interface AchievementCounterProps {
	count: number;
	total: number;
	active?: boolean;
	style?: ViewStyle;
	className?: string;
}

export const AchievementCounter = ({
	count,
	total,
	active = false,
	style,
	className,
}: AchievementCounterProps) => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			gap: 6, // gap-1.5 = 6px
			paddingHorizontal: 8, // px-2 = 8px
			paddingVertical: 4, // py-1 = 4px
			borderRadius: 9999, // rounded-full
			backgroundColor: active ? colors.background[300] : colors.background[200],
		},
		text: {
			fontSize: 12, // text-xs
			fontWeight: "600", // font-semibold
			letterSpacing: 0.5, // tracking-wider
			color: active ? colors.foreground[100] : colors.foreground[300],
		},
	});

	return (
		<View style={[styles.container, style]}>
			<Text style={styles.text}>{`${count}/${total}`}</Text>
		</View>
	);
};

export default AchievementCounter;
