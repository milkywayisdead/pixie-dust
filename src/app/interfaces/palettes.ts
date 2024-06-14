import { FrameObject } from "./frame";

export interface Palette {
    name: string;
    colors: string[];
}

export interface PreviewPalette extends Palette {
    frame: FrameObject;
}