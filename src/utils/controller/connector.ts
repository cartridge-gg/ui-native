import type { ControllerOptions } from "@cartridge/controller";
import type { RequestFn } from "@starknet-io/types-js";
import { Connector } from "@starknet-react/core";
import type { MobileAccount } from "./account";
import { MobileProvider } from "./provider";

export class MobileConnector extends Connector {
	public id: string;
	public name: string;
	public icon: string;

	public controller: MobileProvider;

	constructor(options?: ControllerOptions) {
		const controller = new MobileProvider(options);

		super();

		this.controller = controller;
		this.id = controller.id;
		this.name = controller.name;
		this.icon = controller.icon;
	}

	available() {
		return true;
	}

	async ready() {
		return true;
	}

	async connect() {
		const account = await this.controller.connect();
		const chainId = await this.chainId();

		return {
			account: account.address,
			chainId: BigInt(chainId),
		};
	}

	async disconnect() {
		this.controller.disconnect();
	}

	async account(): Promise<MobileAccount> {
		const account = this.controller.account;
		if (!account) {
			throw new Error("No account found");
		}

		return account;
	}

	async chainId() {
		const account = await this.account();
		const chainId = await account.getChainId();
		return BigInt(chainId);
	}

	request: RequestFn = async (call) => {
		return this.controller.request(call);
	};

	static fromConnectors(connectors: Connector[]): Connector {
		const connector = connectors.find((c) => c.id === "controller_mobile");
		if (!connector) {
			throw new Error("Controller connector not found");
		}
		return connector;
	}
}
