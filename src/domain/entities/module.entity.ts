import { BaseEntity } from './base.entity';

export interface ModuleEntity extends BaseEntity {
  moduleId: string;
  name: string;
  description: string;
}
