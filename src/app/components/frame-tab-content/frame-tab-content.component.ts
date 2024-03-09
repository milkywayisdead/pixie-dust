import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { EditariumComponent } from '../editarium/editarium.component';
import { FramesService } from '../../services/frames/frames.service';
import { ContextService } from '../../services/context/context.service';


@Component({
  selector: 'frame-tab-content',
  standalone: true,
  imports: [
    NgFor,
    EditariumComponent,
  ],
  templateUrl: './frame-tab-content.component.html',
  styleUrl: './frame-tab-content.component.css',
  providers: [FramesService],
})
export class FrameTabContentComponent implements OnInit {
  @Input() frameId: string = '';

  constructor(
    public framesService: FramesService,
    public context: ContextService,
  ) {}

  ngOnInit(): void {
    this.framesService.currentGroup = this.frameId;
    this.framesService.bindFrames();

    if(this.framesService.frames.length){
      this.framesService.stepForward();
    }
  }

}
