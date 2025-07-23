import { Component, Input, OnInit } from '@angular/core';
import { FetchApiData } from '../fetch-api-data';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup-form',
  standalone: false,
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
})
export class SignupForm implements OnInit {
  @Input() userDetails = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiData,
    public dialogRef: MatDialogRef<SignupForm>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  signUpUser(): void {
    this.fetchApiData.signUpUser(this.userDetails).subscribe(
      (result) => {
        this.dialogRef.close(); // This will close the modal on success!
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
