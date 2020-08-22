import { Item } from './item';

export interface NewReleaseItems {
  albums: {
    href: string,
    items: Item[],
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number
  };
}
