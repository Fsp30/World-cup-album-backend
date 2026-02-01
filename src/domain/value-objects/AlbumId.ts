import { randomUUID } from 'node:crypto';
import { Id } from './Id';

export class AlbumId extends Id {
  static create(value?: string): AlbumId {
    return new AlbumId(value ?? randomUUID());
  }

  static fromString(value: string): AlbumId {
    return new AlbumId(value);
  }
}
