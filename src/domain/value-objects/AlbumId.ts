import { randomUUID } from 'crypto';

export class AlbumId {
  private constructor(public readonly value: string) {
    this.validate();
  }

  static create(value?: string): AlbumId {
    return new AlbumId(value ?? randomUUID());
  }

  static fromString(value: string): AlbumId {
    return new AlbumId(value);
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('AlbumId não pode ser vazio.');
    }
  }

  equals(other: AlbumId): boolean {
    return this.value === other.value;
  }

  toSring(): string {
    return this.value;
  }
}
