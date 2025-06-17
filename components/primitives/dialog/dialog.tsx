import type React from "react";
import { createContext, useContext, useState } from "react";
import {
	Modal,
	Pressable,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { TimesIcon } from "../../icons/utility/TimesIcon";
import { Text } from "../../typography/Text";
import { cn } from "../../utils/cn";

// Dialog Context
interface DialogContextType {
	open: boolean;
	setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

const useDialog = () => {
	const context = useContext(DialogContext);
	if (!context) {
		throw new Error("Dialog components must be used within a Dialog");
	}
	return context;
};

// Dialog Root Component
interface DialogProps {
	children: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export const Dialog: React.FC<DialogProps> = ({
	children,
	open: controlledOpen,
	onOpenChange,
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
		<DialogContext.Provider value={{ open, setOpen }}>
			{children}
		</DialogContext.Provider>
	);
};

// Dialog Trigger Component
interface DialogTriggerProps {
	children: React.ReactNode;
	asChild?: boolean;
}

export const DialogTrigger: React.FC<DialogTriggerProps> = ({ children }) => {
	const { setOpen } = useDialog();

	// Auto-wrap string children in Text component for React Native compatibility
	const renderChildren = () => {
		if (typeof children === "string") {
			return <Text variant="sans-regular-16">{children}</Text>;
		}
		return children;
	};

	return (
		<TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7}>
			{renderChildren()}
		</TouchableOpacity>
	);
};

// Dialog Content Component
interface DialogContentProps {
	children: React.ReactNode;
	className?: string;
}

export const DialogContent: React.FC<DialogContentProps> = ({
	children,
	className,
}) => {
	const { open, setOpen } = useDialog();

	return (
		<Modal
			visible={open}
			transparent
			animationType="fade"
			onRequestClose={() => setOpen(false)}
		>
			<TouchableWithoutFeedback onPress={() => setOpen(false)}>
				<View className="flex-1 bg-black/80 justify-center items-center p-4">
					<TouchableWithoutFeedback>
						<View
							className={cn(
								"bg-background-100 rounded-lg p-6 w-full max-w-sm border-4 border-border-200 shadow-lg",
								className,
							)}
						>
							<Pressable
								className="absolute left-3 top-3 p-2 bg-background-200 rounded-md"
								onPress={() => setOpen(false)}
							>
								<TimesIcon size="default" color="rgb(156, 163, 175)" />
							</Pressable>
							{children}
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

// Dialog Header Component
interface DialogHeaderProps {
	children: React.ReactNode;
	className?: string;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({
	children,
	className,
}) => {
	return <View className={cn("mb-4 items-center", className)}>{children}</View>;
};

// Dialog Footer Component
interface DialogFooterProps {
	children: React.ReactNode;
	className?: string;
}

export const DialogFooter: React.FC<DialogFooterProps> = ({
	children,
	className,
}) => {
	return (
		<View className={cn("flex-row justify-end gap-2 mt-4", className)}>
			{children}
		</View>
	);
};

// Dialog Title Component
interface DialogTitleProps {
	children: React.ReactNode;
	className?: string;
}

export const DialogTitle: React.FC<DialogTitleProps> = ({
	children,
	className,
}) => {
	return (
		<Text variant="heading-lg" className={cn("text-center mb-2", className)}>
			{children}
		</Text>
	);
};

// Dialog Description Component
interface DialogDescriptionProps {
	children: React.ReactNode;
	className?: string;
}

export const DialogDescription: React.FC<DialogDescriptionProps> = ({
	children,
	className,
}) => {
	return (
		<Text
			variant="body"
			className={cn("text-center text-foreground-400", className)}
		>
			{children}
		</Text>
	);
};

// Dialog Close Component
interface DialogCloseProps {
	children: React.ReactNode;
	asChild?: boolean;
}

export const DialogClose: React.FC<DialogCloseProps> = ({ children }) => {
	const { setOpen } = useDialog();

	return (
		<TouchableOpacity onPress={() => setOpen(false)} activeOpacity={0.7}>
			{children}
		</TouchableOpacity>
	);
};

// Portal and Overlay components for API compatibility
export const DialogPortal: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <>{children}</>;
};

export const DialogOverlay: React.FC<{ children?: React.ReactNode }> = ({
	children,
}) => {
	return <>{children}</>;
};
