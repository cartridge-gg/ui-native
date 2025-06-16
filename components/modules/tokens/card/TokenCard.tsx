import type React from "react";
import { useMemo } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import { Text } from "../../../typography/Text";

export interface TokenCardProps {
	image: string;
	title: string;
	amount: string;
	value?: string;
	change?: string;
	variant?: "default";
	onPress?: () => void;
	style?: any;
}

export const TokenCard: React.FC<TokenCardProps> = ({
	image,
	title,
	amount,
	value,
	change,
	variant = "default",
	onPress,
	style,
}) => {
	const { colors } = useTheme();

	const backgroundColor = useMemo(() => {
		if (change?.includes("+")) {
			return `${colors.constructive[100]}08`; // 3% opacity
		}
		if (change?.includes("-")) {
			return `${colors.destructive[100]}08`; // 3% opacity
		}
		return colors.background[200];
	}, [change, colors]);

	const changeColor = useMemo(() => {
		if (change?.includes("+")) {
			return colors.constructive[100];
		}
		if (change?.includes("-")) {
			return colors.destructive[100];
		}
		return colors.foreground[300];
	}, [change, colors]);

	const styles = StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "center",
			paddingHorizontal: 16,
			paddingVertical: 12,
			backgroundColor: colors.background[200],
			gap: 12,
		},
		thumbnail: {
			width: 40,
			height: 40,
			borderRadius: 20,
			backgroundColor: colors.background[300],
		},
		content: {
			flex: 1,
			flexDirection: "column",
			gap: 2,
		},
		rightContent: {
			alignItems: "flex-end",
			gap: 2,
		},
		title: {
			fontSize: 14,
			fontWeight: "600",
			color: colors.foreground[100],
		},
		amount: {
			fontSize: 12,
			color: colors.foreground[300],
		},
		value: {
			fontSize: 14,
			fontWeight: "500",
			color: colors.foreground[100],
		},
		change: {
			fontSize: 12,
			fontWeight: "500",
			color: changeColor,
		},
	});

	const content = (
		<View style={[styles.container, { backgroundColor }, style]}>
			<Image
				source={{ uri: image }}
				style={styles.thumbnail}
				resizeMode="cover"
			/>
			<View style={styles.content}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.amount}>{amount}</Text>
			</View>
			<View style={styles.rightContent}>
				{value && <Text style={styles.value}>{value}</Text>}
				{change && <Text style={styles.change}>{change}</Text>}
			</View>
		</View>
	);

	if (onPress) {
		return (
			<Pressable
				onPress={onPress}
				style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
			>
				{content}
			</Pressable>
		);
	}

	return content;
};
