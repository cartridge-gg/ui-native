import type React from "react";
import { createContext, useContext, useState } from "react";
import {
	Animated,
	Dimensions,
	Modal,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { Text } from "../../typography/Text";
import { cn } from "../../utils/cn";

const { height: screenHeight } = Dimensions.get("window");

// Drawer Context
interface DrawerContextType {
	open: boolean;
	setOpen: (open: boolean) => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

const useDrawer = () => {
	const context = useContext(DrawerContext);
	if (!context) {
		throw new Error("Drawer components must be used within a Drawer");
	}
	return context;
};

// Drawer Root Component
interface DrawerProps {
	children: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	shouldScaleBackground?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
	children,
	open: controlledOpen,
	onOpenChange,
	shouldScaleBackground = true,
}) => {
	const [internalOpen, setInternalOpen] = useState(false);

	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : internalOpen;

	const setOpen = (newOpen: boolean) => {
		if (!isControlled) {
			setInternalOpen(newOpen);
		}
		onOpenChange?.(newOpen);
	};

	return (
		<DrawerContext.Provider value={{ open, setOpen }}>
			{children}
		</DrawerContext.Provider>
	);
};

// Drawer Trigger Component
interface DrawerTriggerProps {
	children: React.ReactNode;
	asChild?: boolean;
}

export const DrawerTrigger: React.FC<DrawerTriggerProps> = ({ children }) => {
	const { setOpen } = useDrawer();

	return (
		<TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7}>
			{children}
		</TouchableOpacity>
	);
};

// Drawer Overlay Component
interface DrawerOverlayProps {
	className?: string;
}

export const DrawerOverlay: React.FC<DrawerOverlayProps> = ({ className }) => {
	return (
		<View className={cn("absolute inset-0 bg-black/80 z-50", className)} />
	);
};

// Drawer Content Component
interface DrawerContentProps {
	children: React.ReactNode;
	className?: string;
}

export const DrawerContent: React.FC<DrawerContentProps> = ({
	children,
	className,
}) => {
	const { open, setOpen } = useDrawer();

	return (
		<Modal
			visible={open}
			transparent
			animationType="slide"
			onRequestClose={() => setOpen(false)}
		>
			<TouchableWithoutFeedback onPress={() => setOpen(false)}>
				<View className="flex-1 bg-black/80 justify-end">
					<TouchableWithoutFeedback>
						<View
							className={cn(
								"bg-theme-background rounded-t-lg border border-theme-border pt-4",
								className,
							)}
							style={{
								minHeight: 200,
								maxHeight: screenHeight * 0.8,
							}}
						>
							{/* Drag Handle */}
							<View className="w-24 h-2 bg-theme-background-muted rounded-full self-center mb-4" />
							{children}
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

// Drawer Header Component
interface DrawerHeaderProps {
	children: React.ReactNode;
	className?: string;
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
	children,
	className,
}) => {
	return (
		<View className={cn("px-4 pb-4 items-center", className)}>{children}</View>
	);
};

// Drawer Footer Component
interface DrawerFooterProps {
	children: React.ReactNode;
	className?: string;
}

export const DrawerFooter: React.FC<DrawerFooterProps> = ({
	children,
	className,
}) => {
	return <View className={cn("mt-auto p-4 gap-2", className)}>{children}</View>;
};

// Drawer Title Component
interface DrawerTitleProps {
	children: React.ReactNode;
	className?: string;
}

export const DrawerTitle: React.FC<DrawerTitleProps> = ({
	children,
	className,
}) => {
	return (
		<Text
			variant="sans-semibold-18"
			className={cn("text-theme-foreground text-center mb-2", className)}
		>
			{children}
		</Text>
	);
};

// Drawer Description Component
interface DrawerDescriptionProps {
	children: React.ReactNode;
	className?: string;
}

export const DrawerDescription: React.FC<DrawerDescriptionProps> = ({
	children,
	className,
}) => {
	return (
		<Text
			variant="body"
			className={cn("text-theme-foreground-muted text-center", className)}
		>
			{children}
		</Text>
	);
};

// Drawer Close Component
interface DrawerCloseProps {
	children: React.ReactNode;
	asChild?: boolean;
}

export const DrawerClose: React.FC<DrawerCloseProps> = ({ children }) => {
	const { setOpen } = useDrawer();

	return (
		<TouchableOpacity onPress={() => setOpen(false)} activeOpacity={0.7}>
			{children}
		</TouchableOpacity>
	);
};

// Portal component for API compatibility
export const DrawerPortal: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <>{children}</>;
};
