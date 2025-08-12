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
  playing: boolean = false;
  timeoutId!: ReturnType<typeof setTimeout>;
  frameIndex: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public framesGroup: ContextFramesGroup,
    public locale: LocaleService,
    public dialogRef: MatDialogRef<AnimationPreviewDialogComponent>,
  ) {}

  ngOnInit(){
    this.previewFramesIds = this.framesGroup.frames.map(frame => `${frame.id}-preview`);
  }

  close(): void {
    this.pause();
    this.dialogRef.close();
  }

  playOrPause(): void {
    if(this.playing){
      this.pause();
    } else {
      this.play();
    }
  }

  play(msBetweenFrames: number = 200): void {
    this.playing = true;
    const _this = this;
    const numberOfFrames = this.previewFramesIds.length;
    
    function step(){
      _this.hideFrame(_this.getCurrentFrameId());
      _this.frameIndex++;
      if(_this.frameIndex <= numberOfFrames - 1){
        _this.showFrame(_this.getCurrentFrameId());
      } else {
        _this.frameIndex = 0;
        _this.showFrame(_this.getCurrentFrameId());
      }
      _this.timeoutId = setTimeout(step, msBetweenFrames);
    }

    this.timeoutId = setTimeout(step, msBetweenFrames);
  }

  pause(): void {
    this.playing = false;
    clearTimeout(this.timeoutId);
  }

  stop(): void {
    this.pause();
    this.hideFrame(this.getCurrentFrameId());
    this.frameIndex = 0;
    this.showFrame(this.getCurrentFrameId());
  }

  stepForward(): void {
    const startOver = this.frameIndex === this.previewFramesIds.length - 1;
    this.hideFrame(this.getCurrentFrameId());
    this.frameIndex = startOver ? 0 : ++this.frameIndex;
    this.showFrame(this.getCurrentFrameId());
  }

  stepBack(): void {
    const goToLastFrame = this.frameIndex === 0;
    this.hideFrame(this.getCurrentFrameId());
    this.frameIndex = goToLastFrame ? this.previewFramesIds.length - 1 : --this.frameIndex;
    this.showFrame(this.getCurrentFrameId());
  }

  getCurrentFrameId(): string {
    return this.previewFramesIds[this.frameIndex];
  }

  showFrame(frameId: string): void {
    document.getElementById(frameId)!.style.display = 'block';
  }

  hideFrame(frameId: string): void {
    document.getElementById(frameId)!.style.display = 'none';
  }
}
