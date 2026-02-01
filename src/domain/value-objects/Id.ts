export abstract class Id {
  protected constructor(public readonly value: string) {
    this.validate();
  }

  private validate() {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error(`${this.constructor.name} não pode ser vazio.`);
    }
  }

  equals(other: Id): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
