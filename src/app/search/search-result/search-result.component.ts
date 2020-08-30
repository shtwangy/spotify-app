import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { switchMap, map, tap, takeUntil } from 'rxjs/operators';

import { SpotifyService } from '../../core/services/spotify/spotify.service';
import { Artist, Album } from '../../core/interfaces';

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
    private router: Router,
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
        switchMap(() => this.spotifyService.searchArtists(this.word)),
        tap(res => this.artists = res.artists.items ),
        switchMap(() => this.spotifyService.searchAlbums(this.word)),
        tap(res => this.albums = res.albums.items ),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  goAlbumDetail(id: string) {
    this.router.navigate(['/album/detail', id]);
  }

  goArtistDetail(id: string) {
    this.router.navigate(['/artist/detail', id]);
  }
}
