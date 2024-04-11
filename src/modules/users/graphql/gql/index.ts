import { gql } from '@/common/adapters/graphQL/client';

export const GET_USERS = gql`
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
`;

export const CREATE_USER = gql`
  mutation createUser($body: AddUserDto!) {
    addUser(addUserDto: $body) {
      id
      name
      username
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($body: UpdateUserDto!) {
    updateUser(updateUserDto: $body) {
      id
      name
      username
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: Float!) {
    deleteUser(id: $id) {
      deletedCount
    }
  }
`;
