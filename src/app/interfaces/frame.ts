import { ColorMap } from "./colormap";

export interface FrameObject {
    id: string;
    colorMap: ColorMap;
}

export interface FrameShape {
    cols: number;
    rows: number;
}