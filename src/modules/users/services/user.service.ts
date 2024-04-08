import { graphClient } from '@/common/adapters/graphQL/client';
import { User } from '@/modules/users/models';
import { CREATE_USER, DELETE_USER, GET_USERS, GET_USER_BY_ID, UPDATE_USER } from '../graphql/gql';
import {
  UsersFilterDto,
  GetUsersResponse,
  AddUserDto,
  UpdateUserDto,
} from '@/common/adapters/graphQL/gql/graphql';

const getListUserService = async (UsersFilterDto: UsersFilterDto): Promise<GetUsersResponse> => {
  const responeData = await graphClient.query({
    query: GET_USERS,
    variables: { query: UsersFilterDto },
    fetchPolicy: 'no-cache',
  });
  return responeData.data.getUsers as GetUsersResponse;
};

const createUserService = async (data: AddUserDto): Promise<User> => {
  try {
    const response = await graphClient.mutate({
      mutation: CREATE_USER,
      variables: { body: data },
    });
    return response.data.addUser;
  } catch (error: any) {
    throw error.graphQLErrors[0];
  }
};

const updateUserService = async (data: UpdateUserDto): Promise<User> => {
  try {
    const response = await graphClient.mutate({
      mutation: UPDATE_USER,
      variables: { body: data },
    });
    return response.data;
  } catch (error: any) {
    throw error.graphQLErrors[0];
  }
};

const deleteUserService = async (id: number): Promise<number> => {
  try {
    const response = await graphClient.mutate({
      mutation: DELETE_USER,
      variables: { id: id },
    });
    return response.data;
  } catch (error: any) {
    throw error.graphQLErrors[0];
  }
};

const getUserById = async (id: number) => {
  const responeData = await graphClient.query({
    query: GET_USER_BY_ID,
    variables: { id: id },
    fetchPolicy: 'no-cache',
  });
  return responeData;
};
export { getListUserService, createUserService, updateUserService, deleteUserService, getUserById };
