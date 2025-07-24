import { Component } from '@angular/core';
import { FetchApiData } from '../fetch-api-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialog } from '../genre-dialog/genre-dialog';
import { DirectorDialog } from '../director-dialog/director-dialog';
import { MovieDetailsDialog } from '../movie-details-dialog/movie-details-dialog';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList {
  username: string = '';
  movies: any[] = [];
  userDetails: any = {
    Username: '',
    Password: localStorage.getItem('password') || '',
    Email: '',
    Birthday: '',
    FavoriteMovies: [],
  };

  constructor(
    public fetchApiData: FetchApiData,
    public snack: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    const userData = localStorage.getItem('user');
    if (userData) {
      this.username = userData;
    }
    this.loadUserData();
  }

  /**
   * Loads and processes current user data from the API
   *
   * @remarks Fetches user information using the stored username, processes the response data, and updates the component's userDetails object. Also triggers loading of favorite movies data.
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
    });
  }

  /**
   * Get an array with a list of Movie objects from the API
   *
   * @remarks Fetches a list of all movies
   *
   * @returns void
   */

  getMovies(): void {
    this.fetchApiData.getMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('Movies loaded:', this.movies);
    });
  }

  /**
   * Checks the movie's status if is favorite
   *
   * @param movieId ID of the movie to check
   *
   * @returns True if the movie is a favorite, false otherwise
   */

  isFavorite(movieID: string): boolean {
    return this.userDetails.FavoriteMovies.includes(movieID);
  }

  /**
   * Check movie's favorite status
   *
   * @remarks Chekc if a movie is in the favorite list or not
   *
   * @param movieID ID of a specific movie
   *
   * @returns void
   */

  handleFavorite(movieID: string): void {
    const isFav = this.userDetails.FavoriteMovies.includes(movieID);
    const action = isFav
      ? this.fetchApiData.deleteFavMovie(this.username, movieID)
      : this.fetchApiData.addToFavorites(this.username, movieID);
    action.subscribe(() => {
      this.snack.open(
        isFav ? 'Removed from favorites' : 'Added to favorites',
        'OK',
        { duration: 2000 }
      );
      this.loadUserData();
    });
  }

  /**
   * Opens a dialog displaying genre information
   *
   * @remarks Launches a modal dialog to show details about a specific movie genre with predefined width styling.
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
   * @remarks Launches a modal dialog to show details about a specific movie director with predefined width styling.
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
   * @remarks Launches a modal dialog to show comprehensive details about a specific movie with predefined width styling.
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
