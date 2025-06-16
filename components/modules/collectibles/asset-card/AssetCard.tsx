import type React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import { Text } from "../../../typography/Text";

export interface CollectibleAssetCardProps {
	image: string;
	title: string;
	description: string;
	variant?: "default";
	onPress?: () => void;
	style?: any;
}

export const CollectibleAssetCard: React.FC<CollectibleAssetCardProps> = ({
	image,
	title,
	description,
	variant = "default",
	onPress,
	style,
}) => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		container: {
			width: "100%",
			paddingHorizontal: 16,
			paddingVertical: 12,
			flexDirection: "row",
			gap: 12,
			backgroundColor: colors.background[200],
		},
		thumbnail: {
			width: 48,
			height: 48,
			borderRadius: 8,
			backgroundColor: colors.background[300],
		},
		content: {
			flex: 1,
			flexDirection: "column",
			gap: 2,
			justifyContent: "space-between",
		},
		title: {
			fontSize: 14,
			fontWeight: "500",
			color: colors.foreground[100],
		},
		description: {
			fontSize: 12,
			color: colors.foreground[300],
		},
	});

	const content = (
		<View style={[styles.container, style]}>
			<Image
				source={{ uri: image }}
				style={styles.thumbnail}
				resizeMode="cover"
			/>
			<View style={styles.content}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
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
