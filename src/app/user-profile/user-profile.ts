import { Component, OnInit } from '@angular/core';
import { FetchApiData } from '../fetch-api-data';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    public router: Router
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

  updateUser(): void {
    this.fetchApiData
      .updateUser(this.username, this.userDetails)
      .subscribe((res) => {
        this.snackBar.open(res, 'User info updated', {
          duration: 2000,
        });
      });
  }

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
      console.log('all movies', allMovies);
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
}
