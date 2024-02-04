import { BaseCommand } from "./base";
import { DrawableGrid } from "../interfaces/grid";


export class ColorAPixel extends BaseCommand {
    constructor(args: any[]){
        super(args);
        this.undoCommand = ClearAPixel;
    }

    override do(): void {
        const element: HTMLElement = this.args[0];
        const color: string = this.args[1];
        element.style.backgroundColor = color;
    }
}

export class ClearAPixel extends BaseCommand {
    constructor(args: any[]){
        super(args);
        this.undoCommand = ColorAPixel;
    }

    override do(): void {
        const element: HTMLElement = this.args[0];
        const color: string = element.style.backgroundColor;
        element.style.backgroundColor = '';
        const grid: DrawableGrid = this.args[1];
        const cellIndex: number = this.args[2];
        grid.fromColorMap(color, cellIndex);
    }
}