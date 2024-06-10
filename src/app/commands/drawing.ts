import { BaseCommand } from "./base";
import { FrameCanvas } from "../interfaces/grid";
import { extractIndex, setColor, getColor } from "../utils";
import { EditariumComponent } from "../components/editarium/editarium.component";

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

export class ColorCanvasCommand extends BaseCommand {
    do(): void {
        const editor: EditariumComponent = this.args[0];
        const colors = this.args[1];
        const cells = this.args[2];
        const canvas = this.args[3];
        const ctx = canvas.getContext('2d');
        const pixelSize = editor.pixelSize;

        cells.forEach((c: string, index: number) => {
            const cell = c.split('_');
            const cellX = Number(cell[0]);
            const cellY = Number(cell[1]);
            const currentColor = editor.canvasService.getCellColor(cellX, cellY, canvas);
            const cellIndex = (canvas.height / pixelSize)*cellY + cellX;
            ctx.fillStyle = colors[index];
            ctx.fillRect(cellX*pixelSize, cellY*pixelSize, pixelSize, pixelSize);
            editor.fromColorMap(currentColor, cellIndex);
            editor.toColorMap(colors[index], cellIndex);
        });
    }
}