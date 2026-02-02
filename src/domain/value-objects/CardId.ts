import { randomUUID } from 'crypto';
import { Id } from './Id';

export class CardId extends Id {
  static create(value?: string): CardId {
    return new CardId(value ?? randomUUID());
  }

  static fromString(value: string): CardId {
    return new CardId(value);
  }
}
