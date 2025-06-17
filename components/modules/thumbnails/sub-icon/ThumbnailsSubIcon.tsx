import type React from "react";
import { View } from "react-native";
import { cn } from "../../../utils/cn";

export type SubIconVariant =
	| "darkest"
	| "darker"
	| "dark"
	| "default"
	| "light"
	| "lighter"
	| "lightest"
	| "ghost";
export type SubIconSize = "lg" | "xl";

export interface ThumbnailsSubIconProps {
	Icon: React.ReactNode;
	variant?: SubIconVariant;
	size?: SubIconSize;
	className?: string;
}

export const ThumbnailsSubIcon: React.FC<ThumbnailsSubIconProps> = ({
	Icon,
	variant = "default",
	size = "lg",
	className,
}) => {
	const getSizeClasses = () => {
		switch (size) {
			case "lg":
				return "w-5 h-5 p-1";
			case "xl":
				return "w-6 h-6 p-1";
			default:
				return "w-5 h-5 p-1";
		}
	};

	const getVariantClasses = () => {
		switch (variant) {
			case "darkest":
			case "darker":
			case "dark":
				return "bg-theme-background-subtle";
			case "default":
			case "light":
				return "bg-theme-border";
			case "lighter":
			case "lightest":
				return "bg-theme-background-muted";
			case "ghost":
				return "bg-transparent";
			default:
				return "bg-theme-border";
		}
	};

	return (
		<View
			className={cn(
				"rounded-full justify-center items-center",
				getSizeClasses(),
				getVariantClasses(),
				className,
			)}
		>
			{Icon}
		</View>
	);
};
