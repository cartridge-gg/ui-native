import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	useFonts,
} from "@expo-google-fonts/inter";
import { ScreenContent } from "components/ScreenContent";
import { StatusBar } from "expo-status-bar";

import "./global.css";

export default function App() {
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
	});

	if (!fontsLoaded) {
		return null; // or a loading screen
	}

	return (
		<>
			<ScreenContent title="Home" path="App.tsx" />
			<StatusBar style="auto" />
		</>
	);
}
