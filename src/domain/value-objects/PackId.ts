import { randomUUID } from 'crypto';

export class PackId {
  private constructor(public readonly value: string) {
    this.validate();
  }

  static create(value?: string): PackId {
    return new PackId(value ?? randomUUID());
  }

  static fromString(value: string): PackId {
    return new PackId(value);
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('PackId não pode ser vazio!');
    }
  }

  equals(other: PackId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
