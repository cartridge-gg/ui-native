import { ScrollView, View } from "react-native";
import { useArcade } from "#clone/arcade/hooks/arcade";
import { Text } from "#components";

export default function ActivityScreen() {
	const { games } = useArcade();

	return (
		<View className="flex-1 bg-background-100">
			<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
				<View className="p-4 space-y-4">
					<Text className="text-foreground-400 text-lg font-semibold">
						Recent
					</Text>

					{games.length > 0 ? (
						<View className="space-y-3">
							{games.slice(0, 5).map((game) => (
								<View
									key={game.id}
									className="bg-background-200 p-3 rounded-lg"
								>
									<Text className="text-foreground font-medium">
										{game.name}
									</Text>
									<Text className="text-foreground-400 text-sm mt-1">
										{game.description}
									</Text>
								</View>
							))}
						</View>
					) : (
						<View className="items-center justify-center py-8">
							<Text className="text-foreground-400 text-center">
								No recent activity
							</Text>
						</View>
					)}
				</View>
			</ScrollView>
		</View>
	);
}
