import { ColorMap } from "./colormap";
import { FrameCommandsChain } from "../services/commands_chain/frame-commands-chain.service";

export interface GridInterface {
    cells: HTMLElement[];
    colorMap: ColorMap;
    grid: HTMLElement | null;
}

export interface DrawableGrid extends GridInterface {
    drawingMode: boolean;
    color: string;
    frameCommandsChain: FrameCommandsChain;
    toColorMap(color: string, cellIndex: number): void;
    fromColorMap(color: string, cellIndex: number): void;
}