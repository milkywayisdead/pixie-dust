import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ColorMap } from '../../interfaces/colormap';
import { createCanvasWithColorMap } from '../../utils';


@Component({
  selector: 'preview-grid',
  standalone: true,
  imports: [],
  templateUrl: './preview-grid.component.html',
  styleUrl: './preview-grid.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class PreviewGridComponent {
  @Input() frameId: string = '';
  @Input() cols: number = 0;
  @Input() rows: number = 0;
  @Input() colorMap!: ColorMap;
  @Input() isFirst: boolean = false;
  @Input() pixelSize: number = 10;

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(
      () => {
        this.createCanvas()
      },
      100
    );
  }

  createCanvas(): void {
    const cols = this.cols;
    const rows = this.rows;
    const colorMap = this.colorMap;
    const canvas = createCanvasWithColorMap(cols, rows, colorMap, this.pixelSize);
    canvas.setAttribute('id', `${this.frameId}-preview-canvas`);
    canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    document.getElementById(this.frameId + '-preview')!.append(canvas);
  }
}
