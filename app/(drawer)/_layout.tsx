import { Stack } from "expo-router";

export default function DrawerStackLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(tabs)" />
			<Stack.Screen name="collection" options={{ presentation: "modal" }} />
		</Stack>
	);
}
