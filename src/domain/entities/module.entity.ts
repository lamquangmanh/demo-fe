import { BaseEntity } from './base.entity';
import { ProductEntity } from './product.entity';

export interface ModuleEntity extends BaseEntity {
  moduleId: string;
  productId?: string | null;
  name: string;
  description?: string | null;
  icon?: string | null;
  url?: string | null;
  product?: ProductEntity;
}
