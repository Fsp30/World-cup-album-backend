import { randomUUID } from 'crypto';

export class SaleId {
  private constructor(public readonly value: string) {
    this.validate();
  }

  static create(value?: string): SaleId {
    return new SaleId(value ?? randomUUID());
  }

  static fromString(value: string): SaleId {
    return new SaleId(value);
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('SaleId não pode ser vazio');
    }
  }

  equals(other: SaleId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
