import { useAccount } from "@starknet-react/core";
import { Connect } from "./connect";
import { ConnectButton } from "./connect-button";
import { User } from "./user";

export function Connection() {
	const { account, isConnected } = useAccount();

	if (!isConnected || !account) return <Connect />;
	return <User />;
}

export function ConnectionAction() {
	const { account, isConnected } = useAccount();

	if (!isConnected || !account) return <ConnectButton />;
	return <User />;
}
