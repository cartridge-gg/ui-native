import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "#components";

export default function Session() {
	const global = useGlobalSearchParams();
	const local = useLocalSearchParams();

	return (
		<View>
			<Text>Session</Text>
			<Text>{JSON.stringify({ global, local }, null, 2)}</Text>
		</View>
	);
}
