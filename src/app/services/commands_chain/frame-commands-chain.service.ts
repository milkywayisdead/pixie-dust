import { Injectable } from '@angular/core';
import { BaseCommand } from '../../commands/base';
import { CommandsChain } from '../../interfaces/command';
import { CommandsChainLink } from './link';

@Injectable({
  providedIn: 'root'
})
export class FrameCommandsChain implements CommandsChain {
  current: CommandsChainLink | null = null;
  undoable: boolean = false;
  redoable: boolean = false;

  constructor() {
    this.current = new CommandsChainLink();
  }

  addCommand(command: BaseCommand): void {
    const current = this.current;
    if(current?.hasRedo()){
      const newLink = new CommandsChainLink(command);
      current!.next = newLink;
      newLink.previous = current;
      this.current = newLink;
    } else {
      current?.setRedo(command);
    }

    this.updateFlags();
  }

  undo(): void {
    this.current?.undo();

    if(this.current?.previous){
      this.current = this.current!.previous;
    }

    this.updateFlags();
  }

  redo(): void {
    this.current?.redo();
    
    if(this.current?.next){
      this.current = this.current!.next;
    }

    this.updateFlags();
  }

  private updateFlags(): void {
    this.undoable = !!this.current?.hasUndo();
    this.redoable = !!this.current?.hasRedo();
  }
}
