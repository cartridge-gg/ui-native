import { View } from "react-native";
import { Text } from "#components";

export function InventoryScene() {
	return (
		<View className="flex-1 p-4">
			<Text className="text-lg font-semibold mb-4">Inventory</Text>
			<View className="flex-1 items-center justify-center">
				<Text className="text-foreground-300 text-center">
					Inventory content coming soon...
				</Text>
			</View>
		</View>
	);
}
