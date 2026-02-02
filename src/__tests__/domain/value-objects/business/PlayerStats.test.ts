import { describe, it, expect, jest } from '@jest/globals';
// import { PlayerStats } from '@/domain/value-objects/PlayerStats';

describe('PlayerStats Value Object', () => {
  describe('Criação e Validação', () => {
    it('deve criar estatísticas válidas', () => {
      const stats = PlayerStats.create(80, 85, 75, 78, 82, 60, 70);
      expect(stats.overall).toBe(80);
      expect(stats.pace).toBe(85);
    });

    it('deve lançar erro se qualquer estatística for menor que 1 ou maior que 99', () => {
      expect(() => PlayerStats.create(100, 80, 80, 80, 80, 80, 80)).toThrow('Estatísticas devem estar entre 1 e 99');
      expect(() => PlayerStats.create(0, 80, 80, 80, 80, 80, 80)).toThrow('Estatísticas devem estar entre 1 e 99');
    });

    it('deve lançar erro se as estatísticas não forem números inteiros', () => {
      expect(() => PlayerStats.create(80.5, 80, 80, 80, 80, 80, 80)).toThrow('Estatísticas devem ser números inteiros');
    });
  });

  describe('Cálculos de Poder', () => {
    const stats = PlayerStats.create(80, 90, 80, 70, 80, 60, 70);

    it('deve calcular o poder de ataque corretamente (Pace, Shooting, Dribbling)', () => {
      expect(stats.getAttackPower()).toBe(83);
    });

    it('deve calcular o poder de defesa corretamente (Defending, Physical, Pace)', () => {
      expect(stats.getDefensePower()).toBe(73);
    });

    it('deve calcular o poder de meio-campo corretamente (Passing, Dribbling, Physical)', () => {
      expect(stats.getMidFieldPower()).toBe(73);
    });

    it('deve calcular o poder total (média das 6 habilidades)', () => {
      expect(stats.getTotalPower()).toBe(75);
    });
  });

  describe('Geração Aleatória (Random)', () => {
    it('deve gerar stats dentro do range de overall solicitado', () => {
      const min = 70;
      const max = 75;
      const stats = PlayerStats.random(min, max);

      expect(stats.overall).toBeGreaterThanOrEqual(min);
      expect(stats.overall).toBeLessThanOrEqual(max);
    });

    it('deve garantir que as stats geradas por random respeitam a variância', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.5); 
      const stats = PlayerStats.random(80, 80);
      
      const individualStats = [stats.pace, stats.shooting, stats.passing, stats.dribbling, stats.defending, stats.physical];
      individualStats.forEach(s => {
        expect(s).toBeGreaterThanOrEqual(70);
        expect(s).toBeLessThanOrEqual(90);
      });
      
      jest.restoreAllMocks();
    });
  });

  describe('Comparações e Serialização', () => {
    it('deve comparar se um jogador é melhor que outro pelo overall', () => {
      const p1 = PlayerStats.create(85, 80, 80, 80, 80, 80, 80);
      const p2 = PlayerStats.create(80, 90, 90, 90, 90, 90, 90);
      
      expect(p1.isBetterThan(p2)).toBe(true);
    });

    it('deve incluir todos os poderes calculados no toJSON', () => {
      const stats = PlayerStats.create(80, 80, 80, 80, 80, 80, 80);
      const json = stats.toJSON();

      expect(json).toHaveProperty('attackPower');
      expect(json).toHaveProperty('defensePower');
      expect(json).toHaveProperty('totalPower');
    });
  });
});