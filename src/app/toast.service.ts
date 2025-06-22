import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }
  show(message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', duration: number = 3000) {
     this.snackBar.open(message, 'Close', {
       duration: duration,
       verticalPosition: 'top',
       horizontalPosition: 'center',
       panelClass: [`toast-${type}`], // Apply dynamic class
     });
   }
}
