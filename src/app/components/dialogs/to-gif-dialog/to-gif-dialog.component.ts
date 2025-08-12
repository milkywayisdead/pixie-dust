import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule }  from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LocaleService } from '../../../services/locale/locale.service';
import { ContextService } from '../../../services/context/context.service';

@Component({
  selector: 'app-to-gif-dialog',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './to-gif-dialog.component.html',
  styleUrl: './to-gif-dialog.component.css'
})
export class ToGifDialogComponent {
  profileName: string = '';

  constructor(
    public dialogRef: MatDialogRef<ToGifDialogComponent>,
    public locale: LocaleService,
    public context: ContextService,
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  saveGif(): void {}
}
