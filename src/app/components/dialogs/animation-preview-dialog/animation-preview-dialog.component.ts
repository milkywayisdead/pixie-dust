import { Component, Inject } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LocaleService } from '../../../services/locale/locale.service';
import { GridService } from '../../../services/grid/grid.service';
import { ContextFramesGroup } from '../../../interfaces/context';
import { PreviewGridComponent } from '../../preview-grid/preview-grid.component';

@Component({
  selector: 'app-animation-preview-dialog',
  standalone: true,
  imports: [
    NgFor,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    PreviewGridComponent,
  ],
  templateUrl: './animation-preview-dialog.component.html',
  styleUrl: './animation-preview-dialog.component.css'
})
export class AnimationPreviewDialogComponent {
  previewFramesIds: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public framesGroup: ContextFramesGroup,
    public locale: LocaleService,
    public dialogRef: MatDialogRef<AnimationPreviewDialogComponent>,
    public gridService: GridService,
  ) {}

  ngOnInit(){
    this.previewFramesIds = this.framesGroup.frames.map(frame => `${frame.id}-preview`);
  }

  close(): void {
    this.dialogRef.close();
  }

  play(msBetweenFrames: number = 200): void {
    let frameIndex = 0;
    const _this = this;
    const numberOfFrames = this.previewFramesIds.length;
    
    function step(){
      _this.hideFrame(_this.previewFramesIds[frameIndex]);
      frameIndex++;
      _this.showFrame(_this.previewFramesIds[frameIndex]);
      if(frameIndex < numberOfFrames - 1){
        setTimeout(step, msBetweenFrames);
      }
    }

    setTimeout(step, msBetweenFrames);
  }

  showFrame(frameId: string): void {
    document.getElementById(frameId)!.style.display = 'block';
  }

  hideFrame(frameId: string): void {
    document.getElementById(frameId)!.style.display = 'none';
  }
}
