import { Component, Input } from '@angular/core';
import { FetchApiData } from '../fetch-api-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-form',
  standalone: false,
  templateUrl: './signin-form.html',
  styleUrl: './signin-form.scss',
})
export class SigninForm {
  @Input() userDetails = {
    Username: '',
    Password: '',
  };

  constructor(
    public fetchApiData: FetchApiData,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SigninForm>,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Authenticate and sign in a user
   *
   * @description Sends username and password data to API for verification and store the uername, password and token in local storage.
   *
   * @returns void
   */

  signInUser(): void {
    this.fetchApiData.signInUser(this.userDetails).subscribe(
      (result) => {
        this.dialogRef.close();
        console.log(result);
        localStorage.setItem('token', result.Token);
        localStorage.setItem('user', result.User.Username);
        localStorage.setItem('password', result.User.Password);
        this.snackBar.open(result.User.Username, 'Login Successful', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
