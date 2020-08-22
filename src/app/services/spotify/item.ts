import { Artist } from './artist';

export interface Item {
  album_type: string;
  artists: Artist[];
  external_urls: {
    spotify: string
  };
  href: string;
  id: string;
  images: {url: string}[]; // TODO: 型定義
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}
