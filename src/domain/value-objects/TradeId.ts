import { randomUUID } from 'crypto';
import { Id } from './Id';

export class TradeId extends Id {
  static create(value?: string): TradeId {
    return new TradeId(value ?? randomUUID());
  }

  static fromString(value: string): TradeId {
    return new TradeId(value);
  }
}
