import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "#components";

export default function MarketplaceScreen() {
	return (
		<SafeAreaView className="flex-1 bg-background">
			<View className="flex-1 items-center justify-center">
				<Text className="text-foreground text-xl font-semibold">
					Marketplace
				</Text>
				<Text className="text-muted-foreground mt-2">
					Marketplace items will appear here
				</Text>
			</View>
		</SafeAreaView>
	);
}
