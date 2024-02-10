import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FrameSizeDialogComponent } from '../../dialogs/frame-size-dialog/frame-size-dialog.component';

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
}
