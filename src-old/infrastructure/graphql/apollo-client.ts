'use client';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// import from common
import { CONFIGS } from '@/common/configs';

let client: ApolloClient<any> | null = null;

const createApolloClient = () => {
  if (client) return client;

  // create a new Apollo Client instance
  client = new ApolloClient({
    link: new HttpLink({
      uri: CONFIGS.GRAPHQL_ENDPOINT,
      credentials: 'include', // Send cookies
      fetchOptions: {
        mode: 'cors', // optional; CORS is default
      },
    }),
    cache: new InMemoryCache(),
  });
  return client;
};
export default createApolloClient;
