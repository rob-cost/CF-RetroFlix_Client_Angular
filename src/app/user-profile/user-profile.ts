import { Component, OnInit } from '@angular/core';
import { FetchApiData } from '../fetch-api-data';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
   * Method to fetch the data for the current logged in user
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
   * Method to update user informations
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
   * Method to delete a user
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
   * Method to set the favorite movies of a user
   * @return The favorite movies
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
   * Handler to remove a movie from user favorites
   * @param movieId The movie id to remove from user favorites
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
   * Method to open the dialog with informations about a genre
   * @param genre The genre informations object
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialog, {
      data: genre,
      width: '280px',
    });
  }

  /**
   * Method to open the dialog with informations about a director
   * @param director The director informations object
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialog, {
      data: director,
      width: '280px',
    });
  }

  /**
   * Method to open the dialog with informations about a movie
   * @param movie The movie object
   */
  openMovieDetailsDialog(movie: any): void {
    this.dialog.open(MovieDetailsDialog, {
      data: movie,
      width: '280px',
    });
  }
}
