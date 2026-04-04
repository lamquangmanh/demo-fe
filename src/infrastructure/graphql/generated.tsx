/* eslint-disable @typescript-eslint/ban-ts-comment */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  FlexibleValueScalar: { input: any; output: any };
};

/** Action entity */
export type ActionEntity = {
  __typename?: 'ActionEntity';
  /** Action ID */
  actionId: Scalars['String']['output'];
  /** Created At */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Created user */
  createdUser?: Maybe<CreatedUserEntity>;
  /** Created user id */
  createdUserId?: Maybe<Scalars['String']['output']>;
  /** Deleted At */
  deletedAt?: Maybe<Scalars['String']['output']>;
  /** Deleted user */
  deletedUser?: Maybe<DeletedUserEntity>;
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
  /** Updated user */
  updatedUser?: Maybe<UpdatedUserEntity>;
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

/** Create user entity */
export type CreatedUserEntity = {
  __typename?: 'CreatedUserEntity';
  /** avatar */
  avatar?: Maybe<Scalars['String']['output']>;
  createdUser: CreatedUserEntity;
  deletedUser: DeletedUserEntity;
  /** email */
  email?: Maybe<Scalars['String']['output']>;
  updatedUser: UpdatedUserEntity;
  /** userId */
  userId?: Maybe<Scalars['String']['output']>;
  /** username */
  username?: Maybe<Scalars['String']['output']>;
};

/** Delete successfully response */
export type DeleteSuccessResponse = {
  __typename?: 'DeleteSuccessResponse';
  success: Scalars['Boolean']['output'];
};

/** Deleted user entity */
export type DeletedUserEntity = {
  __typename?: 'DeletedUserEntity';
  /** avatar */
  avatar?: Maybe<Scalars['String']['output']>;
  createdUser: CreatedUserEntity;
  deletedUser: DeletedUserEntity;
  /** email */
  email?: Maybe<Scalars['String']['output']>;
  updatedUser: UpdatedUserEntity;
  /** userId */
  userId?: Maybe<Scalars['String']['output']>;
  /** username */
  username?: Maybe<Scalars['String']['output']>;
};

export type FilterArgs = {
  field: Scalars['String']['input'];
  value: Scalars['FlexibleValueScalar']['input'];
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
export type GetPermissionsByUserResponse = {
  __typename?: 'GetPermissionsByUserResponse';
  permissions: Array<PermissionInfo>;
};

/** Get list */
export type GetProductsResponse = {
  __typename?: 'GetProductsResponse';
  data: Array<ProductEntity>;
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
  success: Scalars['Boolean']['output'];
};

export type Menu = {
  __typename?: 'Menu';
  icon?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  subMenus: Array<SubMenu>;
  url?: Maybe<Scalars['String']['output']>;
};

/** Module entity */
export type ModuleEntity = {
  __typename?: 'ModuleEntity';
  /** Created At */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Created user */
  createdUser?: Maybe<CreatedUserEntity>;
  /** Created user id */
  createdUserId?: Maybe<Scalars['String']['output']>;
  /** Deleted At */
  deletedAt?: Maybe<Scalars['String']['output']>;
  /** Deleted user */
  deletedUser?: Maybe<DeletedUserEntity>;
  /** Deleted user id */
  deletedUserId?: Maybe<Scalars['String']['output']>;
  /** Optional description of the action */
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  /** Module ID */
  moduleId: Scalars['String']['output'];
  /** Name */
  name: Scalars['String']['output'];
  product: ProductEntity;
  productId?: Maybe<Scalars['String']['output']>;
  /** Updated At */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** Updated user */
  updatedUser?: Maybe<UpdatedUserEntity>;
  /** Updated user id */
  updatedUserId?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UpdateSuccessResponse;
  createModule: ModuleEntity;
  createProduct: ProductEntity;
  createResource: ResourceEntity;
  createRole: RoleEntity;
  createUser: UserEntity;
  deleteModule: DeleteSuccessResponse;
  deleteProduct: DeleteSuccessResponse;
  deleteResource: DeleteSuccessResponse;
  deleteRole: DeleteSuccessResponse;
  deleteUser: DeleteSuccessResponse;
  updateModule: UpdateSuccessResponse;
  updateProduct: UpdateSuccessResponse;
  updateResource: UpdateSuccessResponse;
  updateRole: UpdateSuccessResponse;
  updateUser: UpdateSuccessResponse;
};

export type MutationChangePasswordArgs = {
  password: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type MutationCreateModuleArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};

export type MutationCreateProductArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
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

export type MutationDeleteProductArgs = {
  productId: Scalars['String']['input'];
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
  icon?: InputMaybe<Scalars['String']['input']>;
  moduleId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUpdateProductArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  url: Scalars['String']['input'];
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
  avatar?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  roleIds: Array<Scalars['String']['input']>;
  status: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  username: Scalars['String']['input'];
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
  /** Created user */
  createdUser?: Maybe<CreatedUserEntity>;
  /** Created user id */
  createdUserId?: Maybe<Scalars['String']['output']>;
  /** Deleted At */
  deletedAt?: Maybe<Scalars['String']['output']>;
  /** Deleted user */
  deletedUser?: Maybe<DeletedUserEntity>;
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
  /** Updated user */
  updatedUser?: Maybe<UpdatedUserEntity>;
  /** Updated user id */
  updatedUserId?: Maybe<Scalars['String']['output']>;
};

export type PermissionInfo = {
  __typename?: 'PermissionInfo';
  method: Scalars['String']['output'];
  name: Scalars['String']['output'];
  requestType: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type PermissionInput = {
  actionId: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
};

/** Product entity */
export type ProductEntity = {
  __typename?: 'ProductEntity';
  /** Created At */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Created user */
  createdUser?: Maybe<CreatedUserEntity>;
  /** Created user id */
  createdUserId?: Maybe<Scalars['String']['output']>;
  /** Deleted At */
  deletedAt?: Maybe<Scalars['String']['output']>;
  /** Deleted user */
  deletedUser?: Maybe<DeletedUserEntity>;
  /** Deleted user id */
  deletedUserId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  productId: Scalars['String']['output'];
  /** Updated At */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** Updated user */
  updatedUser?: Maybe<UpdatedUserEntity>;
  /** Updated user id */
  updatedUserId?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  action: ActionEntity;
  actions: GetActionsResponse;
  getMe: GetMeResponse;
  getPermissionsByUser: GetPermissionsByUserResponse;
  getSuperMenus: GetSuperMenusResponse;
  login: LoginResponse;
  module: ModuleEntity;
  modules: GetModulesResponse;
  product: ProductEntity;
  products: GetProductsResponse;
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

export type QueryProductArgs = {
  productId: Scalars['String']['input'];
};

export type QueryProductsArgs = {
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
  Websocket = 'WEBSOCKET',
}

/** Resource entity */
export type ResourceEntity = {
  __typename?: 'ResourceEntity';
  /** actions */
  actions?: Maybe<Array<ActionEntity>>;
  /** Created At */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Created user */
  createdUser?: Maybe<CreatedUserEntity>;
  /** Created user id */
  createdUserId?: Maybe<Scalars['String']['output']>;
  /** Deleted At */
  deletedAt?: Maybe<Scalars['String']['output']>;
  /** Deleted user */
  deletedUser?: Maybe<DeletedUserEntity>;
  /** Deleted user id */
  deletedUserId?: Maybe<Scalars['String']['output']>;
  module: ModuleEntity;
  /** moduleId */
  moduleId: Scalars['String']['output'];
  /** name */
  name: Scalars['String']['output'];
  /** resourceId */
  resourceId: Scalars['String']['output'];
  /** Updated At */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** Updated user */
  updatedUser?: Maybe<UpdatedUserEntity>;
  /** Updated user id */
  updatedUserId?: Maybe<Scalars['String']['output']>;
};

/** Role entity */
export type RoleEntity = {
  __typename?: 'RoleEntity';
  /** Created At */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Created user */
  createdUser?: Maybe<CreatedUserEntity>;
  /** Created user id */
  createdUserId?: Maybe<Scalars['String']['output']>;
  /** Deleted At */
  deletedAt?: Maybe<Scalars['String']['output']>;
  /** Deleted user */
  deletedUser?: Maybe<DeletedUserEntity>;
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
  /** Updated user */
  updatedUser?: Maybe<UpdatedUserEntity>;
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
  Desc = 'DESC',
}

export type SubMenu = {
  __typename?: 'SubMenu';
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type SuperMenu = {
  __typename?: 'SuperMenu';
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  menus: Array<Menu>;
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

/** Update successfully response */
export type UpdateSuccessResponse = {
  __typename?: 'UpdateSuccessResponse';
  success: Scalars['Boolean']['output'];
};

/** Updated user entity */
export type UpdatedUserEntity = {
  __typename?: 'UpdatedUserEntity';
  /** avatar */
  avatar?: Maybe<Scalars['String']['output']>;
  createdUser: CreatedUserEntity;
  deletedUser: DeletedUserEntity;
  /** email */
  email?: Maybe<Scalars['String']['output']>;
  updatedUser: UpdatedUserEntity;
  /** userId */
  userId?: Maybe<Scalars['String']['output']>;
  /** username */
  username?: Maybe<Scalars['String']['output']>;
};

/** User entity */
export type UserEntity = {
  __typename?: 'UserEntity';
  /** avatar */
  avatar?: Maybe<Scalars['String']['output']>;
  /** Created At */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Created user */
  createdUser?: Maybe<CreatedUserEntity>;
  /** Created user id */
  createdUserId?: Maybe<Scalars['String']['output']>;
  /** Deleted At */
  deletedAt?: Maybe<Scalars['String']['output']>;
  /** Deleted user */
  deletedUser?: Maybe<DeletedUserEntity>;
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
  /** Updated user */
  updatedUser?: Maybe<UpdatedUserEntity>;
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
  /** Created user */
  createdUser?: Maybe<CreatedUserEntity>;
  /** Created user id */
  createdUserId?: Maybe<Scalars['String']['output']>;
  /** Deleted At */
  deletedAt?: Maybe<Scalars['String']['output']>;
  /** Deleted user */
  deletedUser?: Maybe<DeletedUserEntity>;
  /** Deleted user id */
  deletedUserId?: Maybe<Scalars['String']['output']>;
  /** role */
  role?: Maybe<RoleEntity>;
  /** roleId */
  roleId: Scalars['String']['output'];
  /** Updated At */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** Updated user */
  updatedUser?: Maybe<UpdatedUserEntity>;
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
  UserStatusUnspecified = 'USER_STATUS_UNSPECIFIED',
}

export type LoginQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginQuery = {
  __typename?: 'Query';
  login: {
    __typename?: 'LoginResponse';
    accessToken: string;
    refreshToken: string;
    success: boolean;
  };
};

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = {
  __typename?: 'Query';
  getMe: {
    __typename?: 'GetMeResponse';
    userId: string;
    username: string;
    email: string;
    status: string;
    avatar?: string | null;
    phone?: string | null;
  };
};

export type GetSuperMenusQueryVariables = Exact<{ [key: string]: never }>;

export type GetSuperMenusQuery = {
  __typename?: 'Query';
  getSuperMenus: {
    __typename?: 'GetSuperMenusResponse';
    superMenus: Array<{
      __typename?: 'SuperMenu';
      name: string;
      description?: string | null;
      url: string;
      icon?: string | null;
      menus: Array<{
        __typename?: 'Menu';
        name: string;
        url?: string | null;
        icon?: string | null;
        subMenus: Array<{ __typename?: 'SubMenu'; name: string; url: string }>;
      }>;
    }>;
  };
};

export type ModuleQueryVariables = Exact<{
  moduleId: Scalars['String']['input'];
}>;

export type ModuleQuery = {
  __typename?: 'Query';
  module: {
    __typename?: 'ModuleEntity';
    createdAt?: string | null;
    createdUserId?: string | null;
    updatedAt?: string | null;
    updatedUserId?: string | null;
    deletedAt?: string | null;
    deletedUserId?: string | null;
    moduleId: string;
    productId?: string | null;
    name: string;
    description?: string | null;
    icon?: string | null;
    url?: string | null;
    product: { __typename?: 'ProductEntity'; productId: string; name: string };
  };
};

export type GetModulesQueryVariables = Exact<{
  pagination: PaginationArgs;
  sorts: Array<SortArgs> | SortArgs;
  filters: Array<FilterArgs> | FilterArgs;
}>;

export type GetModulesQuery = {
  __typename?: 'Query';
  modules: {
    __typename?: 'GetModulesResponse';
    data: Array<{
      __typename?: 'ModuleEntity';
      createdAt?: string | null;
      createdUserId?: string | null;
      updatedAt?: string | null;
      updatedUserId?: string | null;
      deletedAt?: string | null;
      deletedUserId?: string | null;
      moduleId: string;
      productId?: string | null;
      name: string;
      description?: string | null;
      icon?: string | null;
      url?: string | null;
      product: { __typename?: 'ProductEntity'; name: string };
      createdUser?: {
        __typename?: 'CreatedUserEntity';
        username?: string | null;
        email?: string | null;
      } | null;
      updatedUser?: {
        __typename?: 'UpdatedUserEntity';
        username?: string | null;
        email?: string | null;
      } | null;
      deletedUser?: {
        __typename?: 'DeletedUserEntity';
        username?: string | null;
        email?: string | null;
      } | null;
    }>;
    pagination: {
      __typename?: 'PaginationResponse';
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
      itemCount: number;
    };
  };
};

export type CreateModuleMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['String']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
}>;

export type CreateModuleMutation = {
  __typename?: 'Mutation';
  createModule: {
    __typename?: 'ModuleEntity';
    createdAt?: string | null;
    createdUserId?: string | null;
    updatedAt?: string | null;
    updatedUserId?: string | null;
    deletedAt?: string | null;
    deletedUserId?: string | null;
    moduleId: string;
    productId?: string | null;
    name: string;
    description?: string | null;
    icon?: string | null;
    url?: string | null;
  };
};

export type UpdateModuleMutationVariables = Exact<{
  moduleId: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateModuleMutation = {
  __typename?: 'Mutation';
  updateModule: { __typename?: 'UpdateSuccessResponse'; success: boolean };
};

export type DeleteModuleMutationVariables = Exact<{
  moduleId: Scalars['String']['input'];
}>;

export type DeleteModuleMutation = {
  __typename?: 'Mutation';
  deleteModule: { __typename?: 'DeleteSuccessResponse'; success: boolean };
};

export type GetPermissionsByUserQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetPermissionsByUserQuery = {
  __typename?: 'Query';
  getPermissionsByUser: {
    __typename?: 'GetPermissionsByUserResponse';
    permissions: Array<{
      __typename?: 'PermissionInfo';
      name: string;
      url: string;
      method: string;
      requestType: string;
    }>;
  };
};

export type ProductQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;

export type ProductQuery = {
  __typename?: 'Query';
  product: {
    __typename?: 'ProductEntity';
    createdAt?: string | null;
    createdUserId?: string | null;
    updatedAt?: string | null;
    updatedUserId?: string | null;
    deletedAt?: string | null;
    deletedUserId?: string | null;
    productId: string;
    name: string;
    url: string;
    icon?: string | null;
    description?: string | null;
  };
};

export type ProductsQueryVariables = Exact<{
  pagination: PaginationArgs;
  sorts: Array<SortArgs> | SortArgs;
  filters: Array<FilterArgs> | FilterArgs;
}>;

export type ProductsQuery = {
  __typename?: 'Query';
  products: {
    __typename?: 'GetProductsResponse';
    pagination: {
      __typename?: 'PaginationResponse';
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
      itemCount: number;
    };
    data: Array<{
      __typename?: 'ProductEntity';
      createdAt?: string | null;
      createdUserId?: string | null;
      updatedAt?: string | null;
      updatedUserId?: string | null;
      deletedAt?: string | null;
      deletedUserId?: string | null;
      productId: string;
      name: string;
      url: string;
      icon?: string | null;
      description?: string | null;
      createdUser?: {
        __typename?: 'CreatedUserEntity';
        username?: string | null;
        email?: string | null;
      } | null;
      updatedUser?: {
        __typename?: 'UpdatedUserEntity';
        username?: string | null;
        email?: string | null;
      } | null;
      deletedUser?: {
        __typename?: 'DeletedUserEntity';
        username?: string | null;
        email?: string | null;
      } | null;
    }>;
  };
};

export type CreateProductMutationVariables = Exact<{
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
}>;

export type CreateProductMutation = {
  __typename?: 'Mutation';
  createProduct: {
    __typename?: 'ProductEntity';
    createdAt?: string | null;
    createdUserId?: string | null;
    updatedAt?: string | null;
    updatedUserId?: string | null;
    deletedAt?: string | null;
    deletedUserId?: string | null;
    productId: string;
    name: string;
    url: string;
    icon?: string | null;
    description?: string | null;
  };
};

export type UpdateProductMutationVariables = Exact<{
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateProductMutation = {
  __typename?: 'Mutation';
  updateProduct: { __typename?: 'UpdateSuccessResponse'; success: boolean };
};

export type DeleteProductMutationVariables = Exact<{
  productId: Scalars['String']['input'];
}>;

export type DeleteProductMutation = {
  __typename?: 'Mutation';
  deleteProduct: { __typename?: 'DeleteSuccessResponse'; success: boolean };
};

export type ResourcesQueryVariables = Exact<{
  pagination: PaginationArgs;
  sorts: Array<SortArgs> | SortArgs;
  filters: Array<FilterArgs> | FilterArgs;
}>;

export type ResourcesQuery = {
  __typename?: 'Query';
  resources: {
    __typename?: 'GetResourcesResponse';
    pagination: {
      __typename?: 'PaginationResponse';
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
      itemCount: number;
    };
    data: Array<{
      __typename?: 'ResourceEntity';
      createdAt?: string | null;
      createdUserId?: string | null;
      updatedAt?: string | null;
      updatedUserId?: string | null;
      deletedAt?: string | null;
      deletedUserId?: string | null;
      resourceId: string;
      name: string;
      moduleId: string;
      createdUser?: {
        __typename?: 'CreatedUserEntity';
        username?: string | null;
        email?: string | null;
      } | null;
      updatedUser?: {
        __typename?: 'UpdatedUserEntity';
        username?: string | null;
        email?: string | null;
      } | null;
      deletedUser?: {
        __typename?: 'DeletedUserEntity';
        username?: string | null;
        email?: string | null;
      } | null;
      module: { __typename?: 'ModuleEntity'; name: string };
    }>;
  };
};

export type ResourceQueryVariables = Exact<{
  resourceId: Scalars['String']['input'];
}>;

export type ResourceQuery = {
  __typename?: 'Query';
  resource: {
    __typename?: 'ResourceEntity';
    resourceId: string;
    name: string;
    moduleId: string;
    module: { __typename?: 'ModuleEntity'; moduleId: string; name: string };
    actions?: Array<{
      __typename?: 'ActionEntity';
      actionId: string;
      name: string;
      description?: string | null;
      method: string;
      url: string;
      requestType: RequestType;
    }> | null;
  };
};

export type CreateResourceMutationVariables = Exact<{
  name: Scalars['String']['input'];
  moduleId: Scalars['String']['input'];
  actions: Array<ActionInput> | ActionInput;
}>;

export type CreateResourceMutation = {
  __typename?: 'Mutation';
  createResource: {
    __typename?: 'ResourceEntity';
    moduleId: string;
    resourceId: string;
    name: string;
  };
};

export type UpdateResourceMutationVariables = Exact<{
  name: Scalars['String']['input'];
  moduleId: Scalars['String']['input'];
  actions: Array<ActionInput> | ActionInput;
  resourceId: Scalars['String']['input'];
}>;

export type UpdateResourceMutation = {
  __typename?: 'Mutation';
  updateResource: { __typename?: 'UpdateSuccessResponse'; success: boolean };
};

export type DeleteResourceMutationVariables = Exact<{
  resourceId: Scalars['String']['input'];
}>;

export type DeleteResourceMutation = {
  __typename?: 'Mutation';
  deleteResource: { __typename?: 'DeleteSuccessResponse'; success: boolean };
};

export type SearchResourcesQueryVariables = Exact<{
  pagination: PaginationArgs;
  sorts: Array<SortArgs> | SortArgs;
  filters: Array<FilterArgs> | FilterArgs;
}>;

export type SearchResourcesQuery = {
  __typename?: 'Query';
  resources: {
    __typename?: 'GetResourcesResponse';
    pagination: {
      __typename?: 'PaginationResponse';
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
      itemCount: number;
    };
    data: Array<{
      __typename?: 'ResourceEntity';
      resourceId: string;
      name: string;
      actions?: Array<{
        __typename?: 'ActionEntity';
        actionId: string;
        name: string;
      }> | null;
    }>;
  };
};

export type RolesQueryVariables = Exact<{
  pagination: PaginationArgs;
  sorts: Array<SortArgs> | SortArgs;
  filters: Array<FilterArgs> | FilterArgs;
}>;

export type RolesQuery = {
  __typename?: 'Query';
  roles: {
    __typename?: 'GetRolesResponse';
    data: Array<{
      __typename?: 'RoleEntity';
      createdAt?: string | null;
      createdUserId?: string | null;
      updatedAt?: string | null;
      updatedUserId?: string | null;
      deletedAt?: string | null;
      deletedUserId?: string | null;
      roleId: string;
      name: string;
      description?: string | null;
      moduleId: string;
      createdUser?: {
        __typename?: 'CreatedUserEntity';
        username?: string | null;
      } | null;
      updatedUser?: {
        __typename?: 'UpdatedUserEntity';
        username?: string | null;
      } | null;
      deletedUser?: {
        __typename?: 'DeletedUserEntity';
        username?: string | null;
      } | null;
      module?: { __typename?: 'ModuleEntity'; name: string } | null;
    }>;
    pagination: {
      __typename?: 'PaginationResponse';
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
      itemCount: number;
    };
  };
};

export type RoleQueryVariables = Exact<{
  roleId: Scalars['String']['input'];
}>;

export type RoleQuery = {
  __typename?: 'Query';
  role: {
    __typename?: 'RoleEntity';
    roleId: string;
    name: string;
    description?: string | null;
    moduleId: string;
    module?: { __typename?: 'ModuleEntity'; name: string } | null;
    permissions?: Array<{
      __typename?: 'PermissionEntity';
      permissionId: string;
      actionId: string;
      resourceId: string;
      action?: { __typename?: 'ActionEntity'; name: string } | null;
      resource?: { __typename?: 'ResourceEntity'; name: string } | null;
    }> | null;
  };
};

export type CreateRoleMutationVariables = Exact<{
  name: Scalars['String']['input'];
  moduleId: Scalars['String']['input'];
  permissions: Array<PermissionInput> | PermissionInput;
  description?: InputMaybe<Scalars['String']['input']>;
}>;

export type CreateRoleMutation = {
  __typename?: 'Mutation';
  createRole: {
    __typename?: 'RoleEntity';
    roleId: string;
    name: string;
    description?: string | null;
    moduleId: string;
    permissions?: Array<{
      __typename?: 'PermissionEntity';
      permissionId: string;
      resourceId: string;
      actionId: string;
    }> | null;
  };
};

export type UpdateRoleMutationVariables = Exact<{
  name: Scalars['String']['input'];
  moduleId: Scalars['String']['input'];
  permissions: Array<PermissionInput> | PermissionInput;
  roleId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateRoleMutation = {
  __typename?: 'Mutation';
  updateRole: { __typename?: 'UpdateSuccessResponse'; success: boolean };
};

export type DeleteRoleMutationVariables = Exact<{
  roleId: Scalars['String']['input'];
}>;

export type DeleteRoleMutation = {
  __typename?: 'Mutation';
  deleteRole: { __typename?: 'DeleteSuccessResponse'; success: boolean };
};

export type UsersQueryVariables = Exact<{
  pagination: PaginationArgs;
  sorts: Array<SortArgs> | SortArgs;
  filters: Array<FilterArgs> | FilterArgs;
}>;

export type UsersQuery = {
  __typename?: 'Query';
  users: {
    __typename?: 'GetUsersResponse';
    data: Array<{
      __typename?: 'UserEntity';
      createdAt?: string | null;
      createdUserId?: string | null;
      updatedAt?: string | null;
      updatedUserId?: string | null;
      deletedAt?: string | null;
      deletedUserId?: string | null;
      userId: string;
      username: string;
      email: string;
      password?: string | null;
      phone?: string | null;
      avatar?: string | null;
      status: UserStatus;
      createdUser?: {
        __typename?: 'CreatedUserEntity';
        username?: string | null;
      } | null;
      updatedUser?: {
        __typename?: 'UpdatedUserEntity';
        username?: string | null;
      } | null;
      deletedUser?: {
        __typename?: 'DeletedUserEntity';
        username?: string | null;
      } | null;
    }>;
    pagination: {
      __typename?: 'PaginationResponse';
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
      itemCount: number;
    };
  };
};

export type UserQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;

export type UserQuery = {
  __typename?: 'Query';
  user: {
    __typename?: 'UserEntity';
    userId: string;
    username: string;
    email: string;
    password?: string | null;
    phone?: string | null;
    avatar?: string | null;
    status: UserStatus;
    userRoles?: Array<{
      __typename?: 'UserRoleEntity';
      roleId: string;
      userId: string;
      userRoleId: string;
      role?: { __typename?: 'RoleEntity'; name: string } | null;
    }> | null;
  };
};

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  status: Scalars['String']['input'];
  roleIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'UserEntity';
    userId: string;
    username: string;
    email: string;
    password?: string | null;
    phone?: string | null;
    avatar?: string | null;
    status: UserStatus;
    userRoles?: Array<{
      __typename?: 'UserRoleEntity';
      roleId: string;
      userId: string;
      userRoleId: string;
    }> | null;
  };
};

export type UpdateUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  username: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
  roleIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser: { __typename?: 'UpdateSuccessResponse'; success: boolean };
};

export type ChangePasswordMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type ChangePasswordMutation = {
  __typename?: 'Mutation';
  changePassword: { __typename?: 'UpdateSuccessResponse'; success: boolean };
};

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
}>;

export type DeleteUserMutation = {
  __typename?: 'Mutation';
  deleteUser: { __typename?: 'DeleteSuccessResponse'; success: boolean };
};

export const LoginDocument = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      success
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
export function useLoginQuery(
  baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables> &
    ({ variables: LoginQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument,
    options,
  );
}
export function useLoginLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument,
    options,
  );
}
// @ts-ignore
export function useLoginSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    LoginQuery,
    LoginQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<LoginQuery, LoginQueryVariables>;
export function useLoginSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>,
): Apollo.UseSuspenseQueryResult<LoginQuery | undefined, LoginQueryVariables>;
export function useLoginSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument,
    options,
  );
}
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<
  typeof useLoginSuspenseQuery
