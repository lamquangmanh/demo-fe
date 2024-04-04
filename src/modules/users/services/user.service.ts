import { graphClient, gql } from '@/common/adapters/graphQL/client';
import { User } from '../grapql/model';
import { CREATE_USER, GET_USERS } from '../grapql/gql';

const getListUser = async () => {
  const responeData = await graphClient.query({ query: GET_USERS });
  return responeData;
};

const createUser = async (data: User): Promise<any> => {
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

// const updateUser = async () => {
//   const responeData = await graphClient.query({ query });
//   return responeData;
// };

// const deleteUser = async () => {
//   const responeData = await graphClient.query({ query });
//   return responeData;
// };

// const getUser = async () => {
//   const responeData = await graphClient.query({ query });
//   return responeData;
// };
export { getListUser, createUser };
