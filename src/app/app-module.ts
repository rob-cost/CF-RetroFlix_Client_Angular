import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { SignupForm } from './signup-form/signup-form';
import { SigninForm } from './signin-form/signin-form';
import { WelcomePage } from './welcome-page/welcome-page';
import { MovieList } from './movie-list/movie-list';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatGridList } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { UserProfile } from './user-profile/user-profile';
import { NavBar } from './nav-bar/nav-bar';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePage },
  { path: 'movies', component: MovieList },
  { path: 'profile', component: UserProfile },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    App,
    SignupForm,
    SigninForm,
    WelcomePage,
    MovieList,
    UserProfile,
    NavBar,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIcon,
    MatGridList,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
