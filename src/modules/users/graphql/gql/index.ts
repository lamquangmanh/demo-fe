import { graphClient, gql } from '@/common/adapters/graphQL/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!) {
    createUser(username: $username) {
      id
      username
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($username: String!) {
    updateUser(username: $username) {
      id
      username
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      id
      username
    }
  }
`;
