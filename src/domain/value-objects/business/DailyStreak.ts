import { differenceInDays, isToday, isYesterday } from 'date-fns';

export class DailyStreak {
  private constructor(
    public readonly currentStreak: number,
    public readonly longestStreak: number,
    public readonly lastLoginDate: Date,

    public readonly MAX_REWARD_FOR_STREAK: number = 500,
    public readonly HIGH_REWARD_FOR_STREAK: number = 300,
    public readonly AVERAGE_REWARD_FOR_STREAK: number = 150,
    public readonly MIN_REWARD_FOR_STREAK: number = 50
  ) {
    this.validate();
  }

  static create(
    currentStreak: number = 0,
    longestStreak: number = 0,
    lastLoginDate?: Date
  ): DailyStreak {
    return new DailyStreak(
      currentStreak,
      longestStreak,
      lastLoginDate || new Date()
    );
  }

  static createNew(): DailyStreak {
    return new DailyStreak(0, 0, new Date());
  }

  private validate(): void {
    if (this.currentStreak < 0) {
      throw new Error('Sequencia atual não pode ser negativa');
    }

    if (this.longestStreak < 0) {
      throw new Error('Sequencia mais longa não pode ser negativa');
    }

    if (this.currentStreak > this.longestStreak) {
      throw new Error(
        'Sequencia atual não pode ser maior que a sequencia mais longa'
      );
    }
  }

  updateForLogin(): DailyStreak {
    const now = new Date();

    if (isToday(this.lastLoginDate)) {
      return this;
    }

    let newCurrentStreak: number;

    if (isYesterday(this.lastLoginDate)) {
      newCurrentStreak = this.currentStreak + 1;
    } else {
      newCurrentStreak = 1;
    }

    const newLongestStreak = Math.max(this.longestStreak, newCurrentStreak);

    return new DailyStreak(newCurrentStreak, newLongestStreak, now);
  }

  getStreakBonus(): number {
    if (this.currentStreak >= 30) return this.MAX_REWARD_FOR_STREAK;
    if (this.currentStreak >= 14) return this.HIGH_REWARD_FOR_STREAK;
    if (this.currentStreak >= 7) return this.AVERAGE_REWARD_FOR_STREAK;
    if (this.currentStreak >= 3) return this.MIN_REWARD_FOR_STREAK;
    return 0;
  }

  getDaysSinceLastLogin(): number {
    return differenceInDays(new Date(), this.lastLoginDate);
  }

  isStreakActive(): boolean {
    return this.getDaysSinceLastLogin() <= 1;
  }

  hasLoginedToday(): boolean {
    return isToday(this.lastLoginDate);
  }

  getStreakLevel(): 'bronze' | 'silver' | 'gold' | 'diamond' | 'none' {
    if (this.currentStreak >= 30) return 'diamond';
    if (this.currentStreak >= 14) return 'gold';
    if (this.currentStreak >= 7) return 'silver';
    if (this.currentStreak >= 3) return 'bronze';
    return 'none';
  }

  toJSON() {
    return {
      currentStreak: this.currentStreak,
      longestStreak: this.longestStreak,
      lastLoginDate: this.lastLoginDate.toISOString(),
      streakBonus: this.getStreakBonus(),
      daysSinceLastLogin: this.getDaysSinceLastLogin(),
      isStreakActive: this.isStreakActive(),
      hasLoginedToday: this.hasLoginedToday(),
      streakLevel: this.getStreakLevel(),
    };
  }
  toString(): string {
    return `Sequencia: ${this.currentStreak} dias. (Recorde: ${this.longestStreak})`;
  }
}
