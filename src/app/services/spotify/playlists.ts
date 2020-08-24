import { Playlist } from './playlist';

export interface Playlists {
  message: string;
  playlists: {
    items: Playlist[]
  };
}
