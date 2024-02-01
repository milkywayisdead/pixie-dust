import { Component } from '@angular/core';
import { ViewEncapsulation, Input } from '@angular/core';

const _IDX_ATTR = 'pixidx';

@Component({
  selector: 'pix-grid',
  standalone: true,
  imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class GridComponent {
  containerId: string = `grid${+ new Date()}`;
  @Input() color: string = '#000000';
  drawingMode: boolean = false;
  _cells: Array<HTMLElement> = [];
  _colorMap: { [color: string]: Array<number> } = {};
  _grid: HTMLElement | null = null;

  createGrid(cols:number=20, rows:number=20){
    const grid = document.createElement('table');
    grid.classList.add('grid');
    const cellsList = [];

    const _this = this;
    grid.addEventListener('click', function(e: Event){
        const target = e.target as HTMLElement;
        if(target.tagName !== 'TD') return;

        target.style.backgroundColor = _this.color;
        _this._toColorMap(_this.color, _this._extractIndex(target));
    });

    grid.addEventListener('contextmenu', function(e: Event){
      e.preventDefault();
      const target = e.target as HTMLElement;
      if(target.tagName !== 'TD') return;

      target.style.backgroundColor = '';
      _this._fromColorMap(_this.color, _this._extractIndex(target));
    });

    grid.addEventListener('mousedown', function(e: Event){
      e.preventDefault();
      _this.drawingMode = true;
    });
    grid.addEventListener('mouseup', function(e: Event){
      _this.drawingMode = false;
    });
    grid.addEventListener('mouseover', function(e: Event){
      const target = e.target as HTMLElement;
      if(target.tagName !== 'TD') return;
      if(_this.drawingMode){
        target.style.backgroundColor = _this.color;
        _this._toColorMap(_this.color, _this._extractIndex(target));
      }
    });
    grid.addEventListener('mouseleave', function(e: Event){
      _this.drawingMode = false;
    });

    for(let r=0;r<rows;r++){
        const row = document.createElement('tr');
        for(let c=0;c<cols;c++){
            const col = document.createElement('td');
            col.setAttribute(_IDX_ATTR, `${r*cols + c}`);
            row.append(col);
            cellsList.push(col);
        }
        grid.append(row);
    }
    return {grid: grid, cells: cellsList};
  }

  clear(){
    const cells = this._cells;
    for(const indices of Object.values(this._colorMap)){
      indices.forEach(idx => {
        cells[idx].style.backgroundColor = '';
      });
    }
  }

  compileFrame(){
    let str = '20,20[';
    for(const [color, cells] of Object.entries(this._colorMap)){
      str += `${color}:${cells.join(',')}|`;
    }
    str += ']';
    return str;
  }

  parse(frameStr: string){
    const colorList = frameStr.split('[')[1].replace(']', '').split('|');
    const colorMap: { [name: string]: Array<number> } = {};
    for(const cl of colorList){
      if(cl === '') continue;

      const _ = cl.split(':');
      const color = _[0];
      const cells = JSON.parse(`[${_[1]}]`);
      colorMap[color] = cells;
    }

    return colorMap;
  }

  draw(colorMap: { [name: string]: Array<number> }){
    this._colorMap = colorMap;
    for(const [color, cells] of Object.entries(this._colorMap)){
      for(const cell of cells){
        this._cells[cell].style.backgroundColor = color;
      }
    }
  }

  destroy(){
    this._grid?.remove();
    this._grid = null;
    this._cells = [];
    this._colorMap = {};
  }

  create(cols: number|string, rows: number|string){
    rows = Number(rows);
    cols = Number(cols);
    rows = rows > 0 ? rows : 20;
    cols = cols > 0 ? cols : 20;
    const grid = this.createGrid(cols, rows);
    document.getElementById(this.containerId)?.append(grid.grid);
    this._grid = grid.grid;
    this._cells = grid.cells;
  }

  /*ngAfterViewInit(){
    const grid = this.createGrid();
    document.getElementById(this.containerId)?.append(grid.grid);
    this._grid = grid.grid;
    this._cells = grid.cells;
  }*/

  _toColorMap(color: string, cellIndex: number){
    if(!this._colorMap[color]){
      this._colorMap[color] = [];
    }
    this._colorMap[color].push(cellIndex);
  }

  _fromColorMap(color: string, cellIndex: number){
    const cells = this._colorMap[color];
    if(!cells) return;

    const idx = cells.indexOf(cellIndex);
    if(idx !== -1){
      cells.splice(idx, 1);
    }
  }

  _extractIndex(cell: HTMLElement){
    return Number(cell.getAttribute(_IDX_ATTR));
  }
}
