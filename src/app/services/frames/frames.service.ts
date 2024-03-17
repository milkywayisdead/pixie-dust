import { Injectable } from '@angular/core';
import { FrameCanvas } from '../../interfaces/grid';
import { FrameObject, CompiledFrames } from '../../interfaces/frame';
import { ColorMap } from '../../interfaces/colormap';
import { FrameShape } from '../../interfaces/frame';
import { GridService } from '../grid/grid.service';
import { ContextService } from '../context/context.service';
import { TabsService } from '../../services/tabs/tabs.service';


@Injectable({
  providedIn: 'root'
})
export class FramesService {
  frames: FrameObject[] = [];
  currentFrameIndex: number = -1;
  nCols: number = 20;
  nRows: number = 20;
  canvases: { [name: string]: FrameCanvas } = {};
  scales: number[] = [4, 8, 10, 14, 18, 20];
  scaleIndex: number = 3;
  currentGroup: string | null = null;

  constructor(
    public context: ContextService,
    private gridService: GridService,
    public tabsService: TabsService,
  ) {}

  add(): void {
    const frameId = `${+ new Date()}`;
    const groupId = this.currentGroup ?? `g${+ new Date()}`;
    const frame: FrameObject = {
      id: frameId,
      colorMap: {},
      cols: this.nCols,
      rows: this.nRows,
    }

    this.context.addFrameToGroup(frame, groupId, groupId);
    this.currentGroup = groupId;
    this.bindFrames();
    this.stepForward();
  }

  remove(frameId: string): void {
    const frameIndex = this.getFrameIndex(frameId);
    if(frameIndex !== -1){
      this.frames.splice(frameIndex, 1);
      this.reindex(frameIndex - 1);
    }
    this.context.removeFrame(this.currentGroup!, frameId);
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

  reset(): void {
    this.frames = [];
    this.currentFrameIndex = -1;
    this.canvases = {}
    this.scaleIndex = 3;
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

  addCanvas(canvas: FrameCanvas): void {
    this.canvases[canvas.frame.id] = canvas;
  }

  removeCanvas(id: string): void {
    delete this.canvases[id];
  }

  removeGroup(): void {
    const groupId = this.currentGroup!;
    this.tabsService.closeTab(groupId);
    this.context.removeGroup(groupId);
  }

  zoomIn(): void {
    const currentClass = `gs${this.scales[this.scaleIndex]}`;
    this.scaleIndex++;
    const newScaleNumber = this.scales[this.scaleIndex];
    const newClass = `gs${newScaleNumber}`;

    Object.values(this.canvases).forEach(canvas => {
      canvas.setScaleClass(newClass, currentClass);
      this.changeTableWidth(
        canvas.grid,
        this.nCols*newScaleNumber
      );
    });
  }

  zoomOut(): void {
    const currentClass = `gs${this.scales[this.scaleIndex]}`;
    this.scaleIndex--;
    const newScaleNumber = this.scales[this.scaleIndex];
    const newClass = `gs${newScaleNumber}`;

    Object.values(this.canvases).forEach(canvas => {
      canvas.setScaleClass(newClass, currentClass);
      this.changeTableWidth(
        canvas.grid,
        this.nCols*newScaleNumber
      );
    });
  }

  bindFrames(): void {
    if(!this.currentGroup) return;
    const group = this.context.getGroup(this.currentGroup);
    if(group){
      this.frames = group.frames;
    }
  }

  private changeTableWidth(table: HTMLElement | null, width: number): void {
    table!.style.width = `${width}px`;
  }

  removeGroupIfEmpty(): void {
    if(!this.frames.length){
      this.removeGroup();
    }
  }
}
