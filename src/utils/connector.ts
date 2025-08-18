import { type Connector, InjectedConnector } from "@starknet-react/core";
import { MobileProvider } from "#utils/controller";

export class MobileConnector extends InjectedConnector {
	public controller: MobileProvider;

	constructor() {
		const controller = new MobileProvider();

		super({
			options: {
				id: controller.id,
				name: controller.name,
				icon: controller.icon,
			},
		});

		this.controller = controller;
	}

	disconnect() {
		return this.controller.disconnect();
	}

	isReady() {
		return this.controller.isReady();
	}

	static fromConnectors(connectors: Connector[]): MobileConnector {
		const connector = connectors.find((c) => c.id === "controller_mobile");
		if (!connector) {
			throw new Error("Controller connector not found");
		}
		return connector as MobileConnector;
	}
}