>;
export type LoginQueryResult = Apollo.QueryResult<
  LoginQuery,
  LoginQueryVariables
>;
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
export function useGetMeQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    options,
  );
}
export function useGetMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    options,
  );
}
// @ts-ignore
export function useGetMeSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetMeQuery,
    GetMeQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<GetMeQuery, GetMeQueryVariables>;
export function useGetMeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>,
): Apollo.UseSuspenseQueryResult<GetMeQuery | undefined, GetMeQueryVariables>;
export function useGetMeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    options,
  );
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<
  typeof useGetMeSuspenseQuery
>;
export type GetMeQueryResult = Apollo.QueryResult<
  GetMeQuery,
  GetMeQueryVariables
>;
export const GetSuperMenusDocument = gql`
  query GetSuperMenus {
    getSuperMenus {
      superMenus {
        name
        description
        url
        icon
        menus {
          name
          url
          icon
          subMenus {
            name
            url
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
export function useGetSuperMenusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetSuperMenusQuery,
    GetSuperMenusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSuperMenusQuery, GetSuperMenusQueryVariables>(
    GetSuperMenusDocument,
    options,
  );
}
export function useGetSuperMenusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSuperMenusQuery,
    GetSuperMenusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSuperMenusQuery, GetSuperMenusQueryVariables>(
    GetSuperMenusDocument,
    options,
  );
}
// @ts-ignore
export function useGetSuperMenusSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetSuperMenusQuery,
    GetSuperMenusQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<
  GetSuperMenusQuery,
  GetSuperMenusQueryVariables
>;
export function useGetSuperMenusSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetSuperMenusQuery,
        GetSuperMenusQueryVariables
      >,
): Apollo.UseSuspenseQueryResult<
  GetSuperMenusQuery | undefined,
  GetSuperMenusQueryVariables
>;
export function useGetSuperMenusSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetSuperMenusQuery,
        GetSuperMenusQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetSuperMenusQuery,
    GetSuperMenusQueryVariables
  >(GetSuperMenusDocument, options);
}
export type GetSuperMenusQueryHookResult = ReturnType<
  typeof useGetSuperMenusQuery
>;
export type GetSuperMenusLazyQueryHookResult = ReturnType<
  typeof useGetSuperMenusLazyQuery
>;
export type GetSuperMenusSuspenseQueryHookResult = ReturnType<
  typeof useGetSuperMenusSuspenseQuery
>;
export type GetSuperMenusQueryResult = Apollo.QueryResult<
  GetSuperMenusQuery,
  GetSuperMenusQueryVariables
>;
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
      productId
      name
      description
      icon
      url
      product {
        productId
        name
      }
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
export function useModuleQuery(
  baseOptions: Apollo.QueryHookOptions<ModuleQuery, ModuleQueryVariables> &
    ({ variables: ModuleQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ModuleQuery, ModuleQueryVariables>(
    ModuleDocument,
    options,
  );
}
export function useModuleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ModuleQuery, ModuleQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ModuleQuery, ModuleQueryVariables>(
    ModuleDocument,
    options,
  );
}
// @ts-ignore
export function useModuleSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ModuleQuery,
    ModuleQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<ModuleQuery, ModuleQueryVariables>;
export function useModuleSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ModuleQuery, ModuleQueryVariables>,
): Apollo.UseSuspenseQueryResult<ModuleQuery | undefined, ModuleQueryVariables>;
export function useModuleSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ModuleQuery, ModuleQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ModuleQuery, ModuleQueryVariables>(
    ModuleDocument,
    options,
  );
}
export type ModuleQueryHookResult = ReturnType<typeof useModuleQuery>;
export type ModuleLazyQueryHookResult = ReturnType<typeof useModuleLazyQuery>;
export type ModuleSuspenseQueryHookResult = ReturnType<
  typeof useModuleSuspenseQuery
>;
export type ModuleQueryResult = Apollo.QueryResult<
  ModuleQuery,
  ModuleQueryVariables
>;
export const GetModulesDocument = gql`
  query GetModules(
    $pagination: PaginationArgs!
    $sorts: [SortArgs!]!
    $filters: [FilterArgs!]!
  ) {
    modules(pagination: $pagination, sorts: $sorts, filters: $filters) {
      data {
        createdAt
        createdUserId
        updatedAt
        updatedUserId
        deletedAt
        deletedUserId
        moduleId
        productId
        product {
          name
        }
        name
        description
        icon
        url
        createdUser {
          username
          email
        }
        updatedUser {
          username
          email
        }
        deletedUser {
          username
          email
        }
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
export function useGetModulesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetModulesQuery,
    GetModulesQueryVariables
  > &
    (
      | { variables: GetModulesQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetModulesQuery, GetModulesQueryVariables>(
    GetModulesDocument,
    options,
  );
}
export function useGetModulesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetModulesQuery,
    GetModulesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetModulesQuery, GetModulesQueryVariables>(
    GetModulesDocument,
    options,
  );
}
// @ts-ignore
export function useGetModulesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetModulesQuery,
    GetModulesQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<GetModulesQuery, GetModulesQueryVariables>;
export function useGetModulesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetModulesQuery,
        GetModulesQueryVariables
      >,
): Apollo.UseSuspenseQueryResult<
  GetModulesQuery | undefined,
  GetModulesQueryVariables
>;
export function useGetModulesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetModulesQuery,
        GetModulesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetModulesQuery, GetModulesQueryVariables>(
    GetModulesDocument,
    options,
  );
}
export type GetModulesQueryHookResult = ReturnType<typeof useGetModulesQuery>;
export type GetModulesLazyQueryHookResult = ReturnType<
  typeof useGetModulesLazyQuery
>;
export type GetModulesSuspenseQueryHookResult = ReturnType<
  typeof useGetModulesSuspenseQuery
>;
export type GetModulesQueryResult = Apollo.QueryResult<
  GetModulesQuery,
  GetModulesQueryVariables
>;
export const CreateModuleDocument = gql`
  mutation CreateModule(
    $name: String!
    $description: String
    $productId: String!
    $icon: String
    $url: String
  ) {
    createModule(
      name: $name
      description: $description
      productId: $productId
      icon: $icon
      url: $url
    ) {
      createdAt
      createdUserId
      updatedAt
      updatedUserId
      deletedAt
      deletedUserId
      moduleId
      productId
      name
      description
      icon
      url
    }
  }
`;
export type CreateModuleMutationFn = Apollo.MutationFunction<
  CreateModuleMutation,
  CreateModuleMutationVariables
>;

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
 *      productId: // value for 'productId'
 *      icon: // value for 'icon'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useCreateModuleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateModuleMutation,
    CreateModuleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateModuleMutation,
    CreateModuleMutationVariables
  >(CreateModuleDocument, options);
}
export type CreateModuleMutationHookResult = ReturnType<
  typeof useCreateModuleMutation
