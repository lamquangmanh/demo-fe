import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
  gql,
  useQuery,
} from '@apollo/client';

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  return forward(operation);
});

const graphClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export { graphClient, gql, useQuery };
