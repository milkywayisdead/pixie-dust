import { BaseCommand } from "./base";
import { FrameCanvas } from "../interfaces/grid";

function extractIndex(target: HTMLElement): number {
    return Number(target.getAttribute('pixidx'));
} 

export class ColorAPixel extends BaseCommand {
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
    do(): void {
        const element: HTMLElement = this.args[0];
        const color: string = this.args[1];
        const editor: FrameCanvas = this.args[2];
        const cellIndex: number = this.args[3];
        element.style.backgroundColor = '';
        editor.fromColorMap(color, cellIndex);
    }
}

export class ColorMany extends BaseCommand {
    do(): void {
        const editor: FrameCanvas = this.args[0];
        const colors = this.args[1];
        const cells = this.args[2];

        cells.forEach((cell: HTMLElement, index: number) => {
            const color = colors[index];
            cell.style.backgroundColor = color;
            const cellIndex = extractIndex(cell);
            editor.toColorMap(color, cellIndex);
        });
    }
}

export class ClearMany extends BaseCommand {
    do(): void {
        const editor: FrameCanvas = this.args[0];
        const colors = this.args[1];
        const cells = this.args[2];

        cells.forEach((cell: HTMLElement, index: number) => {
            const color = colors[index];
            const currentColor = cell.style.backgroundColor;
            cell.style.backgroundColor = color;
            const cellIndex = extractIndex(cell);
            editor.fromColorMap(currentColor, cellIndex);
        });
    }
}