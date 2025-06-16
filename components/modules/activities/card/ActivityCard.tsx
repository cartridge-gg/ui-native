import type React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import { Text } from "../../../typography/Text";

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
	style?: any;
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
	style,
}) => {
	const { colors } = useTheme();

	const getTextColor = () => {
		if (error) return colors.destructive[100];
		if (loading) return colors.foreground[300];
		return colors.foreground[100];
	};

	const styles = StyleSheet.create({
		container: {
			borderRadius: 6, // rounded = 6px (web default)
			padding: 12, // p-3 = 12px
			paddingRight: 16, // pr-4 = 16px
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			gap: 16, // gap-4 = 16px
			backgroundColor: colors.background[200],
		},
		pressable: {
			borderRadius: 6, // rounded = 6px
		},
		content: {
			flexDirection: "column",
			gap: 2, // gap-0.5 = 2px
			alignItems: "stretch",
			flexGrow: 1,
			overflow: "hidden",
		},
		topRow: {
			flexDirection: "row",
			alignItems: "center",
			gap: 24, // gap-6 = 24px
			justifyContent: "space-between",
		},
		title: {
			fontSize: 14, // text-sm = 14px
			fontWeight: "500", // font-medium
			color: getTextColor(),
			textTransform: "capitalize",
		},
		topic: {
			fontSize: 14, // text-sm = 14px
			fontWeight: "500", // font-medium
			color: getTextColor(),
		},
		bottomRow: {
			flexDirection: "row",
			alignItems: "center",
			gap: 4, // gap-1 = 4px
			justifyContent: "space-between",
		},
		subTitle: {
			fontSize: 12, // text-xs = 12px
			color: error ? colors.destructive[100] : colors.foreground[300],
		},
		subTopic: {
			fontSize: 12, // text-xs = 12px
			color: error ? colors.destructive[100] : colors.foreground[300],
		},
	});

	const content = (
		<View style={[styles.container, style]}>
			{Logo}
			<View style={styles.content}>
				<View style={styles.topRow}>
					<Text style={styles.title}>{title}</Text>
					{topic && (
						<Text style={styles.topic} numberOfLines={1} ellipsizeMode="tail">
							{topic}
						</Text>
					)}
				</View>
				<View style={styles.bottomRow}>
					{typeof subTitle === "string" ? (
						<Text style={styles.subTitle}>{subTitle}</Text>
					) : (
						subTitle
					)}
					{subTopic &&
						(typeof subTopic === "string" ? (
							<Text style={styles.subTopic}>{subTopic}</Text>
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
				style={styles.pressable}
				onPress={onPress}
				android_ripple={{ color: colors.background[300] }}
			>
				{({ pressed }) => (
					<View style={{ opacity: pressed ? 0.8 : 1 }}>{content}</View>
				)}
			</Pressable>
		);
	}

	return content;
};
