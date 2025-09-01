import { View } from "react-native";
import { ArcadeHeader, Text } from "#components";

export default function MarketplaceScreen() {
	return (
		<View className="flex-1 bg-background">
			<ArcadeHeader
				onMenuPress={() => console.log("Menu pressed")}
				onSearchPress={() => console.log("Search pressed")}
				onConnectPress={() => console.log("Connect pressed")}
			/>
			<View className="flex-1 items-center justify-center px-4">
				<Text className="text-foreground text-xl font-semibold">
					Marketplace
				</Text>
				<Text className="text-muted-foreground mt-2 text-center">
					Marketplace items will appear here
				</Text>
			</View>
		</View>
	);
}
