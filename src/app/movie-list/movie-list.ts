import { Component } from '@angular/core';
import { FetchApiData } from '../fetch-api-data';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList {
  movies: any[] = [];
  isLoading = true;

  constructor(public fetchApiData: FetchApiData) {}

  ngOnInit(): void {
    this.getMovies();
  }
  getMovies(): void {
    this.fetchApiData.getMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('Movies loaded:', this.movies);
    });
  }
}
