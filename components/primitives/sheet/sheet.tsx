import type React from "react";
import { createContext, useContext, useState } from "react";
import {
	Dimensions,
	Modal,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { TimesIcon } from "../../icons/utility/TimesIcon";
import { useTheme } from "../../theme/ThemeProvider";
import { Text } from "../../typography/Text";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Sheet Context
interface SheetContextType {
	open: boolean;
	setOpen: (open: boolean) => void;
	side: "top" | "bottom" | "left" | "right";
	setSide: (side: "top" | "bottom" | "left" | "right") => void;
}

const SheetContext = createContext<SheetContextType | undefined>(undefined);

const useSheet = () => {
	const context = useContext(SheetContext);
	if (!context) {
		throw new Error("Sheet components must be used within a Sheet");
	}
	return context;
};

// Sheet Root Component
interface SheetProps {
	children: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export const Sheet: React.FC<SheetProps> = ({
	children,
	open: controlledOpen,
	onOpenChange,
}) => {
	const [internalOpen, setInternalOpen] = useState(false);
	const [side, setSide] = useState<"top" | "bottom" | "left" | "right">(
		"right",
	);

	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : internalOpen;

	const setOpen = (newOpen: boolean) => {
		if (!isControlled) {
			setInternalOpen(newOpen);
		}
		onOpenChange?.(newOpen);
	};

	return (
		<SheetContext.Provider value={{ open, setOpen, side, setSide }}>
			{children}
		</SheetContext.Provider>
	);
};

// Sheet Trigger Component
interface SheetTriggerProps {
	children: React.ReactNode;
	asChild?: boolean;
}

export const SheetTrigger: React.FC<SheetTriggerProps> = ({ children }) => {
	const { setOpen } = useSheet();

	return (
		<TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7}>
			{children}
		</TouchableOpacity>
	);
};

// Sheet Content Component
interface SheetContentProps {
	children: React.ReactNode;
	side?: "top" | "bottom" | "left" | "right";
	showClose?: boolean;
	className?: string;
}

export const SheetContent: React.FC<SheetContentProps> = ({
	children,
	side = "right",
	showClose = true,
}) => {
	const { open, setOpen } = useSheet();
	const { colors } = useTheme();

	const getSheetStyles = () => {
		const baseStyle = {
			backgroundColor: colors.background[100],
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 5,
		};

		switch (side) {
			case "top":
				return {
					...baseStyle,
					position: "absolute" as const,
					top: 0,
					left: 0,
					right: 0,
					height: screenHeight * 0.5,
					borderBottomWidth: 1,
					borderBottomColor: colors.border[200],
				};
			case "bottom":
				return {
					...baseStyle,
					position: "absolute" as const,
					bottom: 0,
					left: 0,
					right: 0,
					height: screenHeight * 0.5,
					borderTopWidth: 1,
					borderTopColor: colors.border[200],
					borderTopLeftRadius: 12,
					borderTopRightRadius: 12,
				};
			case "left":
				return {
					...baseStyle,
					position: "absolute" as const,
					top: 0,
					bottom: 0,
					left: 0,
					width: screenWidth * 0.75,
					maxWidth: 320,
					borderRightWidth: 1,
					borderRightColor: colors.border[200],
				};
			default:
				return {
					...baseStyle,
					position: "absolute" as const,
					top: 0,
					bottom: 0,
					right: 0,
					width: screenWidth * 0.75,
					maxWidth: 320,
					borderLeftWidth: 1,
					borderLeftColor: colors.border[200],
				};
		}
	};

	const styles = StyleSheet.create({
		overlay: {
			flex: 1,
			backgroundColor: "rgba(0, 0, 0, 0.5)",
		},
		content: {
			...getSheetStyles(),
			padding: 24,
			gap: 16,
		},
		closeButton: {
			position: "absolute",
			right: 16,
			top: 16,
			padding: 8,
			borderRadius: 4,
			opacity: 0.7,
		},
	});

	const getAnimationType = () => {
		switch (side) {
			case "top":
				return "slide" as const;
			case "bottom":
				return "slide" as const;
			case "left":
				return "slide" as const;
			default:
				return "slide" as const;
		}
	};

	return (
		<Modal
			visible={open}
			transparent
			animationType={getAnimationType()}
			onRequestClose={() => setOpen(false)}
		>
			<TouchableWithoutFeedback onPress={() => setOpen(false)}>
				<View style={styles.overlay}>
					<TouchableWithoutFeedback>
						<View style={styles.content}>
							{showClose && (
								<Pressable
									style={styles.closeButton}
									onPress={() => setOpen(false)}
								>
									<TimesIcon size="xs" color={colors.foreground[400]} />
								</Pressable>
							)}
							{children}
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

// Sheet Header Component
interface SheetHeaderProps {
	children: React.ReactNode;
	className?: string;
}

export const SheetHeader: React.FC<SheetHeaderProps> = ({ children }) => {
	const styles = StyleSheet.create({
		header: {
			marginBottom: 16,
		},
	});

	return <View style={styles.header}>{children}</View>;
};

// Sheet Footer Component
interface SheetFooterProps {
	children: React.ReactNode;
	className?: string;
}

export const SheetFooter: React.FC<SheetFooterProps> = ({ children }) => {
	const styles = StyleSheet.create({
		footer: {
			flexDirection: "row",
			justifyContent: "flex-end",
			gap: 8,
			marginTop: 16,
		},
	});

	return <View style={styles.footer}>{children}</View>;
};

// Sheet Title Component
interface SheetTitleProps {
	children: React.ReactNode;
	className?: string;
}

export const SheetTitle: React.FC<SheetTitleProps> = ({ children }) => {
	const { colors } = useTheme();

	return (
		<Text
			variant="heading-lg"
			style={{
				color: colors.foreground[100],
				marginBottom: 8,
			}}
		>
			{children}
		</Text>
	);
};

// Sheet Description Component
interface SheetDescriptionProps {
	children: React.ReactNode;
	className?: string;
}

export const SheetDescription: React.FC<SheetDescriptionProps> = ({
	children,
}) => {
	const { colors } = useTheme();

	return (
		<Text
			variant="body"
			style={{
				color: colors.foreground[400],
			}}
		>
			{children}
		</Text>
	);
};

// Sheet Close Component
interface SheetCloseProps {
	children: React.ReactNode;
	asChild?: boolean;
}

export const SheetClose: React.FC<SheetCloseProps> = ({ children }) => {
	const { setOpen } = useSheet();

	return (
		<TouchableOpacity onPress={() => setOpen(false)} activeOpacity={0.7}>
			{children}
		</TouchableOpacity>
	);
};

// Portal and Overlay components for API compatibility
export const SheetPortal: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <>{children}</>;
};

export const SheetOverlay: React.FC<{ children?: React.ReactNode }> = ({
	children,
}) => {
	return <>{children}</>;
};
