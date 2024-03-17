import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FrameSizeDialogComponent } from '../../components/dialogs/frame-size-dialog/frame-size-dialog.component';
import { OpenProfileDialogComponent } from '../../components/dialogs/open-profile-dialog/open-profile-dialog.component';
import { 
  GroupDeletionConfirmationDialogComponent 
} from '../../components/dialogs/group-deletion-confirmation-dialog/group-deletion-confirmation-dialog.component';
import { 
  FrameDeletionConfirmationDialogComponent 
} from '../../components/dialogs/frame-deletion-confirmation-dialog/frame-deletion-confirmation-dialog.component';
import { CallbackInterface } from '../../interfaces/dialogs';


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

  openGroupDeletionConfirmationDialog(data: Object): void {
    this.dialog.open(
      GroupDeletionConfirmationDialogComponent,
      data
    );
  }

  openFrameDeletionConfirmationDialog(data: Object): void {
    this.dialog.open(
      FrameDeletionConfirmationDialogComponent,
      data
    );
  }
}
