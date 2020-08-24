import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { Artist } from '../../services/spotify/artist';
import { Album } from '../../services/spotify/album';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  artists: Artist[] = [];
  albums: Album[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    // TODO: 毎回getAuth呼ばなくて良いようにする
    this.spotifyService.getAuth().subscribe(res => this.search());
  }

  search(): void {
    const word = this.route.snapshot.paramMap.get('word');
    this.spotifyService.searchArtists(word).subscribe(
      res => this.artists = res.artists.items
    );
    this.spotifyService.searchAlbums(word).subscribe(
      res => this.albums = res.albums.items
    );
  }

}
