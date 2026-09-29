import { MissionProgress } from '@/domain/value-objects';
import { describe, expect } from '@jest/globals';

describe('MissionProgress Value Object', () => {
  describe('Criação e Validação', () => {
    it('deve criar uma instância de Mission Progress corretamente', () => {
      const missionProgress = MissionProgress.create(5, 10);
      expect(missionProgress.current).toBe(5);
      expect(missionProgress.target).toBe(10);
    });

    it('deve cruar um progresso inicial zerado com createEmpty', () => {
      const missionProgress = MissionProgress.createEmpty(10);
      expect(missionProgress.current).toBe(0);
      expect(missionProgress.target).toBe(10);
    });

    it('deve lançar um erro se o progresso atual for negativo', () => {
      expect(() => MissionProgress.create(-1, 10)).toThrow(
        'Progresso atual não pode ser de valor negativo'
      );
    });

    it('deve lançar um erro se meta for zero ou negativa', () => {
      expect(() => MissionProgress.create(0, 0)).toThrow(
        'A meta deve ser maior que 0 (zero)'
      );
      expect(() => MissionProgress.create(0, -1)).toThrow(
        'A meta deve ser maior que 0 (zero)'
      );
    });

    it('deve lançar erro se os valores não forem inteiros', () => {
      expect(() => MissionProgress.create(1.3, 10)).toThrow(
        'Progresso e meta devem ser números inteiros'
      );
      expect(() => MissionProgress.create(5, 8.6)).toThrow(
        'Progresso e meta devem ser números inteiros'
      );
    });
  });

  describe('Logica de Progresso', () => {
    it('deve incrementar progresso corretamente', () => {
      const firstProgress = MissionProgress.create(2, 10);
      const secondProgress = firstProgress.increment(3);

      expect(secondProgress.current).toBe(5);
      expect(firstProgress.current).toBe(2);
    });

    it('não deve ultrapassar a meta ao incrementar', () => {
      const progress = MissionProgress.create(5, 10);
      const updated = progress.increment(8);

      expect(updated.current).toBe(10);
      expect(updated.isCompleted()).toBe(true);
    });

    it('deve calcular a porcentagem corretamente (arredondando para baixo)', () => {
      const progress = MissionProgress.create(1, 3);
      expect(progress.getPercentage()).toBe(33);
    });

    it('deve calcular o progresso restante corretamente', () => {
      const progress = MissionProgress.create(4, 10);
      expect(progress.getRemainProgress()).toBe(6);
    });
  });

  describe('Comparação e Serialização', () => {
    it('deve formatar como string no padrão atual/meta', () => {
      const progress = MissionProgress.create(5, 20);
      expect(progress.format()).toBe('5/20');
      expect(progress.toString()).toBe('5/20');
    });

    it('deve retornar todos os dados calculados no toJSON', () => {
      const progress = MissionProgress.create(2, 4);
      expect(progress.toJSON()).toEqual({
        current: 2,
        target: 4,
        percentage: 50,
        isCompleted: false,
        remaing: 2,
      });
    });

    it('deve validar igualdade entre duas instâncias', () => {
      const p1 = MissionProgress.create(5, 10);
      const p2 = MissionProgress.create(5, 10);
      const p3 = MissionProgress.create(6, 10);

      expect(p1.equals(p2)).toBe(true);
      expect(p1.equals(p3)).toBe(false);
    });
  });
});
