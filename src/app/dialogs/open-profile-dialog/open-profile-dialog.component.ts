import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ApiService } from '../../services/api/api.service';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatInputModule }  from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { LocaleService } from '../../services/locale/locale.service';
import { FramesService } from '../../services/frames/frames.service';
import { ContextService } from '../../services/context/context.service';
import { ResponseContextInterface } from '../../interfaces/context';


@Component({
  selector: 'open-profile-dialog',
  standalone: true,
  imports: [
    NgFor,
    MatDialogTitle,
    MatDialogContent,
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './open-profile-dialog.component.html',
  styleUrl: './open-profile-dialog.component.css'
})
export class OpenProfileDialogComponent {
    profilesList: ResponseContextInterface[] = [];

    constructor(
      public dialogRef: MatDialogRef<OpenProfileDialogComponent>,
      public locale: LocaleService,
      public frameService: FramesService,
      public contextService: ContextService,
      private api: ApiService,
    ) {}
  
    close(): void {
      this.dialogRef.close();
    }
  
    openProfile(profileId: string): void {
      this.frameService.reset();
      this.api.getProfile(profileId)
        .subscribe(result => {
          this.contextService.fromResponse(result);
          this.close();
        });
    }

    deleteProfile(profileId: string): void {
      this.api.deleteProfile(profileId)
        .subscribe(result => {
          this.profilesList = this.profilesList.filter(profile => profile._id !== result.id);
        });
    }

    ngAfterViewInit(){
      this.api.getProfiles()
        .subscribe(result => {
          this.profilesList = result;
        });
    }
}
