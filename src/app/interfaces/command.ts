export interface BaseCommandInterface {
    do(): void;
    getUndoCommand(args: any[]): BaseCommandInterface;
}

export interface CommandsChain {
    commands: BaseCommandInterface[];
    currentCommandIndex: number | null;  
    add(undoCommand: BaseCommandInterface, redoCommand: BaseCommandInterface): void;
}