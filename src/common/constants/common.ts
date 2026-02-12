import { SortArgs, SortOrder } from '@/infrastructure/graphql';
import { RequestType, Method } from './enum';

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
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

export const REQUEST_TYPE_LIST = [
  { value: RequestType.VIEW, label: RequestType.VIEW },
  { value: RequestType.GRAPHQL, label: RequestType.GRAPHQL },
  { value: RequestType.GRPC, label: RequestType.GRPC },
  { value: RequestType.HTTP, label: RequestType.HTTP },
  { value: RequestType.WEBSOCKET, label: RequestType.WEBSOCKET },
];

export const METHOD_LIST = [
  { value: Method.GET, label: Method.GET },
  { value: Method.POST, label: Method.POST },
  { value: Method.PUT, label: Method.PUT },
  { value: Method.PATCH, label: Method.PATCH },
  { value: Method.DELETE, label: Method.DELETE },
];
