import { Component, ViewChildren } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';

import { EditariumComponent } from './editarium/editarium.component';
import { FramesService } from './frames/frames.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgFor,
    NgIf,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    EditariumComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pixie-dust';
  color = '#000000';
  frames: number[] = [];
  currentFrameIndex: number = 0;

  constructor(public framesService: FramesService) {}

  @ViewChildren('grids')
  editariums: EditariumComponent[]|undefined;

  addFrame(): void {
    this.framesService.add();
  }

  save(){
  }

  setColor(value: string):void{
    this.color = value;
  }

  createGrid(cols: number|string, rows: number|string){
    //this.grid?.create(cols, rows);
  }

  clearGrid(){
    //this.grid?.clear();
  }

  destroyGrid(){
    //this.grid?.destroy();
  }
}
