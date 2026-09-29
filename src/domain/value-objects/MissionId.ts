import { randomUUID } from 'crypto';
import { Id } from './Id';

export class MissionId extends Id {
  static create(value?: string): MissionId {
    return new MissionId(value ?? randomUUID());
  }

  static fromString(value: string): MissionId {
    return new MissionId(value);
  }
}
