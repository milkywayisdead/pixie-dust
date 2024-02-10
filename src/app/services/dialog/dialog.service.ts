import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FrameSizeDialogComponent } from '../../dialogs/frame-size-dialog/frame-size-dialog.component';
import { OpenProfileDialogComponent } from '../../dialogs/open-profile-dialog/open-profile-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog,
  ) { }

  openFrameSizeDialog(data: Object): void {
    this.dialog.open(FrameSizeDialogComponent, data);
  }

  openProfileSelectDialog(): void {
    const data = {}
    this.dialog.open(OpenProfileDialogComponent, data);
  }
}
