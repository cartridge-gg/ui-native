import type React from "react";
import {
	StyleSheet,
	TouchableOpacity,
	View,
	type ViewStyle,
} from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { Text } from "../typography/Text";

// Header variant types
type HeaderVariant = "expanded" | "compressed" | "hidden";

// Main LayoutHeader Props
interface LayoutHeaderProps {
	title?: string | React.ReactElement;
	description?: string | React.ReactElement;
	variant?: HeaderVariant;
	icon?: React.ReactElement;
	right?: React.ReactElement;
	onBack?: () => void;
	onClose?: () => void;
	onSettings?: () => void;
	hideSettings?: boolean;
	className?: string;
	style?: ViewStyle;
}

export const LayoutHeader: React.FC<LayoutHeaderProps> = ({
	title,
	description,
	variant = "compressed",
	icon,
	right,
	onBack,
	onClose,
	onSettings,
	hideSettings = false,
	style,
}) => {
	const { colors } = useTheme();

	if (variant === "hidden") return null;

	const styles = StyleSheet.create({
		container: {
			backgroundColor: colors.background[100],
			borderBottomWidth: 1,
			borderBottomColor: colors.border[200],
		},
		expandedContainer: {
			height: 176,
			flexDirection: "column",
		},
		compressedContainer: {
			flexDirection: "column",
		},
		backgroundCover: {
			width: "100%",
			height: variant === "expanded" ? 136 : 64,
			backgroundColor: colors.background[300], // Placeholder for cover image
		},
		headerContent: {
			padding: 24,
			paddingBottom: variant === "expanded" ? 0 : 24,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
		leftContent: {
			flexDirection: "row",
			alignItems: "center",
			flex: 1,
			minWidth: 0,
			gap: 12,
		},
		iconWrapper: {
			flexShrink: 0,
			borderRadius: 8,
			backgroundColor: colors.background[200],
			justifyContent: "center",
			alignItems: "center",
		},
		expandedIconWrapper: {
			width: 80,
			height: 80,
			backgroundColor: colors.background[100],
			padding: 4,
		},
		compressedIconWrapper: {
			width: 40,
			height: 40,
		},
		textContent: {
			flex: 1,
			gap: variant === "expanded" ? 6 : 2,
		},
		title: {
			color: colors.foreground[100],
		},
		description: {
			color: colors.foreground[300],
		},
		actionBar: {
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			height: 64,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingHorizontal: 8,
			zIndex: 50,
		},
		actionButton: {
			width: 40,
			height: 40,
			borderRadius: 20,
			backgroundColor: colors.background[200],
			justifyContent: "center",
			alignItems: "center",
		},
		rightActions: {
			flexDirection: "row",
			gap: 8,
		},
	});

	const IconWrapper = ({ children }: { children: React.ReactNode }) => (
		<View
			style={[
				styles.iconWrapper,
				variant === "expanded"
					? styles.expandedIconWrapper
					: styles.compressedIconWrapper,
			]}
		>
			{variant === "expanded" && (
				<View style={[styles.iconWrapper, { width: "100%", height: "100%" }]}>
					{children}
				</View>
			)}
			{variant !== "expanded" && children}
		</View>
	);

	return (
		<View
			style={[
				styles.container,
				variant === "expanded"
					? styles.expandedContainer
					: styles.compressedContainer,
				style,
			]}
		>
			{/* Background cover */}
			<View style={styles.backgroundCover} />

			{/* Header content */}
			<View
				style={[
					styles.headerContent,
					variant === "expanded" && {
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
					},
				]}
			>
				<View style={styles.leftContent}>
					<IconWrapper>
						{icon || (
							<View
								style={{
									width: variant === "expanded" ? 32 : 24,
									height: variant === "expanded" ? 32 : 24,
									backgroundColor: colors.background[300],
									borderRadius: 4,
								}}
							/>
						)}
					</IconWrapper>

					<View style={styles.textContent}>
						{title && (
							<Text
								variant={
									variant === "expanded"
										? "sans-semibold-18"
										: "sans-semibold-14"
								}
								style={styles.title}
								numberOfLines={1}
							>
								{title}
							</Text>
						)}
						{description && (
							<Text variant="caption" style={styles.description}>
								{description}
							</Text>
						)}
					</View>
				</View>

				{right}
			</View>

			{/* Action bar with back/close/settings buttons */}
			<View style={styles.actionBar}>
				<View>
					{onBack ? (
						<TouchableOpacity style={styles.actionButton} onPress={onBack}>
							<Text style={{ color: colors.foreground[100] }}>←</Text>
						</TouchableOpacity>
					) : onClose ? (
						<TouchableOpacity style={styles.actionButton} onPress={onClose}>
							<Text style={{ color: colors.foreground[100] }}>×</Text>
						</TouchableOpacity>
					) : null}
				</View>

				<View style={styles.rightActions}>
					{onSettings && !hideSettings && (
						<TouchableOpacity style={styles.actionButton} onPress={onSettings}>
							<Text style={{ color: colors.foreground[100] }}>⚙</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</View>
	);
};
