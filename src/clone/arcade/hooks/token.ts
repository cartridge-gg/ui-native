import { useContext } from "react";
import { TokenContext } from "#clone/arcade/context/token";

export function useTokens() {
	const context = useContext(TokenContext);

	if (!context) {
		throw new Error(
			"The `useTokens` hook must be used within a `TokenProvider`",
		);
	}

	return context;
}
