import { Playlist } from './playlist-item';

export interface Playlists {
  message: string;
  playlists: {
    items: Playlist[]
  };
}
