import { Playlist } from './';

export default interface Playlists {
  message: string;
  playlists: {
    items: Playlist[]
  };
}
