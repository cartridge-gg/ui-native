import type { SessionPolicies } from "@cartridge/controller";
import type { Chain } from "@starknet-react/chains";
import { mainnet, sepolia } from "@starknet-react/chains";
import type { Connector } from "@starknet-react/core";
import { jsonRpcProvider, StarknetConfig } from "@starknet-react/core";
import type { PropsWithChildren } from "react";
import { constants } from "starknet";
import { MobileConnector } from "#utils/controller";
import { MockStarknetProvider } from "./mock-starknet";

// Enable mock mode for testing UI
// Set this to true to use mock providers, false to use real Starknet
const USE_MOCK_MODE = process.env.EXPO_PUBLIC_MOCK_STARKNET === "true";

const RPC_SEPOLIA_URL = "https://api.cartridge.gg/x/starknet/sepolia";
const RPC_MAINNET_URL = "https://api.cartridge.gg/x/starknet/mainnet";

const ETH_CONTRACT_ADDRESS =
	"0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
const STRK_CONTRACT_ADDRESS =
	"0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";

const messageForChain = (chainId: constants.StarknetChainId) => {
	return {
		types: {
			StarknetDomain: [
				{ name: "name", type: "shortstring" },
				{ name: "version", type: "shortstring" },
				{ name: "chainId", type: "shortstring" },
			],
			Message: [{ name: "message", type: "string" }],
		},
		primaryType: "Message",
		message: {
			message: "Sign this message to confirm your identity.",
		},
		domain: {
			name: "Example DApp",
			version: "1",
			chainId: chainId,
		},
	};
};

const policies: SessionPolicies = {
	contracts: {
		[ETH_CONTRACT_ADDRESS]: {
			methods: [
				{
					name: "approve",
					entrypoint: "approve",
					description:
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
				},
				{ name: "transfer", entrypoint: "transfer" },
				{ name: "mint", entrypoint: "mint" },
				{ name: "burn", entrypoint: "burn" },
				{ name: "allowance", entrypoint: "allowance" },
			],
		},
		[STRK_CONTRACT_ADDRESS]: {
			methods: [
				{
					name: "approve",
					entrypoint: "approve",
					description:
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
				},
				{ name: "transfer", entrypoint: "transfer" },
				{ name: "mint", entrypoint: "mint" },
				{ name: "burn", entrypoint: "burn" },
				{ name: "allowance", entrypoint: "allowance" },
			],
		},
		"0x0305f26ad19e0a10715d9f3137573d3a543de7b707967cd85d11234d6ec0fb7e": {
			methods: [{ name: "new_game", entrypoint: "new_game" }],
		},
	},
	messages: [
		messageForChain(constants.StarknetChainId.SN_MAIN),
		messageForChain(constants.StarknetChainId.SN_SEPOLIA),
	],
};

const controller = new MobileConnector({
	policies,
}) as unknown as Connector;

const provider = jsonRpcProvider({
	rpc: (chain: Chain) => {
		switch (chain.id) {
			case mainnet.id:
				return { nodeUrl: RPC_MAINNET_URL };
			case sepolia.id:
				return { nodeUrl: RPC_SEPOLIA_URL };
			default:
				return null;
		}
	},
});

export function StarknetProvider({ children }: PropsWithChildren) {
	if (USE_MOCK_MODE) {
		console.log("🎭 Using MOCK Starknet Provider");
		return <MockStarknetProvider>{children}</MockStarknetProvider>;
	}

	console.log("🔗 Using REAL Starknet Provider");
	return (
		<StarknetConfig
			defaultChainId={mainnet.id}
			chains={[mainnet, sepolia]}
			connectors={[controller]}
			provider={provider}
		>
			{children}
		</StarknetConfig>
	);
}
