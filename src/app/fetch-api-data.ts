import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

const BASE_API_URL = 'https://my-vintage-flix-06cde8de3bcb.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiData {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Erro handling
  private handleError(error: HttpErrorResponse): any {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
          `Error body is: ${error.error}, ` +
          `Error message is: ${error.message}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  /* --- POST API Calls --- */

  // Signup User
  signUpUser(userDetails: any): Observable<any> {
    return this.http
      .post(BASE_API_URL + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // SignIn User
  signInUser(userDetails: any): Observable<any> {
    return this.http
      .post(BASE_API_URL + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Add movie to Favorite
  addToFavorites(username: string, movie_id: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(
      `${BASE_API_URL}users/${username}/favorites/${movie_id}`,
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
    console.log('Token received', token);
    return this.http
      .get(BASE_API_URL + 'movies', {
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
      .get(`${BASE_API_URL}` + `movies/${movieTitle}`, {
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
      .get(`${BASE_API_URL}` + `movies/${movieDirector}`, {
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
      .get(`${BASE_API_URL}` + `movies/${movieGenre}`, {
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
      .get(`${BASE_API_URL}` + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /* --- PUT API Calls --- */

  // Update User info
  updateUser(username: String, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(`${BASE_API_URL}` + `users/${username}`, userDetails, {
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
      .delete(`${BASE_API_URL}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text',
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Delete a Movie from Favorite
  deleteFavMovie(username: any, movie_id: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${BASE_API_URL}users/${username}/favorites/${movie_id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    console.log(res);
    const body = res;
    return body || {};
  }
}
