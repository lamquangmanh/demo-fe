import { getClient, gql } from '@/common/adapter/graphQL/client';

const query = gql`
  query user {
    id
    name
  }
`;

const CREATE_USER_MUTATION = gql(/* GraphQL */ `
  mutation CreateUser($body: LoginDto!) {
    login(body: $body) {
      id
      name
    }
  }
`);

const getListUser = async () => {
  const responeData = await getClient().query({ query });
  return responeData;
};
const createUser = async (data: User): Promise<UserMutation> => {
  try {
    const response = await getClient().mutate({
      mutation: CREATE_USER_MUTATION,
      variables: { body: data },
    });
    return response.data;
  } catch (error: any) {
    throw error.graphQLErrors[0];
  }
};

const updateUser = async () => {
  const responeData = await getClient().query({ query });
  return responeData;
};

const deleteUser = async () => {
  const responeData = await getClient().query({ query });
  return responeData;
};

const getUser = async () => {
  const responeData = await getClient().query({ query });
  return responeData;
};
export { createUser, updateUser, deleteUser, getUser, getListUser };
