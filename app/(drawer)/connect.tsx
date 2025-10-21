import { useConnect } from "@starknet-react/core";
import { Link, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import {
	Button,
	CartridgeLogo,
	ControllerIcon,
	Text,
	TimesIcon,
	UsernameInput,
} from "#components";
import { useAccountSearch, useUsernameValidation } from "#hooks";
import { MobileConnector } from "#utils";

export default function ConnectScreen() {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { connect, connectors } = useConnect();

	const connector = useMemo(
		() => MobileConnector.fromConnectors(connectors),
		[connectors],
	);

	// Account search and validation
	const { results: suggestions } = useAccountSearch(username, {
		minLength: 1,
		debounceMs: 300,
		maxResults: 5,
		enabled: true,
	});

	const validation = useUsernameValidation(username);

	const onLogin = useCallback(async () => {
		if (!username.trim()) return;

		setIsLoading(true);
		try {
			// For now, just connect with the controller
			// In the future, we could pass the username as a parameter
			await connect({ connector });
			router.back();
		} catch (error) {
			console.error("Connection failed:", error);
		} finally {
			setIsLoading(false);
		}
	}, [username, connect, connector, router]);

	const isButtonDisabled =
		!username.trim() ||
		isLoading ||
		validation.status === "validating" ||
		validation.status === "invalid";

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View className="flex-1 bg-background-100">
				<View className="p-4 items-end">
					<Link href=".." asChild>
						<Button variant="icon" size="icon">
							<TimesIcon className="fill-foreground-200" />
						</Button>
					</Link>
				</View>

				<View className="flex-1 justify-between items-center px-8 pt-24 pb-8">
					<View className="w-full gap-8">
						<View className="flex-row items-center gap-4">
							<View className="size-20 flex items-center justify-center">
								<ControllerIcon className="size-16 fill-primary" size="3xl" />
							</View>
							<Text className="text-foreground-100 text-2xl font-semibold">
								Connect Controller
							</Text>
						</View>

						<View className="w-full gap-4">
							<UsernameInput
								value={username}
								placeholder="Username"
								onChangeText={setUsername}
								onClear={() => setUsername("")}
								validation={validation}
								suggestions={suggestions}
								showAutocomplete={true}
								className="w-full"
							/>

							<View className="flex-row flex-wrap items-center gap-1 px-1">
								<Text className="text-foreground-400 text-xs">
									By continuing you are agreeing to Cartridge's
								</Text>
								<Link href="https://cartridge.gg/legal/terms-of-service">
									<Text className="text-foreground-400 text-xs underline">
										Terms of Service
									</Text>
								</Link>
								<Text className="text-foreground-400 text-xs">and</Text>
								<Link href="https://cartridge.gg/legal/privacy-policy">
									<Text className="text-foreground-400 text-xs underline">
										Privacy Policy
									</Text>
								</Link>
							</View>
						</View>
					</View>

					<View className="w-full max-w-md gap-4">
						<Button
							variant="primary"
							size="lg"
							className="w-full uppercase"
							onPress={onLogin}
							disabled={isButtonDisabled}
							isLoading={isLoading}
						>
							<Text className="font-mono">LOG IN</Text>
						</Button>

						<Link href="https://cartridge.gg">
							<View className="h-10 w-full flex-row items-center justify-center gap-1">
								<ControllerIcon className="fill-foreground-400" />
								<Text className="text-foreground-400 text-xs font-medium">
									by
								</Text>
								<CartridgeLogo className="fill-foreground-400" />
							</View>
						</Link>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}
