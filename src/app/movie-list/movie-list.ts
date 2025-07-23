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
   * Method to fetch all movies
   */
  getMovies(): void {
    this.fetchApiData.getMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('Movies loaded:', this.movies);
    });
  }

  /**
   * Checks if a movie is a favorite
   * @param movieId ID of the movie to check
   * @returns True if the movie is a favorite, false otherwise
   */
  isFavorite(movieID: string): boolean {
    return this.userDetails.FavoriteMovies.includes(movieID);
  }

  /**
   * Handler to add a movie to user favorites or to remove it
   * @param movieId The movie id to add or remove from or to favorites
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
