import { BaseEntity } from './base.entity';

export interface ActionEntity extends BaseEntity {
  actionId: string;
  name: string;
  description: string;
  resourceId: string;
}
