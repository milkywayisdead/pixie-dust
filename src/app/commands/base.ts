import { BaseCommandInterface } from "../interfaces/command";

export class BaseCommand implements BaseCommandInterface {
    undoCommand: new (...args: any[]) => any;
    args: any[];

    constructor(args: any[] = []) {
        this.undoCommand = BaseCommand;
        this.args = args;
    }

    do(): void {
        console.log(this.args)
    }

    getUndoCommand(args: any[]): BaseCommand {
        return new this.undoCommand(args);
    }
}