import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { TabsService } from '../../services/tabs/tabs.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'pix-tabsarea',
  standalone: true,
  imports: [
    NgFor,
    MatTabsModule,
    MatIconModule,
  ],
  templateUrl: './tabsarea.component.html',
  styleUrl: './tabsarea.component.css'
})
export class TabsareaComponent {
  constructor(
    public tabsService: TabsService,
  ) {}

  closeTab(tabId: string): void {
    this.tabsService.closeTab(tabId);
  }
}
