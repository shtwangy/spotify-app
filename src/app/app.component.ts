import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spotify-app';
  searchWord = new FormControl('');

  constructor(
    private router: Router
  ) {}

  search(word: string) {
    this.router.navigate(['/search', word, 'result']);
  }
}
