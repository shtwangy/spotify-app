export interface Artist {
  external_urls: {
    spotify: string
  };
  href: string;
  id: string;
  images: {url: string}[]; // TODO: 型定義
  name: string;
  type: string;
  uri: string;
}
