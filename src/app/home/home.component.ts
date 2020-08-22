import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../services/spotify/spotify.service';
import {NewReleaseItems} from '../services/spotify/new-release-items';
import { Item } from '../services/spotify/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newReleaseItems: Item[];

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.spotifyService.getAuth().subscribe(
      res => {
        console.log(res);
        this.spotifyService.getNewRelease().subscribe(
          data => {
            console.log(data);
            this.newReleaseItems = data.albums.items;
          });
      }
    );
  }

}
