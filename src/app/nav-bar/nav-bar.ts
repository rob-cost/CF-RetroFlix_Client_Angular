import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  constructor(public router: Router) {}

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
