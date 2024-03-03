import { ColorMap } from "./colormap";

export interface FrameObject {
    id: string;
    colorMap: ColorMap;
    cols: number;
    rows: number;
    group: string;
}

export interface FrameShape {
    cols: number;
    rows: number;
}

export interface CompiledFrames {
    [name: string]: string;
}