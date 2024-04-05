import { graphClient, gql } from '@/common/adapters/graphQL/client';

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
  mutation {
    addUser(addUserDto: { name: "name3", username: "username3" }) {
      id
      name
      username
    }
  }
`;

// export const UPDATE_USER = gql`
//   mutation UpdateUser($username: String!) {
//     updateUser(username: $username) {
//       id
//       username
//     }
//   }
// `;

// export const DELETE_USER = gql`
//   mutation DeleteUser($id: String!) {
//     deleteUser(id: $id) {
//       id
//       username
//     }
//   }
// `;
