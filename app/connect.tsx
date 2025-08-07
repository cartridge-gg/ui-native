import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, View } from "react-native";
import { create, get } from "react-native-passkeys";
import { Button, Input, Text, toast } from "#components";
import { CARTRIDGE_API_URL, cn } from "#utils";

interface RegistrationData {
	data: {
		beginRegistration: string | { publicKey: string };
	};
	errors?: Array<{ message: string }>;
}

interface FinalizeRegistrationData {
	data: {
		finalizeRegistration: {
			id: string;
			username: string;
		};
	};
	errors?: Array<{ message: string }>;
}

interface LoginData {
	data: {
		beginLogin: string | { publicKey: string };
	};
	errors?: Array<{ message: string }>;
}

interface FinalizeLoginData {
	data: {
		finalizeLogin: string;
	};
	errors?: Array<{ message: string }>;
}

// Type for WebAuthn challenge options
type ChallengeOptions = Record<string, unknown>;

export default function ConnectScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const [username, setUsername] = useState("");
	const [userExists, setUserExists] = useState<boolean | null>(null);
	const [isCheckingUser, setIsCheckingUser] = useState(false);

	const signup = useCallback(async () => {
		// Step 1: Begin registration - get challenge from server
		const beginRegistrationResponse = await fetch(CARTRIDGE_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `
          mutation BeginRegistration($username: String!) {
            beginRegistration(username: $username)
          }
        `,
				variables: {
					username: username.trim(),
				},
			}),
		});

		if (!beginRegistrationResponse.ok) {
			const errorText = await beginRegistrationResponse.text();
			console.error(
				"Begin registration HTTP error:",
				beginRegistrationResponse.status,
				errorText,
			);
			throw new Error(
				`Failed to get registration challenge from server: ${beginRegistrationResponse.status}`,
			);
		}

		const beginRegistrationText = await beginRegistrationResponse.text();
		console.log("Begin registration response:", beginRegistrationText);

		let beginRegistrationData: RegistrationData;
		try {
			beginRegistrationData = JSON.parse(beginRegistrationText);
		} catch (error) {
			console.error("JSON parse error for begin registration:", error);
			console.error("Response text:", beginRegistrationText);
			throw new Error(
				`Invalid JSON response from server: ${beginRegistrationText.substring(0, 100)}`,
			);
		}

		if (beginRegistrationData.errors) {
			throw new Error(
				`GraphQL error: ${beginRegistrationData.errors[0].message}`,
			);
		}

		let challengeOptions: ChallengeOptions;
		try {
			// Check if the data is already a parsed object or a JSON string
			if (typeof beginRegistrationData.data.beginRegistration === "string") {
				challengeOptions = JSON.parse(
					beginRegistrationData.data.beginRegistration,
				);
			} else {
				challengeOptions = beginRegistrationData.data.beginRegistration;
			}
		} catch (error) {
			console.error("Error parsing challenge options:", error);
			console.error(
				"Challenge data:",
				beginRegistrationData.data.beginRegistration,
			);
			const errorMessage =
				error instanceof Error ? error.message : "Unknown parsing error";
			throw new Error(`Failed to parse challenge options: ${errorMessage}`);
		}

		// Step 2: Create passkey
		const result = await create(
			challengeOptions as Parameters<typeof create>[0],
		);

		if (!result) {
			throw new Error("Passkey creation was cancelled or failed");
		}

		// Step 3: Finalize registration - send credentials to server
		const finalizeRegistrationResponse = await fetch(CARTRIDGE_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `
          mutation FinalizeRegistration($credentials: String!, $network: String!) {
            finalizeRegistration(credentials: $credentials, network: $network) {
              id
              username
            }
          }
        `,
				variables: {
					credentials: JSON.stringify(result),
					network: "mainnet", // You can make this configurable
				},
			}),
		});

		if (!finalizeRegistrationResponse.ok) {
			const errorText = await finalizeRegistrationResponse.text();
			console.error(
				"Finalize registration HTTP error:",
				finalizeRegistrationResponse.status,
				errorText,
			);
			throw new Error(
				`Registration verification failed: ${finalizeRegistrationResponse.status}`,
			);
		}

		const finalizeRegistrationText = await finalizeRegistrationResponse.text();
		console.log("Finalize registration response:", finalizeRegistrationText);

		let finalizeRegistrationData: FinalizeRegistrationData;
		try {
			finalizeRegistrationData = JSON.parse(finalizeRegistrationText);
		} catch (error) {
			console.error("JSON parse error for finalize registration:", error);
			console.error("Response text:", finalizeRegistrationText);
			throw new Error(
				`Invalid JSON response from server: ${finalizeRegistrationText.substring(0, 100)}`,
			);
		}

		if (finalizeRegistrationData.errors) {
			throw new Error(
				`GraphQL error: ${finalizeRegistrationData.errors[0].message}`,
			);
		}

		const account = finalizeRegistrationData.data.finalizeRegistration;
		Alert.alert(
			"Success",
			`Account created successfully! Welcome ${account.username}`,
		);
		console.log("Created account:", account);

		// Update user existence state
		setUserExists(true);
	}, [username]);

	const login = useCallback(async () => {
		// Step 1: Begin login - get challenge from server
		const beginLoginResponse = await fetch(CARTRIDGE_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `
          mutation BeginLogin($username: String!) {
            beginLogin(username: $username)
          }
        `,
				variables: {
					username: username.trim(),
				},
			}),
		});

		if (!beginLoginResponse.ok) {
			const errorText = await beginLoginResponse.text();
			console.error(
				"Begin login HTTP error:",
				beginLoginResponse.status,
				errorText,
			);
			throw new Error(
				`Failed to get challenge from server: ${beginLoginResponse.status}`,
			);
		}

		const beginLoginText = await beginLoginResponse.text();
		console.log("Begin login response:", beginLoginText);

		let beginLoginData: LoginData;
		try {
			beginLoginData = JSON.parse(beginLoginText);
		} catch (error) {
			console.error("JSON parse error for begin login:", error);
			console.error("Response text:", beginLoginText);
			throw new Error(
				`Invalid JSON response from server: ${beginLoginText.substring(0, 100)}`,
			);
		}
		if (beginLoginData.errors) {
			throw new Error(`GraphQL error: ${beginLoginData.errors[0].message}`);
		}

		let challengeOptions: ChallengeOptions;
		try {
			// Check if the data is already a parsed object or a JSON string
			if (typeof beginLoginData.data.beginLogin === "string") {
				challengeOptions = JSON.parse(beginLoginData.data.beginLogin);
			} else {
				challengeOptions = beginLoginData.data.beginLogin;
			}
		} catch (error) {
			console.error("Error parsing challenge options:", error);
			console.error("Challenge data:", beginLoginData.data.beginLogin);
			const errorMessage =
				error instanceof Error ? error.message : "Unknown parsing error";
			throw new Error(`Failed to parse challenge options: ${errorMessage}`);
		}

		// Step 2: Authenticate with passkey
		const result = await get(challengeOptions as Parameters<typeof get>[0]);

		if (!result) {
			throw new Error("Passkey authentication was cancelled or failed");
		}

		// Step 3: Finalize login - send credentials to server
		const finalizeLoginResponse = await fetch(CARTRIDGE_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `
          mutation FinalizeLogin($credentials: String!) {
            finalizeLogin(credentials: $credentials)
          }
        `,
				variables: {
					credentials: JSON.stringify(result),
				},
			}),
		});

		if (!finalizeLoginResponse.ok) {
			const errorText = await finalizeLoginResponse.text();
			console.error(
				"Finalize login HTTP error:",
				finalizeLoginResponse.status,
				errorText,
			);
			throw new Error(
				`Authentication verification failed: ${finalizeLoginResponse.status}`,
			);
		}

		const finalizeLoginText = await finalizeLoginResponse.text();
		console.log("Finalize login response:", finalizeLoginText);

		let finalizeLoginData: FinalizeLoginData;
		try {
			finalizeLoginData = JSON.parse(finalizeLoginText);
		} catch (error) {
			console.error("JSON parse error for finalize login:", error);
			console.error("Response text:", finalizeLoginText);
			throw new Error(
				`Invalid JSON response from server: ${finalizeLoginText.substring(0, 100)}`,
			);
		}
		if (finalizeLoginData.errors) {
			throw new Error(`GraphQL error: ${finalizeLoginData.errors[0].message}`);
		}

		const token = finalizeLoginData.data.finalizeLogin;
		Alert.alert("Success", "Login successful!");
		console.log("Authentication token:", token);
	}, [username]);

	const authenticate = async () => {
		try {
			setIsAuthenticating(true);

			if (!username.trim()) {
				toast("Please enter a username");
				return;
			}

			if (userExists) {
				// Login flow
				await login();
			} else {
				// Registration flow
				await signup();
			}
		} catch (error) {
			console.error("Passkey authentication error:", error);
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error occurred";
			Alert.alert("Error", `Authentication failed: ${errorMessage}`);
		} finally {
			setIsAuthenticating(false);
		}
	};

	const buttonTitle = useMemo(() => {
		if (isAuthenticating) {
			return userExists ? "Logging in..." : "Creating account...";
		}
		if (isCheckingUser) {
			return "Checking...";
		}
		return userExists ? "Login" : "Sign Up";
	}, [isAuthenticating, isCheckingUser, userExists]);

	// Check if username exists when username changes
	useEffect(() => {
		const checkUserExists = async () => {
			if (!username.trim()) {
				setUserExists(null);
				return;
			}

			setIsCheckingUser(true);
			try {
				const response = await fetch(CARTRIDGE_API_URL, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						query: `
              query CheckUser($username: String!) {
                account(username: $username) {
                  id
                  username
                }
              }
            `,
						variables: {
							username: username.trim(),
						},
					}),
				});

				if (response.ok) {
					const responseText = await response.text();
					console.log("User check response:", responseText);

					try {
						const data = JSON.parse(responseText);
						setUserExists(data.data.account !== null);
					} catch (error) {
						console.error("JSON parse error for user check:", error);
						console.error("Response text:", responseText);
						setUserExists(false);
					}
				} else {
					const errorText = await response.text();
					console.error("User check HTTP error:", response.status, errorText);
					setUserExists(false);
				}
			} catch (error) {
				console.error("Error checking user:", error);
				setUserExists(false);
			} finally {
				setIsCheckingUser(false);
			}
		};

		// Debounce the check to avoid too many requests
		const timeoutId = setTimeout(checkUserExists, 500);
		return () => clearTimeout(timeoutId);
	}, [username]);

	return (
		<View className="flex-1 items-between justify-center p-4 gap-4">
			<Input
				placeholder="Enter username"
				value={username}
				onChangeText={setUsername}
				autoCapitalize="none"
				autoCorrect={false}
				editable={!isAuthenticating}
			/>

			<Button
				className={cn(
					isAuthenticating || isCheckingUser ? "bg-background" : "bg-primary",
				)}
				onPress={authenticate}
				isLoading={isCheckingUser || isAuthenticating}
				disabled={isCheckingUser || isAuthenticating}
			>
				<Text>{buttonTitle}</Text>
			</Button>

			<StatusBar style="auto" />
		</View>
	);
}
