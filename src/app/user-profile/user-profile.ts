import { Component, OnInit } from '@angular/core';
import { FetchApiData } from '../fetch-api-data';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { GenreDialog } from '../genre-dialog/genre-dialog';
import { MovieDetailsDialog } from '../movie-details-dialog/movie-details-dialog';
import { DirectorDialog } from '../director-dialog/director-dialog';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile implements OnInit {
  username: string = '';
  userDetails: any = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    FavoriteMovies: [],
  };
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiData,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.username = userData;
    } else {
      this.router.navigate(['/welcome']);
      return;
    }

    this.loadUserData();

    console.log('Fav Movies', this.favoriteMovies);
  }

  /**
   * Loads and processes current user data from the API
   *
   * @description Fetches user information using the stored username, processes the response data, and updates the component's userDetails object. Also triggers loading of favorite movies data.
   *
   * @returns void
   */

  loadUserData(): void {
    this.fetchApiData.getUser(this.username).subscribe((res) => {
      console.log(res);
      this.userDetails = {
        Username: res.Username,
        Password: '',
        Email: res.Email,
        Birthday: res.Birthday ? res.Birthday.split('T')[0] : '',
        FavoriteMovies: res.FavoriteMovies,
      };
      this.getFavoriteMovies();
    });
  }

  /**
   * Updates the current user's profile information
   *
   * @description Prepares user data by excluding FavoriteMovies field, sends update request to API, and displays success notification via snackbar.
   *
   * @returns void
   */

  updateUser(): void {
    this.userDetails = {
      Username: this.userDetails.Username,
      Password: this.userDetails.Password,
      Email: this.userDetails.Email,
      Birthday: this.userDetails.Birthday,
    };
    this.fetchApiData
      .updateUser(this.username, this.userDetails)
      .subscribe((res) => {
        this.snackBar.open(res, 'User info updated', {
          duration: 2000,
        });
        console.log(this.userDetails);
      });
  }

  /**
   * Deletes the current user account and redirects to welcome page
   *
   * @description Sends delete request to API, clears local storage on success, displays confirmation message, and navigates back to the welcome screen.
   *
   * @returns void
   */

  deleteUser(): void {
    this.fetchApiData.deleteUser(this.username).subscribe((res) => {
      if (res) {
        this.snackBar.open(res, 'User deleted successfully', {
          duration: 2000,
        });
        localStorage.clear();
        this.router.navigate(['welcome']);
      } else {
        console.log('something went wrong');
      }
    });
  }

  /**
   * Retrieves and filters user's favorite movies from all available movies
   *
   * @description Fetches all movies from API and filters them to show only those that match the user's favorite movie IDs stored in userDetails.
   *
   * @returns void
   */

  getFavoriteMovies(): void {
    this.fetchApiData.getMovies().subscribe((resp: any) => {
      const allMovies: any[] = resp;
      this.favoriteMovies = allMovies.filter((movie) =>
        this.userDetails.FavoriteMovies.includes(movie.id)
      );
      console.log('Fav movies', this.favoriteMovies);
      return this.favoriteMovies;
    });
  }
  /**
   * Removes a movie from the user's favorites list
   *
   * @description Sends API request to delete movie from favorites, updates local favoriteMovies array on success, refreshes user data, and displays appropriate success or error messages.
   *
   * @param movieId - The ID of the movie to remove from favorites
   * @returns void
   */

  removeFavorite(movieId: string): void {
    this.fetchApiData.deleteFavMovie(this.username, movieId).subscribe(
      (result) => {
        this.snackBar.open('Movie removed from favorites', 'OK', {
          duration: 2000,
        });
        this.favoriteMovies = this.favoriteMovies.filter(
          (m: any) => m._id != movieId
        );
        this.loadUserData();
      },
      (result) => {
        this.snackBar.open(
          'Could not remove movie from favorites' + result,
          'OK',
          {
            duration: 2000,
          }
        );
      }
    );
  }

  /**
   * Opens a dialog displaying genre information
   *
   * @description Launches a modal dialog to show details about a specific movie genre with predefined width styling.
   *
   * @param genre - The genre object containing information to display in the dialog
   * @returns void
   */

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialog, {
      data: genre,
      width: '280px',
    });
  }

  /**
   * Opens a dialog displaying director information
   *
   * @description Launches a modal dialog to show details about a specific movie director with predefined width styling.
   *
   * @param director - The director object containing information to display in the dialog
   * @returns void
   */

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialog, {
      data: director,
      width: '280px',
    });
  }

  /**
   * Opens a dialog displaying detailed movie information
   *
   * @description Launches a modal dialog to show comprehensive details about a specific movie with predefined width styling.
   *
   * @param movie - The movie object containing information to display in the dialog
   * @returns void
   */

  openMovieDetailsDialog(movie: any): void {
    this.dialog.open(MovieDetailsDialog, {
      data: movie,
      width: '280px',
    });
  }
}
