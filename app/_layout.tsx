import "../global.css";

import { Stack } from "expo-router";
import { verifyInstallation } from "nativewind";
import { PropsWithChildren, useEffect } from "react";
import { cssInterop } from "react-native-css-interop";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TextClassContext } from "#components";
import { jsonRpcProvider, StarknetConfig, Connector } from "@starknet-react/core";
import { Chain, mainnet, sepolia } from "@starknet-react/chains";
import { MobileConnector, RPC_MAINNET_URL, RPC_SEPOLIA_URL } from "#utils";

export default function Layout() {
  useEffect(() => {
    verifyInstallation();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <TextClassContext.Provider value="text-foreground">
          <StarknetProvider>
            <StackContainer
              headerClassName="bg-background text-foreground"
              contentClassName="bg-background"
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
            </StackContainer>
          </StarknetProvider>
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

const controller = new MobileConnector() as unknown as Connector;
const provider = jsonRpcProvider({
  rpc: (chain: Chain) => {
    switch (chain.id) {
      case mainnet.id:
        return { nodeUrl: RPC_MAINNET_URL };
      case sepolia.id:
        return { nodeUrl: RPC_SEPOLIA_URL };
      default:
        return null;
    }
  },
});

function StarknetProvider({ children }: PropsWithChildren) {
  return (
    <StarknetConfig
      defaultChainId={mainnet.id}
      chains={[mainnet, sepolia]}
      connectors={[controller]}
      provider={provider}
    >
      {children}
    </StarknetConfig>
  );
}
