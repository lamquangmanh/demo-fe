import { graphClient } from '@/common/adapters/graphQL/client';
import { User } from '../graphql/model';
import { CREATE_USER, DELETE_USER, GET_USERS, UPDATE_USER } from '../graphql/gql';

const getListUserService = async () => {
  const responeData = await graphClient.query({ query: GET_USERS });
  return responeData;
};

const createUserService = async (data: User): Promise<[User]> => {
  try {
    const response = await graphClient.mutate({
      mutation: CREATE_USER,
      variables: { body: data },
    });
    return response.data;
  } catch (error: any) {
    throw error.graphQLErrors[0];
  }
};

const updateUserService = async (data: User): Promise<User> => {
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

const deleteUserService = async () => {
  const responeData = await graphClient.query({ query: DELETE_USER });
  return responeData;
};

// const getUser = async () => {
//   const responeData = await graphClient.query({ query });
//   return responeData;
// };
export { getListUserService, createUserService, updateUserService, deleteUserService };
