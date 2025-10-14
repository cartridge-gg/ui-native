import { Stack } from "expo-router";

export default function CollectionLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="filter" options={{ presentation: "modal" }} />
			<Stack.Screen name="asset" />
		</Stack>
	);
}
