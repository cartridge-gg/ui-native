import type React from "react";
import { useMemo } from "react";
import { View } from "react-native";
import { GlobeIcon, VerifiedIcon } from "../../../icons/utility";
import { Text } from "../../../typography/Text";
import { cn } from "../../../utils/cn";

export interface ActivitySocialWebsiteProps {
	website: string;
	certified?: boolean;
	className?: string;
}

export const ActivitySocialWebsite: React.FC<ActivitySocialWebsiteProps> = ({
	website,
	certified = false,
	className,
}) => {
	const label = useMemo(() => {
		return website.replace(/^.*https?:\/\//, "").replace(/\/$/, "");
	}, [website]);

	const Icon = useMemo(() => {
		if (certified) {
			return <VerifiedIcon size="xs" />;
		}
		return <GlobeIcon size="xs" />;
	}, [certified]);

	return (
		<View className={cn("flex-row items-center gap-1", className)}>
			{Icon}
			{label && (
				<Text className="text-xs text-theme-foreground-muted">{label}</Text>
			)}
		</View>
	);
};
