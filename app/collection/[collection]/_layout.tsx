import { Stack } from "expo-router";

export default function CollectionLayout() {
	return (
		<Stack
			screenOptions={{
				presentation: "modal",
				headerShown: false,
				animation: "slide_from_bottom",
			}}
		>
			<Stack.Screen name="index" />
		</Stack>
	);
}
