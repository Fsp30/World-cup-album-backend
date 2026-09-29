import { Id } from '@/domain/value-objects';
import { describe, expect, it } from '@jest/globals';

type IdConstructor<T extends Id> = {
  create(value?: string): T;
  fromString(value: string): T;
};

export function runIdBaseTests<T extends Id>(
  idName: string,
  IdClass: IdConstructor<T>
) {
  describe(`${idName} Base Tests`, () => {
    it('deve gerar um UUID válido automaticamente', () => {
      const id = IdClass.create();
      const validUUIDRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
      expect(id.value).toMatch(validUUIDRegex);
    });

    it('deve permitir criar a partir de uma string existente', () => {
      const raw = 'id customizado gerado pelo lipe';
      const id = IdClass.fromString(raw);
      expect(id.toString()).toBe(raw);
    });

    it('deve lançar um erro se o valor for vazio ou apenas espaços', () => {
      const errorMsg = `${idName} não pode ser vazio.`;
      expect(() => IdClass.fromString('')).toThrow(errorMsg);
      expect(() => IdClass.fromString('     ')).toThrow(errorMsg);
    });

    it('deve comparar igualdade corretamente', () => {
      const raw = 'id-lipe-criou';
      const firstId = IdClass.fromString(raw);
      const secondId = IdClass.fromString(raw);
      const thirdId = IdClass.create();

      expect(firstId.equals(secondId)).toBe(true);
      expect(firstId.equals(thirdId)).toBe(false);
    });
  });
}
