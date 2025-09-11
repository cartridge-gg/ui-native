import { createContext, type ReactNode } from "react";

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

export const AchievementContext = createContext<AchievementContextType | null>(
	null,
);

export function AchievementProvider({ children }: { children: ReactNode }) {
	// For now, provide empty data structure
	// This can be implemented later with full achievement logic
	const value: AchievementContextType = {
		achievements: {},
		players: {},
		events: {},
		usernames: {},
		globals: [],
		isLoading: false,
		isError: false,
	};

	return (
		<AchievementContext.Provider value={value}>
			{children}
		</AchievementContext.Provider>
	);
}
