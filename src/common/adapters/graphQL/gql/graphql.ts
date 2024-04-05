/* eslint-disable */
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
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UsersFilterDto = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
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
