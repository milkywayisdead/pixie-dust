import { ColorMap } from "./interfaces/colormap";

export const IDX_ATTR: string = 'pixidx';

export function extractIndex(target: HTMLElement): number {
    return Number(target.getAttribute(IDX_ATTR));
}

export function setColor(target: HTMLElement, color: string): void {
    target.style.backgroundColor = color || '#fff';

    // @ts-ignore
    target.attributes['style'].textContent = color ? `background-color:${color}` : '';
}

export function getColor(target: HTMLElement): string {
    // @ts-ignore
    const style = target.attributes['style'];
    if(style){
        return style.textContent.split(':')[1];
    }
    return '';
}

export function createCanvas(width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${width}`);
    canvas.setAttribute('height', `${height}`);
    return canvas;
}

const DEFAULT_CANVAS_PIXEL_SIZE = 14;
export function createCanvasWithColorMap(
    cols: number,
    rows: number,
    colorMap: ColorMap,
    pixelSize: number = DEFAULT_CANVAS_PIXEL_SIZE,
): HTMLCanvasElement {
    const canvas = createCanvas(cols*pixelSize, rows*pixelSize);
    const ctx = canvas.getContext('2d')!;
    // ?? ctx.fillStyle = 'white';
    // ?? ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let [color, cells] of Object.entries(colorMap)){
      cells.forEach((cellIndex: number) => {
        const rowN = Math.floor(cellIndex / rows);
        ctx.fillStyle = color;
        ctx.fillRect((cellIndex % rows)*pixelSize, rowN*pixelSize, pixelSize, pixelSize);
      });
    }

    return canvas;
}