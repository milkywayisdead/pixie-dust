import { ColorMap } from "./colormap";

export interface FrameObject {
    id: string;
    colorMap: ColorMap;
    cols: number;
    rows: number;
}

export interface FrameShape {
    cols: number;
    rows: number;
}

export interface CompiledFrames {
    [name: string]: string;
}

export interface FramesGroup {
  id: string;
  name: string;
}