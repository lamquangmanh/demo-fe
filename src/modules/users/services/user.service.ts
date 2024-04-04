import { graphClient } from '@/common/adapters/graphQL/client';
import { User } from '../graphql/model';
import { CREATE_USER, DELETE_USER, GET_USERS, UPDATE_USER } from '../graphql/gql';

const getListUserService = async (): Promise<User[]> => {
  // const responeData = await graphClient.query({ query: GET_USERS });
  return [
    {
      id: '1',
      name: 'Lương Duy Phước',
      username: 'phuocnt',
      email: 'phuocnt@cyberlogitec.com',
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'loser'],
    },
    {
      id: '2',
      name: 'Tiger',
      username: 'tigernt',
      email: 'tigernt@cyberlogitec.com',
      address: 'London No. 1 Lake Park',
      tags: ['cool'],
    },
    {
      id: '3',
      name: 'Tùng',
      username: 'tungclv',
      email: 'tungclv@cyberlogitec.com',
      address: 'Sydney No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      id: '4',
      name: 'Thái',
      username: 'thaiclv',
      email: 'thaiclv@cyberlogitec.com',
      address: 'Sydney No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      id: '5',
      name: 'A',
      username: 'thaiclv',
      email: 'thaiclv@cyberlogitec.com',
      address: 'Sydney No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      id: '6',
      name: 'B',
      username: 'thaiclv',
      email: 'thaiclv@cyberlogitec.com',
      address: 'Sydney No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      id: '7',
      name: 'C',
      username: 'thaiclv',
      email: 'thaiclv@cyberlogitec.com',
      address: 'Sydney No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      id: '8',
      name: 'D',
      username: 'thaiclv',
      email: 'thaiclv@cyberlogitec.com',
      address: 'Sydney No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      id: '9',
      name: 'E',
      username: 'thaiclv',
      email: 'thaiclv@cyberlogitec.com',
      address: 'Sydney No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      id: '10',
      name: 'F',
      username: 'thaiclv',
      email: 'thaiclv@cyberlogitec.com',
      address: 'Sydney No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      id: '11',
      name: 'G',
      username: 'thaiclv',
      email: 'thaiclv@cyberlogitec.com',
      address: 'Sydney No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      id: '12',
      name: 'H',
      username: 'thaiclv',
      email: 'thaiclv@cyberlogitec.com',
      address: 'Sydney No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      id: '13',
      name: 'I',
      username: 'thaiclv',
      email: 'thaiclv@cyberlogitec.com',
      address: 'Sydney No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      id: '14',
      name: 'K',
      username: 'thaiclv',
      email: 'thaiclv@cyberlogitec.com',
      address: 'Sydney No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      id: '15',
      name: 'L',
      username: 'thaiclv',
      email: 'thaiclv@cyberlogitec.com',
      address: 'Sydney No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      id: '16',
      name: 'M',
      username: 'thaiclv',
      email: 'thaiclv@cyberlogitec.com',
      address: 'Sydney No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      id: '17',
      name: 'N',
      username: 'thaiclv',
      email: 'thaiclv@cyberlogitec.com',
      address: 'Sydney No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
  ];
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
