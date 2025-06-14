import { BaseEntity } from './base.entity';

export interface ProductEntity extends BaseEntity {
  productId: string;
  name: string;
  description?: string | null;
  url: string;
  icon?: string | null;
}
