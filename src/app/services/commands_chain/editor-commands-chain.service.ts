import { Injectable } from '@angular/core';
import { CommandsChain } from '../../interfaces/command';

@Injectable({
  providedIn: 'root'
})
export class EditorCommandsChain implements CommandsChain{

  constructor() { }
}
