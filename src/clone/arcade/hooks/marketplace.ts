import { useCallback, useContext } from "react";
import { getChecksumAddress } from "starknet";
import type { OrderModel } from "#clone/arcade/context/marketplace";
import { MarketplaceContext } from "#clone/arcade/context/marketplace";
import { useAddress } from "./address";

const StatusType = {
	Placed: 0,
	Executed: 1,
	Cancelled: 2,
};

export const useMarketplace = () => {
	const context = useContext(MarketplaceContext);

	if (!context) {
		throw new Error(
			"The `useMarketplace` hook must be used within a `MarketplaceProvider`",
		);
	}

	const { address } = useAddress();
	const { orders, listings, sales, status } = context;

	const getCollectionOrders = useCallback(
		(contractAddress: string) => {
			const collection = getChecksumAddress(contractAddress);
			const collectionOrders = orders[collection];
			if (!collectionOrders) return {};
			return Object.entries(collectionOrders).reduce(
				(acc, [token, orders]) => {
					const filtered = Object.values(orders).filter(
						(order) => !!order && order.status.value === StatusType.Placed,
					);
					if (filtered.length === 0) return acc;
					acc[token] = filtered;
					return acc;
				},
				{} as { [token: string]: OrderModel[] },
			);
		},
		[orders],
	);

	const getListingCount = useCallback(
		(contractAddress: string) => {
			const collection = getChecksumAddress(contractAddress);
			const collectionOrders = orders[collection];
			if (!collectionOrders) return 0;

			const tokenOrders = Object.entries(collectionOrders).reduce(
				(acc, [token, orders]) => {
					const filteredOrders = Object.values(orders).filter(
						(order) =>
							!!order &&
							order.status.value === StatusType.Placed &&
							BigInt(order.owner) === BigInt(address),
					);
					if (filteredOrders.length) {
						acc[token] = filteredOrders;
					}
					return acc;
				},
				{} as { [token: string]: OrderModel[] },
			);

			return Object.values(tokenOrders).length;
		},
		[orders, address],
	);

	const getFloorPrice = useCallback(
		(contractAddress: string) => {
			const collectionOrders = getCollectionOrders(contractAddress);
			const prices = Object.values(collectionOrders)
				.flat()
				.map((order) => parseFloat(order.price))
				.filter((price) => !Number.isNaN(price) && price > 0);

			if (prices.length === 0) return null;
			return Math.min(...prices).toFixed(4);
		},
		[getCollectionOrders],
	);

	const getLastSale = useCallback(
		(contractAddress: string) => {
			const collection = getChecksumAddress(contractAddress);
			const collectionSales = sales[collection];
			if (!collectionSales) return null;

			const allSales = Object.values(collectionSales);
			if (allSales.length === 0) return null;

			const mostRecent = allSales.sort((a, b) => b.timestamp - a.timestamp)[0];
			return mostRecent ? mostRecent.price : null;
		},
		[sales],
	);

	return {
		orders,
		listings,
		sales,
		status,
		getCollectionOrders,
		getListingCount,
		getFloorPrice,
		getLastSale,
	};
};
