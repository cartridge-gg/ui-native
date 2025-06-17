import { createContext, useContext, useState } from "react";
import { Modal, Pressable, View } from "react-native";
import { Text } from "../../typography/Text";
import { cn } from "../../utils/cn";

// AlertDialog Context
interface AlertDialogContextType {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const AlertDialogContext = createContext<AlertDialogContextType | null>(null);

export interface AlertDialogProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
	open: controlledOpen,
	defaultOpen = false,
	onOpenChange,
	children,
}) => {
	const [internalOpen, setInternalOpen] = useState(defaultOpen);

	const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

	const handleOpenChange = (newOpen: boolean) => {
		if (controlledOpen === undefined) {
			setInternalOpen(newOpen);
		}
		onOpenChange?.(newOpen);
	};

	return (
		<AlertDialogContext.Provider
			value={{ open, onOpenChange: handleOpenChange }}
		>
			{children}
		</AlertDialogContext.Provider>
	);
};

export interface AlertDialogTriggerProps {
	children: React.ReactNode;
	className?: string;
}

export const AlertDialogTrigger: React.FC<AlertDialogTriggerProps> = ({
	children,
	className,
}) => {
	const context = useContext(AlertDialogContext);

	if (!context) {
		throw new Error("AlertDialogTrigger must be used within an AlertDialog");
	}

	const { onOpenChange } = context;

	return (
		<Pressable className={className} onPress={() => onOpenChange(true)}>
			{children}
		</Pressable>
	);
};

export interface AlertDialogContentProps {
	children: React.ReactNode;
	className?: string;
}

export const AlertDialogContent: React.FC<AlertDialogContentProps> = ({
	children,
	className,
}) => {
	const context = useContext(AlertDialogContext);

	if (!context) {
		throw new Error("AlertDialogContent must be used within an AlertDialog");
	}

	const { open, onOpenChange } = context;

	return (
		<Modal
			visible={open}
			transparent
			animationType="fade"
			onRequestClose={() => onOpenChange(false)}
		>
			<Pressable
				className="flex-1 bg-black/80 justify-center items-center p-4"
				onPress={() => onOpenChange(false)}
			>
				<Pressable
					className={cn(
						"bg-theme-background rounded-lg border-4 border-theme-border p-6 w-full max-w-sm shadow-lg",
						className,
					)}
					onPress={(e) => e.stopPropagation()}
				>
					{children}
				</Pressable>
			</Pressable>
		</Modal>
	);
};

export interface AlertDialogHeaderProps {
	children: React.ReactNode;
	className?: string;
}

export const AlertDialogHeader: React.FC<AlertDialogHeaderProps> = ({
	children,
	className,
}) => {
	return <View className={cn("mb-4", className)}>{children}</View>;
};

export interface AlertDialogFooterProps {
	children: React.ReactNode;
	className?: string;
}

export const AlertDialogFooter: React.FC<AlertDialogFooterProps> = ({
	children,
	className,
}) => {
	return (
		<View className={cn("flex-row justify-end gap-2 mt-4", className)}>
			{children}
		</View>
	);
};

export interface AlertDialogTitleProps {
	children: React.ReactNode;
	className?: string;
}

export const AlertDialogTitle: React.FC<AlertDialogTitleProps> = ({
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

export interface AlertDialogDescriptionProps {
	children: React.ReactNode;
	className?: string;
}

export const AlertDialogDescription: React.FC<AlertDialogDescriptionProps> = ({
	children,
	className,
}) => {
	return (
		<Text
			variant="body"
			className={cn("text-theme-foreground-muted leading-5", className)}
		>
			{children}
		</Text>
	);
};

export interface AlertDialogActionProps {
	children: React.ReactNode;
	onPress?: () => void;
	variant?: "default" | "destructive";
	className?: string;
}

export const AlertDialogAction: React.FC<AlertDialogActionProps> = ({
	children,
	onPress,
	variant = "default",
	className,
}) => {
	const context = useContext(AlertDialogContext);

	if (!context) {
		throw new Error("AlertDialogAction must be used within an AlertDialog");
	}

	const { onOpenChange } = context;

	const handlePress = () => {
		onPress?.();
		onOpenChange(false);
	};

	const getVariantClasses = () => {
		switch (variant) {
			case "destructive":
				return "bg-theme-destructive text-white";
			default:
				return "bg-theme-primary text-white";
		}
	};

	return (
		<Pressable
			className={cn(
				"px-4 py-2 rounded-md justify-center items-center min-w-20",
				getVariantClasses(),
				className,
			)}
			onPress={handlePress}
		>
			<Text className="text-sm font-semibold text-white">{children}</Text>
		</Pressable>
	);
};

export interface AlertDialogCancelProps {
	children: React.ReactNode;
	onPress?: () => void;
	className?: string;
}

export const AlertDialogCancel: React.FC<AlertDialogCancelProps> = ({
	children,
	onPress,
	className,
}) => {
	const context = useContext(AlertDialogContext);

	if (!context) {
		throw new Error("AlertDialogCancel must be used within an AlertDialog");
	}

	const { onOpenChange } = context;

	const handlePress = () => {
		onPress?.();
		onOpenChange(false);
	};

	return (
		<Pressable
			className={cn(
				"px-4 py-2 rounded-md bg-transparent border border-theme-border justify-center items-center min-w-20",
				className,
			)}
			onPress={handlePress}
		>
			<Text className="text-sm font-semibold text-theme-foreground-subtle">
				{children}
			</Text>
		</Pressable>
	);
};
