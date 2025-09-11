import { useMemo } from "react";
import { View } from "react-native";
import {
	Badge,
	JoystickIcon,
	PulseIcon,
	SparklesIcon,
	Text,
	Thumbnail,
	TrophyIcon,
} from "#components";
import { formatAge } from "#utils";

export type DiscoveryAchievement = {
	title: string;
	icon: string;
	points: number;
};

export type DiscoveryEventProps = {
	identifier: string;
	name: string;
	timestamp: number;
	Icon: React.ReactNode;
	count: number;
	duration: number;
	actions: string[];
	achievements: DiscoveryAchievement[];
	address: string;
	onClick: () => void;
	loading?: boolean;
	color?: string;
	logo?: string;
};

export function DiscoveryEvent({
	name,
	timestamp,
	Icon,
	count,
	// duration,
	// actions,
	achievements,
	// address,
	onClick,
	logo,
	color,
}: DiscoveryEventProps) {
	const age = useMemo(() => formatAge(timestamp), [timestamp]);
	const points = useMemo(
		() => achievements.reduce((acc, a) => acc + (a.points || 0), 0),
		[achievements],
	);

	return (
		<View
			className="flex-row items-center justify-between px-3 py-2 bg-background-200"
			onTouchEnd={onClick}
		>
			<View className="absolute h-10 left-0 right-0 top-0 opacity-10" />

			<View className="flex-1 flex-row items-center gap-1.5">
				<View>{Icon}</View>
				<Text
					className="text-sm font-normal tracking-normal text-foreground-100"
					numberOfLines={1}
				>
					{name}
				</Text>
				<View className="flex-1 flex-row items-center gap-1 flex-wrap">
					<Badge className="size-5 items-center justify-center bg-translucent-dark-100">
						<JoystickIcon
							size="sm"
							variant="solid"
							className="fill-translucent-light-150"
						/>
					</Badge>
					<Badge className="bg-translucent-dark-100">
						<PulseIcon size="sm" variant="solid" color={color} />
						<Text style={{ color }}>{count}</Text>
					</Badge>
					{points > 0 && (
						<View className="flex-row items-center gap-1">
							{achievements.length > 0 && (
								<Badge className="bg-translucent-dark-100">
									<TrophyIcon size="sm" variant="solid" color={color} />
									<Text style={{ color }}>{achievements.length}</Text>
								</Badge>
							)}
							<Badge className="bg-translucent-dark-100">
								<SparklesIcon size="sm" variant="solid" color={color} />
								<Text style={{ color }}>{points}</Text>
							</Badge>
						</View>
					)}
				</View>
			</View>

			<View className="flex-row items-center gap-2">
				<Text className="text-xs text-translucent-light-150">{age}</Text>
				<Thumbnail icon={logo} size="sm" variant="light" rounded={false} />
			</View>
		</View>
	);
}
