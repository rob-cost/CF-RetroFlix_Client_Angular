import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-dialog',
  standalone: false,
  templateUrl: './genre-dialog.html',
  styleUrl: './genre-dialog.scss',
})
export class GenreDialog {
  constructor(
    public dialog: MatDialogRef<GenreDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
