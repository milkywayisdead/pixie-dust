import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ContextService } from '../../services/context/context.service';
import { TabsService } from '../../services/tabs/tabs.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FramesGroup } from '../../interfaces/frame';


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
    public context: ContextService,
    public tabsService: TabsService,
  ) {}

  openFramesGroup(group: FramesGroup): void {
    this.tabsService.addTab(group);
  }
}
