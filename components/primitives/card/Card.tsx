import React from "react";
import { Image, StyleSheet, View, type ViewProps } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { Text } from "../../typography/Text";

// Base Card component
export interface CardProps extends ViewProps {
	children?: React.ReactNode;
}

export const Card = React.forwardRef<View, CardProps>(
	({ style, children, ...props }, ref) => {
		const { colors } = useTheme();

		return (
			<View
				ref={ref}
				style={[
					{
						flexDirection: "column",
						borderRadius: 8,
						overflow: "hidden",
						backgroundColor: colors.background[100],
						gap: 1,
					},
					style,
				]}
				{...props}
			>
				{children}
			</View>
		);
	},
);
Card.displayName = "Card";

// Card Header
export interface CardHeaderProps extends ViewProps {
	icon?: React.ReactNode | string;
	children?: React.ReactNode;
}

export const CardHeader = React.forwardRef<View, CardHeaderProps>(
	({ style, icon, children, ...props }, ref) => {
		if (icon) {
			return (
				<View ref={ref} style={[styles.cardHeaderWithIcon, style]} {...props}>
					{typeof icon === "string" ? (
						<CardIcon src={icon} />
					) : (
						<CardIcon>{icon}</CardIcon>
					)}
					<View style={styles.headerSeparator} />
					<View style={styles.headerContent}>{children}</View>
				</View>
			);
		}

		return (
			<View ref={ref} style={[styles.cardHeader, style]} {...props}>
				{children}
			</View>
		);
	},
);
CardHeader.displayName = "CardHeader";

// Card Header Right
export interface CardHeaderRightProps extends ViewProps {
	children?: React.ReactNode;
}

export const CardHeaderRight = React.forwardRef<View, CardHeaderRightProps>(
	({ style, children, ...props }, ref) => (
		<View ref={ref} style={[styles.cardHeaderRight, style]} {...props}>
			{children}
		</View>
	),
);
CardHeaderRight.displayName = "CardHeaderRight";

// Card Icon
export interface CardIconProps extends ViewProps {
	src?: string;
	children?: React.ReactNode;
}

export const CardIcon = React.forwardRef<View, CardIconProps>(
	({ style, src, children, ...props }, ref) => (
		<View ref={ref} style={[styles.cardIcon, style]} {...props}>
			{src ? (
				<Image
					source={{ uri: src }}
					style={styles.cardIconImage}
					resizeMode="cover"
				/>
			) : children ? (
				children
			) : (
				<View style={styles.cardIconPlaceholder} />
			)}
		</View>
	),
);
CardIcon.displayName = "CardIcon";

// Card Title
export interface CardTitleProps extends ViewProps {
	children?: React.ReactNode;
}

export const CardTitle = React.forwardRef<View, CardTitleProps>(
	({ style, children, ...props }, ref) => (
		<View ref={ref} style={style} {...props}>
			<Text variant="label" color="muted">
				{children}
			</Text>
		</View>
	),
);
CardTitle.displayName = "CardTitle";

// Card Description
export interface CardDescriptionProps extends ViewProps {
	children?: React.ReactNode;
}

export const CardDescription = React.forwardRef<View, CardDescriptionProps>(
	({ style, children, ...props }, ref) => (
		<View ref={ref} style={style} {...props}>
			<Text variant="sans-regular-14" color="muted">
				{children}
			</Text>
		</View>
	),
);
CardDescription.displayName = "CardDescription";

// Card Content
export interface CardContentProps extends ViewProps {
	children?: React.ReactNode;
}

export const CardContent = React.forwardRef<View, CardContentProps>(
	({ style, children, ...props }, ref) => (
		<View ref={ref} style={[styles.cardContent, style]} {...props}>
			{children}
		</View>
	),
);
CardContent.displayName = "CardContent";

// Card List Content
export interface CardListContentProps extends ViewProps {
	children?: React.ReactNode;
}

