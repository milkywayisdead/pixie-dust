import { Injectable } from '@angular/core';
import { Palette } from '../../interfaces/palettes';
import { palettes } from '../../palettes';

@Injectable({
  providedIn: 'root'
})
export class PaletteService {
  public colors: string[] = [];
  public current!: Palette;
  public palettes = palettes;

  constructor() {
    this.setPalette(palettes.basic);
  }

  addColor(color: string): void {
    this.colors.push(color);
  }

  setPalette(palette: Palette): void {
    this.colors = palette.colors.map(color => color);
    this.current = palette;
  }
}
