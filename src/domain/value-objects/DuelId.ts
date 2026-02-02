import { randomUUID } from 'crypto';
import { Id } from './Id';

export class DuelId extends Id {
  static create(value?: string): DuelId {
    return new DuelId(value ?? randomUUID());
  }

  static fromString(value: string): DuelId {
    return new DuelId(value);
  }
}
