import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export default class MatSnackService {

    constructor(private matSnack: MatSnackBar) { }

    showSimpleSnack(message: string, duration: number): void {
        this.matSnack.open(message, 'X', {
            duration,
            panelClass: ['black-snackbar']
        });
    }
}