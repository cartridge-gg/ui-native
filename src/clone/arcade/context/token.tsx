import { createContext, type ReactNode, useState } from "react";

export type Balance = {
	amount: number;
	value: number;
	change: number;
};

export type Metadata = {
	name: string;
	symbol: string;
	decimals: number;
	address?: string;
	image?: string;
	project?: string;
};

export type Token = {
	balance: Balance;
	metadata: Metadata;
};

export type TokenContextType = {
	tokens: Token[];
	credits: Token;
	status: "success" | "error" | "idle" | "loading";
};

export const TokenContext = createContext<TokenContextType | null>(null);

// Mock data for development
const MOCK_CREDITS: Token = {
	balance: {
		amount: 1250.5,
		value: 1250.5,
		change: 45.2,
	},
	metadata: {
		name: "Credits",
		symbol: "CREDITS",
		decimals: 18,
		address: "0x123",
		project: "arcade",
	},
};

const MOCK_TOKENS: Token[] = [
	{
		balance: {
			amount: 0.5,
			value: 1580.25,
			change: 25.5,
		},
		metadata: {
			name: "Ethereum",
			symbol: "ETH",
			decimals: 18,
			address:
				"0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
		},
	},
	{
		balance: {
			amount: 1000,
			value: 850.0,
			change: -12.3,
		},
		metadata: {
			name: "Starknet Token",
			symbol: "STRK",
			decimals: 18,
			address:
				"0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D",
		},
	},
	{
		balance: {
			amount: 250,
			value: 250.0,
			change: 0,
		},
		metadata: {
			name: "Lords",
			symbol: "LORDS",
			decimals: 18,
			address:
				"0x0124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49",
		},
	},
];

export function TokenProvider({ children }: { children: ReactNode }) {
	const [status] = useState<"success" | "error" | "idle" | "loading">(
		"success",
	);

	return (
		<TokenContext.Provider
			value={{
				tokens: MOCK_TOKENS,
				credits: MOCK_CREDITS,
				status,
			}}
		>
			{children}
		</TokenContext.Provider>
	);
}
