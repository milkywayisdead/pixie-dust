import { ColorMap } from "./colormap";
import { FrameCommandsChain } from "../services/commands_chain/frame-commands-chain.service";

export interface GridInterface {
    cells: HTMLElement[];
    colorMap: ColorMap;
    grid: HTMLElement | null;
}

export interface FrameCanvas extends GridInterface {
    drawingMode: boolean;
    clearing: boolean;
    color: string;
    frameCommandsChain: FrameCommandsChain;
    toColorMap(color: string, cellIndex: number): void;
    fromColorMap(color: string, cellIndex: number): void;
}