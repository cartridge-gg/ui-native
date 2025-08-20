import {
  InvokeFunctionResponse,
  TypedData,
  WalletAccount,
  Call,
  AllowArray,
} from "starknet";
import { MobileProvider } from "./provider";
import { SIGNATURE } from "@starknet-io/types-js";
import { MobileKeychain } from "./keychain";

export class MobileAccount extends WalletAccount {
  public keychain: MobileKeychain;

  constructor({provider, rpcUrl, address, keychain}: {provider: MobileProvider, rpcUrl: string, address: string, keychain: MobileKeychain}) {
    super({ nodeUrl: rpcUrl }, provider, address);
    this.keychain = keychain;
  }

  async execute(calls: AllowArray<Call>): Promise<InvokeFunctionResponse> {
    const p = new URLSearchParams();
    const _calls = Array.isArray(calls) ? calls : [calls];
    for (const call of _calls) {
      p.append("calls", encodeURIComponent(JSON.stringify(call)));
    }
    const res = await this.keychain.open("/execute?" + p.toString());
    switch (res.type) {
      case "success":
        const url = new URL(res.url);
        const txHash = url.searchParams.get("transaction_hash");
        if (!txHash) {
          throw new Error("Transaction hash not found");
        }
        return { transaction_hash: decodeURIComponent(txHash) };
      default:
        throw new Error("User cancelled");
    }
  }

  async signMessage(typedData: TypedData): Promise<SIGNATURE> {
    const p = new URLSearchParams();
    p.set("typedData", encodeURIComponent(JSON.stringify(typedData)));
    const res = await this.keychain.open("/sign-message?" + p.toString());
    switch (res.type) {
      case "success":
        const url = new URL(res.url);
        const signature = url.searchParams.get("signature");
        if (!signature) {
          throw new Error("Signature not found");
        }
        return JSON.parse(decodeURIComponent(signature)) as SIGNATURE;
      default:
        throw new Error("User cancelled");
    }
  }
}
