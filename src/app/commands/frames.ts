import { BaseCommand } from "./base";
import { FrameCanvas } from "../interfaces/grid";
import { ColorMap } from "../interfaces/colormap";
import { setColor } from "../utils";

export class ClearCanvasCommand extends BaseCommand {
    do(): void {
        const canvas: FrameCanvas = this.args[0];
        const cells = canvas.cells;
        cells.forEach((cell: HTMLElement) => {
            setColor(cell, '');
        });
        canvas.colorMap = {}
    }
}

export class ApplyColorMapCommand extends BaseCommand {
    do(): void {
        const canvas: FrameCanvas = this.args[0];
        const colorMap: ColorMap = this.args[1];
        const cells: HTMLElement[] = canvas.cells;

        for(const [color, cells_] of Object.entries(colorMap)){
            cells_.forEach((cellIndex: number) => {
                setColor(cells[cellIndex], color);
            })
        }

        canvas.colorMap = colorMap;
    } 
}