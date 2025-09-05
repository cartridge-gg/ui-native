import { useLocalSearchParams, usePathname } from "expo-router";
import { View } from "react-native";
import { Text } from "#components/primitives";

export function ScreenInfo() {
	const pathname = usePathname();
	const params = useLocalSearchParams();
	return (
		<View className="flex-1 items-center justify-center px-4">
			<Text className="text-xl font-semibold">Path</Text>
			<Text className="text-foreground-400 mt-1 text-center">{pathname}</Text>
			<Text className="text-xl font-semibold mt-4">Params</Text>
			<Text className="text-foreground-400 mt-1 text-center">
				{JSON.stringify(params)}
			</Text>
		</View>
	);
}
