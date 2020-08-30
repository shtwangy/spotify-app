export default interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  uri: string;
}
