import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'screen-orientation-dialog',
    templateUrl: 'screen-orientation-dialog.html',
})
export class ScreenOrientationDialogComponent {

constructor(
    public dialogRef: MatDialogRef<ScreenOrientationDialogComponent>) {}
}