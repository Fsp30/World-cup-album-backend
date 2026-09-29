import { randomUUID } from 'crypto';
import { Id } from './Id';

export class SaleId extends Id {
  static create(value?: string): SaleId {
    return new SaleId(value ?? randomUUID());
  }

  static fromString(value: string): SaleId {
    return new SaleId(value);
  }
}
