import { View } from "react-native";
import { Button, SonnerToaster, Text, toast } from "#components";

import "../global.css";

export function Home() {
	return (
		<View className="flex-1 items-center justify-center bg-background-100 gap-2">
			<Text>Cartridge Native UI</Text>
			<Text>Example App</Text>
			<Button onPress={() => toast("Hello from Sonner Native!")}>
				Show Toast
			</Button>
			<SonnerToaster />
		</View>
	);
}
