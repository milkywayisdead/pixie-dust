import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FrameCanvas } from '../interfaces/grid';
import { FramesService } from '../services/frames/frames.service';
import { LocaleService } from '../services/locale/locale.service';
import { GridService } from '../services/grid/grid.service';
import { ColorMap } from '../interfaces/colormap';
import { FrameCommandsChain } from '../services/commands_chain/frame-commands-chain.service';

@Component({
  selector: 'pix-editarium',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, NgIf],
  templateUrl: './editarium.component.html',
  styleUrl: './editarium.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [FrameCommandsChain],
})
export class EditariumComponent implements FrameCanvas {
  @Input() frameId: string = '';
  @Input() index: number = 0;
  @Input() color: string = '#000000';
  @Input() isFirst: boolean = false;
  @Input() isLast: boolean = false;
  @Input() active: boolean = false;
  drawingMode: boolean = false;
  clearing: boolean = false;
  cells: HTMLElement[] = [];
  colorMap: ColorMap = {};
  grid: HTMLElement|null = null;

  constructor(
    public framesService: FramesService,
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

  compileFrame(){
    const compiled = this.gridService.compileFrame(this.colorMap);
    return compiled;
  }

  parse(frameStr: string){
    return this.gridService.parse(frameStr);
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

  create(cols: number|string, rows: number|string){
    rows = Number(rows);
    cols = Number(cols);
    rows = rows > 0 ? rows : 20;
    cols = cols > 0 ? cols : 20;
    const grid = this.createGrid(cols, rows);
    document.getElementById(this.frameId)?.append(grid.grid);
    this.grid = grid.grid;
    this.cells = grid.cells;
  }

  remove(){
    this.framesService.remove(this.frameId);
  }

  ngAfterViewInit(){
    const grid = this.createGrid();
    document.getElementById(this.frameId)?.append(grid.grid);
    this.grid = grid.grid;
    this.cells = grid.cells;
  }

  toColorMap(color: string, cellIndex: number){
    if(!this.colorMap[color]){
      this.colorMap[color] = [];
    }
    this.colorMap[color].push(cellIndex);
  }

  fromColorMap(color: string, cellIndex: number){
    const cells = this.colorMap[color];
    if(!cells) return;

    const idx = cells.indexOf(cellIndex);
    if(idx !== -1){
      cells.splice(idx, 1);
    }
  }

  moveBack(): void {
    this.framesService.moveFrameBack(this.frameId);
  }

  moveForward(): void {
    this.framesService.moveFrameForward(this.frameId);
  }

  copy(): void {
    this.framesService.copyFrame(this);
  }
}
