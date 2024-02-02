import { FormControlName } from "@angular/forms";
import { ColorMap } from "./colormap";

export interface GridInterface {
    cells: HTMLElement[];
    colorMap: ColorMap;
    grid: HTMLElement | null;
}

export interface DrawableGrid extends GridInterface {
    drawingMode: boolean;
    color: string;
    toColorMap(color: string, cellIndex: number): void;
    fromColorMap(color: string, cellIndex: number): void;
}