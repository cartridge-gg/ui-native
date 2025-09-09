import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { useMemo } from "react";
import { Image, View } from "react-native";
import { SvgUri } from "react-native-svg";
import { cn } from "#utils";

const thumbnailVariants = cva("items-center justify-center", {
	variants: {
		size: {
			xs: "size-5 p-0.5",
			sm: "size-6 p-0.5",
			md: "size-8 p-0.5",
			lg: "size-10 p-1",
			xl: "size-12 p-1",
			xxl: "size-20 p-1.5",
		},
		variant: {
			default: "bg-background-200",
			ghost: "bg-transparent",
			dark: "bg-background-100",
			light: "bg-background-300",
		},
		rounded: {
			true: "rounded-full",
			false: "rounded",
		},
	},
	defaultVariants: {
		size: "md",
		variant: "default",
		rounded: false,
	},
});

export interface ThumbnailProps extends VariantProps<typeof thumbnailVariants> {
	icon?: string | React.ReactNode | number;
	className?: string;
}

export function Thumbnail({
	icon,
	rounded,
	size,
	variant,
	className,
}: ThumbnailProps) {
	const containerClasses = useMemo(
		() => cn(thumbnailVariants({ size, variant, rounded }), className),
		[size, variant, rounded, className],
	);

	if (!icon) {
		return <View className={containerClasses} />;
	}

	if (typeof icon === "string") {
		return (
			<View className={containerClasses}>
				{icon.includes(".svg") ? (
					<SvgUri
						uri={icon}
						className={cn("size-full", rounded ? "rounded-full" : "rounded-sm")}
					/>
				) : (
					<Image
						source={{ uri: icon }}
						className={cn("size-full", rounded ? "rounded-full" : "rounded-sm")}
						resizeMode="cover"
					/>
				)}
			</View>
		);
	}

	if (typeof icon === "number") {
		return (
			<View className={containerClasses}>
				<Image
					source={icon}
					className={cn("size-full", rounded ? "rounded-full" : "rounded-sm")}
					resizeMode="cover"
				/>
			</View>
		);
	}

	return <View className={containerClasses}>{icon}</View>;
}
