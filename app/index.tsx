import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useCallback, useMemo } from "react";
import { View } from "react-native";
import { Button, SonnerToaster, Spinner, Text } from "#components";
import { MobileConnector } from "#utils";
import { Link } from "expo-router";


export default function RootScreen() {
  const { connectAsync, connectors } = useConnect();
  const { status } = useAccount();
  const { disconnect } = useDisconnect();

  const connector = useMemo(
    () => MobileConnector.fromConnectors(connectors),
    [connectors],
  );

  const onConnect = useCallback(() => {
    connectAsync({ connector }).catch(console.error);
  }, [connectAsync]);

  return (
    <View className="flex-1 items-center justify-center bg-background-100 gap-4">
      {(() => {
        switch (status) {
          case "disconnected":
            return (
              <Button onPress={onConnect}>
                <Text>Connect</Text>
              </Button>
            );
          case "connected":
            return (
              <>
                <Link href="/sign-message" asChild>
                  <Button>
                    <Text>Sign Message</Text>
                  </Button>
                </Link>

                <Button onPress={() => disconnect()}>
                  <Text>Disconnect</Text>
                </Button>
              </>
            );
          default:
            return <Spinner />;
        }
      })()}
      <SonnerToaster />
    </View>
  );
}
