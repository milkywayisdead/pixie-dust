export interface BaseCommand {
    do(): void;
    getUndoCommand(args: any[]): BaseCommand;
}

export interface CommandsChain {

}