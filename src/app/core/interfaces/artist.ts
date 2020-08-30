export default interface Artist {
  external_urls: {
    spotify: string
  };
  href: string;
  id: string;
  images: { url: string }[];
  name: string;
  type: string;
  uri: string;
  genres: string[];
}
