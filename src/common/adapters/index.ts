import { gql } from '@apollo/client';

const query = gql`
  query Now {
    now(id: "1")
  }
`;