>;
export type CreateModuleMutationResult =
  Apollo.MutationResult<CreateModuleMutation>;
export type CreateModuleMutationOptions = Apollo.BaseMutationOptions<
  CreateModuleMutation,
  CreateModuleMutationVariables
>;
export const UpdateModuleDocument = gql`
  mutation UpdateModule(
    $moduleId: String!
    $productId: String!
    $name: String!
    $description: String
    $icon: String
    $url: String
  ) {
    updateModule(
      moduleId: $moduleId
      productId: $productId
      name: $name
      description: $description
      icon: $icon
      url: $url
    ) {
      success
    }
  }
`;
export type UpdateModuleMutationFn = Apollo.MutationFunction<
  UpdateModuleMutation,
  UpdateModuleMutationVariables
>;

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
 *      productId: // value for 'productId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      icon: // value for 'icon'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useUpdateModuleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateModuleMutation,
    UpdateModuleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateModuleMutation,
    UpdateModuleMutationVariables
  >(UpdateModuleDocument, options);
}
export type UpdateModuleMutationHookResult = ReturnType<
  typeof useUpdateModuleMutation
>;
export type UpdateModuleMutationResult =
  Apollo.MutationResult<UpdateModuleMutation>;
export type UpdateModuleMutationOptions = Apollo.BaseMutationOptions<
  UpdateModuleMutation,
  UpdateModuleMutationVariables
