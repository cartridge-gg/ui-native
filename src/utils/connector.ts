import {Connector} from "@starknet-react/core";
import { MobileProvider } from "#utils/controller";
import { RequestFn } from "@starknet-io/types-js";

export class MobileConnector extends Connector {
	public id: string;
	public name: string;
	public icon: string;

	public controller: MobileProvider;

	constructor() {
		const controller = new MobileProvider();

		super();

		this.controller = controller;
    this.id = controller.id;
    this.name = controller.name;
    this.icon = controller.icon;
	}

	available() {
		return true;
	}

	ready() {
		return Promise.resolve(true);
	}

	connect() {
		return this.controller.connect();
	}

	disconnect() {
		throw new Error("Not implemented");
	}

	account() {
		throw new Error("Not implemented");
	}

	chainId() {
		throw new Error("Not implemented");
	}

	request: RequestFn = async (call) => {
		return this.controller.request(call);
	}

	static fromConnectors(connectors: Connector[]): Connector {
		const connector = connectors.find((c) => c.id === "controller_mobile");
		if (!connector) {
			throw new Error("Controller connector not found");
		}
		return connector;
	}
}
