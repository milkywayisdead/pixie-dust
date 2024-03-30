import { CompiledFrames, FrameObject } from './frame';


export interface ContextFramesGroup {
    id: string;
    name: string;
    frames: FrameObject[];
}

export interface CompiledFramesGroup {
    id: string;
    name: string;
    frames: CompiledFrames;
}

export interface ContextInterface {
    id: string;
    name: string;
    frames: { [name: string] : ContextFramesGroup };
}

export interface ResponseContextInterface {
    _id: string;
    name: string;
    //frames: CompiledFrames;
    frames: { [name: string] : CompiledFramesGroup };
}