>;
export const DeleteModuleDocument = gql`
  mutation DeleteModule($moduleId: String!) {
    deleteModule(moduleId: $moduleId) {
      success
    }
  }
`;
export type DeleteModuleMutationFn = Apollo.MutationFunction<
  DeleteModuleMutation,
  DeleteModuleMutationVariables
>;

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
export function useDeleteModuleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteModuleMutation,
    DeleteModuleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteModuleMutation,
    DeleteModuleMutationVariables
  >(DeleteModuleDocument, options);
}
export type DeleteModuleMutationHookResult = ReturnType<
  typeof useDeleteModuleMutation
>;
export type DeleteModuleMutationResult =
  Apollo.MutationResult<DeleteModuleMutation>;
export type DeleteModuleMutationOptions = Apollo.BaseMutationOptions<
  DeleteModuleMutation,
  DeleteModuleMutationVariables
>;
export const GetPermissionsByUserDocument = gql`
  query GetPermissionsByUser {
    getPermissionsByUser {
      permissions {
        name
        url
        method
        requestType
      }
    }
  }
`;

/**
 * __useGetPermissionsByUserQuery__
 *
 * To run a query within a React component, call `useGetPermissionsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPermissionsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPermissionsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPermissionsByUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetPermissionsByUserQuery,
    GetPermissionsByUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetPermissionsByUserQuery,
    GetPermissionsByUserQueryVariables
  >(GetPermissionsByUserDocument, options);
}
export function useGetPermissionsByUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPermissionsByUserQuery,
    GetPermissionsByUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetPermissionsByUserQuery,
    GetPermissionsByUserQueryVariables
  >(GetPermissionsByUserDocument, options);
}
// @ts-ignore
export function useGetPermissionsByUserSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetPermissionsByUserQuery,
    GetPermissionsByUserQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<
  GetPermissionsByUserQuery,
  GetPermissionsByUserQueryVariables
>;
export function useGetPermissionsByUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetPermissionsByUserQuery,
        GetPermissionsByUserQueryVariables
      >,
): Apollo.UseSuspenseQueryResult<
  GetPermissionsByUserQuery | undefined,
  GetPermissionsByUserQueryVariables
>;
export function useGetPermissionsByUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetPermissionsByUserQuery,
        GetPermissionsByUserQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetPermissionsByUserQuery,
    GetPermissionsByUserQueryVariables
  >(GetPermissionsByUserDocument, options);
}
export type GetPermissionsByUserQueryHookResult = ReturnType<
  typeof useGetPermissionsByUserQuery
>;
export type GetPermissionsByUserLazyQueryHookResult = ReturnType<
  typeof useGetPermissionsByUserLazyQuery
>;
export type GetPermissionsByUserSuspenseQueryHookResult = ReturnType<
  typeof useGetPermissionsByUserSuspenseQuery
>;
export type GetPermissionsByUserQueryResult = Apollo.QueryResult<
  GetPermissionsByUserQuery,
  GetPermissionsByUserQueryVariables
>;
export const ProductDocument = gql`
  query Product($productId: String!) {
    product(productId: $productId) {
      createdAt
      createdUserId
      updatedAt
      updatedUserId
      deletedAt
      deletedUserId
      productId
      name
      url
      icon
      description
    }
  }
`;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useProductQuery(
  baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables> &
    ({ variables: ProductQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProductQuery, ProductQueryVariables>(
    ProductDocument,
    options,
  );
}
export function useProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductQuery,
    ProductQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(
    ProductDocument,
    options,
  );
}
// @ts-ignore
export function useProductSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ProductQuery,
    ProductQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<ProductQuery, ProductQueryVariables>;
export function useProductSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ProductQuery, ProductQueryVariables>,
): Apollo.UseSuspenseQueryResult<
  ProductQuery | undefined,
  ProductQueryVariables
>;
export function useProductSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ProductQuery, ProductQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ProductQuery, ProductQueryVariables>(
    ProductDocument,
    options,
  );
}
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductSuspenseQueryHookResult = ReturnType<
  typeof useProductSuspenseQuery
>;
export type ProductQueryResult = Apollo.QueryResult<
  ProductQuery,
  ProductQueryVariables
>;
export const ProductsDocument = gql`
  query Products(
    $pagination: PaginationArgs!
    $sorts: [SortArgs!]!
    $filters: [FilterArgs!]!
  ) {
    products(pagination: $pagination, sorts: $sorts, filters: $filters) {
      pagination {
        page
        limit
        totalItems
        totalPages
        itemCount
      }
      data {
        createdAt
        createdUserId
        updatedAt
        updatedUserId
        deletedAt
        deletedUserId
        productId
        name
        url
        icon
        description
        createdUser {
          username
          email
        }
        updatedUser {
          username
          email
        }
        deletedUser {
          username
          email
        }
      }
    }
  }
`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      sorts: // value for 'sorts'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useProductsQuery(
  baseOptions: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables> &
    ({ variables: ProductsQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(
    ProductsDocument,
    options,
  );
}
export function useProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductsQuery,
    ProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(
    ProductsDocument,
    options,
  );
}
// @ts-ignore
export function useProductsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ProductsQuery,
    ProductsQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<ProductsQuery, ProductsQueryVariables>;
export function useProductsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ProductsQuery, ProductsQueryVariables>,
): Apollo.UseSuspenseQueryResult<
  ProductsQuery | undefined,
  ProductsQueryVariables
>;
export function useProductsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ProductsQuery, ProductsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ProductsQuery, ProductsQueryVariables>(
    ProductsDocument,
    options,
  );
}
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<
  typeof useProductsLazyQuery
>;
export type ProductsSuspenseQueryHookResult = ReturnType<
  typeof useProductsSuspenseQuery
>;
export type ProductsQueryResult = Apollo.QueryResult<
  ProductsQuery,
  ProductsQueryVariables
>;
export const CreateProductDocument = gql`
  mutation CreateProduct(
    $name: String!
    $url: String!
    $description: String
    $icon: String
  ) {
    createProduct(
      name: $name
      url: $url
      description: $description
      icon: $icon
    ) {
      createdAt
      createdUserId
      updatedAt
      updatedUserId
      deletedAt
      deletedUserId
      productId
      name
      url
      icon
      description
    }
  }
`;
export type CreateProductMutationFn = Apollo.MutationFunction<
  CreateProductMutation,
  CreateProductMutationVariables
>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      name: // value for 'name'
 *      url: // value for 'url'
 *      description: // value for 'description'
 *      icon: // value for 'icon'
 *   },
 * });
 */
