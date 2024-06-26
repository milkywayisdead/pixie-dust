import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {

  constructor(private _snackbar: MatSnackBar) {}

  openSnackbar(message: string, panelClass: string) {
    this._snackbar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 5000,
      panelClass: panelClass,
    });
  }
}
