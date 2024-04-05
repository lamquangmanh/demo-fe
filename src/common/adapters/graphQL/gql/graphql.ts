/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AddUserDto = {
  name: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DeleteUserResponse = {
  __typename?: 'DeleteUserResponse';
  deletedCount: Scalars['Float']['output'];
};

export type GetUsersResponse = {
  __typename?: 'GetUsersResponse';
  data: Array<User>;
  total: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: User;
  deleteUser: DeleteUserResponse;
  updateUser: UpdateUserResponse;
};

export type MutationAddUserArgs = {
  addUserDto: AddUserDto;
};

export type MutationDeleteUserArgs = {
  id: Scalars['Float']['input'];
};

export type MutationUpdateUserArgs = {
  updateUserDto: UpdateUserDto;
};

export type Query = {
  __typename?: 'Query';
  getUserById: User;
  getUsers: GetUsersResponse;
  sample: Sample;
};

export type QueryGetUserByIdArgs = {
  id: Scalars['Float']['input'];
};

export type QueryGetUsersArgs = {
  usersFilterDto: UsersFilterDto;
};

export type Sample = {
  __typename?: 'Sample';
  name: Scalars['String']['output'];
};

export type UpdateUserDto = {
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UpdateUserResponse = {
  __typename?: 'UpdateUserResponse';
  modifiedCount: Scalars['Float']['output'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float']['output'];
  name?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type UsersFilterDto = {
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  pageSize?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type GetListUserQueryVariables = Exact<{
  query: UsersFilterDto;
}>;

export type GetListUserQuery = {
  __typename?: 'Query';
  getUsers: {
    __typename?: 'GetUsersResponse';
    total: number;
    data: Array<{ __typename?: 'User'; id: number; username: string; name?: string | null }>;
  };
};

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(
    private value: string,
    public __meta__?: Record<string, any>,
  ) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const GetListUserDocument = new TypedDocumentString(`
    query getListUser($query: UsersFilterDto!) {
  getUsers(usersFilterDto: $query) {
    data {
      id
      username
      name
    }
    total
  }
}
    `) as unknown as TypedDocumentString<GetListUserQuery, GetListUserQueryVariables>;
