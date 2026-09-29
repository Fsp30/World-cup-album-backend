import { describe, it, expect } from '@jest/globals';
// import { PlayerPosition, Position } from '@/domain/value-objects/PlayerPosition';

describe('PlayerPosition Value Object', () => {
  describe('Criação e Nomes', () => {
    it('deve criar uma posição válida', () => {
      const pos = PlayerPosition.create(Position.GK);
      expect(pos.position).toBe(Position.GK);
      expect(pos.getName()).toBe('Goleiro');
    });

    it('deve criar a partir de uma string válida (case-insensitive)', () => {
      const pos = PlayerPosition.fromString('st');
      expect(pos.position).toBe(Position.ST);
      expect(pos.getName()).toBe('Atacante');
    });

    it('deve lançar erro para posição inválida', () => {
      expect(() => PlayerPosition.fromString('XYZ')).toThrow(
        'Posição inválida: XYZ'
      );
    });
  });

  describe('Categorização (Tipos de Posição)', () => {
    it('deve identificar corretamente um Goleiro', () => {
      const gk = PlayerPosition.create(Position.GK);
      expect(gk.isGoalkeeper()).toBe(true);
      expect(gk.getPositionType()).toBe('GK');
    });

    it('deve identificar corretamente Defensores', () => {
      const cb = PlayerPosition.create(Position.CB);
      const lb = PlayerPosition.create(Position.LB);
      const rb = PlayerPosition.create(Position.RB);

      expect(cb.isDefender()).toBe(true);
      expect(lb.isDefender()).toBe(true);
      expect(rb.isDefender()).toBe(true);
      expect(cb.getPositionType()).toBe('DEF');
    });

    it('deve identificar corretamente Meio-campistas', () => {
      const cdm = PlayerPosition.create(Position.CDM);
      const cam = PlayerPosition.create(Position.CAM);

      expect(cdm.isMidfielder()).toBe(true);
      expect(cam.isMidfielder()).toBe(true);
      expect(cdm.getPositionType()).toBe('MID');
    });

    it('deve identificar corretamente Atacantes', () => {
      const st = PlayerPosition.create(Position.ST);
      const lw = PlayerPosition.create(Position.LW);

      expect(st.isAttacker()).toBe(true);
      expect(lw.isAttacker()).toBe(true);
      expect(st.getPositionType()).toBe('ATK');
    });
  });

  describe('Igualdade e Serialização', () => {
    it('deve validar igualdade entre posições', () => {
      const p1 = PlayerPosition.create(Position.CM);
      const p2 = PlayerPosition.create(Position.CM);
      const p3 = PlayerPosition.create(Position.RM);

      expect(p1.equals(p2)).toBe(true);
      expect(p1.equals(p3)).toBe(false);
    });

    it('deve retornar a estrutura correta no toJSON', () => {
      const pos = PlayerPosition.create(Position.RW);
      expect(pos.toJSON()).toEqual({
        position: 'RW',
        name: 'Ponta Direita',
        type: 'ATK',
      });
    });
  });
});
