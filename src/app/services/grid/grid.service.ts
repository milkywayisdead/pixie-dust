import { Injectable } from '@angular/core';

import { FrameCanvas, GridInterface } from '../../interfaces/grid';
import { ColorMap } from '../../interfaces/colormap';
import { ColorAPixel, ClearAPixel } from '../../commands/drawing';


@Injectable({
  providedIn: 'root'
})
export class GridService {
  private IDX_ATTR = 'pixidx';

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
        const command = new ColorAPixel([target, editor.color, editor, cellIndex]);
        command.do();
        const undoCommand = new ClearAPixel([target, editor.color, editor, cellIndex]);
        editor.frameCommandsChain.addCommand(command);
        editor.frameCommandsChain.addCommand(undoCommand);
    });

    grid.addEventListener('contextmenu', function(e: Event){
      e.preventDefault();
      const target = e.target as HTMLElement;
      if(target.tagName !== 'TD') return;

      const cellIndex: number = _this.extractIndex(target);
      const currentColor = target.style.backgroundColor;
      const command = new ClearAPixel([target, '', editor, cellIndex]);
      command.do();
      
      if(currentColor !== ''){
        const undoCommand = new ColorAPixel([target, currentColor, editor, cellIndex]);
        editor.frameCommandsChain.addCommand(command);
        editor.frameCommandsChain.addCommand(undoCommand);
      }
    });

    grid.addEventListener('mousedown', function(e: Event){
      e.preventDefault();

      if((e as MouseEvent).button === 0){
        editor.drawingMode = true;
      }
    });
    grid.addEventListener('mouseup', function(e: Event){
      editor.drawingMode = false;
    });
    grid.addEventListener('mouseover', function(e: Event){
      const target = e.target as HTMLElement;
      if(target.tagName !== 'TD') return;
      if(editor.drawingMode){
        target.style.backgroundColor = editor.color;
        editor.toColorMap(editor.color, _this.extractIndex(target));
      }
    });
    grid.addEventListener('mouseleave', function(e: Event){
      editor.drawingMode = false;
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

  clearGrid(editor: GridInterface){
    const cells = editor.cells;
    for(const indices of Object.values(editor.colorMap)){
      indices.forEach(idx => {
        cells[idx].style.backgroundColor = '';
      });
    }
  }

  compileFrame(colorMap: ColorMap){
    let str = '20,20[';
    for(const [color, cells] of Object.entries(colorMap)){
      str += `${color}:${cells.join(',')}|`;
    }
    str += ']';
    return str;
  }

  parse(frameStr: string){
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

  draw(colorMap: ColorMap, cells: HTMLElement[]){
    for(const [color, cellsIndices] of Object.entries(colorMap)){
      for(const cellIndex of cellsIndices){
        cells[cellIndex].style.backgroundColor = color;
      }
    }
  }

  private extractIndex(cell: HTMLElement){
    return Number(cell.getAttribute(this.IDX_ATTR));
  }
}
