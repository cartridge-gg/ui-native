import type React from "react";
import { useMemo } from "react";
import { View } from "react-native";
import { JoystickIcon } from "../../../icons/utility";
import { useTheme } from "../../../theme/ThemeProvider";
import { Thumbnail, ThumbnailsSubIcon } from "../../thumbnails";
import { ActivityCard } from "./ActivityCard";
import { ActivitySocialWebsite } from "./ActivitySocialWebsite";

export interface ActivityGameCardProps {
	title: string;
	website: string;
	image?: string;
	error?: boolean;
	loading?: boolean;
	certified?: boolean;
	onPress?: () => void;
}

export const ActivityGameCard: React.FC<ActivityGameCardProps> = ({
	title,
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
			<View className="w-full h-full justify-center items-center">
				<JoystickIcon
					size="default"
					color={colors.foreground[100]}
					variant="solid"
				/>
			</View>
		),
		[colors.foreground],
	);

	const SubIcon = useMemo(
		() => (
			<View className="w-full h-full justify-center items-center">
				<JoystickIcon
					size="xs"
					color={colors.foreground[100]}
					variant="solid"
				/>
			</View>
		),
		[colors.foreground],
	);

	const Logo = useMemo(
		() => (
			<Thumbnail
				icon={image || Icon}
				subIcon={
					!error && !loading ? (
						<ThumbnailsSubIcon variant="light" size="lg" Icon={SubIcon} />
					) : undefined
				}
				error={error}
				loading={loading}
				size="lg"
				variant="light"
			/>
		),
		[image, error, loading, Icon, SubIcon],
	);

	const Social = useMemo(() => {
		return <ActivitySocialWebsite website={website} certified={certified} />;
	}, [website, certified]);

	const formattedTitle = useMemo(() => {
		return title.replace("_", " ").trim();
	}, [title]);

	return (
		<ActivityCard
			Logo={Logo}
			title={formattedTitle}
			subTitle={Social}
			error={error}
			loading={loading}
			onPress={onPress}
		/>
	);
};
