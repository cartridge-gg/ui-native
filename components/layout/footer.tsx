import type React from "react";
import { useEffect } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Separator } from "../primitives/separator/Separator";
import { Text } from "../typography/Text";
import { cn } from "../utils/cn";
import { useLayoutContext } from "./context";

// Cartridge Logo Component
const CartridgeLogo: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<View className={cn("h-4 w-23", className)}>
			<Text variant="caption" className="text-theme-foreground-muted">
				CARTRIDGE
			</Text>
		</View>
	);
};

// Controller Icon Component
const ControllerIcon: React.FC = () => {
	return (
		<View className="h-6 w-6">
			<Text variant="caption" className="text-theme-foreground-muted">
				🎮
			</Text>
		</View>
	);
};

// Main LayoutFooter Component
interface LayoutFooterProps {
	children: React.ReactNode;
	className?: string;
	showCartridgeLogo?: boolean;
}

export const LayoutFooter: React.FC<LayoutFooterProps> = ({
	children,
	className,
	showCartridgeLogo = false,
}) => {
	const { setWithFooter } = useLayoutContext();

	useEffect(() => {
		setWithFooter(true);

		// Cleanup function to reset footer state when component unmounts
		return () => setWithFooter(false);
	}, [setWithFooter]);

	const handleCartridgePress = () => {
		Linking.openURL("https://cartridge.gg");
	};

	return (
		<View
			className={cn(
				"flex-col gap-3 w-full p-6 pt-0 mt-auto bg-theme-background flex-shrink-0",
				showCartridgeLogo && "pb-2",
				className,
			)}
		>
			<Separator orientation="horizontal" />

			{children}

			{showCartridgeLogo && (
				<View className="flex-col">
					<Separator orientation="horizontal" />
					<TouchableOpacity
						className="h-10 flex-row items-center justify-center gap-1"
						onPress={handleCartridgePress}
						activeOpacity={0.7}
					>
						<ControllerIcon />
						<Text className="text-xs font-medium text-theme-foreground-muted">
							by
						</Text>
						<CartridgeLogo />
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};
