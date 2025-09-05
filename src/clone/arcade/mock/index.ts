// Mock replacements for @cartridge/arcade to avoid WASM dependency at runtime.
// NOTE: Keep API-compatible with the usage in our codebase. Minimal no-op impls.

export type SocialOptions = {
	pin?: boolean;
	follow?: boolean;
};

export type RegistryOptions = {
	access?: boolean;
	game?: boolean;
	edition?: boolean;
};

export class ArcadeProvider {
	chainId: string;
	constructor(chainId: string) {
		this.chainId = chainId;
	}
	async getToriiClient(url: string): Promise<{ url: string }> {
		return { url };
	}
}

export class RegistryModel {}

export class AccessModel extends RegistryModel {
	static isType(model: RegistryModel): boolean {
		// biome-ignore lint/suspicious/noExplicitAny: TODO
		return (model as any)?.__kind === "access";
	}
	constructor(
		public identifier: string,
		public address: string,
		public role: { value: string },
	) {
		super();
		// biome-ignore lint/suspicious/noExplicitAny: TODO
		(this as any).__kind = "access";
	}
	exists(): boolean {
		return true;
	}
}

export class GameModel extends RegistryModel {
	static isType(model: RegistryModel): boolean {
		// biome-ignore lint/suspicious/noExplicitAny: TODO
		return (model as any)?.__kind === "game";
	}
	constructor(
		public id: number,
		public identifier: string,
		public name: string,
		public published: boolean = true,
		public whitelisted: boolean = true,
		public properties: { icon?: string; cover?: string } = {},
	) {
		super();
		// biome-ignore lint/suspicious/noExplicitAny: TODO
		(this as any).__kind = "game";
	}
	exists(): boolean {
		return true;
	}
	clone(): GameModel {
		return new GameModel(
			this.id,
			this.identifier,
			this.name,
			this.published,
			this.whitelisted,
			{ ...this.properties },
		);
	}
}

export class EditionModel extends RegistryModel {
	static isType(model: RegistryModel): boolean {
		// biome-ignore lint/suspicious/noExplicitAny: TODO
		return (model as any)?.__kind === "edition";
	}
	certified?: boolean;
	constructor(
		public id: number,
		public identifier: string,
		public gameId: number,
		public priority: number = 0,
		public published: boolean = true,
		public whitelisted: boolean = true,
		public config: { rpc: string; project: string } = {
			rpc: "",
			project: "",
		},
	) {
		super();
		// biome-ignore lint/suspicious/noExplicitAny: TODO
		(this as any).__kind = "edition";
	}
	exists(): boolean {
		return true;
	}
	clone(): EditionModel {
		const copy = new EditionModel(
			this.id,
			this.identifier,
			this.gameId,
			this.priority,
			this.published,
			this.whitelisted,
			{ ...this.config },
		);
		copy.certified = this.certified;
		return copy;
	}
}
