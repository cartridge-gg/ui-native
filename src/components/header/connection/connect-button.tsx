import { useAccount, useConnect } from "@starknet-react/core";
import { useCallback, useMemo } from "react";
import { Button, Text } from "#components";
import { MobileConnector } from "#utils";

export function ConnectButton() {
	const { account, isConnected } = useAccount();
	const { connect, connectors } = useConnect();

	const connector = useMemo(
		() => MobileConnector.fromConnectors(connectors),
		[connectors],
	);

	const connectWallet = useCallback(async () => {
		try {
			connect({ connector });
		} catch (error) {
			console.error("Connection failed:", error);
		}
	}, [connect, connector]);

	if (isConnected || !!account) return null;

	return (
		<Button variant="outline" onPress={connectWallet}>
			<Text>Connect</Text>
		</Button>
	);
}
