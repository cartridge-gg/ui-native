import { useAccount, useSignTypedData } from "@starknet-react/core";
import {
  ArraySignatureType,
  TypedData,
  shortString,
  typedData,
} from "starknet";
import { useCallback, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
  Button,
  Text,
  // Textarea
} from "#components";

export default function SignMessage() {
  const { address, account } = useAccount();
  const [message, setMessage] = useState(MESSAGE);
  const [isValid, setIsValid] = useState<boolean>();
  const { signTypedDataAsync, data: signature } = useSignTypedData({
    params: message,
  });

  const onSign = useCallback(() => {
    signTypedDataAsync(message).catch(console.error);
  }, [signTypedDataAsync, message]);

  const onValidate = useCallback(async () => {
    if (!account || !address) {
      return;
    }
    setIsValid(undefined);
    const res = await account.callContract(
      {
        contractAddress: address,
        entrypoint: "is_valid_signature",
        calldata: [
          typedData.getMessageHash(message, address),
          (signature as ArraySignatureType).length,
          ...(signature as ArraySignatureType),
        ],
      },
      "pending",
    );
    setIsValid(res[0] === shortString.encodeShortString("VALID"));
  }, [account, address, message, signature]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerClassName="px-4 pb-16 gap-2">
        <View className="bg-background-400 p-4 rounded-lg border border-foreground-400">
          <Text>{JSON.stringify(message, null, 2)}</Text>
        </View>
        {/* <Textarea
        value={JSON.stringify(message, null, 2)}
        onChangeText={(text) => setMessage(JSON.parse(text))}
        multiline={true}
        contextMenuHidden={true}
        selectTextOnFocus={false}
        editable={false}
      /> */}
        <Button onPress={onSign}>
          <Text>Sign Message</Text>
        </Button>

        {signature && (
          <>
            <Text>Signature: ({isValid === undefined ? "not validated" : isValid ? "is valid" : "is invalid"})</Text>
            <View className="bg-background-400 p-4 rounded-lg border border-foreground-400">
              <Text>{JSON.stringify(signature, null, 2)}</Text>
            </View>
            <Button onPress={onValidate}>
              <Text>Validate Signature</Text>
            </Button>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const MESSAGE: TypedData = {
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
  primaryType: "StarknetDomain",
  domain: {
    name: "StarkNet Mail",
    version: "1",
    revision: "1",
    chainId: "SN_SEPOLIA",
  },
  message: {
    name: "My DApp",
    version: "1.0",
    chainId: "SN_SEPOLIA",
    revision: "1",
  },
};
