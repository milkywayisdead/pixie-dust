import { Injectable } from '@angular/core';

import { FrameCanvas, GridInterface } from '../../interfaces/grid';
import { ColorMap } from '../../interfaces/colormap';
import { 
  ColorAPixelCommand,
  ClearAPixelCommand,
  ColorManyCommand,
  ClearManyCommand } from '../../commands/drawing';
import {
  ClearCanvasCommand,
  ApplyColorMapCommand,
  CopyFrameCommand 
} from '../../commands/frames';
import { extractIndex, IDX_ATTR } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  private IDX_ATTR = IDX_ATTR;

  constructor() { }
  
  createGrid(cols: number=20, rows: number=20, editor: FrameCanvas){
    const grid = document.createElement('table');
    grid.classList.add('grid');
    const cellsList = [];
    const _this = this;

    grid.addEventListener('click', function(e: Event){
        const target = e.target as HTMLElement;
        if(target.tagName !== 'TD') return;

        const cellIndex: number = _this.extractIndex(target);
        const command = new ColorAPixelCommand([target, editor.color, editor, cellIndex]);
        command.do();
        const undoCommand = new ClearAPixelCommand([target, editor.color, editor, cellIndex]);
        editor.frameCommandsChain.addCommand(command, undoCommand);
    });

    grid.addEventListener('contextmenu', function(e: Event){
      e.preventDefault();
      const target = e.target as HTMLElement;
      if(target.tagName !== 'TD') return;

      const cellIndex: number = _this.extractIndex(target);
      const currentColor = target.style.backgroundColor;
      const command = new ClearAPixelCommand([target, '', editor, cellIndex]);
      command.do();
      
      if(currentColor !== ''){
        const undoCommand = new ColorAPixelCommand([target, currentColor, editor, cellIndex]);
        editor.frameCommandsChain.addCommand(command, undoCommand);
      }
    });

    let drawingStartingPoint: HTMLElement | null = null;
    let coveredCells: HTMLElement[] = [];
    let currentColors: string[] = [];
    grid.addEventListener('mousedown', function(e: Event){
      e.preventDefault();
      const me = e as MouseEvent;

      const btnIndex = me.button;
      if([0, 2].includes(btnIndex)){
        if(btnIndex){
          editor.clearing = true;
        } else {
          editor.drawingMode = true;
        }

        const target = (me.target as HTMLElement);
        if(target.tagName === 'TD'){
          drawingStartingPoint = target;
        }
      }
    });

    grid.addEventListener('mouseup', function(e: Event){
      if(coveredCells.length > 0){
        let command = new ColorManyCommand([editor, currentColors.map(c => editor.color), coveredCells.map(c => c)]);
        let undoCommand = new ClearManyCommand([editor, currentColors.map(c => c), coveredCells.map(c => c)]);
        if(editor.clearing){
          command = new ClearManyCommand([editor, currentColors.map(c => ''), coveredCells.map(c => c)]);
          undoCommand = new ColorManyCommand([editor, currentColors.map(c => c), coveredCells.map(c => c)]);
        }
        editor.frameCommandsChain.addCommand(command, undoCommand);
      }
      editor.drawingMode = false;
      editor.clearing = false;
      coveredCells = [];
      drawingStartingPoint = null;
      currentColors = [];
    });

    grid.addEventListener('mouseover', function(e: Event){
      const target = e.target as HTMLElement;
      if(target.tagName !== 'TD') return;

      const cellIndex: number = _this.extractIndex(target);
      const bgColor = target.style.backgroundColor;
      const alreadyProcessed: boolean = coveredCells.some(c => _this.extractIndex(c) === cellIndex);
      if(alreadyProcessed) return;

      if(editor.drawingMode){
        currentColors.push(bgColor);
        target.style.backgroundColor = editor.color;
        editor.toColorMap(editor.color, cellIndex);
        coveredCells.push(target);
      } else if(editor.clearing){
        currentColors.push(bgColor);
        target.style.backgroundColor = '';
        editor.fromColorMap('', cellIndex);
        coveredCells.push(target);
      }
    });

    grid.addEventListener('mouseleave', function(e: Event){
      if(coveredCells.length > 0){
        let command = new ColorManyCommand([editor, currentColors.map(c => editor.color), coveredCells.map(c => c)]);
        let undoCommand = new ClearManyCommand([editor, currentColors.map(c => c), coveredCells.map(c => c)]);
        if(editor.clearing){
          command = new ClearManyCommand([editor, currentColors.map(c => ''), coveredCells.map(c => c)]);
          undoCommand = new ColorManyCommand([editor, currentColors.map(c => c), coveredCells.map(c => c)]);
        }
        editor.frameCommandsChain.addCommand(command, undoCommand);
      }
      editor.drawingMode = false;
      editor.clearing = false;
      coveredCells = [];
      drawingStartingPoint = null;
      currentColors = [];
    });

    for(let r=0;r<rows;r++){
        const row = document.createElement('tr');
        for(let c=0;c<cols;c++){
            const col = document.createElement('td');
            col.setAttribute(this.IDX_ATTR, `${r*cols + c}`);
            row.append(col);
            cellsList.push(col);
        }
        grid.append(row);
    }
    return {grid: grid, cells: cellsList};
  }

  applyColorMap(canvas: FrameCanvas): void {
    const command = new ApplyColorMapCommand([canvas, canvas.colorMap]);
    command.do();
  }

  clearGrid(canvas: FrameCanvas): void {
    if(canvas.isClear()) return

    const colorMapCopy: ColorMap = {}
    for(const [color, cells] of Object.entries(canvas.colorMap)){
        colorMapCopy[color] = cells.map(c => c);
    }

    const command = new ClearCanvasCommand([canvas]);
    const undoCommand = new ApplyColorMapCommand([canvas, colorMapCopy]);
    command.do();
    canvas.frameCommandsChain.addCommand(command, undoCommand);
  }

  compileFrame(colorMap: ColorMap){
    let str = '20,20[';
    for(const [color, cells] of Object.entries(colorMap)){
      str += `${color}:${cells.join(',')}|`;
    }
    str += ']';
    return str;
  }

  parse(frameStr: string): ColorMap {
    const colorList = frameStr.split('[')[1].replace(']', '').split('|');
    const colorMap: ColorMap = {};
    for(const cl of colorList){
      if(cl === '') continue;

      const _ = cl.split(':');
      const color = _[0];
      const cells = JSON.parse(`[${_[1]}]`);
      colorMap[color] = cells;
    }

    return colorMap;
  }

  draw(colorMap: ColorMap, cells: HTMLElement[]): void {
    for(const [color, cellsIndices] of Object.entries(colorMap)){
      for(const cellIndex of cellsIndices){
        cells[cellIndex].style.backgroundColor = color;
      }
    }
  }

  private extractIndex(cell: HTMLElement): number {
    return extractIndex(cell);
  }
}
