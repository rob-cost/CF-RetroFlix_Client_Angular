import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const apiUrl = 'https://my-vintage-flix-06cde8de3bcb.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class FetchApiData {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Erro handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  /* --- POST API Calls --- */

  // Signup User
  singupUser(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Login User
  loginUser(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Add movie to Favorite
  addToFavorites(username: string, movie: any): Observable<any> {
    const token = localStorage.getItem('token');
    const movie_id = movie.id;
    return this.http.post(
      `${apiUrl}` + `users/${username}/favorites/${movie_id}`,
      {},
      {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      }
    );
  }

  /* --- GET API Calls --- */

  // Get All Movies
  getMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Get a specific Movie
  getMovieByTitle(movie: any): Observable<any> {
    const token = localStorage.getItem('token');
    const movieTitle = movie.Title;
    return this.http
      .get(`${apiUrl}` + `'movies'/${movieTitle}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Get a Director
  getDirector(movie: any): Observable<any> {
    const token = localStorage.getItem('token');
    const movieDirector = movie.Director;
    return this.http
      .get(`${apiUrl}` + `'movies'/${movieDirector}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Get a Genre
  getGenre(movie: any): Observable<any> {
    const token = localStorage.getItem('token');
    const movieGenre = movie.Genre;
    return this.http
      .get(`${apiUrl}` + `'movies'/${movieGenre}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Get a User
  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}` + `'users'/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /* --- PUT API Calls --- */

  // Update User info
  updateUser(username: any, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(`${apiUrl}` + `'users'/${username}, ${userDetails}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /* --- DELETE API Calls --- */

  // Delete a User
  deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}` + `'users'/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Delete a Movie from Favorite
  deleteFavMovie(username: any, movie: any): Observable<any> {
    const token = localStorage.getItem('token');
    const movie_id = movie.id;
    return this.http
      .delete(`${apiUrl}` + `'users'/${username}/favorites/${movie_id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }
}
