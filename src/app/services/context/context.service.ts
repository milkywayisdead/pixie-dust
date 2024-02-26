import { Injectable } from '@angular/core';
import { FramesService } from '../frames/frames.service';
import { LocaleService } from '../locale/locale.service';
import { ContextInterface, ResponseContextInterface } from '../../interfaces/context';


@Injectable({
  providedIn: 'root'
})
export class ContextService {
  context: ContextInterface  = {
    id: '',
    name: '',
  }

  constructor(
    public framesService: FramesService,
    public locale: LocaleService
  ) { 
    this.context.name = this.locale.currentLocale['profile']['untitled'];
    this.setDocTitle();
  }

  compile(): Object {
    return {
      id: this.context.id,
      name: this.context.name,
      frames: this.framesService.compileFrames(),
    }
  }

  clear(): void {}

  setId(id: string): void {
    this.context.id = id;
  }

  fromResponse(responseContext: ResponseContextInterface): void {
    this.context.id = responseContext._id;
    this.context.name = responseContext.name;
    this.framesService.parse(responseContext.frames)
    this.setDocTitle();
  }

  private setDocTitle(): void {
    document.title = this.context.name;
  }
}
