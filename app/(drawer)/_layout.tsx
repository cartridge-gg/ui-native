import { Stack } from "expo-router";

export default function DrawerStackLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="collection" options={{ presentation: "modal" }} />
			<Stack.Screen name="connect" options={{ presentation: "modal" }} />
		</Stack>
	);
}
