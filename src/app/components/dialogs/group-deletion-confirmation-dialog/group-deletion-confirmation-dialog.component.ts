import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LocaleService } from '../../../services/locale/locale.service';
import { CallbackInterface } from '../../../interfaces/dialogs';


@Component({
  selector: 'app-group-deletion-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './group-deletion-confirmation-dialog.component.html',
  styleUrl: './group-deletion-confirmation-dialog.component.css'
})
export class GroupDeletionConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public callbackData: CallbackInterface,
    public dialogRef: MatDialogRef<GroupDeletionConfirmationDialogComponent>,
    public locale: LocaleService,
  ){}

  removeGroup(): void {
    this.callbackData.callback();
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
