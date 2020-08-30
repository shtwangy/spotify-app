import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { SpotifyService } from '../services/spotify/spotify.service';
import { Album } from '../services/spotify/album';
import { Playlist } from '../services/spotify/playlist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newReleaseItems: Album[];
  featurePlaylists: Playlist[];
  playlistMessage: string;

  constructor(
    private router: Router,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.spotifyService.getNewRelease().pipe(
      tap(res => this.newReleaseItems = res.albums.items),
      switchMap(() => this.spotifyService.getFeaturePlaylist()),
      tap(res => {
        this.featurePlaylists = res.playlists.items;
        this.playlistMessage = res.message;
      })
    ).subscribe();
  }

  goAlbumDetail(id: string) {
    this.router.navigate(['/album/detail', id]);
  }

  goPlaylistDetail(id: string) {
    this.router.navigate(['/playlist/detail', id]);
  }
}
