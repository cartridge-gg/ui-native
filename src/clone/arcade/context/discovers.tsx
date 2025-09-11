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

export const DiscoversContext = createContext<DiscoversContextType | null>(
	mockedValue as unknown as DiscoversContextType,
);

export function DiscoversProvider({ children }: { children: ReactNode }) {
	return (
		<DiscoversContext.Provider
			value={mockedValue as unknown as DiscoversContextType}
		>
			{children}
		</DiscoversContext.Provider>
	);
}
