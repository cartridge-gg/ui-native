import { createContext, type ReactNode, useContext, useState } from "react";
import type { AccountInterface, ProviderInterface } from "starknet";

interface MockAccountState {
	address: string;
	isConnected: boolean;
}

interface MockConnector {
	id: string;
	name: string;
	controller: {
		openProfile: () => void;
	};
}

interface MockStarknetContextValue {
	account: AccountInterface | undefined;
	address: string | undefined;
	connector: MockConnector;
	isConnected: boolean;
	connect: (options?: unknown) => Promise<void>;
	disconnect: () => void;
	setMockConnected: (connected: boolean) => void;
	setMockAddress: (address: string) => void;
}

const MockStarknetContext = createContext<MockStarknetContextValue | null>(
	null,
);

export function MockStarknetProvider({ children }: { children: ReactNode }) {
	const [accountState, setAccountState] = useState<MockAccountState>({
		address: "0x1234567890abcdef1234567890abcdef12345678",
		isConnected: false,
	});

	const mockAccount = accountState.isConnected
		? ({
				address: accountState.address,
				getChainId: async () => "0x534e5f4d41494e",
				signMessage: async (message: unknown) => {
					console.log("Mock sign message:", message);
					return ["0x123", "0x456"];
				},
				execute: async (calls: unknown) => {
					console.log("Mock execute:", calls);
					return {
						transaction_hash: "0xmockhash",
					};
				},
			} as unknown as AccountInterface)
		: undefined;

	const mockConnector: MockConnector = {
		id: "controller_mobile",
		name: "Controller Mobile (Mock)",
		controller: {
			openProfile: () => {
				console.log("Mock: Opening profile");
			},
		},
	};

	const connect = async (options?: unknown) => {
		console.log("Mock: Connecting with options:", options);
		// Simulate connection delay
		await new Promise((resolve) => setTimeout(resolve, 500));
		setAccountState((prev) => ({ ...prev, isConnected: true }));
	};

	const disconnect = () => {
		console.log("Mock: Disconnecting");
		setAccountState((prev) => ({ ...prev, isConnected: false }));
	};

	const setMockConnected = (connected: boolean) => {
		setAccountState((prev) => ({ ...prev, isConnected: connected }));
	};

	const setMockAddress = (address: string) => {
		setAccountState((prev) => ({ ...prev, address }));
	};

	const value: MockStarknetContextValue = {
		account: mockAccount,
		address: accountState.isConnected ? accountState.address : undefined,
		connector: mockConnector,
		isConnected: accountState.isConnected,
		connect,
		disconnect,
		setMockConnected,
		setMockAddress,
	};

	return (
		<MockStarknetContext.Provider value={value}>
			{children}
		</MockStarknetContext.Provider>
	);
}

export function useMockStarknet() {
	const context = useContext(MockStarknetContext);
	if (!context) {
		throw new Error("useMockStarknet must be used within MockStarknetProvider");
	}
	return context;
}

// Mock implementations of starknet-react hooks
export function useAccount() {
	const context = useContext(MockStarknetContext);
	if (!context) {
		return {
			account: undefined,
			address: undefined,
			connector: undefined,
			isConnected: false,
			status: "disconnected" as const,
		};
	}

	return {
		account: context.account,
		address: context.address,
		connector: context.connector,
		isConnected: context.isConnected,
		status: context.isConnected
			? ("connected" as const)
			: ("disconnected" as const),
	};
}

export function useConnect() {
	const context = useContext(MockStarknetContext);
	if (!context) {
		return {
			connect: async () => {},
			connectors: [],
			isPending: false,
			error: undefined,
		};
	}

	const mockConnectors = [
		{
			id: "controller_mobile",
			name: "Controller Mobile",
			icon: "data:image/svg+xml;base64,...",
		},
	];

	return {
		connect: context.connect,
		connectors: mockConnectors,
		isPending: false,
		error: undefined,
	};
}

export function useDisconnect() {
	const context = useContext(MockStarknetContext);
	if (!context) {
		return {
			disconnect: () => {},
			isPending: false,
		};
	}

	return {
		disconnect: context.disconnect,
		isPending: false,
	};
}

export function useProvider() {
	return {
		provider: {
			getChainId: async () => "0x534e5f4d41494e",
		} as unknown as ProviderInterface,
	};
}
