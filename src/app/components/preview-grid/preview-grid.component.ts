import { Component, Input, ViewEncapsulation } from '@angular/core';
import { GridService } from '../../services/grid/grid.service';
import { FrameObject } from '../../interfaces/frame';


@Component({
  selector: 'preview-grid',
  standalone: true,
  imports: [],
  templateUrl: './preview-grid.component.html',
  styleUrl: './preview-grid.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class PreviewGridComponent {
  @Input() frame!: FrameObject;
  @Input() isFirst: boolean = false;

  constructor(public gridService: GridService) {}

  ngOnInit(): void {
    setTimeout(() => {this.createGrid()}, 100);
  }

  createGrid(): void {
    const cols = this.frame.cols;
    const rows = this.frame.rows;
    const colorMap = this.frame.colorMap;
    const grid = document.createElement('table');
    grid.classList.add('preview-grid');
    grid.style.width = `${cols*14}px`;
    grid.style.height = `${rows*14}px`;
    const cellsList = [];

    for(let r=0;r<rows;r++){
        const row = document.createElement('tr');
        for(let c=0;c<cols;c++){
            const col = document.createElement('td');
            col.setAttribute('pixidx', `${r*cols + c}`);
            row.append(col);
            cellsList.push(col);
        }
        grid.append(row);
    }

    this.gridService.draw(colorMap, cellsList);

    document.getElementById(this.frame.id + '-preview')!.append(grid);
  }
}
