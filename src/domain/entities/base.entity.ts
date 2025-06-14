export interface BaseEntity {
  createdAt?: string | undefined | null;
  createdUserId?: string | undefined | null;
  createdUser?: { username: string } | undefined | null;
  updatedAt?: string | undefined | null;
  updatedUserId?: string | undefined | null;
  updatedUser?: { username: string } | undefined | null;
  deletedAt?: string | undefined | null;
  deletedUserId?: string | undefined | null;
}
