import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ApiService } from '../../../services/api/api.service';
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

import { DialogService } from '../../../services/dialog/dialog.service';
import { TabsService } from '../../../services/tabs/tabs.service';
import { LocaleService } from '../../../services/locale/locale.service';
import { FramesService } from '../../../services/frames/frames.service';
import { ContextService } from '../../../services/context/context.service';
import { ResponseContextInterface } from '../../../interfaces/context';


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
      public dialog: DialogService,
      public tabs: TabsService,
    ) {}
  
    close(): void {
      this.dialogRef.close();
    }
  
    openProfile(profileId: string): void {
      const callback = () => {
        this.tabs.closeAll();
        this.api.getProfile(profileId)
          .subscribe(result => {
            this.contextService.fromResponse(result);
            this.close();
          });
      }

      this.dialog.openProfileConfirmationDialog({
        data: {
          callback: callback,
        }
      });
    }

    deleteProfile(profileId: string): void {
      const callback = () => {
        this.api.deleteProfile(profileId)
          .subscribe(result => {
            const deletedProfileId: string = result.id;
            this.clearStuffIfDeletedCurrentProfile(deletedProfileId);
            this.profilesList = this.profilesList.filter(profile => profile._id !== deletedProfileId);
          });
      }
        
      this.dialog.openProfileDeletionConfirmationDialog({
        data: {
          callback: callback,
        }
      });


    }

    ngAfterViewInit(){
      this.api.getProfiles()
        .subscribe(result => {
          this.profilesList = result;
        });
    }

    clearStuffIfDeletedCurrentProfile(deletedProfileId: string): void {
      if(this.contextService.getId() === deletedProfileId){
        this.tabs.closeAll();
        this.contextService.clear();
      }
    }
}
