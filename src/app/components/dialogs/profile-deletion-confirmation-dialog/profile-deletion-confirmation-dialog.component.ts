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
  selector: 'app-profile-deletion-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './profile-deletion-confirmation-dialog.component.html',
  styleUrl: './profile-deletion-confirmation-dialog.component.css'
})
export class ProfileDeletionConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public callbackData: CallbackInterface,
    public dialogRef: MatDialogRef<ProfileDeletionConfirmationDialogComponent>,
    public locale: LocaleService,
  ){}

  deleteProfile(): void {
    this.callbackData.callback();
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
