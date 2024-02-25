import { CompiledFrames } from './frame';

export interface ContextInterface {
    id: string;
    name: string;
}

export interface ResponseContextInterface {
    _id: string;
    name: string;
    frames: CompiledFrames;
}