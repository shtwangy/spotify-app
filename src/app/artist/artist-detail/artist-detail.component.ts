import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SpotifyService } from '../../services/spotify/spotify.service';

import { Artist } from '../../services/spotify/artist';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {
  artist: Artist;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.spotifyService.checkAuth().pipe(
      switchMap(res => this.spotifyService.getArtist(id))
    ).subscribe(
      res => this.artist = res
    );
  }

  goBack(): void {
    this.location.back();
  }
}
