import { Injectable } from '@angular/core';
import { FramesService } from '../frames/frames.service';


@Injectable({
  providedIn: 'root'
})
export class ContextService {
  id: number = -1;

  constructor(public framesService: FramesService) { }

  compile(): void {}

  clear(): void {}
}