export function useCreateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProductMutation,
    CreateProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(CreateProductDocument, options);
}
export type CreateProductMutationHookResult = ReturnType<
  typeof useCreateProductMutation
>;
export type CreateProductMutationResult =
  Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export const UpdateProductDocument = gql`
  mutation UpdateProduct(
    $name: String!
    $url: String!
    $productId: String!
    $description: String
    $icon: String
  ) {
    updateProduct(
      name: $name
      url: $url
      productId: $productId
      description: $description
      icon: $icon
    ) {
      success
    }
  }
`;
export type UpdateProductMutationFn = Apollo.MutationFunction<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      name: // value for 'name'
 *      url: // value for 'url'
 *      productId: // value for 'productId'
 *      description: // value for 'description'
 *      icon: // value for 'icon'
 *   },
 * });
 */
export function useUpdateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(UpdateProductDocument, options);
}
export type UpdateProductMutationHookResult = ReturnType<
  typeof useUpdateProductMutation
>;
export type UpdateProductMutationResult =
  Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;
export const DeleteProductDocument = gql`
  mutation DeleteProduct($productId: String!) {
    deleteProduct(productId: $productId) {
      success
    }
  }
`;
export type DeleteProductMutationFn = Apollo.MutationFunction<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useDeleteProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >(DeleteProductDocument, options);
}
export type DeleteProductMutationHookResult = ReturnType<
  typeof useDeleteProductMutation
