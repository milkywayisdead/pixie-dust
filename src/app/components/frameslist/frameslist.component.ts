import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FramesService } from '../../services/frames/frames.service';
import { ContextService } from '../../services/context/context.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'pix-frameslist',
  standalone: true,
  imports: [
    NgFor,
    MatCardModule,
    MatListModule,
  ],
  templateUrl: './frameslist.component.html',
  styleUrl: './frameslist.component.css'
})
export class FrameslistComponent {
  constructor(
    public framesService: FramesService,
    public context: ContextService,
  ) {}
}
