import { Injectable } from '@angular/core';
import { Frame } from './frames';

@Injectable({
  providedIn: 'root'
})
export class FramesService {
  frames:number[] = [];
  currentFrameIndex:number = -1;

  constructor() { }

  add(): void {
    this.frames.push(1);
    this.stepForward();
  }

  removeIndex(index: number): void {
    this.frames.splice(index, 1);
    this.stepBack();
    
  } 

  /* remove(frame: Frame): void {
    this.frames.splice(
      this.frames.indexOf(frame),
      1
    );
  } */

  stepBack(): void {
    this.currentFrameIndex--;
  }

  stepForward(): void {
    this.currentFrameIndex++;
  }

  _reindex(): void {
    const hasFrames = this.frames.length > 0;
    if(this.currentFrameIndex === 0){
      if(hasFrames){
        
      }
    }
  }
}
