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

export class SocialModel {}
export class RegistryModel {}

export class PinEvent extends SocialModel {
  static isType(model: SocialModel): boolean {
    return (model as any)?.type === "pin";
  }
  constructor(
    public playerId: string,
    public achievementId: string,
    public time: number,
  ) {
    super();
    (this as any).type = "pin";
  }
}

export class FollowEvent extends SocialModel {
  static isType(model: SocialModel): boolean {
    return (model as any)?.type === "follow";
  }
  constructor(
    public follower: string,
    public followed: string,
    public time: number,
  ) {
    super();
    (this as any).type = "follow";
  }
}

export class AccessModel extends RegistryModel {
  static isType(model: RegistryModel): boolean {
    return (model as any)?.__kind === "access";
  }
  constructor(
    public identifier: string,
    public address: string,
    public role: { value: string },
  ) {
    super();
    (this as any).__kind = "access";
  }
  exists(): boolean {
    return true;
  }
}

export class GameModel extends RegistryModel {
  static isType(model: RegistryModel): boolean {
    return (model as any)?.__kind === "game";
  }
  constructor(
    public id: number,
    public identifier: string,
    public name: string,
    public published: boolean = true,
    public whitelisted: boolean = true,
  ) {
    super();
    (this as any).__kind = "game";
  }
  exists(): boolean {
    return true;
  }
}

export class EditionModel extends RegistryModel {
  static isType(model: RegistryModel): boolean {
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

export class Social {
  static async init(_chainId: string): Promise<void> {
    // no-op
  }
  static fetch(
    cb: (models: SocialModel[]) => void,
    _options?: SocialOptions,
  ): void {
    cb([]);
  }
  static sub(
    _cb: (models: SocialModel[]) => void,
    _options?: SocialOptions,
  ): void {
    // no-op
  }
  static unsub(): void {
    // no-op
  }
}

export class Registry {
  static async init(_chainId: string): Promise<void> {
    // no-op
  }
  static fetch(
    cb: (models: RegistryModel[]) => void,
    _options?: RegistryOptions,
  ): void {
    cb([]);
  }
  static sub(
    _cb: (models: RegistryModel[]) => void,
    _options?: RegistryOptions,
  ): void {
    // no-op
  }
  static unsub(): void {
    // no-op
  }
}


