import { createContext, type ReactNode, useMemo } from "react";

export interface OrderModel {
	contractAddress: string;
	tokenId: string;
	owner: string;
	price: string;
	status: { value: number };
}

interface MarketplaceContextType {
	orders: {
		[collection: string]: { [token: string]: { [id: string]: OrderModel } };
	};
	listings: { [collection: string]: string[] };
	sales: {
		[collection: string]: {
			[token: string]: { price: string; timestamp: number };
		};
	};
	status: "success" | "error" | "idle" | "loading";
}

export const MarketplaceContext = createContext<MarketplaceContextType | null>(
	null,
);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
	const orders = useMemo(() => {
		return {};
	}, []);

	const listings = useMemo(() => {
		return {};
	}, []);

	const sales = useMemo(() => {
		return {};
	}, []);

	return (
		<MarketplaceContext.Provider
			value={{
				orders,
				listings,
				sales,
				status: "success",
			}}
		>
			{children}
		</MarketplaceContext.Provider>
	);
}
