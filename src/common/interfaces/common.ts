export interface IAppList {
  title: string;
  url: string;
  desc?: string;
  icon?: string;
}

export interface TableDataResponse<T> {
  data: T[];
  total: number;
  success?: boolean;
}
