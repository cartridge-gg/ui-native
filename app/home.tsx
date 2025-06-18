import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts as useInterFonts,
} from "@expo-google-fonts/inter";
import {
  IBMPlexMono_400Regular,
  IBMPlexMono_500Medium,
  IBMPlexMono_600SemiBold,
  IBMPlexMono_700Bold,
  useFonts as useIBMPlexMonoFonts,
} from "@expo-google-fonts/ibm-plex-mono";
import { StatusBar } from "expo-status-bar";

import "../global.css";
import { Text } from "#components/primitives/text/Text";
import { View } from "react-native";

export function Home() {
  const [interFontsLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [ibmPlexMonoFontsLoaded] = useIBMPlexMonoFonts({
    IBMPlexMono_400Regular,
    IBMPlexMono_500Medium,
    IBMPlexMono_600SemiBold,
    IBMPlexMono_700Bold,
  });

  const fontsLoaded = interFontsLoaded && ibmPlexMonoFontsLoaded;

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <View className="flex-1 items-center justify-center bg-background-100 gap-2">
      <Text>Cartridge Native UI</Text>
      <Text>Example App</Text>
    </View>
  );
}
