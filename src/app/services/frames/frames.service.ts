import { Injectable } from '@angular/core';
import { FrameCanvas } from '../../interfaces/grid';
import { ColorMap } from '../../interfaces/colormap';
import { FrameObject } from '../../interfaces/frame';


@Injectable({
  providedIn: 'root'
})
export class FramesService {
  frames: FrameObject[] = [];
  currentFrameIndex: number = -1;
  nCols: number = 20;
  nRows: number = 20;

  constructor() { }

  add(): void {
    const frameId = `${+ new Date()}`;
    const frame: FrameObject = {id: frameId, colorMap: {}}
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

  copyFrame(frame: FrameCanvas): void {

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
}
