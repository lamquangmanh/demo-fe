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

export interface GraphQLErrorDataField {
  field: string;
  error: string;
  code: number;
}
export interface GraphQLErrorData {
  code: number;
  message: string;
  extra?: {
    fields: GraphQLErrorDataField[];
  };
}
export interface GraphQLError {
  errors?: GraphQLErrorData[];
  graphQLErrors?: GraphQLErrorData[];
}
