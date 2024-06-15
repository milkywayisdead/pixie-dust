import { ColorMap } from "./interfaces/colormap";
import { FrameObject } from "./interfaces/frame";

export const IDX_ATTR: string = 'pixidx';

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

export function strToFrameObject(frameId: string, frameStr: string): FrameObject {
    const shape = frameStr.split('[')[0].split(',');
    const colorList = frameStr.split('[')[1].replace(']', '').split('|');
    const colorMap: ColorMap = {};
    for(const cl of colorList){
        if(cl === '') continue;

        const _ = cl.split(':');
        const color = _[0];
        const cells = JSON.parse(`[${_[1]}]`);
        colorMap[color] = cells;
    }

    return {
        id: frameId,
        colorMap: colorMap,
        rows: Number(shape[0]),
        cols: Number(shape[1]),
    } as FrameObject;
}


export function compileFrame(nRows: number, nCols: number, colorMap: ColorMap): string {
    let str = `${nRows},${nCols}[`;
    for(const [color, cells] of Object.entries(colorMap)){
        if(!cells.length) continue;
        str += `${color}:${cells.join(',')}|`;
    }
    str += ']';
    return str;
}