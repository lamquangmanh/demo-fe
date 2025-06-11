import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Action entity */
export type ActionEntity = {
  __typename?: 'ActionEntity';
  /** Action ID */
  actionId: Scalars['String']['output'];
  /** Created At */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Created user id */
  createdUserId?: Maybe<Scalars['String']['output']>;
  /** Deleted At */
  deletedAt?: Maybe<Scalars['String']['output']>;
  /** Deleted user id */
  deletedUserId?: Maybe<Scalars['String']['output']>;
  /** Optional description of the action */
  description?: Maybe<Scalars['String']['output']>;
  method: Scalars['String']['output'];
  /** Name of the action */
  name: Scalars['String']['output'];
  /** request type of the action */
  requestType: RequestType;
  /** Resource ID */
  resourceId: Scalars['String']['output'];
  /** Updated At */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** Updated user id */
  updatedUserId?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type ActionInput = {
  actionId?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  method: Scalars['String']['input'];
  name: Scalars['String']['input'];
  requestType: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

/** Delete successfully response */
export type DeleteSuccessResponse = {
  __typename?: 'DeleteSuccessResponse';
  success: Scalars['Boolean']['output'];
};

export type FilterArgs = {
  field: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

/** Get list */
export type GetActionsResponse = {
  __typename?: 'GetActionsResponse';
  data: Array<ActionEntity>;
  pagination: PaginationResponse;
};

export type GetMeResponse = {
  __typename?: 'GetMeResponse';
  avatar?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

/** Get list */
export type GetModulesResponse = {
  __typename?: 'GetModulesResponse';
  data: Array<ModuleEntity>;
  pagination: PaginationResponse;
};

/** Get list */
export type GetResourcesResponse = {
  __typename?: 'GetResourcesResponse';
  data: Array<ResourceEntity>;
  pagination: PaginationResponse;
};

/** Get list */
export type GetRolesResponse = {
  __typename?: 'GetRolesResponse';
  data: Array<RoleEntity>;
  pagination: PaginationResponse;
};

/** Get list */
export type GetSuperMenusResponse = {
  __typename?: 'GetSuperMenusResponse';
  superMenus: Array<SuperMenu>;
};

/** Get list */
export type GetUsersResponse = {
  __typename?: 'GetUsersResponse';
  data: Array<UserEntity>;
  pagination: PaginationResponse;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Menu = {
  __typename?: 'Menu';
  /** Name of the super menu */
  name: Scalars['String']['output'];
  /** Unique identifier for the super menu */
  resourceId: Scalars['String']['output'];
  /** List of sub-menus under the menu */
  subMenus: Array<SubMenu>;
  /** URL of the super menu icon */
  url: Scalars['String']['output'];
};

/** Module entity */
export type ModuleEntity = {
  __typename?: 'ModuleEntity';
  /** Created At */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Created user id */
  createdUserId?: Maybe<Scalars['String']['output']>;
  /** Deleted At */
  deletedAt?: Maybe<Scalars['String']['output']>;
  /** Deleted user id */
  deletedUserId?: Maybe<Scalars['String']['output']>;
  /** Optional description of the action */
  description?: Maybe<Scalars['String']['output']>;
  /** Module ID */
  moduleId: Scalars['String']['output'];
  /** Name */
  name: Scalars['String']['output'];
  /** Updated At */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** Updated user id */
  updatedUserId?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createModule: ModuleEntity;
  createResource: ResourceEntity;
  createRole: RoleEntity;
  createUser: UserEntity;
  deleteModule: DeleteSuccessResponse;
  deleteResource: DeleteSuccessResponse;
  deleteRole: DeleteSuccessResponse;
  deleteUser: DeleteSuccessResponse;
  updateModule: UpdateSuccessResponse;
  updateResource: UpdateSuccessResponse;
  updateRole: UpdateSuccessResponse;
  updateUser: UpdateSuccessResponse;
};


export type MutationCreateModuleArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateResourceArgs = {
  actions: Array<ActionInput>;
  moduleId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateRoleArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  moduleId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  permissions: Array<PermissionInput>;
};


export type MutationCreateUserArgs = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  roleIds: Array<Scalars['String']['input']>;
  status: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteModuleArgs = {
  moduleId: Scalars['String']['input'];
};


export type MutationDeleteResourceArgs = {
  resourceId: Scalars['String']['input'];
};


export type MutationDeleteRoleArgs = {
  roleId: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationUpdateModuleArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  moduleId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateResourceArgs = {
  actions: Array<ActionInput>;
  moduleId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
};


export type MutationUpdateRoleArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  moduleId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  permissions: Array<PermissionInput>;
  roleId: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  userId: Scalars['String']['input'];
};

export type PaginationArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

/** Pagination response */
export type PaginationResponse = {
  __typename?: 'PaginationResponse';
  itemCount: Scalars['Float']['output'];
  limit: Scalars['Float']['output'];
  page: Scalars['Float']['output'];
  totalItems: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

/** Permission entity */
export type PermissionEntity = {
  __typename?: 'PermissionEntity';
  /** action */
  action?: Maybe<ActionEntity>;
  /** actionId */
  actionId: Scalars['String']['output'];
  /** Created At */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Created user id */
  createdUserId?: Maybe<Scalars['String']['output']>;
  /** Deleted At */
  deletedAt?: Maybe<Scalars['String']['output']>;
  /** Deleted user id */
  deletedUserId?: Maybe<Scalars['String']['output']>;
  /** permissionId */
  permissionId: Scalars['String']['output'];
  /** resource */
  resource?: Maybe<ResourceEntity>;
  /** resourceId */
  resourceId: Scalars['String']['output'];
  /** roleId */
  roleId: Scalars['String']['output'];
  /** Updated At */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** Updated user id */
  updatedUserId?: Maybe<Scalars['String']['output']>;
};

export type PermissionInput = {
  actionId: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  action: ActionEntity;
  actions: GetActionsResponse;
  getMe: GetMeResponse;
  getSuperMenus: GetSuperMenusResponse;
  login: LoginResponse;
  module: ModuleEntity;
  modules: GetModulesResponse;
  resource: ResourceEntity;
  resources: GetResourcesResponse;
  role: RoleEntity;
  roles: GetRolesResponse;
  user: UserEntity;
  users: GetUsersResponse;
};


export type QueryActionArgs = {
  actionId: Scalars['String']['input'];
};


export type QueryActionsArgs = {
  filters: Array<FilterArgs>;
  pagination: PaginationArgs;
  sorts: Array<SortArgs>;
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryModuleArgs = {
  moduleId: Scalars['String']['input'];
};


export type QueryModulesArgs = {
  filters: Array<FilterArgs>;
  pagination: PaginationArgs;
  sorts: Array<SortArgs>;
};


export type QueryResourceArgs = {
  resourceId: Scalars['String']['input'];
};


export type QueryResourcesArgs = {
  filters: Array<FilterArgs>;
  pagination: PaginationArgs;
  sorts: Array<SortArgs>;
};


export type QueryRoleArgs = {
  roleId: Scalars['String']['input'];
};


export type QueryRolesArgs = {
  filters: Array<FilterArgs>;
  pagination: PaginationArgs;
  sorts: Array<SortArgs>;
};


export type QueryUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  filters: Array<FilterArgs>;
  pagination: PaginationArgs;
  sorts: Array<SortArgs>;
};

/** RequestType enum */
export enum RequestType {
  Graphql = 'GRAPHQL',
  Grpc = 'GRPC',
  Http = 'HTTP',
  View = 'VIEW',
  Websocket = 'WEBSOCKET'
}

/** Resource entity */
export type ResourceEntity = {
  __typename?: 'ResourceEntity';
  /** actions */
  actions?: Maybe<Array<ActionEntity>>;
  /** Created At */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Created user id */
  createdUserId?: Maybe<Scalars['String']['output']>;
  /** Deleted At */
  deletedAt?: Maybe<Scalars['String']['output']>;
  /** Deleted user id */
  deletedUserId?: Maybe<Scalars['String']['output']>;
  /** moduleId */
  moduleId: Scalars['String']['output'];
  /** name */
  name: Scalars['String']['output'];
  /** resourceId */
  resourceId: Scalars['String']['output'];
  /** Updated At */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** Updated user id */
  updatedUserId?: Maybe<Scalars['String']['output']>;
};

/** Role entity */
export type RoleEntity = {
  __typename?: 'RoleEntity';
  /** Created At */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Created user id */
  createdUserId?: Maybe<Scalars['String']['output']>;
  /** Deleted At */
  deletedAt?: Maybe<Scalars['String']['output']>;
  /** Deleted user id */
  deletedUserId?: Maybe<Scalars['String']['output']>;
  /** description */
  description?: Maybe<Scalars['String']['output']>;
  module?: Maybe<ModuleEntity>;
  /** moduleId */
  moduleId: Scalars['String']['output'];
  /** name */
  name: Scalars['String']['output'];
  /** permissions */
  permissions?: Maybe<Array<PermissionEntity>>;
  /** roleId */
  roleId: Scalars['String']['output'];
  /** Updated At */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** Updated user id */
  updatedUserId?: Maybe<Scalars['String']['output']>;
};

export type SortArgs = {
  field: Scalars['String']['input'];
  order: SortOrder;
};

/** SortOrder enum */
export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SubMenu = {
  __typename?: 'SubMenu';
  actionId: Scalars['String']['output'];
  method: Scalars['String']['output'];
  name: Scalars['String']['output'];
  requestType: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type SuperMenu = {
  __typename?: 'SuperMenu';
  description?: Maybe<Scalars['String']['output']>;
  menus: Array<Menu>;
  moduleId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

/** Update successfully response */
export type UpdateSuccessResponse = {
  __typename?: 'UpdateSuccessResponse';
  success: Scalars['Boolean']['output'];
};

/** User entity */
export type UserEntity = {
  __typename?: 'UserEntity';
  /** avatar */
  avatar?: Maybe<Scalars['String']['output']>;
  /** Created At */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** createdUser */
  createdUser?: Maybe<UserEntity>;
  /** Created user id */
  createdUserId?: Maybe<Scalars['String']['output']>;
  /** Deleted At */
  deletedAt?: Maybe<Scalars['String']['output']>;
  /** Deleted user id */
  deletedUserId?: Maybe<Scalars['String']['output']>;
  /** email */
  email: Scalars['String']['output'];
  /** password */
  password?: Maybe<Scalars['String']['output']>;
  /** phone */
  phone?: Maybe<Scalars['String']['output']>;
  /** status */
  status: UserStatus;
  /** Updated At */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** updatedUser */
  updatedUser?: Maybe<UserEntity>;
  /** Updated user id */
  updatedUserId?: Maybe<Scalars['String']['output']>;
  /** userId */
  userId: Scalars['String']['output'];
  userRoles?: Maybe<Array<UserRoleEntity>>;
  /** username */
  username: Scalars['String']['output'];
};

/** User Role entity */
export type UserRoleEntity = {
  __typename?: 'UserRoleEntity';
  /** Created At */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Created user id */
  createdUserId?: Maybe<Scalars['String']['output']>;
  /** Deleted At */
  deletedAt?: Maybe<Scalars['String']['output']>;
  /** Deleted user id */
  deletedUserId?: Maybe<Scalars['String']['output']>;
  /** role */
  role?: Maybe<RoleEntity>;
  /** roleId */
  roleId: Scalars['String']['output'];
  /** Updated At */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** Updated user id */
  updatedUserId?: Maybe<Scalars['String']['output']>;
  /** userId */
  userId: Scalars['String']['output'];
  /** userRoleId */
  userRoleId: Scalars['String']['output'];
};

/** UserStatus enum */
export enum UserStatus {
  Active = 'ACTIVE',
  Deactivated = 'DEACTIVATED',
  Deleted = 'DELETED',
  UserStatusUnspecified = 'USER_STATUS_UNSPECIFIED'
}

export type LoginQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'LoginResponse', accessToken: string, refreshToken: string } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe: { __typename?: 'GetMeResponse', userId: string, username: string, email: string, status: string, avatar?: string | null, phone?: string | null } };

export type GetSuperMenusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSuperMenusQuery = { __typename?: 'Query', getSuperMenus: { __typename?: 'GetSuperMenusResponse', superMenus: Array<{ __typename?: 'SuperMenu', moduleId: string, name: string, description?: string | null, url?: string | null, menus: Array<{ __typename?: 'Menu', resourceId: string, name: string, url: string, subMenus: Array<{ __typename?: 'SubMenu', actionId: string, name: string, requestType: string, url: string, method: string }> }> }> } };

export type ModuleQueryVariables = Exact<{
  moduleId: Scalars['String']['input'];
}>;


export type ModuleQuery = { __typename?: 'Query', module: { __typename?: 'ModuleEntity', createdAt?: string | null, createdUserId?: string | null, updatedAt?: string | null, updatedUserId?: string | null, deletedAt?: string | null, deletedUserId?: string | null, moduleId: string, name: string, description?: string | null } };

export type GetModulesQueryVariables = Exact<{
  pagination: PaginationArgs;
  sorts: Array<SortArgs> | SortArgs;
  filters: Array<FilterArgs> | FilterArgs;
}>;


export type GetModulesQuery = { __typename?: 'Query', modules: { __typename?: 'GetModulesResponse', data: Array<{ __typename?: 'ModuleEntity', createdAt?: string | null, createdUserId?: string | null, updatedAt?: string | null, updatedUserId?: string | null, deletedAt?: string | null, deletedUserId?: string | null, moduleId: string, name: string, description?: string | null }>, pagination: { __typename?: 'PaginationResponse', page: number, limit: number, totalItems: number, totalPages: number, itemCount: number } } };

export type CreateModuleMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateModuleMutation = { __typename?: 'Mutation', createModule: { __typename?: 'ModuleEntity', createdAt?: string | null, createdUserId?: string | null, updatedAt?: string | null, updatedUserId?: string | null, deletedAt?: string | null, deletedUserId?: string | null, moduleId: string, name: string, description?: string | null } };

export type UpdateModuleMutationVariables = Exact<{
  moduleId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateModuleMutation = { __typename?: 'Mutation', updateModule: { __typename?: 'UpdateSuccessResponse', success: boolean } };

export type DeleteModuleMutationVariables = Exact<{
  moduleId: Scalars['String']['input'];
}>;


export type DeleteModuleMutation = { __typename?: 'Mutation', deleteModule: { __typename?: 'DeleteSuccessResponse', success: boolean } };


export const LoginDocument = gql`
    query Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    refreshToken
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables> & ({ variables: LoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const GetMeDocument = gql`
    query GetMe {
  getMe {
    userId
    username
    email
    status
    avatar
    phone
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export function useGetMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetSuperMenusDocument = gql`
    query GetSuperMenus {
  getSuperMenus {
    superMenus {
      moduleId
      name
      description
      url
      menus {
        resourceId
        name
        url
        subMenus {
          actionId
          name
          requestType
          url
          method
        }
      }
    }
  }
}
    `;

/**
 * __useGetSuperMenusQuery__
 *
 * To run a query within a React component, call `useGetSuperMenusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuperMenusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuperMenusQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSuperMenusQuery(baseOptions?: Apollo.QueryHookOptions<GetSuperMenusQuery, GetSuperMenusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSuperMenusQuery, GetSuperMenusQueryVariables>(GetSuperMenusDocument, options);
      }
export function useGetSuperMenusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSuperMenusQuery, GetSuperMenusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSuperMenusQuery, GetSuperMenusQueryVariables>(GetSuperMenusDocument, options);
        }
export function useGetSuperMenusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSuperMenusQuery, GetSuperMenusQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSuperMenusQuery, GetSuperMenusQueryVariables>(GetSuperMenusDocument, options);
        }
export type GetSuperMenusQueryHookResult = ReturnType<typeof useGetSuperMenusQuery>;
export type GetSuperMenusLazyQueryHookResult = ReturnType<typeof useGetSuperMenusLazyQuery>;
export type GetSuperMenusSuspenseQueryHookResult = ReturnType<typeof useGetSuperMenusSuspenseQuery>;
export type GetSuperMenusQueryResult = Apollo.QueryResult<GetSuperMenusQuery, GetSuperMenusQueryVariables>;
export const ModuleDocument = gql`
    query Module($moduleId: String!) {
  module(moduleId: $moduleId) {
    createdAt
    createdUserId
    updatedAt
    updatedUserId
    deletedAt
    deletedUserId
    moduleId
    name
    description
  }
}
    `;

/**
 * __useModuleQuery__
 *
 * To run a query within a React component, call `useModuleQuery` and pass it any options that fit your needs.
 * When your component renders, `useModuleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModuleQuery({
 *   variables: {
 *      moduleId: // value for 'moduleId'
 *   },
 * });
 */
export function useModuleQuery(baseOptions: Apollo.QueryHookOptions<ModuleQuery, ModuleQueryVariables> & ({ variables: ModuleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ModuleQuery, ModuleQueryVariables>(ModuleDocument, options);
      }
export function useModuleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ModuleQuery, ModuleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ModuleQuery, ModuleQueryVariables>(ModuleDocument, options);
        }
export function useModuleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ModuleQuery, ModuleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ModuleQuery, ModuleQueryVariables>(ModuleDocument, options);
        }
export type ModuleQueryHookResult = ReturnType<typeof useModuleQuery>;
export type ModuleLazyQueryHookResult = ReturnType<typeof useModuleLazyQuery>;
export type ModuleSuspenseQueryHookResult = ReturnType<typeof useModuleSuspenseQuery>;
export type ModuleQueryResult = Apollo.QueryResult<ModuleQuery, ModuleQueryVariables>;
export const GetModulesDocument = gql`
    query GetModules($pagination: PaginationArgs!, $sorts: [SortArgs!]!, $filters: [FilterArgs!]!) {
  modules(pagination: $pagination, sorts: $sorts, filters: $filters) {
    data {
      createdAt
      createdUserId
      updatedAt
      updatedUserId
      deletedAt
      deletedUserId
      moduleId
      name
      description
    }
    pagination {
      page
      limit
      totalItems
      totalPages
      itemCount
    }
  }
}
    `;

/**
 * __useGetModulesQuery__
 *
 * To run a query within a React component, call `useGetModulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetModulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetModulesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      sorts: // value for 'sorts'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetModulesQuery(baseOptions: Apollo.QueryHookOptions<GetModulesQuery, GetModulesQueryVariables> & ({ variables: GetModulesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetModulesQuery, GetModulesQueryVariables>(GetModulesDocument, options);
      }
export function useGetModulesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetModulesQuery, GetModulesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetModulesQuery, GetModulesQueryVariables>(GetModulesDocument, options);
        }
export function useGetModulesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetModulesQuery, GetModulesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetModulesQuery, GetModulesQueryVariables>(GetModulesDocument, options);
        }
export type GetModulesQueryHookResult = ReturnType<typeof useGetModulesQuery>;
export type GetModulesLazyQueryHookResult = ReturnType<typeof useGetModulesLazyQuery>;
export type GetModulesSuspenseQueryHookResult = ReturnType<typeof useGetModulesSuspenseQuery>;
export type GetModulesQueryResult = Apollo.QueryResult<GetModulesQuery, GetModulesQueryVariables>;
export const CreateModuleDocument = gql`
    mutation CreateModule($name: String!, $description: String) {
  createModule(name: $name, description: $description) {
    createdAt
    createdUserId
    updatedAt
    updatedUserId
    deletedAt
    deletedUserId
    moduleId
    name
    description
  }
}
    `;
export type CreateModuleMutationFn = Apollo.MutationFunction<CreateModuleMutation, CreateModuleMutationVariables>;

/**
 * __useCreateModuleMutation__
 *
 * To run a mutation, you first call `useCreateModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createModuleMutation, { data, loading, error }] = useCreateModuleMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateModuleMutation(baseOptions?: Apollo.MutationHookOptions<CreateModuleMutation, CreateModuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateModuleMutation, CreateModuleMutationVariables>(CreateModuleDocument, options);
      }
export type CreateModuleMutationHookResult = ReturnType<typeof useCreateModuleMutation>;
export type CreateModuleMutationResult = Apollo.MutationResult<CreateModuleMutation>;
export type CreateModuleMutationOptions = Apollo.BaseMutationOptions<CreateModuleMutation, CreateModuleMutationVariables>;
export const UpdateModuleDocument = gql`
    mutation UpdateModule($moduleId: String!, $name: String!, $description: String) {
  updateModule(moduleId: $moduleId, name: $name, description: $description) {
    success
  }
}
    `;
export type UpdateModuleMutationFn = Apollo.MutationFunction<UpdateModuleMutation, UpdateModuleMutationVariables>;

/**
 * __useUpdateModuleMutation__
 *
 * To run a mutation, you first call `useUpdateModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateModuleMutation, { data, loading, error }] = useUpdateModuleMutation({
 *   variables: {
 *      moduleId: // value for 'moduleId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateModuleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateModuleMutation, UpdateModuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateModuleMutation, UpdateModuleMutationVariables>(UpdateModuleDocument, options);
      }
export type UpdateModuleMutationHookResult = ReturnType<typeof useUpdateModuleMutation>;
export type UpdateModuleMutationResult = Apollo.MutationResult<UpdateModuleMutation>;
export type UpdateModuleMutationOptions = Apollo.BaseMutationOptions<UpdateModuleMutation, UpdateModuleMutationVariables>;
export const DeleteModuleDocument = gql`
    mutation DeleteModule($moduleId: String!) {
  deleteModule(moduleId: $moduleId) {
    success
  }
}
    `;
export type DeleteModuleMutationFn = Apollo.MutationFunction<DeleteModuleMutation, DeleteModuleMutationVariables>;

/**
 * __useDeleteModuleMutation__
 *
 * To run a mutation, you first call `useDeleteModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteModuleMutation, { data, loading, error }] = useDeleteModuleMutation({
 *   variables: {
 *      moduleId: // value for 'moduleId'
 *   },
 * });
 */
export function useDeleteModuleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteModuleMutation, DeleteModuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteModuleMutation, DeleteModuleMutationVariables>(DeleteModuleDocument, options);
      }
export type DeleteModuleMutationHookResult = ReturnType<typeof useDeleteModuleMutation>;
export type DeleteModuleMutationResult = Apollo.MutationResult<DeleteModuleMutation>;
export type DeleteModuleMutationOptions = Apollo.BaseMutationOptions<DeleteModuleMutation, DeleteModuleMutationVariables>;