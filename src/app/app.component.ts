import { Component, ViewChildren } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';

import { EditariumComponent } from './editarium/editarium.component';

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
  title = 'pix';
  color = '#000000';
  frames: number[] = [];
  currentFrameIndex: number = 0;

  @ViewChildren('grids')
  editariums: EditariumComponent[]|undefined;

  addFrame(){
    this.frames.push(this.frames.length);
  }

  switch(direction: string){
    if(direction === 'next'){
      this.currentFrameIndex++;
    } else if(direction === 'previous'){
      this.currentFrameIndex--;
    }
  }

  save(){
    this.editariums?.forEach((ed: EditariumComponent) => {
      console.log(ed)
    })
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
