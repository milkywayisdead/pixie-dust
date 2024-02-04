import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FramesService {
  frames:string[] = [];
  currentFrameIndex:number = -1;

  constructor() { }

  add(): void {
    this.frames.push(`${+ new Date()}`);
    this.stepForward();
  }

  remove(frameId: string): void {
    const index = this.frames.indexOf(frameId);
    if(index !== -1){
      this.frames.splice(index, 1);
    }
    
    this.reindex(index - 1);
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
    const frameIndex = this.frames.indexOf(frameId);
    if(frameIndex !== -1){
      this.moveFrame(frameIndex, -1);
      this.currentFrameIndex--;
    }
  }

  moveFrameForward(frameId: string): void {
    const frameIndex = this.frames.indexOf(frameId);
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

  private moveFrame(frameIndex: number, step: number = 0): void {
    const movingFrame = this.frames.splice(frameIndex, 1)[0];
    this.frames.splice(frameIndex + step, 0, movingFrame);
  }
}
