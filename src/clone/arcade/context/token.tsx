import { createContext, type ReactNode, useMemo, useEffect, useState } from "react";
import { useAccount } from "@starknet-react/core";
import { useCartridgeBalances } from "../../../../../../hooks/useCartridgeBalances";
import { useCredits } from "../../../../../../hooks/useCredits";

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

export function TokenProvider({ children }: { children: ReactNode }) {
	const { address, status: accountStatus, account } = useAccount();
	const [username, setUsername] = useState<string | null>(null);
	
	// Get username from session
	useEffect(() => {
		if (accountStatus === "connected" && account) {
			try {
				const mobileAccount = account as any;
				if (mobileAccount.getSessionInfo) {
					const info = mobileAccount.getSessionInfo();
					if (info?.username) {
						setUsername(info.username);
					}
				}
			} catch (e) {
				console.error('Failed to get username:', e);
			}
		} else {
			setUsername(null);
		}
	}, [accountStatus, account]);
	
	// Fetch credits and token balances
	const { 
		credits: creditsData, 
		loading: creditsLoading, 
		error: creditsError 
	} = useCredits(username || undefined);
	
	const { 
		balances: cartridgeBalances, 
		loading: balancesLoading, 
		error: balancesError 
	} = useCartridgeBalances(address);
	
	// Convert our data to Token format
	const tokens: Token[] = useMemo(() => {
		return cartridgeBalances.map(balance => ({
			balance: {
				amount: balance.amount,
				value: balance.value,
				change: balance.value - (balance.amount * balance.meta.periodPrice),
			},
			metadata: {
				name: balance.meta.name || 'Unknown',
				symbol: balance.meta.symbol || '?',
				decimals: balance.meta.decimals,
				address: balance.meta.project,
			},
		}));
	}, [cartridgeBalances]);
	
	// Convert credits to Token format
	const credits: Token = useMemo(() => {
		if (!creditsData) {
			return {
				balance: { amount: 0, value: 0, change: 0 },
				metadata: {
					name: "Credits",
					symbol: "CREDITS",
					decimals: 18,
					project: "arcade",
				},
			};
		}
		
		const amount = parseFloat(creditsData.amount) / Math.pow(10, creditsData.decimals);
		return {
			balance: {
				amount,
				value: amount,
				change: 0, // Credits don't have price changes
			},
			metadata: {
				name: "Credits",
				symbol: "CREDITS",
				decimals: creditsData.decimals,
				project: "arcade",
			},
		};
	}, [creditsData]);
	
	// Determine status
	let status: "success" | "error" | "idle" | "loading" = "idle";
	if (creditsLoading || balancesLoading) {
		status = "loading";
	} else if (creditsError || balancesError) {
		status = "error";
	} else if (accountStatus === "connected") {
		status = "success";
	}

	return (
		<TokenContext.Provider
			value={{
				tokens,
				credits,
				status,
			}}
		>
			{children}
		</TokenContext.Provider>
	);
}
