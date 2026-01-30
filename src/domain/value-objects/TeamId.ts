import { randomUUID } from 'crypto';

export class TeamId {
  private constructor(public readonly value: string) {
    this.validate();
  }

  static create(value?: string): TeamId {
    return new TeamId(value ?? randomUUID());
  }

  static fromString(value: string): TeamId {
    return new TeamId(value);
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('TeamId não pode ser vazio');
    }
  }

  equals(other: TeamId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
