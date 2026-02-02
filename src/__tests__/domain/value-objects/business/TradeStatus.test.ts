import { TradeStatus, TradeStatusType } from '@/domain/value-objects';
import { describe, expect } from '@jest/globals';

describe('TradeStatus Value Object', () => {
  describe('Criação e Estados', () => {
    it('deve criar um status PENDING corretamente', () => {
      const status = TradeStatus.createPending();
      expect(status.isPending()).toBe(true);
      expect(status.status).toBe(TradeStatusType.PENDING);
    });

    it('deve identificar corretamente o quando um status é finalizado', () => {
      const accepted = TradeStatus.createAccepted();
      const rejected = TradeStatus.createRejected();
      const pending = TradeStatus.createPending();
      const expired = TradeStatus.createExpired();
      const cancelled = TradeStatus.createCancelled();

      expect(accepted.isFinalized()).toBe(true);
      expect(rejected.isFinalized()).toBe(true);
      expect(expired.isFinalized()).toBe(true);
      expect(cancelled.isFinalized()).toBe(true);
      expect(pending.isFinalized()).toBe(false);
    });

    it('deve permitir alteração de status somente se o status atual for PENDING', () => {
      const pending = TradeStatus.createPending();
      const accepted = TradeStatus.createAccepted();

      expect(pending.canBeModified()).toBe(true);
      expect(accepted.canBeModified()).toBe(false);
    });
  });

  describe('Conversão e validação', () => {
    it('deve criar um status válido a partir de uma string', () => {
      const base = TradeStatus.createPending();
      const status = base.fromString('PENDING');

      expect(status.isPending()).toBe(true);
    });

    it('deve lançar erro ao passar uma string inválida', () => {
      const base = TradeStatus.createPending();
      expect(() => base.fromString('INVALID_STATUS_BY_LIPE')).toThrow(
        'Status da troca inválido: INVALID_STATUS_BY_LIPE'
      );
    });
  });

  describe('Igualdade e Serialização', () => {
    it('deve comparar dois objetos TradeStatus corretamente', () => {
      const firstStatus = TradeStatus.createAccepted();
      const secondStatus = TradeStatus.createAccepted();
      const thirdStatus = TradeStatus.createRejected();

      expect(firstStatus.equals(secondStatus)).toBe(true);
      expect(firstStatus.equals(thirdStatus)).toBe(false);
    });

    it('deve retornar uma estrutura correta no ToJSON', () => {
      const base = TradeStatus.createPending();
      const json = base.toJSON();

      expect(json).toEqual({
        status: TradeStatusType.PENDING,
        isPending: true,
        isFinalized: false,
        updatedAt: expect.any(String),
      });
    });
  });
});
