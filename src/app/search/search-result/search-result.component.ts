import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { of } from 'rxjs';
import { switchMap, map, tap, takeUntil } from 'rxjs/operators';

import { SpotifyService } from '../../services/spotify/spotify.service';
import { Artist } from '../../services/spotify/artist';
import { Album } from '../../services/spotify/album';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  word = '';
  artists: Artist[] = [];
  albums: Album[] = [];

  private readonly onDestroy$ = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.search();
  }

  ngOnDestroy() {
    this.onDestroy$.emit();
  }

  search(): void {
    this.route.paramMap
      .pipe(
        map(paramMap => paramMap.get('word')),
        tap(word => this.word = word ),
        switchMap(word =>
          this.spotifyService.authorized ? of(null) : this.spotifyService.getAuth()
        ),
        switchMap(res => this.spotifyService.searchArtists(this.word)),
        tap(res => this.artists = res.artists.items ),
        switchMap( res => this.spotifyService.searchAlbums(this.word)),
        tap(res => this.albums = res.albums.items ),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }
}
