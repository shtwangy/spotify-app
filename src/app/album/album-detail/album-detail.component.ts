import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SpotifyService } from '../../core/services/spotify/spotify.service';
import { Album } from '../../core/interfaces';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  album: Album;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.spotifyService.getAlbum(id).subscribe(
      res => this.album = res
    );
  }

  goBack(): void {
    this.location.back();
  }

  goSpotify(uri: string) {
    window.location.href = uri;
  }
}
