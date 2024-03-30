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
  selector: 'app-profile-info-dialog',
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
  templateUrl: './profile-info-dialog.component.html',
  styleUrl: './profile-info-dialog.component.css'
})
export class ProfileInfoDialogComponent {
  profileName: string = '';

  constructor(
    public dialogRef: MatDialogRef<ProfileInfoDialogComponent>,
    public locale: LocaleService,
    public context: ContextService,
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  saveProfileInfo(): void {
    this.context.setProfileName(this.profileName);
    this.close();
  }

  ngOnInit(): void {
    this.profileName = this.context.getProfileName();
  }
}
