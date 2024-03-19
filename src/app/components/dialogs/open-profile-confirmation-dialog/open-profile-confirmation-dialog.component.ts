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
  selector: 'app-open-profile-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './open-profile-confirmation-dialog.component.html',
  styleUrl: './open-profile-confirmation-dialog.component.css'
})
export class OpenProfileConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public callbackData: CallbackInterface,
    public dialogRef: MatDialogRef<OpenProfileConfirmationDialogComponent>,
    public locale: LocaleService,
  ){}

  openProfile(): void {
    this.callbackData.callback();
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
