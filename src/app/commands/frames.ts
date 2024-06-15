import { BaseCommand } from "./base";
import { FrameCanvas } from "../interfaces/grid";
import { ColorMap } from "../interfaces/colormap";
import { EditariumComponent } from "../components/editarium/editarium.component";

interface FrameWithCanvas extends FrameCanvas {
    canvas: HTMLCanvasElement;
}

export class ApplyColorMapCommand extends BaseCommand {
    do(): void {
        const editor: FrameWithCanvas = this.args[0];
        const colorMap: ColorMap = this.args[1];
        const canvas = editor.canvas;
        const ctx = canvas.getContext('2d');
        if(!ctx) return;
        const pixelSize = editor.pixelSize;
        const rows = editor.nRows;
        const cols = editor.nCols;

        for(const [color, cells] of Object.entries(colorMap)){
            cells.forEach((cellIndex: number) => {
                const rowN = Math.floor(cellIndex / rows);
                ctx.fillStyle = color;
                ctx.fillRect((cellIndex % rows)*pixelSize, rowN*pixelSize, pixelSize, pixelSize);
            })
        }

        editor.colorMap = colorMap;
    } 
}

export class ClearCanvasCommand extends BaseCommand {
    do(): void {
        const editor: EditariumComponent = this.args[0];
        editor.canvasService.clearCanvas(editor.canvas);
        editor.colorMap = {}
    }
}