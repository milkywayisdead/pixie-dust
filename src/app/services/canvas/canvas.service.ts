import { Injectable } from '@angular/core';

import { FrameCanvas } from '../../interfaces/grid';
import { ColorCanvasCommand } from '../../commands/drawing';
import { ApplyColorMapCommandToCanvas } from '../../commands/frames';
import { ColorMap } from '../../interfaces/colormap';


@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  constructor() { }

  createCanvas(cols: number=20, rows: number=20, pixelSize: number, editor: FrameCanvas): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const width = cols*pixelSize;
    const height = rows*pixelSize;
    canvas.classList.add('grid');
    canvas.classList.add('gs14');
    canvas.setAttribute('width', `${width}`);
    canvas.setAttribute('height', `${height}`);
    const ctx = canvas.getContext('2d');
    ctx!.fillStyle = '#ffffff';
    ctx?.fillRect(0, 0, width, height);

    const _this = this;

    canvas.addEventListener('contextmenu', function(e: Event){
      e.preventDefault();
    });

    let cellsIds: string[] = [];
    let currentColors: string[] = [];

    canvas.addEventListener('mousedown', function(e: Event){
      e.preventDefault();
      const me = e as MouseEvent;
      const rect = canvas.getBoundingClientRect();
      const x = me.clientX - rect.left;
      const y = me.clientY - rect.top;
      const btnIndex = me.button;
      if([0, 2].includes(btnIndex)){
        const cellIndex = _this.getCellIndex(x, y, editor.pixelSize, canvas);
        const cellColor = _this.getCellColor(x, y, canvas);
        const cellX = Math.floor(x / pixelSize);
        const cellY = Math.floor(y / pixelSize);
        
        if(btnIndex){
          const color = '#ffffff';
          editor.clearing = true;
          editor.fromColorMap(cellColor, cellIndex);
          _this.colorCell(cellX, cellY, color, editor.pixelSize, canvas);
        } else {
          const editorColor = editor.color;
          editor.drawingMode = true;
          _this.colorCell(cellX, cellY, editorColor, editor.pixelSize, canvas);
          editor.fromColorMap(cellColor, cellIndex);
          editor.toColorMap(editorColor, cellIndex);
        }

        const cellId = `${cellX}_${cellY}`;
        if(!cellsIds.includes(cellId)){
          cellsIds.push(`${cellX}_${cellY}`);
          currentColors.push(cellColor);
        }
      }
    });

    canvas.addEventListener('mouseup', function(e: Event){
      if(cellsIds.length > 0){
        let command = new ColorCanvasCommand([editor, currentColors.map(c => editor.color), cellsIds.map(c => c), canvas]);
        let undoCommand = new ColorCanvasCommand([editor, currentColors.map(c => c), cellsIds.map(c => c), canvas]);
        if(editor.clearing){
          command = new ColorCanvasCommand([editor, currentColors.map(c => '#ffffff'), cellsIds.map(c => c), canvas]);
          undoCommand = new ColorCanvasCommand([editor, currentColors.map(c => c), cellsIds.map(c => c), canvas]);
        }
        editor.frameCommandsChain.addCommand(command, undoCommand);
      }
      editor.drawingMode = false;
      editor.clearing = false;
      currentColors = [];
      cellsIds = [];
    });

    canvas.addEventListener('mousemove', function(e: Event){
      if(!editor.drawingMode && !editor.clearing) return;
      const rect = canvas.getBoundingClientRect();
      const me = e as MouseEvent;
      const x = me.clientX - rect.left;
      const y = me.clientY - rect.top;

      const cellIndex = _this.getCellIndex(x, y, editor.pixelSize, canvas);
      const cellColor = _this.getCellColor(x, y, canvas);
      const cellX = Math.floor(x / pixelSize);
      const cellY = Math.floor(y / pixelSize);

      if(editor.drawingMode){
        editor.fromColorMap(cellColor, cellIndex);
        editor.toColorMap(editor.color, cellIndex);
        _this.colorCell(cellX, cellY, editor.color, editor.pixelSize, canvas);
      } else if(editor.clearing){
        editor.fromColorMap(cellColor, cellIndex);
        _this.colorCell(cellX, cellY, '#ffffff', editor.pixelSize, canvas);
      }

      const cellId = `${cellX}_${cellY}`;
      if(!cellsIds.includes(cellId)){
        cellsIds.push(`${cellX}_${cellY}`);
        currentColors.push(cellColor);
      }
    });

    canvas.addEventListener('mouseleave', function(e: Event){
      if(cellsIds.length > 0){
        let command = new ColorCanvasCommand([editor, currentColors.map(c => editor.color), cellsIds.map(c => c)]);
        let undoCommand = new ColorCanvasCommand([editor, currentColors.map(c => c), cellsIds.map(c => c)]);
        if(editor.clearing){
          command = new ColorCanvasCommand([editor, currentColors.map(c => '#ffffff'), cellsIds.map(c => c)]);
          undoCommand = new ColorCanvasCommand([editor, currentColors.map(c => c), cellsIds.map(c => c)]);
        }
        editor.frameCommandsChain.addCommand(command, undoCommand);
      }
      editor.drawingMode = false;
      editor.clearing = false;
      cellsIds = [];
      currentColors = [];
    });


    return canvas;
  }

  getCellIndex(x: number, y: number, pixelSize: number, canvas: HTMLCanvasElement): number {
    const indexByX = Math.floor(x / pixelSize);
    const indexByY = Math.floor(y / pixelSize);
    const height = canvas.height;
    return indexByY*height/pixelSize + indexByX;
  }

  getCellColor(x: number, y: number, canvas: HTMLCanvasElement): string {
    const ctx = canvas.getContext('2d');
    const data = ctx?.getImageData(x, y, 1, 1).data!;
    const r = data[0].toString(16);
    const g = data[1].toString(16);
    const b = data[2].toString(16);
    const R = r.length > 1 ? r : `0${r}`;
    const G = g.length > 1 ? g : `0${g}`;
    const B = b.length > 1 ? b : `0${b}`;
    return `#${R}${G}${B}`;
  }

  colorCell(x: number, y: number, color: string, pixelSize: number, canvas: HTMLCanvasElement){
    const ctx = canvas.getContext('2d');
    if(!ctx) return;
    ctx.fillStyle = color;
    ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
  }

  applyColorMap(editor: FrameCanvas, colorMap: ColorMap){
    const command = new ApplyColorMapCommandToCanvas([editor, colorMap]);
    command.do();
  }

  clearCanvas(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if(!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  resizeCanvas(canvas: HTMLCanvasElement, width: number, height: number): void {
    canvas.width = width;
    canvas.height = height;
  }
}
