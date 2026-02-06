export class Credits {
  private constructor(public readonly amount: number) {
    this.validate();
  }

  private validate(): void {
    if (this.amount < 0) {
      throw new Error('Créditos não podem ser negativos');
    }
    if (!Number.isFinite(this.amount)) {
      throw new Error('Créditos devem ser um número finito');
    }
    if (!Number.isInteger(this.amount)) {
      throw new Error('Créditos devem ser um número inteiro');
    }
  }

  static create(amount: number = 0): Credits {
    return new Credits(amount);
  }

  add(credits: Credits): Credits {
    if (credits.amount < 0) {
      throw new Error('Créditos insuficientes para esta operação');
    }
    return new Credits(this.amount + credits.amount);
  }

  subtract(credits: Credits): Credits {
    if (credits.amount < 0) {
      throw new Error('Créditos não podem ser negativos');
    }
    if (credits.amount >= this.amount) {
      throw new Error('Créditos insuficientes para esta operação');
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
    return this.amount > other.amount;
  }

  format(): string {
    return `${this.amount.toLocaleString('pt-BR')} créditos`;
  }

  toString(): string {
    return this.amount.toString();
  }

  toJSON() {
    return {
      amount: this.amount,
      formatted: this.format()
    };
  }
}
