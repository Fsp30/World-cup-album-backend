export class MissionProgress {
  private constructor(
    public readonly current: number,
    public readonly target: number
  ) {
    this.validate();
  }

  static create(current: number, target: number): MissionProgress {
    return new MissionProgress(current, target);
  }

  static createEmpty(target: number): MissionProgress {
    return new MissionProgress(0, target);
  }

  private validate(): void {
    if (this.current < 0) {
      throw new Error('Progresso atual não pode ser de valor negativo');
    }

    if (this.target <= 0) {
      throw new Error('A meta deve ser maior que 0 (zero)');
    }

    if (!Number.isInteger(this.current) || !Number.isInteger(this.target)) {
      throw new Error('Progresso e meta devem ser números inteiros');
    }
  }

  increment(amount: number = 1): MissionProgress {
    const newCurrent = Math.min(this.current + amount, this.target);
    return new MissionProgress(newCurrent, this.target);
  }

  isCompleted(): boolean {
    return this.current >= this.target;
  }

  getPercentage(): number {
    return Math.floor((this.current / this.target) * 100);
  }

  getRemainProgress(): number {
    return Math.max(0, this.target - this.current);
  }

  equals(other: MissionProgress): boolean {
    return this.current === other.current && this.target === other.target;
  }

  format(): string {
    return `${this.current}/${this.target}`;
  }

  toJSON() {
    return {
      current: this.current,
      target: this.target,
      percentage: this.getPercentage(),
      isCompleted: this.isCompleted(),
      remaing: this.getRemainProgress(),
    };
  }

  toString(): string {
    return this.format();
  }
}
