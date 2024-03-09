import { Injectable } from '@angular/core';
import { LocaleService } from '../locale/locale.service';
import { GridService } from '../grid/grid.service';
import { FrameObject, CompiledFrames } from '../../interfaces/frame';
import {
  CompiledFramesGroup,
  ContextFramesGroup,
  ContextInterface,
  ResponseContextInterface
} from '../../interfaces/context';


@Injectable({
  providedIn: 'root'
})
export class ContextService {
  context: ContextInterface  = {
    id: '',
    name: '',
    frames: {},
  }
  framesList: string[] = [];

  constructor(
    public locale: LocaleService,
    public gridService: GridService,
  ) { 
    this.context.name = this.locale.currentLocale['profile']['untitled'];
    this.setDocTitle();
  }

  compile(): Object {
    return {
      id: this.context.id,
      name: this.context.name,
      frames: this.compileFrames(),
    }
  }

  clear(): void {}

  setId(id: string): void {
    this.context.id = id;
  }

  fromResponse(responseContext: ResponseContextInterface): void {
    this.context.id = responseContext._id;
    this.context.name = responseContext.name;

    const groups: { [name: string]: ContextFramesGroup } = {}
    for(let group of Object.values(responseContext.frames)){
      const frames: FrameObject[] = [];
      for(let [frameId, frameStr] of Object.entries(group.frames)){
        frames.push(this.gridService.parse(frameId, frameStr));
      }
      groups[group.id] = {
        id: group.id,
        name: group.name,
        frames: frames,
      }
    }
    this.context.frames = groups;
    this.setDocTitle();
    this.framesList = Object.values(this.context.frames).map(f => f.name);
  }

  private setDocTitle(): void {
    document.title = this.context.name;
  }

  addFrameToGroup(frame: FrameObject, groupId: string, groupName: string): void {
    this.addGroup(groupId, groupName);
    const group = this.context.frames[groupId];
    group.frames.push(frame);
  }

  private addGroup(groupId: string, groupName: string): void {
    if(this.context.frames[groupId]) return;
    this.context.frames[groupId] = {
      id: groupId,
      name: groupName,
      frames: [], 
    } as ContextFramesGroup;
  }

  getGroup(groupId: string | null): ContextFramesGroup | null {
    if(!groupId) return null;
    return this.context.frames[groupId];
  }

  removeFrame(groupId: string, frameId: string): void {
    const group = this.context.frames[groupId];
    const frame = group.frames.find(f => f.id === frameId);
    if(!frame) return;
    const frameIndex = group.frames.indexOf(frame);
    if(frameIndex !== -1){
      group.frames.splice(frameIndex, 1);
    }
  }

  compileFrames(): { [name: string]: CompiledFramesGroup } {
    const compiled =  {} as { [name: string]: CompiledFramesGroup };
    for(let group of Object.values(this.context.frames)){
      const compiledGroup = {
        id: group.id,
        name: group.name,
        frames: {} as CompiledFrames,
      } 
      const compiledFrames = {} as CompiledFrames;
      for(let frame of group.frames){
        const cf = this.gridService.compileFrame(
          frame.rows, frame.cols, frame.colorMap,
        );
        compiledFrames[frame.id] = cf;
      }

      compiledGroup.frames = compiledFrames;
      compiled[group.id] = compiledGroup;
    }
    
    return compiled;
  }
}
