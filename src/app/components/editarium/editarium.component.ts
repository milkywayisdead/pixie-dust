import { Component, ViewEncapsulation, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

import { FrameCanvas } from '../../interfaces/grid';
import { FramesService } from '../../services/frames/frames.service';
import { LocaleService } from '../../services/locale/locale.service';
import { GridService } from '../../services/grid/grid.service';
import { ColorMap } from '../../interfaces/colormap';
import { FrameCommandsChain } from '../../services/commands_chain/frame-commands-chain.service';
import { FrameObject } from '../../interfaces/frame';


const changeContainerHeight = (containerId: string) => {
  const container = document.getElementById(containerId)!;
  const rect = container.getBoundingClientRect();
  const height = window.innerHeight - rect.y - 75;
  container.style.height = height + 'px';
}


@Component({
  selector: 'pix-editarium',
  standalone: true,
  imports: [
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
  ],
  templateUrl: './editarium.component.html',
  styleUrl: './editarium.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [FrameCommandsChain],
})
export class EditariumComponent implements FrameCanvas {
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

  constructor(
    public locale: LocaleService,
    public gridService: GridService,
    public frameCommandsChain: FrameCommandsChain,
  ) {}

  createGrid(cols: number=20, rows: number=20){
    return this.gridService.createGrid(cols, rows, this);
  }

  clear(){
    this.gridService.clearGrid(this);
  }

  draw(colorMap: ColorMap){
    this.colorMap = colorMap;
    this.gridService.draw(
      this.colorMap,
      this.cells
    );
  }

  destroy(){
    this.grid?.remove();
    this.grid = null;
    this.cells = [];
    this.colorMap = {};
  }

  remove(){
    this.framesService.remove(this.frame.id);
  }

  ngAfterViewInit(): void {
    this.nCols = this.frame.cols;
    this.nRows = this.frame.rows;
    const grid = this.createGrid(this.nCols, this.nRows);
    document.getElementById(this.frame.id)?.append(grid.grid);
    this.grid = grid.grid;
    this.cells = grid.cells;

    this.colorMap = this.frame.colorMap;
    this.gridService.applyColorMap(this);

    this.framesService.addCanvas(this);
    this.framesService.setShape({
      rows: this.nRows,
      cols: this.nCols
    });

    const containerId = this.frame.id;
    addEventListener('resize', function(){
      changeContainerHeight(containerId);
    });
    changeContainerHeight(containerId);
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
    this.grid?.classList.remove(classToRemove);
    this.grid?.classList.add(scaleClass);
  }
}
