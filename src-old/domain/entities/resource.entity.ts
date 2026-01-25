import { BaseEntity } from './base.entity';
import { ActionEntity } from './action.entity';
import { ModuleEntity } from './module.entity';
export interface ResourceEntity extends BaseEntity {
  resourceId: string;
  moduleId: string;
  module?: ModuleEntity;
  name: string;
  actions: ActionEntity[];
}
