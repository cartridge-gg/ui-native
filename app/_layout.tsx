import "../global.css";
import "react-native-get-random-values";

import { type Chain, mainnet, sepolia } from "@starknet-react/chains";
import {
  type Connector,
  jsonRpcProvider,
  StarknetConfig,
} from "@starknet-react/core";
import { Drawer } from "expo-router/drawer";
import { verifyInstallation } from "nativewind";
import { type PropsWithChildren, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from "sonner-native";
import { constants } from "starknet";
import { TextClassContext, SideDrawer } from "#components";
import { ArcadeProvider } from "#clone/arcade/context/arcade";
import { MobileConnector, RPC_MAINNET_URL, RPC_SEPOLIA_URL } from "#utils";
import { OwnershipsProvider } from "#clone/arcade/context/ownership";

// SessionPolicies type definition
type SessionPolicies = {
  contracts?: Record<string, any>;
  messages?: any[];
};

export default function Layout() {
  useEffect(() => {
    verifyInstallation();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <TextClassContext.Provider value="text-foreground">
          <Toaster position="bottom-center" />
          <StarknetProvider>
            <ArcadeProvider>
              <OwnershipsProvider>
                <Drawer
                  screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                      backgroundColor: '#1a1a1a',
                      width: 320,
                    },
                    drawerActiveTintColor: '#6366f1',
                    drawerInactiveTintColor: '#888888',
                  }}
                  drawerContent={SideDrawer}
                >
                  <Drawer.Screen name="(tabs)" options={{ headerShown: false }} />
                </Drawer>
              </OwnershipsProvider>
            </ArcadeProvider>
          </StarknetProvider>
        </TextClassContext.Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export const ETH_CONTRACT_ADDRESS =
  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
export const STRK_CONTRACT_ADDRESS =
  "0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D";

const messageForChain = (chainId: constants.StarknetChainId) => {
  return {
    types: {
      StarknetDomain: [
        { name: "name", type: "shortstring" },
        { name: "version", type: "shortstring" },
        { name: "chainId", type: "shortstring" },
        { name: "revision", type: "shortstring" },
      ],
      Person: [
        { name: "name", type: "felt" },
        { name: "wallet", type: "felt" },
      ],
      Mail: [
        { name: "from", type: "Person" },
        { name: "to", type: "Person" },
        { name: "contents", type: "felt" },
      ],
    },
    primaryType: "Mail",
    domain: {
      name: "StarkNet Mail",
      version: "1",
      revision: "1",
      chainId: chainId,
    },
  };
};

const policies: SessionPolicies = {
  contracts: {
    [ETH_CONTRACT_ADDRESS]: {
      methods: [
        {
          name: "approve",
          entrypoint: "approve",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        { name: "transfer", entrypoint: "transfer" },
        { name: "mint", entrypoint: "mint" },
        { name: "burn", entrypoint: "burn" },
        { name: "allowance", entrypoint: "allowance" },
      ],
    },
    [STRK_CONTRACT_ADDRESS]: {
      methods: [
        {
          name: "approve",
          entrypoint: "approve",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        { name: "transfer", entrypoint: "transfer" },
        { name: "mint", entrypoint: "mint" },
        { name: "burn", entrypoint: "burn" },
        { name: "allowance", entrypoint: "allowance" },
      ],
    },
    "0x0305f26ad19e0a10715d9f3137573d3a543de7b707967cd85d11234d6ec0fb7e": {
      methods: [{ name: "new_game", entrypoint: "new_game" }],
    },
  },
  messages: [
    messageForChain(constants.StarknetChainId.SN_MAIN),
    messageForChain(constants.StarknetChainId.SN_SEPOLIA),
  ],
};

const controller = new MobileConnector({
  policies,
}) as unknown as Connector;
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

