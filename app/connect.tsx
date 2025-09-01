import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { Link, Stack } from "expo-router";
import { useCallback, useMemo } from "react";
import { View } from "react-native";
import { Button, SonnerToaster, Spinner, Text, ScreenHeader } from "#components";
import { MobileConnector } from "#utils";

export default function RootScreen() {
  const { connect, connectors, error } = useConnect();
  const { status } = useAccount();
  const { disconnect } = useDisconnect();

  const connector = useMemo(
    () => MobileConnector.fromConnectors(connectors),
    [connectors],
  );

  const onConnect = useCallback(() => {
    connect({ connector });
  }, [connect, connector]);

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title="Controller Example (Mobile)" />
      <View className="flex-1 items-center justify-center px-4 gap-4">
        {(() => {
          switch (status) {
            case "disconnected":
              return (
                <>
                  <Button onPress={onConnect}>
                    <Text>Connect</Text>
                  </Button>
                  {error && <Text>{error.message}</Text>}
                </>
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
    </View>
  );
}
