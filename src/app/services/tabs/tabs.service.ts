import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  tabs: string[] = [];

  constructor() { }

  addTab(tabId: string): void {
    const alreadyOpened = this.tabs.indexOf(tabId) !== -1;
    if(alreadyOpened) return;

    this.tabs.push(tabId);
  }

  closeTab(tabId: string): void {
    const tabIndex = this.tabs.indexOf(tabId);
    if(tabIndex !== -1){
      this.tabs.splice(tabIndex, 1);
    }
  }
}
