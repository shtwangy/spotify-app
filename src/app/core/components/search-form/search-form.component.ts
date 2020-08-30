import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { switchMap, takeUntil, debounceTime, tap } from 'rxjs/operators';

import { SpotifyService } from '../../services/spotify/spotify.service';
import { Artist, Album } from '../../interfaces';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {
  artists$: Observable<Artist[]>;
  albums$: Observable<Album[]>;

  searchWord = new FormControl('');

  private readonly onDestroy$ = new EventEmitter();

  constructor(
    private router: Router,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.artists$ = this.searchWord.valueChanges.pipe(
      debounceTime(600),
      takeUntil(this.onDestroy$),
      switchMap(word => {
        if (!word) {
          return of(undefined);
        }
        return this.spotifyService.searchArtists(word).pipe(
          switchMap(res => of(res.artists.items.slice(0, 5)))
        );
      })
    );
    this.albums$ = this.searchWord.valueChanges.pipe(
      debounceTime(600),
      takeUntil(this.onDestroy$),
      switchMap(word => {
        if (!word) {
          return of(undefined);
        }
        return this.spotifyService.searchAlbums(word).pipe(
          switchMap(res => of(res.albums.items.slice(0, 5)))
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.emit();
  }

  search(word: string) {
    this.router.navigate(['/search', word, 'result']);
  }
}
