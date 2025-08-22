import type { SIGNATURE } from "@starknet-io/types-js";
import {
	type AllowArray,
	type Call,
	type InvokeFunctionResponse,
	type TypedData,
	WalletAccount,
} from "starknet";
import type { MobileKeychain } from "./keychain";
import type { MobileProvider } from "./provider";

export class MobileAccount extends WalletAccount {
	public keychain: MobileKeychain;

	constructor({
		provider,
		rpcUrl,
		address,
		keychain,
	}: {
		provider: MobileProvider;
		rpcUrl: string;
		address: string;
		keychain: MobileKeychain;
	}) {
		super({ nodeUrl: rpcUrl }, provider, address);
		this.keychain = keychain;
	}

	async execute(calls: AllowArray<Call>): Promise<InvokeFunctionResponse> {
		const params = new URLSearchParams();
		const _calls = Array.isArray(calls) ? calls : [calls];
		for (const call of _calls) {
			params.append("calls", encodeURIComponent(JSON.stringify(call)));
		}
		const res = await this.keychain.open("/execute", { params });
		switch (res.type) {
			case "success": {
				const url = new URL(res.url);
				const txHash = url.searchParams.get("transaction_hash");
				if (!txHash) {
					throw new Error("Transaction hash not found");
				}
				return { transaction_hash: decodeURIComponent(txHash) };
			}
			default:
				throw new Error("User cancelled");
		}
	}

	async signMessage(typedData: TypedData): Promise<SIGNATURE> {
		const params = new URLSearchParams();
		params.set("typedData", encodeURIComponent(JSON.stringify(typedData)));
		const res = await this.keychain.open("/sign-message", { params });
		switch (res.type) {
			case "success": {
				const url = new URL(res.url);
				const signature = url.searchParams.getAll("signature");
				if (!signature) {
					throw new Error("Signature not found");
				}
				return signature as SIGNATURE;
			}
			default:
				throw new Error("User cancelled");
		}
	}
}
