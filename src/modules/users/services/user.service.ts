import { graphClient } from '@/common/adapters/graphQL/client';
import { User } from '@/modules/users/models';
import { CREATE_USER, DELETE_USER, GET_USERS, UPDATE_USER } from '../graphql/gql';
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

const deleteUserService = async (id: GLfloat): Promise<GLfloat> => {
  try {
    const response = await graphClient.mutate({
      mutation: DELETE_USER,
      variables: { body: id },
    });
    return response.data;
  } catch (error: any) {
    throw error.graphQLErrors[0];
  }
};

// const getUser = async () => {
//   const responeData = await graphClient.query({ query });
//   return responeData;
// };
export { getListUserService, createUserService, updateUserService, deleteUserService };
