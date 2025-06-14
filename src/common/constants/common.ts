import { SortArgs, SortOrder } from '@/infrastructure/graphql';

export const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];
export const NO_DATA = {
  data: [],
  total: 0,
  success: true,
};

export const DEFAULT_ERROR = {
  message: 'Something went wrong',
  description: 'Please try again later.',
};

export const DEFAULT_SORT: SortArgs = {
  field: 'createdAt',
  order: SortOrder.Desc,
};
