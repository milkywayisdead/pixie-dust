import { BaseCommand } from "../interfaces/command";

export class Command implements BaseCommand {
    undoCommand: BaseCommand | null;

    constructor(args: any[], undoCommand: BaseCommand){
        this.undoCommand = undoCommand;
    }

    do(): void {

    }

    undo(args: any[]): void {
        
    }
}