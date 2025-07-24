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

  /** Registers a new user account
   *
   * @remarks Makes a POST request to create a new user account with the provided user details.
   *
   * @param userDetails - Object containing user registration information (username, email, password, etc.)
   * @returns Observable that emits the registration response on success, or error on failure
   */

  signUpUser(userDetails: any): Observable<any> {
    return this.http
      .post(BASE_API_URL + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Authenticates a user with login credentials
   *
   * @remarks Makes a POST request to authenticate user credentials and receive an access token.
   *
   * @param userDetails - Object containing login credentials (username and password)
   * @returns Observable that emits the authentication response with token on success, or error on failure
   */

  signInUser(userDetails: any): Observable<any> {
    return this.http
      .post(BASE_API_URL + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Adds a movie to user's favorites list
   *
   * @remarks Makes an authenticated POST request to add a specific movie to the user's favorite movies collection.
   *
   * @param username - The username of the user
   * @param movie_id - The ID of the movie to add to favorites
   * @returns Observable that emits the response on success, or error on failure
   */

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

  /**
   * Retrieves all available movies from the database
   *
   * @remarks Makes an authenticated GET request to fetch the complete list of movies. Requires a valid JWT token stored in localStorage for authorization.
   *
   * @returns Observable that emits an array of movie objects on success, or error on failure
   */

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

  /**
   * Retrieves detailed information for a specific movie by title
   *
   * @remarks Makes an authenticated GET request to fetch movie details using the movie's title. Requires a valid JWT token stored in localStorage for authorization.
   *
   * @param movie - Movie object containing the Title property
   * @returns Observable that emits the movie details object on success, or error on failure
   */

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

  /**
   * Retrieves director information for a specific movie
   *
   * @remarks Makes an authenticated GET request to fetch director details using the movie's director name. Requires a valid JWT token stored in localStorage for authorization.
   *
   * @param movie - Movie object containing the Director property
   * @returns Observable that emits the director information on success, or error on failure
   */

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

  /**
   * Retrieves genre information for a specific movie
   *
   * @remarks Makes an authenticated GET request to fetch genre details using the movie's genre name. Requires a valid JWT token stored in localStorage for authorization.
   *
   * @param movie - Movie object containing the Genre property
   * @returns Observable that emits the genre information on success, or error on failure
   */

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

  /**
   * Retrieves user information by username
   *
   * @remarks Makes an authenticated GET request to fetch user details. Requires a valid JWT token stored in localStorage for authorization.
   *
   * @param username - The username of the user to retrieve
   * @returns Observable that emits the user data object on success, or error on failure
   */

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

  /**
   * Updates user information for a specific user
   *
   * @remarks Makes an authenticated PUT request to update user details. Requires a valid JWT token stored in localStorage for authorization.
   *
   * @param username - The username of the user to update
   * @param userDetails - Object containing the user data fields to be updated
   * @returns Observable that emits the updated user data object on success, or error on failure
   */

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

  /**
   * Deletes a user account by username
   *
   * @remarks Makes an authenticated DELETE request to remove a user from the system. Requires a valid JWT token stored in localStorage for authorization.
   *
   * @param username - The username of the user to delete
   * @returns Observable that emits the processed response data on success, or error on failure
   */

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

  /**
   * Removes a movie from user's favorite movies list
   *
   * @remarks Makes an authenticated DELETE request to remove a specific movie from the user's favorites. Requires a valid JWT token stored in localStorage for authorization.
   *
   * @param username - The username of the user whose favorites to modify
   * @param movie_id - The ID of the movie to remove from favorites
   * @returns Observable that emits the response on success, or error on failure
   */

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
