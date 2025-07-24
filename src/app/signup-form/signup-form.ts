import { Component, Input, OnInit } from '@angular/core';
import { FetchApiData } from '../fetch-api-data';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    public snackBar: MatSnackBar,
    public route: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Registers a new user account
   *
   * @description Sends user registration data to API, closes the dialog on success, and displays appropriate success or error messages via snackbar.
   *
   * @returns void
   */

  signUpUser(): void {
    this.fetchApiData.signUpUser(this.userDetails).subscribe(
      (result) => {
        this.dialogRef.close();
        console.log(result);
        this.snackBar.open('Registration successful', 'OK', {
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
