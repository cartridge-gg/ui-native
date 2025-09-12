import { createContext, type ReactNode } from "react";
import mockedValue from "./discover.mock.json";

export type Discover = {
	identifier: string;
	project: string;
	callerAddress: string;
	start: number;
	end: number;
	count: number;
	actions: string[];
	achievements: {
		title: string;
		icon: string;
		points: number;
	}[];
};

export type DiscoversContextType = {
	playthroughs: { [key: string]: Discover[] };
	usernames: { [key: string]: string | undefined };
	status: "success" | "error" | "idle" | "loading";
};

const initialState = {
	...mockedValue,
	status: "success",
} as DiscoversContextType;

export const DiscoversContext = createContext<DiscoversContextType | null>(
	initialState,
);

export function DiscoversProvider({ children }: { children: ReactNode }) {
	return (
		<DiscoversContext.Provider value={initialState}>
			{children}
		</DiscoversContext.Provider>
	);
}
