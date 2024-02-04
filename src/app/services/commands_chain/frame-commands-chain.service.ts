import { Injectable } from '@angular/core';
import { CommandsChain } from '../../interfaces/command';
import { BaseCommand } from '../../commands/base';

@Injectable({
  providedIn: 'root'
})
export class FrameCommandsChain implements CommandsChain {
  commands: BaseCommand[] = [];
  currentCommandIndex: number = -1;

  constructor() { }

  add(undoCommand: BaseCommand, redoCommand: BaseCommand): void {
    this.commands.push(redoCommand, undoCommand);
    this.currentCommandIndex += 2;
    console.log(this)
  }

  undo(): void {
    this.commands[this.currentCommandIndex].do();
    this.currentCommandIndex--;
  }

  redo(): void {
    this.commands[this.currentCommandIndex].do();
    this.currentCommandIndex++;
  }
}
