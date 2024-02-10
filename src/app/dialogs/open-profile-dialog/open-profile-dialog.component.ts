import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatInputModule }  from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { LocaleService } from '../../services/locale/locale.service';
import { FramesService } from '../../services/frames/frames.service';


@Component({
  selector: 'open-profile-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './open-profile-dialog.component.html',
  styleUrl: './open-profile-dialog.component.css'
})
export class OpenProfileDialogComponent {
    constructor(
      public dialogRef: MatDialogRef<OpenProfileDialogComponent>,
      public locale: LocaleService,
      public frameService: FramesService,
    ) {}
  
    close(): void {
      this.dialogRef.close();
    }
  
    openProfile(): void {
      this.close();
    }
}
