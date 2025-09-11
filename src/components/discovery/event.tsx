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
	Icon?: React.ReactNode;
	count?: number;
	duration?: number;
	achievements?: DiscoveryAchievement[];
	loading?: boolean;
	color?: string;
	logo?: string;
	// Fallback fields for simple rendering
	title?: string;
	amount?: string;
};

export function DiscoveryEvent({
	name,
	timestamp,
	Icon,
	count,
	achievements = [],
	logo,
	color,
	title,
	amount,
}: DiscoveryEventProps) {
	const age = useMemo(() => formatAge(timestamp), [timestamp]);
	const points = useMemo(
		() => achievements.reduce((acc, a) => acc + (a.points || 0), 0),
		[achievements],
	);

	return (
		<View className="flex-row items-center justify-between px-3 py-2 bg-background-200">
			<View className="absolute h-10 left-0 right-0 top-0 opacity-10" />

			<View className="flex-1 flex-row items-center gap-1.5">
				{!!Icon && <View>{Icon}</View>}
				<Text
					className="text-sm font-normal tracking-normal text-foreground-100"
					numberOfLines={1}
				>
					{name}
				</Text>
				{typeof count === "number" && count > 0 ? (
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
						{(points || 0) > 0 && (
							<View className="flex-row items-center gap-1">
								{achievements?.length && (
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
				) : (
					<View className="flex-row items-center gap-1.5">
						{!!title && <Text className="text-sm font-normal">{title}</Text>}
						{!!amount && (
							<View className="flex-row items-center p-1 rounded bg-translucent-dark-100">
								<Text className="text-xs">{amount}</Text>
							</View>
						)}
					</View>
				)}
			</View>

			<View className="flex-row items-center gap-2">
				<Text className="text-xs text-translucent-light-150">{age}</Text>
				<Thumbnail icon={logo} size="sm" variant="light" rounded={false} />
			</View>
		</View>
	);
}
