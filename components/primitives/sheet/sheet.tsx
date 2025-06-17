import type React from "react";
import { createContext, useContext, useState } from "react";
import {
	Dimensions,
	Modal,
	Pressable,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { TimesIcon } from "../../icons/utility/TimesIcon";
import { Text } from "../../typography/Text";
import { cn } from "../../utils/cn";

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
	className,
}) => {
	const { open, setOpen } = useSheet();

	const getSheetClasses = () => {
		const baseClasses = "absolute bg-theme-background shadow-lg";

		switch (side) {
			case "top":
				return cn(
					baseClasses,
					"top-0 left-0 right-0 border-b border-theme-border",
				);
			case "bottom":
				return cn(
					baseClasses,
					"bottom-0 left-0 right-0 border-t border-theme-border rounded-t-lg",
				);
			case "left":
				return cn(
					baseClasses,
					"top-0 bottom-0 left-0 border-r border-theme-border",
				);
			default:
				return cn(
					baseClasses,
					"top-0 bottom-0 right-0 border-l border-theme-border",
				);
		}
	};

	const getSheetSize = () => {
		switch (side) {
			case "top":
			case "bottom":
				return { height: screenHeight * 0.5 };
			case "left":
			case "right":
				return { width: screenWidth * 0.75, maxWidth: 320 };
			default:
				return {};
		}
	};

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
				<View className="flex-1 bg-black/50">
					<TouchableWithoutFeedback>
						<View
							className={cn(getSheetClasses(), "p-6 gap-4", className)}
							style={getSheetSize()}
						>
							{showClose && (
								<Pressable
									className="absolute right-4 top-4 p-2 rounded opacity-70"
									onPress={() => setOpen(false)}
								>
									<TimesIcon size="xs" />
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

export const SheetHeader: React.FC<SheetHeaderProps> = ({
	children,
	className,
}) => {
	return <View className={cn("mb-4", className)}>{children}</View>;
};

// Sheet Footer Component
interface SheetFooterProps {
	children: React.ReactNode;
	className?: string;
}

export const SheetFooter: React.FC<SheetFooterProps> = ({
	children,
	className,
}) => {
	return (
		<View className={cn("flex-row justify-end gap-2 mt-4", className)}>
			{children}
		</View>
	);
};

// Sheet Title Component
interface SheetTitleProps {
	children: React.ReactNode;
	className?: string;
}

export const SheetTitle: React.FC<SheetTitleProps> = ({
	children,
	className,
}) => {
	return (
		<Text
			variant="heading-lg"
			className={cn("text-theme-foreground mb-2", className)}
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
	className,
}) => {
	return (
		<Text
			variant="body"
			className={cn("text-theme-foreground-muted", className)}
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
