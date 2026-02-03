import { describe, it, expect, jest } from '@jest/globals';
// import { CardRarity, RarityLevel } from '@/domain/value-objects/CardRarity';

describe('CardRarity Value Object', () => {
  describe('Criação e Atributos', () => {
    it('deve criar uma raridade válida com os valores corretos', () => {
      const rarity = CardRarity.create(RarityLevel.LEGENDARY);
      
      expect(rarity.level).toBe(RarityLevel.LEGENDARY);
      expect(rarity.getDropRate()).toBe(1);
      expect(rarity.getSaleValue()).toBe(5000);
    });

    it('deve criar a partir de uma string válida', () => {
      const rarity = CardRarity.fromString('rare');
      expect(rarity.level).toBe(RarityLevel.RARE);
    });

    it('deve lançar erro para string de raridade inválida', () => {
      expect(() => CardRarity.fromString('MYTHIC')).toThrow('Raridade inválida: MYTHIC');
    });
  });

  describe('Lógica de Probabilidade (Random)', () => {
    it('deve retornar COMMON quando o sorteio for 40 (dentro dos 50%)', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.4); 
      const rarity = CardRarity.random();
      expect(rarity.level).toBe(RarityLevel.COMMON);
      jest.restoreAllMocks();
    });

    it('deve retornar LEGENDARY quando o sorteio for 99.5 (último 1%)', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.995); 
      const rarity = CardRarity.random();
      expect(rarity.level).toBe(RarityLevel.LEGENDARY);
      jest.restoreAllMocks();
    });
  });

  describe('Comparação e Igualdade', () => {
    it('deve identificar corretamente qual raridade é superior', () => {
      const common = CardRarity.create(RarityLevel.COMMON);
      const rare = CardRarity.create(RarityLevel.RARE);
      const epic = CardRarity.create(RarityLevel.EPIC);

      expect(rare.isMoreRareThan(common)).toBe(true);
      expect(rare.isMoreRareThan(epic)).toBe(false);
      expect(epic.isMoreRareThan(rare)).toBe(true);
    });

    it('deve validar igualdade entre instâncias', () => {
      const r1 = CardRarity.create(RarityLevel.UNCOMMON);
      const r2 = CardRarity.create(RarityLevel.UNCOMMON);
      const r3 = CardRarity.create(RarityLevel.COMMON);

      expect(r1.equals(r2)).toBe(true);
      expect(r1.equals(r3)).toBe(false);
    });
  });

  describe('Serialização', () => {
    it('deve retornar a estrutura correta no toJSON', () => {
      const rarity = CardRarity.create(RarityLevel.EPIC);
      expect(rarity.toJSON()).toEqual({
        level: RarityLevel.EPIC,
        dropRate: 4,
        saleValue: 800
      });
    });
  });
});