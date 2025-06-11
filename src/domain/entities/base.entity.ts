export interface BaseEntity {
  createdAt?: string;
  createdUserId?: string;
  createdUser?: { username: string };
  updatedAt?: string;
  updatedUserId?: string;
  updatedUser?: { username: string };
  deletedAt?: string;
  deletedUserId?: string;
}
