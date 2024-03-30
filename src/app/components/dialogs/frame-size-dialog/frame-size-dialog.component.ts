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
import { FrameShape } from '../../../interfaces/frame';

import { LocaleService } from '../../../services/locale/locale.service';
import { FramesService } from '../../../services/frames/frames.service';
import { ContextService } from '../../../services/context/context.service';


@Component({
  selector: 'frame-size-dialog',
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
  templateUrl: './frame-size-dialog.component.html',
  styleUrl: './frame-size-dialog.component.css'
})
export class FrameSizeDialogComponent {
  groupName: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public frameShape: FrameShape,
    public dialogRef: MatDialogRef<FrameSizeDialogComponent>,
    public locale: LocaleService,
    public frameService: FramesService,
    public context: ContextService,
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  addFrame(): void {
    this.frameService.setShape(this.frameShape);
    //this.frameService.add();
    const frame = {
      id: `${+ new Date()}`,
      colorMap: {},
      cols: this.frameShape.cols,
      rows: this.frameShape.rows,
    }
    const groupId = `g${+ new Date()}`;
    const groupName = this.groupName;
    this.context.addFrameToGroup(frame, groupId, groupName);
    this.close();
  }
}
