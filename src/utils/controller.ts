import * as WebBrowser from "expo-web-browser";
import { KEYCHAIN_URL } from "#utils/const";
import { RequestFn, StarknetWindowObject } from "@starknet-io/types-js";
import { icon } from "#utils/icon";
import * as Linking from "expo-linking";

export class MobileProvider implements StarknetWindowObject {
	public id = "controller_mobile";
	public name = "Controller Mobile";
	public version = "0.9.3-mobile";
	public icon = icon;

	constructor() {}

	async connect() {
		try {
      const redirectUrl = Linking.createURL("");
      const authUrl = `${KEYCHAIN_URL}?callback_url=${encodeURIComponent(redirectUrl)}`;
      console.log(authUrl, redirectUrl);
			const res = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);
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
