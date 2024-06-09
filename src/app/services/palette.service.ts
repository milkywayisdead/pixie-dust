import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaletteService {
  public colors: string[] = [
    'black',
    'white',
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'purple',
  ];

  constructor() { }

  addColor(color: string): void {
    this.colors.push(color);
  }

  updateColorByIndex(index: number, newColor: string): void {
    this.colors[index] = newColor;
  }
}
