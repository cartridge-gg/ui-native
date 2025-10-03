import { useMemo } from "react";
import { FlatList, View } from "react-native";
import { useAchievements } from "#clone/arcade/hooks/achievements";
import { PlayerHeader, Text } from "#components";

export function AchievementScene() {
	const { achievements, isLoading, isError } = useAchievements();

	// Get all achievements across all projects
	const allAchievements = useMemo(() => {
		return Object.values(achievements).flat();
	}, [achievements]);

	if (isError) return <EmptyState />;
	if (isLoading) return <LoadingState />;
	if (allAchievements.length === 0) return <EmptyState />;

	return (
		<FlatList
			data={allAchievements}
			className="flex-1"
			ListHeaderComponent={<PlayerHeader />}
			contentContainerStyle={{
				paddingHorizontal: 16,
				paddingBottom: 32,
				gap: 12,
			}}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => <AchievementCard achievement={item} />}
		/>
	);
}

interface Achievement {
	id: string;
	title?: string;
	completed: boolean;
	earning?: number;
	percentage?: string;
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
	return (
		<View className="flex-row items-center gap-3 p-3 bg-background-200 rounded-lg">
			<View className="size-12 rounded bg-background-100 items-center justify-center">
				{achievement.completed ? (
					<Text className="text-2xl">🏆</Text>
				) : (
					<Text className="text-2xl opacity-30">🏆</Text>
				)}
			</View>
			<View className="flex-1">
				<Text className="text-sm font-medium">
					{achievement.title || "Achievement"}
				</Text>
				<Text className="text-xs text-foreground-300 mt-0.5">
					{achievement.completed ? "Completed" : "Locked"} •{" "}
					{achievement.earning || 0} pts
				</Text>
				{achievement.percentage && (
					<Text className="text-xs text-foreground-400 mt-0.5">
						{achievement.percentage}% of players
					</Text>
				)}
			</View>
		</View>
	);
}

const LoadingState = () => {
	return (
		<View className="flex-1">
			<PlayerHeader />
			<View className="p-4">
				{Array.from({ length: 10 }, (_, i) => `achievement-skeleton-${i}`).map(
					(key) => (
						<View
							key={key}
							className="h-20 bg-background-200 rounded-lg mb-3"
						/>
					),
				)}
			</View>
		</View>
	);
};

const EmptyState = () => {
	return (
		<View className="flex-1">
			<PlayerHeader />
			<View className="flex-1 items-center justify-center p-4">
				<Text className="text-2xl mb-2">🏆</Text>
				<Text className="text-foreground-300 text-center">
					No achievements exist for this game
				</Text>
			</View>
		</View>
	);
};
