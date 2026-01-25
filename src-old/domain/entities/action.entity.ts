import { RequestType } from '@/common/constants';
import { BaseEntity } from './base.entity';

export interface ActionEntity extends BaseEntity {
  actionId: string;
  name: string;
  description?: string | null;
  resourceId: string;
  method: string;
  url: string;
  requestType: RequestType;
}
