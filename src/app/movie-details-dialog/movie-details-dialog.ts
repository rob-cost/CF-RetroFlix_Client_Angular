import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details-dialog',
  standalone: false,
  templateUrl: './movie-details-dialog.html',
  styleUrl: './movie-details-dialog.scss',
})
export class MovieDetailsDialog {
  constructor(
    public dialog: MatDialogRef<MovieDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
