import { BaseCommand } from "./base";
import { FrameCanvas } from "../interfaces/grid";


export class ColorAPixel extends BaseCommand {
    constructor(args: any[]){
        super(args);
    }

    do(): void {
        const element: HTMLElement = this.args[0];
        const color: string = this.args[1];
        const editor: FrameCanvas = this.args[2];
        const cellIndex: number = this.args[3];
        element.style.backgroundColor = color;
        editor.toColorMap(color, cellIndex);
    }
}

export class ClearAPixel extends BaseCommand {
    constructor(args: any[]){
        super(args);
    }

    do(): void {
        const element: HTMLElement = this.args[0];
        const color: string = this.args[1];
        const editor: FrameCanvas = this.args[2];
        const cellIndex: number = this.args[3];
        element.style.backgroundColor = '';
        editor.fromColorMap(color, cellIndex);
    }
}