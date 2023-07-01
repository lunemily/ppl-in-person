import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  showError(errorMessage: string) {
    console.error(errorMessage);
    this.snackBar.open(errorMessage, 'Dismiss', {
      duration: 4000,
    });
  }

  constructor(private snackBar: MatSnackBar) {}
}
