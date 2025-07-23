import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-dialog',
  standalone: false,
  templateUrl: './director-dialog.html',
  styleUrl: './director-dialog.scss',
})
export class DirectorDialog {
  constructor(
    public dialog: MatDialogRef<DirectorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
