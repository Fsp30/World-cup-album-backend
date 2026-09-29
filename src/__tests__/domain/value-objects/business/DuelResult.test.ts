import { describe, it, expect } from '@jest/globals';
// import { DuelResult, DuelOutcome } from '@/domain/value-objects/DuelResult';
// import { UserId } from '@/domain/value-objects/UserId';

describe('DuelResult Value Object', () => {
  const user1 = UserId.create();
  const user2 = UserId.create();
  const stranger = UserId.create();

  describe('Criação e Validação', () => {
    it('deve criar um resultado de vitória válido', () => {
      const result = DuelResult.createVictory(user1, user2, 5, 2, 100);

      expect(result.isDraw).toBe(false);
      expect(result.winnerScore).toBe(5);
      expect(result.loserScore).toBe(2);
      expect(result.creditsAwarded).toBe(100);
    });

    it('deve criar um empate válido', () => {
      const result = DuelResult.createDraw(user1, user2, 3);

      expect(result.isDraw).toBe(true);
      expect(result.winnerId).toBeNull();
      expect(result.winnerScore).toBe(3);
      expect(result.loserScore).toBe(3);
    });

    it('deve lançar erro se o vencedor não tiver mais pontos que o perdedor', () => {
      expect(() => DuelResult.createVictory(user1, user2, 2, 2, 50)).toThrow(
        'Pontuação do vencedor deve ser maior que a do perdedor'
      );
    });

    it('deve lançar erro para pontuações negativas', () => {
      expect(() => DuelResult.createVictory(user1, user2, -1, 2, 50)).toThrow(
        'Pontuações não podem ser negativas'
      );
    });
  });

  describe('Lógica de Resultado por Jogador', () => {
    it('deve retornar VICTORY para o vencedor', () => {
      const result = DuelResult.createVictory(user1, user2, 3, 1, 50);
      expect(result.getOutcomeForPlayer(user1)).toBe(DuelOutcome.VICTORY);
    });

    it('deve retornar DEFEAT para o perdedor', () => {
      const result = DuelResult.createVictory(user1, user2, 3, 1, 50);
      expect(result.getOutcomeForPlayer(user2)).toBe(DuelOutcome.DEFEAT);
    });

    it('deve retornar DRAW para qualquer um em caso de empate', () => {
      const result = DuelResult.createDraw(user1, user2, 2);
      expect(result.getOutcomeForPlayer(user1)).toBe(DuelOutcome.DRAW);
      expect(result.getOutcomeForPlayer(user2)).toBe(DuelOutcome.DRAW);
    });

    it('deve lançar erro se o jogador consultado não participou do duelo', () => {
      const result = DuelResult.createVictory(user1, user2, 3, 1, 50);
      expect(() => result.getOutcomeForPlayer(stranger)).toThrow(
        'Player não participou deste duelo'
      );
    });
  });

  describe('Cálculos e Serialização', () => {
    it('deve calcular a diferença de gols/pontos corretamente', () => {
      const result = DuelResult.createVictory(user1, user2, 10, 4, 0);
      expect(result.getScoreDifference()).toBe(6);
    });

    it('deve retornar o formato JSON esperado', () => {
      const result = DuelResult.createVictory(user1, user2, 2, 0, 10);
      const json = result.toJSON();

      expect(json).toMatchObject({
        winnerScore: 2,
        loserScore: 0,
        isDraw: false,
        scoreDifference: 2,
      });
    });

    it('deve retornar a representação em string correta', () => {
      const win = DuelResult.createVictory(user1, user2, 2, 1, 50);
      const draw = DuelResult.createDraw(user1, user2, 1);

      expect(win.toString()).toContain('Vitória: 2 x 1 (+50 créditos)');
      expect(draw.toString()).toBe('Empate: 1 x 1');
    });
  });
});
