import { PlaylistItem } from './playlist-item';

export interface Playlists {
  message: string;
  playlists: {
    items: PlaylistItem[]
  };
}
