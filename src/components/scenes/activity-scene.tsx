import { View } from "react-native";
import { Text } from "#components";

export function ActivityScene() {
	return (
		<View className="flex-1 p-4">
			<Text className="text-lg font-semibold mb-4">Activity</Text>
			<View className="flex-1 items-center justify-center">
				<Text className="text-foreground-300 text-center">
					Activity content coming soon...
				</Text>
			</View>
		</View>
	);
}