>;
export type DeleteProductMutationResult =
  Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;
export const ResourcesDocument = gql`
  query Resources(
    $pagination: PaginationArgs!
    $sorts: [SortArgs!]!
    $filters: [FilterArgs!]!
  ) {
    resources(pagination: $pagination, sorts: $sorts, filters: $filters) {
      pagination {
        page
        limit
        totalItems
        totalPages
        itemCount
      }
      data {
        createdAt
        createdUserId
        createdUser {
          username
          email
        }
        updatedAt
        updatedUserId
        updatedUser {
          username
          email
        }
        deletedAt
        deletedUserId
        deletedUser {
          username
          email
        }
        resourceId
        name
        moduleId
        module {
          name
        }
      }
    }
  }
`;

/**
 * __useResourcesQuery__
 *
 * To run a query within a React component, call `useResourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useResourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResourcesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      sorts: // value for 'sorts'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useResourcesQuery(
  baseOptions: Apollo.QueryHookOptions<
    ResourcesQuery,
    ResourcesQueryVariables
  > &
    (
      | { variables: ResourcesQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ResourcesQuery, ResourcesQueryVariables>(
    ResourcesDocument,
    options,
  );
}
export function useResourcesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ResourcesQuery,
    ResourcesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ResourcesQuery, ResourcesQueryVariables>(
    ResourcesDocument,
    options,
  );
}
// @ts-ignore
export function useResourcesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ResourcesQuery,
    ResourcesQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<ResourcesQuery, ResourcesQueryVariables>;
export function useResourcesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ResourcesQuery, ResourcesQueryVariables>,
): Apollo.UseSuspenseQueryResult<
  ResourcesQuery | undefined,
  ResourcesQueryVariables
>;
export function useResourcesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ResourcesQuery, ResourcesQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ResourcesQuery, ResourcesQueryVariables>(
    ResourcesDocument,
    options,
  );
}
export type ResourcesQueryHookResult = ReturnType<typeof useResourcesQuery>;
export type ResourcesLazyQueryHookResult = ReturnType<
  typeof useResourcesLazyQuery
>;
export type ResourcesSuspenseQueryHookResult = ReturnType<
  typeof useResourcesSuspenseQuery
>;
export type ResourcesQueryResult = Apollo.QueryResult<
  ResourcesQuery,
  ResourcesQueryVariables
>;
export const ResourceDocument = gql`
  query Resource($resourceId: String!) {
    resource(resourceId: $resourceId) {
      resourceId
      name
      moduleId
      module {
        moduleId
        name
      }
      actions {
        actionId
        name
        description
        method
        url
        requestType
      }
    }
  }
`;

/**
 * __useResourceQuery__
 *
 * To run a query within a React component, call `useResourceQuery` and pass it any options that fit your needs.
 * When your component renders, `useResourceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResourceQuery({
 *   variables: {
 *      resourceId: // value for 'resourceId'
 *   },
 * });
 */
export function useResourceQuery(
  baseOptions: Apollo.QueryHookOptions<ResourceQuery, ResourceQueryVariables> &
    ({ variables: ResourceQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ResourceQuery, ResourceQueryVariables>(
    ResourceDocument,
    options,
  );
}
export function useResourceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ResourceQuery,
    ResourceQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ResourceQuery, ResourceQueryVariables>(
    ResourceDocument,
    options,
  );
}
// @ts-ignore
export function useResourceSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ResourceQuery,
    ResourceQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<ResourceQuery, ResourceQueryVariables>;
export function useResourceSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ResourceQuery, ResourceQueryVariables>,
): Apollo.UseSuspenseQueryResult<
  ResourceQuery | undefined,
  ResourceQueryVariables
>;
export function useResourceSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ResourceQuery, ResourceQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ResourceQuery, ResourceQueryVariables>(
    ResourceDocument,
    options,
  );
}
export type ResourceQueryHookResult = ReturnType<typeof useResourceQuery>;
export type ResourceLazyQueryHookResult = ReturnType<
  typeof useResourceLazyQuery
>;
export type ResourceSuspenseQueryHookResult = ReturnType<
  typeof useResourceSuspenseQuery
>;
export type ResourceQueryResult = Apollo.QueryResult<
  ResourceQuery,
  ResourceQueryVariables
