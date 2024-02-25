import { Injectable } from '@angular/core';
import { FrameCanvas } from '../../interfaces/grid';
import { FrameObject, CompiledFrames } from '../../interfaces/frame';
import { ColorMap } from '../../interfaces/colormap';
import { FrameShape } from '../../interfaces/frame';
import { GridService } from '../grid/grid.service';


@Injectable({
  providedIn: 'root'
})
export class FramesService {
  frames: FrameObject[] = [];
  currentFrameIndex: number = -1;
  nCols: number = 20;
  nRows: number = 20;
  currentFrames: { [name: string]: FrameCanvas } = {}

  constructor(private gridService: GridService) { }

  add(): void {
    const frameId = `${+ new Date()}`;
    const frame: FrameObject = {
      id: frameId,
      colorMap: {},
      cols: this.nCols,
      rows: this.nRows,
    }
    this.frames.push(frame);
    this.stepForward();
  }

  remove(frameId: string): void {
    const frameIndex = this.getFrameIndex(frameId);
    if(frameIndex !== -1){
      this.frames.splice(frameIndex, 1);
      this.reindex(frameIndex - 1);
    }
  }

  removeAll(): void {
    this.frames = [];
    this.currentFrameIndex = -1;
  }

  stepBack(): void {
    this.currentFrameIndex--;
  }

  stepForward(): void {
    this.currentFrameIndex++;
  }

  moveFrameBack(frameId: string): void {
    const frameIndex = this.getFrameIndex(frameId);
    if(frameIndex !== -1){
      this.moveFrame(frameIndex, -1);
      this.currentFrameIndex--;
    }
  }

  moveFrameForward(frameId: string): void {
    const frameIndex = this.getFrameIndex(frameId);
    if(frameIndex !== -1){
      this.moveFrame(frameIndex, 1);
      this.currentFrameIndex++;
    }
  }

  toLastFrame(): void {
    this.currentFrameIndex = this.frames.length - 1;
  }

  toFirstFrame(): void {
    this.currentFrameIndex = 0;
  }

  compileFrames(): CompiledFrames {
    const compiled = {} as CompiledFrames;
    for(const [frameId, frame] of Object.entries(this.currentFrames)){
      const _compiled = this.gridService.compileFrame(
        frame.nRows, frame.nCols, frame.colorMap,
      );
      compiled[frameId] = _compiled;
    }
    return compiled;
  }

  parse(compiled: CompiledFrames): void {
    const frames: FrameObject[] = [];
    for(const [frameId, frameStr] of Object.entries(compiled)){
      frames.push(this.gridService.parse(frameId, frameStr));
    }
    this.frames = frames;
    if(this.frames.length){
      this.currentFrameIndex = 0;
    }
  }

  getShape(): FrameShape {
    return {
      rows: this.nRows,
      cols: this.nCols,
    }
  }

  setShape(shape: FrameShape): void {
    this.nRows = shape.rows;
    this.nCols = shape.cols;
  }

  private reindex(index: number): void {
    const fl = this.frames.length;
    let newIndex = -1;

    if(index < 0 && fl){
      newIndex = index + 1;
    } else {
      newIndex = index;
    }

    this.currentFrameIndex = newIndex;
  }

  copyFrame(canvas: FrameCanvas): void {
    const newFrameId = `${+ new Date()}`;
    const currentColorMap = canvas.colorMap;
    const newFrameColorMap: ColorMap = {}

    for(const [color, cells] of Object.entries(currentColorMap)){
      newFrameColorMap[color] = cells.map(cell => cell);
    }

    const newFrame: FrameObject = {
      id: newFrameId,
      colorMap: newFrameColorMap,
      cols: canvas.nCols,
      rows: canvas.nRows,
    }
    this.frames.push(newFrame);
    this.currentFrameIndex = this.frames.length - 1;
  } 

  private moveFrame(frameIndex: number, step: number = 0): void {
    const movingFrame = this.frames.splice(frameIndex, 1)[0];
    this.frames.splice(frameIndex + step, 0, movingFrame);
  }

  private getFrameById(frameId: string): FrameObject | undefined {
    const frame = this.frames.find(frame => frame.id === frameId);
    return frame;
  }

  private getFrameIndex(frameId: string): number {
    let frameIndex = -1;
    const frame = this.getFrameById(frameId);
    if(frame){
      frameIndex = this.frames.indexOf(frame);
    }

    return frameIndex;
  }

  addCurrentFrame(canvas: FrameCanvas): void {
    this.currentFrames[canvas.frame.id] = canvas;
  }

  removeFromCurrent(canvasId: string): void {
    delete this.currentFrames[canvasId];
  }
}
