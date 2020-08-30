import { Artist } from './';

export default interface Artists {
  artists: {
    href: string,
    items: Artist[],
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number
  };
}
