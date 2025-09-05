import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "#components";

export default function EditionScreen() {
	const { edition } = useLocalSearchParams<{ edition?: string }>();
	return (
		<View className="flex-1 bg-background-100 items-center justify-center px-4">
			<Text className="text-foreground text-xl font-semibold">Edition</Text>
			<Text className="text-muted-foreground mt-2 text-center">
				{String(edition)}
			</Text>
		</View>
	);
}
