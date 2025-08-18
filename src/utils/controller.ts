import type { AddStarknetChainParameters } from "@starknet-io/types-js";
import * as WebBrowser from "expo-web-browser";
import type { WalletAccount } from "starknet";
import { KEYCHAIN_URL } from "#utils/const";
import BaseProvider from "#utils/provider";

export class MobileProvider extends BaseProvider {
	public id = "controller_mobile";
	public name = "Controller Mobile";
	public version = "0.9.3-mobile";

	constructor() {
		super();
	}

	async probe() {
		throw new Error("Not implemented");
		return undefined;
	}

	async connect() {
		try {
			const res = await WebBrowser.openBrowserAsync(KEYCHAIN_URL);
			console.log(res);
		} catch (error) {
			console.error("Error opening browser:", error);
		}

		return {
			address: "0x0",
			chainId: "0x0",
		} as unknown as WalletAccount;
	}

	async switchStarknetChain(chainId: string) {
		throw new Error("Not implemented");
		return false;
	}

	async addStarknetChain(chain: AddStarknetChainParameters) {
		throw new Error("Not implemented");
		return false;
	}

	// extension methods
	isReady() {
		return true;
	}

	async disconnect() {
		throw new Error("Not implemented");
	}

	async logout() {
		throw new Error("Not implemented");
	}
}
