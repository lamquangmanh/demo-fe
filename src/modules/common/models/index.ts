export type BaseEntity = {
  id: string;
  createdAt: number;
  updatedAt: number;
  createdById?: number;
  updatedById?: number;
} & BaseUserAudit;

export type BaseAudit = {
  id: number;
  firstName: string;
  lastName: string;
  fullName?: string;
  username?: string;
  avatar?: string;
};

export type BaseUserAudit = {
  createdBy?: BaseAudit;
  updatedBy?: BaseAudit;
};

export type BaseResponse<T> = {
  success: boolean;
  message?: string;
  data?: T | T[];
  error?: any;
};
