export interface BaseCommand {
    undoCommand: BaseCommand | null;
    do(): void;
    undo(args: any[]): void;
}

export interface CommandsChain {

}