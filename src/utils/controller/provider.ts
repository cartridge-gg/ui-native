import { RequestFn, StarknetWindowObject } from "@starknet-io/types-js";
import { icon } from "#utils/icon";
import { MobileAccount } from "./account";
import { MobileKeychain } from "./keychain";

export class MobileProvider extends MobileKeychain implements StarknetWindowObject {
	public id = "controller_mobile";
	public name = "Controller Mobile";
	public version = "0.9.3-mobile";
	public icon = icon;

  public account?: MobileAccount;

	constructor() {
    super();
  }

	async connect(): Promise<MobileAccount> {
    const res = await this.open("/", {
      preferEphemeralSession: !this.account,
    });

    switch (res.type) {
      case "success":
        const url = new URL(res.url);
        const account = url.searchParams.get("account");
        const chainId = url.searchParams.get("chainId");
        if (!account || !chainId) {
          throw new Error("Keychain didn't return account or chainId");
        }
        this.account = new MobileAccount({
          provider: this,
          rpcUrl: url.searchParams.get("rpcUrl") ?? "",
          address: account,
          keychain: this,
        });
        return this.account;
      default:
      case "cancel":
      case "dismiss":
        throw new Error("User cancelled");
    }
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

  disconnect() {
    this.account = undefined;
  }
}

type ConnectorData = {
  account?: string;
  chainId?: bigint;
}
