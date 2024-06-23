import { Component, ViewEncapsulation, Input, AfterViewInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { KeyValuePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

import { FrameCanvas } from '../../interfaces/grid';
import { FramesService } from '../../services/frames/frames.service';
import { LocaleService } from '../../services/locale/locale.service';
import { ContextService } from '../../services/context/context.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { PaletteService } from '../../services/palette/palette.service';
import { ColorMap } from '../../interfaces/colormap';
import { FrameCommandsChain } from '../../services/commands_chain/frame-commands-chain.service';
import { FrameObject } from '../../interfaces/frame';
import { createCanvasWithColorMap } from '../../utils';
import { CanvasService } from '../../services/canvas/canvas.service';
import { PreviewGridComponent } from '../preview-grid/preview-grid.component';


const changeContainerHeight = (containerId: string) => {
  const container = document.getElementById(containerId)!;
  const rect = container.getBoundingClientRect();
  const height = window.innerHeight - rect.y - 75;
  container.style.height = height + 'px';
}


@Component({
  selector: 'pix-editorium',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    MatMenuModule,
    KeyValuePipe,
    PreviewGridComponent,
    MatMenuTrigger
  ],
  templateUrl: './editorium.component.html',
  styleUrl: './editorium.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [FrameCommandsChain],
})
export class EditoriumComponent implements FrameCanvas, AfterViewInit {
  @Input() index: number = 0;
  @Input() color: string = '#000000';
  @Input() isFirst: boolean = false;
  @Input() isLast: boolean = false;
  @Input() active: boolean = false;
  @Input() frame!: FrameObject;
  @Input() nRows: number = 0;
  @Input() nCols: number = 0;
  drawingMode: boolean = false;
  clearing: boolean = false;
  cells: HTMLElement[] = [];
  colorMap: ColorMap = {};
  grid: HTMLElement|null = null;
  @Input() framesService!: FramesService;
  @Input() groupId!: string;
  pixelSize: number = 14;
  canvas!: HTMLCanvasElement;

  constructor(
    public locale: LocaleService,
    public frameCommandsChain: FrameCommandsChain,
    public dialog: DialogService,
    public context: ContextService,
    public palette: PaletteService,
    public canvasService: CanvasService,
  ) {}

  clear(){
    this.canvasService.clearGrid(this);
  }

  destroy(){
    this.grid?.remove();
    this.grid = null;
    this.cells = [];
    this.colorMap = {};
  }

  remove(){
    const data = {
      callback: () => {
        this.framesService.remove(this.frame.id);
        this.framesService.removeGroupIfEmpty();
      }
    }
    this.dialog.openFrameDeletionConfirmationDialog({
      data: data,
    });
  }

  removeFramesGroup(): void {
    const data = {
      callback: () => {
        this.framesService.removeGroup()
      }
    }
    this.dialog.openGroupDeletionConfirmationDialog({
      data: data,
    });
  }

  ngAfterViewInit(): void {
    this.nCols = this.frame.cols;
    this.nRows = this.frame.rows;
    this.colorMap = this.frame.colorMap;
    this.initCanvas();
    this.canvasService.applyColorMap(this, this.colorMap);

    this.framesService.addCanvas(this);
    this.framesService.setShape({
      rows: this.nRows,
      cols: this.nCols
    });

    this.setUpContainerHeightAndResizeListener();
  }

  private initCanvas(){
    const canvas = this.canvasService.createCanvas(this.nCols, this.nRows, this.pixelSize, this);
    document.getElementById(this.frame.id)?.append(canvas);
    this.canvas = canvas;
  }

  ngOnDestroy(): void {
    const containerId = this.frame.id;
    removeEventListener('resize', function(){
      changeContainerHeight(containerId);
    });
    this.framesService.removeCanvas(this.frame.id);
  }

  toColorMap(color: string, cellIndex: number): void {
    if(!color) return;

    if(!this.colorMap[color]){
      this.colorMap[color] = [];
    }
    this.colorMap[color].push(cellIndex);
  }

  fromColorMap(color: string, cellIndex: number): void {
    const cells = this.colorMap[color];
    if(!cells) return;

    const idx = cells.indexOf(cellIndex);
    if(idx !== -1){
      cells.splice(idx, 1);
    }
  }

  moveBack(): void {
    this.framesService.moveFrameBack(this.frame.id);
  }

  moveForward(): void {
    this.framesService.moveFrameForward(this.frame.id);
  }

  copy(): void {
    this.framesService.copyFrame(this);
  }

  saveFrame(): void {
    const stringifiedColorMap = JSON.stringify(this.colorMap);
    this.framesService.saveFrame(this.frame.id, stringifiedColorMap);
  }

  isClear(): boolean {
    return Object.keys(this.colorMap).length === 0;
  }

  triggerColorPicker(): void {
    document.getElementById(`${this.frame.id}-cp`)?.click();
  }

  zoomIn(): void {
    this.framesService.zoomIn();
  }

  zoomOut(): void {
    this.framesService.zoomOut();
  }

  setScaleClass(scaleClass: string, classToRemove: string): void {
/*     this.grid?.classList.remove(classToRemove);
    this.grid?.classList.add(scaleClass); */
    this.canvas.classList.remove(classToRemove);
    this.canvas.classList.add(scaleClass);
  }

  private setUpContainerHeightAndResizeListener(): void {
    const containerId = this.frame.id;
    addEventListener('resize', function(){
      changeContainerHeight(containerId);
    });
    changeContainerHeight(containerId);
  }

  openPreviewDialog(): void {
    const group = this.context.getGroup(this.groupId);
    this.dialog.openAnimationPreviewDialog(group);
  }

  downloadPng(pixelSize: number = 10): void {
    const cols = this.frame.cols;
    const rows = this.frame.rows;
    const colorMap = this.frame.colorMap;
    const canvas = createCanvasWithColorMap(cols, rows, colorMap);

    const link = document.createElement('a');
    link.setAttribute('download', 'frame.png');
    link.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
    link.click();
  }

  setColor(color: string): void {
    this.color = color;
  }

  resizeCanvas(newPixelSize: number){
    this.pixelSize = newPixelSize;
    const width = this.nCols*this.pixelSize;
    const heigth = this.nRows*this.pixelSize;
    this.canvasService.resizeCanvas(this.canvas, width, heigth);
    this.canvasService.clearCanvas(this.canvas);
    this.canvasService.applyColorMap(this, this.colorMap);
  }
}
