import { router } from "expo-router";
import { View } from "react-native";
import { Button, SonnerToaster, Text } from "#components";

export default function RootScreen() {
	return (
		<View className="flex-1 items-center justify-center bg-background-100 gap-4">
			<Text className="text-2xl font-bold">Cartridge Marketplace</Text>
			<Button onPress={() => router.push("/connect")}>
				<Text>Connect</Text>
			</Button>
			<SonnerToaster />
		</View>
	);
}