>;
export const CreateResourceDocument = gql`
  mutation CreateResource(
    $name: String!
    $moduleId: String!
    $actions: [ActionInput!]!
  ) {
    createResource(name: $name, moduleId: $moduleId, actions: $actions) {
      moduleId
      resourceId
      name
    }
  }
`;
export type CreateResourceMutationFn = Apollo.MutationFunction<
  CreateResourceMutation,
  CreateResourceMutationVariables
>;

/**
 * __useCreateResourceMutation__
 *
 * To run a mutation, you first call `useCreateResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createResourceMutation, { data, loading, error }] = useCreateResourceMutation({
 *   variables: {
 *      name: // value for 'name'
 *      moduleId: // value for 'moduleId'
 *      actions: // value for 'actions'
 *   },
 * });
 */
export function useCreateResourceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateResourceMutation,
    CreateResourceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateResourceMutation,
    CreateResourceMutationVariables
  >(CreateResourceDocument, options);
}
export type CreateResourceMutationHookResult = ReturnType<
  typeof useCreateResourceMutation
>;
export type CreateResourceMutationResult =
  Apollo.MutationResult<CreateResourceMutation>;
export type CreateResourceMutationOptions = Apollo.BaseMutationOptions<
  CreateResourceMutation,
  CreateResourceMutationVariables
>;
export const UpdateResourceDocument = gql`
  mutation UpdateResource(
    $name: String!
    $moduleId: String!
    $actions: [ActionInput!]!
    $resourceId: String!
  ) {
    updateResource(
      name: $name
      moduleId: $moduleId
      actions: $actions
      resourceId: $resourceId
    ) {
      success
    }
  }
`;
export type UpdateResourceMutationFn = Apollo.MutationFunction<
  UpdateResourceMutation,
  UpdateResourceMutationVariables
>;

/**
 * __useUpdateResourceMutation__
 *
 * To run a mutation, you first call `useUpdateResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateResourceMutation, { data, loading, error }] = useUpdateResourceMutation({
 *   variables: {
 *      name: // value for 'name'
 *      moduleId: // value for 'moduleId'
 *      actions: // value for 'actions'
 *      resourceId: // value for 'resourceId'
 *   },
 * });
 */
export function useUpdateResourceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateResourceMutation,
    UpdateResourceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateResourceMutation,
    UpdateResourceMutationVariables
  >(UpdateResourceDocument, options);
}
export type UpdateResourceMutationHookResult = ReturnType<
  typeof useUpdateResourceMutation
>;
export type UpdateResourceMutationResult =
  Apollo.MutationResult<UpdateResourceMutation>;
export type UpdateResourceMutationOptions = Apollo.BaseMutationOptions<
  UpdateResourceMutation,
  UpdateResourceMutationVariables
>;
export const DeleteResourceDocument = gql`
  mutation DeleteResource($resourceId: String!) {
    deleteResource(resourceId: $resourceId) {
      success
    }
  }
`;
export type DeleteResourceMutationFn = Apollo.MutationFunction<
  DeleteResourceMutation,
  DeleteResourceMutationVariables
>;

/**
 * __useDeleteResourceMutation__
 *
 * To run a mutation, you first call `useDeleteResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteResourceMutation, { data, loading, error }] = useDeleteResourceMutation({
 *   variables: {
 *      resourceId: // value for 'resourceId'
 *   },
 * });
 */
export function useDeleteResourceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteResourceMutation,
    DeleteResourceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteResourceMutation,
    DeleteResourceMutationVariables
  >(DeleteResourceDocument, options);
}
export type DeleteResourceMutationHookResult = ReturnType<
  typeof useDeleteResourceMutation
>;
export type DeleteResourceMutationResult =
  Apollo.MutationResult<DeleteResourceMutation>;
export type DeleteResourceMutationOptions = Apollo.BaseMutationOptions<
  DeleteResourceMutation,
  DeleteResourceMutationVariables
>;
export const SearchResourcesDocument = gql`
  query SearchResources(
    $pagination: PaginationArgs!
    $sorts: [SortArgs!]!
    $filters: [FilterArgs!]!
  ) {
    resources(pagination: $pagination, sorts: $sorts, filters: $filters) {
      pagination {
        page
        limit
        totalItems
        totalPages
        itemCount
      }
      data {
        resourceId
        name
        actions {
          actionId
          name
        }
      }
    }
  }
`;

/**
 * __useSearchResourcesQuery__
 *
 * To run a query within a React component, call `useSearchResourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchResourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchResourcesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      sorts: // value for 'sorts'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useSearchResourcesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchResourcesQuery,
    SearchResourcesQueryVariables
  > &
    (
      | { variables: SearchResourcesQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchResourcesQuery, SearchResourcesQueryVariables>(
    SearchResourcesDocument,
    options,
  );
}
export function useSearchResourcesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchResourcesQuery,
    SearchResourcesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SearchResourcesQuery,
    SearchResourcesQueryVariables
  >(SearchResourcesDocument, options);
}
// @ts-ignore
export function useSearchResourcesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    SearchResourcesQuery,
    SearchResourcesQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<
  SearchResourcesQuery,
  SearchResourcesQueryVariables
>;
export function useSearchResourcesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        SearchResourcesQuery,
        SearchResourcesQueryVariables
      >,
): Apollo.UseSuspenseQueryResult<
  SearchResourcesQuery | undefined,
  SearchResourcesQueryVariables
>;
export function useSearchResourcesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        SearchResourcesQuery,
        SearchResourcesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    SearchResourcesQuery,
    SearchResourcesQueryVariables
  >(SearchResourcesDocument, options);
}
export type SearchResourcesQueryHookResult = ReturnType<
  typeof useSearchResourcesQuery
>;
export type SearchResourcesLazyQueryHookResult = ReturnType<
  typeof useSearchResourcesLazyQuery
>;
export type SearchResourcesSuspenseQueryHookResult = ReturnType<
  typeof useSearchResourcesSuspenseQuery
>;
export type SearchResourcesQueryResult = Apollo.QueryResult<
  SearchResourcesQuery,
  SearchResourcesQueryVariables
>;
export const RolesDocument = gql`
  query Roles(
    $pagination: PaginationArgs!
    $sorts: [SortArgs!]!
    $filters: [FilterArgs!]!
  ) {
    roles(pagination: $pagination, sorts: $sorts, filters: $filters) {
      data {
        createdAt
        createdUserId
        createdUser {
          username
        }
        updatedAt
        updatedUserId
        updatedUser {
          username
        }
        deletedAt
        deletedUserId
        deletedUser {
          username
        }
        roleId
        name
        description
        moduleId
        module {
          name
        }
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
 * __useRolesQuery__
 *
 * To run a query within a React component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      sorts: // value for 'sorts'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useRolesQuery(
  baseOptions: Apollo.QueryHookOptions<RolesQuery, RolesQueryVariables> &
    ({ variables: RolesQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RolesQuery, RolesQueryVariables>(
    RolesDocument,
    options,
  );
}
export function useRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RolesQuery, RolesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RolesQuery, RolesQueryVariables>(
    RolesDocument,
    options,
  );
}
// @ts-ignore
export function useRolesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    RolesQuery,
    RolesQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<RolesQuery, RolesQueryVariables>;
export function useRolesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<RolesQuery, RolesQueryVariables>,
): Apollo.UseSuspenseQueryResult<RolesQuery | undefined, RolesQueryVariables>;
export function useRolesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<RolesQuery, RolesQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<RolesQuery, RolesQueryVariables>(
    RolesDocument,
    options,
  );
}
export type RolesQueryHookResult = ReturnType<typeof useRolesQuery>;
export type RolesLazyQueryHookResult = ReturnType<typeof useRolesLazyQuery>;
export type RolesSuspenseQueryHookResult = ReturnType<
  typeof useRolesSuspenseQuery
>;
export type RolesQueryResult = Apollo.QueryResult<
  RolesQuery,
  RolesQueryVariables
>;
export const RoleDocument = gql`
  query Role($roleId: String!) {
    role(roleId: $roleId) {
      roleId
      name
      description
      moduleId
      module {
        name
      }
      permissions {
        permissionId
        actionId
        action {
          name
        }
        resourceId
        resource {
          name
        }
      }
    }
  }
`;

/**
 * __useRoleQuery__
 *
 * To run a query within a React component, call `useRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoleQuery({
 *   variables: {
 *      roleId: // value for 'roleId'
 *   },
 * });
 */
