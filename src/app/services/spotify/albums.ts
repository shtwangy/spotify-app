import { Album } from './album';

export interface Albums {
  albums: {
    href: string,
    items: Album[],
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number
  };
}
