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
import { ContextFramesGroup } from '../../../interfaces/context';
import { FrameObject } from '../../../interfaces/frame';
import { createCanvasWithColorMap } from '../../../utils';

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
  pixelSize: number = 10;
  delay: number = 10;
  repeat: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public framesGroup: ContextFramesGroup,
    public dialogRef: MatDialogRef<ToGifDialogComponent>,
    public locale: LocaleService,
    public context: ContextService,
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  saveGif(): void {
    // @ts-ignore
    const encoder = new window.GIFEncoder();
    encoder.setRepeat(this.repeat);
    encoder.setDelay(this.delay);
    encoder.start();

    for(let frame of this.framesGroup.frames){
      const canvas = this.createCanvas(frame);
      encoder.addFrame(canvas.getContext('2d'));
    }

    encoder.finish();
    encoder.download();
  }

  createCanvas(frame: FrameObject): HTMLCanvasElement {
    const cols = frame.cols;
    const rows = frame.rows;
    const colorMap = frame.colorMap;
    const canvas = createCanvasWithColorMap(cols, rows, colorMap, this.pixelSize);
    canvas.setAttribute('id', `${frame.id}-to-gif-canvas`);
    return canvas;
  }
}
