import "../global.css";
import "react-native-get-random-values";
import "../src/css-interop";

import {
	IBMPlexMono_400Regular,
	IBMPlexMono_500Medium,
	IBMPlexMono_600SemiBold,
	IBMPlexMono_700Bold,
} from "@expo-google-fonts/ibm-plex-mono";
import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { usePathname, useSegments } from "expo-router";
import Drawer from "expo-router/drawer";
import { verifyInstallation } from "nativewind";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from "sonner-native";
import {
	AchievementProvider,
	ArcadeProvider,
	CollectionProvider,
	DiscoversProvider,
	MarketplaceProvider,
	OwnershipsProvider,
	TokenProvider,
} from "#clone/arcade";
import {
	Header,
	MockStarknetToggle,
	SideDrawer,
	SvgClassContext,
	TextClassContext,
} from "#components";
import { ThemeProvider } from "#context/theme";
import { StarknetProvider } from "#utils/starknet-provider";

function useRouteLogger() {
	const pathname = usePathname();
	const segments = useSegments();

	useEffect(() => {
		if (__DEV__) {
			console.log("📍 Route changed:", pathname);
			console.log("📍 Segments:", segments);
		}
	}, [pathname, segments]);
}

const USE_MOCK_MODE = process.env.EXPO_PUBLIC_MOCK_STARKNET === "true";

export default function Layout() {
	useRouteLogger();

	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
		IBMPlexMono_400Regular,
		IBMPlexMono_500Medium,
		IBMPlexMono_600SemiBold,
		IBMPlexMono_700Bold,
	});

	useEffect(() => {
		verifyInstallation();
	}, []);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider>
				<ThemeProvider>
					<TextClassContext.Provider value="text-foreground">
						<SvgClassContext.Provider value="fill-foreground">
							<Toaster position="bottom-center" />
							<StarknetProvider>
								<ArcadeProvider>
									<AchievementProvider>
										<MarketplaceProvider>
											<OwnershipsProvider>
												<TokenProvider>
													<CollectionProvider>
														<DiscoversProvider>
															<Drawer
																screenOptions={({ navigation }) => ({
																	drawerStyle: {
																		width: 320,
																		backgroundColor: "#151916",
																	},
																	headerShown: true,
																	header: () => (
																		<Header navigation={navigation} />
																	),
																})}
																drawerContent={SideDrawer}
															/>
															{USE_MOCK_MODE && __DEV__ && (
																<MockStarknetToggle />
															)}
														</DiscoversProvider>
													</CollectionProvider>
												</TokenProvider>
											</OwnershipsProvider>
										</MarketplaceProvider>
									</AchievementProvider>
								</ArcadeProvider>
							</StarknetProvider>
						</SvgClassContext.Provider>
					</TextClassContext.Provider>
				</ThemeProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}
