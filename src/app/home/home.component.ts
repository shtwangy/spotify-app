import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../services/spotify/spotify.service';
import { Item } from '../services/spotify/item';
import {PlaylistItem} from '../services/spotify/playlist-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newReleaseItems: Item[];
  featurePlaylists: PlaylistItem[];
  playlistMessage: string;

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.spotifyService.getAuth().subscribe(
      res => {
        this.spotifyService.getNewRelease().subscribe(
          data => {
            this.newReleaseItems = data.albums.items;
          });
        this.spotifyService.getFeaturePlaylist().subscribe(
          data => {
            this.featurePlaylists = data.playlists.items;
            this.playlistMessage = data.message;
          }
        );
      }
    );
  }

}
