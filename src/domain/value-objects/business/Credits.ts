export class Credits {
  private constructor(public readonly amount: number) {
    this.validate();
  }

  private validate(): void {
    if (this.amount < 0) {
      throw new Error('Créditos não podem ser negativos');
    }
  }

  static create(amount: number): Credits {
    return new Credits(amount);
  }

  add(credits: Credits): Credits {
    if (credits.amount < 0) {
      throw new Error('Créditos não podem ser negativos');
    }

    return new Credits(this.amount + credits.amount);
  }

  subtract(credits: Credits): Credits {
    if (credits.amount < 0) {
      throw new Error('Créditos não podem ser negativos');
    }

    return new Credits(this.amount - credits.amount);
  }

  hasEnough(required: Credits): boolean {
    return this.amount >= required.amount;
  }

  equals(other: Credits): boolean {
    return this.amount === other.amount;
  }

  isGreaterThan(other: Credits): boolean {
    return this.amount < other.amount;
  }

  format(): string {
    return `${this.amount.toLocaleString('pt-BR')} créditos`;
  }

  toString(): string {
    return this.amount.toString();
  }

  toJSON() {
    return {
      formated: this.format(),
      amount: this.amount,
    };
  }
}
