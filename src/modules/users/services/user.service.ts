import { graphClient } from '@/common/adapters/graphQL/client';
import { User } from '@/modules/users/models';
import { CREATE_USER, GET_USERS } from '../graphql/gql';
import { UsersFilterDto, GetUsersResponse } from '@/common/adapters/graphQL/gql/graphql';

const getListUserService = async (UsersFilterDto: UsersFilterDto): Promise<GetUsersResponse> => {
  const responeData = await graphClient.query({
    query: GET_USERS,
    variables: { query: UsersFilterDto },
  });
  return responeData.data.getUsers as GetUsersResponse;
};

const createUserService = async (data: User): Promise<[User]> => {
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

// const updateUserService = async (data: User): Promise<User> => {
//   try {
//     const response = await graphClient.mutate({
//       mutation: UPDATE_USER,
//       variables: { body: data },
//     });
//     return response.data;
//   } catch (error: any) {
//     throw error.graphQLErrors[0];
//   }
// };

// const deleteUserService = async () => {
//   const responeData = await graphClient.query({ query: DELETE_USER });
//   return responeData;
// };

// const getUser = async () => {
//   const responeData = await graphClient.query({ query });
//   return responeData;
// };
export { getListUserService, createUserService };
