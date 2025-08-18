import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Button, SonnerToaster, Spinner, Text } from "#components";
import { MobileConnector } from "#utils";

export default function RootScreen() {
	const { connect, connectors, error } = useConnect();
	const { status } = useAccount();
	const { disconnect } = useDisconnect();

	const connector = useMemo(
		() => MobileConnector.fromConnectors(connectors),
		[connectors],
	);

	const onConnect = useCallback(() => {
		connect({ connector });
	}, [connect]);

	useEffect(() => {
		if (error) {
			console.error(error);
		}
	}, [error]);

	return (
		<View className="flex-1 items-center justify-center bg-background-100 gap-4">
			<Text className="text-2xl font-bold">Cartridge Marketplace</Text>
			{(() => {
				switch (status) {
					case "connected":
						return (
							<Button onPress={() => disconnect()}>
								<Text>Disconnect</Text>
							</Button>
						);
					case "disconnected":
						return (
							<Button onPress={onConnect}>
								<Text>Connect</Text>
							</Button>
						);
					default:
						return <Spinner />;
				}
			})()}
			<SonnerToaster />
		</View>
	);
}