export function useRoleQuery(
  baseOptions: Apollo.QueryHookOptions<RoleQuery, RoleQueryVariables> &
    ({ variables: RoleQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RoleQuery, RoleQueryVariables>(RoleDocument, options);
}
export function useRoleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RoleQuery, RoleQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RoleQuery, RoleQueryVariables>(
    RoleDocument,
    options,
  );
}
// @ts-ignore
export function useRoleSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<RoleQuery, RoleQueryVariables>,
): Apollo.UseSuspenseQueryResult<RoleQuery, RoleQueryVariables>;
export function useRoleSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<RoleQuery, RoleQueryVariables>,
): Apollo.UseSuspenseQueryResult<RoleQuery | undefined, RoleQueryVariables>;
export function useRoleSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<RoleQuery, RoleQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<RoleQuery, RoleQueryVariables>(
    RoleDocument,
    options,
  );
}
export type RoleQueryHookResult = ReturnType<typeof useRoleQuery>;
export type RoleLazyQueryHookResult = ReturnType<typeof useRoleLazyQuery>;
export type RoleSuspenseQueryHookResult = ReturnType<
  typeof useRoleSuspenseQuery
>;
export type RoleQueryResult = Apollo.QueryResult<RoleQuery, RoleQueryVariables>;
export const CreateRoleDocument = gql`
  mutation CreateRole(
    $name: String!
    $moduleId: String!
    $permissions: [PermissionInput!]!
    $description: String
  ) {
    createRole(
      name: $name
      moduleId: $moduleId
      permissions: $permissions
      description: $description
    ) {
      roleId
      name
      description
      moduleId
      permissions {
        permissionId
        resourceId
        actionId
      }
    }
  }
`;
export type CreateRoleMutationFn = Apollo.MutationFunction<
  CreateRoleMutation,
  CreateRoleMutationVariables
>;

/**
 * __useCreateRoleMutation__
 *
 * To run a mutation, you first call `useCreateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoleMutation, { data, loading, error }] = useCreateRoleMutation({
 *   variables: {
 *      name: // value for 'name'
 *      moduleId: // value for 'moduleId'
 *      permissions: // value for 'permissions'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateRoleMutation,
    CreateRoleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateRoleMutation, CreateRoleMutationVariables>(
    CreateRoleDocument,
    options,
  );
}
export type CreateRoleMutationHookResult = ReturnType<
  typeof useCreateRoleMutation
>;
export type CreateRoleMutationResult =
  Apollo.MutationResult<CreateRoleMutation>;
export type CreateRoleMutationOptions = Apollo.BaseMutationOptions<
  CreateRoleMutation,
  CreateRoleMutationVariables
>;
export const UpdateRoleDocument = gql`
  mutation UpdateRole(
    $name: String!
    $moduleId: String!
    $permissions: [PermissionInput!]!
    $roleId: String!
    $description: String
  ) {
    updateRole(
      name: $name
      moduleId: $moduleId
      permissions: $permissions
      roleId: $roleId
      description: $description
    ) {
      success
    }
  }
`;
export type UpdateRoleMutationFn = Apollo.MutationFunction<
  UpdateRoleMutation,
  UpdateRoleMutationVariables
>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      name: // value for 'name'
 *      moduleId: // value for 'moduleId'
 *      permissions: // value for 'permissions'
 *      roleId: // value for 'roleId'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateRoleMutation,
    UpdateRoleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(
    UpdateRoleDocument,
    options,
  );
}
export type UpdateRoleMutationHookResult = ReturnType<
  typeof useUpdateRoleMutation
>;
export type UpdateRoleMutationResult =
  Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<
  UpdateRoleMutation,
  UpdateRoleMutationVariables
>;
export const DeleteRoleDocument = gql`
  mutation DeleteRole($roleId: String!) {
    deleteRole(roleId: $roleId) {
      success
    }
  }
`;
export type DeleteRoleMutationFn = Apollo.MutationFunction<
  DeleteRoleMutation,
  DeleteRoleMutationVariables
>;

/**
 * __useDeleteRoleMutation__
 *
 * To run a mutation, you first call `useDeleteRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoleMutation, { data, loading, error }] = useDeleteRoleMutation({
 *   variables: {
 *      roleId: // value for 'roleId'
 *   },
 * });
 */
export function useDeleteRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteRoleMutation,
    DeleteRoleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteRoleMutation, DeleteRoleMutationVariables>(
    DeleteRoleDocument,
    options,
  );
}
export type DeleteRoleMutationHookResult = ReturnType<
  typeof useDeleteRoleMutation
>;
export type DeleteRoleMutationResult =
  Apollo.MutationResult<DeleteRoleMutation>;
export type DeleteRoleMutationOptions = Apollo.BaseMutationOptions<
  DeleteRoleMutation,
  DeleteRoleMutationVariables
>;
export const UsersDocument = gql`
  query Users(
    $pagination: PaginationArgs!
    $sorts: [SortArgs!]!
    $filters: [FilterArgs!]!
  ) {
    users(pagination: $pagination, sorts: $sorts, filters: $filters) {
      data {
        createdAt
        createdUserId
        createdUser {
          username
        }
        updatedAt
        updatedUserId
        updatedUser {
          username
        }
        deletedAt
        deletedUserId
        deletedUser {
          username
        }
        userId
        username
        email
        password
        phone
        avatar
        status
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
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      sorts: // value for 'sorts'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables> &
    ({ variables: UsersQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options,
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options,
  );
}
// @ts-ignore
export function useUsersSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    UsersQuery,
    UsersQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<UsersQuery, UsersQueryVariables>;
export function useUsersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>,
): Apollo.UseSuspenseQueryResult<UsersQuery | undefined, UsersQueryVariables>;
export function useUsersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options,
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<
  typeof useUsersSuspenseQuery
>;
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
export const UserDocument = gql`
  query User($userId: String!) {
    user(userId: $userId) {
      userId
      username
      email
      password
      phone
      avatar
      status
      userRoles {
        roleId
        role {
          name
        }
        userId
        userRoleId
      }
    }
  }
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables> &
    ({ variables: UserQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    options,
  );
}
// @ts-ignore
export function useUserSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>,
): Apollo.UseSuspenseQueryResult<UserQuery, UserQueryVariables>;
export function useUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>,
): Apollo.UseSuspenseQueryResult<UserQuery | undefined, UserQueryVariables>;
export function useUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    options,
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<
  typeof useUserSuspenseQuery
>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const CreateUserDocument = gql`
  mutation CreateUser(
    $username: String!
    $email: String!
    $password: String!
    $status: String!
    $roleIds: [String!]!
    $phone: String
    $avatar: String
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      status: $status
      roleIds: $roleIds
      phone: $phone
      avatar: $avatar
    ) {
      userId
      username
      email
      password
      phone
      avatar
      status
      userRoles {
        roleId
        userId
        userRoleId
      }
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      status: // value for 'status'
 *      roleIds: // value for 'roleIds'
 *      phone: // value for 'phone'
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options,
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser(
    $userId: String!
    $username: String!
    $phone: String
    $avatar: String
    $status: String!
    $roleIds: [String!]!
  ) {
    updateUser(
      userId: $userId
      username: $username
      phone: $phone
      avatar: $avatar
      status: $status
      roleIds: $roleIds
    ) {
      success
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      username: // value for 'username'
 *      phone: // value for 'phone'
 *      avatar: // value for 'avatar'
 *      status: // value for 'status'
 *      roleIds: // value for 'roleIds'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options,
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($userId: String!, $password: String!) {
    changePassword(userId: $userId, password: $password) {
      success
    }
  }
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult =
  Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const DeleteUserDocument = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(userId: $userId) {
      success
    }
  }
`;
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    options,
  );
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult =
  Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;
