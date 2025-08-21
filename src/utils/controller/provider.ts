import { RequestFn, StarknetWindowObject } from "@starknet-io/types-js";
import { icon } from "#utils/icon";
import { MobileAccount } from "./account";
import { MobileKeychain } from "./keychain";
import { constants, TypedData } from "starknet";
import { Chain, ControllerOptions } from "@cartridge/controller";

export class MobileProvider extends MobileKeychain implements StarknetWindowObject {
	public id = "controller_mobile";
	public name = "Controller Mobile";
	public version = "0.9.3-mobile";
	public icon = icon;

  private options: ControllerOptions;
  public account?: MobileAccount;

	constructor(options: ControllerOptions = {}) {
    super();

    const chains: Chain[] = [
      {rpcUrl: "https://api.cartridge.gg/x/starknet/sepolia"},
      {rpcUrl: "https://api.cartridge.gg/x/starknet/mainnet"},
      ...(options.chains ?? []),
    ];
    const defaultChainId =
      options.defaultChainId || constants.StarknetChainId.SN_MAIN;
    this.options = {...options, chains, defaultChainId}
  }

	async connect(): Promise<MobileAccount> {
    const res = await this.open("/", {
      preferEphemeralSession: !this.account,
      params: new URLSearchParams({
        policies: encodeURIComponent(JSON.stringify(this.options.policies)),
        rpc_url: encodeURIComponent(this.options.chains![0].rpcUrl!),
      }),
    });

    switch (res.type) {
      case "success":
        const url = new URL(res.url);
        const address = url.searchParams.get("address");
        const chainId = url.searchParams.get("chain_id");
        const rpcUrl = decodeURIComponent(url.searchParams.get("rpc_url") ?? "");
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

	request: RequestFn = async (call) => {
    switch (call.type) {
      case "wallet_signTypedData": {
        if (!this.account) {
          throw new Error("Account not found");
        }
        return this.account?.signMessage(call.params as TypedData);
      }
      default:
        throw new Error(`Not implemented: MobileProvider.request: ${call.type}`);
    }
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
