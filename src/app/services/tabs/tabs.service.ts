import { Injectable } from '@angular/core';
import { FramesGroup } from '../../interfaces/frame';


@Injectable({
  providedIn: 'root'
})
export class TabsService {
  tabs: FramesGroup[] = [];

  constructor() { }

  addTab(tab: FramesGroup): void {
    const gIds = this.tabs.map(t => t.id);
    const alreadyOpened = gIds.indexOf(tab.id) !== -1;
    if(alreadyOpened) return;

    this.tabs.push(tab);
  }

  closeTab(tabId: string): void {
    const gIds = this.tabs.map(t => t.id);
    const tabIndex = gIds.indexOf(tabId);
    if(tabIndex !== -1){
      this.tabs.splice(tabIndex, 1);
    }
  }
}
