import { View } from "react-native";
import { Text } from "#components";
import { CartridgeAccount } from "#controller/account_wasm";
import { useEffect } from "react";

export default function Wasm2Js() {
  useEffect(() => {
    const account = CartridgeAccount.new("1", "1", "1", "1", "1", "1", { signer: undefined, account: "1" }, "1");
    console.log(account);
  }, []);

  return (
    <View>
      <Text>Wasm2Js</Text>
    </View>
  );
}
