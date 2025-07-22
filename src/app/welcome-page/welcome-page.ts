import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupForm } from '../signup-form/signup-form';
import { SigninForm } from '../signin-form/signin-form';

@Component({
  selector: 'app-welcome-page',
  standalone: false,
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.scss',
})
export class WelcomePage {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  openSignUpDialog(): void {
    this.dialog.open(SignupForm, {
      // Assigning the dialog a width
      width: '280px',
    });
  }

  openSignInDialog(): void {
    this.dialog.open(SigninForm, {
      width: '280px',
    });
  }
}
