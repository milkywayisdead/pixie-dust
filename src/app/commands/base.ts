import { BaseCommandInterface } from "../interfaces/command";

export abstract class BaseCommand implements BaseCommandInterface {
    args: any[];

    constructor(args: any[] = []) {
        this.args = args;
    }

    abstract do(): void;
}