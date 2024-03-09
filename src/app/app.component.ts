import { Component, ViewChildren } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';

import { FrameslistComponent } from './components/frameslist/frameslist.component';
import { EditariumComponent } from './components/editarium/editarium.component';
import { TabsareaComponent } from './components/tabsarea/tabsarea.component';
import { ApiService } from './services/api/api.service';
import { FramesService } from './services/frames/frames.service';
import { LocaleService } from './services/locale/locale.service';
import { DialogService } from './services/dialog/dialog.service';
import { FrameSizeDialogComponent } from './components/dialogs/frame-size-dialog/frame-size-dialog.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterOutlet,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatToolbarModule,
    EditariumComponent,
    MatTooltipModule,
    FrameSizeDialogComponent,
    FrameslistComponent,
    TabsareaComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pixie-dust';
  color = '#000000';
  frames: number[] = [];
  currentFrameIndex: number = 0;

  constructor(
    public framesService: FramesService,
    public locale: LocaleService,
    public dialog: MatDialog,
    public dialogService: DialogService,
    public api: ApiService,
  ) {}

  @ViewChildren('grids')
  editariums: EditariumComponent[] | undefined;

  save(){
    this.api.updateProfile();
  }

  setColor(value: string):void{
    this.color = value;
  }

  ngOnInit(){
    this.locale.setLocale('ru');
  }

  addFrameGroup(): void {
    this.dialogService.openFrameSizeDialog({
      data: this.framesService.getShape()
    });
  }
}
