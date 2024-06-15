import { BaseCommand } from "./base";
import { EditariumComponent } from "../components/editarium/editarium.component";

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