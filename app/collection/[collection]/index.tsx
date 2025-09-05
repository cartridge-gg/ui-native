import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "#components";

export default function CollectionScreen() {
	const { collection } = useLocalSearchParams<{ collection?: string }>();
	return (
		<View className="flex-1 bg-background-100 items-center justify-center px-4">
			<Text className="text-foreground text-xl font-semibold">Collection</Text>
			<Text className="text-muted-foreground mt-2 text-center">
				{String(collection)}
			</Text>
		</View>
	);
}
