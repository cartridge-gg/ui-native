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
        const address = url.searchParams.get("address");
        const chainId = url.searchParams.get("chain_id");
        const rpcUrl = url.searchParams.get("rpc_url");
        if (!address || !chainId || !rpcUrl) {
          throw new Error("Keychain didn't return address, chain_id or rpc_url");
        }
        this.account = new MobileAccount({
          provider: this,
          rpcUrl,
          address,
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
		throw new Error("Not implemented: MobileProvider.request");
	}

	on() {
    console.warn("Not implemented: MobileProvider.on");
  }

  off() {
    console.warn("Not implemented: MobileProvider.off");
  }

  disconnect() {
    this.account = undefined;
  }
}

type ConnectorData = {
  account?: string;
  chainId?: bigint;
}
