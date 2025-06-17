import type React from "react";
import { useMemo } from "react";
import { View } from "react-native";
import { SparklesIcon, TrophyIcon } from "../../../icons/utility";
import { useTheme } from "../../../theme/ThemeProvider";
import { Text } from "../../../typography/Text";
import { Thumbnail, ThumbnailsSubIcon } from "../../thumbnails";
import { ActivityCard } from "./ActivityCard";
import { ActivitySocialWebsite } from "./ActivitySocialWebsite";

export interface ActivityAchievementCardProps {
	title: string;
	topic: string;
	points: number;
	website: string;
	image?: string;
	error?: boolean;
	loading?: boolean;
	certified?: boolean;
	onPress?: () => void;
}

export const ActivityAchievementCard: React.FC<
	ActivityAchievementCardProps
> = ({
	title,
	topic,
	points,
	website,
	image = "",
	error = false,
	loading = false,
	certified = false,
	onPress,
}) => {
	const { colors } = useTheme();

	const Icon = useMemo(
		() => (
			<TrophyIcon
				color={colors.foreground[100]}
				variant="solid"
				className="w-full h-full"
			/>
		),
		[colors.foreground],
	);

	const Logo = useMemo(
		() => (
			<Thumbnail
				icon={image || "🌱"}
				subIcon={<ThumbnailsSubIcon variant="light" Icon={Icon} />}
				error={error}
				loading={loading}
				size="lg"
				variant="light"
			/>
		),
		[image, error, loading, Icon, colors.primary],
	);

	const Social = useMemo(() => {
		return <ActivitySocialWebsite website={website} certified={certified} />;
	}, [website, certified]);

	const Points = useMemo(() => {
		return (
			<View className="flex-row items-center gap-1">
				<SparklesIcon
					size="xs"
					color={colors.foreground[300]}
					variant="solid"
				/>
				<Text className="text-xs font-normal text-theme-foreground-muted">
					{points}
				</Text>
			</View>
		);
	}, [points, colors.foreground]);

	return (
		<ActivityCard
			Logo={Logo}
			title={title}
			subTitle={Social}
			topic={topic}
			subTopic={Points}
			error={error}
			loading={loading}
			onPress={onPress}
		/>
	);
};
