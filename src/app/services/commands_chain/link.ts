import { CommandsChainLinkInterface, BaseCommandInterface } from "../../interfaces/command";

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

    setUndo(command: BaseCommandInterface): void {
        this.undoCommand = command;
    };

    setRedo(command: BaseCommandInterface): void {
        this.redoCommand = command;
    };

    undo(): void {
        this.undoCommand?.do()
    }

    redo(): void {
        this.redoCommand?.do()
    }
}