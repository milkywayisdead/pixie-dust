import { Injectable } from '@angular/core';
import { Frame } from './frames';

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

  stepBack(): void {
    this.currentFrameIndex--;
  }

  stepForward(): void {
    this.currentFrameIndex++;
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
}
