export enum DuelOutcome {
  VICTORY = 'VICTORY',
  DRAW = 'DRAW',
  DEFEAT = 'DEFEAT',
}

import { UserId } from '../UserId';

export class DuelResult {
  private constructor(
    public readonly users: Map<number, UserId>,
    public readonly winnerId: UserId | null,
    public readonly loserId: UserId | null,
    public readonly winnerScore: number,
    public readonly loserScore: number,
    public readonly isDraw: boolean,
    public readonly creditsAwarded: number,
    public readonly createdAt: Date
  ) {
    this.validate();
  }

  private validate(): void {
    if (this.winnerId === this.loserId && this.winnerId != null) {
      throw new Error('Vencedor e perdedor não podem ser a mesma pessoa');
    }

    if (this.creditsAwarded < 0) {
      throw new Error('O prêmio da partida não pode ser menor que 0');
    }

    if (this.winnerScore < 0 || this.loserScore < 0) {
      throw new Error(
        'Pontuações não podem ser negativas'
      );
    }
  }

  static createVictory(
    winnerId: UserId,
    loserId: UserId,
    winnerScore: number,
    loserScore: number,
    creditsAward: number
  ): DuelResult {
    if (loserScore >= winnerScore) {
      throw new Error('Pontuação do vencedor deve ser maior que a do perdedor');
    }

    return new DuelResult(
      new Map([[1, winnerId], [2, loserId]]),
      winnerId,
      loserId,
      winnerScore,
      loserScore,
      false,
      creditsAward,
      new Date()
    );
  }

  static createDraw(p1ID: UserId, p2ID: UserId, score: number) {
    return new DuelResult(new Map([[1, p1ID], [2, p2ID]]), null, null, score, score, true, 0, new Date());
  }

  getOutcomeForPlayer(user: UserId) {
    if (user === this.winnerId) {
      return DuelOutcome.VICTORY;
    }

    if (user === this.loserId) {
      return DuelOutcome.DEFEAT;
    }

    if (this.isDraw) {
      for(const u of this.users.values()) {
        if(u === user) {
          return DuelOutcome.DRAW;
        }
      }
    }


    throw new Error('Player não participou deste duelo');
  }

  getScoreDifference() {
    return this.winnerScore - this.loserScore;
  }

  toJSON() {
    return {
      winnerScore: this.winnerScore,
      loserScore: this.loserScore,
      isDraw: this.isDraw,
      scoreDifference: this.getScoreDifference(),
    };
  }

  toString() {
    if (this.isDraw) {
      return `Empate: ${this.winnerScore} x ${this.loserScore}`;
    }

    return `Vitória: ${this.winnerScore} x ${this.loserScore} (+${this.creditsAwarded} créditos)`;
  }
}
