import type React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../typography/Text";
import { cn } from "../utils/cn";

// Header variant types
type HeaderVariant = "expanded" | "compressed" | "hidden";

// Main LayoutHeader Props
interface LayoutHeaderProps {
	title?: string | React.ReactElement;
	description?: string | React.ReactElement;
	variant?: HeaderVariant;
	icon?: React.ReactElement;
	right?: React.ReactElement;
	onBack?: () => void;
	onClose?: () => void;
	onSettings?: () => void;
	hideSettings?: boolean;
	className?: string;
}

export const LayoutHeader: React.FC<LayoutHeaderProps> = ({
	title,
	description,
	variant = "compressed",
	icon,
	right,
	onBack,
	onClose,
	onSettings,
	hideSettings = false,
	className,
}) => {
	if (variant === "hidden") return null;

	const IconWrapper = ({ children }: { children: React.ReactNode }) => (
		<View
			className={cn(
				"flex-shrink-0 rounded-lg bg-theme-background-subtle justify-center items-center",
				variant === "expanded"
					? "w-20 h-20 bg-theme-background p-1"
					: "w-10 h-10",
			)}
		>
			{variant === "expanded" && (
				<View className="w-full h-full rounded-lg bg-theme-background-subtle justify-center items-center">
					{children}
				</View>
			)}
			{variant !== "expanded" && children}
		</View>
	);

	return (
		<View
			className={cn(
				"bg-theme-background border-b border-theme-border",
				variant === "expanded" ? "h-44 flex-col" : "flex-col",
				className,
			)}
		>
			{/* Background cover */}
			<View
				className="w-full bg-theme-border"
				style={{ height: variant === "expanded" ? 136 : 64 }}
			/>

			{/* Header content */}
			<View
				className={cn(
					"p-6 flex-row items-center justify-between",
					variant === "expanded"
						? "pb-0 absolute bottom-0 left-0 right-0"
						: "pb-6",
				)}
			>
				<View className="flex-row items-center flex-1 min-w-0 gap-3">
					<IconWrapper>
						{icon || (
							<View
								className="bg-theme-border rounded"
								style={{
									width: variant === "expanded" ? 32 : 24,
									height: variant === "expanded" ? 32 : 24,
								}}
							/>
						)}
					</IconWrapper>

					<View
						className={cn(
							"flex-1",
							variant === "expanded" ? "gap-1.5" : "gap-0.5",
						)}
					>
						{title && (
							<Text
								variant={
									variant === "expanded"
										? "sans-semibold-18"
										: "sans-semibold-14"
								}
								className="text-theme-foreground"
								numberOfLines={1}
							>
								{title}
							</Text>
						)}
						{description && (
							<Text variant="caption" className="text-theme-foreground-muted">
								{description}
							</Text>
						)}
					</View>
				</View>

				{right}
			</View>

			{/* Action bar with back/close/settings buttons */}
			<View className="absolute top-0 left-0 right-0 h-16 flex-row items-center justify-between px-2 z-50">
				<View>
					{onBack ? (
						<TouchableOpacity
							className="w-10 h-10 rounded-full bg-theme-background-subtle justify-center items-center"
							onPress={onBack}
						>
							<Text className="text-theme-foreground">←</Text>
						</TouchableOpacity>
					) : onClose ? (
						<TouchableOpacity
							className="w-10 h-10 rounded-full bg-theme-background-subtle justify-center items-center"
							onPress={onClose}
						>
							<Text className="text-theme-foreground">×</Text>
						</TouchableOpacity>
					) : null}
				</View>

				<View className="flex-row gap-2">
					{onSettings && !hideSettings && (
						<TouchableOpacity
							className="w-10 h-10 rounded-full bg-theme-background-subtle justify-center items-center"
							onPress={onSettings}
						>
							<Text className="text-theme-foreground">⚙</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</View>
	);
};
