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

	async connect(): Promise<ConnectorData> {
    const res = await this.open();

    switch (res.type) {
      case "success":
        const query = new URLSearchParams(res.url.split("?")[1]);
        return {
          account: query.get("account") ?? undefined,
          chainId: query.get("chainId") ? BigInt(query.get("chainId")!) : undefined,
        };
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
