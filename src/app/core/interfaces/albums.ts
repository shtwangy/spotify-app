import { Album } from './';

export default interface Albums {
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
