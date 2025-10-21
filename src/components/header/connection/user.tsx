import type ControllerConnector from "@cartridge/connector/controller";
import { useAccount, useDisconnect } from "@starknet-react/core";
import { useCallback } from "react";
import { Pressable, View } from "react-native";
import { Button, DisconnectIcon, Text, UserAvatar } from "#components";

export function User() {
	const { account, connector } = useAccount();
	const { isConnected } = useAccount();
	const { disconnect } = useDisconnect();

	const handleProfilePress = useCallback(() => {
		const controller = (connector as unknown as ControllerConnector)
			?.controller;
		if (!controller) {
			console.error("Connector not initialized");
			return;
		}
		controller.openProfile();
	}, [connector]);

	const handleDisconnect = useCallback(() => {
		disconnect();
	}, [disconnect]);

	if (!isConnected || !account) return null;

	return (
		<View className="flex-row items-center gap-3">
			<Button
				variant="secondary"
				className="bg-background-100 px-3 py-2.5"
				onPress={handleProfilePress}
			>
				<View className="size-5 flex items-center justify-center">
					<UserAvatar username={account.address} size="sm" />
				</View>
				<Text className="text-sm font-medium">
					{account.address.slice(0, 6)}...
				</Text>
			</Button>
			<Pressable
				onPress={handleDisconnect}
				className="p-2 rounded bg-background-100 active:bg-background-150"
			>
				<DisconnectIcon size="default" />
			</Pressable>
		</View>
	);
}
