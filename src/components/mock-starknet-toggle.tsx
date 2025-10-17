import { View } from "react-native";
import { Button, Text } from "#components";
import { useMockStarknet } from "#utils/mock-starknet";

export function MockStarknetToggle() {
	const { isConnected, setMockConnected, setMockAddress } = useMockStarknet();

	return (
		<View className="fixed bottom-4 right-4 z-50 bg-background-200 border border-primary rounded-lg p-4 gap-3">
			<Text className="text-primary text-sm font-semibold">
				Mock Controls (Dev Only)
			</Text>

			<View className="flex-row gap-2">
				<Button
					variant={isConnected ? "secondary" : "primary"}
					size="sm"
					onPress={() => setMockConnected(false)}
				>
					<Text>Disconnected</Text>
				</Button>
				<Button
					variant={isConnected ? "primary" : "secondary"}
					size="sm"
					onPress={() => setMockConnected(true)}
				>
					<Text>Connected</Text>
				</Button>
			</View>

			<View className="flex-col gap-2">
				<Text className="text-foreground-300 text-xs">Quick Addresses:</Text>
				<View className="flex-row flex-wrap gap-2">
					<Button
						variant="tertiary"
						size="sm"
						onPress={() =>
							setMockAddress("0x1234567890abcdef1234567890abcdef12345678")
						}
					>
						<Text className="text-xs">Short</Text>
					</Button>
					<Button
						variant="tertiary"
						size="sm"
						onPress={() =>
							setMockAddress(
								"0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd",
							)
						}
					>
						<Text className="text-xs">Long</Text>
					</Button>
				</View>
			</View>

			<Text className="text-foreground-400 text-xs">
				Status: {isConnected ? "Connected" : "Disconnected"}
			</Text>
		</View>
	);
}
