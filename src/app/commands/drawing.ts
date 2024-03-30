import { BaseCommand } from "./base";
import { FrameCanvas } from "../interfaces/grid";
import { extractIndex, setColor, getColor } from "../utils";

export class ColorManyCommand extends BaseCommand {
    do(): void {
        const editor: FrameCanvas = this.args[0];
        const colors = this.args[1];
        const cells = this.args[2];

        cells.forEach((cell: HTMLElement, index: number) => {
            const cellIndex = extractIndex(cell);
            const currentColor = getColor(cell);
            editor.fromColorMap(currentColor, cellIndex);
            const color = colors[index];
            setColor(cell, color);
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
            const cellIndex = extractIndex(cell);
            editor.fromColorMap(color, cellIndex);
        });
    }
}