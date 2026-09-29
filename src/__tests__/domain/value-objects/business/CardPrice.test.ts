import { CardPrice, Credits } from '@/domain/value-objects';
import { describe, it, expect } from '@jest/globals';

describe('CardPrice Value Object', () => {
  describe('Criação e Validação', () => {
    it('deve criar um preço válido a partir de um número', () => {
      const price = CardPrice.create(100);
      expect(price.credits.amount).toBe(100);
    });

    
    it('deve criar a partir de uma instância de Credits', () => {
      const credits = Credits.create(500);
      const price = CardPrice.fromCredits(credits);
      expect(price.credits.equals(credits)).toBe(true);
    });
    

    it('deve lançar erro se o preço for zero ou negativo', () => {
      expect(() => CardPrice.create(0)).toThrow(
        'Preço deve ser maior que zero'
      );
      expect(() => CardPrice.create(-50)).toThrow(
        'Preço deve ser maior que zero'
      );
    });
  });

  describe('Transformações (Descontos e Multiplicadores)', () => {
    it('deve aplicar um desconto corretamente', () => {
      const price = CardPrice.create(100);
      const discounted = price.applyDiscount(20);

      expect(discounted.credits.amount).toBe(80);
      expect(price.credits.amount).toBe(100);
    });

    it('deve garantir que o preço com desconto seja no mínimo 1 crédito', () => {
      const price = CardPrice.create(10);
      const discounted = price.applyDiscount(99);

      expect(discounted.credits.amount).toBe(1);
    });

    it('deve lançar erro para porcentagens de desconto inválidas', () => {
      const price = CardPrice.create(100);
      expect(() => price.applyDiscount(-1)).toThrow(
        'Desconto deve estar entre 0 e 100'
      );
      expect(() => price.applyDiscount(101)).toThrow(
        'Desconto deve estar entre 0 e 100'
      );
    });

    it('deve multiplicar o preço por um fator corretamente', () => {
      const price = CardPrice.create(100);
      const multiplied = price.multiply(1.5);

      expect(multiplied.credits.amount).toBe(150);
    });

    it('deve lançar erro se o fator de multiplicação for zero ou negativo', () => {
      const price = CardPrice.create(100);
      expect(() => price.multiply(0)).toThrow(
        'Fator multiplicador deve ser maior que zero'
      );
    });
  });

  describe('Comparações e Formatação', () => {
    it('deve delegar a formatação para o Value Object de Credits', () => {
      const price = CardPrice.create(1000);
      expect(price.format()).toBe(price.credits.format());
      expect(price.format()).toContain('1.000');
    });

    it('deve comparar igualdade e magnitude corretamente', () => {
      const cheap = CardPrice.create(10);
      const expensive = CardPrice.create(100);

      expect(cheap.equals(CardPrice.create(10))).toBe(true);
      expect(expensive.isGreaterThan(cheap)).toBe(true);
    });
  });
});
