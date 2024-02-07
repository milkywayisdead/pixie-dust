export interface BaseCommandInterface {
    args: any[];
    do(): void;
}

export interface CommandsChain {
    current: CommandsChainLinkInterface | null;
    undo(): void;
    redo(): void;
}

export interface CommandsChainLinkInterface {
    next: CommandsChainLinkInterface | null;
    previous: CommandsChainLinkInterface | null;
    setUndo(command: BaseCommandInterface): void;
    setRedo(command: BaseCommandInterface): void;
    undo(): void;
    redo(): void;
}