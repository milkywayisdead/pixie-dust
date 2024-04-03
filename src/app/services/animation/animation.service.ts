import { Injectable } from '@angular/core';
import { DialogService } from '../dialog/dialog.service';
import { ContextService } from '../context/context.service';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor(
    public dialogService: DialogService,
    public context: ContextService,
  ) { }

  openPreviewDialog(groupId: string): void {
    const group = this.context.getGroup(groupId);
    this.dialogService.openAnimationPreviewDialog(group);
  }
}
