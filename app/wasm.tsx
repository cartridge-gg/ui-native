import { useEffect, useState } from "react";
import { View } from "react-native";
import * as WebAssembly from 'react-native-webassembly';
import { Text } from "#components";
import axios from "axios";

// Alternative approach: Bundle WASM locally
// 1. Download the WASM file and place it in your assets folder
// 2. Import it directly:
// import wasmFile from '../assets/account_wasm_bg.wasm';

export default function WasmScreen() {
  // const [controller, setController] = useState<WebAssembly.WebassemblyInstantiateResult<any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        // const bytes = await fetchWasm("https://unpkg.com/@cartridge/controller-wasm@0.2.4/pkg-controller/account_wasm_bg.wasm");
        const bytes = await fetchWasm("https://github.com/JunichiSugiura/controller-rs/raw/feat/no-modules/account-wasm/controller.wasm")
        console.log(bytes)
        const wasm = await WebAssembly.instantiate<{
          cartridgeaccount_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number) => void;
        }>(bytes);
        const res = wasm.instance.exports.cartridgeaccount_new(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
        console.log(res)
      } catch (err) {
        console.error('Error fetching WASM:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        throw err;
      }
    };

    init();
  }, []);

  // console.log(Object.keys(controller?.instance?.exports ?? {}))

  return (
    <View>
      {error && (
        <Text style={{ color: 'red' }}>
          Error: {error}
        </Text>
      )}
      <Text>
        {/* {JSON.stringify(Object.keys(controller?.instance?.exports ?? {}))} */}
      </Text>
    </View>
  );
}

export async function fetchWasm(uri: string) {
  const { data: bufferSource } = await axios({
    url: uri,
    method: 'get',
    responseType: 'arraybuffer',
  });

  return bufferSource;
}
