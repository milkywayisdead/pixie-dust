import { Injectable } from '@angular/core';
import { CommandsChain } from '../../interfaces/command';
import { BaseCommand } from '../../commands/base';

@Injectable({
  providedIn: 'root'
})
export class FrameCommandsChain implements CommandsChain {
  private commands: BaseCommand[] = [];
  currentCommandIndex: number | null = null;

  constructor() { }

  add(command: BaseCommand): void {
    this.commands.push(command);
  }
}
