import { createContext, type ReactNode } from "react";
import achievementMock from "./achievement.mock.json";

type AchievementContextType = {
	// biome-ignore lint/suspicious/noExplicitAny: Mock data types
	achievements: { [game: string]: any[] };
	// biome-ignore lint/suspicious/noExplicitAny: Mock data types
	players: { [game: string]: any[] };
	// biome-ignore lint/suspicious/noExplicitAny: Mock data types
	events: { [game: string]: any[] };
	usernames: { [key: string]: string | undefined };
	// biome-ignore lint/suspicious/noExplicitAny: Mock data types
	globals: any[];
	isLoading: boolean;
	isError: boolean;
};

const initialState = {
	...achievementMock,
	isLoading: false,
	isError: false,
} as AchievementContextType;

export const AchievementContext =
	createContext<AchievementContextType>(initialState);

export function AchievementProvider({ children }: { children: ReactNode }) {
	return (
		<AchievementContext.Provider value={initialState}>
			{children}
		</AchievementContext.Provider>
	);
}
