import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

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
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

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
}
