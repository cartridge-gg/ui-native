import { useMemo } from "react";
import { OlmechIcon } from "#components/icons";
import type { OlmechIconProps } from "#components/icons/types";

export interface AchievementPlayerAvatarProps {
	username: string;
	size?: OlmechIconProps["size"];
	className?: string;
}

export function AchievementPlayerAvatar({
	username,
	size,
	className,
}: AchievementPlayerAvatarProps) {
	const variant = useMemo((): OlmechIconProps["variant"] => {
		const hash = username
			.split("")
			.reduce((acc, char) => acc + char.charCodeAt(0), 0);
		switch (hash % 8) {
			case 1:
				return "two";
			case 2:
				return "three";
			case 3:
				return "four";
			case 4:
				return "eight";
			case 5:
				return "six";
			case 6:
				return "seven";
			case 7:
				return "five";
			default:
				return "one";
		}
	}, [username]);

	return <OlmechIcon size={size} variant={variant} className={className} />;
}
