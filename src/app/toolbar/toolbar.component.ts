import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pix-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  currentColor: string = '#000000';
  @Output() changeEvent = new EventEmitter<any>;
  @Output() clearEvent = new EventEmitter<any>;
  @Output() saveEvent = new EventEmitter<any>;
  @Output() destroyEvent = new EventEmitter<any>;

  emitChange(property: string, value: string): void {
    this.changeEvent.emit({property: property, value: value});
  }

  clear(){
    this.clearEvent.emit();
  }

  save(){
    this.saveEvent.emit();
  }

  destroy(){
    this.destroyEvent.emit();
  }

  ngOnInit(){
    this.emitChange('color', this.currentColor);
  }
}
