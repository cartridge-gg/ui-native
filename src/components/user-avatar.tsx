import { useMemo } from "react";
import { View } from "react-native";
import { Text } from "#components";
import { cn } from "#utils";

interface UserAvatarProps {
	username: string;
	className?: string;
	size?: "sm" | "md" | "lg" | "xl" | "xxl";
}

export function UserAvatar({
	username,
	className,
	size = "md",
}: UserAvatarProps) {
	const initials = useMemo(() => {
		if (!username) return "?";
		const parts = username.split(" ");
		if (parts.length >= 2) {
			return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
		}
		return username.slice(0, 2).toUpperCase();
	}, [username]);

	const sizeClasses = useMemo(() => {
		switch (size) {
			case "sm":
				return "size-6";
			case "md":
				return "size-8";
			case "lg":
				return "size-10";
			case "xl":
				return "size-12";
			case "xxl":
				return "size-16";
			default:
				return "size-8";
		}
	}, [size]);

	const textSizeClasses = useMemo(() => {
		switch (size) {
			case "sm":
				return "text-xs";
			case "md":
				return "text-sm";
			case "lg":
				return "text-base";
			case "xl":
				return "text-lg";
			case "xxl":
				return "text-xl";
			default:
				return "text-sm";
		}
	}, [size]);

	return (
		<View
			className={cn(
				sizeClasses,
				"bg-primary rounded-full items-center justify-center",
				className,
			)}
		>
			<Text
				className={cn(textSizeClasses, "font-semibold text-primary-foreground")}
			>
				{initials}
			</Text>
		</View>
	);
}
