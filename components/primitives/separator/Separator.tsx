import { StyleSheet, View, type ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

export interface SeparatorProps {
	orientation?: "horizontal" | "vertical";
	decorative?: boolean;
	style?: ViewStyle;
}

export const Separator: React.FC<SeparatorProps> = ({
	orientation = "horizontal",
	decorative = true,
	style,
}) => {
	const { colors } = useTheme();

	const separatorStyles = StyleSheet.create({
		horizontal: {
			height: 1,
			width: "100%",
			backgroundColor: colors.background[300],
		},
		vertical: {
			width: 1,
			height: "100%",
			backgroundColor: colors.background[300],
		},
	});

	return (
		<View
			style={[
				orientation === "horizontal"
					? separatorStyles.horizontal
					: separatorStyles.vertical,
				style,
			]}
			accessible={!decorative}
		/>
	);
};
