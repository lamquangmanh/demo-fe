export interface BaseEntity {
  createdAt?: string | undefined | null;
  createdUserId?: string | undefined | null;
  createdUser?: { username: string; email: string } | undefined | null;
  updatedAt?: string | undefined | null;
  updatedUserId?: string | undefined | null;
  updatedUser?: { username: string; email: string } | undefined | null;
  deletedAt?: string | undefined | null;
  deletedUserId?: string | undefined | null;
  deletedUser?: { username: string; email: string } | undefined | null;
}
