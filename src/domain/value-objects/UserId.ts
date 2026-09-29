import { randomUUID } from 'crypto';
import { Id } from './Id';

export class UserId extends Id {
  static create(value?: string): UserId {
    return new UserId(value ?? randomUUID());
  }

  static fromString(value: string): UserId {
    return new UserId(value);
  }
}
