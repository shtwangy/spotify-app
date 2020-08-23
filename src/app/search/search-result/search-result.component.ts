import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  artists = [
    {name: 'Hoge Band', imgUrl: 'https://placehold.it/400x300'},
    {name: 'Hoge Band', imgUrl: 'https://placehold.it/400x300'},
    {name: 'Hoge Band', imgUrl: 'https://placehold.it/400x300'},
    {name: 'Hoge Band', imgUrl: 'https://placehold.it/400x300'}
    ];
  albums = [
    {name: 'fuga', imgUrl: 'https://placehold.it/400x300'},
    {name: 'fuga', imgUrl: 'https://placehold.it/400x300'},
    {name: 'fuga', imgUrl: 'https://placehold.it/400x300'},
    {name: 'fuga', imgUrl: 'https://placehold.it/400x300'}
    ];

  constructor() { }

  ngOnInit() {
  }

}
