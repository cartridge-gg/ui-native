import * as WebBrowser from "expo-web-browser";
import { KEYCHAIN_URL } from "#utils/const";
import { RequestFn, StarknetWindowObject } from "@starknet-io/types-js";
import { icon } from "#utils/icon";

export class MobileProvider implements StarknetWindowObject {
	public id = "controller_mobile";
	public name = "Controller Mobile";
	public version = "0.9.3-mobile";
	public icon = icon;

	constructor() {}

	async connect() {
		try {
			const res = await WebBrowser.openAuthSessionAsync(KEYCHAIN_URL);
			console.log(res);
		} catch (error) {
			console.error("Error opening browser:", error);
		}

		return {};
	}

	request: RequestFn = async (_call) => {
		throw new Error("Not implemented");
	}

	on() {
		throw new Error("Not implemented");
  }

  off() {
		throw new Error("Not implemented");
  }
}
