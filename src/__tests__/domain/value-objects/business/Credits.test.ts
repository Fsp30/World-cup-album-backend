import { describe, it, expect } from '@jest/globals';
// import { Credits } from '@/domain/value-objects/Credits';

describe('Credits Value Object', () => {
  describe('Criação e Validação', () => {
    it('deve criar uma quantidade de créditos válida', () => {
      const credits = Credits.create(100);
      expect(credits.amount).toBe(100);
    });

    it('deve criar com valor zero se nenhum parâmetro for passado', () => {
      const credits = Credits.create();
      expect(credits.amount).toBe(0);
    });

    it('deve lançar erro para valores negativos', () => {
      expect(() => Credits.create(-10)).toThrow(
        'Créditos não podem ser negativos'
      );
    });

    it('deve lançar erro para números não inteiros ou infinitos', () => {
      expect(() => Credits.create(10.5)).toThrow(
        'Créditos devem ser um número inteiro'
      );
      expect(() => Credits.create(Infinity)).toThrow(
        'Créditos devem ser um número finito'
      );
    });
  });

  describe('Operações Aritméticas', () => {
    it('deve somar créditos corretamente retornando uma nova instância', () => {
      const c1 = Credits.create(50);
      const c2 = Credits.create(30);
      const result = c1.add(c2);

      expect(result.amount).toBe(80);
      expect(c1.amount).toBe(50);
    });

    it('deve subtrair créditos corretamente', () => {
      const wallet = Credits.create(100);
      const cost = Credits.create(40);
      const remaining = wallet.subtract(cost);

      expect(remaining.amount).toBe(60);
    });

    it('deve lançar erro ao subtrair mais do que o saldo disponível', () => {
      const wallet = Credits.create(20);
      const cost = Credits.create(50);

      expect(() => wallet.subtract(cost)).toThrow(
        'Créditos insuficientes para esta operação'
      );
    });
  });

  describe('Comparações e Formatação', () => {
    it('deve verificar se possui saldo suficiente', () => {
      const wallet = Credits.create(100);
      expect(wallet.hasEnough(Credits.create(50))).toBe(true);
      expect(wallet.hasEnough(Credits.create(150))).toBe(false);
    });

    it('deve formatar o valor para o padrão brasileiro', () => {
      const credits = Credits.create(1500);
      expect(credits.format()).toContain('1.500');
      expect(credits.format()).toContain('créditos');
    });

    it('deve validar igualdade e magnitude', () => {
      const low = Credits.create(10);
      const high = Credits.create(100);
      const same = Credits.create(10);

      expect(low.equals(same)).toBe(true);
      expect(high.isGreaterThan(low)).toBe(true);
    });
  });

  describe('Serialização', () => {
    it('deve gerar JSON com valor numérico e formatado', () => {
      const credits = Credits.create(500);
      expect(credits.toJSON()).toEqual({
        amount: 500,
        formatted: '500 créditos',
      });
    });
  });
});
