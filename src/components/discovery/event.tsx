import { useMemo } from "react";
import { View } from "react-native";
import { Text, Thumbnail } from "#components";
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
	actions?: string[];
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
	actions = [],
	achievements = [],
	logo,
	// color,
	title,
	amount,
}: DiscoveryEventProps) {
	const age = useMemo(() => formatAge(timestamp), [timestamp]);
	const points = useMemo(
		() => achievements.reduce((acc, a) => acc + (a.points || 0), 0),
		[achievements],
	);

	return (
		<View className="relative select-none h-11 flex-row items-center justify-between px-3 py-2">
			<View className="absolute h-10 left-0 right-0 top-0 opacity-10" />

			<View className="flex-1 flex-row items-center gap-1.5">
				{!!Icon && <View>{Icon}</View>}
				<Text
					className="text-sm font-normal tracking-normal text-foreground-100"
					numberOfLines={1}
				>
					{name}
				</Text>
				<DiscoverySummary
					count={count}
					actions={actions}
					points={points}
					achievements={achievements}
					title={title}
					amount={amount}
				/>
			</View>

			<View className="flex-row items-center gap-2">
				<Text className="text-xs text-translucent-light-150">{age}</Text>
				<Thumbnail icon={logo} size="sm" variant="default" rounded={false} />
			</View>
		</View>
	);
}

function DiscoverySummary({
	count,
	actions,
	points,
	achievements,
	title,
	amount,
}: {
	count?: number;
	actions?: string[];
	points?: number;
	achievements?: DiscoveryAchievement[];
	title?: string;
	amount?: string;
}) {
	// Enhanced summary logic matching desktop complexity
	if (typeof count === "number" && count > 0) {
		return (
			<View className="flex-1 flex-row items-center gap-1 flex-wrap">
				<Sentence content="performed" />
				<Badge
					text={
						count === 1
							? (actions?.[0]?.replace(/_/g, " ") ?? "1 action")
							: `${count} Actions`
					}
				/>
				{(points || 0) > 0 && (
					<View className="flex-row items-center gap-1">
						<Sentence content="and earned" />
						{/* Show individual achievement badges on mobile */}
						{achievements &&
						achievements.length > 0 &&
						achievements.length <= 2 ? (
							achievements.map((achievement, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: TODO
								<AchievementBadge key={i} achievement={achievement} />
							))
						) : achievements && achievements.length > 2 ? (
							<Badge text={`${achievements.length} achievements`} />
						) : null}
						<Badge text={`${points} pts`} variant="points" />
					</View>
				)}
			</View>
		);
	}

	// Fallback for simple events
	return (
		<View className="flex-row items-center gap-1.5">
			{!!title && <Text className="text-sm font-normal">{title}</Text>}
			{!!amount && (
				<View className="flex-row items-center p-1 rounded bg-translucent-dark-100">
					<Text className="text-xs">{amount}</Text>
				</View>
			)}
		</View>
	);
}

function Badge({
	text,
	variant = "default",
}: {
	text: string;
	variant?: "default" | "points";
}) {
	return (
		<View
			className={`flex-row items-center gap-0.5 p-1 rounded ${
				variant === "points" ? "bg-primary/20" : "bg-translucent-dark-100"
			}`}
		>
			<Text
				className={`text-xs capitalize ${
					variant === "points" ? "text-primary" : "text-foreground"
				}`}
			>
				{text}
			</Text>
		</View>
	);
}

function AchievementBadge({
	achievement,
}: {
	achievement: DiscoveryAchievement;
}) {
	return (
		<View className="flex-row items-center gap-0.5 p-1 rounded bg-accent/20">
			<Text className="text-xs">{achievement.icon}</Text>
			<Text className="text-xs text-accent font-medium">
				+{achievement.points}
			</Text>
		</View>
	);
}

function Sentence({ content }: { content: string }) {
	// Keep minimal on mobile but visible
	return <Text className="text-sm text-translucent-light-150">{content}</Text>;
}
