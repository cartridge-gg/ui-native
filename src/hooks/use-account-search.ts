import { useCallback, useEffect, useState } from "react";
import type {
	AccountSearchResult,
	ValidationState,
} from "#components/username-input";

interface UseAccountSearchOptions {
	minLength?: number;
	debounceMs?: number;
	maxResults?: number;
	enabled?: boolean;
}

interface UseAccountSearchResult {
	results: AccountSearchResult[];
	isLoading: boolean;
	error?: Error;
}

// Mock data for demonstration
const MOCK_ACCOUNTS: AccountSearchResult[] = [
	{ username: "alice", type: "existing", points: 1250, avatar: undefined },
	{ username: "alex", type: "existing", points: 890, avatar: undefined },
	{ username: "albert", type: "existing", points: 2100, avatar: undefined },
	{ username: "bob", type: "existing", points: 750, avatar: undefined },
	{ username: "charlie", type: "existing", points: 3200, avatar: undefined },
	{ username: "david", type: "existing", points: 450, avatar: undefined },
	{ username: "eve", type: "existing", points: 1800, avatar: undefined },
	{ username: "frank", type: "existing", points: 950, avatar: undefined },
	{ username: "grace", type: "existing", points: 2800, avatar: undefined },
	{ username: "henry", type: "existing", points: 1200, avatar: undefined },
];

export function useAccountSearch(
	query: string,
	options: UseAccountSearchOptions = {},
): UseAccountSearchResult {
	const {
		minLength = 1,
		debounceMs = 300,
		maxResults = 5,
		enabled = true,
	} = options;

	const [results, setResults] = useState<AccountSearchResult[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | undefined>(undefined);

	const searchAccounts = useCallback(
		async (searchQuery: string) => {
			if (!enabled || searchQuery.length < minLength) {
				setResults([]);
				setIsLoading(false);
				return;
			}

			setIsLoading(true);
			setError(undefined);

			try {
				// Simulate API delay
				await new Promise((resolve) => setTimeout(resolve, 200));

				// Filter mock accounts based on query
				const filtered = MOCK_ACCOUNTS.filter((account) =>
					account.username.toLowerCase().includes(searchQuery.toLowerCase()),
				);

				// Add "create new" option if no exact match
				const hasExactMatch = filtered.some(
					(account) =>
						account.username.toLowerCase() === searchQuery.toLowerCase(),
				);

				let searchResults = filtered.slice(0, maxResults);

				if (!hasExactMatch && searchQuery.length >= 2) {
					searchResults = [
						{ username: searchQuery, type: "create-new" },
						...searchResults,
					];
				}

				setResults(searchResults);
			} catch (err) {
				setError(err instanceof Error ? err : new Error("Search failed"));
				setResults([]);
			} finally {
				setIsLoading(false);
			}
		},
		[enabled, minLength, maxResults],
	);

	// Debounced search effect
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			searchAccounts(query);
		}, debounceMs);

		return () => clearTimeout(timeoutId);
	}, [query, searchAccounts, debounceMs]);

	return {
		results,
		isLoading,
		error,
	};
}

export function useUsernameValidation(
	username: string,
	options: { debounceMs?: number } = {},
): ValidationState {
	const { debounceMs = 500 } = options;
	const [validation, setValidation] = useState<ValidationState>({
		status: "idle",
	});

	const validateUsername = useCallback(async (name: string) => {
		if (name.length === 0) {
			setValidation({ status: "idle" });
			return;
		}

		if (name.length < 2) {
			setValidation({
				status: "invalid",
				message: "Username must be at least 2 characters",
			});
			return;
		}

		if (name.length > 20) {
			setValidation({
				status: "invalid",
				message: "Username must be less than 20 characters",
			});
			return;
		}

		if (!/^[a-z0-9_-]+$/.test(name)) {
			setValidation({
				status: "invalid",
				message:
					"Username can only contain lowercase letters, numbers, hyphens, and underscores",
			});
			return;
		}

		setValidation({ status: "validating" });

		try {
			// Simulate API validation delay
			await new Promise((resolve) => setTimeout(resolve, 300));

			// Check if username exists in mock data
			const exists = MOCK_ACCOUNTS.some(
				(account) => account.username.toLowerCase() === name.toLowerCase(),
			);

			setValidation({
				status: "valid",
				exists,
				message: exists ? "Username found" : "Username available",
			});
		} catch (_err) {
			setValidation({
				status: "invalid",
				message: "Failed to validate username",
			});
		}
	}, []);

	// Debounced validation effect
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			validateUsername(username);
		}, debounceMs);

		return () => clearTimeout(timeoutId);
	}, [username, validateUsername, debounceMs]);

	return validation;
}
