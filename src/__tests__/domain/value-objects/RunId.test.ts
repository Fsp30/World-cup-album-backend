import { AlbumId, TeamId } from '@/domain/value-objects';
import { runIdBaseTests } from '../../../utils/tests/IdBaseUtils';
import { SaleId } from '@/domain/value-objects/SaleId';

runIdBaseTests('AlbumId', AlbumId);
runIdBaseTests('SaleId', SaleId);
runIdBaseTests('TeamId', TeamId);
