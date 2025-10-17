import { useAccount } from "@starknet-react/core";
import { Link } from "expo-router";
import { Button, Text } from "#components";

export function Connect() {
	const { account, isConnected } = useAccount();

	if (isConnected || !!account) return null;

	return (
		<Link href="/connect" asChild>
			<Button variant="outline">
				<Text className="font-medium text-sm text-primary">Connect</Text>
			</Button>
		</Link>
	);
}
