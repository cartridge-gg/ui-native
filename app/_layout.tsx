import "../global.css";

import { Stack } from "expo-router";
import { verifyInstallation } from "nativewind";
import { useEffect } from "react";
import { cssInterop } from "react-native-css-interop";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TextClassContext } from "#components";

export default function Layout() {
	useEffect(() => {
		verifyInstallation();
	}, []);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider>
				<TextClassContext.Provider value="text-foreground">
					<StackContainer
						headerClassName="bg-background text-foreground"
						contentClassName="bg-background"
					>
						<Stack.Screen name="index" options={{ headerShown: false }} />
						<Stack.Screen name="connect" options={{ title: "Connect" }} />
					</StackContainer>
				</TextClassContext.Provider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}

interface StackContainerProps {
	contentBackgroundColor?: string;
	headerBackgroundColor?: string;
	headerTintColor?: string;
	[key: string]: unknown;
}

function StackContainer({
	contentBackgroundColor,
	headerBackgroundColor,
	headerTintColor,
	...props
}: StackContainerProps) {
	return (
		<Stack
			screenOptions={{
				contentStyle: { backgroundColor: contentBackgroundColor },
				headerStyle: { backgroundColor: headerBackgroundColor },
				headerTintColor,
			}}
			{...props}
		/>
	);
}

// Enable cssInterop for Stack.Screen options
cssInterop(StackContainer, {
	headerClassName: {
		target: false,
		nativeStyleToProp: {
			backgroundColor: "headerBackgroundColor",
			color: "headerTintColor",
		},
	},
	contentClassName: {
		target: false,
		nativeStyleToProp: {
			backgroundColor: "contentBackgroundColor",
		},
	},
});
