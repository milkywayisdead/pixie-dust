import { Injectable } from '@angular/core';
import { FrameCanvas, GridInterface } from '../../interfaces/grid';
import { ColorMap } from '../../interfaces/colormap';
import { FrameObject, CompiledFrames } from '../../interfaces/frame';
import {
  ColorManyCommand,
  ClearManyCommand
} from '../../commands/drawing';
import {
  ClearCanvasCommand,
  ApplyColorMapCommand
} from '../../commands/frames';
import { extractIndex, IDX_ATTR, setColor, getColor } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  private IDX_ATTR = IDX_ATTR;

  constructor() { }
  
  createGrid(cols: number=20, rows: number=20, editor: FrameCanvas){
    const grid = document.createElement('table');
    grid.classList.add('grid');
    grid.classList.add('gs14');
    const cellsList = [];
    const _this = this;

    grid.addEventListener('contextmenu', function(e: Event){
      e.preventDefault();
    });

    let coveredCells: HTMLElement[] = [];
    let currentColors: string[] = [];
    grid.addEventListener('mousedown', function(e: Event){
      e.preventDefault();
      const me = e as MouseEvent;
      const target = me.target as HTMLElement;
      if(target.tagName !== 'TD') return;

      const btnIndex = me.button;
      if([0, 2].includes(btnIndex)){
        const cellColor = getColor(target);
        const cellIndex = _this.extractIndex(target);
        currentColors.push(cellColor);

        if(btnIndex){
          editor.clearing = true;
          setColor(target, '');
          editor.fromColorMap(cellColor, cellIndex);
        } else {
          const editorColor = editor.color;
          editor.drawingMode = true;
          setColor(target, editorColor);
          editor.fromColorMap(cellColor, cellIndex);
          editor.toColorMap(editorColor, cellIndex);
        }

        coveredCells.push(target);
      }
    });

    grid.addEventListener('mouseup', function(e: Event){
      if(coveredCells.length > 0){
        let command = new ColorManyCommand([editor, currentColors.map(c => editor.color), coveredCells.map(c => c)]);
        let undoCommand = new ColorManyCommand([editor, currentColors.map(c => c), coveredCells.map(c => c)]);
        if(editor.clearing){
          command = new ColorManyCommand([editor, currentColors.map(c => ''), coveredCells.map(c => c)]);
          undoCommand = new ColorManyCommand([editor, currentColors.map(c => c), coveredCells.map(c => c)]);
        }
        editor.frameCommandsChain.addCommand(command, undoCommand);
      }
      editor.drawingMode = false;
      editor.clearing = false;
      coveredCells = [];
      currentColors = [];
    });

    grid.addEventListener('mouseover', function(e: Event){
      if(!editor.drawingMode && !editor.clearing) return;

      const target = e.target as HTMLElement;
      if(target.tagName !== 'TD') return;

      const cellIndex: number = _this.extractIndex(target);
      const bgColor = getColor(target);
      const alreadyProcessed = editor.clearing ? bgColor === '' : bgColor === editor.color;
      //const alreadyProcessed: boolean = coveredCells.some(c => _this.extractIndex(c) === cellIndex);
      if(alreadyProcessed) return;

      if(editor.drawingMode){
        editor.fromColorMap(bgColor, cellIndex);
        currentColors.push(bgColor);
        setColor(target, editor.color);
        editor.toColorMap(editor.color, cellIndex);
        coveredCells.push(target);
      } else if(editor.clearing){
        currentColors.push(bgColor);
        setColor(target, '');
        editor.fromColorMap(bgColor, cellIndex);
        coveredCells.push(target);
      }
    });

    grid.addEventListener('mouseleave', function(e: Event){
      if(coveredCells.length > 0){
        let command = new ColorManyCommand([editor, currentColors.map(c => editor.color), coveredCells.map(c => c)]);
        let undoCommand = new ColorManyCommand([editor, currentColors.map(c => c), coveredCells.map(c => c)]);
        if(editor.clearing){
          command = new ColorManyCommand([editor, currentColors.map(c => ''), coveredCells.map(c => c)]);
          undoCommand = new ColorManyCommand([editor, currentColors.map(c => c), coveredCells.map(c => c)]);
        }
        editor.frameCommandsChain.addCommand(command, undoCommand);
      }
      editor.drawingMode = false;
      editor.clearing = false;
      coveredCells = [];
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

  compileFrame(nRows: number, nCols: number, colorMap: ColorMap): string {
    let str = `${nRows},${nCols}[`;
    for(const [color, cells] of Object.entries(colorMap)){
      if(!cells.length) continue;
      str += `${color}:${cells.join(',')}|`;
    }
    str += ']';
    return str;
  }

  parse(frameId: string, frameStr: string): FrameObject {
    const shape = frameStr.split('[')[0].split(',');
    const colorList = frameStr.split('[')[1].replace(']', '').split('|');
    const colorMap: ColorMap = {};
    for(const cl of colorList){
      if(cl === '') continue;

      const _ = cl.split(':');
      const color = _[0];
      const cells = JSON.parse(`[${_[1]}]`);
      colorMap[color] = cells;
    }

    return {
      id: frameId,
      colorMap: colorMap,
      rows: Number(shape[0]),
      cols: Number(shape[1]),
    } as FrameObject;
  }

  draw(colorMap: ColorMap, cells: HTMLElement[]): void {
    for(const [color, cellsIndices] of Object.entries(colorMap)){
      for(const cellIndex of cellsIndices){
        setColor(cells[cellIndex], color);
      }
    }
  }

  private extractIndex(cell: HTMLElement): number {
    return extractIndex(cell);
  }
}