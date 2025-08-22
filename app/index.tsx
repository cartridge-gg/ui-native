import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { Link, Stack } from "expo-router";
import { useCallback, useMemo } from "react";
import { SafeAreaView } from "react-native";
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
	}, [connect, connector]);

	return (
		<SafeAreaView className="flex-1 items-center justify-center bg-background-100 gap-4">
			<Stack.Screen options={{ title: "Controller Example (Mobile)" }} />
			{(() => {
				switch (status) {
					case "disconnected":
						return (
							<>
								<Button onPress={onConnect}>
									<Text>Connect</Text>
								</Button>
								{error && <Text>{error.message}</Text>}
							</>
						);
					case "connected":
						return (
							<>
								<Link href="/sign-message" asChild>
									<Button>
										<Text>Sign Message</Text>
									</Button>
								</Link>

								<Button onPress={() => disconnect()}>
									<Text>Disconnect</Text>
								</Button>
							</>
						);
					default:
						return <Spinner />;
				}
			})()}
			<SonnerToaster />
		</SafeAreaView>
	);
}
