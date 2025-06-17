import React from "react";
import { TouchableOpacity, View, type ViewProps } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

export interface BottomTabProps extends ViewProps {
	variant?: "default";
	size?: "default";
	status?: "active";
	onPress?: () => void;
	children: React.ReactNode;
}

export const BottomTab: React.FC<BottomTabProps> = ({
	variant = "default",
	size = "default",
	status,
	style,
	onPress,
	children,
	...props
}) => {
	const { colors } = useTheme();

	const containerStyles = {
		flex: 1,
		flexDirection: "column" as const,
		alignItems: "center" as const,
		height: size === "default" ? 64 : 64, // h-16 = 64px
	};

	const iconColor =
		status === "active" ? colors.primary[100] : colors.foreground[300];

	const indicatorStyles = {
		backgroundColor: colors.primary[100],
		height: 2,
		alignSelf: "stretch" as const,
		borderRadius: 1,
		opacity: status === "active" ? 1 : 0,
	};

	const contentContainerStyles = {
		flex: 1,
		alignItems: "center" as const,
		justifyContent: "center" as const,
	};

	const content = (
		<View style={[containerStyles, style]} {...props}>
			<View style={indicatorStyles} />
			<View style={contentContainerStyles}>
				{React.isValidElement(children) &&
					React.cloneElement(children as React.ReactElement<any>, {
						color: iconColor,
					})}
			</View>
		</View>
	);

	if (onPress) {
		return (
			<TouchableOpacity
				className="flex-1"
				onPress={onPress}
				activeOpacity={0.7}
			>
				{content}
			</TouchableOpacity>
		);
	}

	return content;
};
