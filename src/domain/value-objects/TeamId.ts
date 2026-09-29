import { randomUUID } from 'crypto';
import { Id } from './Id';

export class TeamId extends Id {
  static create(value?: string): TeamId {
    return new TeamId(value ?? randomUUID());
  }

  static fromString(value: string): TeamId {
    return new TeamId(value);
  }
}
