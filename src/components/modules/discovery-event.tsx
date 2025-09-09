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
		<View className="relative select-none h-11 flex-row items-center justify-between px-3 py-2">
			<View
				className="absolute h-10 left-0 right-0 top-0 opacity-10"
				style={{ backgroundColor: color ?? "transparent" }}
			/>

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
	title,
	amount,
}: {
	count?: number;
	actions?: string[];
	points?: number;
	title?: string;
	amount?: string;
}) {
	// Rich event rendering (performed X actions and earned Y points)
	if (typeof count === "number") {
		return (
			<View className="flex-row items-center gap-1.5">
				<Sentence content="performed" />
				<Badge
					text={
						count === 1
							? (actions?.[0]?.replace(/_/g, " ") ?? "1 action")
							: `${count} Actions`
					}
				/>
				{(points || 0) > 0 && (
					<View className="flex-row items-center gap-1.5">
						<Sentence content="and earned" />
						<Badge text={`${points}`} />
					</View>
				)}
			</View>
		);
	}
	// Fallback simplified summary (title/amount)
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

function Badge({ text }: { text: string }) {
	return (
		<View className="flex-row items-center gap-0.5 p-1 rounded bg-translucent-dark-100">
			<Text className="text-xs capitalize">{text}</Text>
		</View>
	);
}

function Sentence({ content }: { content: string }) {
	// Keep minimal on mobile (no hidden/visible breakpoints)
	return <Text className="text-sm text-translucent-light-150">{content}</Text>;
}
