import type React from "react";
import { useMemo } from "react";
import { ScrollView, StyleSheet, View, type ViewStyle } from "react-native";
import { Spinner } from "../primitives/spinner/Spinner";
import { useTheme } from "../theme/ThemeProvider";
import { Text } from "../typography/Text";
import { useLayoutContext } from "./context";

// Main LayoutContent Component
interface LayoutContentProps {
	children: React.ReactNode;
	className?: string;
	style?: ViewStyle;
}

export const LayoutContent: React.FC<LayoutContentProps> = ({
	children,
	className,
	style,
}) => {
	const { colors } = useTheme();
	const { withBottomTabs, withFooter } = useLayoutContext();

	// Error handling for conflicting layout states
	if (withBottomTabs && withFooter) {
		throw new Error("BottomTabs and Footer cannot be used at the same time");
	}

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			width: "100%",
			padding: 24, // p-6 equivalent
		},
		scrollContent: {
			flexGrow: 1,
			gap: 12, // gap-3 equivalent
		},
	});

	// Calculate bottom margin compensation for tabs/footer
	const bottomMargin = useMemo(() => {
		if (withBottomTabs) return 72; // Height of bottom tabs
		if (withFooter) return 200; // Approximate footer height
		return 0;
	}, [withBottomTabs, withFooter]);

	return (
		<ScrollView
			style={[styles.container, style]}
			contentContainerStyle={[
				styles.scrollContent,
				{ paddingBottom: bottomMargin },
			]}
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
		>
			{children}
		</ScrollView>
	);
};

// LayoutContent Loader Component
export const LayoutContentLoader: React.FC = () => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			padding: 16,
		},
		loaderBox: {
			width: "100%",
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			borderWidth: 1,
			borderColor: colors.background[400],
			borderStyle: "dashed",
			borderRadius: 6,
			marginBottom: 16,
		},
	});

	return (
		<LayoutContent style={styles.container}>
			<View style={styles.loaderBox}>
				<Spinner size="lg" color={colors.foreground[400]} />
			</View>
		</LayoutContent>
	);
};

// LayoutContent Error Component
interface LayoutContentErrorProps {
	children?: React.ReactNode;
}

export const LayoutContentError: React.FC<LayoutContentErrorProps> = ({
	children = "Oops! Something went wrong.",
}) => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			gap: 32,
			padding: 32,
		},
		errorText: {
			color: colors.foreground[100],
			textAlign: "center",
		},
		errorImage: {
			width: 120,
			height: 120,
			backgroundColor: colors.background[300],
			borderRadius: 8,
			justifyContent: "center",
			alignItems: "center",
		},
		errorImageText: {
			color: colors.foreground[400],
		},
	});

	return (
		<LayoutContent style={styles.container}>
			<Text variant="sans-semibold-14" style={styles.errorText}>
				{children}
			</Text>
			<View style={styles.errorImage}>
				<Text variant="caption" style={styles.errorImageText}>
					Error
				</Text>
			</View>
		</LayoutContent>
	);
};
