import { CommandsChainLinkInterface } from "../services/commands_chain/link";

export interface BaseCommandInterface {
    args: any[];
    do(): void;
}

export interface CommandsChain {
    head: CommandsChainLinkInterface | null;
    current: CommandsChainLinkInterface | null;
    undo(): void;
    redo(): void;
}