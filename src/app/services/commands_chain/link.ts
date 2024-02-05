import { BaseCommandInterface } from "../../interfaces/command";
import { BaseCommand } from "../../commands/base";

export interface CommandsChainLinkInterface {
    next: CommandsChainLinkInterface | null;
    previous: CommandsChainLinkInterface | null;
    setUndo(command: BaseCommandInterface): void;
    setRedo(command: BaseCommandInterface): void;
    undo(): void;
    redo(): void;
}

export class CommandsChainLink implements CommandsChainLinkInterface {
    next: CommandsChainLink | null = null;
    previous: CommandsChainLink | null = null;

    constructor(
        private undoCommand: BaseCommandInterface | null = null,
        private redoCommand: BaseCommandInterface | null = null
    ) {}

    hasUndo(): boolean {
        return this.undoCommand !== null;
    }

    hasRedo(): boolean {
        return this.redoCommand !== null;
    }

    setUndo(command: BaseCommand): void {
        this.undoCommand = command;
    };

    setRedo(command: BaseCommand): void {
        this.redoCommand = command;
    };

    undo(): void {
        this.undoCommand?.do()
    }

    redo(): void {
        this.redoCommand?.do()
    }
}