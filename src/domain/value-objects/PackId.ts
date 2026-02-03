import { randomUUID } from 'crypto';
import { Id } from './Id';

export class PackId extends Id {
  static create(value?: string): PackId {
    return new PackId(value ?? randomUUID());
  }

  static fromString(value: string): PackId {
    return new PackId(value);
  }
}
