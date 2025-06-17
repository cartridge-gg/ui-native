import type React from "react";
import { Pressable, Modal as RNModal, View } from "react-native";
import { Text } from "../../typography/Text";
import { cn } from "../../utils/cn";

export interface ModalProps {
	visible: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	showCloseButton?: boolean;
	className?: string;
}

export interface ModalHeaderProps {
	children: React.ReactNode;
	className?: string;
}

export interface ModalContentProps {
	children: React.ReactNode;
	className?: string;
}

export interface ModalFooterProps {
	children: React.ReactNode;
	className?: string;
}

export const Modal: React.FC<ModalProps> = ({
	visible,
	onClose,
	title,
	children,
	showCloseButton = true,
	className,
}) => {
	return (
		<RNModal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onClose}
		>
			<Pressable
				className="flex-1 bg-black/50 justify-center items-center p-5"
				onPress={onClose}
			>
				<Pressable
					className={cn(
						"bg-background-100 rounded-xl border-4 border-background-300 p-6 max-w-[90%] max-h-[80%] min-w-[300px]",
						className,
					)}
					onPress={(e) => e.stopPropagation()}
				>
					{(title || showCloseButton) && (
						<View className="flex-row justify-between items-center mb-4">
							{title && (
								<Text className="text-lg font-semibold text-foreground-100 flex-1">
									{title}
								</Text>
							)}
							{showCloseButton && (
								<Pressable
									className="w-8 h-8 rounded-md bg-background-200 justify-center items-center ml-3"
									onPress={onClose}
								>
									<Text className="text-base text-foreground-400 font-bold">
										×
									</Text>
								</Pressable>
							)}
						</View>
					)}
					{children}
				</Pressable>
			</Pressable>
		</RNModal>
	);
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({
	children,
	className,
}) => {
	return (
		<View className={cn("mb-4 pb-3 border-b border-background-300", className)}>
			{children}
		</View>
	);
};

export const ModalContent: React.FC<ModalContentProps> = ({
	children,
	className,
}) => {
	return <View className={className}>{children}</View>;
};

export const ModalFooter: React.FC<ModalFooterProps> = ({
	children,
	className,
}) => {
	return (
		<View
			className={cn(
				"mt-4 pt-3 border-t border-background-300 flex-row justify-end gap-2",
				className,
			)}
		>
			{children}
		</View>
	);
};
