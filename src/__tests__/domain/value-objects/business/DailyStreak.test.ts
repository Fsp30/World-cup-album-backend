import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { DailyStreak } from '@/domain/value-objects';
import { subDays } from 'date-fns';

describe('DailyStreak Value Object', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-01-10T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Criação e Validação', () => {
    it('deve criar uma nova streak zerada', () => {
      const streak = DailyStreak.createNew();
      expect(streak.currentStreak).toBe(0);
      expect(streak.hasLoginedToday()).toBe(true);
    });

    it('deve lançar erro se a streak atual for maior que o recorde', () => {
      expect(() => DailyStreak.create(10, 5)).toThrow(
        'Sequencia atual não pode ser maior que a sequencia mais longa'
      );
    });

    it('deve lançar um erro se a streak atual for negatica', () => {
      expect(() => DailyStreak.create(-3, 10)).toThrow(
        'Sequencia atual não pode ser negativa'
      );
    });

    it('deve lançar um erro se a streak mais longa for negatica', () => {
      expect(() => DailyStreak.create(4, -1)).toThrow(
        'Sequencia mais longa não pode ser negativa'
      );
    });
  });

  describe('Lógica de Login e Sequência', () => {
    it('não deve alterar a streak se o login for no mesmo dia', () => {
      const initial = DailyStreak.create(5, 5, new Date());
      const updated = initial.updateForLogin();

      expect(updated.currentStreak).toBe(5);
      expect(updated).toBe(initial);
    });

    it('deve incrementar a streak se o último login foi ontem', () => {
      const ontem = subDays(new Date(), 1);
      const initial = DailyStreak.create(5, 5, ontem);

      const updated = initial.updateForLogin();

      expect(updated.currentStreak).toBe(6);
      expect(updated.longestStreak).toBe(6);
    });

    it('deve resetar a streak para 1 se o último login foi há mais de 2 dias', () => {
      const anteontem = subDays(new Date(), 2);
      const initial = DailyStreak.create(10, 10, anteontem);

      const updated = initial.updateForLogin();

      expect(updated.currentStreak).toBe(1);
      expect(updated.longestStreak).toBe(10);
    });
  });

  describe('Níveis e Bônus', () => {
    it('deve retornar o nível correto baseado na streak', () => {
      expect(DailyStreak.create(2, 2).getStreakLevel()).toBe('none');
      expect(DailyStreak.create(3, 3).getStreakLevel()).toBe('bronze');
      expect(DailyStreak.create(7, 7).getStreakLevel()).toBe('silver');
      expect(DailyStreak.create(14, 14).getStreakLevel()).toBe('gold');
      expect(DailyStreak.create(30, 30).getStreakLevel()).toBe('diamond');
    });

    it('deve calcular o bônus de recompensa corretamente', () => {
      const bronze = DailyStreak.create(3, 3);
      expect(bronze.getStreakBonus()).toBe(bronze.MIN_REWARD_FOR_STREAK);

      const diamond = DailyStreak.create(31, 31);
      expect(diamond.getStreakBonus()).toBe(diamond.MAX_REWARD_FOR_STREAK);
    });

    it('deve retornar o valor zero quando a sequência de dias for menor que 3', () => {
      const streakUnderThree = DailyStreak.create(2, 5);
      expect(streakUnderThree.getStreakBonus()).toBe(0);
    });
  });

  describe('Serialização', () => {
    it('deve gerar um JSON completo com metadados calculados', () => {
      const streak = DailyStreak.create(7, 10, subDays(new Date(), 1));
      const json = streak.toJSON();

      expect(json).toMatchObject({
        currentStreak: 7,
        longestStreak: 10,
        streakLevel: 'silver',
        isStreakActive: true,
      });
    });
  });
});
