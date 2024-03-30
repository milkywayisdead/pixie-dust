import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FramesGroup } from '../../interfaces/frame';
import { ContextService } from '../../services/context/context.service';
import { TabsService } from '../../services/tabs/tabs.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { LocaleService } from '../../services/locale/locale.service';


@Component({
  selector: 'pix-frameslist',
  standalone: true,
  imports: [
    NgFor,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './frameslist.component.html',
  styleUrl: './frameslist.component.css'
})
export class FrameslistComponent {
  constructor(
    public context: ContextService,
    public tabsService: TabsService,
    public dialog: DialogService,
    public locale: LocaleService,
  ) {}

  openFramesGroup(group: FramesGroup): void {
    this.tabsService.addTab(group);
  }

  openProfileInfoDialog(): void {
    this.dialog.openProfileInfoDialog({});
  }
}