export const CardListContent = React.forwardRef<View, CardListContentProps>(
	({ style, children, ...props }, ref) => (
		<View ref={ref} style={[styles.cardListContent, style]} {...props}>
			{children}
		</View>
	),
);
CardListContent.displayName = "CardListContent";

// Card List Item
export interface CardListItemProps extends ViewProps {
	icon?: React.ReactNode | string;
	children?: React.ReactNode;
}

export const CardListItem = React.forwardRef<View, CardListItemProps>(
	({ style, icon, children, ...props }, ref) => {
		if (icon) {
			return (
				<View ref={ref} style={[styles.cardListItemWithIcon, style]} {...props}>
					{typeof icon === "string" ? (
						<CardListItemIcon src={icon} />
					) : (
						<CardListItemIcon>{icon}</CardListItemIcon>
					)}
					<View style={styles.cardListItemContent}>{children}</View>
				</View>
			);
		}

		return (
			<View ref={ref} style={[styles.cardListItem, style]} {...props}>
				{children}
			</View>
		);
	},
);
CardListItem.displayName = "CardListItem";

// Card List Item Icon
export interface CardListItemIconProps extends ViewProps {
	src?: string;
	children?: React.ReactNode;
}

export const CardListItemIcon = React.forwardRef<View, CardListItemIconProps>(
	({ style, src, children, ...props }, ref) => (
		<View ref={ref} style={[styles.cardListItemIcon, style]} {...props}>
			{src ? (
				<Image
					source={{ uri: src }}
					style={styles.cardListItemIconImage}
					resizeMode="cover"
				/>
			) : children ? (
				children
			) : (
				<View style={styles.cardListItemIconPlaceholder} />
			)}
		</View>
	),
);
CardListItemIcon.displayName = "CardListItemIcon";

const styles = StyleSheet.create({
	card: {
		flexDirection: "column",
		borderRadius: 8,
		overflow: "hidden",
		backgroundColor: "#161a17", // background-100
		gap: 1, // gap-y-px equivalent
	},
	cardHeader: {
		flexDirection: "column",
		gap: 4,
		padding: 12,
		backgroundColor: "#1e221f", // background-200
	},
	cardHeaderWithIcon: {
		height: 40,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#1e221f", // background-200
		gap: 1,
	},
	headerSeparator: {
		width: 1,
		height: "100%",
		backgroundColor: "#161a17", // background
	},
	headerContent: {
		padding: 12,
		flex: 1,
	},
	cardHeaderRight: {
		marginLeft: "auto",
	},
	cardIcon: {
		height: 36,
		width: 36,
		padding: 8,
		backgroundColor: "#1e221f", // background-200
		justifyContent: "center",
		alignItems: "center",
	},
	cardIconImage: {
		width: 20,
		height: 20,
		borderRadius: 2,
	},
	cardIconPlaceholder: {
		width: 20,
		height: 20,
		backgroundColor: "#242824", // background-300
		borderRadius: 2,
	},
	cardContent: {
		padding: 12,
		backgroundColor: "#1e221f", // background-200
	},
	cardListContent: {
		flexDirection: "column",
		gap: 1,
		fontSize: 14,
		fontWeight: "500",
	},
	cardListItem: {
		flexDirection: "column",
		gap: 4,
		padding: 12,
		backgroundColor: "#1e221f", // background-200
		justifyContent: "space-between",
	},
	cardListItemWithIcon: {
		height: 44,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#161a17", // background
		gap: 1,
	},
	cardListItemContent: {
		paddingHorizontal: 12,
		flex: 1,
		height: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#1e221f", // background-200
	},
	cardListItemIcon: {
		height: 44,
		width: 44,
		backgroundColor: "#1e221f", // background-200
		justifyContent: "center",
		alignItems: "center",
	},
	cardListItemIconImage: {
		height: 24,
		width: 24,
		borderRadius: 2,
	},
	cardListItemIconPlaceholder: {
		height: 24,
		width: 24,
		backgroundColor: "#242824", // background-300
		borderRadius: 2,
	},
});
