import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SpotifyService } from '../../core/services/spotify/spotify.service';

import { Artist } from '../../core/interfaces';

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
    this.spotifyService.getArtist(id).subscribe(
      res => this.artist = res
    );
  }

  goBack(): void {
    this.location.back();
  }
}
