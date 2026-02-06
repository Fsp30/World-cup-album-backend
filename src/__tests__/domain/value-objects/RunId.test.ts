import {
  AlbumId,
  CardId,
  MissionId,
  PackId,
  TeamId,
  TradeId,
  UserId,
} from '@/domain/value-objects';
import { runIdBaseTests } from '../../../utils/tests/IdBaseUtils';
import { SaleId } from '@/domain/value-objects/SaleId';
import { DuelId } from '@/domain/value-objects/DuelId';

runIdBaseTests('UserId', UserId);
runIdBaseTests('CardId', CardId);
runIdBaseTests('AlbumId', AlbumId);
runIdBaseTests('PackId', PackId);
runIdBaseTests('TradeId', TradeId);
runIdBaseTests('SaleId', SaleId);
runIdBaseTests('DuelId', DuelId);
runIdBaseTests('TeamId', TeamId);
runIdBaseTests('MissionId', MissionId);
