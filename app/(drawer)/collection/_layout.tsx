import { Stack } from "expo-router";

export default function CollectionLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="[collection]/index" />
			<Stack.Screen
				name="[collection]/filters"
				options={{ presentation: "modal" }}
			/>
		</Stack>
	);
}
