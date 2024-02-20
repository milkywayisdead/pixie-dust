import { BaseCommand } from "./base";
import { FrameCanvas } from "../interfaces/grid";
import { extractIndex, setColor, getColor } from "../utils";

export class ColorAPixelCommand extends BaseCommand {
    do(): void {
        const element: HTMLElement = this.args[0];
        const color: string = this.args[1];
        const editor: FrameCanvas = this.args[2];
        const cellIndex: number = this.args[3];
        const currentColor = getColor(element);
        editor.fromColorMap(currentColor, cellIndex);
        setColor(element, color);
        editor.toColorMap(color, cellIndex);
    }
}

export class ClearAPixelCommand extends BaseCommand {
    do(): void {
        const element: HTMLElement = this.args[0];
        const color: string = this.args[1];
        const editor: FrameCanvas = this.args[2];
        const cellIndex: number = this.args[3];
        //element.style.backgroundColor = '';
        setColor(element, '');
        editor.fromColorMap(color, cellIndex);
    }
}

export class ColorManyCommand extends BaseCommand {
    do(): void {
        const editor: FrameCanvas = this.args[0];
        const colors = this.args[1];
        const cells = this.args[2];

        cells.forEach((cell: HTMLElement, index: number) => {
            const color = colors[index];
            //cell.style.backgroundColor = color;
            setColor(cell, color);
            const cellIndex = extractIndex(cell);
            editor.toColorMap(color, cellIndex);
        });
    }
}

export class ClearManyCommand extends BaseCommand {
    do(): void {
        const editor: FrameCanvas = this.args[0];
        const colors = this.args[1];
        const cells = this.args[2];

        cells.forEach((cell: HTMLElement, index: number) => {
            const color = colors[index];
            const currentColor = getColor(cell); //cell.style.backgroundColor;
            //cell.style.backgroundColor = color;
            setColor(cell, color);
            const cellIndex = extractIndex(cell);
            editor.fromColorMap(currentColor, cellIndex);
        });
    }
}